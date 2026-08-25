import { Injectable, signal } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { StatePlateOption, STATE_PLATES_CATALOG, QuoteCalculationResult } from '../models/leasing.model';

export interface VehicleCatalogItem {
  id: string;
  brand: string;
  model: string;
  suggestedPriceNet: number;
  isHybridOrElectric: boolean;
  year: number;
}

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'seller';
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  private currentUserSignal = signal<User | null>(null);
  private currentProfileSignal = signal<Profile | null>(null);
  private savedQuotesSignal = signal<QuoteCalculationResult[]>([]);

  public readonly currentUser = this.currentUserSignal.asReadonly();
  public readonly currentProfile = this.currentProfileSignal.asReadonly();
  public readonly savedQuotes = this.savedQuotesSignal.asReadonly();

  public get client() {
    return this.supabase;
  }

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
    this.loadSession();
    this.loadFromLocalStorage();
  }

  private async loadSession(): Promise<void> {
    const { data: { session } } = await this.supabase.auth.getSession();
    if (session?.user) {
      this.currentUserSignal.set(session.user);
      await this.loadProfile(session.user.id);
      await this.loadQuotes();
    }
  }

  public async signUp(email: string, password: string, fullName: string): Promise<{ error: any }> {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } }
    });
    if (!error && data.user) {
      this.currentUserSignal.set(data.user);
      await this.loadProfile(data.user.id);
    }
    return { error };
  }

  public async signIn(email: string, password: string): Promise<{ error: any }> {
    const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
    if (!error && data.user) {
      this.currentUserSignal.set(data.user);
      await this.loadProfile(data.user.id);
      await this.loadQuotes();
    }
    return { error };
  }

  public async signOut(): Promise<void> {
    await this.supabase.auth.signOut();
    this.currentUserSignal.set(null);
    this.currentProfileSignal.set(null);
    this.savedQuotesSignal.set([]);
    localStorage.removeItem('golease_quotes');
  }

  /**
   * Carga el perfil de un usuario y lo guarda en la señal.
   * Devuelve el perfil cargado para que pueda ser usado directamente.
   */
  public async loadProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    if (!error && data) {
      this.currentProfileSignal.set(data as Profile);
      return data as Profile;
    } else {
      console.warn('No se encontró perfil para el usuario:', userId);
      return null;
    }
  }

  /**
   * Fuerza la recarga del perfil del usuario actualmente autenticado.
   * Útil después de un cambio de rol o para refrescar datos.
   */
  public async refreshProfile(): Promise<Profile | null> {
    const user = this.currentUserSignal();
    if (!user) return null;
    return this.loadProfile(user.id);
  }

  public async getProfileById(userId: string): Promise<{ data: any; error: any }> {
    const { data, error } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    return { data, error };
  }

  // ==================== CATÁLOGOS ====================

  public getStatePlates(): StatePlateOption[] {
    return STATE_PLATES_CATALOG;
  }

  public async getVehicleCatalog(): Promise<VehicleCatalogItem[]> {
    const { data, error } = await this.supabase
      .from('vehicles')
      .select('*')
      .order('brand', { ascending: true });
    if (error) {
      console.error('Error fetching vehicles:', error);
      return [];
    }
    return data.map((item: any) => ({
      id: item.id,
      brand: item.brand,
      model: item.model,
      suggestedPriceNet: Number(item.suggestedpricenet) || 0,
      isHybridOrElectric: Boolean(item.ishybridorelectric) || false,
      year: Number(item.year) || 2026
    }));
  }

  // ==================== COTIZACIONES ====================

  public async saveQuote(quote: QuoteCalculationResult, quoteId?: number): Promise<{ id: number | null; error: any }> {
    const user = this.currentUserSignal();
    if (!user) {
      console.warn('No hay usuario logueado. Cotización guardada solo localmente.');
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
      totalpayment: 0
    };

    if (quoteId) {
      const { error } = await this.supabase
        .from('quotes')
        .update(quoteData)
        .eq('id', quoteId)
        .eq('seller_id', user.id);

      if (error) {
        console.error('Error actualizando cotización:', error);
        this.saveLocalQuote(quote);
        return { id: null, error };
      }
      this.saveLocalQuote(quote);
      return { id: quoteId, error: null };
    } else {
      const { data, error } = await this.supabase
        .from('quotes')
        .insert([quoteData])
        .select('id');

      if (error) {
        console.error('Error insertando cotización:', error);
        this.saveLocalQuote(quote);
        return { id: null, error };
      }
      const insertedId = data?.[0]?.id || null;
      this.saveLocalQuote(quote);
      return { id: insertedId, error: null };
    }
  }

  public async loadQuotes(): Promise<void> {
    const user = this.currentUserSignal();
    if (!user) return;

    const profile = this.currentProfileSignal();
    let query = this.supabase.from('quotes').select('*');

    if (profile?.role !== 'admin') {
      query = query.eq('seller_id', user.id);
    }

    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) {
      console.error('Error loading quotes:', error);
      this.loadFromLocalStorage();
    } else if (data) {
      const mappedQuotes: QuoteCalculationResult[] = data.map((q: any) => ({
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
        options: {
          option1: {} as any,
          option2: {} as any,
          option3: {} as any,
        },
        generatedAt: new Date(q.created_at)
      }));
      this.savedQuotesSignal.set(mappedQuotes);
      localStorage.setItem('golease_quotes', JSON.stringify(mappedQuotes));
    }
  }

  // ==================== LOCAL STORAGE (RESPALDO) ====================

  private saveLocalQuote(quote: QuoteCalculationResult): void {
    const updated = [quote, ...this.savedQuotesSignal()];
    this.savedQuotesSignal.set(updated);
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.setItem('golease_quotes', JSON.stringify(updated));
      } catch (e) {
        console.warn('LocalStorage error saving quote:', e);
      }
    }
  }

  private loadFromLocalStorage(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const stored = localStorage.getItem('golease_quotes');
        if (stored) {
          this.savedQuotesSignal.set(JSON.parse(stored));
        }
      } catch (e) {
        console.warn('LocalStorage load error:', e);
      }
    }
  }

  // ==================== UTILIDADES ====================

  public async getVendedorQuotes(sellerId: string): Promise<{ data: any; error: any }> {
    const { data, error } = await this.supabase
      .from('quotes')
      .select('*')
      .eq('seller_id', sellerId)
      .order('created_at', { ascending: false });
    return { data, error };
  }

  public async updateProfile(userId: string, data: any): Promise<{ error: any }> {
    const { error } = await this.supabase
      .from('profiles')
      .upsert(
        { id: userId, ...data },
        { onConflict: 'id' }
      );
    return { error };
  }

  public async getProfileBySellerNumber(sellerNumber: string): Promise<{ data: any; error: any }> {
    console.log('🔍 Buscando perfil con seller_number:', sellerNumber);

    const { data, error } = await this.supabase
      .rpc('get_profile_by_seller', { seller_number_input: sellerNumber });

    if (error) {
      console.error('❌ Error al buscar perfil:', error);
      return { data: null, error };
    }

    const profile = data && data.length > 0 ? data[0] : null;
    console.log('✅ Perfil encontrado:', profile);

    return { data: profile, error: null };
  }

  public async getAdmins(): Promise<{ data: any; error: any }> {
    const { data, error } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('role', 'admin')
      .order('created_at', { ascending: false });
    return { data, error };
  }

  public async getSellersWithQuoteCount(): Promise<{ data: any; error: any }> {
    const { data: profiles, error: profilesError } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('role', 'seller')
      .order('created_at', { ascending: false });

    if (profilesError) return { data: null, error: profilesError };

    const sellersWithCounts = await Promise.all(
      profiles.map(async (profile: any) => {
        const { count, error } = await this.supabase
          .from('quotes')
          .select('*', { count: 'exact', head: true })
          .eq('seller_id', profile.id);
        return {
          ...profile,
          quote_count: count || 0,
          active: profile.active !== undefined ? profile.active : true
        };
      })
    );

    return { data: sellersWithCounts, error: null };
  }

  public async getAllQuotesWithSeller(): Promise<{ data: any; error: any }> {
    const { data, error } = await this.supabase
      .from('quotes')
      .select(`
        *,
        profiles!seller_id (full_name)
      `)
      .order('created_at', { ascending: false });

    if (error) return { data: null, error };
    const mapped = data.map((q: any) => ({
      ...q,
      seller_name: q.profiles?.full_name || 'N/A'
    }));
    return { data: mapped, error: null };
  }

  public async deleteSeller(sellerId: string): Promise<{ error: any }> {
    const { error: quotesError } = await this.supabase
      .from('quotes')
      .delete()
      .eq('seller_id', sellerId);
    if (quotesError) return { error: quotesError };

    const { error } = await this.supabase
      .from('profiles')
      .delete()
      .eq('id', sellerId);
    return { error };
  }

  public isAdmin(): boolean {
    return this.currentProfileSignal()?.role === 'admin';
  }

  public getCurrentSellerId(): string | null {
    return this.currentUserSignal()?.id || null;
  }
}