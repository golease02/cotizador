import { Injectable, signal } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
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
  recovery_email?: string;
  full_name: string;
  role: 'admin' | 'seller';
  active?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

    private currentUserSignal = signal<User | null>(null);
  private currentProfileSignal = signal<Profile | null>(null);
  private savedQuotesSignal = signal<QuoteCalculationResult[]>([]);

  // ✅ Catálogo de placas de estado — cacheado desde la base de datos
  private statePlatesSignal = signal<StatePlateOption[]>([...STATE_PLATES_CATALOG]);

  private refreshProfileSubject = new BehaviorSubject<void>(undefined);
  public refreshProfile$ = this.refreshProfileSubject.asObservable();

  // ✅ Método para emitir el evento de refresco
  public triggerProfileRefresh(): void {
    this.refreshProfileSubject.next();
  }

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
    this.loadStatePlates();
  }

  private async loadSession(): Promise<void> {
    const { data: { session } } = await this.supabase.auth.getSession();
    if (session?.user) {
      this.currentUserSignal.set(session.user);
      const profile = await this.loadProfile(session.user.id);
      if (profile?.active === false) {
        await this.signOut();
        return;
      }
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
      const profile = await this.loadProfile(data.user.id);
      if (profile?.active === false) {
        await this.signOut();
        return { error: { message: 'Tu cuenta está inactiva. Contacta a un administrador.' } };
      }
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
    console.log('🔍 getProfileById llamado con ID:', userId);
    const { data, error } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    console.log('📦 Resultado getProfileById:', { data, error });
    return { data, error };
  }

  // Dentro de SupabaseService
  public async deleteUserFromAuth(userId: string): Promise<{ error: any }> {
    const { error } = await this.supabase.rpc('delete_user', { user_id: userId });
    return { error };
  }

  public async updateUserPassword(userId: string, password: string): Promise<{ error: any }> {
    const { error } = await this.supabase.rpc('update_user_password', {
      target_user_id: userId,
      new_password: password
    });
    return { error };
  }



  // ==================== CATÁLOGOS ====================

    public getStatePlates(): StatePlateOption[] {
    return this.statePlatesSignal();
  }

  /**
   * Carga el catálogo de placas de estado desde la base de datos y lo cachea.
   * Actualiza STATE_PLATES_CATALOG in-place para que el FinancialCalculator
   * (que importa la constante directamente) también tenga los datos de la BD.
   * Garantiza que la opción 'pendiente' (costo $0, opción por defecto del
   * cotizador) siempre esté presente.
   */
  public async loadStatePlates(): Promise<void> {
    try {
      const { data, error } = await this.supabase
        .from('state_plates')
        .select('id, name, costnet')
        .order('name');

      if (!error && data && data.length > 0) {
        const plates: StatePlateOption[] = data.map((p: any) => ({
          id: p.id,
          name: p.name,
          costNet: Number(p.costnet) || 0,
        }));

        // ✅ Garantizar que 'pendiente' siempre exista (opción por defecto del cotizador)
        const hasPendiente = plates.some((p) => p.id === 'pendiente');
        if (!hasPendiente) {
          const fallback = STATE_PLATES_CATALOG.find((p) => p.id === 'pendiente');
          if (fallback) plates.push(fallback);
        }

        this.statePlatesSignal.set(plates);

        // Actualizar la constante exportada in-place para el FinancialCalculator
        STATE_PLATES_CATALOG.length = 0;
        STATE_PLATES_CATALOG.push(...plates);
      }
    } catch (err) {
      console.warn('No se pudieron cargar placas de estado desde la BD:', err);
    }
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
        .insert([{ ...quoteData, revisada: false, color: 'reciente' }])
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

  // ==================== NOTAS ====================

  public async getNotes(entityType: 'seller' | 'quote', entityId: string): Promise<{ data: any; error: any }> {
    const { data, error } = await this.supabase
      .from('notes')
      .select('*, profiles!created_by(full_name)')
      .eq('entity_type', entityType)
      .eq('entity_id', entityId)
      .order('created_at', { ascending: false });
    return { data, error };
  }

  public async createNote(entityType: 'seller' | 'quote', entityId: string, content: string): Promise<{ error: any }> {
    const user = this.currentUserSignal();
    if (!user) return { error: { message: 'No hay usuario autenticado' } };
    const { error } = await this.supabase
      .from('notes')
      .insert([{
        entity_type: entityType,
        entity_id: entityId,
        content,
        created_by: user.id
      }]);
    return { error };
  }

  public async updateNote(noteId: string, content: string): Promise<{ error: any }> {
    const { error } = await this.supabase
      .from('notes')
      .update({ content, updated_at: new Date().toISOString() })
      .eq('id', noteId);
    return { error };
  }

  public async deleteNote(noteId: string): Promise<{ error: any }> {
    const { error } = await this.supabase
      .from('notes')
      .delete()
      .eq('id', noteId);
    return { error };
  }

  // ==================== ESTADO DE COTIZACIÓN ====================

  public async updateQuoteStatus(quoteId: string, color: string | null): Promise<{ error: any }> {
    const { error } = await this.supabase
      .from('quotes')
      .update({
        status_color: color,
        last_reviewed_at: new Date().toISOString()
      })
      .eq('id', quoteId);
    return { error };
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

  public async requestPasswordRecovery(
    sellerNumber: string,
    recoveryEmail: string
  ): Promise<{ error: any }> {
    const normalizedEmail = recoveryEmail.trim().toLowerCase();
    const { data: accepted, error } = await this.supabase.rpc('request_password_recovery', {
      seller_number_input: sellerNumber.trim(),
      recovery_email_input: normalizedEmail
    });

    // Always issue the same client response to avoid revealing whether a number exists.
    if (!error && accepted) {
      await this.supabase.auth.resetPasswordForEmail(normalizedEmail, {
        redirectTo: `${window.location.origin}/reset-password`
      });
    }

    return { error };
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

  // ==================== CRUD: VEHÍCULOS ====================\

  public async getAllVehicles(): Promise<{ data: VehicleCatalogItem[]; error: any }> {
    const { data, error } = await this.supabase
      .from('vehicles')
      .select('*')
      .order('brand', { ascending: true });

    if (error) {
      console.error('Error fetching vehicles:', error);
      return { data: [], error };
    }
    return {
      data: data.map((item: any) => ({
        id: item.id,
        brand: item.brand,
        model: item.model,
        suggestedPriceNet: Number(item.suggestedpricenet) || 0,
        isHybridOrElectric: Boolean(item.ishybridorelectric) || false,
        year: Number(item.year) || new Date().getFullYear(),
      })),
      error: null,
    };
  }

  public async createVehicle(vehicle: {
    brand: string;
    model: string;
    year: number;
    suggestedPriceNet: number;
    isHybridOrElectric: boolean;
  }): Promise<{ error: any }> {
    const { error } = await this.supabase.from('vehicles').insert([{
      id: crypto.randomUUID(),
      brand: vehicle.brand,
      model: vehicle.model,
      suggestedpricenet: vehicle.suggestedPriceNet,
      ishybridorelectric: vehicle.isHybridOrElectric,
      year: vehicle.year,
    }]);
    return { error };
  }

  public async updateVehicle(
    id: string,
    vehicle: {
      brand: string;
      model: string;
      year: number;
      suggestedPriceNet: number;
      isHybridOrElectric: boolean;
    }
  ): Promise<{ error: any }> {
    const { error } = await this.supabase
      .from('vehicles')
      .update({
        brand: vehicle.brand,
        model: vehicle.model,
        suggestedpricenet: vehicle.suggestedPriceNet,
        ishybridorelectric: vehicle.isHybridOrElectric,
        year: vehicle.year,
      })
      .eq('id', id);
    return { error };
  }

  public async deleteVehicle(id: string): Promise<{ error: any }> {
    const { error } = await this.supabase.from('vehicles').delete().eq('id', id);
    return { error };
  }

  // ==================== CRUD: PLACAS DE ESTADO ====================\

  public async getAllStatePlates(): Promise<{ data: StatePlateOption[]; error: any }> {
    const { data, error } = await this.supabase
      .from('state_plates')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching state plates:', error);
      return { data: [], error };
    }
    return {
      data: data.map((p: any) => ({
        id: p.id,
        name: p.name,
        costNet: Number(p.costnet) || 0,
      })),
      error: null,
    };
  }

  public async createStatePlate(plate: {
    name: string;
    costnet: number;
  }): Promise<{ error: any }> {
    const { error } = await this.supabase.from('state_plates').insert([{
      // El ID se genera automáticamente (UUID) para no pedirlo en el formulario
      id: crypto.randomUUID(),
      name: plate.name,
      costnet: plate.costnet,
    }]);
    if (!error) {
      await this.loadStatePlates();
    }
    return { error };
  }

  public async updateStatePlate(
    id: string,
    plate: { name: string; costnet: number }
  ): Promise<{ error: any }> {
    const { error } = await this.supabase
      .from('state_plates')
      .update(plate)
      .eq('id', id);
    if (!error) {
      await this.loadStatePlates();
    }
    return { error };
  }

  public async deleteStatePlate(id: string): Promise<{ error: any }> {
    const { error } = await this.supabase.from('state_plates').delete().eq('id', id);
    if (!error) {
      await this.loadStatePlates();
    }
    return { error };
  }
}
