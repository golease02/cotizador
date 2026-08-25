import { Component, inject, signal, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../../services/supabase.service';
import { QuoteBreakdownComponent } from '../../quote-breakdown/quote-breakdown.component';
import { FinancialCalculatorService } from '../../../services/financial-calculator.service';
import { QuoteCalculationResult, VehicleQuoteInput } from '../../../models/leasing.model';

@Component({
  selector: 'app-admin-quotes',
  standalone: true,
  imports: [CommonModule, FormsModule, QuoteBreakdownComponent],
  templateUrl: './admin-quotes.component.html',
  styleUrls: ['./admin-quotes.component.css']
})
export class AdminQuotesComponent implements OnInit {
  private supabase = inject(SupabaseService);
  private calculator = inject(FinancialCalculatorService);
  private cdr = inject(ChangeDetectorRef);

  // Listado
  quotes = signal<any[]>([]);
  filteredQuotes = signal<any[]>([]);
  loading = true;

  // Filtros
  searchTerm = '';
  filtroVendedor = 'todos';
  filtroPeriodo = 'todos';
  filtroFechaInicio: string = '';
  filtroFechaFin: string = '';
  filtroPrecioMin: number | null = null;
  filtroPrecioMax: number | null = null;

  // Vendedores (con teléfono)
  vendedores: any[] = [];

  // Modal
  showModal = false;
  selectedQuote = signal<QuoteCalculationResult | null>(null);

  async ngOnInit() {
    await this.loadQuotes();
    await this.loadVendedores();
  }

  async loadQuotes() {
    this.loading = true;
    const { data, error } = await this.supabase.getAllQuotesWithSeller();
    if (error) {
      console.error('Error loading quotes:', error);
    } else {
      this.quotes.set(data || []);
      this.applyFilters();
    }
    this.loading = false;
    this.cdr.detectChanges();
  }

  async loadVendedores() {
    const { data, error } = await this.supabase.getSellersWithQuoteCount();
    if (!error && data) {
      this.vendedores = data.map((v: any) => ({
        id: v.id,
        full_name: v.full_name,
        seller_number: v.seller_number || 'Sin número'
      }));
    }
  }

  applyFilters() {
    let filtered = this.quotes();

    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(q =>
        (q.client_name || '').toLowerCase().includes(term) ||
        (q.brand || '').toLowerCase().includes(term) ||
        (q.model || '').toLowerCase().includes(term) ||
        (q.seller_name || '').toLowerCase().includes(term)
      );
    }

    if (this.filtroVendedor !== 'todos') {
      filtered = filtered.filter(q => q.seller_id === this.filtroVendedor);
    }

    if (this.filtroPeriodo !== 'todos') {
      const ahora = new Date();
      const limite = new Date();
      if (this.filtroPeriodo === '7dias') limite.setDate(ahora.getDate() - 7);
      else if (this.filtroPeriodo === '30dias') limite.setDate(ahora.getDate() - 30);
      else if (this.filtroPeriodo === '90dias') limite.setDate(ahora.getDate() - 90);
      filtered = filtered.filter(q => new Date(q.created_at) >= limite);
    }

    if (this.filtroFechaInicio) {
      const inicio = new Date(this.filtroFechaInicio);
      inicio.setHours(0, 0, 0);
      filtered = filtered.filter(q => new Date(q.created_at) >= inicio);
    }
    if (this.filtroFechaFin) {
      const fin = new Date(this.filtroFechaFin);
      fin.setHours(23, 59, 59);
      filtered = filtered.filter(q => new Date(q.created_at) <= fin);
    }

    if (this.filtroPrecioMin !== null && this.filtroPrecioMin > 0) {
      filtered = filtered.filter(q => q.pricenet >= this.filtroPrecioMin!);
    }
    if (this.filtroPrecioMax !== null && this.filtroPrecioMax > 0) {
      filtered = filtered.filter(q => q.pricenet <= this.filtroPrecioMax!);
    }

    this.filteredQuotes.set(filtered);
    this.cdr.detectChanges();
  }

  onFilterChange() {
    this.applyFilters();
  }

  // ✅ Abrir modal con la cotización
  async abrirModal(quote: any) {
    const input: VehicleQuoteInput = {
      clientName: quote.client_name || '',
      brand: quote.brand,
      model: quote.model,
      year: quote.year,
      priceNet: quote.pricenet,
      isHybridOrElectric: quote.ishybridorelectric || false,
      termMonths: quote.termmonths as any,
      extraordinaryRentPct: quote.extraordinaryrentpct || 0.1,
      securityDepositPct: quote.securitydepositpct || 0,
      selectedStatePlateId: quote.selectedstateplateid || 'pendiente',
      isInsuranceEstimated: quote.isinsuranceestimated || false,
    };
    const result = this.calculator.calculateQuote(input);
    this.selectedQuote.set(result);
    this.showModal = true;
    document.body.style.overflow = 'hidden'; // Bloquear scroll
  }

  // ✅ Cerrar modal
  cerrarModal() {
    this.showModal = false;
    this.selectedQuote.set(null);
    document.body.style.overflow = '';
  }

  // ✅ Cerrar al hacer clic en el fondo
  cerrarModalFondo(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.cerrarModal();
    }
  }

  getPeriodoLabel(periodo: string): string {
    const map: Record<string, string> = {
      'todos': 'Todos',
      '7dias': 'Últimos 7 días',
      '30dias': 'Últimos 30 días',
      '90dias': 'Últimos 90 días'
    };
    return map[periodo] || periodo;
  }

  getVendedorNombre(id: string): string {
    const v = this.vendedores.find(v => v.id === id);
    return v ? v.full_name : 'Todos';
  }

  getVendedorTelefono(id: string): string {
    const v = this.vendedores.find(v => v.id === id);
    return v ? v.seller_number : '';
  }
}