import {
  QuoteDraftService,
  computeValidUntil,
  getValidityLabel,
  getValidityStatus
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
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-MVJCDSIT.js";
import {
  Router,
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
  DatePipe,
  NgForOf,
  NgIf,
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
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
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-6KRTW2LJ.js";
import "./chunk-FDMHZOCR.js";

// src/app/components/vendedor/mis-cotizaciones/mis-cotizaciones.ts
function MisCotizacionesComponent_a_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 13);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 14);
    \u0275\u0275element(2, "rect", 15)(3, "rect", 16)(4, "rect", 17)(5, "rect", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275text(6, " Panel de administrador ");
    \u0275\u0275elementEnd();
  }
}
function MisCotizacionesComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19)(1, "div", 20);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 21);
    \u0275\u0275element(3, "circle", 22)(4, "line", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "input", 24);
    \u0275\u0275twoWayListener("ngModelChange", function MisCotizacionesComponent_div_14_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.filtroTexto, $event) || (ctx_r1.filtroTexto = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function MisCotizacionesComponent_div_14_Template_input_input_5_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onFiltroCambiar());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 25)(7, "button", 26);
    \u0275\u0275listener("click", function MisCotizacionesComponent_div_14_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.filtroPeriodo = "todos";
      return \u0275\u0275resetView(ctx_r1.onFiltroCambiar());
    });
    \u0275\u0275text(8, "Todos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 26);
    \u0275\u0275listener("click", function MisCotizacionesComponent_div_14_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.filtroPeriodo = "7dias";
      return \u0275\u0275resetView(ctx_r1.onFiltroCambiar());
    });
    \u0275\u0275text(10, "\xDAltimos 7 d\xEDas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 26);
    \u0275\u0275listener("click", function MisCotizacionesComponent_div_14_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.filtroPeriodo = "30dias";
      return \u0275\u0275resetView(ctx_r1.onFiltroCambiar());
    });
    \u0275\u0275text(12, "\xDAltimos 30 d\xEDas");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.filtroTexto);
    \u0275\u0275control();
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.filtroPeriodo === "todos");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.filtroPeriodo === "7dias");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.filtroPeriodo === "30dias");
  }
}
function MisCotizacionesComponent_div_15_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275element(1, "div", 32);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Cargando cotizaciones...");
    \u0275\u0275elementEnd()();
  }
}
function MisCotizacionesComponent_div_15_div_2_p_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Prueba ajustando los filtros.");
    \u0275\u0275elementEnd();
  }
}
function MisCotizacionesComponent_div_15_div_2_p_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Comienza creando tu primera cotizaci\xF3n.");
    \u0275\u0275elementEnd();
  }
}
function MisCotizacionesComponent_div_15_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33)(1, "div", 34);
    \u0275\u0275text(2, "\u{1F4C4}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "No hay cotizaciones");
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, MisCotizacionesComponent_div_15_div_2_p_5_Template, 2, 0, "p", 35)(6, MisCotizacionesComponent_div_15_div_2_p_6_Template, 2, 0, "p", 35);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r1.filtroTexto || ctx_r1.filtroPeriodo !== "todos");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.filtroTexto && ctx_r1.filtroPeriodo === "todos");
  }
}
function MisCotizacionesComponent_div_15_div_3_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 38)(1, "div", 39)(2, "div", 40)(3, "span", 41);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div")(6, "div", 42);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 43);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "span", 44);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 45);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 46)(16, "div", 47)(17, "span", 48);
    \u0275\u0275text(18, "Precio");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span", 49);
    \u0275\u0275text(20);
    \u0275\u0275pipe(21, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 47)(23, "span", 48);
    \u0275\u0275text(24, "Plazo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "span", 50);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 47)(28, "span", 48);
    \u0275\u0275text(29, "Hora");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "span", 50);
    \u0275\u0275text(31);
    \u0275\u0275pipe(32, "date");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(33, "div", 51)(34, "button", 52);
    \u0275\u0275listener("click", function MisCotizacionesComponent_div_15_div_3_div_1_Template_button_click_34_listener() {
      const item_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.verCotizacion(item_r4));
    });
    \u0275\u0275text(35, " Ver detalle completo ");
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(36, "svg", 53);
    \u0275\u0275element(37, "polyline", 54);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(38, "button", 55);
    \u0275\u0275listener("click", function MisCotizacionesComponent_div_15_div_3_div_1_Template_button_click_38_listener() {
      const item_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.duplicarCotizacion(item_r4));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(39, "svg", 56);
    \u0275\u0275element(40, "rect", 57)(41, "rect", 58);
    \u0275\u0275elementEnd();
    \u0275\u0275text(42, " Duplicar ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const i_r5 = ctx.index;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275styleProp("animation-delay", i_r5 * 0.05 + "s");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate((item_r4.client_name || "?").charAt(0).toUpperCase());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r4.client_name || "Cliente sin nombre");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", item_r4.brand, " ", item_r4.model);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(12, 14, item_r4.created_at, "dd/MM/yyyy"));
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r1.getVigenciaClase(item_r4));
    \u0275\u0275property("title", "Vence el " + ctx_r1.getVigenciaFecha(item_r4));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getVigenciaLabel(item_r4), " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(21, 17, item_r4.pricenet, "MXN", "symbol", "1.0-0"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", item_r4.termmonths, " meses");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(32, 22, item_r4.created_at, "HH:mm"));
  }
}
function MisCotizacionesComponent_div_15_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 36);
    \u0275\u0275template(1, MisCotizacionesComponent_div_15_div_3_div_1_Template, 43, 25, "div", 37);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.cotizacionesFiltradas());
  }
}
function MisCotizacionesComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27);
    \u0275\u0275template(1, MisCotizacionesComponent_div_15_div_1_Template, 4, 0, "div", 28)(2, MisCotizacionesComponent_div_15_div_2_Template, 7, 2, "div", 29)(3, MisCotizacionesComponent_div_15_div_3_Template, 2, 1, "div", 30);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.loading());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.loading() && ctx_r1.cotizacionesFiltradas().length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.loading() && ctx_r1.cotizacionesFiltradas().length > 0);
  }
}
function MisCotizacionesComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 59)(1, "div", 60)(2, "button", 61);
    \u0275\u0275listener("click", function MisCotizacionesComponent_div_16_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.volverAlListado());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 53);
    \u0275\u0275element(4, "polyline", 62);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " Volver al listado ");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "div", 63)(7, "span", 45);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 64);
    \u0275\u0275listener("click", function MisCotizacionesComponent_div_16_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.editarCotizacion());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(10, "svg", 56);
    \u0275\u0275element(11, "path", 65);
    \u0275\u0275elementEnd();
    \u0275\u0275text(12, " Editar cotizaci\xF3n ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(13, "div", 66)(14, "app-quote-breakdown", 67);
    \u0275\u0275listener("saveQuote", function MisCotizacionesComponent_div_16_Template_app_quote_breakdown_saveQuote_14_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.volverAlListado());
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275classMap(ctx_r1.getVigenciaClase(ctx_r1.selectedRow()));
    \u0275\u0275property("title", "Vence el " + ctx_r1.getVigenciaFecha(ctx_r1.selectedRow()));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getVigenciaLabel(ctx_r1.selectedRow()), " ");
    \u0275\u0275advance(6);
    \u0275\u0275property("calculation", ctx_r1.selectedQuote())("mostrarGuardar", false);
  }
}
var MisCotizacionesComponent = class _MisCotizacionesComponent {
  auth = inject(AuthService);
  quotesService = inject(QuotesService);
  calculator = inject(FinancialCalculatorService);
  catalog = inject(CatalogService);
  router = inject(Router);
  draftService = inject(QuoteDraftService);
  toast = inject(ToastService);
  isAdmin = computed(
    () => this.auth.isAdmin(),
    ...ngDevMode ? [{ debugName: "isAdmin" }] : (
      /* istanbul ignore next */
      []
    )
  );
  cotizaciones = signal(
    [],
    ...ngDevMode ? [{ debugName: "cotizaciones" }] : (
      /* istanbul ignore next */
      []
    )
  );
  cotizacionesFiltradas = signal(
    [],
    ...ngDevMode ? [{ debugName: "cotizacionesFiltradas" }] : (
      /* istanbul ignore next */
      []
    )
  );
  loading = signal(
    true,
    ...ngDevMode ? [{ debugName: "loading" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedQuote = signal(
    null,
    ...ngDevMode ? [{ debugName: "selectedQuote" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedRow = signal(
    null,
    ...ngDevMode ? [{ debugName: "selectedRow" }] : (
      /* istanbul ignore next */
      []
    )
  );
  showDetail = signal(
    false,
    ...ngDevMode ? [{ debugName: "showDetail" }] : (
      /* istanbul ignore next */
      []
    )
  );
  // Filtros
  filtroTexto = "";
  filtroPeriodo = "todos";
  // 'todos', '7dias', '30dias'
  async ngOnInit() {
    await Promise.all([
      this.catalog.loadStatePlates(),
      this.catalog.loadCalculatorConfig()
    ]);
    await this.cargarCotizaciones();
  }
  async cargarCotizaciones() {
    this.loading.set(true);
    const user = this.auth.currentUser();
    if (!user) {
      this.loading.set(false);
      return;
    }
    const { data, error } = await this.quotesService.getVendedorQuotes(user.id);
    if (error) {
      this.toast.error("No se pudieron cargar tus cotizaciones. Intenta de nuevo.");
      this.loading.set(false);
      return;
    }
    this.cotizaciones.set(data || []);
    this.aplicarFiltros();
    this.loading.set(false);
  }
  aplicarFiltros() {
    let items = this.cotizaciones();
    if (this.filtroTexto.trim()) {
      const term = this.filtroTexto.toLowerCase().trim();
      items = items.filter((item) => (item.client_name || "").toLowerCase().includes(term) || (item.brand || "").toLowerCase().includes(term) || (item.model || "").toLowerCase().includes(term));
    }
    if (this.filtroPeriodo !== "todos") {
      const ahora = /* @__PURE__ */ new Date();
      const limite = /* @__PURE__ */ new Date();
      if (this.filtroPeriodo === "7dias") {
        limite.setDate(ahora.getDate() - 7);
      } else if (this.filtroPeriodo === "30dias") {
        limite.setDate(ahora.getDate() - 30);
      }
      items = items.filter((item) => {
        const fecha = new Date(item.created_at);
        return fecha >= limite;
      });
    }
    this.cotizacionesFiltradas.set(items);
  }
  onFiltroCambiar() {
    this.aplicarFiltros();
  }
  async verCotizacion(cotizacion) {
    this.selectedRow.set(cotizacion);
    const snapshot = await this.quotesService.getQuoteCalculation(cotizacion.id);
    if (snapshot) {
      this.selectedQuote.set(snapshot);
      this.showDetail.set(true);
      return;
    }
    const result = this.calculator.calculateQuote(this.buildInputFromRow(cotizacion));
    this.selectedQuote.set(result);
    this.showDetail.set(true);
  }
  /**
   * Convierte una fila de la BD (quotes) en la entrada que consume el motor de cálculo.
   * Se usa tanto para "Ver detalle" como para "Duplicar" / "Editar".
   */
  buildInputFromRow(row) {
    return {
      clientName: row.client_name || "",
      brand: row.brand,
      model: row.model,
      year: row.year,
      priceNet: row.pricenet,
      isHybridOrElectric: row.ishybridorelectric || false,
      termMonths: row.termmonths || 48,
      extraordinaryRentPct: row.extraordinaryrentpct || 0.1,
      securityDepositPct: row.securitydepositpct || 0,
      selectedStatePlateId: row.selectedstateplateid || "pendiente",
      isInsuranceEstimated: row.isinsuranceestimated || false
    };
  }
  // ===================== DUPLICAR / EDITAR =====================
  duplicarCotizacion(row) {
    this.draftService.setDraft(this.buildInputFromRow(row));
    this.toast.success("Cotizaci\xF3n duplicada. Ajusta los datos y gu\xE1rdala.");
    this.router.navigate(["/cotizador"]);
  }
  editarCotizacion() {
    const row = this.selectedRow();
    if (!row)
      return;
    const validUntil = row.valid_until ?? computeValidUntil(row?.created_at ?? /* @__PURE__ */ new Date()).toISOString();
    this.draftService.setDraft(this.buildInputFromRow(row), row.id, validUntil);
    this.toast.info("Editando cotizaci\xF3n existente. Los cambios se guardar\xE1n sobre ella.");
    this.router.navigate(["/cotizador"]);
  }
  // ===================== VIGENCIA =====================
  getVigenciaEstado(row) {
    if (row?.valid_until) {
      return getValidityStatus(row.valid_until);
    }
    return getValidityStatus(computeValidUntil(row?.created_at ?? /* @__PURE__ */ new Date()));
  }
  getVigenciaLabel(row) {
    return getValidityLabel(this.getVigenciaEstado(row));
  }
  getVigenciaClase(row) {
    return `vigencia-${this.getVigenciaEstado(row)}`;
  }
  getVigenciaFecha(row) {
    if (row?.valid_until) {
      return new Date(row.valid_until).toLocaleDateString("es-MX", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      });
    }
    return computeValidUntil(row?.created_at ?? /* @__PURE__ */ new Date()).toLocaleDateString("es-MX", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  }
  volverAlListado() {
    this.showDetail.set(false);
    this.selectedQuote.set(null);
    this.selectedRow.set(null);
  }
  static \u0275fac = function MisCotizacionesComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MisCotizacionesComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MisCotizacionesComponent, selectors: [["app-mis-cotizaciones"]], decls: 17, vars: 5, consts: [[1, "dashboard-cotizaciones"], [1, "dashboard-header"], [1, "header-left"], [1, "counter"], [1, "header-actions"], ["routerLink", "/cotizador", 1, "btn-primary"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5"], ["x1", "12", "y1", "5", "x2", "12", "y2", "19"], ["x1", "5", "y1", "12", "x2", "19", "y2", "12"], ["routerLink", "/admin", "class", "btn-primary admin-link", 4, "ngIf"], ["class", "filters-panel", 4, "ngIf"], ["class", "content-area", 4, "ngIf"], ["class", "detail-view", 4, "ngIf"], ["routerLink", "/admin", 1, "btn-primary", "admin-link"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["x", "3", "y", "3", "width", "7", "height", "7"], ["x", "14", "y", "3", "width", "7", "height", "7"], ["x", "14", "y", "14", "width", "7", "height", "7"], ["x", "3", "y", "14", "width", "7", "height", "7"], [1, "filters-panel"], [1, "search-box"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "search-icon"], ["cx", "11", "cy", "11", "r", "8"], ["x1", "21", "y1", "21", "x2", "16.65", "y2", "16.65"], ["type", "text", "placeholder", "Buscar por cliente, marca o modelo...", 1, "search-input", 3, "ngModelChange", "input", "ngModel"], [1, "period-selector"], [1, "period-btn", 3, "click"], [1, "content-area"], ["class", "loading-state", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "cards-grid", 4, "ngIf"], [1, "loading-state"], [1, "spinner"], [1, "empty-state"], [1, "empty-icon"], [4, "ngIf"], [1, "cards-grid"], ["class", "quote-card", 3, "animation-delay", 4, "ngFor", "ngForOf"], [1, "quote-card"], [1, "card-header"], [1, "client-info"], [1, "client-initial"], [1, "client-name"], [1, "vehicle-name"], [1, "date-badge"], [1, "vigencia-badge", 3, "title"], [1, "card-body"], [1, "detail-item"], [1, "detail-label"], [1, "detail-value", "price"], [1, "detail-value"], [1, "card-footer"], [1, "btn-view-detail", 3, "click"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["points", "9 18 15 12 9 6"], ["title", "Duplicar cotizaci\xF3n", "aria-label", "Duplicar cotizaci\xF3n", 1, "btn-duplicate", 3, "click"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["x", "4", "y", "4", "width", "16", "height", "16", "rx", "3"], ["x", "8", "y", "8", "width", "16", "height", "16", "rx", "3"], [1, "detail-view"], [1, "detail-header"], [1, "btn-back", 3, "click"], ["points", "15 18 9 12 15 6"], [1, "detail-actions"], ["title", "Editar cotizaci\xF3n", "aria-label", "Editar cotizaci\xF3n", 1, "btn-edit-quote", 3, "click"], ["d", "M11 4h6M5 5h11M5 11h11M11 12h6"], [1, "detail-content"], [3, "saveQuote", "calculation", "mostrarGuardar"]], template: function MisCotizacionesComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "div", 2)(3, "h1");
      \u0275\u0275text(4, "Mis Cotizaciones");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "span", 3);
      \u0275\u0275text(6);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "div", 4)(8, "a", 5);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(9, "svg", 6);
      \u0275\u0275element(10, "line", 7)(11, "line", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275text(12, " Nueva Cotizaci\xF3n ");
      \u0275\u0275elementEnd();
      \u0275\u0275template(13, MisCotizacionesComponent_a_13_Template, 7, 0, "a", 9);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(14, MisCotizacionesComponent_div_14_Template, 13, 7, "div", 10)(15, MisCotizacionesComponent_div_15_Template, 4, 3, "div", 11)(16, MisCotizacionesComponent_div_16_Template, 15, 6, "div", 12);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1("", ctx.cotizacionesFiltradas().length, " cotizaciones");
      \u0275\u0275advance(7);
      \u0275\u0275property("ngIf", ctx.isAdmin());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.showDetail());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.showDetail());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showDetail() && ctx.selectedQuote());
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, RouterModule, RouterLink, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, QuoteBreakdownComponent, CurrencyPipe, DatePipe], styles: ['\n.dashboard-cotizaciones[_ngcontent-%COMP%] {\n  max-width: 1280px;\n  margin: 0 auto;\n  padding: 2rem;\n  font-family:\n    "Inter",\n    -apple-system,\n    BlinkMacSystemFont,\n    sans-serif;\n  color: var(--%NS%text-main);\n}\n.dashboard-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 2.5rem;\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n.header-left[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  gap: 0.8rem;\n}\n.header-left[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-family: "Fjalla One", sans-serif;\n  font-size: 2.2rem;\n  letter-spacing: -0.5px;\n  margin: 0;\n  color: var(--%NS%text-main);\n}\n.header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n}\n.counter[_ngcontent-%COMP%] {\n  background: var(--%NS%border-color);\n  color: var(--%NS%text-silver);\n  padding: 0.2rem 0.9rem;\n  border-radius: 30px;\n  font-size: 0.8rem;\n  font-weight: 600;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  background:\n    linear-gradient(\n      135deg,\n      var(--%NS%accent-green-dark),\n      var(--%NS%accent-green));\n  color: var(--%NS%text-on-accent);\n  padding: 0.7rem 1.6rem;\n  border-radius: 40px;\n  font-weight: 700;\n  font-size: 0.9rem;\n  text-decoration: none;\n  transition: all 0.25s ease;\n  box-shadow: 0 4px 12px rgba(32, 176, 56, 0.25);\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px) scale(1.02);\n  box-shadow: 0 10px 28px rgba(32, 176, 56, 0.35);\n}\n.admin-link[_ngcontent-%COMP%] {\n  background: var(--%NS%text-main);\n  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.2);\n}\n.admin-link[_ngcontent-%COMP%]:hover {\n  background: #1e293b;\n  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.3);\n}\n.filters-panel[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 1.2rem;\n  background: var(--%NS%surface-card);\n  padding: 0.7rem 1.5rem;\n  border-radius: 60px;\n  border: 1px solid var(--%NS%border-color);\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);\n  margin-bottom: 2.5rem;\n}\n.search-box[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 200px;\n  position: relative;\n}\n.search-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 0.8rem;\n  top: 50%;\n  transform: translateY(-50%);\n  color: var(--%NS%accent-silver);\n}\n.search-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.7rem 0.8rem 0.7rem 2.6rem;\n  border: 1px solid transparent;\n  border-radius: 40px;\n  font-size: 0.9rem;\n  background: var(--%NS%surface-hover);\n  transition: all 0.25s;\n}\n.search-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  background: var(--%NS%surface-card);\n  border-color: var(--%NS%accent-green);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.1);\n}\n.period-selector[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.3rem;\n  flex-wrap: wrap;\n}\n.period-btn[_ngcontent-%COMP%] {\n  padding: 0.3rem 1.2rem;\n  border: 1px solid var(--%NS%border-color);\n  border-radius: 40px;\n  background: transparent;\n  font-weight: 600;\n  font-size: 0.8rem;\n  color: var(--%NS%text-silver);\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.period-btn[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%surface-hover);\n}\n.period-btn.active[_ngcontent-%COMP%] {\n  background: var(--%NS%accent-green-dark);\n  border-color: var(--%NS%accent-green-dark);\n  color: var(--%NS%text-on-accent);\n}\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 5rem 2rem;\n  color: var(--%NS%text-muted);\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border: 4px solid var(--%NS%border-color);\n  border-top-color: var(--%NS%accent-green);\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n  margin-bottom: 1rem;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 5rem 2rem;\n  background: var(--%NS%surface-subtle);\n  border-radius: 24px;\n  border: 1px dashed var(--%NS%border-strong);\n  text-align: center;\n}\n.empty-icon[_ngcontent-%COMP%] {\n  font-size: 3rem;\n  margin-bottom: 1rem;\n}\n.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-family: "Fjalla One", sans-serif;\n  font-size: 1.4rem;\n  margin: 0 0 0.3rem;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--%NS%text-muted);\n  margin: 0.2rem 0;\n}\n.cards-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));\n  gap: 2rem;\n  margin-top: 0.5rem;\n}\n.quote-card[_ngcontent-%COMP%] {\n  background: var(--%NS%surface-card);\n  border-radius: 20px;\n  border: 1px solid var(--%NS%border-color);\n  padding: 2rem;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  animation: _ngcontent-%COMP%_fadeInUp 0.5s ease forwards;\n  opacity: 0;\n  transform: translateY(20px);\n}\n.quote-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-6px);\n  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.06);\n  border-color: var(--%NS%accent-green);\n}\n@keyframes _ngcontent-%COMP%_fadeInUp {\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.card-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 1.2rem;\n}\n.client-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.8rem;\n}\n.client-initial[_ngcontent-%COMP%] {\n  width: 42px;\n  height: 42px;\n  background:\n    linear-gradient(\n      135deg,\n      var(--%NS%accent-green),\n      var(--%NS%accent-green-dark));\n  color: var(--%NS%text-on-accent);\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: 1.1rem;\n  flex-shrink: 0;\n}\n.client-name[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 1rem;\n  color: var(--%NS%text-main);\n}\n.vehicle-name[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: var(--%NS%text-silver);\n}\n.date-badge[_ngcontent-%COMP%] {\n  background: var(--%NS%surface-hover);\n  padding: 0.2rem 0.8rem;\n  border-radius: 30px;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: var(--%NS%text-silver);\n  white-space: nowrap;\n}\n.card-body[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 1rem;\n  margin: 1.2rem 0 1.5rem;\n}\n.detail-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.15rem;\n}\n.detail-label[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  text-transform: uppercase;\n  letter-spacing: 0.4px;\n  color: var(--%NS%accent-silver);\n  font-weight: 600;\n}\n.detail-value[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 1.05rem;\n  color: var(--%NS%text-main);\n}\n.detail-value.price[_ngcontent-%COMP%] {\n  color: var(--%NS%accent-green-dark);\n}\n.card-footer[_ngcontent-%COMP%] {\n  border-top: 1px solid var(--%NS%border-color);\n  padding-top: 1.2rem;\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.6rem;\n  flex-wrap: wrap;\n}\n.btn-view-detail[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  background: transparent;\n  border: none;\n  color: var(--%NS%accent-green-dark);\n  font-weight: 600;\n  font-size: 0.85rem;\n  cursor: pointer;\n  transition: all 0.2s;\n  padding: 0.3rem 0.5rem;\n  border-radius: 30px;\n}\n.btn-view-detail[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%accent-green-light);\n}\n.btn-view-detail[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  transition: transform 0.25s;\n}\n.btn-view-detail[_ngcontent-%COMP%]:hover   svg[_ngcontent-%COMP%] {\n  transform: translateX(4px);\n}\n.detail-view[_ngcontent-%COMP%] {\n  margin-top: 1.5rem;\n}\n.detail-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: 0.75rem;\n  margin-bottom: 1.5rem;\n}\n.btn-back[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  background: var(--%NS%surface-card);\n  border: 1px solid var(--%NS%border-color);\n  border-radius: 40px;\n  padding: 0.5rem 1.5rem;\n  font-weight: 600;\n  color: var(--%NS%text-silver);\n  cursor: pointer;\n  transition: all 0.25s;\n}\n.btn-back[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%surface-subtle);\n  border-color: var(--%NS%border-strong);\n}\n.btn-back[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  stroke: currentColor;\n}\n.detail-content[_ngcontent-%COMP%] {\n  background: var(--%NS%surface-card);\n  border-radius: 24px;\n  padding: 2rem;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);\n}\n@media (max-width: 768px) {\n  .dashboard-cotizaciones[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .dashboard-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n    gap: 0.8rem;\n  }\n  .btn-primary[_ngcontent-%COMP%] {\n    justify-content: center;\n    width: 100%;\n  }\n  .header-actions[_ngcontent-%COMP%] {\n    width: 100%;\n    flex-direction: column;\n    align-items: stretch;\n    gap: 0.6rem;\n  }\n  .filters-panel[_ngcontent-%COMP%] {\n    flex-direction: column;\n    border-radius: 24px;\n    padding: 1rem 1.2rem;\n    gap: 0.8rem;\n  }\n  .search-box[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .period-selector[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n  }\n  .cards-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 1.5rem;\n  }\n  .quote-card[_ngcontent-%COMP%] {\n    padding: 1.5rem;\n  }\n  .card-body[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr;\n    gap: 0.8rem;\n    margin: 1rem 0 1.2rem;\n  }\n  .detail-value[_ngcontent-%COMP%] {\n    font-size: 0.95rem;\n  }\n  .detail-content[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n}\n.dashboard-cotizaciones[_ngcontent-%COMP%] {\n  position: relative;\n  max-width: 1400px;\n  margin: 1.5rem auto 0;\n  padding: 0;\n  overflow: hidden;\n}\n.dashboard-cotizaciones[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 38%;\n  height: 190px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(32, 176, 56, 0.14),\n      rgba(16, 37, 31, 0.07));\n  clip-path: polygon(35% 0, 100% 0, 100% 100%, 0 100%);\n  pointer-events: none;\n}\n.dashboard-cotizaciones[_ngcontent-%COMP%]   .dashboard-header[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  min-height: 164px;\n  align-items: flex-end;\n  margin: 0 0 1.25rem;\n  padding: 1.5rem 1.75rem;\n  border: 1px solid rgba(139, 226, 140, 0.22);\n  border-radius: 16px;\n  background:\n    linear-gradient(\n      115deg,\n      #10251f 0%,\n      #173c2e 68%,\n      #1f6840 100%);\n  box-shadow: 0 16px 30px rgba(16, 37, 31, 0.16);\n}\n.dashboard-cotizaciones[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%] {\n  align-items: flex-start;\n  flex-direction: column;\n  gap: 0.35rem;\n}\n.dashboard-cotizaciones[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%]::before {\n  content: "Actividad comercial";\n  color: #8be28c;\n  font-size: 0.68rem;\n  font-weight: 700;\n  letter-spacing: 1.2px;\n  text-transform: uppercase;\n}\n.dashboard-cotizaciones[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  color: #ffffff;\n  font-size: 2rem;\n  line-height: 1;\n}\n.dashboard-cotizaciones[_ngcontent-%COMP%]   .counter[_ngcontent-%COMP%] {\n  padding: 0.3rem 0.7rem;\n  border: 1px solid rgba(139, 226, 140, 0.3);\n  border-radius: 6px;\n  background: rgba(255, 255, 255, 0.08);\n  color: #d5f0dc;\n  font-size: 0.72rem;\n}\n.dashboard-cotizaciones[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%] {\n  min-height: 44px;\n  padding: 0.75rem 1rem;\n  border: 0;\n  border-radius: 9px;\n  background: var(--%NS%btn-primary-bg);\n  color: var(--%NS%btn-primary-text);\n  box-shadow: none;\n}\n.dashboard-cotizaciones[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%btn-primary-bg-hover);\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.16);\n}\n.dashboard-cotizaciones[_ngcontent-%COMP%]   .filters-panel[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  align-items: stretch;\n  gap: 0.9rem;\n  margin-bottom: 1.25rem;\n  padding: 0.85rem;\n  border: 1px solid var(--%NS%border-color);\n  border-radius: 14px;\n  background: var(--%NS%surface-card);\n  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.05);\n}\n.dashboard-cotizaciones[_ngcontent-%COMP%]   .search-box[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  min-height: 42px;\n}\n.dashboard-cotizaciones[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%] {\n  min-height: 42px;\n  border: 1px solid var(--%NS%border-color);\n  border-radius: 9px;\n  background: var(--%NS%surface-subtle);\n}\n.dashboard-cotizaciones[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%]:focus {\n  background: var(--%NS%surface-card);\n  border-color: var(--%NS%accent-green);\n}\n.dashboard-cotizaciones[_ngcontent-%COMP%]   .period-selector[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.35rem;\n  padding: 0.25rem;\n  border: 1px solid var(--%NS%surface-muted);\n  border-radius: 9px;\n  background: var(--%NS%surface-subtle);\n}\n.dashboard-cotizaciones[_ngcontent-%COMP%]   .period-btn[_ngcontent-%COMP%] {\n  min-height: 34px;\n  padding: 0.45rem 0.75rem;\n  border: 1px solid transparent;\n  border-radius: 7px;\n}\n.dashboard-cotizaciones[_ngcontent-%COMP%]   .period-btn.active[_ngcontent-%COMP%] {\n  background: #10251f;\n  border-color: var(--%NS%accent-slate);\n  color: #ffffff;\n}\n.dashboard-cotizaciones[_ngcontent-%COMP%]   .content-area[_ngcontent-%COMP%], \n.dashboard-cotizaciones[_ngcontent-%COMP%]   .detail-view[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n}\n.dashboard-cotizaciones[_ngcontent-%COMP%]   .cards-grid[_ngcontent-%COMP%] {\n  gap: 1.15rem;\n}\n.dashboard-cotizaciones[_ngcontent-%COMP%]   .quote-card[_ngcontent-%COMP%] {\n  padding: 1.35rem;\n  border: 1px solid var(--%NS%border-color);\n  border-radius: 13px;\n  background: var(--%NS%surface-card);\n  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.05);\n}\n.dashboard-cotizaciones[_ngcontent-%COMP%]   .quote-card[_ngcontent-%COMP%]:hover {\n  border-color: #8bd39a;\n  box-shadow: 0 16px 30px rgba(15, 23, 42, 0.1);\n}\n.dashboard-cotizaciones[_ngcontent-%COMP%]   .client-initial[_ngcontent-%COMP%] {\n  border-radius: 11px;\n  background: var(--%NS%accent-green-light);\n  color: var(--%NS%accent-green-dark);\n}\n.dashboard-cotizaciones[_ngcontent-%COMP%]   .date-badge[_ngcontent-%COMP%] {\n  border: 1px solid var(--%NS%border-color);\n  border-radius: 6px;\n  background: var(--%NS%surface-subtle);\n}\n.dashboard-cotizaciones[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n  margin: 1rem 0 1.15rem;\n  padding: 0.9rem;\n  border: 1px solid var(--%NS%surface-muted);\n  border-radius: 9px;\n  background: var(--%NS%surface-subtle);\n}\n.dashboard-cotizaciones[_ngcontent-%COMP%]   .client-name[_ngcontent-%COMP%] {\n  color: var(--%NS%btn-primary-text);\n}\n.dashboard-cotizaciones[_ngcontent-%COMP%]   .vehicle-name[_ngcontent-%COMP%] {\n  color: var(--%NS%text-muted);\n}\n.dashboard-cotizaciones[_ngcontent-%COMP%]   .detail-label[_ngcontent-%COMP%] {\n  color: var(--%NS%accent-silver);\n}\n.dashboard-cotizaciones[_ngcontent-%COMP%]   .detail-value[_ngcontent-%COMP%] {\n  color: var(--%NS%text-silver);\n}\n.dashboard-cotizaciones[_ngcontent-%COMP%]   .card-footer[_ngcontent-%COMP%] {\n  padding-top: 0.9rem;\n  border-top-color: var(--%NS%surface-muted);\n}\n.dashboard-cotizaciones[_ngcontent-%COMP%]   .btn-view-detail[_ngcontent-%COMP%] {\n  min-height: 36px;\n  padding: 0.5rem 0.7rem;\n  border: 1px solid #8bd39a;\n  border-radius: 7px;\n  background: var(--%NS%accent-green-light);\n  color: var(--%NS%accent-green-dark);\n  font-weight: 700;\n}\n.dashboard-cotizaciones[_ngcontent-%COMP%]   .btn-view-detail[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%accent-green-light);\n}\n.dashboard-cotizaciones[_ngcontent-%COMP%]   .empty-state[_ngcontent-%COMP%] {\n  min-height: 240px;\n  border-radius: 14px;\n  background: var(--%NS%surface-card);\n}\n.dashboard-cotizaciones[_ngcontent-%COMP%]   .detail-content[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  border: 1px solid var(--%NS%border-color);\n  border-radius: 14px;\n  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.05);\n}\n@media (max-width: 768px) {\n  .dashboard-cotizaciones[_ngcontent-%COMP%] {\n    margin-top: 1rem;\n    padding: 0 0.85rem 1.5rem;\n  }\n  .dashboard-cotizaciones[_ngcontent-%COMP%]   .dashboard-header[_ngcontent-%COMP%] {\n    min-height: 0;\n    align-items: stretch;\n    padding: 1.25rem;\n  }\n  .dashboard-cotizaciones[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 1.7rem;\n  }\n  .dashboard-cotizaciones[_ngcontent-%COMP%]   .period-selector[_ngcontent-%COMP%] {\n    width: 100%;\n    overflow-x: auto;\n  }\n  .dashboard-cotizaciones[_ngcontent-%COMP%]   .period-btn[_ngcontent-%COMP%] {\n    flex: 1 0 auto;\n    white-space: nowrap;\n  }\n  .dashboard-cotizaciones[_ngcontent-%COMP%]   .filters-panel[_ngcontent-%COMP%] {\n    margin-bottom: 1.5rem;\n  }\n  .dashboard-cotizaciones[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr;\n  }\n  .dashboard-cotizaciones[_ngcontent-%COMP%]   .client-info[_ngcontent-%COMP%] {\n    flex: 1 1 auto;\n    min-width: 0;\n  }\n  .dashboard-cotizaciones[_ngcontent-%COMP%]   .client-info[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n    flex: 1;\n    min-width: 0;\n  }\n  .dashboard-cotizaciones[_ngcontent-%COMP%]   .client-name[_ngcontent-%COMP%], \n   .dashboard-cotizaciones[_ngcontent-%COMP%]   .vehicle-name[_ngcontent-%COMP%] {\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n  .dashboard-cotizaciones[_ngcontent-%COMP%]   .btn-view-detail[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n    min-height: 44px;\n  }\n}\n@media (max-width: 480px) {\n  .dashboard-cotizaciones[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .dashboard-cotizaciones[_ngcontent-%COMP%]   .quote-card[_ngcontent-%COMP%] {\n    padding: 1.1rem;\n  }\n  .dashboard-cotizaciones[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n  .dashboard-cotizaciones[_ngcontent-%COMP%]   .client-initial[_ngcontent-%COMP%] {\n    width: 38px;\n    height: 38px;\n    font-size: 1rem;\n  }\n  .dashboard-cotizaciones[_ngcontent-%COMP%]   .period-btn[_ngcontent-%COMP%] {\n    padding: 0.4rem 0.85rem;\n  }\n  .dashboard-cotizaciones[_ngcontent-%COMP%]   .detail-content[_ngcontent-%COMP%] {\n    padding: 0.75rem;\n    border-radius: 16px;\n  }\n  .detail-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n    gap: 0.75rem;\n  }\n  .detail-header[_ngcontent-%COMP%]   .vigencia-badge[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    gap: 0.35rem;\n    padding: 0.2rem 0.7rem;\n    border-radius: 30px;\n    font-size: 0.72rem;\n    font-weight: 700;\n    white-space: nowrap;\n  }\n  .detail-header[_ngcontent-%COMP%]   .vigencia-badge[_ngcontent-%COMP%]::before {\n    content: "";\n    width: 7px;\n    height: 7px;\n    border-radius: 50%;\n    background: currentColor;\n    flex-shrink: 0;\n  }\n  .detail-header[_ngcontent-%COMP%]   .vigencia-badge.vigencia-vigente[_ngcontent-%COMP%] {\n    background: var(--%NS%accent-green-light);\n    color: var(--%NS%accent-green-dark);\n    border: 1px solid rgba(139, 226, 140, 0.4);\n  }\n  .detail-header[_ngcontent-%COMP%]   .vigencia-badge.vigencia-proxima[_ngcontent-%COMP%] {\n    background: #fef3c7;\n    color: #b45309;\n    border: 1px solid rgba(245, 158, 11, 0.4);\n  }\n  .detail-header[_ngcontent-%COMP%]   .vigencia-badge.vigencia-vencida[_ngcontent-%COMP%] {\n    background: #fde8e8;\n    color: #b91c1c;\n    border: 1px solid rgba(239, 68, 68, 0.4);\n  }\n  .detail-header[_ngcontent-%COMP%]   .btn-duplicate[_ngcontent-%COMP%], \n   .detail-header[_ngcontent-%COMP%]   .btn-edit-quote[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    gap: 0.45rem;\n    min-height: 36px;\n    padding: 0.4rem 0.9rem;\n    border-radius: 30px;\n    font-weight: 600;\n    font-size: 0.82rem;\n    cursor: pointer;\n    transition: all 0.2s ease;\n    white-space: nowrap;\n  }\n  .detail-header[_ngcontent-%COMP%]   .btn-duplicate[_ngcontent-%COMP%] {\n    background: var(--%NS%surface-subtle);\n    border: 1px solid var(--%NS%border-color);\n    color: var(--%NS%text-silver);\n  }\n  .detail-header[_ngcontent-%COMP%]   .btn-duplicate[_ngcontent-%COMP%]:hover, \n   .detail-header[_ngcontent-%COMP%]   .btn-duplicate[_ngcontent-%COMP%]:focus-visible {\n    background: var(--%NS%surface-hover);\n    border-color: var(--%NS%border-strong);\n    color: var(--%NS%text-main);\n  }\n  .detail-header[_ngcontent-%COMP%]   .btn-edit-quote[_ngcontent-%COMP%] {\n    border: 1px solid rgba(139, 226, 140, 0.35);\n    background: var(--%NS%accent-green-light);\n    color: var(--%NS%accent-green-dark);\n  }\n  .detail-header[_ngcontent-%COMP%]   .btn-edit-quote[_ngcontent-%COMP%]:hover, \n   .detail-header[_ngcontent-%COMP%]   .btn-edit-quote[_ngcontent-%COMP%]:focus-visible {\n    background: var(--%NS%accent-green);\n    color: var(--%NS%text-on-accent);\n    border-color: var(--%NS%accent-green);\n  }\n  .detail-header[_ngcontent-%COMP%]   .btn-duplicate[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%], \n   .detail-header[_ngcontent-%COMP%]   .btn-edit-quote[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n    flex-shrink: 0;\n    transition: transform 0.2s ease;\n  }\n  .detail-header[_ngcontent-%COMP%]   .btn-duplicate[_ngcontent-%COMP%]:hover   svg[_ngcontent-%COMP%], \n   .detail-header[_ngcontent-%COMP%]   .btn-edit-quote[_ngcontent-%COMP%]:hover   svg[_ngcontent-%COMP%] {\n    transform: translateX(4px);\n  }\n  .detail-header[_ngcontent-%COMP%]   .btn-duplicate[_ngcontent-%COMP%]:focus-visible, \n   .detail-header[_ngcontent-%COMP%]   .btn-edit-quote[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%accent-green);\n    outline-offset: 2px;\n  }\n  .detail-header[_ngcontent-%COMP%]   .detail-actions[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 0.75rem;\n    flex-wrap: wrap;\n  }\n  .detail-header[_ngcontent-%COMP%]   .dashboard-cotizaciones[_ngcontent-%COMP%]   .card-footer[_ngcontent-%COMP%] {\n    gap: 0.5rem;\n  }\n  @media (max-width: 768px) {\n    .detail-header[_ngcontent-%COMP%]   .dashboard-cotizaciones[_ngcontent-%COMP%]   .card-footer[_ngcontent-%COMP%] {\n      flex-wrap: wrap;\n      width: 100%;\n    }\n    .detail-header[_ngcontent-%COMP%]   .dashboard-cotizaciones[_ngcontent-%COMP%]   .btn-duplicate[_ngcontent-%COMP%] {\n      width: 100%;\n      justify-content: center;\n    }\n    .detail-header[_ngcontent-%COMP%]   .detail-header[_ngcontent-%COMP%]   .btn-back[_ngcontent-%COMP%], \n   .detail-header[_ngcontent-%COMP%]   .detail-header[_ngcontent-%COMP%]   .btn-edit-quote[_ngcontent-%COMP%] {\n      width: 100%;\n      justify-content: center;\n    }\n  }\n}\n/*# sourceMappingURL=mis-cotizaciones.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MisCotizacionesComponent, [{
    type: Component,
    args: [{ selector: "app-mis-cotizaciones", standalone: true, imports: [CommonModule, RouterModule, FormsModule, QuoteBreakdownComponent], template: `<div class="dashboard-cotizaciones">
    <!-- Encabezado -->
    <header class="dashboard-header">
        <div class="header-left">
            <h1>Mis Cotizaciones</h1>
            <span class="counter">{{ cotizacionesFiltradas().length }} cotizaciones</span>
        </div>
        <div class="header-actions">
            <a routerLink="/cotizador" class="btn-primary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Nueva Cotizaci\xF3n
            </a>
            <a *ngIf="isAdmin()" routerLink="/admin" class="btn-primary admin-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                </svg>
                Panel de administrador
            </a>
        </div>
    </header>

    <!-- Filtros integrados -->
    <div class="filters-panel" *ngIf="!showDetail()">
        <div class="search-box">
            <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input type="text" [(ngModel)]="filtroTexto" (input)="onFiltroCambiar()"
                placeholder="Buscar por cliente, marca o modelo..." class="search-input" />
        </div>
        <div class="period-selector">
            <button class="period-btn" [class.active]="filtroPeriodo === 'todos'"
                (click)="filtroPeriodo='todos'; onFiltroCambiar()">Todos</button>
            <button class="period-btn" [class.active]="filtroPeriodo === '7dias'"
                (click)="filtroPeriodo='7dias'; onFiltroCambiar()">\xDAltimos 7 d\xEDas</button>
            <button class="period-btn" [class.active]="filtroPeriodo === '30dias'"
                (click)="filtroPeriodo='30dias'; onFiltroCambiar()">\xDAltimos 30 d\xEDas</button>
        </div>
    </div>

    <!-- Contenido principal -->
    <div class="content-area" *ngIf="!showDetail()">
        <!-- Cargando -->
        <div *ngIf="loading()" class="loading-state">
            <div class="spinner"></div>
            <p>Cargando cotizaciones...</p>
        </div>

        <!-- Vac\xEDo -->
        <div *ngIf="!loading() && cotizacionesFiltradas().length === 0" class="empty-state">
            <div class="empty-icon">\u{1F4C4}</div>
            <h3>No hay cotizaciones</h3>
            <p *ngIf="filtroTexto || filtroPeriodo !== 'todos'">Prueba ajustando los filtros.</p>
            <p *ngIf="!filtroTexto && filtroPeriodo === 'todos'">Comienza creando tu primera cotizaci\xF3n.</p>
        </div>

        <!-- Grid de tarjetas -->
        <div *ngIf="!loading() && cotizacionesFiltradas().length > 0" class="cards-grid">
            <div *ngFor="let item of cotizacionesFiltradas(); let i = index" class="quote-card"
                [style.animation-delay]="(i * 0.05) + 's'">
                <div class="card-header">
                    <div class="client-info">
                        <span class="client-initial">{{ (item.client_name || '?').charAt(0).toUpperCase() }}</span>
                        <div>
                            <div class="client-name">{{ item.client_name || 'Cliente sin nombre' }}</div>
                            <div class="vehicle-name">{{ item.brand }} {{ item.model }}</div>
                        </div>
                    </div>
                    <span class="date-badge">{{ item.created_at | date:'dd/MM/yyyy' }}</span>
                    <span class="vigencia-badge" [class]="getVigenciaClase(item)"
                        [title]="'Vence el ' + getVigenciaFecha(item)">
                        {{ getVigenciaLabel(item) }}
                    </span>
                </div>

                <div class="card-body">
                    <div class="detail-item">
                        <span class="detail-label">Precio</span>
                        <span class="detail-value price">{{ item.pricenet | currency:'MXN':'symbol':'1.0-0' }}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Plazo</span>
                        <span class="detail-value">{{ item.termmonths }} meses</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Hora</span>
                        <span class="detail-value">{{ item.created_at | date:'HH:mm' }}</span>
                    </div>
                </div>

                <div class="card-footer">
                    <button class="btn-view-detail" (click)="verCotizacion(item)">
                        Ver detalle completo
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </button>
                    <button class="btn-duplicate" (click)="duplicarCotizacion(item)" title="Duplicar cotizaci\xF3n"
                        aria-label="Duplicar cotizaci\xF3n">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="4" y="4" width="16" height="16" rx="3" />
                            <rect x="8" y="8" width="16" height="16" rx="3" />
                        </svg>
                        Duplicar
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Detalle de cotizaci\xF3n (se mantiene igual) -->
    <div *ngIf="showDetail() && selectedQuote()" class="detail-view">
        <div class="detail-header">
            <button class="btn-back" (click)="volverAlListado()">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="15 18 9 12 15 6" />
                </svg>
                Volver al listado
            </button>
            <div class="detail-actions">
                <span class="vigencia-badge" [class]="getVigenciaClase(selectedRow())"
                    [title]="'Vence el ' + getVigenciaFecha(selectedRow())">
                    {{ getVigenciaLabel(selectedRow()) }}
                </span>
                <button class="btn-edit-quote" (click)="editarCotizacion()" title="Editar cotizaci\xF3n"
                    aria-label="Editar cotizaci\xF3n">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round">
                        <path d="M11 4h6M5 5h11M5 11h11M11 12h6" />
                    </svg>
                    Editar cotizaci\xF3n
                </button>
            </div>
        </div>
        <div class="detail-content">
            <app-quote-breakdown [calculation]="selectedQuote()" [mostrarGuardar]="false"
                (saveQuote)="volverAlListado()" />
        </div>
    </div>
</div>
`, styles: ['/* src/app/components/vendedor/mis-cotizaciones/mis-cotizaciones.css */\n.dashboard-cotizaciones {\n  max-width: 1280px;\n  margin: 0 auto;\n  padding: 2rem;\n  font-family:\n    "Inter",\n    -apple-system,\n    BlinkMacSystemFont,\n    sans-serif;\n  color: var(--text-main);\n}\n.dashboard-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 2.5rem;\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n.header-left {\n  display: flex;\n  align-items: baseline;\n  gap: 0.8rem;\n}\n.header-left h1 {\n  font-family: "Fjalla One", sans-serif;\n  font-size: 2.2rem;\n  letter-spacing: -0.5px;\n  margin: 0;\n  color: var(--text-main);\n}\n.header-actions {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n}\n.counter {\n  background: var(--border-color);\n  color: var(--text-silver);\n  padding: 0.2rem 0.9rem;\n  border-radius: 30px;\n  font-size: 0.8rem;\n  font-weight: 600;\n}\n.btn-primary {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-green-dark),\n      var(--accent-green));\n  color: var(--text-on-accent);\n  padding: 0.7rem 1.6rem;\n  border-radius: 40px;\n  font-weight: 700;\n  font-size: 0.9rem;\n  text-decoration: none;\n  transition: all 0.25s ease;\n  box-shadow: 0 4px 12px rgba(32, 176, 56, 0.25);\n}\n.btn-primary:hover {\n  transform: translateY(-2px) scale(1.02);\n  box-shadow: 0 10px 28px rgba(32, 176, 56, 0.35);\n}\n.admin-link {\n  background: var(--text-main);\n  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.2);\n}\n.admin-link:hover {\n  background: #1e293b;\n  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.3);\n}\n.filters-panel {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 1.2rem;\n  background: var(--surface-card);\n  padding: 0.7rem 1.5rem;\n  border-radius: 60px;\n  border: 1px solid var(--border-color);\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);\n  margin-bottom: 2.5rem;\n}\n.search-box {\n  flex: 1;\n  min-width: 200px;\n  position: relative;\n}\n.search-icon {\n  position: absolute;\n  left: 0.8rem;\n  top: 50%;\n  transform: translateY(-50%);\n  color: var(--accent-silver);\n}\n.search-input {\n  width: 100%;\n  padding: 0.7rem 0.8rem 0.7rem 2.6rem;\n  border: 1px solid transparent;\n  border-radius: 40px;\n  font-size: 0.9rem;\n  background: var(--surface-hover);\n  transition: all 0.25s;\n}\n.search-input:focus {\n  outline: none;\n  background: var(--surface-card);\n  border-color: var(--accent-green);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.1);\n}\n.period-selector {\n  display: flex;\n  gap: 0.3rem;\n  flex-wrap: wrap;\n}\n.period-btn {\n  padding: 0.3rem 1.2rem;\n  border: 1px solid var(--border-color);\n  border-radius: 40px;\n  background: transparent;\n  font-weight: 600;\n  font-size: 0.8rem;\n  color: var(--text-silver);\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.period-btn:hover {\n  background: var(--surface-hover);\n}\n.period-btn.active {\n  background: var(--accent-green-dark);\n  border-color: var(--accent-green-dark);\n  color: var(--text-on-accent);\n}\n.loading-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 5rem 2rem;\n  color: var(--text-muted);\n}\n.spinner {\n  width: 40px;\n  height: 40px;\n  border: 4px solid var(--border-color);\n  border-top-color: var(--accent-green);\n  border-radius: 50%;\n  animation: spin 0.8s linear infinite;\n  margin-bottom: 1rem;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.empty-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 5rem 2rem;\n  background: var(--surface-subtle);\n  border-radius: 24px;\n  border: 1px dashed var(--border-strong);\n  text-align: center;\n}\n.empty-icon {\n  font-size: 3rem;\n  margin-bottom: 1rem;\n}\n.empty-state h3 {\n  font-family: "Fjalla One", sans-serif;\n  font-size: 1.4rem;\n  margin: 0 0 0.3rem;\n}\n.empty-state p {\n  color: var(--text-muted);\n  margin: 0.2rem 0;\n}\n.cards-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));\n  gap: 2rem;\n  margin-top: 0.5rem;\n}\n.quote-card {\n  background: var(--surface-card);\n  border-radius: 20px;\n  border: 1px solid var(--border-color);\n  padding: 2rem;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  animation: fadeInUp 0.5s ease forwards;\n  opacity: 0;\n  transform: translateY(20px);\n}\n.quote-card:hover {\n  transform: translateY(-6px);\n  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.06);\n  border-color: var(--accent-green);\n}\n@keyframes fadeInUp {\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.card-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 1.2rem;\n}\n.client-info {\n  display: flex;\n  align-items: center;\n  gap: 0.8rem;\n}\n.client-initial {\n  width: 42px;\n  height: 42px;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-green),\n      var(--accent-green-dark));\n  color: var(--text-on-accent);\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: 1.1rem;\n  flex-shrink: 0;\n}\n.client-name {\n  font-weight: 700;\n  font-size: 1rem;\n  color: var(--text-main);\n}\n.vehicle-name {\n  font-size: 0.85rem;\n  color: var(--text-silver);\n}\n.date-badge {\n  background: var(--surface-hover);\n  padding: 0.2rem 0.8rem;\n  border-radius: 30px;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: var(--text-silver);\n  white-space: nowrap;\n}\n.card-body {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 1rem;\n  margin: 1.2rem 0 1.5rem;\n}\n.detail-item {\n  display: flex;\n  flex-direction: column;\n  gap: 0.15rem;\n}\n.detail-label {\n  font-size: 0.7rem;\n  text-transform: uppercase;\n  letter-spacing: 0.4px;\n  color: var(--accent-silver);\n  font-weight: 600;\n}\n.detail-value {\n  font-weight: 700;\n  font-size: 1.05rem;\n  color: var(--text-main);\n}\n.detail-value.price {\n  color: var(--accent-green-dark);\n}\n.card-footer {\n  border-top: 1px solid var(--border-color);\n  padding-top: 1.2rem;\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.6rem;\n  flex-wrap: wrap;\n}\n.btn-view-detail {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  background: transparent;\n  border: none;\n  color: var(--accent-green-dark);\n  font-weight: 600;\n  font-size: 0.85rem;\n  cursor: pointer;\n  transition: all 0.2s;\n  padding: 0.3rem 0.5rem;\n  border-radius: 30px;\n}\n.btn-view-detail:hover {\n  background: var(--accent-green-light);\n}\n.btn-view-detail svg {\n  transition: transform 0.25s;\n}\n.btn-view-detail:hover svg {\n  transform: translateX(4px);\n}\n.detail-view {\n  margin-top: 1.5rem;\n}\n.detail-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: 0.75rem;\n  margin-bottom: 1.5rem;\n}\n.btn-back {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  background: var(--surface-card);\n  border: 1px solid var(--border-color);\n  border-radius: 40px;\n  padding: 0.5rem 1.5rem;\n  font-weight: 600;\n  color: var(--text-silver);\n  cursor: pointer;\n  transition: all 0.25s;\n}\n.btn-back:hover {\n  background: var(--surface-subtle);\n  border-color: var(--border-strong);\n}\n.btn-back svg {\n  stroke: currentColor;\n}\n.detail-content {\n  background: var(--surface-card);\n  border-radius: 24px;\n  padding: 2rem;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);\n}\n@media (max-width: 768px) {\n  .dashboard-cotizaciones {\n    padding: 1rem;\n  }\n  .dashboard-header {\n    flex-direction: column;\n    align-items: stretch;\n    gap: 0.8rem;\n  }\n  .btn-primary {\n    justify-content: center;\n    width: 100%;\n  }\n  .header-actions {\n    width: 100%;\n    flex-direction: column;\n    align-items: stretch;\n    gap: 0.6rem;\n  }\n  .filters-panel {\n    flex-direction: column;\n    border-radius: 24px;\n    padding: 1rem 1.2rem;\n    gap: 0.8rem;\n  }\n  .search-box {\n    width: 100%;\n  }\n  .period-selector {\n    width: 100%;\n    justify-content: center;\n  }\n  .cards-grid {\n    grid-template-columns: 1fr;\n    gap: 1.5rem;\n  }\n  .quote-card {\n    padding: 1.5rem;\n  }\n  .card-body {\n    grid-template-columns: 1fr 1fr;\n    gap: 0.8rem;\n    margin: 1rem 0 1.2rem;\n  }\n  .detail-value {\n    font-size: 0.95rem;\n  }\n  .detail-content {\n    padding: 1rem;\n  }\n}\n.dashboard-cotizaciones {\n  position: relative;\n  max-width: 1400px;\n  margin: 1.5rem auto 0;\n  padding: 0;\n  overflow: hidden;\n}\n.dashboard-cotizaciones::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 38%;\n  height: 190px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(32, 176, 56, 0.14),\n      rgba(16, 37, 31, 0.07));\n  clip-path: polygon(35% 0, 100% 0, 100% 100%, 0 100%);\n  pointer-events: none;\n}\n.dashboard-cotizaciones .dashboard-header {\n  position: relative;\n  z-index: 1;\n  min-height: 164px;\n  align-items: flex-end;\n  margin: 0 0 1.25rem;\n  padding: 1.5rem 1.75rem;\n  border: 1px solid rgba(139, 226, 140, 0.22);\n  border-radius: 16px;\n  background:\n    linear-gradient(\n      115deg,\n      #10251f 0%,\n      #173c2e 68%,\n      #1f6840 100%);\n  box-shadow: 0 16px 30px rgba(16, 37, 31, 0.16);\n}\n.dashboard-cotizaciones .header-left {\n  align-items: flex-start;\n  flex-direction: column;\n  gap: 0.35rem;\n}\n.dashboard-cotizaciones .header-left::before {\n  content: "Actividad comercial";\n  color: #8be28c;\n  font-size: 0.68rem;\n  font-weight: 700;\n  letter-spacing: 1.2px;\n  text-transform: uppercase;\n}\n.dashboard-cotizaciones .header-left h1 {\n  color: #ffffff;\n  font-size: 2rem;\n  line-height: 1;\n}\n.dashboard-cotizaciones .counter {\n  padding: 0.3rem 0.7rem;\n  border: 1px solid rgba(139, 226, 140, 0.3);\n  border-radius: 6px;\n  background: rgba(255, 255, 255, 0.08);\n  color: #d5f0dc;\n  font-size: 0.72rem;\n}\n.dashboard-cotizaciones .btn-primary {\n  min-height: 44px;\n  padding: 0.75rem 1rem;\n  border: 0;\n  border-radius: 9px;\n  background: var(--btn-primary-bg);\n  color: var(--btn-primary-text);\n  box-shadow: none;\n}\n.dashboard-cotizaciones .btn-primary:hover {\n  background: var(--btn-primary-bg-hover);\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.16);\n}\n.dashboard-cotizaciones .filters-panel {\n  position: relative;\n  z-index: 1;\n  align-items: stretch;\n  gap: 0.9rem;\n  margin-bottom: 1.25rem;\n  padding: 0.85rem;\n  border: 1px solid var(--border-color);\n  border-radius: 14px;\n  background: var(--surface-card);\n  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.05);\n}\n.dashboard-cotizaciones .search-box {\n  display: flex;\n  align-items: center;\n  min-height: 42px;\n}\n.dashboard-cotizaciones .search-input {\n  min-height: 42px;\n  border: 1px solid var(--border-color);\n  border-radius: 9px;\n  background: var(--surface-subtle);\n}\n.dashboard-cotizaciones .search-input:focus {\n  background: var(--surface-card);\n  border-color: var(--accent-green);\n}\n.dashboard-cotizaciones .period-selector {\n  display: flex;\n  align-items: center;\n  gap: 0.35rem;\n  padding: 0.25rem;\n  border: 1px solid var(--surface-muted);\n  border-radius: 9px;\n  background: var(--surface-subtle);\n}\n.dashboard-cotizaciones .period-btn {\n  min-height: 34px;\n  padding: 0.45rem 0.75rem;\n  border: 1px solid transparent;\n  border-radius: 7px;\n}\n.dashboard-cotizaciones .period-btn.active {\n  background: #10251f;\n  border-color: var(--accent-slate);\n  color: #ffffff;\n}\n.dashboard-cotizaciones .content-area,\n.dashboard-cotizaciones .detail-view {\n  position: relative;\n  z-index: 1;\n}\n.dashboard-cotizaciones .cards-grid {\n  gap: 1.15rem;\n}\n.dashboard-cotizaciones .quote-card {\n  padding: 1.35rem;\n  border: 1px solid var(--border-color);\n  border-radius: 13px;\n  background: var(--surface-card);\n  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.05);\n}\n.dashboard-cotizaciones .quote-card:hover {\n  border-color: #8bd39a;\n  box-shadow: 0 16px 30px rgba(15, 23, 42, 0.1);\n}\n.dashboard-cotizaciones .client-initial {\n  border-radius: 11px;\n  background: var(--accent-green-light);\n  color: var(--accent-green-dark);\n}\n.dashboard-cotizaciones .date-badge {\n  border: 1px solid var(--border-color);\n  border-radius: 6px;\n  background: var(--surface-subtle);\n}\n.dashboard-cotizaciones .card-body {\n  margin: 1rem 0 1.15rem;\n  padding: 0.9rem;\n  border: 1px solid var(--surface-muted);\n  border-radius: 9px;\n  background: var(--surface-subtle);\n}\n.dashboard-cotizaciones .client-name {\n  color: var(--btn-primary-text);\n}\n.dashboard-cotizaciones .vehicle-name {\n  color: var(--text-muted);\n}\n.dashboard-cotizaciones .detail-label {\n  color: var(--accent-silver);\n}\n.dashboard-cotizaciones .detail-value {\n  color: var(--text-silver);\n}\n.dashboard-cotizaciones .card-footer {\n  padding-top: 0.9rem;\n  border-top-color: var(--surface-muted);\n}\n.dashboard-cotizaciones .btn-view-detail {\n  min-height: 36px;\n  padding: 0.5rem 0.7rem;\n  border: 1px solid #8bd39a;\n  border-radius: 7px;\n  background: var(--accent-green-light);\n  color: var(--accent-green-dark);\n  font-weight: 700;\n}\n.dashboard-cotizaciones .btn-view-detail:hover {\n  background: var(--accent-green-light);\n}\n.dashboard-cotizaciones .empty-state {\n  min-height: 240px;\n  border-radius: 14px;\n  background: var(--surface-card);\n}\n.dashboard-cotizaciones .detail-content {\n  padding: 1.5rem;\n  border: 1px solid var(--border-color);\n  border-radius: 14px;\n  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.05);\n}\n@media (max-width: 768px) {\n  .dashboard-cotizaciones {\n    margin-top: 1rem;\n    padding: 0 0.85rem 1.5rem;\n  }\n  .dashboard-cotizaciones .dashboard-header {\n    min-height: 0;\n    align-items: stretch;\n    padding: 1.25rem;\n  }\n  .dashboard-cotizaciones .header-left h1 {\n    font-size: 1.7rem;\n  }\n  .dashboard-cotizaciones .period-selector {\n    width: 100%;\n    overflow-x: auto;\n  }\n  .dashboard-cotizaciones .period-btn {\n    flex: 1 0 auto;\n    white-space: nowrap;\n  }\n  .dashboard-cotizaciones .filters-panel {\n    margin-bottom: 1.5rem;\n  }\n  .dashboard-cotizaciones .card-body {\n    grid-template-columns: 1fr 1fr;\n  }\n  .dashboard-cotizaciones .client-info {\n    flex: 1 1 auto;\n    min-width: 0;\n  }\n  .dashboard-cotizaciones .client-info > div {\n    flex: 1;\n    min-width: 0;\n  }\n  .dashboard-cotizaciones .client-name,\n  .dashboard-cotizaciones .vehicle-name {\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n  .dashboard-cotizaciones .btn-view-detail {\n    width: 100%;\n    justify-content: center;\n    min-height: 44px;\n  }\n}\n@media (max-width: 480px) {\n  .dashboard-cotizaciones .card-body {\n    grid-template-columns: 1fr;\n  }\n  .dashboard-cotizaciones .quote-card {\n    padding: 1.1rem;\n  }\n  .dashboard-cotizaciones .header-left h1 {\n    font-size: 1.5rem;\n  }\n  .dashboard-cotizaciones .client-initial {\n    width: 38px;\n    height: 38px;\n    font-size: 1rem;\n  }\n  .dashboard-cotizaciones .period-btn {\n    padding: 0.4rem 0.85rem;\n  }\n  .dashboard-cotizaciones .detail-content {\n    padding: 0.75rem;\n    border-radius: 16px;\n  }\n  .detail-header {\n    flex-direction: column;\n    align-items: stretch;\n    gap: 0.75rem;\n  }\n  .detail-header .vigencia-badge {\n    display: inline-flex;\n    align-items: center;\n    gap: 0.35rem;\n    padding: 0.2rem 0.7rem;\n    border-radius: 30px;\n    font-size: 0.72rem;\n    font-weight: 700;\n    white-space: nowrap;\n  }\n  .detail-header .vigencia-badge::before {\n    content: "";\n    width: 7px;\n    height: 7px;\n    border-radius: 50%;\n    background: currentColor;\n    flex-shrink: 0;\n  }\n  .detail-header .vigencia-badge.vigencia-vigente {\n    background: var(--accent-green-light);\n    color: var(--accent-green-dark);\n    border: 1px solid rgba(139, 226, 140, 0.4);\n  }\n  .detail-header .vigencia-badge.vigencia-proxima {\n    background: #fef3c7;\n    color: #b45309;\n    border: 1px solid rgba(245, 158, 11, 0.4);\n  }\n  .detail-header .vigencia-badge.vigencia-vencida {\n    background: #fde8e8;\n    color: #b91c1c;\n    border: 1px solid rgba(239, 68, 68, 0.4);\n  }\n  .detail-header .btn-duplicate,\n  .detail-header .btn-edit-quote {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    gap: 0.45rem;\n    min-height: 36px;\n    padding: 0.4rem 0.9rem;\n    border-radius: 30px;\n    font-weight: 600;\n    font-size: 0.82rem;\n    cursor: pointer;\n    transition: all 0.2s ease;\n    white-space: nowrap;\n  }\n  .detail-header .btn-duplicate {\n    background: var(--surface-subtle);\n    border: 1px solid var(--border-color);\n    color: var(--text-silver);\n  }\n  .detail-header .btn-duplicate:hover,\n  .detail-header .btn-duplicate:focus-visible {\n    background: var(--surface-hover);\n    border-color: var(--border-strong);\n    color: var(--text-main);\n  }\n  .detail-header .btn-edit-quote {\n    border: 1px solid rgba(139, 226, 140, 0.35);\n    background: var(--accent-green-light);\n    color: var(--accent-green-dark);\n  }\n  .detail-header .btn-edit-quote:hover,\n  .detail-header .btn-edit-quote:focus-visible {\n    background: var(--accent-green);\n    color: var(--text-on-accent);\n    border-color: var(--accent-green);\n  }\n  .detail-header .btn-duplicate svg,\n  .detail-header .btn-edit-quote svg {\n    flex-shrink: 0;\n    transition: transform 0.2s ease;\n  }\n  .detail-header .btn-duplicate:hover svg,\n  .detail-header .btn-edit-quote:hover svg {\n    transform: translateX(4px);\n  }\n  .detail-header .btn-duplicate:focus-visible,\n  .detail-header .btn-edit-quote:focus-visible {\n    outline: 2px solid var(--accent-green);\n    outline-offset: 2px;\n  }\n  .detail-header .detail-actions {\n    display: flex;\n    align-items: center;\n    gap: 0.75rem;\n    flex-wrap: wrap;\n  }\n  .detail-header .dashboard-cotizaciones .card-footer {\n    gap: 0.5rem;\n  }\n  @media (max-width: 768px) {\n    .detail-header .dashboard-cotizaciones .card-footer {\n      flex-wrap: wrap;\n      width: 100%;\n    }\n    .detail-header .dashboard-cotizaciones .btn-duplicate {\n      width: 100%;\n      justify-content: center;\n    }\n    .detail-header .detail-header .btn-back,\n    .detail-header .detail-header .btn-edit-quote {\n      width: 100%;\n      justify-content: center;\n    }\n  }\n}\n/*# sourceMappingURL=mis-cotizaciones.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MisCotizacionesComponent, { className: "MisCotizacionesComponent", filePath: "src/app/components/vendedor/mis-cotizaciones/mis-cotizaciones.ts", lineNumber: 22 });
})();
export {
  MisCotizacionesComponent
};
//# debugId=cf7d2eb1-f3b0-5977-bf17-23363071056a
//# sourceMappingURL=chunk-RDFIEONG.js.map
