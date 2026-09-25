import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';

import {
  MATERIALES_BUCKET,
  MATERIALES_MAX_BYTES,
  MATERIAL_PDF_PATH,
  MaterialesService,
} from './materiales.service';
import { AuthService } from './auth.service';
import { getSupabaseClient } from './supabase-client';

describe('MaterialesService', () => {
  const client = getSupabaseClient();
  const profileSignal = signal<any>({ role: 'super_admin', permisos: {} });
  let service: MaterialesService;

  const storageFrom = (result: any) => {
    const bucket: any = {
      list: vi.fn().mockResolvedValue(result.list ?? { data: [], error: null }),
      createSignedUrl: vi.fn().mockResolvedValue(result.signed ?? { data: null, error: null }),
      upload: vi.fn().mockResolvedValue(result.upload ?? { error: null }),
      remove: vi.fn().mockResolvedValue(result.remove ?? { error: null }),
    };
    vi.spyOn(client.storage, 'from').mockReturnValue(bucket as any);
    return bucket;
  };

  beforeEach(() => {
    profileSignal.set({ role: 'super_admin', permisos: {} });
    TestBed.configureTestingModule({
      providers: [{ provide: AuthService, useValue: { currentProfile: profileSignal.asReadonly() } }],
    });
    service = TestBed.inject(MaterialesService);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
  });

  it('should follow the guias permission rules', () => {
    expect(service.canManage()).toBe(true);

    profileSignal.set({ role: 'socio', permisos: { guias: true } });
    expect(service.canManage()).toBe(true);

    profileSignal.set({ role: 'socio', permisos: { guias: false } });
    expect(service.canManage()).toBe(false);

    profileSignal.set({ role: 'seller' });
    expect(service.canManage()).toBe(false);

    profileSignal.set(null);
    expect(service.canManage()).toBe(false);
  });

  it('should return defaults for the three materials when the table is empty', async () => {
    vi.spyOn(client, 'from').mockReturnValue({
      select: vi.fn().mockResolvedValue({ data: [], error: null }),
    } as any);

    const config = await service.getAll();

    expect(Object.keys(config).sort()).toEqual(['guia', 'pre_fisica', 'pre_moral']);
    expect(config.guia.modo).toBe('pdf');
    expect(config.pre_fisica.titulo).toBe('Pre Solicitud Persona Física');
    expect(config.pre_moral.titulo).toBe('Pre Solicitud Persona Moral');
  });

  it('should map the rows returned by the table', async () => {
    vi.spyOn(client, 'from').mockReturnValue({
      select: vi.fn().mockResolvedValue({
        data: [
          {
            clave: 'pre_moral',
            modo: 'url',
            titulo: 'Trámite moral',
            descripcion: 'Desc',
            contenido: '',
            url: 'https://ejemplo.com',
            actualizado_at: '2026-09-26T10:00:00.000Z',
          },
        ],
        error: null,
      }),
    } as any);

    const config = await service.getAll();

    expect(config.pre_moral.modo).toBe('url');
    expect(config.pre_moral.url).toBe('https://ejemplo.com');
    // Los no recibidos conservan el valor por defecto.
    expect(config.guia.modo).toBe('pdf');
  });

  it('should ignore unknown keys coming from the table', async () => {
    vi.spyOn(client, 'from').mockReturnValue({
      select: vi.fn().mockResolvedValue({
        data: [{ clave: 'inventado', modo: 'url' }],
        error: null,
      }),
    } as any);

    const config = await service.getAll();

    expect((config as Record<string, unknown>)['inventado']).toBeUndefined();
    expect(config.guia.modo).toBe('pdf');
  });

  it('should upsert the configuration with the material key', async () => {
    const upsert = vi.fn().mockResolvedValue({ error: null });
    const from = vi.spyOn(client, 'from').mockReturnValue({ upsert } as any);

    const { error } = await service.save('pre_fisica', {
      modo: 'contenido',
      titulo: '  ',
      descripcion: '  hola  ',
      contenido: 'texto',
      url: '',
    });

    expect(error).toBeNull();
    expect(from).toHaveBeenCalledWith('materiales');
    expect(upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        clave: 'pre_fisica',
        titulo: 'Pre Solicitud Persona Física',
        descripcion: 'hola',
      }),
      { onConflict: 'clave' },
    );
  });

  it('should get a single material falling back to defaults', async () => {
    const maybeSingle = vi.fn().mockResolvedValue({ data: null, error: null });
    vi.spyOn(client, 'from').mockReturnValue({
      select: vi.fn(() => ({ eq: vi.fn(() => ({ maybeSingle })) })),
    } as any);

    const config = await service.get('guia');

    expect(config.modo).toBe('pdf');
    expect(config.titulo).toBe('Guía Autométrica');
  });

  it('should detect the pdf of each material using its own path', async () => {
    storageFrom({ list: { data: [{ name: MATERIAL_PDF_PATH.guia }], error: null } });

    expect(await service.tienePdf('guia')).toBe(true);
    expect(await service.tienePdf('pre_fisica')).toBe(false);
    expect(await service.tienePdf('pre_moral')).toBe(false);
  });

  it('should return a signed url for the material pdf', async () => {
    const bucket = storageFrom({
      signed: { data: { signedUrl: 'https://signed.example/g.pdf' }, error: null },
    });

    const { url } = await service.getPdfSignedUrl('guia');

    expect(url).toBe('https://signed.example/g.pdf');
    expect(bucket.createSignedUrl).toHaveBeenCalledWith(MATERIAL_PDF_PATH.guia, 120);
    expect(client.storage.from).toHaveBeenCalledWith(MATERIALES_BUCKET);
  });

  it('should reject non pdf and oversized files before uploading', async () => {
    const bucket = storageFrom({});

    const texto = new File(['x'], 'a.txt', { type: 'text/plain' });
    expect((await service.uploadPdf('guia', texto)).error).toBeTruthy();

    const grande = new File(['x'], 'a.pdf', { type: 'application/pdf' });
    Object.defineProperty(grande, 'size', { value: MATERIALES_MAX_BYTES + 1 });
    expect((await service.uploadPdf('guia', grande)).error).toBeTruthy();

    expect(bucket.upload).not.toHaveBeenCalled();
  });

  it('should upload a valid pdf with upsert and remove it by path', async () => {
    const bucket = storageFrom({});
    const archivo = new File(['%PDF'], 'a.pdf', { type: 'application/pdf' });

    const { error } = await service.uploadPdf('pre_moral', archivo);

    expect(error).toBeNull();
    expect(bucket.upload).toHaveBeenCalledWith(
      MATERIAL_PDF_PATH.pre_moral,
      archivo,
      expect.objectContaining({ upsert: true }),
    );

    await service.removePdf('pre_moral');
    expect(bucket.remove).toHaveBeenCalledWith([MATERIAL_PDF_PATH.pre_moral]);
  });
});
