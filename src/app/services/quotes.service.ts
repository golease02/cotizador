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

@Injectable({
  providedIn: 'root',
})
export class QuotesService {
  private client = getSupabaseClient();

  private savedQuotesSignal = signal<QuoteCalculationResult[]>([]);
  public readonly savedQuotes = this.savedQuotesSignal.asReadonly();

  public async saveQuote(
    quote: QuoteCalculationResult,
    quoteId?: number
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
      .select('id, seller_id, client_name, brand, model, year, pricenet, ishybridorelectric, termmonths, extraordinaryrentpct, securitydepositpct, selectedstateplateid, isinsuranceestimated, annualinsurancecost, created_at')
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
  public async getQuoteCalculation(quoteId: number | string): Promise<QuoteCalculationResult | null> {
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
    const { data, error } = await this.client
      .from('quotes')
      .select('id, seller_id, client_name, brand, model, year, pricenet, ishybridorelectric, termmonths, extraordinaryrentpct, securitydepositpct, selectedstateplateid, isinsuranceestimated, annualinsurancecost, created_at')
      .eq('seller_id', sellerId)
      .order('created_at', { ascending: false })
      .limit(200);
    return { data, error };
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
    revisada: boolean
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
    const { data, error } = await this.client
      .from('quotes')
       .select(`id, seller_id, client_name, brand, model, year, pricenet, ishybridorelectric, termmonths, extraordinaryrentpct, securitydepositpct, selectedstateplateid, isinsuranceestimated, annualinsurancecost, color, fijada, revisada, last_reviewed_at, created_at,
        created_at,
        profiles!seller_id (full_name, agency_brand, socio_id)`)
       .order('created_at', { ascending: false })
       .limit(200);
    if (error) return { data: null, error };
    const mapped = data.map((q: any) => ({
      ...q,
      seller_name: q.profiles?.full_name || 'N/A',
      seller_agency_brand: q.profiles?.agency_brand || '',
      seller_socio_id: q.profiles?.socio_id || null,
    }));
    return { data: mapped, error: null };
  }

  /**
   * Elimina definitivamente una cotización (AJUSTES 12, punto 6).
   * - `quote_seguimiento` cae por ON DELETE CASCADE.
   * - Las `notas` (entidad_tipo='quote', sin FK) se borran a mano primero.
   * Requiere que la política DELETE de `quotes` cubra al usuario
   * (super_admin + socio dueño; ver migración `..._quotes_delete_scope.sql`).
   */
  public async deleteQuote(quoteId: number | string): Promise<{ error: any }> {
    await this.client
      .from('notas')
      .delete()
      .eq('entidad_tipo', 'quote')
      .eq('entidad_id', String(quoteId));

    const { error } = await this.client.from('quotes').delete().eq('id', quoteId);
    return { error };
  }
}
