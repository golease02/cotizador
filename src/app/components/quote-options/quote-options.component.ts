import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeasingOptionResult, QuoteCalculationResult } from '../../models/leasing.model';

@Component({
  selector: 'app-quote-options',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="options-container" *ngIf="calculation">
      <div class="section-title-bar">
        <h3>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="title-icon">
            <rect width="18" height="18" x="3" y="3" rx="2"/>
            <path d="M3 9h18"/>
            <path d="M9 21V9"/>
          </svg>
          OPCIONES DE ARRENDAMIENTO (PLAZO {{ calculation.input.termMonths }} MESES)
        </h3>
        <span class="badge-accent">Compare estrategias de valor residual</span>
      </div>

      <div class="cards-grid">
        <!-- Option 1 -->
        <div 
          class="option-card" 
          [class.selected]="selectedOptionKey === 'OPCION_1'"
          (click)="selectOption('OPCION_1')"
        >
          <div class="card-badge" *ngIf="selectedOptionKey === 'OPCION_1'">SELECCIONADA</div>
          <div class="option-header">
            <h4>OPCIÓN 1</h4>
            <span class="vr-tag">VR 35%</span>
          </div>

          <div class="rate-info">
            <span class="rate-label">Tasa Anual</span>
            <span class="rate-value">{{ (calculation.options.option1.annualRatePct * 100) | number:'1.1-1' }}%</span>
          </div>

          <div class="price-box">
            <span class="price-label">Renta Mensual Neta (con IVA)</span>
            <div class="price-amount">
              {{ calculation.options.option1.monthlyCosts.totalMonthlyRentNet | currency:'MXN':'symbol':'1.2-2' }}
            </div>
            <span class="price-sub">Subtotal sin IVA: {{ calculation.options.option1.monthlyCosts.subtotalNoIva | currency:'MXN':'symbol':'1.2-2' }}</span>
          </div>

          <div class="divider"></div>

          <div class="details-list">
            <div class="detail-row">
              <span>Desembolso Inicial:</span>
              <strong class="text-glow">{{ calculation.options.option1.initialCosts.totalInitialPayment | currency:'MXN':'symbol':'1.2-2' }}</strong>
            </div>
            <div class="detail-row">
              <span>Valor Residual Neto:</span>
              <strong>{{ calculation.options.option1.residualValue.valueNet | currency:'MXN':'symbol':'1.0-0' }}</strong>
            </div>
            <div class="detail-row">
              <span>Monto Financiar Sin IVA:</span>
              <span>{{ calculation.options.option1.amountToFinanceNoIva | currency:'MXN':'symbol':'1.0-0' }}</span>
            </div>
          </div>

          <button class="select-btn" [class.btn-active]="selectedOptionKey === 'OPCION_1'">
            {{ selectedOptionKey === 'OPCION_1' ? 'Opción Seleccionada' : 'Ver Desglose Opción 1' }}
          </button>
        </div>

        <!-- Option 2 -->
        <div 
          class="option-card" 
          [class.selected]="selectedOptionKey === 'OPCION_2'"
          (click)="selectOption('OPCION_2')"
        >
          <div class="card-badge" *ngIf="selectedOptionKey === 'OPCION_2'">SELECCIONADA</div>
          <div class="option-header">
            <h4>OPCIÓN 2</h4>
            <span class="vr-tag">VR 20%</span>
          </div>

          <div class="rate-info">
            <span class="rate-label">Tasa Anual</span>
            <span class="rate-value">{{ (calculation.options.option2.annualRatePct * 100) | number:'1.1-1' }}%</span>
          </div>

          <div class="price-box">
            <span class="price-label">Renta Mensual Neta (con IVA)</span>
            <div class="price-amount">
              {{ calculation.options.option2.monthlyCosts.totalMonthlyRentNet | currency:'MXN':'symbol':'1.2-2' }}
            </div>
            <span class="price-sub">Subtotal sin IVA: {{ calculation.options.option2.monthlyCosts.subtotalNoIva | currency:'MXN':'symbol':'1.2-2' }}</span>
          </div>

          <div class="divider"></div>

          <div class="details-list">
            <div class="detail-row">
              <span>Desembolso Inicial:</span>
              <strong class="text-glow">{{ calculation.options.option2.initialCosts.totalInitialPayment | currency:'MXN':'symbol':'1.2-2' }}</strong>
            </div>
            <div class="detail-row">
              <span>Valor Residual Neto:</span>
              <strong>{{ calculation.options.option2.residualValue.valueNet | currency:'MXN':'symbol':'1.0-0' }}</strong>
            </div>
            <div class="detail-row">
              <span>Monto Financiar Sin IVA:</span>
              <span>{{ calculation.options.option2.amountToFinanceNoIva | currency:'MXN':'symbol':'1.0-0' }}</span>
            </div>
          </div>

          <button class="select-btn" [class.btn-active]="selectedOptionKey === 'OPCION_2'">
            {{ selectedOptionKey === 'OPCION_2' ? 'Opción Seleccionada' : 'Ver Desglose Opción 2' }}
          </button>
        </div>

        <!-- Option 3 -->
        <div 
          class="option-card" 
          [class.selected]="selectedOptionKey === 'OPCION_3'"
          (click)="selectOption('OPCION_3')"
        >
          <div class="card-badge" *ngIf="selectedOptionKey === 'OPCION_3'">SELECCIONADA</div>
          <div class="option-header">
            <h4>OPCIÓN 3</h4>
            <span class="vr-tag">VR 5%</span>
          </div>

          <div class="rate-info">
            <span class="rate-label">Tasa Anual</span>
            <span class="rate-value">{{ (calculation.options.option3.annualRatePct * 100) | number:'1.1-1' }}%</span>
          </div>

          <div class="price-box">
            <span class="price-label">Renta Mensual Neta (con IVA)</span>
            <div class="price-amount">
              {{ calculation.options.option3.monthlyCosts.totalMonthlyRentNet | currency:'MXN':'symbol':'1.2-2' }}
            </div>
            <span class="price-sub">Subtotal sin IVA: {{ calculation.options.option3.monthlyCosts.subtotalNoIva | currency:'MXN':'symbol':'1.2-2' }}</span>
          </div>

          <div class="divider"></div>

          <div class="details-list">
            <div class="detail-row">
              <span>Desembolso Inicial:</span>
              <strong class="text-glow">{{ calculation.options.option3.initialCosts.totalInitialPayment | currency:'MXN':'symbol':'1.2-2' }}</strong>
            </div>
            <div class="detail-row">
              <span>Valor Residual Neto:</span>
              <strong>{{ calculation.options.option3.residualValue.valueNet | currency:'MXN':'symbol':'1.0-0' }}</strong>
            </div>
            <div class="detail-row">
              <span>Monto Financiar Sin IVA:</span>
              <span>{{ calculation.options.option3.amountToFinanceNoIva | currency:'MXN':'symbol':'1.0-0' }}</span>
            </div>
          </div>

          <button class="select-btn" [class.btn-active]="selectedOptionKey === 'OPCION_3'">
            {{ selectedOptionKey === 'OPCION_3' ? 'Opción Seleccionada' : 'Ver Desglose Opción 3' }}
          </button>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .options-container {
      margin-bottom: 2rem;
    }

    .section-title-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .section-title-bar h3 {
      font-family: 'Fjalla One', sans-serif;
      font-size: 1.25rem;
      color: #0f172a;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0;
      letter-spacing: 0.5px;
    }

    .title-icon {
      color: #20b038;
    }

    .badge-accent {
      font-size: 0.75rem;
      color: #15803d;
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      padding: 0.35rem 0.75rem;
      border-radius: 12px;
      font-weight: 700;
    }

    .cards-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.25rem;
    }

    .option-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
      position: relative;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .option-card:hover {
      transform: translateY(-4px);
      border-color: #20b038;
      box-shadow: 0 12px 24px rgba(32, 176, 56, 0.15);
    }

    .option-card.selected {
      background: #ffffff;
      border: 2px solid #20b038;
      box-shadow: 0 0 20px rgba(32, 176, 56, 0.2);
    }

    .card-badge {
      position: absolute;
      top: -10px;
      right: 16px;
      background: linear-gradient(135deg, #15803d 0%, #20b038 100%);
      color: #ffffff;
      font-family: 'Fjalla One', sans-serif;
      font-size: 0.7rem;
      letter-spacing: 0.5px;
      padding: 0.2rem 0.65rem;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(32, 176, 56, 0.3);
    }

    .option-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
    }

    .option-header h4 {
      margin: 0;
      font-family: 'Fjalla One', sans-serif;
      font-size: 1.25rem;
    color: #0f172a;
      letter-spacing: 0.5px;
    }

    .vr-tag {
      background: #f0fdf4;
      color: #15803d;
      border: 1px solid #bbf7d0;
      font-weight: 700;
      font-size: 0.75rem;
      padding: 0.25rem 0.6rem;
      border-radius: 6px;
    }

    .rate-info {
      display: flex;
      justify-content: space-between;
      font-size: 0.8rem;
      color: #64748b;
      margin-bottom: 1rem;
    }

    .rate-value {
      color: #0f172a;
      font-weight: 700;
    }

    .price-box {
      background: #f8fafc;
      border-radius: 12px;
      padding: 1rem;
      text-align: center;
      margin-bottom: 1rem;
      border: 1px solid #e2e8f0;
    }

    .price-label {
      font-size: 0.7rem;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .price-amount {
      font-family: 'JetBrains Mono', monospace;
      font-size: 1.45rem;
      font-weight: 700;
      color: #15803d;
      line-height: 1.2;
      margin: 0.25rem 0;
    }

    .price-sub {
      font-size: 0.7rem;
      color: #64748b;
    }

    .divider {
      height: 1px;
      background: #e2e8f0;
      margin-bottom: 1rem;
    }

    .details-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      font-size: 0.8rem;
      margin-bottom: 1.25rem;
      flex-grow: 1;
    }

    .detail-row {
      display: flex;
      justify-content: space-between;
      color: #64748b;
    }

    .text-glow {
      color: #15803d;
    }

    .select-btn {
      width: 100%;
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      color: #334155;
      padding: 0.65rem;
      border-radius: 10px;
      font-size: 0.825rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
    }

    .select-btn.btn-active {
      background: linear-gradient(135deg, #15803d 0%, #20b038 100%);
      border-color: #15803d;
      color: #ffffff;
      box-shadow: 0 4px 12px rgba(32, 176, 56, 0.3);
    }

    @media (max-width: 992px) {
      .cards-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class QuoteOptionsComponent {
  @Input() calculation!: QuoteCalculationResult | null;
  @Input() selectedOptionKey: 'OPCION_1' | 'OPCION_2' | 'OPCION_3' = 'OPCION_1';
  @Output() optionSelected = new EventEmitter<'OPCION_1' | 'OPCION_2' | 'OPCION_3'>();

  public selectOption(key: 'OPCION_1' | 'OPCION_2' | 'OPCION_3'): void {
    this.selectedOptionKey = key;
    this.optionSelected.emit(key);
  }
}
