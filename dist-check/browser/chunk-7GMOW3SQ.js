import {
  CatalogService,
  DEFAULT_CALCULATOR_CONFIG
} from "./chunk-ZZO2EEQW.js";
import {
  ToastService
} from "./chunk-74RWLUMR.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MaxValidator,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  NumberValueAccessor,
  ɵNgNoValidate
} from "./chunk-MVJCDSIT.js";
import "./chunk-XCV63D25.js";
import {
  CommonModule,
  Component,
  DecimalPipe,
  NgForOf,
  NgIf,
  inject,
  setClassMetadata,
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
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-6KRTW2LJ.js";
import "./chunk-FDMHZOCR.js";

// src/app/components/admin/admin-parameters/admin-parameters.ts
function AdminParametersComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16)(1, "div", 17)(2, "span", 18);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 5);
    \u0275\u0275element(4, "line", 19)(5, "circle", 20)(6, "circle", 21);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(7, "span", 22)(8, "strong");
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "small");
    \u0275\u0275text(12, "IVA aplicado");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "div", 17)(14, "span", 23);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(15, "svg", 5);
    \u0275\u0275element(16, "path", 24)(17, "path", 25);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(18, "span", 22)(19, "strong");
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "small");
    \u0275\u0275text(22, "Cuota inicial neta");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "div", 17)(24, "span", 26);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(25, "svg", 5);
    \u0275\u0275element(26, "path", 27)(27, "path", 28);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(28, "span", 22)(29, "strong");
    \u0275\u0275text(30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "small");
    \u0275\u0275text(32, "Renta est\xE1ndar mensual");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(33, "div", 17)(34, "span", 29);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(35, "svg", 5);
    \u0275\u0275element(36, "path", 30)(37, "path", 31);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(38, "span", 22)(39, "strong");
    \u0275\u0275text(40);
    \u0275\u0275pipe(41, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "small");
    \u0275\u0275text(43, "Residual opci\xF3n 1");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(10, 4, ctx_r0.percent(ctx_r0.config.ivaPct), "1.0-2"), "%");
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate(ctx_r0.formatMoney(ctx_r0.config.adminFeeInitialNet));
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(ctx_r0.formatMoney(ctx_r0.config.basicRentStandard));
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(41, 7, ctx_r0.percent(ctx_r0.config.residualOption1Pct), "1.0-1"), "%");
  }
}
function AdminParametersComponent_div_16_span_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 38);
    \u0275\u0275text(1, "Cambios sin guardar");
    \u0275\u0275elementEnd();
  }
}
function AdminParametersComponent_div_16_span_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 39);
    \u0275\u0275text(1, "\u2713 Todo guardado");
    \u0275\u0275elementEnd();
  }
}
function AdminParametersComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 32)(1, "div", 33)(2, "button", 34);
    \u0275\u0275listener("click", function AdminParametersComponent_div_16_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.setSection("todos"));
    });
    \u0275\u0275text(3, "Todos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 34);
    \u0275\u0275listener("click", function AdminParametersComponent_div_16_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.setSection("impuestos"));
    });
    \u0275\u0275text(5, "Impuestos y cargos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 34);
    \u0275\u0275listener("click", function AdminParametersComponent_div_16_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.setSection("renta"));
    });
    \u0275\u0275text(7, "Renta extraordinaria");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 34);
    \u0275\u0275listener("click", function AdminParametersComponent_div_16_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.setSection("mensual"));
    });
    \u0275\u0275text(9, "Renta mensual");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 34);
    \u0275\u0275listener("click", function AdminParametersComponent_div_16_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.setSection("tasas"));
    });
    \u0275\u0275text(11, "Tasas por plazo");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "span", 35);
    \u0275\u0275template(13, AdminParametersComponent_div_16_span_13_Template, 2, 0, "span", 36)(14, AdminParametersComponent_div_16_span_14_Template, 2, 0, "span", 37);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275classProp("is-active", ctx_r0.activeSection === "todos");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("is-active", ctx_r0.activeSection === "impuestos");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("is-active", ctx_r0.activeSection === "renta");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("is-active", ctx_r0.activeSection === "mensual");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("is-active", ctx_r0.activeSection === "tasas");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r0.isDirty);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.isDirty);
  }
}
function AdminParametersComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 40);
    \u0275\u0275element(1, "span", 41);
    \u0275\u0275text(2, " Cargando configuraci\xF3n...");
    \u0275\u0275elementEnd();
  }
}
function AdminParametersComponent_form_18_section_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 52)(1, "div", 53)(2, "span", 54);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 5);
    \u0275\u0275element(4, "path", 55)(5, "path", 56)(6, "path", 57)(7, "path", 58);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "div")(9, "h3");
    \u0275\u0275text(10, "Impuestos y cargos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p");
    \u0275\u0275text(12, "Porcentajes e importes que se aplican sobre el precio neto del veh\xEDculo.");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "div", 59)(14, "label", 60)(15, "span", 61);
    \u0275\u0275text(16, "IVA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span", 62)(18, "input", 63);
    \u0275\u0275listener("ngModelChange", function AdminParametersComponent_form_18_section_1_Template_input_ngModelChange_18_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.setPercent("ivaPct", $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(19, "span", 64);
    \u0275\u0275text(20, "%");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "small", 65);
    \u0275\u0275text(22, "Impuesto agregado al total de cada cotizaci\xF3n.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "label", 60)(24, "span", 61);
    \u0275\u0275text(25, "Asesor\xEDa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "span", 62)(27, "input", 66);
    \u0275\u0275listener("ngModelChange", function AdminParametersComponent_form_18_section_1_Template_input_ngModelChange_27_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.setPercent("advisoryFeePct", $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(28, "span", 64);
    \u0275\u0275text(29, "%");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "small", 65);
    \u0275\u0275text(31, "Comisi\xF3n de asesor\xEDa sobre el precio neto.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "label", 60)(33, "span", 61);
    \u0275\u0275text(34, "Seguro estimado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "span", 62)(36, "input", 67);
    \u0275\u0275listener("ngModelChange", function AdminParametersComponent_form_18_section_1_Template_input_ngModelChange_36_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.setPercent("insurancePct", $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(37, "span", 64);
    \u0275\u0275text(38, "%");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "small", 65);
    \u0275\u0275text(40, "Se estima como porcentaje del precio neto.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(41, "label", 60)(42, "span", 61);
    \u0275\u0275text(43, "Cuota inicial neta");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "span", 68)(45, "span", 69);
    \u0275\u0275text(46, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "input", 70);
    \u0275\u0275twoWayListener("ngModelChange", function AdminParametersComponent_form_18_section_1_Template_input_ngModelChange_47_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.config.adminFeeInitialNet, $event) || (ctx_r0.config.adminFeeInitialNet = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "small", 65);
    \u0275\u0275text(49, "Cargo administrativo del pago inicial (sin IVA).");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(18);
    \u0275\u0275property("ngModel", ctx_r0.percent(ctx_r0.config.ivaPct));
    \u0275\u0275control();
    \u0275\u0275advance(9);
    \u0275\u0275property("ngModel", ctx_r0.percent(ctx_r0.config.advisoryFeePct));
    \u0275\u0275control();
    \u0275\u0275advance(9);
    \u0275\u0275property("ngModel", ctx_r0.percent(ctx_r0.config.insurancePct));
    \u0275\u0275control();
    \u0275\u0275advance(11);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.config.adminFeeInitialNet);
    \u0275\u0275control();
  }
}
function AdminParametersComponent_form_18_section_2_div_94_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 87)(1, "span", 88);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 89);
    \u0275\u0275element(4, "span", 90)(5, "span", 91);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "strong", 92);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Opci\xF3n ", item_r6.n);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", ctx_r0.percent(item_r6.value), "%");
    \u0275\u0275advance();
    \u0275\u0275styleProp("left", ctx_r0.percent(ctx_r0.config.maxRentAndResidualPct), "%");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(8, 6, ctx_r0.percent(item_r6.value), "1.0-1"), "%");
  }
}
function AdminParametersComponent_form_18_section_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 52)(1, "div", 53)(2, "span", 71);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 5);
    \u0275\u0275element(4, "path", 72)(5, "path", 73);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "div")(7, "h3");
    \u0275\u0275text(8, "Renta extraordinaria y residuales");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p");
    \u0275\u0275text(10, "M\xEDnimos exigidos seg\xFAn el precio del veh\xEDculo y valores residuales por opci\xF3n.");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 59)(12, "label", 60)(13, "span", 61);
    \u0275\u0275text(14, "Umbral 1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span", 68)(16, "span", 69);
    \u0275\u0275text(17, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "input", 74);
    \u0275\u0275twoWayListener("ngModelChange", function AdminParametersComponent_form_18_section_2_Template_input_ngModelChange_18_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.config.minimumRentThreshold1, $event) || (ctx_r0.config.minimumRentThreshold1 = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "small", 65);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "label", 60)(22, "span", 61);
    \u0275\u0275text(23, "Umbral 2");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "span", 68)(25, "span", 69);
    \u0275\u0275text(26, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "input", 75);
    \u0275\u0275twoWayListener("ngModelChange", function AdminParametersComponent_form_18_section_2_Template_input_ngModelChange_27_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.config.minimumRentThreshold2, $event) || (ctx_r0.config.minimumRentThreshold2 = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "small", 65);
    \u0275\u0275text(29);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "label", 60)(31, "span", 61);
    \u0275\u0275text(32, "M\xEDnimo menor");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "span", 62)(34, "input", 76);
    \u0275\u0275listener("ngModelChange", function AdminParametersComponent_form_18_section_2_Template_input_ngModelChange_34_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.setPercent("minimumRentPct1", $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(35, "span", 64);
    \u0275\u0275text(36, "%");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "small", 65);
    \u0275\u0275text(38, "Renta extraordinaria m\xEDnima por debajo del umbral 1.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "label", 60)(40, "span", 61);
    \u0275\u0275text(41, "M\xEDnimo medio");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "span", 62)(43, "input", 77);
    \u0275\u0275listener("ngModelChange", function AdminParametersComponent_form_18_section_2_Template_input_ngModelChange_43_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.setPercent("minimumRentPct2", $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(44, "span", 64);
    \u0275\u0275text(45, "%");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "small", 65);
    \u0275\u0275text(47, "Renta extraordinaria m\xEDnima entre el umbral 1 y el umbral 2.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(48, "label", 60)(49, "span", 61);
    \u0275\u0275text(50, "M\xEDnimo mayor");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "span", 62)(52, "input", 78);
    \u0275\u0275listener("ngModelChange", function AdminParametersComponent_form_18_section_2_Template_input_ngModelChange_52_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.setPercent("minimumRentPct3", $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(53, "span", 64);
    \u0275\u0275text(54, "%");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(55, "small", 65);
    \u0275\u0275text(56, "Renta extraordinaria m\xEDnima por encima del umbral 2.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(57, "label", 60)(58, "span", 61);
    \u0275\u0275text(59, "M\xE1ximo renta + residual");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(60, "span", 62)(61, "input", 79);
    \u0275\u0275listener("ngModelChange", function AdminParametersComponent_form_18_section_2_Template_input_ngModelChange_61_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.setPercent("maxRentAndResidualPct", $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(62, "span", 64);
    \u0275\u0275text(63, "%");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(64, "small", 65);
    \u0275\u0275text(65, "L\xEDmite para la suma de renta extraordinaria y residual.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(66, "label", 60)(67, "span", 61);
    \u0275\u0275text(68, "Residual opci\xF3n 1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(69, "span", 62)(70, "input", 80);
    \u0275\u0275listener("ngModelChange", function AdminParametersComponent_form_18_section_2_Template_input_ngModelChange_70_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.setPercent("residualOption1Pct", $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(71, "span", 64);
    \u0275\u0275text(72, "%");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(73, "small", 65);
    \u0275\u0275text(74, "Valor residual propuesto en la opci\xF3n 1.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(75, "label", 60)(76, "span", 61);
    \u0275\u0275text(77, "Residual opci\xF3n 2");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(78, "span", 62)(79, "input", 81);
    \u0275\u0275listener("ngModelChange", function AdminParametersComponent_form_18_section_2_Template_input_ngModelChange_79_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.setPercent("residualOption2Pct", $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(80, "span", 64);
    \u0275\u0275text(81, "%");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(82, "small", 65);
    \u0275\u0275text(83, "Valor residual propuesto en la opci\xF3n 2.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(84, "label", 60)(85, "span", 61);
    \u0275\u0275text(86, "Residual opci\xF3n 3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(87, "span", 62)(88, "input", 82);
    \u0275\u0275listener("ngModelChange", function AdminParametersComponent_form_18_section_2_Template_input_ngModelChange_88_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.setPercent("residualOption3Pct", $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(89, "span", 64);
    \u0275\u0275text(90, "%");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(91, "small", 65);
    \u0275\u0275text(92, "Valor residual propuesto en la opci\xF3n 3.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(93, "div", 83);
    \u0275\u0275template(94, AdminParametersComponent_form_18_section_2_div_94_Template, 9, 9, "div", 84);
    \u0275\u0275elementStart(95, "div", 85);
    \u0275\u0275element(96, "span", 86);
    \u0275\u0275elementStart(97, "span");
    \u0275\u0275text(98);
    \u0275\u0275pipe(99, "number");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(18);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.config.minimumRentThreshold1);
    \u0275\u0275control();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Precios menores a ", ctx_r0.formatMoney(ctx_r0.config.minimumRentThreshold1), " usan el m\xEDnimo menor.");
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.config.minimumRentThreshold2);
    \u0275\u0275control();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Precios mayores a ", ctx_r0.formatMoney(ctx_r0.config.minimumRentThreshold2), " usan el m\xEDnimo mayor.");
    \u0275\u0275advance(5);
    \u0275\u0275property("ngModel", ctx_r0.percent(ctx_r0.config.minimumRentPct1));
    \u0275\u0275control();
    \u0275\u0275advance(9);
    \u0275\u0275property("ngModel", ctx_r0.percent(ctx_r0.config.minimumRentPct2));
    \u0275\u0275control();
    \u0275\u0275advance(9);
    \u0275\u0275property("ngModel", ctx_r0.percent(ctx_r0.config.minimumRentPct3));
    \u0275\u0275control();
    \u0275\u0275advance(9);
    \u0275\u0275property("ngModel", ctx_r0.percent(ctx_r0.config.maxRentAndResidualPct));
    \u0275\u0275control();
    \u0275\u0275advance(9);
    \u0275\u0275property("ngModel", ctx_r0.percent(ctx_r0.config.residualOption1Pct));
    \u0275\u0275control();
    \u0275\u0275advance(9);
    \u0275\u0275property("ngModel", ctx_r0.percent(ctx_r0.config.residualOption2Pct));
    \u0275\u0275control();
    \u0275\u0275advance(9);
    \u0275\u0275property("ngModel", ctx_r0.percent(ctx_r0.config.residualOption3Pct));
    \u0275\u0275control();
    \u0275\u0275advance(6);
    \u0275\u0275property("ngForOf", ctx_r0.residualRows);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("M\xE1ximo permitido para renta + residual: ", \u0275\u0275pipeBind2(99, 13, ctx_r0.percent(ctx_r0.config.maxRentAndResidualPct), "1.0-1"), "%");
  }
}
function AdminParametersComponent_form_18_section_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 52)(1, "div", 53)(2, "span", 93);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 5);
    \u0275\u0275element(4, "rect", 94)(5, "line", 95)(6, "line", 96)(7, "line", 97);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "div")(9, "h3");
    \u0275\u0275text(10, "Renta mensual y administraci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p");
    \u0275\u0275text(12, "Rentas base mensuales y distribuci\xF3n del cargo de administraci\xF3n.");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "div", 59)(14, "label", 60)(15, "span", 61);
    \u0275\u0275text(16, "Renta est\xE1ndar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span", 68)(18, "span", 69);
    \u0275\u0275text(19, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "input", 98);
    \u0275\u0275twoWayListener("ngModelChange", function AdminParametersComponent_form_18_section_3_Template_input_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.config.basicRentStandard, $event) || (ctx_r0.config.basicRentStandard = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "small", 65);
    \u0275\u0275text(22, "Renta base mensual para veh\xEDculos de combusti\xF3n.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "label", 60)(24, "span", 61);
    \u0275\u0275text(25, "Renta h\xEDbrida / el\xE9ctrica");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "span", 68)(27, "span", 69);
    \u0275\u0275text(28, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "input", 99);
    \u0275\u0275twoWayListener("ngModelChange", function AdminParametersComponent_form_18_section_3_Template_input_ngModelChange_29_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.config.basicRentHybrid, $event) || (ctx_r0.config.basicRentHybrid = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "small", 65);
    \u0275\u0275text(31, "Renta base mensual para veh\xEDculos h\xEDbridos o el\xE9ctricos.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "label", 60)(33, "span", 61);
    \u0275\u0275text(34, "Administraci\xF3n de flotilla");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "span", 62)(36, "input", 100);
    \u0275\u0275listener("ngModelChange", function AdminParametersComponent_form_18_section_3_Template_input_ngModelChange_36_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.setPercent("fleetManagementPct", $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(37, "span", 64);
    \u0275\u0275text(38, "%");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "small", 65);
    \u0275\u0275text(40, "Parte del cargo mensual asignada a flotilla.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(41, "label", 60)(42, "span", 61);
    \u0275\u0275text(43, "Administraci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "span", 62)(45, "input", 101);
    \u0275\u0275listener("ngModelChange", function AdminParametersComponent_form_18_section_3_Template_input_ngModelChange_45_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.setPercent("adminManagementPct", $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(46, "span", 64);
    \u0275\u0275text(47, "%");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(48, "small", 65);
    \u0275\u0275text(49, "Parte del cargo mensual asignada a administraci\xF3n.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(50, "div", 102)(51, "div", 103);
    \u0275\u0275element(52, "span", 104)(53, "span", 105);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "div", 106)(55, "span");
    \u0275\u0275element(56, "i", 107);
    \u0275\u0275text(57);
    \u0275\u0275pipe(58, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "span");
    \u0275\u0275element(60, "i", 108);
    \u0275\u0275text(61);
    \u0275\u0275pipe(62, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(63, "small", 109);
    \u0275\u0275text(64);
    \u0275\u0275pipe(65, "number");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(20);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.config.basicRentStandard);
    \u0275\u0275control();
    \u0275\u0275advance(9);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.config.basicRentHybrid);
    \u0275\u0275control();
    \u0275\u0275advance(7);
    \u0275\u0275property("ngModel", ctx_r0.percent(ctx_r0.config.fleetManagementPct));
    \u0275\u0275control();
    \u0275\u0275advance(9);
    \u0275\u0275property("ngModel", ctx_r0.percent(ctx_r0.config.adminManagementPct));
    \u0275\u0275control();
    \u0275\u0275advance(7);
    \u0275\u0275styleProp("width", ctx_r0.percent(ctx_r0.config.fleetManagementPct), "%");
    \u0275\u0275advance();
    \u0275\u0275styleProp("width", ctx_r0.percent(ctx_r0.config.adminManagementPct), "%");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Flotilla: ", \u0275\u0275pipeBind2(58, 13, ctx_r0.percent(ctx_r0.config.fleetManagementPct), "1.0-2"), "%");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Administraci\xF3n: ", \u0275\u0275pipeBind2(62, 16, ctx_r0.percent(ctx_r0.config.adminManagementPct), "1.0-2"), "%");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("is-invalid", ctx_r0.distributionSum !== 100);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Suma total: ", \u0275\u0275pipeBind2(65, 19, ctx_r0.distributionSum, "1.0-2"), "% \u2014 debe ser exactamente 100%.");
  }
}
function AdminParametersComponent_form_18_section_4_div_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 113)(1, "span", 114);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "label", 60)(4, "span", 61);
    \u0275\u0275text(5, "Opci\xF3n 1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "input", 115);
    \u0275\u0275twoWayListener("ngModelChange", function AdminParametersComponent_form_18_section_4_div_13_Template_input_ngModelChange_6_listener($event) {
      const term_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r0.config.termRates[term_r9].option1Rate, $event) || (ctx_r0.config.termRates[term_r9].option1Rate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(7, "small", 116);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "label", 60)(11, "span", 61);
    \u0275\u0275text(12, "Opci\xF3n 2");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 115);
    \u0275\u0275twoWayListener("ngModelChange", function AdminParametersComponent_form_18_section_4_div_13_Template_input_ngModelChange_13_listener($event) {
      const term_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r0.config.termRates[term_r9].option2Rate, $event) || (ctx_r0.config.termRates[term_r9].option2Rate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(14, "small", 116);
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "label", 60)(18, "span", 61);
    \u0275\u0275text(19, "Opci\xF3n 3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "input", 115);
    \u0275\u0275twoWayListener("ngModelChange", function AdminParametersComponent_form_18_section_4_div_13_Template_input_ngModelChange_20_listener($event) {
      const term_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r0.config.termRates[term_r9].option3Rate, $event) || (ctx_r0.config.termRates[term_r9].option3Rate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(21, "small", 116);
    \u0275\u0275text(22);
    \u0275\u0275pipe(23, "number");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const term_r9 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275classMap("tone-" + ctx_r0.termTone(term_r9));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", term_r9, " meses");
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.config.termRates[term_r9].option1Rate);
    \u0275\u0275property("name", "o1-" + term_r9);
    \u0275\u0275control();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("= ", \u0275\u0275pipeBind2(9, 12, ctx_r0.percent(ctx_r0.config.termRates[term_r9].option1Rate), "1.0-2"), "% anual");
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.config.termRates[term_r9].option2Rate);
    \u0275\u0275property("name", "o2-" + term_r9);
    \u0275\u0275control();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("= ", \u0275\u0275pipeBind2(16, 15, ctx_r0.percent(ctx_r0.config.termRates[term_r9].option2Rate), "1.0-2"), "% anual");
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.config.termRates[term_r9].option3Rate);
    \u0275\u0275property("name", "o3-" + term_r9);
    \u0275\u0275control();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("= ", \u0275\u0275pipeBind2(23, 18, ctx_r0.percent(ctx_r0.config.termRates[term_r9].option3Rate), "1.0-2"), "% anual");
  }
}
function AdminParametersComponent_form_18_section_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 52)(1, "div", 53)(2, "span", 110);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 5);
    \u0275\u0275element(4, "line", 19)(5, "circle", 20)(6, "circle", 21);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(7, "div")(8, "h3");
    \u0275\u0275text(9, "Tasas anuales por plazo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p");
    \u0275\u0275text(11, "Tasa anual aplicada a cada plazo y opci\xF3n, en formato decimal (0.405 = 40.5%).");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "div", 111);
    \u0275\u0275template(13, AdminParametersComponent_form_18_section_4_div_13_Template, 24, 21, "div", 112);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(13);
    \u0275\u0275property("ngForOf", ctx_r0.terms);
  }
}
function AdminParametersComponent_form_18_p_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 117);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.error);
  }
}
function AdminParametersComponent_form_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 42);
    \u0275\u0275listener("ngSubmit", function AdminParametersComponent_form_18_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.save());
    });
    \u0275\u0275template(1, AdminParametersComponent_form_18_section_1_Template, 50, 4, "section", 43)(2, AdminParametersComponent_form_18_section_2_Template, 100, 16, "section", 43)(3, AdminParametersComponent_form_18_section_3_Template, 66, 22, "section", 43)(4, AdminParametersComponent_form_18_section_4_Template, 14, 1, "section", 43)(5, AdminParametersComponent_form_18_p_5_Template, 2, 1, "p", 44);
    \u0275\u0275elementStart(6, "div", 45)(7, "div", 46)(8, "span", 47);
    \u0275\u0275text(9, "\xBFListo para aplicar los cambios?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 48);
    \u0275\u0275text(11, "Al guardar, las nuevas cotizaciones usar\xE1n estos valores de inmediato.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 49)(13, "button", 50);
    \u0275\u0275listener("click", function AdminParametersComponent_form_18_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.askReset());
    });
    \u0275\u0275text(14, "Restaurar valores iniciales");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "button", 51);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.isVisible("impuestos"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.isVisible("renta"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.isVisible("mensual"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.isVisible("tasas"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.error);
    \u0275\u0275advance(10);
    \u0275\u0275property("disabled", ctx_r0.saving || !ctx_r0.isDirty)("title", ctx_r0.isDirty ? "" : "No hay cambios por guardar");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.saving ? "Guardando..." : "Guardar cambios");
  }
}
function AdminParametersComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 118);
    \u0275\u0275listener("click", function AdminParametersComponent_div_19_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeResetModal());
    });
    \u0275\u0275elementStart(1, "div", 119);
    \u0275\u0275listener("click", function AdminParametersComponent_div_19_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 120);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 5);
    \u0275\u0275element(4, "path", 121)(5, "line", 122)(6, "line", 123);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(7, "h3");
    \u0275\u0275text(8, "Restaurar valores iniciales");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p");
    \u0275\u0275text(10, "El formulario volver\xE1 a los valores por defecto. Esta acci\xF3n no guarda cambios y puedes deshacerla desde el aviso que aparecer\xE1.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 124)(12, "button", 50);
    \u0275\u0275listener("click", function AdminParametersComponent_div_19_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeResetModal());
    });
    \u0275\u0275text(13, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 125);
    \u0275\u0275listener("click", function AdminParametersComponent_div_19_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.confirmReset());
    });
    \u0275\u0275text(15, "Restaurar");
    \u0275\u0275elementEnd()()()();
  }
}
function AdminParametersComponent_div_21_span_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 131);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r12.actionLabel);
  }
}
function AdminParametersComponent_div_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 126);
    \u0275\u0275listener("click", function AdminParametersComponent_div_21_Template_div_click_0_listener() {
      const t_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.handleToast(t_r12));
    });
    \u0275\u0275elementStart(1, "span", 127);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 128);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, AdminParametersComponent_div_21_span_5_Template, 2, 1, "span", 129);
    \u0275\u0275elementStart(6, "button", 130);
    \u0275\u0275listener("click", function AdminParametersComponent_div_21_Template_button_click_6_listener($event) {
      const t_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      ctx_r0.toast.dismiss(t_r12.id);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275text(7, "\xD7");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r12 = ctx.$implicit;
    \u0275\u0275classMap("toast-" + t_r12.type);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r12.type === "success" ? "\u2713" : t_r12.type === "error" ? "\u2715" : "\u2139");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r12.message);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", t_r12.actionLabel);
  }
}
var AdminParametersComponent = class _AdminParametersComponent {
  catalog = inject(CatalogService);
  toast = inject(ToastService);
  config = structuredClone(DEFAULT_CALCULATOR_CONFIG);
  savedSnapshot = "";
  loading = true;
  saving = false;
  error = "";
  terms = [12, 24, 36, 48];
  activeSection = "todos";
  showResetModal = false;
  async ngOnInit() {
    this.config = structuredClone(this.catalog.getCalculatorConfig());
    this.savedSnapshot = JSON.stringify(this.config);
    this.loading = false;
    this.catalog.loadCalculatorConfig().then(() => {
      this.config = structuredClone(this.catalog.getCalculatorConfig());
      this.savedSnapshot = JSON.stringify(this.config);
    }).catch((loadError) => {
      console.warn("No se pudo sincronizar la configuraci\xF3n del cotizador:", loadError);
    });
  }
  // ===== MENÚ DE SECCIONES (mismo estilo que admin-sellers / admin-admins) =====
  setSection(id) {
    this.activeSection = id;
  }
  isVisible(id) {
    return this.activeSection === "todos" || this.activeSection === id;
  }
  termTone(term) {
    const tones = { 12: "blue", 24: "green", 36: "amber", 48: "slate" };
    return tones[term] ?? "slate";
  }
  // ===== ESTADO DE CAMBIOS SIN GUARDAR =====
  get isDirty() {
    return JSON.stringify(this.config) !== this.savedSnapshot;
  }
  // ===== CONVERSIONES Y FORMATO =====
  percent(value) {
    return value * 100;
  }
  setPercent(target, value) {
    this.config[target] = Number(value) / 100;
  }
  formatMoney(value) {
    return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 2 }).format(value || 0);
  }
  get distributionSum() {
    return Math.round((this.percent(this.config.fleetManagementPct) + this.percent(this.config.adminManagementPct)) * 100) / 100;
  }
  get residualRows() {
    return [
      { n: 1, value: this.config.residualOption1Pct },
      { n: 2, value: this.config.residualOption2Pct },
      { n: 3, value: this.config.residualOption3Pct }
    ];
  }
  // ===== GUARDADO =====
  async save() {
    this.error = "";
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
      this.toast.error("No se pudieron guardar los par\xE1metros: " + error.message);
    } else {
      this.savedSnapshot = JSON.stringify(this.config);
      this.toast.success("Par\xE1metros guardados. Las nuevas cotizaciones usar\xE1n estos valores.");
    }
  }
  // ===== RESTAURAR VALORES INICIALES =====
  askReset() {
    this.showResetModal = true;
  }
  closeResetModal() {
    this.showResetModal = false;
  }
  confirmReset() {
    const previous = structuredClone(this.config);
    this.config = structuredClone(DEFAULT_CALCULATOR_CONFIG);
    this.showResetModal = false;
    this.toast.undo("Valores restaurados a los iniciales (a\xFAn sin guardar).", () => {
      this.config = previous;
    });
  }
  // ===== TOASTS (mismo manejo que admin-admins) =====
  handleToast(t) {
    if (t.action)
      t.action();
    this.toast.dismiss(t.id);
  }
  validate() {
    const c = this.config;
    const percentages = [c.ivaPct, c.advisoryFeePct, c.insurancePct, c.maxRentAndResidualPct, c.minimumRentPct1, c.minimumRentPct2, c.minimumRentPct3, c.fleetManagementPct, c.adminManagementPct, c.residualOption1Pct, c.residualOption2Pct, c.residualOption3Pct];
    if (percentages.some((value) => !Number.isFinite(value) || value < 0 || value > 1))
      return "Los porcentajes deben estar entre 0% y 100%.";
    if (c.minimumRentThreshold1 <= 0 || c.minimumRentThreshold2 <= c.minimumRentThreshold1)
      return "Los l\xEDmites de precio deben ser positivos y estar en orden ascendente.";
    if (c.adminFeeInitialNet < 0 || c.basicRentStandard < 0 || c.basicRentHybrid < 0)
      return "Los importes no pueden ser negativos.";
    if (Math.abs(c.fleetManagementPct + c.adminManagementPct - 1) > 1e-6)
      return "La distribuci\xF3n mensual debe sumar 100%.";
    if (Math.max(c.residualOption1Pct, c.residualOption2Pct, c.residualOption3Pct) > c.maxRentAndResidualPct)
      return "Los residuales no pueden superar el m\xE1ximo permitido.";
    for (const term of this.terms) {
      const rates = c.termRates[term];
      if (!rates || [rates.option1Rate, rates.option2Rate, rates.option3Rate].some((value) => !Number.isFinite(value) || value < 0 || value > 2))
        return `La tasa del plazo ${term} meses no es v\xE1lida.`;
    }
    return "";
  }
  static \u0275fac = function AdminParametersComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminParametersComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminParametersComponent, selectors: [["app-admin-parameters"]], decls: 22, vars: 9, consts: [[1, "parameters-container"], [1, "page-header"], [1, "page-heading"], [1, "page-kicker"], ["type", "button", 1, "btn-primary", 3, "click", "disabled", "title"], ["viewBox", "0 0 24 24", "aria-hidden", "true"], ["d", "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"], ["d", "M17 21v-8H7v8"], ["d", "M7 3v5h8"], ["class", "stats-grid", 4, "ngIf"], ["class", "toolbar", 4, "ngIf"], ["class", "state", 4, "ngIf"], ["novalidate", "", 3, "ngSubmit", 4, "ngIf"], ["class", "modal-overlay", 3, "click", 4, "ngIf"], [1, "toast-host"], ["class", "toast", 3, "class", "click", 4, "ngFor", "ngForOf"], [1, "stats-grid"], [1, "stat-card", "stat-plain"], [1, "stat-icon", "tone-green"], ["x1", "19", "y1", "5", "x2", "5", "y2", "19"], ["cx", "6.5", "cy", "6.5", "r", "2.5"], ["cx", "17.5", "cy", "17.5", "r", "2.5"], [1, "stat-body"], [1, "stat-icon", "tone-blue"], ["d", "M12 1v22"], ["d", "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"], [1, "stat-icon", "tone-slate"], ["d", "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"], ["d", "M9 22V12h6v10"], [1, "stat-icon", "tone-amber"], ["d", "M21.21 15.89A10 10 0 1 1 8 2.83"], ["d", "M22 12A10 10 0 0 0 12 2v10z"], [1, "toolbar"], ["role", "group", "aria-label", "Secciones de configuraci\xF3n", 1, "chip-group"], ["type", "button", 1, "chip", 3, "click"], [1, "results-count"], ["class", "dirty-pill", 4, "ngIf"], ["class", "clean-note", 4, "ngIf"], [1, "dirty-pill"], [1, "clean-note"], [1, "state"], [1, "spinner"], ["novalidate", "", 3, "ngSubmit"], ["class", "config-card", 4, "ngIf"], ["class", "error", 4, "ngIf"], [1, "form-actions"], [1, "actions-left"], [1, "actions-title"], [1, "actions-hint"], [1, "actions-right"], ["type", "button", 1, "btn-cancel", 3, "click"], ["type", "submit", 1, "btn-confirm", 3, "disabled", "title"], [1, "config-card"], [1, "config-card-header"], [1, "config-icon", "tone-green"], ["d", "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"], ["d", "M14 2v6h6"], ["d", "M9 13h6"], ["d", "M9 17h4"], [1, "fields"], [1, "field"], [1, "field-label"], [1, "input-suffix"], ["type", "number", "min", "0", "max", "100", "step", "0.1", "name", "iva", 3, "ngModelChange", "ngModel"], [1, "suffix"], [1, "field-help"], ["type", "number", "min", "0", "max", "100", "step", "0.1", "name", "advisory", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "0", "max", "100", "step", "0.1", "name", "insurance", 3, "ngModelChange", "ngModel"], [1, "input-prefix"], [1, "prefix"], ["type", "number", "min", "0", "step", "0.01", "name", "adminFee", 3, "ngModelChange", "ngModel"], [1, "config-icon", "tone-amber"], ["d", "M23 6l-9.5 9.5-5-5L1 18"], ["d", "M17 6h6v6"], ["type", "number", "min", "0", "step", "1000", "name", "threshold1", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "0", "step", "1000", "name", "threshold2", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "0", "max", "100", "step", "0.5", "name", "min1", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "0", "max", "100", "step", "0.5", "name", "min2", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "0", "max", "100", "step", "0.5", "name", "min3", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "0", "max", "100", "step", "0.5", "name", "maxSum", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "0", "max", "100", "step", "0.5", "name", "res1", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "0", "max", "100", "step", "0.5", "name", "res2", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "0", "max", "100", "step", "0.5", "name", "res3", 3, "ngModelChange", "ngModel"], [1, "residual-visual"], ["class", "residual-row", 4, "ngFor", "ngForOf"], [1, "residual-caption"], [1, "max-mark"], [1, "residual-row"], [1, "residual-name"], [1, "residual-track"], [1, "residual-fill"], [1, "residual-max"], [1, "residual-value"], [1, "config-icon", "tone-blue"], ["x", "3", "y", "4", "width", "18", "height", "18", "rx", "2", "ry", "2"], ["x1", "16", "y1", "2", "x2", "16", "y2", "6"], ["x1", "8", "y1", "2", "x2", "8", "y2", "6"], ["x1", "3", "y1", "10", "x2", "21", "y2", "10"], ["type", "number", "min", "0", "step", "50", "name", "standard", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "0", "step", "50", "name", "hybrid", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "0", "max", "100", "step", "1", "name", "fleet", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "0", "max", "100", "step", "1", "name", "management", 3, "ngModelChange", "ngModel"], [1, "distribution"], [1, "distribution-bar"], [1, "seg", "seg-fleet"], [1, "seg", "seg-admin"], [1, "distribution-legend"], [1, "dot", "dot-green"], [1, "dot", "dot-dark"], [1, "distribution-sum"], [1, "config-icon", "tone-slate"], [1, "rates"], ["class", "rate-row", 4, "ngFor", "ngForOf"], [1, "rate-row"], [1, "term-badge"], ["type", "number", "min", "0", "max", "2", "step", "0.001", 3, "ngModelChange", "ngModel", "name"], [1, "rate-eq"], [1, "error"], [1, "modal-overlay", 3, "click"], [1, "modal-content", "confirm-modal", 3, "click"], [1, "confirm-icon", "warning"], ["d", "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"], ["x1", "12", "y1", "9", "x2", "12", "y2", "13"], ["x1", "12", "y1", "17", "x2", "12.01", "y2", "17"], [1, "modal-actions"], ["type", "button", 1, "btn-confirm", 3, "click"], [1, "toast", 3, "click"], [1, "toast-icon"], [1, "toast-msg"], ["class", "toast-action", 4, "ngIf"], ["aria-label", "Cerrar", 1, "toast-close", 3, "click"], [1, "toast-action"]], template: function AdminParametersComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "span", 3);
      \u0275\u0275text(4, "Configuraci\xF3n operativa");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "h2");
      \u0275\u0275text(6, "Par\xE1metros del Cotizador");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "p");
      \u0275\u0275text(8, "Modifica las cifras del c\xE1lculo. Los cambios se aplican al cargar cada nueva cotizaci\xF3n.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "button", 4);
      \u0275\u0275listener("click", function AdminParametersComponent_Template_button_click_9_listener() {
        return ctx.save();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(10, "svg", 5);
      \u0275\u0275element(11, "path", 6)(12, "path", 7)(13, "path", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275text(14);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(15, AdminParametersComponent_div_15_Template, 44, 10, "div", 9)(16, AdminParametersComponent_div_16_Template, 15, 12, "div", 10)(17, AdminParametersComponent_div_17_Template, 3, 0, "div", 11)(18, AdminParametersComponent_form_18_Template, 17, 8, "form", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275template(19, AdminParametersComponent_div_19_Template, 16, 0, "div", 13);
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(20, "div", 14);
      \u0275\u0275template(21, AdminParametersComponent_div_21_Template, 8, 5, "div", 15);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(9);
      \u0275\u0275property("disabled", ctx.loading || ctx.saving || !ctx.isDirty)("title", ctx.isDirty ? "" : "No hay cambios por guardar");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" ", ctx.saving ? "Guardando..." : "Guardar cambios", " ");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showResetModal);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", ctx.toast.toasts());
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgControlStatusGroup, MinValidator, MaxValidator, NgModel, NgForm, DecimalPipe], styles: ['\n.parameters-container[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  background: var(--%NS%surface-subtle);\n  border: 0;\n  padding: 0;\n  box-shadow: none;\n  color: #173c2e;\n  font-family: var(--%NS%font-body, "Inter", sans-serif);\n}\n.parameters-container[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 38%;\n  height: 190px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(32, 176, 56, 0.14),\n      rgba(16, 37, 31, 0.07));\n  clip-path: polygon(35% 0, 100% 0, 100% 100%, 0 100%);\n  pointer-events: none;\n  z-index: 0;\n}\n.parameters-container[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-end;\n  min-height: 152px;\n  margin: 0 0 1.15rem;\n  padding: 1.5rem 1.75rem;\n  border: 1px solid rgba(139, 226, 140, 0.22);\n  border-radius: 16px;\n  background:\n    linear-gradient(\n      115deg,\n      #10251f 0%,\n      #173c2e 68%,\n      #1f6840 100%);\n  box-shadow: 0 16px 30px rgba(16, 37, 31, 0.16);\n}\n.parameters-container[_ngcontent-%COMP%]   .page-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0.25rem 0 0.35rem;\n  color: var(--%NS%text-on-accent);\n  font-family: var(--%NS%font-heading, "Fjalla One", sans-serif);\n  font-size: 2rem;\n  line-height: 1;\n}\n.parameters-container[_ngcontent-%COMP%]   .page-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  max-width: 480px;\n  margin: 0;\n  color: #bdd6c7;\n  font-size: 0.88rem;\n}\n.page-kicker[_ngcontent-%COMP%] {\n  color: #8be28c;\n  font-size: 0.68rem;\n  font-weight: 700;\n  letter-spacing: 1.2px;\n  text-transform: uppercase;\n}\n.parameters-container[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 2;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  min-height: 44px;\n  padding: 0.75rem 1rem;\n  border: 0;\n  border-radius: 9px;\n  background: var(--%NS%btn-primary-bg);\n  color: var(--%NS%btn-primary-text);\n  white-space: nowrap;\n  cursor: pointer;\n  font-weight: 700;\n  font-size: 0.9rem;\n  font-family: inherit;\n  transition: all 0.2s;\n}\n.parameters-container[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: var(--%NS%btn-primary-bg-hover);\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.16);\n}\n.parameters-container[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: wait;\n}\n.parameters-container[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 17px;\n  height: 17px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 2;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.stats-grid[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 0.8rem;\n  margin: 0 0 1rem;\n}\n.stat-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.7rem;\n  padding: 0.95rem 1rem;\n  border: 1px solid var(--%NS%border-color);\n  border-radius: 14px;\n  background: var(--%NS%surface-card);\n  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.05);\n  text-align: left;\n  font-family: var(--%NS%font-body);\n}\n.stat-card.stat-plain[_ngcontent-%COMP%] {\n  cursor: default;\n}\n.stat-icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 42px;\n  height: 42px;\n  flex-shrink: 0;\n  border-radius: 12px;\n}\n.stat-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 22px;\n  height: 22px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 1.8;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.tone-slate[_ngcontent-%COMP%] {\n  background: var(--%NS%surface-muted);\n  color: var(--%NS%text-silver);\n}\n.tone-green[_ngcontent-%COMP%] {\n  background: var(--%NS%accent-green-light);\n  color: var(--%NS%accent-green-dark);\n}\n.tone-amber[_ngcontent-%COMP%] {\n  background: var(--%NS%warning-bg);\n  color: var(--%NS%warning);\n}\n.tone-blue[_ngcontent-%COMP%] {\n  background: var(--%NS%info-bg);\n  color: var(--%NS%info);\n}\n.stat-body[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  line-height: 1.1;\n}\n.stat-body[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 1.35rem;\n  font-weight: 800;\n  color: var(--%NS%btn-primary-text);\n}\n.stat-body[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  margin-top: 0.2rem;\n  color: var(--%NS%text-muted);\n  font-size: 0.72rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.4px;\n}\n.parameters-container[_ngcontent-%COMP%]   .toolbar[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 0.6rem;\n  margin: 0 0 1.15rem;\n  padding: 0.6rem 0.75rem;\n  border: 1px solid var(--%NS%border-color);\n  border-radius: 14px;\n  background: var(--%NS%surface-card);\n  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.05);\n}\n.chip-group[_ngcontent-%COMP%] {\n  display: inline-flex;\n  flex-wrap: wrap;\n  gap: 0.3rem;\n  padding: 0.22rem;\n  border-radius: 999px;\n  background: var(--%NS%surface-hover);\n}\n.chip[_ngcontent-%COMP%] {\n  padding: 0.35rem 0.85rem;\n  border: 0;\n  border-radius: 999px;\n  background: transparent;\n  color: var(--%NS%text-muted);\n  font-size: 0.78rem;\n  font-weight: 700;\n  cursor: pointer;\n  transition:\n    background 0.18s,\n    color 0.18s,\n    box-shadow 0.18s;\n}\n.chip[_ngcontent-%COMP%]:hover {\n  color: var(--%NS%text-silver);\n}\n.chip.is-active[_ngcontent-%COMP%] {\n  background: var(--%NS%surface-card);\n  color: var(--%NS%accent-green-dark);\n  box-shadow: 0 3px 8px rgba(15, 23, 42, 0.12);\n}\n.parameters-container[_ngcontent-%COMP%]   .results-count[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  margin-left: auto;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  color: var(--%NS%text-muted);\n  font-size: 0.8rem;\n  white-space: nowrap;\n}\n.clean-note[_ngcontent-%COMP%] {\n  color: var(--%NS%accent-green-dark);\n  font-weight: 700;\n}\n.dirty-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.32rem 0.75rem;\n  border-radius: 999px;\n  background: var(--%NS%warning-bg);\n  color: var(--%NS%warning);\n  font-size: 0.72rem;\n  font-weight: 800;\n  text-transform: uppercase;\n  letter-spacing: 0.4px;\n}\n.dirty-pill[_ngcontent-%COMP%]::before {\n  content: "";\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: #f59e0b;\n  animation: _ngcontent-%COMP%_pulseDot 1.4s ease-in-out infinite;\n}\n@keyframes _ngcontent-%COMP%_pulseDot {\n  0%, 100% {\n    opacity: 1;\n    transform: scale(1);\n  }\n  50% {\n    opacity: 0.45;\n    transform: scale(0.8);\n  }\n}\n.parameters-container[_ngcontent-%COMP%]   .config-card[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  margin: 0 0 1rem;\n  padding: 1.25rem 1.35rem 1.35rem;\n  border: 1px solid var(--%NS%border-color);\n  border-radius: 14px;\n  background: var(--%NS%surface-card);\n  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.05);\n}\n.config-card-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.8rem;\n  margin-bottom: 1.1rem;\n  padding-bottom: 0.95rem;\n  border-bottom: 1px dashed var(--%NS%border-color);\n}\n.config-icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 42px;\n  height: 42px;\n  flex-shrink: 0;\n  border-radius: 12px;\n}\n.config-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 21px;\n  height: 21px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 1.8;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.config-card-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.05rem;\n  color: var(--%NS%btn-primary-text);\n}\n.config-card-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.2rem 0 0;\n  color: var(--%NS%text-muted);\n  font-size: 0.82rem;\n}\n.parameters-container[_ngcontent-%COMP%]   .fields[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));\n  gap: 0.9rem 1rem;\n}\n.field[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.35rem;\n  align-content: start;\n}\n.field-label[_ngcontent-%COMP%] {\n  color: var(--%NS%text-silver);\n  font-size: 0.78rem;\n  font-weight: 800;\n  letter-spacing: 0.5px;\n  text-transform: uppercase;\n}\n.field-help[_ngcontent-%COMP%] {\n  color: var(--%NS%accent-silver);\n  font-size: 0.72rem;\n  line-height: 1.35;\n}\n.parameters-container[_ngcontent-%COMP%]   .field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n  box-sizing: border-box;\n  min-height: 42px;\n  padding: 0.55rem 0.75rem;\n  border: 1.5px solid var(--%NS%input-border);\n  border-radius: 10px;\n  background: var(--%NS%surface-card);\n  color: var(--%NS%text-main);\n  font: inherit;\n  font-size: 0.92rem;\n  transition:\n    border-color 0.2s,\n    box-shadow 0.2s,\n    background 0.2s;\n}\n.parameters-container[_ngcontent-%COMP%]   .field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--%NS%accent-green);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.1);\n}\n.input-prefix[_ngcontent-%COMP%], \n.input-suffix[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.input-prefix[_ngcontent-%COMP%]   .prefix[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 0.75rem;\n  color: var(--%NS%text-muted);\n  font-weight: 700;\n  pointer-events: none;\n}\n.input-suffix[_ngcontent-%COMP%]   .suffix[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 2.1rem;\n  color: var(--%NS%text-muted);\n  font-weight: 700;\n  pointer-events: none;\n}\n.parameters-container[_ngcontent-%COMP%]   .field[_ngcontent-%COMP%]   .input-prefix[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  padding-left: 2rem;\n}\n.parameters-container[_ngcontent-%COMP%]   .field[_ngcontent-%COMP%]   .input-suffix[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  padding-right: 3.1rem;\n}\n.distribution[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n  margin-top: 0.35rem;\n  padding: 0.9rem 1rem;\n  border: 1px solid var(--%NS%border-color);\n  border-radius: 12px;\n  background: var(--%NS%surface-subtle);\n}\n.distribution-bar[_ngcontent-%COMP%] {\n  display: flex;\n  height: 12px;\n  border-radius: 999px;\n  overflow: hidden;\n  background: var(--%NS%border-color);\n}\n.distribution-bar[_ngcontent-%COMP%]   .seg[_ngcontent-%COMP%] {\n  height: 100%;\n  min-width: 0;\n  transition: width 0.25s ease;\n}\n.seg-fleet[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      90deg,\n      var(--%NS%accent-green-dark),\n      var(--%NS%accent-green));\n}\n.seg-admin[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      90deg,\n      var(--%NS%text-main),\n      var(--%NS%text-silver));\n}\n.distribution-legend[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.4rem 1.2rem;\n  margin-top: 0.55rem;\n  color: var(--%NS%text-silver);\n  font-size: 0.78rem;\n  font-weight: 600;\n}\n.dot[_ngcontent-%COMP%] {\n  display: inline-block;\n  width: 9px;\n  height: 9px;\n  border-radius: 50%;\n  margin-right: 0.35rem;\n}\n.dot-green[_ngcontent-%COMP%] {\n  background: var(--%NS%accent-green);\n}\n.dot-dark[_ngcontent-%COMP%] {\n  background: var(--%NS%text-silver);\n}\n.distribution-sum[_ngcontent-%COMP%] {\n  margin-top: 0.45rem;\n  color: var(--%NS%text-muted);\n  font-size: 0.75rem;\n}\n.distribution-sum.is-invalid[_ngcontent-%COMP%] {\n  color: var(--%NS%danger);\n  font-weight: 700;\n}\n.residual-visual[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n  margin-top: 0.35rem;\n  padding: 0.9rem 1rem;\n  border: 1px solid var(--%NS%border-color);\n  border-radius: 12px;\n  background: var(--%NS%surface-subtle);\n}\n.residual-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 72px 1fr 58px;\n  align-items: center;\n  gap: 0.7rem;\n}\n.residual-row[_ngcontent-%COMP%]    + .residual-row[_ngcontent-%COMP%] {\n  margin-top: 0.55rem;\n}\n.residual-name[_ngcontent-%COMP%] {\n  color: var(--%NS%text-silver);\n  font-size: 0.78rem;\n  font-weight: 700;\n}\n.residual-track[_ngcontent-%COMP%] {\n  position: relative;\n  height: 10px;\n  border-radius: 999px;\n  background: var(--%NS%border-color);\n}\n.residual-fill[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  border-radius: 999px;\n  background:\n    linear-gradient(\n      90deg,\n      #8be28c,\n      var(--%NS%accent-green));\n  transition: width 0.25s ease;\n}\n.residual-max[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -3px;\n  bottom: -3px;\n  width: 2px;\n  background: #e11d48;\n}\n.residual-value[_ngcontent-%COMP%] {\n  text-align: right;\n  color: var(--%NS%btn-primary-text);\n  font-size: 0.82rem;\n}\n.residual-caption[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  margin-top: 0.65rem;\n  color: var(--%NS%text-muted);\n  font-size: 0.72rem;\n}\n.max-mark[_ngcontent-%COMP%] {\n  display: inline-block;\n  width: 2px;\n  height: 12px;\n  background: #e11d48;\n}\n.parameters-container[_ngcontent-%COMP%]   .rates[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.6rem;\n}\n.rate-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 130px repeat(3, 1fr);\n  gap: 0.75rem;\n  align-items: start;\n  padding: 0.85rem 0.95rem;\n  border: 1px solid var(--%NS%border-color);\n  border-radius: 12px;\n  background: var(--%NS%surface-subtle);\n}\n.term-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-self: start;\n  padding: 0.42rem 0.8rem;\n  border-radius: 999px;\n  font-size: 0.8rem;\n  font-weight: 800;\n}\n.rate-eq[_ngcontent-%COMP%] {\n  color: var(--%NS%accent-silver);\n  font-size: 0.7rem;\n}\n.parameters-container[_ngcontent-%COMP%]   .error[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  margin: 0 0 1rem;\n  padding: 0.75rem 1rem;\n  border: 1px solid var(--%NS%danger-border);\n  border-radius: 12px;\n  background: var(--%NS%danger-bg);\n  color: var(--%NS%danger);\n  font-weight: 600;\n}\n.form-actions[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 0.8rem;\n  flex-wrap: wrap;\n  margin: 0.25rem 0 1.5rem;\n  padding: 1rem 1.25rem;\n  border: 1px solid var(--%NS%border-color);\n  border-radius: 14px;\n  background: var(--%NS%surface-card);\n  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.05);\n}\n.form-actions[_ngcontent-%COMP%]   .actions-left[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.15rem;\n}\n.form-actions[_ngcontent-%COMP%]   .actions-title[_ngcontent-%COMP%] {\n  color: var(--%NS%btn-primary-text);\n  font-size: 0.9rem;\n  font-weight: 700;\n}\n.form-actions[_ngcontent-%COMP%]   .actions-hint[_ngcontent-%COMP%] {\n  color: var(--%NS%accent-silver);\n  font-size: 0.76rem;\n}\n.form-actions[_ngcontent-%COMP%]   .actions-right[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.6rem;\n  flex-wrap: wrap;\n}\n.btn-cancel[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 40px;\n  padding: 0.55rem 1.15rem;\n  border: 1px solid var(--%NS%input-border);\n  border-radius: 9px;\n  background: var(--%NS%surface-card);\n  color: var(--%NS%text-silver);\n  font-weight: 700;\n  font-size: 0.85rem;\n  cursor: pointer;\n  transition: all 0.18s ease;\n}\n.btn-cancel[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%surface-hover);\n  border-color: var(--%NS%border-strong);\n}\n.btn-confirm[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 40px;\n  padding: 0.55rem 1.3rem;\n  border: 0;\n  border-radius: 9px;\n  background:\n    linear-gradient(\n      135deg,\n      var(--%NS%accent-green-dark),\n      var(--%NS%accent-green));\n  color: var(--%NS%text-on-accent);\n  font-weight: 700;\n  font-size: 0.85rem;\n  cursor: pointer;\n  box-shadow: 0 10px 20px -8px rgba(32, 176, 56, 0.5);\n  transition: transform 0.18s ease, box-shadow 0.18s ease;\n}\n.btn-confirm[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-1px);\n  box-shadow: 0 14px 26px -8px rgba(32, 176, 56, 0.55);\n}\n.btn-confirm[_ngcontent-%COMP%]:disabled {\n  opacity: 0.65;\n  cursor: wait;\n  transform: none;\n}\n.parameters-container[_ngcontent-%COMP%]   .state[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.6rem;\n  padding: 2.5rem;\n  color: var(--%NS%text-muted);\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  border: 2.5px solid var(--%NS%input-border);\n  border-top-color: var(--%NS%accent-green);\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.7s linear infinite;\n  display: inline-block;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 3500;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 1rem;\n  background: rgba(15, 23, 42, 0.5);\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: _ngcontent-%COMP%_fadeIn 0.2s ease;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.modal-content[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 440px;\n  max-height: 92vh;\n  overflow-y: auto;\n  border-radius: 18px;\n  background: var(--%NS%surface-card);\n  border: 1px solid var(--%NS%border-color);\n  padding: 1.6rem 1.7rem 1.4rem;\n  box-shadow: 0 30px 70px -20px rgba(15, 23, 42, 0.4);\n  animation: _ngcontent-%COMP%_riseIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);\n}\n@keyframes _ngcontent-%COMP%_riseIn {\n  from {\n    opacity: 0;\n    transform: translateY(18px) scale(0.97);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n.confirm-modal[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.confirm-icon[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 56px;\n  margin: 0 auto 0.9rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n}\n.confirm-icon.warning[_ngcontent-%COMP%] {\n  background: rgba(245, 158, 11, 0.14);\n  color: var(--%NS%warning);\n}\n.confirm-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 26px;\n  height: 26px;\n  stroke: currentColor;\n  fill: none;\n  stroke-width: 2;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.confirm-modal[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 0.5rem;\n  font-size: 1.15rem;\n  color: var(--%NS%text-main);\n}\n.confirm-modal[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 1.2rem;\n  color: #555555;\n  font-size: 0.92rem;\n  line-height: 1.5;\n}\n.modal-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.75rem;\n  justify-content: center;\n}\n.toast-host[_ngcontent-%COMP%] {\n  position: fixed;\n  z-index: 4000;\n  right: 1.1rem;\n  bottom: 1.1rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.6rem;\n  max-width: 400px;\n}\n.toast[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  padding: 0.75rem 0.9rem;\n  border-radius: 12px;\n  background: var(--%NS%text-main);\n  color: var(--%NS%surface-card);\n  font-size: 0.86rem;\n  box-shadow: 0 16px 34px -10px rgba(15, 23, 42, 0.35);\n  animation: _ngcontent-%COMP%_toastIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);\n  cursor: pointer;\n}\n@keyframes _ngcontent-%COMP%_toastIn {\n  from {\n    opacity: 0;\n    transform: translateY(14px) scale(0.97);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n.toast-success[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #14532d,\n      var(--%NS%accent-green-dark));\n}\n.toast-error[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #7f1d1d,\n      var(--%NS%danger));\n}\n.toast-info[_ngcontent-%COMP%] {\n  background: var(--%NS%text-main);\n}\n.toast-icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 22px;\n  height: 22px;\n  flex-shrink: 0;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, 0.18);\n  font-size: 0.75rem;\n  font-weight: 800;\n}\n.toast-msg[_ngcontent-%COMP%] {\n  flex: 1;\n  line-height: 1.35;\n}\n.toast-action[_ngcontent-%COMP%] {\n  padding: 0.28rem 0.65rem;\n  border-radius: 8px;\n  background: var(--%NS%surface-card);\n  color: var(--%NS%accent-green-dark);\n  font-size: 0.75rem;\n  font-weight: 800;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  white-space: nowrap;\n}\n.toast-close[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 22px;\n  height: 22px;\n  border: 0;\n  border-radius: 50%;\n  background: transparent;\n  color: rgba(255, 255, 255, 0.75);\n  font-size: 1rem;\n  cursor: pointer;\n}\n.toast-close[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.15);\n  color: var(--%NS%surface-card);\n}\n.parameters-container[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%]:focus-visible, \n.parameters-container[_ngcontent-%COMP%]   .btn-cancel[_ngcontent-%COMP%]:focus-visible, \n.parameters-container[_ngcontent-%COMP%]   .btn-confirm[_ngcontent-%COMP%]:focus-visible, \n.parameters-container[_ngcontent-%COMP%]   .chip[_ngcontent-%COMP%]:focus-visible, \n.parameters-container[_ngcontent-%COMP%]   .field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus-visible, \n.btn-cancel[_ngcontent-%COMP%]:focus-visible, \n.btn-confirm[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--%NS%accent-green);\n  outline-offset: 2px;\n}\n@media (max-width: 1024px) {\n  .stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n@media (max-width: 760px) {\n  .parameters-container[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%] {\n    align-items: stretch;\n    flex-direction: column;\n    gap: 0.85rem;\n    min-height: 0;\n  }\n  .parameters-container[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%] {\n    justify-content: center;\n    width: 100%;\n  }\n  .parameters-container[_ngcontent-%COMP%]   .toolbar[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n    padding: 0.8rem;\n  }\n  .parameters-container[_ngcontent-%COMP%]   .results-count[_ngcontent-%COMP%] {\n    margin-left: 0;\n    justify-content: center;\n  }\n  .rate-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .form-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .form-actions[_ngcontent-%COMP%]   .actions-right[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .form-actions[_ngcontent-%COMP%]   .actions-right[_ngcontent-%COMP%]   .btn-cancel[_ngcontent-%COMP%], \n   .form-actions[_ngcontent-%COMP%]   .actions-right[_ngcontent-%COMP%]   .btn-confirm[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .residual-row[_ngcontent-%COMP%] {\n    grid-template-columns: 60px 1fr 54px;\n  }\n}\n.parameters-container[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%]:not(.toast-host) {\n  position: relative;\n  z-index: 1;\n}\n@media (max-width: 768px) {\n  .parameters-container[_ngcontent-%COMP%]   .chip[_ngcontent-%COMP%] {\n    padding: 0.55rem 1.05rem;\n  }\n}\n@media (max-width: 480px) {\n  .stats-grid[_ngcontent-%COMP%] {\n    gap: 0.6rem;\n  }\n  .stat-card[_ngcontent-%COMP%] {\n    padding: 0.8rem 0.8rem;\n    gap: 0.55rem;\n  }\n  .stat-icon[_ngcontent-%COMP%] {\n    width: 36px;\n    height: 36px;\n  }\n  .stat-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n    width: 20px;\n    height: 20px;\n  }\n  .stat-body[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 1.2rem;\n  }\n  .stat-body[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    font-size: 0.66rem;\n    letter-spacing: 0.2px;\n  }\n}\n/*# sourceMappingURL=admin-parameters.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminParametersComponent, [{
    type: Component,
    args: [{ selector: "app-admin-parameters", standalone: true, imports: [CommonModule, FormsModule], template: `<div class="parameters-container">\r
    <!-- CABECERA -->\r
    <div class="page-header">\r
        <div class="page-heading">\r
            <span class="page-kicker">Configuraci\xF3n operativa</span>\r
            <h2>Par\xE1metros del Cotizador</h2>\r
            <p>Modifica las cifras del c\xE1lculo. Los cambios se aplican al cargar cada nueva cotizaci\xF3n.</p>\r
        </div>\r
        <button class="btn-primary" type="button" (click)="save()" [disabled]="loading || saving || !isDirty" [title]="isDirty ? '' : 'No hay cambios por guardar'">\r
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><path d="M17 21v-8H7v8"></path><path d="M7 3v5h8"></path></svg>\r
            {{ saving ? 'Guardando...' : 'Guardar cambios' }}\r
        </button>\r
    </div>\r
\r
    <!-- RESUMEN EN VIVO (M\xC9TRICAS) -->\r
    <div class="stats-grid" *ngIf="!loading">\r
        <div class="stat-card stat-plain">\r
            <span class="stat-icon tone-green">\r
                <svg viewBox="0 0 24 24" aria-hidden="true"><line x1="19" y1="5" x2="5" y2="19"></line><circle cx="6.5" cy="6.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle></svg>\r
            </span>\r
            <span class="stat-body"><strong>{{ percent(config.ivaPct) | number:'1.0-2' }}%</strong><small>IVA aplicado</small></span>\r
        </div>\r
        <div class="stat-card stat-plain">\r
            <span class="stat-icon tone-blue">\r
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1v22"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>\r
            </span>\r
            <span class="stat-body"><strong>{{ formatMoney(config.adminFeeInitialNet) }}</strong><small>Cuota inicial neta</small></span>\r
        </div>\r
        <div class="stat-card stat-plain">\r
            <span class="stat-icon tone-slate">\r
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><path d="M9 22V12h6v10"></path></svg>\r
            </span>\r
            <span class="stat-body"><strong>{{ formatMoney(config.basicRentStandard) }}</strong><small>Renta est\xE1ndar mensual</small></span>\r
        </div>\r
        <div class="stat-card stat-plain">\r
            <span class="stat-icon tone-amber">\r
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>\r
            </span>\r
            <span class="stat-body"><strong>{{ percent(config.residualOption1Pct) | number:'1.0-1' }}%</strong><small>Residual opci\xF3n 1</small></span>\r
        </div>\r
    </div>\r
\r
    <!-- MEN\xDA DE SECCIONES (TOOLBAR) -->\r
    <div class="toolbar" *ngIf="!loading">\r
        <div class="chip-group" role="group" aria-label="Secciones de configuraci\xF3n">\r
            <button type="button" class="chip" [class.is-active]="activeSection === 'todos'" (click)="setSection('todos')">Todos</button>\r
            <button type="button" class="chip" [class.is-active]="activeSection === 'impuestos'" (click)="setSection('impuestos')">Impuestos y cargos</button>\r
            <button type="button" class="chip" [class.is-active]="activeSection === 'renta'" (click)="setSection('renta')">Renta extraordinaria</button>\r
            <button type="button" class="chip" [class.is-active]="activeSection === 'mensual'" (click)="setSection('mensual')">Renta mensual</button>\r
            <button type="button" class="chip" [class.is-active]="activeSection === 'tasas'" (click)="setSection('tasas')">Tasas por plazo</button>\r
        </div>\r
        <span class="results-count">\r
            <span class="dirty-pill" *ngIf="isDirty">Cambios sin guardar</span>\r
            <span class="clean-note" *ngIf="!isDirty">\u2713 Todo guardado</span>\r
        </span>\r
    </div>\r
\r
    <!-- CARGANDO -->\r
    <div class="state" *ngIf="loading"><span class="spinner"></span> Cargando configuraci\xF3n...</div>\r
\r
    <form *ngIf="!loading" (ngSubmit)="save()" novalidate>\r
        <!-- SECCI\xD3N: IMPUESTOS Y CARGOS -->\r
        <section class="config-card" *ngIf="isVisible('impuestos')">\r
            <div class="config-card-header">\r
                <span class="config-icon tone-green">\r
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6"></path><path d="M9 13h6"></path><path d="M9 17h4"></path></svg>\r
                </span>\r
                <div>\r
                    <h3>Impuestos y cargos</h3>\r
                    <p>Porcentajes e importes que se aplican sobre el precio neto del veh\xEDculo.</p>\r
                </div>\r
            </div>\r
            <div class="fields">\r
                <label class="field">\r
                    <span class="field-label">IVA</span>\r
                    <span class="input-suffix">\r
                        <input type="number" min="0" max="100" step="0.1" [ngModel]="percent(config.ivaPct)" (ngModelChange)="setPercent('ivaPct', $event)" name="iva">\r
                        <span class="suffix">%</span>\r
                    </span>\r
                    <small class="field-help">Impuesto agregado al total de cada cotizaci\xF3n.</small>\r
                </label>\r
                <label class="field">\r
                    <span class="field-label">Asesor\xEDa</span>\r
                    <span class="input-suffix">\r
                        <input type="number" min="0" max="100" step="0.1" [ngModel]="percent(config.advisoryFeePct)" (ngModelChange)="setPercent('advisoryFeePct', $event)" name="advisory">\r
                        <span class="suffix">%</span>\r
                    </span>\r
                    <small class="field-help">Comisi\xF3n de asesor\xEDa sobre el precio neto.</small>\r
                </label>\r
                <label class="field">\r
                    <span class="field-label">Seguro estimado</span>\r
                    <span class="input-suffix">\r
                        <input type="number" min="0" max="100" step="0.1" [ngModel]="percent(config.insurancePct)" (ngModelChange)="setPercent('insurancePct', $event)" name="insurance">\r
                        <span class="suffix">%</span>\r
                    </span>\r
                    <small class="field-help">Se estima como porcentaje del precio neto.</small>\r
                </label>\r
                <label class="field">\r
                    <span class="field-label">Cuota inicial neta</span>\r
                    <span class="input-prefix">\r
                        <span class="prefix">$</span>\r
                        <input type="number" min="0" step="0.01" [(ngModel)]="config.adminFeeInitialNet" name="adminFee">\r
                    </span>\r
                    <small class="field-help">Cargo administrativo del pago inicial (sin IVA).</small>\r
                </label>\r
            </div>\r
        </section>\r
        <!-- SECCI\xD3N: RENTA EXTRAORDINARIA Y RESIDUALES -->\r
        <section class="config-card" *ngIf="isVisible('renta')">\r
            <div class="config-card-header">\r
                <span class="config-icon tone-amber">\r
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23 6l-9.5 9.5-5-5L1 18"></path><path d="M17 6h6v6"></path></svg>\r
                </span>\r
                <div>\r
                    <h3>Renta extraordinaria y residuales</h3>\r
                    <p>M\xEDnimos exigidos seg\xFAn el precio del veh\xEDculo y valores residuales por opci\xF3n.</p>\r
                </div>\r
            </div>\r
            <div class="fields">\r
                <label class="field">\r
                    <span class="field-label">Umbral 1</span>\r
                    <span class="input-prefix">\r
                        <span class="prefix">$</span>\r
                        <input type="number" min="0" step="1000" [(ngModel)]="config.minimumRentThreshold1" name="threshold1">\r
                    </span>\r
                    <small class="field-help">Precios menores a {{ formatMoney(config.minimumRentThreshold1) }} usan el m\xEDnimo menor.</small>\r
                </label>\r
                <label class="field">\r
                    <span class="field-label">Umbral 2</span>\r
                    <span class="input-prefix">\r
                        <span class="prefix">$</span>\r
                        <input type="number" min="0" step="1000" [(ngModel)]="config.minimumRentThreshold2" name="threshold2">\r
                    </span>\r
                    <small class="field-help">Precios mayores a {{ formatMoney(config.minimumRentThreshold2) }} usan el m\xEDnimo mayor.</small>\r
                </label>\r
                <label class="field">\r
                    <span class="field-label">M\xEDnimo menor</span>\r
                    <span class="input-suffix">\r
                        <input type="number" min="0" max="100" step="0.5" [ngModel]="percent(config.minimumRentPct1)" (ngModelChange)="setPercent('minimumRentPct1', $event)" name="min1">\r
                        <span class="suffix">%</span>\r
                    </span>\r
                    <small class="field-help">Renta extraordinaria m\xEDnima por debajo del umbral 1.</small>\r
                </label>\r
                <label class="field">\r
                    <span class="field-label">M\xEDnimo medio</span>\r
                    <span class="input-suffix">\r
                        <input type="number" min="0" max="100" step="0.5" [ngModel]="percent(config.minimumRentPct2)" (ngModelChange)="setPercent('minimumRentPct2', $event)" name="min2">\r
                        <span class="suffix">%</span>\r
                    </span>\r
                    <small class="field-help">Renta extraordinaria m\xEDnima entre el umbral 1 y el umbral 2.</small>\r
                </label>\r
                <label class="field">\r
                    <span class="field-label">M\xEDnimo mayor</span>\r
                    <span class="input-suffix">\r
                        <input type="number" min="0" max="100" step="0.5" [ngModel]="percent(config.minimumRentPct3)" (ngModelChange)="setPercent('minimumRentPct3', $event)" name="min3">\r
                        <span class="suffix">%</span>\r
                    </span>\r
                    <small class="field-help">Renta extraordinaria m\xEDnima por encima del umbral 2.</small>\r
                </label>\r
                <label class="field">\r
                    <span class="field-label">M\xE1ximo renta + residual</span>\r
                    <span class="input-suffix">\r
                        <input type="number" min="0" max="100" step="0.5" [ngModel]="percent(config.maxRentAndResidualPct)" (ngModelChange)="setPercent('maxRentAndResidualPct', $event)" name="maxSum">\r
                        <span class="suffix">%</span>\r
                    </span>\r
                    <small class="field-help">L\xEDmite para la suma de renta extraordinaria y residual.</small>\r
                </label>\r
                <label class="field">\r
                    <span class="field-label">Residual opci\xF3n 1</span>\r
                    <span class="input-suffix">\r
                        <input type="number" min="0" max="100" step="0.5" [ngModel]="percent(config.residualOption1Pct)" (ngModelChange)="setPercent('residualOption1Pct', $event)" name="res1">\r
                        <span class="suffix">%</span>\r
                    </span>\r
                    <small class="field-help">Valor residual propuesto en la opci\xF3n 1.</small>\r
                </label>\r
                <label class="field">\r
                    <span class="field-label">Residual opci\xF3n 2</span>\r
                    <span class="input-suffix">\r
                        <input type="number" min="0" max="100" step="0.5" [ngModel]="percent(config.residualOption2Pct)" (ngModelChange)="setPercent('residualOption2Pct', $event)" name="res2">\r
                        <span class="suffix">%</span>\r
                    </span>\r
                    <small class="field-help">Valor residual propuesto en la opci\xF3n 2.</small>\r
                </label>\r
                <label class="field">\r
                    <span class="field-label">Residual opci\xF3n 3</span>\r
                    <span class="input-suffix">\r
                        <input type="number" min="0" max="100" step="0.5" [ngModel]="percent(config.residualOption3Pct)" (ngModelChange)="setPercent('residualOption3Pct', $event)" name="res3">\r
                        <span class="suffix">%</span>\r
                    </span>\r
                    <small class="field-help">Valor residual propuesto en la opci\xF3n 3.</small>\r
                </label>\r
\r
                <!-- BARRAS VISUALES DE RESIDUALES -->\r
                <div class="residual-visual">\r
                    <div class="residual-row" *ngFor="let item of residualRows">\r
                        <span class="residual-name">Opci\xF3n {{ item.n }}</span>\r
                        <div class="residual-track">\r
                            <span class="residual-fill" [style.width.%]="percent(item.value)"></span>\r
                            <span class="residual-max" [style.left.%]="percent(config.maxRentAndResidualPct)"></span>\r
                        </div>\r
                        <strong class="residual-value">{{ percent(item.value) | number:'1.0-1' }}%</strong>\r
                    </div>\r
                    <div class="residual-caption">\r
                        <span class="max-mark"></span>\r
                        <span>M\xE1ximo permitido para renta + residual: {{ percent(config.maxRentAndResidualPct) | number:'1.0-1' }}%</span>\r
                    </div>\r
                </div>\r
            </div>\r
        </section>\r
        <!-- SECCI\xD3N: RENTA MENSUAL -->\r
        <section class="config-card" *ngIf="isVisible('mensual')">\r
            <div class="config-card-header">\r
                <span class="config-icon tone-blue">\r
                    <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>\r
                </span>\r
                <div>\r
                    <h3>Renta mensual y administraci\xF3n</h3>\r
                    <p>Rentas base mensuales y distribuci\xF3n del cargo de administraci\xF3n.</p>\r
                </div>\r
            </div>\r
            <div class="fields">\r
                <label class="field">\r
                    <span class="field-label">Renta est\xE1ndar</span>\r
                    <span class="input-prefix">\r
                        <span class="prefix">$</span>\r
                        <input type="number" min="0" step="50" [(ngModel)]="config.basicRentStandard" name="standard">\r
                    </span>\r
                    <small class="field-help">Renta base mensual para veh\xEDculos de combusti\xF3n.</small>\r
                </label>\r
                <label class="field">\r
                    <span class="field-label">Renta h\xEDbrida / el\xE9ctrica</span>\r
                    <span class="input-prefix">\r
                        <span class="prefix">$</span>\r
                        <input type="number" min="0" step="50" [(ngModel)]="config.basicRentHybrid" name="hybrid">\r
                    </span>\r
                    <small class="field-help">Renta base mensual para veh\xEDculos h\xEDbridos o el\xE9ctricos.</small>\r
                </label>\r
                <label class="field">\r
                    <span class="field-label">Administraci\xF3n de flotilla</span>\r
                    <span class="input-suffix">\r
                        <input type="number" min="0" max="100" step="1" [ngModel]="percent(config.fleetManagementPct)" (ngModelChange)="setPercent('fleetManagementPct', $event)" name="fleet">\r
                        <span class="suffix">%</span>\r
                    </span>\r
                    <small class="field-help">Parte del cargo mensual asignada a flotilla.</small>\r
                </label>\r
                <label class="field">\r
                    <span class="field-label">Administraci\xF3n</span>\r
                    <span class="input-suffix">\r
                        <input type="number" min="0" max="100" step="1" [ngModel]="percent(config.adminManagementPct)" (ngModelChange)="setPercent('adminManagementPct', $event)" name="management">\r
                        <span class="suffix">%</span>\r
                    </span>\r
                    <small class="field-help">Parte del cargo mensual asignada a administraci\xF3n.</small>\r
                </label>\r
\r
                <!-- DISTRIBUCI\xD3N VISUAL -->\r
                <div class="distribution">\r
                    <div class="distribution-bar">\r
                        <span class="seg seg-fleet" [style.width.%]="percent(config.fleetManagementPct)"></span>\r
                        <span class="seg seg-admin" [style.width.%]="percent(config.adminManagementPct)"></span>\r
                    </div>\r
                    <div class="distribution-legend">\r
                        <span><i class="dot dot-green"></i>Flotilla: {{ percent(config.fleetManagementPct) | number:'1.0-2' }}%</span>\r
                        <span><i class="dot dot-dark"></i>Administraci\xF3n: {{ percent(config.adminManagementPct) | number:'1.0-2' }}%</span>\r
                    </div>\r
                    <small class="distribution-sum" [class.is-invalid]="distributionSum !== 100">Suma total: {{ distributionSum | number:'1.0-2' }}% \u2014 debe ser exactamente 100%.</small>\r
                </div>\r
            </div>\r
        </section>\r
        <!-- SECCI\xD3N: TASAS POR PLAZO -->\r
        <section class="config-card" *ngIf="isVisible('tasas')">\r
            <div class="config-card-header">\r
                <span class="config-icon tone-slate">\r
                    <svg viewBox="0 0 24 24" aria-hidden="true"><line x1="19" y1="5" x2="5" y2="19"></line><circle cx="6.5" cy="6.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle></svg>\r
                </span>\r
                <div>\r
                    <h3>Tasas anuales por plazo</h3>\r
                    <p>Tasa anual aplicada a cada plazo y opci\xF3n, en formato decimal (0.405 = 40.5%).</p>\r
                </div>\r
            </div>\r
            <div class="rates">\r
                <div class="rate-row" *ngFor="let term of terms">\r
                    <span class="term-badge" [class]="'tone-' + termTone(term)">{{ term }} meses</span>\r
                    <label class="field">\r
                        <span class="field-label">Opci\xF3n 1</span>\r
                        <input type="number" min="0" max="2" step="0.001" [(ngModel)]="config.termRates[term].option1Rate" [name]="'o1-' + term">\r
                        <small class="rate-eq">= {{ percent(config.termRates[term].option1Rate) | number:'1.0-2' }}% anual</small>\r
                    </label>\r
                    <label class="field">\r
                        <span class="field-label">Opci\xF3n 2</span>\r
                        <input type="number" min="0" max="2" step="0.001" [(ngModel)]="config.termRates[term].option2Rate" [name]="'o2-' + term">\r
                        <small class="rate-eq">= {{ percent(config.termRates[term].option2Rate) | number:'1.0-2' }}% anual</small>\r
                    </label>\r
                    <label class="field">\r
                        <span class="field-label">Opci\xF3n 3</span>\r
                        <input type="number" min="0" max="2" step="0.001" [(ngModel)]="config.termRates[term].option3Rate" [name]="'o3-' + term">\r
                        <small class="rate-eq">= {{ percent(config.termRates[term].option3Rate) | number:'1.0-2' }}% anual</small>\r
                    </label>\r
                </div>\r
            </div>\r
        </section>\r
\r
        <p class="error" *ngIf="error">{{ error }}</p>\r
\r
        <!-- ACCIONES DEL FORMULARIO -->\r
        <div class="form-actions">\r
            <div class="actions-left">\r
                <span class="actions-title">\xBFListo para aplicar los cambios?</span>\r
                <span class="actions-hint">Al guardar, las nuevas cotizaciones usar\xE1n estos valores de inmediato.</span>\r
            </div>\r
            <div class="actions-right">\r
                <button class="btn-cancel" type="button" (click)="askReset()">Restaurar valores iniciales</button>\r
                <button class="btn-confirm" type="submit" [disabled]="saving || !isDirty" [title]="isDirty ? '' : 'No hay cambios por guardar'">{{ saving ? 'Guardando...' : 'Guardar cambios' }}</button>\r
            </div>\r
        </div>\r
    </form>\r
</div>\r
\r
<!-- MODAL DE CONFIRMACI\xD3N (RESTAURAR VALORES) -->\r
<div class="modal-overlay" *ngIf="showResetModal" (click)="closeResetModal()">\r
    <div class="modal-content confirm-modal" (click)="$event.stopPropagation()">\r
        <div class="confirm-icon warning">\r
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>\r
        </div>\r
        <h3>Restaurar valores iniciales</h3>\r
        <p>El formulario volver\xE1 a los valores por defecto. Esta acci\xF3n no guarda cambios y puedes deshacerla desde el aviso que aparecer\xE1.</p>\r
        <div class="modal-actions">\r
            <button class="btn-cancel" type="button" (click)="closeResetModal()">Cancelar</button>\r
            <button class="btn-confirm" type="button" (click)="confirmReset()">Restaurar</button>\r
        </div>\r
    </div>\r
</div>\r
\r
<!-- TOASTS (mismo estilo que admin-sellers / admin-admins) -->\r
<div class="toast-host">\r
    <div *ngFor="let t of toast.toasts()" class="toast" [class]="'toast-' + t.type" (click)="handleToast(t)">\r
        <span class="toast-icon">{{ t.type === 'success' ? '\u2713' : t.type === 'error' ? '\u2715' : '\u2139' }}</span>\r
        <span class="toast-msg">{{ t.message }}</span>\r
        <span class="toast-action" *ngIf="t.actionLabel">{{ t.actionLabel }}</span>\r
        <button class="toast-close" (click)="toast.dismiss(t.id); $event.stopPropagation()" aria-label="Cerrar">\xD7</button>\r
    </div>\r
</div>`, styles: ['/* src/app/components/admin/admin-parameters/admin-parameters.css */\n.parameters-container {\n  position: relative;\n  overflow: hidden;\n  background: var(--surface-subtle);\n  border: 0;\n  padding: 0;\n  box-shadow: none;\n  color: #173c2e;\n  font-family: var(--font-body, "Inter", sans-serif);\n}\n.parameters-container::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 38%;\n  height: 190px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(32, 176, 56, 0.14),\n      rgba(16, 37, 31, 0.07));\n  clip-path: polygon(35% 0, 100% 0, 100% 100%, 0 100%);\n  pointer-events: none;\n  z-index: 0;\n}\n.parameters-container .page-header {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-end;\n  min-height: 152px;\n  margin: 0 0 1.15rem;\n  padding: 1.5rem 1.75rem;\n  border: 1px solid rgba(139, 226, 140, 0.22);\n  border-radius: 16px;\n  background:\n    linear-gradient(\n      115deg,\n      #10251f 0%,\n      #173c2e 68%,\n      #1f6840 100%);\n  box-shadow: 0 16px 30px rgba(16, 37, 31, 0.16);\n}\n.parameters-container .page-heading h2 {\n  margin: 0.25rem 0 0.35rem;\n  color: var(--text-on-accent);\n  font-family: var(--font-heading, "Fjalla One", sans-serif);\n  font-size: 2rem;\n  line-height: 1;\n}\n.parameters-container .page-heading p {\n  max-width: 480px;\n  margin: 0;\n  color: #bdd6c7;\n  font-size: 0.88rem;\n}\n.page-kicker {\n  color: #8be28c;\n  font-size: 0.68rem;\n  font-weight: 700;\n  letter-spacing: 1.2px;\n  text-transform: uppercase;\n}\n.parameters-container .btn-primary {\n  position: relative;\n  z-index: 2;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  min-height: 44px;\n  padding: 0.75rem 1rem;\n  border: 0;\n  border-radius: 9px;\n  background: var(--btn-primary-bg);\n  color: var(--btn-primary-text);\n  white-space: nowrap;\n  cursor: pointer;\n  font-weight: 700;\n  font-size: 0.9rem;\n  font-family: inherit;\n  transition: all 0.2s;\n}\n.parameters-container .btn-primary:hover:not(:disabled) {\n  background: var(--btn-primary-bg-hover);\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.16);\n}\n.parameters-container .btn-primary:disabled {\n  opacity: 0.6;\n  cursor: wait;\n}\n.parameters-container .btn-primary svg {\n  width: 17px;\n  height: 17px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 2;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.stats-grid {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 0.8rem;\n  margin: 0 0 1rem;\n}\n.stat-card {\n  display: flex;\n  align-items: center;\n  gap: 0.7rem;\n  padding: 0.95rem 1rem;\n  border: 1px solid var(--border-color);\n  border-radius: 14px;\n  background: var(--surface-card);\n  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.05);\n  text-align: left;\n  font-family: var(--font-body);\n}\n.stat-card.stat-plain {\n  cursor: default;\n}\n.stat-icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 42px;\n  height: 42px;\n  flex-shrink: 0;\n  border-radius: 12px;\n}\n.stat-icon svg {\n  width: 22px;\n  height: 22px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 1.8;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.tone-slate {\n  background: var(--surface-muted);\n  color: var(--text-silver);\n}\n.tone-green {\n  background: var(--accent-green-light);\n  color: var(--accent-green-dark);\n}\n.tone-amber {\n  background: var(--warning-bg);\n  color: var(--warning);\n}\n.tone-blue {\n  background: var(--info-bg);\n  color: var(--info);\n}\n.stat-body {\n  display: flex;\n  flex-direction: column;\n  line-height: 1.1;\n}\n.stat-body strong {\n  font-size: 1.35rem;\n  font-weight: 800;\n  color: var(--btn-primary-text);\n}\n.stat-body small {\n  margin-top: 0.2rem;\n  color: var(--text-muted);\n  font-size: 0.72rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.4px;\n}\n.parameters-container .toolbar {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 0.6rem;\n  margin: 0 0 1.15rem;\n  padding: 0.6rem 0.75rem;\n  border: 1px solid var(--border-color);\n  border-radius: 14px;\n  background: var(--surface-card);\n  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.05);\n}\n.chip-group {\n  display: inline-flex;\n  flex-wrap: wrap;\n  gap: 0.3rem;\n  padding: 0.22rem;\n  border-radius: 999px;\n  background: var(--surface-hover);\n}\n.chip {\n  padding: 0.35rem 0.85rem;\n  border: 0;\n  border-radius: 999px;\n  background: transparent;\n  color: var(--text-muted);\n  font-size: 0.78rem;\n  font-weight: 700;\n  cursor: pointer;\n  transition:\n    background 0.18s,\n    color 0.18s,\n    box-shadow 0.18s;\n}\n.chip:hover {\n  color: var(--text-silver);\n}\n.chip.is-active {\n  background: var(--surface-card);\n  color: var(--accent-green-dark);\n  box-shadow: 0 3px 8px rgba(15, 23, 42, 0.12);\n}\n.parameters-container .results-count {\n  flex: 0 0 auto;\n  margin-left: auto;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  color: var(--text-muted);\n  font-size: 0.8rem;\n  white-space: nowrap;\n}\n.clean-note {\n  color: var(--accent-green-dark);\n  font-weight: 700;\n}\n.dirty-pill {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.32rem 0.75rem;\n  border-radius: 999px;\n  background: var(--warning-bg);\n  color: var(--warning);\n  font-size: 0.72rem;\n  font-weight: 800;\n  text-transform: uppercase;\n  letter-spacing: 0.4px;\n}\n.dirty-pill::before {\n  content: "";\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: #f59e0b;\n  animation: pulseDot 1.4s ease-in-out infinite;\n}\n@keyframes pulseDot {\n  0%, 100% {\n    opacity: 1;\n    transform: scale(1);\n  }\n  50% {\n    opacity: 0.45;\n    transform: scale(0.8);\n  }\n}\n.parameters-container .config-card {\n  position: relative;\n  z-index: 1;\n  margin: 0 0 1rem;\n  padding: 1.25rem 1.35rem 1.35rem;\n  border: 1px solid var(--border-color);\n  border-radius: 14px;\n  background: var(--surface-card);\n  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.05);\n}\n.config-card-header {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.8rem;\n  margin-bottom: 1.1rem;\n  padding-bottom: 0.95rem;\n  border-bottom: 1px dashed var(--border-color);\n}\n.config-icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 42px;\n  height: 42px;\n  flex-shrink: 0;\n  border-radius: 12px;\n}\n.config-icon svg {\n  width: 21px;\n  height: 21px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 1.8;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.config-card-header h3 {\n  margin: 0;\n  font-size: 1.05rem;\n  color: var(--btn-primary-text);\n}\n.config-card-header p {\n  margin: 0.2rem 0 0;\n  color: var(--text-muted);\n  font-size: 0.82rem;\n}\n.parameters-container .fields {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));\n  gap: 0.9rem 1rem;\n}\n.field {\n  display: grid;\n  gap: 0.35rem;\n  align-content: start;\n}\n.field-label {\n  color: var(--text-silver);\n  font-size: 0.78rem;\n  font-weight: 800;\n  letter-spacing: 0.5px;\n  text-transform: uppercase;\n}\n.field-help {\n  color: var(--accent-silver);\n  font-size: 0.72rem;\n  line-height: 1.35;\n}\n.parameters-container .field input {\n  width: 100%;\n  box-sizing: border-box;\n  min-height: 42px;\n  padding: 0.55rem 0.75rem;\n  border: 1.5px solid var(--input-border);\n  border-radius: 10px;\n  background: var(--surface-card);\n  color: var(--text-main);\n  font: inherit;\n  font-size: 0.92rem;\n  transition:\n    border-color 0.2s,\n    box-shadow 0.2s,\n    background 0.2s;\n}\n.parameters-container .field input:focus {\n  outline: none;\n  border-color: var(--accent-green);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.1);\n}\n.input-prefix,\n.input-suffix {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.input-prefix .prefix {\n  position: absolute;\n  left: 0.75rem;\n  color: var(--text-muted);\n  font-weight: 700;\n  pointer-events: none;\n}\n.input-suffix .suffix {\n  position: absolute;\n  right: 2.1rem;\n  color: var(--text-muted);\n  font-weight: 700;\n  pointer-events: none;\n}\n.parameters-container .field .input-prefix input {\n  padding-left: 2rem;\n}\n.parameters-container .field .input-suffix input {\n  padding-right: 3.1rem;\n}\n.distribution {\n  grid-column: 1 / -1;\n  margin-top: 0.35rem;\n  padding: 0.9rem 1rem;\n  border: 1px solid var(--border-color);\n  border-radius: 12px;\n  background: var(--surface-subtle);\n}\n.distribution-bar {\n  display: flex;\n  height: 12px;\n  border-radius: 999px;\n  overflow: hidden;\n  background: var(--border-color);\n}\n.distribution-bar .seg {\n  height: 100%;\n  min-width: 0;\n  transition: width 0.25s ease;\n}\n.seg-fleet {\n  background:\n    linear-gradient(\n      90deg,\n      var(--accent-green-dark),\n      var(--accent-green));\n}\n.seg-admin {\n  background:\n    linear-gradient(\n      90deg,\n      var(--text-main),\n      var(--text-silver));\n}\n.distribution-legend {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.4rem 1.2rem;\n  margin-top: 0.55rem;\n  color: var(--text-silver);\n  font-size: 0.78rem;\n  font-weight: 600;\n}\n.dot {\n  display: inline-block;\n  width: 9px;\n  height: 9px;\n  border-radius: 50%;\n  margin-right: 0.35rem;\n}\n.dot-green {\n  background: var(--accent-green);\n}\n.dot-dark {\n  background: var(--text-silver);\n}\n.distribution-sum {\n  margin-top: 0.45rem;\n  color: var(--text-muted);\n  font-size: 0.75rem;\n}\n.distribution-sum.is-invalid {\n  color: var(--danger);\n  font-weight: 700;\n}\n.residual-visual {\n  grid-column: 1 / -1;\n  margin-top: 0.35rem;\n  padding: 0.9rem 1rem;\n  border: 1px solid var(--border-color);\n  border-radius: 12px;\n  background: var(--surface-subtle);\n}\n.residual-row {\n  display: grid;\n  grid-template-columns: 72px 1fr 58px;\n  align-items: center;\n  gap: 0.7rem;\n}\n.residual-row + .residual-row {\n  margin-top: 0.55rem;\n}\n.residual-name {\n  color: var(--text-silver);\n  font-size: 0.78rem;\n  font-weight: 700;\n}\n.residual-track {\n  position: relative;\n  height: 10px;\n  border-radius: 999px;\n  background: var(--border-color);\n}\n.residual-fill {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  border-radius: 999px;\n  background:\n    linear-gradient(\n      90deg,\n      #8be28c,\n      var(--accent-green));\n  transition: width 0.25s ease;\n}\n.residual-max {\n  position: absolute;\n  top: -3px;\n  bottom: -3px;\n  width: 2px;\n  background: #e11d48;\n}\n.residual-value {\n  text-align: right;\n  color: var(--btn-primary-text);\n  font-size: 0.82rem;\n}\n.residual-caption {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  margin-top: 0.65rem;\n  color: var(--text-muted);\n  font-size: 0.72rem;\n}\n.max-mark {\n  display: inline-block;\n  width: 2px;\n  height: 12px;\n  background: #e11d48;\n}\n.parameters-container .rates {\n  display: grid;\n  gap: 0.6rem;\n}\n.rate-row {\n  display: grid;\n  grid-template-columns: 130px repeat(3, 1fr);\n  gap: 0.75rem;\n  align-items: start;\n  padding: 0.85rem 0.95rem;\n  border: 1px solid var(--border-color);\n  border-radius: 12px;\n  background: var(--surface-subtle);\n}\n.term-badge {\n  display: inline-flex;\n  align-items: center;\n  justify-self: start;\n  padding: 0.42rem 0.8rem;\n  border-radius: 999px;\n  font-size: 0.8rem;\n  font-weight: 800;\n}\n.rate-eq {\n  color: var(--accent-silver);\n  font-size: 0.7rem;\n}\n.parameters-container .error {\n  position: relative;\n  z-index: 1;\n  margin: 0 0 1rem;\n  padding: 0.75rem 1rem;\n  border: 1px solid var(--danger-border);\n  border-radius: 12px;\n  background: var(--danger-bg);\n  color: var(--danger);\n  font-weight: 600;\n}\n.form-actions {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 0.8rem;\n  flex-wrap: wrap;\n  margin: 0.25rem 0 1.5rem;\n  padding: 1rem 1.25rem;\n  border: 1px solid var(--border-color);\n  border-radius: 14px;\n  background: var(--surface-card);\n  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.05);\n}\n.form-actions .actions-left {\n  display: flex;\n  flex-direction: column;\n  gap: 0.15rem;\n}\n.form-actions .actions-title {\n  color: var(--btn-primary-text);\n  font-size: 0.9rem;\n  font-weight: 700;\n}\n.form-actions .actions-hint {\n  color: var(--accent-silver);\n  font-size: 0.76rem;\n}\n.form-actions .actions-right {\n  display: flex;\n  gap: 0.6rem;\n  flex-wrap: wrap;\n}\n.btn-cancel {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 40px;\n  padding: 0.55rem 1.15rem;\n  border: 1px solid var(--input-border);\n  border-radius: 9px;\n  background: var(--surface-card);\n  color: var(--text-silver);\n  font-weight: 700;\n  font-size: 0.85rem;\n  cursor: pointer;\n  transition: all 0.18s ease;\n}\n.btn-cancel:hover {\n  background: var(--surface-hover);\n  border-color: var(--border-strong);\n}\n.btn-confirm {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 40px;\n  padding: 0.55rem 1.3rem;\n  border: 0;\n  border-radius: 9px;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-green-dark),\n      var(--accent-green));\n  color: var(--text-on-accent);\n  font-weight: 700;\n  font-size: 0.85rem;\n  cursor: pointer;\n  box-shadow: 0 10px 20px -8px rgba(32, 176, 56, 0.5);\n  transition: transform 0.18s ease, box-shadow 0.18s ease;\n}\n.btn-confirm:hover:not(:disabled) {\n  transform: translateY(-1px);\n  box-shadow: 0 14px 26px -8px rgba(32, 176, 56, 0.55);\n}\n.btn-confirm:disabled {\n  opacity: 0.65;\n  cursor: wait;\n  transform: none;\n}\n.parameters-container .state {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.6rem;\n  padding: 2.5rem;\n  color: var(--text-muted);\n}\n.spinner {\n  width: 18px;\n  height: 18px;\n  border: 2.5px solid var(--input-border);\n  border-top-color: var(--accent-green);\n  border-radius: 50%;\n  animation: spin 0.7s linear infinite;\n  display: inline-block;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.modal-overlay {\n  position: fixed;\n  inset: 0;\n  z-index: 3500;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 1rem;\n  background: rgba(15, 23, 42, 0.5);\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: fadeIn 0.2s ease;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.modal-content {\n  width: 100%;\n  max-width: 440px;\n  max-height: 92vh;\n  overflow-y: auto;\n  border-radius: 18px;\n  background: var(--surface-card);\n  border: 1px solid var(--border-color);\n  padding: 1.6rem 1.7rem 1.4rem;\n  box-shadow: 0 30px 70px -20px rgba(15, 23, 42, 0.4);\n  animation: riseIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);\n}\n@keyframes riseIn {\n  from {\n    opacity: 0;\n    transform: translateY(18px) scale(0.97);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n.confirm-modal {\n  text-align: center;\n}\n.confirm-icon {\n  width: 56px;\n  height: 56px;\n  margin: 0 auto 0.9rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n}\n.confirm-icon.warning {\n  background: rgba(245, 158, 11, 0.14);\n  color: var(--warning);\n}\n.confirm-icon svg {\n  width: 26px;\n  height: 26px;\n  stroke: currentColor;\n  fill: none;\n  stroke-width: 2;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.confirm-modal h3 {\n  margin: 0 0 0.5rem;\n  font-size: 1.15rem;\n  color: var(--text-main);\n}\n.confirm-modal p {\n  margin: 0 0 1.2rem;\n  color: #555555;\n  font-size: 0.92rem;\n  line-height: 1.5;\n}\n.modal-actions {\n  display: flex;\n  gap: 0.75rem;\n  justify-content: center;\n}\n.toast-host {\n  position: fixed;\n  z-index: 4000;\n  right: 1.1rem;\n  bottom: 1.1rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.6rem;\n  max-width: 400px;\n}\n.toast {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  padding: 0.75rem 0.9rem;\n  border-radius: 12px;\n  background: var(--text-main);\n  color: var(--surface-card);\n  font-size: 0.86rem;\n  box-shadow: 0 16px 34px -10px rgba(15, 23, 42, 0.35);\n  animation: toastIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);\n  cursor: pointer;\n}\n@keyframes toastIn {\n  from {\n    opacity: 0;\n    transform: translateY(14px) scale(0.97);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n.toast-success {\n  background:\n    linear-gradient(\n      135deg,\n      #14532d,\n      var(--accent-green-dark));\n}\n.toast-error {\n  background:\n    linear-gradient(\n      135deg,\n      #7f1d1d,\n      var(--danger));\n}\n.toast-info {\n  background: var(--text-main);\n}\n.toast-icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 22px;\n  height: 22px;\n  flex-shrink: 0;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, 0.18);\n  font-size: 0.75rem;\n  font-weight: 800;\n}\n.toast-msg {\n  flex: 1;\n  line-height: 1.35;\n}\n.toast-action {\n  padding: 0.28rem 0.65rem;\n  border-radius: 8px;\n  background: var(--surface-card);\n  color: var(--accent-green-dark);\n  font-size: 0.75rem;\n  font-weight: 800;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  white-space: nowrap;\n}\n.toast-close {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 22px;\n  height: 22px;\n  border: 0;\n  border-radius: 50%;\n  background: transparent;\n  color: rgba(255, 255, 255, 0.75);\n  font-size: 1rem;\n  cursor: pointer;\n}\n.toast-close:hover {\n  background: rgba(255, 255, 255, 0.15);\n  color: var(--surface-card);\n}\n.parameters-container .btn-primary:focus-visible,\n.parameters-container .btn-cancel:focus-visible,\n.parameters-container .btn-confirm:focus-visible,\n.parameters-container .chip:focus-visible,\n.parameters-container .field input:focus-visible,\n.btn-cancel:focus-visible,\n.btn-confirm:focus-visible {\n  outline: 2px solid var(--accent-green);\n  outline-offset: 2px;\n}\n@media (max-width: 1024px) {\n  .stats-grid {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n@media (max-width: 760px) {\n  .parameters-container .page-header {\n    align-items: stretch;\n    flex-direction: column;\n    gap: 0.85rem;\n    min-height: 0;\n  }\n  .parameters-container .btn-primary {\n    justify-content: center;\n    width: 100%;\n  }\n  .parameters-container .toolbar {\n    flex-direction: column;\n    align-items: stretch;\n    padding: 0.8rem;\n  }\n  .parameters-container .results-count {\n    margin-left: 0;\n    justify-content: center;\n  }\n  .rate-row {\n    grid-template-columns: 1fr;\n  }\n  .form-actions {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .form-actions .actions-right {\n    flex-direction: column;\n  }\n  .form-actions .actions-right .btn-cancel,\n  .form-actions .actions-right .btn-confirm {\n    width: 100%;\n  }\n  .residual-row {\n    grid-template-columns: 60px 1fr 54px;\n  }\n}\n.parameters-container > *:not(.toast-host) {\n  position: relative;\n  z-index: 1;\n}\n@media (max-width: 768px) {\n  .parameters-container .chip {\n    padding: 0.55rem 1.05rem;\n  }\n}\n@media (max-width: 480px) {\n  .stats-grid {\n    gap: 0.6rem;\n  }\n  .stat-card {\n    padding: 0.8rem 0.8rem;\n    gap: 0.55rem;\n  }\n  .stat-icon {\n    width: 36px;\n    height: 36px;\n  }\n  .stat-icon svg {\n    width: 20px;\n    height: 20px;\n  }\n  .stat-body strong {\n    font-size: 1.2rem;\n  }\n  .stat-body small {\n    font-size: 0.66rem;\n    letter-spacing: 0.2px;\n  }\n}\n/*# sourceMappingURL=admin-parameters.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminParametersComponent, { className: "AdminParametersComponent", filePath: "src/app/components/admin/admin-parameters/admin-parameters.ts", lineNumber: 15 });
})();
export {
  AdminParametersComponent
};
//# debugId=b28fc7f8-720c-5499-8e55-5a31c92b1cc4
//# sourceMappingURL=chunk-7GMOW3SQ.js.map
