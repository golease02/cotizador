import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SupabaseService } from '../../../services/supabase.service';

@Component({
  selector: 'app-admin-stats',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-stats.component.html',
  styleUrls: ['./admin-stats.component.css']
})
export class AdminStatsComponent implements OnInit {
  private supabase = inject(SupabaseService);

  today = new Date();

  // Métricas principales
  totalQuotes = signal<number>(0);
  totalSellers = signal<number>(0);
  totalFijadas = signal<number>(0);
  totalUrgentes = signal<number>(0);

  // Top vehículos
  topVehicles = signal<any[]>([]);
  // Top vendedores
  topSellers = signal<any[]>([]);

  // Cotizaciones destacadas
  fijadasQuotes = signal<any[]>([]);
  urgentesQuotes = signal<any[]>([]);
  recentQuotes = signal<any[]>([]);

  loading = signal<boolean>(true);

  async ngOnInit() {
    await this.loadStats();
  }

  async loadStats() {
    this.loading.set(true);
    try {
      // --- Métricas ---
      const { count: sellersCount } = await this.supabase.client
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'seller');
      this.totalSellers.set(sellersCount || 0);

      const { count: quotesCount } = await this.supabase.client
        .from('quotes')
        .select('*', { count: 'exact', head: true });
      this.totalQuotes.set(quotesCount || 0);

      const { count: fijadasCount } = await this.supabase.client
        .from('quotes')
        .select('*', { count: 'exact', head: true })
        .eq('fijada', true);
      this.totalFijadas.set(fijadasCount || 0);

      const { count: urgentesCount } = await this.supabase.client
        .from('quotes')
        .select('*', { count: 'exact', head: true })
        .eq('color', 'rojo');
      this.totalUrgentes.set(urgentesCount || 0);

      // --- Top vehículos ---
      const { data: vehiclesData } = await this.supabase.client
        .from('quotes')
        .select('brand, model');
      if (vehiclesData) {
        const counts: Record<string, number> = {};
        vehiclesData.forEach((q: any) => {
          const key = `${q.brand} ${q.model}`;
          counts[key] = (counts[key] || 0) + 1;
        });
        const sorted = Object.entries(counts)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);
        this.topVehicles.set(sorted);
      }

      // --- Top vendedores ---
      const { data: quotesWithSeller } = await this.supabase.client
        .from('quotes')
        .select(`
          seller_id,
          profiles!seller_id (full_name, agency_location)
        `);
      if (quotesWithSeller) {
        const sellerMap: Record<string, { name: string, location: string, count: number }> = {};
        quotesWithSeller.forEach((q: any) => {
          const seller = q.profiles;
          if (seller && seller.full_name) {
            const id = q.seller_id;
            if (!sellerMap[id]) {
              sellerMap[id] = {
                name: seller.full_name,
                location: seller.agency_location || 'Sin ubicación',
                count: 0
              };
            }
            sellerMap[id].count++;
          }
        });
        const sortedSellers = Object.values(sellerMap)
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);
        this.topSellers.set(sortedSellers);
      }

      // --- Cotizaciones destacadas (con datos del vendedor) ---
      const getQuotes = async (filter: any) => {
        let query = this.supabase.client
          .from('quotes')
          .select(`
            *,
            profiles!seller_id (full_name)
          `)
          .order('created_at', { ascending: false })
          .limit(5);
        if (filter) {
          query = query.match(filter);
        }
        const { data } = await query;
        return data ? data.map((q: any) => ({
          ...q,
          seller_name: q.profiles?.full_name || 'N/A'
        })) : [];
      };

      this.fijadasQuotes.set(await getQuotes({ fijada: true }));
      this.urgentesQuotes.set(await getQuotes({ color: 'rojo' }));
      this.recentQuotes.set(await getQuotes({}));

    } catch (error) {
      console.error('Error cargando estadísticas:', error);
    } finally {
      this.loading.set(false);
    }
  }

  // Métodos para gráficos de barras
  getMaxPercentage(count: number, items: any[]): number {
    if (!items || items.length === 0) return 0;
    const max = Math.max(...items.map(i => i.count));
    return max > 0 ? (count / max) * 100 : 0;
  }

  getBarColor(count: number, items: any[]): string {
    if (!items || items.length === 0) return '#94a3b8';
    const max = Math.max(...items.map(i => i.count));
    if (max === 0) return '#94a3b8';
    const ratio = count / max;
    if (ratio > 0.7) return '#22c55e';
    if (ratio > 0.4) return '#f59e0b';
    return '#3b82f6';
  }

  getColorClass(quote: any): string {
    return `color-${quote.color || 'reciente'}`;
  }

  getEtiqueta(quote: any): string {
    const labels: Record<string, string> = {
      reciente: 'Reciente',
      verde: 'Revisada',
      amarillo: 'Pendiente',
      rojo: 'Urgente'
    };
    return labels[quote.color] || 'Reciente';
  }
}