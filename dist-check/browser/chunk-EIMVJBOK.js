import {
  CatalogService,
  STATE_PLATES_CATALOG,
  TERM_RATES_MATRIX,
  isExtraordinaryRentAndResidualValid
} from "./chunk-ZZO2EEQW.js";
import {
  ThemeService
} from "./chunk-WDXLETH5.js";
import {
  CommonModule,
  Component,
  DatePipe,
  DecimalPipe,
  EventEmitter,
  Injectable,
  Input,
  NgIf,
  Optional,
  Output,
  currentUserSignal,
  getSupabaseClient,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-6KRTW2LJ.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-FDMHZOCR.js";

// src/app/services/quotes.service.ts
var QuotesService = class _QuotesService {
  client = getSupabaseClient();
  savedQuotesSignal = signal(
    [],
    ...ngDevMode ? [{ debugName: "savedQuotesSignal" }] : (
      /* istanbul ignore next */
      []
    )
  );
  savedQuotes = this.savedQuotesSignal.asReadonly();
  async saveQuote(quote, quoteId) {
    const user = currentUserSignal();
    if (!user) {
      this.saveLocalQuote(quote);
      return { id: null, error: null };
    }
    const quoteData = {
      seller_id: user.id,
      client_name: quote.input.clientName || "",
      brand: quote.input.brand,
      model: quote.input.model,
      year: quote.input.year,
      pricenet: quote.input.priceNet,
      ishybridorelectric: quote.input.isHybridOrElectric,
      termmonths: quote.input.termMonths,
      extraordinaryrentpct: quote.input.extraordinaryRentPct || 0,
      securitydepositpct: quote.input.securityDepositPct || 0,
      selectedstateplateid: quote.input.selectedStatePlateId || "pendiente",
      isinsuranceestimated: quote.input.isInsuranceEstimated || false,
      totalpayment: 0,
      calculation: quote,
      valid_until: new Date(Date.now() + 7 * 24 * 60 * 60 * 1e3).toISOString()
    };
    if (quoteId) {
      const { error } = await this.client.from("quotes").update(quoteData).eq("id", quoteId).eq("seller_id", user.id);
      if (error) {
        this.saveLocalQuote(quote);
        return { id: null, error };
      }
      this.saveLocalQuote(quote);
      return { id: quoteId, error: null };
    } else {
      const { data, error } = await this.client.from("quotes").insert([__spreadProps(__spreadValues({}, quoteData), { revisada: false, color: "reciente" })]).select("id");
      if (error) {
        this.saveLocalQuote(quote);
        return { id: null, error };
      }
      const insertedId = data?.[0]?.id || null;
      this.saveLocalQuote(quote);
      return { id: insertedId, error: null };
    }
  }
  saveLocalQuote(quote) {
    const updated = [quote, ...this.savedQuotesSignal()];
    this.savedQuotesSignal.set(updated);
  }
  async loadQuotes() {
    const user = currentUserSignal();
    if (!user)
      return;
    const { data, error } = await this.client.from("quotes").select("id, seller_id, client_name, brand, model, year, pricenet, ishybridorelectric, termmonths, extraordinaryrentpct, securitydepositpct, selectedstateplateid, isinsuranceestimated, created_at").eq("seller_id", user.id).order("created_at", { ascending: false }).limit(200);
    if (error || !data)
      return;
    const mapped = data.map((q) => ({
      input: {
        clientName: q.client_name,
        brand: q.brand,
        model: q.model,
        year: q.year,
        priceNet: q.pricenet,
        isHybridOrElectric: q.ishybridorelectric,
        termMonths: q.termmonths,
        extraordinaryRentPct: q.extraordinaryrentpct,
        securityDepositPct: q.securitydepositpct,
        selectedStatePlateId: q.selectedstateplateid,
        isInsuranceEstimated: q.isinsuranceestimated
      },
      options: { option1: {}, option2: {}, option3: {} },
      generatedAt: new Date(q.created_at)
    }));
    this.savedQuotesSignal.set(mapped);
  }
  /** Recupera el snapshot inmutable guardado de la cotización (null si no existe. */
  async getQuoteCalculation(quoteId) {
    const { data, error } = await this.client.from("quotes").select("calculation").eq("id", quoteId).maybeSingle();
    if (error || !data?.calculation)
      return null;
    const calc = data.calculation;
    if (calc.generatedAt && typeof calc.generatedAt === "string") {
      calc.generatedAt = new Date(calc.generatedAt);
    }
    return calc;
  }
  async getVendedorQuotes(sellerId) {
    const { data, error } = await this.client.from("quotes").select("id, seller_id, client_name, brand, model, year, pricenet, ishybridorelectric, termmonths, extraordinaryrentpct, securitydepositpct, selectedstateplateid, isinsuranceestimated, created_at").eq("seller_id", sellerId).order("created_at", { ascending: false }).limit(200);
    return { data, error };
  }
  /** Paridad con producción: el estado se persiste en status_color/last_reviewed_at. */
  async updateQuoteStatus(quoteId, color) {
    const { error } = await this.client.from("quotes").update({ status_color: color, last_reviewed_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", quoteId);
    return { error };
  }
  async getAllQuotesWithSeller() {
    const { data, error } = await this.client.from("quotes").select(`id, seller_id, client_name, brand, model, year, pricenet, ishybridorelectric, termmonths, extraordinaryrentpct, securitydepositpct, selectedstateplateid, isinsuranceestimated, color, fijada, revisada, created_at,
        created_at,
        profiles!seller_id (full_name)`).order("created_at", { ascending: false }).limit(200);
    if (error)
      return { data: null, error };
    const mapped = data.map((q) => __spreadProps(__spreadValues({}, q), {
      seller_name: q.profiles?.full_name || "N/A"
    }));
    return { data: mapped, error: null };
  }
  static \u0275fac = function QuotesService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _QuotesService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _QuotesService, factory: _QuotesService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(QuotesService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/services/financial-calculator.service.ts
var FinancialCalculatorService = class _FinancialCalculatorService {
  catalog;
  constructor(catalog) {
    this.catalog = catalog ?? inject(CatalogService);
  }
  /**
   * Calculates PMT (Periodic Payment) matching Excel's PMT(rate, nper, pv, fv, type)
   * Formula:
   * pv * (1 + rate)^nper + PMT * [((1 + rate)^nper - 1) / rate] + fv = 0
   * PMT = - [pv * (1 + rate)^nper + fv] / [((1 + rate)^nper - 1) / rate]
   */
  calculatePMT(rate, nper, pv, fv = 0, type = 0) {
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
  calculateQuote(input) {
    const config = this.catalog.getCalculatorConfig();
    const termConfig = config.termRates[input.termMonths] || config.termRates[48] || TERM_RATES_MATRIX[48];
    const selectedPlate = this.catalog.getStatePlates().find((p) => p.id === input.selectedStatePlateId) || STATE_PLATES_CATALOG.find((p) => p.id === input.selectedStatePlateId) || STATE_PLATES_CATALOG[STATE_PLATES_CATALOG.length - 1];
    const option1 = this.calculateOption("OPCION_1", "OPCI\xD3N 1", termConfig.option1Rate, config.residualOption1Pct, input, selectedPlate.costNet);
    const option2 = this.calculateOption("OPCION_2", "OPCI\xD3N 2", termConfig.option2Rate, config.residualOption2Pct, input, selectedPlate.costNet);
    const option3 = this.calculateOption("OPCION_3", "OPCI\xD3N 3", termConfig.option3Rate, config.residualOption3Pct, input, selectedPlate.costNet);
    return {
      input,
      options: {
        option1,
        option2,
        option3
      },
      generatedAt: /* @__PURE__ */ new Date()
    };
  }
  calculateOption(optionKey, optionName, annualRate, residualPct, input, plateCostNet) {
    const config = this.catalog.getCalculatorConfig();
    const priceNoIva = input.priceNet / (1 + config.ivaPct);
    const minimumRentPct = this.getMinimumRentPct(input.priceNet, config);
    const userRentPct = input.extraordinaryRentPct || 0.1;
    let extraordinaryRentPct = Math.max(minimumRentPct, userRentPct);
    if (!isExtraordinaryRentAndResidualValid(extraordinaryRentPct, residualPct, config.maxRentAndResidualPct)) {
      extraordinaryRentPct = config.maxRentAndResidualPct - residualPct;
    }
    const extraordinaryRentNoIva = priceNoIva * extraordinaryRentPct;
    const adminFeeInitialNet = input.customAdminFeeInitial ?? config.adminFeeInitialNet;
    const advisoryFeeNoIva = priceNoIva * config.advisoryFeePct;
    const plateRegistrationNoIva = plateCostNet / (1 + config.ivaPct);
    const insuranceNoIva = input.isInsuranceEstimated ? input.priceNet * config.insurancePct : 0;
    const subtotalNoIva = extraordinaryRentNoIva + adminFeeInitialNet + advisoryFeeNoIva + plateRegistrationNoIva + insuranceNoIva;
    const ivaAmount = subtotalNoIva * config.ivaPct;
    const securityDepositAmount = input.priceNet * (input.securityDepositPct || 0);
    const totalInitialPayment = subtotalNoIva + ivaAmount + securityDepositAmount;
    const initialCosts = {
      extraordinaryRentNoIva,
      extraordinaryRentPct,
      adminFeeInitialNet,
      advisoryFeeNoIva,
      plateRegistrationNoIva,
      insuranceNoIva,
      subtotalNoIva,
      ivaAmount,
      securityDepositAmount,
      totalInitialPayment
    };
    const amountToFinanceNoIva = priceNoIva - extraordinaryRentNoIva - securityDepositAmount;
    const vrNet = input.priceNet * residualPct;
    const vrNoIva = vrNet / (1 + config.ivaPct);
    const residualValue = {
      percentage: residualPct,
      valueNet: vrNet,
      valueNoIva: vrNoIva
    };
    const monthlyRate = annualRate / 12;
    const totalMonthlyRentNet = this.calculatePMT(monthlyRate, input.termMonths, -amountToFinanceNoIva, vrNoIva);
    const totalMonthlyRentNoIva = totalMonthlyRentNet / (1 + config.ivaPct);
    const basicRentNoIva = input.isHybridOrElectric ? config.basicRentHybrid : config.basicRentStandard;
    const remainderNoIva = totalMonthlyRentNoIva - basicRentNoIva;
    const fleetManagementFeeNoIva = remainderNoIva * config.fleetManagementPct;
    const adminManagementFeeNoIva = remainderNoIva * config.adminManagementPct;
    const monthlySubtotalNoIva = basicRentNoIva + fleetManagementFeeNoIva + adminManagementFeeNoIva;
    const monthlyIva = monthlySubtotalNoIva * config.ivaPct;
    const monthlyCosts = {
      basicRentNoIva,
      fleetManagementFeeNoIva,
      adminManagementFeeNoIva,
      subtotalNoIva: monthlySubtotalNoIva,
      ivaAmount: monthlyIva,
      totalMonthlyRentNet
    };
    return {
      optionKey,
      optionName,
      annualRatePct: annualRate,
      residualValue,
      amountToFinanceNoIva,
      initialCosts,
      monthlyCosts
    };
  }
  getMinimumRentPct(priceNet, config) {
    if (priceNet < config.minimumRentThreshold1)
      return config.minimumRentPct1;
    if (priceNet < config.minimumRentThreshold2)
      return config.minimumRentPct2;
    return config.minimumRentPct3;
  }
  static \u0275fac = function FinancialCalculatorService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FinancialCalculatorService)(\u0275\u0275inject(CatalogService, 8));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _FinancialCalculatorService, factory: _FinancialCalculatorService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FinancialCalculatorService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: CatalogService, decorators: [{
    type: Optional
  }] }], null);
})();

// src/app/services/pdf-export.service.ts
var PdfExportService = class _PdfExportService {
  theme = inject(ThemeService);
  async exportToPdf(elementId, fileName = "cotizacion") {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`Elemento con ID "${elementId}" no encontrado.`);
      return;
    }
    const previousTheme = this.theme.theme();
    this.theme.theme.set("light");
    try {
      const [html2canvas, jsPDF] = await Promise.all([
        import("./chunk-WEZGDP43.js").then((m) => m.default),
        import("./chunk-2FK5ITMW.js").then((m) => m.jsPDF)
      ]);
      await new Promise((resolve) => setTimeout(resolve, 100));
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        allowTaint: false,
        width: element.scrollWidth,
        height: element.scrollHeight
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height]
      });
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(`${fileName}.pdf`);
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    } finally {
      this.theme.theme.set(previousTheme);
    }
  }
  static \u0275fac = function PdfExportService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PdfExportService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PdfExportService, factory: _PdfExportService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PdfExportService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/components/quote-breakdown/quote-breakdown.component.ts
function QuoteBreakdownComponent_div_0_button_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 67);
    \u0275\u0275listener("click", function QuoteBreakdownComponent_div_0_button_14_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onSaveQuote());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 8);
    \u0275\u0275element(2, "path", 68)(3, "polyline", 69)(4, "polyline", 70);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " Guardar Cotizaci\xF3n ");
    \u0275\u0275elementEnd();
  }
}
function QuoteBreakdownComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "span", 4);
    \u0275\u0275text(4, "Hoja Oficial de Cotizaci\xF3n (Formato PDF)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 5);
    \u0275\u0275text(6, "Muestra el desglose simult\xE1neo de las 3 Opciones");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 6)(8, "button", 7);
    \u0275\u0275listener("click", function QuoteBreakdownComponent_div_0_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.downloadPDF());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(9, "svg", 8);
    \u0275\u0275element(10, "path", 9)(11, "polyline", 10)(12, "line", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275template(14, QuoteBreakdownComponent_div_0_button_14_Template, 6, 0, "button", 12);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(15, "div", 13)(16, "div", 14)(17, "div", 15)(18, "h1", 16);
    \u0275\u0275text(19, "ARRENDAMIENTO PURO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span", 17);
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(23, "div", 18);
    \u0275\u0275elementStart(24, "div", 19)(25, "div", 20)(26, "div", 21);
    \u0275\u0275text(27, "Atenci\xF3n a");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 22);
    \u0275\u0275text(29);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "div", 23)(31, "div", 24)(32, "span", 21);
    \u0275\u0275text(33, "Marca");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "span", 25);
    \u0275\u0275text(35);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "div", 26)(37, "span", 21);
    \u0275\u0275text(38, "Modelo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "span", 25);
    \u0275\u0275text(40);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(41, "div", 27)(42, "span", 21);
    \u0275\u0275text(43, "A\xF1o");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "span", 25);
    \u0275\u0275text(45);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(46, "div", 28)(47, "div", 29)(48, "span", 21);
    \u0275\u0275text(49, "Precio Neto");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "span", 30);
    \u0275\u0275text(51, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "span", 31);
    \u0275\u0275text(53);
    \u0275\u0275pipe(54, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "span", 32);
    \u0275\u0275text(56, "Pesos MN");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(57, "div", 26)(58, "span", 21);
    \u0275\u0275text(59, "\xBFEs HIBRIDO O ELECTRICO?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(60, "span", 33);
    \u0275\u0275text(61);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275element(62, "div", 18);
    \u0275\u0275elementStart(63, "table", 34)(64, "thead")(65, "tr", 35)(66, "th", 36)(67, "div", 37);
    \u0275\u0275element(68, "img", 38);
    \u0275\u0275elementStart(69, "div", 39)(70, "span", 40);
    \u0275\u0275text(71, "Plazo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(72, "span", 41);
    \u0275\u0275text(73);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(74, "span", 42);
    \u0275\u0275text(75, "Meses");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(76, "th", 43);
    \u0275\u0275text(77, "OPCION 1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(78, "th", 43);
    \u0275\u0275text(79, "OPCION 2");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(80, "th", 43);
    \u0275\u0275text(81, "OPCION 3");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(82, "tbody")(83, "tr")(84, "td", 44);
    \u0275\u0275text(85, "Renta Extraordinaria");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(86, "td", 45);
    \u0275\u0275text(87);
    \u0275\u0275pipe(88, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(89, "td", 46);
    \u0275\u0275text(90, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(91, "td", 47);
    \u0275\u0275text(92);
    \u0275\u0275pipe(93, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(94, "td", 45);
    \u0275\u0275text(95);
    \u0275\u0275pipe(96, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(97, "td", 46);
    \u0275\u0275text(98, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(99, "td", 47);
    \u0275\u0275text(100);
    \u0275\u0275pipe(101, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(102, "td", 45);
    \u0275\u0275text(103);
    \u0275\u0275pipe(104, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(105, "td", 46);
    \u0275\u0275text(106, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(107, "td", 47);
    \u0275\u0275text(108);
    \u0275\u0275pipe(109, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(110, "tr")(111, "td", 48);
    \u0275\u0275text(112, "Gastos Administrativos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(113, "td", 46);
    \u0275\u0275text(114, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(115, "td", 47);
    \u0275\u0275text(116);
    \u0275\u0275pipe(117, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(118, "td", 49);
    \u0275\u0275text(119, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(120, "td", 47);
    \u0275\u0275text(121);
    \u0275\u0275pipe(122, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(123, "td", 49);
    \u0275\u0275text(124, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(125, "td", 47);
    \u0275\u0275text(126);
    \u0275\u0275pipe(127, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(128, "tr")(129, "td", 44);
    \u0275\u0275text(130, "Asesoria y gesti\xF3n Go Lease");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(131, "td", 45);
    \u0275\u0275text(132, "2%");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(133, "td", 46);
    \u0275\u0275text(134, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(135, "td", 47);
    \u0275\u0275text(136);
    \u0275\u0275pipe(137, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(138, "td", 45);
    \u0275\u0275text(139, "2%");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(140, "td", 46);
    \u0275\u0275text(141, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(142, "td", 47);
    \u0275\u0275text(143);
    \u0275\u0275pipe(144, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(145, "td", 45);
    \u0275\u0275text(146, "2%");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(147, "td", 46);
    \u0275\u0275text(148, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(149, "td", 47);
    \u0275\u0275text(150);
    \u0275\u0275pipe(151, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(152, "tr")(153, "td", 48);
    \u0275\u0275text(154);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(155, "td", 46);
    \u0275\u0275text(156, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(157, "td", 47);
    \u0275\u0275text(158);
    \u0275\u0275pipe(159, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(160, "td", 49);
    \u0275\u0275text(161, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(162, "td", 47);
    \u0275\u0275text(163);
    \u0275\u0275pipe(164, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(165, "td", 49);
    \u0275\u0275text(166, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(167, "td", 47);
    \u0275\u0275text(168);
    \u0275\u0275pipe(169, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(170, "tr")(171, "td", 48);
    \u0275\u0275text(172);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(173, "td", 46);
    \u0275\u0275text(174, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(175, "td", 47);
    \u0275\u0275text(176);
    \u0275\u0275pipe(177, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(178, "td", 49);
    \u0275\u0275text(179, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(180, "td", 47);
    \u0275\u0275text(181);
    \u0275\u0275pipe(182, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(183, "td", 49);
    \u0275\u0275text(184, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(185, "td", 47);
    \u0275\u0275text(186);
    \u0275\u0275pipe(187, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(188, "tr", 50)(189, "td", 48);
    \u0275\u0275text(190, "Subtotal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(191, "td", 46);
    \u0275\u0275text(192, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(193, "td", 47);
    \u0275\u0275text(194);
    \u0275\u0275pipe(195, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(196, "td", 49);
    \u0275\u0275text(197, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(198, "td", 47);
    \u0275\u0275text(199);
    \u0275\u0275pipe(200, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(201, "td", 49);
    \u0275\u0275text(202, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(203, "td", 47);
    \u0275\u0275text(204);
    \u0275\u0275pipe(205, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(206, "tr", 51)(207, "td", 48);
    \u0275\u0275text(208, "IVA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(209, "td", 46);
    \u0275\u0275text(210, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(211, "td", 47);
    \u0275\u0275text(212);
    \u0275\u0275pipe(213, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(214, "td", 49);
    \u0275\u0275text(215, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(216, "td", 47);
    \u0275\u0275text(217);
    \u0275\u0275pipe(218, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(219, "td", 49);
    \u0275\u0275text(220, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(221, "td", 47);
    \u0275\u0275text(222);
    \u0275\u0275pipe(223, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(224, "tr", 52)(225, "td", 53);
    \u0275\u0275text(226, "Desembolso inicial \xFAnico");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(227, "td", 54);
    \u0275\u0275text(228, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(229, "td", 55);
    \u0275\u0275text(230);
    \u0275\u0275pipe(231, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(232, "td", 56);
    \u0275\u0275text(233, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(234, "td", 55);
    \u0275\u0275text(235);
    \u0275\u0275pipe(236, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(237, "td", 56);
    \u0275\u0275text(238, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(239, "td", 55);
    \u0275\u0275text(240);
    \u0275\u0275pipe(241, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(242, "tr", 57);
    \u0275\u0275element(243, "td", 58);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(244, "tr")(245, "td", 48);
    \u0275\u0275text(246, "Renta mensual b\xE1sica");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(247, "td", 46);
    \u0275\u0275text(248, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(249, "td", 47);
    \u0275\u0275text(250);
    \u0275\u0275pipe(251, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(252, "td", 49);
    \u0275\u0275text(253, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(254, "td", 47);
    \u0275\u0275text(255);
    \u0275\u0275pipe(256, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(257, "td", 49);
    \u0275\u0275text(258, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(259, "td", 47);
    \u0275\u0275text(260);
    \u0275\u0275pipe(261, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(262, "tr")(263, "td", 48);
    \u0275\u0275text(264, "Gastos Admon de Flotilla");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(265, "td", 46);
    \u0275\u0275text(266, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(267, "td", 47);
    \u0275\u0275text(268);
    \u0275\u0275pipe(269, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(270, "td", 49);
    \u0275\u0275text(271, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(272, "td", 47);
    \u0275\u0275text(273);
    \u0275\u0275pipe(274, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(275, "td", 49);
    \u0275\u0275text(276, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(277, "td", 47);
    \u0275\u0275text(278);
    \u0275\u0275pipe(279, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(280, "tr")(281, "td", 48);
    \u0275\u0275text(282, "Gastos Administrativos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(283, "td", 46);
    \u0275\u0275text(284, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(285, "td", 47);
    \u0275\u0275text(286);
    \u0275\u0275pipe(287, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(288, "td", 49);
    \u0275\u0275text(289, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(290, "td", 47);
    \u0275\u0275text(291);
    \u0275\u0275pipe(292, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(293, "td", 49);
    \u0275\u0275text(294, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(295, "td", 47);
    \u0275\u0275text(296);
    \u0275\u0275pipe(297, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(298, "tr", 50)(299, "td", 48);
    \u0275\u0275text(300, "Subtotal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(301, "td", 46);
    \u0275\u0275text(302, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(303, "td", 47);
    \u0275\u0275text(304);
    \u0275\u0275pipe(305, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(306, "td", 49);
    \u0275\u0275text(307, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(308, "td", 47);
    \u0275\u0275text(309);
    \u0275\u0275pipe(310, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(311, "td", 49);
    \u0275\u0275text(312, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(313, "td", 47);
    \u0275\u0275text(314);
    \u0275\u0275pipe(315, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(316, "tr", 51)(317, "td", 48);
    \u0275\u0275text(318, "IVA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(319, "td", 46);
    \u0275\u0275text(320, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(321, "td", 47);
    \u0275\u0275text(322);
    \u0275\u0275pipe(323, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(324, "td", 49);
    \u0275\u0275text(325, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(326, "td", 47);
    \u0275\u0275text(327);
    \u0275\u0275pipe(328, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(329, "td", 49);
    \u0275\u0275text(330, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(331, "td", 47);
    \u0275\u0275text(332);
    \u0275\u0275pipe(333, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(334, "tr", 52)(335, "td", 53);
    \u0275\u0275text(336, "Renta mensual neta");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(337, "td", 54);
    \u0275\u0275text(338, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(339, "td", 55);
    \u0275\u0275text(340);
    \u0275\u0275pipe(341, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(342, "td", 56);
    \u0275\u0275text(343, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(344, "td", 55);
    \u0275\u0275text(345);
    \u0275\u0275pipe(346, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(347, "td", 56);
    \u0275\u0275text(348, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(349, "td", 55);
    \u0275\u0275text(350);
    \u0275\u0275pipe(351, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(352, "tr", 57);
    \u0275\u0275element(353, "td", 58);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(354, "tr", 59)(355, "td", 60);
    \u0275\u0275text(356, "Valor residual Neto");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(357, "td", 61);
    \u0275\u0275text(358);
    \u0275\u0275pipe(359, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(360, "td", 54);
    \u0275\u0275text(361, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(362, "td", 55);
    \u0275\u0275text(363);
    \u0275\u0275pipe(364, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(365, "td", 61);
    \u0275\u0275text(366);
    \u0275\u0275pipe(367, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(368, "td", 54);
    \u0275\u0275text(369, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(370, "td", 55);
    \u0275\u0275text(371);
    \u0275\u0275pipe(372, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(373, "td", 61);
    \u0275\u0275text(374);
    \u0275\u0275pipe(375, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(376, "td", 54);
    \u0275\u0275text(377, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(378, "td", 55);
    \u0275\u0275text(379);
    \u0275\u0275pipe(380, "number");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275element(381, "div", 62);
    \u0275\u0275elementStart(382, "div", 63)(383, "div", 64);
    \u0275\u0275text(384, "Consideraciones:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(385, "ul", 65)(386, "li");
    \u0275\u0275text(387, "* Cotizaci\xF3n sujeta a cambios sin previo aviso. Vigencia 7 d\xEDas a partir de su elaboraci\xF3n.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(388, "li");
    \u0275\u0275text(389, "* Las Rentas Extraordinarias son como un enganche 100% deducible y se pueden modificar para ajustarse a su presupuesto.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(390, "li");
    \u0275\u0275text(391, "* Las Rentas mensuales son 100% deducibles por los conceptos con que se emite y no solo por los que dicta la Ley de ISR.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(392, "li");
    \u0275\u0275text(393, "* Opci\xF3n de contar con placas de otros Estados para ahorrar el pago de tenencias.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(394, "li");
    \u0275\u0275text(395, "* Los costos de placas podr\xEDan ser ajustados, en caso de aplicar pago de tenencias y/o derechos. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(396, "li");
    \u0275\u0275text(397, "* Al finalizar el plazo puedes: Regresarlo / Adquirirlo / Renovarlo por uno nuevo / Te lo compramos para que obtengas una ganancia extra.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(398, "li");
    \u0275\u0275text(399, "* La asesoria y gesti\xF3n operativa de Go Lease deber\xE1 ser cubierta previa a la elaboraci\xF3n de contratos.");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(400, "div", 66)(401, "span");
    \u0275\u0275text(402, "TENEMOS CONVENIOS CON TODAS LAS MARCAS");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const calc_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275property("disabled", ctx_r1.isDownloading());
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r1.isDownloading() ? "Generando PDF..." : "Descargar PDF", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.mostrarGuardar);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(22, 64, ctx_r1.sheetDate, "dd/MM/yyyy"));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(calc_r4.input.clientName || "");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(calc_r4.input.brand);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(calc_r4.input.model);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(calc_r4.input.year);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(54, 67, calc_r4.input.priceNet, "1.2-2"));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(calc_r4.input.isHybridOrElectric ? "SI" : "NO");
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate(calc_r4.input.termMonths);
    \u0275\u0275advance(14);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(88, 70, ctx_r1.opt1.initialCosts.extraordinaryRentPct * 100, "1.0-0"), "%");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(93, 73, ctx_r1.opt1.initialCosts.extraordinaryRentNoIva, "1.0-0"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(96, 76, ctx_r1.opt2.initialCosts.extraordinaryRentPct * 100, "1.0-0"), "%");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(101, 79, ctx_r1.opt2.initialCosts.extraordinaryRentNoIva, "1.0-0"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(104, 82, ctx_r1.opt3.initialCosts.extraordinaryRentPct * 100, "1.0-0"), "%");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(109, 85, ctx_r1.opt3.initialCosts.extraordinaryRentNoIva, "1.0-0"));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(117, 88, ctx_r1.opt1.initialCosts.adminFeeInitialNet, "1.0-0"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(122, 91, ctx_r1.opt2.initialCosts.adminFeeInitialNet, "1.0-0"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(127, 94, ctx_r1.opt3.initialCosts.adminFeeInitialNet, "1.0-0"));
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(137, 97, ctx_r1.opt1.initialCosts.advisoryFeeNoIva, "1.0-0"));
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(144, 100, ctx_r1.opt2.initialCosts.advisoryFeeNoIva, "1.0-0"));
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(151, 103, ctx_r1.opt3.initialCosts.advisoryFeeNoIva, "1.0-0"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.getPlateLabel());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.opt1.initialCosts.plateRegistrationNoIva > 0 ? \u0275\u0275pipeBind2(159, 106, ctx_r1.opt1.initialCosts.plateRegistrationNoIva, "1.0-0") : "-");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.opt2.initialCosts.plateRegistrationNoIva > 0 ? \u0275\u0275pipeBind2(164, 109, ctx_r1.opt2.initialCosts.plateRegistrationNoIva, "1.0-0") : "-");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.opt3.initialCosts.plateRegistrationNoIva > 0 ? \u0275\u0275pipeBind2(169, 112, ctx_r1.opt3.initialCosts.plateRegistrationNoIva, "1.0-0") : "-");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.opt1.initialCosts.insuranceNoIva > 0 ? "Costo anual de seguro estimado" : "Seguro pendiente x cotizar");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.opt1.initialCosts.insuranceNoIva > 0 ? \u0275\u0275pipeBind2(177, 115, ctx_r1.opt1.initialCosts.insuranceNoIva, "1.0-0") : "-");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.opt2.initialCosts.insuranceNoIva > 0 ? \u0275\u0275pipeBind2(182, 118, ctx_r1.opt2.initialCosts.insuranceNoIva, "1.0-0") : "-");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.opt3.initialCosts.insuranceNoIva > 0 ? \u0275\u0275pipeBind2(187, 121, ctx_r1.opt3.initialCosts.insuranceNoIva, "1.0-0") : "-");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(195, 124, ctx_r1.opt1.initialCosts.subtotalNoIva, "1.0-0"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(200, 127, ctx_r1.opt2.initialCosts.subtotalNoIva, "1.0-0"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(205, 130, ctx_r1.opt3.initialCosts.subtotalNoIva, "1.0-0"));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(213, 133, ctx_r1.opt1.initialCosts.ivaAmount, "1.0-0"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(218, 136, ctx_r1.opt2.initialCosts.ivaAmount, "1.0-0"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(223, 139, ctx_r1.opt3.initialCosts.ivaAmount, "1.0-0"));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(231, 142, ctx_r1.opt1.initialCosts.totalInitialPayment, "1.0-0"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(236, 145, ctx_r1.opt2.initialCosts.totalInitialPayment, "1.0-0"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(241, 148, ctx_r1.opt3.initialCosts.totalInitialPayment, "1.0-0"));
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(251, 151, ctx_r1.opt1.monthlyCosts.basicRentNoIva, "1.0-0"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(256, 154, ctx_r1.opt2.monthlyCosts.basicRentNoIva, "1.0-0"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(261, 157, ctx_r1.opt3.monthlyCosts.basicRentNoIva, "1.0-0"));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(269, 160, ctx_r1.opt1.monthlyCosts.fleetManagementFeeNoIva, "1.0-0"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(274, 163, ctx_r1.opt2.monthlyCosts.fleetManagementFeeNoIva, "1.0-0"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(279, 166, ctx_r1.opt3.monthlyCosts.fleetManagementFeeNoIva, "1.0-0"));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(287, 169, ctx_r1.opt1.monthlyCosts.adminManagementFeeNoIva, "1.0-0"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(292, 172, ctx_r1.opt2.monthlyCosts.adminManagementFeeNoIva, "1.0-0"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(297, 175, ctx_r1.opt3.monthlyCosts.adminManagementFeeNoIva, "1.0-0"));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(305, 178, ctx_r1.opt1.monthlyCosts.subtotalNoIva, "1.0-0"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(310, 181, ctx_r1.opt2.monthlyCosts.subtotalNoIva, "1.0-0"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(315, 184, ctx_r1.opt3.monthlyCosts.subtotalNoIva, "1.0-0"));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(323, 187, ctx_r1.opt1.monthlyCosts.ivaAmount, "1.0-0"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(328, 190, ctx_r1.opt2.monthlyCosts.ivaAmount, "1.0-0"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(333, 193, ctx_r1.opt3.monthlyCosts.ivaAmount, "1.0-0"));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(341, 196, ctx_r1.opt1.monthlyCosts.totalMonthlyRentNet, "1.0-0"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(346, 199, ctx_r1.opt2.monthlyCosts.totalMonthlyRentNet, "1.0-0"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(351, 202, ctx_r1.opt3.monthlyCosts.totalMonthlyRentNet, "1.0-0"));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(359, 205, ctx_r1.opt1.residualValue.percentage * 100, "1.0-1"), "%");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(364, 208, ctx_r1.opt1.residualValue.valueNet, "1.0-0"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(367, 211, ctx_r1.opt2.residualValue.percentage * 100, "1.0-1"), "%");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(372, 214, ctx_r1.opt2.residualValue.valueNet, "1.0-0"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(375, 217, ctx_r1.opt3.residualValue.percentage * 100, "1.0-1"), "%");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(380, 220, ctx_r1.opt3.residualValue.valueNet, "1.0-0"));
  }
}
var QuoteBreakdownComponent = class _QuoteBreakdownComponent {
  pdfExport = inject(PdfExportService);
  catalog = inject(CatalogService);
  mostrarGuardar = true;
  calculation;
  selectedOptionKey = "OPCION_1";
  saveQuote = new EventEmitter();
  currentDate = /* @__PURE__ */ new Date();
  isDownloading = signal(
    false,
    ...ngDevMode ? [{ debugName: "isDownloading" }] : (
      /* istanbul ignore next */
      []
    )
  );
  get opt1() {
    return this.calculation?.options?.option1 || {
      initialCosts: { extraordinaryRentPct: 0, extraordinaryRentNoIva: 0, adminFeeInitialNet: 0, advisoryFeeNoIva: 0, plateRegistrationNoIva: 0, insuranceNoIva: 0, subtotalNoIva: 0, ivaAmount: 0, totalInitialPayment: 0 },
      monthlyCosts: { basicRentNoIva: 0, fleetManagementFeeNoIva: 0, adminManagementFeeNoIva: 0, subtotalNoIva: 0, ivaAmount: 0, totalMonthlyRentNet: 0 },
      residualValue: { percentage: 0, valueNet: 0 }
    };
  }
  get opt2() {
    return this.calculation?.options?.option2 || {
      initialCosts: { extraordinaryRentPct: 0, extraordinaryRentNoIva: 0, adminFeeInitialNet: 0, advisoryFeeNoIva: 0, plateRegistrationNoIva: 0, insuranceNoIva: 0, subtotalNoIva: 0, ivaAmount: 0, totalInitialPayment: 0 },
      monthlyCosts: { basicRentNoIva: 0, fleetManagementFeeNoIva: 0, adminManagementFeeNoIva: 0, subtotalNoIva: 0, ivaAmount: 0, totalMonthlyRentNet: 0 },
      residualValue: { percentage: 0, valueNet: 0 }
    };
  }
  get opt3() {
    return this.calculation?.options?.option3 || {
      initialCosts: { extraordinaryRentPct: 0, extraordinaryRentNoIva: 0, adminFeeInitialNet: 0, advisoryFeeNoIva: 0, plateRegistrationNoIva: 0, insuranceNoIva: 0, subtotalNoIva: 0, ivaAmount: 0, totalInitialPayment: 0 },
      monthlyCosts: { basicRentNoIva: 0, fleetManagementFeeNoIva: 0, adminManagementFeeNoIva: 0, subtotalNoIva: 0, ivaAmount: 0, totalMonthlyRentNet: 0 },
      residualValue: { percentage: 0, valueNet: 0 }
    };
  }
  get sheetDate() {
    const g = this.calculation?.generatedAt;
    if (!g)
      return this.currentDate;
    return g instanceof Date ? g : new Date(g);
  }
  getPlateLabel() {
    if (!this.calculation)
      return "Alta de placas pendientes x cotizar";
    const stateId = this.calculation.input.selectedStatePlateId;
    const plates = this.catalog.getStatePlates();
    const found = plates.find((p) => p.id === stateId);
    return found ? found.name : "Alta de placas pendientes x cotizar";
  }
  async downloadPDF() {
    this.isDownloading.set(true);
    try {
      await this.pdfExport.exportToPdf("official-pdf-sheet", "cotizacion_golease");
    } finally {
      this.isDownloading.set(false);
    }
  }
  onSaveQuote() {
    this.saveQuote.emit();
  }
  static \u0275fac = function QuoteBreakdownComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _QuoteBreakdownComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _QuoteBreakdownComponent, selectors: [["app-quote-breakdown"]], inputs: { mostrarGuardar: "mostrarGuardar", calculation: "calculation", selectedOptionKey: "selectedOptionKey" }, outputs: { saveQuote: "saveQuote" }, decls: 1, vars: 1, consts: [["class", "quote-document-wrapper", 4, "ngIf"], [1, "quote-document-wrapper"], [1, "document-action-bar"], [1, "action-info"], [1, "action-badge"], [1, "action-desc"], [1, "action-buttons"], [1, "btn", "btn-primary", 3, "click", "disabled"], ["xmlns", "http://www.w3.org/2000/svg", "width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"], ["points", "7 10 12 15 17 10"], ["x1", "12", "y1", "15", "x2", "12", "y2", "3"], ["class", "btn btn-primary", 3, "click", 4, "ngIf"], [1, "sheet-scroll-container"], ["id", "official-pdf-sheet", 1, "official-sheet"], [1, "sheet-top-header"], [1, "sheet-main-title"], [1, "sheet-date"], [1, "thick-header-line"], [1, "meta-grid-section"], [1, "meta-row", "row-1"], [1, "meta-label-cell"], [1, "meta-value-cell", "full-val"], [1, "meta-row", "row-2"], [1, "meta-group", "flex-2"], [1, "meta-value-cell", "center-text"], [1, "meta-group", "flex-3"], [1, "meta-group", "flex-1"], [1, "meta-row", "row-3"], [1, "meta-group", "flex-4"], [1, "meta-value-cell", "prefix-symbol"], [1, "meta-value-cell", "price-val"], [1, "meta-unit-cell"], [1, "meta-value-cell", "center-text", "uppercase-text"], [1, "financial-table"], [1, "table-brand-header-row"], ["colspan", "2", 1, "th-brand-cell"], [1, "brand-plazo-block"], ["src", "https://img1.wsimg.com/isteam/ip/b2c8c497-599d-4df4-9ab6-2aaaf690a095/LOGO%20GOLEASE%20SIN%20FONDO.png", "alt", "Go Lease Logo", 1, "sheet-logo-img"], [1, "plazo-box"], [1, "plazo-title"], [1, "plazo-number"], [1, "plazo-label"], ["colspan", "3", 1, "opt-header-th"], [1, "col-concept"], [1, "col-pct"], [1, "col-sym"], [1, "col-val"], ["colspan", "2", 1, "col-concept"], ["colspan", "2", 1, "col-sym"], [1, "row-subtotal"], [1, "row-iva"], [1, "row-total-section"], ["colspan", "2", 1, "col-concept-bold"], [1, "col-sym-bold"], [1, "col-val-bold"], ["colspan", "2", 1, "col-sym-bold"], [1, "spacer-row"], ["colspan", "11"], [1, "row-vr-section"], [1, "col-concept-bold"], [1, "col-pct-vr"], [1, "thick-footer-line"], [1, "sheet-considerations"], [1, "considerations-header"], [1, "considerations-bullet-list"], [1, "sheet-footer-slogan"], [1, "btn", "btn-primary", 3, "click"], ["d", "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"], ["points", "17 21 17 13 7 13 7 21"], ["points", "7 3 7 8 15 8"]], template: function QuoteBreakdownComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275template(0, QuoteBreakdownComponent_div_0_Template, 403, 223, "div", 0);
    }
    if (rf & 2) {
      \u0275\u0275property("ngIf", ctx.calculation);
    }
  }, dependencies: [CommonModule, NgIf, DecimalPipe, DatePipe], styles: ['\n.quote-document-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n  width: 100%;\n}\n.document-action-bar[_ngcontent-%COMP%] {\n  background: var(--%NS%surface-card);\n  border: 1px solid var(--%NS%border-color);\n  border-radius: 14px;\n  padding: 1rem 1.25rem;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  box-shadow: 0 4px 12px var(--%NS%shadow-soft);\n}\n.action-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.action-badge[_ngcontent-%COMP%] {\n  font-family: "Fjalla One", sans-serif;\n  font-size: 1.05rem;\n  color: var(--%NS%accent-green-dark);\n  letter-spacing: 0.5px;\n}\n.action-desc[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: var(--%NS%text-muted);\n}\n.action-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.75rem;\n}\n.btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.6rem 1.1rem;\n  border-radius: 8px;\n  font-size: 0.85rem;\n  font-weight: 700;\n  cursor: pointer;\n  border: none;\n  transition: all 0.2s ease;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      var(--%NS%accent-green-dark) 0%,\n      var(--%NS%accent-green) 100%);\n  color: var(--%NS%text-on-accent);\n  box-shadow: 0 4px 12px rgba(32, 176, 56, 0.35);\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  background: var(--%NS%surface-card);\n  color: var(--%NS%text-main);\n  font-weight: 800;\n  border: 1px solid var(--%NS%border-strong);\n  box-shadow: 0 2px 6px var(--%NS%shadow-soft);\n}\n.btn-secondary[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%surface-subtle);\n}\n.sheet-scroll-container[_ngcontent-%COMP%] {\n  width: 100%;\n  overflow-x: auto;\n  border-radius: 8px;\n}\n.official-sheet[_ngcontent-%COMP%] {\n  background: #ffffff;\n  color: #000000;\n  font-family:\n    Arial,\n    Helvetica,\n    sans-serif;\n  padding: 2.25rem 2.5rem;\n  border-radius: 8px;\n  border: 1px solid #e2e8f0;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);\n  width: 100%;\n  min-width: 720px;\n  max-width: 1000px;\n  margin: 0 auto;\n  box-sizing: border-box;\n}\n.sheet-top-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-end;\n  padding-bottom: 0.3rem;\n}\n.sheet-main-title[_ngcontent-%COMP%] {\n  font-family:\n    Arial,\n    Helvetica,\n    sans-serif;\n  font-size: 1.45rem;\n  font-weight: 900;\n  color: #000000;\n  margin: 0;\n  letter-spacing: 0.5px;\n}\n.sheet-date[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 700;\n  color: #000000;\n}\n.thick-header-line[_ngcontent-%COMP%] {\n  height: 3px;\n  background-color: #000000;\n  margin-bottom: 1rem;\n}\n.meta-grid-section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  margin-bottom: 1rem;\n  font-size: 0.9rem;\n}\n.meta-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n}\n.meta-group[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.35rem;\n}\n.flex-1[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.flex-2[_ngcontent-%COMP%] {\n  flex: 2;\n}\n.flex-3[_ngcontent-%COMP%] {\n  flex: 3;\n}\n.flex-4[_ngcontent-%COMP%] {\n  flex: 4;\n}\n.meta-label-cell[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #000000;\n  font-weight: 500;\n  white-space: nowrap;\n}\n.meta-value-cell[_ngcontent-%COMP%] {\n  background-color: #e5e7eb;\n  border: 1px solid #9ca3af;\n  padding: 0.25rem 0.6rem;\n  font-size: 0.9rem;\n  font-weight: 700;\n  color: #000000;\n  min-height: 20px;\n}\n.full-val[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.center-text[_ngcontent-%COMP%] {\n  text-align: center;\n  width: 100%;\n}\n.uppercase-text[_ngcontent-%COMP%] {\n  text-transform: uppercase;\n}\n.prefix-symbol[_ngcontent-%COMP%] {\n  background-color: #e5e7eb;\n  border: 1px solid #9ca3af;\n  border-right: none;\n  padding: 0.25rem 0.4rem;\n  font-weight: 700;\n}\n.price-val[_ngcontent-%COMP%] {\n  border-left: none;\n  width: 130px;\n  text-align: right;\n}\n.detail-header[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n}\n.btn-back[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  color: #15803d;\n  font-weight: 700;\n  text-decoration: none;\n  background: var(--%NS%accent-green-light);\n  padding: 0.4rem 1rem;\n  border-radius: 8px;\n  border: 1px solid rgba(139, 226, 140, 0.4);\n  cursor: pointer;\n  transition: 0.2s;\n}\n.btn-back[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%accent-green-light);\n}\n.meta-unit-cell[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  margin-left: 0.2rem;\n}\n.financial-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.875rem;\n  color: #000000;\n  table-layout: fixed;\n}\n.table-brand-header-row[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding-bottom: 0.75rem;\n  border: none;\n  vertical-align: bottom;\n}\n.th-brand-cell[_ngcontent-%COMP%] {\n  text-align: left;\n  width: 34%;\n}\n.brand-plazo-block[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-end;\n  gap: 1.25rem;\n}\n.sheet-logo-img[_ngcontent-%COMP%] {\n  height: 65px;\n  width: auto;\n  object-fit: contain;\n}\n.plazo-box[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  font-size: 1rem;\n}\n.plazo-title[_ngcontent-%COMP%] {\n  font-weight: 500;\n}\n.plazo-number[_ngcontent-%COMP%] {\n  background-color: #e5e7eb;\n  border: 1px solid #9ca3af;\n  padding: 0.15rem 0.6rem;\n  font-weight: 700;\n}\n.plazo-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n}\n.opt-header-th[_ngcontent-%COMP%] {\n  width: 22%;\n  text-align: center;\n  font-family:\n    Arial,\n    Helvetica,\n    sans-serif;\n  font-weight: 900;\n  font-size: 1.05rem;\n  color: #000000;\n}\n.financial-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 0.22rem 0.15rem;\n  vertical-align: middle;\n}\n.col-concept[_ngcontent-%COMP%] {\n  font-weight: 400;\n  color: #000000;\n  width: 30%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.col-concept-bold[_ngcontent-%COMP%] {\n  font-weight: 900;\n  font-size: 0.975rem;\n  color: #000000;\n  width: 30%;\n}\n.col-pct[_ngcontent-%COMP%] {\n  background-color: #e5e7eb;\n  border: 1px solid #d1d5db;\n  text-align: center;\n  font-weight: 700;\n  font-size: 0.8rem;\n  width: 4%;\n}\n.col-pct-vr[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 0.875rem;\n  text-align: right;\n  padding-right: 0.4rem;\n  width: 4%;\n}\n.col-sym[_ngcontent-%COMP%] {\n  text-align: right;\n  padding-right: 0.15rem;\n  width: 3%;\n}\n.col-sym-bold[_ngcontent-%COMP%] {\n  text-align: right;\n  padding-right: 0.15rem;\n  font-weight: 900;\n  font-size: 1rem;\n  width: 3%;\n}\n.col-val[_ngcontent-%COMP%] {\n  text-align: right;\n  padding-right: 0.75rem;\n  width: 15%;\n  font-family:\n    Arial,\n    Helvetica,\n    sans-serif;\n}\n.col-val-bold[_ngcontent-%COMP%] {\n  text-align: right;\n  padding-right: 0.75rem;\n  font-weight: 900;\n  font-size: 1.05rem;\n  width: 15%;\n  font-family:\n    Arial,\n    Helvetica,\n    sans-serif;\n}\n.row-subtotal[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding-top: 0.35rem;\n}\n.row-total-section[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding-top: 0.35rem;\n  padding-bottom: 0.35rem;\n  border-top: 2px solid #000000;\n  border-bottom: 2px solid #000000;\n}\n.row-vr-section[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n}\n.spacer-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  height: 10px;\n}\n.thick-footer-line[_ngcontent-%COMP%] {\n  height: 3px;\n  background-color: #000000;\n  margin-top: 0.85rem;\n  margin-bottom: 0.65rem;\n}\n.sheet-considerations[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #000000;\n  line-height: 1.35;\n  margin-bottom: 1.25rem;\n}\n.considerations-header[_ngcontent-%COMP%] {\n  font-weight: 700;\n  margin-bottom: 0.2rem;\n}\n.considerations-bullet-list[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n.considerations-bullet-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin-bottom: 0.12rem;\n}\n.sheet-footer-slogan[_ngcontent-%COMP%] {\n  text-align: center;\n  font-family:\n    Arial,\n    Helvetica,\n    sans-serif;\n  font-size: 1rem;\n  font-weight: 900;\n  letter-spacing: 1px;\n  color: #000000;\n  margin-top: 1rem;\n  text-transform: uppercase;\n}\n@media (max-width: 1024px) {\n  .official-sheet[_ngcontent-%COMP%] {\n    padding: 2rem 1.75rem;\n  }\n  .brand-plazo-block[_ngcontent-%COMP%] {\n    gap: 0.9rem;\n  }\n}\n@media (max-width: 768px) {\n  .document-action-bar[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n    gap: 0.85rem;\n    padding: 0.9rem 1rem;\n  }\n  .action-info[_ngcontent-%COMP%] {\n    text-align: center;\n  }\n  .action-buttons[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 0.5rem;\n  }\n  .action-buttons[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n    min-height: 44px;\n  }\n  .detail-header[_ngcontent-%COMP%] {\n    margin-bottom: 1rem;\n  }\n  .btn-back[_ngcontent-%COMP%] {\n    min-height: 40px;\n    justify-content: center;\n    width: 100%;\n  }\n  .official-sheet[_ngcontent-%COMP%] {\n    padding: 1.5rem 1.25rem;\n  }\n  .sheet-main-title[_ngcontent-%COMP%] {\n    font-size: 1.2rem;\n  }\n  .sheet-date[_ngcontent-%COMP%] {\n    font-size: 0.95rem;\n  }\n  .sheet-logo-img[_ngcontent-%COMP%] {\n    height: 50px;\n  }\n  .plazo-box[_ngcontent-%COMP%] {\n    font-size: 0.85rem;\n  }\n}\n@media (max-width: 480px) {\n  .sheet-top-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.4rem;\n  }\n  .sheet-scroll-container[_ngcontent-%COMP%] {\n    border-radius: 8px;\n  }\n  .official-sheet[_ngcontent-%COMP%] {\n    padding: 1.25rem 1rem;\n  }\n  .financial-table[_ngcontent-%COMP%] {\n    font-size: 0.8rem;\n  }\n  .opt-header-th[_ngcontent-%COMP%] {\n    font-size: 0.9rem;\n  }\n  .meta-label-cell[_ngcontent-%COMP%] {\n    font-size: 0.78rem;\n  }\n}\n/*# sourceMappingURL=quote-breakdown.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(QuoteBreakdownComponent, [{
    type: Component,
    args: [{ selector: "app-quote-breakdown", standalone: true, imports: [CommonModule], template: `<div class="quote-document-wrapper" *ngIf="calculation; let calc">\r
\r
    <!-- Barra de acciones del documento -->\r
    <div class="document-action-bar">\r
        <div class="action-info">\r
            <span class="action-badge">Hoja Oficial de Cotizaci\xF3n (Formato PDF)</span>\r
            <span class="action-desc">Muestra el desglose simult\xE1neo de las 3 Opciones</span>\r
        </div>\r
        <div class="action-buttons">\r
            <button class="btn btn-primary" (click)="downloadPDF()" [disabled]="isDownloading()">\r
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"\r
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\r
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />\r
                    <polyline points="7 10 12 15 17 10" />\r
                    <line x1="12" y1="15" x2="12" y2="3" />\r
                </svg>\r
                {{ isDownloading() ? 'Generando PDF...' : 'Descargar PDF' }}\r
            </button>\r
            <button *ngIf="mostrarGuardar" class="btn btn-primary" (click)="onSaveQuote()">\r
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"\r
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\r
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />\r
                    <polyline points="17 21 17 13 7 13 7 21" />\r
                    <polyline points="7 3 7 8 15 8" />\r
                </svg>\r
                Guardar Cotizaci\xF3n\r
            </button>\r
        </div>\r
    </div>\r
\r
    <!-- Printable Official Sheet Container -->\r
    <div class="sheet-scroll-container">\r
        <div class="official-sheet" id="official-pdf-sheet">\r
\r
            <!-- Top Header -->\r
            <div class="sheet-top-header">\r
                <h1 class="sheet-main-title">ARRENDAMIENTO PURO</h1>\r
                <span class="sheet-date">{{ sheetDate | date: 'dd/MM/yyyy' }}</span>\r
            </div>\r
\r
            <div class="thick-header-line"></div>\r
\r
            <!-- Vehicle Meta Data Grid -->\r
            <div class="meta-grid-section">\r
                <div class="meta-row row-1">\r
                    <div class="meta-label-cell">Atenci\xF3n a</div>\r
                    <div class="meta-value-cell full-val">{{ calc.input.clientName || '' }}</div>\r
                </div>\r
\r
                <div class="meta-row row-2">\r
                    <div class="meta-group flex-2">\r
                        <span class="meta-label-cell">Marca</span>\r
                        <span class="meta-value-cell center-text">{{ calc.input.brand }}</span>\r
                    </div>\r
                    <div class="meta-group flex-3">\r
                        <span class="meta-label-cell">Modelo</span>\r
                        <span class="meta-value-cell center-text">{{ calc.input.model }}</span>\r
                    </div>\r
                    <div class="meta-group flex-1">\r
                        <span class="meta-label-cell">A\xF1o</span>\r
                        <span class="meta-value-cell center-text">{{ calc.input.year }}</span>\r
                    </div>\r
                </div>\r
\r
                <div class="meta-row row-3">\r
                    <div class="meta-group flex-4">\r
                        <span class="meta-label-cell">Precio Neto</span>\r
                        <span class="meta-value-cell prefix-symbol">$</span>\r
                        <span class="meta-value-cell price-val">{{ calc.input.priceNet | number:'1.2-2' }}</span>\r
                        <span class="meta-unit-cell">Pesos MN</span>\r
                    </div>\r
                    <div class="meta-group flex-3">\r
                        <span class="meta-label-cell">\xBFEs HIBRIDO O ELECTRICO?</span>\r
                        <span class="meta-value-cell center-text uppercase-text">{{ calc.input.isHybridOrElectric ? 'SI'\r
                            : 'NO' }}</span>\r
                    </div>\r
                </div>\r
            </div>\r
\r
            <div class="thick-header-line"></div>\r
\r
            <!-- Main Financial Calculation Table -->\r
            <table class="financial-table">\r
                <thead>\r
                    <tr class="table-brand-header-row">\r
                        <th colspan="2" class="th-brand-cell">\r
                            <div class="brand-plazo-block">\r
                                <img src="https://img1.wsimg.com/isteam/ip/b2c8c497-599d-4df4-9ab6-2aaaf690a095/LOGO%20GOLEASE%20SIN%20FONDO.png"\r
                                    alt="Go Lease Logo" class="sheet-logo-img" />\r
                                <div class="plazo-box">\r
                                    <span class="plazo-title">Plazo</span>\r
                                    <span class="plazo-number">{{ calc.input.termMonths }}</span>\r
                                    <span class="plazo-label">Meses</span>\r
                                </div>\r
                            </div>\r
                        </th>\r
                        <th colspan="3" class="opt-header-th">OPCION 1</th>\r
                        <th colspan="3" class="opt-header-th">OPCION 2</th>\r
                        <th colspan="3" class="opt-header-th">OPCION 3</th>\r
                    </tr>\r
                </thead>\r
                <tbody>\r
                    <!-- Desembolso inicial \xFAnico Section -->\r
                    <tr>\r
                        <td class="col-concept">Renta Extraordinaria</td>\r
                        <td class="col-pct">{{ (opt1.initialCosts.extraordinaryRentPct * 100) | number:'1.0-0' }}%</td>\r
                        <td class="col-sym">$</td>\r
                        <td class="col-val">{{ opt1.initialCosts.extraordinaryRentNoIva | number:'1.0-0' }}</td>\r
                        <td class="col-pct">{{ (opt2.initialCosts.extraordinaryRentPct * 100) | number:'1.0-0' }}%</td>\r
                        <td class="col-sym">$</td>\r
                        <td class="col-val">{{ opt2.initialCosts.extraordinaryRentNoIva | number:'1.0-0' }}</td>\r
                        <td class="col-pct">{{ (opt3.initialCosts.extraordinaryRentPct * 100) | number:'1.0-0' }}%</td>\r
                        <td class="col-sym">$</td>\r
                        <td class="col-val">{{ opt3.initialCosts.extraordinaryRentNoIva | number:'1.0-0' }}</td>\r
                    </tr>\r
\r
                    <tr>\r
                        <td class="col-concept" colspan="2">Gastos Administrativos</td>\r
                        <td class="col-sym">$</td>\r
                        <td class="col-val">{{ opt1.initialCosts.adminFeeInitialNet | number:'1.0-0' }}</td>\r
                        <td class="col-sym" colspan="2">$</td>\r
                        <td class="col-val">{{ opt2.initialCosts.adminFeeInitialNet | number:'1.0-0' }}</td>\r
                        <td class="col-sym" colspan="2">$</td>\r
                        <td class="col-val">{{ opt3.initialCosts.adminFeeInitialNet | number:'1.0-0' }}</td>\r
                    </tr>\r
\r
                    <tr>\r
                        <td class="col-concept">Asesoria y gesti\xF3n Go Lease</td>\r
                        <td class="col-pct">2%</td>\r
                        <td class="col-sym">$</td>\r
                        <td class="col-val">{{ opt1.initialCosts.advisoryFeeNoIva | number:'1.0-0' }}</td>\r
                        <td class="col-pct">2%</td>\r
                        <td class="col-sym">$</td>\r
                        <td class="col-val">{{ opt2.initialCosts.advisoryFeeNoIva | number:'1.0-0' }}</td>\r
                        <td class="col-pct">2%</td>\r
                        <td class="col-sym">$</td>\r
                        <td class="col-val">{{ opt3.initialCosts.advisoryFeeNoIva | number:'1.0-0' }}</td>\r
                    </tr>\r
\r
                    <tr>\r
                        <td class="col-concept" colspan="2">{{ getPlateLabel() }}</td>\r
                        <td class="col-sym">$</td>\r
                        <td class="col-val">{{ opt1.initialCosts.plateRegistrationNoIva > 0 ?\r
                            (opt1.initialCosts.plateRegistrationNoIva | number:'1.0-0') : '-' }}</td>\r
                        <td class="col-sym" colspan="2">$</td>\r
                        <td class="col-val">{{ opt2.initialCosts.plateRegistrationNoIva > 0 ?\r
                            (opt2.initialCosts.plateRegistrationNoIva | number:'1.0-0') : '-' }}</td>\r
                        <td class="col-sym" colspan="2">$</td>\r
                        <td class="col-val">{{ opt3.initialCosts.plateRegistrationNoIva > 0 ?\r
                            (opt3.initialCosts.plateRegistrationNoIva | number:'1.0-0') : '-' }}</td>\r
                    </tr>\r
\r
                    <tr>\r
                        <td class="col-concept" colspan="2">{{ opt1.initialCosts.insuranceNoIva > 0 ? 'Costo anual de\r
                            seguro estimado' : 'Seguro pendiente x cotizar' }}</td>\r
                        <td class="col-sym">$</td>\r
                        <td class="col-val">{{ opt1.initialCosts.insuranceNoIva > 0 ? (opt1.initialCosts.insuranceNoIva\r
                            | number:'1.0-0') : '-' }}</td>\r
                        <td class="col-sym" colspan="2">$</td>\r
                        <td class="col-val">{{ opt2.initialCosts.insuranceNoIva > 0 ? (opt2.initialCosts.insuranceNoIva\r
                            | number:'1.0-0') : '-' }}</td>\r
                        <td class="col-sym" colspan="2">$</td>\r
                        <td class="col-val">{{ opt3.initialCosts.insuranceNoIva > 0 ? (opt3.initialCosts.insuranceNoIva\r
                            | number:'1.0-0') : '-' }}</td>\r
                    </tr>\r
\r
                    <tr class="row-subtotal">\r
                        <td class="col-concept" colspan="2">Subtotal</td>\r
                        <td class="col-sym">$</td>\r
                        <td class="col-val">{{ opt1.initialCosts.subtotalNoIva | number:'1.0-0' }}</td>\r
                        <td class="col-sym" colspan="2">$</td>\r
                        <td class="col-val">{{ opt2.initialCosts.subtotalNoIva | number:'1.0-0' }}</td>\r
                        <td class="col-sym" colspan="2">$</td>\r
                        <td class="col-val">{{ opt3.initialCosts.subtotalNoIva | number:'1.0-0' }}</td>\r
                    </tr>\r
\r
                    <tr class="row-iva">\r
                        <td class="col-concept" colspan="2">IVA</td>\r
                        <td class="col-sym">$</td>\r
                        <td class="col-val">{{ opt1.initialCosts.ivaAmount | number:'1.0-0' }}</td>\r
                        <td class="col-sym" colspan="2">$</td>\r
                        <td class="col-val">{{ opt2.initialCosts.ivaAmount | number:'1.0-0' }}</td>\r
                        <td class="col-sym" colspan="2">$</td>\r
                        <td class="col-val">{{ opt3.initialCosts.ivaAmount | number:'1.0-0' }}</td>\r
                    </tr>\r
\r
                    <tr class="row-total-section">\r
                        <td class="col-concept-bold" colspan="2">Desembolso inicial \xFAnico</td>\r
                        <td class="col-sym-bold">$</td>\r
                        <td class="col-val-bold">{{ opt1.initialCosts.totalInitialPayment | number:'1.0-0' }}</td>\r
                        <td class="col-sym-bold" colspan="2">$</td>\r
                        <td class="col-val-bold">{{ opt2.initialCosts.totalInitialPayment | number:'1.0-0' }}</td>\r
                        <td class="col-sym-bold" colspan="2">$</td>\r
                        <td class="col-val-bold">{{ opt3.initialCosts.totalInitialPayment | number:'1.0-0' }}</td>\r
                    </tr>\r
\r
                    <!-- Spacer Row -->\r
                    <tr class="spacer-row">\r
                        <td colspan="11"></td>\r
                    </tr>\r
\r
                    <!-- Renta mensual neta Section -->\r
                    <tr>\r
                        <td class="col-concept" colspan="2">Renta mensual b\xE1sica</td>\r
                        <td class="col-sym">$</td>\r
                        <td class="col-val">{{ opt1.monthlyCosts.basicRentNoIva | number:'1.0-0' }}</td>\r
                        <td class="col-sym" colspan="2">$</td>\r
                        <td class="col-val">{{ opt2.monthlyCosts.basicRentNoIva | number:'1.0-0' }}</td>\r
                        <td class="col-sym" colspan="2">$</td>\r
                        <td class="col-val">{{ opt3.monthlyCosts.basicRentNoIva | number:'1.0-0' }}</td>\r
                    </tr>\r
\r
                    <tr>\r
                        <td class="col-concept" colspan="2">Gastos Admon de Flotilla</td>\r
                        <td class="col-sym">$</td>\r
                        <td class="col-val">{{ opt1.monthlyCosts.fleetManagementFeeNoIva | number:'1.0-0' }}</td>\r
                        <td class="col-sym" colspan="2">$</td>\r
                        <td class="col-val">{{ opt2.monthlyCosts.fleetManagementFeeNoIva | number:'1.0-0' }}</td>\r
                        <td class="col-sym" colspan="2">$</td>\r
                        <td class="col-val">{{ opt3.monthlyCosts.fleetManagementFeeNoIva | number:'1.0-0' }}</td>\r
                    </tr>\r
\r
                    <tr>\r
                        <td class="col-concept" colspan="2">Gastos Administrativos</td>\r
                        <td class="col-sym">$</td>\r
                        <td class="col-val">{{ opt1.monthlyCosts.adminManagementFeeNoIva | number:'1.0-0' }}</td>\r
                        <td class="col-sym" colspan="2">$</td>\r
                        <td class="col-val">{{ opt2.monthlyCosts.adminManagementFeeNoIva | number:'1.0-0' }}</td>\r
                        <td class="col-sym" colspan="2">$</td>\r
                        <td class="col-val">{{ opt3.monthlyCosts.adminManagementFeeNoIva | number:'1.0-0' }}</td>\r
                    </tr>\r
\r
                    <tr class="row-subtotal">\r
                        <td class="col-concept" colspan="2">Subtotal</td>\r
                        <td class="col-sym">$</td>\r
                        <td class="col-val">{{ opt1.monthlyCosts.subtotalNoIva | number:'1.0-0' }}</td>\r
                        <td class="col-sym" colspan="2">$</td>\r
                        <td class="col-val">{{ opt2.monthlyCosts.subtotalNoIva | number:'1.0-0' }}</td>\r
                        <td class="col-sym" colspan="2">$</td>\r
                        <td class="col-val">{{ opt3.monthlyCosts.subtotalNoIva | number:'1.0-0' }}</td>\r
                    </tr>\r
\r
                    <tr class="row-iva">\r
                        <td class="col-concept" colspan="2">IVA</td>\r
                        <td class="col-sym">$</td>\r
                        <td class="col-val">{{ opt1.monthlyCosts.ivaAmount | number:'1.0-0' }}</td>\r
                        <td class="col-sym" colspan="2">$</td>\r
                        <td class="col-val">{{ opt2.monthlyCosts.ivaAmount | number:'1.0-0' }}</td>\r
                        <td class="col-sym" colspan="2">$</td>\r
                        <td class="col-val">{{ opt3.monthlyCosts.ivaAmount | number:'1.0-0' }}</td>\r
                    </tr>\r
\r
                    <tr class="row-total-section">\r
                        <td class="col-concept-bold" colspan="2">Renta mensual neta</td>\r
                        <td class="col-sym-bold">$</td>\r
                        <td class="col-val-bold">{{ opt1.monthlyCosts.totalMonthlyRentNet | number:'1.0-0' }}</td>\r
                        <td class="col-sym-bold" colspan="2">$</td>\r
                        <td class="col-val-bold">{{ opt2.monthlyCosts.totalMonthlyRentNet | number:'1.0-0' }}</td>\r
                        <td class="col-sym-bold" colspan="2">$</td>\r
                        <td class="col-val-bold">{{ opt3.monthlyCosts.totalMonthlyRentNet | number:'1.0-0' }}</td>\r
                    </tr>\r
\r
                    <!-- Spacer Row -->\r
                    <tr class="spacer-row">\r
                        <td colspan="11"></td>\r
                    </tr>\r
\r
                    <!-- Valor residual Section -->\r
                    <tr class="row-vr-section">\r
                        <td class="col-concept-bold">Valor residual Neto</td>\r
                        <td class="col-pct-vr">{{ opt1.residualValue.percentage * 100 | number:'1.0-1' }}%</td>\r
                        <td class="col-sym-bold">$</td>\r
                        <td class="col-val-bold">{{ opt1.residualValue.valueNet | number:'1.0-0' }}</td>\r
                        <td class="col-pct-vr">{{ opt2.residualValue.percentage * 100 | number:'1.0-1' }}%</td>\r
                        <td class="col-sym-bold">$</td>\r
                        <td class="col-val-bold">{{ opt2.residualValue.valueNet | number:'1.0-0' }}</td>\r
                        <td class="col-pct-vr">{{ opt3.residualValue.percentage * 100 | number:'1.0-1' }}%</td>\r
                        <td class="col-sym-bold">$</td>\r
                        <td class="col-val-bold">{{ opt3.residualValue.valueNet | number:'1.0-0' }}</td>\r
                    </tr>\r
\r
                </tbody>\r
            </table>\r
\r
            <!-- Considerations Footer Block -->\r
            <div class="thick-footer-line"></div>\r
\r
            <div class="sheet-considerations">\r
                <div class="considerations-header">Consideraciones:</div>\r
                <ul class="considerations-bullet-list">\r
                    <li>* Cotizaci\xF3n sujeta a cambios sin previo aviso. Vigencia 7 d\xEDas a partir de su elaboraci\xF3n.</li>\r
                    <li>* Las Rentas Extraordinarias son como un enganche 100% deducible y se pueden modificar para\r
                        ajustarse a su presupuesto.</li>\r
                    <li>* Las Rentas mensuales son 100% deducibles por los conceptos con que se emite y no solo por los\r
                        que dicta la Ley de ISR.</li>\r
                    <li>* Opci\xF3n de contar con placas de otros Estados para ahorrar el pago de tenencias.</li>\r
                    <li>* Los costos de placas podr\xEDan ser ajustados, en caso de aplicar pago de tenencias y/o derechos.\r
                    </li>\r
                    <li>* Al finalizar el plazo puedes: Regresarlo / Adquirirlo / Renovarlo por uno nuevo / Te lo\r
                        compramos para que obtengas una ganancia extra.</li>\r
                    <li>* La asesoria y gesti\xF3n operativa de Go Lease deber\xE1 ser cubierta previa a la elaboraci\xF3n de\r
                        contratos.</li>\r
                </ul>\r
            </div>\r
\r
            <div class="sheet-footer-slogan">\r
                <span>TENEMOS CONVENIOS CON TODAS LAS MARCAS</span>\r
            </div>\r
\r
        </div>\r
    </div>\r
</div>\r
`, styles: ['/* src/app/components/quote-breakdown/quote-breakdown.component.css */\n.quote-document-wrapper {\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n  width: 100%;\n}\n.document-action-bar {\n  background: var(--surface-card);\n  border: 1px solid var(--border-color);\n  border-radius: 14px;\n  padding: 1rem 1.25rem;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  box-shadow: 0 4px 12px var(--shadow-soft);\n}\n.action-info {\n  display: flex;\n  flex-direction: column;\n}\n.action-badge {\n  font-family: "Fjalla One", sans-serif;\n  font-size: 1.05rem;\n  color: var(--accent-green-dark);\n  letter-spacing: 0.5px;\n}\n.action-desc {\n  font-size: 0.8rem;\n  color: var(--text-muted);\n}\n.action-buttons {\n  display: flex;\n  gap: 0.75rem;\n}\n.btn {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.6rem 1.1rem;\n  border-radius: 8px;\n  font-size: 0.85rem;\n  font-weight: 700;\n  cursor: pointer;\n  border: none;\n  transition: all 0.2s ease;\n}\n.btn-primary {\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-green-dark) 0%,\n      var(--accent-green) 100%);\n  color: var(--text-on-accent);\n  box-shadow: 0 4px 12px rgba(32, 176, 56, 0.35);\n}\n.btn-secondary {\n  background: var(--surface-card);\n  color: var(--text-main);\n  font-weight: 800;\n  border: 1px solid var(--border-strong);\n  box-shadow: 0 2px 6px var(--shadow-soft);\n}\n.btn-secondary:hover {\n  background: var(--surface-subtle);\n}\n.sheet-scroll-container {\n  width: 100%;\n  overflow-x: auto;\n  border-radius: 8px;\n}\n.official-sheet {\n  background: #ffffff;\n  color: #000000;\n  font-family:\n    Arial,\n    Helvetica,\n    sans-serif;\n  padding: 2.25rem 2.5rem;\n  border-radius: 8px;\n  border: 1px solid #e2e8f0;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);\n  width: 100%;\n  min-width: 720px;\n  max-width: 1000px;\n  margin: 0 auto;\n  box-sizing: border-box;\n}\n.sheet-top-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-end;\n  padding-bottom: 0.3rem;\n}\n.sheet-main-title {\n  font-family:\n    Arial,\n    Helvetica,\n    sans-serif;\n  font-size: 1.45rem;\n  font-weight: 900;\n  color: #000000;\n  margin: 0;\n  letter-spacing: 0.5px;\n}\n.sheet-date {\n  font-size: 1.1rem;\n  font-weight: 700;\n  color: #000000;\n}\n.thick-header-line {\n  height: 3px;\n  background-color: #000000;\n  margin-bottom: 1rem;\n}\n.meta-grid-section {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  margin-bottom: 1rem;\n  font-size: 0.9rem;\n}\n.meta-row {\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n}\n.meta-group {\n  display: flex;\n  align-items: center;\n  gap: 0.35rem;\n}\n.flex-1 {\n  flex: 1;\n}\n.flex-2 {\n  flex: 2;\n}\n.flex-3 {\n  flex: 3;\n}\n.flex-4 {\n  flex: 4;\n}\n.meta-label-cell {\n  font-size: 0.85rem;\n  color: #000000;\n  font-weight: 500;\n  white-space: nowrap;\n}\n.meta-value-cell {\n  background-color: #e5e7eb;\n  border: 1px solid #9ca3af;\n  padding: 0.25rem 0.6rem;\n  font-size: 0.9rem;\n  font-weight: 700;\n  color: #000000;\n  min-height: 20px;\n}\n.full-val {\n  flex: 1;\n}\n.center-text {\n  text-align: center;\n  width: 100%;\n}\n.uppercase-text {\n  text-transform: uppercase;\n}\n.prefix-symbol {\n  background-color: #e5e7eb;\n  border: 1px solid #9ca3af;\n  border-right: none;\n  padding: 0.25rem 0.4rem;\n  font-weight: 700;\n}\n.price-val {\n  border-left: none;\n  width: 130px;\n  text-align: right;\n}\n.detail-header {\n  margin-bottom: 1.5rem;\n}\n.btn-back {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  color: #15803d;\n  font-weight: 700;\n  text-decoration: none;\n  background: var(--accent-green-light);\n  padding: 0.4rem 1rem;\n  border-radius: 8px;\n  border: 1px solid rgba(139, 226, 140, 0.4);\n  cursor: pointer;\n  transition: 0.2s;\n}\n.btn-back:hover {\n  background: var(--accent-green-light);\n}\n.meta-unit-cell {\n  font-size: 0.85rem;\n  margin-left: 0.2rem;\n}\n.financial-table {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.875rem;\n  color: #000000;\n  table-layout: fixed;\n}\n.table-brand-header-row th {\n  padding-bottom: 0.75rem;\n  border: none;\n  vertical-align: bottom;\n}\n.th-brand-cell {\n  text-align: left;\n  width: 34%;\n}\n.brand-plazo-block {\n  display: flex;\n  align-items: flex-end;\n  gap: 1.25rem;\n}\n.sheet-logo-img {\n  height: 65px;\n  width: auto;\n  object-fit: contain;\n}\n.plazo-box {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  font-size: 1rem;\n}\n.plazo-title {\n  font-weight: 500;\n}\n.plazo-number {\n  background-color: #e5e7eb;\n  border: 1px solid #9ca3af;\n  padding: 0.15rem 0.6rem;\n  font-weight: 700;\n}\n.plazo-label {\n  font-weight: 500;\n}\n.opt-header-th {\n  width: 22%;\n  text-align: center;\n  font-family:\n    Arial,\n    Helvetica,\n    sans-serif;\n  font-weight: 900;\n  font-size: 1.05rem;\n  color: #000000;\n}\n.financial-table td {\n  padding: 0.22rem 0.15rem;\n  vertical-align: middle;\n}\n.col-concept {\n  font-weight: 400;\n  color: #000000;\n  width: 30%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.col-concept-bold {\n  font-weight: 900;\n  font-size: 0.975rem;\n  color: #000000;\n  width: 30%;\n}\n.col-pct {\n  background-color: #e5e7eb;\n  border: 1px solid #d1d5db;\n  text-align: center;\n  font-weight: 700;\n  font-size: 0.8rem;\n  width: 4%;\n}\n.col-pct-vr {\n  font-weight: 700;\n  font-size: 0.875rem;\n  text-align: right;\n  padding-right: 0.4rem;\n  width: 4%;\n}\n.col-sym {\n  text-align: right;\n  padding-right: 0.15rem;\n  width: 3%;\n}\n.col-sym-bold {\n  text-align: right;\n  padding-right: 0.15rem;\n  font-weight: 900;\n  font-size: 1rem;\n  width: 3%;\n}\n.col-val {\n  text-align: right;\n  padding-right: 0.75rem;\n  width: 15%;\n  font-family:\n    Arial,\n    Helvetica,\n    sans-serif;\n}\n.col-val-bold {\n  text-align: right;\n  padding-right: 0.75rem;\n  font-weight: 900;\n  font-size: 1.05rem;\n  width: 15%;\n  font-family:\n    Arial,\n    Helvetica,\n    sans-serif;\n}\n.row-subtotal td {\n  padding-top: 0.35rem;\n}\n.row-total-section td {\n  padding-top: 0.35rem;\n  padding-bottom: 0.35rem;\n  border-top: 2px solid #000000;\n  border-bottom: 2px solid #000000;\n}\n.row-vr-section td {\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n}\n.spacer-row td {\n  height: 10px;\n}\n.thick-footer-line {\n  height: 3px;\n  background-color: #000000;\n  margin-top: 0.85rem;\n  margin-bottom: 0.65rem;\n}\n.sheet-considerations {\n  font-size: 0.75rem;\n  color: #000000;\n  line-height: 1.35;\n  margin-bottom: 1.25rem;\n}\n.considerations-header {\n  font-weight: 700;\n  margin-bottom: 0.2rem;\n}\n.considerations-bullet-list {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n.considerations-bullet-list li {\n  margin-bottom: 0.12rem;\n}\n.sheet-footer-slogan {\n  text-align: center;\n  font-family:\n    Arial,\n    Helvetica,\n    sans-serif;\n  font-size: 1rem;\n  font-weight: 900;\n  letter-spacing: 1px;\n  color: #000000;\n  margin-top: 1rem;\n  text-transform: uppercase;\n}\n@media (max-width: 1024px) {\n  .official-sheet {\n    padding: 2rem 1.75rem;\n  }\n  .brand-plazo-block {\n    gap: 0.9rem;\n  }\n}\n@media (max-width: 768px) {\n  .document-action-bar {\n    flex-direction: column;\n    align-items: stretch;\n    gap: 0.85rem;\n    padding: 0.9rem 1rem;\n  }\n  .action-info {\n    text-align: center;\n  }\n  .action-buttons {\n    flex-direction: column;\n    gap: 0.5rem;\n  }\n  .action-buttons .btn {\n    width: 100%;\n    justify-content: center;\n    min-height: 44px;\n  }\n  .detail-header {\n    margin-bottom: 1rem;\n  }\n  .btn-back {\n    min-height: 40px;\n    justify-content: center;\n    width: 100%;\n  }\n  .official-sheet {\n    padding: 1.5rem 1.25rem;\n  }\n  .sheet-main-title {\n    font-size: 1.2rem;\n  }\n  .sheet-date {\n    font-size: 0.95rem;\n  }\n  .sheet-logo-img {\n    height: 50px;\n  }\n  .plazo-box {\n    font-size: 0.85rem;\n  }\n}\n@media (max-width: 480px) {\n  .sheet-top-header {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.4rem;\n  }\n  .sheet-scroll-container {\n    border-radius: 8px;\n  }\n  .official-sheet {\n    padding: 1.25rem 1rem;\n  }\n  .financial-table {\n    font-size: 0.8rem;\n  }\n  .opt-header-th {\n    font-size: 0.9rem;\n  }\n  .meta-label-cell {\n    font-size: 0.78rem;\n  }\n}\n/*# sourceMappingURL=quote-breakdown.component.css.map */\n'] }]
  }], null, { mostrarGuardar: [{
    type: Input
  }], calculation: [{
    type: Input
  }], selectedOptionKey: [{
    type: Input
  }], saveQuote: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(QuoteBreakdownComponent, { className: "QuoteBreakdownComponent", filePath: "src/app/components/quote-breakdown/quote-breakdown.component.ts", lineNumber: 14 });
})();

export {
  QuotesService,
  FinancialCalculatorService,
  QuoteBreakdownComponent
};
//# debugId=8164566b-4a86-52f7-9600-00d78307af3a
//# sourceMappingURL=chunk-EIMVJBOK.js.map
