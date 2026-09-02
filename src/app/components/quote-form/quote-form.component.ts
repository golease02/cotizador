import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  VehicleQuoteInput,
  StatePlateOption,
  CalculatorConfig,
} from '../../models/leasing.model';
import { SupabaseService, VehicleCatalogItem } from '../../services/supabase.service';

@Component({
  selector: 'app-quote-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './quote-form.component.html',
  styleUrls: ['./quote-form.component.css']
})
export class QuoteFormComponent implements OnInit {

  private fb = inject(FormBuilder);
  private supabaseService = inject(SupabaseService);

  @Output() quoteChange = new EventEmitter<VehicleQuoteInput>();

  public quoteForm!: FormGroup;
  public statePlates: StatePlateOption[] = [];
  public presetVehicles: VehicleCatalogItem[] = [];
  public presetGroups: { brand: string; vehicles: VehicleCatalogItem[] }[] = [];
  public selectedPresetBrand: string = '';

  get filteredPresetVehicles(): VehicleCatalogItem[] {
    if (!this.selectedPresetBrand) {
      return this.presetVehicles;
    }
    return this.presetVehicles.filter(v => v.brand === this.selectedPresetBrand);
  }

  async ngOnInit(): Promise<void> {
    this.quoteForm = this.fb.group({
      clientName: [''],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: [2026, [Validators.required, Validators.min(2015)]],
      priceNet: [null, [Validators.required, Validators.min(10000)]],
      isHybridOrElectric: [false],
      termMonths: [48, Validators.required],
      extraordinaryRentPct: [0.10, [Validators.required, Validators.min(0.10)]],
      securityDepositPct: [0.0],
      selectedStatePlateId: ['pendiente'],
      isInsuranceEstimated: [false],
    });

    await Promise.all([
      this.supabaseService.loadStatePlates(),
      this.supabaseService.loadCalculatorConfig(),
    ]);
    // Solo mostrar placas disponibles (las "no disponibles" no aparecen en el cotizador)
    this.statePlates = this.supabaseService.getStatePlates().filter(p => p.disponible !== false);
    this.presetVehicles = await this.supabaseService.getVehicleCatalog();

    const brandMap = new Map<string, VehicleCatalogItem[]>();
    for (const v of this.presetVehicles) {
      if (!brandMap.has(v.brand)) brandMap.set(v.brand, []);
      brandMap.get(v.brand)!.push(v);
    }
    this.presetGroups = Array.from(brandMap.entries()).map(([brand, vehicles]) => ({ brand, vehicles }));

    this.quoteForm.valueChanges.subscribe(() => {
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

  get vehiclePrice(): number {
    return Number(this.quoteForm?.get('priceNet')?.value) || 0;
  }

  get calculatorConfig(): CalculatorConfig {
    return this.supabaseService.getCalculatorConfig();
  }

  get minimumExtraordinaryRentPct(): number {
    const config = this.calculatorConfig;
    if (this.vehiclePrice < config.minimumRentThreshold1) return config.minimumRentPct1;
    if (this.vehiclePrice < config.minimumRentThreshold2) return config.minimumRentPct2;
    return config.minimumRentPct3;
  }

  get maximumExtraordinaryRentPct(): number {
    const config = this.calculatorConfig;
    // La opción 1 tiene el residual más alto y define el máximo común del formulario.
    return config.maxRentAndResidualPct - config.residualOption1Pct;
  }

  get extraordinaryRentPct(): number {
    return Number(this.quoteForm?.get('extraordinaryRentPct')?.value) || 0;
  }

  get hasExtraordinaryRentAdjustment(): boolean {
    return this.extraordinaryRentPct < this.minimumExtraordinaryRentPct
      || this.extraordinaryRentPct > this.maximumExtraordinaryRentPct;
  }

  get extraordinaryRentAdjustmentMessage(): string {
    if (this.extraordinaryRentPct < this.minimumExtraordinaryRentPct) {
      return `La renta se ajustará a ${this.minimumExtraordinaryRentPct * 100}% (mínimo para este precio).`;
    }

    return `La renta se ajustará a ${this.maximumExtraordinaryRentPct * 100}% (máximo: renta + valor residual no puede superar 75%).`;
  }

  public applyPresetVehicle(v: VehicleCatalogItem): void {
    const price = Number(v.suggestedPriceNet) || 0;
    this.quoteForm.patchValue({
      brand: v.brand,
      model: v.model,
      year: v.year,
      priceNet: price,
      isHybridOrElectric: v.isHybridOrElectric,
    });
    this.quoteForm.updateValueAndValidity();
    this.emitQuoteInput();
  }

  public onBrandSelectChange(event: Event): void {
    this.selectedPresetBrand = (event.target as HTMLSelectElement).value;
  }

  public onPresetSelectChange(event: Event): void {
    const id = (event.target as HTMLSelectElement).value;
    if (!id) return;
    const vehicle = this.presetVehicles.find(v => v.id === id);
    if (vehicle) this.applyPresetVehicle(vehicle);
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
    const boundedPct = Math.min(
      this.maximumExtraordinaryRentPct,
      Math.max(this.minimumExtraordinaryRentPct, pct)
    );
    this.quoteForm.patchValue({ extraordinaryRentPct: boundedPct });
  }

  public setDeposit(depositPct: number): void {
    this.quoteForm.patchValue({ securityDepositPct: depositPct });
  }

  public setInsurance(isEstimated: boolean): void {
    this.quoteForm.patchValue({ isInsuranceEstimated: isEstimated });
  }

  private emitQuoteInput(): void {
    const raw = this.quoteForm.value;
    const priceNet = Number(raw.priceNet) || 0;
    const input: VehicleQuoteInput = {
      clientName: raw.clientName || '',
      brand: raw.brand || '',
      model: raw.model || '',
      year: Number(raw.year) || 2026,
      priceNet: priceNet,
      isHybridOrElectric: Boolean(raw.isHybridOrElectric),
      termMonths: Number(raw.termMonths) as any || 48,
      extraordinaryRentPct: Number(raw.extraordinaryRentPct) || 0.1,
      securityDepositPct: Number(raw.securityDepositPct) || 0,
      selectedStatePlateId: raw.selectedStatePlateId || 'pendiente',
      isInsuranceEstimated: Boolean(raw.isInsuranceEstimated),
    };
    this.quoteChange.emit(input);
  }
}
