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
  filtroColor: string = 'todos';

  // Vendedores
  vendedores: any[] = [];

  // Modal de cotización
  showModal = false;
  selectedQuote = signal<QuoteCalculationResult | null>(null);

  // Notas
  showNotasModal = false;
  notasCotizacion: any[] = [];
  notaText = '';
  notaEditando: any = null;
  notaLoading = false;
  notaError = '';
  selectedQuoteId: string | null = null;

  // Colores (solo para etiquetas automáticas)
  colorLabels: Record<string, string> = {
    reciente: 'Reciente',
    verde: 'Revisada',
    amarillo: 'Pendiente',
    rojo: 'Urgente'
  };

  // Tooltip
  showTooltip = false;
  tooltipContent = '';
  tooltipPosition = { x: 0, y: 0 };

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
      // Actualizar colores automáticamente según días y revisión
      for (const q of data) {
        const dias = this.getDiasSinActualizar(q);
        let colorCalculado = 'reciente';
        if (q.revisada) {
          colorCalculado = 'verde';
        } else {
          if (dias > 7) colorCalculado = 'rojo';
          else if (dias > 2) colorCalculado = 'amarillo';
          else colorCalculado = 'reciente';
        }
        if (q.color !== colorCalculado) {
          await this.supabase.client
            .from('quotes')
            .update({ color: colorCalculado, ultima_actualizacion: new Date().toISOString() })
            .eq('id', q.id);
          q.color = colorCalculado;
        }
      }
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

    // Búsqueda
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(q =>
        (q.client_name || '').toLowerCase().includes(term) ||
        (q.brand || '').toLowerCase().includes(term) ||
        (q.model || '').toLowerCase().includes(term) ||
        (q.seller_name || '').toLowerCase().includes(term)
      );
    }

    // Vendedor
    if (this.filtroVendedor !== 'todos') {
      filtered = filtered.filter(q => q.seller_id === this.filtroVendedor);
    }

    // Período
    if (this.filtroPeriodo !== 'todos') {
      const ahora = new Date();
      const limite = new Date();
      if (this.filtroPeriodo === '7dias') limite.setDate(ahora.getDate() - 7);
      else if (this.filtroPeriodo === '30dias') limite.setDate(ahora.getDate() - 30);
      else if (this.filtroPeriodo === '90dias') limite.setDate(ahora.getDate() - 90);
      filtered = filtered.filter(q => new Date(q.created_at) >= limite);
    }

    // Fechas
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

    // Precios
    if (this.filtroPrecioMin !== null && this.filtroPrecioMin > 0) {
      filtered = filtered.filter(q => q.pricenet >= this.filtroPrecioMin!);
    }
    if (this.filtroPrecioMax !== null && this.filtroPrecioMax > 0) {
      filtered = filtered.filter(q => q.pricenet <= this.filtroPrecioMax!);
    }

    // Color
    if (this.filtroColor !== 'todos') {
      filtered = filtered.filter(q => q.color === this.filtroColor);
    }

    // ✅ Ordenar: primero fijadas, luego por fecha de creación descendente
    filtered.sort((a, b) => {
      if (a.fijada && !b.fijada) return -1;
      if (!a.fijada && b.fijada) return 1;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    this.filteredQuotes.set(filtered);
    this.cdr.detectChanges();
  }

  onFilterChange() {
    this.applyFilters();
  }

  // ===================== NOTAS =====================

  async abrirNotas(quote: any) {
    await this.marcarComoRevisado(quote.id);
    this.selectedQuoteId = quote.id;
    this.showNotasModal = true;
    this.notaText = '';
    this.notaEditando = null;
    this.notaError = '';
    await this.cargarNotasQuote(quote.id);
  }

  async cargarNotasQuote(quoteId: string) {
    this.notaLoading = true;
    try {
      const { data, error } = await this.supabase.client
        .from('notas')
        .select('*')
        .eq('entidad_tipo', 'quote')
        .eq('entidad_id', quoteId)
        .order('created_at', { ascending: false });
      if (error) {
        console.error('Error cargando notas de cotización:', error);
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

  async guardarNotaQuote() {
    if (!this.notaText.trim()) return;
    this.notaLoading = true;
    this.notaError = '';

    const user = this.supabase.currentUser();
    const payload = {
      entidad_tipo: 'quote',
      entidad_id: this.selectedQuoteId,
      texto: this.notaText.trim(),
      creado_por: user?.id || null,
      created_at: new Date().toISOString()
    };

    let error = null;
    if (this.notaEditando) {
      const { error: updateError } = await this.supabase.client
        .from('notas')
        .update({ texto: this.notaText.trim() })
        .eq('id', this.notaEditando.id);
      error = updateError;
    } else {
      const { error: insertError } = await this.supabase.client
        .from('notas')
        .insert([payload]);
      error = insertError;
    }

    if (error) {
      console.error('Error guardando nota:', error);
      this.notaError = 'Error al guardar nota';
    } else {
      this.notaText = '';
      this.notaEditando = null;
      await this.cargarNotasQuote(this.selectedQuoteId!);
    }
    this.notaLoading = false;
    this.cdr.detectChanges();
  }

  editarNotaQuote(nota: any) {
    this.notaEditando = nota;
    this.notaText = nota.texto;
  }

  async eliminarNotaQuote(notaId: string) {
    if (!confirm('¿Eliminar esta nota?')) return;
    this.notaLoading = true;
    const { error } = await this.supabase.client
      .from('notas')
      .delete()
      .eq('id', notaId);
    if (error) {
      console.error('Error eliminando nota:', error);
      this.notaError = 'Error al eliminar nota';
    } else {
      await this.cargarNotasQuote(this.selectedQuoteId!);
    }
    this.notaLoading = false;
    this.cdr.detectChanges();
  }

  cerrarNotasQuote() {
    this.showNotasModal = false;
    this.notasCotizacion = [];
    this.notaText = '';
    this.notaEditando = null;
    this.notaError = '';
    this.selectedQuoteId = null;
  }

  // ===================== COLOR Y SEGUIMIENTO =====================

  async marcarComoRevisado(quoteId: string) {
    await this.supabase.client
      .from('quotes')
      .update({
        revisada: true,
        color: 'verde',
        ultima_actualizacion: new Date().toISOString()
      })
      .eq('id', quoteId);
    const updatedQuotes = this.quotes().map(q => {
      if (q.id === quoteId) {
        q.revisada = true;
        q.color = 'verde';
        q.ultima_actualizacion = new Date().toISOString();
      }
      return q;
    });
    this.quotes.set(updatedQuotes);
    this.applyFilters();
  }

  getDiasSinActualizar(quote: any): number {
    const fecha = new Date(quote.ultima_actualizacion || quote.created_at);
    const ahora = new Date();
    const diff = Math.floor((ahora.getTime() - fecha.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  }

  getColorClase(quote: any): string {
    const color = quote.color || 'reciente';
    return `color-${color}`;
  }

  getEtiqueta(quote: any): string {
    const labels: Record<string, string> = {
      reciente: 'Reciente',
      verde: 'Revisada',
      amarillo: 'Pendiente',
      rojo: 'Urgente'
    };
    return labels[quote.color] || 'Reciente';
  }

  // ===================== FIJAR COTIZACIÓN =====================

  async toggleFijar(quote: any) {
    const nuevoEstado = !quote.fijada;
    const { error } = await this.supabase.client
      .from('quotes')
      .update({ fijada: nuevoEstado })
      .eq('id', quote.id);
    if (error) {
      console.error('Error al fijar cotización:', error);
      alert('Error al fijar cotización');
    } else {
      const updatedQuotes = this.quotes().map(q => {
        if (q.id === quote.id) q.fijada = nuevoEstado;
        return q;
      });
      this.quotes.set(updatedQuotes);
      this.applyFilters();
    }
  }

  // ===================== TOOLTIP =====================

  onMouseEnter(event: MouseEvent, quote: any) {
    this.supabase.client
      .from('notas')
      .select('texto, created_at')
      .eq('entidad_tipo', 'quote')
      .eq('entidad_id', quote.id)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          const notasText = data.map(n => `• ${n.texto}`).join('\n');
          this.tooltipContent = notasText || 'Sin notas';
        } else {
          this.tooltipContent = 'Sin notas';
        }
        this.showTooltip = true;
        let x = event.clientX + 12;
        let y = event.clientY + 12;
        if (x + 280 > window.innerWidth) x = event.clientX - 290;
        if (y + 120 > window.innerHeight) y = event.clientY - 120;
        this.tooltipPosition = { x, y };
        this.cdr.detectChanges();
      });
  }

  onMouseLeave() {
    this.showTooltip = false;
    this.tooltipContent = '';
    this.cdr.detectChanges();
  }

  // ===================== MODAL DE COTIZACIÓN =====================

  async abrirModal(quote: any) {
    await this.marcarComoRevisado(quote.id);
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
    document.body.style.overflow = 'hidden';
  }

  cerrarModal() {
    this.showModal = false;
    this.selectedQuote.set(null);
    document.body.style.overflow = '';
  }

  cerrarModalFondo(event: MouseEvent) {
    if (event.target === event.currentTarget) this.cerrarModal();
  }

  // ===================== UTILIDADES =====================

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

