import { Injectable, Optional, signal, inject } from '@angular/core';
import { StatePlateOption, STATE_PLATES_CATALOG, CalculatorConfig, DEFAULT_CALCULATOR_CONFIG } from '../models/leasing.model';
import { getSupabaseClient, currentUserSignal } from './supabase-client';
import { AuthService } from './auth.service';

export interface VehicleCatalogItem {
  id: string;
  brand: string;
  model: string;
  suggestedPriceNet: number;
  isHybridOrElectric: boolean;
  year: number;
}

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
    if (!currentUserSignal() || profile?.role !== 'admin' || profile.active === false) {
      return { error: { message: 'Solo un administrador puede modificar estos parámetros.' } };
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

  // ==================== CATÁLOGO DE VEHÍCULOS ====================

  public async getVehicleCatalog(): Promise<VehicleCatalogItem[]> {
    return this.fetchVehicles();
  }

  public async getAllVehicles(): Promise<{ data: VehicleCatalogItem[]; error: any }> {
    const items = await this.fetchVehicles();
    return { data: items, error: null };
  }

  private async fetchVehicles(): Promise<VehicleCatalogItem[]> {
    const { data, error } = await this.client
      .from('vehicles')
      .select('id, brand, model, suggestedpricenet, ishybridorelectric, year')
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
      year: Number(item.year) || new Date().getFullYear(),
    }));
  }

  public async createVehicle(vehicle: {
    brand: string;
    model: string;
    year: number;
    suggestedPriceNet: number;
    isHybridOrElectric: boolean;
  }): Promise<{ error: any }> {
    const { error } = await this.client.from('vehicles').insert([{
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
    const { error } = await this.client
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
    const { error } = await this.client.from('vehicles').delete().eq('id', id);
    return { error };
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