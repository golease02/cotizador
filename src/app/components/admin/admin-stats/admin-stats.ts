import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../../services/supabase.service';

@Component({
  selector: 'app-admin-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-stats.component.html',
  styleUrls: ['./admin-stats.component.css']
})
export class AdminStatsComponent implements OnInit {
  private supabase = inject(SupabaseService);

  totalSellers = signal<number>(0);
  totalQuotes = signal<number>(0);
  totalRevenue = signal<number>(0);
  recentQuotes = signal<any[]>([]);
  loading = signal<boolean>(true);

  async ngOnInit() {
    await this.loadStats();
  }

  async loadStats() {
    this.loading.set(true);

    try {
      // Total vendedores
      const { count: sellersCount, error: sellersError } = await this.supabase.client
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'seller');

      if (!sellersError) this.totalSellers.set(sellersCount || 0);

      // Total cotizaciones
      const { count: quotesCount, error: quotesError } = await this.supabase.client
        .from('quotes')
        .select('*', { count: 'exact', head: true });

      if (!quotesError) this.totalQuotes.set(quotesCount || 0);

      // Últimas 5 cotizaciones
      const { data: recentData, error: recentError } = await this.supabase.client
        .from('quotes')
        .select(`
          *,
          profiles!seller_id (full_name)
        `)
        .order('created_at', { ascending: false })
        .limit(5);

      if (!recentError && recentData) {
        this.recentQuotes.set(recentData.map((q: any) => ({
          ...q,
          seller_name: q.profiles?.full_name || 'N/A'
        })));
      }

      const { data: revenueData, error: revenueError } = await this.supabase.client
        .from('quotes')
        .select('totalpayment');
      if (!revenueError && revenueData) {
        const total = revenueData.reduce((sum, q) => sum + (q.totalpayment || 0), 0);
        this.totalRevenue.set(total);
      }

    } catch (error) {
      console.error('Error cargando estadísticas:', error);
    } finally {
      this.loading.set(false);
    }
  }
}