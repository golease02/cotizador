import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import {
  QuotesService,
  VendedorSeguimientoRow,
} from '../../../services/quotes.service';
import { FinancialCalculatorService } from '../../../services/financial-calculator.service';
import { CatalogService } from '../../../services/catalog.service';
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
  imports: [CommonModule, RouterModule, QuoteBreakdownComponent],
  templateUrl: './mis-cotizaciones.html',
  styleUrls: ['./mis-cotizaciones.css'],
})
export class MisCotizacionesComponent implements OnInit {
  private auth = inject(AuthService);
  private quotesService = inject(QuotesService);
  private calculator = inject(FinancialCalculatorService);
  private catalog = inject(CatalogService);
  private toast = inject(ToastService);

  isAdmin = computed(() => this.auth.isAdmin());
  readonly etapas = SEGUIMIENTO_ETAPAS;
  cotizaciones = signal<VendedorSeguimientoRow[]>([]);
  loading = signal(true);
  selectedQuote = signal<QuoteCalculationResult | null>(null);
  selectedRow = signal<VendedorSeguimientoRow | null>(null);
  showDetail = signal(false);

  async ngOnInit() {
    await Promise.all([this.catalog.loadStatePlates(), this.catalog.loadCalculatorConfig()]);
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

    this.cotizaciones.set(data || []);
    this.loading.set(false);
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
    const completadas = SEGUIMIENTO_ETAPAS.filter((etapa) => this.etapaCompletada(row, etapa.key))
      .length;
    return `${completadas} de ${SEGUIMIENTO_ETAPAS.length}`;
  }

  getEstadoEntrega(row: VendedorSeguimientoRow): string {
    return row.fecha_cierre ? 'Entregada' : 'En proceso';
  }

  getActivo(row: VendedorSeguimientoRow): string {
    return (
      row.activo_texto?.trim() ||
      [row.brand, row.model, row.year].filter(Boolean).join(' ').trim() ||
      'Vehículo sin especificar'
    );
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
