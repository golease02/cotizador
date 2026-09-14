import { Injectable, Optional, signal, inject } from '@angular/core';
import { StatePlateOption, STATE_PLATES_CATALOG, CalculatorConfig, DEFAULT_CALCULATOR_CONFIG } from '../models/leasing.model';
import { getSupabaseClient, currentUserSignal } from './supabase-client';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  private client = getSupabaseClient();
  private auth: AuthService;

  private statePlatesSignal = signal<StatePlateOption[]>([...STATE_PLATES_CATALOG]);
  private calculatorConfigSignal = signal<CalculatorConfig>(DEFAULT_CALCULATOR_CONFIG);

  constructor(@Optional() auth?: AuthService) {
    this.auth = auth ?? inject(AuthService);
  }

  private statePlatesLoaded = false;
  private configLoaded = false;

  public readonly statePlates = this.statePlatesSignal.asReadonly();
  public readonly calculatorConfig = this.calculatorConfigSignal.asReadonly();

  public getStatePlates(): StatePlateOption[] {
    return this.statePlatesSignal();
  }

  public getCalculatorConfig(): CalculatorConfig {
    return this.calculatorConfigSignal();
  }

  /** Carga placas desde BD una sola vez; llamadas posteriores devuelven la caché. */
  public async loadStatePlates(): Promise<void> {
    if (this.statePlatesLoaded) return;
    try {
      const { data, error } = await this.client
        .from('state_plates')
        .select('id, name, costnet, estado, disponible')
        .order('name');

      if (error || !data) return;

      const plates: StatePlateOption[] = data.map((p: any) => ({
        id: p.id,
        name: p.name,
        costNet: Number(p.costnet) || 0,
        estado: p.estado ?? '',
        disponible: p.disponible !== false,
      }));

      // Garantizar que 'pendiente' siempre exista (opción por defecto del cotizador)
      if (!plates.some((p) => p.id === 'pendiente')) {
        const fallback = STATE_PLATES_CATALOG.find((p) => p.id === 'pendiente');
        if (fallback) plates.push(fallback);
      }

      this.statePlatesSignal.set(plates);
      this.statePlatesLoaded = true;
    } catch (err) {
      console.warn('No se pudieron cargar placas de estado desde la BD:', err);
    }
  }

  public async loadCalculatorConfig(): Promise<void> {
    if (this.configLoaded) return;
    // La tabla calculator_settings solo es legible con rol authenticated
    if (!currentUserSignal()) return;
    try {
      const { data, error } = await this.client
        .from('calculator_settings')
        .select('settings')
        .eq('id', 1)
        .maybeSingle();
      if (!error && data?.settings) {
        this.calculatorConfigSignal.set(this.mergeCalculatorConfig(data.settings));
        this.configLoaded = true;
      }
    } catch (err) {
      console.warn('No se pudo cargar la configuración del cotizador:', err);
    }
  }

  public async updateCalculatorConfig(settings: CalculatorConfig): Promise<{ error: any }> {
    const profile = this.auth.currentProfile();
    const role = profile?.role;
    const isStaff = role === 'super_admin' || role === 'socio';
    if (!currentUserSignal() || !profile || !isStaff || profile.active === false) {
      return { error: { message: 'Solo el super admin o un socio autorizado puede modificar estos parámetros.' } };
    }
    if (role === 'socio' && !this.auth.canAccessModule('parameters')) {
      return { error: { message: 'No tienes permiso para modificar parámetros.' } };
    }
    const { error } = await this.client
      .from('calculator_settings')
      .upsert({ id: 1, settings, updated_by: currentUserSignal()?.id }, { onConflict: 'id' });
    if (!error) {
      this.calculatorConfigSignal.set(this.mergeCalculatorConfig(settings));
      this.configLoaded = true;
    }
    return { error };
  }

  private mergeCalculatorConfig(value: Partial<CalculatorConfig>): CalculatorConfig {
    return {
      ...DEFAULT_CALCULATOR_CONFIG,
      ...value,
      termRates: { ...DEFAULT_CALCULATOR_CONFIG.termRates, ...(value.termRates || {}) },
    };
  }

    // ==================== CRUD: PLACAS DE ESTADO ====================

  public async getAllStatePlates(): Promise<{ data: StatePlateOption[]; error: any }> {
    const { data, error } = await this.client
      .from('state_plates')
      .select('id, name, costnet, estado, disponible')
      .order('name');
    if (error) {
      return { data: [], error };
    }
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

  public async createStatePlate(plate: {
    name: string;
    costnet: number;
    estado: string;
    disponible: boolean;
  }): Promise<{ error: any }> {
    const { error } = await this.client.from('state_plates').insert([{
      id: crypto.randomUUID(),
      name: plate.name,
      costnet: plate.costnet,
      estado: plate.estado || null,
      disponible: plate.disponible !== false,
    }]);
    if (!error) await this.loadStatePlates();
    return { error };
  }

  public async updateStatePlate(
    id: string,
    plate: { name: string; costnet: number; estado: string; disponible: boolean }
  ): Promise<{ error: any }> {
    const { error } = await this.client
      .from('state_plates')
      .update({
        name: plate.name,
        costnet: plate.costnet,
        estado: plate.estado || null,
        disponible: plate.disponible !== false,
      })
      .eq('id', id);
    if (!error) await this.loadStatePlates();
    return { error };
  }

  public async toggleStatePlateAvailability(
    id: string,
    disponible: boolean
  ): Promise<{ error: any }> {
    const { error } = await this.client
      .from('state_plates')
      .update({ disponible })
      .eq('id', id);
    if (!error) await this.loadStatePlates();
    return { error };
  }

  public async deleteStatePlate(id: string): Promise<{ error: any }> {
    const { error } = await this.client.from('state_plates').delete().eq('id', id);
    if (!error) await this.loadStatePlates();
    return { error };
  }
}