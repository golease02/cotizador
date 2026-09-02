export interface StatePlateOption {
  id: string;
  name: string;
  costNet: number; // Cost with IVA
  estado?: string; // Estado de la República Mexicana al que pertenece
  disponible?: boolean; // true = aparece en el cotizador; false = oculta
}

/**
 * Los 32 estados de la República Mexicana (incluye la Ciudad de México).
 * Se usa en el catálogo de placas para filtrar y asignar el estado.
 */
export const ESTADOS_MEXICO: string[] = [
  'Aguascalientes',
  'Baja California',
  'Baja California Sur',
  'Campeche',
  'Chiapas',
  'Chihuahua',
  'Ciudad de México',
  'Coahuila',
  'Colima',
  'Durango',
  'Guanajuato',
  'Guerrero',
  'Hidalgo',
  'Jalisco',
  'Estado de México',
  'Michoacán',
  'Morelos',
  'Nayarit',
  'Nuevo León',
  'Oaxaca',
  'Puebla',
  'Querétaro',
  'Quintana Roo',
  'San Luis Potosí',
  'Sinaloa',
  'Sonora',
  'Tabasco',
  'Tamaulipas',
  'Tlaxcala',
  'Veracruz',
  'Yucatán',
  'Zacatecas',
];

export const STATE_PLATES_CATALOG: StatePlateOption[] = [
  { id: 'cdmx', name: 'Alta de placas CDMX', costNet: 1432, estado: 'Ciudad de México', disponible: true },
  { id: 'edomex', name: 'Alta de placas Edo de Mex', costNet: 1432, estado: 'Estado de México', disponible: true },
  { id: 'guanajuato', name: 'Alta de placas Guanajuato', costNet: 4454, estado: 'Guanajuato', disponible: true },
  { id: 'michoacan', name: 'Alta de placas Michoacan', costNet: 7948, estado: 'Michoacán', disponible: true },
  { id: 'queretaro', name: 'Alta de placas Querétaro', costNet: 6679, estado: 'Querétaro', disponible: true },
  { id: 'slp', name: 'Alta de placas San Luis Potosi', costNet: 6933, estado: 'San Luis Potosí', disponible: true },
  { id: 'jalisco', name: 'Alta Placas Jalisco', costNet: 11460, estado: 'Jalisco', disponible: true },
  { id: 'pendiente', name: 'Alta de placas pendientes x cotizar', costNet: 0, estado: '', disponible: true },
];

export interface TermRatesOption {
  termMonths: number;
  option1Rate: number; // e.g. 0.405 for 48m
  option2Rate: number; // e.g. 0.420 for 48m
  option3Rate: number; // e.g. 0.435 for 48m
}

export interface CalculatorConfig {
  ivaPct: number;
  advisoryFeePct: number;
  insurancePct: number;
  adminFeeInitialNet: number;
  maxRentAndResidualPct: number;
  minimumRentThreshold1: number;
  minimumRentThreshold2: number;
  minimumRentPct1: number;
  minimumRentPct2: number;
  minimumRentPct3: number;
  basicRentStandard: number;
  basicRentHybrid: number;
  fleetManagementPct: number;
  adminManagementPct: number;
  residualOption1Pct: number;
  residualOption2Pct: number;
  residualOption3Pct: number;
  termRates: Record<number, TermRatesOption>;
}

export const TERM_RATES_MATRIX: Record<number, TermRatesOption> = {
  12: { termMonths: 12, option1Rate: 0.750, option2Rate: 0.830, option3Rate: 0.900 },
  24: { termMonths: 24, option1Rate: 0.520, option2Rate: 0.550, option3Rate: 0.590 },
  36: { termMonths: 36, option1Rate: 0.445, option2Rate: 0.465, option3Rate: 0.490 },
  48: { termMonths: 48, option1Rate: 0.405, option2Rate: 0.420, option3Rate: 0.435 },
};

export const DEFAULT_CALCULATOR_CONFIG: CalculatorConfig = {
  ivaPct: 0.16,
  advisoryFeePct: 0.02,
  insurancePct: 0.035,
  adminFeeInitialNet: 3334.5,
  maxRentAndResidualPct: 0.75,
  minimumRentThreshold1: 650000,
  minimumRentThreshold2: 1500000,
  minimumRentPct1: 0.10,
  minimumRentPct2: 0.15,
  minimumRentPct3: 0.20,
  basicRentStandard: 6000,
  basicRentHybrid: 8550,
  fleetManagementPct: 0.60,
  adminManagementPct: 0.40,
  residualOption1Pct: 0.35,
  residualOption2Pct: 0.20,
  residualOption3Pct: 0.05,
  termRates: TERM_RATES_MATRIX,
};

/**
 * Calcula el porcentaje mínimo de renta extraordinaria basado en el precio del vehículo
 *
 * BASES:
 * - MINIMO 10%
 * - 10% PARA VEHÍCULOS DE MENOS DE 650 MIL
 * - 15% SI EL PRECIO ESTA ENTRE 650 MIL Y $1.5 MILLONES
 * - 20% ARRIBA DE PRECIOS DE $1.5 MILLONES
 */
export function getMinimumExtraordinaryRentPct(priceNet: number): number {
  if (priceNet < 650000) {
    return 0.10; // 10%
  } else if (priceNet < 1500000) {
    return 0.15; // 15%
  } else {
    return 0.20; // 20%
  }
}

/**
 * Residual values para las 3 opciones
 */
export const RESIDUAL_PERCENTAGES = {
  option1: 0.35, // 35%
  option2: 0.20, // 20%
  option3: 0.05, // 5%
};

/**
 * Valida que la suma de renta extraordinaria + valor residual no exceda 75%
 *
 * LA SUMA DE LA RENTA EXTRA Y EL VALOR RESIDUAL NO DEBE SER MAYOR AL 75%
 *
 * @param extraordinaryRentPct Porcentaje de renta extraordinaria (ej: 0.10)
 * @param residualPct Porcentaje de valor residual (ej: 0.35)
 * @returns boolean true si es válido, false si excede 75%
 */
export function isExtraordinaryRentAndResidualValid(
  extraordinaryRentPct: number,
  residualPct: number,
  maxPct = 0.75
): boolean {
  const sum = extraordinaryRentPct + residualPct;
  return sum <= maxPct;
}

export interface VehicleQuoteInput {
  clientName?: string;
  brand: string;
  model: string;
  year: number;
  priceNet: number; // e.g. 407900
  isHybridOrElectric: boolean;
  termMonths: 12 | 24 | 36 | 48;
  extraordinaryRentPct: number; // e.g. 0.10 (10%)
  securityDepositPct: number; // e.g. 0 (0%)
  selectedStatePlateId: string;
  isInsuranceEstimated: boolean; // True: 3.5% of priceNet, False: 0
  customAdminFeeInitial?: number; // Default 2565 * 1.3 = 3334.50
}

export interface InitialCostsBreakdown {
  extraordinaryRentNoIva: number;
  extraordinaryRentPct: number;
  adminFeeInitialNet: number;
  advisoryFeeNoIva: number; // 2% of priceNet / 1.16
  plateRegistrationNoIva: number;
  insuranceNoIva: number;
  subtotalNoIva: number;
  ivaAmount: number;
  securityDepositAmount: number;
  totalInitialPayment: number;
}

export interface MonthlyCostsBreakdown {
  basicRentNoIva: number; // 6000 or 8550
  fleetManagementFeeNoIva: number; // 60% of remainder
  adminManagementFeeNoIva: number; // 40% of remainder
  subtotalNoIva: number;
  ivaAmount: number;
  totalMonthlyRentNet: number; // PMT result
}

export interface ResidualValueBreakdown {
  percentage: number; // e.g. 0.35
  valueNet: number; // priceNet * percentage
  valueNoIva: number; // valueNet / 1.16
}

export interface LeasingOptionResult {
  optionKey: 'OPCION_1' | 'OPCION_2' | 'OPCION_3';
  optionName: string;
  annualRatePct: number;
  residualValue: ResidualValueBreakdown;
  amountToFinanceNoIva: number;
  initialCosts: InitialCostsBreakdown;
  monthlyCosts: MonthlyCostsBreakdown;
}

export interface QuoteCalculationResult {
  input: VehicleQuoteInput;
  options: {
    option1: LeasingOptionResult;
    option2: LeasingOptionResult;
    option3: LeasingOptionResult;
  };
  generatedAt: Date;
}
