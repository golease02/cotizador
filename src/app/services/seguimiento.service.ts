import { Injectable, inject, signal } from '@angular/core';
import { getSupabaseClient, currentUserSignal, sessionReady } from './supabase-client';
import { QuotesService } from './quotes.service';

/**
 * Módulo de Seguimiento (proceso de cierre).
 *
 * Cada cotización entra automáticamente al tablero en la columna "Cotizada"
 * (la etapa COT del Excel original es implícita: si existe la cotización, está hecha).
 * A partir de ahí el negocio avanza por las etapas post-cotización hasta el cierre.
 *
 * Los datos operativos (referenciado, financiera, activo editable y el checklist de
 * etapas con fecha de completado) viven en `public.quote_seguimiento`, una tabla 1:1
 * con `public.quotes` cuyo RLS solo permite lectura/escritura a super_admin y socios.
 */

export type SeguimientoEtapaKey =
  | 'exp'
  | 'analisis'
  | 'pago_ini'
  | 'oc'
  | 'factura'
  | 'contrato'
  | 'gps'
  | 'placas';

export interface SeguimientoEtapaDef {
  key: SeguimientoEtapaKey;
  /** Nombre largo para el chip del checklist y el detalle. */
  label: string;
  /** Texto corto para el encabezado de columna del kanban. */
  short: string;
}

/** Etapas ordenadas del proceso (COST de la captura: EXP → ANÁLISIS → … → PLACAS). */
export const SEGUIMIENTO_ETAPAS: readonly SeguimientoEtapaDef[] = [
  { key: 'exp', label: 'Expediente', short: 'EXPEDIENTE' },
  { key: 'analisis', label: 'Análisis', short: 'ANÁLISIS' },
  { key: 'pago_ini', label: 'Pago inicial', short: 'PAGO INI' },
  { key: 'oc', label: 'Orden de compra', short: 'OC' },
  { key: 'factura', label: 'Factura', short: 'FACTURA' },
  { key: 'contrato', label: 'Contrato', short: 'CONTRATO' },
  { key: 'gps', label: 'GPS', short: 'GPS' },
  { key: 'placas', label: 'Placas', short: 'PLACAS' },
];

/** Columna 0 del kanban: cotización creada, sin etapas completadas. */
export const SEGUIMIENTO_COLUMNA_COTIZADA = 0;
/** Última columna del kanban: negocio cerrado (tiene `fecha_cierre`). */
export const SEGUIMIENTO_COLUMNA_CERRADO = SEGUIMIENTO_ETAPAS.length + 1;

/** Umbrales del semáforo de "días en la etapa actual". */
export const SEGUIMIENTO_AGING_AMARILLO_DIAS = 8;
export const SEGUIMIENTO_AGING_ROJO_DIAS = 16;

export type SeguimientoEtapas = Partial<Record<SeguimientoEtapaKey, string>>;

export interface SeguimientoColumnaDef {
  index: number;
  label: string;
  short: string;
  key: SeguimientoEtapaKey | null;
}

/** Columnas del kanban: Cotizada + las 8 etapas + Cerrado. */
export const SEGUIMIENTO_COLUMNAS: readonly SeguimientoColumnaDef[] = [
  { index: 0, label: 'Cotizada', short: 'COT', key: null },
  ...SEGUIMIENTO_ETAPAS.map((e, i) => ({
    index: i + 1,
    label: e.label,
    short: e.short,
    key: e.key,
  })),
  { index: SEGUIMIENTO_COLUMNA_CERRADO, label: 'Cerrado', short: 'CIERRE', key: null },
];

/** Fila del tablero: cotización + datos operativos de seguimiento. */
export interface SeguimientoItem {
  quoteId: number;
  sellerId: string;
  /** Vendedor (creador de la cotización). */
  sellerName: string;
  /** Id del asesor GoLease (socio) del vendedor; '' si no tiene socio asignado. */
  asesorId: string;
  /** Asesor GoLease (socio) del vendedor; '—' si no tiene socio asignado. */
  asesorName: string;
  clientName: string;
  /** Texto del activo: `activo_texto` si el admin lo editó, si no "Marca Modelo Año". */
  activo: string;
  brand: string;
  model: string;
  year: number;
  priceNet: number;
  /** Plazo de la cotización en meses (12/24/36/48). */
  termMonths: number;
  createdAt: string;
  referenciado: string;
  financiera: string;
  etapas: SeguimientoEtapas;
  fechaCierre: string | null;
  updatedAt: string | null;
  /** true si el admin/socio marcó la cotización como revisada (`quotes.revisada`). */
  revisada: boolean;
  /** `quotes.last_reviewed_at`: sello de la última revisión (reinicia los días). */
  lastReviewedAt: string | null;
  /** true si ya existe fila en `quote_seguimiento` (se crea al primer cambio). */
  tieneRegistro: boolean;
}

// =====================================================================
// Lógica pura (exportada para poder testearse sin Supabase)
// =====================================================================

/** Claves completadas, en el orden del proceso. */
export function etapasCompletadas(etapas: SeguimientoEtapas): SeguimientoEtapaKey[] {
  return SEGUIMIENTO_ETAPAS.filter((e) => !!etapas[e.key]).map((e) => e.key);
}

/**
 * Columna del kanban donde se pinta el negocio.
 *
 * Semántica "etapas completadas": la columna equivale al número de etapas del
 * proceso ya completadas (0 = "Cotizada", 8 = "Placas"), de modo que el drag &
 * drop a la columna N marca exactamente las primeras N etapas.
 *   - Con `fecha_cierre` → columna "Cerrado".
 */
export function computeColumnaActual(
  etapas: SeguimientoEtapas,
  fechaCierre?: string | null
): number {
  if (fechaCierre) return SEGUIMIENTO_COLUMNA_CERRADO;
  let completadas = 0;
  for (const etapa of SEGUIMIENTO_ETAPAS) {
    if (etapas[etapa.key]) completadas++;
  }
  return completadas;
}

/**
 * Fecha en la que el negocio entró a su etapa actual (para el semáforo de antigüedad).
 * Se toma la etapa completada más reciente; si aún no hay ninguna, la fecha de la cotización.
 */
export function computeFechaEntradaEtapa(
  etapas: SeguimientoEtapas,
  createdAt: string,
  fechaCierre?: string | null
): string {
  if (fechaCierre) return fechaCierre;

  let ultima: string | null = null;
  let ultimaMs = -Infinity;
  for (const etapa of SEGUIMIENTO_ETAPAS) {
    const iso = etapas[etapa.key];
    if (!iso) continue;
    const ms = new Date(iso).getTime();
    if (Number.isFinite(ms) && ms > ultimaMs) {
      ultimaMs = ms;
      ultima = iso;
    }
  }
  return ultima || createdAt;
}

/** Días transcurridos (enteros, nunca negativos) entre dos fechas ISO. */
export function diasEntre(desdeIso: string, hasta: Date = new Date()): number {
  const desde = new Date(desdeIso).getTime();
  if (!Number.isFinite(desde)) return 0;
  return Math.max(0, Math.floor((hasta.getTime() - desde) / 86_400_000));
}

/** Semáforo del aging: verde / amarillo / rojo. */
export function nivelAging(dias: number): 'verde' | 'amarillo' | 'rojo' {
  if (dias >= SEGUIMIENTO_AGING_ROJO_DIAS) return 'rojo';
  if (dias >= SEGUIMIENTO_AGING_AMARILLO_DIAS) return 'amarillo';
  return 'verde';
}

/**
 * Aplica el movimiento a una columna del kanban (drag & drop o menú "Mover a…").
 * La columna N marca como completadas las primeras N etapas del proceso y limpia
 * las posteriores (inverso exacto de `computeColumnaActual`).
 * La columna "Cerrado" completa las 8 etapas y fija la fecha de cierre.
 * Conserva la fecha original de las etapas que ya estaban completadas.
 */
export function aplicarColumna(
  etapas: SeguimientoEtapas,
  columna: number,
  nowIso: string
): { etapas: SeguimientoEtapas; fechaCierre: string | null } {
  if (columna <= SEGUIMIENTO_COLUMNA_COTIZADA) {
    return { etapas: {}, fechaCierre: null };
  }

  const esCierre = columna >= SEGUIMIENTO_COLUMNA_CERRADO;
  const limite = esCierre ? SEGUIMIENTO_ETAPAS.length : columna;

  const siguiente: SeguimientoEtapas = {};
  for (let i = 0; i < limite; i++) {
    const key = SEGUIMIENTO_ETAPAS[i].key;
    siguiente[key] = etapas[key] || nowIso;
  }

  return { etapas: siguiente, fechaCierre: esCierre ? nowIso : null };
}

/**
 * Alterna una etapa individual (chips del checklist en la vista de lista).
 * Al desmarcar una etapa se limpia `fecha_cierre` para no dejar el negocio
 * marcado como cerrado con etapas pendientes.
 */
export function toggleEtapa(
  etapas: SeguimientoEtapas,
  key: SeguimientoEtapaKey,
  nowIso: string
): { etapas: SeguimientoEtapas; fechaCierre: string | null } {
  const siguiente: SeguimientoEtapas = { ...etapas };
  if (siguiente[key]) {
    delete siguiente[key];
    return { etapas: siguiente, fechaCierre: null };
  }
  siguiente[key] = nowIso;
  return { etapas: siguiente, fechaCierre: null };
}

// =====================================================================
// Servicio (Supabase)
// =====================================================================

@Injectable({ providedIn: 'root' })
export class SeguimientoService {
  private client = getSupabaseClient();
  private quotesService = inject(QuotesService);

  private itemsSignal = signal<SeguimientoItem[]>([]);
  readonly items = this.itemsSignal.asReadonly();

  private loadingSignal = signal<boolean>(false);
  readonly loading = this.loadingSignal.asReadonly();

  private tablaDisponibleSignal = signal<boolean>(true);
  /** false cuando la migración de `quote_seguimiento` aún no está aplicada en la BD. */
  readonly tablaDisponible = this.tablaDisponibleSignal.asReadonly();

  /** Carga cotizaciones + seguimientos y los fusiona por `quote_id`. */
  public async load(): Promise<void> {
    this.loadingSignal.set(true);
    try {
      await sessionReady();
      const [{ data: quotes, error }, registros] = await Promise.all([
        this.quotesService.getAllQuotesWithSeller(),
        this.loadRegistros(),
      ]);

      if (error || !quotes) {
        console.warn('No se pudieron cargar las cotizaciones para el seguimiento:', error);
        this.itemsSignal.set([]);
        return;
      }

      const porQuote = new Map<string, any>();
      for (const r of registros) porQuote.set(String(r.quote_id), r);

      const { mapa, porDefecto } = await this.resolverAsesores(quotes as any[]);

      this.itemsSignal.set(
        (quotes as any[]).map((q) =>
          this.buildItem(q, porQuote.get(String(q.id)), mapa, porDefecto)
        ),
      );
    } finally {
      this.loadingSignal.set(false);
    }
  }

  /**
   * Versión pública de TEST de la resolución asesorName/termMonths por item.
   * Replica la lógica de `load()` sin tocar Supabase.
   */
  public buildTestItems(
    quotes: any[],
    registros: any[],
    asesoresPorId: Map<string, string>,
    asesorPorDefecto = '',
  ): SeguimientoItem[] {
    const porQuote = new Map<string, any>();
    for (const r of registros) porQuote.set(String(r.quote_id), r);
    return quotes.map((q) =>
      this.buildItem(q, porQuote.get(String(q.id)), asesoresPorId, asesorPorDefecto)
    );
  }

  /**
   * Resuelve `socio_id → nombre del asesor` para las cotizaciones cargadas.
   * La RLS de `profiles` puede ocultar perfiles al socio (solo ve su red):
   * en ese caso los items sin nombre reciben el nombre del usuario actual.
   */
  private async resolverAsesores(
    quotes: any[],
  ): Promise<{ mapa: Map<string, string>; porDefecto: string }> {
    const ids = new Set<string>();
    for (const q of quotes) {
      if (q.seller_socio_id) ids.add(String(q.seller_socio_id));
    }

    const mapa = new Map<string, string>();
    if (ids.size > 0) {
      const { data, error } = await this.client
        .from('profiles')
        .select('id, full_name')
        .in('id', [...ids]);
      if (!error) {
        for (const p of data || []) {
          if (p?.id && p?.full_name) mapa.set(String(p.id), String(p.full_name));
        }
      }
    }

    // Fallback para items cuyo asesor quedó oculto por RLS: el socio solo ve
    // cotizaciones de su red, así que el asesor es su propio perfil en sesión.
    const yo = currentUserSignal();
    let porDefecto = '';
    if (yo?.id && !mapa.has(yo.id)) {
      const { data } = await this.client
        .from('profiles')
        .select('full_name')
        .eq('id', yo.id)
        .maybeSingle();
      porDefecto = data?.full_name || '';
    }
    return { mapa, porDefecto };
  }

  /** Filas de `quote_seguimiento` (el RLS ya las limita al alcance del socio). */
  private async loadRegistros(): Promise<any[]> {
    const { data, error } = await this.client
      .from('quote_seguimiento')
      .select(
        'quote_id, seller_id, referenciado, financiera, activo_texto, etapas, fecha_cierre, updated_at'
      );

    if (error) {
      // PGRST205: tabla inexistente (migración pendiente) → el tablero sigue
      // funcionando en modo lectura (todas las cotizaciones en "Cotizada").
      this.tablaDisponibleSignal.set(false);
      console.warn(
        'quote_seguimiento no está disponible; aplica supabase/migrations/20260917000000_quote_seguimiento.sql.',
        error.message
      );
      return [];
    }

    this.tablaDisponibleSignal.set(true);
    return data || [];
  }

  private buildItem(
    quote: any,
    registro?: any,
    asesoresPorId: Map<string, string> = new Map(),
    asesorPorDefecto = '',
  ): SeguimientoItem {
    const activoBase = [quote.brand, quote.model, quote.year].filter(Boolean).join(' ').trim();
    const socioId: string | null = quote.seller_socio_id || null;
    return {
      quoteId: Number(quote.id),
      sellerId: quote.seller_id,
      sellerName: quote.seller_name || 'N/A',
      asesorId: socioId || '',
      asesorName: (socioId && asesoresPorId.get(socioId)) || asesorPorDefecto || '—',
      clientName: quote.client_name || 'Sin cliente',
      activo: registro?.activo_texto?.trim() ? registro.activo_texto.trim() : activoBase,
      brand: quote.brand || '',
      model: quote.model || '',
      year: quote.year,
      priceNet: Number(quote.pricenet) || 0,
      termMonths: Number(quote.termmonths) || 0,
      createdAt: quote.created_at,
      referenciado: registro?.referenciado || '',
      financiera: registro?.financiera || 'SIMPLE LEASE',
      etapas: (registro?.etapas || {}) as SeguimientoEtapas,
      fechaCierre: registro?.fecha_cierre || null,
      updatedAt: registro?.updated_at || null,
      revisada: quote.revisada === true,
      lastReviewedAt: quote.last_reviewed_at || null,
      tieneRegistro: !!registro,
    };
  }

  /**
   * Persiste el estado de un negocio (upsert 1:1 sobre `quote_seguimiento`).
   * Devuelve `true` si se guardó correctamente.
   */
  public async guardar(
    item: SeguimientoItem,
    cambios: {
      etapas?: SeguimientoEtapas;
      fechaCierre?: string | null;
      referenciado?: string;
      financiera?: string;
      activoTexto?: string | null;
    }
  ): Promise<boolean> {
    await sessionReady();
    const user = currentUserSignal();

    const etapas = cambios.etapas ?? item.etapas;
    const fechaCierre = cambios.fechaCierre !== undefined ? cambios.fechaCierre : item.fechaCierre;

    const payload = {
      quote_id: item.quoteId,
      seller_id: item.sellerId,
      referenciado: cambios.referenciado !== undefined ? cambios.referenciado : item.referenciado,
      financiera: cambios.financiera !== undefined ? cambios.financiera : item.financiera,
      activo_texto: cambios.activoTexto !== undefined ? cambios.activoTexto : item.activo || null,
      etapas,
      fecha_cierre: fechaCierre,
      updated_by: user?.id || null,
    };

    const { error } = await this.client
      .from('quote_seguimiento')
      .upsert([payload], { onConflict: 'quote_id' });

    if (error) {
      console.error('No se pudo guardar el seguimiento:', error);
      return false;
    }

    this.itemsSignal.update((list) =>
      list.map((i) =>
        i.quoteId === item.quoteId
          ? ({
              ...i,
              etapas,
              fechaCierre,
              referenciado: payload.referenciado || '',
              financiera: payload.financiera || 'SIMPLE LEASE',
              activo: (payload.activo_texto || '').trim() || i.activo,
              tieneRegistro: true,
              updatedAt: new Date().toISOString(),
            } as SeguimientoItem)
          : i
      )
    );
    return true;
  }

  /** Mueve el negocio a una columna del kanban (marca/limpia etapas en bloque). */
  public async moverAColumna(item: SeguimientoItem, columna: number): Promise<boolean> {
    const { etapas, fechaCierre } = aplicarColumna(item.etapas, columna, new Date().toISOString());
    return this.guardar(item, { etapas, fechaCierre });
  }

  /** Marca/desmarca una etapa individual (chips de la vista de lista). */
  public async alternarEtapa(item: SeguimientoItem, key: SeguimientoEtapaKey): Promise<boolean> {
    const { etapas, fechaCierre } = toggleEtapa(item.etapas, key, new Date().toISOString());
    return this.guardar(item, { etapas, fechaCierre });
  }

  /** Marca el negocio como cerrado (fecha de cierre = ahora). */
  public async cerrar(item: SeguimientoItem): Promise<boolean> {
    const ahora = new Date().toISOString();
    const { etapas } = aplicarColumna(item.etapas, SEGUIMIENTO_COLUMNA_CERRADO, ahora);
    return this.guardar(item, { etapas, fechaCierre: ahora });
  }

  /** Reabre un negocio cerrado: conserva las etapas pero limpia la fecha de cierre. */
  public async reabrir(item: SeguimientoItem): Promise<boolean> {
    return this.guardar(item, { fechaCierre: null });
  }

  /**
   * Marca o desmarca la cotización como **revisada**.
   *
   * `quotes.last_reviewed_at` queda sellado al revisar y es una de las fuentes
   * de la "última actividad" (junto con las etapas, las notas y `created_at`),
   * así que revisar REINICIA el contador de días sin actividad: la cotización
   * deja de contar como "por caducar". Es la acción que faltaba cuando se
   * eliminó la vista `admin-quotes` (Ajuste 11).
   */
  public async marcarRevisada(item: SeguimientoItem, revisada: boolean): Promise<boolean> {
    await sessionReady();
    const { error } = await this.quotesService.setQuoteReviewed(item.quoteId, revisada);
    if (error) {
      console.error('No se pudo marcar la cotización como revisada:', error);
      return false;
    }

    const sello = revisada ? new Date().toISOString() : null;
    this.itemsSignal.update((list) =>
      list.map((i) =>
        i.quoteId === item.quoteId ? { ...i, revisada, lastReviewedAt: sello } : i
      )
    );
    return true;
  }

  /** Actualiza los datos operativos editables del negocio. */
  public async actualizarDatos(
    item: SeguimientoItem,
    datos: { referenciado: string; financiera: string; activoTexto: string }
  ): Promise<boolean> {
    return this.guardar(item, {
      referenciado: datos.referenciado.trim(),
      financiera: datos.financiera.trim() || 'SIMPLE LEASE',
      activoTexto: datos.activoTexto.trim() || null,
    });
  }
}
