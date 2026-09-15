import { Injectable } from '@angular/core';
import { getSupabaseClient } from './supabase-client';

export interface SellerWithQuoteCount {
  id: string;
  email: string;
  full_name: string;
  role: string;
  active: boolean;
  seller_number: string;
  agency_brand: string;
  agency_location: string;
  latitude: number;
  longitude: number;
  created_at: string;
  quote_count: number;
  permisos?: Record<string, boolean>;
}

/** Cotización resumida que viaja dentro de `SellerPerformance.recentQuotes`. */
export interface SellerPerformanceQuote {
  id: number | string;
  client_name: string;
  brand: string;
  model: string;
  pricenet: number;
  created_at: string;
  color: string;
  seller_name: string;
}

/** Métricas de un vendedor para el dashboard de rendimiento. */
export interface SellerPerformance {
  id: string;
  full_name: string;
  seller_number: string;
  agency_brand: string;
  agency_location: string;
  active: boolean;
  totalQuotes: number;
  quotesPeriod: number;
  quotesPrevPeriod: number;
  quotesWeek: number;
  pipelineValue: number;
  avgTicket: number;
  lastQuoteAt: string | null;
  daysSinceLastQuote: number | null;
  byColor: { reciente: number; amarillo: number; rojo: number; verde: number };
  notasCount: number;
  recentQuotes: SellerPerformanceQuote[];
}

/** Agregados del equipo para el dashboard de rendimiento. */
export interface TeamPerformance {
  quotesPeriod: number;
  quotesPrevPeriod: number;
  activeSellers: number;
  activeSellersPeriod: number;
  pipelineValue: number;
  avgTicket: number;
  weeklySeries: { weekStart: string; count: number }[];
}

/** Payload completo de `get_seller_performance`. */
export interface SellerPerformancePayload {
  period: { days: number };
  team: TeamPerformance;
  sellers: SellerPerformance[];
}

/** True cuando el error indica que la función RPC aún no existe (migración sin aplicar). */
function isMissingRpcError(error: any): boolean {
  if (!error) return false;
  if (error.code === 'PGRST202' || error.code === '404') return true;
  return /could not find the function/i.test(error.message ?? '');
}

/** Misma fórmula del RPC get_admin_stats: revisada→verde, >7d→rojo, >2d→amarillo. */
function computeQuoteColor(quote: { revisada?: boolean; created_at: string }): string {
  if (quote.revisada === true) return 'verde';
  const dias = Math.floor((Date.now() - new Date(quote.created_at).getTime()) / 86_400_000);
  if (dias > 7) return 'rojo';
  if (dias > 2) return 'amarillo';
  return 'reciente';
}

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private client = getSupabaseClient();

  /** Reemplaza el N+1: un solo RPC devuelve vendedores con su conteo de cotizaciones. */
  public async getSellersWithQuoteCount(): Promise<{ data: SellerWithQuoteCount[]; error: any }> {
    const { data, error } = await this.client.rpc('get_sellers_with_quote_counts');
    if (!error) {
      // El RPC devuelve [{ seller: { ...perfil, quote_count } }]; se desempaqueta.
      const sellers = (data ?? []).map((row: any) => row?.seller).filter(Boolean);
      return { data: sellers, error: null };
    }
    if (!isMissingRpcError(error)) {
      console.error('getSellersWithQuoteCount error:', error);
      return { data: [], error };
    }
    // Fallback: migración 20260409100000 aún no aplicada en la BD.
    console.warn(
      'get_sellers_with_quote_counts() no existe aún; usando consulta de respaldo. Aplica la migración supabase/migrations/20260409100000_optimizacion_rendimiento.sql.'
    );
    return this.getSellersLegacy();
  }

  /** Estadísticas completas del dashboard en una sola llamada. */
  public async getStats(): Promise<{ data: any; error: any }> {
    const { data, error } = await this.client.rpc('get_admin_stats');
    if (!error && data) {
      return { data, error: null };
    }
    if (error && !isMissingRpcError(error)) {
      console.error('getStats error:', error);
      return { data: null, error };
    }
    // Fallback: migración 20260409100000 aún no aplicada en la BD.
    console.warn(
      'get_admin_stats() no existe aún; usando consultas de respaldo. Aplica la migración supabase/migrations/20260409100000_optimizacion_rendimiento.sql.'
    );
    return this.getStatsLegacy();
  }

  /**
   * Dashboard de rendimiento por vendedor: una sola RPC devuelve las métricas
   * por persona y los agregados del equipo, ya acotadas al alcance del rol
   * (super_admin = todos, socio = sus vendedores, seller = él mismo).
   */
  public async getSellerPerformance(
    days = 30
  ): Promise<{ data: SellerPerformancePayload | null; error: any }> {
    const safeDays = Math.max(1, Math.floor(Number(days) || 30));
    const { data, error } = await this.client.rpc('get_seller_performance', { p_days: safeDays });
    if (!error && data) {
      return { data: data as SellerPerformancePayload, error: null };
    }
    if (error && !isMissingRpcError(error)) {
      console.error('getSellerPerformance error:', error);
      return { data: null, error };
    }
    // Fallback: migración 20260911000000 aún no aplicada en la BD.
    console.warn(
      'get_seller_performance() no existe aún; usando agregación local. Aplica la migración supabase/migrations/20260911000000_seller_performance_rpcs.sql.'
    );
    return this.getSellerPerformanceLegacy(safeDays);
  }

  // ==================== FALLBACKS (mientras la migración no esté aplicada) ====================

  /** Respaldo de getSellersWithQuoteCount: 2 consultas (perfiles + seller_id agrupado) en lugar de 1+N. */
  private async getSellersLegacy(): Promise<{ data: SellerWithQuoteCount[]; error: any }> {
    const { data: profiles, error } = await this.client
      .from('profiles')
      .select('*')
      .eq('role', 'seller')
      .order('created_at', { ascending: false });
    if (error) return { data: [], error };

    const { data: quoteRows, error: quotesError } = await this.client.from('quotes').select('seller_id');
    if (quotesError) console.warn('No se pudo contar cotizaciones por vendedor:', quotesError);

    const counts = new Map<string, number>();
    (quoteRows ?? []).forEach((row: any) => {
      counts.set(row.seller_id, (counts.get(row.seller_id) ?? 0) + 1);
    });

    return {
      data: (profiles ?? []).map((p: any) => ({ ...p, quote_count: counts.get(p.id) ?? 0 })),
      error: null,
    };
  }

  /** Respaldo de getStats: replica el shape exacto del RPC sin escribir en la BD. */
  private async getStatsLegacy(): Promise<{ data: any; error: any }> {
    try {
      // --- 1. Perfil de vendedores (contar total e inactivos de una sola consulta) ---
      const { data: sellerProfiles, error: sellersError } = await this.client
        .from('profiles')
        .select('id, active')
        .eq('role', 'seller');
      if (sellersError) throw sellersError;
      const totalSellers = sellerProfiles?.length ?? 0;
      const inactiveSellers = (sellerProfiles ?? []).filter((p: any) => p.active === false).length;

      // --- 2. Una sola consulta de cotizaciones con join de vendedor (fuente unica de verdad) ---
      const { data: rows, error: quotesError } = await this.client
        .from('quotes')
        .select('id, client_name, brand, model, pricenet, created_at, revisada, fijada, color, seller_id, profiles!seller_id (full_name, agency_location)')
        .order('created_at', { ascending: false });
      if (quotesError) throw quotesError;
      const allQuotes: any[] = (rows ?? []) as any[];

      // --- Contadores derivados del color RECALCULADO (coherentes con los badges de las tarjetas) ---
      const countByColor = (estado: string): number =>{
        let count =  0;
        for (const q of allQuotes) {
          if (computeQuoteColor(q) === estado) count++;
        }
        return count;
      };
      const totalQuotes = allQuotes.length;
      let totalFijadas =  0;
      for (const q of allQuotes) {
        if (q.fijada) totalFijadas++;
      }

      // --- Top 5 vehículos (agregación local, igual que el RPC) ---
      const vehicleCounts: Record<string, number> = {};
      for (const q of allQuotes) {
        const key = `${q.brand} ${q.model}`;
        vehicleCounts[key] = (vehicleCounts[key] || 0) + 1;
      }
      const topVehicles = Object.entries(vehicleCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      // --- Top 5 vendedores ---

      const sellerMap: Record<string, { name: string; location: string; count: number }> = {};
      for (const q of allQuotes) {
        const seller = q.profiles;
        if (seller && seller.full_name) {
          if (!sellerMap[q.seller_id]) {
            sellerMap[q.seller_id] = {
              name: seller.full_name,
              location: seller.agency_location || 'Sin ubicación',
              count: 0,
            };
          }
          sellerMap[q.seller_id].count++;
        }
      }
      const topSellers = Object.values(sellerMap)
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      // --- Listas destacadas (siempre con el color recalculado, coherentes con las métricas) ---
      const toCards = (list: any[]): any[] =>
        list.map((q: any) => ({
          id: q.id,
          client_name: q.client_name,
          brand: q.brand,
          model: q.model,
          pricenet: q.pricenet,
          created_at: q.created_at,
          color: computeQuoteColor(q),
          seller_name: q.profiles?.full_name || 'N/A',
        }));

      const fijadasList: any[] = [];
      const urgentesList: any[] = [];
      for (const q of allQuotes) {
        if (q.fijada && fijadasList.length < 5) fijadasList.push(q);
        if (computeQuoteColor(q) === 'rojo' && urgentesList.length < 5) urgentesList.push(q);
      }

      return {
        data: {
          totalSellers,
          inactiveSellers,
          totalQuotes,
          totalFijadas,
          totalUrgentes: countByColor('rojo'),
          totalRecientes: countByColor('reciente'),
          totalRevisadas: countByColor('verde'),
          totalPendientes: countByColor('amarillo'),
          topVehicles,
          topSellers,
          fijadas: toCards(fijadasList),
          urgentes: toCards(urgentesList),
          recientes: toCards(allQuotes.slice(0, 5)),
        },
        error: null,
      };
    } catch (err) {
      console.error('getStatsLegacy error:', err);
      return { data: null, error: err };
    }
  }

  /**
   * Respaldo de getSellerPerformance: agrega en cliente con las mismas reglas
   * que la RPC (color recalculado con computeQuoteColor, periodos y delta).
   */
  private async getSellerPerformanceLegacy(
    days: number
  ): Promise<{ data: SellerPerformancePayload | null; error: any }> {
    try {
      const now = Date.now();
      const from = now - days * 86_400_000;
      const prevFrom = now - days * 2 * 86_400_000;

      const { data: profiles, error: profilesError } = await this.client
        .from('profiles')
        .select('id, full_name, seller_number, agency_brand, agency_location, active')
        .eq('role', 'seller');
      if (profilesError) throw profilesError;

      const { data: rows, error: quotesError } = await this.client
        .from('quotes')
        .select('id, seller_id, client_name, brand, model, pricenet, created_at, revisada')
        .order('created_at', { ascending: false });
      if (quotesError) throw quotesError;
      const allQuotes: any[] = (rows ?? []) as any[];

      const { data: notasRows } = await this.client
        .from('notas')
        .select('entidad_id')
        .eq('entidad_tipo', 'seller');
      const notasPorVendedor = new Map<string, number>();
      (notasRows ?? []).forEach((n: any) => {
        const key = String(n.entidad_id);
        notasPorVendedor.set(key, (notasPorVendedor.get(key) ?? 0) + 1);
      });

      const sellers: SellerPerformance[] = (profiles ?? []).map((p: any) => {
        // allQuotes viene ordenado DESC: el filtro conserva el orden.
        const mine: any[] = allQuotes.filter((q) => q.seller_id === p.id);
        const enPeriodo = mine.filter((q) => new Date(q.created_at).getTime() >= from);
        const pipelineValue = enPeriodo.reduce((sum, q) => sum + (Number(q.pricenet) || 0), 0);

        const byColor = { reciente: 0, amarillo: 0, rojo: 0, verde: 0 };
        for (const q of mine) {
          const color = computeQuoteColor(q);
          if (color in byColor) byColor[color as keyof typeof byColor]++;
        }

        const lastQuoteAt = mine.length ? mine[0].created_at : null;

        return {
          id: p.id,
          full_name: p.full_name ?? 'Sin nombre',
          seller_number: p.seller_number ?? '',
          agency_brand: p.agency_brand ?? '',
          agency_location: p.agency_location ?? '',
          active: p.active !== false,
          totalQuotes: mine.length,
          quotesPeriod: enPeriodo.length,
          quotesPrevPeriod: mine.filter((q) => {
            const t = new Date(q.created_at).getTime();
            return t >= prevFrom && t < from;
          }).length,
          quotesWeek: mine.filter(
            (q) => new Date(q.created_at).getTime() >= now - 7 * 86_400_000
          ).length,
          pipelineValue,
          avgTicket: enPeriodo.length
            ? Math.round((pipelineValue / enPeriodo.length) * 100) / 100
            : 0,
          lastQuoteAt,
          daysSinceLastQuote: lastQuoteAt
            ? Math.floor((now - new Date(lastQuoteAt).getTime()) / 86_400_000)
            : null,
          byColor,
          notasCount: notasPorVendedor.get(String(p.id)) ?? 0,
          recentQuotes: mine.slice(0, 5).map((q) => ({
            id: q.id,
            client_name: q.client_name,
            brand: q.brand,
            model: q.model,
            pricenet: q.pricenet,
            created_at: q.created_at,
            color: computeQuoteColor(q),
            seller_name: p.full_name ?? 'N/A',
          })),
        };
      });

      const team = this.buildTeamPerformanceLegacy(allQuotes, sellers, from, prevFrom, now);
      return { data: { period: { days }, team, sellers }, error: null };
    } catch (err) {
      console.error('getSellerPerformanceLegacy error:', err);
      return { data: null, error: err };
    }
  }

  /**
   * Agregados del equipo (fallback local) con las mismas reglas que la RPC:
   * solo cuentan cotizaciones de vendedores, para que los KPIs cuadren con la
   * suma de la tabla "Detalle por vendedor".
   */
  private buildTeamPerformanceLegacy(
    allQuotes: any[],
    sellers: SellerPerformance[],
    from: number,
    prevFrom: number,
    now: number
  ): TeamPerformance {
    const sellerIds = new Set(sellers.map((s) => s.id));
    const teamQuotes = allQuotes.filter((q) => sellerIds.has(q.seller_id));
    const enPeriodo = teamQuotes.filter((q) => new Date(q.created_at).getTime() >= from);
    const pipelineValue = enPeriodo.reduce((sum, q) => sum + (Number(q.pricenet) || 0), 0);

    const inicioSemana = (d: Date): Date => {
      const x = new Date(d);
      x.setHours(0, 0, 0, 0);
      x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); // lunes
      return x;
    };
    const semanaActual = inicioSemana(new Date(now));
    const weeklySeries: { weekStart: string; count: number }[] = [];
    for (let i = 7; i >= 0; i--) {
      const ws = new Date(semanaActual);
      ws.setDate(ws.getDate() - i * 7);
      const we = new Date(ws);
      we.setDate(we.getDate() + 7);
      weeklySeries.push({
        weekStart: ws.toISOString(),
        count: teamQuotes.filter((q) => {
          const t = new Date(q.created_at).getTime();
          return t >= ws.getTime() && t < we.getTime();
        }).length,
      });
    }

    return {
      quotesPeriod: enPeriodo.length,
      quotesPrevPeriod: teamQuotes.filter((q) => {
        const t = new Date(q.created_at).getTime();
        return t >= prevFrom && t < from;
      }).length,
      activeSellers: sellers.filter(
        (s) => s.lastQuoteAt && new Date(s.lastQuoteAt).getTime() >= now - 14 * 86_400_000
      ).length,
      activeSellersPeriod: sellers.filter((s) => s.quotesPeriod > 0).length,
      pipelineValue,
      avgTicket: enPeriodo.length ? Math.round((pipelineValue / enPeriodo.length) * 100) / 100 : 0,
      weeklySeries,
    };
  }

  public async deleteSeller(sellerId: string): Promise<{ error: any }> {
    const { error: quotesError } = await this.client
      .from('quotes')
      .delete()
      .eq('seller_id', sellerId);
    if (quotesError) return { error: quotesError };

    const { error } = await this.client
      .from('profiles')
      .delete()
      .eq('id', sellerId);
    return { error };
  }
}
