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
import { QuotesService } from '../../../services/quotes.service';
import { AuthService } from '../../../services/auth.service';
import { FinancialCalculatorService } from '../../../services/financial-calculator.service';
import { QuoteBreakdownComponent } from '../../quote-breakdown/quote-breakdown';
import { getSupabaseClient } from '../../../services/supabase-client';
import { QuoteCalculationResult, VehicleQuoteInput } from '../../../models/leasing.model';
import {
  SeguimientoService,
  SeguimientoItem,
  SeguimientoEtapaKey,
  SEGUIMIENTO_ETAPAS,
  computeFechaEntradaEtapa,
  diasEntre,
  nivelAging,
} from '../../../services/seguimiento.service';
import {
  ActivityLevel,
  ActivitySources,
  diasSinActividad,
  etiquetaDias,
  formatUltimaActividad,
  nivelActividad,
} from '../../../utils/quote-activity';

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
  imports: [CommonModule, FormsModule, RouterLink, QuoteBreakdownComponent],
  templateUrl: './admin-seguimiento.html',
  styleUrls: ['./admin-seguimiento.css'],
})
export class AdminSeguimientoComponent implements OnInit {
  private seguimiento = inject(SeguimientoService);
  private quotesService = inject(QuotesService);
  private auth = inject(AuthService);
  private calculator = inject(FinancialCalculatorService);
  private client = getSupabaseClient();
  private cdr = inject(ChangeDetectorRef);
  readonly toastService = inject(ToastService);

  readonly etapas = SEGUIMIENTO_ETAPAS;
  readonly items = this.seguimiento.items;
  readonly loading = this.seguimiento.loading;
  readonly tablaDisponible = this.seguimiento.tablaDisponible;

  get canManageNotas(): boolean {
    return this.auth.canAccessModule('notas');
  }

  /** Listado filtrado que alimenta la vista. */
  filtrados = signal<SeguimientoItem[]>([]);
  vendedores = signal<{ id: string; nombre: string }[]>([]);
  asesores = signal<{ id: string; nombre: string }[]>([]);
  asesoresMap = signal<Record<string, string>>({});

  // Filtros (se aplican manualmente con applyFilters, igual que admin-quotes)
  searchTerm = '';
  filtroAsesor = 'todos';
  filtroVendedor = 'todos';

  // Conteo de notas por cotización (entidad_tipo='quote')
  notasCount = signal<Record<string, number>>({});

  /**
   * Fecha de la última nota por cotización (ISO). Alimenta el cálculo de
   * "días sin actividad": agregar una nota cuenta como actividad.
   */
  notasUltima = signal<Record<string, string | null>>({});

  // Drawer de detalle
  showDetalle = false;
  detalle = signal<SeguimientoItem | null>(null);
  formReferenciado = '';
  formFinanciera = '';
  formActivo = '';
  guardando = false;

  // Modal de cotización (PDF de la hoja oficial, igual que Mis Cotizaciones)
  showQuoteModal = false;
  selectedQuote = signal<QuoteCalculationResult | null>(null);
  quoteCargando = false;

  // Modal de notas (portado de Cotizaciones)
  showNotasModal = false;
  notaLoading = false;
  notaError = '';
  notaText = '';
  notaEditando: any = null;
  notasCotizacion: any[] = [];
  selectedQuoteId: number | null = null;
  showNotaConfirmModal = false;
  notaToDelete: any = null;

  // Confirmación de eliminación definitiva (punto 6)
  showDeleteModal = false;
  deleteLoading = false;
  deleteTarget = signal<SeguimientoItem | null>(null);

  async ngOnInit(): Promise<void> {
    await this.seguimiento.load();
    // El listado se pinta antes de contar notas: la consulta de `notas` no
    // debe bloquear el tablero (si tarda o falla, la tabla ya está visible).
    this.applyFilters();
    await this.cargarConteoNotas();
  }

  // ===================== FILTROS =====================

  applyFilters(): void {
    const term = this.searchTerm.trim().toLowerCase();

    const lista = this.items().filter((i) => {
      if (this.filtroAsesor !== 'todos' && (i.asesorId ?? '') !== this.filtroAsesor) {
        return false;
      }
      if (this.filtroVendedor !== 'todos' && i.sellerId !== this.filtroVendedor) return false;

      if (term) {
        const blob =
          `${i.clientName} ${i.activo} ${i.sellerName} ${i.asesorName}`.toLowerCase();
        if (!blob.includes(term)) return false;
      }
      return true;
    });

    this.filtrados.set(lista);
    this.actualizarAsesores();
    this.actualizarVendedores();
  }

  /**
   * Asesores (socios) únicos presentes en el tablero.
   * El id se deriva del socio del vendedor; si no se resolvió nombre,
   * el asesor queda agrupado bajo la etiqueta visible (fallback '—').
   */
  private actualizarAsesores(): void {
    const mapa = new Map<string, string>();
    for (const i of this.items()) {
      const id = i.asesorId || `nombre:${i.asesorName}`;
      if (!mapa.has(id)) mapa.set(id, i.asesorName);
    }
    this.asesores.set(
      [...mapa.entries()]
        .map(([id, nombre]) => ({ id, nombre }))
        .sort((a, b) => a.nombre.localeCompare(b.nombre)),
    );
    this.asesoresMap.set(Object.fromEntries(mapa));
  }

  /**
   * Vendedores únicos del tablero. Si hay un asesor seleccionado, solo los
   * vendedores de ese asesor (socio → sus vendedores).
   */
  private actualizarVendedores(): void {
    const mapa = new Map<string, string>();
    for (const i of this.items()) {
      if (this.filtroAsesor !== 'todos' && (i.asesorId ?? '') !== this.filtroAsesor) continue;
      mapa.set(i.sellerId, i.sellerName);
    }
    this.vendedores.set(
      [...mapa.entries()]
        .map(([id, nombre]) => ({ id, nombre }))
        .sort((a, b) => a.nombre.localeCompare(b.nombre)),
    );
    // Si el vendedor seleccionado ya no pertenece al asesor elegido, resetearlo.
    if (this.filtroVendedor !== 'todos' && !mapa.has(this.filtroVendedor)) {
      this.filtroVendedor = 'todos';
    }
  }

  onAsesorChange(): void {
    this.filtroVendedor = 'todos';
    this.applyFilters();
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.filtroAsesor = 'todos';
    this.filtroVendedor = 'todos';
    this.applyFilters();
  }

  get hayFiltros(): boolean {
    return !!this.searchTerm || this.filtroAsesor !== 'todos' || this.filtroVendedor !== 'todos';
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

  /** Casilla ENTREGA: marcar = entregar (cerrar); desmarcar = reabrir. */
  async toggleEntrega(item: SeguimientoItem): Promise<void> {
    if (item.fechaCierre) {
      await this.reabrirNegocio(item);
    } else {
      await this.cerrarNegocio(item);
    }
  }

  // ===================== ELIMINAR (punto 6) =====================

  /** Abre el modal de confirmación para eliminar la cotización definitivamente. */
  pedirEliminar(item: SeguimientoItem): void {
    this.deleteTarget.set(item);
    this.deleteLoading = false;
    this.showDeleteModal = true;
    this.cdr.detectChanges();
  }

  cancelarEliminar(): void {
    this.showDeleteModal = false;
    this.deleteTarget.set(null);
    this.cdr.detectChanges();
  }

  async confirmarEliminar(): Promise<void> {
    const item = this.deleteTarget();
    if (!item || this.deleteLoading) return;
    this.deleteLoading = true;
    const { error } = await this.quotesService.deleteQuote(item.quoteId);
    this.deleteLoading = false;

    if (error) {
      this.toastService.error(
        'No se pudo eliminar la cotización: ' + (error.message || 'sin permiso'),
      );
      this.cdr.detectChanges();
      return;
    }

    await this.seguimiento.load();
    await this.cargarConteoNotas();
    this.applyFilters();
    const anterior = this.detalle();
    if (anterior && anterior.quoteId === item.quoteId) this.cerrarDetalle();
    this.showDeleteModal = false;
    this.deleteTarget.set(null);
    this.toastService.success(`Cotización de ${item.clientName} eliminada.`);
    this.cdr.detectChanges();
  }

  // ===================== VISUALIZAR (hoja del PDF, punto 1) =====================

  /** Abre la cotización con la hoja oficial (la misma que genera el PDF). */
  async visualizarCotizacion(item: SeguimientoItem): Promise<void> {
    this.quoteCargando = true;
    this.showQuoteModal = true;
    this.selectedQuote.set(null);
    try {
      // 1. Snapshot inmutable guardado (fiel al momento de generación).
      const snapshot = await this.quotesService.getQuoteCalculation(item.quoteId);
      if (snapshot) {
        this.selectedQuote.set(snapshot);
        return;
      }
      // 2. Recalcular desde la fila si no hay snapshot.
      const { data } = await this.client
        .from('quotes')
        .select('*')
        .eq('id', item.quoteId)
        .maybeSingle();
      if (data) {
        this.selectedQuote.set(this.calculator.calculateQuote(this.buildInputFromRow(data)));
      }
    } finally {
      this.quoteCargando = false;
      this.cdr.detectChanges();
    }
  }

  cerrarQuoteModal(): void {
    this.showQuoteModal = false;
    this.selectedQuote.set(null);
  }

  /**
   * Convierte una fila de la BD (quotes) en la entrada del motor de cálculo.
   * Replica el recálculo de Mis Cotizaciones cuando no hay snapshot.
   */
  private buildInputFromRow(row: any): VehicleQuoteInput {
    return {
      clientName: row.client_name || '',
      brand: row.brand,
      model: row.model,
      year: row.year,
      priceNet: row.pricenet,
      isHybridOrElectric: row.ishybridorelectric || false,
      termMonths: (row.termmonths || 48) as any,
      extraordinaryRentPct: row.extraordinaryrentpct || 0.1,
      securityDepositPct: row.securitydepositpct || 0,
      selectedStatePlateId: row.selectedstateplateid || 'pendiente',
      isInsuranceEstimated: row.isinsuranceestimated || false,
      annualInsuranceCost: row.annualinsurancecost || 0,
    };
  }

  // ===================== NOTAS (punto 1, portado de Cotizaciones) =====================

  getNotasCount(item: SeguimientoItem): number {
    return this.notasCount()[String(item.quoteId)] || 0;
  }

  /** Carga el conteo de notas (entidad_tipo='quote') para todas las cotizaciones. */
  async cargarConteoNotas(): Promise<void> {
    try {
      const { data, error } = await this.client
        .from('notas')
        .select('entidad_id, created_at')
        .eq('entidad_tipo', 'quote');
      if (error || !Array.isArray(data)) return;
      const conteo: Record<string, number> = {};
      const ultima: Record<string, string | null> = {};
      for (const n of data) {
        const key = String((n as any).entidad_id);
        conteo[key] = (conteo[key] || 0) + 1;

        const iso = (n as any).created_at as string | null;
        if (!iso) continue;
        const previa = ultima[key];
        if (!previa || new Date(iso).getTime() > new Date(previa).getTime()) {
          ultima[key] = iso;
        }
      }
      this.notasCount.set(conteo);
      this.notasUltima.set(ultima);
    } catch {
      // Sin conteo: los botones de notas siguen funcionando (modal por fila).
    }
  }

  async abrirNotas(item: SeguimientoItem): Promise<void> {
    if (!this.canManageNotas) return;
    this.selectedQuoteId = item.quoteId;
    this.showNotasModal = true;
    this.notaText = '';
    this.notaEditando = null;
    this.notaError = '';
    await this.cargarNotasQuote(item.quoteId);
  }

  async cargarNotasQuote(quoteId: number): Promise<void> {
    this.notaLoading = true;
    try {
      const { data, error } = await this.client
        .from('notas')
        .select('*')
        .eq('entidad_tipo', 'quote')
        .eq('entidad_id', String(quoteId))
        .order('created_at', { ascending: false });
      if (error) {
        this.notaError = 'Error al cargar notas: ' + (error.message || 'desconocido');
      } else {
        this.notasCotizacion = data || [];
        this.notaError = '';
      }
    } catch (err: any) {
      this.notaError = 'Error al cargar notas: ' + (err.message || 'desconocido');
    }
    this.notaLoading = false;
    this.cdr.detectChanges();
  }

  async guardarNotaQuote(): Promise<void> {
    if (!this.canManageNotas) return;
    if (!this.notaText.trim()) return;
    this.notaLoading = true;
    this.notaError = '';

    const user = this.auth.currentUser();
    const payload = {
      entidad_tipo: 'quote',
      entidad_id: String(this.selectedQuoteId),
      texto: this.notaText.trim(),
      creado_por: user?.id || null,
      created_at: new Date().toISOString(),
    };

    let error = null;
    if (this.notaEditando) {
      const { error: updateError } = await this.client
        .from('notas')
        .update({ texto: this.notaText.trim() })
        .eq('id', this.notaEditando.id);
      error = updateError;
    } else {
      const { error: insertError } = await this.client.from('notas').insert([payload]);
      error = insertError;
    }

    if (error) {
      this.notaError = 'Error al guardar nota';
      this.toastService.error('No se pudo guardar la nota');
    } else {
      const eraEdicion = !!this.notaEditando;
      this.notaText = '';
      this.notaEditando = null;
      await this.cargarNotasQuote(this.selectedQuoteId!);
      this.actualizarConteoNotas(this.selectedQuoteId!, this.notasCotizacion.length);
      this.toastService.success(
        eraEdicion ? 'Nota actualizada correctamente' : 'Nota agregada correctamente',
      );
    }
    this.notaLoading = false;
    this.cdr.detectChanges();
  }

  editarNotaQuote(nota: any): void {
    if (!this.canManageNotas) return;
    this.notaEditando = nota;
    this.notaText = nota.texto;
  }

  eliminarNotaQuote(nota: any): void {
    if (!this.canManageNotas) return;
    this.notaToDelete = nota;
    this.showNotaConfirmModal = true;
    this.cdr.detectChanges();
  }

  async confirmarEliminarNota(): Promise<void> {
    if (!this.canManageNotas) return;
    if (!this.notaToDelete) return;
    this.notaLoading = true;
    this.showNotaConfirmModal = false;
    const { error } = await this.client.from('notas').delete().eq('id', this.notaToDelete.id);
    if (error) {
      this.notaError = 'Error al eliminar nota';
      this.toastService.error('No se pudo eliminar la nota');
    } else {
      await this.cargarNotasQuote(this.selectedQuoteId!);
      this.actualizarConteoNotas(this.selectedQuoteId!, this.notasCotizacion.length);
      this.toastService.success('Nota eliminada correctamente');
    }
    this.notaLoading = false;
    this.notaToDelete = null;
    this.cdr.detectChanges();
  }

  cancelarEliminarNota(): void {
    this.showNotaConfirmModal = false;
    this.notaToDelete = null;
    this.cdr.detectChanges();
  }

  cerrarNotasQuote(): void {
    this.showNotaConfirmModal = false;
    this.notaToDelete = null;
    this.showNotasModal = false;
    this.notasCotizacion = [];
    this.notaText = '';
    this.notaEditando = null;
    this.notaError = '';
    this.selectedQuoteId = null;
  }

  private actualizarConteoNotas(quoteId: number, count: number): void {
    this.notasCount.update((m) => ({ ...m, [String(quoteId)]: count }));
    // Administrar notas (agregar/editar/eliminar) cuenta como actividad.
    this.notasUltima.update((m) => ({ ...m, [String(quoteId)]: new Date().toISOString() }));
  }

  // ===================== ACTIVIDAD (días sin actividad) =====================

  /**
   * Fuentes de la "última actividad" de una cotización.
   * La regla vive en `utils/quote-activity.ts` (misma que la purga automática).
   */
  private fuentesActividad(item: SeguimientoItem): ActivitySources {
    return {
      createdAt: item.createdAt,
      lastReviewedAt: item.lastReviewedAt,
      seguimientoUpdatedAt: item.updatedAt,
      etapas: item.etapas,
      fechaCierre: item.fechaCierre,
      lastNoteAt: this.notasUltima()[String(item.quoteId)] ?? null,
    };
  }

  /**
   * Días transcurridos desde la última actividad: revisión, etapa marcada,
   * entrega o nota. Revisar una cotización reinicia este contador.
   */
  diasSinActividadItem(item: SeguimientoItem): number {
    return diasSinActividad(this.fuentesActividad(item));
  }

  /** Semáforo de actividad: verde < 8 días, amarillo 8–15, rojo ≥ 16. */
  nivelActividadItem(item: SeguimientoItem): ActivityLevel {
    return nivelActividad(this.diasSinActividadItem(item));
  }

  /** Fecha legible de la última actividad (dd/mm/aaaa). */
  ultimaActividadItem(item: SeguimientoItem): string {
    return formatUltimaActividad(this.fuentesActividad(item));
  }

  /** Etiqueta corta del contador: "Hoy", "Ayer" o "Hace N días". */
  etiquetaActividadItem(item: SeguimientoItem): string {
    return etiquetaDias(this.diasSinActividadItem(item));
  }

  // ===================== REVISIÓN =====================

  /**
   * Marca/desmarca la cotización como revisada.
   * Revisar sella `quotes.last_reviewed_at`, que es una de las fuentes de la
   * última actividad: los días sin actividad vuelven a cero.
   */
  async toggleRevisada(item: SeguimientoItem): Promise<void> {
    const revisada = !item.revisada;
    const ok = await this.seguimiento.marcarRevisada(item, revisada);
    if (!ok) {
      this.toastService.error('No se pudo actualizar la revisión. Intenta de nuevo.');
      return;
    }
    this.applyFilters();
    this.refrescarDetalle(item.quoteId);
    this.toastService.success(
      revisada
        ? `${item.clientName} marcada como revisada.`
        : `${item.clientName} vuelve a la lista de pendientes.`,
    );
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
