import { FinancialCalculatorService } from './financial-calculator.service';
import { VehicleQuoteInput, STATE_PLATES_CATALOG, DEFAULT_CALCULATOR_CONFIG } from '../models/leasing.model';
import { getMinimumExtraordinaryRentPct, isExtraordinaryRentAndResidualValid } from '../models/leasing.model';

describe('FinancialCalculatorService', () => {
  let service: FinancialCalculatorService;

  beforeEach(() => {
    const catalogStub = {
      getCalculatorConfig: () => DEFAULT_CALCULATOR_CONFIG,
      getStatePlates: () => [...STATE_PLATES_CATALOG],
    } as any;
    service = new FinancialCalculatorService(catalogStub);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should accurately calculate PMT matching Excel PMT function', () => {
    // Excel: PMT(0.405 / 12, 48, -316474.137931, 123073.275862) -> 12346.2207
    const rate = 0.405 / 12;
    const nper = 48;
    const pv = -316474.1379310345;
    const fv = 123073.27586206897;

    const pmt = service.calculatePMT(rate, nper, pv, fv);
    expect(pmt).toBeCloseTo(12346.22, 2);
  });

  it('should compute exact quotation matching Excel sample dataset', () => {
    const input: VehicleQuoteInput = {
      brand: 'HINO',
      model: '616 LONG',
      year: 2026,
      priceNet: 407900,
      isHybridOrElectric: false,
      termMonths: 48,
      extraordinaryRentPct: 0.10,
      securityDepositPct: 0.0,
      selectedStatePlateId: 'pendiente', // $0 net
      isInsuranceEstimated: false, // $0 estimated in sheet row 18
      customAdminFeeInitial: 3334.50,
    };

    const result = service.calculateQuote(input);

    // Initial payment checks
    const opt1 = result.options.option1;
    expect(opt1.initialCosts.extraordinaryRentNoIva).toBeCloseTo(35163.79, 2);
    expect(opt1.initialCosts.advisoryFeeNoIva).toBeCloseTo(7032.76, 2);
    expect(opt1.initialCosts.adminFeeInitialNet).toBeCloseTo(3334.50, 2);
    expect(opt1.initialCosts.subtotalNoIva).toBeCloseTo(45531.05, 2);
    expect(opt1.initialCosts.ivaAmount).toBeCloseTo(7284.97, 2);
    expect(opt1.initialCosts.totalInitialPayment).toBeCloseTo(52816.02, 2);

    // Monthly Rent checks
    // Option 1 (VR 35%, Tasa 40.5%)
    expect(result.options.option1.residualValue.valueNet).toBeCloseTo(142765.0, 2);
    expect(result.options.option1.monthlyCosts.totalMonthlyRentNet).toBeCloseTo(12346.22, 2);
    expect(result.options.option1.monthlyCosts.basicRentNoIva).toBe(6000);
    expect(result.options.option1.monthlyCosts.fleetManagementFeeNoIva).toBeCloseTo(2785.98, 2);
    expect(result.options.option1.monthlyCosts.adminManagementFeeNoIva).toBeCloseTo(1857.32, 2);
    expect(result.options.option1.monthlyCosts.subtotalNoIva).toBeCloseTo(10643.29, 2);
    expect(result.options.option1.monthlyCosts.ivaAmount).toBeCloseTo(1702.93, 2);

    // Option 2 (VR 20%, Tasa 42.0%)
    expect(result.options.option2.residualValue.valueNet).toBeCloseTo(81580.0, 2);
    expect(result.options.option2.monthlyCosts.totalMonthlyRentNet).toBeCloseTo(13121.20, 2);

    // Option 3 (VR 5%, Tasa 43.5%)
    expect(result.options.option3.residualValue.valueNet).toBeCloseTo(20395.0, 2);
    expect(result.options.option3.monthlyCosts.totalMonthlyRentNet).toBeCloseTo(13866.86, 2);
  });

  it('should compute exact quotation matching PDF VW Crafter example', () => {
    // Data from actual PDF: VW Crafter Cargo Van 4.7, $1,288,000
    // NOTE: El mínimo de renta extraordinaria ahora es fijo 10% (ya no depende del precio).
    const input: VehicleQuoteInput = {
      brand: 'VW',
      model: 'Crafter Cargo Van 4.7',
      year: 2026,
      priceNet: 1288000,
      isHybridOrElectric: false,
      termMonths: 48,
      extraordinaryRentPct: 0.10,
      securityDepositPct: 0.0,
      selectedStatePlateId: 'pendiente',
      isInsuranceEstimated: false,
      customAdminFeeInitial: 3334.50,
    };

    const result = service.calculateQuote(input);

    // El mínimo es fijo 10% (ya no depende del precio del vehículo)
    expect(result.options.option1.initialCosts.extraordinaryRentPct).toBe(0.10);
    expect(result.options.option2.initialCosts.extraordinaryRentPct).toBe(0.10);
    expect(result.options.option3.initialCosts.extraordinaryRentPct).toBe(0.10);

    // With 10% rent: (1,288,000 / 1.16) * 0.10 = 111,034.48
    expect(result.options.option1.initialCosts.extraordinaryRentNoIva).toBeCloseTo(111034.48, 1);
    // Advisory fee = 2% del precio sin IVA (independiente de la renta): (1,288,000 / 1.16) * 0.02 = 22,206.90
    expect(result.options.option1.initialCosts.advisoryFeeNoIva).toBeCloseTo(22206.90, 2);
    expect(result.options.option1.initialCosts.adminFeeInitialNet).toBeCloseTo(3334.50, 2);
  });

  it('should compute initial costs with annual insurance cost when "Costo Anual" is selected', () => {
    const input: VehicleQuoteInput = {
      brand: 'VOLKSWAGEN',
      model: 'TIGUAN R LINE',
      year: 2026,
      priceNet: 795790,
      isHybridOrElectric: false,
      termMonths: 48,
      extraordinaryRentPct: 0.10,
      securityDepositPct: 0.0,
      selectedStatePlateId: 'pendiente',
      isInsuranceEstimated: false,
      annualInsuranceCost: 23200, // capturado con IVA -> 20,000 netos
      customAdminFeeInitial: 3334.50,
    };

    const result = service.calculateQuote(input);
    const initialCosts = result.options.option1.initialCosts;

    // El importe capturado se desglosa: neto = 23,200 / 1.16 = 20,000
    expect(initialCosts.insuranceNoIva).toBeCloseTo(20000, 2);
    // La regla del 3.5% (Estimado) ya no aplica al elegir Costo Anual
    expect(initialCosts.insuranceNoIva).not.toBeCloseTo(input.priceNet * 0.035, 2);

    // Precio sin IVA = 795,790 / 1.16 = 686,025.86 -> renta 10% = 68,602.59
    expect(initialCosts.extraordinaryRentNoIva).toBeCloseTo(68602.59, 1);
    // Subtotal = renta 68,602.59 + gastos 3,334.50 + asesoría 13,720.52 + placas 0 + seguro 20,000
    expect(initialCosts.subtotalNoIva).toBeCloseTo(105657.6, 1);
    // IVA 16% del subtotal y desembolso inicial único = subtotal + IVA
    expect(initialCosts.ivaAmount).toBeCloseTo(16905.22, 1);
    expect(initialCosts.totalInitialPayment).toBeCloseTo(122562.82, 1);
  });

  it('should compute exact quotation with insurance estimated (HINO example from Excel)', () => {
    // Data from Excel screenshot: HINO 616 LONG, $407,900, with "Costo anual de seguro estimado"
    const input: VehicleQuoteInput = {
      brand: 'HINO',
      model: '616 LONG',
      year: 2026,
      priceNet: 407900,
      isHybridOrElectric: false,
      termMonths: 48,
      extraordinaryRentPct: 0.10,
      securityDepositPct: 0.0,
      selectedStatePlateId: 'pendiente',
      isInsuranceEstimated: true, // KEY: Insurance is estimated (3.5% of price)
      customAdminFeeInitial: 3334.50,
    };

    const result = service.calculateQuote(input);

    // Verify insurance calculation: Precio Neto × 3.5% = 407,900 × 0.035 = 14,276.50
    expect(result.options.option1.initialCosts.insuranceNoIva).toBeCloseTo(14276.5, 1);

    // Initial costs breakdown (all options identical)
    expect(result.options.option1.initialCosts.extraordinaryRentNoIva).toBeCloseTo(35164, 0);
    expect(result.options.option1.initialCosts.advisoryFeeNoIva).toBeCloseTo(7033, 0);
    expect(result.options.option1.initialCosts.adminFeeInitialNet).toBeCloseTo(3334.5, 0);

    // IVA = 59,808 × 0.16 ≈ 9,569
    expect(result.options.option1.initialCosts.ivaAmount).toBeCloseTo(9569, 0);

    // Desembolso inicial = 59,808 + 9,569 = 69,377
    expect(result.options.option1.initialCosts.totalInitialPayment).toBeCloseTo(69377, 0);

    // Monthly rent verification
    expect(result.options.option1.residualValue.valueNet).toBeCloseTo(142765, 0);
    expect(result.options.option1.monthlyCosts.totalMonthlyRentNet).toBeCloseTo(12346, 0);

    // Option 2
    expect(result.options.option2.residualValue.valueNet).toBeCloseTo(81580, 0);
    expect(result.options.option2.monthlyCosts.totalMonthlyRentNet).toBeCloseTo(13121, 0);

    // Option 3
    expect(result.options.option3.residualValue.valueNet).toBeCloseTo(20395, 0);
    expect(result.options.option3.monthlyCosts.totalMonthlyRentNet).toBeCloseTo(13867, 0);
  });

  // ========== VALIDATION TESTS ==========

  describe('Validation: Minimum Extraordinary Rent Percentage', () => {
    it('should require minimum 10% for vehicles under $650k', () => {
      const minPct = getMinimumExtraordinaryRentPct(500000);
      expect(minPct).toBe(0.10);
    });

    it('should always return 10% minimum regardless of price ($650k-$1.5M)', () => {
      const minPct1 = getMinimumExtraordinaryRentPct(650000);
      const minPct2 = getMinimumExtraordinaryRentPct(1000000);
      const minPct3 = getMinimumExtraordinaryRentPct(1499999);
      expect(minPct1).toBe(0.10);
      expect(minPct2).toBe(0.10);
      expect(minPct3).toBe(0.10);
    });

    it('should always return 10% minimum regardless of price ($1.5M+)', () => {
      const minPct1 = getMinimumExtraordinaryRentPct(1500000);
      const minPct2 = getMinimumExtraordinaryRentPct(2000000);
      expect(minPct1).toBe(0.10);
      expect(minPct2).toBe(0.10);
    });

    it('should enforce minimum rent in quote calculation', () => {
      // Price: $1,600,000 (mínimo fijo 10%)
      // Usuario intenta 5% → el motor ajusta al mínimo 10%
      const input: VehicleQuoteInput = {
        brand: 'TEST',
        model: 'TEST',
        year: 2026,
        priceNet: 1600000,
        isHybridOrElectric: false,
        termMonths: 48,
        extraordinaryRentPct: 0.05,
        securityDepositPct: 0.0,
        selectedStatePlateId: 'pendiente',
        isInsuranceEstimated: false,
      };

      const result = service.calculateQuote(input);

      // Debe ajustarse al mínimo fijo 10%
      expect(result.options.option1.initialCosts.extraordinaryRentPct).toBe(0.10);
      expect(result.options.option2.initialCosts.extraordinaryRentPct).toBe(0.10);
      expect(result.options.option3.initialCosts.extraordinaryRentPct).toBe(0.10);
    });
  });

  describe('Validation: Sum of Extraordinary Rent + Residual <= 75%', () => {
    it('should validate that sum does not exceed 75%', () => {
      // Valid: 10% + 35% = 45% ✓
      expect(isExtraordinaryRentAndResidualValid(0.10, 0.35)).toBe(true);

      // Valid: 40% + 35% = 75% ✓
      expect(isExtraordinaryRentAndResidualValid(0.40, 0.35)).toBe(true);

      // Invalid: 50% + 35% = 85% > 75% ✗
      expect(isExtraordinaryRentAndResidualValid(0.50, 0.35)).toBe(false);
    });

    it('should prevent sum from exceeding 75% with option 1 (35% residual)', () => {
      // For Option 1 (35% residual), max rent = 75% - 35% = 40%
      // If user tries 50%, should be capped at 40%
      const input: VehicleQuoteInput = {
        brand: 'TEST',
        model: 'TEST',
        year: 2026,
        priceNet: 500000,
        isHybridOrElectric: false,
        termMonths: 48,
        extraordinaryRentPct: 0.50, // User tries 50%
        securityDepositPct: 0.0,
        selectedStatePlateId: 'pendiente',
        isInsuranceEstimated: false,
      };

      const result = service.calculateQuote(input);

      // Option 1: Rent should be capped at 40% (75% - 35%)
      expect(result.options.option1.initialCosts.extraordinaryRentPct).toBe(0.40);

      // Verify sum doesn't exceed 75%
      const sum1 = result.options.option1.initialCosts.extraordinaryRentPct + 0.35;
      expect(sum1).toBeLessThanOrEqual(0.75);
    });

    it('should prevent sum from exceeding 75% with option 2 (20% residual)', () => {
      // For Option 2 (20% residual): el techo absoluto de renta es 50% y la
      // regla de suma permite hasta 55% (75% - 20%). El techo absoluto gana.
      const input: VehicleQuoteInput = {
        brand: 'TEST',
        model: 'TEST',
        year: 2026,
        priceNet: 500000,
        isHybridOrElectric: false,
        termMonths: 48,
        extraordinaryRentPct: 0.60, // User tries 60%
        securityDepositPct: 0.0,
        selectedStatePlateId: 'pendiente',
        isInsuranceEstimated: false,
      };

      const result = service.calculateQuote(input);

      // Option 2: Rent capped at 50% (techo absoluto; 75% - 20% = 55% no aplica)
      expect(result.options.option2.initialCosts.extraordinaryRentPct).toBe(0.50);

      // Verify sum doesn't exceed 75%
      const sum2 = result.options.option2.initialCosts.extraordinaryRentPct + 0.20;
      expect(sum2).toBeLessThanOrEqual(0.75);
    });

    it('should prevent sum from exceeding 75% with option 3 (5% residual)', () => {
      // For Option 3 (5% residual): el techo absoluto de renta es 50% y la
      // regla de suma permitiría 70% (75% - 5%). El techo absoluto gana.
      const input: VehicleQuoteInput = {
        brand: 'TEST',
        model: 'TEST',
        year: 2026,
        priceNet: 500000,
        isHybridOrElectric: false,
        termMonths: 48,
        extraordinaryRentPct: 0.80, // User tries 80%
        securityDepositPct: 0.0,
        selectedStatePlateId: 'pendiente',
        isInsuranceEstimated: false,
      };

      const result = service.calculateQuote(input);

      // Option 3: Rent capped at 50% (techo absoluto; 75% - 5% = 70% no aplica)
      expect(result.options.option3.initialCosts.extraordinaryRentPct).toBe(0.50);

      // Verify sum doesn't exceed 75%
      const sum3 = result.options.option3.initialCosts.extraordinaryRentPct + 0.05;
      expect(sum3).toBeLessThanOrEqual(0.75);
    });
  });

  describe('Validation: Combined Rules', () => {
    it('should enforce BOTH minimum rent AND maximum sum for high-priced vehicle', () => {
      // Price: $2,000,000 (mínimo fijo 10%)
      // If user tries 50%, both rules apply:
      // 1. Must be >= 10% (mínimo fijo)
      // 2. Must be <= 40% for Option 1 (to keep sum at 75%)
      // Therefore: 10% <= rent <= 40%
      const input: VehicleQuoteInput = {
        brand: 'LUXURY',
        model: 'CAR',
        year: 2026,
        priceNet: 2000000,
        isHybridOrElectric: false,
        termMonths: 48,
        extraordinaryRentPct: 0.50,
        securityDepositPct: 0.0,
        selectedStatePlateId: 'pendiente',
        isInsuranceEstimated: false,
      };

      const result = service.calculateQuote(input);

      // Option 1: Should be 40% (capped by 75% rule; mínimo 10% ya cumplido)
      expect(result.options.option1.initialCosts.extraordinaryRentPct).toBe(0.40);

      // Verify: 10% min met (40% >= 10%) ✓
      expect(result.options.option1.initialCosts.extraordinaryRentPct).toBeGreaterThanOrEqual(0.20);

      // Verify: 75% max met (40% + 35% = 75%) ✓
      expect(result.options.option1.initialCosts.extraordinaryRentPct + 0.35).toBeLessThanOrEqual(0.75);
    });
  });

  describe('Edge cases: Security Deposit', () => {
    const createInput = (securityDepositPct: number): VehicleQuoteInput => ({
      brand: 'TEST',
      model: 'TEST',
      year: 2026,
      priceNet: 500000,
      isHybridOrElectric: false,
      termMonths: 48,
      extraordinaryRentPct: 0.10,
      securityDepositPct,
      selectedStatePlateId: 'pendiente',
      isInsuranceEstimated: false,
    });

    it('should not add or subtract anything when deposit is 0%', () => {
      const result = service.calculateQuote(createInput(0));
      const option = result.options.option1;

      expect(option.initialCosts.securityDepositAmount).toBe(0);
      expect(option.initialCosts.totalInitialPayment).toBeCloseTo(63868.02, 2);
      expect(option.amountToFinanceNoIva).toBeCloseTo(387931.03, 2);
    });

    it('should add a 10% deposit to the initial payment and reduce financing', () => {
      const withoutDeposit = service.calculateQuote(createInput(0)).options.option1;
      const withDeposit = service.calculateQuote(createInput(0.10)).options.option1;
      const expectedDeposit = 500000 * 0.10;

      expect(withDeposit.initialCosts.securityDepositAmount).toBe(expectedDeposit);
      expect(withDeposit.initialCosts.totalInitialPayment).toBeCloseTo(
        withoutDeposit.initialCosts.totalInitialPayment + expectedDeposit,
        2
      );
      expect(withDeposit.amountToFinanceNoIva).toBeCloseTo(
        withoutDeposit.amountToFinanceNoIva - expectedDeposit,
        2
      );
      expect(withDeposit.monthlyCosts.totalMonthlyRentNet).toBeLessThan(
        withoutDeposit.monthlyCosts.totalMonthlyRentNet
      );
    });
  });
});
