import {
  ACTIVITY_AMARILLO_DIAS,
  ACTIVITY_ROJO_DIAS,
  computeActivityColor,
  diasSinActividad,
  etiquetaDias,
  formatUltimaActividad,
  nivelActividad,
  resolveLastActivity,
} from './quote-activity';

describe('quote-activity', () => {
  const now = new Date('2026-09-24T12:00:00Z');
  /** Cotización creada hace 30 días (antes quedaba atrapada en rojo para siempre). */
  const createdAntigua = '2026-08-25T12:00:00Z';

  it('should use the unified thresholds 8/16', () => {
    expect(ACTIVITY_AMARILLO_DIAS).toBe(8);
    expect(ACTIVITY_ROJO_DIAS).toBe(16);
    expect(nivelActividad(7)).toBe('verde');
    expect(nivelActividad(8)).toBe('amarillo');
    expect(nivelActividad(15)).toBe('amarillo');
    expect(nivelActividad(16)).toBe('rojo');
  });

  it('should take the most recent activity among all sources', () => {
    const ultima = resolveLastActivity({
      createdAt: '2026-08-01T00:00:00Z',
      lastReviewedAt: '2026-09-20T00:00:00Z',
      seguimientoUpdatedAt: '2026-09-10T00:00:00Z',
      etapas: { exp: '2026-09-05T00:00:00Z', analisis: '2026-09-15T00:00:00Z' },
      fechaCierre: '2026-09-01T00:00:00Z',
      lastNoteAt: '2026-09-22T00:00:00Z',
    });

    expect(ultima).toEqual(new Date('2026-09-22T00:00:00Z'));
  });

  it('should fall back to created_at when there is no other activity', () => {
    expect(resolveLastActivity({ createdAt: '2026-09-01T00:00:00Z' })).toEqual(
      new Date('2026-09-01T00:00:00Z')
    );
  });

  it('should ignore empty and invalid dates', () => {
    const sources = {
      createdAt: '2026-09-01T00:00:00Z',
      lastReviewedAt: null,
      seguimientoUpdatedAt: '',
      etapas: { exp: 'no-es-fecha', oc: '2026-09-02T00:00:00Z' },
      lastNoteAt: undefined,
    };

    expect(resolveLastActivity(sources)).toEqual(new Date('2026-09-02T00:00:00Z'));
    expect(diasSinActividad({ createdAt: '2026-09-24T12:00:00Z' }, now)).toBe(0);
  });

  it('should never return negative days', () => {
    expect(diasSinActividad({ createdAt: '2026-10-01T12:00:00Z' }, now)).toBe(0);
  });

  it('should reset the counter when the quote is reviewed', () => {
    const antes = { createdAt: createdAntigua, revisada: false };
    const despues = { createdAt: createdAntigua, revisada: true, lastReviewedAt: now };

    expect(diasSinActividad(antes, now)).toBe(30);
    expect(computeActivityColor(antes, now)).toBe('rojo');

    expect(diasSinActividad(despues, now)).toBe(0);
    expect(computeActivityColor(despues, now)).toBe('verde');
  });

  it('should reset the counter when a stage is completed or a note is added', () => {
    const conEtapa = {
      createdAt: createdAntigua,
      etapas: { exp: '2026-09-23T12:00:00Z' },
    };
    const conNota = { createdAt: createdAntigua, lastNoteAt: '2026-09-24T00:00:00Z' };

    expect(diasSinActividad(conEtapa, now)).toBe(1);
    expect(computeActivityColor(conEtapa, now)).toBe('reciente');
    expect(diasSinActividad(conNota, now)).toBe(0);
    expect(computeActivityColor(conNota, now)).toBe('reciente');
  });

  it('should mark unattended quotes as amarillo then rojo', () => {
    expect(computeActivityColor({ createdAt: '2026-09-17T12:00:00Z' }, now)).toBe('reciente');
    expect(computeActivityColor({ createdAt: '2026-09-16T00:00:00Z' }, now)).toBe('amarillo');
    expect(computeActivityColor({ createdAt: '2026-09-08T00:00:00Z' }, now)).toBe('rojo');
  });

  it('should return a reviewed quote to red after 16 days without activity', () => {
    const revisadaYAbandonada = {
      createdAt: '2026-08-01T00:00:00Z',
      revisada: true,
      lastReviewedAt: '2026-09-01T00:00:00Z',
    };

    expect(computeActivityColor(revisadaYAbandonada, now)).toBe('rojo');
  });

  it('should keep a delivered deal green regardless of the days', () => {
    expect(
      computeActivityColor({ createdAt: '2026-06-01T00:00:00Z', fechaCierre: '2026-06-02T00:00:00Z' }, now)
    ).toBe('verde');
  });

  it('should format labels and dates in Spanish', () => {
    expect(etiquetaDias(0)).toBe('Hoy');
    expect(etiquetaDias(1)).toBe('Ayer');
    expect(etiquetaDias(12)).toBe('Hace 12 días');
    expect(formatUltimaActividad({ createdAt: '2026-09-24T12:00:00Z' })).toBe('24/09/2026');
  });
});
