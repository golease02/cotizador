import { Component, inject, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteFormComponent } from '../quote-form/quote-form.component';
import { QuoteOptionsComponent } from '../quote-options/quote-options.component';
import { RouterModule } from '@angular/router';
import { QuoteBreakdownComponent } from '../quote-breakdown/quote-breakdown.component';
import { FinancialCalculatorService } from '../../services/financial-calculator.service';
import { QuotesService } from '../../services/quotes.service';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { QuoteDraftService } from '../../services/quote-draft.service';
import { computeValidUntil } from '../../utils/quote-validity';
import { VehicleQuoteInput, QuoteCalculationResult } from '../../models/leasing.model';

@Component({
  selector: 'app-cotizador',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    QuoteFormComponent,
    QuoteOptionsComponent,
    QuoteBreakdownComponent,
  ],
  templateUrl: './cotizador.html',
  styleUrls: ['./cotizador.css']
})
export class CotizadorComponent implements OnDestroy {
  private calculator = inject(FinancialCalculatorService);
  private quotes = inject(QuotesService);
  private auth = inject(AuthService);
  private toast = inject(ToastService);
  private draftService = inject(QuoteDraftService);

  public calculationResult = signal<QuoteCalculationResult | null>(null);
  public selectedOptionKey = signal<'OPCION_1' | 'OPCION_2' | 'OPCION_3'>('OPCION_1');

  /** Datos precargados desde Mis Cotizaciones ("Duplicar" / "Editar"). */
  public preloadedInput: VehicleQuoteInput | null = null;
  /** Fecha límite de vigencia de la cotización en edición (o de la nueva). */
  public validUntil: Date;

  /** Estado del guardado automático para el indicador de la barra superior. */
  public saveState = signal<'idle' | 'saving' | 'saved'>('idle');
  public lastSavedAt = signal<Date | null>(null);

  private currentQuoteId: number | null = null;
  private saveTimeout: any = null;
  private isSaving = false;

  constructor() {
    // El borrador se consume aquí (antes de crear el formulario hijo) para que
    // el @Input [initialInput] ya esté disponible cuando el formulario inicie.
    const draft = this.draftService.draft();
    if (draft) {
      this.preloadedInput = draft.input;
      if (draft.quoteId) {
        this.currentQuoteId = draft.quoteId;
      }
      this.validUntil = draft.validUntil ? new Date(draft.validUntil) : computeValidUntil(new Date());
    } else {
      this.validUntil = computeValidUntil(new Date());
    }
  }

  public onQuoteInputChange(input: VehicleQuoteInput): void {
    const calc = this.calculator.calculateQuote(input);
    this.calculationResult.set(calc);

    if (calc && this.isValidQuote(input)) {
      this.autoSave(calc);
    }
  }

  public onOptionSelected(key: 'OPCION_1' | 'OPCION_2' | 'OPCION_3'): void {
    this.selectedOptionKey.set(key);
  }

  public onSaveQuote(): void {
    const calc = this.calculationResult();
    if (!calc) return;

    this.quotes.saveQuote(calc, this.currentQuoteId ?? undefined)
      .then(({ id, error }) => {
        if (error) {
          this.toast.error('Error al guardar la cotización. Intenta de nuevo.');
          return;
        }
        if (id && !this.currentQuoteId) {
          this.currentQuoteId = id;
        }
        this.saveState.set('saved');
        this.lastSavedAt.set(new Date());
        this.toast.success('Cotización guardada exitosamente');
      });
  }

  // Reiniciar ID cuando se seleccione un nuevo vehículo
  public resetQuoteId(): void {
    this.currentQuoteId = null;
  }

  private isValidQuote(input: VehicleQuoteInput): boolean {
    return (
      input.priceNet > 0 &&
      !!input.brand?.trim() &&
      !!input.model?.trim()
    );
  }

  private autoSave(quote: QuoteCalculationResult): void {
    if (!this.auth.currentUser()) return;

    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }

    this.saveTimeout = setTimeout(() => {
      if (this.isSaving) return;
      this.isSaving = true;
      this.saveState.set('saving');

      this.quotes.saveQuote(quote, this.currentQuoteId ?? undefined)
        .then(({ id, error }) => {
          this.isSaving = false;
          if (error) {
            this.saveState.set('idle');
            this.toast.error('No se pudo guardar la cotización. Revisa tu conexión.');
            console.error('Error guardando cotización:', error);
            return;
          }
          if (id && !this.currentQuoteId) {
            this.currentQuoteId = id;
          }
          this.saveState.set('saved');
          this.lastSavedAt.set(new Date());
        })
        .catch(err => {
          this.isSaving = false;
          this.saveState.set('idle');
          this.toast.error('No se pudo guardar la cotización.');
          console.error('Error en guardado automático:', err);
        });
    }, 500);
  }

  public isVencida(): boolean {
    return this.validUntil.getTime() <= Date.now();
  }

  public vigenciaLabel(): string {
    if (this.isVencida()) {
      return 'Vigencia vencida';
    }
    const d = this.validUntil;
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    return `Vence el ${dd}/${mm}/${d.getFullYear()}`;
  }

  public saveIndicatorLabel(): string {
    if (this.saveState() === 'saving') return 'Guardando…';
    if (this.saveState() === 'saved') {
      const at = this.lastSavedAt();
      if (at) {
        const hh = String(at.getHours()).padStart(2, '0');
        const mi = String(at.getMinutes()).padStart(2, '0');
        return `Guardado ${hh}:${mi}`;
      }
      return 'Guardado';
    }
    return '';
  }

  public ngOnDestroy(): void {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }
  }
}