import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { MisCotizacionesComponent } from './mis-cotizaciones';
import { AuthService } from '../../../services/auth.service';
import { CatalogService } from '../../../services/catalog.service';
import { FinancialCalculatorService } from '../../../services/financial-calculator.service';
import { QuotesService, VendedorSeguimientoRow } from '../../../services/quotes.service';
import { ToastService } from '../../../services/toast.service';

const buildRow = (over: Partial<VendedorSeguimientoRow> = {}): VendedorSeguimientoRow => ({
  id: 1,
  seller_id: 'seller-1',
  client_name: 'Cliente Uno',
  brand: 'VW',
  model: 'Crafter',
  year: 2026,
  pricenet: 900_000,
  termmonths: 48,
  created_at: '2026-09-20T12:00:00.000Z',
  valid_until: '2026-09-27T12:00:00.000Z',
  fijada: false,
  revisada: false,
  last_reviewed_at: null,
  last_interacted_at: null,
  activo_texto: null,
  etapas: { exp: '2026-09-20T13:00:00.000Z', analisis: '2026-09-21T13:00:00.000Z' },
  fecha_cierre: null,
  seguimiento_updated_at: null,
  tiene_seguimiento: true,
  ...over,
});

describe('MisCotizacionesComponent', () => {
  let fixture: ComponentFixture<MisCotizacionesComponent>;
  let component: MisCotizacionesComponent;

  const mockAuth = {
    isAdmin: vi.fn().mockReturnValue(false),
    currentUser: vi.fn().mockReturnValue({ id: 'seller-1' }),
  };

  const mockQuotes = {
    getVendedorSeguimientoQuotes: vi.fn(),
    getQuoteCalculation: vi.fn(),
  };

  const mockCatalog = {
    loadStatePlates: vi.fn().mockResolvedValue(undefined),
    loadCalculatorConfig: vi.fn().mockResolvedValue(undefined),
    getStatePlates: vi.fn().mockReturnValue([]),
    getCalculatorConfig: vi.fn().mockReturnValue({}),
  };

  const mockCalculator = {
    calculateQuote: vi.fn(),
  };

  const mockToast = {
    error: vi.fn(),
    success: vi.fn(),
    info: vi.fn(),
  };

  beforeEach(async () => {
    mockAuth.isAdmin.mockReturnValue(false);
    mockAuth.currentUser.mockReturnValue({ id: 'seller-1' });
    mockQuotes.getVendedorSeguimientoQuotes.mockReset().mockResolvedValue({
      data: [buildRow()],
      error: null,
    });
    mockQuotes.getQuoteCalculation.mockReset().mockResolvedValue(null);
    mockCatalog.loadStatePlates.mockClear();
    mockCatalog.loadCalculatorConfig.mockClear();
    mockCalculator.calculateQuote.mockReset();
    mockToast.error.mockReset();
    mockToast.success.mockReset();
    mockToast.info.mockReset();

    await TestBed.configureTestingModule({
      imports: [MisCotizacionesComponent],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: mockAuth },
        { provide: QuotesService, useValue: mockQuotes },
        { provide: CatalogService, useValue: mockCatalog },
        { provide: FinancialCalculatorService, useValue: mockCalculator },
        { provide: ToastService, useValue: mockToast },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MisCotizacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    await vi.waitFor(() => expect(component.loading()).toBe(false));
    fixture.detectChanges();
  });

  it('should load the seller followup table without any filter section', () => {
    const root: HTMLElement = fixture.nativeElement;

    expect(mockQuotes.getVendedorSeguimientoQuotes).toHaveBeenCalled();
    expect(component.cotizaciones().length).toBe(1);
    expect(root.querySelector('.lista-wrapper')).toBeTruthy();
    expect(root.querySelector('.seller-followup-table')).toBeTruthy();
    expect(root.querySelector('.seller-followup-table tbody tr')).toBeTruthy();
    expect(root.querySelector('.filters-panel')).toBeFalsy();
    expect(root.querySelector('.search-box')).toBeFalsy();
    expect(root.querySelector('.period-selector')).toBeFalsy();
    expect(root.querySelector('input')).toBeFalsy();
  });

  it('should render all stages as read-only squares and expose only the eye detail action', () => {
    const root: HTMLElement = fixture.nativeElement;
    const stages = root.querySelectorAll('.etapa-chip');
    const stageButtons = root.querySelectorAll('.td-etapa button');

    expect(stages.length).toBe(8);
    expect(stageButtons.length).toBe(0);
    expect(root.querySelector('.visualizar-icono')).toBeTruthy();
    expect(root.querySelector('.td-acciones')).toBeFalsy();
    expect(root.querySelector('.btn-duplicate')).toBeFalsy();
    expect(root.querySelector('.btn-edit-quote')).toBeFalsy();
    expect(root.querySelector('.btn-eliminar')).toBeFalsy();
    expect(root.textContent).toContain('EXPEDIENTE');
    expect(root.textContent).toContain('PLACAS');
  });

  it('should show the current stage, progress and delivery state without allowing edits', () => {
    const row = component.cotizaciones()[0];

    expect(component.getEstadoSeguimiento(row)).toBe('En proceso');
    expect(component.getEtapaActual(row)).toBe('Pago inicial');
    expect(component.getProgreso(row)).toBe('2 de 8');
    expect(component.getEstadoEntrega(row)).toBe('En proceso');

    const cerrada = buildRow({
      etapas: {
        exp: '2026-09-20T13:00:00.000Z',
        analisis: '2026-09-21T13:00:00.000Z',
        pago_ini: '2026-09-22T13:00:00.000Z',
        oc: '2026-09-23T13:00:00.000Z',
        factura: '2026-09-24T13:00:00.000Z',
        contrato: '2026-09-25T13:00:00.000Z',
        gps: '2026-09-26T13:00:00.000Z',
        placas: '2026-09-27T13:00:00.000Z',
      },
      fecha_cierre: '2026-09-28T13:00:00.000Z',
    });

    expect(component.getEstadoSeguimiento(cerrada)).toBe('Entregado');
    expect(component.getEtapaActual(cerrada)).toBe('Entregado');
    expect(component.getProgreso(cerrada)).toBe('8 de 8');
    expect(component.getEstadoEntrega(cerrada)).toBe('Entregada');
  });
});
