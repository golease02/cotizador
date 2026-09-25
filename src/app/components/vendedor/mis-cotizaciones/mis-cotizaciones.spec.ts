import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { signal } from '@angular/core';

import { MisCotizacionesComponent } from './mis-cotizaciones';
import { AuthService } from '../../../services/auth.service';
import { CatalogService } from '../../../services/catalog.service';
import { FinancialCalculatorService } from '../../../services/financial-calculator.service';
import { QuotesService, VendedorSeguimientoRow } from '../../../services/quotes.service';
import { NotesService } from '../../../services/notes.service';
import { MaterialesService } from '../../../services/materiales.service';
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

  const profileSignal = signal<{ role: string } | null>({ role: 'seller' });

  const mockAuth = {
    isAdmin: vi.fn().mockReturnValue(false),
    currentUser: vi.fn().mockReturnValue({ id: 'seller-1' }),
    currentProfile: profileSignal.asReadonly(),
  };

  const mockQuotes = {
    getVendedorSeguimientoQuotes: vi.fn(),
    getQuoteCalculation: vi.fn(),
    getSellerQuoteNoteCounts: vi.fn(),
  };

  const mockNotes = {
    getNotes: vi.fn(),
    createNote: vi.fn(),
    updateOwnNote: vi.fn(),
    deleteOwnNote: vi.fn(),
  };

  const mockMateriales = {
    get: vi.fn(),
    getPdfSignedUrl: vi
      .fn()
      .mockResolvedValue({ url: 'https://signed.example/guia.pdf', error: null }),
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
    profileSignal.set({ role: 'seller' });
    mockAuth.isAdmin.mockReturnValue(false);
    mockAuth.currentUser.mockReturnValue({ id: 'seller-1' });
    mockQuotes.getVendedorSeguimientoQuotes.mockReset().mockResolvedValue({
      data: [buildRow()],
      error: null,
    });
    mockQuotes.getQuoteCalculation.mockReset().mockResolvedValue(null);
    mockQuotes.getSellerQuoteNoteCounts
      .mockReset()
      .mockResolvedValue({ data: { '1': 1 }, error: null });
    mockNotes.getNotes.mockReset().mockResolvedValue({ data: [], error: null });
    mockNotes.createNote.mockReset().mockResolvedValue({ error: null });
    mockNotes.updateOwnNote.mockReset().mockResolvedValue({ error: null });
    mockNotes.deleteOwnNote.mockReset().mockResolvedValue({ error: null });
    mockMateriales.get.mockReset().mockImplementation(async () => ({
      clave: 'guia',
      modo: 'pdf',
      titulo: 'Guía Automática',
      descripcion: '',
      contenido: '',
      url: '',
      actualizado_at: null,
    }));
    mockMateriales.getPdfSignedUrl.mockReset().mockResolvedValue({
      url: 'https://signed.example/guia.pdf',
      error: null,
    });
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
        { provide: NotesService, useValue: mockNotes },
        { provide: MaterialesService, useValue: mockMateriales },
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

  it('should show the date without time and align detail before the notes counter', () => {
    const root: HTMLElement = fixture.nativeElement;
    const stages = root.querySelectorAll('.etapa-chip');
    const stageButtons = root.querySelectorAll('.td-etapa button');
    const actions = root.querySelectorAll('.quote-row-action');
    const legend = root.querySelector('.table-legend') as HTMLElement;

    expect(stages.length).toBe(8);
    expect(stageButtons.length).toBe(0);
    expect(root.querySelector('.celda-hora')).toBeFalsy();
    expect(actions.length).toBe(2);
    expect(actions[0].classList.contains('quote-row-action-detail')).toBe(true);
    expect(actions[0].getAttribute('title')).toBe('Ver cotización');
    expect(actions[0].textContent?.trim()).toBe('');
    expect(actions[1].classList.contains('quote-row-action-notes')).toBe(true);
    expect(actions[1].textContent).toContain('1');
    expect(actions[1].textContent).toContain('nota');
    expect(legend.textContent).toContain('Ver cotización');
    expect(legend.textContent).toContain('0 notas');
    expect(legend.textContent).toContain('Pon y revisa notas de seguimiento');
    expect(legend.textContent).toContain('* Las etapas se actualizan por GoLease');
    expect(legend.textContent).not.toContain('Etapa completada');
    expect(legend.textContent).not.toContain('Etapa pendiente');
    expect(root.querySelector('.td-acciones')).toBeFalsy();
    expect(root.querySelector('.btn-duplicate')).toBeFalsy();
    expect(root.querySelector('.btn-edit-quote')).toBeFalsy();
    expect(root.querySelector('.btn-eliminar')).toBeFalsy();
    expect(root.textContent).toContain('EXPEDIENTE');
    expect(root.textContent).toContain('PLACAS');
  });

  it('should show the three help buttons only for the seller role', () => {
    const root: HTMLElement = fixture.nativeElement;
    const botones = root.querySelectorAll('.header-actions .btn-guia');

    expect(botones.length).toBe(3);
    expect(botones[0].textContent).toContain('Guía Autométrica');
    expect(botones[1].textContent).toContain('Pre Solicitud Persona Física');
    expect(botones[2].textContent).toContain('Pre Solicitud Persona Moral');
  });

  it('should hide the help buttons for admin roles', () => {
    profileSignal.set({ role: 'super_admin' });
    mockAuth.isAdmin.mockReturnValue(true);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.header-actions .btn-guia').length).toBe(0);
  });

  it('should open the signed guide PDF for the seller', async () => {
    const abrir = vi.spyOn(window, 'open').mockReturnValue(null);
    const navegar = vi.spyOn(TestBed.inject(Router), 'navigate');

    await component.abrirGuia();

    expect(mockMateriales.get).toHaveBeenCalledWith('guia');
    expect(mockMateriales.getPdfSignedUrl).toHaveBeenCalledWith('guia');
    expect(abrir).toHaveBeenCalledWith('https://signed.example/guia.pdf', '_blank', 'noopener');
    expect(navegar).not.toHaveBeenCalled();
    abrir.mockRestore();
  });

  it('should warn the seller when the guide has not been uploaded', async () => {
    mockMateriales.getPdfSignedUrl.mockResolvedValue({ url: null, error: { message: 'no existe' } });

    await component.abrirGuia();

    expect(mockToast.error).toHaveBeenCalledWith('El asesor aún no ha cargado la guía automática.');
  });

  it('should send the seller to the material page when the guide is not a PDF', async () => {
    mockMateriales.get.mockResolvedValue({
      clave: 'guia',
      modo: 'contenido',
      titulo: 'Guía Automática',
      descripcion: '',
      contenido: 'texto',
      url: '',
      actualizado_at: null,
    });
    const navegar = vi.spyOn(TestBed.inject(Router), 'navigate');
    const abrir = vi.spyOn(window, 'open').mockReturnValue(null);

    await component.abrirGuia();

    expect(navegar).toHaveBeenCalledWith(['/material/guia']);
    expect(abrir).not.toHaveBeenCalled();
    abrir.mockRestore();
  });

  it('should navigate to the pre solicitud material pages', () => {
    const navegar = vi.spyOn(TestBed.inject(Router), 'navigate');

    component.abrirMaterial('pre_fisica');
    expect(navegar).toHaveBeenCalledWith(['/material', 'pre_fisica']);

    component.abrirMaterial('pre_moral');
    expect(navegar).toHaveBeenCalledWith(['/material', 'pre_moral']);
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

  it('should show the vehicle name in Activo before the advisor free text', () => {
    const conVehiculo = buildRow({
      brand: 'CHEVROLET',
      model: 'EXPRESS VAN CARGO SL',
      year: 2026,
      activo_texto: 'Flotilla GoLease',
    });

    expect(component.getActivo(conVehiculo)).toBe('CHEVROLET EXPRESS VAN CARGO SL 2026');

    const soloTextoLibre = buildRow({
      brand: '',
      model: '',
      year: 0,
      activo_texto: 'Vehículo sin capturar',
    });

    expect(component.getActivo(soloTextoLibre)).toBe('Vehículo sin capturar');
  });

  it('should render the complete vehicle name in Activo', () => {
    const activoCompleto = 'HILUX DOUBLE CAB SPORT ADVENTURE 2026';
    component.cotizaciones.set([
      buildRow({
        brand: 'HILUX',
        model: 'DOUBLE CAB SPORT ADVENTURE',
        year: 2026,
      }),
    ]);
    fixture.detectChanges();

    const cell: HTMLElement = fixture.nativeElement.querySelector('.td-activo');

    expect(cell.textContent?.trim()).toBe(activoCompleto);
    expect(cell.getAttribute('title')).toBe(activoCompleto);
  });

  it('should show the author name and allow the seller to administer only their own', async () => {
    const root: HTMLElement = fixture.nativeElement;
    const row = component.cotizaciones()[0];
    const advisorNote = {
      id: '3f1b9a52-0c4d-4f7e-9a11-2b6c8d5e4f30',
      entidad_tipo: 'quote' as const,
      entidad_id: '1',
      texto: 'Pendiente de análisis de riesgo',
      creado_por: 'advisor-1',
      created_at: '2026-09-22T10:00:00.000Z',
      autor_nombre: 'César González',
      autor_rol: 'socio' as const,
      es_propia: false,
    };
    const ownNote = {
      id: '8c2d0e11-77aa-4b1c-8e02-51d9f0a3b6c4',
      entidad_tipo: 'quote' as const,
      entidad_id: '1',
      texto: 'El cliente prefiere visitar el sábado',
      creado_por: 'seller-1',
      created_at: '2026-09-23T10:00:00.000Z',
      autor_nombre: 'Ana Vendedora',
      autor_rol: 'seller' as const,
      es_propia: true,
    };
    mockNotes.getNotes.mockResolvedValue({ data: [ownNote, advisorNote], error: null });

    await component.abrirNotas(row);
    fixture.detectChanges();

    const items = root.querySelectorAll('.nota-item');
    const authors = root.querySelectorAll('.nota-autor');
    expect(mockNotes.getNotes).toHaveBeenCalledWith('quote', row.id);
    expect(items.length).toBe(2);
    expect(authors[0].textContent?.trim()).toBe('Ana Vendedora');
    expect(authors[1].textContent?.trim()).toBe('César González');
    expect(items[0].querySelectorAll('.nota-action').length).toBe(2);
    expect(items[1].querySelectorAll('.nota-action').length).toBe(0);
    expect(root.textContent).not.toContain('Tú');
    expect(root.textContent).not.toContain('Asesor');
    expect(component.getNotasCount(row)).toBe(2);

    // Orden de la fila: fecha -> autor -> acciones dentro de .nota-meta
    const meta = authors[0].closest('.nota-meta') as HTMLElement;
    expect(meta).toBeTruthy();
    const order = Array.from(meta.children).map((el) => el.className);
    expect(order[0]).toContain('nota-fecha');
    expect(order[1]).toContain('nota-autor');
    expect(order[2]).toContain('nota-acciones');

    component.editarNota(advisorNote);
    expect(component.notaEditando()).toBeNull();

    component.editarNota(ownNote);
    component.notaText = 'El cliente prefiere visitar el sábado';
    await component.guardarNota();
    expect(mockNotes.updateOwnNote).toHaveBeenCalledWith(
      ownNote.id,
      'El cliente prefiere visitar el sábado',
    );

    component.pedirEliminarNota(advisorNote);
    expect(component.showNotaConfirmModal()).toBe(false);
    component.pedirEliminarNota(ownNote);
    expect(component.showNotaConfirmModal()).toBe(true);
    await component.confirmarEliminarNota();
    expect(mockNotes.deleteOwnNote).toHaveBeenCalledWith(ownNote.id);
  });

  it('should create a seller note and refresh the modal and counter', async () => {
    const row = component.cotizaciones()[0];
    const notas: any[] = [];
    mockNotes.getNotes.mockImplementation(async () => ({ data: [...notas], error: null }));
    mockNotes.createNote.mockImplementation(async () => {
      notas.push({
        id: 'd4e5f6a7-9999-8888-7777-666655554444',
        entidad_tipo: 'quote',
        entidad_id: '1',
        texto: 'Ya confirmé la cita',
        creado_por: 'seller-1',
        created_at: '2026-09-24T10:00:00.000Z',
        autor_nombre: 'Ana Vendedora',
        autor_rol: 'seller',
        es_propia: true,
      });
      return { error: null };
    });

    await component.abrirNotas(row);
    component.notaText = '  Ya confirmé la cita  ';
    await component.guardarNota();

    expect(mockNotes.createNote).toHaveBeenCalledWith('quote', row.id, 'Ya confirmé la cita');
    expect(component.notasCotizacion().length).toBe(1);
    expect(component.getNotasCount(row)).toBe(1);
    expect(component.notaText).toBe('');
    expect(mockToast.success).toHaveBeenCalledWith('Nota agregada correctamente');
  });
});
