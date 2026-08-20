import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehicleQuoteInput, StatePlateOption } from '../../models/leasing.model';
import { SupabaseService, VehicleCatalogItem } from '../../services/supabase.service';

@Component({
  selector: 'app-quote-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="card form-card">
      <div class="card-header">
        <h2 class="card-title">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="title-icon">
            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 1 12v4c0 .6.4 1 1 1h2"/>
            <circle cx="7" cy="17" r="2"/>
            <path d="M9 17h6"/>
            <circle cx="17" cy="17" r="2"/>
          </svg>
          DATOS DEL VEHÍCULO
        </h2>
        <span class="card-subtitle">Cotización rápida en tiempo real</span>
      </div>

      <!-- Quick Preset: two cascade dropdowns (Brand → Model) -->
      <div class="preset-chips-section">
        <span class="preset-label">Selección Rápida:</span>
        <div class="preset-cascade-row">
          <!-- 1. Brand dropdown (oculto) -->
          <select id="presetBrandSelect" class="preset-select" (change)="onBrandSelectChange($event)" style="display:none;">
            <option value="" disabled selected hidden>Marca</option>
            <option *ngFor="let group of presetGroups" [value]="group.brand">{{ group.brand }}</option>
          </select>

          <!-- 2. Model dropdown (filtered by brand) -->
          <select id="presetModelSelect" class="preset-select" (change)="onPresetSelectChange($event)" [disabled]="!selectedPresetBrand">
            <option value="" disabled selected hidden>Selecciona</option>
            <option *ngFor="let v of filteredPresetVehicles" [value]="v.id">
              {{ v.model }} &mdash; {{ v.suggestedPriceNet | currency:'MXN':'symbol':'1.0-0' }}
            </option>
          </select>
        </div>
      </div>

      <form [formGroup]="quoteForm" class="form-body">

        <div class="form-grid">
          <!-- Client Name -->
          <div class="form-group full-width">
            <label class="form-label" for="clientName">Atención a (Cliente / Prospecto)</label>
            <input id="clientName" type="text" formControlName="clientName" class="form-control" placeholder="" />
          </div>

          <!-- Brand (oculto) -->
          <div class="form-group" style="display:none;">
            <label class="form-label" for="brand">Marca *</label>
            <input id="brand" type="text" formControlName="brand" class="form-control" placeholder="Ej. Audi, HINO, Toyota" />
          </div>

          <!-- Model -->
          <div class="form-group">
            <label class="form-label" for="model">Modelo *</label>
            <input id="model" type="text" formControlName="model" class="form-control" placeholder="Ej. Q3 Sportback, 616 LONG" />
          </div>

          <!-- Year -->
          <div class="form-group">
            <label class="form-label" for="year">Año Modelo *</label>
            <input id="year" type="number" formControlName="year" class="form-control" min="2015" max="2030" />
            <div *ngIf="isPreOwned" class="warning-text">
              ⚠️ Seminuevo (< 2024): Requiere IVA al 16% en factura.
            </div>
          </div>

          <!-- State Plate Selection -->
          <div class="form-group">
            <label class="form-label" for="selectedStatePlateId">Alta de Placas</label>
            <select id="selectedStatePlateId" formControlName="selectedStatePlateId" class="form-control">
              <option *ngFor="let p of statePlates" [value]="p.id">
                {{ p.name }} ({{ p.costNet | currency:'MXN':'symbol':'1.0-0' }})
              </option>
            </select>
          </div>

          <!-- Price Net -->
          <div class="form-group full-width">
            <label class="form-label" for="priceNet">Precio Neto del Vehículo (con IVA) *</label>
            <div class="input-currency-wrapper">
              <span class="currency-symbol">$</span>
              <input id="priceNet" type="number" formControlName="priceNet" class="form-control currency-input" placeholder="969,900" step="5000" />
            </div>

            <!-- Quick price suggestion buttons -->
            <div class="quick-amounts-row">
              <span class="quick-title">Montos rápidos:</span>
              <button type="button" class="amount-btn" (click)="setPrice(407900)">$407.9k</button>
              <button type="button" class="amount-btn" (click)="setPrice(520000)">$520k</button>
              <button type="button" class="amount-btn" (click)="setPrice(780000)">$780k</button>
              <button type="button" class="amount-btn" (click)="setPrice(969900)">$969.9k</button>
            </div>
          </div>

          <!-- Hybrid / Electric -->
          <div class="form-group full-width">
            <label class="form-label">¿Es HÍBRIDO O ELÉCTRICO?</label>
            <div class="toggle-group">
              <button type="button" class="toggle-btn" [class.active]="quoteForm.get('isHybridOrElectric')?.value === false" (click)="setHybrid(false)">
                NO (Renta Básica $6,000 + IVA)
              </button>
              <button type="button" class="toggle-btn hybrid-btn" [class.active]="quoteForm.get('isHybridOrElectric')?.value === true" (click)="setHybrid(true)">
                 SÍ (Renta Básica $8,550 + IVA)
              </button>
            </div>
          </div>

          <!-- Term Months -->
          <div class="form-group full-width">
            <label class="form-label">Plazo (Meses)</label>
            <div class="term-grid">
              <button type="button" *ngFor="let t of [12, 24, 36, 48]" class="term-btn" [class.active]="quoteForm.get('termMonths')?.value === t" (click)="setTerm(t)">
                <span class="term-months">{{ t }}</span>
                <span class="term-unit">Meses</span>
              </button>
            </div>  
          </div>

          <!-- Extraordinary Rent % -->
          <div class="form-group full-width">
            <div class="label-with-value">
              <label class="form-label">Renta Extraordinaria (Enganche Deducible)</label>
              <span class="slider-value">{{ (quoteForm.get('extraordinaryRentPct')?.value * 100) | number:'1.0-1' }}%</span>
            </div>
            <input type="range" min="0.10" max="0.50" step="0.01" formControlName="extraordinaryRentPct" class="range-slider" />
            <div class="btn-group-row margin-top-xs">
              <button type="button" *ngFor="let pct of [0.10, 0.15, 0.20, 0.30]" class="chip-btn" [class.active]="quoteForm.get('extraordinaryRentPct')?.value === pct" (click)="setExtraordinaryRent(pct)">
                {{ (pct * 100) }}%
              </button>
            </div>
          </div>

          <!-- Security Deposit -->
          <div class="form-group">
            <label class="form-label">Depósito en Garantía</label>
            <div class="btn-group-row">
              <button type="button" *ngFor="let p of [0, 0.05, 0.10]" class="chip-btn" [class.active]="quoteForm.get('securityDepositPct')?.value === p" (click)="setDeposit(p)">
                {{ (p * 100) }}%
              </button>
            </div>
          </div>

          <!-- Insurance -->
          <div class="form-group">
            <label class="form-label">Seguro de Unidad</label>
            <div class="toggle-group narrow-toggle">
              <button type="button" class="toggle-btn" [class.active]="quoteForm.get('isInsuranceEstimated')?.value === false" (click)="setInsurance(false)">
                Pendiente ($0)
              </button>
              <button type="button" class="toggle-btn" [class.active]="quoteForm.get('isInsuranceEstimated')?.value === true" (click)="setInsurance(true)">
                Est. (3.5%)
              </button>
            </div>
          </div>

        </div>
      </form>
    </div>
  `,
  styles: [`
    .form-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 1.5rem;
      color: #0f172a;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
      box-sizing: border-box;
      overflow: hidden;
      width: 100%;
    }

    .card-header {
      margin-bottom: 1rem;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 0.75rem;
    }

    .card-title {
      font-family: 'Fjalla One', sans-serif;
      font-size: 1.25rem;
      color: #0f172a;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0 0 0.2rem 0;
      letter-spacing: 0.5px;
    }

    .title-icon {
      color: #20b038;
    }

    .card-subtitle {
      font-size: 0.8rem;
      color: #64748b;
    }

    .preset-chips-section {
      margin-bottom: 1.25rem;
      background: #f8fafc;
      padding: 0.6rem 0.85rem;
      border-radius: 10px;
      border: 1px solid #e2e8f0;
    }

    .preset-label {
      font-size: 0.7rem;
      font-weight: 700;
      color: #475569;
      text-transform: uppercase;
      margin-bottom: 0.35rem;
      display: block;
    }

    .preset-cascade-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.6rem;
      margin-top: 0.35rem;
    }

    .preset-select {
      width: 100%;
      box-sizing: border-box;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      padding: 0.6rem 0.85rem;
      font-size: 0.875rem;
      font-weight: 600;
      color: #0f172a;
      cursor: pointer;
      appearance: auto;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .preset-select:focus {
      outline: none;
      border-color: #20b038;
      box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.15);
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.1rem;
      width: 100%;
      box-sizing: border-box;
    }

    .full-width {
      grid-column: span 2;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
      min-width: 0;
      overflow: hidden;
    }

    .form-label {
      font-size: 0.8rem;
      font-weight: 700;
      color: #334155;
    }

    .form-control {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      padding: 0.6rem 0.8rem;
      color: #0f172a;
      font-size: 0.875rem;
      transition: all 0.2s ease;
      width: 100%;
      box-sizing: border-box;
      min-width: 0;
    }

    .form-control:focus {
      outline: none;
      border-color: #20b038;
      box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.15);
    }

    .input-currency-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .currency-symbol {
      position: absolute;
      left: 0.85rem;
      color: #15803d;
      font-weight: 700;
      font-size: 1.1rem;
    }

    .currency-input {
      padding-left: 2rem;
      font-size: 1.15rem;
      font-weight: 700;
      color: #15803d;
      width: 100%;
    }

    .quick-amounts-row {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      margin-top: 0.35rem;
      font-size: 0.7rem;
    }

    .quick-title {
      color: #64748b;
    }

    .amount-btn {
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      color: #334155;
      padding: 0.15rem 0.5rem;
      border-radius: 4px;
      font-size: 0.7rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .amount-btn:hover {
      background: #20b038;
      color: #ffffff;
      border-color: #15803d;
    }

    .warning-text {
      font-size: 0.725rem;
      color: #d97706;
      margin-top: 0.2rem;
    }

    .toggle-group {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.5rem;
      background: #f1f5f9;
      padding: 4px;
      border-radius: 10px;
      width: 100%;
      box-sizing: border-box;
    }

    .narrow-toggle {
      grid-template-columns: 1fr 1fr;
    }

    .toggle-btn {
      background: transparent;
      border: none;
      color: #64748b;
      padding: 0.55rem 0.75rem;
      font-size: 0.775rem;
      font-weight: 600;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .toggle-btn.active {
      background: #ffffff;
      color: #15803d;
      font-weight: 700;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
      border: 1px solid #bbf7d0;
    }

    .term-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0.5rem;
    }

    .term-btn {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      padding: 0.6rem 0.25rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      transition: all 0.2s ease;
      color: #334155;
    }

    .term-btn:hover {
      border-color: #20b038;
      color: #15803d;
    }

    .term-btn.active {
      background: linear-gradient(135deg, #15803d 0%, #20b038 100%);
      border-color: #15803d;
      color: #ffffff;
      box-shadow: 0 4px 12px rgba(32, 176, 56, 0.3);
    }

    .term-months {
      font-family: 'Fjalla One', sans-serif;
      font-size: 1.25rem;
      line-height: 1;
    }

    .term-unit {
      font-size: 0.675rem;
      opacity: 0.9;
      margin-top: 2px;
    }

    .label-with-value {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .slider-value {
      font-size: 0.9rem;
      font-weight: 700;
      color: #15803d;
    }

    .range-slider {
      accent-color: #20b038;
      width: 100%;
      height: 6px;
      background: #e2e8f0;
      border-radius: 3px;
      outline: none;
      cursor: pointer;
    }

    .margin-top-xs {
      margin-top: 0.35rem;
    }

    .btn-group-row {
      display: flex;
      gap: 0.4rem;
    }

    .chip-btn {
      flex: 1;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 0.4rem;
      color: #334155;
      font-size: 0.775rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .chip-btn.active {
      background: #20b038;
      border-color: #15803d;
      color: #ffffff;
    }

    @media (max-width: 768px) {
      .form-grid {
        grid-template-columns: 1fr;
      }
      .full-width {
        grid-column: span 1;
      }
    }
  `]


  export class QuoteFormComponent implements OnInit {

  private fb = inject(FormBuilder);
  private supabaseService = inject(SupabaseService);

    @Output() quoteChange = new EventEmitter<VehicleQuoteInput>();

    public quoteForm!: FormGroup;
    public statePlates: StatePlateOption[] = [];
    public presetVehicles: VehicleCatalogItem[] = [];
    public presetGroups: { brand: string; vehicles: VehicleCatalogItem[] } [] = [];
    public selectedPresetBrand: string = 'HINO';

    get filteredPresetVehicles(): VehicleCatalogItem[] {
  if (!this.selectedPresetBrand) return [];
  return this.presetVehicles.filter(v => v.brand === this.selectedPresetBrand);
}

    public async ngOnInit(): Promise < void> {
  this.statePlates = await this.supabaseService.getStatePlates();
  this.presetVehicles = await this.supabaseService.getVehicleCatalog();

  const brandMap = new Map<string, VehicleCatalogItem[]>();
  for(const v of this.presetVehicles) {
  if (!brandMap.has(v.brand)) brandMap.set(v.brand, []);
  brandMap.get(v.brand)!.push(v);
}
this.presetGroups = Array.from(brandMap.entries()).map(([brand, vehicles]) => ({ brand, vehicles }));

this.quoteForm = this.fb.group({
  clientName: [''],
  brand: ['HINO', Validators.required],
  model: ['616 LONG', Validators.required],
  year: [2026, [Validators.required, Validators.min(2015)]],
  priceNet: [407900, [Validators.required, Validators.min(10000)]],
  isHybridOrElectric: [false],
  termMonths: [48, Validators.required],
  extraordinaryRentPct: [0.10, [Validators.required, Validators.min(0.10)]],
  securityDepositPct: [0.0],
  selectedStatePlateId: ['pendiente'],
  isInsuranceEstimated: [false],
});

this.quoteForm.valueChanges.subscribe((val) => {
  if (this.quoteForm.valid) {
    this.emitQuoteInput();
  }
});

this.emitQuoteInput();
    }

    get isPreOwned(): boolean {
  const y = this.quoteForm.get('year')?.value;
  return y ? y < 2024 : false;
}

    public applyPresetVehicle(v: VehicleCatalogItem): void {
  this.quoteForm.patchValue({
    brand: v.brand,
    model: v.model,
    year: v.year,
    priceNet: v.suggestedPriceNet,
    isHybridOrElectric: v.isHybridOrElectric,
  });
}

    public onBrandSelectChange(event: Event): void {
  this.selectedPresetBrand = (event.target as HTMLSelectElement).value;
}

    public onPresetSelectChange(event: Event): void {
  const id = (event.target as HTMLSelectElement).value;
  if(!id) return;
  const vehicle = this.presetVehicles.find(v => v.id === id);
  if(vehicle) this.applyPresetVehicle(vehicle);
      (event.target as HTMLSelectElement).value = '';
    }

    public setPrice(price: number): void {
  this.quoteForm.patchValue({ priceNet: price });
}

    public setHybrid(isHybrid: boolean): void {
  this.quoteForm.patchValue({ isHybridOrElectric: isHybrid });
}

    public setTerm(months: number): void {
  this.quoteForm.patchValue({ termMonths: months });
}

    public setExtraordinaryRent(pct: number): void {
  this.quoteForm.patchValue({ extraordinaryRentPct: pct });
}

    public setDeposit(depositPct: number): void {
  this.quoteForm.patchValue({ securityDepositPct: depositPct });
}

    public setInsurance(isEstimated: boolean): void {
  this.quoteForm.patchValue({ isInsuranceEstimated: isEstimated });
}

    private emitQuoteInput(): void {
  const raw = this.quoteForm.value;
  const input: VehicleQuoteInput = {
    clientName: raw.clientName,
    brand: raw.brand,
    model: raw.model,
    year: Number(raw.year),
    priceNet: Number(raw.priceNet),
    isHybridOrElectric: Boolean(raw.isHybridOrElectric),
    termMonths: Number(raw.termMonths) as any,
    extraordinaryRentPct: Number(raw.extraordinaryRentPct),
    securityDepositPct: Number(raw.securityDepositPct),
    selectedStatePlateId: raw.selectedStatePlateId,
    isInsuranceEstimated: Boolean(raw.isInsuranceEstimated),
  };

  this.quoteChange.emit(input);
}
  }