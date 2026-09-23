import { Component, computed, inject, signal, OnInit, effect, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import {
  AdminService,
  SellerPerformance,
  SellerPerformanceQuote,
  TeamPerformance,
} from '../../../services/admin.service';
import { AdminScopeService } from '../../../services/admin-scope.service';

type SortKey = 'actividad' | 'cotizaciones' | 'pipeline';

interface AlertaEquipo {
  type: 'inactivo' | 'rojo' | 'nuevo' | 'desactivado';
  title: string;
  detail: string;
  sellers: SellerPerformance[];
}

@Component({
  selector: 'app-admin-seller-performance',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-seller-performance.html',
  styleUrls: ['./admin-seller-performance.css'],
})
export class AdminSellerPerformanceComponent implements OnInit {
  private admin = inject(AdminService);
  private readonly scope = inject(AdminScopeService);
  private router = inject(Router);
  constructor() {
    effect(() => {
      if (this.scope.reloadCount() === 0) return;
      untracked(() => {
        void this.cargar();
      });
    });
  }

  public today = new Date();
  public loading = signal(true);
  public error = signal<string | null>(null);

  /** Periodo seleccionado en días (también alimenta el delta vs periodo anterior). */
  public period = signal(30);
  public readonly periods = [7, 30, 90];

  public team = signal<TeamPerformance | null>(null);
  public sellers = signal<SellerPerformance[]>([]);
  public expandedId = signal<string | null>(null);
  public sortKey = signal<SortKey>('actividad');

  /** Lista ordenada según el criterio activo (sin mutar la señal original). */
  public readonly sortedSellers = computed<SellerPerformance[]>(() => {
    const list = [...this.sellers()];
    switch (this.sortKey()) {
      case 'cotizaciones':
        return list.sort(
          (a, b) => b.quotesPeriod - a.quotesPeriod || b.totalQuotes - a.totalQuotes,
        );
      case 'pipeline':
        return list.sort((a, b) => b.pipelineValue - a.pipelineValue);
      default:
        // Actividad: primero quien cotizó más recientemente; los que nunca
        // cotizaron quedan al final (daysSinceLastQuote = null).
        return list.sort((a, b) => {
          const da = a.daysSinceLastQuote ?? Number.MAX_SAFE_INTEGER;
          const db = b.daysSinceLastQuote ?? Number.MAX_SAFE_INTEGER;
          return da - db;
        });
    }
  });

  /** Alertas accionables del equipo (mismo shape que el "centro de atención"). */
  public readonly alertas = computed<AlertaEquipo[]>(() => {
    const list = this.sellers();
    const sinCotizar = list.filter((s) => s.totalQuotes === 0);
    const sinActividad = list.filter(
      (s) => s.active && s.totalQuotes > 0 && (s.daysSinceLastQuote ?? 0) > 14,
    );
    const conRojas = list.filter((s) => s.byColor.rojo > 0);
    const desactivados = list.filter((s) => !s.active);

    const items: AlertaEquipo[] = [];
    if (sinActividad.length) {
      items.push({
        type: 'inactivo',
        title: 'Sin actividad en más de 14 días',
        detail: `${sinActividad.length} vendedor${sinActividad.length === 1 ? '' : 'es'} con cotizaciones previas pero sin movimiento reciente.`,
        sellers: sinActividad,
      });
    }
    if (conRojas.length) {
      items.push({
        type: 'rojo',
        title: 'Cotizaciones por caducar',
        detail: `${conRojas.length} vendedor${conRojas.length === 1 ? '' : 'es'} con cotizaciones sin seguimiento por más de 7 días.`,
        sellers: conRojas,
      });
    }
    if (sinCotizar.length) {
      items.push({
        type: 'nuevo',
        title: 'Sin ninguna cotización',
        detail: `${sinCotizar.length} vendedor${sinCotizar.length === 1 ? '' : 'es'} registrado${sinCotizar.length === 1 ? '' : 's'} que aún no cotiza.`,
        sellers: sinCotizar,
      });
    }
    if (desactivados.length) {
      items.push({
        type: 'desactivado',
        title: 'Vendedores desactivados',
        detail: `${desactivados.length} perfil${desactivados.length === 1 ? '' : 'es'} inactivo${desactivados.length === 1 ? '' : 's'} en el sistema.`,
        sellers: desactivados,
      });
    }
    return items;
  });

  async ngOnInit(): Promise<void> {
    await this.cargar();
  }

  private performanceRequest = 0;

  async cargar(): Promise<void> {
    const request = ++this.performanceRequest;
    const revision = this.scope.reloadCount();
    this.loading.set(true);
    this.error.set(null);

    // En modo "Solo mi red" el super admin agrega localmente sobre su red.
    const scopedIds = this.scope.isRedMode() ? this.scope.sellerIds() : undefined;
    const { data, error } = await (scopedIds
      ? this.admin.getSellerPerformance(this.period(), scopedIds)
      : this.admin.getSellerPerformance(this.period()));
    if (request !== this.performanceRequest || revision !== this.scope.reloadCount()) return;
    if (error || !data) {
      this.error.set('No se pudo cargar el rendimiento del equipo. Intenta de nuevo.');
      this.loading.set(false);
      return;
    }

    this.team.set(data.team);
    this.sellers.set(data.sellers ?? []);
    this.today = new Date();
    this.loading.set(false);
  }

  async setPeriod(days: number): Promise<void> {
    if (this.period() === days) return;
    this.period.set(days);
    this.expandedId.set(null);
    await this.cargar();
  }

  setSort(key: SortKey): void {
    this.sortKey.set(key);
  }

  toggleDetalle(id: string): void {
    this.expandedId.update((actual) => (actual === id ? null : id));
  }

  abrirVendedor(id: string): void {
    this.expandedId.set(id);
    const el = document.getElementById(`vendedor-${id}`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // ===================== MÉTRICAS AUXILIARES =====================

  /** Diferencia del periodo actual vs el anterior (positivo = mejora). */
  delta(seller: SellerPerformance): number {
    return seller.quotesPeriod - seller.quotesPrevPeriod;
  }

  deltaClass(seller: SellerPerformance): string {
    const d = this.delta(seller);
    if (d > 0) return 'delta-up';
    if (d < 0) return 'delta-down';
    return 'delta-flat';
  }

  deltaLabel(seller: SellerPerformance): string {
    const d = this.delta(seller);
    if (d > 0) return `+${d}`;
    if (d < 0) return `${d}`;
    return '=';
  }

  /** Diferencia de cotizaciones del equipo contra el periodo anterior. */
  equipoDelta(): number {
    const t = this.team();
    return t ? t.quotesPeriod - t.quotesPrevPeriod : 0;
  }

  equipoDeltaClass(): string {
    const d = this.equipoDelta();
    if (d > 0) return 'delta-up';
    if (d < 0) return 'delta-down';
    return 'delta-flat';
  }

  equipoDeltaLabel(): string {
    const d = this.equipoDelta();
    if (d > 0) return `+${d}`;
    if (d < 0) return `${d}`;
    return '=';
  }

  equipoDeltaDetalle(): string {
    const t = this.team();
    if (!t) return '';
    return `vs ${t.quotesPrevPeriod} del periodo anterior`;
  }

  /** Estado de actividad del vendedor con su clase CSS. */
  estadoActividad(seller: SellerPerformance): { label: string; className: string } {
    if (!seller.active) {
      return { label: 'Desactivado', className: 'estado-desactivado' };
    }
    if (seller.daysSinceLastQuote === null) {
      return { label: 'Sin actividad', className: 'estado-sin-actividad' };
    }
    const d = seller.daysSinceLastQuote;
    const label = d === 0 ? 'Hoy' : `Hace ${d} día${d === 1 ? '' : 's'}`;
    if (d <= 7) return { label, className: 'estado-ok' };
    if (d <= 14) return { label, className: 'estado-medio' };
    return { label, className: 'estado-alerta' };
  }

  /** Total de cotizaciones por color (denominador de la barra segmentada). */
  totalColores(seller: SellerPerformance): number {
    const c = seller.byColor;
    return c.reciente + c.amarillo + c.rojo + c.verde;
  }

  /** Ancho (%) de un segmento de la barra de estados. */
  colorWidth(seller: SellerPerformance, color: keyof SellerPerformance['byColor']): number {
    const total = this.totalColores(seller);
    if (!total) return 0;
    return (seller.byColor[color] / total) * 100;
  }

  getColorClase(quote: SellerPerformanceQuote): string {
    return `color-${quote.color}`;
  }

  getEtiqueta(quote: SellerPerformanceQuote): string {
    const labels: Record<string, string> = {
      reciente: 'Reciente',
      verde: 'Revisada',
      amarillo: 'Pendiente',
      rojo: 'Por caducar',
    };
    return labels[quote.color] ?? 'Reciente';
  }

  /** Máximo de la serie semanal (para escalar las barras). */
  maxWeekly(): number {
    const t = this.team();
    if (!t || !t.weeklySeries?.length) return 0;
    return Math.max(...t.weeklySeries.map((w) => w.count));
  }

  weeklyHeight(count: number): number {
    const max = this.maxWeekly();
    return max > 0 ? (count / max) * 100 : 0;
  }

  weekLabel(weekStart: string): string {
    return new Date(weekStart).toLocaleDateString('es-MX', { day: '2-digit', month: '2-digit' });
  }

  /** Navega a /admin/seguimiento con el filtro de color rojo pre-aplicado. */
  verPorCaducar(): void {
    this.router.navigate(['/admin/seguimiento'], { queryParams: { color: 'rojo' } });
  }

  /** Total de cotizaciones "por caducar" (color rojo) en el equipo. */
  totalPorCaducar(): number {
    return this.sellers().reduce((sum, s) => sum + s.byColor.rojo, 0);
  }

  trackBySeller(_index: number, seller: SellerPerformance): string {
    return seller.id;
  }
}
