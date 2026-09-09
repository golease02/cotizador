import {
  QuoteDraftService,
  computeValidUntil
} from "./chunk-FYXOTE3J.js";
import {
  FinancialCalculatorService,
  QuoteBreakdownComponent,
  QuotesService
} from "./chunk-EIMVJBOK.js";
import {
  CatalogService
} from "./chunk-ZZO2EEQW.js";
import "./chunk-WDXLETH5.js";
import {
  ToastService
} from "./chunk-74RWLUMR.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  MaxValidator,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgSelectOption,
  NumberValueAccessor,
  RangeValueAccessor,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-MVJCDSIT.js";
import {
  RouterLink,
  RouterModule
} from "./chunk-UUNAMTTY.js";
import {
  AuthService
} from "./chunk-XCV63D25.js";
import {
  CommonModule,
  Component,
  CurrencyPipe,
  DecimalPipe,
  EventEmitter,
  Input,
  NgForOf,
  NgIf,
  Output,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵcontrol,
  ɵɵcontrolCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵpipeBind4,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-6KRTW2LJ.js";
import "./chunk-FDMHZOCR.js";

// src/app/components/quote-form/price-format.ts
function formatPrice(value) {
  const s = String(value).trim();
  if (!s) {
    return "";
  }
  const normalized = s.replace(",", ".");
  const [intPart, decPart] = normalized.split(".");
  const intDigits = intPart.replace(/\D/g, "");
  const decDigits = decPart ? decPart.replace(/\D/g, "") : "";
  if (!intDigits && !decDigits) {
    return "";
  }
  const grouped = intDigits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return decDigits ? `${grouped},${decDigits}` : grouped;
}

// src/app/components/quote-form/quote-form.component.ts
var _c0 = () => [12, 24, 36, 48];
var _c1 = () => [0.1, 0.15, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7];
var _c2 = () => [0, 0.05, 0.1];
function QuoteFormComponent_option_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 43);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const group_r1 = ctx.$implicit;
    \u0275\u0275property("value", group_r1.brand);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(group_r1.brand);
  }
}
function QuoteFormComponent_option_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 43);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "currency");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const v_r2 = ctx.$implicit;
    \u0275\u0275property("value", v_r2.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", v_r2.model, " \u2014 ", \u0275\u0275pipeBind4(2, 3, v_r2.suggestedPriceNet, "MXN", "symbol", "1.0-0"), " ");
  }
}
function QuoteFormComponent_div_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44);
    \u0275\u0275text(1, "Seminuevo (< 2024): IVA al 16% en factura.");
    \u0275\u0275elementEnd();
  }
}
function QuoteFormComponent_option_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 43);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "currency");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r3 = ctx.$implicit;
    \u0275\u0275property("value", p_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", p_r3.name, " (", \u0275\u0275pipeBind4(2, 3, p_r3.costNet, "MXN", "symbol", "1.0-0"), ") ");
  }
}
function QuoteFormComponent_button_72_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 45);
    \u0275\u0275listener("click", function QuoteFormComponent_button_72_Template_button_click_0_listener() {
      const t_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r5 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r5.setTerm(t_r5));
    });
    \u0275\u0275elementStart(1, "span", 46);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 47);
    \u0275\u0275text(4, "Meses");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r5 = ctx.$implicit;
    const ctx_r5 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r5.quoteForm.get("termMonths")?.value === t_r5);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r5);
  }
}
function QuoteFormComponent_div_88_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r5 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r5.extraordinaryRentAdjustmentMessage, " ");
  }
}
function QuoteFormComponent_button_90_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 49);
    \u0275\u0275listener("click", function QuoteFormComponent_button_90_Template_button_click_0_listener() {
      const pct_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r5 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r5.setExtraordinaryRent(pct_r8));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const pct_r8 = ctx.$implicit;
    const ctx_r5 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r5.extraordinaryRentPct === pct_r8);
    \u0275\u0275property("disabled", pct_r8 < ctx_r5.minimumExtraordinaryRentPct || pct_r8 > ctx_r5.maximumExtraordinaryRentPct);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", pct_r8 * 100, "%");
  }
}
function QuoteFormComponent_button_95_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 50);
    \u0275\u0275listener("click", function QuoteFormComponent_button_95_Template_button_click_0_listener() {
      const p_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r5 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r5.setDeposit(p_r10));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r10 = ctx.$implicit;
    const ctx_r5 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r5.quoteForm.get("securityDepositPct")?.value === p_r10);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", p_r10 * 100, "%");
  }
}
var QuoteFormComponent = class _QuoteFormComponent {
  fb = inject(FormBuilder);
  catalog = inject(CatalogService);
  draftService = inject(QuoteDraftService);
  quoteChange = new EventEmitter();
  newQuote = new EventEmitter();
  initialInput = null;
  quoteForm;
  statePlates = [];
  presetVehicles = [];
  presetGroups = [];
  selectedPresetBrand = "";
  formatPrice = formatPrice;
  get filteredPresetVehicles() {
    if (!this.selectedPresetBrand) {
      return this.presetVehicles;
    }
    return this.presetVehicles.filter((v) => v.brand === this.selectedPresetBrand);
  }
  async ngOnInit() {
    this.quoteForm = this.fb.group({
      clientName: [""],
      brand: ["", Validators.required],
      model: ["", Validators.required],
      year: [2026, [Validators.required, Validators.min(2015)]],
      priceNet: [null, [Validators.required, Validators.min(1e4)]],
      isHybridOrElectric: [false],
      termMonths: [48, Validators.required],
      extraordinaryRentPct: [0.1, [Validators.required, Validators.min(0.1)]],
      securityDepositPct: [0],
      selectedStatePlateId: ["pendiente"],
      isInsuranceEstimated: [false]
    });
    await Promise.all([
      this.catalog.loadStatePlates(),
      this.catalog.loadCalculatorConfig()
    ]);
    this.statePlates = this.catalog.getStatePlates().filter((p) => p.disponible !== false);
    this.presetVehicles = await this.catalog.getVehicleCatalog();
    const brandMap = /* @__PURE__ */ new Map();
    for (const v of this.presetVehicles) {
      if (!brandMap.has(v.brand))
        brandMap.set(v.brand, []);
      brandMap.get(v.brand).push(v);
    }
    this.presetGroups = Array.from(brandMap.entries()).map(([brand, vehicles]) => ({ brand, vehicles }));
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
  applyInitialInput() {
    if (!this.initialInput)
      return;
    const input = this.initialInput;
    this.quoteForm.patchValue({
      clientName: input.clientName || "",
      brand: input.brand || "",
      model: input.model || "",
      year: input.year,
      priceNet: input.priceNet,
      isHybridOrElectric: input.isHybridOrElectric,
      termMonths: input.termMonths,
      extraordinaryRentPct: input.extraordinaryRentPct,
      securityDepositPct: input.securityDepositPct || 0,
      selectedStatePlateId: input.selectedStatePlateId || "pendiente",
      isInsuranceEstimated: input.isInsuranceEstimated
    });
    this.quoteForm.updateValueAndValidity();
    this.emitQuoteInput();
    this.draftService.clear();
  }
  get isPreOwned() {
    const y = this.quoteForm.get("year")?.value;
    return y ? y < 2024 : false;
  }
  get vehiclePrice() {
    return Number(this.quoteForm?.get("priceNet")?.value) || 0;
  }
  get priceNetDisplay() {
    const v = this.quoteForm?.get("priceNet")?.value;
    if (v === null || v === void 0 || v === "") {
      return "";
    }
    return formatPrice(String(v));
  }
  get calculatorConfig() {
    return this.catalog.getCalculatorConfig();
  }
  get minimumExtraordinaryRentPct() {
    const config = this.calculatorConfig;
    if (this.vehiclePrice < config.minimumRentThreshold1)
      return config.minimumRentPct1;
    if (this.vehiclePrice < config.minimumRentThreshold2)
      return config.minimumRentPct2;
    return config.minimumRentPct3;
  }
  get maximumExtraordinaryRentPct() {
    const config = this.calculatorConfig;
    return config.maxRentAndResidualPct - config.residualOption1Pct;
  }
  get extraordinaryRentPct() {
    return Number(this.quoteForm?.get("extraordinaryRentPct")?.value) || 0;
  }
  get hasExtraordinaryRentAdjustment() {
    return this.extraordinaryRentPct < this.minimumExtraordinaryRentPct || this.extraordinaryRentPct > this.maximumExtraordinaryRentPct;
  }
  get extraordinaryRentAdjustmentMessage() {
    if (this.extraordinaryRentPct < this.minimumExtraordinaryRentPct) {
      return `La renta se ajustar\xE1 a ${this.minimumExtraordinaryRentPct * 100}% (m\xEDnimo para este precio).`;
    }
    return `La renta se ajustar\xE1 a ${this.maximumExtraordinaryRentPct * 100}% (m\xE1ximo: renta + valor residual no puede superar 75%).`;
  }
  applyPresetVehicle(v) {
    const price = Number(v.suggestedPriceNet) || 0;
    this.quoteForm.patchValue({
      brand: v.brand,
      model: v.model,
      year: v.year,
      priceNet: price,
      isHybridOrElectric: v.isHybridOrElectric
    });
    this.quoteForm.updateValueAndValidity();
    this.emitQuoteInput();
    this.newQuote.emit();
  }
  onBrandSelectChange(event) {
    this.selectedPresetBrand = event.target.value;
  }
  onPresetSelectChange(event) {
    const id = event.target.value;
    if (!id)
      return;
    const vehicle = this.presetVehicles.find((v) => v.id === id);
    if (vehicle)
      this.applyPresetVehicle(vehicle);
    event.target.value = "";
  }
  onPriceNetInput(event) {
    const input = event.target;
    const cleaned = input.value.replace(/[^\d.,]/g, "");
    const commaIdx = cleaned.lastIndexOf(",");
    let intText = cleaned.replace(/[.,]/g, "");
    let decText = "";
    let hasComma = false;
    if (commaIdx !== -1) {
      hasComma = true;
      intText = cleaned.slice(0, commaIdx).replace(/[.,]/g, "");
      decText = cleaned.slice(commaIdx + 1).replace(/\D/g, "");
    }
    const groupedInt = intText.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const display = groupedInt + (hasComma ? "," + decText : "");
    if (input.value !== display) {
      input.value = display;
    }
    let value = null;
    if (intText || decText) {
      value = Number(decText ? `${intText || "0"}.${decText}` : intText);
    }
    const current = this.quoteForm.get("priceNet")?.value;
    if (current !== value) {
      this.quoteForm.patchValue({ priceNet: value });
    }
  }
  setPrice(price) {
    this.quoteForm.patchValue({ priceNet: price });
  }
  setHybrid(isHybrid) {
    this.quoteForm.patchValue({ isHybridOrElectric: isHybrid });
  }
  setTerm(months) {
    this.quoteForm.patchValue({ termMonths: months });
  }
  setExtraordinaryRent(pct) {
    const boundedPct = Math.min(this.maximumExtraordinaryRentPct, Math.max(this.minimumExtraordinaryRentPct, pct));
    this.quoteForm.patchValue({ extraordinaryRentPct: boundedPct });
  }
  setDeposit(depositPct) {
    this.quoteForm.patchValue({ securityDepositPct: depositPct });
  }
  setInsurance(isEstimated) {
    this.quoteForm.patchValue({ isInsuranceEstimated: isEstimated });
  }
  emitQuoteInput() {
    const raw = this.quoteForm.value;
    const priceNet = Number(raw.priceNet) || 0;
    const input = {
      clientName: raw.clientName || "",
      brand: raw.brand || "",
      model: raw.model || "",
      year: Number(raw.year) || 2026,
      priceNet,
      isHybridOrElectric: Boolean(raw.isHybridOrElectric),
      termMonths: Number(raw.termMonths) || 48,
      extraordinaryRentPct: Number(raw.extraordinaryRentPct) || 0.1,
      securityDepositPct: Number(raw.securityDepositPct) || 0,
      selectedStatePlateId: raw.selectedStatePlateId || "pendiente",
      isInsuranceEstimated: Boolean(raw.isInsuranceEstimated)
    };
    this.quoteChange.emit(input);
  }
  static \u0275fac = function QuoteFormComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _QuoteFormComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _QuoteFormComponent, selectors: [["app-quote-form"]], inputs: { initialInput: "initialInput" }, outputs: { quoteChange: "quoteChange", newQuote: "newQuote" }, decls: 104, vars: 40, consts: [[1, "form-card"], [1, "card-header"], [1, "subtitle"], [1, "preset-section"], [1, "preset-label"], [1, "preset-row"], [1, "preset-select", 3, "change"], ["value", "", "disabled", "", "selected", "", "hidden", ""], [3, "value", 4, "ngFor", "ngForOf"], [1, "preset-select", 3, "change", "disabled"], [3, "formGroup"], [1, "form-grid"], [1, "full-width"], ["for", "clientName"], ["id", "clientName", "type", "text", "formControlName", "clientName", "placeholder", "Nombre del cliente"], ["for", "brand"], ["id", "brand", "type", "text", "formControlName", "brand", "placeholder", "Ej. Audi, HINO, Toyota"], ["for", "model"], ["id", "model", "type", "text", "formControlName", "model", "placeholder", "Ej. Q3 Sportback, 616 LONG"], ["for", "year"], ["id", "year", "type", "number", "formControlName", "year", "min", "2015", "max", "2030"], ["class", "warning", 4, "ngIf"], ["for", "selectedStatePlateId"], ["id", "selectedStatePlateId", "formControlName", "selectedStatePlateId"], [1, "full-width", "price-group"], ["for", "priceNet"], [1, "currency-input-wrapper"], [1, "currency-symbol"], ["id", "priceNet", "type", "text", "inputmode", "decimal", "placeholder", "969.900,00", 3, "input", "value"], [1, "quick-amounts"], ["type", "button", 3, "click"], [1, "toggle-group"], ["type", "button", 1, "toggle-btn", 3, "click"], [1, "term-grid"], ["type", "button", "class", "term-btn", 3, "active", "click", 4, "ngFor", "ngForOf"], [1, "label-row"], [1, "slider-value"], ["type", "range", "step", "0.01", "formControlName", "extraordinaryRentPct", 1, "range-slider", 3, "min", "max"], [1, "range-limits"], ["class", "warning", "role", "status", 4, "ngIf"], [1, "chip-group"], ["type", "button", "class", "chip-btn", 3, "active", "disabled", "click", 4, "ngFor", "ngForOf"], ["type", "button", "class", "chip-btn", 3, "active", "click", 4, "ngFor", "ngForOf"], [3, "value"], [1, "warning"], ["type", "button", 1, "term-btn", 3, "click"], [1, "term-number"], [1, "term-label"], ["role", "status", 1, "warning"], ["type", "button", 1, "chip-btn", 3, "click", "disabled"], ["type", "button", 1, "chip-btn", 3, "click"]], template: function QuoteFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
      \u0275\u0275text(3, "Datos del veh\xEDculo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "span", 2);
      \u0275\u0275text(5, "Cotizaci\xF3n r\xE1pida en tiempo real");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 3)(7, "span", 4);
      \u0275\u0275text(8, "Selecci\xF3n r\xE1pida");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "div", 5)(10, "select", 6);
      \u0275\u0275listener("change", function QuoteFormComponent_Template_select_change_10_listener($event) {
        return ctx.onBrandSelectChange($event);
      });
      \u0275\u0275elementStart(11, "option", 7);
      \u0275\u0275text(12, "Marca");
      \u0275\u0275elementEnd();
      \u0275\u0275template(13, QuoteFormComponent_option_13_Template, 2, 2, "option", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "select", 9);
      \u0275\u0275listener("change", function QuoteFormComponent_Template_select_change_14_listener($event) {
        return ctx.onPresetSelectChange($event);
      });
      \u0275\u0275elementStart(15, "option", 7);
      \u0275\u0275text(16, "Modelo");
      \u0275\u0275elementEnd();
      \u0275\u0275template(17, QuoteFormComponent_option_17_Template, 3, 8, "option", 8);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(18, "form", 10)(19, "div", 11)(20, "div", 12)(21, "label", 13);
      \u0275\u0275text(22, "Atenci\xF3n a (Cliente / Prospecto)");
      \u0275\u0275elementEnd();
      \u0275\u0275element(23, "input", 14);
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "div")(25, "label", 15);
      \u0275\u0275text(26, "Marca *");
      \u0275\u0275elementEnd();
      \u0275\u0275element(27, "input", 16);
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "div")(29, "label", 17);
      \u0275\u0275text(30, "Modelo *");
      \u0275\u0275elementEnd();
      \u0275\u0275element(31, "input", 18);
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "div")(33, "label", 19);
      \u0275\u0275text(34, "A\xF1o Modelo *");
      \u0275\u0275elementEnd();
      \u0275\u0275element(35, "input", 20);
      \u0275\u0275controlCreate();
      \u0275\u0275template(36, QuoteFormComponent_div_36_Template, 2, 0, "div", 21);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "div")(38, "label", 22);
      \u0275\u0275text(39, "Alta de Placas");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "select", 23);
      \u0275\u0275template(41, QuoteFormComponent_option_41_Template, 3, 8, "option", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "div", 24)(43, "label", 25);
      \u0275\u0275text(44, "Precio Neto del Veh\xEDculo (con IVA) *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "div", 26)(46, "span", 27);
      \u0275\u0275text(47, "$");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "input", 28);
      \u0275\u0275listener("input", function QuoteFormComponent_Template_input_input_48_listener($event) {
        return ctx.onPriceNetInput($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(49, "div", 29)(50, "span");
      \u0275\u0275text(51, "Montos r\xE1pidos:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(52, "button", 30);
      \u0275\u0275listener("click", function QuoteFormComponent_Template_button_click_52_listener() {
        return ctx.setPrice(407900);
      });
      \u0275\u0275text(53);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(54, "button", 30);
      \u0275\u0275listener("click", function QuoteFormComponent_Template_button_click_54_listener() {
        return ctx.setPrice(52e4);
      });
      \u0275\u0275text(55);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(56, "button", 30);
      \u0275\u0275listener("click", function QuoteFormComponent_Template_button_click_56_listener() {
        return ctx.setPrice(78e4);
      });
      \u0275\u0275text(57);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(58, "button", 30);
      \u0275\u0275listener("click", function QuoteFormComponent_Template_button_click_58_listener() {
        return ctx.setPrice(969900);
      });
      \u0275\u0275text(59);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(60, "div", 12)(61, "label");
      \u0275\u0275text(62, "\xBFEs h\xEDbrido o el\xE9ctrico?");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(63, "div", 31)(64, "button", 32);
      \u0275\u0275listener("click", function QuoteFormComponent_Template_button_click_64_listener() {
        return ctx.setHybrid(false);
      });
      \u0275\u0275text(65, "No (Renta b\xE1sica $6,000 + IVA)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(66, "button", 32);
      \u0275\u0275listener("click", function QuoteFormComponent_Template_button_click_66_listener() {
        return ctx.setHybrid(true);
      });
      \u0275\u0275text(67, "S\xED (Renta b\xE1sica $8,550 + IVA)");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(68, "div", 12)(69, "label");
      \u0275\u0275text(70, "Plazo (Meses)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(71, "div", 33);
      \u0275\u0275template(72, QuoteFormComponent_button_72_Template, 5, 3, "button", 34);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(73, "div", 12)(74, "div", 35)(75, "label");
      \u0275\u0275text(76, "Renta Extraordinaria (Enganche Deducible)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(77, "span", 36);
      \u0275\u0275text(78);
      \u0275\u0275pipe(79, "number");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(80, "input", 37);
      \u0275\u0275controlCreate();
      \u0275\u0275elementStart(81, "div", 38)(82, "span");
      \u0275\u0275text(83);
      \u0275\u0275pipe(84, "number");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(85, "span");
      \u0275\u0275text(86);
      \u0275\u0275pipe(87, "number");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(88, QuoteFormComponent_div_88_Template, 2, 1, "div", 39);
      \u0275\u0275elementStart(89, "div", 40);
      \u0275\u0275template(90, QuoteFormComponent_button_90_Template, 2, 4, "button", 41);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(91, "div")(92, "label");
      \u0275\u0275text(93, "Dep\xF3sito en Garant\xEDa");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(94, "div", 40);
      \u0275\u0275template(95, QuoteFormComponent_button_95_Template, 2, 3, "button", 42);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(96, "div")(97, "label");
      \u0275\u0275text(98, "Seguro de Unidad");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(99, "div", 31)(100, "button", 32);
      \u0275\u0275listener("click", function QuoteFormComponent_Template_button_click_100_listener() {
        return ctx.setInsurance(false);
      });
      \u0275\u0275text(101, "Pendiente ($0)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(102, "button", 32);
      \u0275\u0275listener("click", function QuoteFormComponent_Template_button_click_102_listener() {
        return ctx.setInsurance(true);
      });
      \u0275\u0275text(103, "Est. (3.5%)");
      \u0275\u0275elementEnd()()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(13);
      \u0275\u0275property("ngForOf", ctx.presetGroups);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", !ctx.selectedPresetBrand);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngForOf", ctx.filteredPresetVehicles);
      \u0275\u0275advance();
      \u0275\u0275property("formGroup", ctx.quoteForm);
      \u0275\u0275advance(5);
      \u0275\u0275control();
      \u0275\u0275advance(4);
      \u0275\u0275control();
      \u0275\u0275advance(4);
      \u0275\u0275control();
      \u0275\u0275advance(4);
      \u0275\u0275control();
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isPreOwned);
      \u0275\u0275advance(4);
      \u0275\u0275control();
      \u0275\u0275advance();
      \u0275\u0275property("ngForOf", ctx.statePlates);
      \u0275\u0275advance(7);
      \u0275\u0275property("value", ctx.priceNetDisplay);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1("$", ctx.formatPrice(407900));
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("$", ctx.formatPrice(52e4));
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("$", ctx.formatPrice(78e4));
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("$", ctx.formatPrice(969900));
      \u0275\u0275advance(5);
      \u0275\u0275classProp("active", ctx.quoteForm.get("isHybridOrElectric")?.value === false);
      \u0275\u0275advance(2);
      \u0275\u0275classProp("active", ctx.quoteForm.get("isHybridOrElectric")?.value === true);
      \u0275\u0275advance(6);
      \u0275\u0275property("ngForOf", \u0275\u0275pureFunction0(37, _c0));
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(79, 28, ctx.extraordinaryRentPct * 100, "1.0-1"), "%");
      \u0275\u0275advance(2);
      \u0275\u0275property("min", ctx.minimumExtraordinaryRentPct)("max", ctx.maximumExtraordinaryRentPct);
      \u0275\u0275control();
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1("M\xEDnimo: ", \u0275\u0275pipeBind2(84, 31, ctx.minimumExtraordinaryRentPct * 100, "1.0-0"), "%");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1("M\xE1ximo: ", \u0275\u0275pipeBind2(87, 34, ctx.maximumExtraordinaryRentPct * 100, "1.0-0"), "%");
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.hasExtraordinaryRentAdjustment);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", \u0275\u0275pureFunction0(38, _c1));
      \u0275\u0275advance(5);
      \u0275\u0275property("ngForOf", \u0275\u0275pureFunction0(39, _c2));
      \u0275\u0275advance(5);
      \u0275\u0275classProp("active", ctx.quoteForm.get("isInsuranceEstimated")?.value === false);
      \u0275\u0275advance(2);
      \u0275\u0275classProp("active", ctx.quoteForm.get("isInsuranceEstimated")?.value === true);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, RangeValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, MinValidator, MaxValidator, ReactiveFormsModule, FormGroupDirective, FormControlName, DecimalPipe, CurrencyPipe], styles: ['\n.form-card[_ngcontent-%COMP%] {\n  background: var(--%NS%surface-card);\n  border: 1px solid var(--%NS%border-color);\n  border-radius: 12px;\n  padding: 1.5rem 1.6rem;\n  box-shadow: none;\n  max-width: 1200px;\n  margin: 0 auto;\n  width: 100%;\n  box-sizing: border-box;\n}\n.card-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-end;\n  border-bottom: 2px solid var(--%NS%accent-green-dark);\n  padding-bottom: 0.75rem;\n  margin-bottom: 1.25rem;\n}\n.card-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-family: "Fjalla One", sans-serif;\n  font-size: 1.3rem;\n  color: var(--%NS%text-main);\n  margin: 0;\n  letter-spacing: 0.5px;\n}\n.subtitle[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: var(--%NS%text-muted);\n}\n.preset-section[_ngcontent-%COMP%] {\n  background: #f5faf6;\n  padding: 0.75rem 1rem;\n  border-radius: 8px;\n  border: 1px solid #dcebe0;\n  margin-bottom: 1.25rem;\n}\n.preset-label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.7rem;\n  font-weight: 700;\n  color: var(--%NS%text-silver);\n  text-transform: uppercase;\n  margin-bottom: 0.3rem;\n}\n.preset-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.6rem;\n}\n.preset-select[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.5rem 0.75rem;\n  border: 1px solid var(--%NS%border-strong);\n  border-radius: 8px;\n  background: var(--%NS%input-bg);\n  font-weight: 600;\n  font-size: 0.9rem;\n  color: var(--%NS%text-main);\n  transition: 0.2s;\n}\n.preset-select[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--%NS%accent-green);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.15);\n}\n.form-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1.2rem 1.5rem;\n}\n.full-width[_ngcontent-%COMP%] {\n  grid-column: span 2;\n}\nlabel[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  font-weight: 700;\n  color: var(--%NS%text-silver);\n}\ninput[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%] {\n  padding: 0.5rem 0.75rem;\n  border: 1px solid var(--%NS%border-strong);\n  border-radius: 6px;\n  font-size: 0.9rem;\n  transition: 0.2s;\n  background: var(--%NS%input-bg);\n  width: 100%;\n  box-sizing: border-box;\n}\ninput[_ngcontent-%COMP%]:focus, \nselect[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--%NS%accent-green);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.15);\n}\n.warning[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.75rem;\n  color: var(--%NS%warning);\n  background: var(--%NS%warning-bg);\n  border-left: 3px solid #eab308;\n  padding: 0.45rem 0.6rem;\n  margin-top: 0.35rem;\n  line-height: 1.35;\n}\n.range-limits[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  color: var(--%NS%text-muted);\n  font-size: 0.7rem;\n  margin-top: -0.2rem;\n}\n.price-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.currency-input-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n}\n.currency-symbol[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 0.8rem;\n  top: 50%;\n  transform: translateY(-50%);\n  color: var(--%NS%accent-green-dark);\n  font-weight: 700;\n  font-size: 1.1rem;\n}\n.currency-input-wrapper[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  padding-left: 2rem;\n  font-weight: 700;\n  color: var(--%NS%accent-green-dark);\n  font-size: 1.1rem;\n}\n.quick-amounts[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  flex-wrap: wrap;\n}\n.quick-amounts[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  color: var(--%NS%text-muted);\n  margin-right: 0.2rem;\n}\n.quick-amounts[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  background: var(--%NS%surface-hover);\n  border: 1px solid var(--%NS%border-strong);\n  padding: 0.1rem 0.6rem;\n  border-radius: 5px;\n  font-size: 0.7rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: 0.2s;\n}\n.quick-amounts[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%accent-green);\n  color: var(--%NS%text-on-accent);\n  border-color: var(--%NS%accent-green-dark);\n}\n.toggle-group[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.4rem;\n  background: var(--%NS%surface-hover);\n  padding: 0.2rem;\n  border-radius: 8px;\n}\n.toggle-btn[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  padding: 0.4rem 0.6rem;\n  border-radius: 8px;\n  font-weight: 600;\n  font-size: 0.8rem;\n  color: var(--%NS%text-muted);\n  transition: 0.2s;\n  cursor: pointer;\n}\n.toggle-btn.active[_ngcontent-%COMP%] {\n  background: var(--%NS%surface-card);\n  color: var(--%NS%accent-green-dark);\n  box-shadow: 0 1px 4px var(--%NS%shadow-medium);\n  border: 1px solid #bbf7d0;\n}\n.term-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 0.5rem;\n}\n.term-btn[_ngcontent-%COMP%] {\n  background: var(--%NS%surface-card);\n  border: 1px solid var(--%NS%border-strong);\n  border-radius: 8px;\n  padding: 0.5rem 0;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  cursor: pointer;\n  transition: 0.2s;\n}\n.term-btn[_ngcontent-%COMP%]:hover {\n  border-color: var(--%NS%accent-green);\n}\n.term-btn.active[_ngcontent-%COMP%] {\n  background: var(--%NS%accent-green-dark);\n  border-color: var(--%NS%accent-green-dark);\n  color: var(--%NS%text-on-accent);\n  box-shadow: 0 4px 12px rgba(32, 176, 56, 0.3);\n}\n.term-number[_ngcontent-%COMP%] {\n  font-family: "Fjalla One", sans-serif;\n  font-size: 1.2rem;\n  line-height: 1;\n}\n.term-label[_ngcontent-%COMP%] {\n  font-size: 0.6rem;\n  opacity: 0.9;\n}\n.label-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.slider-value[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: var(--%NS%accent-green-dark);\n  font-size: 0.9rem;\n}\n.range-slider[_ngcontent-%COMP%] {\n  width: 100%;\n  accent-color: var(--%NS%accent-green);\n  height: 6px;\n  background: #dcebe0;\n  border-radius: 4px;\n  cursor: pointer;\n}\n.chip-group[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.4rem;\n  margin-top: 0.3rem;\n}\n.chip-btn[_ngcontent-%COMP%] {\n  flex: 1;\n  background: var(--%NS%surface-card);\n  border: 1px solid var(--%NS%border-strong);\n  border-radius: 5px;\n  padding: 0.3rem;\n  font-weight: 600;\n  font-size: 0.8rem;\n  cursor: pointer;\n  transition: 0.2s;\n  text-align: center;\n}\n.chip-btn.active[_ngcontent-%COMP%] {\n  background: var(--%NS%accent-green-dark);\n  border-color: var(--%NS%accent-green-dark);\n  color: var(--%NS%text-on-accent);\n}\n.chip-btn[_ngcontent-%COMP%]:disabled {\n  color: var(--%NS%accent-silver);\n  background: var(--%NS%surface-subtle);\n  border-color: var(--%NS%border-color);\n  cursor: not-allowed;\n  opacity: 0.65;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \ninput[_ngcontent-%COMP%]:focus-visible, \nselect[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--%NS%accent-green);\n  outline-offset: 2px;\n}\n@media (max-width: 768px) {\n  .form-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .full-width[_ngcontent-%COMP%] {\n    grid-column: span 1;\n  }\n  .preset-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .form-card[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n}\n@media (max-width: 480px) {\n  .term-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .form-card[_ngcontent-%COMP%] {\n    padding: 0.85rem;\n  }\n  .term-btn[_ngcontent-%COMP%] {\n    padding: 0.65rem 0;\n  }\n}\n/*# sourceMappingURL=quote-form.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(QuoteFormComponent, [{
    type: Component,
    args: [{ selector: "app-quote-form", standalone: true, imports: [CommonModule, FormsModule, ReactiveFormsModule], template: `<div class="form-card">
  <div class="card-header">
    <h2>Datos del veh\xEDculo</h2>
    <span class="subtitle">Cotizaci\xF3n r\xE1pida en tiempo real</span>
  </div>

  <div class="preset-section">
    <span class="preset-label">Selecci\xF3n r\xE1pida</span>
    <div class="preset-row">
      <select class="preset-select" (change)="onBrandSelectChange($event)">
        <option value="" disabled selected hidden>Marca</option>
        <option *ngFor="let group of presetGroups" [value]="group.brand">{{ group.brand }}</option>
      </select>

      <select class="preset-select" (change)="onPresetSelectChange($event)" [disabled]="!selectedPresetBrand">
        <option value="" disabled selected hidden>Modelo</option>
        <option *ngFor="let v of filteredPresetVehicles" [value]="v.id">
          {{ v.model }} \u2014 {{ v.suggestedPriceNet | currency:'MXN':'symbol':'1.0-0' }}
        </option>
      </select>
    </div>
  </div>

  <form [formGroup]="quoteForm">
    <div class="form-grid">
      <div class="full-width">
        <label for="clientName">Atenci\xF3n a (Cliente / Prospecto)</label>
        <input id="clientName" type="text" formControlName="clientName" placeholder="Nombre del cliente" />
      </div>

      <div>
        <label for="brand">Marca *</label>
        <input id="brand" type="text" formControlName="brand" placeholder="Ej. Audi, HINO, Toyota" />
      </div>

      <div>
        <label for="model">Modelo *</label>
        <input id="model" type="text" formControlName="model" placeholder="Ej. Q3 Sportback, 616 LONG" />
      </div>

      <div>
        <label for="year">A\xF1o Modelo *</label>
        <input id="year" type="number" formControlName="year" min="2015" max="2030" />
        <div *ngIf="isPreOwned" class="warning">Seminuevo (< 2024): IVA al 16% en factura.</div>
        </div>

        <div>
          <label for="selectedStatePlateId">Alta de Placas</label>
          <select id="selectedStatePlateId" formControlName="selectedStatePlateId">
            <option *ngFor="let p of statePlates" [value]="p.id">
              {{ p.name }} ({{ p.costNet | currency:'MXN':'symbol':'1.0-0' }})
            </option>
          </select>
        </div>

        <div class="full-width price-group">
          <label for="priceNet">Precio Neto del Veh\xEDculo (con IVA) *</label>
          <div class="currency-input-wrapper">
            <span class="currency-symbol">$</span>
            <input id="priceNet" type="text" inputmode="decimal" [value]="priceNetDisplay" (input)="onPriceNetInput($event)" placeholder="969.900,00" />
          </div>
          <div class="quick-amounts">
            <span>Montos r\xE1pidos:</span>
            <button type="button" (click)="setPrice(407900)">\${{ formatPrice(407900) }}</button>
            <button type="button" (click)="setPrice(520000)">\${{ formatPrice(520000) }}</button>
            <button type="button" (click)="setPrice(780000)">\${{ formatPrice(780000) }}</button>
            <button type="button" (click)="setPrice(969900)">\${{ formatPrice(969900) }}</button>
          </div>
        </div>

        <div class="full-width">
          <label>\xBFEs h\xEDbrido o el\xE9ctrico?</label>
          <div class="toggle-group">
            <button type="button" class="toggle-btn"
              [class.active]="quoteForm.get('isHybridOrElectric')?.value === false" (click)="setHybrid(false)">No (Renta
              b\xE1sica $6,000 + IVA)</button>
            <button type="button" class="toggle-btn"
              [class.active]="quoteForm.get('isHybridOrElectric')?.value === true" (click)="setHybrid(true)">S\xED (Renta
              b\xE1sica $8,550 + IVA)</button>
          </div>
        </div>

        <div class="full-width">
          <label>Plazo (Meses)</label>
          <div class="term-grid">
            <button type="button" *ngFor="let t of [12, 24, 36, 48]" class="term-btn"
              [class.active]="quoteForm.get('termMonths')?.value === t" (click)="setTerm(t)">
              <span class="term-number">{{ t }}</span>
              <span class="term-label">Meses</span>
            </button>
          </div>
        </div>

        <div class="full-width">
          <div class="label-row">
            <label>Renta Extraordinaria (Enganche Deducible)</label>
            <span class="slider-value">{{ (extraordinaryRentPct * 100) | number:'1.0-1' }}%</span>
          </div>
          <input type="range" [min]="minimumExtraordinaryRentPct" [max]="maximumExtraordinaryRentPct" step="0.01"
            formControlName="extraordinaryRentPct"
            class="range-slider" />
          <div class="range-limits">
            <span>M\xEDnimo: {{ minimumExtraordinaryRentPct * 100 | number:'1.0-0' }}%</span>
            <span>M\xE1ximo: {{ maximumExtraordinaryRentPct * 100 | number:'1.0-0' }}%</span>
          </div>
          <div *ngIf="hasExtraordinaryRentAdjustment" class="warning" role="status">
            {{ extraordinaryRentAdjustmentMessage }}
          </div>
          <div class="chip-group">
            <button type="button" *ngFor="let pct of [0.10, 0.15, 0.20, 0.30, 0.40, 0.50, 0.60, 0.70]" class="chip-btn"
              [class.active]="extraordinaryRentPct === pct"
              [disabled]="pct < minimumExtraordinaryRentPct || pct > maximumExtraordinaryRentPct"
              (click)="setExtraordinaryRent(pct)">{{ (pct * 100) }}%</button>
          </div>
        </div>

        <div>
          <label>Dep\xF3sito en Garant\xEDa</label>
          <div class="chip-group">
            <button type="button" *ngFor="let p of [0, 0.05, 0.10]" class="chip-btn"
              [class.active]="quoteForm.get('securityDepositPct')?.value === p" (click)="setDeposit(p)">{{ (p * 100)
              }}%</button>
          </div>
        </div>

        <div>
          <label>Seguro de Unidad</label>
          <div class="toggle-group">
            <button type="button" class="toggle-btn"
              [class.active]="quoteForm.get('isInsuranceEstimated')?.value === false"
              (click)="setInsurance(false)">Pendiente ($0)</button>
            <button type="button" class="toggle-btn"
              [class.active]="quoteForm.get('isInsuranceEstimated')?.value === true" (click)="setInsurance(true)">Est.
              (3.5%)</button>
          </div>
        </div>
      </div>
  </form>
</div>
`, styles: ['/* src/app/components/quote-form/quote-form.component.css */\n.form-card {\n  background: var(--surface-card);\n  border: 1px solid var(--border-color);\n  border-radius: 12px;\n  padding: 1.5rem 1.6rem;\n  box-shadow: none;\n  max-width: 1200px;\n  margin: 0 auto;\n  width: 100%;\n  box-sizing: border-box;\n}\n.card-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-end;\n  border-bottom: 2px solid var(--accent-green-dark);\n  padding-bottom: 0.75rem;\n  margin-bottom: 1.25rem;\n}\n.card-header h2 {\n  font-family: "Fjalla One", sans-serif;\n  font-size: 1.3rem;\n  color: var(--text-main);\n  margin: 0;\n  letter-spacing: 0.5px;\n}\n.subtitle {\n  font-size: 0.8rem;\n  color: var(--text-muted);\n}\n.preset-section {\n  background: #f5faf6;\n  padding: 0.75rem 1rem;\n  border-radius: 8px;\n  border: 1px solid #dcebe0;\n  margin-bottom: 1.25rem;\n}\n.preset-label {\n  display: block;\n  font-size: 0.7rem;\n  font-weight: 700;\n  color: var(--text-silver);\n  text-transform: uppercase;\n  margin-bottom: 0.3rem;\n}\n.preset-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.6rem;\n}\n.preset-select {\n  width: 100%;\n  padding: 0.5rem 0.75rem;\n  border: 1px solid var(--border-strong);\n  border-radius: 8px;\n  background: var(--input-bg);\n  font-weight: 600;\n  font-size: 0.9rem;\n  color: var(--text-main);\n  transition: 0.2s;\n}\n.preset-select:focus {\n  outline: none;\n  border-color: var(--accent-green);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.15);\n}\n.form-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1.2rem 1.5rem;\n}\n.full-width {\n  grid-column: span 2;\n}\nlabel {\n  font-size: 0.8rem;\n  font-weight: 700;\n  color: var(--text-silver);\n}\ninput,\nselect {\n  padding: 0.5rem 0.75rem;\n  border: 1px solid var(--border-strong);\n  border-radius: 6px;\n  font-size: 0.9rem;\n  transition: 0.2s;\n  background: var(--input-bg);\n  width: 100%;\n  box-sizing: border-box;\n}\ninput:focus,\nselect:focus {\n  outline: none;\n  border-color: var(--accent-green);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.15);\n}\n.warning {\n  display: block;\n  font-size: 0.75rem;\n  color: var(--warning);\n  background: var(--warning-bg);\n  border-left: 3px solid #eab308;\n  padding: 0.45rem 0.6rem;\n  margin-top: 0.35rem;\n  line-height: 1.35;\n}\n.range-limits {\n  display: flex;\n  justify-content: space-between;\n  color: var(--text-muted);\n  font-size: 0.7rem;\n  margin-top: -0.2rem;\n}\n.price-group {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.currency-input-wrapper {\n  position: relative;\n}\n.currency-symbol {\n  position: absolute;\n  left: 0.8rem;\n  top: 50%;\n  transform: translateY(-50%);\n  color: var(--accent-green-dark);\n  font-weight: 700;\n  font-size: 1.1rem;\n}\n.currency-input-wrapper input {\n  padding-left: 2rem;\n  font-weight: 700;\n  color: var(--accent-green-dark);\n  font-size: 1.1rem;\n}\n.quick-amounts {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  flex-wrap: wrap;\n}\n.quick-amounts span {\n  font-size: 0.7rem;\n  color: var(--text-muted);\n  margin-right: 0.2rem;\n}\n.quick-amounts button {\n  background: var(--surface-hover);\n  border: 1px solid var(--border-strong);\n  padding: 0.1rem 0.6rem;\n  border-radius: 5px;\n  font-size: 0.7rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: 0.2s;\n}\n.quick-amounts button:hover {\n  background: var(--accent-green);\n  color: var(--text-on-accent);\n  border-color: var(--accent-green-dark);\n}\n.toggle-group {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.4rem;\n  background: var(--surface-hover);\n  padding: 0.2rem;\n  border-radius: 8px;\n}\n.toggle-btn {\n  background: transparent;\n  border: none;\n  padding: 0.4rem 0.6rem;\n  border-radius: 8px;\n  font-weight: 600;\n  font-size: 0.8rem;\n  color: var(--text-muted);\n  transition: 0.2s;\n  cursor: pointer;\n}\n.toggle-btn.active {\n  background: var(--surface-card);\n  color: var(--accent-green-dark);\n  box-shadow: 0 1px 4px var(--shadow-medium);\n  border: 1px solid #bbf7d0;\n}\n.term-grid {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 0.5rem;\n}\n.term-btn {\n  background: var(--surface-card);\n  border: 1px solid var(--border-strong);\n  border-radius: 8px;\n  padding: 0.5rem 0;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  cursor: pointer;\n  transition: 0.2s;\n}\n.term-btn:hover {\n  border-color: var(--accent-green);\n}\n.term-btn.active {\n  background: var(--accent-green-dark);\n  border-color: var(--accent-green-dark);\n  color: var(--text-on-accent);\n  box-shadow: 0 4px 12px rgba(32, 176, 56, 0.3);\n}\n.term-number {\n  font-family: "Fjalla One", sans-serif;\n  font-size: 1.2rem;\n  line-height: 1;\n}\n.term-label {\n  font-size: 0.6rem;\n  opacity: 0.9;\n}\n.label-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.slider-value {\n  font-weight: 700;\n  color: var(--accent-green-dark);\n  font-size: 0.9rem;\n}\n.range-slider {\n  width: 100%;\n  accent-color: var(--accent-green);\n  height: 6px;\n  background: #dcebe0;\n  border-radius: 4px;\n  cursor: pointer;\n}\n.chip-group {\n  display: flex;\n  gap: 0.4rem;\n  margin-top: 0.3rem;\n}\n.chip-btn {\n  flex: 1;\n  background: var(--surface-card);\n  border: 1px solid var(--border-strong);\n  border-radius: 5px;\n  padding: 0.3rem;\n  font-weight: 600;\n  font-size: 0.8rem;\n  cursor: pointer;\n  transition: 0.2s;\n  text-align: center;\n}\n.chip-btn.active {\n  background: var(--accent-green-dark);\n  border-color: var(--accent-green-dark);\n  color: var(--text-on-accent);\n}\n.chip-btn:disabled {\n  color: var(--accent-silver);\n  background: var(--surface-subtle);\n  border-color: var(--border-color);\n  cursor: not-allowed;\n  opacity: 0.65;\n}\nbutton:focus-visible,\ninput:focus-visible,\nselect:focus-visible {\n  outline: 2px solid var(--accent-green);\n  outline-offset: 2px;\n}\n@media (max-width: 768px) {\n  .form-grid {\n    grid-template-columns: 1fr;\n  }\n  .full-width {\n    grid-column: span 1;\n  }\n  .preset-row {\n    grid-template-columns: 1fr;\n  }\n  .form-card {\n    padding: 1rem;\n  }\n}\n@media (max-width: 480px) {\n  .term-grid {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .form-card {\n    padding: 0.85rem;\n  }\n  .term-btn {\n    padding: 0.65rem 0;\n  }\n}\n/*# sourceMappingURL=quote-form.component.css.map */\n'] }]
  }], null, { quoteChange: [{
    type: Output
  }], newQuote: [{
    type: Output
  }], initialInput: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(QuoteFormComponent, { className: "QuoteFormComponent", filePath: "src/app/components/quote-form/quote-form.component.ts", lineNumber: 20 });
})();

// src/app/components/quote-options/quote-options.component.ts
function QuoteOptionsComponent_div_0_div_7_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275text(1, "Seleccionada");
    \u0275\u0275elementEnd();
  }
}
function QuoteOptionsComponent_div_0_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275listener("click", function QuoteOptionsComponent_div_0_div_7_Template_div_click_0_listener() {
      const key_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectOption(key_r2));
    });
    \u0275\u0275template(1, QuoteOptionsComponent_div_0_div_7_div_1_Template, 2, 0, "div", 7);
    \u0275\u0275elementStart(2, "div", 8)(3, "h4");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 9);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 10)(8, "span");
    \u0275\u0275text(9, "Tasa anual");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 11);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 12)(14, "span", 13);
    \u0275\u0275text(15, "Renta mensual neta (con IVA)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 14);
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span", 15);
    \u0275\u0275text(20);
    \u0275\u0275pipe(21, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(22, "div", 16);
    \u0275\u0275elementStart(23, "div", 17)(24, "div", 18)(25, "span");
    \u0275\u0275text(26, "Desembolso inicial");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "strong");
    \u0275\u0275text(28);
    \u0275\u0275pipe(29, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "div", 18)(31, "span");
    \u0275\u0275text(32, "Valor residual neto");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "strong");
    \u0275\u0275text(34);
    \u0275\u0275pipe(35, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "div", 18)(37, "span");
    \u0275\u0275text(38, "Monto financiar sin IVA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "span");
    \u0275\u0275text(40);
    \u0275\u0275pipe(41, "currency");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(42, "button", 19);
    \u0275\u0275text(43);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const key_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("selected", ctx_r2.selectedOptionKey === key_r2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.selectedOptionKey === key_r2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(key_r2.replace("_", " "));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("VR ", ctx_r2.getVR(key_r2));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(12, 14, ctx_r2.getOption(key_r2).annualRatePct * 100, "1.1-1"), "%");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(18, 17, ctx_r2.getOption(key_r2).monthlyCosts.totalMonthlyRentNet, "MXN", "symbol", "1.2-2"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Subtotal sin IVA: ", \u0275\u0275pipeBind4(21, 22, ctx_r2.getOption(key_r2).monthlyCosts.subtotalNoIva, "MXN", "symbol", "1.2-2"));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(29, 27, ctx_r2.getOption(key_r2).initialCosts.totalInitialPayment, "MXN", "symbol", "1.2-2"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(35, 32, ctx_r2.getOption(key_r2).residualValue.valueNet, "MXN", "symbol", "1.0-0"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(41, 37, ctx_r2.getOption(key_r2).amountToFinanceNoIva, "MXN", "symbol", "1.0-0"));
    \u0275\u0275advance(2);
    \u0275\u0275classProp("btn-active", ctx_r2.selectedOptionKey === key_r2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.selectedOptionKey === key_r2 ? "Opci\xF3n seleccionada" : "Ver desglose " + key_r2.replace("_", " "), " ");
  }
}
function QuoteOptionsComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "h3");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 3);
    \u0275\u0275text(5, "Compara estrategias de valor residual");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 4);
    \u0275\u0275template(7, QuoteOptionsComponent_div_0_div_7_Template, 44, 42, "div", 5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Opciones de arrendamiento (plazo ", ctx_r2.calculation.input.termMonths, " meses)");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r2.optionKeys);
  }
}
var QuoteOptionsComponent = class _QuoteOptionsComponent {
  calculation;
  selectedOptionKey = "OPCION_1";
  optionSelected = new EventEmitter();
  optionKeys = ["OPCION_1", "OPCION_2", "OPCION_3"];
  getOption(key) {
    if (!this.calculation)
      return null;
    const map = {
      "OPCION_1": "option1",
      "OPCION_2": "option2",
      "OPCION_3": "option3"
    };
    const prop = map[key];
    return this.calculation.options[prop];
  }
  getVR(key) {
    const option = this.getOption(key);
    return option ? `${(option.residualValue.percentage * 100).toFixed(1).replace(".0", "")}%` : "";
  }
  selectOption(key) {
    this.selectedOptionKey = key;
    this.optionSelected.emit(key);
  }
  static \u0275fac = function QuoteOptionsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _QuoteOptionsComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _QuoteOptionsComponent, selectors: [["app-quote-options"]], inputs: { calculation: "calculation", selectedOptionKey: "selectedOptionKey" }, outputs: { optionSelected: "optionSelected" }, decls: 1, vars: 1, consts: [["class", "options-container", 4, "ngIf"], [1, "options-container"], [1, "section-header"], [1, "badge"], [1, "cards-grid"], ["class", "option-card", 3, "selected", "click", 4, "ngFor", "ngForOf"], [1, "option-card", 3, "click"], ["class", "card-badge", 4, "ngIf"], [1, "option-header"], [1, "vr-tag"], [1, "rate-info"], [1, "rate-value"], [1, "price-box"], [1, "price-label"], [1, "price-amount"], [1, "price-sub"], [1, "divider"], [1, "details-list"], [1, "detail-row"], [1, "select-btn"], [1, "card-badge"]], template: function QuoteOptionsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275template(0, QuoteOptionsComponent_div_0_Template, 8, 2, "div", 0);
    }
    if (rf & 2) {
      \u0275\u0275property("ngIf", ctx.calculation);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, DecimalPipe, CurrencyPipe], styles: ['\n.options-container[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.section-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.9rem;\n  flex-wrap: wrap;\n}\n.section-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-family: "Fjalla One", sans-serif;\n  font-size: 1.25rem;\n  color: var(--%NS%text-main);\n  margin: 0;\n  letter-spacing: 0.5px;\n}\n.badge[_ngcontent-%COMP%] {\n  background: var(--%NS%accent-green-light);\n  border: 1px solid #bbf7d0;\n  color: var(--%NS%accent-green-dark);\n  padding: 0.25rem 0.8rem;\n  border-radius: 6px;\n  font-size: 0.75rem;\n  font-weight: 700;\n}\n.cards-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 0.75rem;\n}\n.option-card[_ngcontent-%COMP%] {\n  background: var(--%NS%surface-card);\n  border: 1px solid var(--%NS%border-color);\n  border-radius: 10px;\n  padding: 1rem 1.1rem;\n  display: flex;\n  flex-direction: column;\n  position: relative;\n  cursor: pointer;\n  transition:\n    border-color 0.2s ease,\n    box-shadow 0.2s ease,\n    transform 0.2s ease;\n  box-shadow: 0 4px 12px var(--%NS%shadow-soft);\n}\n.option-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n  border-color: var(--%NS%accent-green);\n  box-shadow: 0 12px 24px rgba(32, 176, 56, 0.12);\n}\n.option-card.selected[_ngcontent-%COMP%] {\n  border: 2px solid var(--%NS%accent-green);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.1);\n}\n.card-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -10px;\n  right: 16px;\n  background: var(--%NS%accent-green);\n  color: var(--%NS%text-on-accent);\n  font-size: 0.65rem;\n  font-weight: 700;\n  padding: 0.1rem 0.7rem;\n  border-radius: 12px;\n  box-shadow: 0 2px 8px rgba(32, 176, 56, 0.3);\n}\n.option-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.5rem;\n}\n.option-header[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  font-family: "Fjalla One", sans-serif;\n  font-size: 1.15rem;\n  color: var(--%NS%text-main);\n  margin: 0;\n}\n.vr-tag[_ngcontent-%COMP%] {\n  background: var(--%NS%surface-hover);\n  border: 1px solid var(--%NS%border-strong);\n  padding: 0.15rem 0.6rem;\n  border-radius: 6px;\n  font-size: 0.7rem;\n  font-weight: 700;\n  color: var(--%NS%text-silver);\n}\n.rate-info[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  font-size: 0.8rem;\n  color: var(--%NS%text-muted);\n  margin-bottom: 0.8rem;\n}\n.rate-value[_ngcontent-%COMP%] {\n  color: var(--%NS%text-main);\n  font-weight: 700;\n}\n.price-box[_ngcontent-%COMP%] {\n  background: var(--%NS%surface-subtle);\n  border-radius: 8px;\n  padding: 0.8rem 1rem;\n  text-align: center;\n  border: 1px solid var(--%NS%border-color);\n  margin-bottom: 0.8rem;\n}\n.price-label[_ngcontent-%COMP%] {\n  font-size: 0.65rem;\n  color: var(--%NS%text-muted);\n  text-transform: uppercase;\n  letter-spacing: 0.3px;\n}\n.price-amount[_ngcontent-%COMP%] {\n  font-family: "JetBrains Mono", monospace;\n  font-size: 1.4rem;\n  font-weight: 700;\n  color: var(--%NS%accent-green-dark);\n  line-height: 1.2;\n  margin: 0.1rem 0;\n}\n.price-sub[_ngcontent-%COMP%] {\n  font-size: 0.65rem;\n  color: var(--%NS%text-muted);\n}\n.divider[_ngcontent-%COMP%] {\n  height: 1px;\n  background: var(--%NS%border-color);\n  margin: 0.8rem 0;\n}\n.details-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.4rem;\n  font-size: 0.8rem;\n  margin-bottom: 1rem;\n  flex-grow: 1;\n}\n.detail-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  color: var(--%NS%text-muted);\n}\n.detail-row[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--%NS%text-main);\n}\n.select-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  background: var(--%NS%surface-hover);\n  border: 1px solid var(--%NS%border-strong);\n  color: var(--%NS%text-silver);\n  padding: 0.5rem;\n  border-radius: 6px;\n  font-weight: 700;\n  font-size: 0.8rem;\n  cursor: pointer;\n  transition: 0.2s;\n}\n.select-btn.btn-active[_ngcontent-%COMP%] {\n  background: var(--%NS%accent-green-dark);\n  border-color: var(--%NS%accent-green-dark);\n  color: var(--%NS%text-on-accent);\n  box-shadow: 0 4px 12px rgba(32, 176, 56, 0.25);\n}\n@media (max-width: 992px) {\n  .cards-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.select-btn[_ngcontent-%COMP%]:focus-visible, \n.option-card[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--%NS%accent-green);\n  outline-offset: 3px;\n}\n/*# sourceMappingURL=quote-options.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(QuoteOptionsComponent, [{
    type: Component,
    args: [{ selector: "app-quote-options", standalone: true, imports: [CommonModule], template: `<div class="options-container" *ngIf="calculation">\r
    <div class="section-header">\r
        <h3>Opciones de arrendamiento (plazo {{ calculation.input.termMonths }} meses)</h3>\r
        <span class="badge">Compara estrategias de valor residual</span>\r
    </div>\r
\r
    <div class="cards-grid">\r
        <div *ngFor="let key of optionKeys" class="option-card" [class.selected]="selectedOptionKey === key"\r
            (click)="selectOption(key)">\r
            <div class="card-badge" *ngIf="selectedOptionKey === key">Seleccionada</div>\r
            <div class="option-header">\r
                <h4>{{ key.replace('_', ' ') }}</h4>\r
                <span class="vr-tag">VR {{ getVR(key) }}</span>\r
            </div>\r
\r
            <div class="rate-info">\r
                <span>Tasa anual</span>\r
                <span class="rate-value">{{ getOption(key).annualRatePct * 100 | number:'1.1-1' }}%</span>\r
            </div>\r
\r
            <div class="price-box">\r
                <span class="price-label">Renta mensual neta (con IVA)</span>\r
                <div class="price-amount">{{ getOption(key).monthlyCosts.totalMonthlyRentNet |\r
                    currency:'MXN':'symbol':'1.2-2' }}</div>\r
                <span class="price-sub">Subtotal sin IVA: {{ getOption(key).monthlyCosts.subtotalNoIva |\r
                    currency:'MXN':'symbol':'1.2-2' }}</span>\r
            </div>\r
\r
            <div class="divider"></div>\r
\r
            <div class="details-list">\r
                <div class="detail-row">\r
                    <span>Desembolso inicial</span>\r
                    <strong>{{ getOption(key).initialCosts.totalInitialPayment | currency:'MXN':'symbol':'1.2-2'\r
                        }}</strong>\r
                </div>\r
                <div class="detail-row">\r
                    <span>Valor residual neto</span>\r
                    <strong>{{ getOption(key).residualValue.valueNet | currency:'MXN':'symbol':'1.0-0' }}</strong>\r
                </div>\r
                <div class="detail-row">\r
                    <span>Monto financiar sin IVA</span>\r
                    <span>{{ getOption(key).amountToFinanceNoIva | currency:'MXN':'symbol':'1.0-0' }}</span>\r
                </div>\r
            </div>\r
\r
            <button class="select-btn" [class.btn-active]="selectedOptionKey === key">\r
                {{ selectedOptionKey === key ? 'Opci\xF3n seleccionada' : 'Ver desglose ' + key.replace('_', ' ') }}\r
            </button>\r
        </div>\r
    </div>\r
</div>`, styles: ['/* src/app/components/quote-options/quote-options.component.css */\n.options-container {\n  margin: 0;\n}\n.section-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.9rem;\n  flex-wrap: wrap;\n}\n.section-header h3 {\n  font-family: "Fjalla One", sans-serif;\n  font-size: 1.25rem;\n  color: var(--text-main);\n  margin: 0;\n  letter-spacing: 0.5px;\n}\n.badge {\n  background: var(--accent-green-light);\n  border: 1px solid #bbf7d0;\n  color: var(--accent-green-dark);\n  padding: 0.25rem 0.8rem;\n  border-radius: 6px;\n  font-size: 0.75rem;\n  font-weight: 700;\n}\n.cards-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 0.75rem;\n}\n.option-card {\n  background: var(--surface-card);\n  border: 1px solid var(--border-color);\n  border-radius: 10px;\n  padding: 1rem 1.1rem;\n  display: flex;\n  flex-direction: column;\n  position: relative;\n  cursor: pointer;\n  transition:\n    border-color 0.2s ease,\n    box-shadow 0.2s ease,\n    transform 0.2s ease;\n  box-shadow: 0 4px 12px var(--shadow-soft);\n}\n.option-card:hover {\n  transform: translateY(-4px);\n  border-color: var(--accent-green);\n  box-shadow: 0 12px 24px rgba(32, 176, 56, 0.12);\n}\n.option-card.selected {\n  border: 2px solid var(--accent-green);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.1);\n}\n.card-badge {\n  position: absolute;\n  top: -10px;\n  right: 16px;\n  background: var(--accent-green);\n  color: var(--text-on-accent);\n  font-size: 0.65rem;\n  font-weight: 700;\n  padding: 0.1rem 0.7rem;\n  border-radius: 12px;\n  box-shadow: 0 2px 8px rgba(32, 176, 56, 0.3);\n}\n.option-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.5rem;\n}\n.option-header h4 {\n  font-family: "Fjalla One", sans-serif;\n  font-size: 1.15rem;\n  color: var(--text-main);\n  margin: 0;\n}\n.vr-tag {\n  background: var(--surface-hover);\n  border: 1px solid var(--border-strong);\n  padding: 0.15rem 0.6rem;\n  border-radius: 6px;\n  font-size: 0.7rem;\n  font-weight: 700;\n  color: var(--text-silver);\n}\n.rate-info {\n  display: flex;\n  justify-content: space-between;\n  font-size: 0.8rem;\n  color: var(--text-muted);\n  margin-bottom: 0.8rem;\n}\n.rate-value {\n  color: var(--text-main);\n  font-weight: 700;\n}\n.price-box {\n  background: var(--surface-subtle);\n  border-radius: 8px;\n  padding: 0.8rem 1rem;\n  text-align: center;\n  border: 1px solid var(--border-color);\n  margin-bottom: 0.8rem;\n}\n.price-label {\n  font-size: 0.65rem;\n  color: var(--text-muted);\n  text-transform: uppercase;\n  letter-spacing: 0.3px;\n}\n.price-amount {\n  font-family: "JetBrains Mono", monospace;\n  font-size: 1.4rem;\n  font-weight: 700;\n  color: var(--accent-green-dark);\n  line-height: 1.2;\n  margin: 0.1rem 0;\n}\n.price-sub {\n  font-size: 0.65rem;\n  color: var(--text-muted);\n}\n.divider {\n  height: 1px;\n  background: var(--border-color);\n  margin: 0.8rem 0;\n}\n.details-list {\n  display: flex;\n  flex-direction: column;\n  gap: 0.4rem;\n  font-size: 0.8rem;\n  margin-bottom: 1rem;\n  flex-grow: 1;\n}\n.detail-row {\n  display: flex;\n  justify-content: space-between;\n  color: var(--text-muted);\n}\n.detail-row strong {\n  color: var(--text-main);\n}\n.select-btn {\n  width: 100%;\n  background: var(--surface-hover);\n  border: 1px solid var(--border-strong);\n  color: var(--text-silver);\n  padding: 0.5rem;\n  border-radius: 6px;\n  font-weight: 700;\n  font-size: 0.8rem;\n  cursor: pointer;\n  transition: 0.2s;\n}\n.select-btn.btn-active {\n  background: var(--accent-green-dark);\n  border-color: var(--accent-green-dark);\n  color: var(--text-on-accent);\n  box-shadow: 0 4px 12px rgba(32, 176, 56, 0.25);\n}\n@media (max-width: 992px) {\n  .cards-grid {\n    grid-template-columns: 1fr;\n  }\n}\n.select-btn:focus-visible,\n.option-card:focus-visible {\n  outline: 2px solid var(--accent-green);\n  outline-offset: 3px;\n}\n/*# sourceMappingURL=quote-options.component.css.map */\n'] }]
  }], null, { calculation: [{
    type: Input
  }], selectedOptionKey: [{
    type: Input
  }], optionSelected: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(QuoteOptionsComponent, { className: "QuoteOptionsComponent", filePath: "src/app/components/quote-options/quote-options.component.ts", lineNumber: 12 });
})();

// src/app/components/cotizador/cotizador.ts
function CotizadorComponent_span_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 15);
  }
}
function CotizadorComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275element(1, "span", 17);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classProp("is-saving", ctx_r0.saveState() === "saving");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.saveIndicatorLabel());
  }
}
function CotizadorComponent_app_quote_breakdown_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-quote-breakdown", 18);
    \u0275\u0275listener("saveQuote", function CotizadorComponent_app_quote_breakdown_17_Template_app_quote_breakdown_saveQuote_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onSaveQuote());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("calculation", ctx_r0.calculationResult());
  }
}
var CotizadorComponent = class _CotizadorComponent {
  calculator = inject(FinancialCalculatorService);
  quotes = inject(QuotesService);
  auth = inject(AuthService);
  toast = inject(ToastService);
  draftService = inject(QuoteDraftService);
  calculationResult = signal(
    null,
    ...ngDevMode ? [{ debugName: "calculationResult" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedOptionKey = signal(
    "OPCION_1",
    ...ngDevMode ? [{ debugName: "selectedOptionKey" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /** Datos precargados desde Mis Cotizaciones ("Duplicar" / "Editar"). */
  preloadedInput = null;
  /** Fecha límite de vigencia de la cotización en edición (o de la nueva). */
  validUntil;
  /** Estado del guardado automático para el indicador de la barra superior. */
  saveState = signal(
    "idle",
    ...ngDevMode ? [{ debugName: "saveState" }] : (
      /* istanbul ignore next */
      []
    )
  );
  lastSavedAt = signal(
    null,
    ...ngDevMode ? [{ debugName: "lastSavedAt" }] : (
      /* istanbul ignore next */
      []
    )
  );
  currentQuoteId = null;
  saveTimeout = null;
  isSaving = false;
  constructor() {
    const draft = this.draftService.draft();
    if (draft) {
      this.preloadedInput = draft.input;
      if (draft.quoteId) {
        this.currentQuoteId = draft.quoteId;
      }
      this.validUntil = draft.validUntil ? new Date(draft.validUntil) : computeValidUntil(/* @__PURE__ */ new Date());
    } else {
      this.validUntil = computeValidUntil(/* @__PURE__ */ new Date());
    }
  }
  onQuoteInputChange(input) {
    const calc = this.calculator.calculateQuote(input);
    this.calculationResult.set(calc);
    if (calc && this.isValidQuote(input)) {
      this.autoSave(calc);
    }
  }
  onOptionSelected(key) {
    this.selectedOptionKey.set(key);
  }
  onSaveQuote() {
    const calc = this.calculationResult();
    if (!calc)
      return;
    this.quotes.saveQuote(calc, this.currentQuoteId ?? void 0).then(({ id, error }) => {
      if (error) {
        this.toast.error("Error al guardar la cotizaci\xF3n. Intenta de nuevo.");
        return;
      }
      if (id && !this.currentQuoteId) {
        this.currentQuoteId = id;
      }
      this.saveState.set("saved");
      this.lastSavedAt.set(/* @__PURE__ */ new Date());
      this.toast.success("Cotizaci\xF3n guardada exitosamente");
    });
  }
  // Reiniciar ID cuando se seleccione un nuevo vehículo
  resetQuoteId() {
    this.currentQuoteId = null;
  }
  isValidQuote(input) {
    return input.priceNet > 0 && !!input.brand?.trim() && !!input.model?.trim();
  }
  autoSave(quote) {
    if (!this.auth.currentUser())
      return;
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }
    this.saveTimeout = setTimeout(() => {
      if (this.isSaving)
        return;
      this.isSaving = true;
      this.saveState.set("saving");
      this.quotes.saveQuote(quote, this.currentQuoteId ?? void 0).then(({ id, error }) => {
        this.isSaving = false;
        if (error) {
          this.saveState.set("idle");
          this.toast.error("No se pudo guardar la cotizaci\xF3n. Revisa tu conexi\xF3n.");
          console.error("Error guardando cotizaci\xF3n:", error);
          return;
        }
        if (id && !this.currentQuoteId) {
          this.currentQuoteId = id;
        }
        this.saveState.set("saved");
        this.lastSavedAt.set(/* @__PURE__ */ new Date());
      }).catch((err) => {
        this.isSaving = false;
        this.saveState.set("idle");
        this.toast.error("No se pudo guardar la cotizaci\xF3n.");
        console.error("Error en guardado autom\xE1tico:", err);
      });
    }, 500);
  }
  isVencida() {
    return this.validUntil.getTime() <= Date.now();
  }
  vigenciaLabel() {
    if (this.isVencida()) {
      return "Vigencia vencida";
    }
    const d = this.validUntil;
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    return `Vence el ${dd}/${mm}/${d.getFullYear()}`;
  }
  saveIndicatorLabel() {
    if (this.saveState() === "saving")
      return "Guardando\u2026";
    if (this.saveState() === "saved") {
      const at = this.lastSavedAt();
      if (at) {
        const hh = String(at.getHours()).padStart(2, "0");
        const mi = String(at.getMinutes()).padStart(2, "0");
        return `Guardado ${hh}:${mi}`;
      }
      return "Guardado";
    }
    return "";
  }
  ngOnDestroy() {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }
  }
  static \u0275fac = function CotizadorComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CotizadorComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CotizadorComponent, selectors: [["app-cotizador"]], decls: 18, vars: 8, consts: [[1, "cotizador-wrapper"], [1, "cotizador-topbar"], ["routerLink", "/", 1, "btn-back"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["points", "15 18 9 12 15 6"], [1, "topbar-right"], [1, "meta-badge"], ["class", "pulse-dot", 4, "ngIf"], ["class", "save-indicator", 4, "ngIf"], [1, "cotizador-grid"], [1, "left-column"], [3, "quoteChange", "newQuote", "initialInput"], [1, "right-column"], [3, "optionSelected", "calculation"], [3, "calculation", "saveQuote", 4, "ngIf"], [1, "pulse-dot"], [1, "save-indicator"], [1, "save-dot"], [3, "saveQuote", "calculation"]], template: function CotizadorComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "a", 2);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(3, "svg", 3);
      \u0275\u0275element(4, "polyline", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275text(5, " Volver a Mis Cotizaciones ");
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(6, "div", 5)(7, "div", 6);
      \u0275\u0275template(8, CotizadorComponent_span_8_Template, 1, 0, "span", 7);
      \u0275\u0275elementStart(9, "span");
      \u0275\u0275text(10);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(11, CotizadorComponent_div_11_Template, 4, 3, "div", 8);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "div", 9)(13, "div", 10)(14, "app-quote-form", 11);
      \u0275\u0275listener("quoteChange", function CotizadorComponent_Template_app_quote_form_quoteChange_14_listener($event) {
        return ctx.onQuoteInputChange($event);
      })("newQuote", function CotizadorComponent_Template_app_quote_form_newQuote_14_listener() {
        return ctx.resetQuoteId();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "div", 12)(16, "app-quote-options", 13);
      \u0275\u0275listener("optionSelected", function CotizadorComponent_Template_app_quote_options_optionSelected_16_listener($event) {
        return ctx.onOptionSelected($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275template(17, CotizadorComponent_app_quote_breakdown_17_Template, 1, 1, "app-quote-breakdown", 14);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275classProp("badge-vencida", ctx.isVencida());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isVencida());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.vigenciaLabel());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.saveState() === "saving" || ctx.saveState() === "saved");
      \u0275\u0275advance(3);
      \u0275\u0275property("initialInput", ctx.preloadedInput);
      \u0275\u0275advance(2);
      \u0275\u0275property("calculation", ctx.calculationResult());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.calculationResult());
    }
  }, dependencies: [
    CommonModule,
    NgIf,
    RouterModule,
    RouterLink,
    QuoteFormComponent,
    QuoteOptionsComponent,
    QuoteBreakdownComponent
  ], styles: ['\n.cotizador-wrapper[_ngcontent-%COMP%] {\n  max-width: 1600px;\n  margin: 0 auto;\n  padding: 1.25rem 2rem 2.5rem;\n  box-sizing: border-box;\n}\n.cotizador-topbar[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1.5rem;\n  flex-wrap: wrap;\n  gap: 0.8rem;\n}\n.btn-back[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  background: var(--%NS%surface-hover);\n  color: var(--%NS%text-silver);\n  padding: 0.5rem 1.2rem;\n  border-radius: 40px;\n  font-weight: 600;\n  font-size: 0.9rem;\n  text-decoration: none;\n  border: 1px solid var(--%NS%border-color);\n  transition: all 0.2s ease;\n}\n.btn-back[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%border-color);\n  transform: translateX(-3px);\n}\n.btn-back[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  stroke: currentColor;\n}\n.topbar-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n.meta-badge[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  background: var(--%NS%accent-green-light);\n  border: 1px solid rgba(139, 226, 140, 0.4);\n  padding: 0.3rem 0.8rem;\n  border-radius: 30px;\n  font-size: 0.75rem;\n  font-weight: 700;\n  color: var(--%NS%accent-green-dark);\n  white-space: nowrap;\n}\n.pulse-dot[_ngcontent-%COMP%] {\n  width: 6px;\n  height: 6px;\n  background-color: var(--%NS%accent-green);\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_pulse 2s infinite;\n}\n@keyframes _ngcontent-%COMP%_pulse {\n  0% {\n    transform: scale(0.95);\n    opacity: 0.9;\n  }\n  50% {\n    transform: scale(1.3);\n    opacity: 0.5;\n  }\n  100% {\n    transform: scale(0.95);\n    opacity: 0.9;\n  }\n}\n.cotizador-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1.3fr;\n  gap: 2rem;\n  align-items: start;\n}\n.left-column[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.right-column[_ngcontent-%COMP%] {\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n.toast[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 2rem;\n  right: 2rem;\n  background: var(--%NS%accent-green-dark);\n  color: var(--%NS%text-on-accent);\n  padding: 0.8rem 1.5rem;\n  border-radius: 12px;\n  font-weight: 700;\n  font-size: 0.9rem;\n  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);\n  animation: _ngcontent-%COMP%_slideIn 0.3s ease;\n  z-index: 999;\n}\n@keyframes _ngcontent-%COMP%_slideIn {\n  from {\n    transform: translateY(20px);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n@media (max-width: 1024px) {\n  .cotizador-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 2rem;\n  }\n  .cotizador-wrapper[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .cotizador-topbar[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n    gap: 0.6rem;\n  }\n  .btn-back[_ngcontent-%COMP%] {\n    justify-content: center;\n  }\n  .topbar-right[_ngcontent-%COMP%] {\n    justify-content: center;\n  }\n}\n.cotizador-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  max-width: 1600px;\n  margin: 0 auto;\n  padding: 1.75rem 2rem 2.5rem;\n}\n.cotizador-wrapper[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 38%;\n  height: 180px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(32, 176, 56, 0.09),\n      rgba(16, 37, 31, 0.03));\n  clip-path: polygon(38% 0, 100% 0, 100% 100%, 0 100%);\n  pointer-events: none;\n}\n.cotizador-topbar[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  min-height: 54px;\n  margin-bottom: 1.25rem;\n  padding: 0.55rem 0.7rem;\n  border: 1px solid var(--%NS%border-color);\n  border-radius: 12px;\n  background: var(--%NS%surface-card);\n  box-shadow: 0 8px 20px var(--%NS%shadow-soft);\n}\n.btn-back[_ngcontent-%COMP%] {\n  min-height: 40px;\n  padding: 0.55rem 0.85rem;\n  border: 1px solid var(--%NS%input-border);\n  border-radius: 8px;\n  background: var(--%NS%surface-subtle);\n  color: var(--%NS%text-silver);\n  transition:\n    background-color 0.2s ease,\n    border-color 0.2s ease,\n    transform 0.2s ease;\n}\n.btn-back[_ngcontent-%COMP%]:hover {\n  border-color: #8bd39a;\n  background: var(--%NS%accent-green-light);\n  color: var(--%NS%accent-green-dark);\n  transform: translateX(-2px);\n}\n.meta-badge[_ngcontent-%COMP%] {\n  min-height: 32px;\n  padding: 0.35rem 0.7rem;\n  border-radius: 7px;\n  background: var(--%NS%accent-green-light);\n  color: var(--%NS%accent-green-dark);\n}\n.cotizador-grid[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  grid-template-columns: minmax(360px, 0.9fr) minmax(0, 1.35fr);\n  gap: 1.25rem;\n}\n.left-column[_ngcontent-%COMP%] {\n  min-width: 0;\n  padding: 0;\n  border: 1px solid var(--%NS%border-color);\n  border-radius: 12px;\n  background: var(--%NS%surface-card);\n  box-shadow: 0 8px 22px var(--%NS%shadow-soft);\n}\n.right-column[_ngcontent-%COMP%] {\n  gap: 1.25rem;\n}\n.right-column[_ngcontent-%COMP%]   app-quote-options[_ngcontent-%COMP%] {\n  display: block;\n  padding: 0.25rem;\n}\n.toast[_ngcontent-%COMP%] {\n  border: 1px solid rgba(139, 226, 140, 0.35);\n  border-radius: 9px;\n  background: #10251f;\n  box-shadow: 0 14px 28px var(--%NS%shadow-medium);\n}\n.btn-back[_ngcontent-%COMP%]:focus-visible, \n.meta-badge[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--%NS%accent-green);\n  outline-offset: 3px;\n}\n@media (max-width: 1024px) {\n  .cotizador-wrapper[_ngcontent-%COMP%] {\n    padding: 1.25rem 1rem 2rem;\n  }\n  .left-column[_ngcontent-%COMP%] {\n    padding: 0;\n  }\n  .cotizador-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 1.5rem;\n  }\n}\n@media (max-width: 600px) {\n  .cotizador-wrapper[_ngcontent-%COMP%] {\n    padding: 1rem 0.75rem 1.5rem;\n  }\n  .cotizador-wrapper[_ngcontent-%COMP%]::before {\n    display: none;\n  }\n  .cotizador-topbar[_ngcontent-%COMP%] {\n    margin-bottom: 1rem;\n    padding: 0.65rem;\n  }\n  .btn-back[_ngcontent-%COMP%], \n   .meta-badge[_ngcontent-%COMP%], \n   .save-indicator[_ngcontent-%COMP%] {\n    justify-content: center;\n    width: 100%;\n  }\n  .cotizador-grid[_ngcontent-%COMP%] {\n    gap: 1rem;\n  }\n  .left-column[_ngcontent-%COMP%] {\n    border-radius: 12px;\n  }\n  .right-column[_ngcontent-%COMP%] {\n    gap: 1rem;\n  }\n  .toast[_ngcontent-%COMP%] {\n    right: 1rem;\n    left: 1rem;\n    bottom: 1rem;\n    width: auto;\n    max-width: none;\n    padding: 0.8rem;\n    text-align: center;\n  }\n}\n@media (max-width: 768px) {\n  .toast[_ngcontent-%COMP%] {\n    bottom: calc(6rem + env(safe-area-inset-bottom, 0px));\n  }\n}\n.save-indicator[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: var(--%NS%text-silver);\n  padding: 0.3rem 0.7rem;\n  border: 1px solid var(--%NS%input-border);\n  border-radius: 30px;\n  background: var(--%NS%surface-subtle);\n  white-space: nowrap;\n}\n.save-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: var(--%NS%accent-green);\n  flex-shrink: 0;\n}\n.save-dot.is-saving[_ngcontent-%COMP%] {\n  background: #f59e0b;\n  animation: _ngcontent-%COMP%_pulse 1.2s infinite;\n}\n.meta-badge.badge-vencida[_ngcontent-%COMP%] {\n  background: #7f1d1d;\n  color: #ffffff;\n  border-color: rgba(255, 255, 255, 0.25);\n}\n/*# sourceMappingURL=cotizador.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CotizadorComponent, [{
    type: Component,
    args: [{ selector: "app-cotizador", standalone: true, imports: [
      CommonModule,
      RouterModule,
      QuoteFormComponent,
      QuoteOptionsComponent,
      QuoteBreakdownComponent
    ], template: `<div class="cotizador-wrapper">
    <!-- Barra superior con bot\xF3n de regreso y vigencia -->
    <div class="cotizador-topbar">
        <a routerLink="/" class="btn-back">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 18 9 12 15 6" />
            </svg>
            Volver a Mis Cotizaciones
        </a>
        <div class="topbar-right">
            <div class="meta-badge" [class.badge-vencida]="isVencida()">
                <span class="pulse-dot" *ngIf="!isVencida()"></span>
                <span>{{ vigenciaLabel() }}</span>
            </div>
            <div class="save-indicator" *ngIf="saveState() === 'saving' || saveState() === 'saved'">
                <span class="save-dot" [class.is-saving]="saveState() === 'saving'"></span>
                <span>{{ saveIndicatorLabel() }}</span>
            </div>
        </div>
    </div>

    <div class="cotizador-grid">
        <div class="left-column">
            <app-quote-form [initialInput]="preloadedInput" (quoteChange)="onQuoteInputChange($event)" (newQuote)="resetQuoteId()" />
        </div>
        <div class="right-column">
            <app-quote-options [calculation]="calculationResult()" (optionSelected)="onOptionSelected($event)" />
            <app-quote-breakdown *ngIf="calculationResult()" [calculation]="calculationResult()"
                (saveQuote)="onSaveQuote()" />
        </div>
    </div>
</div>`, styles: ['/* src/app/components/cotizador/cotizador.css */\n.cotizador-wrapper {\n  max-width: 1600px;\n  margin: 0 auto;\n  padding: 1.25rem 2rem 2.5rem;\n  box-sizing: border-box;\n}\n.cotizador-topbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1.5rem;\n  flex-wrap: wrap;\n  gap: 0.8rem;\n}\n.btn-back {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  background: var(--surface-hover);\n  color: var(--text-silver);\n  padding: 0.5rem 1.2rem;\n  border-radius: 40px;\n  font-weight: 600;\n  font-size: 0.9rem;\n  text-decoration: none;\n  border: 1px solid var(--border-color);\n  transition: all 0.2s ease;\n}\n.btn-back:hover {\n  background: var(--border-color);\n  transform: translateX(-3px);\n}\n.btn-back svg {\n  stroke: currentColor;\n}\n.topbar-right {\n  display: flex;\n  align-items: center;\n}\n.meta-badge {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  background: var(--accent-green-light);\n  border: 1px solid rgba(139, 226, 140, 0.4);\n  padding: 0.3rem 0.8rem;\n  border-radius: 30px;\n  font-size: 0.75rem;\n  font-weight: 700;\n  color: var(--accent-green-dark);\n  white-space: nowrap;\n}\n.pulse-dot {\n  width: 6px;\n  height: 6px;\n  background-color: var(--accent-green);\n  border-radius: 50%;\n  animation: pulse 2s infinite;\n}\n@keyframes pulse {\n  0% {\n    transform: scale(0.95);\n    opacity: 0.9;\n  }\n  50% {\n    transform: scale(1.3);\n    opacity: 0.5;\n  }\n  100% {\n    transform: scale(0.95);\n    opacity: 0.9;\n  }\n}\n.cotizador-grid {\n  display: grid;\n  grid-template-columns: 1fr 1.3fr;\n  gap: 2rem;\n  align-items: start;\n}\n.left-column {\n  min-width: 0;\n}\n.right-column {\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n.toast {\n  position: fixed;\n  bottom: 2rem;\n  right: 2rem;\n  background: var(--accent-green-dark);\n  color: var(--text-on-accent);\n  padding: 0.8rem 1.5rem;\n  border-radius: 12px;\n  font-weight: 700;\n  font-size: 0.9rem;\n  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);\n  animation: slideIn 0.3s ease;\n  z-index: 999;\n}\n@keyframes slideIn {\n  from {\n    transform: translateY(20px);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n@media (max-width: 1024px) {\n  .cotizador-grid {\n    grid-template-columns: 1fr;\n    gap: 2rem;\n  }\n  .cotizador-wrapper {\n    padding: 1rem;\n  }\n  .cotizador-topbar {\n    flex-direction: column;\n    align-items: stretch;\n    gap: 0.6rem;\n  }\n  .btn-back {\n    justify-content: center;\n  }\n  .topbar-right {\n    justify-content: center;\n  }\n}\n.cotizador-wrapper {\n  position: relative;\n  max-width: 1600px;\n  margin: 0 auto;\n  padding: 1.75rem 2rem 2.5rem;\n}\n.cotizador-wrapper::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 38%;\n  height: 180px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(32, 176, 56, 0.09),\n      rgba(16, 37, 31, 0.03));\n  clip-path: polygon(38% 0, 100% 0, 100% 100%, 0 100%);\n  pointer-events: none;\n}\n.cotizador-topbar {\n  position: relative;\n  z-index: 1;\n  min-height: 54px;\n  margin-bottom: 1.25rem;\n  padding: 0.55rem 0.7rem;\n  border: 1px solid var(--border-color);\n  border-radius: 12px;\n  background: var(--surface-card);\n  box-shadow: 0 8px 20px var(--shadow-soft);\n}\n.btn-back {\n  min-height: 40px;\n  padding: 0.55rem 0.85rem;\n  border: 1px solid var(--input-border);\n  border-radius: 8px;\n  background: var(--surface-subtle);\n  color: var(--text-silver);\n  transition:\n    background-color 0.2s ease,\n    border-color 0.2s ease,\n    transform 0.2s ease;\n}\n.btn-back:hover {\n  border-color: #8bd39a;\n  background: var(--accent-green-light);\n  color: var(--accent-green-dark);\n  transform: translateX(-2px);\n}\n.meta-badge {\n  min-height: 32px;\n  padding: 0.35rem 0.7rem;\n  border-radius: 7px;\n  background: var(--accent-green-light);\n  color: var(--accent-green-dark);\n}\n.cotizador-grid {\n  position: relative;\n  z-index: 1;\n  grid-template-columns: minmax(360px, 0.9fr) minmax(0, 1.35fr);\n  gap: 1.25rem;\n}\n.left-column {\n  min-width: 0;\n  padding: 0;\n  border: 1px solid var(--border-color);\n  border-radius: 12px;\n  background: var(--surface-card);\n  box-shadow: 0 8px 22px var(--shadow-soft);\n}\n.right-column {\n  gap: 1.25rem;\n}\n.right-column app-quote-options {\n  display: block;\n  padding: 0.25rem;\n}\n.toast {\n  border: 1px solid rgba(139, 226, 140, 0.35);\n  border-radius: 9px;\n  background: #10251f;\n  box-shadow: 0 14px 28px var(--shadow-medium);\n}\n.btn-back:focus-visible,\n.meta-badge:focus-visible {\n  outline: 2px solid var(--accent-green);\n  outline-offset: 3px;\n}\n@media (max-width: 1024px) {\n  .cotizador-wrapper {\n    padding: 1.25rem 1rem 2rem;\n  }\n  .left-column {\n    padding: 0;\n  }\n  .cotizador-grid {\n    grid-template-columns: 1fr;\n    gap: 1.5rem;\n  }\n}\n@media (max-width: 600px) {\n  .cotizador-wrapper {\n    padding: 1rem 0.75rem 1.5rem;\n  }\n  .cotizador-wrapper::before {\n    display: none;\n  }\n  .cotizador-topbar {\n    margin-bottom: 1rem;\n    padding: 0.65rem;\n  }\n  .btn-back,\n  .meta-badge,\n  .save-indicator {\n    justify-content: center;\n    width: 100%;\n  }\n  .cotizador-grid {\n    gap: 1rem;\n  }\n  .left-column {\n    border-radius: 12px;\n  }\n  .right-column {\n    gap: 1rem;\n  }\n  .toast {\n    right: 1rem;\n    left: 1rem;\n    bottom: 1rem;\n    width: auto;\n    max-width: none;\n    padding: 0.8rem;\n    text-align: center;\n  }\n}\n@media (max-width: 768px) {\n  .toast {\n    bottom: calc(6rem + env(safe-area-inset-bottom, 0px));\n  }\n}\n.save-indicator {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: var(--text-silver);\n  padding: 0.3rem 0.7rem;\n  border: 1px solid var(--input-border);\n  border-radius: 30px;\n  background: var(--surface-subtle);\n  white-space: nowrap;\n}\n.save-dot {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: var(--accent-green);\n  flex-shrink: 0;\n}\n.save-dot.is-saving {\n  background: #f59e0b;\n  animation: pulse 1.2s infinite;\n}\n.meta-badge.badge-vencida {\n  background: #7f1d1d;\n  color: #ffffff;\n  border-color: rgba(255, 255, 255, 0.25);\n}\n/*# sourceMappingURL=cotizador.css.map */\n'] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CotizadorComponent, { className: "CotizadorComponent", filePath: "src/app/components/cotizador/cotizador.ts", lineNumber: 28 });
})();
export {
  CotizadorComponent
};
//# debugId=7e733f78-33d5-515c-adf0-feadc892fe6d
//# sourceMappingURL=chunk-QCVUOKYO.js.map
