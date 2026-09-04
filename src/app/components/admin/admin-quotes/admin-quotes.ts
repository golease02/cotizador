import { Component, inject, signal, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuotesService } from '../../../services/quotes.service';
import { AdminService } from '../../../services/admin.service';
import { AuthService } from '../../../services/auth.service';
import { getSupabaseClient } from '../../../services/supabase-client';
import { ToastService } from '../../../services/toast.service';
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
  private quotesService = inject(QuotesService);
  private admin = inject(AdminService);
  private auth = inject(AuthService);
  private client = getSupabaseClient();
  private calculator = inject(FinancialCalculatorService);
  private cdr = inject(ChangeDetectorRef);
  readonly toastService = inject(ToastService);

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
  showNotaConfirmModal = false;
  notaToDelete: any = null;

  // Tooltip
  showTooltip = false;
  tooltipContent = '';
  tooltipPosition = { x: 0, y: 0 };

  async ngOnInit() {
    await this.loadQuotes();
    await this.loadVendedores();
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.showNotaConfirmModal) this.cancelarEliminarNota();
    if (this.showNotasModal) this.cerrarNotasQuote();
    if (this.showModal) this.cerrarModal();
  }

  handleToast(t: any) {
    if (t.action) t.action();
    this.toastService.dismiss(t.id);
  }

  // ===================== LISTADO =====================

  async loadQuotes() {
    this.loading = true;
    const { data, error } = await this.quotesService.getAllQuotesWithSeller();
    if (!error) {
      for (const q of data) {
        const dias = this.getDiasSinActualizar(q);
        let colorCalculado = 'reciente';
        if (this.isQuoteReviewed(q)) {
          colorCalculado = 'verde';
        } else {
          if (dias > 7) colorCalculado = 'rojo';
          else if (dias > 2) colorCalculado = 'amarillo';
          else colorCalculado = 'reciente';
        }
        if (q.color !== colorCalculado) {
          await this.client
            .from('quotes')
            .update({ color: colorCalculado })
            .eq('id', q.id);
          q.color = colorCalculado;
        }
      }
      this.quotes.set(data || []);
      this.applyFilters();
    } else {
      this.toastService.error('No se pudieron cargar las cotizaciones');
    }
    this.loading = false;
    this.cdr.detectChanges();
  }

  async loadVendedores() {
    const { data, error } = await this.admin.getSellersWithQuoteCount();
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

    if (this.filtroColor !== 'todos') {
      filtered = filtered.filter(q => q.color === this.filtroColor);
    }

    filtered.sort((a, b) => {
      if (a.fijada && !b.fijada) return -1;
      if (!a.fijada && b.fijada) return 1;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    this.filteredQuotes.set(filtered);
    this.cdr.detectChanges();
  }

  setStatusFilter(color: string) {
    this.filtroColor = color;
    this.applyFilters();
  }

  clearSearch() {
    this.searchTerm = '';
    this.applyFilters();
  }

  clearFilters() {
    this.searchTerm = '';
    this.filtroVendedor = 'todos';
    this.filtroPeriodo = 'todos';
    this.filtroFechaInicio = '';
    this.filtroFechaFin = '';
    this.filtroPrecioMin = null;
    this.filtroPrecioMax = null;
    this.filtroColor = 'todos';
    this.applyFilters();
  }

  private patchQuote(id: string, patch: any) {
    this.quotes.update(list => list.map(q => (q.id === id ? { ...q, ...patch } : q)));
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
      const { data, error } = await this.client
        .from('notas')
        .select('*')
        .eq('entidad_tipo', 'quote')
        .eq('entidad_id', quoteId)
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

  async guardarNotaQuote() {
    if (!this.notaText.trim()) return;
    this.notaLoading = true;
    this.notaError = '';

    const user = this.auth.currentUser();
    const payload = {
      entidad_tipo: 'quote',
      entidad_id: this.selectedQuoteId,
      texto: this.notaText.trim(),
      creado_por: user?.id || null,
      created_at: new Date().toISOString()
    };

    let error = null;
    if (this.notaEditando) {
      const { error: updateError } = await this.client
        .from('notas')
        .update({ texto: this.notaText.trim() })
        .eq('id', this.notaEditando.id);
      error = updateError;
    } else {
      const { error: insertError } = await this.client
        .from('notas')
        .insert([payload]);
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
      this.toastService.success(eraEdicion ? 'Nota actualizada correctamente' : 'Nota agregada correctamente');
    }
    this.notaLoading = false;
    this.cdr.detectChanges();
  }

  editarNotaQuote(nota: any) {
    this.notaEditando = nota;
    this.notaText = nota.texto;
  }

  eliminarNotaQuote(nota: any) {
    this.notaToDelete = nota;
    this.showNotaConfirmModal = true;
    this.cdr.detectChanges();
  }

  async confirmarEliminarNota() {
    if (!this.notaToDelete) return;
    this.notaLoading = true;
    this.showNotaConfirmModal = false;
    const { error } = await this.client
      .from('notas')
      .delete()
      .eq('id', this.notaToDelete.id);
    if (error) {
      this.notaError = 'Error al eliminar nota';
      this.toastService.error('No se pudo eliminar la nota');
    } else {
      await this.cargarNotasQuote(this.selectedQuoteId!);
      this.toastService.success('Nota eliminada correctamente');
    }
    this.notaLoading = false;
    this.notaToDelete = null;
    this.cdr.detectChanges();
  }

  cancelarEliminarNota() {
    this.showNotaConfirmModal = false;
    this.notaToDelete = null;
    this.cdr.detectChanges();
  }

  cerrarNotasQuote() {
    this.showNotaConfirmModal = false;
    this.notaToDelete = null;
    this.showNotasModal = false;
    this.notasCotizacion = [];
    this.notaText = '';
    this.notaEditando = null;
    this.notaError = '';
    this.selectedQuoteId = null;
  }

  // ===================== COLOR Y SEGUIMIENTO =====================

  async marcarComoRevisado(quoteId: string) {
    const { error } = await this.client
      .from('quotes')
      .update({
        revisada: true,
        color: 'verde'
      })
      .eq('id', quoteId);
    if (error) return;
    const updatedQuotes = this.quotes().map(q => {
      if (q.id === quoteId) {
        q.revisada = true;
        q.color = 'verde';
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

  private isQuoteReviewed(quote: any): boolean {
    return quote.revisada === true || quote.revisada === 'true' || quote.revisada === 1;
  }

  getColorClase(quote: any): string {
    const color = quote.color || 'reciente';
    return `color-${color}`;
  }

  countQuotesByColor(color: string): number {
    return this.filteredQuotes().filter(quote => (quote.color || 'reciente') === color).length;
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
    // Actualización optimista (mismo patrón que sellers/admins)
    this.patchQuote(quote.id, { fijada: nuevoEstado });

    const { error } = await this.client
      .from('quotes')
      .update({ fijada: nuevoEstado })
      .eq('id', quote.id);
    if (error) {
      this.patchQuote(quote.id, { fijada: !nuevoEstado });
      this.toastService.error('Error al fijar la cotización: ' + error.message);
      return;
    }

    this.toastService.undo(
      nuevoEstado ? 'Cotización fijada' : 'Cotización desfijada',
      () => {
        this.patchQuote(quote.id, { fijada: !nuevoEstado });
        this.client
          .from('quotes')
          .update({ fijada: !nuevoEstado })
          .eq('id', quote.id);
      }
    );
  }

  // ===================== TOOLTIP =====================

  onMouseEnter(event: MouseEvent, quote: any) {
    this.client
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
}
