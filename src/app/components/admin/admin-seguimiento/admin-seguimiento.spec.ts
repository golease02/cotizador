import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';

import { AdminSeguimientoComponent } from './admin-seguimiento';
import { SeguimientoItem, SeguimientoService } from '../../../services/seguimiento.service';
import { QuotesService } from '../../../services/quotes.service';
import { AuthService } from '../../../services/auth.service';
import { FinancialCalculatorService } from '../../../services/financial-calculator.service';
import { DEFAULT_CALCULATOR_CONFIG, STATE_PLATES_CATALOG } from '../../../models/leasing.model';
import { ToastService } from '../../../services/toast.service';
import { getSupabaseClient } from '../../../services/supabase-client';

const diasAtras = (d: number): string => new Date(Date.now() - d * 86_400_000).toISOString();

const buildItem = (over: Partial<SeguimientoItem> = {}): SeguimientoItem => ({
  quoteId: 1,
  sellerId: 's1',
  sellerName: 'Ana Vendedora',
  asesorId: 'a1',
  asesorName: 'Socio Asesor',
  clientName: 'Cliente Uno',
  activo: 'VW Crafter 2026',
  brand: 'VW',
  model: 'Crafter',
  year: 2026,
  priceNet: 900_000,
  termMonths: 48,
  createdAt: diasAtras(10),
  referenciado: '',
  financiera: 'SIMPLE LEASE',
  etapas: {},
  fechaCierre: null,
  updatedAt: null,
  revisada: false,
  lastReviewedAt: null,
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
    marcarRevisada: vi.fn(),
    actualizarDatos: vi.fn(),
  };

  const mockQuotesService = {
    getQuoteCalculation: vi.fn(),
    deleteQuote: vi.fn(),
  };

  const mockAuthService = {
    canAccessModule: () => true,
    currentUser: () => ({ id: 'admin-1' }),
  };

  const mockCalculator = {
    calculateQuote: vi.fn(),
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
        { provide: QuotesService, useValue: mockQuotesService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: FinancialCalculatorService, useValue: mockCalculator },
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
    mockQuotesService.getQuoteCalculation.mockReset().mockResolvedValue(null);
    mockQuotesService.deleteQuote.mockReset().mockResolvedValue({ error: null });
    mockCalculator.calculateQuote.mockReset();

    itemsSignal.set([
      buildItem({ quoteId: 1, clientName: 'Cliente Uno', etapas: { exp: diasAtras(20) } }),
      buildItem({
        quoteId: 2,
        clientName: 'Cliente Dos',
        sellerId: 's2',
        sellerName: 'Beto Vendedor',
        asesorId: 'a2',
        asesorName: 'Otro Asesor',
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

    component.searchTerm = 'otro asesor';
    component.applyFilters();
    expect(component.filtrados().map((i) => i.quoteId)).toEqual([2]);
    component.searchTerm = '';

    component.filtroVendedor = 's1';
    component.applyFilters();
    expect(component.filtrados().length).toBe(2);

    component.filtroAsesor = 'a2';
    component.applyFilters();
    expect(component.filtrados().length).toBe(0);

    component.filtroVendedor = 'todos';
    component.applyFilters();
    expect(component.filtrados().map((i) => i.quoteId)).toEqual([2]);

    component.filtroAsesor = 'todos';
    component.clearFilters();
    expect(component.filtrados().length).toBe(3);
    expect(component.asesores().length).toBe(2);
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
    // 8 etapas + casilla de ENTREGA
    expect(chips.length).toBe(9);
  });

  it('should render the AJUSTES 12 columns without the aging pill', async () => {
    await crearComponente();
    const root: HTMLElement = fixture.nativeElement;

    // Punto 1: sin "días transcurridos", con Notas y Visualizar (ojo verde).
    expect(root.querySelector('.aging-pill')).toBeFalsy();
    expect(root.querySelector('.inicio-acciones .notas-counter')).toBeTruthy();
    expect(root.querySelector('.inicio-acciones .btn-view')).toBeTruthy();

    // Puntos 2/3/4: asesor, vendedor, plazo y nuevos encabezados.
    const headers = [...root.querySelectorAll('.seguimiento-tabla thead th')].map((h) =>
      (h as HTMLElement).textContent?.trim().toUpperCase(),
    );
    expect(headers).toContain('ASESOR');
    expect(headers).toContain('VENDEDOR');
    expect(headers).toContain('PLAZO');
    expect(headers).toContain('FIN');
    expect(headers).toContain('EXPEDIENTE');
    expect(headers).toContain('ENTREGA');
    expect(headers).not.toContain('REFERENCIADO');
    expect(headers).not.toContain('FINANCIERA');
    expect(headers).not.toContain('F. CIERRE');

    // Punto 2: columna ASESOR con el asesor, VENDEDOR con el vendedor.
    const filaUno = root.querySelectorAll('.seguimiento-tabla tbody tr')[0];
    expect(filaUno.querySelector('.td-asesor')?.textContent?.trim()).toBe('Socio Asesor');
    expect(filaUno.querySelector('.td-ref')?.textContent?.trim()).toBe('Ana Vendedora');

    // Punto 3: columna PLAZO.
    expect(filaUno.querySelector('.td-plazo')?.textContent?.trim()).toContain('48');

    // Punto 5: casilla de ENTREGA marcada solo en el negocio cerrado.
    const casillas = root.querySelectorAll('.td-cierre .entrega-chip');
    expect(casillas.length).toBe(3);
    expect((casillas[0] as HTMLElement).textContent?.trim()).toBe('');
    expect((casillas[2] as HTMLElement).textContent?.trim()).toBe('✓');

    // Punto 6: botón ELIMINAR en acciones (sin Cerrar/Reabrir en la tabla).
    expect(root.querySelector('.td-acciones .btn-eliminar')?.textContent?.trim()).toBe(
      'Eliminar',
    );
    expect(root.querySelector('.btn-cerrar')).toBeFalsy();
    expect(root.querySelector('.btn-reabrir')).toBeFalsy();
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

  it('should toggle the entrega checkbox (close / reopen)', async () => {
    await crearComponente();
    const abierto = component.filtrados().find((i) => i.quoteId === 1)!;
    await component.toggleEntrega(abierto);
    expect(mockSeguimiento.cerrar).toHaveBeenCalledWith(abierto);

    const cerrado = component.filtrados().find((i) => i.quoteId === 3)!;
    await component.toggleEntrega(cerrado);
    expect(mockSeguimiento.reabrir).toHaveBeenCalledWith(cerrado);
  });

  it('should delete a quote after confirmation', async () => {
    await crearComponente();
    const item = component.filtrados().find((i) => i.quoteId === 1)!;

    component.pedirEliminar(item);
    expect(component.showDeleteModal).toBe(true);

    await component.confirmarEliminar();

    expect(mockQuotesService.deleteQuote).toHaveBeenCalledWith(1);
    expect(mockSeguimiento.load).toHaveBeenCalledTimes(2);
    expect(component.showDeleteModal).toBe(false);
    expect(mockToast.success).toHaveBeenCalled();
  });

  it('should warn when a quote cannot be deleted', async () => {
    mockQuotesService.deleteQuote.mockResolvedValue({ error: { message: 'denegado' } });
    await crearComponente();
    const item = component.filtrados().find((i) => i.quoteId === 1)!;

    component.pedirEliminar(item);
    await component.confirmarEliminar();

    expect(mockToast.error).toHaveBeenCalled();
    expect(component.showDeleteModal).toBe(true);
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

  it('should compute the days without activity from the latest movement', async () => {
    await crearComponente();
    const clienteUno = component.filtrados().find((i) => i.quoteId === 1)!;
    const clienteTres = component.filtrados().find((i) => i.quoteId === 3)!;

    // La etapa más reciente (hace 10 días) es posterior a la etapa de hace 20.
    expect(component.diasSinActividadItem(clienteUno)).toBe(10);
    expect(component.nivelActividadItem(clienteUno)).toBe('amarillo');
    // Entregado: atendido, siempre verde.
    expect(component.nivelActividadItem(clienteTres)).toBe('verde');

    // Un negocio abandonado pasa a rojo a los 16 días.
    const abandonado = buildItem({ createdAt: diasAtras(20) });
    expect(component.nivelActividadItem(abandonado)).toBe('rojo');
  });

  it('should reset the days without activity when the quote is reviewed', async () => {
    await crearComponente();
    const antes = component.filtrados().find((i) => i.quoteId === 1)!;
    expect(component.diasSinActividadItem(antes)).toBe(10);

    const despues = { ...antes, revisada: true, lastReviewedAt: diasAtras(0) };
    expect(component.diasSinActividadItem(despues)).toBe(0);
    expect(component.nivelActividadItem(despues)).toBe('verde');
    expect(component.etiquetaActividadItem(despues)).toBe('Hoy');
  });

  it('should render the days badge and toggle the review action', async () => {
    mockSeguimiento.marcarRevisada.mockResolvedValue(true);
    await crearComponente();
    const item = component.filtrados().find((i) => i.quoteId === 1)!;

    const badges = fixture.nativeElement.querySelectorAll('.dias-badge');
    expect(badges.length).toBe(3);
    expect(badges[0].textContent).toContain('10');

    await component.toggleRevisada(item);
    expect(mockSeguimiento.marcarRevisada).toHaveBeenCalledWith(item, true);
    expect(mockToast.success).toHaveBeenCalled();
  });

  it('should warn when the review action fails', async () => {
    mockSeguimiento.marcarRevisada.mockResolvedValue(false);
    await crearComponente();
    const item = component.filtrados().find((i) => i.quoteId === 1)!;

    await component.toggleRevisada(item);
    expect(mockToast.error).toHaveBeenCalled();
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

  // ===================== AJUSTES 12: notas y visualización =====================

  describe('notas y visualización', () => {
    let notasRows: any[] = [];

    /** Cliente Supabase simulado: estas pruebas no tocan la red. */
    const stubNotasClient = (): void => {
      const client = getSupabaseClient();
      const chain: any = {
        select: vi.fn(() => chain),
        eq: vi.fn(() => chain),
        order: vi.fn(() => chain),
        insert: vi.fn(() => chain),
        update: vi.fn(() => chain),
        delete: vi.fn(() => chain),
        maybeSingle: vi.fn(async () => ({ data: null, error: null })),
        then: (resolve: (value: unknown) => unknown) =>
          Promise.resolve({ data: notasRows, error: null }).then(resolve),
      };
      vi.spyOn(client, 'from').mockReturnValue(chain);
    };

    beforeEach(() => {
      notasRows = [];
      stubNotasClient();
    });

    /**
     * Snapshot real del cotizador (mismo motor de la hoja del PDF) para que el
     * visor renderice el desglose igual que en Mis Cotizaciones.
     */
    const buildSnapshot = () =>
      new FinancialCalculatorService({
        getCalculatorConfig: () => DEFAULT_CALCULATOR_CONFIG,
        getStatePlates: () => [...STATE_PLATES_CATALOG],
        statePlates: () => [...STATE_PLATES_CATALOG],
        calculatorConfig: () => DEFAULT_CALCULATOR_CONFIG,
      } as any).calculateQuote({
        clientName: 'Cliente Uno',
        brand: 'VW',
        model: 'Crafter',
        year: 2026,
        priceNet: 900_000,
        isHybridOrElectric: false,
        termMonths: 48,
        extraordinaryRentPct: 0.1,
        securityDepositPct: 0,
        selectedStatePlateId: 'pendiente',
        isInsuranceEstimated: false,
      });

    it('should open the notas modal and list the notes of the quote', async () => {
      notasRows = [
        {
          id: 'n1',
          entidad_tipo: 'quote',
          entidad_id: '1',
          texto: 'Llamar mañana',
          created_at: diasAtras(1),
        },
      ];
      stubNotasClient();
      await crearComponente();
      const item = component.filtrados().find((i) => i.quoteId === 1)!;

      await component.abrirNotas(item);
      fixture.detectChanges();

      expect(component.showNotasModal).toBe(true);
      expect(component.selectedQuoteId).toBe(1);
      expect(component.notasCotizacion.length).toBe(1);
      expect(component.notaError).toBe('');

      component.cerrarNotasQuote();
      fixture.detectChanges();

      expect(component.showNotasModal).toBe(false);
      expect(component.selectedQuoteId).toBeNull();
      expect(component.notasCotizacion).toEqual([]);
    });

    it('should count the notes per quote for the counter column', async () => {
      notasRows = [
        { id: 'n1', entidad_id: '1' },
        { id: 'n2', entidad_id: '1' },
        { id: 'n3', entidad_id: '2' },
      ];
      stubNotasClient();
      await crearComponente();

      const uno = component.filtrados().find((i) => i.quoteId === 1)!;
      const dos = component.filtrados().find((i) => i.quoteId === 2)!;

      // El conteo llega de forma asíncrona (sin bloquear el pintado del tablero).
      await vi.waitFor(() => expect(component.getNotasCount(uno)).toBe(2));
      expect(component.getNotasCount(dos)).toBe(1);
    });

    it('should save a new note and report success', async () => {
      await crearComponente();
      const item = component.filtrados().find((i) => i.quoteId === 1)!;
      await component.abrirNotas(item);

      component.notaText = '  Cliente confirmó visita  ';
      await component.guardarNotaQuote();

      expect(mockToast.success).toHaveBeenCalledWith('Nota agregada correctamente');
      expect(mockToast.error).not.toHaveBeenCalled();
      expect(component.notaLoading).toBe(false);
    });

    it('should delete a note after confirmation', async () => {
      notasRows = [{ id: 'n1', entidad_id: '1', texto: 'Nota vieja' }];
      stubNotasClient();
      await crearComponente();
      const item = component.filtrados().find((i) => i.quoteId === 1)!;
      await component.abrirNotas(item);

      component.eliminarNotaQuote({ id: 'n1', texto: 'Nota vieja' });
      expect(component.showNotaConfirmModal).toBe(true);

      await component.confirmarEliminarNota();

      expect(mockToast.success).toHaveBeenCalledWith('Nota eliminada correctamente');
      expect(component.showNotaConfirmModal).toBe(false);
      expect(component.notaToDelete).toBeNull();
    });

    it('should block the notas modal without the notas permission', async () => {
      await crearComponente();
      const item = component.filtrados().find((i) => i.quoteId === 1)!;

      mockAuthService.canAccessModule = () => false;
      await component.abrirNotas(item);
      expect(component.showNotasModal).toBe(false);
      mockAuthService.canAccessModule = () => true;
    });

    it('should show the stored quote snapshot in the viewer', async () => {
      await crearComponente();
      const item = component.filtrados().find((i) => i.quoteId === 1)!;
      const snapshot = buildSnapshot();
      mockQuotesService.getQuoteCalculation.mockResolvedValue(snapshot);

      await component.visualizarCotizacion(item);

      expect(mockQuotesService.getQuoteCalculation).toHaveBeenCalledWith(1);
      expect(component.showQuoteModal).toBe(true);
      expect(component.selectedQuote()).toBe(snapshot);
      expect(component.quoteCargando).toBe(false);

      component.cerrarQuoteModal();
      expect(component.showQuoteModal).toBe(false);
      expect(component.selectedQuote()).toBeNull();
    });
  });
});
