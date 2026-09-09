/**
 * Utilidades de vigencia de cotizaciones.
 *
 * La hoja oficial establece: "Cotización sujeta a cambios sin previo aviso.
 * Vigencia 7 días a partir de su elaboración." Estas funciones centralizan
 * el cálculo de la fecha límite y su estado visual para mantener la misma
 * lógica en "Mis Cotizaciones" y en el cotizador.
 */

export type ValidityStatus = 'vigente' | 'proxima' | 'vencida';

/** Días de vigencia de una cotización a partir de su elaboración. */
export const VALIDITY_WINDOW_DAYS = 7;

/** Umbral (en horas) para marcar una cotización como "Por vencer". */
export const EXPIRING_SOON_HOURS = 48;

/** Calcula la fecha de vencimiento sumando la ventana de vigencia. */
export function computeValidUntil(
  from: Date | string | number,
  windowDays: number = VALIDITY_WINDOW_DAYS
): Date {
  const base = from instanceof Date ? from : new Date(from);
  return new Date(base.getTime() + windowDays * 24 * 60 * 60 * 1000);
}

/** Determina el estado de vigencia de una cotización (vencida / por vencer / vigente). */
export function getValidityStatus(
  validUntil: Date | string | null | undefined,
  now: Date = new Date()
): ValidityStatus {
  if (!validUntil) return 'vigente';
  const deadline = validUntil instanceof Date ? validUntil : new Date(validUntil);
  if (deadline.getTime() <= now.getTime()) return 'vencida';
  if (deadline.getTime() <= now.getTime() + EXPIRING_SOON_HOURS * 60 * 60 * 1000) {
    return 'proxima';
  }
  return 'vigente';
}

/** Etiqueta legible para humanos de un estado de vigencia. */
export function getValidityLabel(status: ValidityStatus): string {
  switch (status) {
    case 'vencida':
      return 'Vencida';
    case 'proxima':
      return 'Por vencer';
    default:
      return 'Vigente';
  }
}