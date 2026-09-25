import { Injectable } from '@angular/core';
import { currentUserSignal, getSupabaseClient } from './supabase-client';

export type NoteEntityType = 'quote' | 'seller';
export type NoteAuthorRole = 'super_admin' | 'socio' | 'seller' | null;

/** Nota compartida de una cotización o de un vendedor, con su autor resuelto. */
export interface EntityNote {
  id: string;
  entidad_tipo: NoteEntityType;
  entidad_id: string;
  texto: string;
  creado_por: string | null;
  created_at: string;
  autor_nombre: string;
  autor_rol: NoteAuthorRole;
  es_propia: boolean;
}

/**
 * Acceso único a las notas de los módulos de administrador y Mis Cotizaciones.
 * La base de datos valida el alcance y que solo el autor pueda modificar o
 * eliminar una nota; este servicio conserva esa misma regla en la interfaz.
 */
@Injectable({ providedIn: 'root' })
export class NotesService {
  private client = getSupabaseClient();

  public async getNotes(
    entidadTipo: NoteEntityType,
    entidadId: string | number,
  ): Promise<{ data: EntityNote[]; error: any }> {
    const { data, error } = await this.client.rpc('get_entity_notes', {
      p_entidad_tipo: entidadTipo,
      p_entidad_id: String(entidadId),
    });

    if (error || !Array.isArray(data)) return { data: [], error };

    const userId = currentUserSignal()?.id || null;
    const notes = (data as any[]).map((row) => ({
      id: String(row.id),
      entidad_tipo: row.entidad_tipo,
      entidad_id: String(row.entidad_id),
      texto: row.texto || '',
      creado_por: row.creado_por || null,
      created_at: row.created_at,
      autor_nombre: row.autor_nombre || 'Autor no disponible',
      autor_rol: row.autor_rol || null,
      es_propia:
        typeof row.es_propia === 'boolean' ? row.es_propia : !!userId && row.creado_por === userId,
    })) as EntityNote[];

    return { data: notes, error: null };
  }

  public async createNote(
    entidadTipo: NoteEntityType,
    entidadId: string | number,
    texto: string,
  ): Promise<{ error: any }> {
    const { error } = await this.client.rpc('create_entity_note', {
      p_entidad_tipo: entidadTipo,
      p_entidad_id: String(entidadId),
      p_texto: texto,
    });
    return { error };
  }

  public async updateOwnNote(notaId: string, texto: string): Promise<{ error: any }> {
    const { error } = await this.client.rpc('update_own_entity_note', {
      p_note_id: notaId,
      p_texto: texto,
    });
    return { error };
  }

  public async deleteOwnNote(notaId: string): Promise<{ error: any }> {
    const { error } = await this.client.rpc('delete_own_entity_note', {
      p_note_id: notaId,
    });
    return { error };
  }
}
