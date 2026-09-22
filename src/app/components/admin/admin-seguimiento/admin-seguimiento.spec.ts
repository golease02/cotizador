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
    moverAColumna: vi.fn(),
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

  /** Evento de drag & drop mínimo (HTML5 nativo) para probar el kanban. */
  const buildDragEvent = (payload = ''): DragEvent => {
    const store: Record<string, string> = {};
    if (payload) store['text/plain'] = payload;
    return {
      preventDefault: vi.fn(),
      dataTransfer: {
        setData: (k: string, v: string) => (store[k] = v),
        getData: (k: string) => store[k] || '',
        effectAllowed: '',
        dropEffect: '',
      },
    } as unknown as DragEvent;
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

  beforeEach(async () => {
    localStorage.clear();
    itemsSignal.set([]);
    loadingSignal.set(false);
    tablaSignal.set(true);
    Object.values(mockSeguimiento).forEach((fn: any) => fn?.mockReset?.());
    mockToast.success.mockReset();
    mockToast.error.mockReset();
    mockToast.info.mockReset();
    mockSeguimiento.load.mockResolvedValue(undefined);
    mockSeguimiento.moverAColumna.mockResolvedValue(true);
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

  it('should create and load the board on init', async () => {
    await crearComponente();
    expect(component).toBeTruthy();
    expect(mockSeguimiento.load).toHaveBeenCalled();
    expect(component.filtrados().length).toBe(3);
    expect(component.resumen().total).toBe(3);
    expect(component.resumen().cerrados).toBe(1);
    expect(component.resumen().enProceso).toBe(2);
  });

  it('should default to the kanban view and persist the preference', async () => {
    await crearComponente();
    expect(component.vista()).toBe('kanban');

    component.setVista('lista');
    fixture.detectChanges();
    expect(component.vista()).toBe('lista');
    expect(localStorage.getItem('golease-seguimiento-vista')).toBe('lista');

    // Un componente nuevo en la misma sesión arranca en la vista guardada
    const otroFixture = TestBed.createComponent(AdminSeguimientoComponent);
    otroFixture.detectChanges();
    expect(otroFixture.componentInstance.vista()).toBe('lista');
  });

  it('should group deals by their current kanban column', async () => {
    await crearComponente();
    // Cliente Uno: 1 etapa completada → columna 1 (Expediente)
    expect(component.itemsDeColumna(0)).toHaveLength(0);
    expect(component.itemsDeColumna(1).map((i) => i.clientName)).toEqual(['Cliente Uno']);
    // Cliente Dos: 2 etapas → columna 2 (Análisis); Cliente Tres: 2 etapas + cierre → Cerrado
    expect(component.itemsDeColumna(2).map((i) => i.clientName)).toEqual(['Cliente Dos']);
    expect(component.itemsDeColumna(component.columnas.length - 1).map((i) => i.clientName)).toEqual([
      'Cliente Tres',
    ]);
  });

  it('should sum the quoted value per column and the stage progress', async () => {
    await crearComponente();
    expect(component.valorColumna(1)).toBe(900_000);
    // Cliente Dos tiene 2 de 8 etapas completadas
    const clienteDos = component.itemsDeColumna(2)[0];
    expect(component.progreso(clienteDos)).toBe(25);
  });

  it('should compute the aging traffic light from the latest completed stage', async () => {
    await crearComponente();
    const clienteUno = component.filtrados().find((i) => i.quoteId === 1)!;
    const clienteDos = component.filtrados().find((i) => i.quoteId === 2)!;
    const clienteTres = component.filtrados().find((i) => i.quoteId === 3)!;

    // 20 días desde EXP → rojo; 2 días desde ANÁLISIS → verde
    expect(component.diasEnEtapa(clienteUno)).toBe(20);
    expect(component.nivelItem(clienteUno)).toBe('rojo');
    expect(component.diasEnEtapa(clienteDos)).toBe(2);
    expect(component.nivelItem(clienteDos)).toBe('verde');
    // Un negocio cerrado siempre se pinta en verde
    expect(component.nivelItem(clienteTres)).toBe('verde');
  });

  it('should filter the board by search term, seller and stage', async () => {
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
    expect(component.filtrados().length).toBe(3); // todos los items de prueba son de s1

    component.filtroVendedor = 'todos';
    component.filtroEtapa = 'cerrados';
    component.applyFilters();
    expect(component.filtrados().map((i) => i.quoteId)).toEqual([3]);

    component.filtroEtapa = 'proceso';
    component.applyFilters();
    expect(component.filtrados().map((i) => i.quoteId)).toEqual([1, 2]);

    component.filtroEtapa = '4';
    component.applyFilters();
    expect(component.filtrados().length).toBe(0);

    expect(component.hayFiltros).toBe(true);
    component.clearFilters();
    expect(component.filtrados().length).toBe(3);
    expect(component.hayFiltros).toBe(false);
  });

  it('should render the kanban columns with the deal cards', async () => {
    await crearComponente();
    const columnas = fixture.nativeElement.querySelectorAll('.kanban-columna');
    // Cotizada + 8 etapas + Cerrado
    expect(columnas.length).toBe(10);
    expect(fixture.nativeElement.querySelectorAll('.negocio-card').length).toBe(3);
    expect(columnas[1].querySelector('.col-contador').textContent.trim()).toBe('1');
    expect(columnas[9].querySelector('.col-contador').textContent.trim()).toBe('1');
  });

  it('should move a deal when it is dropped on another column', async () => {
    await crearComponente();
    const item = component.filtrados().find((i) => i.quoteId === 1)!;

    component.onDragStart(buildDragEvent(), item);
    expect(component.draggingId).toBe(1);

    await component.onDrop(buildDragEvent('1'), 4);
    expect(mockSeguimiento.moverAColumna).toHaveBeenCalledWith(item, 4);
    expect(mockToast.success).toHaveBeenCalled();
    expect(component.draggingId).toBeNull();

    // Soltar en la misma columna no dispara ninguna escritura
    mockSeguimiento.moverAColumna.mockClear();
    await component.onDrop(buildDragEvent('1'), 1);
    expect(mockSeguimiento.moverAColumna).not.toHaveBeenCalled();
  });

  it('should ignore drops without a valid deal id', async () => {
    await crearComponente();
    await component.onDrop(buildDragEvent('999'), 4);
    expect(mockSeguimiento.moverAColumna).not.toHaveBeenCalled();
  });

  it('should move a deal from the mobile "Mover a..." selector', async () => {
    await crearComponente();
    const item = component.filtrados().find((i) => i.quoteId === 2)!;
    component.onSelectorMover(item, { target: { value: '6' } } as unknown as Event);
    await fixture.whenStable();

    expect(mockSeguimiento.moverAColumna).toHaveBeenCalledWith(item, 6);
  });

  it('should warn the user when a move fails', async () => {
    mockSeguimiento.moverAColumna.mockResolvedValue(false);
    await crearComponente();
    const item = component.filtrados().find((i) => i.quoteId === 1)!;

    await component.moverA(item, 5);
    expect(mockToast.error).toHaveBeenCalled();
    expect(mockToast.success).not.toHaveBeenCalled();
  });

  it('should render the Excel-like list view and toggle a stage chip', async () => {
    await crearComponente();
    component.setVista('lista');
    fixture.detectChanges();

    const filas = fixture.nativeElement.querySelectorAll('.seguimiento-tabla tbody tr');
    expect(filas.length).toBe(3);

    const chips = filas[0].querySelectorAll('.etapa-chip');
    expect(chips.length).toBe(8);
    // Cliente Uno tiene EXP completada y ANÁLISIS pendiente
    expect(chips[0].classList.contains('is-done')).toBe(true);
    expect(chips[1].classList.contains('is-done')).toBe(false);

    chips[0].click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(mockSeguimiento.alternarEtapa).toHaveBeenCalledWith(
      expect.objectContaining({ quoteId: 1 }),
      'exp'
    );
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
    expect(mockToast.info).toHaveBeenCalled();
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