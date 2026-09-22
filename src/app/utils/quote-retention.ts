/**
 * Regla de retención de cotizaciones (purga automática).
 *
 * Espejo en TypeScript de la migración
 * `20260922020000_quotes_auto_cleanup.sql`:
 * toda cotización con más de `QUOTE_RETENTION_DAYS` días desde su
 * creación se elimina físicamente, salvo que esté protegida:
 *   - `fijada = true` (pin manual del admin/socio), o
 *   - con seguimiento REAL (al menos una etapa completada o fecha
 *     de cierre; la fila perezosa vacía no protege).
 * `revisada = true` NO protege.
 */

/** Días de retención antes de la purga automática (desde `created_at`). */
export const QUOTE_RETENTION_DAYS = 15;

/** Entrada mínima necesaria para evaluar la retención de una cotización. */
export interface RetentionQuoteLike {
  created_at: Date | string | number;
  fijada?: boolean | null;
}

/** Seguimiento asociado a una cotización (fila de `quote_seguimiento`). */
export interface RetentionSeguimientoLike {
  /** Etapas completadas (JSONB `etapas`); `{}` = fila perezosa sin trabajo real. */
  etapas?: Record<string, string> | null;
  /** Fecha de cierre del negocio (columna `fecha_cierre`). */
  fecha_cierre?: string | null;
}

/** Fecha de purga programada de una cotización (`created_at` + retención). */
export function computePurgeDate(
  from: Date | string | number,
  retentionDays: number = QUOTE_RETENTION_DAYS
): Date {
  const base = from instanceof Date ? from : new Date(from);
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
  const purgeAt = computePurgeDate(quote.created_at).getTime();
  if (purgeAt > now.getTime()) return false;
  if (quote.fijada === true) return false;
  if (hasRealSeguimiento(seguimiento)) return false;
  return true;
}

/** Fecha legible dd/mm/aaaa para los avisos de la interfaz. */
export function formatPurgeDate(from: Date | string | number): string {
  return computePurgeDate(from).toLocaleDateString('es-MX', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}
