import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { MaterialComponent } from './material';
import { ClaveMaterial, MaterialesService } from '../../../services/materiales.service';

const CONFIG: Record<ClaveMaterial, any> = {
  guia: {
    clave: 'guia',
    modo: 'pdf',
    titulo: 'Guía Automática',
    descripcion: 'Documento de guía automática.',
    contenido: '',
    url: '',
    actualizado_at: null,
  },
  pre_fisica: {
    clave: 'pre_fisica',
    modo: 'contenido',
    titulo: 'Pre Solicitud Persona Física',
    descripcion: 'Descripción física',
    contenido: 'Documento: acta de nacimiento',
    url: '',
    actualizado_at: null,
  },
  pre_moral: {
    clave: 'pre_moral',
    modo: 'contenido',
    titulo: 'Pre Solicitud Persona Moral',
    descripcion: 'Descripción moral',
    contenido: 'Documento: acta constitutiva',
    url: '',
    actualizado_at: null,
  },
};

describe('MaterialComponent', () => {
  let fixture: ComponentFixture<MaterialComponent>;

  const mockService = {
    get: vi.fn(),
    getPdfSignedUrl: vi.fn(),
  };
  let params$: BehaviorSubject<ReturnType<typeof convertToParamMap>>;

  const crear = async (clave: string): Promise<MaterialComponent> => {
    params$.next(convertToParamMap({ clave }));
    return crearComponente();
  };

  const crearComponente = async (): Promise<MaterialComponent> => {
    await TestBed.configureTestingModule({
      imports: [MaterialComponent],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: { paramMap: params$.asObservable() },
        },
        { provide: MaterialesService, useValue: mockService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    // La carga inicial (y cualquier recarga) es asíncrona.
    await vi.waitFor(() => expect(component.cargando()).toBe(false));
    fixture.detectChanges();
    return component;
  };

  beforeEach(() => {
    params$ = new BehaviorSubject(convertToParamMap({ clave: 'pre_fisica' }));
    mockService.get.mockReset().mockImplementation(async (clave: ClaveMaterial) => ({
      ...CONFIG[clave],
    }));
    mockService.getPdfSignedUrl.mockReset().mockResolvedValue({ url: null, error: null });
  });

  afterEach(() => TestBed.resetTestingModule());

  it('should render the content configured for the physical variant', async () => {
    const component = await crear('pre_fisica');
    const root: HTMLElement = fixture.nativeElement;

    expect(component.clave()).toBe('pre_fisica');
    expect(root.textContent).toContain('Pre Solicitud Persona Física');
    expect(root.textContent).toContain('Documento: acta de nacimiento');
    expect(root.textContent).not.toContain('Contenido en preparación');
  });

  it('should render the content configured for the moral variant', async () => {
    const component = await crear('pre_moral');
    const root: HTMLElement = fixture.nativeElement;

    expect(component.clave()).toBe('pre_moral');
    expect(root.textContent).toContain('Pre Solicitud Persona Moral');
    expect(root.textContent).toContain('Documento: acta constitutiva');
  });

  it('should fall back to the guide for an unknown key', async () => {
    const component = await crear('inventado');

    expect(component.clave()).toBe('guia');
    expect(mockService.get).toHaveBeenCalledWith('guia');
  });

  it('should render the external url with a target blank link', async () => {
    mockService.get.mockResolvedValue({
      ...CONFIG.pre_fisica,
      modo: 'url',
      url: 'https://ejemplo.com/tramite',
    });

    await crear('pre_fisica');
    const enlace = fixture.nativeElement.querySelector(
      'a.material-btn-primary',
    ) as HTMLAnchorElement;

    expect(enlace).toBeTruthy();
    expect(enlace.getAttribute('href')).toBe('https://ejemplo.com/tramite');
    expect(enlace.getAttribute('target')).toBe('_blank');
    expect(enlace.getAttribute('rel')).toBe('noopener');
  });

  it('should show a placeholder when the content is empty', async () => {
    mockService.get.mockResolvedValue({ ...CONFIG.pre_fisica, contenido: '' });

    await crear('pre_fisica');

    expect(fixture.nativeElement.textContent).toContain('Contenido en preparación');
  });

  it('should show a placeholder when the external url is missing', async () => {
    mockService.get.mockResolvedValue({ ...CONFIG.pre_moral, modo: 'url', url: '' });

    await crear('pre_moral');

    expect(fixture.nativeElement.textContent).toContain('Enlace no disponible');
  });

  it('should preview the pdf when the mode is pdf', async () => {
    mockService.get.mockResolvedValue({ ...CONFIG.guia, modo: 'pdf' });
    mockService.getPdfSignedUrl.mockResolvedValue({
      url: 'https://signed.example/guia.pdf',
      error: null,
    });

    await crear('guia');

    expect(mockService.getPdfSignedUrl).toHaveBeenCalledWith('guia');
    const iframe = fixture.nativeElement.querySelector('iframe') as HTMLIFrameElement | null;
    expect(iframe).toBeTruthy();
    expect(iframe!.getAttribute('src')).toContain('signed.example');
  });

  it('should not request a signed url when the mode is not pdf', async () => {
    await crear('pre_moral');

    expect(mockService.getPdfSignedUrl).not.toHaveBeenCalled();
  });

  it('should show an empty state when the pdf cannot be loaded', async () => {
    mockService.get.mockResolvedValue({ ...CONFIG.guia, modo: 'pdf' });
    mockService.getPdfSignedUrl.mockResolvedValue({
      url: null,
      error: { message: 'sin archivo' },
    });

    await crear('guia');

    expect(fixture.nativeElement.textContent).toContain('Documento no disponible');
  });

  it('should reload when the route param changes on the same route', async () => {
    await crear('pre_fisica');
    expect(fixture.nativeElement.textContent).toContain('Documento: acta de nacimiento');

    // ngOnInit no se re-dispara al cambiar el parámetro: sin el effect() de
    // `clave` el contenido quedaría congelado en el material anterior.
    params$.next(convertToParamMap({ clave: 'pre_moral' }));
    await vi.waitFor(() => expect(fixture.componentInstance.config()?.clave).toBe('pre_moral'));
    await vi.waitFor(() => expect(fixture.componentInstance.cargando()).toBe(false));
    fixture.detectChanges();

    expect(fixture.componentInstance.clave()).toBe('pre_moral');
    expect(fixture.nativeElement.textContent).toContain('Documento: acta constitutiva');
    expect(fixture.nativeElement.textContent).not.toContain('acta de nacimiento');
  });

  it('should clear the previous pdf when the material changes', async () => {
    mockService.get.mockImplementation(async (clave: ClaveMaterial) => ({
      ...CONFIG[clave],
      modo: 'pdf',
    }));
    mockService.getPdfSignedUrl.mockImplementation(async (clave: ClaveMaterial) => ({
      url: `https://signed.example/${clave}.pdf`,
      error: null,
    }));

    const comp = await crear('guia');
    await vi.waitFor(() => expect(comp.pdfUrl()).toBeTruthy());
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('iframe')).toBeTruthy();

    params$.next(convertToParamMap({ clave: 'pre_moral' }));
    await vi.waitFor(() => expect(fixture.componentInstance.config()?.clave).toBe('pre_moral'));
    await vi.waitFor(() => expect(fixture.componentInstance.cargando()).toBe(false));
    fixture.detectChanges();

    const iframe = fixture.nativeElement.querySelector('iframe') as HTMLIFrameElement;
    expect(iframe.getAttribute('src')).toContain('pre_moral.pdf');
  });
});
