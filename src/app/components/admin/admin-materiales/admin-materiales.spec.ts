import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';

import { AdminMaterialesComponent } from './admin-materiales';
import { ClaveMaterial, MaterialesService } from '../../../services/materiales.service';
import { AuthService } from '../../../services/auth.service';
import { ToastService } from '../../../services/toast.service';

const CONFIG_BASE = {
  guia: {
    clave: 'guia' as const,
    modo: 'pdf' as const,
    titulo: 'Guía Autométrica',
    descripcion: 'Documento de guía automática.',
    contenido: '',
    url: '',
    actualizado_at: null,
  },
  pre_fisica: {
    clave: 'pre_fisica' as const,
    modo: 'contenido' as const,
    titulo: 'Pre Solicitud Persona Física',
    descripcion: 'Descripción física',
    contenido: 'Contenido físico',
    url: '',
    actualizado_at: null,
  },
  pre_moral: {
    clave: 'pre_moral' as const,
    modo: 'contenido' as const,
    titulo: 'Pre Solicitud Persona Moral',
    descripcion: 'Descripción moral',
    contenido: 'Contenido moral',
    url: '',
    actualizado_at: null,
  },
};

describe('AdminMaterialesComponent', () => {
  let fixture: ComponentFixture<AdminMaterialesComponent>;
  let component: AdminMaterialesComponent;

  const profileSignal = signal<any>({ role: 'super_admin', permisos: {} });

  const mockService = {
    canManage: vi.fn(),
    getAll: vi.fn(),
    get: vi.fn(),
    save: vi.fn(),
    tienePdf: vi.fn(),
    getPdfSignedUrl: vi.fn(),
    uploadPdf: vi.fn(),
    removePdf: vi.fn(),
  };

  const mockToast = { success: vi.fn(), error: vi.fn() };

  const crearComponente = async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [AdminMaterialesComponent],
      providers: [
        { provide: MaterialesService, useValue: mockService },
        { provide: AuthService, useValue: { currentProfile: profileSignal.asReadonly() } },
        { provide: ToastService, useValue: mockToast },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // ngOnInit carga la configuración y el estado del PDF de forma asíncrona.
    await vi.waitFor(() => expect(component.cargando()).toBe(false));
    fixture.detectChanges();
  };

  beforeEach(() => {
    profileSignal.set({ role: 'super_admin', permisos: {} });
    mockService.canManage.mockReset().mockReturnValue(true);
    mockService.getAll.mockReset().mockImplementation(async () => ({
      guia: { ...CONFIG_BASE.guia },
      pre_fisica: { ...CONFIG_BASE.pre_fisica },
      pre_moral: { ...CONFIG_BASE.pre_moral },
    }));
    mockService.get.mockReset().mockImplementation(async (clave: ClaveMaterial) => ({
      ...CONFIG_BASE[clave],
    }));
    mockService.save.mockReset().mockResolvedValue({ error: null });
    mockService.tienePdf.mockReset().mockResolvedValue(false);
    mockService.getPdfSignedUrl.mockReset().mockResolvedValue({ url: null, error: null });
    mockService.uploadPdf.mockReset().mockResolvedValue({ error: null });
    mockService.removePdf.mockReset().mockResolvedValue({ error: null });
    mockToast.success.mockReset();
    mockToast.error.mockReset();
  });

  afterEach(() => TestBed.resetTestingModule());

  it('should show the three materials as tabs starting on the guide', async () => {
    await crearComponente();

    const tabs = fixture.nativeElement.querySelectorAll('.mat-switch button');
    expect(tabs.length).toBe(3);
    expect(tabs[0].textContent).toContain('Guía Autométrica');
    expect(tabs[1].textContent).toContain('Persona Física');
    expect(tabs[2].textContent).toContain('Persona Moral');
    expect(component.activo()).toBe('guia');
    expect(component.modo).toBe('pdf');
  });

  it('should switch to a material and load its values', async () => {
    await crearComponente();

    await component.cambiarMaterial('pre_moral');
    fixture.detectChanges();

    expect(component.activo()).toBe('pre_moral');
    expect(component.titulo).toBe('Pre Solicitud Persona Moral');
    expect(component.contenido).toBe('Contenido moral');
  });

  it('should offer the three modes for every material', async () => {
    await crearComponente();

    const modos = fixture.nativeElement.querySelectorAll('.mat-mode');
    expect(modos.length).toBe(3);

    component.cambiarModo('url');
    expect(component.modo).toBe('url');
    // Cambiar de modo no borra los demás campos.
    expect(component.contenido).toBe('');
  });

  it('should detect unsaved changes and allow discarding them', async () => {
    await crearComponente();

    expect(component.hayCambios).toBe(false);
    component.titulo = 'Otro título';
    expect(component.hayCambios).toBe(true);

    component.descartar();
    expect(component.titulo).toBe('Guía Autométrica');
    expect(component.hayCambios).toBe(false);
  });

  it('should save the active material', async () => {
    await crearComponente();
    await component.cambiarMaterial('pre_fisica');
    component.contenido = '  Requisitos  ';

    await component.guardar();

    expect(mockService.save).toHaveBeenCalledWith('pre_fisica', {
      modo: 'contenido',
      titulo: 'Pre Solicitud Persona Física',
      descripcion: 'Descripción física',
      contenido: '  Requisitos  ',
      url: '',
    });
    expect(mockToast.success).toHaveBeenCalledWith('Material guardado correctamente');
  });

  it('should reject an external url without http scheme', async () => {
    await crearComponente();
    component.cambiarModo('url');
    component.url = 'ejemplo.com';

    await component.guardar();

    expect(mockService.save).not.toHaveBeenCalled();
    expect(component.error()).toContain('http://');
  });

  it('should surface a save error', async () => {
    mockService.save.mockResolvedValue({ error: { message: 'violación de RLS' } });
    await crearComponente();

    await component.guardar();

    expect(component.error()).toContain('violación de RLS');
    expect(mockToast.error).toHaveBeenCalledWith('No se pudo guardar el material');
  });

  it('should show the empty pdf state when no file is uploaded', async () => {
    await crearComponente();

    expect(component.modo).toBe('pdf');
    expect(component.tienePdf()).toBe(false);
    expect(fixture.nativeElement.textContent).toContain('Sin PDF');
    expect(fixture.nativeElement.querySelector('iframe')).toBeFalsy();
  });

  it('should preview the pdf of the active material', async () => {
    mockService.tienePdf.mockResolvedValue(true);
    mockService.getPdfSignedUrl.mockResolvedValue({
      url: 'https://signed.example/g.pdf',
      error: null,
    });

    await crearComponente();

    const iframe = fixture.nativeElement.querySelector('iframe') as HTMLIFrameElement | null;
    expect(iframe).toBeTruthy();
    expect(iframe!.getAttribute('src')).toContain('signed.example');
  });

  it('should upload a pdf for the active material', async () => {
    await crearComponente();

    const input = fixture.nativeElement.querySelector('.mat-file input') as HTMLInputElement;
    const archivo = new File(['%PDF'], 'g.pdf', { type: 'application/pdf' });
    Object.defineProperty(input, 'files', { value: [archivo] });

    await component.onFileSelected({ target: input } as unknown as Event);

    expect(mockService.uploadPdf).toHaveBeenCalledWith('guia', archivo);
    expect(mockToast.success).toHaveBeenCalledWith('PDF cargado correctamente');
  });

  it('should remove the pdf of the active material', async () => {
    mockService.tienePdf.mockResolvedValue(true);
    await crearComponente();

    await component.eliminarPdf();

    expect(mockService.removePdf).toHaveBeenCalledWith('guia');
    expect(mockToast.success).toHaveBeenCalledWith('PDF eliminado');
  });

  it('should hide editing controls without the guias permission', async () => {
    mockService.canManage.mockReturnValue(false);

    await crearComponente();

    expect(fixture.nativeElement.querySelector('.mat-actions')).toBeFalsy();
    expect(fixture.nativeElement.textContent).toContain('no tiene el permiso');
  });
});
