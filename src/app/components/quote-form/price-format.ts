/**
 * Formatea un valor numérico con los separadores solicitados:
 * - Miles separados por puntos (.) -> 969.900
 * - Decimales separados por coma (,) -> 969.900,50
 * Acepta number o string numérico (p. ej. "969900.5").
 */
export function formatPrice(value: number | string): string {
  const s = String(value).trim();
  if (!s) {
    return '';
  }
  const normalized = s.replace(',', '.');
  const [intPart, decPart] = normalized.split('.');
  const intDigits = intPart.replace(/\D/g, '');
  const decDigits = decPart ? decPart.replace(/\D/g, '') : '';
  if (!intDigits && !decDigits) {
    return '';
  }
  const grouped = intDigits.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return decDigits ? `${grouped},${decDigits}` : grouped;
}