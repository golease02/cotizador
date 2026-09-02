import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../../services/supabase.service';
import { ToastService } from '../../../services/toast.service';
import { CalculatorConfig, DEFAULT_CALCULATOR_CONFIG } from '../../../models/leasing.model';

@Component({
  selector: 'app-admin-parameters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-parameters.html',
  styleUrls: ['./admin-parameters.css']
})
export class AdminParametersComponent implements OnInit {
  private readonly supabase = inject(SupabaseService);
  readonly toast = inject(ToastService);
  config: CalculatorConfig = structuredClone(DEFAULT_CALCULATOR_CONFIG);
  loading = true;
  saving = false;
  error = '';
  readonly terms = [12, 24, 36, 48];

  async ngOnInit(): Promise<void> {
    this.config = structuredClone(this.supabase.getCalculatorConfig());
    this.loading = false;

    this.supabase.loadCalculatorConfig()
      .then(() => {
        this.config = structuredClone(this.supabase.getCalculatorConfig());
      })
      .catch(loadError => {
        console.warn('No se pudo sincronizar la configuración del cotizador:', loadError);
      });
  }

  percent(value: number): number { return value * 100; }
  setPercent(target: keyof CalculatorConfig, value: number): void {
    (this.config as any)[target] = Number(value) / 100;
  }

  async save(): Promise<void> {
    this.error = '';
    const validation = this.validate();
    if (validation) { this.error = validation; return; }
    this.saving = true;
    const { error } = await this.supabase.updateCalculatorConfig(this.config);
    this.saving = false;
    if (error) this.error = error.message;
    else this.toast.success('Parámetros guardados. Las nuevas cotizaciones usarán estos valores.');
  }

  reset(): void { this.config = structuredClone(DEFAULT_CALCULATOR_CONFIG); }

  private validate(): string {
    const c = this.config;
    const percentages = [c.ivaPct, c.advisoryFeePct, c.insurancePct, c.maxRentAndResidualPct, c.minimumRentPct1, c.minimumRentPct2, c.minimumRentPct3, c.fleetManagementPct, c.adminManagementPct, c.residualOption1Pct, c.residualOption2Pct, c.residualOption3Pct];
    if (percentages.some(value => !Number.isFinite(value) || value < 0 || value > 1)) return 'Los porcentajes deben estar entre 0% y 100%.';
    if (c.minimumRentThreshold1 <= 0 || c.minimumRentThreshold2 <= c.minimumRentThreshold1) return 'Los límites de precio deben ser positivos y estar en orden ascendente.';
    if (c.adminFeeInitialNet < 0 || c.basicRentStandard < 0 || c.basicRentHybrid < 0) return 'Los importes no pueden ser negativos.';
    if (Math.abs(c.fleetManagementPct + c.adminManagementPct - 1) > 0.000001) return 'La distribución mensual debe sumar 100%.';
    if (Math.max(c.residualOption1Pct, c.residualOption2Pct, c.residualOption3Pct) > c.maxRentAndResidualPct) return 'Los residuales no pueden superar el máximo permitido.';
    for (const term of this.terms) {
      const rates = c.termRates[term];
      if (!rates || [rates.option1Rate, rates.option2Rate, rates.option3Rate].some(value => !Number.isFinite(value) || value < 0 || value > 2)) return `La tasa del plazo ${term} meses no es válida.`;
    }
    return '';
  }
}