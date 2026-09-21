import { describe, expect, it } from 'vitest';
import { formatPrice, parsePriceInput } from './price-format';

describe('formatPrice', () => {
  it('should group thousands with commas when the value is an integer', () => {
    expect(formatPrice(795790)).toBe('795,790');
  });

  it('should keep cents separated by a dot when the value has decimals', () => {
    expect(formatPrice('795790.5')).toBe('795,790.5');
  });

  it('should normalise values that arrive with currency symbols or commas', () => {
    expect(formatPrice('$ 969,900.00')).toBe('969,900.00');
  });

  it('should return an empty string when there are no digits', () => {
    expect(formatPrice('')).toBe('');
    expect(formatPrice('abc')).toBe('');
  });
});

describe('parsePriceInput', () => {
  it('should auto-format thousands with commas when only digits are typed', () => {
    expect(parsePriceInput('795790')).toEqual({ display: '795,790', value: 795790 });
  });

  it('should keep the dot as decimal separator while typing cents', () => {
    expect(parsePriceInput('795,790.0')).toEqual({ display: '795,790.0', value: 795790 });
  });

  it('should ignore currency symbols and spaces from pasted text', () => {
    expect(parsePriceInput('$ 795,790.00')).toEqual({ display: '795,790.00', value: 795790 });
  });

  it('should understand pasted values that still use the old dot-comma convention', () => {
    expect(parsePriceInput('969.900,00')).toEqual({ display: '969,900.00', value: 969900 });
  });

  it('should return a null value while the field has no digits', () => {
    expect(parsePriceInput('')).toEqual({ display: '', value: null });
    expect(parsePriceInput('$ ')).toEqual({ display: '', value: null });
  });
});
