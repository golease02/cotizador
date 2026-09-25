import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { QuotesService, VendedorSeguimientoRow } from '../../../services/quotes.service';
import { FinancialCalculatorService } from '../../../services/financial-calculator.service';
import { CatalogService } from '../../../services/catalog.service';
import { NotesService, EntityNote } from '../../../services/notes.service';
import { MaterialesService, ClaveMaterial } from '../../../services/materiales.service';
import { ToastService } from '../../../services/toast.service';
import { QuoteBreakdownComponent } from '../../quote-breakdown/quote-breakdown';
import { QuoteCalculationResult, VehicleQuoteInput } from '../../../models/leasing.model';
import {
  SEGUIMIENTO_ETAPAS,
  SeguimientoEtapaKey,
  SeguimientoEtapas,
} from '../../../services/seguimiento.service';
import {
  computeValidUntil,
  getValidityLabel,
  getValidityStatus,
  ValidityStatus,
} from '../../../utils/quote-validity';
import { formatPurgeDate, willAutoDelete } from '../../../utils/quote-retention';

@Component({
  selector: 'app-mis-cotizaciones',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, QuoteBreakdownComponent],
  templateUrl: './mis-cotizaciones.html',
  styleUrls: ['./mis-cotizaciones.css'],
})
export class MisCotizacionesComponent implements OnInit {
  private auth = inject(AuthService);
  private quotesService = inject(QuotesService);
  private calculator = inject(FinancialCalculatorService);
  private catalog = inject(CatalogService);
  private notes = inject(NotesService);
  private materialesService = inject(MaterialesService);
  private toast = inject(ToastService);
  private router = inject(Router);

  isAdmin = computed(() => this.auth.isAdmin());
  /** Los 3 botones de ayuda son exclusivos del perfil vendedor. */
  esVendedor = computed(() => this.auth.currentProfile()?.role === 'seller');
  readonly etapas = SEGUIMIENTO_ETAPAS;
  cotizaciones = signal<VendedorSeguimientoRow[]>([]);
  loading = signal(true);
  selectedQuote = signal<QuoteCalculationResult | null>(null);
  selectedRow = signal<VendedorSeguimientoRow | null>(null);
  showDetail = signal(false);

  // Notas compartidas con el asesor de la cotización.
  readonly notasCount = signal<Record<string, number>>({});
  readonly showNotasModal = signal(false);
  readonly notasCotizacion = signal<EntityNote[]>([]);
  readonly notaLoading = signal(false);
  readonly notaError = signal('');
  readonly notaEditando = signal<EntityNote | null>(null);
  readonly selectedNoteQuoteId = signal<number | null>(null);
  readonly showNotaConfirmModal = signal(false);
  readonly notaToDelete = signal<EntityNote | null>(null);
  notaText = '';

  async ngOnInit() {
    // Catálogos y lista se cargan en paralelo: la tabla no debe esperar a
    // placas/configuración para mostrar las cotizaciones del vendedor.
    void Promise.all([this.catalog.loadStatePlates(), this.catalog.loadCalculatorConfig()]);
    await this.cargarCotizaciones();
  }

  async cargarCotizaciones() {
    this.loading.set(true);
    const user = this.auth.currentUser();
    if (!user) {
      this.loading.set(false);
      return;
    }

    const { data, error } = await this.quotesService.getVendedorSeguimientoQuotes();
    if (error) {
      this.toast.error('No se pudieron cargar tus cotizaciones. Intenta de nuevo.');
      this.loading.set(false);
      return;
    }

    const rows = data || [];
    this.cotizaciones.set(rows);
    this.loading.set(false);

    // El conteo no debe retrasar la aparición del listado.
    void this.cargarConteoNotas();
  }

  // ===================== SEGUIMIENTO SOLO LECTURA =====================

  private etapasDe(row: VendedorSeguimientoRow | null): SeguimientoEtapas {
    return (row?.etapas || {}) as SeguimientoEtapas;
  }

  etapaCompletada(row: VendedorSeguimientoRow, key: SeguimientoEtapaKey): boolean {
    return !!this.etapasDe(row)[key];
  }

  getEtapaActual(row: VendedorSeguimientoRow): string {
    if (row.fecha_cierre) return 'Entregado';
    if (!row.tiene_seguimiento) return 'Pendiente de registro';

    const etapas = this.etapasDe(row);
    const siguiente = SEGUIMIENTO_ETAPAS.find((etapa) => !etapas[etapa.key]);
    return siguiente?.label || 'Cierre pendiente';
  }

  getEstadoSeguimiento(row: VendedorSeguimientoRow): string {
    if (row.fecha_cierre) return 'Entregado';
    if (!row.tiene_seguimiento) return 'Pendiente de registro';
    return 'En proceso';
  }

  getProgreso(row: VendedorSeguimientoRow): string {
    const completadas = SEGUIMIENTO_ETAPAS.filter((etapa) =>
      this.etapaCompletada(row, etapa.key),
    ).length;
    return `${completadas} de ${SEGUIMIENTO_ETAPAS.length}`;
  }

  getEstadoEntrega(row: VendedorSeguimientoRow): string {
    return row.fecha_cierre ? 'Entregada' : 'En proceso';
  }

  getActivo(row: VendedorSeguimientoRow): string {
    // Activo debe representar el vehículo capturado en la cotización. El texto
    // libre del asesor solo se usa como respaldo si no existe marca ni modelo.
    return (
      [row.brand, row.model, row.year].filter(Boolean).join(' ').trim() ||
      row.activo_texto?.trim() ||
      'Vehículo sin especificar'
    );
  }

  // ===================== NOTAS COMPARTIDAS =====================

  getNotasCount(row: VendedorSeguimientoRow): number {
    return this.notasCount()[String(row.id)] || 0;
  }

  private async cargarConteoNotas(): Promise<void> {
    try {
      const { data, error } = await this.quotesService.getSellerQuoteNoteCounts();
      if (!error) this.notasCount.set(data);
    } catch {
      // El listado y el detalle siguen disponibles aunque falle el conteo.
    }
  }

  async abrirNotas(cotizacion: VendedorSeguimientoRow): Promise<void> {
    this.selectedNoteQuoteId.set(cotizacion.id);
    this.showNotasModal.set(true);
    this.notaText = '';
    this.notaEditando.set(null);
    this.notaError.set('');
    await this.cargarNotas(cotizacion.id);
  }

  private async cargarNotas(quoteId: number): Promise<void> {
    this.notaLoading.set(true);
    this.notaError.set('');

    try {
      const { data, error } = await this.notes.getNotes('quote', quoteId);
      if (error) {
        this.notasCotizacion.set([]);
        this.notaError.set('No se pudieron cargar las notas. Intenta de nuevo.');
      } else {
        this.notasCotizacion.set(data);
        this.actualizarConteoNotas(quoteId);
      }
    } catch {
      this.notasCotizacion.set([]);
      this.notaError.set('No se pudieron cargar las notas. Intenta de nuevo.');
    } finally {
      this.notaLoading.set(false);
    }
  }

  esNotaPropia(nota: EntityNote): boolean {
    return nota.es_propia;
  }

  getNotaAutorNombre(nota: EntityNote): string {
    return nota.autor_nombre || 'Autor no disponible';
  }

  async guardarNota(): Promise<void> {
    const quoteId = this.selectedNoteQuoteId();
    const texto = this.notaText.trim();
    if (!quoteId || !texto || this.notaLoading()) return;

    this.notaLoading.set(true);
    this.notaError.set('');
    const editando = this.notaEditando();

    const { error } = editando
      ? await this.notes.updateOwnNote(editando.id, texto)
      : await this.notes.createNote('quote', quoteId, texto);

    if (error) {
      this.notaError.set('No se pudo guardar la nota. Intenta de nuevo.');
      this.toast.error('No se pudo guardar la nota');
    } else {
      this.notaText = '';
      this.notaEditando.set(null);
      await this.cargarNotas(quoteId);
      this.actualizarConteoNotas(quoteId);
      this.toast.success(
        editando ? 'Nota actualizada correctamente' : 'Nota agregada correctamente',
      );
    }

    this.notaLoading.set(false);
  }

  editarNota(nota: EntityNote): void {
    if (!this.esNotaPropia(nota)) return;
    this.notaEditando.set(nota);
    this.notaText = nota.texto;
    this.notaError.set('');
  }

  cancelarEdicionNota(): void {
    this.notaEditando.set(null);
    this.notaText = '';
    this.notaError.set('');
  }

  pedirEliminarNota(nota: EntityNote): void {
    if (!this.esNotaPropia(nota)) return;
    this.notaToDelete.set(nota);
    this.showNotaConfirmModal.set(true);
  }

  async confirmarEliminarNota(): Promise<void> {
    const quoteId = this.selectedNoteQuoteId();
    const nota = this.notaToDelete();
    if (!quoteId || !nota || this.notaLoading()) return;

    this.notaLoading.set(true);
    this.notaError.set('');
    const { error } = await this.notes.deleteOwnNote(nota.id);

    if (error) {
      this.notaError.set('No se pudo eliminar la nota. Intenta de nuevo.');
      this.toast.error('No se pudo eliminar la nota');
    } else {
      if (this.notaEditando()?.id === nota.id) this.cancelarEdicionNota();
      await this.cargarNotas(quoteId);
      this.actualizarConteoNotas(quoteId);
      this.toast.success('Nota eliminada correctamente');
    }

    this.showNotaConfirmModal.set(false);
    this.notaToDelete.set(null);
    this.notaLoading.set(false);
  }

  cerrarConfirmacionEliminarNota(): void {
    this.showNotaConfirmModal.set(false);
    this.notaToDelete.set(null);
  }

  cerrarNotas(): void {
    this.showNotasModal.set(false);
    this.notasCotizacion.set([]);
    this.notaText = '';
    this.notaEditando.set(null);
    this.notaError.set('');
    this.selectedNoteQuoteId.set(null);
    this.showNotaConfirmModal.set(false);
    this.notaToDelete.set(null);
  }

  private actualizarConteoNotas(quoteId: number): void {
    const count = this.notasCotizacion().length;
    this.notasCount.update((counts) => ({ ...counts, [String(quoteId)]: count }));
  }

  // ===================== MATERIALES (Ajuste 17) =====================

  /**
   * Guía Autométrica: conserva el comportamiento actual, abre el PDF
   * directamente en una pestaña nueva. Solo si el administrador configuró otro
   * modo (contenido o URL) navega a la página del material.
   */
  async abrirGuia(): Promise<void> {
    const config = await this.materialesService.get('guia');

    if (config.modo === 'pdf') {
      const { url, error } = await this.materialesService.getPdfSignedUrl('guia');
      if (error || !url) {
        this.toast.error('El asesor aún no ha cargado la guía automática.');
        return;
      }
      window.open(url, '_blank', 'noopener');
      return;
    }

    this.router.navigate(['/material/guia']);
  }

  /** Pre Solicitudes: siempre navegan a su página de material. */
  abrirMaterial(clave: ClaveMaterial): void {
    this.router.navigate(['/material', clave]);
  }

  async verCotizacion(cotizacion: VendedorSeguimientoRow) {
    this.selectedRow.set(cotizacion);
    // 1. Intentar el snapshot inmutable guardado (fiel al momento de generación. Sí existe, se muestra tal cual.)
    const snapshot = await this.quotesService.getQuoteCalculation(cotizacion.id);

    if (snapshot) {
      this.selectedQuote.set(snapshot);
      this.showDetail.set(true);
      return;
    }

    const result = this.calculator.calculateQuote(this.buildInputFromRow(cotizacion));
    this.selectedQuote.set(result);
    this.showDetail.set(true);
  }

  /**
   * Convierte una fila de la BD (quotes) en la entrada que consume el motor de cálculo.
   * Se usa como fallback cuando una cotización antigua no tiene snapshot guardado.
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

  // ===================== RETENCIÓN (purga automática) =====================
  // El listado solo recibe la información de seguimiento necesaria para mostrar
  // el avance; la RPC no expone el resto de la tabla ni permite modificarlo.
  // El chip de purga estima con los campos visibles y la SQL conserva la regla
  // completa (incluido Expediente como única protección permanente).

  /** Texto del chip informativo de la tarjeta ('' = sin aviso). */
  getPurgeChip(row: any): string {
    if (!row?.created_at) return '';
    const probe = {
      created_at: row.created_at,
      fijada: row?.fijada === true,
      revisada: row?.revisada === true,
      last_reviewed_at: row?.last_reviewed_at ?? null,
      last_interacted_at: row?.last_interacted_at ?? null,
    };
    if (!willAutoDelete(probe, null)) return '';
    const estado = this.getVigenciaEstado(row);
    if (estado !== 'vencida') return '';
    return `Se elimina el ${formatPurgeDate(probe)}`;
  }

  // ===================== VIGENCIA =====================

  getVigenciaEstado(row: any): ValidityStatus {
    if (row?.valid_until) {
      return getValidityStatus(row.valid_until);
    }
    // Si la migración aún no se aplicó: calcular sobre la fecha de creación.
    return getValidityStatus(computeValidUntil(row?.created_at ?? new Date()));
  }

  getVigenciaLabel(row: any): string {
    return getValidityLabel(this.getVigenciaEstado(row));
  }

  getVigenciaClase(row: any): string {
    return `vigencia-${this.getVigenciaEstado(row)}`;
  }

  getVigenciaFecha(row: any): string {
    if (row?.valid_until) {
      return new Date(row.valid_until).toLocaleDateString('es-MX', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    }
    return computeValidUntil(row?.created_at ?? new Date()).toLocaleDateString('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  trackByQuote(_index: number, row: VendedorSeguimientoRow): number {
    return row.id;
  }

  volverAlListado() {
    this.showDetail.set(false);
    this.selectedQuote.set(null);
    this.selectedRow.set(null);
  }
}
