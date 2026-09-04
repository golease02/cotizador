import { Component, inject, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteFormComponent } from '../quote-form/quote-form.component';
import { QuoteOptionsComponent } from '../quote-options/quote-options.component';
import { RouterModule } from '@angular/router';
import { QuoteBreakdownComponent } from '../quote-breakdown/quote-breakdown.component';
import { FinancialCalculatorService } from '../../services/financial-calculator.service';
import { QuotesService } from '../../services/quotes.service';
import { AuthService } from '../../services/auth.service';
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

  public calculationResult = signal<QuoteCalculationResult | null>(null);
  public selectedOptionKey = signal<'OPCION_1' | 'OPCION_2' | 'OPCION_3'>('OPCION_1');
  public notificationMessage = signal<string | null>(null);

  private currentQuoteId: number | null = null;
  private saveTimeout: any = null;
  private isSaving = false;

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
    if (calc) {
      this.quotes.saveQuote(calc, this.currentQuoteId ?? undefined)
        .then(({ id, error }) => {
          if (error) {
            this.showToast('Error al guardar cotización');
          } else {
            if (id && !this.currentQuoteId) {
              this.currentQuoteId = id;
            }
            this.showToast('Cotización guardada exitosamente');
          }
        });
    }
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
      if (!this.isSaving) {
        this.isSaving = true;
        this.quotes.saveQuote(quote, this.currentQuoteId ?? undefined)
          .then(({ id, error }) => {
            this.isSaving = false;
            if (error) {
              console.error('Error guardando cotización:', error);
            } else if (id && !this.currentQuoteId) {
              this.currentQuoteId = id;
            }
          })
          .catch(err => {
            this.isSaving = false;
            console.error('Error en guardado automático:', err);
          });
      }
    }, 500);
  }

  private showToast(msg: string): void {
    this.notificationMessage.set(msg);
    setTimeout(() => this.notificationMessage.set(null), 3500);
  }

  public ngOnDestroy(): void {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }
  }
}