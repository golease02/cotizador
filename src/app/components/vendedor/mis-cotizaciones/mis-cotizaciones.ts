import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { QuotesService } from '../../../services/quotes.service';
import { FinancialCalculatorService } from '../../../services/financial-calculator.service';
import { QuoteBreakdownComponent } from '../../quote-breakdown/quote-breakdown.component';
import { QuoteCalculationResult, VehicleQuoteInput } from '../../../models/leasing.model';
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

  isAdmin = computed(() => this.auth.isAdmin());
  cotizaciones = signal<any[]>([]);
  cotizacionesFiltradas = signal<any[]>([]);
  loading = signal(true);
  selectedQuote = signal<QuoteCalculationResult | null>(null);
  showDetail = signal(false);

  // Filtros
  filtroTexto = '';
  filtroPeriodo = 'todos'; // 'todos', '7dias', '30dias'

  async ngOnInit() {
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
      // Error silencioso: no se muestra en consola
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

  verCotizacion(cotizacion: any) {
    const input: VehicleQuoteInput = {
      clientName: cotizacion.client_name || '',
      brand: cotizacion.brand,
      model: cotizacion.model,
      year: cotizacion.year,
      priceNet: cotizacion.pricenet,
      isHybridOrElectric: cotizacion.ishybridorelectric || false,
      termMonths: cotizacion.termmonths as any,
      extraordinaryRentPct: cotizacion.extraordinaryrentpct || 0.1,
      securityDepositPct: cotizacion.securitydepositpct || 0,
      selectedStatePlateId: cotizacion.selectedstateplateid || 'pendiente',
      isInsuranceEstimated: cotizacion.isinsuranceestimated || false,
    };

    const result = this.calculator.calculateQuote(input);
    this.selectedQuote.set(result);
    this.showDetail.set(true);
  }

  volverAlListado() {
    this.showDetail.set(false);
    this.selectedQuote.set(null);
  }
}
