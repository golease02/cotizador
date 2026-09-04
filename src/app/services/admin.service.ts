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
      const headCount = (table: 'profiles' | 'quotes', match?: Record<string, unknown>) => {
        const q = this.client.from(table).select('*', { count: 'exact', head: true });
        return match ? q.match(match) : q;
      };

      const [
        sellersR, inactiveR, quotesR, fijadasR, rojasR, recientesR, verdesR, amarillasR,
      ] = await Promise.all([
        headCount('profiles', { role: 'seller' }),
        headCount('profiles', { role: 'seller', active: false }),
        headCount('quotes'),
        headCount('quotes', { fijada: true }),
        headCount('quotes', { color: 'rojo' }),
        headCount('quotes', { color: 'reciente' }),
        headCount('quotes', { color: 'verde' }),
        headCount('quotes', { color: 'amarillo' }),
      ]);
      const countOf = (r: any) => (r?.error ? 0 : (r?.count ?? 0));

      // --- Top 5 vehículos (agregación local, igual que el RPC) ---
      const { data: vehicleRows } = await this.client.from('quotes').select('brand, model');
      const vehicleCounts: Record<string, number> = {};
      (vehicleRows ?? []).forEach((q: any) => {
        const key = `${q.brand} ${q.model}`;
        vehicleCounts[key] = (vehicleCounts[key] || 0) + 1;
      });
      const topVehicles = Object.entries(vehicleCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      // --- Top 5 vendedores ---
      const { data: sellerRows } = await this.client
        .from('quotes')
        .select('seller_id, profiles!seller_id (full_name, agency_location)');
      const sellerMap: Record<string, { name: string; location: string; count: number }> = {};
      (sellerRows ?? []).forEach((q: any) => {
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
      });
      const topSellers = Object.values(sellerMap)
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      // --- Listas destacadas (solo lectura; el color se recalcula al vuelo) ---
      const cardList = (match?: Record<string, unknown>) => {
        const q = this.client
          .from('quotes')
          .select('id, client_name, brand, model, pricenet, created_at, revisada, color, profiles!seller_id (full_name)')
          .order('created_at', { ascending: false })
          .limit(5);
        return match ? q.match(match) : q;
      };
      const toCards = (rows: any[] | null) =>
        (rows ?? []).map((q: any) => ({
          id: q.id,
          client_name: q.client_name,
          brand: q.brand,
          model: q.model,
          pricenet: q.pricenet,
          created_at: q.created_at,
          color: computeQuoteColor(q),
          seller_name: q.profiles?.full_name || 'N/A',
        }));

      const [fijadasQ, urgentesQ, recientesQ] = await Promise.all([
        cardList({ fijada: true }),
        cardList({ color: 'rojo' }),
        cardList(),
      ]);

      return {
        data: {
          totalSellers: countOf(sellersR),
          inactiveSellers: countOf(inactiveR),
          totalQuotes: countOf(quotesR),
          totalFijadas: countOf(fijadasR),
          totalUrgentes: countOf(rojasR),
          totalRecientes: countOf(recientesR),
          totalRevisadas: countOf(verdesR),
          totalPendientes: countOf(amarillasR),
          topVehicles,
          topSellers,
          fijadas: toCards(fijadasQ.data),
          urgentes: toCards(urgentesQ.data),
          recientes: toCards(recientesQ.data),
        },
        error: null,
      };
    } catch (err) {
      console.error('getStatsLegacy error:', err);
      return { data: null, error: err };
    }
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
