import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { QuotesService } from '../../../services/quotes.service';
import { FinancialCalculatorService } from '../../../services/financial-calculator.service';
import { CatalogService } from '../../../services/catalog.service';
import { QuoteDraftService } from '../../../services/quote-draft.service';
import { ToastService } from '../../../services/toast.service';
import { QuoteBreakdownComponent } from '../../quote-breakdown/quote-breakdown.component';
import { QuoteCalculationResult, VehicleQuoteInput } from '../../../models/leasing.model';
import { computeValidUntil, getValidityLabel, getValidityStatus, ValidityStatus } from '../../../utils/quote-validity';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mis-cotizaciones',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, QuoteBreakdownComponent],
  templateUrl: './mis-cotizaciones.html',
  styleUrls: ['./mis-cotizaciones.css']
})
export class MisCotizacionesComponent implements OnInit {
  private auth = inject(AuthService);
  private quotesService = inject(QuotesService);
  private calculator = inject(FinancialCalculatorService);
  private catalog = inject(CatalogService);
  private router = inject(Router);
  private draftService = inject(QuoteDraftService);
  private toast = inject(ToastService);

  isAdmin = computed(() => this.auth.isAdmin());
  cotizaciones = signal<any[]>([]);
  cotizacionesFiltradas = signal<any[]>([]);
  loading = signal(true);
  selectedQuote = signal<QuoteCalculationResult | null>(null);
  selectedRow = signal<any | null>(null);
  showDetail = signal(false);

  // Filtros
  filtroTexto = '';
  filtroPeriodo = 'todos'; // 'todos', '7dias', '30dias'

  async ngOnInit() {
    await Promise.all([
      this.catalog.loadStatePlates(),
      this.catalog.loadCalculatorConfig(),
    ]);
    await this.cargarCotizaciones();
  }

  async cargarCotizaciones() {
    this.loading.set(true);
    const user = this.auth.currentUser();
    if (!user) {
      this.loading.set(false);
      return;
    }

    const { data, error } = await this.quotesService.getVendedorQuotes(user.id);
    if (error) {
      this.toast.error('No se pudieron cargar tus cotizaciones. Intenta de nuevo.');
      this.loading.set(false);
      return;
    }

    this.cotizaciones.set(data || []);
    this.aplicarFiltros();
    this.loading.set(false);
  }

  aplicarFiltros() {
    let items = this.cotizaciones();

    if (this.filtroTexto.trim()) {
      const term = this.filtroTexto.toLowerCase().trim();
      items = items.filter(item =>
        (item.client_name || '').toLowerCase().includes(term) ||
        (item.brand || '').toLowerCase().includes(term) ||
        (item.model || '').toLowerCase().includes(term)
      );
    }

    if (this.filtroPeriodo !== 'todos') {
      const ahora = new Date();
      const limite = new Date();
      if (this.filtroPeriodo === '7dias') {
        limite.setDate(ahora.getDate() - 7);
      } else if (this.filtroPeriodo === '30dias') {
        limite.setDate(ahora.getDate() - 30);
      }
      items = items.filter(item => {
        const fecha = new Date(item.created_at);
        return fecha >= limite;
      });
    }

    this.cotizacionesFiltradas.set(items);
  }

  onFiltroCambiar() {
    this.aplicarFiltros();
  }

  async verCotizacion(cotizacion: any) {
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
   * Se usa tanto para "Ver detalle" como para "Duplicar" / "Editar".
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
    };
  }

  // ===================== DUPLICAR / EDITAR =====================

  duplicarCotizacion(row: any): void {
    this.draftService.setDraft(this.buildInputFromRow(row));
    this.toast.success('Cotización duplicada. Ajusta los datos y guárdala.');
    this.router.navigate(['/cotizador']);
  }

    editarCotizacion(): void {
    const row = this.selectedRow();
    if (!row) return;
    const validUntil =
      row.valid_until ?? computeValidUntil(row?.created_at ?? new Date()).toISOString();
    this.draftService.setDraft(this.buildInputFromRow(row), row.id, validUntil);
    this.toast.info('Editando cotización existente. Los cambios se guardarán sobre ella.');
    this.router.navigate(['/cotizador']);
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

  volverAlListado() {
    this.showDetail.set(false);
    this.selectedQuote.set(null);
    this.selectedRow.set(null);
  }
}
