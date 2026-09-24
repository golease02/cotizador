import {
  aplicarColumna,
  computeColumnaActual,
  computeFechaEntradaEtapa,
  diasEntre,
  etapasCompletadas,
  estadoBarraSeguimiento,
  nivelAging,
  toggleEtapa,
  SEGUIMIENTO_COLUMNA_CERRADO,
  SEGUIMIENTO_COLUMNA_COTIZADA,
  SEGUIMIENTO_ETAPAS,
  SeguimientoEtapas,
  SeguimientoService,
} from './seguimiento.service';
import { TestBed } from '@angular/core/testing';

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

  describe('estadoBarraSeguimiento', () => {
    const now = new Date('2026-09-24T12:00:00.000Z');
    const creada = (dias: number) => new Date(now.getTime() - dias * 86_400_000).toISOString();

    it('should use blue through day 3, yellow on days 4–5 and red from day 6', () => {
      for (const dias of [0, 1, 2, 3]) {
        expect(
          estadoBarraSeguimiento(
            { createdAt: creada(dias), fechaCierre: null, lastInteractedAt: null },
            now,
          ),
        ).toBe('azul');
      }
      for (const dias of [4, 5]) {
        expect(
          estadoBarraSeguimiento(
            { createdAt: creada(dias), fechaCierre: null, lastInteractedAt: null },
            now,
          ),
        ).toBe('amarillo');
      }
      for (const dias of [6, 7, 60]) {
        expect(
          estadoBarraSeguimiento(
            { createdAt: creada(dias), fechaCierre: null, lastInteractedAt: null },
            now,
          ),
        ).toBe('rojo');
      }
    });

    it('should ignore a review timestamp when revisada is false', () => {
      expect(
        estadoBarraSeguimiento(
          {
            createdAt: creada(2),
            fechaCierre: null,
            lastInteractedAt: null,
            revisada: false,
            lastReviewedAt: creada(0),
          },
          now,
        ),
      ).toBe('azul');
    });

    it('should reset the cycle after an interaction and return to blue/yellow/red', () => {
      const base = {
        createdAt: creada(60),
        fechaCierre: null,
      };

      for (const [dias, color] of [
        [0, 'verde'],
        [1, 'azul'],
        [2, 'azul'],
        [3, 'azul'],
        [4, 'amarillo'],
        [5, 'amarillo'],
        [6, 'rojo'],
        [30, 'rojo'],
      ] as const) {
        expect(
          estadoBarraSeguimiento(
            { ...base, lastInteractedAt: creada(dias) },
            now,
          ),
        ).toBe(color);
      }
    });

    it('should use review, tracking and stage timestamps as activity anchors', () => {
      expect(
        estadoBarraSeguimiento(
          {
            createdAt: creada(60),
            fechaCierre: null,
            lastInteractedAt: null,
            revisada: true,
            lastReviewedAt: creada(0),
          },
          now,
        ),
      ).toBe('verde');
      expect(
        estadoBarraSeguimiento(
          {
            createdAt: creada(60),
            fechaCierre: null,
            lastInteractedAt: null,
            updatedAt: creada(4),
          },
          now,
        ),
      ).toBe('amarillo');
      expect(
        estadoBarraSeguimiento(
          {
            createdAt: creada(60),
            fechaCierre: null,
            lastInteractedAt: null,
            etapas: { analisis: creada(6) },
          },
          now,
        ),
      ).toBe('rojo');
    });

    it('should keep delivered quotes green regardless of age', () => {
      expect(
        estadoBarraSeguimiento(
          { createdAt: creada(60), fechaCierre: creada(30), lastInteractedAt: null },
          now,
        ),
      ).toBe('verde');
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

  describe('SeguimientoService.buildTestItems (asesor y plazo)', () => {
    let servicio: SeguimientoService;

    /** Fila de `quotes` con los campos que consume el mapeo del tablero. */
    const cotizacion = (over: Record<string, unknown> = {}) => ({
      id: 7,
      seller_id: 's1',
      seller_name: 'Ana Vendedora',
      seller_role: 'seller',
      seller_socio_id: 'socio-1',
      client_name: 'Cliente Uno',
      brand: 'VW',
      model: 'Crafter',
      year: 2026,
      pricenet: 900000,
      termmonths: 48,
      created_at: '2026-09-01T10:00:00.000Z',
      ...over,
    });

    beforeEach(() => {
      servicio = TestBed.inject(SeguimientoService);
    });

    afterEach(() => {
      TestBed.resetTestingModule();
    });

    it('should resolve the asesor name and the quote term', () => {
      const [item] = servicio.buildTestItems(
        [cotizacion()],
        [],
        new Map([['socio-1', 'Socio Uno']]),
      );

      expect(item.asesorId).toBe('socio-1');
      expect(item.asesorName).toBe('Socio Uno');
      expect(item.termMonths).toBe(48);
      expect(item.sellerName).toBe('Ana Vendedora');
      expect(item.esVentaDirecta).toBe(false);
      expect(item.lastInteractedAt).toBeNull();
    });

    it('should fall back to the current asesor when RLS hides the profile', () => {
      const [item] = servicio.buildTestItems([cotizacion()], [], new Map(), 'Socio en sesión');

      expect(item.asesorName).toBe('Socio en sesión');
    });

    it('should show "Sin asesor" when the seller has no asesor assigned', () => {
      const [item] = servicio.buildTestItems(
        [cotizacion({ seller_socio_id: null })],
        [],
        new Map(),
        'No debeFallback',
      );

      expect(item.asesorId).toBe('');
      expect(item.asesorName).toBe('Sin asesor');
    });

    it('should classify a quote created by a socio as their own direct advisor quote', () => {
      const [item] = servicio.buildTestItems(
        [
          cotizacion({
            seller_id: 'socio-9',
            seller_name: 'Socia Directa',
            seller_role: 'socio',
            seller_socio_id: null,
          }),
        ],
        [],
        new Map(),
        'Fallback que no debe usarse',
      );

      expect(item.asesorId).toBe('socio-9');
      expect(item.asesorName).toBe('Socia Directa');
      expect(item.sellerId).toBe('socio-9');
      expect(item.sellerName).toBe('Directa');
      expect(item.esVentaDirecta).toBe(true);
    });

    it('should classify a quote created by a superadmin as a direct advisor quote', () => {
      const [item] = servicio.buildTestItems(
        [
          cotizacion({
            seller_id: 'admin-1',
            seller_name: 'César González',
            seller_role: 'super_admin',
            seller_socio_id: null,
          }),
        ],
        [],
        new Map(),
      );

      expect(item.asesorId).toBe('admin-1');
      expect(item.asesorName).toBe('César González');
      expect(item.sellerName).toBe('Directa');
      expect(item.esVentaDirecta).toBe(true);
    });

    it('should merge the seguimiento row with the quote', () => {
      const [item] = servicio.buildTestItems(
        [cotizacion({ last_interacted_at: '2026-09-11T10:00:00.000Z' })],
        [
          {
            quote_id: 7,
            activo_texto: '  Audi Q5 2025  ',
            referenciado: 'César',
            financiera: 'MONTERREY',
            etapas: { exp: '2026-09-10T00:00:00.000Z' },
            fecha_cierre: null,
            updated_at: '2026-09-10T00:00:00.000Z',
          },
        ],
        new Map([['socio-1', 'Socio Uno']]),
      );

      expect(item.tieneRegistro).toBe(true);
      expect(item.activo).toBe('Audi Q5 2025');
      expect(item.referenciado).toBe('César');
      expect(item.financiera).toBe('MONTERREY');
      expect(item.etapas.exp).toBe('2026-09-10T00:00:00.000Z');
      expect(item.lastInteractedAt).toBe('2026-09-11T10:00:00.000Z');
      expect(item.asesorName).toBe('Socio Uno');
    });

    it('should build the asset text from the quote when there is no seguimiento row', () => {
      const [item] = servicio.buildTestItems([cotizacion()], [], new Map());

      expect(item.tieneRegistro).toBe(false);
      expect(item.activo).toBe('VW Crafter 2026');
      expect(item.financiera).toBe('SIMPLE LEASE');
      expect(item.termMonths).toBe(48);
    });
  });
});
