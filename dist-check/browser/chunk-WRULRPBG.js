import {
  Injectable,
  getSupabaseClient,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-6KRTW2LJ.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-FDMHZOCR.js";

// src/app/services/admin.service.ts
function isMissingRpcError(error) {
  if (!error)
    return false;
  if (error.code === "PGRST202" || error.code === "404")
    return true;
  return /could not find the function/i.test(error.message ?? "");
}
function computeQuoteColor(quote) {
  if (quote.revisada === true)
    return "verde";
  const dias = Math.floor((Date.now() - new Date(quote.created_at).getTime()) / 864e5);
  if (dias > 7)
    return "rojo";
  if (dias > 2)
    return "amarillo";
  return "reciente";
}
var AdminService = class _AdminService {
  client = getSupabaseClient();
  /** Reemplaza el N+1: un solo RPC devuelve vendedores con su conteo de cotizaciones. */
  async getSellersWithQuoteCount() {
    const { data, error } = await this.client.rpc("get_sellers_with_quote_counts");
    if (!error) {
      const sellers = (data ?? []).map((row) => row?.seller).filter(Boolean);
      return { data: sellers, error: null };
    }
    if (!isMissingRpcError(error)) {
      console.error("getSellersWithQuoteCount error:", error);
      return { data: [], error };
    }
    console.warn("get_sellers_with_quote_counts() no existe a\xFAn; usando consulta de respaldo. Aplica la migraci\xF3n supabase/migrations/20260409100000_optimizacion_rendimiento.sql.");
    return this.getSellersLegacy();
  }
  /** Estadísticas completas del dashboard en una sola llamada. */
  async getStats() {
    const { data, error } = await this.client.rpc("get_admin_stats");
    if (!error && data) {
      return { data, error: null };
    }
    if (error && !isMissingRpcError(error)) {
      console.error("getStats error:", error);
      return { data: null, error };
    }
    console.warn("get_admin_stats() no existe a\xFAn; usando consultas de respaldo. Aplica la migraci\xF3n supabase/migrations/20260409100000_optimizacion_rendimiento.sql.");
    return this.getStatsLegacy();
  }
  // ==================== FALLBACKS (mientras la migración no esté aplicada) ====================
  /** Respaldo de getSellersWithQuoteCount: 2 consultas (perfiles + seller_id agrupado) en lugar de 1+N. */
  async getSellersLegacy() {
    const { data: profiles, error } = await this.client.from("profiles").select("*").eq("role", "seller").order("created_at", { ascending: false });
    if (error)
      return { data: [], error };
    const { data: quoteRows, error: quotesError } = await this.client.from("quotes").select("seller_id");
    if (quotesError)
      console.warn("No se pudo contar cotizaciones por vendedor:", quotesError);
    const counts = /* @__PURE__ */ new Map();
    (quoteRows ?? []).forEach((row) => {
      counts.set(row.seller_id, (counts.get(row.seller_id) ?? 0) + 1);
    });
    return {
      data: (profiles ?? []).map((p) => __spreadProps(__spreadValues({}, p), { quote_count: counts.get(p.id) ?? 0 })),
      error: null
    };
  }
  /** Respaldo de getStats: replica el shape exacto del RPC sin escribir en la BD. */
  async getStatsLegacy() {
    try {
      const { data: sellerProfiles, error: sellersError } = await this.client.from("profiles").select("id, active").eq("role", "seller");
      if (sellersError)
        throw sellersError;
      const totalSellers = sellerProfiles?.length ?? 0;
      const inactiveSellers = (sellerProfiles ?? []).filter((p) => p.active === false).length;
      const { data: rows, error: quotesError } = await this.client.from("quotes").select("id, client_name, brand, model, pricenet, created_at, revisada, fijada, color, seller_id, profiles!seller_id (full_name, agency_location)").order("created_at", { ascending: false });
      if (quotesError)
        throw quotesError;
      const allQuotes = rows ?? [];
      const countByColor = (estado) => {
        let count = 0;
        for (const q of allQuotes) {
          if (computeQuoteColor(q) === estado)
            count++;
        }
        return count;
      };
      const totalQuotes = allQuotes.length;
      let totalFijadas = 0;
      for (const q of allQuotes) {
        if (q.fijada)
          totalFijadas++;
      }
      const vehicleCounts = {};
      for (const q of allQuotes) {
        const key = `${q.brand} ${q.model}`;
        vehicleCounts[key] = (vehicleCounts[key] || 0) + 1;
      }
      const topVehicles = Object.entries(vehicleCounts).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count).slice(0, 5);
      const sellerMap = {};
      for (const q of allQuotes) {
        const seller = q.profiles;
        if (seller && seller.full_name) {
          if (!sellerMap[q.seller_id]) {
            sellerMap[q.seller_id] = {
              name: seller.full_name,
              location: seller.agency_location || "Sin ubicaci\xF3n",
              count: 0
            };
          }
          sellerMap[q.seller_id].count++;
        }
      }
      const topSellers = Object.values(sellerMap).sort((a, b) => b.count - a.count).slice(0, 5);
      const toCards = (list) => list.map((q) => ({
        id: q.id,
        client_name: q.client_name,
        brand: q.brand,
        model: q.model,
        pricenet: q.pricenet,
        created_at: q.created_at,
        color: computeQuoteColor(q),
        seller_name: q.profiles?.full_name || "N/A"
      }));
      const fijadasList = [];
      const urgentesList = [];
      for (const q of allQuotes) {
        if (q.fijada && fijadasList.length < 5)
          fijadasList.push(q);
        if (computeQuoteColor(q) === "rojo" && urgentesList.length < 5)
          urgentesList.push(q);
      }
      return {
        data: {
          totalSellers,
          inactiveSellers,
          totalQuotes,
          totalFijadas,
          totalUrgentes: countByColor("rojo"),
          totalRecientes: countByColor("reciente"),
          totalRevisadas: countByColor("verde"),
          totalPendientes: countByColor("amarillo"),
          topVehicles,
          topSellers,
          fijadas: toCards(fijadasList),
          urgentes: toCards(urgentesList),
          recientes: toCards(allQuotes.slice(0, 5))
        },
        error: null
      };
    } catch (err) {
      console.error("getStatsLegacy error:", err);
      return { data: null, error: err };
    }
  }
  async deleteSeller(sellerId) {
    const { error: quotesError } = await this.client.from("quotes").delete().eq("seller_id", sellerId);
    if (quotesError)
      return { error: quotesError };
    const { error } = await this.client.from("profiles").delete().eq("id", sellerId);
    return { error };
  }
  static \u0275fac = function AdminService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AdminService, factory: _AdminService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  AdminService
};
//# debugId=2ee574aa-edc8-5c42-b5eb-4470e0fe2f97
//# sourceMappingURL=chunk-WRULRPBG.js.map
