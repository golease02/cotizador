import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AdminSellerPerformanceComponent } from './admin-seller-performance';
import {
  AdminService,
  SellerPerformance,
  SellerPerformancePayload,
} from '../../../services/admin.service';

const diasAtras = (d: number): string => new Date(Date.now() - d * 86_400_000).toISOString();

const buildSeller = (over: Partial<SellerPerformance> = {}): SellerPerformance => ({
  id: 's1',
  full_name: 'Ana Vendedora',
  seller_number: '5511111111',
  agency_brand: 'GoLease',
  agency_location: 'CDMX',
  active: true,
  totalQuotes: 10,
  quotesPeriod: 4,
  quotesPrevPeriod: 2,
  quotesWeek: 1,
  pipelineValue: 1_000_000,
  avgTicket: 250_000,
  lastQuoteAt: diasAtras(3),
  daysSinceLastQuote: 3,
  byColor: { reciente: 1, amarillo: 1, rojo: 0, verde: 2 },
  notasCount: 2,
  recentQuotes: [],
  ...over,
});

const buildPayload = (sellers: SellerPerformance[]): SellerPerformancePayload => ({
  period: { days: 30 },
  team: {
    quotesPeriod: sellers.reduce((sum, s) => sum + s.quotesPeriod, 0),
    quotesPrevPeriod: sellers.reduce((sum, s) => sum + s.quotesPrevPeriod, 0),
    activeSellers: sellers.filter((s) => s.active).length,
    activeSellersPeriod: sellers.filter((s) => s.quotesPeriod > 0).length,
    pipelineValue: 1_500_000,
    avgTicket: 250_000,
    weeklySeries: Array.from({ length: 8 }, (_, i) => ({
      weekStart: diasAtras((7 - i) * 7),
      count: i,
    })),
  },
  sellers,
});

describe('AdminSellerPerformanceComponent', () => {
  let component: AdminSellerPerformanceComponent;
  let fixture: ComponentFixture<AdminSellerPerformanceComponent>;

  const mockAdmin = {
    getSellerPerformance: vi.fn(),
  };

  beforeEach(async () => {
    mockAdmin.getSellerPerformance.mockReset();
    mockAdmin.getSellerPerformance.mockResolvedValue({
      data: buildPayload([
        buildSeller({ id: 's1', full_name: 'Ana', quotesPeriod: 4, pipelineValue: 900_000 }),
        buildSeller({
          id: 's2',
          full_name: 'Beto',
          quotesPeriod: 9,
          quotesPrevPeriod: 1,
          pipelineValue: 2_400_000,
          daysSinceLastQuote: 30,
          lastQuoteAt: diasAtras(30),
          byColor: { reciente: 0, amarillo: 0, rojo: 3, verde: 0 },
        }),
        buildSeller({
          id: 's3',
          full_name: 'Carla',
          totalQuotes: 0,
          quotesPeriod: 0,
          quotesPrevPeriod: 0,
          pipelineValue: 0,
          lastQuoteAt: null,
          daysSinceLastQuote: null,
          byColor: { reciente: 0, amarillo: 0, rojo: 0, verde: 0 },
        }),
      ]),
      error: null,
    });

    await TestBed.configureTestingModule({
      imports: [AdminSellerPerformanceComponent],
      providers: [provideRouter([]), { provide: AdminService, useValue: mockAdmin }],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminSellerPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load sellers and team metrics from the service', () => {
    expect(mockAdmin.getSellerPerformance).toHaveBeenCalledWith(30);
    expect(component.sellers().length).toBe(3);
    expect(component.team()?.quotesPeriod).toBe(13);
    expect(component.team()?.weeklySeries.length).toBe(8);
    expect(component.loading()).toBe(false);
  });

  it('should surface an error message when the service fails', async () => {
    mockAdmin.getSellerPerformance.mockResolvedValueOnce({
      data: null,
      error: { message: 'boom' },
    });
    await component.cargar();
    expect(component.error()).toContain('No se pudo cargar');
  });

  it('should request the selected period again', async () => {
    await component.setPeriod(90);
    expect(component.period()).toBe(90);
    expect(mockAdmin.getSellerPerformance).toHaveBeenLastCalledWith(90);
  });

  it('should compute the delta label and class per seller', () => {
    const [ana, beto, carla] = component.sellers();
    expect(component.delta(ana)).toBe(2);
    expect(component.deltaLabel(ana)).toBe('+2');
    expect(component.deltaClass(ana)).toBe('delta-up');
    expect(component.deltaLabel(beto)).toBe('+8');
    expect(component.deltaLabel(carla)).toBe('=');
    expect(component.deltaClass(carla)).toBe('delta-flat');
  });

  it('should classify the seller activity', () => {
    const [ana, beto, carla] = component.sellers();
    expect(component.estadoActividad(ana).className).toBe('estado-ok');
    expect(component.estadoActividad(beto).className).toBe('estado-alerta');
    expect(component.estadoActividad(beto).label).toBe('Hace 30 días');
    expect(component.estadoActividad(carla).className).toBe('estado-sin-actividad');
    expect(component.estadoActividad(carla).label).toBe('Sin actividad');
  });

  it('should mark a disabled seller as desactivado', () => {
    const estado = component.estadoActividad(buildSeller({ active: false }));
    expect(estado.className).toBe('estado-desactivado');
    expect(estado.label).toBe('Desactivado');
  });

  it('should compute the segmented status bar widths', () => {
    const ana = component.sellers()[0];
    // 1 reciente + 1 amarillo + 0 rojo + 2 verde = 4 cotizaciones
    expect(component.totalColores(ana)).toBe(4);
    expect(component.colorWidth(ana, 'verde')).toBeCloseTo(50);
    expect(component.colorWidth(ana, 'rojo')).toBe(0);
    const carla = component.sellers()[2];
    expect(component.colorWidth(carla, 'verde')).toBe(0);
  });

  it('should scale the weekly bars against the maximum week', () => {
    expect(component.maxWeekly()).toBe(7);
    expect(component.weeklyHeight(7)).toBe(100);
    expect(component.weeklyHeight(0)).toBe(0);
  });

  it('should sort by quoted amount and by quotes', () => {
    component.setSort('pipeline');
    expect(component.sortedSellers().map((s) => s.id)).toEqual(['s2', 's1', 's3']);

    component.setSort('cotizaciones');
    expect(component.sortedSellers().map((s) => s.id)).toEqual(['s2', 's1', 's3']);
  });

  it('should put the most recent activity first by default', () => {
    // Ana (3 días) antes que Beto (30 días); Carla nunca cotizó -> al final.
    expect(component.sortedSellers().map((s) => s.id)).toEqual(['s1', 's2', 's3']);
  });

  it('should build the team alerts', () => {
    const alertas = component.alertas();
    const tipos = alertas.map((a) => a.type);
    expect(tipos).toContain('inactivo');
    expect(tipos).toContain('rojo');
    expect(tipos).toContain('nuevo');
    const inactivo = alertas.find((a) => a.type === 'inactivo');
    expect(inactivo?.sellers.map((s) => s.id)).toEqual(['s2']);
  });

  it('should toggle the drill-down of a seller', () => {
    component.toggleDetalle('s1');
    expect(component.expandedId()).toBe('s1');
    component.toggleDetalle('s1');
    expect(component.expandedId()).toBeNull();
  });

  it('should format the week label as dd/MM', () => {
    expect(component.weekLabel('2026-03-09T00:00:00.000Z')).toMatch(/^\d{2}\/\d{2}$/);
  });
});