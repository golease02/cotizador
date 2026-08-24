import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SupabaseService } from '../../../services/supabase.service';
import { FinancialCalculatorService } from '../../../services/financial-calculator.service';
import { QuoteBreakdownComponent } from '../../quote-breakdown/quote-breakdown.component';
import { QuoteCalculationResult, VehicleQuoteInput } from '../../../models/leasing.model';

@Component({
  selector: 'app-mis-cotizaciones',
  standalone: true,
  imports: [CommonModule, RouterModule, QuoteBreakdownComponent],
  templateUrl: './mis-cotizaciones.html',
  styleUrls: ['./mis-cotizaciones.css']
})
export class MisCotizacionesComponent implements OnInit {
  private supabase = inject(SupabaseService);
  private calculator = inject(FinancialCalculatorService);

  cotizaciones = signal<any[]>([]);
  loading = signal(true);

  selectedQuote = signal<QuoteCalculationResult | null>(null);
  showDetail = signal(false);

  async ngOnInit() {
    await this.cargarCotizaciones();
  }

  async cargarCotizaciones() {
    this.loading.set(true);
    const user = this.supabase.currentUser();
    if (!user) {
      this.loading.set(false);
      return;
    }

    const { data, error } = await this.supabase.getVendedorQuotes(user.id);
    if (error) {
      console.error('Error cargando cotizaciones:', error);
      this.loading.set(false);
      return;
    }

    this.cotizaciones.set(data || []);
    this.loading.set(false);
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