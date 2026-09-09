import {
  AuthService
} from "./chunk-XCV63D25.js";
import {
  Injectable,
  Optional,
  currentUserSignal,
  getSupabaseClient,
  inject,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-6KRTW2LJ.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-FDMHZOCR.js";

// src/app/models/leasing.model.ts
var ESTADOS_MEXICO = [
  "Aguascalientes",
  "Baja California",
  "Baja California Sur",
  "Campeche",
  "Chiapas",
  "Chihuahua",
  "Ciudad de M\xE9xico",
  "Coahuila",
  "Colima",
  "Durango",
  "Guanajuato",
  "Guerrero",
  "Hidalgo",
  "Jalisco",
  "Estado de M\xE9xico",
  "Michoac\xE1n",
  "Morelos",
  "Nayarit",
  "Nuevo Le\xF3n",
  "Oaxaca",
  "Puebla",
  "Quer\xE9taro",
  "Quintana Roo",
  "San Luis Potos\xED",
  "Sinaloa",
  "Sonora",
  "Tabasco",
  "Tamaulipas",
  "Tlaxcala",
  "Veracruz",
  "Yucat\xE1n",
  "Zacatecas"
];
var STATE_PLATES_CATALOG = [
  { id: "cdmx", name: "Alta de placas CDMX", costNet: 1432, estado: "Ciudad de M\xE9xico", disponible: true },
  { id: "edomex", name: "Alta de placas Edo de Mex", costNet: 1432, estado: "Estado de M\xE9xico", disponible: true },
  { id: "guanajuato", name: "Alta de placas Guanajuato", costNet: 4454, estado: "Guanajuato", disponible: true },
  { id: "michoacan", name: "Alta de placas Michoacan", costNet: 7948, estado: "Michoac\xE1n", disponible: true },
  { id: "queretaro", name: "Alta de placas Quer\xE9taro", costNet: 6679, estado: "Quer\xE9taro", disponible: true },
  { id: "slp", name: "Alta de placas San Luis Potosi", costNet: 6933, estado: "San Luis Potos\xED", disponible: true },
  { id: "jalisco", name: "Alta Placas Jalisco", costNet: 11460, estado: "Jalisco", disponible: true },
  { id: "pendiente", name: "Alta de placas pendientes x cotizar", costNet: 0, estado: "", disponible: true }
];
var TERM_RATES_MATRIX = {
  12: { termMonths: 12, option1Rate: 0.75, option2Rate: 0.83, option3Rate: 0.9 },
  24: { termMonths: 24, option1Rate: 0.52, option2Rate: 0.55, option3Rate: 0.59 },
  36: { termMonths: 36, option1Rate: 0.445, option2Rate: 0.465, option3Rate: 0.49 },
  48: { termMonths: 48, option1Rate: 0.405, option2Rate: 0.42, option3Rate: 0.435 }
};
var DEFAULT_CALCULATOR_CONFIG = {
  ivaPct: 0.16,
  advisoryFeePct: 0.02,
  insurancePct: 0.035,
  adminFeeInitialNet: 3334.5,
  maxRentAndResidualPct: 0.75,
  minimumRentThreshold1: 65e4,
  minimumRentThreshold2: 15e5,
  minimumRentPct1: 0.1,
  minimumRentPct2: 0.15,
  minimumRentPct3: 0.2,
  basicRentStandard: 6e3,
  basicRentHybrid: 8550,
  fleetManagementPct: 0.6,
  adminManagementPct: 0.4,
  residualOption1Pct: 0.35,
  residualOption2Pct: 0.2,
  residualOption3Pct: 0.05,
  termRates: TERM_RATES_MATRIX
};
function isExtraordinaryRentAndResidualValid(extraordinaryRentPct, residualPct, maxPct = 0.75) {
  const sum = extraordinaryRentPct + residualPct;
  return sum <= maxPct;
}

// src/app/services/catalog.service.ts
var CatalogService = class _CatalogService {
  client = getSupabaseClient();
  auth;
  statePlatesSignal = signal(
    [...STATE_PLATES_CATALOG],
    ...ngDevMode ? [{ debugName: "statePlatesSignal" }] : (
      /* istanbul ignore next */
      []
    )
  );
  calculatorConfigSignal = signal(
    DEFAULT_CALCULATOR_CONFIG,
    ...ngDevMode ? [{ debugName: "calculatorConfigSignal" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor(auth) {
    this.auth = auth ?? inject(AuthService);
  }
  statePlatesLoaded = false;
  configLoaded = false;
  statePlates = this.statePlatesSignal.asReadonly();
  calculatorConfig = this.calculatorConfigSignal.asReadonly();
  getStatePlates() {
    return this.statePlatesSignal();
  }
  getCalculatorConfig() {
    return this.calculatorConfigSignal();
  }
  /** Carga placas desde BD una sola vez; llamadas posteriores devuelven la caché. */
  async loadStatePlates() {
    if (this.statePlatesLoaded)
      return;
    try {
      const { data, error } = await this.client.from("state_plates").select("id, name, costnet, estado, disponible").order("name");
      if (error || !data)
        return;
      const plates = data.map((p) => ({
        id: p.id,
        name: p.name,
        costNet: Number(p.costnet) || 0,
        estado: p.estado ?? "",
        disponible: p.disponible !== false
      }));
      if (!plates.some((p) => p.id === "pendiente")) {
        const fallback = STATE_PLATES_CATALOG.find((p) => p.id === "pendiente");
        if (fallback)
          plates.push(fallback);
      }
      this.statePlatesSignal.set(plates);
      this.statePlatesLoaded = true;
    } catch (err) {
      console.warn("No se pudieron cargar placas de estado desde la BD:", err);
    }
  }
  async loadCalculatorConfig() {
    if (this.configLoaded)
      return;
    if (!currentUserSignal())
      return;
    try {
      const { data, error } = await this.client.from("calculator_settings").select("settings").eq("id", 1).maybeSingle();
      if (!error && data?.settings) {
        this.calculatorConfigSignal.set(this.mergeCalculatorConfig(data.settings));
        this.configLoaded = true;
      }
    } catch (err) {
      console.warn("No se pudo cargar la configuraci\xF3n del cotizador:", err);
    }
  }
  async updateCalculatorConfig(settings) {
    const profile = this.auth.currentProfile();
    if (!currentUserSignal() || profile?.role !== "admin" || profile.active === false) {
      return { error: { message: "Solo un administrador puede modificar estos par\xE1metros." } };
    }
    const { error } = await this.client.from("calculator_settings").upsert({ id: 1, settings, updated_by: currentUserSignal()?.id }, { onConflict: "id" });
    if (!error) {
      this.calculatorConfigSignal.set(this.mergeCalculatorConfig(settings));
      this.configLoaded = true;
    }
    return { error };
  }
  mergeCalculatorConfig(value) {
    return __spreadProps(__spreadValues(__spreadValues({}, DEFAULT_CALCULATOR_CONFIG), value), {
      termRates: __spreadValues(__spreadValues({}, DEFAULT_CALCULATOR_CONFIG.termRates), value.termRates || {})
    });
  }
  // ==================== CATÁLOGO DE VEHÍCULOS ====================
  async getVehicleCatalog() {
    return this.fetchVehicles();
  }
  async getAllVehicles() {
    const items = await this.fetchVehicles();
    return { data: items, error: null };
  }
  async fetchVehicles() {
    const { data, error } = await this.client.from("vehicles").select("id, brand, model, suggestedpricenet, ishybridorelectric, year").order("brand", { ascending: true });
    if (error) {
      console.error("Error fetching vehicles:", error);
      return [];
    }
    return data.map((item) => ({
      id: item.id,
      brand: item.brand,
      model: item.model,
      suggestedPriceNet: Number(item.suggestedpricenet) || 0,
      isHybridOrElectric: Boolean(item.ishybridorelectric) || false,
      year: Number(item.year) || (/* @__PURE__ */ new Date()).getFullYear()
    }));
  }
  async createVehicle(vehicle) {
    const { error } = await this.client.from("vehicles").insert([{
      id: crypto.randomUUID(),
      brand: vehicle.brand,
      model: vehicle.model,
      suggestedpricenet: vehicle.suggestedPriceNet,
      ishybridorelectric: vehicle.isHybridOrElectric,
      year: vehicle.year
    }]);
    return { error };
  }
  async updateVehicle(id, vehicle) {
    const { error } = await this.client.from("vehicles").update({
      brand: vehicle.brand,
      model: vehicle.model,
      suggestedpricenet: vehicle.suggestedPriceNet,
      ishybridorelectric: vehicle.isHybridOrElectric,
      year: vehicle.year
    }).eq("id", id);
    return { error };
  }
  async deleteVehicle(id) {
    const { error } = await this.client.from("vehicles").delete().eq("id", id);
    return { error };
  }
  // ==================== CRUD: PLACAS DE ESTADO ====================
  async getAllStatePlates() {
    const { data, error } = await this.client.from("state_plates").select("id, name, costnet, estado, disponible").order("name");
    if (error) {
      return { data: [], error };
    }
    return {
      data: data.map((p) => ({
        id: p.id,
        name: p.name,
        costNet: Number(p.costnet) || 0,
        estado: p.estado ?? "",
        disponible: p.disponible !== false
      })),
      error: null
    };
  }
  async createStatePlate(plate) {
    const { error } = await this.client.from("state_plates").insert([{
      id: crypto.randomUUID(),
      name: plate.name,
      costnet: plate.costnet,
      estado: plate.estado || null,
      disponible: plate.disponible !== false
    }]);
    if (!error)
      await this.loadStatePlates();
    return { error };
  }
  async updateStatePlate(id, plate) {
    const { error } = await this.client.from("state_plates").update({
      name: plate.name,
      costnet: plate.costnet,
      estado: plate.estado || null,
      disponible: plate.disponible !== false
    }).eq("id", id);
    if (!error)
      await this.loadStatePlates();
    return { error };
  }
  async toggleStatePlateAvailability(id, disponible) {
    const { error } = await this.client.from("state_plates").update({ disponible }).eq("id", id);
    if (!error)
      await this.loadStatePlates();
    return { error };
  }
  async deleteStatePlate(id) {
    const { error } = await this.client.from("state_plates").delete().eq("id", id);
    if (!error)
      await this.loadStatePlates();
    return { error };
  }
  static \u0275fac = function CatalogService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CatalogService)(\u0275\u0275inject(AuthService, 8));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CatalogService, factory: _CatalogService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CatalogService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: AuthService, decorators: [{
    type: Optional
  }] }], null);
})();

export {
  ESTADOS_MEXICO,
  STATE_PLATES_CATALOG,
  TERM_RATES_MATRIX,
  DEFAULT_CALCULATOR_CONFIG,
  isExtraordinaryRentAndResidualValid,
  CatalogService
};
//# debugId=70517a0d-58f1-563c-b9e3-4a6ee38cc1a5
//# sourceMappingURL=chunk-ZZO2EEQW.js.map
