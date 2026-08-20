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

  private async loadProfile(userId: string): Promise<void> {
    const { data, error } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    if (!error && data) {
      this.currentProfileSignal.set(data as Profile);
    } else {
      console.warn('No se encontró perfil para el usuario:', userId);
    }
  }

  // ==================== CATÁLOGOS ====================

  // ✅ CATÁLOGO DE PLACAS: devuelve directamente el array estático (síncrono)
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
      suggestedPriceNet: Number(item.suggestedpricenet) || 0,   // ← ¡ojo! minúsculas
      isHybridOrElectric: Boolean(item.ishybridorelectric) || false, // ← minúsculas
      year: Number(item.year) || 2026
    }));
  }
  // ==================== COTIZACIONES ====================

  public async saveQuote(quote: QuoteCalculationResult): Promise<void> {
    const user = this.currentUserSignal();
    if (!user) {
      console.warn('No hay usuario logueado. Cotización guardada solo localmente.');
      this.saveLocalQuote(quote);
      return;
    }

    // ✅ CORRECCIÓN: acceder a los datos desde quote.input
    const quoteData = {
      seller_id: user.id,
      client_name: quote.input.clientName || '',
      brand: quote.input.brand,
      model: quote.input.model,
      year: quote.input.year,
      priceNet: quote.input.priceNet,
      isHybridOrElectric: quote.input.isHybridOrElectric,
      termMonths: quote.input.termMonths,
      extraordinaryRentPct: quote.input.extraordinaryRentPct,
      securityDepositPct: quote.input.securityDepositPct,
      selectedStatePlateId: quote.input.selectedStatePlateId,
      isInsuranceEstimated: quote.input.isInsuranceEstimated,
      totalPayment: 0 // Si no lo calculas, pon 0 o un valor por defecto
    };

    const { error } = await this.supabase
      .from('quotes')
      .insert([quoteData]);

    if (error) {
      console.error('Error saving quote to Supabase:', error);
      this.saveLocalQuote(quote);
    } else {
      this.saveLocalQuote(quote);
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
      // Mapear datos de la tabla al modelo QuoteCalculationResult
      const mappedQuotes: QuoteCalculationResult[] = data.map((q: any) => ({
        input: {
          clientName: q.client_name,
          brand: q.brand,
          model: q.model,
          year: q.year,
          priceNet: q.priceNet,
          isHybridOrElectric: q.isHybridOrElectric,
          termMonths: q.termMonths,
          extraordinaryRentPct: q.extraordinaryRentPct,
          securityDepositPct: q.securityDepositPct,
          selectedStatePlateId: q.selectedStatePlateId,
          isInsuranceEstimated: q.isInsuranceEstimated,
        },
        options: {
          option1: {} as any, // No tenemos estos datos en la tabla, pero se pueden reconstruir si se guardan
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

    // Usar RPC para evitar problemas de RLS
    const { data, error } = await this.supabase
      .rpc('get_profile_by_seller', { seller_number_input: sellerNumber });

    if (error) {
      console.error('❌ Error al buscar perfil:', error);
      return { data: null, error };
    }

    // La función devuelve un array, tomamos el primero
    const profile = data && data.length > 0 ? data[0] : null;
    console.log('✅ Perfil encontrado:', profile);

    return { data: profile, error: null };
  }
  public isAdmin(): boolean {
    return this.currentProfileSignal()?.role === 'admin';
  }

  public getCurrentSellerId(): string | null {
    return this.currentUserSignal()?.id || null;
  }
}