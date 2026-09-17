import { Component, inject, signal, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastService } from '../../../services/toast.service';
import {
  SeguimientoService,
  SeguimientoItem,
  SeguimientoEtapaKey,
  SEGUIMIENTO_COLUMNAS,
  SEGUIMIENTO_ETAPAS,
  computeColumnaActual,
  computeFechaEntradaEtapa,
  diasEntre,
  nivelAging,
} from '../../../services/seguimiento.service';

type VistaSeguimiento = 'kanban' | 'lista';

/**
 * Módulo de seguimiento del pipeline de cierre.
 *
 * Vista Kanban: columnas por etapa (Cotizada → EXP → … → PLACAS → Cerrado) con
 *   drag & drop nativo y un selector "Mover a…" como respaldo en móvil.
 * Vista Lista: réplica operativa del Excel original (F. Inicio, Asesor,
 *   Referenciado, Cliente, Activo, Financiera, checklist de etapas, F. Cierre).
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

  readonly columnas = SEGUIMIENTO_COLUMNAS;
  readonly etapas = SEGUIMIENTO_ETAPAS;
  readonly items = this.seguimiento.items;
  readonly loading = this.seguimiento.loading;
  readonly tablaDisponible = this.seguimiento.tablaDisponible;

  /** Vista activa (persistida en localStorage). */
  vista = signal<VistaSeguimiento>(this.leerVistaGuardada());

  /** Listado filtrado que alimenta ambas vistas. */
  filtrados = signal<SeguimientoItem[]>([]);
  resumen = signal({ total: 0, enProceso: 0, cerrados: 0, diasPromedio: 0 });
  vendedores = signal<{ id: string; nombre: string }[]>([]);

  // Filtros (se aplican manualmente con applyFilters, igual que admin-quotes)
  searchTerm = '';
  filtroVendedor = 'todos';
  filtroEtapa = 'todas';
  filtroPeriodo = 'todos';

  // Drag & drop
  draggingId: number | null = null;
  columnaOver: number | null = null;

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

  // ===================== VISTA =====================

  private leerVistaGuardada(): VistaSeguimiento {
    try {
      return localStorage.getItem('golease-seguimiento-vista') === 'lista' ? 'lista' : 'kanban';
    } catch {
      return 'kanban';
    }
  }

  setVista(v: VistaSeguimiento): void {
    this.vista.set(v);
    try {
      localStorage.setItem('golease-seguimiento-vista', v);
    } catch {
      /* localStorage no disponible: la preferencia no se persiste */
    }
  }

  // ===================== FILTROS =====================

  applyFilters(): void {
    const term = this.searchTerm.trim().toLowerCase();
    const desdePeriodo = this.fechaDesdePeriodo();

    const lista = this.items().filter((i) => {
      if (this.filtroVendedor !== 'todos' && i.sellerId !== this.filtroVendedor) return false;

      if (this.filtroEtapa !== 'todas') {
        if (this.filtroEtapa === 'cerrados') {
          if (!i.fechaCierre) return false;
        } else if (this.filtroEtapa === 'proceso') {
          if (i.fechaCierre) return false;
        } else if (computeColumnaActual(i.etapas, i.fechaCierre) !== Number(this.filtroEtapa)) {
          return false;
        }
      }

      if (desdePeriodo && new Date(i.createdAt).getTime() < desdePeriodo) return false;

      if (term) {
        const blob = `${i.clientName} ${i.activo} ${i.sellerName} ${i.referenciado}`.toLowerCase();
        if (!blob.includes(term)) return false;
      }
      return true;
    });

    this.filtrados.set(lista);
    this.actualizarResumen(lista);
    this.actualizarVendedores();
  }

  private fechaDesdePeriodo(): number | null {
    if (this.filtroPeriodo === '7dias') return Date.now() - 7 * 86_400_000;
    if (this.filtroPeriodo === '30dias') return Date.now() - 30 * 86_400_000;
    if (this.filtroPeriodo === '90dias') return Date.now() - 90 * 86_400_000;
    return null;
  }

  private actualizarResumen(lista: SeguimientoItem[]): void {
    const cerrados = lista.filter((i) => !!i.fechaCierre).length;
    const enProceso = lista.length - cerrados;
    const conDias = lista.filter((i) => !i.fechaCierre);
    const diasPromedio = conDias.length
      ? Math.round(
          conDias.reduce((sum, i) => sum + this.diasEnEtapa(i), 0) / conDias.length
        )
      : 0;
    this.resumen.set({ total: lista.length, enProceso, cerrados, diasPromedio });
  }

  private actualizarVendedores(): void {
    const mapa = new Map<string, string>();
    for (const i of this.items()) mapa.set(i.sellerId, i.sellerName);
    this.vendedores.set(
      [...mapa.entries()]
        .map(([id, nombre]) => ({ id, nombre }))
        .sort((a, b) => a.nombre.localeCompare(b.nombre))
    );
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.filtroVendedor = 'todos';
    this.filtroEtapa = 'todas';
    this.filtroPeriodo = 'todos';
    this.applyFilters();
  }

  get hayFiltros(): boolean {
    return (
      !!this.searchTerm ||
      this.filtroVendedor !== 'todos' ||
      this.filtroEtapa !== 'todas' ||
      this.filtroPeriodo !== 'todos'
    );
  }

  // ===================== KANBAN =====================

  itemsDeColumna(index: number): SeguimientoItem[] {
    return this.filtrados().filter(
      (i) => computeColumnaActual(i.etapas, i.fechaCierre) === index
    );
  }

  valorColumna(index: number): number {
    return this.itemsDeColumna(index).reduce((sum, i) => sum + i.priceNet, 0);
  }

  progreso(item: SeguimientoItem): number {
    return Math.round(
      (Object.values(item.etapas).filter(Boolean).length / SEGUIMIENTO_ETAPAS.length) * 100
    );
  }

  onDragStart(event: DragEvent, item: SeguimientoItem): void {
    this.draggingId = item.quoteId;
    event.dataTransfer?.setData('text/plain', String(item.quoteId));
    if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move';
  }

  onDragEnd(): void {
    this.draggingId = null;
    this.columnaOver = null;
  }

  onDragOver(event: DragEvent, index: number): void {
    event.preventDefault();
    if (event.dataTransfer) event.dataTransfer.dropEffect = 'move';
    this.columnaOver = index;
  }

  onDragLeave(index: number): void {
    if (this.columnaOver === index) this.columnaOver = null;
  }

  async onDrop(event: DragEvent, index: number): Promise<void> {
    event.preventDefault();
    const id = Number(event.dataTransfer?.getData('text/plain') || this.draggingId);
    this.columnaOver = null;
    this.draggingId = null;
    if (!id) return;

    const item = this.items().find((i) => i.quoteId === id);
    if (!item) return;
    await this.moverA(item, index);
  }

  /** Mueve un negocio a la columna indicada (kanban drag & drop o selector móvil). */
  async moverA(item: SeguimientoItem, index: number): Promise<void> {
    const actual = computeColumnaActual(item.etapas, item.fechaCierre);
    if (actual === index) return;

    const ok = await this.seguimiento.moverAColumna(item, index);
    if (!ok) {
      this.toastService.error('No se pudo mover el negocio. Revisa tu conexión e intenta de nuevo.');
      return;
    }
    this.applyFilters();
    this.refrescarDetalle(item.quoteId);
    this.toastService.success(
      index >= SEGUIMIENTO_COLUMNAS.length - 1
        ? `${item.clientName} marcado como cerrado.`
        : `Movido a "${SEGUIMIENTO_COLUMNAS[index].label}".`
    );
  }

  onSelectorMover(item: SeguimientoItem, event: Event): void {
    const valor = Number((event.target as HTMLSelectElement).value);
    if (Number.isNaN(valor)) return;
    void this.moverA(item, valor);
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
    if (!iso) return '—';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return '—';
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
