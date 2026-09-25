import { Injectable, signal } from '@angular/core';
import { QuoteCalculationResult, VehicleQuoteInput } from '../models/leasing.model';
import { getSupabaseClient, currentUserSignal } from './supabase-client';

export interface QuoteRow {
  id: number;
  seller_id: string;
  client_name: string;
  brand: string;
  model: string;
  year: number;
  pricenet: number;
  ishybridorelectric: boolean;
  termmonths: number;
  extraordinaryrentpct: number;
  securitydepositpct: number;
  selectedstateplateid: string;
  isinsuranceestimated: boolean;
  annualinsurancecost?: number | null;
  revisada: boolean;
  fijada: boolean;
  color: string;
  created_at: string;
  valid_until?: string | null;
}

/**
 * Fila de Mis Cotizaciones con el estado de seguimiento visible para el
 * vendedor. Es de solo lectura: las etapas nunca se envían de vuelta a la BD
 * desde el frontend del vendedor.
 */
export interface VendedorSeguimientoRow {
  id: number;
  seller_id: string;
  client_name: string;
  brand: string;
  model: string;
  year: number;
  pricenet: number;
  termmonths: number;
  created_at: string;
  valid_until?: string | null;
  fijada?: boolean;
  revisada?: boolean;
  last_reviewed_at?: string | null;
  last_interacted_at?: string | null;
  activo_texto?: string | null;
  etapas?: Record<string, string> | null;
  fecha_cierre?: string | null;
  seguimiento_updated_at?: string | null;
  tiene_seguimiento?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class QuotesService {
  private client = getSupabaseClient();

  private savedQuotesSignal = signal<QuoteCalculationResult[]>([]);
  public readonly savedQuotes = this.savedQuotesSignal.asReadonly();

  public async saveQuote(
    quote: QuoteCalculationResult,
    quoteId?: number,
  ): Promise<{ id: number | null; error: any }> {
    const user = currentUserSignal();
    if (!user) {
      this.saveLocalQuote(quote);
      return { id: null, error: null };
    }

    const quoteData = {
      seller_id: user.id,
      client_name: quote.input.clientName || '',
      brand: quote.input.brand,
      model: quote.input.model,
      year: quote.input.year,
      pricenet: quote.input.priceNet,
      ishybridorelectric: quote.input.isHybridOrElectric,
      termmonths: quote.input.termMonths,
      extraordinaryrentpct: quote.input.extraordinaryRentPct || 0,
      securitydepositpct: quote.input.securityDepositPct || 0,
      selectedstateplateid: quote.input.selectedStatePlateId || 'pendiente',
      isinsuranceestimated: quote.input.isInsuranceEstimated || false,
      annualinsurancecost: quote.input.annualInsuranceCost || 0,
      totalpayment: 0,
      calculation: quote,
      valid_until: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    };

    if (quoteId) {
      const { error } = await this.client
        .from('quotes')
        .update(quoteData)
        .eq('id', quoteId)
        .eq('seller_id', user.id);
      if (error) {
        this.saveLocalQuote(quote);
        return { id: null, error };
      }
      this.saveLocalQuote(quote);
      return { id: quoteId, error: null };
    } else {
      const { data, error } = await this.client
        .from('quotes')
        .insert([{ ...quoteData, revisada: false, color: 'reciente' }])
        .select('id');
      if (error) {
        this.saveLocalQuote(quote);
        return { id: null, error };
      }
      const insertedId = data?.[0]?.id || null;
      this.saveLocalQuote(quote);
      return { id: insertedId, error: null };
    }
  }

  private saveLocalQuote(quote: QuoteCalculationResult): void {
    const updated = [quote, ...this.savedQuotesSignal()];
    this.savedQuotesSignal.set(updated);
  }

  public async loadQuotes(): Promise<void> {
    const user = currentUserSignal();
    if (!user) return;

    const { data, error } = await this.client
      .from('quotes')
      .select(
        'id, seller_id, client_name, brand, model, year, pricenet, ishybridorelectric, termmonths, extraordinaryrentpct, securitydepositpct, selectedstateplateid, isinsuranceestimated, annualinsurancecost, created_at',
      )
      .eq('seller_id', user.id)
      .order('created_at', { ascending: false })
      .limit(200);

    if (error || !data) return;

    const mapped: QuoteCalculationResult[] = data.map((q: any) => ({
      input: {
        clientName: q.client_name,
        brand: q.brand,
        model: q.model,
        year: q.year,
        priceNet: q.pricenet,
        isHybridOrElectric: q.ishybridorelectric,
        termMonths: q.termmonths,
        extraordinaryRentPct: q.extraordinaryrentpct,
        securityDepositPct: q.securitydepositpct,
        selectedStatePlateId: q.selectedstateplateid,
        isInsuranceEstimated: q.isinsuranceestimated,
        annualInsuranceCost: q.annualinsurancecost || 0,
      },
      options: { option1: {} as any, option2: {} as any, option3: {} as any },
      generatedAt: new Date(q.created_at),
    }));
    this.savedQuotesSignal.set(mapped);
  }

  /** Recupera el snapshot inmutable guardado de la cotización (null si no existe. */
  public async getQuoteCalculation(
    quoteId: number | string,
  ): Promise<QuoteCalculationResult | null> {
    const { data, error } = await this.client
      .from('quotes')
      .select('calculation')
      .eq('id', quoteId)
      .maybeSingle();
    if (error || !data?.calculation) return null;
    const calc = data.calculation as QuoteCalculationResult;

    // El Date se serializa como ISO string en jsonb; normalizar a Date
    if (calc.generatedAt && typeof calc.generatedAt === 'string') {
      calc.generatedAt = new Date(calc.generatedAt);
    }
    return calc;
  }

  public async getVendedorQuotes(sellerId: string): Promise<{ data: any; error: any }> {
    const campos =
      'id, seller_id, client_name, brand, model, year, pricenet, ishybridorelectric, termmonths, extraordinaryrentpct, securitydepositpct, selectedstateplateid, isinsuranceestimated, annualinsurancecost, fijada, revisada, last_reviewed_at, last_interacted_at, valid_until, created_at';
    let resultado: any = await this.client
      .from('quotes')
      .select(campos)
      .eq('seller_id', sellerId)
      .order('created_at', { ascending: false })
      .limit(200);

    if (
      resultado.error &&
      (resultado.error.code === 'PGRST204' ||
        String(resultado.error.message || '').includes('last_interacted_at'))
    ) {
      resultado = await this.client
        .from('quotes')
        .select(campos.replace('last_interacted_at, ', ''))
        .eq('seller_id', sellerId)
        .order('created_at', { ascending: false })
        .limit(200);
    }

    return { data: resultado.data, error: resultado.error };
  }

  private withTimeout<T>(promise: Promise<T>, ms: number, message: string): Promise<T> {
    let timer: ReturnType<typeof setTimeout>;
    const timeout = new Promise<never>((_, reject) => {
      timer = setTimeout(() => reject(new Error(message)), ms);
    });
    return Promise.race([promise, timeout]).finally(() => clearTimeout(timer!));
  }

  /**
   * Carga las cotizaciones propias junto con el avance de seguimiento visible.
   * La RPC aplica el alcance `seller_id = auth.uid()` en la base de datos; el
   * cliente nunca consulta ni escribe `quote_seguimiento` directamente.
   *
   * Antes de aplicar la migración se conserva un fallback de solo cotizaciones,
   * para que la pantalla siga funcionando en entornos con la migración pendiente.
   */
  public async getVendedorSeguimientoQuotes(): Promise<{
    data: VendedorSeguimientoRow[] | null;
    error: any;
  }> {
    const user = currentUserSignal();
    if (!user) return { data: [], error: null };

    let rpcResult: { data: any; error: any };
    try {
      rpcResult = await this.withTimeout(
        Promise.resolve(this.client.rpc('get_vendedor_seguimiento')),
        10000,
        'El servidor tardó demasiado en responder. Intenta de nuevo.',
      );
    } catch (error) {
      return { data: null, error };
    }

    const { data, error } = rpcResult;
    if (!error) {
      return { data: (data || []) as VendedorSeguimientoRow[], error: null };
    }

    const mensaje = String(error?.message || '').toLowerCase();
    const rpcNoDisponible =
      error?.code === 'PGRST202' ||
      error?.code === '42883' ||
      mensaje.includes('could not find the function');

    if (!rpcNoDisponible) return { data: null, error };

    let fallback: { data: any; error: any };
    try {
      fallback = await this.withTimeout(
        this.getVendedorQuotes(user.id),
        10000,
        'El servidor tardó demasiado en responder. Intenta de nuevo.',
      );
    } catch (fallbackError) {
      return { data: null, error: fallbackError };
    }
    if (fallback.error) return { data: null, error: fallback.error };

    return {
      data: (fallback.data || []).map((row: any) => ({
        ...row,
        etapas: {},
        fecha_cierre: null,
        seguimiento_updated_at: null,
        tiene_seguimiento: false,
      })) as VendedorSeguimientoRow[],
      error: null,
    };
  }

  /**
   * Obtiene, para cada cotización propia, el número de notas compartidas con el
   * asesor. El RPC aplica el alcance `seller_id = auth.uid()` en PostgreSQL.
   */
  public async getSellerQuoteNoteCounts(): Promise<{
    data: Record<string, number>;
    error: any;
  }> {
    const { data, error } = await this.client.rpc('get_seller_quote_note_counts');
    if (error || !Array.isArray(data)) return { data: {}, error };

    const counts: Record<string, number> = {};
    for (const row of data) {
      counts[String((row as any).quote_id)] = Number((row as any).notas_count) || 0;
    }
    return { data: counts, error: null };
  }

  /**
   * Marca o desmarca la cotización como **revisada** (acción "Revisada" del
   * módulo de Seguimiento).
   *
   * `last_reviewed_at` se sella al revisar: es una de las fuentes de la
   * "última actividad" (`utils/quote-activity.ts`), así que revisar REINICIA
   * el contador de días sin actividad y la cotización deja de estar "por caducar".
   * Requiere super_admin o socio dueño del vendedor (trigger `secure_quotes_row`).
   */
  public async setQuoteReviewed(
    quoteId: number | string,
    revisada: boolean,
  ): Promise<{ error: any }> {
    const ahora = new Date().toISOString();
    const { error } = await this.client
      .from('quotes')
      .update({
        revisada,
        last_reviewed_at: revisada ? ahora : null,
        // Paridad con producción: el estado también se persiste en color/status_color.
        color: revisada ? 'verde' : 'reciente',
        status_color: revisada ? 'verde' : null,
      })
      .eq('id', quoteId);
    return { error };
  }

  public async getAllQuotesWithSeller(): Promise<{ data: any; error: any }> {
    const campos =
      `id, seller_id, client_name, brand, model, year, pricenet, ishybridorelectric, termmonths, extraordinaryrentpct, securitydepositpct, selectedstateplateid, isinsuranceestimated, annualinsurancecost, color, fijada, revisada, last_reviewed_at, last_interacted_at, created_at, ` +
      `profiles!seller_id (full_name, agency_brand, socio_id, role)`;

    let resultado = await this.client
      .from('quotes')
      .select(campos)
      .order('created_at', { ascending: false })
      .limit(200);

    // Permite abrir el tablero antes de aplicar la migración nueva: si PostgREST
    // no conoce la columna, se muestran las cotizaciones sin interacción verde.
    if (
      resultado.error &&
      (resultado.error.code === 'PGRST204' ||
        String(resultado.error.message || '').includes('last_interacted_at'))
    ) {
      resultado = await this.client
        .from('quotes')
        .select(campos.replace('last_interacted_at, ', ''))
        .order('created_at', { ascending: false })
        .limit(200);
    }

    if (resultado.error) return { data: null, error: resultado.error };
    const mapped = (resultado.data || []).map((q: any) => ({
      ...q,
      last_interacted_at: q.last_interacted_at || null,
      seller_name: q.profiles?.full_name || 'N/A',
      seller_agency_brand: q.profiles?.agency_brand || '',
      seller_socio_id: q.profiles?.socio_id || null,
      seller_role: q.profiles?.role || 'seller',
    }));
    return { data: mapped, error: null };
  }

  /**
   * Elimina definitivamente una cotización (AJUSTES 12, punto 6).
   * - `quote_seguimiento` cae por ON DELETE CASCADE.
   * - Las `notas` se limpian mediante RPC: la política DELETE ahora solo
   *   permite borrar notas propias, por lo que la cascada debe validarse en
   *   el servidor antes de eliminar la entidad padre.
   */
  public async deleteQuote(quoteId: number | string): Promise<{ error: any }> {
    const { error: notasError } = await this.client.rpc('delete_notes_for_quote', {
      p_quote_id: Number(quoteId),
    });
    if (notasError) return { error: notasError };

    const { error } = await this.client.from('quotes').delete().eq('id', quoteId);
    return { error };
  }
}
