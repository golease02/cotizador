import {
  FinancialCalculatorService,
  QuoteBreakdownComponent,
  QuotesService
} from "./chunk-EIMVJBOK.js";
import {
  CatalogService
} from "./chunk-ZZO2EEQW.js";
import {
  AdminService
} from "./chunk-WRULRPBG.js";
import "./chunk-WDXLETH5.js";
import {
  ToastService
} from "./chunk-74RWLUMR.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-MVJCDSIT.js";
import {
  AuthService
} from "./chunk-XCV63D25.js";
import {
  ChangeDetectorRef,
  CommonModule,
  Component,
  CurrencyPipe,
  DatePipe,
  HostListener,
  NgForOf,
  NgIf,
  getSupabaseClient,
  inject,
  sessionReady,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
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
  ɵɵpureFunction0,
  ɵɵresetView,
  ɵɵresolveDocument,
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
import {
  __spreadValues
} from "./chunk-FDMHZOCR.js";

// src/app/components/admin/admin-quotes/admin-quotes.ts
var _c0 = () => [0, 1, 2, 3, 4, 5];
function AdminQuotesComponent_button_36_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 49);
    \u0275\u0275listener("click", function AdminQuotesComponent_button_36_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.clearSearch());
    });
    \u0275\u0275text(1, "\xD7");
    \u0275\u0275elementEnd();
  }
}
function AdminQuotesComponent_option_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 50);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const v_r3 = ctx.$implicit;
    \u0275\u0275property("value", v_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", v_r3.full_name, " (", v_r3.seller_number, ") ");
  }
}
function AdminQuotesComponent_span_71_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 51);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r1.filteredQuotes().length, " resultado(s)");
  }
}
function AdminQuotesComponent_div_90_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 54);
  }
}
function AdminQuotesComponent_div_90_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 52);
    \u0275\u0275template(1, AdminQuotesComponent_div_90_div_1_Template, 1, 0, "div", 53);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", \u0275\u0275pureFunction0(1, _c0));
  }
}
function AdminQuotesComponent_div_91_button_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 40);
    \u0275\u0275listener("click", function AdminQuotesComponent_div_91_button_11_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.clearFilters());
    });
    \u0275\u0275text(1, "Limpiar filtros");
    \u0275\u0275elementEnd();
  }
}
function AdminQuotesComponent_div_91_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 55)(1, "span", 56);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 57);
    \u0275\u0275element(3, "path", 58)(4, "path", 59)(5, "path", 60)(6, "path", 61);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(7, "strong");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275template(11, AdminQuotesComponent_div_91_button_11_Template, 2, 0, "button", 62);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.quotes().length === 0 ? "A\xFAn no hay cotizaciones registradas" : "Sin resultados");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.quotes().length === 0 ? "Las cotizaciones de tus vendedores aparecer\xE1n aqu\xED." : "Ajusta tu b\xFAsqueda o los filtros.");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.quotes().length > 0);
  }
}
function AdminQuotesComponent_div_92_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 65);
    \u0275\u0275element(1, "div", 66);
    \u0275\u0275elementStart(2, "div", 67)(3, "div", 68)(4, "div", 69)(5, "span", 70);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div")(8, "div", 71);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 72);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(12, "div", 73)(13, "span", 74);
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span", 75);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "div", 76)(19, "div", 77)(20, "span", 78);
    \u0275\u0275text(21, "Vendedor");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "span", 79);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 77)(25, "span", 78);
    \u0275\u0275text(26, "Plazo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "span", 79);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 77)(30, "span", 78);
    \u0275\u0275text(31, "Fecha de creaci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "span", 79);
    \u0275\u0275text(33);
    \u0275\u0275pipe(34, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "div", 77)(36, "span", 78);
    \u0275\u0275text(37, "D\xEDas sin actividad");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "span", 79);
    \u0275\u0275text(39);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(40, "div", 80)(41, "div", 81)(42, "button", 82);
    \u0275\u0275listener("click", function AdminQuotesComponent_div_92_div_1_Template_button_click_42_listener() {
      const q_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleFijar(q_r6));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(43, "svg", 20);
    \u0275\u0275element(44, "path", 83)(45, "path", 84);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(46, "button", 85);
    \u0275\u0275listener("click", function AdminQuotesComponent_div_92_div_1_Template_button_click_46_listener() {
      const q_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.abrirNotas(q_r6));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(47, "svg", 20);
    \u0275\u0275element(48, "path", 86)(49, "path", 87)(50, "path", 88);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(51, "span", 89);
    \u0275\u0275text(52);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "span", 90);
    \u0275\u0275text(54);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(55, "button", 91);
    \u0275\u0275listener("click", function AdminQuotesComponent_div_92_div_1_Template_button_click_55_listener() {
      const q_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.abrirModal(q_r6));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(56, "svg", 20);
    \u0275\u0275element(57, "path", 92)(58, "circle", 93);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const q_r6 = ctx.$implicit;
    const i_r7 = ctx.index;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r1.getColorClase(q_r6));
    \u0275\u0275styleProp("animation-delay", i_r7 * 0.03 + "s");
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.getColorClase(q_r6));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate((q_r6.client_name || "?").charAt(0).toUpperCase());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(q_r6.client_name || "Cliente sin nombre");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", q_r6.brand, " ", q_r6.model);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(15, 26, q_r6.pricenet, "MXN", "symbol", "1.0-0"));
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r1.getColorClase(q_r6));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getEtiqueta(q_r6), " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(q_r6.seller_name || "N/A");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", q_r6.termmonths, " meses");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(34, 31, q_r6.created_at, "dd/MM/yyyy"));
    \u0275\u0275advance(5);
    \u0275\u0275styleProp("color", ctx_r1.getDiasSinActualizar(q_r6) > 7 ? "#dc2626" : ctx_r1.getDiasSinActualizar(q_r6) > 2 ? "#f59e0b" : "#15803d");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getDiasSinActualizar(q_r6), " d\xEDas ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-pinned", q_r6.fijada);
    \u0275\u0275property("title", q_r6.fijada ? "Desfijar cotizaci\xF3n" : "Fijar cotizaci\xF3n");
    \u0275\u0275attribute("aria-label", q_r6.fijada ? "Desfijar cotizaci\xF3n" : "Fijar cotizaci\xF3n");
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(ctx_r1.getNotasCount(q_r6));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getNotasCount(q_r6) === 1 ? "nota" : "notas");
  }
}
function AdminQuotesComponent_div_92_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 63);
    \u0275\u0275template(1, AdminQuotesComponent_div_92_div_1_Template, 59, 34, "div", 64);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.filteredQuotes());
  }
}
function AdminQuotesComponent_div_93_div_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 118);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 20);
    \u0275\u0275element(2, "circle", 28)(3, "line", 119)(4, "line", 120);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.notaError);
  }
}
function AdminQuotesComponent_div_93_div_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 121);
    \u0275\u0275element(1, "span", 122);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Cargando notas...");
    \u0275\u0275elementEnd()();
  }
}
function AdminQuotesComponent_div_93_div_20_article_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article", 126)(1, "p", 127);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 128);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(4, "svg", 20);
    \u0275\u0275element(5, "circle", 129)(6, "path", 130);
    \u0275\u0275elementEnd();
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(9, "div", 131)(10, "button", 132);
    \u0275\u0275listener("click", function AdminQuotesComponent_div_93_div_20_article_1_Template_button_click_10_listener() {
      const n_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.editarNotaQuote(n_r10));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(11, "svg", 20);
    \u0275\u0275element(12, "path", 133)(13, "path", 134);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(14, "button", 135);
    \u0275\u0275listener("click", function AdminQuotesComponent_div_93_div_20_article_1_Template_button_click_14_listener() {
      const n_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.eliminarNotaQuote(n_r10));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(15, "svg", 20);
    \u0275\u0275element(16, "path", 136)(17, "path", 137)(18, "path", 138)(19, "path", 139)(20, "path", 140);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const n_r10 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("nota-editing", ctx_r1.notaEditando?.id === n_r10.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(n_r10.texto);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(8, 4, n_r10.created_at, "dd/MM/yyyy HH:mm"), " ");
  }
}
function AdminQuotesComponent_div_93_div_20_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 141)(1, "span", 142);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 20);
    \u0275\u0275element(3, "path", 58)(4, "path", 59)(5, "path", 143)(6, "path", 144)(7, "path", 145);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "p", 146);
    \u0275\u0275text(9, "Sin notas todav\xEDa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 147);
    \u0275\u0275text(11, "Documenta el seguimiento de esta cotizaci\xF3n agregando la primera nota.");
    \u0275\u0275elementEnd()();
  }
}
function AdminQuotesComponent_div_93_div_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 123);
    \u0275\u0275template(1, AdminQuotesComponent_div_93_div_20_article_1_Template, 21, 7, "article", 124)(2, AdminQuotesComponent_div_93_div_20_div_2_Template, 12, 0, "div", 125);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.notasCotizacion);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.notasCotizacion.length === 0);
  }
}
function AdminQuotesComponent_div_93_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 94);
    \u0275\u0275listener("click", function AdminQuotesComponent_div_93_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrarNotasQuote());
    });
    \u0275\u0275elementStart(1, "div", 95);
    \u0275\u0275listener("click", function AdminQuotesComponent_div_93_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "header", 96)(3, "span", 97);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(4, "svg", 20);
    \u0275\u0275element(5, "path", 86)(6, "path", 87)(7, "path", 88);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "div", 98)(9, "span", 99);
    \u0275\u0275text(10, "Seguimiento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "h3", 100);
    \u0275\u0275text(12, "Notas de Cotizaci\xF3n");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "button", 101);
    \u0275\u0275listener("click", function AdminQuotesComponent_div_93_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrarNotasQuote());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(14, "svg", 20);
    \u0275\u0275element(15, "line", 102)(16, "line", 103);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(17, "div", 104);
    \u0275\u0275template(18, AdminQuotesComponent_div_93_div_18_Template, 7, 1, "div", 105)(19, AdminQuotesComponent_div_93_div_19_Template, 4, 0, "div", 106)(20, AdminQuotesComponent_div_93_div_20_Template, 3, 2, "div", 107);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 108)(22, "label", 109);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "textarea", 110);
    \u0275\u0275twoWayListener("ngModelChange", function AdminQuotesComponent_div_93_Template_textarea_ngModelChange_24_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.notaText, $event) || (ctx_r1.notaText = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(25, "div", 111)(26, "button", 112);
    \u0275\u0275listener("click", function AdminQuotesComponent_div_93_Template_button_click_26_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.notaEditando = null;
      return \u0275\u0275resetView(ctx_r1.notaText = "");
    });
    \u0275\u0275text(27, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "button", 113);
    \u0275\u0275listener("click", function AdminQuotesComponent_div_93_Template_button_click_28_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.guardarNotaQuote());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(29, "svg", 20);
    \u0275\u0275element(30, "path", 114);
    \u0275\u0275elementEnd();
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(32, "div", 115)(33, "span", 116)(34, "span", 117);
    \u0275\u0275text(35);
    \u0275\u0275elementEnd();
    \u0275\u0275text(36);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "button", 112);
    \u0275\u0275listener("click", function AdminQuotesComponent_div_93_Template_button_click_37_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrarNotasQuote());
    });
    \u0275\u0275text(38, "Cerrar");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(18);
    \u0275\u0275property("ngIf", ctx_r1.notaError);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.notaLoading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.notaLoading);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.notaEditando ? "Editar nota" : "Nueva nota");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.notaText);
    \u0275\u0275control();
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", !ctx_r1.notaText.trim() || ctx_r1.notaLoading);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.notaEditando ? "Actualizar" : "Agregar nota", " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.notasCotizacion.length);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.notasCotizacion.length === 1 ? "nota registrada" : "notas registradas", " ");
  }
}
function AdminQuotesComponent_div_94_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 148);
    \u0275\u0275listener("click", function AdminQuotesComponent_div_94_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelarEliminarNota());
    });
    \u0275\u0275elementStart(1, "div", 149);
    \u0275\u0275listener("click", function AdminQuotesComponent_div_94_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 150)(3, "span", 151);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(4, "svg", 20);
    \u0275\u0275element(5, "path", 152)(6, "path", 153)(7, "path", 154);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "div")(9, "span", 155);
    \u0275\u0275text(10, "Confirmaci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "h3");
    \u0275\u0275text(12, "Eliminar nota");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "p");
    \u0275\u0275text(14, " \xBFEst\xE1s seguro de que deseas eliminar esta nota? ");
    \u0275\u0275element(15, "br");
    \u0275\u0275elementStart(16, "span", 156);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(17, "svg", 20);
    \u0275\u0275element(18, "path", 152)(19, "path", 153)(20, "path", 154);
    \u0275\u0275elementEnd();
    \u0275\u0275text(21, " Esta operaci\xF3n no se puede deshacer. ");
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(22, "div", 157)(23, "button", 158);
    \u0275\u0275listener("click", function AdminQuotesComponent_div_94_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelarEliminarNota());
    });
    \u0275\u0275text(24, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "button", 159);
    \u0275\u0275listener("click", function AdminQuotesComponent_div_94_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.confirmarEliminarNota());
    });
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(25);
    \u0275\u0275property("disabled", ctx_r1.notaLoading);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.notaLoading ? "Eliminando..." : "Eliminar", " ");
  }
}
function AdminQuotesComponent_div_95_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 148);
    \u0275\u0275listener("click", function AdminQuotesComponent_div_95_Template_div_click_0_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrarModalFondo($event));
    });
    \u0275\u0275elementStart(1, "div", 160);
    \u0275\u0275listener("click", function AdminQuotesComponent_div_95_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "button", 161);
    \u0275\u0275listener("click", function AdminQuotesComponent_div_95_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrarModal());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 162);
    \u0275\u0275element(4, "line", 102)(5, "line", 103);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "div", 163)(7, "app-quote-breakdown", 164);
    \u0275\u0275listener("saveQuote", function AdminQuotesComponent_div_95_Template_app_quote_breakdown_saveQuote_7_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrarModal());
    });
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275property("calculation", ctx_r1.selectedQuote())("mostrarGuardar", false);
  }
}
function AdminQuotesComponent_div_97_span_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 170);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r14 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r14.actionLabel);
  }
}
function AdminQuotesComponent_div_97_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 165);
    \u0275\u0275listener("click", function AdminQuotesComponent_div_97_Template_div_click_0_listener() {
      const t_r14 = \u0275\u0275restoreView(_r13).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.handleToast(t_r14));
    });
    \u0275\u0275elementStart(1, "span", 166);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 167);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, AdminQuotesComponent_div_97_span_5_Template, 2, 1, "span", 168);
    \u0275\u0275elementStart(6, "button", 169);
    \u0275\u0275listener("click", function AdminQuotesComponent_div_97_Template_button_click_6_listener($event) {
      const t_r14 = \u0275\u0275restoreView(_r13).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.toastService.dismiss(t_r14.id);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275text(7, "\xD7");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r14 = ctx.$implicit;
    \u0275\u0275classMap("toast-" + t_r14.type);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r14.type === "success" ? "\u2713" : t_r14.type === "error" ? "\u2715" : "\u2139");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r14.message);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", t_r14.actionLabel);
  }
}
var AdminQuotesComponent = class _AdminQuotesComponent {
  quotesService = inject(QuotesService);
  admin = inject(AdminService);
  auth = inject(AuthService);
  client = getSupabaseClient();
  calculator = inject(FinancialCalculatorService);
  catalog = inject(CatalogService);
  cdr = inject(ChangeDetectorRef);
  toastService = inject(ToastService);
  // Listado
  quotes = signal(
    [],
    ...ngDevMode ? [{ debugName: "quotes" }] : (
      /* istanbul ignore next */
      []
    )
  );
  filteredQuotes = signal(
    [],
    ...ngDevMode ? [{ debugName: "filteredQuotes" }] : (
      /* istanbul ignore next */
      []
    )
  );
  loading = true;
  // Filtros
  searchTerm = "";
  filtroVendedor = "todos";
  filtroPeriodo = "todos";
  filtroFechaInicio = "";
  filtroFechaFin = "";
  filtroPrecioMin = null;
  filtroPrecioMax = null;
  filtroColor = "todos";
  // Vendedores
  vendedores = [];
  // Modal de cotización
  showModal = false;
  selectedQuote = signal(
    null,
    ...ngDevMode ? [{ debugName: "selectedQuote" }] : (
      /* istanbul ignore next */
      []
    )
  );
  // Notas
  showNotasModal = false;
  notasCotizacion = [];
  notaText = "";
  notaEditando = null;
  notaLoading = false;
  notaError = "";
  selectedQuoteId = null;
  showNotaConfirmModal = false;
  notaToDelete = null;
  async ngOnInit() {
    await Promise.all([
      this.loadQuotes(),
      this.loadVendedores(),
      this.catalog.loadStatePlates(),
      this.catalog.loadCalculatorConfig()
    ]);
  }
  onEscapeKey() {
    if (this.showNotaConfirmModal)
      this.cancelarEliminarNota();
    if (this.showNotasModal)
      this.cerrarNotasQuote();
    if (this.showModal)
      this.cerrarModal();
  }
  handleToast(t) {
    if (t.action)
      t.action();
    this.toastService.dismiss(t.id);
  }
  // ===================== LISTADO =====================
  async loadQuotes() {
    this.loading = true;
    const { data, error } = await this.quotesService.getAllQuotesWithSeller();
    if (!error) {
      await sessionReady();
      const quoteIds = (data || []).map((q) => q.id);
      const conteoNotas = /* @__PURE__ */ new Map();
      const { data: notasData, error: notasError } = await this.client.from("notas").select("entidad_id").eq("entidad_tipo", "quote");
      if (notasError || !Array.isArray(notasData) || (notasData || []).length === 0) {
        console.warn("No se pudo contar las notas:", notasError);
        for (let i = 0; i < quoteIds.length; i += 100) {
          const chunk = quoteIds.slice(i, i + 100);
          const { data: chunkData, error: chunkError } = await this.client.from("notas").select("entidad_id").eq("entidad_tipo", "quote").in("entidad_id", chunk);
          if (!chunkError) {
            for (const n of chunkData || []) {
              conteoNotas.set(String(n.entidad_id), (conteoNotas.get(String(n.entidad_id)) || 0) + 1);
            }
          } else {
            console.warn("Fallback por lote fall:", chunkError);
          }
        }
      } else {
        for (const n of notasData || []) {
          conteoNotas.set(String(n.entidad_id), (conteoNotas.get(String(n.entidad_id)) || 0) + 1);
        }
      }
      for (const q of data || []) {
        q.notas_count = conteoNotas.get(String(q.id)) || 0;
      }
      const idsPorColor = /* @__PURE__ */ new Map();
      for (const q of data) {
        const dias = this.getDiasSinActualizar(q);
        let colorCalculado = "reciente";
        if (this.isQuoteReviewed(q)) {
          colorCalculado = "verde";
        } else {
          if (dias > 7)
            colorCalculado = "rojo";
          else if (dias > 2)
            colorCalculado = "amarillo";
          else
            colorCalculado = "reciente";
        }
        if (q.color !== colorCalculado) {
          q.color = colorCalculado;
          if (!idsPorColor.has(colorCalculado))
            idsPorColor.set(colorCalculado, []);
          idsPorColor.get(colorCalculado).push(q.id);
        }
      }
      for (const [color, ids] of idsPorColor) {
        await this.client.from("quotes").update({ color }).in("id", ids);
      }
      this.quotes.set(data || []);
      this.applyFilters();
    } else {
      this.toastService.error("No se pudieron cargar las cotizaciones");
    }
    this.loading = false;
    this.cdr.detectChanges();
  }
  async loadVendedores() {
    const { data, error } = await this.admin.getSellersWithQuoteCount();
    if (!error && data) {
      this.vendedores = data.map((v) => ({
        id: v.id,
        full_name: v.full_name,
        seller_number: v.seller_number || "Sin n\xFAmero"
      }));
    }
  }
  applyFilters() {
    let filtered = this.quotes();
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim();
      filtered = filtered.filter((q) => (q.client_name || "").toLowerCase().includes(term) || (q.brand || "").toLowerCase().includes(term) || (q.model || "").toLowerCase().includes(term) || (q.seller_name || "").toLowerCase().includes(term));
    }
    if (this.filtroVendedor !== "todos") {
      filtered = filtered.filter((q) => q.seller_id === this.filtroVendedor);
    }
    if (this.filtroPeriodo !== "todos") {
      const ahora = /* @__PURE__ */ new Date();
      const limite = /* @__PURE__ */ new Date();
      if (this.filtroPeriodo === "7dias")
        limite.setDate(ahora.getDate() - 7);
      else if (this.filtroPeriodo === "30dias")
        limite.setDate(ahora.getDate() - 30);
      else if (this.filtroPeriodo === "90dias")
        limite.setDate(ahora.getDate() - 90);
      filtered = filtered.filter((q) => new Date(q.created_at) >= limite);
    }
    if (this.filtroFechaInicio) {
      const inicio = new Date(this.filtroFechaInicio);
      inicio.setHours(0, 0, 0);
      filtered = filtered.filter((q) => new Date(q.created_at) >= inicio);
    }
    if (this.filtroFechaFin) {
      const fin = new Date(this.filtroFechaFin);
      fin.setHours(23, 59, 59);
      filtered = filtered.filter((q) => new Date(q.created_at) <= fin);
    }
    if (this.filtroPrecioMin !== null && this.filtroPrecioMin > 0) {
      filtered = filtered.filter((q) => q.pricenet >= this.filtroPrecioMin);
    }
    if (this.filtroPrecioMax !== null && this.filtroPrecioMax > 0) {
      filtered = filtered.filter((q) => q.pricenet <= this.filtroPrecioMax);
    }
    if (this.filtroColor !== "todos") {
      filtered = filtered.filter((q) => q.color === this.filtroColor);
    }
    filtered.sort((a, b) => {
      if (a.fijada && !b.fijada)
        return -1;
      if (!a.fijada && b.fijada)
        return 1;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
    this.filteredQuotes.set(filtered);
    this.cdr.detectChanges();
  }
  setStatusFilter(color) {
    this.filtroColor = color;
    this.applyFilters();
  }
  clearSearch() {
    this.searchTerm = "";
    this.applyFilters();
  }
  clearFilters() {
    this.searchTerm = "";
    this.filtroVendedor = "todos";
    this.filtroPeriodo = "todos";
    this.filtroFechaInicio = "";
    this.filtroFechaFin = "";
    this.filtroPrecioMin = null;
    this.filtroPrecioMax = null;
    this.filtroColor = "todos";
    this.applyFilters();
  }
  patchQuote(id, patch) {
    this.quotes.update((list) => list.map((q) => q.id === id ? __spreadValues(__spreadValues({}, q), patch) : q));
    this.applyFilters();
  }
  // ===================== NOTAS =====================
  async abrirNotas(quote) {
    await this.marcarComoRevisado(quote.id);
    this.selectedQuoteId = quote.id;
    this.showNotasModal = true;
    this.notaText = "";
    this.notaEditando = null;
    this.notaError = "";
    await this.cargarNotasQuote(quote.id);
  }
  async cargarNotasQuote(quoteId) {
    this.notaLoading = true;
    try {
      const { data, error } = await this.client.from("notas").select("*").eq("entidad_tipo", "quote").eq("entidad_id", quoteId).order("created_at", { ascending: false });
      if (error) {
        this.notaError = "Error al cargar notas: " + (error.message || "desconocido");
      } else {
        this.notasCotizacion = data || [];
        this.notaError = "";
      }
    } catch (err) {
      this.notaError = "Error al cargar notas: " + (err.message || "desconocido");
    }
    this.notaLoading = false;
    this.cdr.detectChanges();
  }
  async guardarNotaQuote() {
    if (!this.notaText.trim())
      return;
    this.notaLoading = true;
    this.notaError = "";
    const user = this.auth.currentUser();
    const payload = {
      entidad_tipo: "quote",
      entidad_id: this.selectedQuoteId,
      texto: this.notaText.trim(),
      creado_por: user?.id || null,
      created_at: (/* @__PURE__ */ new Date()).toISOString()
    };
    let error = null;
    if (this.notaEditando) {
      const { error: updateError } = await this.client.from("notas").update({ texto: this.notaText.trim() }).eq("id", this.notaEditando.id);
      error = updateError;
    } else {
      const { error: insertError } = await this.client.from("notas").insert([payload]);
      error = insertError;
    }
    if (error) {
      this.notaError = "Error al guardar nota";
      this.toastService.error("No se pudo guardar la nota");
    } else {
      const eraEdicion = !!this.notaEditando;
      this.notaText = "";
      this.notaEditando = null;
      await this.cargarNotasQuote(this.selectedQuoteId);
      this.actualizarConteoNotas(this.selectedQuoteId, this.notasCotizacion.length);
      this.toastService.success(eraEdicion ? "Nota actualizada correctamente" : "Nota agregada correctamente");
    }
    this.notaLoading = false;
    this.cdr.detectChanges();
  }
  editarNotaQuote(nota) {
    this.notaEditando = nota;
    this.notaText = nota.texto;
  }
  eliminarNotaQuote(nota) {
    this.notaToDelete = nota;
    this.showNotaConfirmModal = true;
    this.cdr.detectChanges();
  }
  async confirmarEliminarNota() {
    if (!this.notaToDelete)
      return;
    this.notaLoading = true;
    this.showNotaConfirmModal = false;
    const { error } = await this.client.from("notas").delete().eq("id", this.notaToDelete.id);
    if (error) {
      this.notaError = "Error al eliminar nota";
      this.toastService.error("No se pudo eliminar la nota");
    } else {
      await this.cargarNotasQuote(this.selectedQuoteId);
      this.actualizarConteoNotas(this.selectedQuoteId, this.notasCotizacion.length);
      this.toastService.success("Nota eliminada correctamente");
    }
    this.notaLoading = false;
    this.notaToDelete = null;
    this.cdr.detectChanges();
  }
  cancelarEliminarNota() {
    this.showNotaConfirmModal = false;
    this.notaToDelete = null;
    this.cdr.detectChanges();
  }
  cerrarNotasQuote() {
    this.showNotaConfirmModal = false;
    this.notaToDelete = null;
    this.showNotasModal = false;
    this.notasCotizacion = [];
    this.notaText = "";
    this.notaEditando = null;
    this.notaError = "";
    this.selectedQuoteId = null;
  }
  getNotasCount(q) {
    return q.notas_count || 0;
  }
  actualizarConteoNotas(quoteId, count) {
    this.patchQuote(quoteId, { notas_count: count });
  }
  // ===================== COLOR Y SEGUIMIENTO =====================
  async marcarComoRevisado(quoteId) {
    const { error } = await this.client.from("quotes").update({
      revisada: true,
      color: "verde"
    }).eq("id", quoteId);
    if (error)
      return;
    const updatedQuotes = this.quotes().map((q) => {
      if (q.id === quoteId) {
        q.revisada = true;
        q.color = "verde";
      }
      return q;
    });
    this.quotes.set(updatedQuotes);
    this.applyFilters();
  }
  getDiasSinActualizar(quote) {
    const fecha = new Date(quote.created_at);
    const ahora = /* @__PURE__ */ new Date();
    const diff = Math.floor((ahora.getTime() - fecha.getTime()) / (1e3 * 60 * 60 * 24));
    return diff;
  }
  isQuoteReviewed(quote) {
    return quote.revisada === true || quote.revisada === "true" || quote.revisada === 1;
  }
  getColorClase(quote) {
    const color = quote.color || "reciente";
    return `color-${color}`;
  }
  countQuotesByColor(color) {
    return this.filteredQuotes().filter((quote) => (quote.color || "reciente") === color).length;
  }
  getEtiqueta(quote) {
    const labels = {
      reciente: "Reciente",
      verde: "Revisada",
      amarillo: "Pendiente",
      rojo: "Urgente"
    };
    return labels[quote.color] || "Reciente";
  }
  // ===================== FIJAR COTIZACIÓN =====================
  async toggleFijar(quote) {
    const nuevoEstado = !quote.fijada;
    this.patchQuote(quote.id, { fijada: nuevoEstado });
    const { error } = await this.client.from("quotes").update({ fijada: nuevoEstado }).eq("id", quote.id);
    if (error) {
      this.patchQuote(quote.id, { fijada: !nuevoEstado });
      this.toastService.error("Error al fijar la cotizaci\xF3n: " + error.message);
      return;
    }
    this.toastService.undo(nuevoEstado ? "Cotizaci\xF3n fijada" : "Cotizaci\xF3n desfijada", () => {
      this.patchQuote(quote.id, { fijada: !nuevoEstado });
      this.client.from("quotes").update({ fijada: !nuevoEstado }).eq("id", quote.id);
    });
  }
  // ===================== MODAL DE COTIZACIÓN =====================
  async abrirModal(quote) {
    const snapshot = await this.quotesService.getQuoteCalculation(quote.id);
    if (snapshot) {
      this.selectedQuote.set(snapshot);
      this.showModal = true;
      document.body.style.overflow = "hidden";
      await this.marcarComoRevisado(quote.id);
      return;
    }
    const input = {
      clientName: quote.client_name || "",
      brand: quote.brand,
      model: quote.model,
      year: quote.year,
      priceNet: quote.pricenet,
      isHybridOrElectric: quote.ishybridorelectric || false,
      termMonths: quote.termmonths || 48,
      extraordinaryRentPct: quote.extraordinaryrentpct || 0.1,
      securityDepositPct: quote.securitydepositpct || 0,
      selectedStatePlateId: quote.selectedstateplateid || "pendiente",
      isInsuranceEstimated: quote.isinsuranceestimated || false
    };
    const result = this.calculator.calculateQuote(input);
    this.selectedQuote.set(result);
    this.showModal = true;
    document.body.style.overflow = "hidden";
    await this.marcarComoRevisado(quote.id);
  }
  cerrarModal() {
    this.showModal = false;
    this.selectedQuote.set(null);
    document.body.style.overflow = "";
  }
  cerrarModalFondo(event) {
    if (event.target === event.currentTarget)
      this.cerrarModal();
  }
  static \u0275fac = function AdminQuotesComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminQuotesComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminQuotesComponent, selectors: [["app-admin-quotes"]], hostBindings: function AdminQuotesComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("keydown.escape", function AdminQuotesComponent_keydown_escape_HostBindingHandler() {
        return ctx.onEscapeKey();
      }, \u0275\u0275resolveDocument);
    }
  }, decls: 98, vars: 32, consts: [[1, "quotes-panel"], [1, "page-header"], [1, "page-heading"], [1, "page-kicker"], [1, "quote-summary"], [1, "badge", "badge-total"], [1, "badge", "badge-recent"], [1, "badge", "badge-reviewed"], [1, "badge", "badge-pending"], [1, "badge", "badge-urgent"], [1, "toolbar"], [1, "search-wrapper"], ["viewBox", "0 0 24 24", "aria-hidden", "true", 1, "search-icon"], ["cx", "11", "cy", "11", "r", "8"], ["x1", "21", "y1", "21", "x2", "16.65", "y2", "16.65"], ["type", "text", "placeholder", "Buscar por cliente, veh\xEDculo o vendedor...", 1, "search-input", 3, "ngModelChange", "input", "ngModel"], ["type", "button", "class", "search-clear", "aria-label", "Limpiar b\xFAsqueda", 3, "click", 4, "ngIf"], ["role", "group", "aria-label", "Filtrar por estado", 1, "chip-group"], ["type", "button", 1, "chip", 3, "click"], [1, "toolbar-select"], ["viewBox", "0 0 24 24", "aria-hidden", "true"], ["d", "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"], ["cx", "9", "cy", "7", "r", "4"], ["d", "M23 21v-2a4 4 0 0 0-3-3.87"], ["d", "M16 3.13a4 4 0 0 1 0 7.75"], [3, "ngModelChange", "change", "ngModel"], ["value", "todos"], [3, "value", 4, "ngFor", "ngForOf"], ["cx", "12", "cy", "12", "r", "10"], ["d", "M12 6v6l4 2"], ["value", "7dias"], ["value", "30dias"], ["value", "90dias"], ["class", "results-count", 4, "ngIf"], [1, "filters-row", "row-2"], [1, "filter-group", "date-range"], ["type", "date", 1, "filter-input", 3, "ngModelChange", "change", "ngModel"], [1, "filter-group", "price-range"], ["type", "number", "placeholder", "$0", 1, "filter-input", 3, "ngModelChange", "input", "ngModel"], ["type", "number", "placeholder", "$\u221E", 1, "filter-input", 3, "ngModelChange", "input", "ngModel"], ["type", "button", 1, "btn-secondary", 3, "click"], [1, "quotes-list"], ["class", "skeleton-grid", "aria-label", "Cargando cotizaciones", 4, "ngIf"], ["class", "catalog-state empty-state", 4, "ngIf"], ["class", "cards-grid", 4, "ngIf"], ["class", "modal-overlay notas-overlay", 3, "click", 4, "ngIf"], ["class", "modal-overlay", 3, "click", 4, "ngIf"], [1, "toast-host"], ["class", "toast", 3, "class", "click", 4, "ngFor", "ngForOf"], ["type", "button", "aria-label", "Limpiar b\xFAsqueda", 1, "search-clear", 3, "click"], [3, "value"], [1, "results-count"], ["aria-label", "Cargando cotizaciones", 1, "skeleton-grid"], ["class", "skeleton-card", 4, "ngFor", "ngForOf"], [1, "skeleton-card"], [1, "catalog-state", "empty-state"], ["aria-hidden", "true", 1, "empty-state-icon"], ["viewBox", "0 0 24 24"], ["d", "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"], ["d", "M14 2v6h6"], ["d", "M9 13h6"], ["d", "M9 17h4"], ["type", "button", "class", "btn-secondary", 3, "click", 4, "ngIf"], [1, "cards-grid"], ["class", "quote-card", 3, "class", "animation-delay", 4, "ngFor", "ngForOf"], [1, "quote-card"], [1, "card-color-indicator"], [1, "card-body-grid"], [1, "card-left"], [1, "client-info"], [1, "client-avatar"], [1, "client-name"], [1, "vehicle-name"], [1, "card-right"], [1, "price-tag"], [1, "status-badge"], [1, "card-details"], [1, "detail-item"], [1, "detail-label"], [1, "detail-value"], [1, "card-footer"], [1, "action-buttons"], ["type", "button", 1, "btn-icon", "btn-fijar", 3, "click", "title"], ["d", "M12 17v5"], ["d", "M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16h14v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1z"], ["type", "button", "title", "Ver notas", "aria-label", "Ver notas de la cotizaci\xF3n", 1, "notas-counter", 3, "click"], ["d", "M4 4h16v13H7l-3 3Z"], ["d", "M8 8h8"], ["d", "M8 12h6"], [1, "notas-counter-num"], [1, "notas-counter-label"], ["type", "button", "title", "Ver detalle", "aria-label", "Ver detalle de la cotizaci\xF3n", 1, "btn-icon", "btn-view", 3, "click"], ["d", "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"], ["cx", "12", "cy", "12", "r", "3"], [1, "modal-overlay", "notas-overlay", 3, "click"], ["role", "dialog", "aria-modal", "true", "aria-label", "Notas de cotizaci\xF3n", 1, "notas-modal", 3, "click"], [1, "notas-header"], [1, "notas-icon"], [1, "notas-titles"], [1, "notas-eyebrow"], [1, "notas-title"], ["type", "button", "title", "Cerrar", "aria-label", "Cerrar", 1, "notas-close", 3, "click"], ["x1", "18", "y1", "6", "x2", "6", "y2", "18"], ["x1", "6", "y1", "6", "x2", "18", "y2", "18"], [1, "notas-body"], ["class", "notas-alert", 4, "ngIf"], ["class", "notas-loading", 4, "ngIf"], ["class", "notas-list", 4, "ngIf"], [1, "notas-editor"], ["for", "nota-cotizacion-textarea", 1, "notas-editor-label"], ["id", "nota-cotizacion-textarea", "rows", "3", "placeholder", "Escribe una nota para esta cotizaci\xF3n...", 1, "nota-textarea", 3, "ngModelChange", "ngModel"], [1, "notas-editor-actions"], ["type", "button", 1, "notas-btn-ghost", 3, "click"], ["type", "button", 1, "notas-btn-primary", 3, "click", "disabled"], ["d", "M20 6 9 17l-5-5"], [1, "notas-footer"], [1, "notas-count"], [1, "notas-count-badge"], [1, "notas-alert"], ["x1", "12", "y1", "8", "x2", "12", "y2", "12"], ["x1", "12", "y1", "16", "x2", "12.01", "y2", "16"], [1, "notas-loading"], [1, "notas-spinner"], [1, "notas-list"], ["class", "nota-item", 3, "nota-editing", 4, "ngFor", "ngForOf"], ["class", "notas-empty", 4, "ngIf"], [1, "nota-item"], [1, "nota-texto"], [1, "nota-fecha"], ["cx", "12", "cy", "12", "r", "9"], ["d", "M12 7v5l3 2"], [1, "nota-acciones"], ["type", "button", "title", "Editar nota", "aria-label", "Editar nota", 1, "btn-icon", "btn-edit", 3, "click"], ["d", "M12 20h9"], ["d", "M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"], ["type", "button", "title", "Eliminar nota", "aria-label", "Eliminar nota", 1, "btn-icon", "btn-delete", 3, "click"], ["d", "M3 6h18"], ["d", "M8 6V4h8v2"], ["d", "M19 6l-1 14H6L5 6"], ["d", "M10 11v5"], ["d", "M14 11v5"], [1, "notas-empty"], [1, "notas-empty-icon"], ["d", "M16 13H8"], ["d", "M16 17H8"], ["d", "M10 9H8"], [1, "notas-empty-title"], [1, "notas-empty-sub"], [1, "modal-overlay", 3, "click"], [1, "modal-content", 3, "click"], [1, "modal-heading", "modal-heading-warning"], [1, "modal-icon"], ["d", "M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"], ["d", "M12 9v4"], ["d", "M12 17h.01"], [1, "modal-eyebrow"], [1, "warning-copy"], [1, "modal-actions"], [1, "btn-cancel", 3, "click"], [1, "btn-confirm", 3, "click", "disabled"], [1, "modal-container", 3, "click"], ["title", "Cerrar", 1, "modal-close", 3, "click"], ["width", "24", "height", "24", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], [1, "modal-body"], [3, "saveQuote", "calculation", "mostrarGuardar"], [1, "toast", 3, "click"], [1, "toast-icon"], [1, "toast-msg"], ["class", "toast-action", 4, "ngIf"], ["aria-label", "Cerrar", 1, "toast-close", 3, "click"], [1, "toast-action"]], template: function AdminQuotesComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "span", 3);
      \u0275\u0275text(4, "Control comercial");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "h2");
      \u0275\u0275text(6, "Todas las Cotizaciones");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "p");
      \u0275\u0275text(8, "Da seguimiento al estado, precios y actividad de cada cotizaci\xF3n.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "div", 4)(10, "span", 5)(11, "strong");
      \u0275\u0275text(12);
      \u0275\u0275elementEnd();
      \u0275\u0275text(13, " registros");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "span", 6)(15, "strong");
      \u0275\u0275text(16);
      \u0275\u0275elementEnd();
      \u0275\u0275text(17, " recientes");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "span", 7)(19, "strong");
      \u0275\u0275text(20);
      \u0275\u0275elementEnd();
      \u0275\u0275text(21, " revisadas");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "span", 8)(23, "strong");
      \u0275\u0275text(24);
      \u0275\u0275elementEnd();
      \u0275\u0275text(25, " pendientes");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "span", 9)(27, "strong");
      \u0275\u0275text(28);
      \u0275\u0275elementEnd();
      \u0275\u0275text(29, " urgentes");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(30, "div", 10)(31, "div", 11);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(32, "svg", 12);
      \u0275\u0275element(33, "circle", 13)(34, "line", 14);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(35, "input", 15);
      \u0275\u0275twoWayListener("ngModelChange", function AdminQuotesComponent_Template_input_ngModelChange_35_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
        return $event;
      });
      \u0275\u0275listener("input", function AdminQuotesComponent_Template_input_input_35_listener() {
        return ctx.applyFilters();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275template(36, AdminQuotesComponent_button_36_Template, 2, 0, "button", 16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "div", 17)(38, "button", 18);
      \u0275\u0275listener("click", function AdminQuotesComponent_Template_button_click_38_listener() {
        return ctx.setStatusFilter("todos");
      });
      \u0275\u0275text(39, "Todos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "button", 18);
      \u0275\u0275listener("click", function AdminQuotesComponent_Template_button_click_40_listener() {
        return ctx.setStatusFilter("reciente");
      });
      \u0275\u0275text(41, "Recientes");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "button", 18);
      \u0275\u0275listener("click", function AdminQuotesComponent_Template_button_click_42_listener() {
        return ctx.setStatusFilter("verde");
      });
      \u0275\u0275text(43, "Revisadas");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "button", 18);
      \u0275\u0275listener("click", function AdminQuotesComponent_Template_button_click_44_listener() {
        return ctx.setStatusFilter("amarillo");
      });
      \u0275\u0275text(45, "Pendientes");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "button", 18);
      \u0275\u0275listener("click", function AdminQuotesComponent_Template_button_click_46_listener() {
        return ctx.setStatusFilter("rojo");
      });
      \u0275\u0275text(47, "Urgentes");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(48, "label", 19);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(49, "svg", 20);
      \u0275\u0275element(50, "path", 21)(51, "circle", 22)(52, "path", 23)(53, "path", 24);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(54, "select", 25);
      \u0275\u0275twoWayListener("ngModelChange", function AdminQuotesComponent_Template_select_ngModelChange_54_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.filtroVendedor, $event) || (ctx.filtroVendedor = $event);
        return $event;
      });
      \u0275\u0275listener("change", function AdminQuotesComponent_Template_select_change_54_listener() {
        return ctx.applyFilters();
      });
      \u0275\u0275elementStart(55, "option", 26);
      \u0275\u0275text(56, "Todos los vendedores");
      \u0275\u0275elementEnd();
      \u0275\u0275template(57, AdminQuotesComponent_option_57_Template, 2, 3, "option", 27);
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(58, "label", 19);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(59, "svg", 20);
      \u0275\u0275element(60, "circle", 28)(61, "path", 29);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(62, "select", 25);
      \u0275\u0275twoWayListener("ngModelChange", function AdminQuotesComponent_Template_select_ngModelChange_62_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.filtroPeriodo, $event) || (ctx.filtroPeriodo = $event);
        return $event;
      });
      \u0275\u0275listener("change", function AdminQuotesComponent_Template_select_change_62_listener() {
        return ctx.applyFilters();
      });
      \u0275\u0275elementStart(63, "option", 26);
      \u0275\u0275text(64, "Todo el tiempo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(65, "option", 30);
      \u0275\u0275text(66, "\xDAltimos 7 d\xEDas");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(67, "option", 31);
      \u0275\u0275text(68, "\xDAltimos 30 d\xEDas");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(69, "option", 32);
      \u0275\u0275text(70, "\xDAltimos 90 d\xEDas");
      \u0275\u0275elementEnd()();
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275template(71, AdminQuotesComponent_span_71_Template, 2, 1, "span", 33);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(72, "div", 34)(73, "div", 35)(74, "label");
      \u0275\u0275text(75, "Desde");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(76, "input", 36);
      \u0275\u0275twoWayListener("ngModelChange", function AdminQuotesComponent_Template_input_ngModelChange_76_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.filtroFechaInicio, $event) || (ctx.filtroFechaInicio = $event);
        return $event;
      });
      \u0275\u0275listener("change", function AdminQuotesComponent_Template_input_change_76_listener() {
        return ctx.applyFilters();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275elementStart(77, "label");
      \u0275\u0275text(78, "Hasta");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(79, "input", 36);
      \u0275\u0275twoWayListener("ngModelChange", function AdminQuotesComponent_Template_input_ngModelChange_79_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.filtroFechaFin, $event) || (ctx.filtroFechaFin = $event);
        return $event;
      });
      \u0275\u0275listener("change", function AdminQuotesComponent_Template_input_change_79_listener() {
        return ctx.applyFilters();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(80, "div", 37)(81, "label");
      \u0275\u0275text(82, "Precio m\xEDnimo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(83, "input", 38);
      \u0275\u0275twoWayListener("ngModelChange", function AdminQuotesComponent_Template_input_ngModelChange_83_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.filtroPrecioMin, $event) || (ctx.filtroPrecioMin = $event);
        return $event;
      });
      \u0275\u0275listener("input", function AdminQuotesComponent_Template_input_input_83_listener() {
        return ctx.applyFilters();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275elementStart(84, "label");
      \u0275\u0275text(85, "Precio m\xE1ximo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(86, "input", 39);
      \u0275\u0275twoWayListener("ngModelChange", function AdminQuotesComponent_Template_input_ngModelChange_86_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.filtroPrecioMax, $event) || (ctx.filtroPrecioMax = $event);
        return $event;
      });
      \u0275\u0275listener("input", function AdminQuotesComponent_Template_input_input_86_listener() {
        return ctx.applyFilters();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(87, "button", 40);
      \u0275\u0275listener("click", function AdminQuotesComponent_Template_button_click_87_listener() {
        return ctx.clearFilters();
      });
      \u0275\u0275text(88, "Limpiar filtros");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(89, "div", 41);
      \u0275\u0275template(90, AdminQuotesComponent_div_90_Template, 2, 2, "div", 42)(91, AdminQuotesComponent_div_91_Template, 12, 3, "div", 43)(92, AdminQuotesComponent_div_92_Template, 2, 1, "div", 44);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(93, AdminQuotesComponent_div_93_Template, 39, 9, "div", 45)(94, AdminQuotesComponent_div_94_Template, 27, 2, "div", 46)(95, AdminQuotesComponent_div_95_Template, 8, 2, "div", 46);
      \u0275\u0275elementStart(96, "div", 47);
      \u0275\u0275template(97, AdminQuotesComponent_div_97_Template, 8, 5, "div", 48);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(12);
      \u0275\u0275textInterpolate(ctx.filteredQuotes().length);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.countQuotesByColor("reciente"));
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.countQuotesByColor("verde"));
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.countQuotesByColor("amarillo"));
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.countQuotesByColor("rojo"));
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchTerm);
      \u0275\u0275control();
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.searchTerm);
      \u0275\u0275advance(2);
      \u0275\u0275classProp("is-active", ctx.filtroColor === "todos");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("is-active", ctx.filtroColor === "reciente");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("is-active", ctx.filtroColor === "verde");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("is-active", ctx.filtroColor === "amarillo");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("is-active", ctx.filtroColor === "rojo");
      \u0275\u0275advance(8);
      \u0275\u0275twoWayProperty("ngModel", ctx.filtroVendedor);
      \u0275\u0275control();
      \u0275\u0275advance(3);
      \u0275\u0275property("ngForOf", ctx.vendedores);
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.filtroPeriodo);
      \u0275\u0275control();
      \u0275\u0275advance(9);
      \u0275\u0275property("ngIf", !ctx.loading);
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.filtroFechaInicio);
      \u0275\u0275control();
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.filtroFechaFin);
      \u0275\u0275control();
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.filtroPrecioMin);
      \u0275\u0275control();
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.filtroPrecioMax);
      \u0275\u0275control();
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && ctx.filteredQuotes().length === 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && ctx.filteredQuotes().length > 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showNotasModal);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showNotaConfirmModal);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showModal);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", ctx.toastService.toasts());
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, QuoteBreakdownComponent, CurrencyPipe, DatePipe], styles: ['\n.quotes-panel[_ngcontent-%COMP%] {\n  position: relative;\n  max-width: 1400px;\n  margin: 0 auto;\n  padding: 0;\n  overflow: hidden;\n}\n.quotes-panel[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 38%;\n  height: 190px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(32, 176, 56, 0.14),\n      rgba(16, 37, 31, 0.07));\n  clip-path: polygon(35% 0, 100% 0, 100% 100%, 0 100%);\n  pointer-events: none;\n}\n.quotes-panel[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-end;\n  min-height: 152px;\n  margin: 0 0 1.15rem;\n  padding: 1.5rem 1.75rem;\n  border: 1px solid rgba(139, 226, 140, 0.22);\n  border-radius: 16px;\n  background:\n    linear-gradient(\n      115deg,\n      #10251f 0%,\n      #173c2e 68%,\n      #1f6840 100%);\n  box-shadow: 0 16px 30px rgba(16, 37, 31, 0.16);\n}\n.quotes-panel[_ngcontent-%COMP%]   .page-heading[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 0.3rem;\n}\n.quotes-panel[_ngcontent-%COMP%]   .page-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--%NS%text-on-accent);\n  font-size: 2rem;\n  line-height: 1;\n}\n.quotes-panel[_ngcontent-%COMP%]   .page-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  max-width: 520px;\n  margin: 0;\n  color: #bdd6c7;\n  font-size: 0.88rem;\n}\n.page-kicker[_ngcontent-%COMP%] {\n  color: #8be28c;\n  font-size: 0.68rem;\n  font-weight: 700;\n  letter-spacing: 1.2px;\n  text-transform: uppercase;\n}\n.quotes-panel[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%] {\n  padding: 0.3rem 0.7rem;\n  border: 1px solid rgba(139, 226, 140, 0.3);\n  border-radius: 6px;\n  background: rgba(255, 255, 255, 0.08);\n  color: #d5f0dc;\n  font-size: 0.72rem;\n}\n.quote-summary[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.4rem;\n  margin-top: 0.65rem;\n}\n.quote-summary[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  min-height: 26px;\n}\n.quote-summary[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: var(--%NS%text-on-accent);\n}\n.quote-summary[_ngcontent-%COMP%]   .badge-recent[_ngcontent-%COMP%] {\n  border-color: rgba(147, 197, 253, 0.3);\n  color: #bfdbfe;\n}\n.quote-summary[_ngcontent-%COMP%]   .badge-reviewed[_ngcontent-%COMP%] {\n  border-color: rgba(139, 226, 140, 0.35);\n  color: #b7efbd;\n}\n.quote-summary[_ngcontent-%COMP%]   .badge-pending[_ngcontent-%COMP%] {\n  border-color: rgba(253, 186, 116, 0.35);\n  color: #fed7aa;\n}\n.quote-summary[_ngcontent-%COMP%]   .badge-urgent[_ngcontent-%COMP%] {\n  border-color: rgba(252, 165, 165, 0.35);\n  color: #fecaca;\n}\n.quotes-panel[_ngcontent-%COMP%]   .toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 0.6rem;\n  margin: 0 0 0.8rem;\n  padding: 0.6rem 0.75rem;\n  border: 1px solid var(--%NS%border-color);\n  border-radius: 14px;\n  background: var(--%NS%surface-card);\n  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.05);\n  position: relative;\n  z-index: 1;\n}\n.search-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  flex: 1 1 240px;\n  display: flex;\n  align-items: center;\n}\n.search-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 0.8rem;\n  width: 17px;\n  height: 17px;\n  fill: none;\n  stroke: var(--%NS%accent-silver);\n  stroke-width: 2;\n  stroke-linecap: round;\n  pointer-events: none;\n}\n.search-input[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 38px;\n  padding: 0.4rem 2.3rem 0.4rem 2.4rem;\n  border: 1px solid var(--%NS%input-border);\n  border-radius: 9px;\n  font-size: 0.9rem;\n  background: var(--%NS%surface-subtle);\n  color: var(--%NS%text-silver);\n  transition:\n    border-color 0.2s ease,\n    box-shadow 0.2s ease,\n    background 0.2s ease;\n}\n.search-input[_ngcontent-%COMP%]::placeholder {\n  color: var(--%NS%accent-silver);\n}\n.search-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--%NS%accent-green);\n  background: var(--%NS%surface-card);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.1);\n}\n.search-clear[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0.45rem;\n  width: 24px;\n  height: 24px;\n  border: 0;\n  border-radius: 50%;\n  background: var(--%NS%surface-muted);\n  color: var(--%NS%text-muted);\n  font-size: 1rem;\n  line-height: 1;\n  cursor: pointer;\n}\n.search-clear[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%input-border);\n  color: var(--%NS%text-main);\n}\n.chip-group[_ngcontent-%COMP%] {\n  display: inline-flex;\n  gap: 0.3rem;\n  padding: 0.22rem;\n  border-radius: 999px;\n  background: var(--%NS%surface-hover);\n}\n.chip[_ngcontent-%COMP%] {\n  padding: 0.35rem 0.85rem;\n  border: 0;\n  border-radius: 999px;\n  background: transparent;\n  color: var(--%NS%text-muted);\n  font-size: 0.78rem;\n  font-weight: 700;\n  cursor: pointer;\n  transition:\n    background 0.18s,\n    color 0.18s,\n    box-shadow 0.18s;\n}\n.chip[_ngcontent-%COMP%]:hover {\n  color: var(--%NS%text-silver);\n}\n.chip.is-active[_ngcontent-%COMP%] {\n  background: var(--%NS%surface-card);\n  color: var(--%NS%accent-green-dark);\n  box-shadow: 0 3px 8px rgba(15, 23, 42, 0.12);\n}\n.toolbar-select[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n}\n.toolbar-select[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 0.7rem;\n  width: 15px;\n  height: 15px;\n  fill: none;\n  stroke: var(--%NS%accent-silver);\n  stroke-width: 1.9;\n  stroke-linecap: round;\n  pointer-events: none;\n}\n.toolbar-select[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  min-height: 38px;\n  max-width: 220px;\n  padding: 0.4rem 1.9rem 0.4rem 2rem;\n  border: 1px solid var(--%NS%input-border);\n  border-radius: 9px;\n  background: var(--%NS%surface-subtle);\n  color: var(--%NS%text-silver);\n  font-size: 0.85rem;\n  cursor: pointer;\n  appearance: none;\n  transition: border-color 0.2s, box-shadow 0.2s;\n}\n.toolbar-select[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--%NS%accent-green);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.1);\n}\n.results-count[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  margin-left: auto;\n  color: var(--%NS%text-muted);\n  font-size: 0.8rem;\n  white-space: nowrap;\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.4rem;\n  min-height: 38px;\n  padding: 0.55rem 1rem;\n  border: 1px solid var(--%NS%input-border);\n  border-radius: 9px;\n  background: var(--%NS%surface-card);\n  color: var(--%NS%text-silver);\n  font-weight: 700;\n  font-size: 0.85rem;\n  cursor: pointer;\n  transition: all 0.18s ease;\n}\n.btn-secondary[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%surface-hover);\n  border-color: var(--%NS%border-strong);\n}\n.filters-row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.8rem;\n  margin: 0 0 1.15rem;\n  position: relative;\n  z-index: 1;\n}\n.filter-group[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n  padding: 0.35rem 0.55rem;\n  border: 1px solid var(--%NS%surface-muted);\n  border-radius: 8px;\n  background: var(--%NS%surface-subtle);\n}\n.filter-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  font-weight: 700;\n  color: var(--%NS%text-silver);\n  text-transform: uppercase;\n  letter-spacing: 0.3px;\n  white-space: nowrap;\n}\n.filter-input[_ngcontent-%COMP%] {\n  padding: 0.4rem 0.8rem;\n  min-height: 36px;\n  border: 1px solid var(--%NS%input-border);\n  border-radius: 8px;\n  font-size: 0.9rem;\n  background: var(--%NS%surface-subtle);\n  transition: 0.2s;\n  color: var(--%NS%text-silver);\n}\n.filter-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--%NS%accent-green);\n  background: var(--%NS%surface-card);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.1);\n}\n.date-range[_ngcontent-%COMP%], \n.price-range[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n}\n.date-range[_ngcontent-%COMP%]   .filter-input[_ngcontent-%COMP%] {\n  width: 130px;\n}\n.price-range[_ngcontent-%COMP%]   .filter-input[_ngcontent-%COMP%] {\n  width: 100px;\n}\n.cards-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));\n  gap: 1.15rem;\n  position: relative;\n  z-index: 1;\n}\n.quote-card[_ngcontent-%COMP%] {\n  background: var(--%NS%surface-card);\n  border-radius: 13px;\n  border: 1px solid var(--%NS%border-color);\n  padding: 1.2rem;\n  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.05);\n  transition:\n    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),\n    box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1),\n    border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  will-change: transform;\n  animation: _ngcontent-%COMP%_fadeInUp 0.45s ease forwards;\n  opacity: 0;\n  transform: translateY(20px) scale(0.98);\n}\n.quote-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-6px) scale(1.005);\n  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.08);\n  border-color: #8bd39a;\n}\n.quote-card[_ngcontent-%COMP%]:active {\n  transform: scale(0.98);\n  transition-duration: 0.1s;\n}\n@keyframes _ngcontent-%COMP%_fadeInUp {\n  from {\n    opacity: 0;\n    transform: translateY(20px) scale(0.98);\n  }\n  100% {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n.card-color-indicator[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 4px;\n  border-radius: 4px 4px 0 0;\n  margin-bottom: 0.8rem;\n}\n.card-color-indicator.color-reciente[_ngcontent-%COMP%] {\n  background: var(--%NS%info);\n}\n.card-color-indicator.color-verde[_ngcontent-%COMP%] {\n  background: #22c55e;\n}\n.card-color-indicator.color-amarillo[_ngcontent-%COMP%] {\n  background: #f59e0b;\n}\n.card-color-indicator.color-rojo[_ngcontent-%COMP%] {\n  background: var(--%NS%danger-bright);\n}\n.card-body-grid[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 0.5rem;\n}\n.card-left[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.client-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.7rem;\n}\n.client-avatar[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 11px;\n  background: var(--%NS%accent-green-light);\n  color: var(--%NS%accent-green-dark);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: 1.1rem;\n  flex-shrink: 0;\n}\n.client-name[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 1rem;\n  color: var(--%NS%text-main);\n  line-height: 1.2;\n}\n.vehicle-name[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: var(--%NS%text-silver);\n  margin-top: 0.1rem;\n}\n.card-right[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 0.3rem;\n  flex-shrink: 0;\n}\n.price-tag[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 1.2rem;\n  color: var(--%NS%accent-green-dark);\n}\n.status-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  font-size: 0.65rem;\n  font-weight: 700;\n  padding: 0.15rem 0.7rem;\n  border-radius: 20px;\n  text-transform: uppercase;\n  letter-spacing: 0.3px;\n  background: var(--%NS%border-color);\n  color: var(--%NS%text-silver);\n  border: none;\n}\n.status-badge.color-reciente[_ngcontent-%COMP%] {\n  background: var(--%NS%info-bg);\n  color: var(--%NS%info);\n}\n.status-badge.color-verde[_ngcontent-%COMP%] {\n  background: #bbf7d0;\n  color: var(--%NS%accent-green-dark);\n}\n.status-badge.color-amarillo[_ngcontent-%COMP%] {\n  background: var(--%NS%warning-bg);\n  color: var(--%NS%warning);\n}\n.status-badge.color-rojo[_ngcontent-%COMP%] {\n  background: var(--%NS%danger-bg);\n  color: var(--%NS%danger);\n}\n.card-details[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 0.5rem;\n  padding: 0.5rem 0 0.8rem;\n  border-top: 1px solid var(--%NS%surface-hover);\n  margin-top: 0.5rem;\n}\n.detail-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.detail-label[_ngcontent-%COMP%] {\n  font-size: 0.6rem;\n  text-transform: uppercase;\n  letter-spacing: 0.4px;\n  color: var(--%NS%accent-silver);\n  font-weight: 600;\n}\n.detail-value[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 0.9rem;\n  color: var(--%NS%text-main);\n}\n.card-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  gap: 0.35rem;\n  border-top: 1px solid var(--%NS%border-color);\n  padding-top: 0.8rem;\n  margin-top: 0.2rem;\n}\n.action-buttons[_ngcontent-%COMP%] {\n  display: inline-flex;\n  gap: 0.35rem;\n}\n.btn-icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 34px;\n  height: 34px;\n  border: 1px solid transparent;\n  border-radius: 9px;\n  background: transparent;\n  cursor: pointer;\n  transition: all 0.18s ease;\n}\n.btn-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 17px;\n  height: 17px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 1.9;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.btn-icon[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid rgba(32, 176, 56, 0.35);\n  outline-offset: 2px;\n}\n.btn-fijar[_ngcontent-%COMP%] {\n  color: var(--%NS%text-muted);\n}\n.btn-fijar[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%accent-green-light);\n  color: var(--%NS%accent-green-dark);\n  border-color: #8bd39a;\n}\n.btn-fijar.is-pinned[_ngcontent-%COMP%] {\n  background: var(--%NS%accent-green-light);\n  color: var(--%NS%accent-green-dark);\n  border-color: #8bd39a;\n}\n.btn-fijar.is-pinned[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  fill: currentColor;\n}\n.btn-view[_ngcontent-%COMP%] {\n  color: var(--%NS%text-muted);\n}\n.btn-view[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%info-bg);\n  color: var(--%NS%info);\n  border-color: var(--%NS%info-border);\n}\n.notas-counter[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  padding: 0.25rem 0.7rem;\n  border-radius: 20px;\n  background: rgba(32, 176, 56, 0.1);\n  border: 1px solid rgba(32, 176, 56, 0.3);\n  color: var(--%NS%accent-green);\n  font-size: 0.75rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.18s ease;\n  flex-shrink: 0;\n}\n.notas-counter[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 15px;\n  height: 15px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 1.9;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.notas-counter[_ngcontent-%COMP%]   .notas-counter-num[_ngcontent-%COMP%] {\n  font-weight: 800;\n}\n.notas-counter[_ngcontent-%COMP%]   .notas-counter-label[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  opacity: 0.85;\n}\n.notas-counter[_ngcontent-%COMP%]:hover {\n  background: rgba(32, 176, 56, 0.18);\n  color: var(--%NS%accent-green-dark);\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 1000;\n  background: rgba(15, 23, 42, 0.5);\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 1rem;\n  animation: _ngcontent-%COMP%_fadeIn 0.2s ease;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.modal-content[_ngcontent-%COMP%] {\n  background: var(--%NS%surface-card);\n  border-radius: 18px;\n  box-shadow: 0 30px 70px -20px rgba(15, 23, 42, 0.4);\n  max-width: 640px;\n  width: 90%;\n  max-height: 92vh;\n  overflow-y: auto;\n  position: relative;\n  border: 1px solid var(--%NS%border-color);\n  animation: _ngcontent-%COMP%_riseIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);\n}\n@keyframes _ngcontent-%COMP%_riseIn {\n  from {\n    opacity: 0;\n    transform: translateY(18px) scale(0.97);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n.modal-container[_ngcontent-%COMP%] {\n  background: var(--%NS%surface-card);\n  border-radius: 20px;\n  max-width: 1100px;\n  width: 100%;\n  max-height: 90vh;\n  overflow-y: auto;\n  position: relative;\n  border: 1px solid var(--%NS%border-color);\n  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.25);\n  animation: _ngcontent-%COMP%_riseIn 0.3s ease;\n}\n.modal-container[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 6px;\n}\n.modal-container[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: var(--%NS%surface-hover);\n  border-radius: 10px;\n}\n.modal-container[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: var(--%NS%accent-silver);\n  border-radius: 10px;\n}\n.modal-container[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: var(--%NS%text-muted);\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 0.5rem 2rem 2rem 2rem;\n  clear: both;\n}\n.modal-close[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0.8rem;\n  right: 0.8rem;\n  width: 34px;\n  height: 34px;\n  border: none;\n  border-radius: 50%;\n  background: transparent;\n  color: var(--%NS%text-secondary);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.16s ease;\n}\n.modal-close[_ngcontent-%COMP%]:hover {\n  background: rgba(0, 0, 0, 0.06);\n  color: var(--%NS%text-primary);\n}\n.modal-heading[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.7rem;\n  padding: 1.1rem 1.25rem;\n  border-bottom: 1px solid var(--%NS%border-color);\n}\n.modal-heading[_ngcontent-%COMP%]   .modal-icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 38px;\n  height: 38px;\n  border-radius: 10px;\n  background: var(--%NS%accent-green-light);\n  color: var(--%NS%accent-green-dark);\n  flex-shrink: 0;\n}\n.modal-heading[_ngcontent-%COMP%]   .modal-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 1.8;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.modal-heading[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.1rem;\n}\n.modal-heading[_ngcontent-%COMP%]   .modal-eyebrow[_ngcontent-%COMP%] {\n  font-size: 0.68rem;\n  color: var(--%NS%text-secondary);\n  text-transform: uppercase;\n  letter-spacing: 0.6px;\n  font-weight: 600;\n}\n.modal-heading[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.05rem;\n  color: var(--%NS%text-primary);\n  font-weight: 700;\n}\n.modal-heading.modal-heading-notes[_ngcontent-%COMP%] {\n  border-color: rgba(139, 226, 140, 0.3);\n}\n.modal-heading.modal-heading-notes[_ngcontent-%COMP%]   .modal-icon[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 138, 0.14);\n}\n.notas-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 1000;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 1.25rem;\n  background:\n    radial-gradient(\n      60% 50% at 50% 0%,\n      rgba(34, 197, 94, 0.1),\n      transparent 70%),\n    rgba(9, 14, 25, 0.58);\n  backdrop-filter: blur(10px) saturate(140%);\n  -webkit-backdrop-filter: blur(10px) saturate(140%);\n  animation: _ngcontent-%COMP%_notasFadeIn 0.24s ease;\n}\n@keyframes _ngcontent-%COMP%_notasFadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.notas-modal[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  width: min(560px, 100%);\n  max-height: min(88vh, 780px);\n  overflow: hidden;\n  background: var(--%NS%surface-card);\n  border: 1px solid var(--%NS%border-color);\n  border-radius: 20px;\n  box-shadow: 0 40px 90px -28px rgba(9, 14, 25, 0.55), 0 20px 45px -24px rgba(32, 176, 56, 0.22);\n  animation: _ngcontent-%COMP%_notasRiseIn 0.34s cubic-bezier(0.16, 1, 0.3, 1);\n}\n@keyframes _ngcontent-%COMP%_notasRiseIn {\n  from {\n    opacity: 0;\n    transform: translateY(18px) scale(0.97);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n.notas-modal[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 3px;\n  z-index: 1;\n  background:\n    linear-gradient(\n      90deg,\n      var(--%NS%accent-green-dark),\n      var(--%NS%accent-green-bright) 55%,\n      transparent);\n}\n.notas-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.9rem;\n  padding: 1.15rem 1.3rem 1.05rem;\n  border-bottom: 1px solid var(--%NS%border-color);\n  background:\n    linear-gradient(\n      180deg,\n      var(--%NS%accent-green-light),\n      transparent 75%);\n  flex-shrink: 0;\n}\n.notas-icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 44px;\n  height: 44px;\n  flex-shrink: 0;\n  border-radius: 13px;\n  background:\n    linear-gradient(\n      135deg,\n      var(--%NS%accent-green) 0%,\n      var(--%NS%accent-green-dark) 100%);\n  color: var(--%NS%text-on-accent);\n  box-shadow: 0 10px 22px -8px rgba(32, 176, 56, 0.6);\n}\n.notas-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 21px;\n  height: 21px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 1.8;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.notas-titles[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.15rem;\n  min-width: 0;\n}\n.notas-eyebrow[_ngcontent-%COMP%] {\n  font-size: 0.66rem;\n  font-weight: 800;\n  letter-spacing: 1.1px;\n  text-transform: uppercase;\n  color: var(--%NS%accent-silver);\n}\n.notas-title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.12rem;\n  font-weight: 700;\n  letter-spacing: -0.01em;\n  color: var(--%NS%text-main);\n}\n.notas-close[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 34px;\n  height: 34px;\n  margin-left: auto;\n  flex-shrink: 0;\n  border: none;\n  border-radius: 10px;\n  background: transparent;\n  color: var(--%NS%text-muted);\n  cursor: pointer;\n  transition:\n    background 0.16s ease,\n    color 0.16s ease,\n    transform 0.16s ease;\n}\n.notas-close[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%surface-hover);\n  color: var(--%NS%text-main);\n}\n.notas-close[_ngcontent-%COMP%]:active {\n  transform: scale(0.94);\n}\n.notas-close[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 2;\n  stroke-linecap: round;\n}\n.notas-body[_ngcontent-%COMP%] {\n  flex: 1 1 auto;\n  min-height: 0;\n  overflow-y: auto;\n  padding: 1rem 1.3rem;\n}\n.notas-body[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 8px;\n}\n.notas-body[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: var(--%NS%border-strong);\n  border-radius: 999px;\n}\n.notas-body[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: var(--%NS%accent-silver);\n}\n.notas-alert[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin-bottom: 0.9rem;\n  padding: 0.6rem 0.75rem;\n  border-radius: 10px;\n  background: var(--%NS%danger-bg);\n  border: 1px solid var(--%NS%danger-border);\n  color: var(--%NS%danger);\n  font-size: 0.84rem;\n  font-weight: 600;\n}\n.notas-alert[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 15px;\n  height: 15px;\n  flex-shrink: 0;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 2;\n  stroke-linecap: round;\n}\n.notas-loading[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.6rem;\n  padding: 2rem 0;\n  color: var(--%NS%text-muted);\n  font-size: 0.86rem;\n}\n.notas-spinner[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  border-radius: 50%;\n  border: 2.5px solid var(--%NS%border-color);\n  border-top-color: var(--%NS%accent-green);\n  animation: _ngcontent-%COMP%_notasSpin 0.7s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_notasSpin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.notas-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.6rem;\n}\n.nota-item[_ngcontent-%COMP%] {\n  position: relative;\n  padding: 0.8rem 2.9rem 0.8rem 0.95rem;\n  border: 1px solid var(--%NS%border-color);\n  border-radius: 14px;\n  background: var(--%NS%surface-subtle);\n  transition:\n    border-color 0.18s ease,\n    background 0.18s ease,\n    box-shadow 0.18s ease;\n}\n.nota-item[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%surface-card);\n  border-color: rgba(32, 176, 56, 0.35);\n  box-shadow: 0 10px 24px -14px rgba(15, 23, 42, 0.28);\n}\n.nota-item.nota-editing[_ngcontent-%COMP%] {\n  border-color: var(--%NS%accent-green);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.12);\n}\n.nota-texto[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--%NS%text-main);\n  font-size: 0.88rem;\n  line-height: 1.5;\n  white-space: pre-wrap;\n  word-break: break-word;\n}\n.nota-fecha[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.32rem;\n  margin-top: 0.55rem;\n  padding: 0.18rem 0.55rem;\n  border-radius: 999px;\n  background: var(--%NS%surface-hover);\n  border: 1px solid var(--%NS%border-color);\n  color: var(--%NS%accent-silver);\n  font-size: 0.7rem;\n  font-weight: 600;\n  font-variant-numeric: tabular-nums;\n}\n.nota-fecha[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 12px;\n  height: 12px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 2;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.nota-acciones[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0.6rem;\n  right: 0.6rem;\n  display: flex;\n  gap: 0.25rem;\n  opacity: 0;\n  transform: translateX(4px);\n  transition: opacity 0.18s ease, transform 0.18s ease;\n}\n.nota-item[_ngcontent-%COMP%]:hover   .nota-acciones[_ngcontent-%COMP%], \n.nota-item.nota-editing[_ngcontent-%COMP%]   .nota-acciones[_ngcontent-%COMP%] {\n  opacity: 1;\n  transform: translateX(0);\n}\n@media (hover: none), (pointer: coarse) {\n  .nota-acciones[_ngcontent-%COMP%] {\n    opacity: 1;\n    transform: none;\n  }\n}\n.nota-acciones[_ngcontent-%COMP%]   .btn-icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 30px;\n  height: 30px;\n  border: 1px solid transparent;\n  border-radius: 9px;\n  background: var(--%NS%surface-card);\n  color: var(--%NS%text-muted);\n  cursor: pointer;\n  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.1);\n  transition: all 0.16s ease;\n}\n.nota-acciones[_ngcontent-%COMP%]   .btn-icon[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n}\n.nota-acciones[_ngcontent-%COMP%]   .btn-icon.btn-edit[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%accent-green-light);\n  border-color: rgba(32, 176, 56, 0.35);\n  color: var(--%NS%accent-green-dark);\n}\n.nota-acciones[_ngcontent-%COMP%]   .btn-icon.btn-delete[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%danger-bg);\n  border-color: var(--%NS%danger-border);\n  color: var(--%NS%danger);\n}\n.nota-acciones[_ngcontent-%COMP%]   .btn-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 14px;\n  height: 14px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 1.9;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.notas-empty[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.2rem;\n  padding: 2.2rem 1rem;\n  text-align: center;\n}\n.notas-empty-icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 52px;\n  height: 52px;\n  margin-bottom: 0.5rem;\n  border-radius: 16px;\n  background: var(--%NS%surface-hover);\n  border: 1px dashed var(--%NS%border-strong);\n  color: var(--%NS%accent-silver);\n}\n.notas-empty-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 1.6;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.notas-empty-title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.92rem;\n  font-weight: 700;\n  color: var(--%NS%text-silver);\n}\n.notas-empty-sub[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.8rem;\n  color: var(--%NS%text-muted);\n}\n.notas-editor[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  padding: 0.95rem 1.3rem 1.1rem;\n  border-top: 1px solid var(--%NS%border-color);\n  background: var(--%NS%surface-subtle);\n}\n.notas-editor-label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 0.45rem;\n  font-size: 0.7rem;\n  font-weight: 800;\n  letter-spacing: 0.8px;\n  text-transform: uppercase;\n  color: var(--%NS%accent-silver);\n}\n.notas-editor-label.nota-editando-label[_ngcontent-%COMP%] {\n  color: var(--%NS%accent-green-dark);\n}\n.nota-textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 72px;\n  padding: 0.65rem 0.85rem;\n  border: 1.5px solid var(--%NS%input-border, var(--%NS%border-color));\n  border-radius: 12px;\n  background: var(--%NS%surface-card);\n  color: var(--%NS%text-main);\n  font-family: var(--%NS%font-body, inherit);\n  font-size: 0.88rem;\n  line-height: 1.5;\n  resize: vertical;\n  transition: border-color 0.18s ease, box-shadow 0.18s ease;\n}\n.nota-textarea[_ngcontent-%COMP%]::placeholder {\n  color: var(--%NS%text-muted);\n}\n.nota-textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--%NS%accent-green);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.14);\n}\n.notas-editor-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.5rem;\n  margin-top: 0.65rem;\n}\n.notas-btn-primary[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.4rem;\n  min-height: 38px;\n  padding: 0.5rem 1.05rem;\n  border: none;\n  border-radius: 10px;\n  background:\n    linear-gradient(\n      135deg,\n      var(--%NS%accent-green-dark),\n      var(--%NS%accent-green));\n  color: var(--%NS%text-on-accent);\n  font-size: 0.84rem;\n  font-weight: 700;\n  cursor: pointer;\n  box-shadow: 0 10px 20px -8px rgba(32, 176, 56, 0.55);\n  transition:\n    transform 0.18s ease,\n    box-shadow 0.18s ease,\n    filter 0.18s ease;\n}\n.notas-btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-1px);\n  box-shadow: 0 14px 26px -8px rgba(32, 176, 56, 0.6);\n}\n.notas-btn-primary[_ngcontent-%COMP%]:disabled {\n  opacity: 0.55;\n  cursor: not-allowed;\n  transform: none;\n  box-shadow: none;\n}\n.notas-btn-primary[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 15px;\n  height: 15px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 2.4;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.notas-btn-ghost[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 38px;\n  padding: 0.5rem 0.95rem;\n  border: 1px solid var(--%NS%input-border, var(--%NS%border-color));\n  border-radius: 10px;\n  background: var(--%NS%surface-card);\n  color: var(--%NS%text-silver);\n  font-size: 0.84rem;\n  font-weight: 700;\n  cursor: pointer;\n  transition: all 0.18s ease;\n}\n.notas-btn-ghost[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%surface-hover);\n  border-color: var(--%NS%border-strong);\n  color: var(--%NS%text-main);\n}\n.notas-footer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  flex-shrink: 0;\n  padding: 0.8rem 1.3rem;\n  border-top: 1px solid var(--%NS%border-color);\n  background: var(--%NS%surface-card);\n}\n.notas-count[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  font-size: 0.78rem;\n  font-weight: 600;\n  color: var(--%NS%text-muted);\n}\n.notas-count-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 22px;\n  height: 22px;\n  padding: 0 0.4rem;\n  border-radius: 999px;\n  background: var(--%NS%accent-green-light);\n  border: 1px solid rgba(32, 176, 56, 0.3);\n  color: var(--%NS%accent-green-dark);\n  font-size: 0.72rem;\n  font-weight: 800;\n  font-variant-numeric: tabular-nums;\n}\n.notas-close[_ngcontent-%COMP%]:focus-visible, \n.notas-btn-primary[_ngcontent-%COMP%]:focus-visible, \n.notas-btn-ghost[_ngcontent-%COMP%]:focus-visible, \n.nota-acciones[_ngcontent-%COMP%]   .btn-icon[_ngcontent-%COMP%]:focus-visible, \n.nota-textarea[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--%NS%accent-green);\n  outline-offset: 2px;\n}\nhtml[data-theme=dark][_ngcontent-%COMP%]   .notas-modal[_ngcontent-%COMP%] {\n  box-shadow: 0 40px 90px -28px rgba(0, 0, 0, 0.75), 0 20px 45px -24px rgba(34, 197, 94, 0.2);\n}\nhtml[data-theme=dark][_ngcontent-%COMP%]   .notas-header[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      180deg,\n      rgba(34, 197, 94, 0.1),\n      transparent 75%);\n}\nhtml[data-theme=dark][_ngcontent-%COMP%]   .notas-overlay[_ngcontent-%COMP%] {\n  background:\n    radial-gradient(\n      60% 50% at 50% 0%,\n      rgba(34, 197, 94, 0.08),\n      transparent 70%),\n    rgba(2, 6, 12, 0.72);\n}\n@media (max-width: 640px) {\n  .notas-overlay[_ngcontent-%COMP%] {\n    padding: 0.75rem;\n    align-items: flex-end;\n  }\n  .notas-modal[_ngcontent-%COMP%] {\n    width: 100%;\n    max-height: 92vh;\n    border-radius: 18px;\n  }\n  .notas-header[_ngcontent-%COMP%], \n   .notas-body[_ngcontent-%COMP%], \n   .notas-editor[_ngcontent-%COMP%], \n   .notas-footer[_ngcontent-%COMP%] {\n    padding-left: 1rem;\n    padding-right: 1rem;\n  }\n  .notas-footer[_ngcontent-%COMP%] {\n    flex-direction: column-reverse;\n    align-items: stretch;\n  }\n  .notas-footer[_ngcontent-%COMP%]   .notas-btn-ghost[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .notas-editor-actions[_ngcontent-%COMP%] {\n    flex-direction: column-reverse;\n  }\n  .notas-editor-actions[_ngcontent-%COMP%]   .notas-btn-primary[_ngcontent-%COMP%], \n   .notas-editor-actions[_ngcontent-%COMP%]   .notas-btn-ghost[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .nota-acciones[_ngcontent-%COMP%] {\n    opacity: 1;\n    transform: none;\n  }\n}\n.btn-primary[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.4rem;\n  min-height: 40px;\n  padding: 0.55rem 1rem;\n  border: none;\n  border-radius: 9px;\n  background:\n    linear-gradient(\n      135deg,\n      var(--%NS%accent-green-dark) 0%,\n      var(--%NS%accent-green) 100%);\n  color: var(--%NS%text-on-accent);\n  font-size: 0.85rem;\n  font-weight: 700;\n  cursor: pointer;\n  box-shadow: 0 10px 20px -8px rgba(32, 176, 56, 0.5);\n  transition: transform 0.18s ease, box-shadow 0.18s ease;\n}\n.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-1px);\n  box-shadow: 0 14px 26px -8px rgba(32, 176, 56, 0.55);\n}\n.btn-primary[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none;\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.4rem;\n  min-height: 40px;\n  padding: 0.55rem 1rem;\n  border: 1px solid var(--%NS%input-border, var(--%NS%border-color));\n  border-radius: 9px;\n  background: var(--%NS%surface-card);\n  color: var(--%NS%text-silver);\n  font-size: 0.85rem;\n  font-weight: 700;\n  cursor: pointer;\n  transition: all 0.18s ease;\n}\n.btn-secondary[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%surface-hover);\n  border-color: var(--%NS%border-strong);\n}\n.modal-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  margin-top: 1rem;\n}\n.btn-cancel[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.4rem;\n  min-height: 40px;\n  padding: 0.55rem 1.15rem;\n  border: 1px solid var(--%NS%input-border, var(--%NS%border-color));\n  border-radius: 9px;\n  background: var(--%NS%surface-card);\n  color: var(--%NS%text-silver);\n  font-size: 0.85rem;\n  font-weight: 700;\n  cursor: pointer;\n  transition: all 0.18s ease;\n}\n.btn-cancel[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%surface-hover);\n  border-color: var(--%NS%border-strong);\n}\n.btn-confirm[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.4rem;\n  min-height: 40px;\n  padding: 0.55rem 1.3rem;\n  border: none;\n  border-radius: 9px;\n  background:\n    linear-gradient(\n      135deg,\n      var(--%NS%accent-green-dark),\n      var(--%NS%accent-green));\n  color: var(--%NS%text-on-accent);\n  font-size: 0.85rem;\n  font-weight: 700;\n  cursor: pointer;\n  transition: all 0.18s ease;\n  box-shadow: 0 10px 20px -8px rgba(32, 176, 56, 0.5);\n}\n.btn-confirm[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-1px);\n  box-shadow: 0 14px 26px -8px rgba(32, 176, 56, 0.55);\n}\n.btn-confirm[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: wait;\n  transform: none;\n}\n.btn-primary[_ngcontent-%COMP%]:focus-visible, \n.btn-secondary[_ngcontent-%COMP%]:focus-visible, \n.btn-cancel[_ngcontent-%COMP%]:focus-visible, \n.btn-confirm[_ngcontent-%COMP%]:focus-visible, \n.notas-counter[_ngcontent-%COMP%]:focus-visible, \n.btn-icon[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--%NS%accent-green);\n  outline-offset: 2px;\n}\n.toast-host[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 1.5rem;\n  right: 1.5rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.6rem;\n  z-index: 2000;\n}\n.toast[_ngcontent-%COMP%] {\n  min-width: 260px;\n  padding: 0.8rem 1rem;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  box-shadow: 0 16px 34px -10px rgba(15, 23, 42, 0.35);\n  animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);\n  color: var(--%NS%surface-card);\n  font-size: 0.85rem;\n  position: relative;\n  overflow: hidden;\n  cursor: pointer;\n}\n.toast-success[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #14532d,\n      var(--%NS%accent-green-dark));\n}\n.toast-error[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #7f1d1d,\n      var(--%NS%danger));\n}\n.toast-info[_ngcontent-%COMP%] {\n  background: var(--%NS%text-main);\n}\n.toast-icon[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 700;\n}\n.toast-msg[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.toast-action[_ngcontent-%COMP%] {\n  padding: 0.28rem 0.65rem;\n  border-radius: 8px;\n  background: var(--%NS%surface-card);\n  color: var(--%NS%accent-green-dark);\n  font-size: 0.75rem;\n  font-weight: 800;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  white-space: nowrap;\n}\n.toast-close[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 22px;\n  height: 22px;\n  border: 0;\n  border-radius: 50%;\n  background: transparent;\n  color: rgba(255, 255, 255, 0.75);\n  font-size: 1rem;\n  cursor: pointer;\n}\n.toast-close[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.15);\n  color: var(--%NS%surface-card);\n}\n@media (max-width: 992px) {\n  .cards-grid[_ngcontent-%COMP%], \n   .skeleton-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));\n  }\n}\n@media (max-width: 768px) {\n  .quotes-panel[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%] {\n    min-height: 0;\n    align-items: stretch;\n    padding: 1.25rem;\n  }\n  .quotes-panel[_ngcontent-%COMP%]   .page-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 1.7rem;\n  }\n  .quotes-panel[_ngcontent-%COMP%]   .toolbar[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n    padding: 0.8rem;\n  }\n  .search-wrapper[_ngcontent-%COMP%] {\n    flex: 1 1 auto;\n  }\n  .chip-group[_ngcontent-%COMP%] {\n    align-self: flex-start;\n    flex-wrap: wrap;\n    border-radius: 14px;\n  }\n  .toolbar-select[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n    max-width: none;\n    width: 100%;\n  }\n  .results-count[_ngcontent-%COMP%] {\n    margin-left: 0;\n  }\n  .filters-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n    gap: 0.8rem;\n  }\n  .filter-group[_ngcontent-%COMP%] {\n    width: 100%;\n    padding: 0;\n    border: 0;\n    background: transparent;\n  }\n  .date-range[_ngcontent-%COMP%], \n   .price-range[_ngcontent-%COMP%] {\n    justify-content: space-between;\n  }\n  .date-range[_ngcontent-%COMP%]   .filter-input[_ngcontent-%COMP%], \n   .price-range[_ngcontent-%COMP%]   .filter-input[_ngcontent-%COMP%] {\n    width: 45%;\n  }\n  .cards-grid[_ngcontent-%COMP%], \n   .skeleton-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .card-body-grid[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .card-right[_ngcontent-%COMP%] {\n    align-items: flex-start;\n    width: 100%;\n    margin-top: 0.5rem;\n  }\n  .card-details[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr;\n  }\n  .modal-container[_ngcontent-%COMP%] {\n    max-height: 95vh;\n    border-radius: 16px;\n  }\n  .modal-body[_ngcontent-%COMP%] {\n    padding: 0.5rem 1rem 1rem 1rem;\n  }\n  .modal-close[_ngcontent-%COMP%] {\n    top: 0.4rem;\n    right: 0.4rem;\n    width: 34px;\n    height: 34px;\n  }\n  .notas-editor-actions[_ngcontent-%COMP%] {\n    flex-direction: column-reverse;\n  }\n  .notas-editor-actions[_ngcontent-%COMP%]   .notas-btn-primary[_ngcontent-%COMP%], \n   .notas-editor-actions[_ngcontent-%COMP%]   .notas-btn-ghost[_ngcontent-%COMP%], \n   .modal-actions[_ngcontent-%COMP%]   .btn-cancel[_ngcontent-%COMP%], \n   .modal-actions[_ngcontent-%COMP%]   .btn-confirm[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n  }\n  .toast-host[_ngcontent-%COMP%] {\n    right: 0.7rem;\n    bottom: 0.7rem;\n    left: 0.7rem;\n    max-width: none;\n  }\n  .btn-icon[_ngcontent-%COMP%] {\n    width: 40px;\n    height: 40px;\n  }\n  .chip-group[_ngcontent-%COMP%]   .chip[_ngcontent-%COMP%], \n   .toolbar[_ngcontent-%COMP%]   .chip[_ngcontent-%COMP%] {\n    padding: 0.55rem 1.05rem;\n  }\n}\n@media (max-width: 480px) {\n  .date-range[_ngcontent-%COMP%]   .filter-input[_ngcontent-%COMP%], \n   .price-range[_ngcontent-%COMP%]   .filter-input[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .price-range[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n}\n.modal-heading-warning[_ngcontent-%COMP%] {\n  border-color: var(--%NS%warning-bg, rgba(253, 186, 116, 0.3));\n}\n.modal-heading-warning[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  stroke: var(--%NS%warning, #f59e0b);\n}\n.modal-heading-warning[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: var(--%NS%warning, #f59e0b);\n}\n.warning-copy[_ngcontent-%COMP%] {\n  color: var(--%NS%text-secondary);\n}\n.modal-heading-warning[_ngcontent-%COMP%]   .modal-icon[_ngcontent-%COMP%] {\n  background: var(--%NS%warning-bg);\n  color: var(--%NS%warning);\n}\n.warning-copy[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 15px;\n  height: 15px;\n  flex-shrink: 0;\n  margin-top: 1px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 1.9;\n}\n.skeleton-card[_ngcontent-%COMP%] {\n  height: 215px;\n  border-radius: 13px;\n  border: 1px solid var(--%NS%border-color);\n  background:\n    linear-gradient(\n      90deg,\n      var(--%NS%surface-muted) 25%,\n      var(--%NS%surface-subtle) 50%,\n      var(--%NS%surface-muted) 75%);\n  background-size: 200% 100%;\n  animation: shimmer 1.4s infinite;\n}\n.catalog-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 2.5rem 1.5rem;\n  color: var(--%NS%text-muted);\n}\n.catalog-state.empty-state[_ngcontent-%COMP%] {\n  min-height: 220px;\n  border: 1px dashed var(--%NS%border-strong);\n  border-radius: 14px;\n  background: var(--%NS%surface-card);\n}\n.catalog-state.empty-state[_ngcontent-%COMP%]    > strong[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 0.35rem;\n  color: var(--%NS%text-silver);\n  font-size: 1rem;\n}\n.catalog-state.empty-state[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:last-of-type {\n  display: block;\n  color: var(--%NS%accent-silver);\n  font-size: 0.82rem;\n  margin-bottom: 1rem;\n}\n.empty-state-icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 52px;\n  height: 52px;\n  margin-bottom: 0.6rem;\n  border-radius: 14px;\n  background: var(--%NS%accent-green-light);\n  color: var(--%NS%accent-green-dark);\n}\n.empty-state-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n  fill: none;\n  stroke: currentColor;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n  stroke-width: 1.7;\n}\n/*# sourceMappingURL=admin-quotes.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminQuotesComponent, [{
    type: Component,
    args: [{ selector: "app-admin-quotes", standalone: true, imports: [CommonModule, FormsModule, QuoteBreakdownComponent], template: `<div class="quotes-panel">\r
    <!-- CABECERA -->\r
    <div class="page-header">\r
        <div class="page-heading">\r
            <span class="page-kicker">Control comercial</span>\r
            <h2>Todas las Cotizaciones</h2>\r
            <p>Da seguimiento al estado, precios y actividad de cada cotizaci\xF3n.</p>\r
            <div class="quote-summary">\r
                <span class="badge badge-total"><strong>{{ filteredQuotes().length }}</strong> registros</span>\r
                <span class="badge badge-recent"><strong>{{ countQuotesByColor('reciente') }}</strong> recientes</span>\r
                <span class="badge badge-reviewed"><strong>{{ countQuotesByColor('verde') }}</strong> revisadas</span>\r
                <span class="badge badge-pending"><strong>{{ countQuotesByColor('amarillo') }}</strong> pendientes</span>\r
                <span class="badge badge-urgent"><strong>{{ countQuotesByColor('rojo') }}</strong> urgentes</span>\r
            </div>\r
        </div>\r
    </div>\r
\r
    <!-- TOOLBAR: B\xDASQUEDA + FILTROS -->\r
    <div class="toolbar">\r
        <div class="search-wrapper">\r
            <svg class="search-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>\r
            <input type="text" [(ngModel)]="searchTerm" (input)="applyFilters()"\r
                placeholder="Buscar por cliente, veh\xEDculo o vendedor..." class="search-input" />\r
            <button *ngIf="searchTerm" type="button" class="search-clear" (click)="clearSearch()"\r
                aria-label="Limpiar b\xFAsqueda">\xD7</button>\r
        </div>\r
\r
        <div class="chip-group" role="group" aria-label="Filtrar por estado">\r
            <button type="button" class="chip" [class.is-active]="filtroColor === 'todos'"\r
                (click)="setStatusFilter('todos')">Todos</button>\r
            <button type="button" class="chip" [class.is-active]="filtroColor === 'reciente'"\r
                (click)="setStatusFilter('reciente')">Recientes</button>\r
            <button type="button" class="chip" [class.is-active]="filtroColor === 'verde'"\r
                (click)="setStatusFilter('verde')">Revisadas</button>\r
            <button type="button" class="chip" [class.is-active]="filtroColor === 'amarillo'"\r
                (click)="setStatusFilter('amarillo')">Pendientes</button>\r
            <button type="button" class="chip" [class.is-active]="filtroColor === 'rojo'"\r
                (click)="setStatusFilter('rojo')">Urgentes</button>\r
        </div>\r
\r
        <label class="toolbar-select">\r
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>\r
            <select [(ngModel)]="filtroVendedor" (change)="applyFilters()">\r
                <option value="todos">Todos los vendedores</option>\r
                <option *ngFor="let v of vendedores" [value]="v.id">\r
                    {{ v.full_name }} ({{ v.seller_number }})\r
                </option>\r
            </select>\r
        </label>\r
\r
        <label class="toolbar-select">\r
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>\r
            <select [(ngModel)]="filtroPeriodo" (change)="applyFilters()">\r
                <option value="todos">Todo el tiempo</option>\r
                <option value="7dias">\xDAltimos 7 d\xEDas</option>\r
                <option value="30dias">\xDAltimos 30 d\xEDas</option>\r
                <option value="90dias">\xDAltimos 90 d\xEDas</option>\r
            </select>\r
        </label>\r
\r
        <span class="results-count" *ngIf="!loading">{{ filteredQuotes().length }} resultado(s)</span>\r
    </div>\r
\r
    <!-- FILTROS AVANZADOS (FECHAS Y PRECIO) -->\r
    <div class="filters-row row-2">\r
        <div class="filter-group date-range">\r
            <label>Desde</label>\r
            <input type="date" [(ngModel)]="filtroFechaInicio" (change)="applyFilters()" class="filter-input" />\r
            <label>Hasta</label>\r
            <input type="date" [(ngModel)]="filtroFechaFin" (change)="applyFilters()" class="filter-input" />\r
        </div>\r
        <div class="filter-group price-range">\r
            <label>Precio m\xEDnimo</label>\r
            <input type="number" [(ngModel)]="filtroPrecioMin" (input)="applyFilters()" class="filter-input"\r
                placeholder="$0" />\r
            <label>Precio m\xE1ximo</label>\r
            <input type="number" [(ngModel)]="filtroPrecioMax" (input)="applyFilters()" class="filter-input"\r
                placeholder="$\u221E" />\r
        </div>\r
        <button type="button" class="btn-secondary" (click)="clearFilters()">Limpiar filtros</button>\r
    </div>\r
\r
    <!-- Listado -->\r
    <div class="quotes-list">\r
        <!-- SKELETON -->\r
        <div *ngIf="loading" class="skeleton-grid" aria-label="Cargando cotizaciones">\r
            <div class="skeleton-card" *ngFor="let i of [0,1,2,3,4,5]"></div>\r
        </div>\r
\r
        <!-- ESTADO VAC\xCDO -->\r
        <div *ngIf="!loading && filteredQuotes().length === 0" class="catalog-state empty-state">\r
            <span class="empty-state-icon" aria-hidden="true">\r
                <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6"></path><path d="M9 13h6"></path><path d="M9 17h4"></path></svg>\r
            </span>\r
            <strong>{{ quotes().length === 0 ? 'A\xFAn no hay cotizaciones registradas' : 'Sin resultados' }}</strong>\r
            <span>{{ quotes().length === 0 ? 'Las cotizaciones de tus vendedores aparecer\xE1n aqu\xED.' : 'Ajusta tu b\xFAsqueda o los filtros.' }}</span>\r
            <button *ngIf="quotes().length > 0" type="button" class="btn-secondary" (click)="clearFilters()">Limpiar\r
                filtros</button>\r
        </div>\r
\r
        <div class="cards-grid" *ngIf="!loading && filteredQuotes().length > 0">\r
            <div *ngFor="let q of filteredQuotes(); let i = index" class="quote-card" [class]="getColorClase(q)"\r
                [style.animation-delay]="(i * 0.03) + 's'">\r
                <div class="card-color-indicator" [class]="getColorClase(q)"></div>\r
\r
                <div class="card-body-grid">\r
                    <div class="card-left">\r
                        <div class="client-info">\r
                            <span class="client-avatar">{{ (q.client_name || '?').charAt(0).toUpperCase() }}</span>\r
                            <div>\r
                                <div class="client-name">{{ q.client_name || 'Cliente sin nombre' }}</div>\r
                                <div class="vehicle-name">{{ q.brand }} {{ q.model }}</div>\r
                            </div>\r
                        </div>\r
                    </div>\r
                    <div class="card-right">\r
                        <span class="price-tag">{{ q.pricenet | currency : 'MXN' : 'symbol' : '1.0-0' }}</span>\r
                        <span class="status-badge" [class]="getColorClase(q)">\r
                            {{ getEtiqueta(q) }}\r
                        </span>\r
                    </div>\r
                </div>\r
\r
                <div class="card-details">\r
                    <div class="detail-item">\r
                        <span class="detail-label">Vendedor</span>\r
                        <span class="detail-value">{{ q.seller_name || 'N/A' }}</span>\r
                    </div>\r
                    <div class="detail-item">\r
                        <span class="detail-label">Plazo</span>\r
                        <span class="detail-value">{{ q.termmonths }} meses</span>\r
                    </div>\r
                    <div class="detail-item">\r
                        <span class="detail-label">Fecha de creaci\xF3n</span>\r
                        <span class="detail-value">{{ q.created_at | date : 'dd/MM/yyyy' }}</span>\r
                    </div>\r
                    <div class="detail-item">\r
                        <span class="detail-label">D\xEDas sin actividad</span>\r
                        <span class="detail-value"\r
                            [style.color]="getDiasSinActualizar(q) > 7 ? '#dc2626' : getDiasSinActualizar(q) > 2 ? '#f59e0b' : '#15803d'">\r
                            {{ getDiasSinActualizar(q) }} d\xEDas\r
                        </span>\r
                    </div>\r
                </div>\r
\r
                <div class="card-footer">\r
                    <div class="action-buttons">\r
                        <button type="button" class="btn-icon btn-fijar" [class.is-pinned]="q.fijada"\r
                            (click)="toggleFijar(q)"\r
                            [title]="q.fijada ? 'Desfijar cotizaci\xF3n' : 'Fijar cotizaci\xF3n'"\r
                            [attr.aria-label]="q.fijada ? 'Desfijar cotizaci\xF3n' : 'Fijar cotizaci\xF3n'">\r
                            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 17v5"></path><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16h14v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1z"></path></svg>\r
                        </button>\r
                        <button type="button" class="notas-counter" (click)="abrirNotas(q)" title="Ver notas"\r
                            aria-label="Ver notas de la cotizaci\xF3n">\r
                            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16v13H7l-3 3Z"></path><path d="M8 8h8"></path><path d="M8 12h6"></path></svg>\r
                            <span class="notas-counter-num">{{ getNotasCount(q) }}</span>\r
                            <span class="notas-counter-label">{{ getNotasCount(q) === 1 ? 'nota' : 'notas' }}</span>\r
                        </button>\r
                        <button type="button" class="btn-icon btn-view" (click)="abrirModal(q)" title="Ver detalle"\r
                            aria-label="Ver detalle de la cotizaci\xF3n">\r
                            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>\r
                        </button>\r
                    </div>\r
                </div>\r
\r
            </div>\r
        </div>\r
    </div>\r
</div>\r
\r
<!-- MODAL DE NOTAS -->\r
<div class="modal-overlay notas-overlay" *ngIf="showNotasModal" (click)="cerrarNotasQuote()">\r
    <div class="notas-modal" role="dialog" aria-modal="true" aria-label="Notas de cotizaci\xF3n" (click)="$event.stopPropagation()">\r
        <header class="notas-header">\r
            <span class="notas-icon">\r
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16v13H7l-3 3Z"></path><path d="M8 8h8"></path><path d="M8 12h6"></path></svg>\r
            </span>\r
            <div class="notas-titles">\r
                <span class="notas-eyebrow">Seguimiento</span>\r
                <h3 class="notas-title">Notas de Cotizaci\xF3n</h3>\r
            </div>\r
            <button type="button" class="notas-close" (click)="cerrarNotasQuote()" title="Cerrar" aria-label="Cerrar">\r
                <svg viewBox="0 0 24 24" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>\r
            </button>\r
        </header>\r
\r
        <div class="notas-body">\r
            <div *ngIf="notaError" class="notas-alert">\r
                <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>\r
                <span>{{ notaError }}</span>\r
            </div>\r
\r
            <div *ngIf="notaLoading" class="notas-loading">\r
                <span class="notas-spinner"></span>\r
                <span>Cargando notas...</span>\r
            </div>\r
\r
            <div class="notas-list" *ngIf="!notaLoading">\r
                <article class="nota-item" *ngFor="let n of notasCotizacion" [class.nota-editing]="notaEditando?.id === n.id">\r
                    <p class="nota-texto">{{ n.texto }}</p>\r
                    <span class="nota-fecha">\r
                        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path></svg>\r
                        {{ n.created_at | date : 'dd/MM/yyyy HH:mm' }}\r
                    </span>\r
                    <div class="nota-acciones">\r
                        <button type="button" class="btn-icon btn-edit" (click)="editarNotaQuote(n)" title="Editar nota" aria-label="Editar nota">\r
                            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg>\r
                        </button>\r
                        <button type="button" class="btn-icon btn-delete" (click)="eliminarNotaQuote(n)" title="Eliminar nota" aria-label="Eliminar nota">\r
                            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="M19 6l-1 14H6L5 6"></path><path d="M10 11v5"></path><path d="M14 11v5"></path></svg>\r
                        </button>\r
                    </div>\r
                </article>\r
\r
                <div *ngIf="notasCotizacion.length === 0" class="notas-empty">\r
                    <span class="notas-empty-icon">\r
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6"></path><path d="M16 13H8"></path><path d="M16 17H8"></path><path d="M10 9H8"></path></svg>\r
                    </span>\r
                    <p class="notas-empty-title">Sin notas todav\xEDa</p>\r
                    <p class="notas-empty-sub">Documenta el seguimiento de esta cotizaci\xF3n agregando la primera nota.</p>\r
                </div>\r
            </div>\r
        </div>\r
\r
        <div class="notas-editor">\r
            <label class="notas-editor-label" for="nota-cotizacion-textarea">{{ notaEditando ? 'Editar nota' : 'Nueva nota' }}</label>\r
            <textarea id="nota-cotizacion-textarea" class="nota-textarea" rows="3" [(ngModel)]="notaText" placeholder="Escribe una nota para esta cotizaci\xF3n..."></textarea>\r
            <div class="notas-editor-actions">\r
                <button type="button" class="notas-btn-ghost" (click)="notaEditando = null; notaText = ''">Cancelar</button>\r
                <button type="button" class="notas-btn-primary" (click)="guardarNotaQuote()" [disabled]="!notaText.trim() || notaLoading">\r
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>\r
                    {{ notaEditando ? 'Actualizar' : 'Agregar nota' }}\r
                </button>\r
            </div>\r
        </div>\r
\r
        <div class="notas-footer">\r
            <span class="notas-count">\r
                <span class="notas-count-badge">{{ notasCotizacion.length }}</span>\r
                {{ notasCotizacion.length === 1 ? 'nota registrada' : 'notas registradas' }}\r
            </span>\r
            <button type="button" class="notas-btn-ghost" (click)="cerrarNotasQuote()">Cerrar</button>\r
        </div>\r
    </div>\r
</div>\r
\r
<!-- MODAL DE CONFIRMACI\xD3N (ELIMINAR NOTA) -->\r
<div class="modal-overlay" *ngIf="showNotaConfirmModal" (click)="cancelarEliminarNota()">\r
    <div class="modal-content" (click)="$event.stopPropagation()">\r
        <div class="modal-heading modal-heading-warning">\r
            <span class="modal-icon">\r
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>\r
            </span>\r
            <div><span class="modal-eyebrow">Confirmaci\xF3n</span><h3>Eliminar nota</h3></div>\r
        </div>\r
        <p>\r
            \xBFEst\xE1s seguro de que deseas eliminar esta nota?\r
            <br>\r
            <span class="warning-copy">\r
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>\r
                Esta operaci\xF3n no se puede deshacer.\r
            </span>\r
        </p>\r
        <div class="modal-actions">\r
            <button class="btn-cancel" (click)="cancelarEliminarNota()">Cancelar</button>\r
            <button class="btn-confirm" (click)="confirmarEliminarNota()" [disabled]="notaLoading">\r
                {{ notaLoading ? 'Eliminando...' : 'Eliminar' }}\r
            </button>\r
        </div>\r
    </div>\r
</div>\r
\r
<!-- MODAL DE COTIZACI\xD3N -->\r
<div class="modal-overlay" *ngIf="showModal" (click)="cerrarModalFondo($event)">\r
    <div class="modal-container" (click)="$event.stopPropagation()">\r
        <button class="modal-close" (click)="cerrarModal()" title="Cerrar">\r
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
                <line x1="18" y1="6" x2="6" y2="18" />\r
                <line x1="6" y1="6" x2="18" y2="18" />\r
            </svg>\r
        </button>\r
        <div class="modal-body">\r
            <app-quote-breakdown [calculation]="selectedQuote()" [mostrarGuardar]="false" (saveQuote)="cerrarModal()" />\r
        </div>\r
    </div>\r
</div>\r
\r
<!-- TOASTS -->\r
<div class="toast-host">\r
    <div *ngFor="let t of toastService.toasts()" class="toast" [class]="'toast-' + t.type"\r
        (click)="handleToast(t)">\r
        <span class="toast-icon">{{ t.type === 'success' ? '\u2713' : t.type === 'error' ? '\u2715' : '\u2139' }}</span>\r
        <span class="toast-msg">{{ t.message }}</span>\r
        <span class="toast-action" *ngIf="t.actionLabel">{{ t.actionLabel }}</span>\r
        <button class="toast-close" (click)="toastService.dismiss(t.id); $event.stopPropagation()" aria-label="Cerrar">\xD7</button>\r
    </div>\r
</div>\r
`, styles: ['/* src/app/components/admin/admin-quotes/admin-quotes.component.css */\n.quotes-panel {\n  position: relative;\n  max-width: 1400px;\n  margin: 0 auto;\n  padding: 0;\n  overflow: hidden;\n}\n.quotes-panel::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 38%;\n  height: 190px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(32, 176, 56, 0.14),\n      rgba(16, 37, 31, 0.07));\n  clip-path: polygon(35% 0, 100% 0, 100% 100%, 0 100%);\n  pointer-events: none;\n}\n.quotes-panel .page-header {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-end;\n  min-height: 152px;\n  margin: 0 0 1.15rem;\n  padding: 1.5rem 1.75rem;\n  border: 1px solid rgba(139, 226, 140, 0.22);\n  border-radius: 16px;\n  background:\n    linear-gradient(\n      115deg,\n      #10251f 0%,\n      #173c2e 68%,\n      #1f6840 100%);\n  box-shadow: 0 16px 30px rgba(16, 37, 31, 0.16);\n}\n.quotes-panel .page-heading {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 0.3rem;\n}\n.quotes-panel .page-heading h2 {\n  margin: 0;\n  color: var(--text-on-accent);\n  font-size: 2rem;\n  line-height: 1;\n}\n.quotes-panel .page-heading p {\n  max-width: 520px;\n  margin: 0;\n  color: #bdd6c7;\n  font-size: 0.88rem;\n}\n.page-kicker {\n  color: #8be28c;\n  font-size: 0.68rem;\n  font-weight: 700;\n  letter-spacing: 1.2px;\n  text-transform: uppercase;\n}\n.quotes-panel .badge {\n  padding: 0.3rem 0.7rem;\n  border: 1px solid rgba(139, 226, 140, 0.3);\n  border-radius: 6px;\n  background: rgba(255, 255, 255, 0.08);\n  color: #d5f0dc;\n  font-size: 0.72rem;\n}\n.quote-summary {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.4rem;\n  margin-top: 0.65rem;\n}\n.quote-summary .badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  min-height: 26px;\n}\n.quote-summary .badge strong {\n  font-size: 0.85rem;\n  color: var(--text-on-accent);\n}\n.quote-summary .badge-recent {\n  border-color: rgba(147, 197, 253, 0.3);\n  color: #bfdbfe;\n}\n.quote-summary .badge-reviewed {\n  border-color: rgba(139, 226, 140, 0.35);\n  color: #b7efbd;\n}\n.quote-summary .badge-pending {\n  border-color: rgba(253, 186, 116, 0.35);\n  color: #fed7aa;\n}\n.quote-summary .badge-urgent {\n  border-color: rgba(252, 165, 165, 0.35);\n  color: #fecaca;\n}\n.quotes-panel .toolbar {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 0.6rem;\n  margin: 0 0 0.8rem;\n  padding: 0.6rem 0.75rem;\n  border: 1px solid var(--border-color);\n  border-radius: 14px;\n  background: var(--surface-card);\n  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.05);\n  position: relative;\n  z-index: 1;\n}\n.search-wrapper {\n  position: relative;\n  flex: 1 1 240px;\n  display: flex;\n  align-items: center;\n}\n.search-icon {\n  position: absolute;\n  left: 0.8rem;\n  width: 17px;\n  height: 17px;\n  fill: none;\n  stroke: var(--accent-silver);\n  stroke-width: 2;\n  stroke-linecap: round;\n  pointer-events: none;\n}\n.search-input {\n  width: 100%;\n  min-height: 38px;\n  padding: 0.4rem 2.3rem 0.4rem 2.4rem;\n  border: 1px solid var(--input-border);\n  border-radius: 9px;\n  font-size: 0.9rem;\n  background: var(--surface-subtle);\n  color: var(--text-silver);\n  transition:\n    border-color 0.2s ease,\n    box-shadow 0.2s ease,\n    background 0.2s ease;\n}\n.search-input::placeholder {\n  color: var(--accent-silver);\n}\n.search-input:focus {\n  outline: none;\n  border-color: var(--accent-green);\n  background: var(--surface-card);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.1);\n}\n.search-clear {\n  position: absolute;\n  right: 0.45rem;\n  width: 24px;\n  height: 24px;\n  border: 0;\n  border-radius: 50%;\n  background: var(--surface-muted);\n  color: var(--text-muted);\n  font-size: 1rem;\n  line-height: 1;\n  cursor: pointer;\n}\n.search-clear:hover {\n  background: var(--input-border);\n  color: var(--text-main);\n}\n.chip-group {\n  display: inline-flex;\n  gap: 0.3rem;\n  padding: 0.22rem;\n  border-radius: 999px;\n  background: var(--surface-hover);\n}\n.chip {\n  padding: 0.35rem 0.85rem;\n  border: 0;\n  border-radius: 999px;\n  background: transparent;\n  color: var(--text-muted);\n  font-size: 0.78rem;\n  font-weight: 700;\n  cursor: pointer;\n  transition:\n    background 0.18s,\n    color 0.18s,\n    box-shadow 0.18s;\n}\n.chip:hover {\n  color: var(--text-silver);\n}\n.chip.is-active {\n  background: var(--surface-card);\n  color: var(--accent-green-dark);\n  box-shadow: 0 3px 8px rgba(15, 23, 42, 0.12);\n}\n.toolbar-select {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n}\n.toolbar-select svg {\n  position: absolute;\n  left: 0.7rem;\n  width: 15px;\n  height: 15px;\n  fill: none;\n  stroke: var(--accent-silver);\n  stroke-width: 1.9;\n  stroke-linecap: round;\n  pointer-events: none;\n}\n.toolbar-select select {\n  min-height: 38px;\n  max-width: 220px;\n  padding: 0.4rem 1.9rem 0.4rem 2rem;\n  border: 1px solid var(--input-border);\n  border-radius: 9px;\n  background: var(--surface-subtle);\n  color: var(--text-silver);\n  font-size: 0.85rem;\n  cursor: pointer;\n  appearance: none;\n  transition: border-color 0.2s, box-shadow 0.2s;\n}\n.toolbar-select select:focus {\n  outline: none;\n  border-color: var(--accent-green);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.1);\n}\n.results-count {\n  flex: 0 0 auto;\n  margin-left: auto;\n  color: var(--text-muted);\n  font-size: 0.8rem;\n  white-space: nowrap;\n}\n.btn-secondary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.4rem;\n  min-height: 38px;\n  padding: 0.55rem 1rem;\n  border: 1px solid var(--input-border);\n  border-radius: 9px;\n  background: var(--surface-card);\n  color: var(--text-silver);\n  font-weight: 700;\n  font-size: 0.85rem;\n  cursor: pointer;\n  transition: all 0.18s ease;\n}\n.btn-secondary:hover {\n  background: var(--surface-hover);\n  border-color: var(--border-strong);\n}\n.filters-row {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.8rem;\n  margin: 0 0 1.15rem;\n  position: relative;\n  z-index: 1;\n}\n.filter-group {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n  padding: 0.35rem 0.55rem;\n  border: 1px solid var(--surface-muted);\n  border-radius: 8px;\n  background: var(--surface-subtle);\n}\n.filter-group label {\n  font-size: 0.75rem;\n  font-weight: 700;\n  color: var(--text-silver);\n  text-transform: uppercase;\n  letter-spacing: 0.3px;\n  white-space: nowrap;\n}\n.filter-input {\n  padding: 0.4rem 0.8rem;\n  min-height: 36px;\n  border: 1px solid var(--input-border);\n  border-radius: 8px;\n  font-size: 0.9rem;\n  background: var(--surface-subtle);\n  transition: 0.2s;\n  color: var(--text-silver);\n}\n.filter-input:focus {\n  outline: none;\n  border-color: var(--accent-green);\n  background: var(--surface-card);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.1);\n}\n.date-range,\n.price-range {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n}\n.date-range .filter-input {\n  width: 130px;\n}\n.price-range .filter-input {\n  width: 100px;\n}\n.cards-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));\n  gap: 1.15rem;\n  position: relative;\n  z-index: 1;\n}\n.quote-card {\n  background: var(--surface-card);\n  border-radius: 13px;\n  border: 1px solid var(--border-color);\n  padding: 1.2rem;\n  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.05);\n  transition:\n    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),\n    box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1),\n    border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  will-change: transform;\n  animation: fadeInUp 0.45s ease forwards;\n  opacity: 0;\n  transform: translateY(20px) scale(0.98);\n}\n.quote-card:hover {\n  transform: translateY(-6px) scale(1.005);\n  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.08);\n  border-color: #8bd39a;\n}\n.quote-card:active {\n  transform: scale(0.98);\n  transition-duration: 0.1s;\n}\n@keyframes fadeInUp {\n  from {\n    opacity: 0;\n    transform: translateY(20px) scale(0.98);\n  }\n  100% {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n.card-color-indicator {\n  width: 100%;\n  height: 4px;\n  border-radius: 4px 4px 0 0;\n  margin-bottom: 0.8rem;\n}\n.card-color-indicator.color-reciente {\n  background: var(--info);\n}\n.card-color-indicator.color-verde {\n  background: #22c55e;\n}\n.card-color-indicator.color-amarillo {\n  background: #f59e0b;\n}\n.card-color-indicator.color-rojo {\n  background: var(--danger-bright);\n}\n.card-body-grid {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 0.5rem;\n}\n.card-left {\n  flex: 1;\n}\n.client-info {\n  display: flex;\n  align-items: center;\n  gap: 0.7rem;\n}\n.client-avatar {\n  width: 40px;\n  height: 40px;\n  border-radius: 11px;\n  background: var(--accent-green-light);\n  color: var(--accent-green-dark);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: 1.1rem;\n  flex-shrink: 0;\n}\n.client-name {\n  font-weight: 700;\n  font-size: 1rem;\n  color: var(--text-main);\n  line-height: 1.2;\n}\n.vehicle-name {\n  font-size: 0.85rem;\n  color: var(--text-silver);\n  margin-top: 0.1rem;\n}\n.card-right {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 0.3rem;\n  flex-shrink: 0;\n}\n.price-tag {\n  font-weight: 700;\n  font-size: 1.2rem;\n  color: var(--accent-green-dark);\n}\n.status-badge {\n  display: inline-block;\n  font-size: 0.65rem;\n  font-weight: 700;\n  padding: 0.15rem 0.7rem;\n  border-radius: 20px;\n  text-transform: uppercase;\n  letter-spacing: 0.3px;\n  background: var(--border-color);\n  color: var(--text-silver);\n  border: none;\n}\n.status-badge.color-reciente {\n  background: var(--info-bg);\n  color: var(--info);\n}\n.status-badge.color-verde {\n  background: #bbf7d0;\n  color: var(--accent-green-dark);\n}\n.status-badge.color-amarillo {\n  background: var(--warning-bg);\n  color: var(--warning);\n}\n.status-badge.color-rojo {\n  background: var(--danger-bg);\n  color: var(--danger);\n}\n.card-details {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 0.5rem;\n  padding: 0.5rem 0 0.8rem;\n  border-top: 1px solid var(--surface-hover);\n  margin-top: 0.5rem;\n}\n.detail-item {\n  display: flex;\n  flex-direction: column;\n}\n.detail-label {\n  font-size: 0.6rem;\n  text-transform: uppercase;\n  letter-spacing: 0.4px;\n  color: var(--accent-silver);\n  font-weight: 600;\n}\n.detail-value {\n  font-weight: 600;\n  font-size: 0.9rem;\n  color: var(--text-main);\n}\n.card-footer {\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  gap: 0.35rem;\n  border-top: 1px solid var(--border-color);\n  padding-top: 0.8rem;\n  margin-top: 0.2rem;\n}\n.action-buttons {\n  display: inline-flex;\n  gap: 0.35rem;\n}\n.btn-icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 34px;\n  height: 34px;\n  border: 1px solid transparent;\n  border-radius: 9px;\n  background: transparent;\n  cursor: pointer;\n  transition: all 0.18s ease;\n}\n.btn-icon svg {\n  width: 17px;\n  height: 17px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 1.9;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.btn-icon:focus-visible {\n  outline: 3px solid rgba(32, 176, 56, 0.35);\n  outline-offset: 2px;\n}\n.btn-fijar {\n  color: var(--text-muted);\n}\n.btn-fijar:hover {\n  background: var(--accent-green-light);\n  color: var(--accent-green-dark);\n  border-color: #8bd39a;\n}\n.btn-fijar.is-pinned {\n  background: var(--accent-green-light);\n  color: var(--accent-green-dark);\n  border-color: #8bd39a;\n}\n.btn-fijar.is-pinned svg {\n  fill: currentColor;\n}\n.btn-view {\n  color: var(--text-muted);\n}\n.btn-view:hover {\n  background: var(--info-bg);\n  color: var(--info);\n  border-color: var(--info-border);\n}\n.notas-counter {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  padding: 0.25rem 0.7rem;\n  border-radius: 20px;\n  background: rgba(32, 176, 56, 0.1);\n  border: 1px solid rgba(32, 176, 56, 0.3);\n  color: var(--accent-green);\n  font-size: 0.75rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.18s ease;\n  flex-shrink: 0;\n}\n.notas-counter svg {\n  width: 15px;\n  height: 15px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 1.9;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.notas-counter .notas-counter-num {\n  font-weight: 800;\n}\n.notas-counter .notas-counter-label {\n  font-size: 0.72rem;\n  opacity: 0.85;\n}\n.notas-counter:hover {\n  background: rgba(32, 176, 56, 0.18);\n  color: var(--accent-green-dark);\n}\n.modal-overlay {\n  position: fixed;\n  inset: 0;\n  z-index: 1000;\n  background: rgba(15, 23, 42, 0.5);\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 1rem;\n  animation: fadeIn 0.2s ease;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.modal-content {\n  background: var(--surface-card);\n  border-radius: 18px;\n  box-shadow: 0 30px 70px -20px rgba(15, 23, 42, 0.4);\n  max-width: 640px;\n  width: 90%;\n  max-height: 92vh;\n  overflow-y: auto;\n  position: relative;\n  border: 1px solid var(--border-color);\n  animation: riseIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);\n}\n@keyframes riseIn {\n  from {\n    opacity: 0;\n    transform: translateY(18px) scale(0.97);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n.modal-container {\n  background: var(--surface-card);\n  border-radius: 20px;\n  max-width: 1100px;\n  width: 100%;\n  max-height: 90vh;\n  overflow-y: auto;\n  position: relative;\n  border: 1px solid var(--border-color);\n  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.25);\n  animation: riseIn 0.3s ease;\n}\n.modal-container::-webkit-scrollbar {\n  width: 6px;\n}\n.modal-container::-webkit-scrollbar-track {\n  background: var(--surface-hover);\n  border-radius: 10px;\n}\n.modal-container::-webkit-scrollbar-thumb {\n  background: var(--accent-silver);\n  border-radius: 10px;\n}\n.modal-container::-webkit-scrollbar-thumb:hover {\n  background: var(--text-muted);\n}\n.modal-body {\n  padding: 0.5rem 2rem 2rem 2rem;\n  clear: both;\n}\n.modal-close {\n  position: absolute;\n  top: 0.8rem;\n  right: 0.8rem;\n  width: 34px;\n  height: 34px;\n  border: none;\n  border-radius: 50%;\n  background: transparent;\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.16s ease;\n}\n.modal-close:hover {\n  background: rgba(0, 0, 0, 0.06);\n  color: var(--text-primary);\n}\n.modal-heading {\n  display: flex;\n  align-items: center;\n  gap: 0.7rem;\n  padding: 1.1rem 1.25rem;\n  border-bottom: 1px solid var(--border-color);\n}\n.modal-heading .modal-icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 38px;\n  height: 38px;\n  border-radius: 10px;\n  background: var(--accent-green-light);\n  color: var(--accent-green-dark);\n  flex-shrink: 0;\n}\n.modal-heading .modal-icon svg {\n  width: 20px;\n  height: 20px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 1.8;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.modal-heading > div {\n  display: flex;\n  flex-direction: column;\n  gap: 0.1rem;\n}\n.modal-heading .modal-eyebrow {\n  font-size: 0.68rem;\n  color: var(--text-secondary);\n  text-transform: uppercase;\n  letter-spacing: 0.6px;\n  font-weight: 600;\n}\n.modal-heading h3 {\n  margin: 0;\n  font-size: 1.05rem;\n  color: var(--text-primary);\n  font-weight: 700;\n}\n.modal-heading.modal-heading-notes {\n  border-color: rgba(139, 226, 140, 0.3);\n}\n.modal-heading.modal-heading-notes .modal-icon {\n  background: rgba(34, 197, 138, 0.14);\n}\n.notas-overlay {\n  position: fixed;\n  inset: 0;\n  z-index: 1000;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 1.25rem;\n  background:\n    radial-gradient(\n      60% 50% at 50% 0%,\n      rgba(34, 197, 94, 0.1),\n      transparent 70%),\n    rgba(9, 14, 25, 0.58);\n  backdrop-filter: blur(10px) saturate(140%);\n  -webkit-backdrop-filter: blur(10px) saturate(140%);\n  animation: notasFadeIn 0.24s ease;\n}\n@keyframes notasFadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.notas-modal {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  width: min(560px, 100%);\n  max-height: min(88vh, 780px);\n  overflow: hidden;\n  background: var(--surface-card);\n  border: 1px solid var(--border-color);\n  border-radius: 20px;\n  box-shadow: 0 40px 90px -28px rgba(9, 14, 25, 0.55), 0 20px 45px -24px rgba(32, 176, 56, 0.22);\n  animation: notasRiseIn 0.34s cubic-bezier(0.16, 1, 0.3, 1);\n}\n@keyframes notasRiseIn {\n  from {\n    opacity: 0;\n    transform: translateY(18px) scale(0.97);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n.notas-modal::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 3px;\n  z-index: 1;\n  background:\n    linear-gradient(\n      90deg,\n      var(--accent-green-dark),\n      var(--accent-green-bright) 55%,\n      transparent);\n}\n.notas-header {\n  display: flex;\n  align-items: center;\n  gap: 0.9rem;\n  padding: 1.15rem 1.3rem 1.05rem;\n  border-bottom: 1px solid var(--border-color);\n  background:\n    linear-gradient(\n      180deg,\n      var(--accent-green-light),\n      transparent 75%);\n  flex-shrink: 0;\n}\n.notas-icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 44px;\n  height: 44px;\n  flex-shrink: 0;\n  border-radius: 13px;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-green) 0%,\n      var(--accent-green-dark) 100%);\n  color: var(--text-on-accent);\n  box-shadow: 0 10px 22px -8px rgba(32, 176, 56, 0.6);\n}\n.notas-icon svg {\n  width: 21px;\n  height: 21px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 1.8;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.notas-titles {\n  display: flex;\n  flex-direction: column;\n  gap: 0.15rem;\n  min-width: 0;\n}\n.notas-eyebrow {\n  font-size: 0.66rem;\n  font-weight: 800;\n  letter-spacing: 1.1px;\n  text-transform: uppercase;\n  color: var(--accent-silver);\n}\n.notas-title {\n  margin: 0;\n  font-size: 1.12rem;\n  font-weight: 700;\n  letter-spacing: -0.01em;\n  color: var(--text-main);\n}\n.notas-close {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 34px;\n  height: 34px;\n  margin-left: auto;\n  flex-shrink: 0;\n  border: none;\n  border-radius: 10px;\n  background: transparent;\n  color: var(--text-muted);\n  cursor: pointer;\n  transition:\n    background 0.16s ease,\n    color 0.16s ease,\n    transform 0.16s ease;\n}\n.notas-close:hover {\n  background: var(--surface-hover);\n  color: var(--text-main);\n}\n.notas-close:active {\n  transform: scale(0.94);\n}\n.notas-close svg {\n  width: 18px;\n  height: 18px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 2;\n  stroke-linecap: round;\n}\n.notas-body {\n  flex: 1 1 auto;\n  min-height: 0;\n  overflow-y: auto;\n  padding: 1rem 1.3rem;\n}\n.notas-body::-webkit-scrollbar {\n  width: 8px;\n}\n.notas-body::-webkit-scrollbar-thumb {\n  background: var(--border-strong);\n  border-radius: 999px;\n}\n.notas-body::-webkit-scrollbar-thumb:hover {\n  background: var(--accent-silver);\n}\n.notas-alert {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin-bottom: 0.9rem;\n  padding: 0.6rem 0.75rem;\n  border-radius: 10px;\n  background: var(--danger-bg);\n  border: 1px solid var(--danger-border);\n  color: var(--danger);\n  font-size: 0.84rem;\n  font-weight: 600;\n}\n.notas-alert svg {\n  width: 15px;\n  height: 15px;\n  flex-shrink: 0;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 2;\n  stroke-linecap: round;\n}\n.notas-loading {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.6rem;\n  padding: 2rem 0;\n  color: var(--text-muted);\n  font-size: 0.86rem;\n}\n.notas-spinner {\n  width: 18px;\n  height: 18px;\n  border-radius: 50%;\n  border: 2.5px solid var(--border-color);\n  border-top-color: var(--accent-green);\n  animation: notasSpin 0.7s linear infinite;\n}\n@keyframes notasSpin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.notas-list {\n  display: flex;\n  flex-direction: column;\n  gap: 0.6rem;\n}\n.nota-item {\n  position: relative;\n  padding: 0.8rem 2.9rem 0.8rem 0.95rem;\n  border: 1px solid var(--border-color);\n  border-radius: 14px;\n  background: var(--surface-subtle);\n  transition:\n    border-color 0.18s ease,\n    background 0.18s ease,\n    box-shadow 0.18s ease;\n}\n.nota-item:hover {\n  background: var(--surface-card);\n  border-color: rgba(32, 176, 56, 0.35);\n  box-shadow: 0 10px 24px -14px rgba(15, 23, 42, 0.28);\n}\n.nota-item.nota-editing {\n  border-color: var(--accent-green);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.12);\n}\n.nota-texto {\n  margin: 0;\n  color: var(--text-main);\n  font-size: 0.88rem;\n  line-height: 1.5;\n  white-space: pre-wrap;\n  word-break: break-word;\n}\n.nota-fecha {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.32rem;\n  margin-top: 0.55rem;\n  padding: 0.18rem 0.55rem;\n  border-radius: 999px;\n  background: var(--surface-hover);\n  border: 1px solid var(--border-color);\n  color: var(--accent-silver);\n  font-size: 0.7rem;\n  font-weight: 600;\n  font-variant-numeric: tabular-nums;\n}\n.nota-fecha svg {\n  width: 12px;\n  height: 12px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 2;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.nota-acciones {\n  position: absolute;\n  top: 0.6rem;\n  right: 0.6rem;\n  display: flex;\n  gap: 0.25rem;\n  opacity: 0;\n  transform: translateX(4px);\n  transition: opacity 0.18s ease, transform 0.18s ease;\n}\n.nota-item:hover .nota-acciones,\n.nota-item.nota-editing .nota-acciones {\n  opacity: 1;\n  transform: translateX(0);\n}\n@media (hover: none), (pointer: coarse) {\n  .nota-acciones {\n    opacity: 1;\n    transform: none;\n  }\n}\n.nota-acciones .btn-icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 30px;\n  height: 30px;\n  border: 1px solid transparent;\n  border-radius: 9px;\n  background: var(--surface-card);\n  color: var(--text-muted);\n  cursor: pointer;\n  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.1);\n  transition: all 0.16s ease;\n}\n.nota-acciones .btn-icon:hover {\n  transform: translateY(-1px);\n}\n.nota-acciones .btn-icon.btn-edit:hover {\n  background: var(--accent-green-light);\n  border-color: rgba(32, 176, 56, 0.35);\n  color: var(--accent-green-dark);\n}\n.nota-acciones .btn-icon.btn-delete:hover {\n  background: var(--danger-bg);\n  border-color: var(--danger-border);\n  color: var(--danger);\n}\n.nota-acciones .btn-icon svg {\n  width: 14px;\n  height: 14px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 1.9;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.notas-empty {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.2rem;\n  padding: 2.2rem 1rem;\n  text-align: center;\n}\n.notas-empty-icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 52px;\n  height: 52px;\n  margin-bottom: 0.5rem;\n  border-radius: 16px;\n  background: var(--surface-hover);\n  border: 1px dashed var(--border-strong);\n  color: var(--accent-silver);\n}\n.notas-empty-icon svg {\n  width: 24px;\n  height: 24px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 1.6;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.notas-empty-title {\n  margin: 0;\n  font-size: 0.92rem;\n  font-weight: 700;\n  color: var(--text-silver);\n}\n.notas-empty-sub {\n  margin: 0;\n  font-size: 0.8rem;\n  color: var(--text-muted);\n}\n.notas-editor {\n  flex-shrink: 0;\n  padding: 0.95rem 1.3rem 1.1rem;\n  border-top: 1px solid var(--border-color);\n  background: var(--surface-subtle);\n}\n.notas-editor-label {\n  display: block;\n  margin-bottom: 0.45rem;\n  font-size: 0.7rem;\n  font-weight: 800;\n  letter-spacing: 0.8px;\n  text-transform: uppercase;\n  color: var(--accent-silver);\n}\n.notas-editor-label.nota-editando-label {\n  color: var(--accent-green-dark);\n}\n.nota-textarea {\n  width: 100%;\n  min-height: 72px;\n  padding: 0.65rem 0.85rem;\n  border: 1.5px solid var(--input-border, var(--border-color));\n  border-radius: 12px;\n  background: var(--surface-card);\n  color: var(--text-main);\n  font-family: var(--font-body, inherit);\n  font-size: 0.88rem;\n  line-height: 1.5;\n  resize: vertical;\n  transition: border-color 0.18s ease, box-shadow 0.18s ease;\n}\n.nota-textarea::placeholder {\n  color: var(--text-muted);\n}\n.nota-textarea:focus {\n  outline: none;\n  border-color: var(--accent-green);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.14);\n}\n.notas-editor-actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.5rem;\n  margin-top: 0.65rem;\n}\n.notas-btn-primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.4rem;\n  min-height: 38px;\n  padding: 0.5rem 1.05rem;\n  border: none;\n  border-radius: 10px;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-green-dark),\n      var(--accent-green));\n  color: var(--text-on-accent);\n  font-size: 0.84rem;\n  font-weight: 700;\n  cursor: pointer;\n  box-shadow: 0 10px 20px -8px rgba(32, 176, 56, 0.55);\n  transition:\n    transform 0.18s ease,\n    box-shadow 0.18s ease,\n    filter 0.18s ease;\n}\n.notas-btn-primary:hover:not(:disabled) {\n  transform: translateY(-1px);\n  box-shadow: 0 14px 26px -8px rgba(32, 176, 56, 0.6);\n}\n.notas-btn-primary:disabled {\n  opacity: 0.55;\n  cursor: not-allowed;\n  transform: none;\n  box-shadow: none;\n}\n.notas-btn-primary svg {\n  width: 15px;\n  height: 15px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 2.4;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.notas-btn-ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 38px;\n  padding: 0.5rem 0.95rem;\n  border: 1px solid var(--input-border, var(--border-color));\n  border-radius: 10px;\n  background: var(--surface-card);\n  color: var(--text-silver);\n  font-size: 0.84rem;\n  font-weight: 700;\n  cursor: pointer;\n  transition: all 0.18s ease;\n}\n.notas-btn-ghost:hover {\n  background: var(--surface-hover);\n  border-color: var(--border-strong);\n  color: var(--text-main);\n}\n.notas-footer {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  flex-shrink: 0;\n  padding: 0.8rem 1.3rem;\n  border-top: 1px solid var(--border-color);\n  background: var(--surface-card);\n}\n.notas-count {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  font-size: 0.78rem;\n  font-weight: 600;\n  color: var(--text-muted);\n}\n.notas-count-badge {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 22px;\n  height: 22px;\n  padding: 0 0.4rem;\n  border-radius: 999px;\n  background: var(--accent-green-light);\n  border: 1px solid rgba(32, 176, 56, 0.3);\n  color: var(--accent-green-dark);\n  font-size: 0.72rem;\n  font-weight: 800;\n  font-variant-numeric: tabular-nums;\n}\n.notas-close:focus-visible,\n.notas-btn-primary:focus-visible,\n.notas-btn-ghost:focus-visible,\n.nota-acciones .btn-icon:focus-visible,\n.nota-textarea:focus-visible {\n  outline: 2px solid var(--accent-green);\n  outline-offset: 2px;\n}\nhtml[data-theme=dark] .notas-modal {\n  box-shadow: 0 40px 90px -28px rgba(0, 0, 0, 0.75), 0 20px 45px -24px rgba(34, 197, 94, 0.2);\n}\nhtml[data-theme=dark] .notas-header {\n  background:\n    linear-gradient(\n      180deg,\n      rgba(34, 197, 94, 0.1),\n      transparent 75%);\n}\nhtml[data-theme=dark] .notas-overlay {\n  background:\n    radial-gradient(\n      60% 50% at 50% 0%,\n      rgba(34, 197, 94, 0.08),\n      transparent 70%),\n    rgba(2, 6, 12, 0.72);\n}\n@media (max-width: 640px) {\n  .notas-overlay {\n    padding: 0.75rem;\n    align-items: flex-end;\n  }\n  .notas-modal {\n    width: 100%;\n    max-height: 92vh;\n    border-radius: 18px;\n  }\n  .notas-header,\n  .notas-body,\n  .notas-editor,\n  .notas-footer {\n    padding-left: 1rem;\n    padding-right: 1rem;\n  }\n  .notas-footer {\n    flex-direction: column-reverse;\n    align-items: stretch;\n  }\n  .notas-footer .notas-btn-ghost {\n    width: 100%;\n  }\n  .notas-editor-actions {\n    flex-direction: column-reverse;\n  }\n  .notas-editor-actions .notas-btn-primary,\n  .notas-editor-actions .notas-btn-ghost {\n    width: 100%;\n  }\n  .nota-acciones {\n    opacity: 1;\n    transform: none;\n  }\n}\n.btn-primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.4rem;\n  min-height: 40px;\n  padding: 0.55rem 1rem;\n  border: none;\n  border-radius: 9px;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-green-dark) 0%,\n      var(--accent-green) 100%);\n  color: var(--text-on-accent);\n  font-size: 0.85rem;\n  font-weight: 700;\n  cursor: pointer;\n  box-shadow: 0 10px 20px -8px rgba(32, 176, 56, 0.5);\n  transition: transform 0.18s ease, box-shadow 0.18s ease;\n}\n.btn-primary:hover:not(:disabled) {\n  transform: translateY(-1px);\n  box-shadow: 0 14px 26px -8px rgba(32, 176, 56, 0.55);\n}\n.btn-primary:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none;\n}\n.btn-secondary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.4rem;\n  min-height: 40px;\n  padding: 0.55rem 1rem;\n  border: 1px solid var(--input-border, var(--border-color));\n  border-radius: 9px;\n  background: var(--surface-card);\n  color: var(--text-silver);\n  font-size: 0.85rem;\n  font-weight: 700;\n  cursor: pointer;\n  transition: all 0.18s ease;\n}\n.btn-secondary:hover {\n  background: var(--surface-hover);\n  border-color: var(--border-strong);\n}\n.modal-actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  margin-top: 1rem;\n}\n.btn-cancel {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.4rem;\n  min-height: 40px;\n  padding: 0.55rem 1.15rem;\n  border: 1px solid var(--input-border, var(--border-color));\n  border-radius: 9px;\n  background: var(--surface-card);\n  color: var(--text-silver);\n  font-size: 0.85rem;\n  font-weight: 700;\n  cursor: pointer;\n  transition: all 0.18s ease;\n}\n.btn-cancel:hover {\n  background: var(--surface-hover);\n  border-color: var(--border-strong);\n}\n.btn-confirm {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.4rem;\n  min-height: 40px;\n  padding: 0.55rem 1.3rem;\n  border: none;\n  border-radius: 9px;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-green-dark),\n      var(--accent-green));\n  color: var(--text-on-accent);\n  font-size: 0.85rem;\n  font-weight: 700;\n  cursor: pointer;\n  transition: all 0.18s ease;\n  box-shadow: 0 10px 20px -8px rgba(32, 176, 56, 0.5);\n}\n.btn-confirm:hover:not(:disabled) {\n  transform: translateY(-1px);\n  box-shadow: 0 14px 26px -8px rgba(32, 176, 56, 0.55);\n}\n.btn-confirm:disabled {\n  opacity: 0.6;\n  cursor: wait;\n  transform: none;\n}\n.btn-primary:focus-visible,\n.btn-secondary:focus-visible,\n.btn-cancel:focus-visible,\n.btn-confirm:focus-visible,\n.notas-counter:focus-visible,\n.btn-icon:focus-visible {\n  outline: 2px solid var(--accent-green);\n  outline-offset: 2px;\n}\n.toast-host {\n  position: fixed;\n  bottom: 1.5rem;\n  right: 1.5rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.6rem;\n  z-index: 2000;\n}\n.toast {\n  min-width: 260px;\n  padding: 0.8rem 1rem;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  box-shadow: 0 16px 34px -10px rgba(15, 23, 42, 0.35);\n  animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);\n  color: var(--surface-card);\n  font-size: 0.85rem;\n  position: relative;\n  overflow: hidden;\n  cursor: pointer;\n}\n.toast-success {\n  background:\n    linear-gradient(\n      135deg,\n      #14532d,\n      var(--accent-green-dark));\n}\n.toast-error {\n  background:\n    linear-gradient(\n      135deg,\n      #7f1d1d,\n      var(--danger));\n}\n.toast-info {\n  background: var(--text-main);\n}\n.toast-icon {\n  font-size: 1.1rem;\n  font-weight: 700;\n}\n.toast-msg {\n  flex: 1;\n}\n.toast-action {\n  padding: 0.28rem 0.65rem;\n  border-radius: 8px;\n  background: var(--surface-card);\n  color: var(--accent-green-dark);\n  font-size: 0.75rem;\n  font-weight: 800;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  white-space: nowrap;\n}\n.toast-close {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 22px;\n  height: 22px;\n  border: 0;\n  border-radius: 50%;\n  background: transparent;\n  color: rgba(255, 255, 255, 0.75);\n  font-size: 1rem;\n  cursor: pointer;\n}\n.toast-close:hover {\n  background: rgba(255, 255, 255, 0.15);\n  color: var(--surface-card);\n}\n@media (max-width: 992px) {\n  .cards-grid,\n  .skeleton-grid {\n    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));\n  }\n}\n@media (max-width: 768px) {\n  .quotes-panel .page-header {\n    min-height: 0;\n    align-items: stretch;\n    padding: 1.25rem;\n  }\n  .quotes-panel .page-heading h2 {\n    font-size: 1.7rem;\n  }\n  .quotes-panel .toolbar {\n    flex-direction: column;\n    align-items: stretch;\n    padding: 0.8rem;\n  }\n  .search-wrapper {\n    flex: 1 1 auto;\n  }\n  .chip-group {\n    align-self: flex-start;\n    flex-wrap: wrap;\n    border-radius: 14px;\n  }\n  .toolbar-select select {\n    max-width: none;\n    width: 100%;\n  }\n  .results-count {\n    margin-left: 0;\n  }\n  .filters-row {\n    flex-direction: column;\n    align-items: stretch;\n    gap: 0.8rem;\n  }\n  .filter-group {\n    width: 100%;\n    padding: 0;\n    border: 0;\n    background: transparent;\n  }\n  .date-range,\n  .price-range {\n    justify-content: space-between;\n  }\n  .date-range .filter-input,\n  .price-range .filter-input {\n    width: 45%;\n  }\n  .cards-grid,\n  .skeleton-grid {\n    grid-template-columns: 1fr;\n  }\n  .card-body-grid {\n    flex-direction: column;\n  }\n  .card-right {\n    align-items: flex-start;\n    width: 100%;\n    margin-top: 0.5rem;\n  }\n  .card-details {\n    grid-template-columns: 1fr 1fr;\n  }\n  .modal-container {\n    max-height: 95vh;\n    border-radius: 16px;\n  }\n  .modal-body {\n    padding: 0.5rem 1rem 1rem 1rem;\n  }\n  .modal-close {\n    top: 0.4rem;\n    right: 0.4rem;\n    width: 34px;\n    height: 34px;\n  }\n  .notas-editor-actions {\n    flex-direction: column-reverse;\n  }\n  .notas-editor-actions .notas-btn-primary,\n  .notas-editor-actions .notas-btn-ghost,\n  .modal-actions .btn-cancel,\n  .modal-actions .btn-confirm {\n    width: 100%;\n    justify-content: center;\n  }\n  .toast-host {\n    right: 0.7rem;\n    bottom: 0.7rem;\n    left: 0.7rem;\n    max-width: none;\n  }\n  .btn-icon {\n    width: 40px;\n    height: 40px;\n  }\n  .chip-group .chip,\n  .toolbar .chip {\n    padding: 0.55rem 1.05rem;\n  }\n}\n@media (max-width: 480px) {\n  .date-range .filter-input,\n  .price-range .filter-input {\n    width: 100%;\n  }\n  .price-range {\n    flex-direction: column;\n    align-items: stretch;\n  }\n}\n.modal-heading-warning {\n  border-color: var(--warning-bg, rgba(253, 186, 116, 0.3));\n}\n.modal-heading-warning svg {\n  stroke: var(--warning, #f59e0b);\n}\n.modal-heading-warning h3 {\n  color: var(--warning, #f59e0b);\n}\n.warning-copy {\n  color: var(--text-secondary);\n}\n.modal-heading-warning .modal-icon {\n  background: var(--warning-bg);\n  color: var(--warning);\n}\n.warning-copy svg {\n  width: 15px;\n  height: 15px;\n  flex-shrink: 0;\n  margin-top: 1px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 1.9;\n}\n.skeleton-card {\n  height: 215px;\n  border-radius: 13px;\n  border: 1px solid var(--border-color);\n  background:\n    linear-gradient(\n      90deg,\n      var(--surface-muted) 25%,\n      var(--surface-subtle) 50%,\n      var(--surface-muted) 75%);\n  background-size: 200% 100%;\n  animation: shimmer 1.4s infinite;\n}\n.catalog-state {\n  text-align: center;\n  padding: 2.5rem 1.5rem;\n  color: var(--text-muted);\n}\n.catalog-state.empty-state {\n  min-height: 220px;\n  border: 1px dashed var(--border-strong);\n  border-radius: 14px;\n  background: var(--surface-card);\n}\n.catalog-state.empty-state > strong {\n  display: block;\n  margin-bottom: 0.35rem;\n  color: var(--text-silver);\n  font-size: 1rem;\n}\n.catalog-state.empty-state > span:last-of-type {\n  display: block;\n  color: var(--accent-silver);\n  font-size: 0.82rem;\n  margin-bottom: 1rem;\n}\n.empty-state-icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 52px;\n  height: 52px;\n  margin-bottom: 0.6rem;\n  border-radius: 14px;\n  background: var(--accent-green-light);\n  color: var(--accent-green-dark);\n}\n.empty-state-icon svg {\n  width: 24px;\n  height: 24px;\n  fill: none;\n  stroke: currentColor;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n  stroke-width: 1.7;\n}\n/*# sourceMappingURL=admin-quotes.component.css.map */\n'] }]
  }], null, { onEscapeKey: [{
    type: HostListener,
    args: ["document:keydown.escape"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminQuotesComponent, { className: "AdminQuotesComponent", filePath: "src/app/components/admin/admin-quotes/admin-quotes.ts", lineNumber: 21 });
})();
export {
  AdminQuotesComponent
};
//# debugId=3551e54b-d9b4-5c09-97f3-494e9f0d8478
//# sourceMappingURL=chunk-C5WI2TYZ.js.map
