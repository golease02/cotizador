/**
 * Regla única de "última actividad" y antigüedad de una cotización.
 *
 * PROBLEMA QUE RESUELVE
 * Hasta ahora los días se medían siempre desde `created_at`, así que revisar
 * una cotización (o moverla de etapa, o cerrarla, o escribirle una nota) NO
 * reiniciaba el contador: seguía acumulando antigüedad y terminaba marcada
 * como "por caducar" aunque estuviera atendida.
 *
 * REGLA
 *   ultimaActividad = max(created_at, last_reviewed_at, updated_at del
 *                         seguimiento, etapas completadas, fecha_cierre,
 *                         última nota)
 *
 * Umbrales ÚNICOS para toda la app (antes convivían 8/16 en el Seguimiento y
 * 2/7 en el dashboard, dando mensajes contradictorios):
 *   < 8 días  → verde    (reciente, nadie tiene que hacer nada)
 *   8–15 días → amarillo (por caducar)
 *   ≥ 16 días → rojo     (caducada por falta de seguimiento)
 *
 * Espejo en TypeScript de `public.quote_last_activity()` (migración
 * `20260924010000_quote_activity.sql`) y de la purga automática
 * (`20260922020000_quotes_auto_cleanup.sql`): si cambia una, cambia la otra.
 */

/** Días sin actividad a partir de los cuales la cotización está "por caducar". */
export const ACTIVITY_AMARILLO_DIAS = 8;
/** Días sin actividad a partir de los cuales la cotización está "caducada". */
export const ACTIVITY_ROJO_DIAS = 16;

/** Semáforo de actividad (mismo vocabulario que el aging del Seguimiento). */
export type ActivityLevel = 'verde' | 'amarillo' | 'rojo';

/** Buckets históricos del dashboard y del rendimiento por vendedor. */
export type QuoteColor = 'reciente' | 'amarillo' | 'rojo' | 'verde';

/** Fechas candidatas a "última actividad" (todas opcionales salvo la creación). */
export interface ActivitySources {
  /** `quotes.created_at`. */
  createdAt: Date | string | number;
  /** `quotes.last_reviewed_at` (se sella al revisar). */
  lastReviewedAt?: Date | string | number | null;
  /** `quote_seguimiento.updated_at`. */
  seguimientoUpdatedAt?: Date | string | number | null;
  /** `quote_seguimiento.etapas` (valor = ISO de completado). */
  etapas?: Record<string, string> | null;
  /** `quote_seguimiento.fecha_cierre`. */
  fechaCierre?: Date | string | number | null;
  /** `max(notas.created_at)` de las notas de esta cotización. */
  lastNoteAt?: Date | string | number | null;
}

/** Normaliza a milisegundos; `null` si la fecha no es válida. */
function toMs(value: Date | string | number | null | undefined): number | null {
  if (value === null || value === undefined || value === '') return null;
  const ms = value instanceof Date ? value.getTime() : new Date(value).getTime();
  return Number.isFinite(ms) ? ms : null;
}

/**
 * Fecha de la última actividad registrada sobre la cotización.
 * Si ninguna fuente aporta una fecha válida devuelve `createdAt`.
 */
export function resolveLastActivity(sources: ActivitySources): Date {
  let max = toMs(sources.createdAt) ?? 0;

  const candidatas: (Date | string | number | null | undefined)[] = [
    sources.lastReviewedAt,
    sources.seguimientoUpdatedAt,
    sources.fechaCierre,
    sources.lastNoteAt,
    ...Object.values(sources.etapas ?? {}),
  ];
  for (const candidata of candidatas) {
    const ms = toMs(candidata);
    if (ms !== null && ms > max) max = ms;
  }

  return new Date(max);
}

/** Días completos transcurridos desde la última actividad (nunca negativos). */
export function diasSinActividad(sources: ActivitySources, now: Date = new Date()): number {
  const ms = resolveLastActivity(sources).getTime();
  return Math.max(0, Math.floor((now.getTime() - ms) / 86_400_000));
}

/** Semáforo de actividad por días sin actividad. */
export function nivelActividad(dias: number): ActivityLevel {
  if (dias >= ACTIVITY_ROJO_DIAS) return 'rojo';
  if (dias >= ACTIVITY_AMARILLO_DIAS) return 'amarillo';
  return 'verde';
}

/**
 * Color de la cotización con las MISMAS reglas en toda la app.
 *
 * Precedencia:
 *   1. negocio entregado (`fechaCierre`) → `verde` (ya no requiere seguimiento)
 *   2. revisada y aún no caducada (menos de `ACTIVITY_ROJO_DIAS`) → `verde`
 *   3. sin actividad ≥ 16 días → `rojo`  (vuelve a requerir atención aunque
 *      se haya revisado alguna vez: nadie le dio seguimiento en 16 días)
 *   4. sin actividad 8–15 días → `amarillo` (por caducar)
 *   5. resto → `reciente`
 */
export function computeActivityColor(
  sources: ActivitySources & { revisada?: boolean | null },
  now: Date = new Date()
): QuoteColor {
  if (sources.fechaCierre) return 'verde';
  const dias = diasSinActividad(sources, now);
  if (sources.revisada === true && dias < ACTIVITY_ROJO_DIAS) return 'verde';
  if (dias >= ACTIVITY_ROJO_DIAS) return 'rojo';
  if (dias >= ACTIVITY_AMARILLO_DIAS) return 'amarillo';
  return 'reciente';
}

/** Etiqueta corta del contador: "Hoy", "Ayer" o "Hace N días". */
export function etiquetaDias(dias: number): string {
  if (dias <= 0) return 'Hoy';
  if (dias === 1) return 'Ayer';
  return `Hace ${dias} días`;
}

/** Fecha legible dd/mm/aaaa de la última actividad. */
export function formatUltimaActividad(
  sources: ActivitySources,
  now: Date = new Date()
): string {
  return resolveLastActivity(sources).toLocaleDateString('es-MX', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}
