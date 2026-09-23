import { Component, inject, signal, OnInit, effect, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { AdminScopeService } from '../../../services/admin-scope.service';

@Component({
  selector: 'app-admin-stats',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-stats.html',
  styleUrls: ['./admin-stats.css'],
})
export class AdminStatsComponent implements OnInit {
  private admin = inject(AdminService);
  private readonly scope = inject(AdminScopeService);
  constructor() {
    effect(() => {
      if (this.scope.reloadCount() === 0) return;
      untracked(() => {
        void this.loadStats();
      });
    });
  }

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

  private statsRequest = 0;

  async loadStats() {
    const request = ++this.statsRequest;
    const revision = this.scope.reloadCount();
    this.loading.set(true);
    try {
      // En modo "Solo mi red" el super admin agrega localmente sobre su red
      // (la RPC get_admin_stats no admite scope del super admin).
      const scopedIds = this.scope.isRedMode() ? this.scope.sellerIds() : undefined;
      const { data, error } = await this.admin.getStats(scopedIds);
      if (request !== this.statsRequest || revision !== this.scope.reloadCount()) return;
      if (error || !data) {
        throw error || new Error('Sin datos de estadísticas');
      }

      this.totalSellers.set(data.totalSellers || 0);
      this.totalQuotes.set(data.totalQuotes || 0);
      this.totalFijadas.set(data.totalFijadas || 0);
      this.totalUrgentes.set(data.totalUrgentes || 0);
      this.totalRecientes.set(data.totalRecientes || 0);
      this.totalRevisadas.set(data.totalRevisadas || 0);
      this.totalPendientes.set(data.totalPendientes || 0);

      this.topVehicles.set(data.topVehicles || []);
      this.topSellers.set(data.topSellers || []);

      this.fijadasQuotes.set(data.fijadas || []);
      this.urgentesQuotes.set(data.urgentes || []);
      this.recentQuotes.set(data.recientes || []);

      const urgentesCount = this.totalUrgentes();
      const pendientesCount = this.totalPendientes();
      const inactiveSellersCount = data.inactiveSellers || 0;

      this.attentionItems.set([
        ...(urgentesCount
          ? [
              {
                type: 'urgent',
                title: 'Cotizaciones por caducar',
                detail: `${urgentesCount} cotización${urgentesCount === 1 ? '' : 'es'} sin seguimiento reciente.`,
                link: '/admin/seguimiento',
                action: 'Revisar por caducar',
              },
            ]
          : []),
        ...(pendientesCount
          ? [
              {
                type: 'pending',
                title: 'Cotizaciones pendientes',
                detail: `${pendientesCount} cotización${pendientesCount === 1 ? '' : 'es'} requiere${pendientesCount === 1 ? '' : 'n'} atención.`,
                link: '/admin/seguimiento',
                action: 'Ver pendientes',
              },
            ]
          : []),
        ...(inactiveSellersCount
          ? [
              {
                type: 'inactive',
                title: 'Vendedores inactivos',
                detail: `${inactiveSellersCount} perfil${inactiveSellersCount === 1 ? '' : 'es'} está${inactiveSellersCount === 1 ? '' : 'n'} inactivo${inactiveSellersCount === 1 ? '' : 's'}.`,
                link: '/admin/sellers',
                action: 'Gestionar equipo',
              },
            ]
          : []),
      ]);
    } catch (error) {
      console.warn('No se pudieron cargar las estadísticas:', error);
    } finally {
      if (request === this.statsRequest && revision === this.scope.reloadCount()) {
        this.today = new Date();
        this.loading.set(false);
      }
    }
  }

  // ===================== MÉTODOS AUXILIARES =====================

  getColorClase(quote: any): string {
    return `color-${this.getEstado(quote)}`;
  }

  getEtiqueta(quote: any): string {
    const labels: Record<string, string> = {
      reciente: 'Reciente',
      verde: 'Revisada',
      amarillo: 'Pendiente',
      rojo: 'Por caducar',
    };
    return labels[this.getEstado(quote)];
  }

  private getEstado(quote: any): string {
    const estadosValidos = ['reciente', 'verde', 'amarillo', 'rojo'];
    return estadosValidos.includes(quote.color) ? quote.color : 'reciente';
  }

  getMaxPercentage(count: number, items: any[]): number {
    if (!items || items.length === 0) return 0;
    const max = Math.max(...items.map((i) => i.count));
    return max > 0 ? (count / max) * 100 : 0;
  }

  getBarColor(count: number, items: any[]): string {
    if (!items || items.length === 0) return '#94a3b8';
    const max = Math.max(...items.map((i) => i.count));
    if (max === 0) return '#94a3b8';
    const ratio = count / max;
    if (ratio > 0.7) return '#22c55e';
    if (ratio > 0.4) return '#f59e0b';
    return '#3b82f6';
  }
}
