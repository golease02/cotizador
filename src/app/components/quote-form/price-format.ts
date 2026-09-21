/**
 * Formato de moneda del cotizador: **coma para miles y punto para centavos**
 * (ej. 795790.5 -> "795,790.5"). Acepta números o cadenas con basura ($, MXN,
 * espacios) porque también se usa para normalizar lo que llega del formulario.
 */
export function formatPrice(value: number | string): string {
  const s = String(value ?? '').trim();
  if (!s) {
    return '';
  }
  // La coma ya no es separador decimal: se descarta cualquier agrupación previa.
  const normalized = s.replace(/,/g, '');
  const [intPart, ...rest] = normalized.split('.');
  const intDigits = intPart.replace(/\D/g, '');
  const decDigits = rest.join('').replace(/\D/g, '');
  if (!intDigits && !decDigits) {
    return '';
  }
  const grouped = intDigits.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return decDigits ? `${grouped || '0'}.${decDigits}` : grouped;
}

export interface ParsedPriceInput {
  /** Texto ya formateado que debe mostrarse en el input. */
  display: string;
  /** Valor numérico capturado; null cuando todavía no hay dígitos. */
  value: number | null;
}

/**
 * Normaliza lo tecleado o pegado en un campo de precio:
 * - La coma agrupa miles y el punto separa centavos ("795,790.00").
 * - Si vienen ambos separadores, el último es el decimal, por lo que también
 *   entiende valores pegados con el convenio viejo ("969.900,00").
 * - Ignora símbolos, letras y espacios ($, MXN, etc.).
 */
export function parsePriceInput(raw: string): ParsedPriceInput {
  const cleaned = String(raw ?? '').replace(/[^\d.,]/g, '');
  const lastDot = cleaned.lastIndexOf('.');
  const lastComma = cleaned.lastIndexOf(',');

  let decimalSepIdx = -1;
  if (lastDot !== -1 && lastComma !== -1) {
    decimalSepIdx = Math.max(lastDot, lastComma);
  } else if (lastDot !== -1) {
    decimalSepIdx = lastDot;
  }
  // Solo comas (agrupación de miles) => todavía no hay centavos capturados.

  const intDigits = (decimalSepIdx !== -1 ? cleaned.slice(0, decimalSepIdx) : cleaned).replace(
    /[.,]/g,
    '',
  );
  const decDigits = decimalSepIdx !== -1 ? cleaned.slice(decimalSepIdx + 1).replace(/\D/g, '') : '';
  const groupedInt = intDigits.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const display = groupedInt + (decimalSepIdx !== -1 ? '.' + decDigits : '');

  if (!intDigits && !decDigits) {
    return { display, value: null };
  }
  return {
    display,
    value: Number(decDigits ? `${intDigits || '0'}.${decDigits}` : intDigits),
  };
}
