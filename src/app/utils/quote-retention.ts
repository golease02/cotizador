/**
 * Regla de retención de cotizaciones (purga automática).
 *
 * Espejo en TypeScript de la migración
 * `20260924010000_quote_activity.sql` (que reemplaza la regla original de
 * `20260922020000_quotes_auto_cleanup.sql`):
 * toda cotización con más de `QUOTE_RETENTION_DAYS` días **desde su última
 * actividad** se elimina físicamente, salvo que esté protegida:
 *   - `fijada = true` (pin manual del admin/socio), o
 *   - con seguimiento REAL (al menos una etapa completada o fecha
 *     de cierre; la fila perezosa vacía no protege).
 * `revisada = true` NO protege, pero revisar sella `last_reviewed_at` y por
 * tanto reinicia la ventana de retención.
 *
 * La última actividad se resuelve con `utils/quote-activity.ts` (misma regla
 * que el semáforo "días sin actividad").
 */

import { resolveLastActivity } from './quote-activity';

/** Días de retención desde la última actividad antes de la purga automática. */
export const QUOTE_RETENTION_DAYS = 15;

/** Entrada mínima necesaria para evaluar la retención de una cotización. */
export interface RetentionQuoteLike {
  created_at: Date | string | number;
  fijada?: boolean | null;
  /** `quotes.last_reviewed_at`: revisar reinicia la ventana de retención. */
  last_reviewed_at?: Date | string | number | null;
}

/** Seguimiento asociado a una cotización (fila de `quote_seguimiento`). */
export interface RetentionSeguimientoLike {
  /** Etapas completadas (JSONB `etapas`); `{}` = fila perezosa sin trabajo real. */
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
 * se queda con `created_at` / `last_reviewed_at` y la purga SQL puede
 * posponerse más (la SQL también mira etapas, cierre y notas).
 */
export function ultimaActividadPurga(
  quote: RetentionQuoteLike,
  seguimiento?: RetentionSeguimientoLike | null
): Date {
  return resolveLastActivity({
    createdAt: quote.created_at,
    lastReviewedAt: quote.last_reviewed_at,
    seguimientoUpdatedAt: seguimiento?.updated_at,
    etapas: seguimiento?.etapas,
    fechaCierre: seguimiento?.fecha_cierre,
  });
}

/** Fecha de purga programada de una cotización (última actividad + retención). */
export function computePurgeDate(
  quote: RetentionQuoteLike,
  seguimiento?: RetentionSeguimientoLike | null,
  retentionDays: number = QUOTE_RETENTION_DAYS
): Date {
  const base = ultimaActividadPurga(quote, seguimiento);
  return new Date(base.getTime() + retentionDays * 24 * 60 * 60 * 1000);
}

/** Indica si la fila de seguimiento cuenta como seguimiento REAL. */
export function hasRealSeguimiento(seg: RetentionSeguimientoLike | null | undefined): boolean {
  if (!seg) return false;
  const etapas = seg.etapas ?? {};
  return Object.keys(etapas).length > 0 || seg.fecha_cierre != null;
}

/**
 * Determina si una cotización será eliminada por la purga automática.
 * Replica la condición SQL: antigüedad + sin fijar + sin seguimiento real.
 */
export function willAutoDelete(
  quote: RetentionQuoteLike,
  seguimiento: RetentionSeguimientoLike | null | undefined,
  now: Date = new Date()
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
  seguimiento?: RetentionSeguimientoLike | null
): string {
  return computePurgeDate(quote, seguimiento).toLocaleDateString('es-MX', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}
