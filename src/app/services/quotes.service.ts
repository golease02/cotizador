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
  revisada: boolean;
  fijada: boolean;
  color: string;
  created_at: string;
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
      totalpayment: 0,
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
      .select('id, seller_id, client_name, brand, model, year, pricenet, ishybridorelectric, termmonths, extraordinaryrentpct, securitydepositpct, selectedstateplateid, isinsuranceestimated, created_at')
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
      },
      options: { option1: {} as any, option2: {} as any, option3: {} as any },
      generatedAt: new Date(q.created_at),
    }));
    this.savedQuotesSignal.set(mapped);
  }

  public async getVendedorQuotes(sellerId: string): Promise<{ data: any; error: any }> {
    const { data, error } = await this.client
      .from('quotes')
      .select('id, seller_id, client_name, brand, model, year, pricenet, ishybridorelectric, termmonths, extraordinaryrentpct, selectedstateplateid, isinsuranceestimated, created_at')
      .eq('seller_id', sellerId)
      .order('created_at', { ascending: false })
      .limit(200);
    return { data, error };
  }

  /** Paridad con producción: el estado se persiste en status_color/last_reviewed_at. */
  public async updateQuoteStatus(quoteId: string, color: string | null): Promise<{ error: any }> {
    const { error } = await this.client
      .from('quotes')
      .update({ status_color: color, last_reviewed_at: new Date().toISOString() })
      .eq('id', quoteId);
    return { error };
  }

  public async getAllQuotesWithSeller(): Promise<{ data: any; error: any }> {
    const { data, error } = await this.client
      .from('quotes')
      .select(`id, client_name, brand, model, year, pricenet, color, fijada, revisada, created_at,
        profiles!seller_id (full_name)`)
      .order('created_at', { ascending: false })
      .limit(200);
    if (error) return { data: null, error };
    const mapped = data.map((q: any) => ({
      ...q,
      seller_name: q.profiles?.full_name || 'N/A',
    }));
    return { data: mapped, error: null };
  }
}
