import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { QuoteFormComponent } from './components/quote-form/quote-form.component';
import { QuoteOptionsComponent } from './components/quote-options/quote-options.component';
import { QuoteBreakdownComponent } from './components/quote-breakdown/quote-breakdown.component';
import { FinancialCalculatorService } from './services/financial-calculator.service';
import { SupabaseService } from './services/supabase.service';
import { VehicleQuoteInput, QuoteCalculationResult } from './models/leasing.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    QuoteFormComponent,
    QuoteOptionsComponent,
    QuoteBreakdownComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private calculator = inject(FinancialCalculatorService);
  private supabase = inject(SupabaseService);

  public calculationResult = signal<QuoteCalculationResult | null>(null);
  public selectedOptionKey = signal<'OPCION_1' | 'OPCION_2' | 'OPCION_3'>('OPCION_1');
  public notificationMessage = signal<string | null>(null);

  public onQuoteInputChange(input: VehicleQuoteInput): void {
    const calc = this.calculator.calculateQuote(input);
    this.calculationResult.set(calc);
  }

  public onOptionSelected(key: 'OPCION_1' | 'OPCION_2' | 'OPCION_3'): void {
    this.selectedOptionKey.set(key);
  }

  public onSaveQuote(): void {
    const calc = this.calculationResult();
    if (calc) {
      this.supabase.saveQuote(calc);
      this.showToast('✅ Cotización guardada exitosamente');
    }
  }

  private showToast(msg: string): void {
    this.notificationMessage.set(msg);
    setTimeout(() => {
      this.notificationMessage.set(null);
    }, 3500);
  }
}
