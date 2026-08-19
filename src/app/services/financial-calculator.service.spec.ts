import { FinancialCalculatorService } from './financial-calculator.service';
import { VehicleQuoteInput } from '../models/leasing.model';

describe('FinancialCalculatorService', () => {
  let service: FinancialCalculatorService;

  beforeEach(() => {
    service = new FinancialCalculatorService();
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
});
