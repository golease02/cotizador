import {
  computePurgeDate,
  formatPurgeDate,
  hasRealSeguimiento,
  markRetentionNoticeShown,
  QUOTE_RETENTION_DAYS,
  RETENTION_NOTICE_PREFIX,
  shouldShowRetentionNotice,
  willAutoDelete,
} from './quote-retention';

describe('quote-retention', () => {
  const now = new Date('2026-09-22T12:00:00Z');
  const old = '2026-09-01T12:00:00Z';
  const recent = '2026-09-15T12:00:00Z';

  it('should purge 15 days after the last activity', () => {
    expect(QUOTE_RETENTION_DAYS).toBe(15);
    expect(computePurgeDate({ created_at: old })).toEqual(new Date('2026-09-16T12:00:00Z'));
  });

  it('should move the purge window when the quote is reviewed or interacted with', () => {
    // Revisada el 20/09: la ventana corre 15 días desde esa actividad.
    const revisada = {
      created_at: old,
      revisada: true,
      last_reviewed_at: '2026-09-20T12:00:00Z',
    };
    expect(computePurgeDate(revisada)).toEqual(new Date('2026-10-05T12:00:00Z'));
    expect(willAutoDelete(revisada, null, now)).toBe(false);

    // Interactuar desde Seguimiento el 21/09 reinicia la ventana una vez más.
    const interactuada = {
      created_at: old,
      revisada: true,
      last_reviewed_at: '2026-09-20T12:00:00Z',
      last_interacted_at: '2026-09-21T12:00:00Z',
    };
    expect(computePurgeDate(interactuada)).toEqual(new Date('2026-10-06T12:00:00Z'));
    expect(willAutoDelete(interactuada, null, now)).toBe(false);

    // Edición del seguimiento (aunque no haya etapas completadas).
    expect(
      willAutoDelete({ created_at: old }, { etapas: {}, updated_at: '2026-09-21T00:00:00Z' }, now),
    ).toBe(false);

    // Expediente marcado protege sin importar la fecha.
    expect(
      willAutoDelete({ created_at: old }, { etapas: { exp: '2026-09-10T12:00:00Z' } }, now),
    ).toBe(false);
  });

  it('should ignore a review timestamp when revisada is false', () => {
    const falseReview = {
      created_at: old,
      revisada: false,
      last_reviewed_at: recent,
    };
    expect(computePurgeDate(falseReview)).toEqual(new Date('2026-09-16T12:00:00Z'));
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

  it('should protect permanently only when Expediente is checked', () => {
    expect(
      willAutoDelete({ created_at: old }, { etapas: { exp: '2026-09-10T12:00:00Z' } }, now),
    ).toBe(false);
    expect(hasRealSeguimiento({ etapas: { exp: '2026-09-10T12:00:00Z' } })).toBe(true);
  });

  it('should not protect permanently for another stage or fecha_cierre alone', () => {
    expect(hasRealSeguimiento({ etapas: { analisis: '2026-09-10T12:00:00Z' } })).toBe(false);
    expect(hasRealSeguimiento({ etapas: {}, fecha_cierre: '2026-09-20T12:00:00Z' })).toBe(false);
    expect(
      willAutoDelete({ created_at: old }, { etapas: { analisis: old }, fecha_cierre: null }, now),
    ).toBe(true);
  });

  it('should delete quotes with empty seguimiento (lazy row)', () => {
    expect(willAutoDelete({ created_at: old }, { etapas: {} }, now)).toBe(true);
    expect(willAutoDelete({ created_at: old }, { etapas: {}, fecha_cierre: null }, now)).toBe(true);
  });

  it('should format the purge date in Spanish', () => {
    expect(formatPurgeDate({ created_at: old })).toBe('16/09/2026');
  });

  it('should show the retention notice once per session', () => {
    const key = 'spec-view';
    sessionStorage.removeItem(RETENTION_NOTICE_PREFIX + key);

    expect(shouldShowRetentionNotice(key)).toBe(true);
    markRetentionNoticeShown(key);
    expect(shouldShowRetentionNotice(key)).toBe(false);

    // Otra vista conserva su propio aviso.
    expect(shouldShowRetentionNotice('otra-vista')).toBe(true);

    sessionStorage.removeItem(RETENTION_NOTICE_PREFIX + key);
  });
});
