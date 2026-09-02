import { Injectable } from '@angular/core';
import {
  VehicleQuoteInput,
  LeasingOptionResult,
  QuoteCalculationResult,
  STATE_PLATES_CATALOG,
  TERM_RATES_MATRIX,
  InitialCostsBreakdown,
  MonthlyCostsBreakdown,
  ResidualValueBreakdown,
  getMinimumExtraordinaryRentPct,
  isExtraordinaryRentAndResidualValid,
} from '../models/leasing.model';

@Injectable({
  providedIn: 'root',
})
export class FinancialCalculatorService {
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
    const termConfig = TERM_RATES_MATRIX[input.termMonths] || TERM_RATES_MATRIX[48];
    const selectedPlate =
      STATE_PLATES_CATALOG.find((p) => p.id === input.selectedStatePlateId) ||
      STATE_PLATES_CATALOG[STATE_PLATES_CATALOG.length - 1]; // Default to 'pendiente'

    const option1 = this.calculateOption(
      'OPCION_1',
      'OPCIÓN 1',
      termConfig.option1Rate,
      0.35,
      input,
      selectedPlate.costNet
    );

    const option2 = this.calculateOption(
      'OPCION_2',
      'OPCIÓN 2',
      termConfig.option2Rate,
      0.20,
      input,
      selectedPlate.costNet
    );

    const option3 = this.calculateOption(
      'OPCION_3',
      'OPCIÓN 3',
      termConfig.option3Rate,
      0.05,
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
    const priceNoIva = input.priceNet / 1.16;

    // 1. Validar renta extraordinaria contra reglas de negocio
    const minimumRentPct = getMinimumExtraordinaryRentPct(input.priceNet);
    const userRentPct = input.extraordinaryRentPct || 0.10;

    // Aplicar validación: nunca permitir menos que el mínimo requerido
    let extraordinaryRentPct = Math.max(minimumRentPct, userRentPct);

    // Validar que renta + residual no superen 75%
    if (!isExtraordinaryRentAndResidualValid(extraordinaryRentPct, residualPct)) {
      // Si excede, reducir renta al máximo permitido para esta opción
      extraordinaryRentPct = 0.75 - residualPct;
    }

    const extraordinaryRentNoIva = priceNoIva * extraordinaryRentPct;

    const adminFeeInitialNet = input.customAdminFeeInitial ?? (2565 * 1.3); // $3,334.50
    const advisoryFeeNoIva = priceNoIva * 0.02; // 2% Advisory & management
    const plateRegistrationNoIva = plateCostNet / 1.16;
    const insuranceNoIva = input.isInsuranceEstimated ? input.priceNet * 0.035 : 0;

    const subtotalNoIva =
      extraordinaryRentNoIva +
      adminFeeInitialNet +
      advisoryFeeNoIva +
      plateRegistrationNoIva +
      insuranceNoIva;

    const ivaAmount = subtotalNoIva * 0.16;
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
    const vrNoIva = vrNet / 1.16;
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
    const totalMonthlyRentNoIva = totalMonthlyRentNet / 1.16;
    const basicRentNoIva = input.isHybridOrElectric ? 8550 : 6000;
    const remainderNoIva = totalMonthlyRentNoIva - basicRentNoIva;
    const fleetManagementFeeNoIva = remainderNoIva * 0.60;
    const adminManagementFeeNoIva = remainderNoIva * 0.40;
    const monthlySubtotalNoIva = basicRentNoIva + fleetManagementFeeNoIva + adminManagementFeeNoIva;
    const monthlyIva = monthlySubtotalNoIva * 0.16;

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
}
