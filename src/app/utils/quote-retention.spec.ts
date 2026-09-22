import {
  computePurgeDate,
  formatPurgeDate,
  hasRealSeguimiento,
  QUOTE_RETENTION_DAYS,
  willAutoDelete,
} from './quote-retention';

describe('quote-retention', () => {
  const now = new Date('2026-09-22T12:00:00Z');
  const old = '2026-09-01T12:00:00Z';
  const recent = '2026-09-15T12:00:00Z';

  it('should purge 15 days after creation', () => {
    expect(QUOTE_RETENTION_DAYS).toBe(15);
    expect(computePurgeDate(old)).toEqual(new Date('2026-09-16T12:00:00Z'));
  });

  it('should not delete young quotes', () => {
    expect(willAutoDelete({ created_at: recent }, null, now)).toBe(false);
  });

  it('should delete old quotes without protection', () => {
    expect(willAutoDelete({ created_at: old }, null, now)).toBe(true);
  });

  it('should not delete pinned quotes', () => {
    expect(willAutoDelete({ created_at: old, fijada: true }, null, now)).toBe(false);
  });

  it('should not delete quotes with real seguimiento', () => {
    expect(
      willAutoDelete({ created_at: old }, { etapas: { exp: '2026-09-10T00:00:00Z' } }, now)
    ).toBe(false);
    expect(
      willAutoDelete(
        { created_at: old },
        { etapas: { exp: '2026-09-10T00:00:00Z' }, fecha_cierre: null },
        now
      )
    ).toBe(false);
  });

  it('should delete quotes with empty seguimiento (lazy row)', () => {
    expect(willAutoDelete({ created_at: old }, { etapas: {} }, now)).toBe(true);
    expect(willAutoDelete({ created_at: old }, { etapas: {}, fecha_cierre: null }, now)).toBe(
      true
    );
  });

  it('should treat fecha_cierre as real seguimiento', () => {
    expect(
      hasRealSeguimiento({ etapas: {}, fecha_cierre: '2026-09-20T00:00:00Z' })
    ).toBe(true);
  });

  it('should format the purge date in Spanish', () => {
    expect(formatPurgeDate(old)).toBe('16/09/2026');
  });
});
