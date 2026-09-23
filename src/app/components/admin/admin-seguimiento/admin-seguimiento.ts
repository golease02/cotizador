import {
  Component,
  inject,
  signal,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastService } from '../../../services/toast.service';
import {
  SeguimientoService,
  SeguimientoItem,
  SeguimientoEtapaKey,
  SEGUIMIENTO_ETAPAS,
  computeFechaEntradaEtapa,
  diasEntre,
  nivelAging,
} from '../../../services/seguimiento.service';

/**
 * Módulo de seguimiento del proceso de cierre.
 *
 * Vista Lista: réplica operativa del Excel original (F. Inicio, Asesor,
 *   Referenciado, Cliente, Activo, Financiera, checklist de etapas, F. Cierre).
 *   El avance de etapas se gestiona vía checklist de chips y el drawer de detalle.
 *
 * Solo accesible para super_admin y socios (permiso granular `seguimiento`).
 */
@Component({
  selector: 'app-admin-seguimiento',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-seguimiento.html',
  styleUrls: ['./admin-seguimiento.css'],
})
export class AdminSeguimientoComponent implements OnInit {
  private seguimiento = inject(SeguimientoService);
  private cdr = inject(ChangeDetectorRef);
  readonly toastService = inject(ToastService);

  readonly etapas = SEGUIMIENTO_ETAPAS;
  readonly items = this.seguimiento.items;
  readonly loading = this.seguimiento.loading;
  readonly tablaDisponible = this.seguimiento.tablaDisponible;

  /** Listado filtrado que alimenta la vista. */
  filtrados = signal<SeguimientoItem[]>([]);
  vendedores = signal<{ id: string; nombre: string }[]>([]);

  // Filtros (se aplican manualmente con applyFilters, igual que admin-quotes)
  searchTerm = '';
  filtroVendedor = 'todos';

  // Drawer de detalle
  showDetalle = false;
  detalle = signal<SeguimientoItem | null>(null);
  formReferenciado = '';
  formFinanciera = '';
  formActivo = '';
  guardando = false;

  async ngOnInit(): Promise<void> {
    await this.seguimiento.load();
    this.applyFilters();
  }

  // ===================== FILTROS =====================

  applyFilters(): void {
    const term = this.searchTerm.trim().toLowerCase();

    const lista = this.items().filter((i) => {
      if (this.filtroVendedor !== 'todos' && i.sellerId !== this.filtroVendedor) return false;

      if (term) {
        const blob = `${i.clientName} ${i.activo} ${i.sellerName} ${i.referenciado}`.toLowerCase();
        if (!blob.includes(term)) return false;
      }
      return true;
    });

    this.filtrados.set(lista);
    this.actualizarVendedores();
  }

  private actualizarVendedores(): void {
    const mapa = new Map<string, string>();
    for (const i of this.items()) {
      mapa.set(i.sellerId, i.sellerName);
    }
    this.vendedores.set(
      [...mapa.entries()]
        .map(([id, nombre]) => ({ id, nombre }))
        .sort((a, b) => a.nombre.localeCompare(b.nombre)),
    );
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.filtroVendedor = 'todos';
    this.applyFilters();
  }

  get hayFiltros(): boolean {
    return !!this.searchTerm || this.filtroVendedor !== 'todos';
  }

  // ===================== ETAPAS (CHECKLIST) =====================

  etapaCompletada(item: SeguimientoItem, key: SeguimientoEtapaKey): boolean {
    return !!item.etapas[key];
  }

  async toggleEtapa(item: SeguimientoItem, key: SeguimientoEtapaKey): Promise<void> {
    const ok = await this.seguimiento.alternarEtapa(item, key);
    if (!ok) {
      this.toastService.error('No se pudo actualizar la etapa. Intenta de nuevo.');
      return;
    }
    this.applyFilters();
    this.refrescarDetalle(item.quoteId);
  }

  // ===================== CIERRE =====================

  async cerrarNegocio(item: SeguimientoItem): Promise<void> {
    const ok = await this.seguimiento.cerrar(item);
    if (!ok) {
      this.toastService.error('No se pudo cerrar el negocio. Intenta de nuevo.');
      return;
    }
    this.applyFilters();
    this.refrescarDetalle(item.quoteId);
    this.toastService.success(`${item.clientName} marcado como cerrado.`);
  }

  async reabrirNegocio(item: SeguimientoItem): Promise<void> {
    const ok = await this.seguimiento.reabrir(item);
    if (!ok) {
      this.toastService.error('No se pudo reabrir el negocio. Intenta de nuevo.');
      return;
    }
    this.applyFilters();
    this.refrescarDetalle(item.quoteId);
    this.toastService.info(`${item.clientName} reabierto; continúa su seguimiento.`);
  }

  // ===================== DETALLE =====================

  abrirDetalle(item: SeguimientoItem): void {
    this.detalle.set(item);
    this.formReferenciado = item.referenciado;
    this.formFinanciera = item.financiera;
    this.formActivo = item.activo;
    this.showDetalle = true;
    this.cdr.markForCheck();
  }

  cerrarDetalle(): void {
    this.showDetalle = false;
    this.detalle.set(null);
  }

  /** Mantiene sincronizado el drawer con los datos recargados del servicio. */
  refrescarDetalle(quoteId: number): void {
    const actualizado = this.items().find((i) => i.quoteId === quoteId) || null;
    this.detalle.set(actualizado);
    if (actualizado) {
      this.formReferenciado = actualizado.referenciado;
      this.formFinanciera = actualizado.financiera;
      this.formActivo = actualizado.activo;
    }
  }

  async guardarDetalle(): Promise<void> {
    const item = this.detalle();
    if (!item) return;
    this.guardando = true;
    const ok = await this.seguimiento.actualizarDatos(item, {
      referenciado: this.formReferenciado,
      financiera: this.formFinanciera,
      activoTexto: this.formActivo,
    });
    this.guardando = false;
    this.cdr.detectChanges();

    if (!ok) {
      this.toastService.error('No se pudieron guardar los datos del negocio.');
      return;
    }
    this.applyFilters();
    this.refrescarDetalle(item.quoteId);
    this.toastService.success('Datos del negocio actualizados.');
  }

  // ===================== FORMATO =====================

  diasEnEtapa(item: SeguimientoItem): number {
    return diasEntre(computeFechaEntradaEtapa(item.etapas, item.createdAt, item.fechaCierre));
  }

  nivelItem(item: SeguimientoItem): 'verde' | 'amarillo' | 'rojo' {
    if (item.fechaCierre) return 'verde';
    return nivelAging(this.diasEnEtapa(item));
  }

  formatFecha(iso: string | null): string {
    if (!iso) return '\u2014';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return '\u2014';
    return d.toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  formatMoneda(valor: number): string {
    return valor.toLocaleString('es-MX', {
      style: 'currency',
      currency: 'MXN',
      maximumFractionDigits: 0,
    });
  }

  formatFechaEtapa(item: SeguimientoItem, key: SeguimientoEtapaKey): string {
    const iso = item.etapas[key];
    if (!iso) return 'Pendiente';
    return this.formatFecha(iso);
  }

  trackByQuote(_index: number, item: SeguimientoItem): number {
    return item.quoteId;
  }
}
