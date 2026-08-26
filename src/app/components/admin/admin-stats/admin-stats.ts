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

  totalQuotes = signal<number>(0);
  totalSellers = signal<number>(0);
  totalFijadas = signal<number>(0);
  totalUrgentes = signal<number>(0);
  totalRecientes = signal<number>(0);
  totalRevisadas = signal<number>(0);
  totalPendientes = signal<number>(0);
  attentionItems = signal<any[]>([]);

  topVehicles = signal<any[]>([]);
  topSellers = signal<any[]>([]);

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

      const { count: recientesCount } = await this.supabase.client
        .from('quotes')
        .select('*', { count: 'exact', head: true })
        .eq('color', 'reciente');
      this.totalRecientes.set(recientesCount || 0);

      const { count: revisadasCount } = await this.supabase.client
        .from('quotes')
        .select('*', { count: 'exact', head: true })
        .eq('color', 'verde');
      this.totalRevisadas.set(revisadasCount || 0);

      const { count: pendientesCount } = await this.supabase.client
        .from('quotes')
        .select('*', { count: 'exact', head: true })
        .eq('color', 'amarillo');
      this.totalPendientes.set(pendientesCount || 0);

      const { count: inactiveSellersCount } = await this.supabase.client
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'seller')
        .eq('active', false);

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

      // --- Cotizaciones destacadas (con recálculo de color) ---
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
        if (!data) return [];

        const result = [];
        for (const q of data) {
          const dias = this.getDiasSinActualizar(q);
          let colorCalculado = 'reciente';
          if (q.revisada) {
            colorCalculado = 'verde';
          } else {
            if (dias > 7) colorCalculado = 'rojo';
            else if (dias > 2) colorCalculado = 'amarillo';
            else colorCalculado = 'reciente';
          }

          if (q.color !== colorCalculado) {
            await this.supabase.client
              .from('quotes')
              .update({ color: colorCalculado, ultima_actualizacion: new Date().toISOString() })
              .eq('id', q.id);
            q.color = colorCalculado;
          }

          result.push({
            ...q,
            seller_name: q.profiles?.full_name || 'N/A',
            color: colorCalculado
          });
        }
        return result;
      };

      this.fijadasQuotes.set(await getQuotes({ fijada: true }));
      this.urgentesQuotes.set(await getQuotes({ color: 'rojo' }));
      this.recentQuotes.set(await getQuotes({}));

      this.attentionItems.set([
        ...(urgentesCount ? [{
          type: 'urgent',
          title: 'Cotizaciones urgentes',
          detail: `${urgentesCount} cotización${urgentesCount === 1 ? '' : 'es'} sin seguimiento reciente.`,
          link: '/admin/quotes',
          action: 'Revisar cotizaciones'
        }] : []),
        ...(pendientesCount ? [{
          type: 'pending',
          title: 'Cotizaciones pendientes',
          detail: `${pendientesCount} cotización${pendientesCount === 1 ? '' : 'es'} requiere${pendientesCount === 1 ? '' : 'n'} atención.`,
          link: '/admin/quotes',
          action: 'Ver pendientes'
        }] : []),
        ...(inactiveSellersCount ? [{
          type: 'inactive',
          title: 'Vendedores inactivos',
          detail: `${inactiveSellersCount} perfil${inactiveSellersCount === 1 ? '' : 'es'} está${inactiveSellersCount === 1 ? '' : 'n'} inactivo${inactiveSellersCount === 1 ? '' : 's'}.`,
          link: '/admin/sellers',
          action: 'Gestionar equipo'
        }] : [])
      ]);

    } catch (error) {
      console.error('Error cargando estadísticas:', error);
    } finally {
      this.loading.set(false);
    }
  }

  // ===================== MÉTODOS AUXILIARES =====================

  getDiasSinActualizar(quote: any): number {
    const fecha = new Date(quote.ultima_actualizacion || quote.created_at);
    const ahora = new Date();
    return Math.floor((ahora.getTime() - fecha.getTime()) / (1000 * 60 * 60 * 24));
  }

  getColorClase(quote: any): string {
    return `color-${this.getEstado(quote)}`;
  }

  getEtiqueta(quote: any): string {
    const labels: Record<string, string> = {
      reciente: 'Reciente',
      verde: 'Revisada',
      amarillo: 'Pendiente',
      rojo: 'Urgente'
    };
    return labels[this.getEstado(quote)];
  }

  private getEstado(quote: any): string {
    const estadosValidos = ['reciente', 'verde', 'amarillo', 'rojo'];
    return estadosValidos.includes(quote.color) ? quote.color : 'reciente';
  }

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
}
