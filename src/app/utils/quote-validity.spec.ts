import {
  computeValidUntil,
  getValidityStatus,
  getValidityLabel,
  VALIDITY_WINDOW_DAYS,
} from './quote-validity';

describe('quote-validity', () => {
  const base = new Date('2026-09-09T12:00:00Z');

  it('should compute valid until 7 days after the elaboration date', () => {
    expect(computeValidUntil(base)).toEqual(new Date('2026-09-16T12:00:00Z'));
    expect(computeValidUntil('2026-09-09T12:00:00Z').getTime()).toBe(
      base.getTime() + VALIDITY_WINDOW_DAYS * 24 * 60 * 60 * 1000
    );
  });

  it('should mark a quote as expired after its deadline', () => {
    expect(getValidityStatus('2026-09-08T00:00:00Z', base)).toBe('vencida');
  });

  it('should mark a quote as "por vencer" within the 48h window', () => {
    expect(getValidityStatus('2026-09-10T00:00:00Z', base)).toBe('proxima');
  });

  it('should mark a quote as vigente when the deadline is far enough', () => {
    expect(getValidityStatus('2026-09-16T12:00:00Z', base)).toBe('vigente');
  });

  it('should treat missing validity as vigente', () => {
    expect(getValidityStatus(null, base)).toBe('vigente');
    expect(getValidityStatus(undefined, base)).toBe('vigente');
  });

  it('should return human labels', () => {
    expect(getValidityLabel('vigente')).toBe('Vigente');
    expect(getValidityLabel('proxima')).toBe('Por vencer');
    expect(getValidityLabel('vencida')).toBe('Vencida');
  });
});