import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';

import { AdminSeguimientoComponent } from './admin-seguimiento';
import { SeguimientoItem, SeguimientoService } from '../../../services/seguimiento.service';
import { ToastService } from '../../../services/toast.service';

const diasAtras = (d: number): string => new Date(Date.now() - d * 86_400_000).toISOString();

const buildItem = (over: Partial<SeguimientoItem> = {}): SeguimientoItem => ({
  quoteId: 1,
  sellerId: 's1',
  sellerName: 'Ana Vendedora',
  clientName: 'Cliente Uno',
  activo: 'VW Crafter 2026',
  brand: 'VW',
  model: 'Crafter',
  year: 2026,
  priceNet: 900_000,
  createdAt: diasAtras(10),
  referenciado: '',
  financiera: 'SIMPLE LEASE',
  etapas: {},
  fechaCierre: null,
  updatedAt: null,
  tieneRegistro: false,
  ...over,
});

describe('AdminSeguimientoComponent', () => {
  let component: AdminSeguimientoComponent;
  let fixture: ComponentFixture<AdminSeguimientoComponent>;

  const itemsSignal = signal<SeguimientoItem[]>([]);
  const loadingSignal = signal(false);
  const tablaSignal = signal(true);

  const mockSeguimiento = {
    items: itemsSignal.asReadonly(),
    loading: loadingSignal.asReadonly(),
    tablaDisponible: tablaSignal.asReadonly(),
    load: vi.fn(),
    alternarEtapa: vi.fn(),
    cerrar: vi.fn(),
    reabrir: vi.fn(),
    actualizarDatos: vi.fn(),
  };

  const mockToast = {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    toasts: signal([]).asReadonly(),
  };

  const crearComponente = async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [AdminSeguimientoComponent],
      providers: [
        provideRouter([]),
        { provide: SeguimientoService, useValue: mockSeguimiento },
        { provide: ToastService, useValue: mockToast },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminSeguimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  };

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    itemsSignal.set([]);
    loadingSignal.set(false);
    tablaSignal.set(true);
    Object.values(mockSeguimiento).forEach((fn: any) => fn?.mockReset?.());
    mockToast.success.mockReset();
    mockToast.error.mockReset();
    mockToast.info.mockReset();
    mockSeguimiento.load.mockResolvedValue(undefined);
    mockSeguimiento.alternarEtapa.mockResolvedValue(true);
    mockSeguimiento.cerrar.mockResolvedValue(true);
    mockSeguimiento.reabrir.mockResolvedValue(true);
    mockSeguimiento.actualizarDatos.mockResolvedValue(true);

    itemsSignal.set([
      buildItem({ quoteId: 1, clientName: 'Cliente Uno', etapas: { exp: diasAtras(20) } }),
      buildItem({
        quoteId: 2,
        clientName: 'Cliente Dos',
        sellerName: 'Beto Asesor',
        etapas: { exp: diasAtras(30), analisis: diasAtras(2) },
      }),
      buildItem({
        quoteId: 3,
        clientName: 'Cliente Tres',
        etapas: { exp: diasAtras(40), analisis: diasAtras(30) },
        fechaCierre: diasAtras(1),
      }),
    ]);
  });

  it('should create and load the list on init', async () => {
    await crearComponente();
    expect(component).toBeTruthy();
    expect(mockSeguimiento.load).toHaveBeenCalled();
    expect(component.filtrados().length).toBe(3);
  });

  it('should filter the deals by search term and seller', async () => {
    await crearComponente();

    component.searchTerm = 'cliente dos';
    component.applyFilters();
    expect(component.filtrados().map((i) => i.quoteId)).toEqual([2]);

    component.searchTerm = 'crafter 2026';
    component.applyFilters();
    expect(component.filtrados().length).toBe(3);

    component.searchTerm = '';
    component.filtroVendedor = 's1';
    component.applyFilters();
    expect(component.filtrados().length).toBe(3);

    component.filtroVendedor = 'todos';
    component.clearFilters();
    expect(component.filtrados().length).toBe(3);
  });

  it('should toggle a stage chip and persist it', async () => {
    await crearComponente();
    const item = component.filtrados().find((i) => i.quoteId === 1)!;
    await component.toggleEtapa(item, 'exp');
    expect(mockSeguimiento.alternarEtapa).toHaveBeenCalledWith(item, 'exp');
  });

  it('should warn when a stage cannot be toggled', async () => {
    mockSeguimiento.alternarEtapa.mockResolvedValue(false);
    await crearComponente();
    const item = component.filtrados().find((i) => i.quoteId === 1)!;
    await component.toggleEtapa(item, 'exp');
    expect(mockToast.error).toHaveBeenCalled();
  });

  it('should render the Excel-like list view with stage chips', async () => {
    await crearComponente();
    const filas = fixture.nativeElement.querySelectorAll('.seguimiento-tabla tbody tr');
    expect(filas.length).toBe(3);

    const chips = filas[0].querySelectorAll('.etapa-chip');
    expect(chips.length).toBe(8);
  });
  it('should open the detail drawer, save the operational data and close it', async () => {
    await crearComponente();
    const item = component.filtrados().find((i) => i.quoteId === 1)!;

    component.abrirDetalle(item);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.drawer')).toBeTruthy();
    expect(component.formActivo).toBe('VW Crafter 2026');
    expect(component.formFinanciera).toBe('SIMPLE LEASE');

    component.formReferenciado = 'César';
    component.formFinanciera = 'MONTERREY';
    await component.guardarDetalle();

    expect(mockSeguimiento.actualizarDatos).toHaveBeenCalledWith(item, {
      referenciado: 'César',
      financiera: 'MONTERREY',
      activoTexto: 'VW Crafter 2026',
    });
    expect(mockToast.success).toHaveBeenCalled();

    component.cerrarDetalle();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.drawer')).toBeFalsy();
    expect(component.detalle()).toBeNull();
  });

  it('should warn when the operational data cannot be saved', async () => {
    mockSeguimiento.actualizarDatos.mockResolvedValue(false);
    await crearComponente();
    const item = component.filtrados().find((i) => i.quoteId === 1)!;

    component.abrirDetalle(item);
    await component.guardarDetalle();

    expect(mockToast.error).toHaveBeenCalled();
    expect(component.guardando).toBe(false);
  });

  it('should close and reopen a deal', async () => {
    await crearComponente();
    const abierto = component.filtrados().find((i) => i.quoteId === 1)!;
    await component.cerrarNegocio(abierto);
    expect(mockSeguimiento.cerrar).toHaveBeenCalledWith(abierto);
    expect(mockToast.success).toHaveBeenCalled();

    const cerrado = component.filtrados().find((i) => i.quoteId === 3)!;
    await component.reabrirNegocio(cerrado);
    expect(mockSeguimiento.reabrir).toHaveBeenCalledWith(cerrado);
    expect(mockToast.info).toHaveBeenCalledWith(expect.stringContaining('reabierto'));
  });

  it('should warn when a deal cannot be closed', async () => {
    mockSeguimiento.cerrar.mockResolvedValue(false);
    await crearComponente();
    const item = component.filtrados().find((i) => i.quoteId === 1)!;

    await component.cerrarNegocio(item);
    expect(mockToast.error).toHaveBeenCalled();
  });
  it('should show the read-only warning only when the table is missing', async () => {
    await crearComponente();
    expect(fixture.nativeElement.querySelector('.aviso-migracion')).toBeFalsy();

    tablaSignal.set(false);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.aviso-migracion')).toBeTruthy();
  });

  it('should compute the aging traffic light from the latest completed stage', async () => {
    await crearComponente();
    const clienteUno = component.filtrados().find((i) => i.quoteId === 1)!;
    const clienteDos = component.filtrados().find((i) => i.quoteId === 2)!;
    const clienteTres = component.filtrados().find((i) => i.quoteId === 3)!;

    expect(component.diasEnEtapa(clienteUno)).toBe(20);
    expect(component.nivelItem(clienteUno)).toBe('rojo');
    expect(component.diasEnEtapa(clienteDos)).toBe(2);
    expect(component.nivelItem(clienteDos)).toBe('verde');
    expect(component.nivelItem(clienteTres)).toBe('verde');
  });

  it('should format dates and currency for the UI', async () => {
    await crearComponente();
    expect(component.formatFecha(null)).toBe('—');
    expect(component.formatFecha('no-es-fecha')).toBe('—');
    expect(component.formatMoneda(1_500_000)).toContain('1,500,000');

    const enBlanco = buildItem();
    expect(component.formatFechaEtapa(enBlanco, 'exp')).toBe('Pendiente');
    expect(component.formatFechaEtapa(enBlanco, 'analisis')).toBe('Pendiente');
    expect(component.trackByQuote(0, enBlanco)).toBe(enBlanco.quoteId);
  });
});
