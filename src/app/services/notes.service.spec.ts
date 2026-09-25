import type { User } from '@supabase/supabase-js';
import { NotesService } from './notes.service';
import { getSupabaseClient, resetSessionReady, setSessionUser } from './supabase-client';

describe('NotesService', () => {
  const client = getSupabaseClient();
  let service: NotesService;

  beforeEach(() => {
    resetSessionReady();
    setSessionUser({ id: 'user-1' } as User);
    service = new NotesService();
  });

  afterEach(() => {
    resetSessionReady();
    vi.restoreAllMocks();
  });

  it('should list notes with the author resolved by the database', async () => {
    const rpc = vi.spyOn(client, 'rpc').mockResolvedValue({
      data: [
        {
          id: '3f1b9a52-0c4d-4f7e-9a11-2b6c8d5e4f30',
          entidad_tipo: 'quote',
          entidad_id: '42',
          texto: 'Pendiente de documentos',
          creado_por: 'user-1',
          created_at: '2026-09-25T10:00:00.000Z',
          autor_nombre: 'César González',
          autor_rol: 'socio',
          es_propia: true,
        },
        {
          id: '8c2d0e11-77aa-4b1c-8e02-51d9f0a3b6c4',
          entidad_tipo: 'quote',
          entidad_id: '42',
          texto: 'Cliente llamar mañana',
          creado_por: 'user-2',
          created_at: '2026-09-24T10:00:00.000Z',
          autor_nombre: 'Ana Vendedora',
          autor_rol: 'seller',
          es_propia: false,
        },
      ],
      error: null,
    } as any);

    const { data, error } = await service.getNotes('quote', 42);

    expect(error).toBeNull();
    expect(rpc).toHaveBeenCalledWith('get_entity_notes', {
      p_entidad_tipo: 'quote',
      p_entidad_id: '42',
    });
    expect(data[0].autor_nombre).toBe('César González');
    expect(data[0].es_propia).toBe(true);
    expect(data[1].es_propia).toBe(false);
  });

  it('should fall back to a readable author when the profile is missing', async () => {
    vi.spyOn(client, 'rpc').mockResolvedValue({
      data: [
        {
          id: 'a1b2c3d4-1111-2222-3333-444455556666',
          entidad_tipo: 'seller',
          entidad_id: 'seller-1',
          texto: 'Nota sin perfil',
          creado_por: null,
          created_at: '2026-09-25T10:00:00.000Z',
          autor_nombre: null,
          autor_rol: null,
        },
      ],
      error: null,
    } as any);

    const { data } = await service.getNotes('seller', 'seller-1');

    expect(data[0].autor_nombre).toBe('Autor no disponible');
    expect(data[0].es_propia).toBe(false);
  });

  it('should create, update and delete notes through the ownership RPCs', async () => {
    const rpc = vi.spyOn(client, 'rpc').mockResolvedValue({ data: 9, error: null } as any);
    const noteId = '3f1b9a52-0c4d-4f7e-9a11-2b6c8d5e4f30';

    await service.createNote('seller', 'seller-1', 'Nueva nota');
    await service.updateOwnNote(noteId, 'Nota editada');
    await service.deleteOwnNote(noteId);

    expect(rpc).toHaveBeenNthCalledWith(1, 'create_entity_note', {
      p_entidad_tipo: 'seller',
      p_entidad_id: 'seller-1',
      p_texto: 'Nueva nota',
    });
    expect(rpc).toHaveBeenNthCalledWith(2, 'update_own_entity_note', {
      p_note_id: noteId,
      p_texto: 'Nota editada',
    });
    expect(rpc).toHaveBeenNthCalledWith(3, 'delete_own_entity_note', { p_note_id: noteId });
  });
});
