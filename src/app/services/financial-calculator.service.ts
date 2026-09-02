import { Injectable, Optional } from '@angular/core';
import {
  VehicleQuoteInput,
  LeasingOptionResult,
  QuoteCalculationResult,
  STATE_PLATES_CATALOG,
  TERM_RATES_MATRIX,
  InitialCostsBreakdown,
  MonthlyCostsBreakdown,
  ResidualValueBreakdown,
  isExtraordinaryRentAndResidualValid,
  CalculatorConfig,
  DEFAULT_CALCULATOR_CONFIG,
} from '../models/leasing.model';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class FinancialCalculatorService {
  constructor(@Optional() private readonly supabase: SupabaseService | null = null) {}
  /**
   * Calculates PMT (Periodic Payment) matching Excel's PMT(rate, nper, pv, fv, type)
   * Formula:
   * pv * (1 + rate)^nper + PMT * [((1 + rate)^nper - 1) / rate] + fv = 0
   * PMT = - [pv * (1 + rate)^nper + fv] / [((1 + rate)^nper - 1) / rate]
   */
  public calculatePMT(
    rate: number,
    nper: number,
    pv: number,
    fv: number = 0,
    type: number = 0
  ): number {
    if (rate === 0) {
      return -(pv + fv) / nper;
    }

    const pvif = Math.pow(1 + rate, nper);
    let pmt = (-pv * pvif - fv) / ((pvif - 1) / rate);

    if (type === 1) {
      pmt /= 1 + rate;
    }

    return pmt;
  }

  public calculateQuote(input: VehicleQuoteInput): QuoteCalculationResult {
    const config = this.supabase?.getCalculatorConfig() ?? DEFAULT_CALCULATOR_CONFIG;
    const termConfig = config.termRates[input.termMonths] || config.termRates[48] || TERM_RATES_MATRIX[48];
    const selectedPlate =
      STATE_PLATES_CATALOG.find((p) => p.id === input.selectedStatePlateId) ||
      STATE_PLATES_CATALOG[STATE_PLATES_CATALOG.length - 1]; // Default to 'pendiente'

    const option1 = this.calculateOption(
      'OPCION_1',
      'OPCIÓN 1',
      termConfig.option1Rate,
      config.residualOption1Pct,
      input,
      selectedPlate.costNet
    );

    const option2 = this.calculateOption(
      'OPCION_2',
      'OPCIÓN 2',
      termConfig.option2Rate,
      config.residualOption2Pct,
      input,
      selectedPlate.costNet
    );

    const option3 = this.calculateOption(
      'OPCION_3',
      'OPCIÓN 3',
      termConfig.option3Rate,
      config.residualOption3Pct,
      input,
      selectedPlate.costNet
    );

    return {
      input,
      options: {
        option1,
        option2,
        option3,
      },
      generatedAt: new Date(),
    };
  }

  private calculateOption(
    optionKey: 'OPCION_1' | 'OPCION_2' | 'OPCION_3',
    optionName: string,
    annualRate: number,
    residualPct: number,
    input: VehicleQuoteInput,
    plateCostNet: number
  ): LeasingOptionResult {
    const config = this.supabase?.getCalculatorConfig() ?? DEFAULT_CALCULATOR_CONFIG;
    const priceNoIva = input.priceNet / (1 + config.ivaPct);

    // 1. Validar renta extraordinaria contra reglas de negocio
    const minimumRentPct = this.getMinimumRentPct(input.priceNet, config);
    const userRentPct = input.extraordinaryRentPct || 0.10;

    // Aplicar validación: nunca permitir menos que el mínimo requerido
    let extraordinaryRentPct = Math.max(minimumRentPct, userRentPct);

    // Validar que renta + residual no superen 75%
    if (!isExtraordinaryRentAndResidualValid(extraordinaryRentPct, residualPct, config.maxRentAndResidualPct)) {
      // Si excede, reducir renta al máximo permitido para esta opción
      extraordinaryRentPct = config.maxRentAndResidualPct - residualPct;
    }

    const extraordinaryRentNoIva = priceNoIva * extraordinaryRentPct;

    const adminFeeInitialNet = input.customAdminFeeInitial ?? config.adminFeeInitialNet;
    const advisoryFeeNoIva = priceNoIva * config.advisoryFeePct;
    const plateRegistrationNoIva = plateCostNet / (1 + config.ivaPct);
    const insuranceNoIva = input.isInsuranceEstimated ? input.priceNet * config.insurancePct : 0;

    const subtotalNoIva =
      extraordinaryRentNoIva +
      adminFeeInitialNet +
      advisoryFeeNoIva +
      plateRegistrationNoIva +
      insuranceNoIva;

    const ivaAmount = subtotalNoIva * config.ivaPct;
    const securityDepositAmount = input.priceNet * (input.securityDepositPct || 0);
    const totalInitialPayment = subtotalNoIva + ivaAmount + securityDepositAmount;

    const initialCosts: InitialCostsBreakdown = {
      extraordinaryRentNoIva,
      extraordinaryRentPct,
      adminFeeInitialNet,
      advisoryFeeNoIva,
      plateRegistrationNoIva,
      insuranceNoIva,
      subtotalNoIva,
      ivaAmount,
      securityDepositAmount,
      totalInitialPayment,
    };

    // 2. Amount to Finance (No IVA)
    const amountToFinanceNoIva = priceNoIva - extraordinaryRentNoIva - securityDepositAmount;

    // 3. Residual Value Breakdown
    const vrNet = input.priceNet * residualPct;
    const vrNoIva = vrNet / (1 + config.ivaPct);
    const residualValue: ResidualValueBreakdown = {
      percentage: residualPct,
      valueNet: vrNet,
      valueNoIva: vrNoIva,
    };

    // 4. Monthly Rent (PMT)
    const monthlyRate = annualRate / 12;
    // Excel PMT: PMT(rate/12, nper, -pv, fv_no_iva)
    const totalMonthlyRentNet = this.calculatePMT(
      monthlyRate,
      input.termMonths,
      -amountToFinanceNoIva,
      vrNoIva
    );

    // 5. Monthly Breakdown
    const totalMonthlyRentNoIva = totalMonthlyRentNet / (1 + config.ivaPct);
    const basicRentNoIva = input.isHybridOrElectric ? config.basicRentHybrid : config.basicRentStandard;
    const remainderNoIva = totalMonthlyRentNoIva - basicRentNoIva;
    const fleetManagementFeeNoIva = remainderNoIva * config.fleetManagementPct;
    const adminManagementFeeNoIva = remainderNoIva * config.adminManagementPct;
    const monthlySubtotalNoIva = basicRentNoIva + fleetManagementFeeNoIva + adminManagementFeeNoIva;
    const monthlyIva = monthlySubtotalNoIva * config.ivaPct;

    const monthlyCosts: MonthlyCostsBreakdown = {
      basicRentNoIva,
      fleetManagementFeeNoIva,
      adminManagementFeeNoIva,
      subtotalNoIva: monthlySubtotalNoIva,
      ivaAmount: monthlyIva,
      totalMonthlyRentNet,
    };

    return {
      optionKey,
      optionName,
      annualRatePct: annualRate,
      residualValue,
      amountToFinanceNoIva,
      initialCosts,
      monthlyCosts,
    };
  }

  private getMinimumRentPct(priceNet: number, config: CalculatorConfig): number {
    if (priceNet < config.minimumRentThreshold1) return config.minimumRentPct1;
    if (priceNet < config.minimumRentThreshold2) return config.minimumRentPct2;
    return config.minimumRentPct3;
  }
}
