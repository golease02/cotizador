import {
  AdminService
} from "./chunk-WRULRPBG.js";
import {
  RouterLink,
  RouterModule
} from "./chunk-UUNAMTTY.js";
import {
  CommonModule,
  Component,
  CurrencyPipe,
  DatePipe,
  NgClass,
  NgForOf,
  NgIf,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵpipeBind4,
  ɵɵproperty,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-6KRTW2LJ.js";
import "./chunk-FDMHZOCR.js";

// src/app/components/admin/admin-stats/admin-stats.ts
function AdminStatsComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "div", 10)(2, "div", 11);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 12);
    \u0275\u0275element(4, "path", 13)(5, "polyline", 14)(6, "line", 15)(7, "line", 16);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "div", 17)(9, "span", 18);
    \u0275\u0275text(10, "Cotizaciones");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 19);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "div", 10)(14, "div", 20);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(15, "svg", 12);
    \u0275\u0275element(16, "path", 21)(17, "circle", 22)(18, "path", 23)(19, "path", 24);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(20, "div", 17)(21, "span", 18);
    \u0275\u0275text(22, "Vendedores");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "span", 19);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "div", 10)(26, "div", 25);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(27, "svg", 12);
    \u0275\u0275element(28, "path", 26);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(29, "div", 17)(30, "span", 18);
    \u0275\u0275text(31, "Fijadas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "span", 19);
    \u0275\u0275text(33);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(34, "div", 10)(35, "div", 27);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(36, "svg", 12);
    \u0275\u0275element(37, "path", 28)(38, "path", 29)(39, "path", 30);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(40, "div", 17)(41, "span", 18);
    \u0275\u0275text(42, "Urgentes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "span", 19);
    \u0275\u0275text(44);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate(ctx_r0.totalQuotes());
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate(ctx_r0.totalSellers());
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r0.totalFijadas());
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate(ctx_r0.totalUrgentes());
  }
}
function AdminStatsComponent_section_11_div_22_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 43);
    \u0275\u0275element(1, "span", 44);
    \u0275\u0275elementStart(2, "div", 45)(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "a", 46);
    \u0275\u0275text(8);
    \u0275\u0275elementStart(9, "span", 47);
    \u0275\u0275text(10, "\u2192");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    \u0275\u0275classMap("attention-" + item_r2.type);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(item_r2.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.detail);
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", item_r2.link);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", item_r2.action, " ");
  }
}
function AdminStatsComponent_section_11_div_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 41);
    \u0275\u0275template(1, AdminStatsComponent_section_11_div_22_div_1_Template, 11, 6, "div", 42);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.attentionItems());
  }
}
function AdminStatsComponent_section_11_div_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48)(1, "span", 49);
    \u0275\u0275text(2, "\u2713");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "No hay prioridades pendientes. La operaci\xF3n est\xE1 al d\xEDa.");
    \u0275\u0275elementEnd()();
  }
}
function AdminStatsComponent_section_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 31)(1, "div", 32)(2, "div")(3, "span", 33);
    \u0275\u0275text(4, "Centro de atenci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h2");
    \u0275\u0275text(6, "Prioridades operativas");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 34)(8, "span", 35)(9, "strong");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275text(11, " recientes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span", 36)(13, "strong");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275text(15, " revisadas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span", 37)(17, "strong");
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275text(19, " pendientes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span", 38);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(22, AdminStatsComponent_section_11_div_22_Template, 2, 1, "div", 39)(23, AdminStatsComponent_section_11_div_23_Template, 5, 0, "div", 40);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(ctx_r0.totalRecientes());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.totalRevisadas());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.totalPendientes());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r0.attentionItems().length, " alertas");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.attentionItems().length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.attentionItems().length === 0);
  }
}
function AdminStatsComponent_div_12_div_4_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 56)(1, "span", 57);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 58)(4, "div", 59)(5, "span", 60);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const v_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(v_r3.name);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", ctx_r0.getMaxPercentage(v_r3.count, ctx_r0.topVehicles()), "%")("background", ctx_r0.getBarColor(v_r3.count, ctx_r0.topVehicles()));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(v_r3.count);
  }
}
function AdminStatsComponent_div_12_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 54);
    \u0275\u0275template(1, AdminStatsComponent_div_12_div_4_div_1_Template, 7, 6, "div", 55);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.topVehicles());
  }
}
function AdminStatsComponent_div_12_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 61);
    \u0275\u0275text(1, "Sin datos");
    \u0275\u0275elementEnd();
  }
}
function AdminStatsComponent_div_12_div_9_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 56)(1, "span", 57)(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 62);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 58)(7, "div", 59)(8, "span", 60);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const s_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(s_r4.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r4.location);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", ctx_r0.getMaxPercentage(s_r4.count, ctx_r0.topSellers()), "%")("background", ctx_r0.getBarColor(s_r4.count, ctx_r0.topSellers()));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r4.count);
  }
}
function AdminStatsComponent_div_12_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 54);
    \u0275\u0275template(1, AdminStatsComponent_div_12_div_9_div_1_Template, 10, 7, "div", 55);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.topSellers());
  }
}
function AdminStatsComponent_div_12_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 61);
    \u0275\u0275text(1, "Sin datos");
    \u0275\u0275elementEnd();
  }
}
function AdminStatsComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50)(1, "div", 51)(2, "h3");
    \u0275\u0275text(3, "Veh\xEDculos m\xE1s cotizados");
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, AdminStatsComponent_div_12_div_4_Template, 2, 1, "div", 52)(5, AdminStatsComponent_div_12_div_5_Template, 2, 0, "div", 53);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 51)(7, "h3");
    \u0275\u0275text(8, "Vendedores con m\xE1s cotizaciones");
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, AdminStatsComponent_div_12_div_9_Template, 2, 1, "div", 52)(10, AdminStatsComponent_div_12_div_10_Template, 2, 0, "div", 53);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", !ctx_r0.loading() && ctx_r0.topVehicles().length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.loading() && ctx_r0.topVehicles().length === 0);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", !ctx_r0.loading() && ctx_r0.topSellers().length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.loading() && ctx_r0.topSellers().length === 0);
  }
}
function AdminStatsComponent_div_13_div_1_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 69);
    \u0275\u0275element(1, "div", 70);
    \u0275\u0275elementStart(2, "div", 71)(3, "span", 72);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 73);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 74);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 75)(11, "span", 76);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 77);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "a", 78);
    \u0275\u0275text(16, "Ver detalle \u2192");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const q_r5 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("ngClass", ctx_r0.getColorClase(q_r5));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(q_r5.client_name || "Cliente sin nombre");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(7, 7, q_r5.pricenet, "MXN", "symbol", "1.0-0"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", q_r5.brand, " ", q_r5.model);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Vendedor: ", q_r5.seller_name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.getEtiqueta(q_r5));
  }
}
function AdminStatsComponent_div_13_div_1_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 79);
    \u0275\u0275text(1, "Sin cotizaciones fijadas");
    \u0275\u0275elementEnd();
  }
}
function AdminStatsComponent_div_13_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 65)(1, "h3");
    \u0275\u0275text(2, "Fijadas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 66);
    \u0275\u0275template(4, AdminStatsComponent_div_13_div_1_div_4_Template, 17, 12, "div", 67)(5, AdminStatsComponent_div_13_div_1_div_5_Template, 2, 0, "div", 68);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r0.fijadasQuotes());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.fijadasQuotes().length === 0);
  }
}
function AdminStatsComponent_div_13_div_2_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 69);
    \u0275\u0275element(1, "div", 70);
    \u0275\u0275elementStart(2, "div", 71)(3, "span", 72);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 73);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 74);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 75)(11, "span", 76);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 77);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "a", 78);
    \u0275\u0275text(16, "Ver detalle \u2192");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const q_r6 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("ngClass", ctx_r0.getColorClase(q_r6));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(q_r6.client_name || "Cliente sin nombre");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(7, 7, q_r6.pricenet, "MXN", "symbol", "1.0-0"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", q_r6.brand, " ", q_r6.model);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Vendedor: ", q_r6.seller_name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.getEtiqueta(q_r6));
  }
}
function AdminStatsComponent_div_13_div_2_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 79);
    \u0275\u0275text(1, "Sin cotizaciones urgentes");
    \u0275\u0275elementEnd();
  }
}
function AdminStatsComponent_div_13_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 65)(1, "h3");
    \u0275\u0275text(2, "Urgentes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 66);
    \u0275\u0275template(4, AdminStatsComponent_div_13_div_2_div_4_Template, 17, 12, "div", 67)(5, AdminStatsComponent_div_13_div_2_div_5_Template, 2, 0, "div", 68);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r0.urgentesQuotes());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.urgentesQuotes().length === 0);
  }
}
function AdminStatsComponent_div_13_div_3_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 69);
    \u0275\u0275element(1, "div", 70);
    \u0275\u0275elementStart(2, "div", 71)(3, "span", 72);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 73);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 74);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 75)(11, "span", 76);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 77);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "a", 78);
    \u0275\u0275text(16, "Ver detalle \u2192");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const q_r7 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("ngClass", ctx_r0.getColorClase(q_r7));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(q_r7.client_name || "Cliente sin nombre");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(7, 7, q_r7.pricenet, "MXN", "symbol", "1.0-0"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", q_r7.brand, " ", q_r7.model);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Vendedor: ", q_r7.seller_name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.getEtiqueta(q_r7));
  }
}
function AdminStatsComponent_div_13_div_3_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 79);
    \u0275\u0275text(1, "Sin cotizaciones recientes");
    \u0275\u0275elementEnd();
  }
}
function AdminStatsComponent_div_13_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 65)(1, "h3");
    \u0275\u0275text(2, "\xDAltimas cotizaciones");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 66);
    \u0275\u0275template(4, AdminStatsComponent_div_13_div_3_div_4_Template, 17, 12, "div", 67)(5, AdminStatsComponent_div_13_div_3_div_5_Template, 2, 0, "div", 68);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r0.recentQuotes());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.recentQuotes().length === 0);
  }
}
function AdminStatsComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 63);
    \u0275\u0275template(1, AdminStatsComponent_div_13_div_1_Template, 6, 2, "div", 64)(2, AdminStatsComponent_div_13_div_2_Template, 6, 2, "div", 64)(3, AdminStatsComponent_div_13_div_3_Template, 6, 2, "div", 64);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.loading());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.loading());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.loading());
  }
}
function AdminStatsComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 80);
    \u0275\u0275element(1, "div", 81);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Cargando estad\xEDsticas...");
    \u0275\u0275elementEnd()();
  }
}
var AdminStatsComponent = class _AdminStatsComponent {
  admin = inject(AdminService);
  today = /* @__PURE__ */ new Date();
  totalQuotes = signal(
    0,
    ...ngDevMode ? [{ debugName: "totalQuotes" }] : (
      /* istanbul ignore next */
      []
    )
  );
  totalSellers = signal(
    0,
    ...ngDevMode ? [{ debugName: "totalSellers" }] : (
      /* istanbul ignore next */
      []
    )
  );
  totalFijadas = signal(
    0,
    ...ngDevMode ? [{ debugName: "totalFijadas" }] : (
      /* istanbul ignore next */
      []
    )
  );
  totalUrgentes = signal(
    0,
    ...ngDevMode ? [{ debugName: "totalUrgentes" }] : (
      /* istanbul ignore next */
      []
    )
  );
  totalRecientes = signal(
    0,
    ...ngDevMode ? [{ debugName: "totalRecientes" }] : (
      /* istanbul ignore next */
      []
    )
  );
  totalRevisadas = signal(
    0,
    ...ngDevMode ? [{ debugName: "totalRevisadas" }] : (
      /* istanbul ignore next */
      []
    )
  );
  totalPendientes = signal(
    0,
    ...ngDevMode ? [{ debugName: "totalPendientes" }] : (
      /* istanbul ignore next */
      []
    )
  );
  attentionItems = signal(
    [],
    ...ngDevMode ? [{ debugName: "attentionItems" }] : (
      /* istanbul ignore next */
      []
    )
  );
  topVehicles = signal(
    [],
    ...ngDevMode ? [{ debugName: "topVehicles" }] : (
      /* istanbul ignore next */
      []
    )
  );
  topSellers = signal(
    [],
    ...ngDevMode ? [{ debugName: "topSellers" }] : (
      /* istanbul ignore next */
      []
    )
  );
  fijadasQuotes = signal(
    [],
    ...ngDevMode ? [{ debugName: "fijadasQuotes" }] : (
      /* istanbul ignore next */
      []
    )
  );
  urgentesQuotes = signal(
    [],
    ...ngDevMode ? [{ debugName: "urgentesQuotes" }] : (
      /* istanbul ignore next */
      []
    )
  );
  recentQuotes = signal(
    [],
    ...ngDevMode ? [{ debugName: "recentQuotes" }] : (
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
  async ngOnInit() {
    await this.loadStats();
  }
  async loadStats() {
    this.loading.set(true);
    try {
      const { data, error } = await this.admin.getStats();
      if (error || !data) {
        throw error || new Error("Sin datos de estad\xEDsticas");
      }
      this.totalSellers.set(data.totalSellers || 0);
      this.totalQuotes.set(data.totalQuotes || 0);
      this.totalFijadas.set(data.totalFijadas || 0);
      this.totalUrgentes.set(data.totalUrgentes || 0);
      this.totalRecientes.set(data.totalRecientes || 0);
      this.totalRevisadas.set(data.totalRevisadas || 0);
      this.totalPendientes.set(data.totalPendientes || 0);
      this.topVehicles.set(data.topVehicles || []);
      this.topSellers.set(data.topSellers || []);
      this.fijadasQuotes.set(data.fijadas || []);
      this.urgentesQuotes.set(data.urgentes || []);
      this.recentQuotes.set(data.recientes || []);
      const urgentesCount = this.totalUrgentes();
      const pendientesCount = this.totalPendientes();
      const inactiveSellersCount = data.inactiveSellers || 0;
      this.attentionItems.set([
        ...urgentesCount ? [{
          type: "urgent",
          title: "Cotizaciones urgentes",
          detail: `${urgentesCount} cotizaci\xF3n${urgentesCount === 1 ? "" : "es"} sin seguimiento reciente.`,
          link: "/admin/quotes",
          action: "Revisar cotizaciones"
        }] : [],
        ...pendientesCount ? [{
          type: "pending",
          title: "Cotizaciones pendientes",
          detail: `${pendientesCount} cotizaci\xF3n${pendientesCount === 1 ? "" : "es"} requiere${pendientesCount === 1 ? "" : "n"} atenci\xF3n.`,
          link: "/admin/quotes",
          action: "Ver pendientes"
        }] : [],
        ...inactiveSellersCount ? [{
          type: "inactive",
          title: "Vendedores inactivos",
          detail: `${inactiveSellersCount} perfil${inactiveSellersCount === 1 ? "" : "es"} est\xE1${inactiveSellersCount === 1 ? "" : "n"} inactivo${inactiveSellersCount === 1 ? "" : "s"}.`,
          link: "/admin/sellers",
          action: "Gestionar equipo"
        }] : []
      ]);
    } catch (error) {
      console.warn("No se pudieron cargar las estad\xEDsticas:", error);
    } finally {
      this.today = /* @__PURE__ */ new Date();
      this.loading.set(false);
    }
  }
  // ===================== MÉTODOS AUXILIARES =====================
  getColorClase(quote) {
    return `color-${this.getEstado(quote)}`;
  }
  getEtiqueta(quote) {
    const labels = {
      reciente: "Reciente",
      verde: "Revisada",
      amarillo: "Pendiente",
      rojo: "Urgente"
    };
    return labels[this.getEstado(quote)];
  }
  getEstado(quote) {
    const estadosValidos = ["reciente", "verde", "amarillo", "rojo"];
    return estadosValidos.includes(quote.color) ? quote.color : "reciente";
  }
  getMaxPercentage(count, items) {
    if (!items || items.length === 0)
      return 0;
    const max = Math.max(...items.map((i) => i.count));
    return max > 0 ? count / max * 100 : 0;
  }
  getBarColor(count, items) {
    if (!items || items.length === 0)
      return "#94a3b8";
    const max = Math.max(...items.map((i) => i.count));
    if (max === 0)
      return "#94a3b8";
    const ratio = count / max;
    if (ratio > 0.7)
      return "#22c55e";
    if (ratio > 0.4)
      return "#f59e0b";
    return "#3b82f6";
  }
  static \u0275fac = function AdminStatsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminStatsComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminStatsComponent, selectors: [["app-admin-stats"]], decls: 15, vars: 9, consts: [[1, "dashboard-container"], [1, "dashboard-header"], [1, "subtitle"], [1, "update-badge"], ["class", "metrics-grid", 4, "ngIf"], ["class", "attention-panel", 4, "ngIf"], ["class", "charts-row", 4, "ngIf"], ["class", "quotes-sections", 4, "ngIf"], ["class", "loading-overlay", 4, "ngIf"], [1, "metrics-grid"], [1, "metric-card"], [1, "metric-icon", "blue"], ["width", "24", "height", "24", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"], ["points", "14 2 14 8 20 8"], ["x1", "16", "y1", "13", "x2", "8", "y2", "13"], ["x1", "16", "y1", "17", "x2", "8", "y2", "17"], [1, "metric-info"], [1, "metric-label"], [1, "metric-value"], [1, "metric-icon", "green"], ["d", "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"], ["cx", "9", "cy", "7", "r", "4"], ["d", "M23 21v-2a4 4 0 0 0-3-3.87"], ["d", "M16 3.13a4 4 0 0 1 0 7.75"], [1, "metric-icon", "amber"], ["d", "M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.66 0 3-4.03 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4.03-3-9s1.34-9 3-9"], [1, "metric-icon", "red"], ["d", "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"], ["d", "M12 8v4"], ["d", "M12 16h.01"], [1, "attention-panel"], [1, "attention-header"], [1, "section-kicker"], [1, "attention-summary"], [1, "summary-stat", "summary-recent"], [1, "summary-stat", "summary-reviewed"], [1, "summary-stat", "summary-pending"], [1, "attention-count"], ["class", "attention-list", 4, "ngIf"], ["class", "attention-clear", 4, "ngIf"], [1, "attention-list"], ["class", "attention-item", 3, "class", 4, "ngFor", "ngForOf"], [1, "attention-item"], [1, "attention-indicator"], [1, "attention-copy"], [1, "attention-action", 3, "routerLink"], ["aria-hidden", "true"], [1, "attention-clear"], ["aria-hidden", "true", 1, "clear-icon"], [1, "charts-row"], [1, "chart-card"], ["class", "chart-body", 4, "ngIf"], ["class", "empty-chart", 4, "ngIf"], [1, "chart-body"], ["class", "bar-item", 4, "ngFor", "ngForOf"], [1, "bar-item"], [1, "bar-label"], [1, "bar-track"], [1, "bar-fill"], [1, "bar-count"], [1, "empty-chart"], [1, "seller-location"], [1, "quotes-sections"], ["class", "quotes-column", 4, "ngIf"], [1, "quotes-column"], [1, "quote-list"], ["class", "quote-card-mini", 3, "ngClass", 4, "ngFor", "ngForOf"], ["class", "empty-state", 4, "ngIf"], [1, "quote-card-mini", 3, "ngClass"], [1, "card-color-indicator"], [1, "card-header"], [1, "client-name"], [1, "price-tag"], [1, "vehicle-name"], [1, "card-footer"], [1, "seller-name"], [1, "status-badge"], ["routerLink", "/admin/quotes", 1, "view-link"], [1, "empty-state"], [1, "loading-overlay"], [1, "spinner"]], template: function AdminStatsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1");
      \u0275\u0275text(4, "Dashboard");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "span", 2);
      \u0275\u0275text(6, "Resumen general de la operaci\xF3n");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "span", 3);
      \u0275\u0275text(8);
      \u0275\u0275pipe(9, "date");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(10, AdminStatsComponent_div_10_Template, 45, 4, "div", 4)(11, AdminStatsComponent_section_11_Template, 24, 6, "section", 5)(12, AdminStatsComponent_div_12_Template, 11, 4, "div", 6)(13, AdminStatsComponent_div_13_Template, 4, 3, "div", 7)(14, AdminStatsComponent_div_14_Template, 4, 0, "div", 8);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate1("Actualizado: ", \u0275\u0275pipeBind2(9, 6, ctx.today, "dd/MM/yyyy HH:mm"));
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", !ctx.loading());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loading());
    }
  }, dependencies: [CommonModule, NgClass, NgForOf, NgIf, RouterModule, RouterLink, CurrencyPipe, DatePipe], styles: ['\n.dashboard-container[_ngcontent-%COMP%] {\n  max-width: 1400px;\n  margin: 0 auto;\n  padding: 1.5rem;\n  font-family:\n    "Inter",\n    system-ui,\n    sans-serif;\n}\n.dashboard-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 2rem;\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n.dashboard-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-family: "Fjalla One", sans-serif;\n  font-size: 2rem;\n  margin: 0;\n  color: var(--%NS%text-main);\n}\n.dashboard-header[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%] {\n  color: var(--%NS%text-muted);\n  font-size: 0.9rem;\n}\n.update-badge[_ngcontent-%COMP%] {\n  background: var(--%NS%surface-hover);\n  padding: 0.3rem 1rem;\n  border-radius: 30px;\n  font-size: 0.8rem;\n  color: var(--%NS%text-silver);\n}\n.metrics-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 1rem;\n  margin-bottom: 2rem;\n}\n.metric-card[_ngcontent-%COMP%] {\n  background: var(--%NS%surface-card);\n  padding: 1rem 1.5rem;\n  border-radius: 12px;\n  border: 1px solid var(--%NS%border-color);\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  transition: transform 0.2s, box-shadow 0.2s;\n}\n.metric-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-3px);\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);\n}\n.metric-icon[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.metric-icon.blue[_ngcontent-%COMP%] {\n  background: var(--%NS%info-bg);\n  color: var(--%NS%info);\n}\n.metric-icon.green[_ngcontent-%COMP%] {\n  background: var(--%NS%accent-green-light);\n  color: #22c55e;\n}\n.metric-icon.amber[_ngcontent-%COMP%] {\n  background: var(--%NS%warning-bg);\n  color: #f59e0b;\n}\n.metric-icon.red[_ngcontent-%COMP%] {\n  background: var(--%NS%danger-bg);\n  color: var(--%NS%danger-bright);\n}\n.metric-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.metric-label[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  font-weight: 700;\n  color: var(--%NS%text-muted);\n  text-transform: uppercase;\n  letter-spacing: 0.3px;\n}\n.metric-value[_ngcontent-%COMP%] {\n  font-family: "Fjalla One", sans-serif;\n  font-size: 1.8rem;\n  color: var(--%NS%text-main);\n  line-height: 1.2;\n}\n.charts-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1.5rem;\n  margin-bottom: 2rem;\n}\n.chart-card[_ngcontent-%COMP%] {\n  background: var(--%NS%surface-card);\n  border-radius: 12px;\n  border: 1px solid var(--%NS%border-color);\n  padding: 1.2rem 1.5rem;\n}\n.chart-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-family: "Fjalla One", sans-serif;\n  font-size: 1.1rem;\n  margin: 0 0 1rem 0;\n  color: var(--%NS%text-main);\n}\n.chart-body[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.6rem;\n}\n.bar-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n}\n.bar-label[_ngcontent-%COMP%] {\n  width: 40%;\n  font-size: 0.85rem;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  color: var(--%NS%text-main);\n}\n.seller-location[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  color: var(--%NS%accent-silver);\n  margin-left: 0.3rem;\n}\n.bar-track[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 24px;\n  background: var(--%NS%surface-hover);\n  border-radius: 12px;\n  overflow: hidden;\n}\n.bar-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  border-radius: 12px;\n  transition: width 0.6s ease;\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  padding-right: 0.5rem;\n  font-size: 0.7rem;\n  font-weight: 700;\n  color: var(--%NS%text-on-accent);\n  min-width: 2rem;\n}\n.bar-count[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  font-weight: 700;\n}\n.empty-chart[_ngcontent-%COMP%], \n.loading-placeholder[_ngcontent-%COMP%] {\n  padding: 1.5rem 0;\n  text-align: center;\n  color: var(--%NS%accent-silver);\n  font-style: italic;\n}\n.quotes-sections[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 1.5rem;\n  margin-top: 1rem;\n}\n.quotes-column[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-family: "Fjalla One", sans-serif;\n  font-size: 1rem;\n  margin: 0 0 0.8rem 0;\n  color: var(--%NS%text-main);\n}\n.quote-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.6rem;\n}\n.empty-state[_ngcontent-%COMP%] {\n  color: var(--%NS%accent-silver);\n  font-style: italic;\n  padding: 0.5rem 0;\n}\n.quote-card-mini[_ngcontent-%COMP%] {\n  background: var(--%NS%surface-card);\n  border-radius: 8px;\n  border: 1px solid var(--%NS%border-color);\n  padding: 0.8rem 1rem;\n  position: relative;\n  overflow: hidden;\n}\n.quote-card-mini[_ngcontent-%COMP%]   .card-color-indicator[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 4px;\n  background: var(--%NS%accent-silver);\n}\n.quote-card-mini.color-verde[_ngcontent-%COMP%]   .card-color-indicator[_ngcontent-%COMP%] {\n  background: #22c55e;\n}\n.quote-card-mini.color-amarillo[_ngcontent-%COMP%]   .card-color-indicator[_ngcontent-%COMP%] {\n  background: #f59e0b;\n}\n.quote-card-mini.color-rojo[_ngcontent-%COMP%]   .card-color-indicator[_ngcontent-%COMP%] {\n  background: var(--%NS%danger-bright);\n}\n.quote-card-mini.color-reciente[_ngcontent-%COMP%]   .card-color-indicator[_ngcontent-%COMP%] {\n  background: var(--%NS%info);\n}\n.quote-card-mini[_ngcontent-%COMP%]   .status-badge[_ngcontent-%COMP%] {\n  font-size: 0.65rem;\n  font-weight: 700;\n  padding: 0.1rem 0.6rem;\n  border-radius: 20px;\n  background: var(--%NS%border-color);\n  color: var(--%NS%text-silver);\n}\n.quote-card-mini.color-verde[_ngcontent-%COMP%]   .status-badge[_ngcontent-%COMP%] {\n  background: #bbf7d0;\n  color: var(--%NS%accent-green-dark);\n}\n.quote-card-mini.color-amarillo[_ngcontent-%COMP%]   .status-badge[_ngcontent-%COMP%] {\n  background: var(--%NS%warning-bg);\n  color: var(--%NS%warning);\n}\n.quote-card-mini.color-rojo[_ngcontent-%COMP%]   .status-badge[_ngcontent-%COMP%] {\n  background: var(--%NS%danger-bg);\n  color: var(--%NS%danger);\n}\n.quote-card-mini.color-reciente[_ngcontent-%COMP%]   .status-badge[_ngcontent-%COMP%] {\n  background: var(--%NS%info-bg);\n  color: var(--%NS%info);\n}\n.quote-card-mini.color-verde[_ngcontent-%COMP%] {\n  border-left: 4px solid #22c55e;\n}\n.quote-card-mini.color-amarillo[_ngcontent-%COMP%] {\n  border-left: 4px solid #f59e0b;\n}\n.quote-card-mini.color-rojo[_ngcontent-%COMP%] {\n  border-left: 4px solid var(--%NS%danger-bright);\n}\n.quote-card-mini.color-reciente[_ngcontent-%COMP%] {\n  border-left: 4px solid var(--%NS%info);\n}\n.quote-card-mini[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-top: 0.2rem;\n}\n.quote-card-mini[_ngcontent-%COMP%]   .client-name[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: var(--%NS%text-main);\n}\n.quote-card-mini[_ngcontent-%COMP%]   .price-tag[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: var(--%NS%accent-green-dark);\n}\n.quote-card-mini[_ngcontent-%COMP%]   .vehicle-name[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: var(--%NS%text-silver);\n  margin: 0.2rem 0;\n}\n.quote-card-mini[_ngcontent-%COMP%]   .card-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-size: 0.8rem;\n  color: var(--%NS%text-muted);\n}\n.quote-card-mini[_ngcontent-%COMP%]   .seller-name[_ngcontent-%COMP%] {\n  color: var(--%NS%text-silver);\n}\n.quote-card-mini[_ngcontent-%COMP%]   .view-link[_ngcontent-%COMP%] {\n  display: inline-block;\n  margin-top: 0.3rem;\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: var(--%NS%accent-green-dark);\n  text-decoration: none;\n}\n.quote-card-mini[_ngcontent-%COMP%]   .view-link[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.loading-overlay[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 3rem 0;\n  color: var(--%NS%text-muted);\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border: 4px solid var(--%NS%border-color);\n  border-top-color: var(--%NS%accent-green-dark);\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n  margin-bottom: 1rem;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@media (max-width: 1024px) {\n  .quotes-sections[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr;\n  }\n}\n@media (max-width: 768px) {\n  .charts-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .quotes-sections[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .metrics-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr;\n  }\n  .dashboard-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n}\n@media (max-width: 480px) {\n  .metrics-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.dashboard-container[_ngcontent-%COMP%] {\n  position: relative;\n  max-width: 1400px;\n  padding: 0;\n  overflow: hidden;\n}\n.dashboard-container[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 40%;\n  height: 190px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(32, 176, 56, 0.14),\n      rgba(16, 37, 31, 0.07));\n  clip-path: polygon(35% 0, 100% 0, 100% 100%, 0 100%);\n  pointer-events: none;\n}\n.dashboard-header[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  min-height: 164px;\n  align-items: flex-end;\n  margin: 0 0 1.25rem;\n  padding: 1.5rem 1.75rem;\n  border: 1px solid rgba(139, 226, 140, 0.22);\n  border-radius: 16px;\n  background:\n    linear-gradient(\n      115deg,\n      #10251f 0%,\n      #173c2e 68%,\n      #1f6840 100%);\n  box-shadow: 0 16px 30px rgba(16, 37, 31, 0.16);\n}\n.dashboard-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  color: var(--%NS%text-on-accent);\n  font-size: 2rem;\n  line-height: 1;\n}\n.dashboard-header[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 0.4rem;\n  color: #bdd6c7;\n}\n.update-badge[_ngcontent-%COMP%] {\n  border: 1px solid rgba(139, 226, 140, 0.3);\n  border-radius: 7px;\n  background: rgba(255, 255, 255, 0.08);\n  color: #d5f0dc;\n}\n.metrics-grid[_ngcontent-%COMP%], \n.charts-row[_ngcontent-%COMP%], \n.quotes-sections[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n}\n.metric-card[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  padding: 1.1rem 1.25rem;\n  border: 1px solid var(--%NS%border-color);\n  border-radius: 13px;\n  background: var(--%NS%surface-card);\n  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.05);\n}\n.metric-card[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  right: -18px;\n  bottom: -24px;\n  width: 74px;\n  height: 74px;\n  border-radius: 50%;\n  background: rgba(32, 176, 56, 0.06);\n}\n.metric-card[_ngcontent-%COMP%]:hover {\n  border-color: #8bd39a;\n  box-shadow: 0 14px 28px rgba(15, 23, 42, 0.1);\n  transform: translateY(-4px);\n}\n.metric-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 11px;\n}\n.metric-icon.blue[_ngcontent-%COMP%] {\n  background: var(--%NS%info-bg);\n  color: #2563eb;\n}\n.metric-icon.green[_ngcontent-%COMP%] {\n  background: var(--%NS%accent-green-light);\n  color: var(--%NS%accent-green-dark);\n}\n.metric-icon.amber[_ngcontent-%COMP%] {\n  background: var(--%NS%warning-bg);\n  color: var(--%NS%warning);\n}\n.metric-icon.red[_ngcontent-%COMP%] {\n  background: var(--%NS%danger-bg);\n  color: var(--%NS%danger);\n}\n.metric-value[_ngcontent-%COMP%] {\n  color: var(--%NS%accent-slate);\n}\n.chart-card[_ngcontent-%COMP%] {\n  border: 1px solid var(--%NS%border-color);\n  border-radius: 13px;\n  background: var(--%NS%surface-card);\n  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.05);\n}\n.chart-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], \n.quotes-column[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  letter-spacing: 0.35px;\n}\n.bar-track[_ngcontent-%COMP%] {\n  height: 10px;\n  border-radius: 5px;\n  background: var(--%NS%border-color);\n}\n.bar-fill[_ngcontent-%COMP%] {\n  min-width: 2.2rem;\n  border-radius: 5px;\n}\n.quotes-column[_ngcontent-%COMP%] {\n  padding: 1rem;\n  border: 1px solid var(--%NS%border-color);\n  border-radius: 13px;\n  background: var(--%NS%surface-subtle);\n}\n.quotes-column[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin-bottom: 0.9rem;\n}\n.quote-card-mini[_ngcontent-%COMP%] {\n  border-radius: 10px;\n  background: var(--%NS%surface-card);\n  box-shadow: 0 5px 14px rgba(15, 23, 42, 0.04);\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n.quote-card-mini[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.09);\n  transform: translateY(-2px);\n}\n.quote-card-mini[_ngcontent-%COMP%]   .view-link[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  padding-top: 0.5rem;\n  border-top: 1px solid var(--%NS%surface-muted);\n}\n.loading-overlay[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 2;\n  min-height: 180px;\n  border: 1px solid var(--%NS%border-color);\n  border-radius: 13px;\n  background: var(--%NS%surface-card);\n}\n.attention-panel[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  margin-bottom: 1.5rem;\n  padding: 1.15rem;\n  border: 1px solid var(--%NS%border-color);\n  border-radius: 13px;\n  background: var(--%NS%surface-card);\n  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.05);\n}\n.attention-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-end;\n  justify-content: space-between;\n  gap: 1rem;\n  padding-bottom: 0.9rem;\n  border-bottom: 1px solid var(--%NS%surface-muted);\n}\n.section-kicker[_ngcontent-%COMP%] {\n  color: var(--%NS%accent-green-dark);\n  font-size: 0.68rem;\n  font-weight: 700;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n}\n.attention-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0.25rem 0 0;\n  color: var(--%NS%accent-slate);\n  font-family: "Fjalla One", sans-serif;\n  font-size: 1.25rem;\n}\n.attention-summary[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n  gap: 0.4rem;\n}\n.summary-stat[_ngcontent-%COMP%], \n.attention-count[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.3rem;\n  min-height: 28px;\n  padding: 0.3rem 0.55rem;\n  border: 1px solid var(--%NS%border-color);\n  border-radius: 6px;\n  color: var(--%NS%text-muted);\n  font-size: 0.7rem;\n  font-weight: 600;\n}\n.summary-stat[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--%NS%text-main);\n  font-size: 0.82rem;\n}\n.summary-recent[_ngcontent-%COMP%] {\n  border-color: #bfdbfe;\n  background: var(--%NS%info-bg);\n  color: var(--%NS%info);\n}\n.summary-reviewed[_ngcontent-%COMP%] {\n  border-color: #8bd39a;\n  background: var(--%NS%accent-green-light);\n  color: var(--%NS%accent-green-dark);\n}\n.summary-pending[_ngcontent-%COMP%] {\n  border-color: #fed7aa;\n  background: var(--%NS%warning-bg);\n  color: var(--%NS%warning);\n}\n.attention-count[_ngcontent-%COMP%] {\n  border-color: var(--%NS%danger-border);\n  background: var(--%NS%danger-bg);\n  color: #be123c;\n}\n.attention-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.6rem;\n  padding-top: 0.9rem;\n}\n.attention-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.75rem 0.8rem;\n  border: 1px solid var(--%NS%surface-muted);\n  border-left: 3px solid #f59e0b;\n  border-radius: 9px;\n  background: var(--%NS%surface-subtle);\n}\n.attention-urgent[_ngcontent-%COMP%] {\n  border-left-color: var(--%NS%danger-bright);\n}\n.attention-inactive[_ngcontent-%COMP%] {\n  border-left-color: var(--%NS%info);\n}\n.attention-indicator[_ngcontent-%COMP%] {\n  width: 9px;\n  height: 9px;\n  flex-shrink: 0;\n  border-radius: 50%;\n  background: #f59e0b;\n  box-shadow: 0 0 0 4px var(--%NS%warning-bg);\n}\n.attention-urgent[_ngcontent-%COMP%]   .attention-indicator[_ngcontent-%COMP%] {\n  background: var(--%NS%danger-bright);\n  box-shadow: 0 0 0 4px var(--%NS%danger-bg);\n}\n.attention-inactive[_ngcontent-%COMP%]   .attention-indicator[_ngcontent-%COMP%] {\n  background: var(--%NS%info);\n  box-shadow: 0 0 0 4px var(--%NS%info-bg);\n}\n.attention-copy[_ngcontent-%COMP%] {\n  display: flex;\n  flex: 1;\n  min-width: 0;\n  flex-direction: column;\n  gap: 0.15rem;\n}\n.attention-copy[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--%NS%text-main);\n  font-size: 0.86rem;\n}\n.attention-copy[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: var(--%NS%text-muted);\n  font-size: 0.78rem;\n}\n.attention-action[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  color: var(--%NS%accent-green-dark);\n  font-size: 0.76rem;\n  font-weight: 700;\n  text-decoration: none;\n}\n.attention-action[_ngcontent-%COMP%]:hover {\n  color: var(--%NS%accent-green-dark);\n  text-decoration: underline;\n}\n.attention-clear[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  padding-top: 0.9rem;\n  color: var(--%NS%text-muted);\n  font-size: 0.82rem;\n}\n.clear-icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 26px;\n  height: 26px;\n  border-radius: 50%;\n  background: var(--%NS%accent-green-light);\n  color: var(--%NS%accent-green-dark);\n  font-weight: 700;\n}\n@media (max-width: 768px) {\n  .dashboard-header[_ngcontent-%COMP%] {\n    min-height: 0;\n    align-items: stretch;\n    padding: 1.25rem;\n  }\n  .dashboard-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 1.7rem;\n  }\n  .update-badge[_ngcontent-%COMP%] {\n    align-self: flex-start;\n  }\n  .quotes-column[_ngcontent-%COMP%] {\n    padding: 0.85rem;\n  }\n  .attention-header[_ngcontent-%COMP%] {\n    align-items: stretch;\n    flex-direction: column;\n  }\n  .attention-summary[_ngcontent-%COMP%] {\n    justify-content: flex-start;\n  }\n  .attention-item[_ngcontent-%COMP%] {\n    align-items: flex-start;\n    flex-wrap: wrap;\n  }\n  .attention-action[_ngcontent-%COMP%] {\n    margin-left: 1.35rem;\n  }\n  .quote-card-mini[_ngcontent-%COMP%]   .client-name[_ngcontent-%COMP%], \n   .quote-card-mini[_ngcontent-%COMP%]   .vehicle-name[_ngcontent-%COMP%] {\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    min-width: 0;\n  }\n  .quote-card-mini[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%] {\n    gap: 0.5rem;\n  }\n}\n/*# sourceMappingURL=admin-stats.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminStatsComponent, [{
    type: Component,
    args: [{ selector: "app-admin-stats", standalone: true, imports: [CommonModule, RouterModule], template: `<div class="dashboard-container">\r
\r
  <!-- Encabezado -->\r
  <div class="dashboard-header">\r
    <div>\r
      <h1>Dashboard</h1>\r
      <span class="subtitle">Resumen general de la operaci\xF3n</span>\r
    </div>\r
    <span class="update-badge">Actualizado: {{ today | date:'dd/MM/yyyy HH:mm' }}</span>\r
  </div>\r
\r
  <!-- M\xE9tricas -->\r
  <div class="metrics-grid" *ngIf="!loading()">\r
    <div class="metric-card">\r
      <div class="metric-icon blue">\r
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>\r
      </div>\r
      <div class="metric-info">\r
        <span class="metric-label">Cotizaciones</span>\r
        <span class="metric-value">{{ totalQuotes() }}</span>\r
      </div>\r
    </div>\r
    <div class="metric-card">\r
      <div class="metric-icon green">\r
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>\r
      </div>\r
      <div class="metric-info">\r
        <span class="metric-label">Vendedores</span>\r
        <span class="metric-value">{{ totalSellers() }}</span>\r
      </div>\r
    </div>\r
    <div class="metric-card">\r
      <div class="metric-icon amber">\r
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.66 0 3-4.03 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4.03-3-9s1.34-9 3-9"/></svg>\r
      </div>\r
      <div class="metric-info">\r
        <span class="metric-label">Fijadas</span>\r
        <span class="metric-value">{{ totalFijadas() }}</span>\r
      </div>\r
    </div>\r
    <div class="metric-card">\r
      <div class="metric-icon red">\r
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>\r
      </div>\r
      <div class="metric-info">\r
        <span class="metric-label">Urgentes</span>\r
        <span class="metric-value">{{ totalUrgentes() }}</span>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <section class="attention-panel" *ngIf="!loading()">\r
    <div class="attention-header">\r
      <div>\r
        <span class="section-kicker">Centro de atenci\xF3n</span>\r
        <h2>Prioridades operativas</h2>\r
      </div>\r
      <div class="attention-summary">\r
        <span class="summary-stat summary-recent"><strong>{{ totalRecientes() }}</strong> recientes</span>\r
        <span class="summary-stat summary-reviewed"><strong>{{ totalRevisadas() }}</strong> revisadas</span>\r
        <span class="summary-stat summary-pending"><strong>{{ totalPendientes() }}</strong> pendientes</span>\r
        <span class="attention-count">{{ attentionItems().length }} alertas</span>\r
      </div>\r
    </div>\r
    <div class="attention-list" *ngIf="attentionItems().length > 0">\r
      <div class="attention-item" *ngFor="let item of attentionItems()" [class]="'attention-' + item.type">\r
        <span class="attention-indicator"></span>\r
        <div class="attention-copy">\r
          <strong>{{ item.title }}</strong>\r
          <span>{{ item.detail }}</span>\r
        </div>\r
        <a [routerLink]="item.link" class="attention-action">{{ item.action }} <span aria-hidden="true">\u2192</span></a>\r
      </div>\r
    </div>\r
    <div class="attention-clear" *ngIf="attentionItems().length === 0">\r
      <span class="clear-icon" aria-hidden="true">&#10003;</span>\r
      <span>No hay prioridades pendientes. La operaci\xF3n est\xE1 al d\xEDa.</span>\r
    </div>\r
  </section>\r
\r
  <!-- Gr\xE1ficos -->\r
  <div class="charts-row" *ngIf="!loading()">\r
    <div class="chart-card">\r
      <h3>Veh\xEDculos m\xE1s cotizados</h3>\r
      <div class="chart-body" *ngIf="!loading() && topVehicles().length > 0">\r
        <div class="bar-item" *ngFor="let v of topVehicles()">\r
          <span class="bar-label">{{ v.name }}</span>\r
          <div class="bar-track">\r
            <div class="bar-fill" [style.width.%]="getMaxPercentage(v.count, topVehicles())" [style.background]="getBarColor(v.count, topVehicles())">\r
              <span class="bar-count">{{ v.count }}</span>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
      <div *ngIf="!loading() && topVehicles().length === 0" class="empty-chart">Sin datos</div>\r
    </div>\r
    <div class="chart-card">\r
      <h3>Vendedores con m\xE1s cotizaciones</h3>\r
      <div class="chart-body" *ngIf="!loading() && topSellers().length > 0">\r
        <div class="bar-item" *ngFor="let s of topSellers()">\r
          <span class="bar-label">\r
            <strong>{{ s.name }}</strong>\r
            <span class="seller-location">{{ s.location }}</span>\r
          </span>\r
          <div class="bar-track">\r
            <div class="bar-fill" [style.width.%]="getMaxPercentage(s.count, topSellers())" [style.background]="getBarColor(s.count, topSellers())">\r
              <span class="bar-count">{{ s.count }}</span>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
      <div *ngIf="!loading() && topSellers().length === 0" class="empty-chart">Sin datos</div>\r
    </div>\r
  </div>\r
\r
  <!-- Cotizaciones destacadas -->\r
  <div class="quotes-sections" *ngIf="!loading()">\r
\r
    <!-- Fijadas -->\r
    <div class="quotes-column" *ngIf="!loading()">\r
      <h3>Fijadas</h3>\r
      <div class="quote-list">\r
        <div *ngFor="let q of fijadasQuotes()" class="quote-card-mini" [ngClass]="getColorClase(q)">\r
          <div class="card-color-indicator"></div>\r
          <div class="card-header">\r
            <span class="client-name">{{ q.client_name || 'Cliente sin nombre' }}</span>\r
            <span class="price-tag">{{ q.pricenet | currency:'MXN':'symbol':'1.0-0' }}</span>\r
          </div>\r
          <div class="vehicle-name">{{ q.brand }} {{ q.model }}</div>\r
          <div class="card-footer">\r
            <span class="seller-name">Vendedor: {{ q.seller_name }}</span>\r
            <span class="status-badge">{{ getEtiqueta(q) }}</span>\r
          </div>\r
          <a routerLink="/admin/quotes" class="view-link">Ver detalle \u2192</a>\r
        </div>\r
        <div *ngIf="fijadasQuotes().length === 0" class="empty-state">Sin cotizaciones fijadas</div>\r
      </div>\r
    </div>\r
\r
    <!-- Urgentes -->\r
    <div class="quotes-column" *ngIf="!loading()">\r
      <h3>Urgentes</h3>\r
      <div class="quote-list">\r
        <div *ngFor="let q of urgentesQuotes()" class="quote-card-mini" [ngClass]="getColorClase(q)">\r
          <div class="card-color-indicator"></div>\r
          <div class="card-header">\r
            <span class="client-name">{{ q.client_name || 'Cliente sin nombre' }}</span>\r
            <span class="price-tag">{{ q.pricenet | currency:'MXN':'symbol':'1.0-0' }}</span>\r
          </div>\r
          <div class="vehicle-name">{{ q.brand }} {{ q.model }}</div>\r
          <div class="card-footer">\r
            <span class="seller-name">Vendedor: {{ q.seller_name }}</span>\r
            <span class="status-badge">{{ getEtiqueta(q) }}</span>\r
          </div>\r
          <a routerLink="/admin/quotes" class="view-link">Ver detalle \u2192</a>\r
        </div>\r
        <div *ngIf="urgentesQuotes().length === 0" class="empty-state">Sin cotizaciones urgentes</div>\r
      </div>\r
    </div>\r
\r
    <!-- \xDAltimas cotizaciones -->\r
    <div class="quotes-column" *ngIf="!loading()">\r
      <h3>\xDAltimas cotizaciones</h3>\r
      <div class="quote-list">\r
        <div *ngFor="let q of recentQuotes()" class="quote-card-mini" [ngClass]="getColorClase(q)">\r
          <div class="card-color-indicator"></div>\r
          <div class="card-header">\r
            <span class="client-name">{{ q.client_name || 'Cliente sin nombre' }}</span>\r
            <span class="price-tag">{{ q.pricenet | currency:'MXN':'symbol':'1.0-0' }}</span>\r
          </div>\r
          <div class="vehicle-name">{{ q.brand }} {{ q.model }}</div>\r
          <div class="card-footer">\r
            <span class="seller-name">Vendedor: {{ q.seller_name }}</span>\r
            <span class="status-badge">{{ getEtiqueta(q) }}</span>\r
          </div>\r
          <a routerLink="/admin/quotes" class="view-link">Ver detalle \u2192</a>\r
        </div>\r
        <div *ngIf="recentQuotes().length === 0" class="empty-state">Sin cotizaciones recientes</div>\r
      </div>\r
    </div>\r
\r
  </div>\r
\r
  <div *ngIf="loading()" class="loading-overlay">\r
    <div class="spinner"></div>\r
    <p>Cargando estad\xEDsticas...</p>\r
  </div>\r
\r
</div>\r
`, styles: ['/* src/app/components/admin/admin-stats/admin-stats.component.css */\n.dashboard-container {\n  max-width: 1400px;\n  margin: 0 auto;\n  padding: 1.5rem;\n  font-family:\n    "Inter",\n    system-ui,\n    sans-serif;\n}\n.dashboard-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 2rem;\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n.dashboard-header h1 {\n  font-family: "Fjalla One", sans-serif;\n  font-size: 2rem;\n  margin: 0;\n  color: var(--text-main);\n}\n.dashboard-header .subtitle {\n  color: var(--text-muted);\n  font-size: 0.9rem;\n}\n.update-badge {\n  background: var(--surface-hover);\n  padding: 0.3rem 1rem;\n  border-radius: 30px;\n  font-size: 0.8rem;\n  color: var(--text-silver);\n}\n.metrics-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 1rem;\n  margin-bottom: 2rem;\n}\n.metric-card {\n  background: var(--surface-card);\n  padding: 1rem 1.5rem;\n  border-radius: 12px;\n  border: 1px solid var(--border-color);\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  transition: transform 0.2s, box-shadow 0.2s;\n}\n.metric-card:hover {\n  transform: translateY(-3px);\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);\n}\n.metric-icon {\n  width: 48px;\n  height: 48px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.metric-icon.blue {\n  background: var(--info-bg);\n  color: var(--info);\n}\n.metric-icon.green {\n  background: var(--accent-green-light);\n  color: #22c55e;\n}\n.metric-icon.amber {\n  background: var(--warning-bg);\n  color: #f59e0b;\n}\n.metric-icon.red {\n  background: var(--danger-bg);\n  color: var(--danger-bright);\n}\n.metric-info {\n  display: flex;\n  flex-direction: column;\n}\n.metric-label {\n  font-size: 0.75rem;\n  font-weight: 700;\n  color: var(--text-muted);\n  text-transform: uppercase;\n  letter-spacing: 0.3px;\n}\n.metric-value {\n  font-family: "Fjalla One", sans-serif;\n  font-size: 1.8rem;\n  color: var(--text-main);\n  line-height: 1.2;\n}\n.charts-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1.5rem;\n  margin-bottom: 2rem;\n}\n.chart-card {\n  background: var(--surface-card);\n  border-radius: 12px;\n  border: 1px solid var(--border-color);\n  padding: 1.2rem 1.5rem;\n}\n.chart-card h3 {\n  font-family: "Fjalla One", sans-serif;\n  font-size: 1.1rem;\n  margin: 0 0 1rem 0;\n  color: var(--text-main);\n}\n.chart-body {\n  display: flex;\n  flex-direction: column;\n  gap: 0.6rem;\n}\n.bar-item {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n}\n.bar-label {\n  width: 40%;\n  font-size: 0.85rem;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  color: var(--text-main);\n}\n.seller-location {\n  font-size: 0.7rem;\n  color: var(--accent-silver);\n  margin-left: 0.3rem;\n}\n.bar-track {\n  flex: 1;\n  height: 24px;\n  background: var(--surface-hover);\n  border-radius: 12px;\n  overflow: hidden;\n}\n.bar-fill {\n  height: 100%;\n  border-radius: 12px;\n  transition: width 0.6s ease;\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  padding-right: 0.5rem;\n  font-size: 0.7rem;\n  font-weight: 700;\n  color: var(--text-on-accent);\n  min-width: 2rem;\n}\n.bar-count {\n  font-size: 0.7rem;\n  font-weight: 700;\n}\n.empty-chart,\n.loading-placeholder {\n  padding: 1.5rem 0;\n  text-align: center;\n  color: var(--accent-silver);\n  font-style: italic;\n}\n.quotes-sections {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 1.5rem;\n  margin-top: 1rem;\n}\n.quotes-column h3 {\n  font-family: "Fjalla One", sans-serif;\n  font-size: 1rem;\n  margin: 0 0 0.8rem 0;\n  color: var(--text-main);\n}\n.quote-list {\n  display: flex;\n  flex-direction: column;\n  gap: 0.6rem;\n}\n.empty-state {\n  color: var(--accent-silver);\n  font-style: italic;\n  padding: 0.5rem 0;\n}\n.quote-card-mini {\n  background: var(--surface-card);\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  padding: 0.8rem 1rem;\n  position: relative;\n  overflow: hidden;\n}\n.quote-card-mini .card-color-indicator {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 4px;\n  background: var(--accent-silver);\n}\n.quote-card-mini.color-verde .card-color-indicator {\n  background: #22c55e;\n}\n.quote-card-mini.color-amarillo .card-color-indicator {\n  background: #f59e0b;\n}\n.quote-card-mini.color-rojo .card-color-indicator {\n  background: var(--danger-bright);\n}\n.quote-card-mini.color-reciente .card-color-indicator {\n  background: var(--info);\n}\n.quote-card-mini .status-badge {\n  font-size: 0.65rem;\n  font-weight: 700;\n  padding: 0.1rem 0.6rem;\n  border-radius: 20px;\n  background: var(--border-color);\n  color: var(--text-silver);\n}\n.quote-card-mini.color-verde .status-badge {\n  background: #bbf7d0;\n  color: var(--accent-green-dark);\n}\n.quote-card-mini.color-amarillo .status-badge {\n  background: var(--warning-bg);\n  color: var(--warning);\n}\n.quote-card-mini.color-rojo .status-badge {\n  background: var(--danger-bg);\n  color: var(--danger);\n}\n.quote-card-mini.color-reciente .status-badge {\n  background: var(--info-bg);\n  color: var(--info);\n}\n.quote-card-mini.color-verde {\n  border-left: 4px solid #22c55e;\n}\n.quote-card-mini.color-amarillo {\n  border-left: 4px solid #f59e0b;\n}\n.quote-card-mini.color-rojo {\n  border-left: 4px solid var(--danger-bright);\n}\n.quote-card-mini.color-reciente {\n  border-left: 4px solid var(--info);\n}\n.quote-card-mini .card-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-top: 0.2rem;\n}\n.quote-card-mini .client-name {\n  font-weight: 700;\n  color: var(--text-main);\n}\n.quote-card-mini .price-tag {\n  font-weight: 700;\n  color: var(--accent-green-dark);\n}\n.quote-card-mini .vehicle-name {\n  font-size: 0.85rem;\n  color: var(--text-silver);\n  margin: 0.2rem 0;\n}\n.quote-card-mini .card-footer {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-size: 0.8rem;\n  color: var(--text-muted);\n}\n.quote-card-mini .seller-name {\n  color: var(--text-silver);\n}\n.quote-card-mini .view-link {\n  display: inline-block;\n  margin-top: 0.3rem;\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: var(--accent-green-dark);\n  text-decoration: none;\n}\n.quote-card-mini .view-link:hover {\n  text-decoration: underline;\n}\n.loading-overlay {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 3rem 0;\n  color: var(--text-muted);\n}\n.spinner {\n  width: 36px;\n  height: 36px;\n  border: 4px solid var(--border-color);\n  border-top-color: var(--accent-green-dark);\n  border-radius: 50%;\n  animation: spin 0.8s linear infinite;\n  margin-bottom: 1rem;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@media (max-width: 1024px) {\n  .quotes-sections {\n    grid-template-columns: 1fr 1fr;\n  }\n}\n@media (max-width: 768px) {\n  .charts-row {\n    grid-template-columns: 1fr;\n  }\n  .quotes-sections {\n    grid-template-columns: 1fr;\n  }\n  .metrics-grid {\n    grid-template-columns: 1fr 1fr;\n  }\n  .dashboard-header {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n}\n@media (max-width: 480px) {\n  .metrics-grid {\n    grid-template-columns: 1fr;\n  }\n}\n.dashboard-container {\n  position: relative;\n  max-width: 1400px;\n  padding: 0;\n  overflow: hidden;\n}\n.dashboard-container::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 40%;\n  height: 190px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(32, 176, 56, 0.14),\n      rgba(16, 37, 31, 0.07));\n  clip-path: polygon(35% 0, 100% 0, 100% 100%, 0 100%);\n  pointer-events: none;\n}\n.dashboard-header {\n  position: relative;\n  z-index: 1;\n  min-height: 164px;\n  align-items: flex-end;\n  margin: 0 0 1.25rem;\n  padding: 1.5rem 1.75rem;\n  border: 1px solid rgba(139, 226, 140, 0.22);\n  border-radius: 16px;\n  background:\n    linear-gradient(\n      115deg,\n      #10251f 0%,\n      #173c2e 68%,\n      #1f6840 100%);\n  box-shadow: 0 16px 30px rgba(16, 37, 31, 0.16);\n}\n.dashboard-header h1 {\n  color: var(--text-on-accent);\n  font-size: 2rem;\n  line-height: 1;\n}\n.dashboard-header .subtitle {\n  display: block;\n  margin-top: 0.4rem;\n  color: #bdd6c7;\n}\n.update-badge {\n  border: 1px solid rgba(139, 226, 140, 0.3);\n  border-radius: 7px;\n  background: rgba(255, 255, 255, 0.08);\n  color: #d5f0dc;\n}\n.metrics-grid,\n.charts-row,\n.quotes-sections {\n  position: relative;\n  z-index: 1;\n}\n.metric-card {\n  position: relative;\n  overflow: hidden;\n  padding: 1.1rem 1.25rem;\n  border: 1px solid var(--border-color);\n  border-radius: 13px;\n  background: var(--surface-card);\n  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.05);\n}\n.metric-card::after {\n  content: "";\n  position: absolute;\n  right: -18px;\n  bottom: -24px;\n  width: 74px;\n  height: 74px;\n  border-radius: 50%;\n  background: rgba(32, 176, 56, 0.06);\n}\n.metric-card:hover {\n  border-color: #8bd39a;\n  box-shadow: 0 14px 28px rgba(15, 23, 42, 0.1);\n  transform: translateY(-4px);\n}\n.metric-icon {\n  width: 44px;\n  height: 44px;\n  border-radius: 11px;\n}\n.metric-icon.blue {\n  background: var(--info-bg);\n  color: #2563eb;\n}\n.metric-icon.green {\n  background: var(--accent-green-light);\n  color: var(--accent-green-dark);\n}\n.metric-icon.amber {\n  background: var(--warning-bg);\n  color: var(--warning);\n}\n.metric-icon.red {\n  background: var(--danger-bg);\n  color: var(--danger);\n}\n.metric-value {\n  color: var(--accent-slate);\n}\n.chart-card {\n  border: 1px solid var(--border-color);\n  border-radius: 13px;\n  background: var(--surface-card);\n  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.05);\n}\n.chart-card h3,\n.quotes-column h3 {\n  letter-spacing: 0.35px;\n}\n.bar-track {\n  height: 10px;\n  border-radius: 5px;\n  background: var(--border-color);\n}\n.bar-fill {\n  min-width: 2.2rem;\n  border-radius: 5px;\n}\n.quotes-column {\n  padding: 1rem;\n  border: 1px solid var(--border-color);\n  border-radius: 13px;\n  background: var(--surface-subtle);\n}\n.quotes-column h3 {\n  margin-bottom: 0.9rem;\n}\n.quote-card-mini {\n  border-radius: 10px;\n  background: var(--surface-card);\n  box-shadow: 0 5px 14px rgba(15, 23, 42, 0.04);\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n.quote-card-mini:hover {\n  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.09);\n  transform: translateY(-2px);\n}\n.quote-card-mini .view-link {\n  display: flex;\n  justify-content: space-between;\n  padding-top: 0.5rem;\n  border-top: 1px solid var(--surface-muted);\n}\n.loading-overlay {\n  position: relative;\n  z-index: 2;\n  min-height: 180px;\n  border: 1px solid var(--border-color);\n  border-radius: 13px;\n  background: var(--surface-card);\n}\n.attention-panel {\n  position: relative;\n  z-index: 1;\n  margin-bottom: 1.5rem;\n  padding: 1.15rem;\n  border: 1px solid var(--border-color);\n  border-radius: 13px;\n  background: var(--surface-card);\n  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.05);\n}\n.attention-header {\n  display: flex;\n  align-items: flex-end;\n  justify-content: space-between;\n  gap: 1rem;\n  padding-bottom: 0.9rem;\n  border-bottom: 1px solid var(--surface-muted);\n}\n.section-kicker {\n  color: var(--accent-green-dark);\n  font-size: 0.68rem;\n  font-weight: 700;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n}\n.attention-header h2 {\n  margin: 0.25rem 0 0;\n  color: var(--accent-slate);\n  font-family: "Fjalla One", sans-serif;\n  font-size: 1.25rem;\n}\n.attention-summary {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n  gap: 0.4rem;\n}\n.summary-stat,\n.attention-count {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.3rem;\n  min-height: 28px;\n  padding: 0.3rem 0.55rem;\n  border: 1px solid var(--border-color);\n  border-radius: 6px;\n  color: var(--text-muted);\n  font-size: 0.7rem;\n  font-weight: 600;\n}\n.summary-stat strong {\n  color: var(--text-main);\n  font-size: 0.82rem;\n}\n.summary-recent {\n  border-color: #bfdbfe;\n  background: var(--info-bg);\n  color: var(--info);\n}\n.summary-reviewed {\n  border-color: #8bd39a;\n  background: var(--accent-green-light);\n  color: var(--accent-green-dark);\n}\n.summary-pending {\n  border-color: #fed7aa;\n  background: var(--warning-bg);\n  color: var(--warning);\n}\n.attention-count {\n  border-color: var(--danger-border);\n  background: var(--danger-bg);\n  color: #be123c;\n}\n.attention-list {\n  display: grid;\n  gap: 0.6rem;\n  padding-top: 0.9rem;\n}\n.attention-item {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.75rem 0.8rem;\n  border: 1px solid var(--surface-muted);\n  border-left: 3px solid #f59e0b;\n  border-radius: 9px;\n  background: var(--surface-subtle);\n}\n.attention-urgent {\n  border-left-color: var(--danger-bright);\n}\n.attention-inactive {\n  border-left-color: var(--info);\n}\n.attention-indicator {\n  width: 9px;\n  height: 9px;\n  flex-shrink: 0;\n  border-radius: 50%;\n  background: #f59e0b;\n  box-shadow: 0 0 0 4px var(--warning-bg);\n}\n.attention-urgent .attention-indicator {\n  background: var(--danger-bright);\n  box-shadow: 0 0 0 4px var(--danger-bg);\n}\n.attention-inactive .attention-indicator {\n  background: var(--info);\n  box-shadow: 0 0 0 4px var(--info-bg);\n}\n.attention-copy {\n  display: flex;\n  flex: 1;\n  min-width: 0;\n  flex-direction: column;\n  gap: 0.15rem;\n}\n.attention-copy strong {\n  color: var(--text-main);\n  font-size: 0.86rem;\n}\n.attention-copy span {\n  color: var(--text-muted);\n  font-size: 0.78rem;\n}\n.attention-action {\n  flex-shrink: 0;\n  color: var(--accent-green-dark);\n  font-size: 0.76rem;\n  font-weight: 700;\n  text-decoration: none;\n}\n.attention-action:hover {\n  color: var(--accent-green-dark);\n  text-decoration: underline;\n}\n.attention-clear {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  padding-top: 0.9rem;\n  color: var(--text-muted);\n  font-size: 0.82rem;\n}\n.clear-icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 26px;\n  height: 26px;\n  border-radius: 50%;\n  background: var(--accent-green-light);\n  color: var(--accent-green-dark);\n  font-weight: 700;\n}\n@media (max-width: 768px) {\n  .dashboard-header {\n    min-height: 0;\n    align-items: stretch;\n    padding: 1.25rem;\n  }\n  .dashboard-header h1 {\n    font-size: 1.7rem;\n  }\n  .update-badge {\n    align-self: flex-start;\n  }\n  .quotes-column {\n    padding: 0.85rem;\n  }\n  .attention-header {\n    align-items: stretch;\n    flex-direction: column;\n  }\n  .attention-summary {\n    justify-content: flex-start;\n  }\n  .attention-item {\n    align-items: flex-start;\n    flex-wrap: wrap;\n  }\n  .attention-action {\n    margin-left: 1.35rem;\n  }\n  .quote-card-mini .client-name,\n  .quote-card-mini .vehicle-name {\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    min-width: 0;\n  }\n  .quote-card-mini .card-header {\n    gap: 0.5rem;\n  }\n}\n/*# sourceMappingURL=admin-stats.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminStatsComponent, { className: "AdminStatsComponent", filePath: "src/app/components/admin/admin-stats/admin-stats.ts", lineNumber: 13 });
})();
export {
  AdminStatsComponent
};
//# debugId=9ddbc4fd-0df2-50c9-8854-7f5b1318c35d
//# sourceMappingURL=chunk-INU2UMXU.js.map
