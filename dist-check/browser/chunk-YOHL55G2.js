import {
  AdminService
} from "./chunk-WRULRPBG.js";
import {
  ToastService
} from "./chunk-74RWLUMR.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-MVJCDSIT.js";
import {
  AuthService
} from "./chunk-XCV63D25.js";
import {
  ChangeDetectorRef,
  CommonModule,
  Component,
  DatePipe,
  HostListener,
  NgForOf,
  NgIf,
  ViewChild,
  getSupabaseClient,
  inject,
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
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinterpolate,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-6KRTW2LJ.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-FDMHZOCR.js";

// src/app/components/admin/admin-sellers/admin-sellers.ts
var _c0 = ["mapContainer"];
var _c1 = ["detailMapContainer"];
var _c2 = () => [0, 1, 2, 3, 4];
function AdminSellersComponent_button_64_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 57);
    \u0275\u0275listener("click", function AdminSellersComponent_button_64_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.clearSearch());
    });
    \u0275\u0275text(1, "\xD7");
    \u0275\u0275elementEnd();
  }
}
function AdminSellersComponent_label_72_option_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 60);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const b_r4 = ctx.$implicit;
    \u0275\u0275property("value", b_r4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(b_r4);
  }
}
function AdminSellersComponent_label_72_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 38);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 11);
    \u0275\u0275element(2, "path", 12)(3, "circle", 13)(4, "path", 14)(5, "path", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "select", 42);
    \u0275\u0275twoWayListener("ngModelChange", function AdminSellersComponent_label_72_Template_select_ngModelChange_6_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.brandFilter, $event) || (ctx_r1.brandFilter = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function AdminSellersComponent_label_72_Template_select_change_6_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setBrandFilter(ctx_r1.brandFilter));
    });
    \u0275\u0275elementStart(7, "option", 58);
    \u0275\u0275text(8, "Todas las agencias");
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, AdminSellersComponent_label_72_option_9_Template, 2, 2, "option", 59);
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.brandFilter);
    \u0275\u0275control();
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.brandsList);
  }
}
function AdminSellersComponent_span_87_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 61);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r1.filteredSellers().length, " resultado(s)");
  }
}
function AdminSellersComponent_div_88_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 64);
  }
}
function AdminSellersComponent_div_88_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 62);
    \u0275\u0275template(1, AdminSellersComponent_div_88_div_1_Template, 1, 0, "div", 63);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", \u0275\u0275pureFunction0(1, _c2));
  }
}
function AdminSellersComponent_div_89_tr_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 69);
    \u0275\u0275listener("click", function AdminSellersComponent_div_89_tr_17_Template_tr_click_0_listener() {
      const seller_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openDetail(seller_r6));
    })("keydown.enter", function AdminSellersComponent_div_89_tr_17_Template_tr_keydown_enter_0_listener() {
      const seller_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openDetail(seller_r6));
    })("keydown.space", function AdminSellersComponent_div_89_tr_17_Template_tr_keydown_space_0_listener($event) {
      const seller_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.openDetail(seller_r6);
      return \u0275\u0275resetView($event.preventDefault());
    });
    \u0275\u0275elementStart(1, "td", 70)(2, "span", 71);
    \u0275\u0275text(3);
    \u0275\u0275element(4, "span", 72);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 73)(6, "strong", 74);
    \u0275\u0275listener("mouseenter", function AdminSellersComponent_div_89_tr_17_Template_strong_mouseenter_6_listener($event) {
      const seller_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.mostrarNotasTooltip($event, seller_r6));
    })("mouseleave", function AdminSellersComponent_div_89_tr_17_Template_strong_mouseleave_6_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.ocultarNotasTooltip());
    });
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "small");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "td", 75)(11, "span", 76);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "td", 77);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(14, "svg", 78);
    \u0275\u0275element(15, "path", 79)(16, "circle", 80);
    \u0275\u0275elementEnd();
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(18, "td", 81)(19, "strong", 82);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "td", 83)(22, "button", 84);
    \u0275\u0275listener("click", function AdminSellersComponent_div_89_tr_17_Template_button_click_22_listener($event) {
      const seller_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.toggleSellerStatus(seller_r6);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275element(23, "span", 85);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "span", 86);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "td", 87);
    \u0275\u0275listener("click", function AdminSellersComponent_div_89_tr_17_Template_td_click_26_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(27, "div", 88)(28, "button", 89);
    \u0275\u0275listener("click", function AdminSellersComponent_div_89_tr_17_Template_button_click_28_listener() {
      const seller_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.abrirNotas(seller_r6));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(29, "svg", 11);
    \u0275\u0275element(30, "path", 90)(31, "path", 91)(32, "path", 92);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(33, "button", 93);
    \u0275\u0275listener("click", function AdminSellersComponent_div_89_tr_17_Template_button_click_33_listener() {
      const seller_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openEditSeller(seller_r6));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(34, "svg", 11);
    \u0275\u0275element(35, "path", 94)(36, "path", 95);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(37, "button", 96);
    \u0275\u0275listener("click", function AdminSellersComponent_div_89_tr_17_Template_button_click_37_listener() {
      const seller_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.deleteSeller(seller_r6.id));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(38, "svg", 11);
    \u0275\u0275element(39, "path", 39)(40, "path", 97)(41, "path", 98)(42, "path", 99)(43, "path", 100);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const seller_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("is-selected", ctx_r1.selectedSellerCardId === seller_r6.id);
    \u0275\u0275attribute("aria-label", "Ver detalle de " + seller_r6.full_name);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r1.getAvatarClass(seller_r6.full_name));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getInitials(seller_r6.full_name), " ");
    \u0275\u0275advance();
    \u0275\u0275classProp("is-on", seller_r6.active ?? true);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(seller_r6.full_name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(seller_r6.seller_number || "-");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(seller_r6.agency_brand || "\u2014");
    \u0275\u0275advance();
    \u0275\u0275property("title", seller_r6.agency_location || "-");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", seller_r6.agency_location || "-", " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(seller_r6.quote_count || 0);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("is-on", seller_r6.active ?? true);
    \u0275\u0275property("title", "Cambiar estado (" + ctx_r1.getStatusLabel(seller_r6.active ?? true) + ")");
    \u0275\u0275attribute("aria-checked", seller_r6.active ?? true);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.getStatusLabel(seller_r6.active ?? true));
  }
}
function AdminSellersComponent_div_89_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 65)(1, "table", 66)(2, "thead")(3, "tr")(4, "th");
    \u0275\u0275text(5, "Vendedor");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7, "Agencia");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "Ubicaci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "Cotizaciones");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "Estado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 67);
    \u0275\u0275text(15, "Acciones");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "tbody");
    \u0275\u0275template(17, AdminSellersComponent_div_89_tr_17_Template, 44, 19, "tr", 68);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(17);
    \u0275\u0275property("ngForOf", ctx_r1.filteredSellers());
  }
}
function AdminSellersComponent_div_90_button_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 110);
    \u0275\u0275listener("click", function AdminSellersComponent_div_90_button_11_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.clearFilters());
    });
    \u0275\u0275text(1, "Limpiar filtros");
    \u0275\u0275elementEnd();
  }
}
function AdminSellersComponent_div_90_button_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 111);
    \u0275\u0275listener("click", function AdminSellersComponent_div_90_button_12_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openNewSeller());
    });
    \u0275\u0275text(1, "+ Nuevo Vendedor");
    \u0275\u0275elementEnd();
  }
}
function AdminSellersComponent_div_90_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 101)(1, "span", 102);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 103);
    \u0275\u0275element(3, "path", 104)(4, "circle", 105)(5, "path", 106)(6, "path", 107);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(7, "strong");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275template(11, AdminSellersComponent_div_90_button_11_Template, 2, 0, "button", 108)(12, AdminSellersComponent_div_90_button_12_Template, 2, 0, "button", 109);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.sellers().length === 0 ? "A\xFAn no hay vendedores registrados" : "Sin resultados");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.sellers().length === 0 ? "Agrega tu primer vendedor para empezar." : "Ajusta tu b\xFAsqueda o los filtros.");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.sellers().length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.sellers().length === 0);
  }
}
function AdminSellersComponent_div_91_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 112)(1, "div", 113);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 11);
    \u0275\u0275element(3, "path", 90)(4, "path", 91)(5, "path", 92);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275text(7, "Notas del vendedor");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 114);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("left", ctx_r1.sellerTooltipPosition.x, "px")("top", ctx_r1.sellerTooltipPosition.y, "px");
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r1.sellerTooltipContent);
  }
}
function AdminSellersComponent_div_93_span_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 120);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r10 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r10.actionLabel);
  }
}
function AdminSellersComponent_div_93_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 115);
    \u0275\u0275listener("click", function AdminSellersComponent_div_93_Template_div_click_0_listener() {
      const t_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.handleToast(t_r10));
    });
    \u0275\u0275elementStart(1, "span", 116);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 117);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, AdminSellersComponent_div_93_span_5_Template, 2, 1, "span", 118);
    \u0275\u0275elementStart(6, "button", 119);
    \u0275\u0275listener("click", function AdminSellersComponent_div_93_Template_button_click_6_listener($event) {
      const t_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.toastService.dismiss(t_r10.id);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275text(7, "\xD7");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r10 = ctx.$implicit;
    \u0275\u0275classMap("toast-" + t_r10.type);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r10.type === "success" ? "\u2713" : t_r10.type === "error" ? "\u2715" : "\u2139");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r10.message);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", t_r10.actionLabel);
  }
}
function AdminSellersComponent_div_94_span_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 140);
    \u0275\u0275text(1, "Sin coordenadas guardadas");
    \u0275\u0275elementEnd();
  }
}
function AdminSellersComponent_div_94_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 121);
    \u0275\u0275listener("click", function AdminSellersComponent_div_94_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeDetail());
    });
    \u0275\u0275elementStart(1, "aside", 122);
    \u0275\u0275listener("click", function AdminSellersComponent_div_94_Template_aside_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 123)(3, "div", 124)(4, "span", 125);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div")(7, "span", 5);
    \u0275\u0275text(8, "Detalle del vendedor");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "h3");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 126);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "button", 127);
    \u0275\u0275listener("click", function AdminSellersComponent_div_94_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeDetail());
    });
    \u0275\u0275text(14, "\xD7");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 128)(16, "div", 129)(17, "div", 130)(18, "strong");
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "small");
    \u0275\u0275text(21, "Cotizaciones");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 130)(23, "span", 76);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "small");
    \u0275\u0275text(26, "Agencia");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 130)(28, "strong");
    \u0275\u0275text(29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "small");
    \u0275\u0275text(31, "N\xB0 de contacto");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(32, "div", 131)(33, "h4");
    \u0275\u0275text(34, "Ubicaci\xF3n de la sucursal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "p", 132);
    \u0275\u0275text(36);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "div", 133);
    \u0275\u0275element(38, "div", 134, 0);
    \u0275\u0275template(40, AdminSellersComponent_div_94_span_40_Template, 2, 0, "span", 135);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(41, "div", 131)(42, "h4");
    \u0275\u0275text(43, "Notas de seguimiento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "button", 136);
    \u0275\u0275listener("click", function AdminSellersComponent_div_94_Template_button_click_44_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.abrirNotas(ctx_r1.detailSeller));
    });
    \u0275\u0275text(45, "\u{1F4AC} Ver y administrar notas");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(46, "div", 137)(47, "button", 138);
    \u0275\u0275listener("click", function AdminSellersComponent_div_94_Template_button_click_47_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openEditSeller(ctx_r1.detailSeller));
    });
    \u0275\u0275text(48, "Editar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "button", 139);
    \u0275\u0275listener("click", function AdminSellersComponent_div_94_Template_button_click_49_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.deleteSeller(ctx_r1.detailSeller.id));
    });
    \u0275\u0275text(50, "Eliminar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "button", 6);
    \u0275\u0275listener("click", function AdminSellersComponent_div_94_Template_button_click_51_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.abrirNotas(ctx_r1.detailSeller));
    });
    \u0275\u0275text(52, "Notas");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275classMap(ctx_r1.getAvatarClass(ctx_r1.detailSeller.full_name));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getInitials(ctx_r1.detailSeller.full_name));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.detailSeller.full_name);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.getStatusClass(ctx_r1.detailSeller.active ?? true));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getStatusLabel(ctx_r1.detailSeller.active ?? true));
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.detailSeller.quote_count || 0);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.detailSeller.agency_brand || "\u2014");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.detailSeller.seller_number || "\u2014");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.detailSeller.agency_location || "Sin ubicaci\xF3n registrada");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", !ctx_r1.detailSeller.latitude || !ctx_r1.detailSeller.longitude);
  }
}
function AdminSellersComponent_div_95_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 141);
    \u0275\u0275listener("click", function AdminSellersComponent_div_95_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelModal());
    });
    \u0275\u0275elementStart(1, "div", 142);
    \u0275\u0275listener("click", function AdminSellersComponent_div_95_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 143)(3, "span", 144);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(4, "svg", 11);
    \u0275\u0275element(5, "path", 145)(6, "path", 146)(7, "path", 147);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "div")(9, "span", 148);
    \u0275\u0275text(10, "Confirmaci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "h3");
    \u0275\u0275text(12, "Eliminar vendedor");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "p");
    \u0275\u0275text(14, " \xBFEst\xE1s seguro de que deseas eliminar a ");
    \u0275\u0275elementStart(15, "strong");
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275text(17, "? ");
    \u0275\u0275element(18, "br");
    \u0275\u0275elementStart(19, "span", 149);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(20, "svg", 11);
    \u0275\u0275element(21, "path", 145)(22, "path", 146)(23, "path", 147);
    \u0275\u0275elementEnd();
    \u0275\u0275text(24);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275element(25, "br");
    \u0275\u0275text(26, " Esta operaci\xF3n no se puede deshacer. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "div", 150)(28, "button", 151);
    \u0275\u0275listener("click", function AdminSellersComponent_div_95_Template_button_click_28_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelModal());
    });
    \u0275\u0275text(29, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "button", 152);
    \u0275\u0275listener("click", function AdminSellersComponent_div_95_Template_button_click_30_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.confirmSellerDelete());
    });
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(16);
    \u0275\u0275textInterpolate(ctx_r1.getSellerName());
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1(" Esta acci\xF3n eliminar\xE1 todas sus cotizaciones (", ctx_r1.getSellerQuoteCount(), " cotizaciones). ");
    \u0275\u0275advance(6);
    \u0275\u0275property("disabled", ctx_r1.actionLoading);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.actionLoading ? "Eliminando..." : "Eliminar", " ");
  }
}
function AdminSellersComponent_div_96_div_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 163);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.formError);
  }
}
function AdminSellersComponent_div_96_div_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 164);
    \u0275\u0275element(1, "span", 165);
    \u0275\u0275text(2, " Cargando...");
    \u0275\u0275elementEnd();
  }
}
function AdminSellersComponent_div_96_form_25_ng_container_1_small_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 183);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.fieldErrors["seller_number"]);
  }
}
function AdminSellersComponent_div_96_form_25_ng_container_1_small_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small");
    \u0275\u0275text(1, "Este n\xFAmero define el acceso; no se puede modificar.");
    \u0275\u0275elementEnd();
  }
}
function AdminSellersComponent_div_96_form_25_ng_container_1_small_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 183);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.fieldErrors["full_name"]);
  }
}
function AdminSellersComponent_div_96_form_25_ng_container_1_small_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 183);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.fieldErrors["password"]);
  }
}
function AdminSellersComponent_div_96_form_25_ng_container_1_div_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 171)(1, "label");
    \u0275\u0275text(2, "Estado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "select", 184);
    \u0275\u0275twoWayListener("ngModelChange", function AdminSellersComponent_div_96_form_25_ng_container_1_div_25_Template_select_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext(4);
      \u0275\u0275twoWayBindingSet(ctx_r1.sellerForm.active, $event) || (ctx_r1.sellerForm.active = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(4, "option", 185);
    \u0275\u0275text(5, "Activo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "option", 185);
    \u0275\u0275text(7, "Inactivo");
    \u0275\u0275elementEnd()();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.sellerForm.active);
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", true);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngValue", false);
  }
}
function AdminSellersComponent_div_96_form_25_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 171)(2, "label");
    \u0275\u0275text(3, "N\xFAmero de celular *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 172);
    \u0275\u0275twoWayListener("ngModelChange", function AdminSellersComponent_div_96_form_25_ng_container_1_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.sellerForm.seller_number, $event) || (ctx_r1.sellerForm.seller_number = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function AdminSellersComponent_div_96_form_25_ng_container_1_Template_input_input_4_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.onPhoneInput($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275template(5, AdminSellersComponent_div_96_form_25_ng_container_1_small_5_Template, 2, 1, "small", 173)(6, AdminSellersComponent_div_96_form_25_ng_container_1_small_6_Template, 2, 0, "small", 167);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 171)(8, "label");
    \u0275\u0275text(9, "Nombre Completo *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "input", 174);
    \u0275\u0275twoWayListener("ngModelChange", function AdminSellersComponent_div_96_form_25_ng_container_1_Template_input_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.sellerForm.full_name, $event) || (ctx_r1.sellerForm.full_name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275template(11, AdminSellersComponent_div_96_form_25_ng_container_1_small_11_Template, 2, 1, "small", 173);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 171)(13, "label");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 175)(16, "input", 176);
    \u0275\u0275twoWayListener("ngModelChange", function AdminSellersComponent_div_96_form_25_ng_container_1_Template_input_ngModelChange_16_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.sellerForm.password, $event) || (ctx_r1.sellerForm.password = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(17, "button", 177);
    \u0275\u0275listener("click", function AdminSellersComponent_div_96_form_25_ng_container_1_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.showPassword = !ctx_r1.showPassword);
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(18, "svg", 11);
    \u0275\u0275element(19, "path", 178)(20, "circle", 179);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(21, "div", 180);
    \u0275\u0275template(22, AdminSellersComponent_div_96_form_25_ng_container_1_small_22_Template, 2, 1, "small", 173);
    \u0275\u0275elementStart(23, "button", 181);
    \u0275\u0275listener("click", function AdminSellersComponent_div_96_form_25_ng_container_1_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.generatePassword());
    });
    \u0275\u0275text(24, "\u{1F6E1} Generar contrase\xF1a segura");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(25, AdminSellersComponent_div_96_form_25_ng_container_1_div_25_Template, 8, 3, "div", 182);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275classProp("has-error", ctx_r1.formValidated && ctx_r1.fieldErrors["seller_number"]);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.sellerForm.seller_number);
    \u0275\u0275property("disabled", ctx_r1.isEditMode);
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.formValidated && ctx_r1.fieldErrors["seller_number"]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isEditMode && !ctx_r1.fieldErrors["seller_number"]);
    \u0275\u0275advance();
    \u0275\u0275classProp("has-error", ctx_r1.formValidated && ctx_r1.fieldErrors["full_name"]);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.sellerForm.full_name);
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.formValidated && ctx_r1.fieldErrors["full_name"]);
    \u0275\u0275advance();
    \u0275\u0275classProp("has-error", ctx_r1.formValidated && ctx_r1.fieldErrors["password"]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Contrase\xF1a ", ctx_r1.isEditMode ? "(opcional)" : "*");
    \u0275\u0275advance(2);
    \u0275\u0275property("placeholder", \u0275\u0275interpolate(ctx_r1.isEditMode ? "Dejar vac\xEDa conserva la actual" : "M\xEDnimo 6 caracteres"))("type", ctx_r1.showPassword ? "text" : "password");
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.sellerForm.password);
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx_r1.showPassword ? "Ocultar contrase\xF1a" : "Mostrar contrase\xF1a");
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r1.formValidated && ctx_r1.fieldErrors["password"]);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.isEditMode);
  }
}
function AdminSellersComponent_div_96_form_25_ng_container_2_option_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 60);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const brand_r18 = ctx.$implicit;
    \u0275\u0275property("value", brand_r18);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(brand_r18);
  }
}
function AdminSellersComponent_div_96_form_25_ng_container_2_input_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 197);
    \u0275\u0275twoWayListener("ngModelChange", function AdminSellersComponent_div_96_form_25_ng_container_2_input_10_Template_input_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r19);
      const ctx_r1 = \u0275\u0275nextContext(4);
      \u0275\u0275twoWayBindingSet(ctx_r1.sellerForm.other_brand, $event) || (ctx_r1.sellerForm.other_brand = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.sellerForm.other_brand);
    \u0275\u0275control();
  }
}
function AdminSellersComponent_div_96_form_25_ng_container_2_small_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 183);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.fieldErrors["agency_brand"] || ctx_r1.fieldErrors["other_brand"], " ");
  }
}
function AdminSellersComponent_div_96_form_25_ng_container_2_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 198)(1, "span", 199);
    \u0275\u0275text(2, "\u{1F4CD} Direcci\xF3n:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 200);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.addressText || "Cargando direcci\xF3n...");
  }
}
function AdminSellersComponent_div_96_form_25_ng_container_2_small_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 183);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.fieldErrors["agency_location"]);
  }
}
function AdminSellersComponent_div_96_form_25_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 171)(2, "label");
    \u0275\u0275text(3, "Marca (Agencia) *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "select", 186);
    \u0275\u0275twoWayListener("ngModelChange", function AdminSellersComponent_div_96_form_25_ng_container_2_Template_select_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.sellerForm.agency_brand, $event) || (ctx_r1.sellerForm.agency_brand = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(5, "option", 187);
    \u0275\u0275text(6, "Selecciona una marca");
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, AdminSellersComponent_div_96_form_25_ng_container_2_option_7_Template, 2, 2, "option", 59);
    \u0275\u0275elementStart(8, "option", 188);
    \u0275\u0275text(9, "Otro");
    \u0275\u0275elementEnd()();
    \u0275\u0275controlCreate();
    \u0275\u0275template(10, AdminSellersComponent_div_96_form_25_ng_container_2_input_10_Template, 1, 1, "input", 189)(11, AdminSellersComponent_div_96_form_25_ng_container_2_small_11_Template, 2, 1, "small", 173);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 171)(13, "label");
    \u0275\u0275text(14, "Ubicaci\xF3n de Sucursal *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(15, "div", 190, 1);
    \u0275\u0275template(17, AdminSellersComponent_div_96_form_25_ng_container_2_div_17_Template, 5, 1, "div", 191);
    \u0275\u0275elementStart(18, "small", 192);
    \u0275\u0275text(19, "Haz clic en el mapa para marcar la ubicaci\xF3n exacta de la sucursal");
    \u0275\u0275elementEnd();
    \u0275\u0275template(20, AdminSellersComponent_div_96_form_25_ng_container_2_small_20_Template, 2, 1, "small", 173);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 193)(22, "input", 194);
    \u0275\u0275twoWayListener("ngModelChange", function AdminSellersComponent_div_96_form_25_ng_container_2_Template_input_ngModelChange_22_listener($event) {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.manualAddress, $event) || (ctx_r1.manualAddress = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("keydown", function AdminSellersComponent_div_96_form_25_ng_container_2_Template_input_keydown_22_listener($event) {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.onSearchKeydown($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(23, "button", 195);
    \u0275\u0275listener("click", function AdminSellersComponent_div_96_form_25_ng_container_2_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.searchLocation());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(24, "svg", 196);
    \u0275\u0275element(25, "circle", 31)(26, "line", 32);
    \u0275\u0275elementEnd();
    \u0275\u0275text(27);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(28, "p", 192);
    \u0275\u0275text(29, 'Escribe una direcci\xF3n y presiona Enter o haz clic en "Buscar"');
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275classProp("has-error", ctx_r1.formValidated && (ctx_r1.fieldErrors["agency_brand"] || ctx_r1.fieldErrors["other_brand"]));
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.sellerForm.agency_brand);
    \u0275\u0275control();
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.brands);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.sellerForm.agency_brand === "Otro");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.formValidated && (ctx_r1.fieldErrors["agency_brand"] || ctx_r1.fieldErrors["other_brand"]));
    \u0275\u0275advance();
    \u0275\u0275classProp("has-error", ctx_r1.formValidated && ctx_r1.fieldErrors["agency_location"]);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r1.selectedCoords);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.formValidated && ctx_r1.fieldErrors["agency_location"]);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.manualAddress);
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.isSearching());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.isSearching() ? "Buscando..." : "Buscar", " ");
  }
}
function AdminSellersComponent_div_96_form_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 166);
    \u0275\u0275listener("ngSubmit", function AdminSellersComponent_div_96_form_25_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.nextFormStep());
    });
    \u0275\u0275template(1, AdminSellersComponent_div_96_form_25_ng_container_1_Template, 26, 20, "ng-container", 167)(2, AdminSellersComponent_div_96_form_25_ng_container_2_Template, 30, 13, "ng-container", 167);
    \u0275\u0275elementStart(3, "div", 168)(4, "button", 169);
    \u0275\u0275listener("click", function AdminSellersComponent_div_96_form_25_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.prevFormStep());
    });
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 170);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.formStep === 1);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.formStep === 2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.formStep === 2 ? "Volver" : "Cancelar", " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.formLoading);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.formLoading ? "Guardando..." : ctx_r1.isEditMode ? ctx_r1.formStep === 2 ? "Actualizar" : "Continuar" : ctx_r1.formStep === 2 ? "Crear" : "Continuar", " ");
  }
}
function AdminSellersComponent_div_96_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 121);
    \u0275\u0275listener("click", function AdminSellersComponent_div_96_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeFormDrawer());
    });
    \u0275\u0275elementStart(1, "aside", 153);
    \u0275\u0275listener("click", function AdminSellersComponent_div_96_Template_aside_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 123)(3, "div")(4, "span", 5);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "h3");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "button", 154);
    \u0275\u0275listener("click", function AdminSellersComponent_div_96_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeFormDrawer());
    });
    \u0275\u0275text(9, "\xD7");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 155)(11, "div", 156)(12, "span", 157);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 158);
    \u0275\u0275text(15, "Datos personales");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(16, "div", 159);
    \u0275\u0275elementStart(17, "div", 156)(18, "span", 157);
    \u0275\u0275text(19, "2");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span", 158);
    \u0275\u0275text(21, "Sucursal");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "div", 128);
    \u0275\u0275template(23, AdminSellersComponent_div_96_div_23_Template, 2, 1, "div", 160)(24, AdminSellersComponent_div_96_div_24_Template, 3, 0, "div", 161)(25, AdminSellersComponent_div_96_form_25_Template, 8, 5, "form", 162);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", ctx_r1.isEditMode ? "Editar vendedor" : "Nuevo vendedor");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.isEditMode ? "Edici\xF3n de vendedor" : "Nuevo registro");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.isEditMode ? "Editar Vendedor" : "Nuevo Vendedor");
    \u0275\u0275advance(4);
    \u0275\u0275classProp("is-active", ctx_r1.formStep === 1)("is-done", ctx_r1.formStep === 2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formStep === 2 ? "\u2713" : "1");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-done", ctx_r1.formStep === 2);
    \u0275\u0275advance();
    \u0275\u0275classProp("is-active", ctx_r1.formStep === 2);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx_r1.formError);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.formLoading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.formLoading);
  }
}
function AdminSellersComponent_div_97_div_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 141);
    \u0275\u0275listener("click", function AdminSellersComponent_div_97_div_17_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.cancelarEliminarNota());
    });
    \u0275\u0275elementStart(1, "div", 225);
    \u0275\u0275listener("click", function AdminSellersComponent_div_97_div_17_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 226);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 11);
    \u0275\u0275element(4, "path", 39)(5, "path", 97)(6, "path", 98)(7, "path", 99)(8, "path", 100);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(9, "h3");
    \u0275\u0275text(10, "Eliminar nota");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p");
    \u0275\u0275text(12, "\xBFEst\xE1s seguro de que deseas eliminar esta nota? Esta acci\xF3n no se puede deshacer.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 150)(14, "button", 151);
    \u0275\u0275listener("click", function AdminSellersComponent_div_97_div_17_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.cancelarEliminarNota());
    });
    \u0275\u0275text(15, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "button", 152);
    \u0275\u0275listener("click", function AdminSellersComponent_div_97_div_17_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.confirmarEliminarNota());
    });
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(16);
    \u0275\u0275property("disabled", ctx_r1.notaLoading);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.notaLoading ? "Eliminando..." : "Eliminar", " ");
  }
}
function AdminSellersComponent_div_97_div_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 227);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 11);
    \u0275\u0275element(2, "circle", 228)(3, "line", 229)(4, "line", 230);
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
function AdminSellersComponent_div_97_div_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 231);
    \u0275\u0275element(1, "span", 232);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Cargando notas...");
    \u0275\u0275elementEnd()();
  }
}
function AdminSellersComponent_div_97_div_21_article_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article", 236)(1, "p", 237);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 238);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(4, "svg", 11);
    \u0275\u0275element(5, "circle", 239)(6, "path", 240);
    \u0275\u0275elementEnd();
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(9, "div", 241)(10, "button", 242);
    \u0275\u0275listener("click", function AdminSellersComponent_div_97_div_21_article_1_Template_button_click_10_listener() {
      const n_r23 = \u0275\u0275restoreView(_r22).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.editarNota(n_r23));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(11, "svg", 11);
    \u0275\u0275element(12, "path", 94)(13, "path", 95);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(14, "button", 243);
    \u0275\u0275listener("click", function AdminSellersComponent_div_97_div_21_article_1_Template_button_click_14_listener() {
      const n_r23 = \u0275\u0275restoreView(_r22).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.eliminarNota(n_r23));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(15, "svg", 11);
    \u0275\u0275element(16, "path", 39)(17, "path", 97)(18, "path", 98)(19, "path", 99)(20, "path", 100);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const n_r23 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("nota-editing", ctx_r1.notaEditando?.id === n_r23.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(n_r23.texto);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(8, 4, n_r23.created_at, "dd/MM/yyyy HH:mm"), " ");
  }
}
function AdminSellersComponent_div_97_div_21_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 244)(1, "span", 245);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 11);
    \u0275\u0275element(3, "path", 24)(4, "path", 25)(5, "path", 246)(6, "path", 247)(7, "path", 248);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "p", 249);
    \u0275\u0275text(9, "Sin notas todav\xEDa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 250);
    \u0275\u0275text(11, "Agrega la primera nota de seguimiento para este vendedor.");
    \u0275\u0275elementEnd()();
  }
}
function AdminSellersComponent_div_97_div_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 233);
    \u0275\u0275template(1, AdminSellersComponent_div_97_div_21_article_1_Template, 21, 7, "article", 234)(2, AdminSellersComponent_div_97_div_21_div_2_Template, 12, 0, "div", 235);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.notasVendedor);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.notasVendedor.length === 0);
  }
}
function AdminSellersComponent_div_97_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 201);
    \u0275\u0275listener("click", function AdminSellersComponent_div_97_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrarNotas());
    });
    \u0275\u0275elementStart(1, "div", 202);
    \u0275\u0275listener("click", function AdminSellersComponent_div_97_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "header", 203)(3, "span", 204);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(4, "svg", 11);
    \u0275\u0275element(5, "path", 90)(6, "path", 91)(7, "path", 92);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "div", 205)(9, "span", 206);
    \u0275\u0275text(10, "Seguimiento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "h3", 207);
    \u0275\u0275text(12, "Notas de Vendedor");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "button", 208);
    \u0275\u0275listener("click", function AdminSellersComponent_div_97_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrarNotas());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(14, "svg", 11);
    \u0275\u0275element(15, "line", 209)(16, "line", 210);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(17, AdminSellersComponent_div_97_div_17_Template, 18, 2, "div", 55);
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(18, "div", 211);
    \u0275\u0275template(19, AdminSellersComponent_div_97_div_19_Template, 7, 1, "div", 212)(20, AdminSellersComponent_div_97_div_20_Template, 4, 0, "div", 213)(21, AdminSellersComponent_div_97_div_21_Template, 3, 2, "div", 214);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 215)(23, "label", 216);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "textarea", 217);
    \u0275\u0275twoWayListener("ngModelChange", function AdminSellersComponent_div_97_Template_textarea_ngModelChange_25_listener($event) {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.notaText, $event) || (ctx_r1.notaText = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(26, "div", 218)(27, "button", 219);
    \u0275\u0275listener("click", function AdminSellersComponent_div_97_Template_button_click_27_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.notaEditando = null;
      return \u0275\u0275resetView(ctx_r1.notaText = "");
    });
    \u0275\u0275text(28, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "button", 220);
    \u0275\u0275listener("click", function AdminSellersComponent_div_97_Template_button_click_29_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.guardarNota());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(30, "svg", 11);
    \u0275\u0275element(31, "path", 221);
    \u0275\u0275elementEnd();
    \u0275\u0275text(32);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(33, "div", 222)(34, "span", 223)(35, "span", 224);
    \u0275\u0275text(36);
    \u0275\u0275elementEnd();
    \u0275\u0275text(37);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "button", 219);
    \u0275\u0275listener("click", function AdminSellersComponent_div_97_Template_button_click_38_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrarNotas());
    });
    \u0275\u0275text(39, "Cerrar");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(17);
    \u0275\u0275property("ngIf", ctx_r1.showNotaConfirmModal);
    \u0275\u0275advance(2);
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
    \u0275\u0275textInterpolate(ctx_r1.notasVendedor.length);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.notasVendedor.length === 1 ? "nota registrada" : "notas registradas", " ");
  }
}
var AdminSellersComponent = class _AdminSellersComponent {
  admin = inject(AdminService);
  auth = inject(AuthService);
  client = getSupabaseClient();
  cdr = inject(ChangeDetectorRef);
  toastService = inject(ToastService);
  mapContainer;
  detailMapContainer;
  // ------------------- LISTADO -------------------
  sellers = signal(
    [],
    ...ngDevMode ? [{ debugName: "sellers" }] : (
      /* istanbul ignore next */
      []
    )
  );
  filteredSellers = signal(
    [],
    ...ngDevMode ? [{ debugName: "filteredSellers" }] : (
      /* istanbul ignore next */
      []
    )
  );
  loading = true;
  actionLoading = false;
  searchTerm = "";
  statusFilter = "todos";
  brandFilter = "todas";
  sortBy = "recientes";
  get stats() {
    const list = this.sellers();
    const total = list.length;
    const activos = list.filter((s) => s.active ?? true).length;
    const cotizaciones = list.reduce((acc, s) => acc + (Number(s.quote_count) || 0), 0);
    return { total, activos, inactivos: total - activos, cotizaciones };
  }
  get brandsList() {
    const set = /* @__PURE__ */ new Set();
    this.sellers().forEach((s) => {
      if (s.agency_brand)
        set.add(s.agency_brand);
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }
  // ------------------- CONFIRMACIÓN (solo eliminar) -------------------
  showConfirmModal = false;
  confirmAction = null;
  selectedSellerId = null;
  selectedSellerCardId = null;
  // ------------------- FORMULARIO (DRAWER) -------------------
  showFormDrawer = false;
  isEditMode = false;
  formStep = 1;
  formLoading = false;
  formError = "";
  showPassword = false;
  formValidated = false;
  fieldErrors = {};
  sellerForm = {
    id: "",
    seller_number: "",
    full_name: "",
    password: "",
    agency_brand: "",
    other_brand: "",
    agency_location: "",
    active: true
  };
  // ------------------- DRAWER DE DETALLE -------------------
  showDetailDrawer = false;
  detailSeller = null;
  detailMap = null;
  detailMarker = null;
  // ------------------- NOTAS -------------------
  showNotasModal = false;
  notasVendedor = [];
  showSellerTooltip = false;
  sellerTooltipContent = "";
  sellerTooltipPosition = { x: 0, y: 0 };
  notaText = "";
  notaEditando = null;
  notaLoading = false;
  notaError = "";
  showNotaConfirmModal = false;
  notaToDelete = null;
  // ------------------- MAPA -------------------
  manualAddress = "";
  selectedCoords = null;
  addressText = "";
  isSearching = signal(
    false,
    ...ngDevMode ? [{ debugName: "isSearching" }] : (
      /* istanbul ignore next */
      []
    )
  );
  map;
  marker;
  // ------------------- MARCAS -------------------
  brands = [
    "HINO",
    "TOYOTA",
    "NISSAN",
    "BYD",
    "FORD",
    "AUDI",
    "VOLKSWAGEN",
    "CHEVROLET",
    "HONDA",
    "MAZDA",
    "HYUNDAI",
    "KIA",
    "MITSUBISHI",
    "SUZUKI",
    "RENAULT",
    "PEUGEOT",
    "BMW",
    "MERCEDES-BENZ",
    "JEEP",
    "DODGE",
    "RAM",
    "SUBARU",
    "JAGUAR",
    "LAND ROVER",
    "VOLVO",
    "PORSCHE",
    "MINI",
    "FIAT",
    "ALFA ROMEO",
    "MASERATI",
    "LEXUS",
    "INFINITI",
    "ACURA"
  ];
  async ngOnInit() {
    await this.loadSellers();
  }
  onEscapeKey() {
    if (this.showNotaConfirmModal)
      this.cancelarEliminarNota();
    if (this.showConfirmModal)
      this.cancelModal();
    if (this.showNotasModal)
      this.cerrarNotas();
    if (this.showDetailDrawer)
      this.closeDetail();
    if (this.showFormDrawer)
      this.closeFormDrawer();
  }
  handleToast(t) {
    if (t.action)
      t.action();
    this.toastService.dismiss(t.id);
  }
  // ===================== LISTADO =====================
  async loadSellers() {
    this.loading = true;
    const { data, error } = await this.admin.getSellersWithQuoteCount();
    if (!error) {
      this.sellers.set(data || []);
      this.applyFilters();
    } else {
      this.toastService.error("No se pudieron cargar los vendedores");
    }
    this.loading = false;
    this.cdr.detectChanges();
  }
  applyFilters() {
    let filtered = this.sellers();
    const term = this.searchTerm.trim().toLowerCase();
    if (term) {
      filtered = filtered.filter((s) => (s.full_name || "").toLowerCase().includes(term) || (s.seller_number || "").toLowerCase().includes(term) || (s.agency_brand || "").toLowerCase().includes(term) || (s.agency_location || "").toLowerCase().includes(term));
    }
    if (this.statusFilter === "activos")
      filtered = filtered.filter((s) => s.active ?? true);
    if (this.statusFilter === "inactivos")
      filtered = filtered.filter((s) => !(s.active ?? true));
    if (this.brandFilter !== "todas")
      filtered = filtered.filter((s) => s.agency_brand === this.brandFilter);
    switch (this.sortBy) {
      case "nombre":
        filtered = [...filtered].sort((a, b) => (a.full_name || "").localeCompare(b.full_name || ""));
        break;
      case "cotizaciones":
        filtered = [...filtered].sort((a, b) => (Number(b.quote_count) || 0) - (Number(a.quote_count) || 0));
        break;
      case "antiguos":
        filtered = [...filtered].reverse();
        break;
      case "recientes":
      default:
        break;
    }
    this.filteredSellers.set(filtered);
    this.cdr.detectChanges();
  }
  onSearch() {
    this.applyFilters();
  }
  clearSearch() {
    this.searchTerm = "";
    this.applyFilters();
  }
  clearFilters() {
    this.searchTerm = "";
    this.statusFilter = "todos";
    this.brandFilter = "todas";
    this.sortBy = "recientes";
    this.selectedSellerCardId = null;
    this.applyFilters();
  }
  setStatusFilter(f) {
    this.statusFilter = f;
    this.applyFilters();
  }
  setBrandFilter(value) {
    this.brandFilter = value;
    this.applyFilters();
  }
  setSortBy(value) {
    this.sortBy = value;
    this.applyFilters();
  }
  selectSeller(sellerId) {
    this.selectedSellerCardId = sellerId;
  }
  // ===================== TOGGLE DE ESTADO (INLINE + DESHACER) =====================
  async toggleSellerStatus(seller) {
    if (this.actionLoading)
      return;
    const previous = seller.active ?? true;
    const next = !previous;
    this.patchSeller(seller.id, { active: next });
    const { error } = await this.auth.updateProfile(seller.id, { active: next });
    if (error) {
      this.patchSeller(seller.id, { active: previous });
      this.toastService.error("No se pudo cambiar el estado: " + error.message);
      return;
    }
    this.toastService.undo(next ? `${seller.full_name} ahora est\xE1 activo` : `${seller.full_name} qued\xF3 inactivo`, () => {
      this.patchSeller(seller.id, { active: previous });
      this.auth.updateProfile(seller.id, { active: previous });
    });
  }
  patchSeller(id, patch) {
    this.sellers.update((list) => list.map((s) => s.id === id ? __spreadValues(__spreadValues({}, s), patch) : s));
    if (this.detailSeller?.id === id) {
      this.detailSeller = __spreadValues(__spreadValues({}, this.detailSeller), patch);
    }
    this.applyFilters();
  }
  // ===================== ELIMINAR (CON CONFIRMACIÓN) =====================
  async deleteSeller(sellerId) {
    this.selectedSellerId = sellerId;
    this.confirmAction = "delete";
    this.showConfirmModal = true;
    this.cdr.detectChanges();
  }
  getSellerName() {
    const seller = this.sellers().find((s) => s.id === this.selectedSellerId);
    return seller?.full_name || "este vendedor";
  }
  getSellerQuoteCount() {
    const seller = this.sellers().find((s) => s.id === this.selectedSellerId);
    return seller?.quote_count || 0;
  }
  confirmSellerDelete() {
    if (!this.selectedSellerId)
      return;
    this.actionLoading = true;
    this.cdr.detectChanges();
    this.auth.deleteUserFromAuth(this.selectedSellerId).then(({ error }) => {
      this.actionLoading = false;
      if (error) {
        this.toastService.error("Error al eliminar: " + error.message);
      } else {
        this.toastService.success("Vendedor eliminado correctamente");
        this.showConfirmModal = false;
        this.selectedSellerId = null;
        this.confirmAction = null;
        if (this.showDetailDrawer)
          this.closeDetail();
        this.loadSellers();
      }
      this.cdr.detectChanges();
    });
  }
  cancelModal() {
    this.showConfirmModal = false;
    this.selectedSellerId = null;
    this.confirmAction = null;
    this.cdr.detectChanges();
  }
  // ===================== DRAWER DE DETALLE =====================
  openDetail(seller) {
    this.detailSeller = seller;
    this.selectedSellerId = seller.id;
    this.showDetailDrawer = true;
    this.cdr.detectChanges();
    setTimeout(() => {
      this.initDetailMap();
      this.detailMap?.invalidateSize();
    }, 200);
  }
  closeDetail() {
    this.showDetailDrawer = false;
    this.detailSeller = null;
    this.destroyDetailMap();
    this.selectedSellerId = null;
    this.cdr.detectChanges();
  }
  async initDetailMap() {
    if (!this.detailMapContainer || this.detailMap)
      return;
    const L = await import("./chunk-T6GJ6UKQ.js");
    await this.setupLeafletIcons();
    const seller = this.detailSeller || {};
    let lat = 20.5921, lng = -100.3947;
    if (seller.latitude && seller.longitude) {
      lat = parseFloat(seller.latitude);
      lng = parseFloat(seller.longitude);
    }
    this.detailMap = L.map(this.detailMapContainer.nativeElement).setView([lat, lng], 14);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(this.detailMap);
    this.detailMarker = L.marker([lat, lng]).addTo(this.detailMap);
  }
  destroyDetailMap() {
    if (this.detailMap) {
      this.detailMap.remove();
      this.detailMap = null;
      this.detailMarker = null;
    }
  }
  // ===================== MAPA Y GEOLOCALIZACIÓN (FORMULARIO) =====================
  async setupLeafletIcons() {
    const L = await import("./chunk-T6GJ6UKQ.js");
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "/leaflet/marker-icon-2x.png",
      iconUrl: "/leaflet/marker-icon.png",
      shadowUrl: "/leaflet/marker-shadow.png"
    });
  }
  async initMap() {
    if (!this.mapContainer || this.map)
      return;
    const L = await import("./chunk-T6GJ6UKQ.js");
    await this.setupLeafletIcons();
    const queretaroCoords = [20.5921, -100.3947];
    this.map = L.map(this.mapContainer.nativeElement).setView(queretaroCoords, 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(this.map);
    this.marker = L.marker(queretaroCoords, { draggable: true }).addTo(this.map);
    if (this.selectedCoords) {
      this.map.setView([this.selectedCoords.lat, this.selectedCoords.lng], 16);
      this.marker.setLatLng([this.selectedCoords.lat, this.selectedCoords.lng]);
    }
    this.map.on("click", (e) => {
      const { lat, lng } = e.latlng;
      this.setMarkerAndReverseGeocode(lat, lng);
    });
    this.marker.on("dragend", () => {
      const pos = this.marker.getLatLng();
      this.setMarkerAndReverseGeocode(pos.lat, pos.lng);
    });
  }
  async setMarkerAndReverseGeocode(lat, lng) {
    this.marker.setLatLng([lat, lng]);
    this.selectedCoords = { lat, lng };
    await this.updateAddress(lat, lng);
  }
  async updateAddress(lat, lng) {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`);
      const data = await response.json();
      if (data?.display_name) {
        this.addressText = data.display_name;
        this.manualAddress = data.display_name;
      } else {
        this.addressText = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
        this.manualAddress = this.addressText;
      }
    } catch {
      this.addressText = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
      this.manualAddress = this.addressText;
    }
    this.cdr.detectChanges();
  }
  async searchLocation() {
    const query = this.manualAddress.trim();
    if (!query) {
      this.formError = "Escribe una direcci\xF3n para buscar";
      return;
    }
    if (!this.map)
      this.initMap();
    if (!this.map || !this.marker) {
      this.formError = "El mapa a\xFAn se est\xE1 cargando. Intenta de nuevo.";
      return;
    }
    this.isSearching.set(true);
    this.formError = "";
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1&addressdetails=1`);
      const data = await response.json();
      if (data && data.length > 0) {
        const result = data[0];
        const lat = parseFloat(result.lat);
        const lng = parseFloat(result.lon);
        this.map.setView([lat, lng], 16);
        this.marker.setLatLng([lat, lng]);
        this.map.invalidateSize();
        this.selectedCoords = { lat, lng };
        this.addressText = result.display_name || `${lat}, ${lng}`;
        this.manualAddress = this.addressText;
        this.cdr.detectChanges();
      } else {
        this.formError = "No se encontr\xF3 la direcci\xF3n. Intenta con otra b\xFAsqueda.";
      }
    } catch (err) {
      console.error("\u274C Error al buscar la direcci\xF3n:", err);
      this.formError = "Error al buscar la direcci\xF3n. Intenta de nuevo.";
    } finally {
      this.isSearching = signal(
        false,
        ...ngDevMode ? [{ debugName: "isSearching" }] : (
          /* istanbul ignore next */
          []
        )
      );
    }
  }
  onSearchKeydown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      this.searchLocation();
    }
  }
  // ===================== FORMULARIO (DRAWER) =====================
  openNewSeller() {
    this.isEditMode = false;
    this.formStep = 1;
    this.resetForm();
    this.showFormDrawer = true;
    this.showDetailDrawer = false;
    this.cdr.detectChanges();
  }
  async openEditSeller(seller) {
    this.isEditMode = true;
    this.formStep = 1;
    this.resetForm();
    this.formLoading = true;
    this.showFormDrawer = true;
    this.showDetailDrawer = false;
    this.cdr.detectChanges();
    try {
      const { data, error } = await this.auth.getProfileById(seller.id);
      if (error || !data) {
        this.formError = "Error al cargar datos del vendedor";
        this.formLoading = false;
        this.cdr.detectChanges();
        return;
      }
      this.sellerForm = {
        id: data.id,
        seller_number: data.seller_number || "",
        full_name: data.full_name || "",
        password: "",
        agency_brand: data.agency_brand || "",
        other_brand: "",
        agency_location: data.agency_location || "",
        active: data.active !== false
      };
      this.manualAddress = data.agency_location || "";
      this.addressText = data.agency_location || "";
      if (data.latitude && data.longitude) {
        const lat = parseFloat(data.latitude);
        const lng = parseFloat(data.longitude);
        this.selectedCoords = { lat, lng };
      }
      this.formLoading = false;
      this.cdr.detectChanges();
    } catch {
      this.formError = "Error inesperado al cargar el vendedor";
      this.formLoading = false;
      this.cdr.detectChanges();
    }
  }
  resetForm() {
    this.sellerForm = {
      id: "",
      seller_number: "",
      full_name: "",
      password: "",
      agency_brand: "",
      other_brand: "",
      agency_location: "",
      active: true
    };
    this.manualAddress = "";
    this.selectedCoords = null;
    this.addressText = "";
    this.formError = "";
    this.fieldErrors = {};
    this.formValidated = false;
    this.showPassword = false;
    this.formLoading = false;
  }
  nextFormStep() {
    if (this.formStep === 1) {
      if (!this.validateStep1())
        return;
      this.formStep = 2;
      this.cdr.detectChanges();
      setTimeout(() => {
        this.initMap();
        this.map?.invalidateSize();
      }, 120);
    } else {
      this.submitForm();
    }
  }
  prevFormStep() {
    if (this.formStep === 2) {
      this.formStep = 1;
      this.destroyFormMap();
    } else {
      this.closeFormDrawer();
    }
    this.cdr.detectChanges();
  }
  destroyFormMap() {
    if (this.map) {
      this.map.remove();
      this.map = null;
      this.marker = null;
    }
  }
  /** Filtra en vivo: solo dígitos, máximo 10 caracteres (igual que en el registro). */
  onPhoneInput(event) {
    const input = event.target;
    input.value = input.value.replace(/\D/g, "").slice(0, 10);
    this.sellerForm.seller_number = input.value;
    if (this.fieldErrors["seller_number"])
      this.validateStep1();
  }
  validateStep1() {
    this.formValidated = true;
    this.fieldErrors = {};
    let valid = true;
    const numberField = this.sellerForm.seller_number.trim();
    if (!this.isEditMode) {
      if (!numberField) {
        this.fieldErrors["seller_number"] = "El n\xFAmero de celular es obligatorio.";
        valid = false;
      } else if (!/^\d{10}$/.test(numberField)) {
        this.fieldErrors["seller_number"] = "Ingresa un n\xFAmero v\xE1lido de 10 d\xEDgitos.";
        valid = false;
      }
    }
    if (!this.sellerForm.full_name.trim()) {
      this.fieldErrors["full_name"] = "El nombre completo es obligatorio.";
      valid = false;
    }
    if (!this.isEditMode) {
      if (!this.sellerForm.password) {
        this.fieldErrors["password"] = "La contrase\xF1a es obligatoria.";
        valid = false;
      } else if (this.sellerForm.password.length < 6) {
        this.fieldErrors["password"] = "La contrase\xF1a debe tener al menos 6 caracteres.";
        valid = false;
      }
    } else if (this.sellerForm.password && this.sellerForm.password.length < 6) {
      this.fieldErrors["password"] = "La contrase\xF1a debe tener al menos 6 caracteres.";
      valid = false;
    }
    this.cdr.detectChanges();
    return valid;
  }
  validateStep2() {
    this.formValidated = true;
    this.fieldErrors = __spreadProps(__spreadValues({}, this.fieldErrors), { agency_brand: "", other_brand: "", agency_location: "" });
    let valid = true;
    const finalBrand = this.sellerForm.agency_brand === "Otro" ? this.sellerForm.other_brand : this.sellerForm.agency_brand;
    if (!finalBrand) {
      this.fieldErrors[this.sellerForm.agency_brand === "Otro" ? "other_brand" : "agency_brand"] = "Selecciona o escribe la marca de la agencia.";
      valid = false;
    }
    if (!this.selectedCoords && !this.manualAddress.trim()) {
      this.fieldErrors["agency_location"] = "Selecciona una ubicaci\xF3n en el mapa o busca una direcci\xF3n.";
      valid = false;
    }
    this.cdr.detectChanges();
    return valid;
  }
  generatePassword() {
    const chars = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%";
    const rand = new Uint32Array(12);
    crypto.getRandomValues(rand);
    let pw = "";
    for (let i = 0; i < 12; i++)
      pw += chars[rand[i] % chars.length];
    this.sellerForm.password = pw;
    this.fieldErrors["password"] = "";
    this.cdr.detectChanges();
  }
  closeFormDrawer() {
    this.showFormDrawer = false;
    this.destroyFormMap();
    this.cdr.detectChanges();
  }
  // ===================== GUARDAR (CREAR / EDITAR) =====================
  async submitForm() {
    this.formError = "";
    if (this.formStep === 1) {
      if (!this.validateStep1())
        return;
      if (!this.validateStep2()) {
        this.formStep = 2;
        this.cdr.detectChanges();
        setTimeout(() => this.map?.invalidateSize(), 120);
        return;
      }
    }
    const finalBrand = this.sellerForm.agency_brand === "Otro" ? this.sellerForm.other_brand : this.sellerForm.agency_brand;
    let finalLocation = "";
    if (this.selectedCoords) {
      finalLocation = this.addressText || `${this.selectedCoords.lat}, ${this.selectedCoords.lng}`;
    } else if (this.manualAddress.trim()) {
      finalLocation = this.manualAddress.trim();
    }
    this.formLoading = true;
    this.cdr.detectChanges();
    try {
      if (this.isEditMode) {
        const { error } = await this.auth.updateProfile(this.sellerForm.id, {
          full_name: this.sellerForm.full_name.trim(),
          agency_brand: finalBrand,
          agency_location: finalLocation,
          seller_number: this.sellerForm.seller_number.trim(),
          active: this.sellerForm.active,
          latitude: this.selectedCoords?.lat || null,
          longitude: this.selectedCoords?.lng || null
        });
        if (error) {
          this.formError = "Error al actualizar: " + error.message;
          this.formLoading = false;
          this.cdr.detectChanges();
          return;
        }
        if (this.sellerForm.password) {
          const { error: pwdError } = await this.auth.updateUserPassword(this.sellerForm.id, this.sellerForm.password);
          if (pwdError) {
            this.formError = "Cambio de contrase\xF1a fall\xF3: " + pwdError.message;
            this.formLoading = false;
            this.cdr.detectChanges();
            return;
          }
        }
        this.toastService.success("Vendedor actualizado correctamente");
        this.closeFormDrawer();
        await this.loadSellers();
        return;
      }
      const email = `vendedor_${this.sellerForm.seller_number.trim()}@golease.com`;
      const created = await this.auth.createUserAsAdmin({
        email,
        password: this.sellerForm.password,
        full_name: this.sellerForm.full_name.trim(),
        role: "seller"
      });
      if (!created.error && created.data?.id) {
        const { error: profileError2 } = await this.auth.updateProfile(created.data.id, {
          email,
          seller_number: this.sellerForm.seller_number.trim(),
          full_name: this.sellerForm.full_name.trim(),
          agency_brand: finalBrand,
          agency_location: finalLocation,
          active: true,
          role: "seller",
          latitude: this.selectedCoords?.lat || null,
          longitude: this.selectedCoords?.lng || null
        });
        if (profileError2) {
          this.toastService.error("Usuario creado, pero fall\xF3 su perfil: " + profileError2.message);
        } else {
          this.toastService.success("Vendedor creado correctamente");
        }
        this.closeFormDrawer();
        await this.loadSellers();
        this.cdr.detectChanges();
        return;
      }
      const { data: { session: adminSession } } = await this.client.auth.getSession();
      const { error: authError } = await this.auth.signUp(email, this.sellerForm.password || "12345678", this.sellerForm.full_name);
      if (authError) {
        this.formError = "Error al crear usuario: " + authError.message;
        this.formLoading = false;
        this.cdr.detectChanges();
        return;
      }
      const newUser = this.auth.currentUser();
      if (!newUser) {
        this.formError = "No se pudo obtener el usuario";
        this.formLoading = false;
        this.cdr.detectChanges();
        return;
      }
      await this.auth.restoreSession(adminSession);
      const { error: profileError } = await this.auth.updateProfile(newUser.id, {
        email,
        seller_number: this.sellerForm.seller_number.trim(),
        full_name: this.sellerForm.full_name.trim(),
        agency_brand: finalBrand,
        agency_location: finalLocation,
        active: true,
        role: "seller",
        latitude: this.selectedCoords?.lat || null,
        longitude: this.selectedCoords?.lng || null
      });
      if (profileError) {
        this.formError = "Error al guardar perfil: " + profileError.message;
        this.formLoading = false;
        this.cdr.detectChanges();
        return;
      }
      this.toastService.success("Vendedor creado correctamente");
      this.closeFormDrawer();
      await this.loadSellers();
      this.cdr.detectChanges();
    } catch (err) {
      this.formError = "Error inesperado: " + (err.message || "");
      this.formLoading = false;
      this.cdr.detectChanges();
    }
  }
  // ===================== NOTAS =====================
  async abrirNotas(seller) {
    this.selectedSellerId = seller.id;
    this.showNotasModal = true;
    this.notaText = "";
    this.notaEditando = null;
    this.notaError = "";
    await this.cargarNotas(seller.id);
  }
  async cargarNotas(sellerId) {
    this.notaLoading = true;
    try {
      const { data, error } = await this.client.from("notas").select("*").eq("entidad_tipo", "seller").eq("entidad_id", sellerId).order("created_at", { ascending: false });
      if (error) {
        this.notaError = "Error al cargar notas: " + (error.message || "desconocido");
      } else {
        this.notasVendedor = data || [];
        this.notaError = "";
      }
    } catch (err) {
      this.notaError = "Error al cargar notas: " + (err.message || "desconocido");
    }
    this.notaLoading = false;
    this.cdr.detectChanges();
  }
  async guardarNota() {
    if (!this.notaText.trim())
      return;
    this.notaLoading = true;
    this.notaError = "";
    const user = this.auth.currentUser();
    const payload = {
      entidad_tipo: "seller",
      entidad_id: this.selectedSellerId,
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
    } else {
      this.notaText = "";
      this.notaEditando = null;
      await this.cargarNotas(this.selectedSellerId);
    }
    this.notaLoading = false;
    this.cdr.detectChanges();
  }
  editarNota(nota) {
    this.notaEditando = nota;
    this.notaText = nota.texto;
  }
  eliminarNota(nota) {
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
    } else {
      await this.cargarNotas(this.selectedSellerId);
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
  cerrarNotas() {
    this.showNotaConfirmModal = false;
    this.notaToDelete = null;
    this.showNotasModal = false;
    this.notasVendedor = [];
    this.notaText = "";
    this.notaEditando = null;
    this.notaError = "";
    this.selectedSellerId = null;
  }
  // ===================== TOOLTIP =====================
  mostrarNotasTooltip(event, seller) {
    this.client.from("notas").select("texto, created_at").eq("entidad_tipo", "seller").eq("entidad_id", seller.id).order("created_at", { ascending: false }).then(({ data, error }) => {
      const notes = !error && data ? data.map((note) => `\u2022 ${note.texto}`).join("\n") : "";
      this.sellerTooltipContent = notes || "Sin notas";
      this.showSellerTooltip = true;
      let x = event.clientX + 14;
      let y = event.clientY + 14;
      if (x + 300 > window.innerWidth)
        x = event.clientX - 314;
      if (y + 140 > window.innerHeight)
        y = event.clientY - 150;
      this.sellerTooltipPosition = { x, y };
      this.cdr.detectChanges();
    });
  }
  ocultarNotasTooltip() {
    this.showSellerTooltip = false;
    this.sellerTooltipContent = "";
    this.cdr.detectChanges();
  }
  // ===================== HELPERS =====================
  getInitials(name) {
    const clean = (name || "").trim().replace(/\s+/g, " ");
    if (!clean)
      return "?";
    const parts = clean.split(" ");
    if (parts.length === 1)
      return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  getStatusLabel(active) {
    return active ? "Activo" : "Inactivo";
  }
  getStatusClass(active) {
    return active ? "status-active" : "status-inactive";
  }
  getAvatarClass(name) {
    let hash = 0;
    for (let i = 0; i < (name || "").length; i++) {
      hash = (hash * 31 + (name.charCodeAt(i) || 0)) % 1e3;
    }
    return `avatar-tone-${hash % 6}`;
  }
  static \u0275fac = function AdminSellersComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminSellersComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminSellersComponent, selectors: [["app-admin-sellers"]], viewQuery: function AdminSellersComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5)(_c1, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.mapContainer = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.detailMapContainer = _t.first);
    }
  }, hostBindings: function AdminSellersComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("keydown.escape", function AdminSellersComponent_keydown_escape_HostBindingHandler() {
        return ctx.onEscapeKey();
      }, \u0275\u0275resolveDocument);
    }
  }, decls: 98, vars: 30, consts: [["detailMapContainer", ""], ["mapContainer", ""], [1, "sellers-container"], [1, "page-header"], [1, "page-heading"], [1, "page-kicker"], [1, "btn-primary", 3, "click"], [1, "button-icon"], [1, "stats-grid"], ["type", "button", 1, "stat-card", 3, "click"], [1, "stat-icon", "tone-slate"], ["viewBox", "0 0 24 24", "aria-hidden", "true"], ["d", "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"], ["cx", "9", "cy", "7", "r", "4"], ["d", "M23 21v-2a4 4 0 0 0-3-3.87"], ["d", "M16 3.13a4 4 0 0 1 0 7.75"], [1, "stat-body"], [1, "stat-icon", "tone-green"], ["d", "M22 11.08V12a10 10 0 1 1-5.93-9.14"], ["d", "M22 4 12 14.01l-3-3"], [1, "stat-icon", "tone-amber"], ["d", "M8 11l3 3 6-6"], [1, "stat-card", "stat-plain"], [1, "stat-icon", "tone-blue"], ["d", "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"], ["d", "M14 2v6h6"], ["d", "M9 13h6"], ["d", "M9 17h4"], [1, "toolbar"], [1, "search-wrapper"], ["viewBox", "0 0 24 24", "aria-hidden", "true", 1, "search-icon"], ["cx", "11", "cy", "11", "r", "8"], ["x1", "21", "y1", "21", "x2", "16.65", "y2", "16.65"], ["type", "text", "placeholder", "Buscar por nombre, n\xFAmero, marca o sucursal...", 1, "search-input", 3, "ngModelChange", "input", "ngModel"], ["type", "button", "class", "search-clear", "aria-label", "Limpiar b\xFAsqueda", 3, "click", 4, "ngIf"], ["role", "group", "aria-label", "Filtrar por estado", 1, "chip-group"], ["type", "button", 1, "chip", 3, "click"], ["class", "toolbar-select", 4, "ngIf"], [1, "toolbar-select"], ["d", "M3 6h18"], ["d", "M7 12h10"], ["d", "M10 18h4"], [3, "ngModelChange", "change", "ngModel"], ["value", "recientes"], ["value", "nombre"], ["value", "cotizaciones"], ["value", "antiguos"], ["class", "results-count", 4, "ngIf"], ["class", "skeleton-list", "aria-label", "Cargando vendedores", 4, "ngIf"], ["class", "table-wrapper", 4, "ngIf"], ["class", "catalog-state empty-state", 4, "ngIf"], ["class", "seller-notes-tooltip", 3, "left", "top", 4, "ngIf"], [1, "toast-host"], ["class", "toast", 3, "class", "click", 4, "ngFor", "ngForOf"], ["class", "drawer-overlay", 3, "click", 4, "ngIf"], ["class", "modal-overlay", 3, "click", 4, "ngIf"], ["class", "modal-overlay notas-overlay", 3, "click", 4, "ngIf"], ["type", "button", "aria-label", "Limpiar b\xFAsqueda", 1, "search-clear", 3, "click"], ["value", "todas"], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"], [1, "results-count"], ["aria-label", "Cargando vendedores", 1, "skeleton-list"], ["class", "skeleton-row", 4, "ngFor", "ngForOf"], [1, "skeleton-row"], [1, "table-wrapper"], [1, "users-table"], [1, "actions-column"], ["tabindex", "0", 3, "is-selected", "click", "keydown.enter", "keydown.space", 4, "ngFor", "ngForOf"], ["tabindex", "0", 3, "click", "keydown.enter", "keydown.space"], ["data-label", "Vendedor", 1, "user-cell"], ["aria-hidden", "true", 1, "avatar"], [1, "avatar-dot"], [1, "user-meta"], [3, "mouseenter", "mouseleave"], ["data-label", "Agencia"], [1, "brand-chip"], ["data-label", "Ubicaci\xF3n", 1, "location-cell", 3, "title"], ["viewBox", "0 0 24 24", "aria-hidden", "true", 1, "pin-icon"], ["d", "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"], ["cx", "12", "cy", "10", "r", "3"], ["data-label", "Cotizaciones"], [1, "quote-count"], ["data-label", "Estado"], ["type", "button", "role", "switch", 1, "switch", 3, "click", "title"], [1, "switch-thumb"], [1, "switch-label"], ["data-label", "Acciones", 1, "actions-column", 3, "click"], [1, "action-buttons"], ["title", "Notas", "aria-label", "Ver notas del vendedor", 1, "btn-icon", "btn-note", 3, "click"], ["d", "M4 4h16v13H7l-3 3Z"], ["d", "M8 8h8"], ["d", "M8 12h6"], ["title", "Editar", "aria-label", "Editar vendedor", 1, "btn-icon", "btn-edit", 3, "click"], ["d", "M12 20h9"], ["d", "M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"], ["title", "Eliminar", "aria-label", "Eliminar vendedor", 1, "btn-icon", "btn-delete", 3, "click"], ["d", "M8 6V4h8v2"], ["d", "M19 6l-1 14H6L5 6"], ["d", "M10 11v5"], ["d", "M14 11v5"], [1, "catalog-state", "empty-state"], ["aria-hidden", "true", 1, "empty-state-icon"], ["viewBox", "0 0 24 24"], ["d", "M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"], ["cx", "10", "cy", "7", "r", "4"], ["d", "M20 8v6"], ["d", "M23 11h-6"], ["type", "button", "class", "btn-secondary", 3, "click", 4, "ngIf"], ["type", "button", "class", "btn-primary", 3, "click", 4, "ngIf"], ["type", "button", 1, "btn-secondary", 3, "click"], ["type", "button", 1, "btn-primary", 3, "click"], [1, "seller-notes-tooltip"], [1, "seller-notes-tooltip-header"], [1, "seller-notes-tooltip-body"], [1, "toast", 3, "click"], [1, "toast-icon"], [1, "toast-msg"], ["class", "toast-action", 4, "ngIf"], ["aria-label", "Cerrar", 1, "toast-close", 3, "click"], [1, "toast-action"], [1, "drawer-overlay", 3, "click"], ["role", "dialog", "aria-label", "Detalle del vendedor", 1, "drawer", "detail-drawer", 3, "click"], [1, "drawer-header"], [1, "detail-id"], ["aria-hidden", "true", 1, "avatar", "avatar-lg"], [1, "status-badge"], ["aria-label", "Cerrar detalle", 1, "drawer-close", 3, "click"], [1, "drawer-body"], [1, "detail-stats"], [1, "detail-stat"], [1, "detail-section"], [1, "detail-address"], [1, "detail-map-wrap"], [1, "map-container", "detail-map"], ["class", "map-empty-hint", 4, "ngIf"], [1, "btn-secondary", "btn-block", 3, "click"], [1, "drawer-footer"], [1, "btn-secondary", 3, "click"], [1, "btn-secondary", "danger", 3, "click"], [1, "map-empty-hint"], [1, "modal-overlay", 3, "click"], [1, "modal-content", 3, "click"], [1, "modal-heading", "modal-heading-warning"], [1, "modal-icon"], ["d", "M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"], ["d", "M12 9v4"], ["d", "M12 17h.01"], [1, "modal-eyebrow"], [1, "warning-copy"], [1, "modal-actions"], [1, "btn-cancel", 3, "click"], [1, "btn-confirm", 3, "click", "disabled"], ["role", "dialog", 1, "drawer", "form-drawer", 3, "click"], ["aria-label", "Cerrar formulario", 1, "drawer-close", 3, "click"], ["aria-label", "Progreso del formulario", 1, "stepper"], [1, "step"], [1, "step-num"], [1, "step-label"], [1, "step-line"], ["class", "form-banner error", 4, "ngIf"], ["class", "drawer-loading", 4, "ngIf"], ["novalidate", "", 3, "ngSubmit", 4, "ngIf"], [1, "form-banner", "error"], [1, "drawer-loading"], [1, "catalog-spinner"], ["novalidate", "", 3, "ngSubmit"], [4, "ngIf"], [1, "drawer-actions"], ["type", "button", 1, "btn-cancel", 3, "click"], ["type", "submit", 1, "btn-confirm", 3, "disabled"], [1, "form-group"], ["type", "text", "name", "seller_number", "placeholder", "Ej. 5512345678", "inputmode", "numeric", "maxlength", "10", 3, "ngModelChange", "input", "ngModel", "disabled"], ["class", "field-error", 4, "ngIf"], ["type", "text", "name", "full_name", "placeholder", "Juan P\xE9rez", 3, "ngModelChange", "ngModel"], [1, "input-with-action"], ["name", "password", 3, "ngModelChange", "type", "ngModel", "placeholder"], ["type", "button", 1, "btn-ghost-icon", 3, "click", "title"], ["d", "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"], ["cx", "12", "cy", "12", "r", "3"], [1, "field-actions"], ["type", "button", 1, "btn-link", 3, "click"], ["class", "form-group", 4, "ngIf"], [1, "field-error"], ["name", "active", 3, "ngModelChange", "ngModel"], [3, "ngValue"], ["name", "agency_brand", 3, "ngModelChange", "ngModel"], ["value", ""], ["value", "Otro"], ["type", "text", "placeholder", "Escribe la marca", "name", "other_brand", "class", "spaced-input", 3, "ngModel", "ngModelChange", 4, "ngIf"], [1, "map-container"], ["class", "coords-info", 4, "ngIf"], [1, "map-hint"], [1, "search-group"], ["type", "text", "name", "manualAddress", "placeholder", "Buscar sucursal (ej. Toyota Quer\xE9taro)", 3, "ngModelChange", "keydown", "ngModel"], ["type", "button", 1, "btn-search", 3, "click", "disabled"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "aria-hidden", "true"], ["type", "text", "placeholder", "Escribe la marca", "name", "other_brand", 1, "spaced-input", 3, "ngModelChange", "ngModel"], [1, "coords-info"], [1, "coord-label"], [1, "coord-value"], [1, "modal-overlay", "notas-overlay", 3, "click"], ["role", "dialog", "aria-modal", "true", "aria-label", "Notas de vendedor", 1, "notas-modal", 3, "click"], [1, "notas-header"], [1, "notas-icon"], [1, "notas-titles"], [1, "notas-eyebrow"], [1, "notas-title"], ["type", "button", "title", "Cerrar", "aria-label", "Cerrar", 1, "notas-close", 3, "click"], ["x1", "18", "y1", "6", "x2", "6", "y2", "18"], ["x1", "6", "y1", "6", "x2", "18", "y2", "18"], [1, "notas-body"], ["class", "notas-alert", 4, "ngIf"], ["class", "notas-loading", 4, "ngIf"], ["class", "notas-list", 4, "ngIf"], [1, "notas-editor"], ["for", "nota-vendedor-textarea", 1, "notas-editor-label"], ["id", "nota-vendedor-textarea", "rows", "3", "placeholder", "Escribe una nota de seguimiento...", 1, "nota-textarea", 3, "ngModelChange", "ngModel"], [1, "notas-editor-actions"], ["type", "button", 1, "notas-btn-ghost", 3, "click"], ["type", "button", 1, "notas-btn-primary", 3, "click", "disabled"], ["d", "M20 6 9 17l-5-5"], [1, "notas-footer"], [1, "notas-count"], [1, "notas-count-badge"], [1, "modal-content", "confirm-modal", 3, "click"], [1, "confirm-icon", "danger"], [1, "notas-alert"], ["cx", "12", "cy", "12", "r", "10"], ["x1", "12", "y1", "8", "x2", "12", "y2", "12"], ["x1", "12", "y1", "16", "x2", "12.01", "y2", "16"], [1, "notas-loading"], [1, "notas-spinner"], [1, "notas-list"], ["class", "nota-item", 3, "nota-editing", 4, "ngFor", "ngForOf"], ["class", "notas-empty", 4, "ngIf"], [1, "nota-item"], [1, "nota-texto"], [1, "nota-fecha"], ["cx", "12", "cy", "12", "r", "9"], ["d", "M12 7v5l3 2"], [1, "nota-acciones"], ["type", "button", "title", "Editar nota", "aria-label", "Editar nota", 1, "btn-icon", "btn-edit", 3, "click"], ["type", "button", "title", "Eliminar nota", "aria-label", "Eliminar nota", 1, "btn-icon", "btn-delete", 3, "click"], [1, "notas-empty"], [1, "notas-empty-icon"], ["d", "M16 13H8"], ["d", "M16 17H8"], ["d", "M10 9H8"], [1, "notas-empty-title"], [1, "notas-empty-sub"]], template: function AdminSellersComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "div", 4)(3, "span", 5);
      \u0275\u0275text(4, "Equipo comercial");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "h2");
      \u0275\u0275text(6, "Vendedores");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "p");
      \u0275\u0275text(8, "Administra sucursales, actividad y acceso de tu fuerza de ventas.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "button", 6);
      \u0275\u0275listener("click", function AdminSellersComponent_Template_button_click_9_listener() {
        return ctx.openNewSeller();
      });
      \u0275\u0275elementStart(10, "span", 7);
      \u0275\u0275text(11, "+");
      \u0275\u0275elementEnd();
      \u0275\u0275text(12, " Nuevo Vendedor");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "div", 8)(14, "button", 9);
      \u0275\u0275listener("click", function AdminSellersComponent_Template_button_click_14_listener() {
        return ctx.setStatusFilter("todos");
      });
      \u0275\u0275elementStart(15, "span", 10);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(16, "svg", 11);
      \u0275\u0275element(17, "path", 12)(18, "circle", 13)(19, "path", 14)(20, "path", 15);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(21, "span", 16)(22, "strong");
      \u0275\u0275text(23);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "small");
      \u0275\u0275text(25, "Vendedores");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(26, "button", 9);
      \u0275\u0275listener("click", function AdminSellersComponent_Template_button_click_26_listener() {
        return ctx.setStatusFilter("activos");
      });
      \u0275\u0275elementStart(27, "span", 17);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(28, "svg", 11);
      \u0275\u0275element(29, "path", 18)(30, "path", 19);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(31, "span", 16)(32, "strong");
      \u0275\u0275text(33);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "small");
      \u0275\u0275text(35, "Activos");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(36, "button", 9);
      \u0275\u0275listener("click", function AdminSellersComponent_Template_button_click_36_listener() {
        return ctx.setStatusFilter("inactivos");
      });
      \u0275\u0275elementStart(37, "span", 20);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(38, "svg", 11);
      \u0275\u0275element(39, "path", 18)(40, "path", 21);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(41, "span", 16)(42, "strong");
      \u0275\u0275text(43);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "small");
      \u0275\u0275text(45, "Inactivos");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(46, "div", 22)(47, "span", 23);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(48, "svg", 11);
      \u0275\u0275element(49, "path", 24)(50, "path", 25)(51, "path", 26)(52, "path", 27);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(53, "span", 16)(54, "strong");
      \u0275\u0275text(55);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(56, "small");
      \u0275\u0275text(57, "Cotizaciones generadas");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(58, "div", 28)(59, "div", 29);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(60, "svg", 30);
      \u0275\u0275element(61, "circle", 31)(62, "line", 32);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(63, "input", 33);
      \u0275\u0275twoWayListener("ngModelChange", function AdminSellersComponent_Template_input_ngModelChange_63_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
        return $event;
      });
      \u0275\u0275listener("input", function AdminSellersComponent_Template_input_input_63_listener() {
        return ctx.onSearch();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275template(64, AdminSellersComponent_button_64_Template, 2, 0, "button", 34);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(65, "div", 35)(66, "button", 36);
      \u0275\u0275listener("click", function AdminSellersComponent_Template_button_click_66_listener() {
        return ctx.setStatusFilter("todos");
      });
      \u0275\u0275text(67, "Todos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(68, "button", 36);
      \u0275\u0275listener("click", function AdminSellersComponent_Template_button_click_68_listener() {
        return ctx.setStatusFilter("activos");
      });
      \u0275\u0275text(69, "Activos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(70, "button", 36);
      \u0275\u0275listener("click", function AdminSellersComponent_Template_button_click_70_listener() {
        return ctx.setStatusFilter("inactivos");
      });
      \u0275\u0275text(71, "Inactivos");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(72, AdminSellersComponent_label_72_Template, 10, 2, "label", 37);
      \u0275\u0275elementStart(73, "label", 38);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(74, "svg", 11);
      \u0275\u0275element(75, "path", 39)(76, "path", 40)(77, "path", 41);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(78, "select", 42);
      \u0275\u0275twoWayListener("ngModelChange", function AdminSellersComponent_Template_select_ngModelChange_78_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.sortBy, $event) || (ctx.sortBy = $event);
        return $event;
      });
      \u0275\u0275listener("change", function AdminSellersComponent_Template_select_change_78_listener() {
        return ctx.setSortBy(ctx.sortBy);
      });
      \u0275\u0275elementStart(79, "option", 43);
      \u0275\u0275text(80, "M\xE1s recientes");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(81, "option", 44);
      \u0275\u0275text(82, "Nombre A\u2013Z");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(83, "option", 45);
      \u0275\u0275text(84, "M\xE1s cotizaciones");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(85, "option", 46);
      \u0275\u0275text(86, "Antiguos");
      \u0275\u0275elementEnd()();
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275template(87, AdminSellersComponent_span_87_Template, 2, 1, "span", 47);
      \u0275\u0275elementEnd();
      \u0275\u0275template(88, AdminSellersComponent_div_88_Template, 2, 2, "div", 48)(89, AdminSellersComponent_div_89_Template, 18, 1, "div", 49)(90, AdminSellersComponent_div_90_Template, 13, 4, "div", 50);
      \u0275\u0275elementEnd();
      \u0275\u0275template(91, AdminSellersComponent_div_91_Template, 10, 5, "div", 51);
      \u0275\u0275elementStart(92, "div", 52);
      \u0275\u0275template(93, AdminSellersComponent_div_93_Template, 8, 5, "div", 53);
      \u0275\u0275elementEnd();
      \u0275\u0275template(94, AdminSellersComponent_div_94_Template, 53, 12, "div", 54)(95, AdminSellersComponent_div_95_Template, 32, 4, "div", 55)(96, AdminSellersComponent_div_96_Template, 26, 15, "div", 54)(97, AdminSellersComponent_div_97_Template, 40, 10, "div", 56);
    }
    if (rf & 2) {
      \u0275\u0275advance(14);
      \u0275\u0275classProp("is-active", ctx.statusFilter === "todos");
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate(ctx.stats.total);
      \u0275\u0275advance(3);
      \u0275\u0275classProp("is-active", ctx.statusFilter === "activos");
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate(ctx.stats.activos);
      \u0275\u0275advance(3);
      \u0275\u0275classProp("is-active", ctx.statusFilter === "inactivos");
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate(ctx.stats.inactivos);
      \u0275\u0275advance(12);
      \u0275\u0275textInterpolate(ctx.stats.cotizaciones);
      \u0275\u0275advance(8);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchTerm);
      \u0275\u0275control();
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.searchTerm);
      \u0275\u0275advance(2);
      \u0275\u0275classProp("is-active", ctx.statusFilter === "todos");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("is-active", ctx.statusFilter === "activos");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("is-active", ctx.statusFilter === "inactivos");
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.brandsList.length);
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.sortBy);
      \u0275\u0275control();
      \u0275\u0275advance(9);
      \u0275\u0275property("ngIf", !ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && ctx.filteredSellers().length > 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && ctx.filteredSellers().length === 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showSellerTooltip);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", ctx.toastService.toasts());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showDetailDrawer);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showConfirmModal);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showFormDrawer);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showNotasModal);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, MaxLengthValidator, NgModel, NgForm, DatePipe], styles: ['\n.sellers-container[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  background: var(--%NS%surface-subtle);\n  border: 0;\n  padding: 0;\n  box-shadow: none;\n}\n.sellers-container[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 38%;\n  height: 190px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(32, 176, 56, 0.14),\n      rgba(16, 37, 31, 0.07));\n  clip-path: polygon(35% 0, 100% 0, 100% 100%, 0 100%);\n  pointer-events: none;\n  z-index: 0;\n}\n.sellers-container[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-end;\n  min-height: 152px;\n  margin: 0 0 1.15rem;\n  padding: 1.5rem 1.75rem;\n  border: 1px solid rgba(139, 226, 140, 0.22);\n  border-radius: 16px;\n  background:\n    linear-gradient(\n      115deg,\n      #10251f 0%,\n      #173c2e 68%,\n      #1f6840 100%);\n  box-shadow: 0 16px 30px rgba(16, 37, 31, 0.16);\n}\n.sellers-container[_ngcontent-%COMP%]   .page-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0.25rem 0 0.35rem;\n  color: var(--%NS%text-on-accent);\n  font-size: 2rem;\n  line-height: 1;\n}\n.sellers-container[_ngcontent-%COMP%]   .page-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  max-width: 420px;\n  margin: 0;\n  color: #bdd6c7;\n  font-size: 0.88rem;\n}\n.page-kicker[_ngcontent-%COMP%] {\n  color: #8be28c;\n  font-size: 0.68rem;\n  font-weight: 700;\n  letter-spacing: 1.2px;\n  text-transform: uppercase;\n}\n.sellers-container[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%], \n.btn-primary[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 2;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  min-height: 44px;\n  padding: 0.75rem 1rem;\n  border: 0;\n  border-radius: 9px;\n  background: var(--%NS%btn-primary-bg);\n  color: var(--%NS%btn-primary-text);\n  box-shadow: none;\n  white-space: nowrap;\n  cursor: pointer;\n  font-weight: 700;\n  font-size: 0.9rem;\n  transition: all 0.2s;\n  text-decoration: none;\n}\n.sellers-container[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%]:hover, \n.btn-primary[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%btn-primary-bg-hover);\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.16);\n}\n.button-icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 20px;\n  height: 20px;\n  margin-right: 0.25rem;\n  border: 1px solid rgba(16, 37, 31, 0.25);\n  border-radius: 50%;\n  font-size: 1rem;\n  line-height: 1;\n}\n.stats-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 0.8rem;\n  margin: 0 0 1rem;\n}\n.stat-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.7rem;\n  padding: 0.95rem 1rem;\n  border: 1px solid var(--%NS%border-color);\n  border-radius: 14px;\n  background: var(--%NS%surface-card);\n  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.05);\n  text-align: left;\n  cursor: pointer;\n  font-family: var(--%NS%font-body);\n  transition:\n    transform 0.18s ease,\n    border-color 0.18s ease,\n    box-shadow 0.18s ease;\n}\nbutton.stat-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  border-color: #bbe8bf;\n  box-shadow: 0 10px 22px rgba(15, 23, 42, 0.08);\n}\n.stat-card.is-active[_ngcontent-%COMP%] {\n  border-color: var(--%NS%accent-green);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.12);\n  background: var(--%NS%surface-hover);\n}\n.stat-card.stat-plain[_ngcontent-%COMP%] {\n  cursor: default;\n}\n.stat-icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 42px;\n  height: 42px;\n  flex-shrink: 0;\n  border-radius: 12px;\n}\n.stat-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 22px;\n  height: 22px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 1.8;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.tone-slate[_ngcontent-%COMP%] {\n  background: var(--%NS%surface-muted);\n  color: var(--%NS%text-silver);\n}\n.tone-green[_ngcontent-%COMP%] {\n  background: var(--%NS%accent-green-light);\n  color: var(--%NS%accent-green-dark);\n}\n.tone-amber[_ngcontent-%COMP%] {\n  background: var(--%NS%warning-bg);\n  color: var(--%NS%warning);\n}\n.tone-blue[_ngcontent-%COMP%] {\n  background: var(--%NS%info-bg);\n  color: var(--%NS%info);\n}\n.stat-body[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  line-height: 1.1;\n}\n.stat-body[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 1.35rem;\n  font-weight: 800;\n  color: var(--%NS%btn-primary-text);\n}\n.stat-body[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  margin-top: 0.2rem;\n  color: var(--%NS%text-muted);\n  font-size: 0.72rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.4px;\n}\n.toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 0.6rem;\n  margin: 0 0 1.15rem;\n  padding: 0.6rem 0.75rem;\n  border: 1px solid var(--%NS%border-color);\n  border-radius: 14px;\n  background: var(--%NS%surface-card);\n  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.05);\n}\n.search-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  flex: 1 1 240px;\n  display: flex;\n  align-items: center;\n}\n.search-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 0.8rem;\n  width: 17px;\n  height: 17px;\n  fill: none;\n  stroke: var(--%NS%accent-silver);\n  stroke-width: 2;\n  stroke-linecap: round;\n  pointer-events: none;\n}\n.search-input[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 38px;\n  padding: 0.4rem 2.3rem 0.4rem 2.4rem;\n  border: 1px solid var(--%NS%input-border);\n  border-radius: 9px;\n  font-size: 0.9rem;\n  background: var(--%NS%surface-subtle);\n  color: var(--%NS%text-silver);\n  transition:\n    border-color 0.2s ease,\n    box-shadow 0.2s ease,\n    background 0.2s ease;\n}\n.search-input[_ngcontent-%COMP%]::placeholder {\n  color: var(--%NS%accent-silver);\n}\n.search-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--%NS%accent-green);\n  background: var(--%NS%surface-card);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.1);\n}\n.search-clear[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0.45rem;\n  width: 24px;\n  height: 24px;\n  border: 0;\n  border-radius: 50%;\n  background: var(--%NS%surface-muted);\n  color: var(--%NS%text-muted);\n  font-size: 1rem;\n  line-height: 1;\n  cursor: pointer;\n}\n.search-clear[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%input-border);\n  color: var(--%NS%text-main);\n}\n.chip-group[_ngcontent-%COMP%] {\n  display: inline-flex;\n  gap: 0.3rem;\n  padding: 0.22rem;\n  border-radius: 999px;\n  background: var(--%NS%surface-hover);\n}\n.chip[_ngcontent-%COMP%] {\n  padding: 0.35rem 0.85rem;\n  border: 0;\n  border-radius: 999px;\n  background: transparent;\n  color: var(--%NS%text-muted);\n  font-size: 0.78rem;\n  font-weight: 700;\n  cursor: pointer;\n  transition:\n    background 0.18s,\n    color 0.18s,\n    box-shadow 0.18s;\n}\n.chip[_ngcontent-%COMP%]:hover {\n  color: var(--%NS%text-silver);\n}\n.chip.is-active[_ngcontent-%COMP%] {\n  background: var(--%NS%surface-card);\n  color: var(--%NS%accent-green-dark);\n  box-shadow: 0 3px 8px rgba(15, 23, 42, 0.12);\n}\n.toolbar-select[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n}\n.toolbar-select[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 0.7rem;\n  width: 15px;\n  height: 15px;\n  fill: none;\n  stroke: var(--%NS%accent-silver);\n  stroke-width: 1.9;\n  stroke-linecap: round;\n  pointer-events: none;\n}\n.toolbar-select[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  min-height: 38px;\n  padding: 0.4rem 1.9rem 0.4rem 2rem;\n  border: 1px solid var(--%NS%input-border);\n  border-radius: 9px;\n  background: var(--%NS%surface-subtle);\n  color: var(--%NS%text-silver);\n  font-size: 0.85rem;\n  cursor: pointer;\n  appearance: none;\n  transition: border-color 0.2s, box-shadow 0.2s;\n}\n.toolbar-select[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--%NS%accent-green);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.1);\n}\n.results-count[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  margin-left: auto;\n  color: var(--%NS%text-muted);\n  font-size: 0.8rem;\n  white-space: nowrap;\n}\n.skeleton-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.7rem;\n}\n.skeleton-row[_ngcontent-%COMP%] {\n  height: 62px;\n  border-radius: 12px;\n  background:\n    linear-gradient(\n      90deg,\n      var(--%NS%surface-muted) 25%,\n      var(--%NS%surface-subtle) 50%,\n      var(--%NS%surface-muted) 75%);\n  background-size: 200% 100%;\n  animation: _ngcontent-%COMP%_shimmer 1.4s infinite;\n}\n@keyframes _ngcontent-%COMP%_shimmer {\n  0% {\n    background-position: 200% 0;\n  }\n  100% {\n    background-position: -200% 0;\n  }\n}\n.table-wrapper[_ngcontent-%COMP%] {\n  overflow-x: auto;\n  border: 1px solid var(--%NS%input-border);\n  border-radius: 14px;\n  background: var(--%NS%surface-card);\n  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.04);\n}\n.users-table[_ngcontent-%COMP%] {\n  width: 100%;\n  min-width: 860px;\n  border-collapse: collapse;\n  font-size: 0.88rem;\n}\n.users-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 0.85rem 1rem;\n  background: var(--%NS%surface-subtle);\n  color: var(--%NS%text-muted);\n  font-size: 0.7rem;\n  letter-spacing: 0.6px;\n  text-align: left;\n  text-transform: uppercase;\n  white-space: nowrap;\n}\n.users-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 0.8rem 1rem;\n  border-top: 1px solid var(--%NS%border-color);\n  color: var(--%NS%text-silver);\n  vertical-align: middle;\n}\n.users-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: background-color 0.2s ease;\n}\n.users-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: var(--%NS%surface-hover);\n}\n.users-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid rgba(32, 176, 56, 0.35);\n  outline-offset: -3px;\n}\n.users-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.is-selected[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  background: var(--%NS%accent-green-light);\n  border-top-color: #c4eacb;\n}\n.users-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.is-selected[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {\n  box-shadow: inset 4px 0 0 var(--%NS%accent-green);\n}\n.user-cell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  min-width: 220px;\n}\n.user-meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  line-height: 1.25;\n  min-width: 0;\n}\n.user-meta[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--%NS%btn-primary-text);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.user-meta[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: var(--%NS%accent-silver);\n  font-size: 0.78rem;\n}\n.avatar[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 44px;\n  height: 44px;\n  flex-shrink: 0;\n  border-radius: 50%;\n  color: var(--%NS%text-on-accent);\n  font-size: 0.92rem;\n  font-weight: 700;\n  letter-spacing: 0.5px;\n  box-shadow: 0 4px 10px rgba(15, 23, 42, 0.22);\n}\n.avatar-lg[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 56px;\n  font-size: 1.1rem;\n}\n.avatar-tone-0[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #065f46,\n      #34d399);\n}\n.avatar-tone-1[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #0f766e,\n      #2dd4bf);\n}\n.avatar-tone-2[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #1e3a8a,\n      #60a5fa);\n}\n.avatar-tone-3[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #7c3aed,\n      #a78bfa);\n}\n.avatar-tone-4[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #9a3412,\n      #fb923c);\n}\n.avatar-tone-5[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #10251f,\n      #1f6840);\n}\n.avatar-dot[_ngcontent-%COMP%] {\n  position: absolute;\n  right: -1px;\n  bottom: -1px;\n  width: 13px;\n  height: 13px;\n  border-radius: 50%;\n  border: 2.5px solid var(--%NS%surface-card);\n  background: var(--%NS%border-strong);\n}\n.avatar-dot.is-on[_ngcontent-%COMP%] {\n  background: #22c55e;\n  animation: _ngcontent-%COMP%_pulse 2s infinite;\n}\n@keyframes _ngcontent-%COMP%_pulse {\n  0%, 100% {\n    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.45);\n  }\n  70% {\n    box-shadow: 0 0 0 7px rgba(34, 197, 94, 0);\n  }\n}\n.brand-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.28rem 0.7rem;\n  border-radius: 999px;\n  background: var(--%NS%accent-green-light);\n  border: 1px solid #8bd39a;\n  color: var(--%NS%accent-green-dark);\n  font-size: 0.76rem;\n  font-weight: 700;\n  letter-spacing: 0.3px;\n  white-space: nowrap;\n}\n.location-cell[_ngcontent-%COMP%] {\n  max-width: 240px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.pin-icon[_ngcontent-%COMP%] {\n  width: 15px;\n  height: 15px;\n  margin-right: 0.3rem;\n  vertical-align: -2px;\n  fill: none;\n  stroke: var(--%NS%accent-green);\n  stroke-width: 2;\n}\n.quote-count[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 34px;\n  padding: 0.2rem 0.5rem;\n  border-radius: 999px;\n  background: var(--%NS%surface-muted);\n  color: var(--%NS%text-silver);\n  font-size: 0.85rem;\n}\n.switch[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-block;\n  width: 42px;\n  height: 24px;\n  border: 0;\n  border-radius: 999px;\n  background: var(--%NS%border-strong);\n  cursor: pointer;\n  vertical-align: middle;\n  box-shadow: inset 0 0 0 1px rgba(15, 23, 42, 0.06);\n  transition: background 0.25s ease;\n}\n.switch[_ngcontent-%COMP%]   .switch-thumb[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 3px;\n  left: 3px;\n  width: 18px;\n  height: 18px;\n  border-radius: 50%;\n  background: var(--%NS%surface-card);\n  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.28);\n  transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);\n}\n.switch.is-on[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      var(--%NS%accent-green-dark),\n      var(--%NS%accent-green));\n}\n.switch.is-on[_ngcontent-%COMP%]   .switch-thumb[_ngcontent-%COMP%] {\n  transform: translateX(18px);\n}\n.switch-label[_ngcontent-%COMP%] {\n  margin-left: 0.4rem;\n  font-size: 0.78rem;\n  font-weight: 700;\n  color: var(--%NS%text-muted);\n  vertical-align: middle;\n}\n.actions-column[_ngcontent-%COMP%] {\n  text-align: right !important;\n}\n.action-buttons[_ngcontent-%COMP%] {\n  display: inline-flex;\n  gap: 0.35rem;\n}\n.btn-icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 34px;\n  height: 34px;\n  border: 1px solid transparent;\n  border-radius: 9px;\n  background: transparent;\n  cursor: pointer;\n  transition: all 0.18s ease;\n}\n.btn-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 17px;\n  height: 17px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 1.9;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.btn-note[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%accent-green-light);\n  color: var(--%NS%accent-green-dark);\n  border-color: #8bd39a;\n}\n.btn-edit[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%info-bg);\n  color: var(--%NS%info);\n  border-color: var(--%NS%info-border);\n}\n.btn-delete[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%danger-bg);\n  color: var(--%NS%danger);\n  border-color: var(--%NS%danger-border);\n}\n.catalog-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 2.5rem 1.5rem;\n  color: var(--%NS%text-muted);\n}\n.catalog-state.empty-state[_ngcontent-%COMP%]    > strong[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 0.35rem;\n  color: var(--%NS%text-silver);\n  font-size: 1rem;\n}\n.catalog-state.empty-state[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:last-child {\n  display: block;\n  color: var(--%NS%accent-silver);\n  font-size: 0.82rem;\n  margin-bottom: 1rem;\n}\n.empty-state-icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 52px;\n  height: 52px;\n  margin-bottom: 0.6rem;\n  border-radius: 14px;\n  background: var(--%NS%accent-green-light);\n  color: var(--%NS%accent-green-dark);\n}\n.empty-state-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n  fill: none;\n  stroke: currentColor;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n  stroke-width: 1.7;\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.4rem;\n  min-height: 38px;\n  padding: 0.55rem 1rem;\n  border: 1px solid var(--%NS%input-border);\n  border-radius: 9px;\n  background: var(--%NS%surface-card);\n  color: var(--%NS%text-silver);\n  font-weight: 700;\n  font-size: 0.85rem;\n  cursor: pointer;\n  transition: all 0.18s ease;\n}\n.btn-secondary[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%surface-hover);\n  border-color: var(--%NS%border-strong);\n}\n.btn-secondary.danger[_ngcontent-%COMP%] {\n  color: var(--%NS%danger);\n  border-color: var(--%NS%danger-border);\n}\n.btn-secondary.danger[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%danger-bg);\n}\n.btn-block[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.seller-notes-tooltip[_ngcontent-%COMP%] {\n  position: fixed;\n  z-index: 3600;\n  width: 300px;\n  border: 1px solid var(--%NS%input-border);\n  border-radius: 12px;\n  background: var(--%NS%surface-card);\n  box-shadow: 0 20px 45px -12px rgba(15, 23, 42, 0.28);\n  pointer-events: none;\n  overflow: hidden;\n}\n.seller-notes-tooltip-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.45rem;\n  padding: 0.55rem 0.8rem;\n  background: var(--%NS%accent-green-light);\n  color: var(--%NS%accent-green-dark);\n  font-size: 0.72rem;\n  font-weight: 800;\n  text-transform: uppercase;\n  letter-spacing: 0.6px;\n}\n.seller-notes-tooltip-header[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 14px;\n  height: 14px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 2;\n  stroke-linecap: round;\n}\n.seller-notes-tooltip-body[_ngcontent-%COMP%] {\n  padding: 0.7rem 0.85rem;\n  max-height: 130px;\n  overflow-y: auto;\n  color: var(--%NS%text-silver);\n  font-size: 0.82rem;\n  white-space: pre-wrap;\n  word-break: break-word;\n}\n.toast-host[_ngcontent-%COMP%] {\n  position: fixed;\n  z-index: 4000;\n  right: 1.1rem;\n  bottom: 1.1rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.6rem;\n  max-width: 400px;\n}\n.toast[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  padding: 0.75rem 0.9rem;\n  border-radius: 12px;\n  background: var(--%NS%text-main);\n  color: var(--%NS%surface-card);\n  font-size: 0.86rem;\n  box-shadow: 0 16px 34px -10px rgba(15, 23, 42, 0.35);\n  animation: _ngcontent-%COMP%_toastIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);\n  cursor: pointer;\n}\n@keyframes _ngcontent-%COMP%_toastIn {\n  from {\n    opacity: 0;\n    transform: translateY(14px) scale(0.97);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n.toast-success[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #14532d,\n      var(--%NS%accent-green-dark));\n}\n.toast-error[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #7f1d1d,\n      var(--%NS%danger));\n}\n.toast-info[_ngcontent-%COMP%] {\n  background: var(--%NS%text-main);\n}\n.toast-icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 22px;\n  height: 22px;\n  flex-shrink: 0;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, 0.18);\n  font-size: 0.75rem;\n  font-weight: 800;\n}\n.toast-msg[_ngcontent-%COMP%] {\n  flex: 1;\n  line-height: 1.35;\n}\n.toast-action[_ngcontent-%COMP%] {\n  padding: 0.28rem 0.65rem;\n  border-radius: 8px;\n  background: var(--%NS%surface-card);\n  color: var(--%NS%accent-green-dark);\n  font-size: 0.75rem;\n  font-weight: 800;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  white-space: nowrap;\n}\n.toast-close[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 22px;\n  height: 22px;\n  border: 0;\n  border-radius: 50%;\n  background: transparent;\n  color: rgba(255, 255, 255, 0.75);\n  font-size: 1rem;\n  cursor: pointer;\n}\n.toast-close[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.15);\n  color: var(--%NS%surface-card);\n}\n.drawer-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 3000;\n  display: flex;\n  justify-content: flex-end;\n  background: rgba(15, 23, 42, 0.45);\n  -webkit-backdrop-filter: blur(3px);\n  backdrop-filter: blur(3px);\n  animation: _ngcontent-%COMP%_fadeIn 0.25s ease;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.drawer[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  width: min(500px, 100vw);\n  height: 100%;\n  background: var(--%NS%surface-subtle);\n  box-shadow: -24px 0 60px rgba(15, 23, 42, 0.28);\n  animation: _ngcontent-%COMP%_slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1);\n  overflow: hidden;\n}\n@keyframes _ngcontent-%COMP%_slideInRight {\n  from {\n    transform: translateX(100%);\n  }\n  to {\n    transform: translateX(0);\n  }\n}\n.form-drawer[_ngcontent-%COMP%] {\n  width: min(580px, 100vw);\n}\n.drawer-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n  flex-shrink: 0;\n  padding: 1.4rem 1.5rem 1.1rem;\n  border-bottom: 1px solid var(--%NS%border-color);\n  background: var(--%NS%surface-card);\n}\n.drawer-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0.2rem 0 0;\n  color: var(--%NS%btn-primary-text);\n  font-size: 1.25rem;\n}\n.drawer-close[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 34px;\n  height: 34px;\n  flex-shrink: 0;\n  border: 1px solid var(--%NS%border-color);\n  border-radius: 10px;\n  background: var(--%NS%surface-subtle);\n  color: var(--%NS%text-silver);\n  font-size: 1.25rem;\n  line-height: 1;\n  cursor: pointer;\n  transition: all 0.18s ease;\n}\n.drawer-close[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%danger-bg);\n  color: var(--%NS%danger);\n  border-color: var(--%NS%danger-border);\n}\n.drawer-body[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1.4rem 1.5rem;\n}\n.drawer-footer[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  display: flex;\n  gap: 0.6rem;\n  padding: 1rem 1.5rem;\n  border-top: 1px solid var(--%NS%border-color);\n  background: var(--%NS%surface-card);\n}\n.drawer-footer[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%] {\n  margin-left: auto;\n}\n.drawer-loading[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.6rem;\n  padding: 2rem;\n  color: var(--%NS%text-muted);\n  font-size: 0.9rem;\n}\n.detail-id[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.9rem;\n}\n.detail-id[_ngcontent-%COMP%]   .page-kicker[_ngcontent-%COMP%] {\n  color: var(--%NS%accent-green-dark);\n}\n.detail-stats[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 0.7rem;\n  margin-bottom: 1.4rem;\n}\n.detail-stat[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.25rem;\n  padding: 0.85rem 0.6rem;\n  border: 1px solid var(--%NS%border-color);\n  border-radius: 12px;\n  background: var(--%NS%surface-card);\n  text-align: center;\n}\n.detail-stat[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--%NS%btn-primary-text);\n  font-size: 1.1rem;\n}\n.detail-stat[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: var(--%NS%accent-silver);\n  font-size: 0.7rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.4px;\n}\n.detail-section[_ngcontent-%COMP%] {\n  margin-bottom: 1.4rem;\n  padding: 1.1rem;\n  border: 1px solid var(--%NS%border-color);\n  border-radius: 14px;\n  background: var(--%NS%surface-card);\n}\n.detail-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 0.6rem;\n  color: var(--%NS%text-silver);\n  font-size: 0.8rem;\n  letter-spacing: 0.6px;\n}\n.detail-address[_ngcontent-%COMP%] {\n  margin-bottom: 0.75rem;\n  color: var(--%NS%text-silver);\n  font-size: 0.88rem;\n  line-height: 1.45;\n}\n.detail-map-wrap[_ngcontent-%COMP%] {\n  position: relative;\n  border-radius: 12px;\n  overflow: hidden;\n  border: 1px solid var(--%NS%border-color);\n}\n.detail-map[_ngcontent-%COMP%] {\n  height: 210px !important;\n  width: 100%;\n  z-index: 1;\n}\n.map-empty-hint[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  z-index: 2;\n  padding: 0.4rem 0.9rem;\n  border-radius: 999px;\n  background: rgba(15, 23, 42, 0.75);\n  color: var(--%NS%text-on-accent);\n  font-size: 0.78rem;\n  pointer-events: none;\n}\n.stepper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  flex-shrink: 0;\n  padding: 1rem 1.5rem;\n  border-bottom: 1px solid var(--%NS%border-color);\n  background: var(--%NS%surface-card);\n}\n.step[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n}\n.step-num[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 26px;\n  height: 26px;\n  border-radius: 50%;\n  background: var(--%NS%surface-muted);\n  color: var(--%NS%text-muted);\n  font-size: 0.75rem;\n  font-weight: 800;\n  transition: all 0.2s ease;\n}\n.step-label[_ngcontent-%COMP%] {\n  color: var(--%NS%accent-silver);\n  font-size: 0.8rem;\n  font-weight: 700;\n}\n.step.is-active[_ngcontent-%COMP%]   .step-num[_ngcontent-%COMP%] {\n  background: var(--%NS%accent-green);\n  color: var(--%NS%text-on-accent);\n  box-shadow: 0 0 0 4px rgba(32, 176, 56, 0.15);\n}\n.step.is-active[_ngcontent-%COMP%]   .step-label[_ngcontent-%COMP%] {\n  color: var(--%NS%accent-green-dark);\n}\n.step.is-done[_ngcontent-%COMP%]   .step-num[_ngcontent-%COMP%] {\n  background: #8bd39a;\n  color: var(--%NS%accent-green-dark);\n}\n.step-line[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 3px;\n  border-radius: 999px;\n  background: var(--%NS%surface-muted);\n}\n.step-line.is-done[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      90deg,\n      var(--%NS%accent-green-dark),\n      var(--%NS%accent-green));\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 1.15rem;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 0.4rem;\n  color: var(--%NS%text-silver);\n  font-size: 0.78rem;\n  font-weight: 800;\n  letter-spacing: 0.5px;\n  text-transform: uppercase;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:not([type=checkbox]):not([type=radio]), \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 44px;\n  padding: 0.65rem 0.85rem;\n  border: 1.5px solid var(--%NS%input-border);\n  border-radius: 10px;\n  background: var(--%NS%surface-card);\n  color: var(--%NS%text-main);\n  font-size: 0.92rem;\n  font-family: var(--%NS%font-body);\n  transition:\n    border-color 0.2s,\n    box-shadow 0.2s,\n    background 0.2s;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--%NS%accent-green);\n  background: var(--%NS%surface-card);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.1);\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:disabled {\n  background: var(--%NS%surface-hover);\n  color: var(--%NS%text-muted);\n  cursor: not-allowed;\n}\n.form-group[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 0.35rem;\n  color: var(--%NS%accent-silver);\n  font-size: 0.76rem;\n}\n.form-group.has-error[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.form-group.has-error[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.form-group.has-error[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  border-color: var(--%NS%danger);\n  background: var(--%NS%danger-bg);\n}\n.form-group.has-error[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.form-group.has-error[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, \n.form-group.has-error[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);\n}\n.field-error[_ngcontent-%COMP%] {\n  color: var(--%NS%danger) !important;\n  font-weight: 600;\n}\n.field-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.6rem;\n  margin-top: 0.35rem;\n}\n.btn-link[_ngcontent-%COMP%] {\n  border: 0;\n  background: transparent;\n  color: var(--%NS%accent-green-dark);\n  font-size: 0.78rem;\n  font-weight: 700;\n  cursor: pointer;\n  text-decoration: underline;\n  text-underline-offset: 3px;\n  padding: 0;\n}\n.btn-link[_ngcontent-%COMP%]:hover {\n  color: var(--%NS%accent-green-dark);\n}\n.input-with-action[_ngcontent-%COMP%] {\n  position: relative;\n}\n.input-with-action[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  padding-right: 3rem;\n}\n.input-with-action[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--%NS%accent-green);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.1);\n}\n.btn-ghost-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0.45rem;\n  top: 50%;\n  transform: translateY(-50%);\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  border: 0;\n  border-radius: 8px;\n  background: var(--%NS%surface-muted);\n  color: var(--%NS%text-silver);\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n.btn-ghost-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 17px;\n  height: 17px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 1.9;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.btn-ghost-icon[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%input-border);\n  color: var(--%NS%text-main);\n}\n.spaced-input[_ngcontent-%COMP%] {\n  margin-top: 0.5rem;\n}\n.form-banner[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n  padding: 0.7rem 0.9rem;\n  border-radius: 10px;\n  font-size: 0.85rem;\n  font-weight: 600;\n}\n.form-banner.error[_ngcontent-%COMP%] {\n  background: var(--%NS%danger-bg);\n  border: 1px solid var(--%NS%danger-border);\n  color: var(--%NS%danger);\n}\n.drawer-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.6rem;\n  padding-top: 0.35rem;\n}\n.map-container[_ngcontent-%COMP%] {\n  height: 250px;\n  border: 1px solid var(--%NS%input-border);\n  border-radius: 12px;\n  z-index: 1;\n}\n.coords-info[_ngcontent-%COMP%] {\n  margin-top: 0.5rem;\n  padding: 0.5rem 0.8rem;\n  background: var(--%NS%surface-subtle);\n  border-radius: 8px;\n  border: 1px solid var(--%NS%border-color);\n  font-size: 0.85rem;\n  display: flex;\n  gap: 0.4rem;\n  align-items: flex-start;\n}\n.coord-label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--%NS%text-silver);\n  white-space: nowrap;\n}\n.coord-value[_ngcontent-%COMP%] {\n  color: var(--%NS%text-main);\n  word-break: break-all;\n}\n.map-hint[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--%NS%text-muted);\n  margin-top: 0.3rem;\n  font-style: italic;\n}\n.search-group[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  align-items: center;\n  width: 100%;\n}\n.search-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 44px;\n  padding: 0.5rem 0.8rem;\n  border: 1px solid var(--%NS%border-strong);\n  border-radius: 8px;\n  font-size: 0.9rem;\n  transition: border 0.2s;\n  background: var(--%NS%surface-card);\n  box-sizing: border-box;\n}\n.search-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--%NS%accent-green);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.1);\n}\n.btn-search[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.5rem 1rem;\n  background:\n    linear-gradient(\n      135deg,\n      var(--%NS%accent-green-dark),\n      var(--%NS%accent-green));\n  color: var(--%NS%text-on-accent);\n  border: none;\n  border-radius: 8px;\n  font-weight: 700;\n  font-size: 0.85rem;\n  cursor: pointer;\n  transition: all 0.2s;\n  white-space: nowrap;\n  flex-shrink: 0;\n}\n.btn-search[_ngcontent-%COMP%]:hover {\n  background:\n    linear-gradient(\n      135deg,\n      var(--%NS%accent-green-dark),\n      #1a8a3a);\n  transform: scale(1.02);\n}\n.btn-search[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none;\n}\n.btn-search[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  stroke: currentColor;\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 3500;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 1rem;\n  background: rgba(15, 23, 42, 0.5);\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: _ngcontent-%COMP%_fadeIn 0.2s ease;\n}\n.modal-content[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 470px;\n  max-height: 92vh;\n  overflow-y: auto;\n  border-radius: 18px;\n  background: var(--%NS%surface-card);\n  border: 1px solid var(--%NS%border-color);\n  padding: 1.6rem 1.7rem 1.4rem;\n  box-shadow: 0 30px 70px -20px rgba(15, 23, 42, 0.4);\n  animation: _ngcontent-%COMP%_riseIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);\n}\n@keyframes _ngcontent-%COMP%_riseIn {\n  from {\n    opacity: 0;\n    transform: translateY(18px) scale(0.97);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n.modal-heading[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.8rem;\n  margin-bottom: 1rem;\n}\n.modal-icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 42px;\n  height: 42px;\n  flex-shrink: 0;\n  border-radius: 12px;\n}\n.modal-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 21px;\n  height: 21px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 1.8;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.modal-heading-warning[_ngcontent-%COMP%]   .modal-icon[_ngcontent-%COMP%] {\n  background: var(--%NS%warning-bg);\n  color: var(--%NS%warning);\n}\n.modal-heading-notes[_ngcontent-%COMP%]   .modal-icon[_ngcontent-%COMP%] {\n  background: var(--%NS%accent-green-light);\n  color: var(--%NS%accent-green-dark);\n}\n.modal-eyebrow[_ngcontent-%COMP%] {\n  display: block;\n  color: var(--%NS%accent-silver);\n  font-size: 0.66rem;\n  font-weight: 800;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n}\n.modal-content[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--%NS%btn-primary-text);\n  font-size: 1.15rem;\n}\n.modal-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--%NS%text-silver);\n  font-size: 0.9rem;\n  line-height: 1.55;\n}\n.warning-copy[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: flex-start;\n  gap: 0.4rem;\n  margin-top: 0.5rem;\n  padding: 0.45rem 0.65rem;\n  border-radius: 8px;\n  background: var(--%NS%warning-bg);\n  border: 1px solid var(--%NS%warning-border);\n  color: var(--%NS%warning);\n  font-size: 0.8rem;\n  line-height: 1.4;\n}\n.warning-copy[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 15px;\n  height: 15px;\n  flex-shrink: 0;\n  margin-top: 1px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 1.9;\n}\n.modal-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.6rem;\n  margin-top: 1.3rem;\n}\n.btn-cancel[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 40px;\n  padding: 0.55rem 1.15rem;\n  border: 1px solid var(--%NS%input-border);\n  border-radius: 9px;\n  background: var(--%NS%surface-card);\n  color: var(--%NS%text-silver);\n  font-weight: 700;\n  font-size: 0.85rem;\n  cursor: pointer;\n  transition: all 0.18s ease;\n}\n.btn-cancel[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%surface-hover);\n  border-color: var(--%NS%border-strong);\n}\n.btn-confirm[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 40px;\n  padding: 0.55rem 1.3rem;\n  border: 0;\n  border-radius: 9px;\n  background:\n    linear-gradient(\n      135deg,\n      var(--%NS%accent-green-dark),\n      var(--%NS%accent-green));\n  color: var(--%NS%text-on-accent);\n  font-weight: 700;\n  font-size: 0.85rem;\n  cursor: pointer;\n  box-shadow: 0 10px 20px -8px rgba(32, 176, 56, 0.5);\n  transition: transform 0.18s ease, box-shadow 0.18s ease;\n}\n.btn-confirm[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 14px 26px -8px rgba(32, 176, 56, 0.55);\n}\n.btn-confirm[_ngcontent-%COMP%]:disabled {\n  opacity: 0.65;\n  cursor: wait;\n  transform: none;\n}\n.notas-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 3500;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 1.25rem;\n  background:\n    radial-gradient(\n      60% 50% at 50% 0%,\n      rgba(34, 197, 94, 0.1),\n      transparent 70%),\n    rgba(9, 14, 25, 0.58);\n  backdrop-filter: blur(10px) saturate(140%);\n  -webkit-backdrop-filter: blur(10px) saturate(140%);\n  animation: _ngcontent-%COMP%_notasFadeIn 0.24s ease;\n}\n@keyframes _ngcontent-%COMP%_notasFadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.notas-modal[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  width: min(560px, 100%);\n  max-height: min(88vh, 780px);\n  overflow: hidden;\n  background: var(--%NS%surface-card);\n  border: 1px solid var(--%NS%border-color);\n  border-radius: 20px;\n  box-shadow: 0 40px 90px -28px rgba(9, 14, 25, 0.55), 0 20px 45px -24px rgba(32, 176, 56, 0.22);\n  animation: _ngcontent-%COMP%_notasRiseIn 0.34s cubic-bezier(0.16, 1, 0.3, 1);\n}\n@keyframes _ngcontent-%COMP%_notasRiseIn {\n  from {\n    opacity: 0;\n    transform: translateY(18px) scale(0.97);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n.notas-modal[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 3px;\n  z-index: 1;\n  background:\n    linear-gradient(\n      90deg,\n      var(--%NS%accent-green-dark),\n      var(--%NS%accent-green-bright) 55%,\n      transparent);\n}\n.notas-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.9rem;\n  padding: 1.15rem 1.3rem 1.05rem;\n  border-bottom: 1px solid var(--%NS%border-color);\n  background:\n    linear-gradient(\n      180deg,\n      var(--%NS%accent-green-light),\n      transparent 75%);\n  flex-shrink: 0;\n}\n.notas-icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 44px;\n  height: 44px;\n  flex-shrink: 0;\n  border-radius: 13px;\n  background:\n    linear-gradient(\n      135deg,\n      var(--%NS%accent-green) 0%,\n      var(--%NS%accent-green-dark) 100%);\n  color: var(--%NS%text-on-accent);\n  box-shadow: 0 10px 22px -8px rgba(32, 176, 56, 0.6);\n}\n.notas-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 21px;\n  height: 21px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 1.8;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.notas-titles[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.15rem;\n  min-width: 0;\n}\n.notas-eyebrow[_ngcontent-%COMP%] {\n  font-size: 0.66rem;\n  font-weight: 800;\n  letter-spacing: 1.1px;\n  text-transform: uppercase;\n  color: var(--%NS%accent-silver);\n}\n.notas-title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.12rem;\n  font-weight: 700;\n  letter-spacing: -0.01em;\n  color: var(--%NS%text-main);\n}\n.notas-close[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 34px;\n  height: 34px;\n  margin-left: auto;\n  flex-shrink: 0;\n  border: none;\n  border-radius: 10px;\n  background: transparent;\n  color: var(--%NS%text-muted);\n  cursor: pointer;\n  transition:\n    background 0.16s ease,\n    color 0.16s ease,\n    transform 0.16s ease;\n}\n.notas-close[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%surface-hover);\n  color: var(--%NS%text-main);\n}\n.notas-close[_ngcontent-%COMP%]:active {\n  transform: scale(0.94);\n}\n.notas-close[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 2;\n  stroke-linecap: round;\n}\n.notas-body[_ngcontent-%COMP%] {\n  flex: 1 1 auto;\n  min-height: 0;\n  overflow-y: auto;\n  padding: 1rem 1.3rem;\n}\n.notas-body[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 8px;\n}\n.notas-body[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: var(--%NS%border-strong);\n  border-radius: 999px;\n}\n.notas-body[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: var(--%NS%accent-silver);\n}\n.notas-alert[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin-bottom: 0.9rem;\n  padding: 0.6rem 0.75rem;\n  border-radius: 10px;\n  background: var(--%NS%danger-bg);\n  border: 1px solid var(--%NS%danger-border);\n  color: var(--%NS%danger);\n  font-size: 0.84rem;\n  font-weight: 600;\n}\n.notas-alert[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 15px;\n  height: 15px;\n  flex-shrink: 0;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 2;\n  stroke-linecap: round;\n}\n.notas-loading[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.6rem;\n  padding: 2rem 0;\n  color: var(--%NS%text-muted);\n  font-size: 0.86rem;\n}\n.notas-spinner[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  border-radius: 50%;\n  border: 2.5px solid var(--%NS%border-color);\n  border-top-color: var(--%NS%accent-green);\n  animation: _ngcontent-%COMP%_notasSpin 0.7s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_notasSpin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.notas-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.6rem;\n}\n.nota-item[_ngcontent-%COMP%] {\n  position: relative;\n  padding: 0.8rem 2.9rem 0.8rem 0.95rem;\n  border: 1px solid var(--%NS%border-color);\n  border-radius: 14px;\n  background: var(--%NS%surface-subtle);\n  transition:\n    border-color 0.18s ease,\n    background 0.18s ease,\n    box-shadow 0.18s ease;\n}\n.nota-item[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%surface-card);\n  border-color: rgba(32, 176, 56, 0.35);\n  box-shadow: 0 10px 24px -14px rgba(15, 23, 42, 0.28);\n}\n.nota-item.nota-editing[_ngcontent-%COMP%] {\n  border-color: var(--%NS%accent-green);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.12);\n}\n.nota-texto[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--%NS%text-main);\n  font-size: 0.88rem;\n  line-height: 1.5;\n  white-space: pre-wrap;\n  word-break: break-word;\n}\n.nota-fecha[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.32rem;\n  margin-top: 0.55rem;\n  padding: 0.18rem 0.55rem;\n  border-radius: 999px;\n  background: var(--%NS%surface-hover);\n  border: 1px solid var(--%NS%border-color);\n  color: var(--%NS%accent-silver);\n  font-size: 0.7rem;\n  font-weight: 600;\n  font-variant-numeric: tabular-nums;\n}\n.nota-fecha[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 12px;\n  height: 12px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 2;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.nota-acciones[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0.6rem;\n  right: 0.6rem;\n  display: flex;\n  gap: 0.25rem;\n  opacity: 0;\n  transform: translateX(4px);\n  transition: opacity 0.18s ease, transform 0.18s ease;\n}\n.nota-item[_ngcontent-%COMP%]:hover   .nota-acciones[_ngcontent-%COMP%], \n.nota-item.nota-editing[_ngcontent-%COMP%]   .nota-acciones[_ngcontent-%COMP%] {\n  opacity: 1;\n  transform: translateX(0);\n}\n@media (hover: none), (pointer: coarse) {\n  .nota-acciones[_ngcontent-%COMP%] {\n    opacity: 1;\n    transform: none;\n  }\n}\n.nota-acciones[_ngcontent-%COMP%]   .btn-icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 30px;\n  height: 30px;\n  border: 1px solid transparent;\n  border-radius: 9px;\n  background: var(--%NS%surface-card);\n  color: var(--%NS%text-muted);\n  cursor: pointer;\n  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.1);\n  transition: all 0.16s ease;\n}\n.nota-acciones[_ngcontent-%COMP%]   .btn-icon[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n}\n.nota-acciones[_ngcontent-%COMP%]   .btn-icon.btn-edit[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%accent-green-light);\n  border-color: rgba(32, 176, 56, 0.35);\n  color: var(--%NS%accent-green-dark);\n}\n.nota-acciones[_ngcontent-%COMP%]   .btn-icon.btn-delete[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%danger-bg);\n  border-color: var(--%NS%danger-border);\n  color: var(--%NS%danger);\n}\n.nota-acciones[_ngcontent-%COMP%]   .btn-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 14px;\n  height: 14px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 1.9;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.notas-empty[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.2rem;\n  padding: 2.2rem 1rem;\n  text-align: center;\n}\n.notas-empty-icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 52px;\n  height: 52px;\n  margin-bottom: 0.5rem;\n  border-radius: 16px;\n  background: var(--%NS%surface-hover);\n  border: 1px dashed var(--%NS%border-strong);\n  color: var(--%NS%accent-silver);\n}\n.notas-empty-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 1.6;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.notas-empty-title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.92rem;\n  font-weight: 700;\n  color: var(--%NS%text-silver);\n}\n.notas-empty-sub[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.8rem;\n  color: var(--%NS%text-muted);\n}\n.notas-editor[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  padding: 0.95rem 1.3rem 1.1rem;\n  border-top: 1px solid var(--%NS%border-color);\n  background: var(--%NS%surface-subtle);\n}\n.notas-editor-label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 0.45rem;\n  font-size: 0.7rem;\n  font-weight: 800;\n  letter-spacing: 0.8px;\n  text-transform: uppercase;\n  color: var(--%NS%accent-silver);\n}\n.notas-editor-label.nota-editando-label[_ngcontent-%COMP%] {\n  color: var(--%NS%accent-green-dark);\n}\n.nota-textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 72px;\n  padding: 0.65rem 0.85rem;\n  border: 1.5px solid var(--%NS%input-border);\n  border-radius: 12px;\n  background: var(--%NS%surface-card);\n  color: var(--%NS%text-main);\n  font-family: var(--%NS%font-body);\n  font-size: 0.88rem;\n  line-height: 1.5;\n  resize: vertical;\n  transition: border-color 0.18s ease, box-shadow 0.18s ease;\n}\n.nota-textarea[_ngcontent-%COMP%]::placeholder {\n  color: var(--%NS%text-muted);\n}\n.nota-textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--%NS%accent-green);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.14);\n}\n.notas-editor-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.5rem;\n  margin-top: 0.65rem;\n}\n.notas-btn-primary[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.4rem;\n  min-height: 38px;\n  padding: 0.5rem 1.05rem;\n  border: none;\n  border-radius: 10px;\n  background:\n    linear-gradient(\n      135deg,\n      var(--%NS%accent-green-dark),\n      var(--%NS%accent-green));\n  color: var(--%NS%text-on-accent);\n  font-size: 0.84rem;\n  font-weight: 700;\n  cursor: pointer;\n  box-shadow: 0 10px 20px -8px rgba(32, 176, 56, 0.55);\n  transition:\n    transform 0.18s ease,\n    box-shadow 0.18s ease,\n    filter 0.18s ease;\n}\n.notas-btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-1px);\n  box-shadow: 0 14px 26px -8px rgba(32, 176, 56, 0.6);\n}\n.notas-btn-primary[_ngcontent-%COMP%]:disabled {\n  opacity: 0.55;\n  cursor: not-allowed;\n  transform: none;\n  box-shadow: none;\n}\n.notas-btn-primary[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 15px;\n  height: 15px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 2.4;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.notas-btn-ghost[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 38px;\n  padding: 0.5rem 0.95rem;\n  border: 1px solid var(--%NS%input-border);\n  border-radius: 10px;\n  background: var(--%NS%surface-card);\n  color: var(--%NS%text-silver);\n  font-size: 0.84rem;\n  font-weight: 700;\n  cursor: pointer;\n  transition: all 0.18s ease;\n}\n.notas-btn-ghost[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%surface-hover);\n  border-color: var(--%NS%border-strong);\n  color: var(--%NS%text-main);\n}\n.notas-footer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  flex-shrink: 0;\n  padding: 0.8rem 1.3rem;\n  border-top: 1px solid var(--%NS%border-color);\n  background: var(--%NS%surface-card);\n}\n.notas-count[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  font-size: 0.78rem;\n  font-weight: 600;\n  color: var(--%NS%text-muted);\n}\n.notas-count-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 22px;\n  height: 22px;\n  padding: 0 0.4rem;\n  border-radius: 999px;\n  background: var(--%NS%accent-green-light);\n  border: 1px solid rgba(32, 176, 56, 0.3);\n  color: var(--%NS%accent-green-dark);\n  font-size: 0.72rem;\n  font-weight: 800;\n  font-variant-numeric: tabular-nums;\n}\n.notas-close[_ngcontent-%COMP%]:focus-visible, \n.notas-btn-primary[_ngcontent-%COMP%]:focus-visible, \n.notas-btn-ghost[_ngcontent-%COMP%]:focus-visible, \n.nota-acciones[_ngcontent-%COMP%]   .btn-icon[_ngcontent-%COMP%]:focus-visible, \n.nota-textarea[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--%NS%accent-green);\n  outline-offset: 2px;\n}\nhtml[data-theme=dark][_ngcontent-%COMP%]   .notas-modal[_ngcontent-%COMP%] {\n  box-shadow: 0 40px 90px -28px rgba(0, 0, 0, 0.75), 0 20px 45px -24px rgba(34, 197, 94, 0.2);\n}\nhtml[data-theme=dark][_ngcontent-%COMP%]   .notas-header[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      180deg,\n      rgba(34, 197, 94, 0.1),\n      transparent 75%);\n}\nhtml[data-theme=dark][_ngcontent-%COMP%]   .notas-overlay[_ngcontent-%COMP%] {\n  background:\n    radial-gradient(\n      60% 50% at 50% 0%,\n      rgba(34, 197, 94, 0.08),\n      transparent 70%),\n    rgba(2, 6, 12, 0.72);\n}\n@media (max-width: 640px) {\n  .notas-overlay[_ngcontent-%COMP%] {\n    padding: 0.75rem;\n    align-items: flex-end;\n  }\n  .notas-modal[_ngcontent-%COMP%] {\n    width: 100%;\n    max-height: 92vh;\n    border-radius: 18px;\n  }\n  .notas-header[_ngcontent-%COMP%], \n   .notas-body[_ngcontent-%COMP%], \n   .notas-editor[_ngcontent-%COMP%], \n   .notas-footer[_ngcontent-%COMP%] {\n    padding-left: 1rem;\n    padding-right: 1rem;\n  }\n  .notas-footer[_ngcontent-%COMP%] {\n    flex-direction: column-reverse;\n    align-items: stretch;\n  }\n  .notas-footer[_ngcontent-%COMP%]   .notas-btn-ghost[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .notas-editor-actions[_ngcontent-%COMP%] {\n    flex-direction: column-reverse;\n  }\n  .notas-editor-actions[_ngcontent-%COMP%]   .notas-btn-primary[_ngcontent-%COMP%], \n   .notas-editor-actions[_ngcontent-%COMP%]   .notas-btn-ghost[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .nota-acciones[_ngcontent-%COMP%] {\n    opacity: 1;\n    transform: none;\n  }\n}\n.error[_ngcontent-%COMP%] {\n  margin-bottom: 0.8rem;\n  padding: 0.6rem 0.8rem;\n  border-radius: 9px;\n  background: var(--%NS%danger-bg);\n  border: 1px solid var(--%NS%danger-border);\n  color: var(--%NS%danger);\n  font-size: 0.84rem;\n}\n.catalog-spinner[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  border: 2.5px solid var(--%NS%input-border);\n  border-top-color: var(--%NS%accent-green);\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.7s linear infinite;\n  display: inline-block;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.status-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.26rem 0.7rem;\n  border-radius: 999px;\n  font-size: 0.75rem;\n  font-weight: 700;\n  white-space: nowrap;\n}\n.status-active[_ngcontent-%COMP%] {\n  background: var(--%NS%accent-green-light);\n  color: var(--%NS%accent-green-dark);\n  border: 1px solid #c9ecd0;\n}\n.status-inactive[_ngcontent-%COMP%] {\n  background: var(--%NS%surface-hover);\n  color: var(--%NS%text-muted);\n  border: 1px solid var(--%NS%border-color);\n}\n@media (max-width: 1024px) {\n  .stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .detail-stats[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}\n@media (max-width: 768px) {\n  .sellers-container[_ngcontent-%COMP%] {\n    padding: 1rem;\n    border-radius: 12px;\n  }\n  .sellers-container[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n    gap: 0.85rem;\n    min-height: 0;\n    padding: 1.25rem;\n  }\n  .sellers-container[_ngcontent-%COMP%]   .page-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 1.7rem;\n  }\n  .sellers-container[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%] {\n    justify-content: center;\n    width: 100%;\n  }\n  .toolbar[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n    gap: 0.75rem;\n    padding: 1rem;\n  }\n  .search-wrapper[_ngcontent-%COMP%] {\n    flex: 0 0 auto;\n    width: 100%;\n  }\n  .search-input[_ngcontent-%COMP%] {\n    min-height: 44px;\n    font-size: 1rem;\n  }\n  .search-icon[_ngcontent-%COMP%] {\n    top: 50%;\n    transform: translateY(-50%);\n  }\n  .chip-group[_ngcontent-%COMP%] {\n    width: 100%;\n    display: flex;\n    flex-wrap: wrap;\n    justify-content: center;\n    gap: 0.5rem;\n    padding: 0;\n    background: transparent;\n    border-radius: 0;\n  }\n  .chip[_ngcontent-%COMP%] {\n    min-height: 38px;\n    padding: 0.4rem 1rem;\n    border: 1px solid var(--%NS%border-color);\n    background: var(--%NS%surface-subtle);\n    color: var(--%NS%text-silver);\n    border-radius: 999px;\n    white-space: nowrap;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n  }\n  .chip[_ngcontent-%COMP%]:hover {\n    border-color: #8bd39a;\n    background: var(--%NS%surface-hover);\n    color: var(--%NS%accent-green-dark);\n  }\n  .chip.is-active[_ngcontent-%COMP%] {\n    background: var(--%NS%accent-green-light);\n    border-color: var(--%NS%accent-green);\n    color: var(--%NS%accent-green-dark);\n  }\n  .toolbar-select[_ngcontent-%COMP%] {\n    flex: 0 0 auto;\n    width: 100%;\n  }\n  .toolbar-select[_ngcontent-%COMP%]::after {\n    content: "";\n    position: absolute;\n    right: 1.05rem;\n    top: 50%;\n    width: 9px;\n    height: 9px;\n    margin-top: -5px;\n    border-right: 2px solid var(--%NS%text-silver);\n    border-bottom: 2px solid var(--%NS%text-silver);\n    transform: rotate(45deg);\n    pointer-events: none;\n  }\n  .toolbar-select[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n    width: 100%;\n    min-height: 44px;\n    padding: 0.55rem 2.6rem 0.55rem 1.9rem;\n    font-size: 1rem;\n  }\n  .toolbar-select[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n    top: 50%;\n    transform: translateY(-50%);\n  }\n  .results-count[_ngcontent-%COMP%] {\n    margin-left: 0;\n    align-self: flex-end;\n  }\n  .stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr;\n  }\n  .detail-stats[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .drawer[_ngcontent-%COMP%] {\n    width: 100vw;\n  }\n  .search-group[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .btn-search[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n  }\n  .modal-content[_ngcontent-%COMP%] {\n    padding: 1rem;\n    max-width: 100%;\n  }\n  .toast-host[_ngcontent-%COMP%] {\n    right: 0.7rem;\n    bottom: 0.7rem;\n    left: 0.7rem;\n    max-width: none;\n  }\n}\n@media (max-width: 768px) {\n  .table-wrapper[_ngcontent-%COMP%] {\n    overflow: visible;\n    border: none;\n    background: transparent;\n    box-shadow: none;\n  }\n  .users-table[_ngcontent-%COMP%] {\n    display: block;\n    min-width: 0;\n    background: transparent;\n  }\n  .users-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .users-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%] {\n    display: block;\n  }\n  .users-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    display: block;\n    padding: 0.9rem 1rem;\n    margin-bottom: 0.75rem;\n    background: var(--%NS%surface-card);\n    border: 1px solid var(--%NS%input-border);\n    border-radius: 14px;\n    box-shadow: 0 8px 20px rgba(15, 23, 42, 0.04);\n  }\n  .users-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n    background: transparent;\n  }\n  .users-table[_ngcontent-%COMP%]   tr.is-selected[_ngcontent-%COMP%] {\n    border-color: #8bd39a;\n  }\n  .users-table[_ngcontent-%COMP%]   tr.is-selected[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    background: transparent;\n    border-top-color: transparent;\n  }\n  .users-table[_ngcontent-%COMP%]   tr.is-selected[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {\n    box-shadow: none;\n  }\n  .users-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 0.9rem;\n    min-width: 0;\n    padding: 0.5rem 0;\n    border: 0;\n    color: var(--%NS%text-silver);\n  }\n  .users-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]    + td[_ngcontent-%COMP%] {\n    border-top: 1px solid var(--%NS%surface-hover);\n  }\n  .users-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]::before {\n    content: attr(data-label);\n    flex-shrink: 0;\n    font-size: 0.7rem;\n    font-weight: 700;\n    letter-spacing: 0.6px;\n    text-transform: uppercase;\n    color: var(--%NS%text-muted);\n  }\n  .users-table[_ngcontent-%COMP%]   td.user-cell[_ngcontent-%COMP%]::before {\n    display: none;\n  }\n  .user-cell[_ngcontent-%COMP%] {\n    justify-content: flex-start;\n    min-width: 0;\n    gap: 0.75rem;\n  }\n  .location-cell[_ngcontent-%COMP%] {\n    max-width: none;\n    white-space: normal;\n    overflow: visible;\n    text-overflow: clip;\n  }\n  .actions-column[_ngcontent-%COMP%] {\n    justify-content: flex-start;\n  }\n  .action-buttons[_ngcontent-%COMP%] {\n    margin-left: auto;\n    gap: 0.45rem;\n  }\n  .btn-icon[_ngcontent-%COMP%] {\n    width: 40px;\n    height: 40px;\n  }\n}\n.sellers-container[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%]:focus-visible, \n.btn-primary[_ngcontent-%COMP%]:focus-visible, \n.sellers-container[_ngcontent-%COMP%]   .btn-icon[_ngcontent-%COMP%]:focus-visible, \n.btn-icon[_ngcontent-%COMP%]:focus-visible, \n.sellers-container[_ngcontent-%COMP%]   .btn-cancel[_ngcontent-%COMP%]:focus-visible, \n.btn-cancel[_ngcontent-%COMP%]:focus-visible, \n.sellers-container[_ngcontent-%COMP%]   .btn-confirm[_ngcontent-%COMP%]:focus-visible, \n.btn-confirm[_ngcontent-%COMP%]:focus-visible, \n.sellers-container[_ngcontent-%COMP%]   .switch[_ngcontent-%COMP%]:focus-visible, \n.switch[_ngcontent-%COMP%]:focus-visible, \n.sellers-container[_ngcontent-%COMP%]   .chip[_ngcontent-%COMP%]:focus-visible, \n.chip[_ngcontent-%COMP%]:focus-visible, \n.drawer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:focus-visible, \n.drawer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:focus-visible, \n.drawer[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus-visible, \n.drawer[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus-visible, \n.drawer[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--%NS%accent-green);\n  outline-offset: 2px;\n}\n.btn-danger[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.45rem;\n  padding: 0.6rem 1.2rem;\n  border: none;\n  border-radius: 10px;\n  background: #e5484d;\n  color: var(--%NS%text-on-accent);\n  font-weight: 600;\n  font-size: 0.9rem;\n  font-family: inherit;\n  cursor: pointer;\n  transition:\n    background 0.2s ease,\n    transform 0.15s ease,\n    box-shadow 0.2s ease;\n}\n.btn-danger[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #d93a3f;\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(229, 72, 77, 0.25);\n}\n.btn-danger[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.btn-danger[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid #e5484d;\n  outline-offset: 2px;\n}\n.confirm-modal[_ngcontent-%COMP%] {\n  max-width: 420px;\n  width: calc(100% - 2rem);\n  text-align: center;\n}\n.confirm-icon[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 56px;\n  margin: 0 auto 0.9rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n}\n.confirm-icon.danger[_ngcontent-%COMP%] {\n  background: rgba(229, 72, 77, 0.12);\n  color: #e5484d;\n}\n.confirm-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 26px;\n  height: 26px;\n  stroke: currentColor;\n  fill: none;\n  stroke-width: 2;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.confirm-modal[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 0.5rem;\n  font-size: 1.15rem;\n  color: var(--%NS%text-main);\n}\n.confirm-modal[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 1.2rem;\n  color: #555555;\n  font-size: 0.92rem;\n  line-height: 1.5;\n}\n.confirm-modal[_ngcontent-%COMP%]   .modal-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.75rem;\n  justify-content: center;\n}\n.sellers-container[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%]:not(.toast-host):not(.seller-notes-tooltip) {\n  position: relative;\n  z-index: 1;\n}\n@media (max-width: 480px) {\n  .stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .detail-actions[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n}\nhtml[data-theme="dark"][_nghost-%COMP%]   .avatar[_ngcontent-%COMP%], html[data-theme="dark"]   [_nghost-%COMP%]   .avatar[_ngcontent-%COMP%] {\n  box-shadow: inset 0 0 0 999px rgba(13, 21, 23, 0.32), 0 4px 10px rgba(0, 0, 0, 0.45);\n}\n@media (max-width: 768px) {\n  .chip[_ngcontent-%COMP%] {\n    padding: 0.55rem 1.05rem;\n  }\n  .switch[_ngcontent-%COMP%]::after {\n    content: "";\n    position: absolute;\n    inset: -10px;\n    border-radius: 999px;\n  }\n}\n@media (max-width: 480px) {\n  .stats-grid[_ngcontent-%COMP%] {\n    gap: 0.6rem;\n  }\n  .stat-card[_ngcontent-%COMP%] {\n    padding: 0.8rem 0.8rem;\n    gap: 0.55rem;\n  }\n  .stat-icon[_ngcontent-%COMP%] {\n    width: 36px;\n    height: 36px;\n  }\n  .stat-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n    width: 20px;\n    height: 20px;\n  }\n  .stat-body[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 1.2rem;\n  }\n  .stat-body[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    font-size: 0.66rem;\n    letter-spacing: 0.2px;\n  }\n}\n/*# sourceMappingURL=admin-sellers.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminSellersComponent, [{
    type: Component,
    args: [{ selector: "app-admin-sellers", standalone: true, imports: [CommonModule, FormsModule], template: `<div class="sellers-container">\r
    <!-- CABECERA -->\r
    <div class="page-header">\r
        <div class="page-heading">\r
            <span class="page-kicker">Equipo comercial</span>\r
            <h2>Vendedores</h2>\r
            <p>Administra sucursales, actividad y acceso de tu fuerza de ventas.</p>\r
        </div>\r
        <button class="btn-primary" (click)="openNewSeller()"><span class="button-icon">+</span> Nuevo Vendedor</button>\r
    </div>\r
\r
    <!-- M\xC9TRICAS -->\r
    <div class="stats-grid">\r
        <button type="button" class="stat-card" [class.is-active]="statusFilter === 'todos'" (click)="setStatusFilter('todos')">\r
            <span class="stat-icon tone-slate">\r
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>\r
            </span>\r
            <span class="stat-body"><strong>{{ stats.total }}</strong><small>Vendedores</small></span>\r
        </button>\r
        <button type="button" class="stat-card" [class.is-active]="statusFilter === 'activos'" (click)="setStatusFilter('activos')">\r
            <span class="stat-icon tone-green">\r
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><path d="M22 4 12 14.01l-3-3"></path></svg>\r
            </span>\r
            <span class="stat-body"><strong>{{ stats.activos }}</strong><small>Activos</small></span>\r
        </button>\r
        <button type="button" class="stat-card" [class.is-active]="statusFilter === 'inactivos'" (click)="setStatusFilter('inactivos')">\r
            <span class="stat-icon tone-amber">\r
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><path d="M8 11l3 3 6-6"></path></svg>\r
            </span>\r
            <span class="stat-body"><strong>{{ stats.inactivos }}</strong><small>Inactivos</small></span>\r
        </button>\r
        <div class="stat-card stat-plain">\r
            <span class="stat-icon tone-blue">\r
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6"></path><path d="M9 13h6"></path><path d="M9 17h4"></path></svg>\r
            </span>\r
            <span class="stat-body"><strong>{{ stats.cotizaciones }}</strong><small>Cotizaciones generadas</small></span>\r
        </div>\r
    </div>\r
    <!-- B\xDASQUEDA Y FILTROS -->\r
    <div class="toolbar">\r
        <div class="search-wrapper">\r
            <svg class="search-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>\r
            <input type="text" [(ngModel)]="searchTerm" (input)="onSearch()"\r
                placeholder="Buscar por nombre, n\xFAmero, marca o sucursal..." class="search-input" />\r
            <button *ngIf="searchTerm" type="button" class="search-clear" (click)="clearSearch()" aria-label="Limpiar b\xFAsqueda">\xD7</button>\r
        </div>\r
\r
        <div class="chip-group" role="group" aria-label="Filtrar por estado">\r
            <button type="button" class="chip" [class.is-active]="statusFilter === 'todos'" (click)="setStatusFilter('todos')">Todos</button>\r
            <button type="button" class="chip" [class.is-active]="statusFilter === 'activos'" (click)="setStatusFilter('activos')">Activos</button>\r
            <button type="button" class="chip" [class.is-active]="statusFilter === 'inactivos'" (click)="setStatusFilter('inactivos')">Inactivos</button>\r
        </div>\r
\r
        <label class="toolbar-select" *ngIf="brandsList.length">\r
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>\r
            <select [(ngModel)]="brandFilter" (change)="setBrandFilter(brandFilter)">\r
                <option value="todas">Todas las agencias</option>\r
                <option *ngFor="let b of brandsList" [value]="b">{{ b }}</option>\r
            </select>\r
        </label>\r
\r
        <label class="toolbar-select">\r
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18"></path><path d="M7 12h10"></path><path d="M10 18h4"></path></svg>\r
            <select [(ngModel)]="sortBy" (change)="setSortBy(sortBy)">\r
                <option value="recientes">M\xE1s recientes</option>\r
                <option value="nombre">Nombre A\u2013Z</option>\r
                <option value="cotizaciones">M\xE1s cotizaciones</option>\r
                <option value="antiguos">Antiguos</option>\r
            </select>\r
        </label>\r
\r
        <span class="results-count" *ngIf="!loading">{{ filteredSellers().length }} resultado(s)</span>\r
    </div>\r
\r
    <!-- SKELETON -->\r
    <div *ngIf="loading" class="skeleton-list" aria-label="Cargando vendedores">\r
        <div class="skeleton-row" *ngFor="let i of [0,1,2,3,4]"></div>\r
    </div>\r
    <!-- TABLA -->\r
    <div class="table-wrapper" *ngIf="!loading && filteredSellers().length > 0">\r
        <table class="users-table">\r
            <thead>\r
                <tr><th>Vendedor</th><th>Agencia</th><th>Ubicaci\xF3n</th><th>Cotizaciones</th><th>Estado</th><th class="actions-column">Acciones</th></tr>\r
            </thead>\r
            <tbody>\r
                <tr *ngFor="let seller of filteredSellers()" [class.is-selected]="selectedSellerCardId === seller.id"\r
                    (click)="openDetail(seller)" tabindex="0" (keydown.enter)="openDetail(seller)"\r
                    (keydown.space)="openDetail(seller); $event.preventDefault()"\r
                    [attr.aria-label]="'Ver detalle de ' + seller.full_name">\r
                    <td class="user-cell" data-label="Vendedor">\r
                        <span class="avatar" [class]="getAvatarClass(seller.full_name)" aria-hidden="true">\r
                            {{ getInitials(seller.full_name) }}\r
                            <span class="avatar-dot" [class.is-on]="seller.active ?? true"></span>\r
                        </span>\r
                        <span class="user-meta">\r
                            <strong (mouseenter)="mostrarNotasTooltip($event, seller)" (mouseleave)="ocultarNotasTooltip()">{{ seller.full_name }}</strong>\r
                            <small>{{ seller.seller_number || '-' }}</small>\r
                        </span>\r
                    </td>\r
                    <td data-label="Agencia"><span class="brand-chip">{{ seller.agency_brand || '\u2014' }}</span></td>\r
                    <td class="location-cell" data-label="Ubicaci\xF3n" [title]="seller.agency_location || '-'">\r
                        <svg class="pin-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>\r
                        {{ seller.agency_location || '-' }}\r
                    </td>\r
                    <td data-label="Cotizaciones"><strong class="quote-count">{{ seller.quote_count || 0 }}</strong></td>\r
                    <td data-label="Estado">\r
                        <button type="button" class="switch" [class.is-on]="seller.active ?? true" role="switch"\r
                            [attr.aria-checked]="seller.active ?? true"\r
                            [title]="'Cambiar estado (' + getStatusLabel(seller.active ?? true) + ')'"\r
                            (click)="toggleSellerStatus(seller); $event.stopPropagation()">\r
                            <span class="switch-thumb"></span>\r
                        </button>\r
                        <span class="switch-label">{{ getStatusLabel(seller.active ?? true) }}</span>\r
                    </td>\r
                    <td class="actions-column" data-label="Acciones" (click)="$event.stopPropagation()">\r
                        <div class="action-buttons">\r
                            <button class="btn-icon btn-note" (click)="abrirNotas(seller)" title="Notas" aria-label="Ver notas del vendedor">\r
                                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16v13H7l-3 3Z"></path><path d="M8 8h8"></path><path d="M8 12h6"></path></svg>\r
                            </button>\r
                            <button class="btn-icon btn-edit" (click)="openEditSeller(seller)" title="Editar" aria-label="Editar vendedor">\r
                                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg>\r
                            </button>\r
                            <button class="btn-icon btn-delete" (click)="deleteSeller(seller.id)" title="Eliminar" aria-label="Eliminar vendedor">\r
                                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="M19 6l-1 14H6L5 6"></path><path d="M10 11v5"></path><path d="M14 11v5"></path></svg>\r
                            </button>\r
                        </div>\r
                    </td>\r
                </tr>\r
            </tbody>\r
        </table>\r
    </div>\r
\r
    <!-- ESTADO VAC\xCDO -->\r
    <div *ngIf="!loading && filteredSellers().length === 0" class="catalog-state empty-state">\r
        <span class="empty-state-icon" aria-hidden="true">\r
            <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"></path><circle cx="10" cy="7" r="4"></circle><path d="M20 8v6"></path><path d="M23 11h-6"></path></svg>\r
        </span>\r
        <strong>{{ sellers().length === 0 ? 'A\xFAn no hay vendedores registrados' : 'Sin resultados' }}</strong>\r
        <span>{{ sellers().length === 0 ? 'Agrega tu primer vendedor para empezar.' : 'Ajusta tu b\xFAsqueda o los filtros.' }}</span>\r
        <button *ngIf="sellers().length > 0" type="button" class="btn-secondary" (click)="clearFilters()">Limpiar filtros</button>\r
        <button *ngIf="sellers().length === 0" type="button" class="btn-primary" (click)="openNewSeller()">+ Nuevo Vendedor</button>\r
    </div>\r
</div>\r
    <!-- TOOLTIP NOTAS -->\r
<div class="seller-notes-tooltip" *ngIf="showSellerTooltip" [style.left.px]="sellerTooltipPosition.x"\r
    [style.top.px]="sellerTooltipPosition.y">\r
    <div class="seller-notes-tooltip-header">\r
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16v13H7l-3 3Z"></path><path d="M8 8h8"></path><path d="M8 12h6"></path></svg>\r
        <span>Notas del vendedor</span>\r
    </div>\r
    <div class="seller-notes-tooltip-body">{{ sellerTooltipContent }}</div>\r
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
\r
<!-- DRAWER: DETALLE DEL VENDEDOR -->\r
<div class="drawer-overlay" *ngIf="showDetailDrawer" (click)="closeDetail()">\r
    <aside class="drawer detail-drawer" (click)="$event.stopPropagation()" role="dialog" aria-label="Detalle del vendedor">\r
        <div class="drawer-header">\r
            <div class="detail-id">\r
                <span class="avatar avatar-lg" [class]="getAvatarClass(detailSeller.full_name)" aria-hidden="true">{{ getInitials(detailSeller.full_name) }}</span>\r
                <div>\r
                    <span class="page-kicker">Detalle del vendedor</span>\r
                    <h3>{{ detailSeller.full_name }}</h3>\r
                    <span class="status-badge" [class]="getStatusClass(detailSeller.active ?? true)">{{ getStatusLabel(detailSeller.active ?? true) }}</span>\r
                </div>\r
            </div>\r
            <button class="drawer-close" (click)="closeDetail()" aria-label="Cerrar detalle">\xD7</button>\r
        </div>\r
\r
        <div class="drawer-body">\r
            <div class="detail-stats">\r
                <div class="detail-stat"><strong>{{ detailSeller.quote_count || 0 }}</strong><small>Cotizaciones</small></div>\r
                <div class="detail-stat"><span class="brand-chip">{{ detailSeller.agency_brand || '\u2014' }}</span><small>Agencia</small></div>\r
                <div class="detail-stat"><strong>{{ detailSeller.seller_number || '\u2014' }}</strong><small>N\xB0 de contacto</small></div>\r
            </div>\r
\r
            <div class="detail-section">\r
                <h4>Ubicaci\xF3n de la sucursal</h4>\r
                <p class="detail-address">{{ detailSeller.agency_location || 'Sin ubicaci\xF3n registrada' }}</p>\r
                <div class="detail-map-wrap">\r
                    <div #detailMapContainer class="map-container detail-map"></div>\r
                    <span *ngIf="!detailSeller.latitude || !detailSeller.longitude" class="map-empty-hint">Sin coordenadas guardadas</span>\r
                </div>\r
            </div>\r
\r
            <div class="detail-section">\r
                <h4>Notas de seguimiento</h4>\r
                <button class="btn-secondary btn-block" (click)="abrirNotas(detailSeller)">\u{1F4AC} Ver y administrar notas</button>\r
            </div>\r
        </div>\r
\r
        <div class="drawer-footer">\r
            <button class="btn-secondary" (click)="openEditSeller(detailSeller)">Editar</button>\r
            <button class="btn-secondary danger" (click)="deleteSeller(detailSeller.id)">Eliminar</button>\r
            <button class="btn-primary" (click)="abrirNotas(detailSeller)">Notas</button>\r
        </div>\r
    </aside>\r
</div>\r
\r
<!-- MODAL DE CONFIRMACI\xD3N (ELIMINAR) -->\r
<div class="modal-overlay" *ngIf="showConfirmModal" (click)="cancelModal()">\r
    <div class="modal-content" (click)="$event.stopPropagation()">\r
        <div class="modal-heading modal-heading-warning">\r
            <span class="modal-icon">\r
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>\r
            </span>\r
            <div><span class="modal-eyebrow">Confirmaci\xF3n</span><h3>Eliminar vendedor</h3></div>\r
        </div>\r
        <p>\r
            \xBFEst\xE1s seguro de que deseas eliminar a <strong>{{ getSellerName() }}</strong>?\r
            <br>\r
            <span class="warning-copy">\r
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>\r
                Esta acci\xF3n eliminar\xE1 todas sus cotizaciones ({{ getSellerQuoteCount() }} cotizaciones).\r
            </span>\r
            <br>\r
            Esta operaci\xF3n no se puede deshacer.\r
        </p>\r
        <div class="modal-actions">\r
            <button class="btn-cancel" (click)="cancelModal()">Cancelar</button>\r
            <button class="btn-confirm" (click)="confirmSellerDelete()" [disabled]="actionLoading">\r
                {{ actionLoading ? 'Eliminando...' : 'Eliminar' }}\r
            </button>\r
        </div>\r
    </div>\r
</div>\r
    <!-- DRAWER: FORMULARIO (CREAR / EDITAR) -->\r
<div class="drawer-overlay" *ngIf="showFormDrawer" (click)="closeFormDrawer()">\r
    <aside class="drawer form-drawer" (click)="$event.stopPropagation()" role="dialog"\r
        [attr.aria-label]="isEditMode ? 'Editar vendedor' : 'Nuevo vendedor'">\r
        <div class="drawer-header">\r
            <div>\r
                <span class="page-kicker">{{ isEditMode ? 'Edici\xF3n de vendedor' : 'Nuevo registro' }}</span>\r
                <h3>{{ isEditMode ? 'Editar Vendedor' : 'Nuevo Vendedor' }}</h3>\r
            </div>\r
            <button class="drawer-close" (click)="closeFormDrawer()" aria-label="Cerrar formulario">\xD7</button>\r
        </div>\r
\r
        <!-- STEPPER -->\r
        <div class="stepper" aria-label="Progreso del formulario">\r
            <div class="step" [class.is-active]="formStep === 1" [class.is-done]="formStep === 2">\r
                <span class="step-num">{{ formStep === 2 ? '\u2713' : '1' }}</span>\r
                <span class="step-label">Datos personales</span>\r
            </div>\r
            <div class="step-line" [class.is-done]="formStep === 2"></div>\r
            <div class="step" [class.is-active]="formStep === 2">\r
                <span class="step-num">2</span>\r
                <span class="step-label">Sucursal</span>\r
            </div>\r
        </div>\r
\r
        <div class="drawer-body">\r
            <div *ngIf="formError" class="form-banner error">{{ formError }}</div>\r
            <div *ngIf="formLoading" class="drawer-loading"><span class="catalog-spinner"></span> Cargando...</div>\r
\r
            <form (ngSubmit)="nextFormStep()" *ngIf="!formLoading" novalidate>\r
                <!-- PASO 1: DATOS PERSONALES -->\r
                <ng-container *ngIf="formStep === 1">\r
                    <div class="form-group" [class.has-error]="formValidated && fieldErrors['seller_number']">\r
                        <label>N\xFAmero de celular *</label>\r
                        <input type="text" [(ngModel)]="sellerForm.seller_number" name="seller_number"\r
                            [disabled]="isEditMode" placeholder="Ej. 5512345678" inputmode="numeric" maxlength="10" (input)="onPhoneInput($event)" />\r
                        <small class="field-error" *ngIf="formValidated && fieldErrors['seller_number']">{{ fieldErrors['seller_number'] }}</small>\r
                        <small *ngIf="isEditMode && !fieldErrors['seller_number']">Este n\xFAmero define el acceso; no se puede modificar.</small>\r
                    </div>\r
\r
                    <div class="form-group" [class.has-error]="formValidated && fieldErrors['full_name']">\r
                        <label>Nombre Completo *</label>\r
                        <input type="text" [(ngModel)]="sellerForm.full_name" name="full_name" placeholder="Juan P\xE9rez" />\r
                        <small class="field-error" *ngIf="formValidated && fieldErrors['full_name']">{{ fieldErrors['full_name'] }}</small>\r
                    </div>\r
\r
                    <div class="form-group" [class.has-error]="formValidated && fieldErrors['password']">\r
                        <label>Contrase\xF1a {{ isEditMode ? '(opcional)' : '*' }}</label>\r
                        <div class="input-with-action">\r
                            <input [type]="showPassword ? 'text' : 'password'" [(ngModel)]="sellerForm.password"\r
                                name="password" placeholder="{{ isEditMode ? 'Dejar vac\xEDa conserva la actual' : 'M\xEDnimo 6 caracteres' }}" />\r
                            <button type="button" class="btn-ghost-icon" (click)="showPassword = !showPassword"\r
                                [title]="showPassword ? 'Ocultar contrase\xF1a' : 'Mostrar contrase\xF1a'">\r
                                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>\r
                            </button>\r
                        </div>\r
                        <div class="field-actions">\r
                            <small class="field-error" *ngIf="formValidated && fieldErrors['password']">{{ fieldErrors['password'] }}</small>\r
                            <button type="button" class="btn-link" (click)="generatePassword()">\u{1F6E1} Generar contrase\xF1a segura</button>\r
                        </div>\r
                    </div>\r
\r
                    <div class="form-group" *ngIf="isEditMode">\r
                        <label>Estado</label>\r
                        <select [(ngModel)]="sellerForm.active" name="active">\r
                            <option [ngValue]="true">Activo</option>\r
                            <option [ngValue]="false">Inactivo</option>\r
                        </select>\r
                    </div>\r
                </ng-container>\r
                <!-- PASO 2: SUCURSAL -->\r
                <ng-container *ngIf="formStep === 2">\r
                    <div class="form-group"\r
                        [class.has-error]="formValidated && (fieldErrors['agency_brand'] || fieldErrors['other_brand'])">\r
                        <label>Marca (Agencia) *</label>\r
                        <select [(ngModel)]="sellerForm.agency_brand" name="agency_brand">\r
                            <option value="">Selecciona una marca</option>\r
                            <option *ngFor="let brand of brands" [value]="brand">{{ brand }}</option>\r
                            <option value="Otro">Otro</option>\r
                        </select>\r
                        <input *ngIf="sellerForm.agency_brand === 'Otro'" type="text" [(ngModel)]="sellerForm.other_brand"\r
                            placeholder="Escribe la marca" name="other_brand" class="spaced-input" />\r
                        <small class="field-error" *ngIf="formValidated && (fieldErrors['agency_brand'] || fieldErrors['other_brand'])">\r
                            {{ fieldErrors['agency_brand'] || fieldErrors['other_brand'] }}\r
                        </small>\r
                    </div>\r
\r
                    <div class="form-group" [class.has-error]="formValidated && fieldErrors['agency_location']">\r
                        <label>Ubicaci\xF3n de Sucursal *</label>\r
                        <div #mapContainer class="map-container"></div>\r
                        <div class="coords-info" *ngIf="selectedCoords">\r
                            <span class="coord-label">\u{1F4CD} Direcci\xF3n:</span>\r
                            <span class="coord-value">{{ addressText || 'Cargando direcci\xF3n...' }}</span>\r
                        </div>\r
                        <small class="map-hint">Haz clic en el mapa para marcar la ubicaci\xF3n exacta de la sucursal</small>\r
                        <small class="field-error" *ngIf="formValidated && fieldErrors['agency_location']">{{ fieldErrors['agency_location'] }}</small>\r
                    </div>\r
\r
                    <div class="search-group">\r
                        <input type="text" [(ngModel)]="manualAddress" name="manualAddress"\r
                            placeholder="Buscar sucursal (ej. Toyota Quer\xE9taro)" (keydown)="onSearchKeydown($event)" />\r
                        <button type="button" class="btn-search" (click)="searchLocation()" [disabled]="isSearching()">\r
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>\r
                            {{ isSearching() ? 'Buscando...' : 'Buscar' }}\r
                        </button>\r
                    </div>\r
                    <p class="map-hint">Escribe una direcci\xF3n y presiona Enter o haz clic en "Buscar"</p>\r
                </ng-container>\r
\r
                <div class="drawer-actions">\r
                    <button type="button" class="btn-cancel" (click)="prevFormStep()">\r
                        {{ formStep === 2 ? 'Volver' : 'Cancelar' }}\r
                    </button>\r
                    <button type="submit" class="btn-confirm" [disabled]="formLoading">\r
                        {{ formLoading ? 'Guardando...' : isEditMode ? (formStep === 2 ? 'Actualizar' : 'Continuar') : (formStep === 2 ? 'Crear' : 'Continuar') }}\r
                    </button>\r
                </div>\r
            </form>\r
        </div>\r
    </aside>\r
</div>\r
\r
<!-- MODAL DE NOTAS -->\r
<div class="modal-overlay notas-overlay" *ngIf="showNotasModal" (click)="cerrarNotas()">\r
    <div class="notas-modal" role="dialog" aria-modal="true" aria-label="Notas de vendedor" (click)="$event.stopPropagation()">\r
        <header class="notas-header">\r
            <span class="notas-icon">\r
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16v13H7l-3 3Z"></path><path d="M8 8h8"></path><path d="M8 12h6"></path></svg>\r
            </span>\r
            <div class="notas-titles">\r
                <span class="notas-eyebrow">Seguimiento</span>\r
                <h3 class="notas-title">Notas de Vendedor</h3>\r
            </div>\r
            <button type="button" class="notas-close" (click)="cerrarNotas()" title="Cerrar" aria-label="Cerrar">\r
                <svg viewBox="0 0 24 24" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>\r
            </button>\r
        </header>\r
\r
        <!-- MODAL DE CONFIRMACI\xD3N PARA ELIMINAR NOTA -->\r
        <div class="modal-overlay" *ngIf="showNotaConfirmModal" (click)="cancelarEliminarNota()">\r
          <div class="modal-content confirm-modal" (click)="$event.stopPropagation()">\r
            <div class="confirm-icon danger">\r
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="M19 6l-1 14H6L5 6"></path><path d="M10 11v5"></path><path d="M14 11v5"></path></svg>\r
            </div>\r
            <h3>Eliminar nota</h3>\r
            <p>\xBFEst\xE1s seguro de que deseas eliminar esta nota? Esta acci\xF3n no se puede deshacer.</p>\r
            <div class="modal-actions">\r
              <button class="btn-cancel" (click)="cancelarEliminarNota()">Cancelar</button>\r
              <button class="btn-confirm" (click)="confirmarEliminarNota()" [disabled]="notaLoading">\r
                {{ notaLoading ? 'Eliminando...' : 'Eliminar' }}\r
              </button>\r
            </div>\r
          </div>\r
        </div>\r
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
                <article class="nota-item" *ngFor="let n of notasVendedor" [class.nota-editing]="notaEditando?.id === n.id">\r
                    <p class="nota-texto">{{ n.texto }}</p>\r
                    <span class="nota-fecha">\r
                        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path></svg>\r
                        {{ n.created_at | date:'dd/MM/yyyy HH:mm' }}\r
                    </span>\r
                    <div class="nota-acciones">\r
                        <button type="button" class="btn-icon btn-edit" (click)="editarNota(n)" title="Editar nota" aria-label="Editar nota">\r
                            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg>\r
                        </button>\r
                        <button type="button" class="btn-icon btn-delete" (click)="eliminarNota(n)" title="Eliminar nota" aria-label="Eliminar nota">\r
                            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="M19 6l-1 14H6L5 6"></path><path d="M10 11v5"></path><path d="M14 11v5"></path></svg>\r
                        </button>\r
                    </div>\r
                </article>\r
\r
                <div *ngIf="notasVendedor.length === 0" class="notas-empty">\r
                    <span class="notas-empty-icon">\r
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6"></path><path d="M16 13H8"></path><path d="M16 17H8"></path><path d="M10 9H8"></path></svg>\r
                    </span>\r
                    <p class="notas-empty-title">Sin notas todav\xEDa</p>\r
                    <p class="notas-empty-sub">Agrega la primera nota de seguimiento para este vendedor.</p>\r
                </div>\r
            </div>\r
        </div>\r
\r
        <div class="notas-editor">\r
            <label class="notas-editor-label" for="nota-vendedor-textarea">{{ notaEditando ? 'Editar nota' : 'Nueva nota' }}</label>\r
            <textarea id="nota-vendedor-textarea" class="nota-textarea" rows="3" [(ngModel)]="notaText" placeholder="Escribe una nota de seguimiento..."></textarea>\r
            <div class="notas-editor-actions">\r
                <button type="button" class="notas-btn-ghost" (click)="notaEditando = null; notaText = ''">Cancelar</button>\r
                <button type="button" class="notas-btn-primary" (click)="guardarNota()" [disabled]="!notaText.trim() || notaLoading">\r
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>\r
                    {{ notaEditando ? 'Actualizar' : 'Agregar nota' }}\r
                </button>\r
            </div>\r
        </div>\r
\r
        <div class="notas-footer">\r
            <span class="notas-count">\r
                <span class="notas-count-badge">{{ notasVendedor.length }}</span>\r
                {{ notasVendedor.length === 1 ? 'nota registrada' : 'notas registradas' }}\r
            </span>\r
            <button type="button" class="notas-btn-ghost" (click)="cerrarNotas()">Cerrar</button>\r
        </div>\r
    </div>\r
</div>`, styles: ['/* src/app/components/admin/admin-sellers/admin-sellers.component.css */\n.sellers-container {\n  position: relative;\n  overflow: hidden;\n  background: var(--surface-subtle);\n  border: 0;\n  padding: 0;\n  box-shadow: none;\n}\n.sellers-container::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 38%;\n  height: 190px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(32, 176, 56, 0.14),\n      rgba(16, 37, 31, 0.07));\n  clip-path: polygon(35% 0, 100% 0, 100% 100%, 0 100%);\n  pointer-events: none;\n  z-index: 0;\n}\n.sellers-container .page-header {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-end;\n  min-height: 152px;\n  margin: 0 0 1.15rem;\n  padding: 1.5rem 1.75rem;\n  border: 1px solid rgba(139, 226, 140, 0.22);\n  border-radius: 16px;\n  background:\n    linear-gradient(\n      115deg,\n      #10251f 0%,\n      #173c2e 68%,\n      #1f6840 100%);\n  box-shadow: 0 16px 30px rgba(16, 37, 31, 0.16);\n}\n.sellers-container .page-heading h2 {\n  margin: 0.25rem 0 0.35rem;\n  color: var(--text-on-accent);\n  font-size: 2rem;\n  line-height: 1;\n}\n.sellers-container .page-heading p {\n  max-width: 420px;\n  margin: 0;\n  color: #bdd6c7;\n  font-size: 0.88rem;\n}\n.page-kicker {\n  color: #8be28c;\n  font-size: 0.68rem;\n  font-weight: 700;\n  letter-spacing: 1.2px;\n  text-transform: uppercase;\n}\n.sellers-container .btn-primary,\n.btn-primary {\n  position: relative;\n  z-index: 2;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  min-height: 44px;\n  padding: 0.75rem 1rem;\n  border: 0;\n  border-radius: 9px;\n  background: var(--btn-primary-bg);\n  color: var(--btn-primary-text);\n  box-shadow: none;\n  white-space: nowrap;\n  cursor: pointer;\n  font-weight: 700;\n  font-size: 0.9rem;\n  transition: all 0.2s;\n  text-decoration: none;\n}\n.sellers-container .btn-primary:hover,\n.btn-primary:hover {\n  background: var(--btn-primary-bg-hover);\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.16);\n}\n.button-icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 20px;\n  height: 20px;\n  margin-right: 0.25rem;\n  border: 1px solid rgba(16, 37, 31, 0.25);\n  border-radius: 50%;\n  font-size: 1rem;\n  line-height: 1;\n}\n.stats-grid {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 0.8rem;\n  margin: 0 0 1rem;\n}\n.stat-card {\n  display: flex;\n  align-items: center;\n  gap: 0.7rem;\n  padding: 0.95rem 1rem;\n  border: 1px solid var(--border-color);\n  border-radius: 14px;\n  background: var(--surface-card);\n  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.05);\n  text-align: left;\n  cursor: pointer;\n  font-family: var(--font-body);\n  transition:\n    transform 0.18s ease,\n    border-color 0.18s ease,\n    box-shadow 0.18s ease;\n}\nbutton.stat-card:hover {\n  transform: translateY(-2px);\n  border-color: #bbe8bf;\n  box-shadow: 0 10px 22px rgba(15, 23, 42, 0.08);\n}\n.stat-card.is-active {\n  border-color: var(--accent-green);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.12);\n  background: var(--surface-hover);\n}\n.stat-card.stat-plain {\n  cursor: default;\n}\n.stat-icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 42px;\n  height: 42px;\n  flex-shrink: 0;\n  border-radius: 12px;\n}\n.stat-icon svg {\n  width: 22px;\n  height: 22px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 1.8;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.tone-slate {\n  background: var(--surface-muted);\n  color: var(--text-silver);\n}\n.tone-green {\n  background: var(--accent-green-light);\n  color: var(--accent-green-dark);\n}\n.tone-amber {\n  background: var(--warning-bg);\n  color: var(--warning);\n}\n.tone-blue {\n  background: var(--info-bg);\n  color: var(--info);\n}\n.stat-body {\n  display: flex;\n  flex-direction: column;\n  line-height: 1.1;\n}\n.stat-body strong {\n  font-size: 1.35rem;\n  font-weight: 800;\n  color: var(--btn-primary-text);\n}\n.stat-body small {\n  margin-top: 0.2rem;\n  color: var(--text-muted);\n  font-size: 0.72rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.4px;\n}\n.toolbar {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 0.6rem;\n  margin: 0 0 1.15rem;\n  padding: 0.6rem 0.75rem;\n  border: 1px solid var(--border-color);\n  border-radius: 14px;\n  background: var(--surface-card);\n  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.05);\n}\n.search-wrapper {\n  position: relative;\n  flex: 1 1 240px;\n  display: flex;\n  align-items: center;\n}\n.search-icon {\n  position: absolute;\n  left: 0.8rem;\n  width: 17px;\n  height: 17px;\n  fill: none;\n  stroke: var(--accent-silver);\n  stroke-width: 2;\n  stroke-linecap: round;\n  pointer-events: none;\n}\n.search-input {\n  width: 100%;\n  min-height: 38px;\n  padding: 0.4rem 2.3rem 0.4rem 2.4rem;\n  border: 1px solid var(--input-border);\n  border-radius: 9px;\n  font-size: 0.9rem;\n  background: var(--surface-subtle);\n  color: var(--text-silver);\n  transition:\n    border-color 0.2s ease,\n    box-shadow 0.2s ease,\n    background 0.2s ease;\n}\n.search-input::placeholder {\n  color: var(--accent-silver);\n}\n.search-input:focus {\n  outline: none;\n  border-color: var(--accent-green);\n  background: var(--surface-card);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.1);\n}\n.search-clear {\n  position: absolute;\n  right: 0.45rem;\n  width: 24px;\n  height: 24px;\n  border: 0;\n  border-radius: 50%;\n  background: var(--surface-muted);\n  color: var(--text-muted);\n  font-size: 1rem;\n  line-height: 1;\n  cursor: pointer;\n}\n.search-clear:hover {\n  background: var(--input-border);\n  color: var(--text-main);\n}\n.chip-group {\n  display: inline-flex;\n  gap: 0.3rem;\n  padding: 0.22rem;\n  border-radius: 999px;\n  background: var(--surface-hover);\n}\n.chip {\n  padding: 0.35rem 0.85rem;\n  border: 0;\n  border-radius: 999px;\n  background: transparent;\n  color: var(--text-muted);\n  font-size: 0.78rem;\n  font-weight: 700;\n  cursor: pointer;\n  transition:\n    background 0.18s,\n    color 0.18s,\n    box-shadow 0.18s;\n}\n.chip:hover {\n  color: var(--text-silver);\n}\n.chip.is-active {\n  background: var(--surface-card);\n  color: var(--accent-green-dark);\n  box-shadow: 0 3px 8px rgba(15, 23, 42, 0.12);\n}\n.toolbar-select {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n}\n.toolbar-select svg {\n  position: absolute;\n  left: 0.7rem;\n  width: 15px;\n  height: 15px;\n  fill: none;\n  stroke: var(--accent-silver);\n  stroke-width: 1.9;\n  stroke-linecap: round;\n  pointer-events: none;\n}\n.toolbar-select select {\n  min-height: 38px;\n  padding: 0.4rem 1.9rem 0.4rem 2rem;\n  border: 1px solid var(--input-border);\n  border-radius: 9px;\n  background: var(--surface-subtle);\n  color: var(--text-silver);\n  font-size: 0.85rem;\n  cursor: pointer;\n  appearance: none;\n  transition: border-color 0.2s, box-shadow 0.2s;\n}\n.toolbar-select select:focus {\n  outline: none;\n  border-color: var(--accent-green);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.1);\n}\n.results-count {\n  flex: 0 0 auto;\n  margin-left: auto;\n  color: var(--text-muted);\n  font-size: 0.8rem;\n  white-space: nowrap;\n}\n.skeleton-list {\n  display: flex;\n  flex-direction: column;\n  gap: 0.7rem;\n}\n.skeleton-row {\n  height: 62px;\n  border-radius: 12px;\n  background:\n    linear-gradient(\n      90deg,\n      var(--surface-muted) 25%,\n      var(--surface-subtle) 50%,\n      var(--surface-muted) 75%);\n  background-size: 200% 100%;\n  animation: shimmer 1.4s infinite;\n}\n@keyframes shimmer {\n  0% {\n    background-position: 200% 0;\n  }\n  100% {\n    background-position: -200% 0;\n  }\n}\n.table-wrapper {\n  overflow-x: auto;\n  border: 1px solid var(--input-border);\n  border-radius: 14px;\n  background: var(--surface-card);\n  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.04);\n}\n.users-table {\n  width: 100%;\n  min-width: 860px;\n  border-collapse: collapse;\n  font-size: 0.88rem;\n}\n.users-table th {\n  padding: 0.85rem 1rem;\n  background: var(--surface-subtle);\n  color: var(--text-muted);\n  font-size: 0.7rem;\n  letter-spacing: 0.6px;\n  text-align: left;\n  text-transform: uppercase;\n  white-space: nowrap;\n}\n.users-table td {\n  padding: 0.8rem 1rem;\n  border-top: 1px solid var(--border-color);\n  color: var(--text-silver);\n  vertical-align: middle;\n}\n.users-table tbody tr {\n  cursor: pointer;\n  transition: background-color 0.2s ease;\n}\n.users-table tbody tr:hover td {\n  background: var(--surface-hover);\n}\n.users-table tbody tr:focus-visible {\n  outline: 3px solid rgba(32, 176, 56, 0.35);\n  outline-offset: -3px;\n}\n.users-table tbody tr.is-selected td {\n  background: var(--accent-green-light);\n  border-top-color: #c4eacb;\n}\n.users-table tbody tr.is-selected td:first-child {\n  box-shadow: inset 4px 0 0 var(--accent-green);\n}\n.user-cell {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  min-width: 220px;\n}\n.user-meta {\n  display: flex;\n  flex-direction: column;\n  line-height: 1.25;\n  min-width: 0;\n}\n.user-meta strong {\n  color: var(--btn-primary-text);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.user-meta small {\n  color: var(--accent-silver);\n  font-size: 0.78rem;\n}\n.avatar {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 44px;\n  height: 44px;\n  flex-shrink: 0;\n  border-radius: 50%;\n  color: var(--text-on-accent);\n  font-size: 0.92rem;\n  font-weight: 700;\n  letter-spacing: 0.5px;\n  box-shadow: 0 4px 10px rgba(15, 23, 42, 0.22);\n}\n.avatar-lg {\n  width: 56px;\n  height: 56px;\n  font-size: 1.1rem;\n}\n.avatar-tone-0 {\n  background:\n    linear-gradient(\n      135deg,\n      #065f46,\n      #34d399);\n}\n.avatar-tone-1 {\n  background:\n    linear-gradient(\n      135deg,\n      #0f766e,\n      #2dd4bf);\n}\n.avatar-tone-2 {\n  background:\n    linear-gradient(\n      135deg,\n      #1e3a8a,\n      #60a5fa);\n}\n.avatar-tone-3 {\n  background:\n    linear-gradient(\n      135deg,\n      #7c3aed,\n      #a78bfa);\n}\n.avatar-tone-4 {\n  background:\n    linear-gradient(\n      135deg,\n      #9a3412,\n      #fb923c);\n}\n.avatar-tone-5 {\n  background:\n    linear-gradient(\n      135deg,\n      #10251f,\n      #1f6840);\n}\n.avatar-dot {\n  position: absolute;\n  right: -1px;\n  bottom: -1px;\n  width: 13px;\n  height: 13px;\n  border-radius: 50%;\n  border: 2.5px solid var(--surface-card);\n  background: var(--border-strong);\n}\n.avatar-dot.is-on {\n  background: #22c55e;\n  animation: pulse 2s infinite;\n}\n@keyframes pulse {\n  0%, 100% {\n    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.45);\n  }\n  70% {\n    box-shadow: 0 0 0 7px rgba(34, 197, 94, 0);\n  }\n}\n.brand-chip {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.28rem 0.7rem;\n  border-radius: 999px;\n  background: var(--accent-green-light);\n  border: 1px solid #8bd39a;\n  color: var(--accent-green-dark);\n  font-size: 0.76rem;\n  font-weight: 700;\n  letter-spacing: 0.3px;\n  white-space: nowrap;\n}\n.location-cell {\n  max-width: 240px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.pin-icon {\n  width: 15px;\n  height: 15px;\n  margin-right: 0.3rem;\n  vertical-align: -2px;\n  fill: none;\n  stroke: var(--accent-green);\n  stroke-width: 2;\n}\n.quote-count {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 34px;\n  padding: 0.2rem 0.5rem;\n  border-radius: 999px;\n  background: var(--surface-muted);\n  color: var(--text-silver);\n  font-size: 0.85rem;\n}\n.switch {\n  position: relative;\n  display: inline-block;\n  width: 42px;\n  height: 24px;\n  border: 0;\n  border-radius: 999px;\n  background: var(--border-strong);\n  cursor: pointer;\n  vertical-align: middle;\n  box-shadow: inset 0 0 0 1px rgba(15, 23, 42, 0.06);\n  transition: background 0.25s ease;\n}\n.switch .switch-thumb {\n  position: absolute;\n  top: 3px;\n  left: 3px;\n  width: 18px;\n  height: 18px;\n  border-radius: 50%;\n  background: var(--surface-card);\n  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.28);\n  transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);\n}\n.switch.is-on {\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-green-dark),\n      var(--accent-green));\n}\n.switch.is-on .switch-thumb {\n  transform: translateX(18px);\n}\n.switch-label {\n  margin-left: 0.4rem;\n  font-size: 0.78rem;\n  font-weight: 700;\n  color: var(--text-muted);\n  vertical-align: middle;\n}\n.actions-column {\n  text-align: right !important;\n}\n.action-buttons {\n  display: inline-flex;\n  gap: 0.35rem;\n}\n.btn-icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 34px;\n  height: 34px;\n  border: 1px solid transparent;\n  border-radius: 9px;\n  background: transparent;\n  cursor: pointer;\n  transition: all 0.18s ease;\n}\n.btn-icon svg {\n  width: 17px;\n  height: 17px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 1.9;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.btn-note:hover {\n  background: var(--accent-green-light);\n  color: var(--accent-green-dark);\n  border-color: #8bd39a;\n}\n.btn-edit:hover {\n  background: var(--info-bg);\n  color: var(--info);\n  border-color: var(--info-border);\n}\n.btn-delete:hover {\n  background: var(--danger-bg);\n  color: var(--danger);\n  border-color: var(--danger-border);\n}\n.catalog-state {\n  text-align: center;\n  padding: 2.5rem 1.5rem;\n  color: var(--text-muted);\n}\n.catalog-state.empty-state > strong {\n  display: block;\n  margin-bottom: 0.35rem;\n  color: var(--text-silver);\n  font-size: 1rem;\n}\n.catalog-state.empty-state > span:last-child {\n  display: block;\n  color: var(--accent-silver);\n  font-size: 0.82rem;\n  margin-bottom: 1rem;\n}\n.empty-state-icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 52px;\n  height: 52px;\n  margin-bottom: 0.6rem;\n  border-radius: 14px;\n  background: var(--accent-green-light);\n  color: var(--accent-green-dark);\n}\n.empty-state-icon svg {\n  width: 24px;\n  height: 24px;\n  fill: none;\n  stroke: currentColor;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n  stroke-width: 1.7;\n}\n.btn-secondary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.4rem;\n  min-height: 38px;\n  padding: 0.55rem 1rem;\n  border: 1px solid var(--input-border);\n  border-radius: 9px;\n  background: var(--surface-card);\n  color: var(--text-silver);\n  font-weight: 700;\n  font-size: 0.85rem;\n  cursor: pointer;\n  transition: all 0.18s ease;\n}\n.btn-secondary:hover {\n  background: var(--surface-hover);\n  border-color: var(--border-strong);\n}\n.btn-secondary.danger {\n  color: var(--danger);\n  border-color: var(--danger-border);\n}\n.btn-secondary.danger:hover {\n  background: var(--danger-bg);\n}\n.btn-block {\n  width: 100%;\n}\n.seller-notes-tooltip {\n  position: fixed;\n  z-index: 3600;\n  width: 300px;\n  border: 1px solid var(--input-border);\n  border-radius: 12px;\n  background: var(--surface-card);\n  box-shadow: 0 20px 45px -12px rgba(15, 23, 42, 0.28);\n  pointer-events: none;\n  overflow: hidden;\n}\n.seller-notes-tooltip-header {\n  display: flex;\n  align-items: center;\n  gap: 0.45rem;\n  padding: 0.55rem 0.8rem;\n  background: var(--accent-green-light);\n  color: var(--accent-green-dark);\n  font-size: 0.72rem;\n  font-weight: 800;\n  text-transform: uppercase;\n  letter-spacing: 0.6px;\n}\n.seller-notes-tooltip-header svg {\n  width: 14px;\n  height: 14px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 2;\n  stroke-linecap: round;\n}\n.seller-notes-tooltip-body {\n  padding: 0.7rem 0.85rem;\n  max-height: 130px;\n  overflow-y: auto;\n  color: var(--text-silver);\n  font-size: 0.82rem;\n  white-space: pre-wrap;\n  word-break: break-word;\n}\n.toast-host {\n  position: fixed;\n  z-index: 4000;\n  right: 1.1rem;\n  bottom: 1.1rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.6rem;\n  max-width: 400px;\n}\n.toast {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  padding: 0.75rem 0.9rem;\n  border-radius: 12px;\n  background: var(--text-main);\n  color: var(--surface-card);\n  font-size: 0.86rem;\n  box-shadow: 0 16px 34px -10px rgba(15, 23, 42, 0.35);\n  animation: toastIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);\n  cursor: pointer;\n}\n@keyframes toastIn {\n  from {\n    opacity: 0;\n    transform: translateY(14px) scale(0.97);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n.toast-success {\n  background:\n    linear-gradient(\n      135deg,\n      #14532d,\n      var(--accent-green-dark));\n}\n.toast-error {\n  background:\n    linear-gradient(\n      135deg,\n      #7f1d1d,\n      var(--danger));\n}\n.toast-info {\n  background: var(--text-main);\n}\n.toast-icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 22px;\n  height: 22px;\n  flex-shrink: 0;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, 0.18);\n  font-size: 0.75rem;\n  font-weight: 800;\n}\n.toast-msg {\n  flex: 1;\n  line-height: 1.35;\n}\n.toast-action {\n  padding: 0.28rem 0.65rem;\n  border-radius: 8px;\n  background: var(--surface-card);\n  color: var(--accent-green-dark);\n  font-size: 0.75rem;\n  font-weight: 800;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  white-space: nowrap;\n}\n.toast-close {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 22px;\n  height: 22px;\n  border: 0;\n  border-radius: 50%;\n  background: transparent;\n  color: rgba(255, 255, 255, 0.75);\n  font-size: 1rem;\n  cursor: pointer;\n}\n.toast-close:hover {\n  background: rgba(255, 255, 255, 0.15);\n  color: var(--surface-card);\n}\n.drawer-overlay {\n  position: fixed;\n  inset: 0;\n  z-index: 3000;\n  display: flex;\n  justify-content: flex-end;\n  background: rgba(15, 23, 42, 0.45);\n  -webkit-backdrop-filter: blur(3px);\n  backdrop-filter: blur(3px);\n  animation: fadeIn 0.25s ease;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.drawer {\n  display: flex;\n  flex-direction: column;\n  width: min(500px, 100vw);\n  height: 100%;\n  background: var(--surface-subtle);\n  box-shadow: -24px 0 60px rgba(15, 23, 42, 0.28);\n  animation: slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1);\n  overflow: hidden;\n}\n@keyframes slideInRight {\n  from {\n    transform: translateX(100%);\n  }\n  to {\n    transform: translateX(0);\n  }\n}\n.form-drawer {\n  width: min(580px, 100vw);\n}\n.drawer-header {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n  flex-shrink: 0;\n  padding: 1.4rem 1.5rem 1.1rem;\n  border-bottom: 1px solid var(--border-color);\n  background: var(--surface-card);\n}\n.drawer-header h3 {\n  margin: 0.2rem 0 0;\n  color: var(--btn-primary-text);\n  font-size: 1.25rem;\n}\n.drawer-close {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 34px;\n  height: 34px;\n  flex-shrink: 0;\n  border: 1px solid var(--border-color);\n  border-radius: 10px;\n  background: var(--surface-subtle);\n  color: var(--text-silver);\n  font-size: 1.25rem;\n  line-height: 1;\n  cursor: pointer;\n  transition: all 0.18s ease;\n}\n.drawer-close:hover {\n  background: var(--danger-bg);\n  color: var(--danger);\n  border-color: var(--danger-border);\n}\n.drawer-body {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1.4rem 1.5rem;\n}\n.drawer-footer {\n  flex-shrink: 0;\n  display: flex;\n  gap: 0.6rem;\n  padding: 1rem 1.5rem;\n  border-top: 1px solid var(--border-color);\n  background: var(--surface-card);\n}\n.drawer-footer .btn-primary {\n  margin-left: auto;\n}\n.drawer-loading {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.6rem;\n  padding: 2rem;\n  color: var(--text-muted);\n  font-size: 0.9rem;\n}\n.detail-id {\n  display: flex;\n  align-items: center;\n  gap: 0.9rem;\n}\n.detail-id .page-kicker {\n  color: var(--accent-green-dark);\n}\n.detail-stats {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 0.7rem;\n  margin-bottom: 1.4rem;\n}\n.detail-stat {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.25rem;\n  padding: 0.85rem 0.6rem;\n  border: 1px solid var(--border-color);\n  border-radius: 12px;\n  background: var(--surface-card);\n  text-align: center;\n}\n.detail-stat strong {\n  color: var(--btn-primary-text);\n  font-size: 1.1rem;\n}\n.detail-stat small {\n  color: var(--accent-silver);\n  font-size: 0.7rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.4px;\n}\n.detail-section {\n  margin-bottom: 1.4rem;\n  padding: 1.1rem;\n  border: 1px solid var(--border-color);\n  border-radius: 14px;\n  background: var(--surface-card);\n}\n.detail-section h4 {\n  margin: 0 0 0.6rem;\n  color: var(--text-silver);\n  font-size: 0.8rem;\n  letter-spacing: 0.6px;\n}\n.detail-address {\n  margin-bottom: 0.75rem;\n  color: var(--text-silver);\n  font-size: 0.88rem;\n  line-height: 1.45;\n}\n.detail-map-wrap {\n  position: relative;\n  border-radius: 12px;\n  overflow: hidden;\n  border: 1px solid var(--border-color);\n}\n.detail-map {\n  height: 210px !important;\n  width: 100%;\n  z-index: 1;\n}\n.map-empty-hint {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  z-index: 2;\n  padding: 0.4rem 0.9rem;\n  border-radius: 999px;\n  background: rgba(15, 23, 42, 0.75);\n  color: var(--text-on-accent);\n  font-size: 0.78rem;\n  pointer-events: none;\n}\n.stepper {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  flex-shrink: 0;\n  padding: 1rem 1.5rem;\n  border-bottom: 1px solid var(--border-color);\n  background: var(--surface-card);\n}\n.step {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n}\n.step-num {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 26px;\n  height: 26px;\n  border-radius: 50%;\n  background: var(--surface-muted);\n  color: var(--text-muted);\n  font-size: 0.75rem;\n  font-weight: 800;\n  transition: all 0.2s ease;\n}\n.step-label {\n  color: var(--accent-silver);\n  font-size: 0.8rem;\n  font-weight: 700;\n}\n.step.is-active .step-num {\n  background: var(--accent-green);\n  color: var(--text-on-accent);\n  box-shadow: 0 0 0 4px rgba(32, 176, 56, 0.15);\n}\n.step.is-active .step-label {\n  color: var(--accent-green-dark);\n}\n.step.is-done .step-num {\n  background: #8bd39a;\n  color: var(--accent-green-dark);\n}\n.step-line {\n  flex: 1;\n  height: 3px;\n  border-radius: 999px;\n  background: var(--surface-muted);\n}\n.step-line.is-done {\n  background:\n    linear-gradient(\n      90deg,\n      var(--accent-green-dark),\n      var(--accent-green));\n}\n.form-group {\n  margin-bottom: 1.15rem;\n}\n.form-group label {\n  display: block;\n  margin-bottom: 0.4rem;\n  color: var(--text-silver);\n  font-size: 0.78rem;\n  font-weight: 800;\n  letter-spacing: 0.5px;\n  text-transform: uppercase;\n}\n.form-group input:not([type=checkbox]):not([type=radio]),\n.form-group select,\n.form-group textarea {\n  width: 100%;\n  min-height: 44px;\n  padding: 0.65rem 0.85rem;\n  border: 1.5px solid var(--input-border);\n  border-radius: 10px;\n  background: var(--surface-card);\n  color: var(--text-main);\n  font-size: 0.92rem;\n  font-family: var(--font-body);\n  transition:\n    border-color 0.2s,\n    box-shadow 0.2s,\n    background 0.2s;\n}\n.form-group input:focus,\n.form-group select:focus,\n.form-group textarea:focus {\n  outline: none;\n  border-color: var(--accent-green);\n  background: var(--surface-card);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.1);\n}\n.form-group input:disabled {\n  background: var(--surface-hover);\n  color: var(--text-muted);\n  cursor: not-allowed;\n}\n.form-group small {\n  display: block;\n  margin-top: 0.35rem;\n  color: var(--accent-silver);\n  font-size: 0.76rem;\n}\n.form-group.has-error input,\n.form-group.has-error select,\n.form-group.has-error textarea {\n  border-color: var(--danger);\n  background: var(--danger-bg);\n}\n.form-group.has-error input:focus,\n.form-group.has-error select:focus,\n.form-group.has-error textarea:focus {\n  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);\n}\n.field-error {\n  color: var(--danger) !important;\n  font-weight: 600;\n}\n.field-actions {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.6rem;\n  margin-top: 0.35rem;\n}\n.btn-link {\n  border: 0;\n  background: transparent;\n  color: var(--accent-green-dark);\n  font-size: 0.78rem;\n  font-weight: 700;\n  cursor: pointer;\n  text-decoration: underline;\n  text-underline-offset: 3px;\n  padding: 0;\n}\n.btn-link:hover {\n  color: var(--accent-green-dark);\n}\n.input-with-action {\n  position: relative;\n}\n.input-with-action input {\n  padding-right: 3rem;\n}\n.input-with-action input:focus {\n  outline: none;\n  border-color: var(--accent-green);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.1);\n}\n.btn-ghost-icon {\n  position: absolute;\n  right: 0.45rem;\n  top: 50%;\n  transform: translateY(-50%);\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  border: 0;\n  border-radius: 8px;\n  background: var(--surface-muted);\n  color: var(--text-silver);\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n.btn-ghost-icon svg {\n  width: 17px;\n  height: 17px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 1.9;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.btn-ghost-icon:hover {\n  background: var(--input-border);\n  color: var(--text-main);\n}\n.spaced-input {\n  margin-top: 0.5rem;\n}\n.form-banner {\n  margin-bottom: 1rem;\n  padding: 0.7rem 0.9rem;\n  border-radius: 10px;\n  font-size: 0.85rem;\n  font-weight: 600;\n}\n.form-banner.error {\n  background: var(--danger-bg);\n  border: 1px solid var(--danger-border);\n  color: var(--danger);\n}\n.drawer-actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.6rem;\n  padding-top: 0.35rem;\n}\n.map-container {\n  height: 250px;\n  border: 1px solid var(--input-border);\n  border-radius: 12px;\n  z-index: 1;\n}\n.coords-info {\n  margin-top: 0.5rem;\n  padding: 0.5rem 0.8rem;\n  background: var(--surface-subtle);\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  font-size: 0.85rem;\n  display: flex;\n  gap: 0.4rem;\n  align-items: flex-start;\n}\n.coord-label {\n  font-weight: 600;\n  color: var(--text-silver);\n  white-space: nowrap;\n}\n.coord-value {\n  color: var(--text-main);\n  word-break: break-all;\n}\n.map-hint {\n  font-size: 0.75rem;\n  color: var(--text-muted);\n  margin-top: 0.3rem;\n  font-style: italic;\n}\n.search-group {\n  display: flex;\n  gap: 0.5rem;\n  align-items: center;\n  width: 100%;\n}\n.search-group input {\n  flex: 1;\n  min-height: 44px;\n  padding: 0.5rem 0.8rem;\n  border: 1px solid var(--border-strong);\n  border-radius: 8px;\n  font-size: 0.9rem;\n  transition: border 0.2s;\n  background: var(--surface-card);\n  box-sizing: border-box;\n}\n.search-group input:focus {\n  outline: none;\n  border-color: var(--accent-green);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.1);\n}\n.btn-search {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.5rem 1rem;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-green-dark),\n      var(--accent-green));\n  color: var(--text-on-accent);\n  border: none;\n  border-radius: 8px;\n  font-weight: 700;\n  font-size: 0.85rem;\n  cursor: pointer;\n  transition: all 0.2s;\n  white-space: nowrap;\n  flex-shrink: 0;\n}\n.btn-search:hover {\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-green-dark),\n      #1a8a3a);\n  transform: scale(1.02);\n}\n.btn-search:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none;\n}\n.btn-search svg {\n  stroke: currentColor;\n}\n.modal-overlay {\n  position: fixed;\n  inset: 0;\n  z-index: 3500;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 1rem;\n  background: rgba(15, 23, 42, 0.5);\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: fadeIn 0.2s ease;\n}\n.modal-content {\n  width: 100%;\n  max-width: 470px;\n  max-height: 92vh;\n  overflow-y: auto;\n  border-radius: 18px;\n  background: var(--surface-card);\n  border: 1px solid var(--border-color);\n  padding: 1.6rem 1.7rem 1.4rem;\n  box-shadow: 0 30px 70px -20px rgba(15, 23, 42, 0.4);\n  animation: riseIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);\n}\n@keyframes riseIn {\n  from {\n    opacity: 0;\n    transform: translateY(18px) scale(0.97);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n.modal-heading {\n  display: flex;\n  align-items: center;\n  gap: 0.8rem;\n  margin-bottom: 1rem;\n}\n.modal-icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 42px;\n  height: 42px;\n  flex-shrink: 0;\n  border-radius: 12px;\n}\n.modal-icon svg {\n  width: 21px;\n  height: 21px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 1.8;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.modal-heading-warning .modal-icon {\n  background: var(--warning-bg);\n  color: var(--warning);\n}\n.modal-heading-notes .modal-icon {\n  background: var(--accent-green-light);\n  color: var(--accent-green-dark);\n}\n.modal-eyebrow {\n  display: block;\n  color: var(--accent-silver);\n  font-size: 0.66rem;\n  font-weight: 800;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n}\n.modal-content h3 {\n  margin: 0;\n  color: var(--btn-primary-text);\n  font-size: 1.15rem;\n}\n.modal-content p {\n  color: var(--text-silver);\n  font-size: 0.9rem;\n  line-height: 1.55;\n}\n.warning-copy {\n  display: inline-flex;\n  align-items: flex-start;\n  gap: 0.4rem;\n  margin-top: 0.5rem;\n  padding: 0.45rem 0.65rem;\n  border-radius: 8px;\n  background: var(--warning-bg);\n  border: 1px solid var(--warning-border);\n  color: var(--warning);\n  font-size: 0.8rem;\n  line-height: 1.4;\n}\n.warning-copy svg {\n  width: 15px;\n  height: 15px;\n  flex-shrink: 0;\n  margin-top: 1px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 1.9;\n}\n.modal-actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.6rem;\n  margin-top: 1.3rem;\n}\n.btn-cancel {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 40px;\n  padding: 0.55rem 1.15rem;\n  border: 1px solid var(--input-border);\n  border-radius: 9px;\n  background: var(--surface-card);\n  color: var(--text-silver);\n  font-weight: 700;\n  font-size: 0.85rem;\n  cursor: pointer;\n  transition: all 0.18s ease;\n}\n.btn-cancel:hover {\n  background: var(--surface-hover);\n  border-color: var(--border-strong);\n}\n.btn-confirm {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 40px;\n  padding: 0.55rem 1.3rem;\n  border: 0;\n  border-radius: 9px;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-green-dark),\n      var(--accent-green));\n  color: var(--text-on-accent);\n  font-weight: 700;\n  font-size: 0.85rem;\n  cursor: pointer;\n  box-shadow: 0 10px 20px -8px rgba(32, 176, 56, 0.5);\n  transition: transform 0.18s ease, box-shadow 0.18s ease;\n}\n.btn-confirm:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 14px 26px -8px rgba(32, 176, 56, 0.55);\n}\n.btn-confirm:disabled {\n  opacity: 0.65;\n  cursor: wait;\n  transform: none;\n}\n.notas-overlay {\n  position: fixed;\n  inset: 0;\n  z-index: 3500;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 1.25rem;\n  background:\n    radial-gradient(\n      60% 50% at 50% 0%,\n      rgba(34, 197, 94, 0.1),\n      transparent 70%),\n    rgba(9, 14, 25, 0.58);\n  backdrop-filter: blur(10px) saturate(140%);\n  -webkit-backdrop-filter: blur(10px) saturate(140%);\n  animation: notasFadeIn 0.24s ease;\n}\n@keyframes notasFadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.notas-modal {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  width: min(560px, 100%);\n  max-height: min(88vh, 780px);\n  overflow: hidden;\n  background: var(--surface-card);\n  border: 1px solid var(--border-color);\n  border-radius: 20px;\n  box-shadow: 0 40px 90px -28px rgba(9, 14, 25, 0.55), 0 20px 45px -24px rgba(32, 176, 56, 0.22);\n  animation: notasRiseIn 0.34s cubic-bezier(0.16, 1, 0.3, 1);\n}\n@keyframes notasRiseIn {\n  from {\n    opacity: 0;\n    transform: translateY(18px) scale(0.97);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n.notas-modal::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 3px;\n  z-index: 1;\n  background:\n    linear-gradient(\n      90deg,\n      var(--accent-green-dark),\n      var(--accent-green-bright) 55%,\n      transparent);\n}\n.notas-header {\n  display: flex;\n  align-items: center;\n  gap: 0.9rem;\n  padding: 1.15rem 1.3rem 1.05rem;\n  border-bottom: 1px solid var(--border-color);\n  background:\n    linear-gradient(\n      180deg,\n      var(--accent-green-light),\n      transparent 75%);\n  flex-shrink: 0;\n}\n.notas-icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 44px;\n  height: 44px;\n  flex-shrink: 0;\n  border-radius: 13px;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-green) 0%,\n      var(--accent-green-dark) 100%);\n  color: var(--text-on-accent);\n  box-shadow: 0 10px 22px -8px rgba(32, 176, 56, 0.6);\n}\n.notas-icon svg {\n  width: 21px;\n  height: 21px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 1.8;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.notas-titles {\n  display: flex;\n  flex-direction: column;\n  gap: 0.15rem;\n  min-width: 0;\n}\n.notas-eyebrow {\n  font-size: 0.66rem;\n  font-weight: 800;\n  letter-spacing: 1.1px;\n  text-transform: uppercase;\n  color: var(--accent-silver);\n}\n.notas-title {\n  margin: 0;\n  font-size: 1.12rem;\n  font-weight: 700;\n  letter-spacing: -0.01em;\n  color: var(--text-main);\n}\n.notas-close {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 34px;\n  height: 34px;\n  margin-left: auto;\n  flex-shrink: 0;\n  border: none;\n  border-radius: 10px;\n  background: transparent;\n  color: var(--text-muted);\n  cursor: pointer;\n  transition:\n    background 0.16s ease,\n    color 0.16s ease,\n    transform 0.16s ease;\n}\n.notas-close:hover {\n  background: var(--surface-hover);\n  color: var(--text-main);\n}\n.notas-close:active {\n  transform: scale(0.94);\n}\n.notas-close svg {\n  width: 18px;\n  height: 18px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 2;\n  stroke-linecap: round;\n}\n.notas-body {\n  flex: 1 1 auto;\n  min-height: 0;\n  overflow-y: auto;\n  padding: 1rem 1.3rem;\n}\n.notas-body::-webkit-scrollbar {\n  width: 8px;\n}\n.notas-body::-webkit-scrollbar-thumb {\n  background: var(--border-strong);\n  border-radius: 999px;\n}\n.notas-body::-webkit-scrollbar-thumb:hover {\n  background: var(--accent-silver);\n}\n.notas-alert {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin-bottom: 0.9rem;\n  padding: 0.6rem 0.75rem;\n  border-radius: 10px;\n  background: var(--danger-bg);\n  border: 1px solid var(--danger-border);\n  color: var(--danger);\n  font-size: 0.84rem;\n  font-weight: 600;\n}\n.notas-alert svg {\n  width: 15px;\n  height: 15px;\n  flex-shrink: 0;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 2;\n  stroke-linecap: round;\n}\n.notas-loading {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.6rem;\n  padding: 2rem 0;\n  color: var(--text-muted);\n  font-size: 0.86rem;\n}\n.notas-spinner {\n  width: 18px;\n  height: 18px;\n  border-radius: 50%;\n  border: 2.5px solid var(--border-color);\n  border-top-color: var(--accent-green);\n  animation: notasSpin 0.7s linear infinite;\n}\n@keyframes notasSpin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.notas-list {\n  display: flex;\n  flex-direction: column;\n  gap: 0.6rem;\n}\n.nota-item {\n  position: relative;\n  padding: 0.8rem 2.9rem 0.8rem 0.95rem;\n  border: 1px solid var(--border-color);\n  border-radius: 14px;\n  background: var(--surface-subtle);\n  transition:\n    border-color 0.18s ease,\n    background 0.18s ease,\n    box-shadow 0.18s ease;\n}\n.nota-item:hover {\n  background: var(--surface-card);\n  border-color: rgba(32, 176, 56, 0.35);\n  box-shadow: 0 10px 24px -14px rgba(15, 23, 42, 0.28);\n}\n.nota-item.nota-editing {\n  border-color: var(--accent-green);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.12);\n}\n.nota-texto {\n  margin: 0;\n  color: var(--text-main);\n  font-size: 0.88rem;\n  line-height: 1.5;\n  white-space: pre-wrap;\n  word-break: break-word;\n}\n.nota-fecha {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.32rem;\n  margin-top: 0.55rem;\n  padding: 0.18rem 0.55rem;\n  border-radius: 999px;\n  background: var(--surface-hover);\n  border: 1px solid var(--border-color);\n  color: var(--accent-silver);\n  font-size: 0.7rem;\n  font-weight: 600;\n  font-variant-numeric: tabular-nums;\n}\n.nota-fecha svg {\n  width: 12px;\n  height: 12px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 2;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.nota-acciones {\n  position: absolute;\n  top: 0.6rem;\n  right: 0.6rem;\n  display: flex;\n  gap: 0.25rem;\n  opacity: 0;\n  transform: translateX(4px);\n  transition: opacity 0.18s ease, transform 0.18s ease;\n}\n.nota-item:hover .nota-acciones,\n.nota-item.nota-editing .nota-acciones {\n  opacity: 1;\n  transform: translateX(0);\n}\n@media (hover: none), (pointer: coarse) {\n  .nota-acciones {\n    opacity: 1;\n    transform: none;\n  }\n}\n.nota-acciones .btn-icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 30px;\n  height: 30px;\n  border: 1px solid transparent;\n  border-radius: 9px;\n  background: var(--surface-card);\n  color: var(--text-muted);\n  cursor: pointer;\n  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.1);\n  transition: all 0.16s ease;\n}\n.nota-acciones .btn-icon:hover {\n  transform: translateY(-1px);\n}\n.nota-acciones .btn-icon.btn-edit:hover {\n  background: var(--accent-green-light);\n  border-color: rgba(32, 176, 56, 0.35);\n  color: var(--accent-green-dark);\n}\n.nota-acciones .btn-icon.btn-delete:hover {\n  background: var(--danger-bg);\n  border-color: var(--danger-border);\n  color: var(--danger);\n}\n.nota-acciones .btn-icon svg {\n  width: 14px;\n  height: 14px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 1.9;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.notas-empty {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.2rem;\n  padding: 2.2rem 1rem;\n  text-align: center;\n}\n.notas-empty-icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 52px;\n  height: 52px;\n  margin-bottom: 0.5rem;\n  border-radius: 16px;\n  background: var(--surface-hover);\n  border: 1px dashed var(--border-strong);\n  color: var(--accent-silver);\n}\n.notas-empty-icon svg {\n  width: 24px;\n  height: 24px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 1.6;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.notas-empty-title {\n  margin: 0;\n  font-size: 0.92rem;\n  font-weight: 700;\n  color: var(--text-silver);\n}\n.notas-empty-sub {\n  margin: 0;\n  font-size: 0.8rem;\n  color: var(--text-muted);\n}\n.notas-editor {\n  flex-shrink: 0;\n  padding: 0.95rem 1.3rem 1.1rem;\n  border-top: 1px solid var(--border-color);\n  background: var(--surface-subtle);\n}\n.notas-editor-label {\n  display: block;\n  margin-bottom: 0.45rem;\n  font-size: 0.7rem;\n  font-weight: 800;\n  letter-spacing: 0.8px;\n  text-transform: uppercase;\n  color: var(--accent-silver);\n}\n.notas-editor-label.nota-editando-label {\n  color: var(--accent-green-dark);\n}\n.nota-textarea {\n  width: 100%;\n  min-height: 72px;\n  padding: 0.65rem 0.85rem;\n  border: 1.5px solid var(--input-border);\n  border-radius: 12px;\n  background: var(--surface-card);\n  color: var(--text-main);\n  font-family: var(--font-body);\n  font-size: 0.88rem;\n  line-height: 1.5;\n  resize: vertical;\n  transition: border-color 0.18s ease, box-shadow 0.18s ease;\n}\n.nota-textarea::placeholder {\n  color: var(--text-muted);\n}\n.nota-textarea:focus {\n  outline: none;\n  border-color: var(--accent-green);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.14);\n}\n.notas-editor-actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.5rem;\n  margin-top: 0.65rem;\n}\n.notas-btn-primary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.4rem;\n  min-height: 38px;\n  padding: 0.5rem 1.05rem;\n  border: none;\n  border-radius: 10px;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-green-dark),\n      var(--accent-green));\n  color: var(--text-on-accent);\n  font-size: 0.84rem;\n  font-weight: 700;\n  cursor: pointer;\n  box-shadow: 0 10px 20px -8px rgba(32, 176, 56, 0.55);\n  transition:\n    transform 0.18s ease,\n    box-shadow 0.18s ease,\n    filter 0.18s ease;\n}\n.notas-btn-primary:hover:not(:disabled) {\n  transform: translateY(-1px);\n  box-shadow: 0 14px 26px -8px rgba(32, 176, 56, 0.6);\n}\n.notas-btn-primary:disabled {\n  opacity: 0.55;\n  cursor: not-allowed;\n  transform: none;\n  box-shadow: none;\n}\n.notas-btn-primary svg {\n  width: 15px;\n  height: 15px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 2.4;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.notas-btn-ghost {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 38px;\n  padding: 0.5rem 0.95rem;\n  border: 1px solid var(--input-border);\n  border-radius: 10px;\n  background: var(--surface-card);\n  color: var(--text-silver);\n  font-size: 0.84rem;\n  font-weight: 700;\n  cursor: pointer;\n  transition: all 0.18s ease;\n}\n.notas-btn-ghost:hover {\n  background: var(--surface-hover);\n  border-color: var(--border-strong);\n  color: var(--text-main);\n}\n.notas-footer {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  flex-shrink: 0;\n  padding: 0.8rem 1.3rem;\n  border-top: 1px solid var(--border-color);\n  background: var(--surface-card);\n}\n.notas-count {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  font-size: 0.78rem;\n  font-weight: 600;\n  color: var(--text-muted);\n}\n.notas-count-badge {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 22px;\n  height: 22px;\n  padding: 0 0.4rem;\n  border-radius: 999px;\n  background: var(--accent-green-light);\n  border: 1px solid rgba(32, 176, 56, 0.3);\n  color: var(--accent-green-dark);\n  font-size: 0.72rem;\n  font-weight: 800;\n  font-variant-numeric: tabular-nums;\n}\n.notas-close:focus-visible,\n.notas-btn-primary:focus-visible,\n.notas-btn-ghost:focus-visible,\n.nota-acciones .btn-icon:focus-visible,\n.nota-textarea:focus-visible {\n  outline: 2px solid var(--accent-green);\n  outline-offset: 2px;\n}\nhtml[data-theme=dark] .notas-modal {\n  box-shadow: 0 40px 90px -28px rgba(0, 0, 0, 0.75), 0 20px 45px -24px rgba(34, 197, 94, 0.2);\n}\nhtml[data-theme=dark] .notas-header {\n  background:\n    linear-gradient(\n      180deg,\n      rgba(34, 197, 94, 0.1),\n      transparent 75%);\n}\nhtml[data-theme=dark] .notas-overlay {\n  background:\n    radial-gradient(\n      60% 50% at 50% 0%,\n      rgba(34, 197, 94, 0.08),\n      transparent 70%),\n    rgba(2, 6, 12, 0.72);\n}\n@media (max-width: 640px) {\n  .notas-overlay {\n    padding: 0.75rem;\n    align-items: flex-end;\n  }\n  .notas-modal {\n    width: 100%;\n    max-height: 92vh;\n    border-radius: 18px;\n  }\n  .notas-header,\n  .notas-body,\n  .notas-editor,\n  .notas-footer {\n    padding-left: 1rem;\n    padding-right: 1rem;\n  }\n  .notas-footer {\n    flex-direction: column-reverse;\n    align-items: stretch;\n  }\n  .notas-footer .notas-btn-ghost {\n    width: 100%;\n  }\n  .notas-editor-actions {\n    flex-direction: column-reverse;\n  }\n  .notas-editor-actions .notas-btn-primary,\n  .notas-editor-actions .notas-btn-ghost {\n    width: 100%;\n  }\n  .nota-acciones {\n    opacity: 1;\n    transform: none;\n  }\n}\n.error {\n  margin-bottom: 0.8rem;\n  padding: 0.6rem 0.8rem;\n  border-radius: 9px;\n  background: var(--danger-bg);\n  border: 1px solid var(--danger-border);\n  color: var(--danger);\n  font-size: 0.84rem;\n}\n.catalog-spinner {\n  width: 18px;\n  height: 18px;\n  border: 2.5px solid var(--input-border);\n  border-top-color: var(--accent-green);\n  border-radius: 50%;\n  animation: spin 0.7s linear infinite;\n  display: inline-block;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.status-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.26rem 0.7rem;\n  border-radius: 999px;\n  font-size: 0.75rem;\n  font-weight: 700;\n  white-space: nowrap;\n}\n.status-active {\n  background: var(--accent-green-light);\n  color: var(--accent-green-dark);\n  border: 1px solid #c9ecd0;\n}\n.status-inactive {\n  background: var(--surface-hover);\n  color: var(--text-muted);\n  border: 1px solid var(--border-color);\n}\n@media (max-width: 1024px) {\n  .stats-grid {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .detail-stats {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}\n@media (max-width: 768px) {\n  .sellers-container {\n    padding: 1rem;\n    border-radius: 12px;\n  }\n  .sellers-container .page-header {\n    flex-direction: column;\n    align-items: stretch;\n    gap: 0.85rem;\n    min-height: 0;\n    padding: 1.25rem;\n  }\n  .sellers-container .page-heading h2 {\n    font-size: 1.7rem;\n  }\n  .sellers-container .btn-primary {\n    justify-content: center;\n    width: 100%;\n  }\n  .toolbar {\n    flex-direction: column;\n    align-items: stretch;\n    gap: 0.75rem;\n    padding: 1rem;\n  }\n  .search-wrapper {\n    flex: 0 0 auto;\n    width: 100%;\n  }\n  .search-input {\n    min-height: 44px;\n    font-size: 1rem;\n  }\n  .search-icon {\n    top: 50%;\n    transform: translateY(-50%);\n  }\n  .chip-group {\n    width: 100%;\n    display: flex;\n    flex-wrap: wrap;\n    justify-content: center;\n    gap: 0.5rem;\n    padding: 0;\n    background: transparent;\n    border-radius: 0;\n  }\n  .chip {\n    min-height: 38px;\n    padding: 0.4rem 1rem;\n    border: 1px solid var(--border-color);\n    background: var(--surface-subtle);\n    color: var(--text-silver);\n    border-radius: 999px;\n    white-space: nowrap;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n  }\n  .chip:hover {\n    border-color: #8bd39a;\n    background: var(--surface-hover);\n    color: var(--accent-green-dark);\n  }\n  .chip.is-active {\n    background: var(--accent-green-light);\n    border-color: var(--accent-green);\n    color: var(--accent-green-dark);\n  }\n  .toolbar-select {\n    flex: 0 0 auto;\n    width: 100%;\n  }\n  .toolbar-select::after {\n    content: "";\n    position: absolute;\n    right: 1.05rem;\n    top: 50%;\n    width: 9px;\n    height: 9px;\n    margin-top: -5px;\n    border-right: 2px solid var(--text-silver);\n    border-bottom: 2px solid var(--text-silver);\n    transform: rotate(45deg);\n    pointer-events: none;\n  }\n  .toolbar-select select {\n    width: 100%;\n    min-height: 44px;\n    padding: 0.55rem 2.6rem 0.55rem 1.9rem;\n    font-size: 1rem;\n  }\n  .toolbar-select svg {\n    top: 50%;\n    transform: translateY(-50%);\n  }\n  .results-count {\n    margin-left: 0;\n    align-self: flex-end;\n  }\n  .stats-grid {\n    grid-template-columns: 1fr 1fr;\n  }\n  .detail-stats {\n    grid-template-columns: 1fr;\n  }\n  .drawer {\n    width: 100vw;\n  }\n  .search-group {\n    flex-direction: column;\n  }\n  .btn-search {\n    width: 100%;\n    justify-content: center;\n  }\n  .modal-content {\n    padding: 1rem;\n    max-width: 100%;\n  }\n  .toast-host {\n    right: 0.7rem;\n    bottom: 0.7rem;\n    left: 0.7rem;\n    max-width: none;\n  }\n}\n@media (max-width: 768px) {\n  .table-wrapper {\n    overflow: visible;\n    border: none;\n    background: transparent;\n    box-shadow: none;\n  }\n  .users-table {\n    display: block;\n    min-width: 0;\n    background: transparent;\n  }\n  .users-table thead {\n    display: none;\n  }\n  .users-table tbody {\n    display: block;\n  }\n  .users-table tr {\n    display: block;\n    padding: 0.9rem 1rem;\n    margin-bottom: 0.75rem;\n    background: var(--surface-card);\n    border: 1px solid var(--input-border);\n    border-radius: 14px;\n    box-shadow: 0 8px 20px rgba(15, 23, 42, 0.04);\n  }\n  .users-table tr:hover td {\n    background: transparent;\n  }\n  .users-table tr.is-selected {\n    border-color: #8bd39a;\n  }\n  .users-table tr.is-selected td {\n    background: transparent;\n    border-top-color: transparent;\n  }\n  .users-table tr.is-selected td:first-child {\n    box-shadow: none;\n  }\n  .users-table td {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 0.9rem;\n    min-width: 0;\n    padding: 0.5rem 0;\n    border: 0;\n    color: var(--text-silver);\n  }\n  .users-table td + td {\n    border-top: 1px solid var(--surface-hover);\n  }\n  .users-table td::before {\n    content: attr(data-label);\n    flex-shrink: 0;\n    font-size: 0.7rem;\n    font-weight: 700;\n    letter-spacing: 0.6px;\n    text-transform: uppercase;\n    color: var(--text-muted);\n  }\n  .users-table td.user-cell::before {\n    display: none;\n  }\n  .user-cell {\n    justify-content: flex-start;\n    min-width: 0;\n    gap: 0.75rem;\n  }\n  .location-cell {\n    max-width: none;\n    white-space: normal;\n    overflow: visible;\n    text-overflow: clip;\n  }\n  .actions-column {\n    justify-content: flex-start;\n  }\n  .action-buttons {\n    margin-left: auto;\n    gap: 0.45rem;\n  }\n  .btn-icon {\n    width: 40px;\n    height: 40px;\n  }\n}\n.sellers-container .btn-primary:focus-visible,\n.btn-primary:focus-visible,\n.sellers-container .btn-icon:focus-visible,\n.btn-icon:focus-visible,\n.sellers-container .btn-cancel:focus-visible,\n.btn-cancel:focus-visible,\n.sellers-container .btn-confirm:focus-visible,\n.btn-confirm:focus-visible,\n.sellers-container .switch:focus-visible,\n.switch:focus-visible,\n.sellers-container .chip:focus-visible,\n.chip:focus-visible,\n.drawer button:focus-visible,\n.drawer a:focus-visible,\n.drawer input:focus-visible,\n.drawer select:focus-visible,\n.drawer textarea:focus-visible {\n  outline: 2px solid var(--accent-green);\n  outline-offset: 2px;\n}\n.btn-danger {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.45rem;\n  padding: 0.6rem 1.2rem;\n  border: none;\n  border-radius: 10px;\n  background: #e5484d;\n  color: var(--text-on-accent);\n  font-weight: 600;\n  font-size: 0.9rem;\n  font-family: inherit;\n  cursor: pointer;\n  transition:\n    background 0.2s ease,\n    transform 0.15s ease,\n    box-shadow 0.2s ease;\n}\n.btn-danger:hover:not(:disabled) {\n  background: #d93a3f;\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(229, 72, 77, 0.25);\n}\n.btn-danger:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.btn-danger:focus-visible {\n  outline: 2px solid #e5484d;\n  outline-offset: 2px;\n}\n.confirm-modal {\n  max-width: 420px;\n  width: calc(100% - 2rem);\n  text-align: center;\n}\n.confirm-icon {\n  width: 56px;\n  height: 56px;\n  margin: 0 auto 0.9rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n}\n.confirm-icon.danger {\n  background: rgba(229, 72, 77, 0.12);\n  color: #e5484d;\n}\n.confirm-icon svg {\n  width: 26px;\n  height: 26px;\n  stroke: currentColor;\n  fill: none;\n  stroke-width: 2;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.confirm-modal h3 {\n  margin: 0 0 0.5rem;\n  font-size: 1.15rem;\n  color: var(--text-main);\n}\n.confirm-modal p {\n  margin: 0 0 1.2rem;\n  color: #555555;\n  font-size: 0.92rem;\n  line-height: 1.5;\n}\n.confirm-modal .modal-actions {\n  display: flex;\n  gap: 0.75rem;\n  justify-content: center;\n}\n.sellers-container > *:not(.toast-host):not(.seller-notes-tooltip) {\n  position: relative;\n  z-index: 1;\n}\n@media (max-width: 480px) {\n  .stats-grid {\n    grid-template-columns: 1fr;\n  }\n  .detail-actions {\n    flex-wrap: wrap;\n  }\n}\n:host-context(html[data-theme="dark"]) .avatar {\n  box-shadow: inset 0 0 0 999px rgba(13, 21, 23, 0.32), 0 4px 10px rgba(0, 0, 0, 0.45);\n}\n@media (max-width: 768px) {\n  .chip {\n    padding: 0.55rem 1.05rem;\n  }\n  .switch::after {\n    content: "";\n    position: absolute;\n    inset: -10px;\n    border-radius: 999px;\n  }\n}\n@media (max-width: 480px) {\n  .stats-grid {\n    gap: 0.6rem;\n  }\n  .stat-card {\n    padding: 0.8rem 0.8rem;\n    gap: 0.55rem;\n  }\n  .stat-icon {\n    width: 36px;\n    height: 36px;\n  }\n  .stat-icon svg {\n    width: 20px;\n    height: 20px;\n  }\n  .stat-body strong {\n    font-size: 1.2rem;\n  }\n  .stat-body small {\n    font-size: 0.66rem;\n    letter-spacing: 0.2px;\n  }\n}\n/*# sourceMappingURL=admin-sellers.component.css.map */\n'] }]
  }], null, { mapContainer: [{
    type: ViewChild,
    args: ["mapContainer"]
  }], detailMapContainer: [{
    type: ViewChild,
    args: ["detailMapContainer"]
  }], onEscapeKey: [{
    type: HostListener,
    args: ["document:keydown.escape"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminSellersComponent, { className: "AdminSellersComponent", filePath: "src/app/components/admin/admin-sellers/admin-sellers.ts", lineNumber: 17 });
})();
export {
  AdminSellersComponent
};
//# debugId=33d2cadf-998d-532c-b69a-00ba31c46456
//# sourceMappingURL=chunk-YOHL55G2.js.map
