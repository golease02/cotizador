/**
 * Regla de retención de cotizaciones (purga automática).
 *
 * Espejo en TypeScript de la migración
 * `20260924020000_quote_interaction_tracking.sql` (que actualiza la regla de
 * `20260924010000_quote_activity.sql`):
 * toda cotización con más de `QUOTE_RETENTION_DAYS` días **desde su última
 * actividad** se elimina físicamente, salvo que esté protegida:
 *   - `fijada = true` (pin manual del admin/socio), o
 *   - `quote_seguimiento.etapas.exp` con valor (Expediente marcado).
 *
 * Cualquier otra etapa, una entrega o `revisada = true` no protegen de forma
 * permanente, pero sellan su respectiva actividad y renuevan los 15 días.
 * Abrir o modificar una cotización desde Seguimiento actualiza
 * `last_interacted_at`, que también reinicia la ventana.
 */

import { resolveLastActivity } from './quote-activity';

/** Días de retención desde la última actividad antes de la purga automática. */
export const QUOTE_RETENTION_DAYS = 15;

/** Entrada mínima necesaria para evaluar la retención de una cotización. */
export interface RetentionQuoteLike {
  created_at: Date | string | number;
  fijada?: boolean | null;
  /** `quotes.last_reviewed_at`: solo cuenta si `revisada` es true. */
  last_reviewed_at?: Date | string | number | null;
  revisada?: boolean | null;
  /** Última apertura/modificación desde Seguimiento; renueva la ventana de 15 días. */
  last_interacted_at?: Date | string | number | null;
}

/** Seguimiento asociado a una cotización (fila de `quote_seguimiento`). */
export interface RetentionSeguimientoLike {
  /** Etapas (JSONB); solo `exp` protege, las demás solo renuevan actividad. */
  etapas?: Record<string, string> | null;
  /** Fecha de cierre del negocio (columna `fecha_cierre`). */
  fecha_cierre?: string | null;
  /** `quote_seguimiento.updated_at` (última edición del negocio). */
  updated_at?: string | null;
}

/**
 * Última actividad conocida por el cliente.
 *
 * NOTA: el vendedor no puede leer `quote_seguimiento`, así que su estimación
 * conoce `created_at`, `revisada/last_reviewed_at` y `last_interacted_at`, pero
 * la SQL además mira etapas, cierre y notas que el vendedor no puede consultar.
 */
export function ultimaActividadPurga(
  quote: RetentionQuoteLike,
  seguimiento?: RetentionSeguimientoLike | null,
): Date {
  const actividadSql = resolveLastActivity({
    createdAt: quote.created_at,
    lastReviewedAt: quote.revisada === true ? quote.last_reviewed_at : null,
    revisada: quote.revisada,
    seguimientoUpdatedAt: seguimiento?.updated_at,
    etapas: seguimiento?.etapas,
    fechaCierre: seguimiento?.fecha_cierre,
  });
  const interaccion = quote.last_interacted_at ? new Date(quote.last_interacted_at).getTime() : 0;
  return new Date(Math.max(actividadSql.getTime(), Number.isFinite(interaccion) ? interaccion : 0));
}

/** Fecha de purga programada de una cotización (última actividad + retención). */
export function computePurgeDate(
  quote: RetentionQuoteLike,
  seguimiento?: RetentionSeguimientoLike | null,
  retentionDays: number = QUOTE_RETENTION_DAYS,
): Date {
  const base = ultimaActividadPurga(quote, seguimiento);
  return new Date(base.getTime() + retentionDays * 24 * 60 * 60 * 1000);
}

/** Solo Expediente marcado concede la protección permanente de purga. */
export function hasRealSeguimiento(seg: RetentionSeguimientoLike | null | undefined): boolean {
  return !!seg?.etapas?.['exp'];
}

/**
 * Determina si una cotización será eliminada por la purga automática.
 * Replica la condición SQL: antigüedad + sin fijar + sin Expediente marcado.
 */
export function willAutoDelete(
  quote: RetentionQuoteLike,
  seguimiento: RetentionSeguimientoLike | null | undefined,
  now: Date = new Date(),
): boolean {
  const purgeAt = computePurgeDate(quote, seguimiento).getTime();
  if (purgeAt > now.getTime()) return false;
  if (quote.fijada === true) return false;
  if (hasRealSeguimiento(seguimiento)) return false;
  return true;
}

/**
 * Prefijo de las marcas de sesión de los avisos de retención.
 * Cada vista usa su propia clave (`mis-cotizaciones`, `admin-quotes`, …).
 */
export const RETENTION_NOTICE_PREFIX = 'golease-retention-notice-';

/**
 * Indica si el aviso de retención debe mostrarse.
 * Se muestra una sola vez por sesión de pestaña; si el almacenamiento de
 * sesión no está disponible (modo privado), se muestra siempre.
 */
export function shouldShowRetentionNotice(key: string): boolean {
  try {
    return sessionStorage.getItem(RETENTION_NOTICE_PREFIX + key) !== '1';
  } catch {
    return true;
  }
}

/** Marca el aviso de retención como ya mostrado en la sesión actual. */
export function markRetentionNoticeShown(key: string): void {
  try {
    sessionStorage.setItem(RETENTION_NOTICE_PREFIX + key, '1');
  } catch {
    // Sin almacenamiento de sesión: el aviso se repite en cada entrada.
  }
}

/** Fecha legible dd/mm/aaaa de la purga programada. */
export function formatPurgeDate(
  quote: RetentionQuoteLike,
  seguimiento?: RetentionSeguimientoLike | null,
): string {
  return computePurgeDate(quote, seguimiento).toLocaleDateString('es-MX', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}
