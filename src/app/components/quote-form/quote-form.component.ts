import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { VehicleQuoteInput, StatePlateOption, CalculatorConfig } from '../../models/leasing.model';
import { CatalogService } from '../../services/catalog.service';
import { QuoteDraftService } from '../../services/quote-draft.service';
import { formatPrice } from './price-format';

@Component({
  selector: 'app-quote-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './quote-form.component.html',
  styleUrls: ['./quote-form.component.css'],
})
export class QuoteFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private catalog = inject(CatalogService);
  private draftService = inject(QuoteDraftService);

  @Output() quoteChange = new EventEmitter<VehicleQuoteInput>();
  @Input() initialInput: VehicleQuoteInput | null = null;

  public quoteForm!: FormGroup;
  public statePlates: StatePlateOption[] = [];

  async ngOnInit(): Promise<void> {
    this.quoteForm = this.fb.group({
      clientName: [''],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: [2026, [Validators.required, Validators.min(2015)]],
      priceNet: [null, [Validators.required, Validators.min(10000)]],
      isHybridOrElectric: [false],
      termMonths: [48, Validators.required],
      extraordinaryRentPct: [0.1, [Validators.required, Validators.min(0.1)]],
      securityDepositPct: [0.0],
      selectedStatePlateId: ['pendiente'],
      isInsuranceEstimated: [false],
    });

    await Promise.all([this.catalog.loadStatePlates(), this.catalog.loadCalculatorConfig()]);
    this.statePlates = this.catalog.getStatePlates().filter((p) => p.disponible !== false);

    this.quoteForm.valueChanges.subscribe(() => {
      if (this.quoteForm.valid) {
        this.emitQuoteInput();
      }
    });

    this.emitQuoteInput();
    this.applyInitialInput();
  }

  /**
   * Precarga los datos de una cotización existente ("Duplicar" / "Editar").
   * Se invoca al iniciar, cuando el padre entrega [initialInput].
   */
  private applyInitialInput(): void {
    if (!this.initialInput) return;

    const input = this.initialInput;
    this.quoteForm.patchValue({
      clientName: input.clientName || '',
      brand: input.brand || '',
      model: input.model || '',
      year: input.year,
      priceNet: input.priceNet,
      isHybridOrElectric: input.isHybridOrElectric,
      termMonths: input.termMonths,
      extraordinaryRentPct: input.extraordinaryRentPct,
      securityDepositPct: input.securityDepositPct || 0,
      selectedStatePlateId: input.selectedStatePlateId || 'pendiente',
      isInsuranceEstimated: input.isInsuranceEstimated,
    });
    this.quoteForm.updateValueAndValidity();
    this.emitQuoteInput();
    // El borrador ya se consumió: la próxima visita al cotizador arranca en limpio.
    this.draftService.clear();
  }

  get isPreOwned(): boolean {
    const y = this.quoteForm.get('year')?.value;
    return y ? y < 2024 : false;
  }

  get vehiclePrice(): number {
    return Number(this.quoteForm?.get('priceNet')?.value) || 0;
  }

  get priceNetDisplay(): string {
    const v = this.quoteForm?.get('priceNet')?.value;
    if (v === null || v === undefined || v === '') {
      return '';
    }
    return formatPrice(String(v));
  }

  get calculatorConfig(): CalculatorConfig {
    return this.catalog.getCalculatorConfig();
  }

  get minimumExtraordinaryRentPct(): number {
    // Mínimo fijo: ya no se indexa por precio del vehículo (libre a partir de 10%).
    return 0.1;
  }

  get maximumExtraordinaryRentPct(): number {
    // Techo absoluto de la renta extraordinaria (enganche deducible): 50%.
    // La regla de negocio "renta + VR ≤ 75%" sigue aplicándose por opción en el
    // motor de cálculo; por eso la Opción 1 (VR 35%) se ajusta a 40% en pantalla.
    return 0.5;
  }

  get extraordinaryRentPct(): number {
    return Number(this.quoteForm?.get('extraordinaryRentPct')?.value) || 0;
  }

  get hasExtraordinaryRentAdjustment(): boolean {
    return (
      this.extraordinaryRentPct < this.minimumExtraordinaryRentPct ||
      this.extraordinaryRentPct > this.maximumExtraordinaryRentPct
    );
  }

  get extraordinaryRentAdjustmentMessage(): string {
    if (this.extraordinaryRentPct > this.maximumExtraordinaryRentPct) {
      return `La renta se ajustará a ${this.maximumExtraordinaryRentPct * 100}% (máximo permitido).`;
    }
    return `La renta se ajustará al 50% (máximo: renta + valor residual no puede superar 75%).`;
  }

  public onPriceNetInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const cleaned = input.value.replace(/[^\d.,]/g, '');
    const commaIdx = cleaned.lastIndexOf(',');
    let intText = cleaned.replace(/[.,]/g, '');
    let decText = '';
    let hasComma = false;
    if (commaIdx !== -1) {
      hasComma = true;
      intText = cleaned.slice(0, commaIdx).replace(/[.,]/g, '');
      decText = cleaned.slice(commaIdx + 1).replace(/\D/g, '');
    }
    const groupedInt = intText.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const display = groupedInt + (hasComma ? ',' + decText : '');
    if (input.value !== display) {
      input.value = display;
    }
    let value: number | null = null;
    if (intText || decText) {
      value = Number(decText ? `${intText || '0'}.${decText}` : intText);
    }
    const current = this.quoteForm.get('priceNet')?.value;
    if (current !== value) {
      this.quoteForm.patchValue({ priceNet: value });
    }
  }

  public setHybrid(isHybrid: boolean): void {
    this.quoteForm.patchValue({ isHybridOrElectric: isHybrid });
  }

  public setInsurance(isEstimated: boolean): void {
    this.quoteForm.patchValue({ isInsuranceEstimated: isEstimated });
  }

  public setTerm(months: number): void {
    this.quoteForm.patchValue({ termMonths: months });
  }

  public setExtraordinaryRent(pct: number): void {
    const boundedPct = Math.min(
      this.maximumExtraordinaryRentPct,
      Math.max(this.minimumExtraordinaryRentPct, pct),
    );
    this.quoteForm.patchValue({ extraordinaryRentPct: boundedPct });
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
      termMonths: (Number(raw.termMonths) as any) || 48,
      extraordinaryRentPct: Number(raw.extraordinaryRentPct) || 0.1,
      securityDepositPct: Number(raw.securityDepositPct) || 0,
      selectedStatePlateId: raw.selectedStatePlateId || 'pendiente',
      isInsuranceEstimated: Boolean(raw.isInsuranceEstimated),
    };
    this.quoteChange.emit(input);
  }
}
