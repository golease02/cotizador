import { Injectable, inject } from '@angular/core';
import { getSupabaseClient } from './supabase-client';
import { AuthService } from './auth.service';

/** Bucket privado compartido por los tres materiales. */
export const MATERIALES_BUCKET = 'guias';
export const MATERIALES_MAX_BYTES = 15 * 1024 * 1024;
const MATERIALES_TTL_SEGUNDOS = 120;

/** Los tres materiales administrables desde un solo panel. */
export type ClaveMaterial = 'guia' | 'pre_fisica' | 'pre_moral';
export type MaterialModo = 'pdf' | 'contenido' | 'url';

export interface MaterialConfig {
  clave: ClaveMaterial;
  modo: MaterialModo;
  titulo: string;
  descripcion: string;
  contenido: string;
  url: string;
  actualizado_at: string | null;
}

/**
 * Rutas fijas dentro del bucket. Se conservan las de la Guía Autométrica y las
 * Pre Solicitudes para no invalidar los archivos ya subidos.
 */
export const MATERIAL_PDF_PATH: Record<ClaveMaterial, string> = {
  guia: 'guia-autometrica.pdf',
  pre_fisica: 'pre-solicitud-persona-fisica.pdf',
  pre_moral: 'pre-solicitud-persona-moral.pdf',
};

/** Metadatos de presentación de cada material. */
export const MATERIALES: Array<{
  clave: ClaveMaterial;
  etiqueta: string;
  descripcionCorta: string;
  ruta: string;
}> = [
  {
    clave: 'guia',
    etiqueta: 'Guía Autométrica',
    descripcionCorta: 'Documento de consulta para el vendedor.',
    ruta: '/material/guia',
  },
  {
    clave: 'pre_fisica',
    etiqueta: 'Pre Solicitud Persona Física',
    descripcionCorta: 'Trámite de pre solicitud para personas físicas.',
    ruta: '/material/pre_fisica',
  },
  {
    clave: 'pre_moral',
    etiqueta: 'Pre Solicitud Persona Moral',
    descripcionCorta: 'Trámite de pre solicitud para personas morales.',
    ruta: '/material/pre_moral',
  },
];

const CONFIG_VACIA: Record<ClaveMaterial, MaterialConfig> = {
  guia: {
    clave: 'guia',
    modo: 'pdf',
    titulo: 'Guía Autométrica',
    descripcion: 'Documento de guía automática.',
    contenido: '',
    url: '',
    actualizado_at: null,
  },
  pre_fisica: {
    clave: 'pre_fisica',
    modo: 'contenido',
    titulo: 'Pre Solicitud Persona Física',
    descripcion: 'Formulario de pre solicitud para personas físicas.',
    contenido: '',
    url: '',
    actualizado_at: null,
  },
  pre_moral: {
    clave: 'pre_moral',
    modo: 'contenido',
    titulo: 'Pre Solicitud Persona Moral',
    descripcion: 'Formulario de pre solicitud para personas morales.',
    contenido: '',
    url: '',
    actualizado_at: null,
  },
};

const esClave = (valor: unknown): valor is ClaveMaterial =>
  valor === 'guia' || valor === 'pre_fisica' || valor === 'pre_moral';

@Injectable({ providedIn: 'root' })
export class MaterialesService {
  private client = getSupabaseClient();
  private auth = inject(AuthService);

  /** Mismas reglas que la guía: super admin siempre, socios con permiso `guias`. */
  public canManage(): boolean {
    const profile = this.auth.currentProfile();
    if (!profile) return false;
    if (profile.role === 'super_admin') return true;
    return profile.role === 'socio' && profile.permisos?.['guias'] === true;
  }

  /** Configuración por defecto (se usa si la tabla aún no responde). */
  public getDefaults(): Record<ClaveMaterial, MaterialConfig> {
    return {
      guia: { ...CONFIG_VACIA.guia },
      pre_fisica: { ...CONFIG_VACIA.pre_fisica },
      pre_moral: { ...CONFIG_VACIA.pre_moral },
    };
  }

  private table() {
    return this.client.from('materiales');
  }

  /** Carga la configuración de los tres materiales. */
  public async getAll(): Promise<Record<ClaveMaterial, MaterialConfig>> {
    const resultado = this.getDefaults();

    const { data, error } = await this.table().select('*');
    if (error || !Array.isArray(data)) return resultado;

    for (const fila of data as any[]) {
      const clave = fila.clave;
      if (!esClave(clave)) continue;
      const base = CONFIG_VACIA[clave];
      resultado[clave] = {
        clave,
        modo: (fila.modo as MaterialModo) || base.modo,
        titulo: fila.titulo || base.titulo,
        descripcion: fila.descripcion ?? base.descripcion,
        contenido: fila.contenido ?? '',
        url: fila.url ?? '',
        actualizado_at: fila.actualizado_at ?? null,
      };
    }

    return resultado;
  }

  /** Configuración de un solo material. */
  public async get(clave: ClaveMaterial): Promise<MaterialConfig> {
    const { data, error } = await this.table().select('*').eq('clave', clave).maybeSingle();
    if (error || !data) return { ...CONFIG_VACIA[clave] };
    return { ...CONFIG_VACIA[clave], ...(data as any) };
  }

  /** Guarda la configuración de un material. El servidor fija `actualizado_at`. */
  public async save(
    clave: ClaveMaterial,
    datos: Omit<MaterialConfig, 'clave' | 'actualizado_at'>,
  ): Promise<{ error: any }> {
    const payload = {
      clave,
      modo: datos.modo,
      titulo: datos.titulo?.trim() || CONFIG_VACIA[clave].titulo,
      descripcion: datos.descripcion?.trim() || '',
      contenido: datos.contenido ?? '',
      url: datos.url?.trim() || '',
    };
    const { error } = await this.table().upsert(payload, { onConflict: 'clave' });
    return { error };
  }

  /** Indica si existe el PDF del material dentro del bucket. */
  public async tienePdf(clave: ClaveMaterial): Promise<boolean> {
    const { data, error } = await this.client.storage
      .from(MATERIALES_BUCKET)
      .list('', { limit: 100 });
    if (error || !Array.isArray(data)) return false;
    return data.some((f) => f.name === MATERIAL_PDF_PATH[clave]);
  }

  /** URL firmada de corta duración para el PDF. */
  public async getPdfSignedUrl(clave: ClaveMaterial): Promise<{ url: string | null; error: any }> {
    const { data, error } = await this.client.storage
      .from(MATERIALES_BUCKET)
      .createSignedUrl(MATERIAL_PDF_PATH[clave], MATERIALES_TTL_SEGUNDOS);
    if (error) return { url: null, error };
    return { url: data?.signedUrl ?? null, error: null };
  }

  /** Sube o reemplaza el PDF del material (valida tipo y tamaño). */
  public async uploadPdf(clave: ClaveMaterial, file: File): Promise<{ error: any }> {
    if (file.type !== 'application/pdf') {
      return { error: { message: 'El archivo debe ser un PDF.' } };
    }
    if (file.size > MATERIALES_MAX_BYTES) {
      return { error: { message: 'El PDF supera el límite de 15 MB.' } };
    }
    const { error } = await this.client.storage
      .from(MATERIALES_BUCKET)
      .upload(MATERIAL_PDF_PATH[clave], file, {
        contentType: 'application/pdf',
        upsert: true,
        cacheControl: '3600',
      });
    return { error };
  }

  /** Elimina el PDF del material. */
  public async removePdf(clave: ClaveMaterial): Promise<{ error: any }> {
    const { error } = await this.client.storage
      .from(MATERIALES_BUCKET)
      .remove([MATERIAL_PDF_PATH[clave]]);
    return { error };
  }
}
