import { Injectable, signal } from '@angular/core';
import { createClient, SupabaseClient, Session, User } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { StatePlateOption, STATE_PLATES_CATALOG, QuoteCalculationResult, CalculatorConfig, DEFAULT_CALCULATOR_CONFIG } from '../models/leasing.model';

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

  private readonly maxFieldLength: Record<string, number> = {
    full_name: 120,
    seller_number: 40,
    agency_name: 120,
    agency_brand: 120,
    agency_location: 300,
    email: 160,
    content: 3000,
    client_name: 120,
    brand: 80,
    model: 80,
  };

  // ✅ Catálogo de placas de estado — cacheado desde la base de datos
  private statePlatesSignal = signal<StatePlateOption[]>([...STATE_PLATES_CATALOG]);
  private calculatorConfigSignal = signal<CalculatorConfig>(DEFAULT_CALCULATOR_CONFIG);

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
    this.loadCalculatorConfig();
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

  public sanitizeText(value: unknown, fieldName: string, maxLength = 200): string {
    const raw = String(value ?? '');
    const normalized = raw
      .replace(/<script\b[^>]*>.*?<\/script>/gi, '')
      .replace(/<[^>]*>/g, '')
      .replace(/javascript\s*:/gi, '')
      .replace(/on\w+\s*=\s*(['"]).*?\1/gi, '')
      .replace(/[\u0000-\u001F\u007F]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    const limit = this.maxFieldLength[fieldName] ?? maxLength;
    return normalized.slice(0, limit);
  }

  public canManageProfile(targetUserId: string): boolean {
    const currentUser = this.currentUserSignal();
    const currentProfile = this.currentProfileSignal();

    if (!currentUser || !targetUserId) {
      return false;
    }

    if (currentUser.id === targetUserId) {
      return true;
    }

    return currentProfile?.role === 'admin' && currentProfile?.active !== false;
  }

  public async signUp(email: string, password: string, fullName: string): Promise<{ error: any }> {
    const safeEmail = this.sanitizeText(email, 'email', 160).toLowerCase();
    const safeName = this.sanitizeText(fullName, 'full_name', 120);

    const { data, error } = await this.supabase.auth.signUp({
      email: safeEmail,
      password,
      options: { data: { full_name: safeName } }
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
    if (!userId || !this.canManageProfile(userId)) {
      return { data: null, error: { message: 'No tienes permisos para consultar este perfil.' } };
    }

    const { data, error } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    return { data, error };
  }

  // Dentro de SupabaseService
  public async deleteUserFromAuth(userId: string): Promise<{ error: any }> {
    const currentUser = this.currentUserSignal();
    const currentProfile = this.currentProfileSignal();

    if (!currentUser || !this.canManageProfile(userId)) {
      return { error: { message: 'No tienes permisos para eliminar este usuario.' } };
    }

    if (currentUser.id === userId) {
      return { error: { message: 'No puedes eliminar tu propio usuario.' } };
    }

    if (currentProfile?.role !== 'admin') {
      return { error: { message: 'Solo los administradores pueden eliminar usuarios.' } };
    }

    const { error } = await this.supabase.rpc('delete_user', { user_id: userId });
    return { error };
  }

  /**
   * Crea un usuario (admin/seller) desde el panel de administración usando la
   * RPC `create_user` (security definer). A diferencia de signUp(), NO cambia
   * la sesión actual, por lo que no requiere restaurar sesión ni recargar la página.
   * Si la RPC no está disponible (base sin migrar), devuelve error para que el
   * llamador use el fallback con signUp().
   */
  public async createUserAsAdmin(payload: {
    email: string;
    password: string;
    full_name: string;
    role: 'admin' | 'seller';
  }): Promise<{ data: { id: string } | null; error: any }> {
    const currentProfile = this.currentProfileSignal();
    if (!this.currentUserSignal() || currentProfile?.role !== 'admin' || currentProfile?.active === false) {
      return { data: null, error: { message: 'No tienes permisos para crear usuarios.' } };
    }

    const safeEmail = this.sanitizeText(payload.email, 'email', 160).toLowerCase();
    const safeName = this.sanitizeText(payload.full_name, 'full_name', 120);

    if (!safeEmail || !payload.password || payload.password.length < 6) {
      return { data: null, error: { message: 'Datos inválidos para crear el usuario.' } };
    }

    const { data, error } = await this.supabase.rpc('create_user', {
      p_email: safeEmail,
      p_password: payload.password,
      p_full_name: safeName,
      p_role: payload.role
    });

    if (error) return { data: null, error };

    if (data && typeof data === 'object' && (data as any)?.error) {
      return { data: null, error: { message: (data as any).error } };
    }

    const userId = (data as any)?.id ?? null;
    return { data: userId ? { id: userId } : null, error: null };
  }

  /**
   * Restaura una sesión capturada previamente con getSession().
   * Se usa en el fallback de creación de usuarios: signUp() inicia sesión
   * con el usuario nuevo y pisa la sesión del admin. Además de restaurar
   * el token en el cliente, sincroniza explícitamente las señales de
   * usuario y perfil para que la UI vuelva inmediatamente al administrador
   * original sin recargar la página.
   */
  public async restoreSession(session: Session | null | undefined): Promise<void> {
    if (!session) return;
    await this.supabase.auth.setSession({
      access_token: session.access_token,
      refresh_token: session.refresh_token
    });
    // IMPORTANTE: restaurar las señales con el usuario de la sesión guardada
    // (el admin). Leer currentUser() aquí devolvería al usuario recién creado,
    // porque signUp() sobrescribió la señal.
    this.currentUserSignal.set(session.user);
    await this.loadProfile(session.user.id);
    this.triggerProfileRefresh();
  }

  public async updateUserPassword(userId: string, password: string): Promise<{ error: any }> {
    const currentUser = this.currentUserSignal();
    const currentProfile = this.currentProfileSignal();

    if (!currentUser || !this.canManageProfile(userId)) {
      return { error: { message: 'No tienes permisos para actualizar esta contraseña.' } };
    }

    if (password.length < 6 || password.length > 128) {
      return { error: { message: 'La contraseña debe tener entre 6 y 128 caracteres.' } };
    }

    if (currentProfile?.role !== 'admin' && currentUser.id !== userId) {
      return { error: { message: 'No puedes restablecer otra contraseña.' } };
    }

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

    public getCalculatorConfig(): CalculatorConfig {
      return this.calculatorConfigSignal();
    }

    public async loadCalculatorConfig(): Promise<void> {
      try {
        const { data, error } = await this.supabase
          .from('calculator_settings')
          .select('settings')
          .eq('id', 1)
          .maybeSingle();
        if (!error && data?.settings) {
          this.calculatorConfigSignal.set(this.mergeCalculatorConfig(data.settings));
        }
      } catch (error) {
        console.warn('No se pudo cargar la configuración del cotizador:', error);
      }
    }

    public async updateCalculatorConfig(settings: CalculatorConfig): Promise<{ error: any }> {
      const profile = this.currentProfileSignal();
      if (!this.currentUserSignal() || profile?.role !== 'admin' || profile.active === false) {
        return { error: { message: 'Solo un administrador puede modificar estos parámetros.' } };
      }
      const { error } = await this.supabase
        .from('calculator_settings')
        .upsert({ id: 1, settings, updated_by: this.currentUserSignal()?.id }, { onConflict: 'id' });
      if (!error) this.calculatorConfigSignal.set(this.mergeCalculatorConfig(settings));
      return { error };
    }

    private mergeCalculatorConfig(value: Partial<CalculatorConfig>): CalculatorConfig {
      return {
        ...DEFAULT_CALCULATOR_CONFIG,
        ...value,
        termRates: { ...DEFAULT_CALCULATOR_CONFIG.termRates, ...(value.termRates || {}) },
      };
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
        .select('id, name, costnet, estado, disponible')
        .order('name');

      if (!error && data && data.length > 0) {
        const plates: StatePlateOption[] = data.map((p: any) => ({
          id: p.id,
          name: p.name,
          costNet: Number(p.costnet) || 0,
          estado: p.estado ?? '',
          disponible: p.disponible !== false,
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
      client_name: this.sanitizeText(quote.input.clientName || '', 'client_name', 120),
      brand: this.sanitizeText(quote.input.brand, 'brand', 80),
      model: this.sanitizeText(quote.input.model, 'model', 80),
      year: quote.input.year,
      pricenet: quote.input.priceNet,
      ishybridorelectric: quote.input.isHybridOrElectric,
      termmonths: quote.input.termMonths,
      extraordinaryrentpct: quote.input.extraordinaryRentPct || 0,
      securitydepositpct: quote.input.securityDepositPct || 0,
      selectedstateplateid: this.sanitizeText(quote.input.selectedStatePlateId || 'pendiente', 'agency_brand', 40),
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

    const sanitizedContent = this.sanitizeText(content, 'content', 3000);

    const { error } = await this.supabase
      .from('notes')
      .insert([{
        entity_type: entityType,
        entity_id: entityId,
        content: sanitizedContent,
        created_by: user.id
      }]);
    return { error };
  }

  public async updateNote(noteId: string, content: string): Promise<{ error: any }> {
    const currentUser = this.currentUserSignal();
    if (!currentUser) return { error: { message: 'No hay usuario autenticado' } };

    const sanitizedContent = this.sanitizeText(content, 'content', 3000);

    const { data: existingNote, error: readError } = await this.supabase
      .from('notes')
      .select('created_by')
      .eq('id', noteId)
      .maybeSingle();

    if (readError || !existingNote) {
      return { error: readError || { message: 'Nota no encontrada.' } };
    }

    if (existingNote.created_by !== currentUser.id && this.currentProfileSignal()?.role !== 'admin') {
      return { error: { message: 'No tienes permisos para editar esta nota.' } };
    }

    const { error } = await this.supabase
      .from('notes')
      .update({ content: sanitizedContent, updated_at: new Date().toISOString() })
      .eq('id', noteId);
    return { error };
  }

  public async deleteNote(noteId: string): Promise<{ error: any }> {
    const currentUser = this.currentUserSignal();
    if (!currentUser) return { error: { message: 'No hay usuario autenticado' } };

    const { data: existingNote, error: readError } = await this.supabase
      .from('notes')
      .select('created_by')
      .eq('id', noteId)
      .maybeSingle();

    if (readError || !existingNote) {
      return { error: readError || { message: 'Nota no encontrada.' } };
    }

    if (existingNote.created_by !== currentUser.id && this.currentProfileSignal()?.role !== 'admin') {
      return { error: { message: 'No tienes permisos para eliminar esta nota.' } };
    }

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
    const currentUser = this.currentUserSignal();
    const currentProfile = this.currentProfileSignal();

    if (!currentUser) {
      return { data: null, error: { message: 'No hay usuario autenticado.' } };
    }

    if (currentUser.id !== sellerId && currentProfile?.role !== 'admin') {
      return { data: null, error: { message: 'No tienes permisos para consultar estas cotizaciones.' } };
    }

    const { data, error } = await this.supabase
      .from('quotes')
      .select('*')
      .eq('seller_id', sellerId)
      .order('created_at', { ascending: false });
    return { data, error };
  }

  public async updateProfile(userId: string, data: any): Promise<{ error: any }> {
    if (!userId || !this.canManageProfile(userId)) {
      return { error: { message: 'No tienes permisos para modificar este perfil.' } };
    }

    const safeData: Record<string, any> = {};
    for (const [key, value] of Object.entries(data ?? {})) {
      if (key === 'id' || key === 'email') {
        continue;
      }

      if (typeof value === 'string') {
        safeData[key] = this.sanitizeText(value, key, this.maxFieldLength[key] ?? 200);
      } else if (typeof value === 'number' || typeof value === 'boolean' || value === null) {
        safeData[key] = value;
      } else if (value !== undefined) {
        safeData[key] = this.sanitizeText(String(value), key, this.maxFieldLength[key] ?? 200);
      }
    }

    const { error } = await this.supabase
      .from('profiles')
      .upsert(
        { id: userId, ...safeData },
        { onConflict: 'id' }
      );
    return { error };
  }

  public async getProfileBySellerNumber(sellerNumber: string): Promise<{ data: any; error: any }> {
    const { data, error } = await this.supabase
      .rpc('get_profile_by_seller', { seller_number_input: sellerNumber });

    if (error) {
      console.error('❌ Error al buscar perfil:', error);
      return { data: null, error };
    }

    const profile = data && data.length > 0 ? data[0] : null;

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
  redirectTo: `${window.location.origin}/#/reset-password`  
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
    // ✅ Mapeo correcto de costnet a costNet
    return {
      data: data.map((p: any) => ({
        id: p.id,
        name: p.name,
        costNet: Number(p.costnet) || 0,
        estado: p.estado ?? '',
        disponible: p.disponible !== false,
      })),
      error: null,
    };
  }

  public async createStatePlate(plate: { name: string; costnet: number; estado: string; disponible: boolean }): Promise<{ error: any }> {
    const { error } = await this.supabase.from('state_plates').insert([{
      id: crypto.randomUUID(), // Generar UUID automáticamente
      name: plate.name,
      costnet: plate.costnet,
      estado: plate.estado || null,
      disponible: plate.disponible !== false,
    }]);
    if (!error) {
      await this.loadStatePlates(); // Actualizar caché local
    }
    return { error };
  }

  public async updateStatePlate(id: string, plate: { name: string; costnet: number; estado: string; disponible: boolean }): Promise<{ error: any }> {
    const { error } = await this.supabase
      .from('state_plates')
      .update({
        name: plate.name,
        costnet: plate.costnet,
        estado: plate.estado || null,
        disponible: plate.disponible !== false,
      })
      .eq('id', id);
    if (!error) {
      await this.loadStatePlates();
    }
    return { error };
  }

  public async toggleStatePlateAvailability(id: string, disponible: boolean): Promise<{ error: any }> {
    const { error } = await this.supabase
      .from('state_plates')
      .update({ disponible })
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
