import {
  aplicarColumna,
  computeColumnaActual,
  computeFechaEntradaEtapa,
  diasEntre,
  etapasCompletadas,
  nivelAging,
  toggleEtapa,
  SEGUIMIENTO_COLUMNA_CERRADO,
  SEGUIMIENTO_COLUMNA_COTIZADA,
  SEGUIMIENTO_ETAPAS,
  SeguimientoEtapas,
} from './seguimiento.service';

describe('seguimiento.service (lógica pura)', () => {
  const NOW = '2026-09-17T10:00:00.000Z';

  describe('computeColumnaActual', () => {
    it('should place a quote without stages in the "Cotizada" column', () => {
      expect(computeColumnaActual({})).toBe(SEGUIMIENTO_COLUMNA_COTIZADA);
    });

    it('should count completed stages to place the deal in a column', () => {
      // EXP completada → columna "Expediente" (1)
      expect(computeColumnaActual({ exp: NOW })).toBe(1);
      // EXP + ANÁLISIS completadas → columna "Análisis" (2)
      expect(computeColumnaActual({ exp: NOW, analisis: NOW })).toBe(2);
    });

    it('should count every completed stage even when there are gaps', () => {
      // OC marcada pero EXP pendiente → 1 etapa completada (columna "Expediente")
      expect(computeColumnaActual({ oc: NOW })).toBe(1);
      // EXP + OC completadas → 2 etapas (columna "Análisis")
      expect(computeColumnaActual({ exp: NOW, oc: NOW })).toBe(2);
    });

    it('should apply the "Cerrado" column only with a closing date', () => {
      const todas: SeguimientoEtapas = {};
      for (const etapa of SEGUIMIENTO_ETAPAS) todas[etapa.key] = NOW;
      // Todas las etapas completadas pero sin cierre → columna "Placas" (8)
      expect(computeColumnaActual(todas)).toBe(SEGUIMIENTO_ETAPAS.length);
      expect(computeColumnaActual(todas, NOW)).toBe(SEGUIMIENTO_COLUMNA_CERRADO);
    });

    it('should place a closed deal in the "Cerrado" column', () => {
      expect(computeColumnaActual({ exp: NOW }, NOW)).toBe(SEGUIMIENTO_COLUMNA_CERRADO);
      expect(computeColumnaActual({}, NOW)).toBe(SEGUIMIENTO_COLUMNA_CERRADO);
    });
  });

  describe('etapasCompletadas', () => {
    it('should list completed stages in process order', () => {
      expect(etapasCompletadas({ oc: NOW, exp: NOW })).toEqual(['exp', 'oc']);
      expect(etapasCompletadas({})).toEqual([]);
    });
  });

  describe('computeFechaEntradaEtapa', () => {
    const createdAt = '2026-09-01T00:00:00.000Z';

    it('should use the quote date when the deal is still in "Cotizada"', () => {
      expect(computeFechaEntradaEtapa({}, createdAt)).toBe(createdAt);
    });

    it('should use the previous stage date as the entry date of the current stage', () => {
      const exp = '2026-09-05T00:00:00.000Z';
      // EXP completada → el negocio entró a la etapa actual cuando se cerró EXP
      expect(computeFechaEntradaEtapa({ exp }, createdAt)).toBe(exp);
    });

    it('should use the most recent completed stage date (gap tolerant)', () => {
      const exp = '2026-09-05T00:00:00.000Z';
      const oc = '2026-09-12T00:00:00.000Z';
      // OC es la etapa completada más reciente, aunque ANÁLISIS siga pendiente
      expect(computeFechaEntradaEtapa({ exp, oc }, createdAt)).toBe(oc);
    });

    it('should use the closing date for closed deals', () => {
      expect(computeFechaEntradaEtapa({ exp: NOW }, createdAt, NOW)).toBe(NOW);
    });
  });

  describe('diasEntre', () => {
    it('should return whole days between two dates', () => {
      expect(diasEntre('2026-09-10T10:00:00.000Z', new Date('2026-09-17T10:00:00.000Z'))).toBe(7);
    });

    it('should never return a negative value', () => {
      expect(diasEntre('2026-09-20T10:00:00.000Z', new Date('2026-09-17T10:00:00.000Z'))).toBe(0);
    });

    it('should return 0 for an invalid date', () => {
      expect(diasEntre('fecha-invalida', new Date('2026-09-17T10:00:00.000Z'))).toBe(0);
    });
  });

  describe('nivelAging', () => {
    it('should map days to the traffic light levels', () => {
      expect(nivelAging(0)).toBe('verde');
      expect(nivelAging(7)).toBe('verde');
      expect(nivelAging(8)).toBe('amarillo');
      expect(nivelAging(15)).toBe('amarillo');
      expect(nivelAging(16)).toBe('rojo');
      expect(nivelAging(60)).toBe('rojo');
    });
  });

  describe('aplicarColumna', () => {
    it('should clear every stage when moving back to "Cotizada"', () => {
      const res = aplicarColumna({ exp: NOW, analisis: NOW }, SEGUIMIENTO_COLUMNA_COTIZADA, NOW);
      expect(res.etapas).toEqual({});
      expect(res.fechaCierre).toBeNull();
    });

    it('should complete the first N stages and clear later ones', () => {
      // Mover a OC (columna 4) → EXP, ANÁLISIS, PAGO INI y OC completadas
      const res = aplicarColumna({}, 4, NOW);
      expect(Object.keys(res.etapas)).toEqual(['exp', 'analisis', 'pago_ini', 'oc']);
      expect(res.fechaCierre).toBeNull();
      expect(computeColumnaActual(res.etapas)).toBe(4);

      // Al retroceder a ANÁLISIS (columna 2) sólo quedan EXP y ANÁLISIS
      const atras = aplicarColumna(res.etapas, 2, NOW);
      expect(Object.keys(atras.etapas)).toEqual(['exp', 'analisis']);
      expect(computeColumnaActual(atras.etapas)).toBe(2);
    });

    it('should preserve the original date of already completed stages', () => {
      const expDate = '2026-09-05T00:00:00.000Z';
      const res = aplicarColumna({ exp: expDate }, 3, NOW);
      expect(res.etapas.exp).toBe(expDate);
      expect(res.etapas.analisis).toBe(NOW);
    });

    it('should complete all stages and set the closing date when moving to "Cerrado"', () => {
      const res = aplicarColumna({ exp: NOW }, SEGUIMIENTO_COLUMNA_CERRADO, NOW);
      expect(Object.keys(res.etapas)).toHaveLength(SEGUIMIENTO_ETAPAS.length);
      expect(res.fechaCierre).toBe(NOW);
    });
  });

  describe('toggleEtapa', () => {
    it('should mark a pending stage with the current timestamp', () => {
      const res = toggleEtapa({}, 'exp', NOW);
      expect(res.etapas.exp).toBe(NOW);
      expect(res.fechaCierre).toBeNull();
    });

    it('should unmark a completed stage', () => {
      const res = toggleEtapa({ exp: NOW }, 'exp', NOW);
      expect(res.etapas.exp).toBeUndefined();
    });

    it('should clear the closing date when a stage is unchecked', () => {
      const res = toggleEtapa({ exp: NOW }, 'exp', NOW);
      expect(res.fechaCierre).toBeNull();
    });

    it('should not mutate the original stages object', () => {
      const original: SeguimientoEtapas = { exp: NOW };
      toggleEtapa(original, 'analisis', NOW);
      expect(original.analisis).toBeUndefined();
    });
  });
});