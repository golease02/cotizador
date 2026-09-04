import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CatalogService } from '../../../services/catalog.service';
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
  private readonly catalog = inject(CatalogService);
  readonly toast = inject(ToastService);
  config: CalculatorConfig = structuredClone(DEFAULT_CALCULATOR_CONFIG);
  private savedSnapshot = '';
  loading = true;
  saving = false;
  error = '';
  readonly terms = [12, 24, 36, 48];
  activeSection = 'todos';
  showResetModal = false;

  async ngOnInit(): Promise<void> {
    this.config = structuredClone(this.catalog.getCalculatorConfig());
    this.savedSnapshot = JSON.stringify(this.config);
    this.loading = false;

    this.catalog.loadCalculatorConfig()
      .then(() => {
        this.config = structuredClone(this.catalog.getCalculatorConfig());
        this.savedSnapshot = JSON.stringify(this.config);
      })
      .catch(loadError => {
        console.warn('No se pudo sincronizar la configuración del cotizador:', loadError);
      });
  }

  // ===== MENÚ DE SECCIONES (mismo estilo que admin-sellers / admin-admins) =====
  setSection(id: string): void {
    this.activeSection = id;
  }

  isVisible(id: string): boolean {
    return this.activeSection === 'todos' || this.activeSection === id;
  }

  termTone(term: number): string {
    const tones: Record<number, string> = { 12: 'blue', 24: 'green', 36: 'amber', 48: 'slate' };
    return tones[term] ?? 'slate';
  }

  // ===== ESTADO DE CAMBIOS SIN GUARDAR =====
  get isDirty(): boolean {
    return JSON.stringify(this.config) !== this.savedSnapshot;
  }

  // ===== CONVERSIONES Y FORMATO =====
  percent(value: number): number { return value * 100; }

  setPercent(target: keyof CalculatorConfig, value: number): void {
    (this.config as any)[target] = Number(value) / 100;
  }

  formatMoney(value: number): string {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 2 }).format(value || 0);
  }

  get distributionSum(): number {
    return Math.round((this.percent(this.config.fleetManagementPct) + this.percent(this.config.adminManagementPct)) * 100) / 100;
  }

  get residualRows(): { n: number; value: number }[] {
    return [
      { n: 1, value: this.config.residualOption1Pct },
      { n: 2, value: this.config.residualOption2Pct },
      { n: 3, value: this.config.residualOption3Pct }
    ];
  }

  // ===== GUARDADO =====
  async save(): Promise<void> {
    this.error = '';
    const validation = this.validate();
    if (validation) {
      this.error = validation;
      this.toast.error(validation);
      return;
    }
    this.saving = true;
    const { error } = await this.catalog.updateCalculatorConfig(this.config);
    this.saving = false;
    if (error) {
      this.error = error.message;
      this.toast.error('No se pudieron guardar los parámetros: ' + error.message);
    } else {
      this.savedSnapshot = JSON.stringify(this.config);
      this.toast.success('Parámetros guardados. Las nuevas cotizaciones usarán estos valores.');
    }
  }

  // ===== RESTAURAR VALORES INICIALES =====
  askReset(): void {
    this.showResetModal = true;
  }

  closeResetModal(): void {
    this.showResetModal = false;
  }

  confirmReset(): void {
    const previous = structuredClone(this.config);
    this.config = structuredClone(DEFAULT_CALCULATOR_CONFIG);
    this.showResetModal = false;
    this.toast.undo('Valores restaurados a los iniciales (aún sin guardar).', () => {
      this.config = previous;
    });
  }

  // ===== TOASTS (mismo manejo que admin-admins) =====
  handleToast(t: any): void {
    if (t.action) t.action();
    this.toast.dismiss(t.id);
  }

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