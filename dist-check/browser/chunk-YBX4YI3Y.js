import {
  CatalogService,
  ESTADOS_MEXICO
} from "./chunk-ZZO2EEQW.js";
import {
  ToastService
} from "./chunk-74RWLUMR.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  RequiredValidator,
  SelectControlValueAccessor,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-MVJCDSIT.js";
import "./chunk-XCV63D25.js";
import {
  ChangeDetectorRef,
  CommonModule,
  Component,
  HostListener,
  NgForOf,
  NgIf,
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
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-6KRTW2LJ.js";
import "./chunk-FDMHZOCR.js";

// src/app/components/admin/admin-plates/admin-plates.ts
var _c0 = () => [0, 1, 2, 3, 4, 5];
function AdminPlatesComponent_button_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 33);
    \u0275\u0275listener("click", function AdminPlatesComponent_button_19_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.searchTerm = "";
      return \u0275\u0275resetView(ctx_r1.onSearch());
    });
    \u0275\u0275text(1, "\xD7");
    \u0275\u0275elementEnd();
  }
}
function AdminPlatesComponent_option_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 34);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const estado_r3 = ctx.$implicit;
    \u0275\u0275property("value", estado_r3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(estado_r3);
  }
}
function AdminPlatesComponent_span_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 35);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r1.filteredPlates().length, " placa(s)");
  }
}
function AdminPlatesComponent_div_38_article_1_span_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 59);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 14);
    \u0275\u0275element(2, "path", 20)(3, "circle", 21);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const plate_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", plate_r5.estado, " ");
  }
}
function AdminPlatesComponent_div_38_article_1_button_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 60);
    \u0275\u0275listener("click", function AdminPlatesComponent_div_38_article_1_button_28_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const plate_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.deletePlate(plate_r5.id));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 14);
    \u0275\u0275element(2, "path", 61)(3, "path", 62)(4, "path", 63)(5, "path", 64)(6, "path", 65);
    \u0275\u0275elementEnd()();
  }
}
function AdminPlatesComponent_div_38_article_1_button_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 66);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 14);
    \u0275\u0275element(2, "path", 67)(3, "path", 68)(4, "path", 69);
    \u0275\u0275elementEnd()();
  }
}
function AdminPlatesComponent_div_38_article_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article", 38)(1, "div", 39)(2, "span", 40);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 41);
    \u0275\u0275element(4, "rect", 42)(5, "path", 43);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "span", 44);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "h3");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, AdminPlatesComponent_div_38_article_1_span_10_Template, 5, 1, "span", 45);
    \u0275\u0275elementStart(11, "div", 46)(12, "span", 47);
    \u0275\u0275text(13, "Costo con IVA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "strong");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 48)(17, "span", 49);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 50)(20, "button", 51);
    \u0275\u0275listener("click", function AdminPlatesComponent_div_38_article_1_Template_button_click_20_listener() {
      const plate_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleDisponibilidad(plate_r5));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(21, "svg", 14);
    \u0275\u0275element(22, "path", 52)(23, "circle", 53);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(24, "button", 54);
    \u0275\u0275listener("click", function AdminPlatesComponent_div_38_article_1_Template_button_click_24_listener() {
      const plate_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openEditPlate(plate_r5));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(25, "svg", 14);
    \u0275\u0275element(26, "path", 55)(27, "path", 56);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(28, AdminPlatesComponent_div_38_article_1_button_28_Template, 7, 0, "button", 57)(29, AdminPlatesComponent_div_38_article_1_button_29_Template, 5, 0, "button", 58);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const plate_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275classProp("protected", ctx_r1.isProtectedPlate(plate_r5.id))("unavailable", !ctx_r1.isProtectedPlate(plate_r5.id) && !ctx_r1.isPlateAvailable(plate_r5));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getAvailabilityLabel(plate_r5), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(plate_r5.name);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", plate_r5.estado);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.formatPrice(plate_r5.costNet));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.isPlateAvailable(plate_r5) ? "Visible en el cotizador" : "Oculta del cotizador");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("off", !ctx_r1.isPlateAvailable(plate_r5));
    \u0275\u0275property("title", ctx_r1.isPlateAvailable(plate_r5) ? "Marcar como no disponible" : "Marcar como disponible");
    \u0275\u0275attribute("aria-label", ctx_r1.isPlateAvailable(plate_r5) ? "Marcar como no disponible" : "Marcar como disponible");
    \u0275\u0275advance(8);
    \u0275\u0275property("ngIf", !ctx_r1.isProtectedPlate(plate_r5.id));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isProtectedPlate(plate_r5.id));
  }
}
function AdminPlatesComponent_div_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 36);
    \u0275\u0275template(1, AdminPlatesComponent_div_38_article_1_Template, 30, 15, "article", 37);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.filteredPlates());
  }
}
function AdminPlatesComponent_div_39_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 72);
  }
}
function AdminPlatesComponent_div_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 70);
    \u0275\u0275template(1, AdminPlatesComponent_div_39_div_1_Template, 1, 0, "div", 71);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", \u0275\u0275pureFunction0(1, _c0));
  }
}
function AdminPlatesComponent_div_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 73)(1, "span", 74);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 41);
    \u0275\u0275element(3, "rect", 42)(4, "path", 43);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "strong");
    \u0275\u0275text(6, "No se encontraron placas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span");
    \u0275\u0275text(8, "Prueba con otro t\xE9rmino o cambia los filtros de costo o estado.");
    \u0275\u0275elementEnd()();
  }
}
function AdminPlatesComponent_div_41_p_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "\xBFCambiar la disponibilidad de esta placa?");
    \u0275\u0275elementEnd();
  }
}
function AdminPlatesComponent_div_41_p_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "\xBFEst\xE1s seguro de eliminar esta placa?");
    \u0275\u0275elementEnd();
  }
}
function AdminPlatesComponent_div_41_p_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 88);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 14);
    \u0275\u0275element(2, "path", 52)(3, "circle", 53);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, ' Las placas marcadas como "No disponible" no aparecer\xE1n en el formulario del cotizador.');
    \u0275\u0275elementEnd();
  }
}
function AdminPlatesComponent_div_41_p_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 88);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 14);
    \u0275\u0275element(2, "path", 89);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Esta placa desaparecer\xE1 del cat\xE1logo de placas disponibles.");
    \u0275\u0275elementEnd();
  }
}
function AdminPlatesComponent_div_41_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 75);
    \u0275\u0275listener("click", function AdminPlatesComponent_div_41_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelModal());
    });
    \u0275\u0275elementStart(1, "div", 76);
    \u0275\u0275listener("click", function AdminPlatesComponent_div_41_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 77)(3, "span", 78);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(4, "svg", 14);
    \u0275\u0275element(5, "path", 79)(6, "path", 80)(7, "path", 81);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "div")(9, "span", 82);
    \u0275\u0275text(10, "Confirmaci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "h3");
    \u0275\u0275text(12, "Confirmar acci\xF3n");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(13, AdminPlatesComponent_div_41_p_13_Template, 2, 0, "p", 83)(14, AdminPlatesComponent_div_41_p_14_Template, 2, 0, "p", 83)(15, AdminPlatesComponent_div_41_p_15_Template, 5, 0, "p", 84)(16, AdminPlatesComponent_div_41_p_16_Template, 4, 0, "p", 84);
    \u0275\u0275elementStart(17, "div", 85)(18, "button", 86);
    \u0275\u0275listener("click", function AdminPlatesComponent_div_41_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelModal());
    });
    \u0275\u0275text(19, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "button", 87);
    \u0275\u0275listener("click", function AdminPlatesComponent_div_41_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.confirmActionHandler());
    });
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(13);
    \u0275\u0275property("ngIf", ctx_r1.confirmAction === "toggle");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.confirmAction !== "toggle");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.confirmAction === "toggle");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.confirmAction !== "toggle");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r1.confirmAction === "toggle" ? "Cambiar" : "Eliminar", " ");
  }
}
function AdminPlatesComponent_div_42_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 98);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.formError);
  }
}
function AdminPlatesComponent_div_42_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 99);
    \u0275\u0275element(1, "span", 100);
    \u0275\u0275text(2, " Cargando...");
    \u0275\u0275elementEnd();
  }
}
function AdminPlatesComponent_div_42_form_13_option_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 34);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const estado_r10 = ctx.$implicit;
    \u0275\u0275property("value", estado_r10);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(estado_r10);
  }
}
function AdminPlatesComponent_div_42_form_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 101);
    \u0275\u0275listener("ngSubmit", function AdminPlatesComponent_div_42_form_13_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.submitForm());
    });
    \u0275\u0275elementStart(1, "div", 102)(2, "label");
    \u0275\u0275text(3, "Nombre *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 103);
    \u0275\u0275twoWayListener("ngModelChange", function AdminPlatesComponent_div_42_form_13_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.plateForm.name, $event) || (ctx_r1.plateForm.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 102)(6, "label");
    \u0275\u0275text(7, "Estado *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "select", 104);
    \u0275\u0275twoWayListener("ngModelChange", function AdminPlatesComponent_div_42_form_13_Template_select_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.plateForm.estado, $event) || (ctx_r1.plateForm.estado = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(9, "option", 105);
    \u0275\u0275text(10, "Selecciona un estado...");
    \u0275\u0275elementEnd();
    \u0275\u0275template(11, AdminPlatesComponent_div_42_form_13_option_11_Template, 2, 2, "option", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(12, "small");
    \u0275\u0275text(13, "Elige el estado de la Rep\xFAblica Mexicana al que corresponde la placa.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 102)(15, "label");
    \u0275\u0275text(16, "Disponibilidad *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "select", 106);
    \u0275\u0275twoWayListener("ngModelChange", function AdminPlatesComponent_div_42_form_13_Template_select_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.plateForm.disponible, $event) || (ctx_r1.plateForm.disponible = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(18, "option", 107);
    \u0275\u0275text(19, "Disponible");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "option", 107);
    \u0275\u0275text(21, "No disponible");
    \u0275\u0275elementEnd()();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(22, "small");
    \u0275\u0275text(23, 'Si est\xE1 "No disponible", la placa no aparecer\xE1 en el formulario del cotizador.');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 102)(25, "label");
    \u0275\u0275text(26, "Costo Neto (con IVA) *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "div", 108)(28, "span", 109);
    \u0275\u0275text(29, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "input", 110);
    \u0275\u0275twoWayListener("ngModelChange", function AdminPlatesComponent_div_42_form_13_Template_input_ngModelChange_30_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.plateForm.costnet, $event) || (ctx_r1.plateForm.costnet = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "small");
    \u0275\u0275text(32, 'Costo en Pesos MXN incluyendo IVA. Usa 0 para opciones "pendientes por cotizar".');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "div", 111)(34, "button", 112);
    \u0275\u0275listener("click", function AdminPlatesComponent_div_42_form_13_Template_button_click_34_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closeFormDrawer());
    });
    \u0275\u0275text(35, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "button", 113);
    \u0275\u0275text(37);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.plateForm.name);
    \u0275\u0275control();
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.plateForm.estado);
    \u0275\u0275control();
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.estadosMexico);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.plateForm.disponible);
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", true);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngValue", false);
    \u0275\u0275advance(10);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.plateForm.costnet);
    \u0275\u0275control();
    \u0275\u0275advance(6);
    \u0275\u0275property("disabled", ctx_r1.formLoading);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.formLoading ? "Guardando..." : ctx_r1.isEditMode ? "Actualizar" : "Crear", " ");
  }
}
function AdminPlatesComponent_div_42_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 90);
    \u0275\u0275listener("click", function AdminPlatesComponent_div_42_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeFormDrawer());
    });
    \u0275\u0275elementStart(1, "aside", 91);
    \u0275\u0275listener("click", function AdminPlatesComponent_div_42_Template_aside_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 92)(3, "div")(4, "span", 3);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "h3");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "button", 93);
    \u0275\u0275listener("click", function AdminPlatesComponent_div_42_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeFormDrawer());
    });
    \u0275\u0275text(9, "\xD7");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 94);
    \u0275\u0275template(11, AdminPlatesComponent_div_42_div_11_Template, 2, 1, "div", 95)(12, AdminPlatesComponent_div_42_div_12_Template, 3, 0, "div", 96)(13, AdminPlatesComponent_div_42_form_13_Template, 38, 9, "form", 97);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", ctx_r1.isEditMode ? "Editar placa" : "Nueva placa");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.isEditMode ? "Edici\xF3n de placa" : "Nuevo registro");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.isEditMode ? "Editar Placa" : "Nueva Placa");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r1.formError);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.formLoading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.formLoading);
  }
}
function AdminPlatesComponent_div_44_span_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 119);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r12.actionLabel);
  }
}
function AdminPlatesComponent_div_44_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 114);
    \u0275\u0275listener("click", function AdminPlatesComponent_div_44_Template_div_click_0_listener() {
      const t_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.handleToast(t_r12));
    });
    \u0275\u0275elementStart(1, "span", 115);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 116);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, AdminPlatesComponent_div_44_span_5_Template, 2, 1, "span", 117);
    \u0275\u0275elementStart(6, "button", 118);
    \u0275\u0275listener("click", function AdminPlatesComponent_div_44_Template_button_click_6_listener($event) {
      const t_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.toastService.dismiss(t_r12.id);
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
var AdminPlatesComponent = class _AdminPlatesComponent {
  catalog = inject(CatalogService);
  cdr = inject(ChangeDetectorRef);
  toastService = inject(ToastService);
  // Listado
  plates = signal(
    [],
    ...ngDevMode ? [{ debugName: "plates" }] : (
      /* istanbul ignore next */
      []
    )
  );
  filteredPlates = signal(
    [],
    ...ngDevMode ? [{ debugName: "filteredPlates" }] : (
      /* istanbul ignore next */
      []
    )
  );
  loading = true;
  searchTerm = "";
  costFilter = "all";
  estadoFilter = "";
  // Estados de la República Mexicana (para filtros y formulario)
  estadosMexico = ESTADOS_MEXICO;
  // Modales
  showConfirmModal = false;
  confirmAction = null;
  selectedPlateId = null;
  showFormDrawer = false;
  isEditMode = false;
  formLoading = false;
  formError = "";
  editingPlateId = null;
  // Formulario
  plateForm = {
    name: "",
    costnet: 0,
    estado: "",
    disponible: true
  };
  async ngOnInit() {
    await this.loadPlates();
  }
  onEscapeKey() {
    if (this.showConfirmModal)
      this.cancelModal();
    if (this.showFormDrawer)
      this.closeFormDrawer();
  }
  handleToast(t) {
    if (t.action)
      t.action();
    this.toastService.dismiss(t.id);
  }
  // ===================== LISTADO =====================
  async loadPlates() {
    this.loading = true;
    const { data, error } = await this.catalog.getAllStatePlates();
    if (error) {
      this.toastService.error("No fue posible cargar las placas: " + error.message);
    } else {
      this.plates.set((data || []).filter((plate) => plate.id !== "pendiente"));
      this.applyFilters();
    }
    this.loading = false;
    this.cdr.detectChanges();
  }
  applyFilters() {
    let filtered = this.plates();
    const term = this.searchTerm.toLowerCase().trim();
    if (term) {
      filtered = filtered.filter((p) => (p.name || "").toLowerCase().includes(term));
    }
    if (this.costFilter === "withCost") {
      filtered = filtered.filter((p) => p.costNet > 0);
    }
    if (this.estadoFilter) {
      filtered = filtered.filter((p) => (p.estado || "") === this.estadoFilter);
    }
    this.filteredPlates.set(filtered);
    this.cdr.detectChanges();
  }
  onSearch() {
    this.applyFilters();
  }
  // ===================== MODAL DE CONFIRMACIÓN =====================
  deletePlate(plateId) {
    if (plateId === "pendiente") {
      this.toastService.info('La placa "pendiente" es obligatoria y no puede eliminarse.');
      return;
    }
    this.selectedPlateId = plateId;
    this.confirmAction = "delete";
    this.showConfirmModal = true;
    this.cdr.detectChanges();
  }
  toggleDisponibilidad(plate) {
    if (!plate || !plate.id)
      return;
    if (this.isProtectedPlate(plate.id)) {
      this.toastService.info('La placa "pendiente" es obligatoria y no puede deshabilitarse.');
      return;
    }
    this.selectedPlateId = plate.id;
    this.confirmAction = "toggle";
    this.showConfirmModal = true;
    this.cdr.detectChanges();
  }
  async confirmActionHandler() {
    if (!this.selectedPlateId)
      return;
    this.formLoading = true;
    let succeeded = false;
    if (this.confirmAction === "delete") {
      const { error } = await this.catalog.deleteStatePlate(this.selectedPlateId);
      if (error) {
        this.toastService.error("Error al eliminar la placa: " + error.message);
      } else {
        this.toastService.success("Placa eliminada correctamente");
        succeeded = true;
      }
    } else if (this.confirmAction === "toggle") {
      const plate = this.plates().find((p) => p.id === this.selectedPlateId);
      if (plate) {
        const current = plate.disponible !== false;
        const { error } = await this.catalog.toggleStatePlateAvailability(this.selectedPlateId, !current);
        if (error) {
          this.toastService.error("Error al cambiar la disponibilidad: " + error.message);
        } else {
          this.toastService.success(!current ? "Placa marcada como no disponible" : "Placa marcada como disponible");
          succeeded = true;
        }
      }
    }
    this.showConfirmModal = false;
    this.selectedPlateId = null;
    this.confirmAction = null;
    this.formLoading = false;
    if (succeeded) {
      await this.loadPlates();
    }
    this.cdr.detectChanges();
  }
  cancelModal() {
    this.showConfirmModal = false;
    this.confirmAction = null;
    this.cdr.detectChanges();
  }
  // ===================== DRAWER DE FORMULARIO =====================
  openNewPlate() {
    this.isEditMode = false;
    this.editingPlateId = null;
    this.plateForm = { name: "", costnet: 0, estado: "", disponible: true };
    this.formError = "";
    this.showFormDrawer = true;
    this.cdr.detectChanges();
  }
  openEditPlate(plate) {
    if (!plate || !plate.id) {
      return;
    }
    this.isEditMode = true;
    this.editingPlateId = plate.id;
    this.plateForm = {
      name: plate.name,
      costnet: plate.costNet,
      estado: plate.estado ?? "",
      disponible: plate.disponible !== false
    };
    this.formError = "";
    this.showFormDrawer = true;
    this.cdr.detectChanges();
  }
  closeFormDrawer() {
    this.showFormDrawer = false;
    this.cdr.detectChanges();
  }
  async submitForm() {
    if (this.formLoading)
      return;
    this.formLoading = true;
    this.formError = "";
    let operationSucceeded = false;
    const normalizedName = this.plateForm.name.trim();
    if (!normalizedName) {
      this.formError = "El nombre es obligatorio";
      this.formLoading = false;
      return;
    }
    if (this.plateForm.costnet < 0) {
      this.formError = "El costo no puede ser negativo";
      this.formLoading = false;
      return;
    }
    if (!this.plateForm.estado) {
      this.formError = "Selecciona un estado de la Rep\xFAblica Mexicana";
      this.formLoading = false;
      return;
    }
    try {
      if (this.isEditMode) {
        if (!this.editingPlateId) {
          this.formError = "Error: no se identific\xF3 la placa a editar";
          this.formLoading = false;
          return;
        }
        const { error } = await this.catalog.updateStatePlate(this.editingPlateId, {
          name: normalizedName,
          costnet: this.plateForm.costnet,
          estado: this.plateForm.estado,
          disponible: this.plateForm.disponible !== false
        });
        if (error) {
          this.formError = "Error al actualizar: " + error.message;
        } else {
          operationSucceeded = true;
        }
      } else {
        const { error } = await this.catalog.createStatePlate({
          name: normalizedName,
          costnet: this.plateForm.costnet,
          estado: this.plateForm.estado,
          disponible: this.plateForm.disponible !== false
        });
        if (error) {
          this.formError = "Error al crear: " + error.message;
        } else {
          operationSucceeded = true;
        }
      }
    } catch (err) {
      this.formError = "Error inesperado: " + (err.message || "");
    } finally {
      this.formLoading = false;
      this.cdr.detectChanges();
      if (operationSucceeded) {
        this.closeFormDrawer();
        this.toastService.success(this.isEditMode ? "Placa actualizada correctamente" : "Placa creada correctamente");
        await this.loadPlates();
      }
    }
  }
  // ===================== HELPERS =====================
  isProtectedPlate(plateId) {
    return plateId === "pendiente";
  }
  getAvailabilityLabel(plate) {
    if (this.isProtectedPlate(plate.id))
      return "Protegida";
    return plate.disponible !== false ? "Disponible" : "No disponible";
  }
  isPlateAvailable(plate) {
    return plate.disponible !== false;
  }
  formatPrice(price) {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      maximumFractionDigits: 0
    }).format(price);
  }
  static \u0275fac = function AdminPlatesComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminPlatesComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminPlatesComponent, selectors: [["app-admin-plates"]], hostBindings: function AdminPlatesComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("keydown.escape", function AdminPlatesComponent_keydown_escape_HostBindingHandler() {
        return ctx.onEscapeKey();
      }, \u0275\u0275resolveDocument);
    }
  }, decls: 45, vars: 12, consts: [[1, "plates-container"], [1, "page-header"], [1, "page-heading"], [1, "page-kicker"], [1, "btn-primary", 3, "click"], [1, "button-icon"], [1, "toolbar"], [1, "search-wrapper"], ["viewBox", "0 0 24 24", "aria-hidden", "true", 1, "search-icon"], ["cx", "11", "cy", "11", "r", "8"], ["x1", "21", "y1", "21", "x2", "16.65", "y2", "16.65"], ["type", "text", "placeholder", "Buscar por nombre de placa...", 1, "search-input", 3, "ngModelChange", "input", "ngModel"], ["type", "button", "class", "search-clear", "aria-label", "Limpiar b\xFAsqueda", 3, "click", 4, "ngIf"], [1, "toolbar-select"], ["viewBox", "0 0 24 24", "aria-hidden", "true"], ["d", "M12 1v22"], ["d", "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"], ["name", "costFilter", "aria-label", "Filtrar por costo", 3, "ngModelChange", "change", "ngModel"], ["value", "all"], ["value", "withCost"], ["d", "M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"], ["cx", "12", "cy", "10", "r", "3"], ["name", "estadoFilter", "aria-label", "Filtrar por estado", 3, "ngModelChange", "change", "ngModel"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], ["class", "results-count", 4, "ngIf"], ["class", "plates-grid", 4, "ngIf"], ["class", "skeleton-grid", "aria-label", "Cargando placas", 4, "ngIf"], ["class", "catalog-state empty-state", 4, "ngIf"], ["class", "modal-overlay", 3, "click", 4, "ngIf"], ["class", "drawer-overlay", 3, "click", 4, "ngIf"], [1, "toast-host"], ["class", "toast", 3, "class", "click", 4, "ngFor", "ngForOf"], ["type", "button", "aria-label", "Limpiar b\xFAsqueda", 1, "search-clear", 3, "click"], [3, "value"], [1, "results-count"], [1, "plates-grid"], ["class", "plate-card", 4, "ngFor", "ngForOf"], [1, "plate-card"], [1, "plate-card-topline"], ["aria-hidden", "true", 1, "plate-symbol"], ["viewBox", "0 0 24 24"], ["x", "3", "y", "6", "width", "18", "height", "12", "rx", "2"], ["d", "M7 10h10M7 14h5"], [1, "plate-status"], ["class", "plate-estado", "title", "Estado", 4, "ngIf"], [1, "plate-card-details"], [1, "detail-label"], [1, "plate-card-footer"], [1, "plate-usage"], [1, "action-buttons"], [1, "btn-icon", "btn-toggle", 3, "click", "title"], ["d", "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"], ["cx", "12", "cy", "12", "r", "3"], ["title", "Editar", "aria-label", "Editar placa", 1, "btn-icon", "btn-edit", 3, "click"], ["d", "M12 20h9"], ["d", "M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"], ["class", "btn-icon btn-delete", "title", "Eliminar", "aria-label", "Eliminar placa", 3, "click", 4, "ngIf"], ["class", "btn-icon btn-protected", "title", "Protegida - no se puede eliminar", "aria-label", "Placa protegida", 4, "ngIf"], ["title", "Estado", 1, "plate-estado"], ["title", "Eliminar", "aria-label", "Eliminar placa", 1, "btn-icon", "btn-delete", 3, "click"], ["d", "M3 6h18"], ["d", "M8 6V4h8v2"], ["d", "M19 6l-1 14H6L5 6"], ["d", "M10 11v5"], ["d", "M14 11v5"], ["title", "Protegida - no se puede eliminar", "aria-label", "Placa protegida", 1, "btn-icon", "btn-protected"], ["d", "M12 17h1.5a2.5 2.5 0 0 0 2.5-2.5V9a2.5 2.5 0 0 0-2.5-2.5H11A2.5 2.5 0 0 0 8.5 9v5.5c0 1.37.9 2.5 2.5 2.5z"], ["d", "M8 11h8"], ["d", "M12 7v8"], ["aria-label", "Cargando placas", 1, "skeleton-grid"], ["class", "skeleton-card", 4, "ngFor", "ngForOf"], [1, "skeleton-card"], [1, "catalog-state", "empty-state"], ["aria-hidden", "true", 1, "empty-state-icon"], [1, "modal-overlay", 3, "click"], [1, "modal-content", 3, "click"], [1, "modal-heading", "modal-heading-warning"], [1, "modal-icon"], ["d", "M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"], ["d", "M12 9v4"], ["d", "M12 17h.01"], [1, "modal-eyebrow"], [4, "ngIf"], ["class", "warning-copy", 4, "ngIf"], [1, "modal-actions"], [1, "btn-cancel", 3, "click"], [1, "btn-confirm", 3, "click"], [1, "warning-copy"], ["d", "M10.3 3.9 2.4 18h15.2l-3.1-6.2"], [1, "drawer-overlay", 3, "click"], ["role", "dialog", 1, "drawer", "form-drawer", 3, "click"], [1, "drawer-header"], ["aria-label", "Cerrar formulario", 1, "drawer-close", 3, "click"], [1, "drawer-body"], ["class", "form-banner error", 4, "ngIf"], ["class", "drawer-loading", 4, "ngIf"], ["novalidate", "", 3, "ngSubmit", 4, "ngIf"], [1, "form-banner", "error"], [1, "drawer-loading"], [1, "catalog-spinner"], ["novalidate", "", 3, "ngSubmit"], [1, "form-group"], ["type", "text", "name", "name", "required", "", "placeholder", "Ej. Alta de placas CDMX", 3, "ngModelChange", "ngModel"], ["name", "estado", "required", "", 3, "ngModelChange", "ngModel"], ["value", "", "disabled", ""], ["name", "disponible", "required", "", 3, "ngModelChange", "ngModel"], [3, "ngValue"], [1, "currency-input-wrapper"], [1, "currency-symbol"], ["type", "number", "name", "costnet", "required", "", "min", "0", "placeholder", "Ej. 1432", 3, "ngModelChange", "ngModel"], [1, "drawer-actions"], ["type", "button", 1, "btn-cancel", 3, "click"], ["type", "submit", 1, "btn-confirm", 3, "disabled"], [1, "toast", 3, "click"], [1, "toast-icon"], [1, "toast-msg"], ["class", "toast-action", 4, "ngIf"], ["aria-label", "Cerrar", 1, "toast-close", 3, "click"], [1, "toast-action"]], template: function AdminPlatesComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "span", 3);
      \u0275\u0275text(4, "Cat\xE1logo de placas");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "h2");
      \u0275\u0275text(6, "Placas de Estado");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "p");
      \u0275\u0275text(8, "Gestiona las placas de estado disponibles en el cotizador. Los costos ingresados se usar\xE1n en el c\xE1lculo de cada cotizaci\xF3n.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "button", 4);
      \u0275\u0275listener("click", function AdminPlatesComponent_Template_button_click_9_listener() {
        return ctx.openNewPlate();
      });
      \u0275\u0275elementStart(10, "span", 5);
      \u0275\u0275text(11, "+");
      \u0275\u0275elementEnd();
      \u0275\u0275text(12, " Nueva Placa");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "div", 6)(14, "div", 7);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(15, "svg", 8);
      \u0275\u0275element(16, "circle", 9)(17, "line", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(18, "input", 11);
      \u0275\u0275twoWayListener("ngModelChange", function AdminPlatesComponent_Template_input_ngModelChange_18_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
        return $event;
      });
      \u0275\u0275listener("input", function AdminPlatesComponent_Template_input_input_18_listener() {
        return ctx.onSearch();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275template(19, AdminPlatesComponent_button_19_Template, 2, 0, "button", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "label", 13);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(21, "svg", 14);
      \u0275\u0275element(22, "path", 15)(23, "path", 16);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(24, "select", 17);
      \u0275\u0275twoWayListener("ngModelChange", function AdminPlatesComponent_Template_select_ngModelChange_24_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.costFilter, $event) || (ctx.costFilter = $event);
        return $event;
      });
      \u0275\u0275listener("change", function AdminPlatesComponent_Template_select_change_24_listener() {
        return ctx.onSearch();
      });
      \u0275\u0275elementStart(25, "option", 18);
      \u0275\u0275text(26, "Todos los costos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "option", 19);
      \u0275\u0275text(28, "Con costo");
      \u0275\u0275elementEnd()();
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "label", 13);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(30, "svg", 14);
      \u0275\u0275element(31, "path", 20)(32, "circle", 21);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(33, "select", 22);
      \u0275\u0275twoWayListener("ngModelChange", function AdminPlatesComponent_Template_select_ngModelChange_33_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.estadoFilter, $event) || (ctx.estadoFilter = $event);
        return $event;
      });
      \u0275\u0275listener("change", function AdminPlatesComponent_Template_select_change_33_listener() {
        return ctx.onSearch();
      });
      \u0275\u0275elementStart(34, "option", 23);
      \u0275\u0275text(35, "Todos los estados");
      \u0275\u0275elementEnd();
      \u0275\u0275template(36, AdminPlatesComponent_option_36_Template, 2, 2, "option", 24);
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275template(37, AdminPlatesComponent_span_37_Template, 2, 1, "span", 25);
      \u0275\u0275elementEnd();
      \u0275\u0275template(38, AdminPlatesComponent_div_38_Template, 2, 1, "div", 26)(39, AdminPlatesComponent_div_39_Template, 2, 2, "div", 27)(40, AdminPlatesComponent_div_40_Template, 9, 0, "div", 28);
      \u0275\u0275elementEnd();
      \u0275\u0275template(41, AdminPlatesComponent_div_41_Template, 22, 5, "div", 29)(42, AdminPlatesComponent_div_42_Template, 14, 6, "div", 30);
      \u0275\u0275elementStart(43, "div", 31);
      \u0275\u0275template(44, AdminPlatesComponent_div_44_Template, 8, 5, "div", 32);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(18);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchTerm);
      \u0275\u0275control();
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.searchTerm);
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.costFilter);
      \u0275\u0275control();
      \u0275\u0275advance(9);
      \u0275\u0275twoWayProperty("ngModel", ctx.estadoFilter);
      \u0275\u0275control();
      \u0275\u0275advance(3);
      \u0275\u0275property("ngForOf", ctx.estadosMexico);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && ctx.filteredPlates().length > 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && ctx.filteredPlates().length === 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showConfirmModal);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showFormDrawer);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", ctx.toastService.toasts());
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinValidator, NgModel, NgForm], styles: ['\n.plates-container[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  background: var(--%NS%surface-subtle);\n  border: 0;\n  padding: 0;\n  box-shadow: none;\n}\n.plates-container[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 38%;\n  height: 190px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(32, 176, 56, 0.14),\n      rgba(16, 37, 31, 0.07));\n  clip-path: polygon(35% 0, 100% 0, 100% 100%, 0 100%);\n  pointer-events: none;\n  z-index: 0;\n}\n.plates-container[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1.25rem;\n  min-height: 164px;\n  margin: 0 0 1.25rem;\n  padding: 1.5rem 1.75rem;\n  border: 1px solid rgba(139, 226, 140, 0.22);\n  border-radius: 16px;\n  background:\n    linear-gradient(\n      115deg,\n      #10251f 0%,\n      #173c2e 68%,\n      #1f6840 100%);\n  box-shadow: 0 16px 30px rgba(16, 37, 31, 0.16);\n}\n.plates-container[_ngcontent-%COMP%]   .page-heading[_ngcontent-%COMP%] {\n  flex: 1 1 auto;\n  min-width: 0;\n  padding: 0;\n}\n.plates-container[_ngcontent-%COMP%]   .page-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0.25rem 0 0.35rem;\n  color: var(--%NS%text-on-accent);\n  font-size: 2rem;\n  line-height: 1;\n}\n.plates-container[_ngcontent-%COMP%]   .page-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  max-width: 420px;\n  margin: 0;\n  color: #bdd6c7;\n  font-size: 0.88rem;\n}\n.plates-container[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 2;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.4rem;\n  min-height: 44px;\n  margin-left: auto;\n  padding: 0.75rem 1rem;\n  border: 0;\n  border-radius: 9px;\n  background: var(--%NS%btn-primary-bg);\n  color: var(--%NS%btn-primary-text);\n  box-shadow: none;\n  white-space: nowrap;\n  cursor: pointer;\n  font-weight: 700;\n  font-size: 0.9rem;\n  transition: all 0.2s ease;\n}\n.plates-container[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%btn-primary-bg-hover);\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.16);\n}\n.plates-container[_ngcontent-%COMP%]   .toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 0.6rem;\n  margin: 0 0 1.15rem;\n  padding: 0.6rem 0.75rem;\n  border: 1px solid var(--%NS%border-color);\n  border-radius: 14px;\n  background: var(--%NS%surface-card);\n  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.05);\n  position: relative;\n  z-index: 1;\n}\n.search-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  flex: 1 1 240px;\n  display: flex;\n  align-items: center;\n}\n.search-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 0.8rem;\n  width: 17px;\n  height: 17px;\n  fill: none;\n  stroke: var(--%NS%accent-silver);\n  stroke-width: 2;\n  stroke-linecap: round;\n  pointer-events: none;\n}\n.plates-container[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 38px;\n  padding: 0.4rem 2.3rem 0.4rem 2.4rem;\n  border: 1px solid var(--%NS%input-border);\n  border-radius: 9px;\n  font-size: 0.9rem;\n  background: var(--%NS%surface-subtle);\n  color: var(--%NS%text-silver);\n  transition:\n    border-color 0.2s ease,\n    box-shadow 0.2s ease,\n    background 0.2s ease;\n}\n.plates-container[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%]::placeholder {\n  color: var(--%NS%accent-silver);\n}\n.plates-container[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--%NS%accent-green);\n  background: var(--%NS%surface-card);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.1);\n}\n.search-clear[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0.45rem;\n  width: 24px;\n  height: 24px;\n  border: 0;\n  border-radius: 50%;\n  background: var(--%NS%surface-muted);\n  color: var(--%NS%text-muted);\n  font-size: 1rem;\n  line-height: 1;\n  cursor: pointer;\n}\n.search-clear[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%input-border);\n  color: var(--%NS%text-main);\n}\n.toolbar-select[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n}\n.toolbar-select[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 0.7rem;\n  width: 15px;\n  height: 15px;\n  fill: none;\n  stroke: var(--%NS%accent-silver);\n  stroke-width: 1.9;\n  stroke-linecap: round;\n  pointer-events: none;\n}\n.toolbar-select[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  min-height: 38px;\n  max-width: 220px;\n  padding: 0.4rem 1.9rem 0.4rem 2rem;\n  border: 1px solid var(--%NS%input-border);\n  border-radius: 9px;\n  background: var(--%NS%surface-subtle);\n  color: var(--%NS%text-silver);\n  font-size: 0.85rem;\n  cursor: pointer;\n  appearance: none;\n  transition: border-color 0.2s, box-shadow 0.2s;\n}\n.toolbar-select[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--%NS%accent-green);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.1);\n}\n.plates-container[_ngcontent-%COMP%]   .results-count[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  margin-left: auto;\n  color: var(--%NS%text-muted);\n  font-size: 0.8rem;\n  white-space: nowrap;\n}\n.page-kicker[_ngcontent-%COMP%] {\n  color: #8be28c;\n  font-size: 0.68rem;\n  font-weight: 700;\n  letter-spacing: 1.2px;\n  text-transform: uppercase;\n}\n.action-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.3rem;\n}\n.loading[_ngcontent-%COMP%], \n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 2rem;\n  color: var(--%NS%text-muted);\n}\n.empty-state[_ngcontent-%COMP%] {\n  font-style: italic;\n}\n.plates-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));\n  gap: 1rem;\n}\n.plate-card[_ngcontent-%COMP%] {\n  min-width: 0;\n  padding: 1.2rem;\n  border: 1px solid var(--%NS%border-color);\n  border-radius: 12px;\n  background: var(--%NS%surface-card);\n  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.04);\n  transition:\n    border-color 0.2s ease,\n    box-shadow 0.2s ease,\n    transform 0.2s ease;\n}\n.plate-card[_ngcontent-%COMP%]:hover {\n  border-color: rgba(32, 176, 56, 0.42);\n  box-shadow: 0 14px 28px rgba(15, 23, 42, 0.08);\n  transform: translateY(-2px);\n}\n.plate-card-topline[_ngcontent-%COMP%], \n.plate-card-footer[_ngcontent-%COMP%], \n.plate-card-details[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n.plate-card-topline[_ngcontent-%COMP%], \n.plate-card-footer[_ngcontent-%COMP%] {\n  justify-content: space-between;\n  gap: 0.75rem;\n}\n.plate-symbol[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 38px;\n  height: 38px;\n  border-radius: 10px;\n  background: var(--%NS%accent-green-light);\n  color: var(--%NS%accent-green-dark);\n}\n.plate-symbol[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%], \n.empty-state-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n  fill: none;\n  stroke: currentColor;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n  stroke-width: 1.7;\n}\n.plate-status[_ngcontent-%COMP%] {\n  padding: 0.3rem 0.55rem;\n  border-radius: 999px;\n  background: var(--%NS%accent-green-light);\n  color: var(--%NS%accent-green-dark);\n  font-size: 0.66rem;\n  font-weight: 700;\n  letter-spacing: 0.5px;\n  text-transform: uppercase;\n}\n.plate-status.protected[_ngcontent-%COMP%] {\n  background: var(--%NS%warning-bg);\n  color: var(--%NS%warning);\n}\n.plate-status.unavailable[_ngcontent-%COMP%] {\n  background: var(--%NS%danger-bg);\n  color: var(--%NS%danger);\n}\n.plate-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 1rem 0 0.3rem;\n  color: var(--%NS%btn-primary-text);\n  font-size: 1.05rem;\n  line-height: 1.3;\n}\n.plate-estado[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  padding: 0.25rem 0.6rem;\n  border: 1px solid #8bd39a;\n  border-radius: 999px;\n  background: var(--%NS%accent-green-light);\n  color: var(--%NS%accent-green-dark);\n  font-size: 0.72rem;\n  font-weight: 600;\n}\n.plate-estado[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 13px;\n  height: 13px;\n  flex-shrink: 0;\n  fill: none;\n  stroke: currentColor;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n  stroke-width: 1.8;\n}\n.plate-card-details[_ngcontent-%COMP%] {\n  justify-content: space-between;\n  gap: 1rem;\n  margin: 1.2rem 0;\n  padding: 0.85rem 0;\n  border-top: 1px solid var(--%NS%border-color);\n  border-bottom: 1px solid var(--%NS%border-color);\n}\n.detail-label[_ngcontent-%COMP%], \n.plate-usage[_ngcontent-%COMP%] {\n  color: var(--%NS%text-muted);\n  font-size: 0.73rem;\n}\n.plate-card-details[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--%NS%accent-green-dark);\n  font-size: 1.05rem;\n}\n.plate-usage[_ngcontent-%COMP%] {\n  max-width: 150px;\n}\n.catalog-state[_ngcontent-%COMP%] {\n  min-height: 170px;\n  padding: 2rem;\n  border: 1px dashed var(--%NS%border-strong);\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.7);\n  box-sizing: border-box;\n  text-align: center;\n}\n.catalog-state.loading[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n}\n.catalog-state.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  gap: 0.35rem;\n  font-style: normal;\n}\n.empty-state-icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 42px;\n  height: 42px;\n  margin-bottom: 0.35rem;\n  border-radius: 12px;\n  background: var(--%NS%surface-hover);\n  color: var(--%NS%text-muted);\n}\n.catalog-state.empty-state[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--%NS%text-silver);\n  font-size: 0.95rem;\n}\n.catalog-state.empty-state[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:last-child {\n  color: var(--%NS%accent-silver);\n  font-size: 0.8rem;\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 3500;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 1rem;\n  background: rgba(15, 23, 42, 0.5);\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: _ngcontent-%COMP%_fadeIn 0.2s ease;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.modal-content[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 470px;\n  max-height: 92vh;\n  overflow-y: auto;\n  border-radius: 18px;\n  background: var(--%NS%surface-card);\n  border: 1px solid var(--%NS%border-color);\n  padding: 1.6rem 1.7rem 1.4rem;\n  box-shadow: 0 30px 70px -20px rgba(15, 23, 42, 0.4);\n  animation: _ngcontent-%COMP%_riseIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);\n}\n@keyframes _ngcontent-%COMP%_riseIn {\n  from {\n    opacity: 0;\n    transform: translateY(18px) scale(0.97);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n.modal-content[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--%NS%btn-primary-text);\n  font-size: 1.15rem;\n}\n.modal-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.6rem;\n  justify-content: flex-end;\n  margin-top: 1.3rem;\n}\n.btn-cancel[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 40px;\n  padding: 0.55rem 1.15rem;\n  border: 1px solid var(--%NS%input-border);\n  border-radius: 9px;\n  background: var(--%NS%surface-card);\n  color: var(--%NS%text-silver);\n  font-weight: 700;\n  font-size: 0.85rem;\n  cursor: pointer;\n  transition: all 0.18s ease;\n}\n.btn-cancel[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%surface-hover);\n  border-color: var(--%NS%border-strong);\n}\n.btn-confirm[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 40px;\n  padding: 0.55rem 1.3rem;\n  border: 0;\n  border-radius: 9px;\n  background:\n    linear-gradient(\n      135deg,\n      var(--%NS%accent-green-dark),\n      var(--%NS%accent-green));\n  color: var(--%NS%text-on-accent);\n  font-weight: 700;\n  font-size: 0.85rem;\n  cursor: pointer;\n  box-shadow: 0 10px 20px -8px rgba(32, 176, 56, 0.5);\n  transition: transform 0.18s ease, box-shadow 0.18s ease;\n}\n.btn-confirm[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 14px 26px -8px rgba(32, 176, 56, 0.55);\n}\n.btn-confirm[_ngcontent-%COMP%]:disabled {\n  opacity: 0.65;\n  cursor: wait;\n  transform: none;\n}\n.plates-container[_ngcontent-%COMP%]   .btn-cancel[_ngcontent-%COMP%]:focus-visible, \n.plates-container[_ngcontent-%COMP%]   .btn-confirm[_ngcontent-%COMP%]:focus-visible, \n.plates-container[_ngcontent-%COMP%]   .btn-icon[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid rgba(32, 176, 56, 0.35);\n  outline-offset: 2px;\n}\n.error[_ngcontent-%COMP%] {\n  color: var(--%NS%danger);\n  background: var(--%NS%danger-bg);\n  padding: 0.5rem;\n  border-radius: 6px;\n  margin-bottom: 0.5rem;\n  text-align: center;\n}\n.catalog-error[_ngcontent-%COMP%] {\n  margin: 0 0 1rem;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 1.15rem;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 0.4rem;\n  color: var(--%NS%text-silver);\n  font-size: 0.78rem;\n  font-weight: 800;\n  letter-spacing: 0.5px;\n  text-transform: uppercase;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:not([type=checkbox]):not([type=radio]), \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 44px;\n  padding: 0.65rem 0.85rem;\n  border: 1.5px solid var(--%NS%input-border);\n  border-radius: 10px;\n  background: var(--%NS%surface-card);\n  color: var(--%NS%text-main);\n  font-size: 0.92rem;\n  font-family: var(--%NS%font-body);\n  transition:\n    border-color 0.2s,\n    box-shadow 0.2s,\n    background 0.2s;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--%NS%accent-green);\n  background: var(--%NS%surface-card);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.1);\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:disabled {\n  background: var(--%NS%surface-hover);\n  color: var(--%NS%text-muted);\n  cursor: not-allowed;\n}\n.form-group[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 0.35rem;\n  color: var(--%NS%accent-silver);\n  font-size: 0.76rem;\n}\n.modal-heading[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.8rem;\n  margin-bottom: 1rem;\n}\n.modal-heading[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0.15rem 0 0;\n  color: var(--%NS%text-main);\n  font-size: 1.35rem;\n}\n.modal-eyebrow[_ngcontent-%COMP%] {\n  display: block;\n  color: var(--%NS%accent-silver);\n  font-size: 0.66rem;\n  font-weight: 700;\n  letter-spacing: 0.9px;\n  text-transform: uppercase;\n}\n.modal-icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 42px;\n  height: 42px;\n  flex-shrink: 0;\n  border-radius: 12px;\n}\n.modal-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 21px;\n  height: 21px;\n  fill: none;\n  stroke: currentColor;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n  stroke-width: 1.8;\n}\n.modal-heading-warning[_ngcontent-%COMP%]   .modal-icon[_ngcontent-%COMP%] {\n  background: var(--%NS%warning-bg);\n  color: var(--%NS%warning);\n}\n.modal-content[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  color: var(--%NS%text-muted);\n  font-size: 0.92rem;\n  line-height: 1.6;\n}\n.warning-copy[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.45rem;\n  margin: 0.7rem 0;\n  padding: 0.7rem 0.8rem;\n  border: 1px solid #fed7aa;\n  border-radius: 9px;\n  background: var(--%NS%warning-bg);\n  color: var(--%NS%warning);\n  font-weight: 600;\n}\n.warning-copy[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 17px;\n  height: 17px;\n  flex-shrink: 0;\n}\n.drawer-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 3000;\n  display: flex;\n  justify-content: flex-end;\n  background: rgba(15, 23, 42, 0.45);\n  -webkit-backdrop-filter: blur(3px);\n  backdrop-filter: blur(3px);\n  animation: _ngcontent-%COMP%_fadeIn 0.25s ease;\n}\n.drawer[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  width: min(500px, 100vw);\n  height: 100%;\n  background: var(--%NS%surface-subtle);\n  box-shadow: -24px 0 60px rgba(15, 23, 42, 0.28);\n  animation: _ngcontent-%COMP%_slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1);\n  overflow: hidden;\n}\n@keyframes _ngcontent-%COMP%_slideInRight {\n  from {\n    transform: translateX(100%);\n  }\n  to {\n    transform: translateX(0);\n  }\n}\n.form-drawer[_ngcontent-%COMP%] {\n  width: min(560px, 100vw);\n}\n.drawer-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n  flex-shrink: 0;\n  padding: 1.4rem 1.5rem 1.1rem;\n  border-bottom: 1px solid var(--%NS%border-color);\n  background: var(--%NS%surface-card);\n}\n.drawer-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0.2rem 0 0;\n  color: var(--%NS%btn-primary-text);\n  font-size: 1.25rem;\n}\n.drawer-close[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 34px;\n  height: 34px;\n  flex-shrink: 0;\n  border: 1px solid var(--%NS%border-color);\n  border-radius: 10px;\n  background: var(--%NS%surface-subtle);\n  color: var(--%NS%text-silver);\n  font-size: 1.25rem;\n  line-height: 1;\n  cursor: pointer;\n  transition: all 0.18s ease;\n}\n.drawer-close[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%danger-bg);\n  color: var(--%NS%danger);\n  border-color: var(--%NS%danger-border);\n}\n.drawer-body[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1.4rem 1.5rem;\n}\n.drawer-loading[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.6rem;\n  padding: 2rem;\n  color: var(--%NS%text-muted);\n  font-size: 0.9rem;\n}\n.catalog-spinner[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  border: 2.5px solid var(--%NS%input-border);\n  border-top-color: var(--%NS%accent-green);\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.7s linear infinite;\n  display: inline-block;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.form-banner[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n  padding: 0.7rem 0.9rem;\n  border-radius: 10px;\n  font-size: 0.85rem;\n  font-weight: 600;\n}\n.form-banner.error[_ngcontent-%COMP%] {\n  background: var(--%NS%danger-bg);\n  border: 1px solid var(--%NS%danger-border);\n  color: var(--%NS%danger);\n}\n.drawer-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.6rem;\n  padding-top: 0.35rem;\n}\n.skeleton-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: 1.15rem;\n  position: relative;\n  z-index: 1;\n}\n.skeleton-card[_ngcontent-%COMP%] {\n  height: 180px;\n  border-radius: 14px;\n  border: 1px solid var(--%NS%border-color);\n  background:\n    linear-gradient(\n      90deg,\n      var(--%NS%surface-muted) 25%,\n      var(--%NS%surface-subtle) 50%,\n      var(--%NS%surface-muted) 75%);\n  background-size: 200% 100%;\n  animation: _ngcontent-%COMP%_shimmer 1.4s infinite;\n}\n@keyframes _ngcontent-%COMP%_shimmer {\n  0% {\n    background-position: 200% 0;\n  }\n  100% {\n    background-position: -200% 0;\n  }\n}\n.toast-host[_ngcontent-%COMP%] {\n  position: fixed;\n  z-index: 4000;\n  right: 1.1rem;\n  bottom: 1.1rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.6rem;\n  max-width: 400px;\n}\n.toast[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  padding: 0.75rem 0.9rem;\n  border-radius: 12px;\n  background: var(--%NS%text-main);\n  color: var(--%NS%surface-card);\n  font-size: 0.86rem;\n  box-shadow: 0 16px 34px -10px rgba(15, 23, 42, 0.35);\n  animation: _ngcontent-%COMP%_toastIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);\n  cursor: pointer;\n}\n@keyframes _ngcontent-%COMP%_toastIn {\n  from {\n    opacity: 0;\n    transform: translateY(14px) scale(0.97);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n.toast-success[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #14532d,\n      var(--%NS%accent-green-dark));\n}\n.toast-error[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #7f1d1d,\n      var(--%NS%danger));\n}\n.toast-info[_ngcontent-%COMP%] {\n  background: var(--%NS%text-main);\n}\n.toast-icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 22px;\n  height: 22px;\n  flex-shrink: 0;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, 0.18);\n  font-size: 0.75rem;\n  font-weight: 800;\n}\n.toast-msg[_ngcontent-%COMP%] {\n  flex: 1;\n  line-height: 1.35;\n}\n.toast-action[_ngcontent-%COMP%] {\n  padding: 0.28rem 0.65rem;\n  border-radius: 8px;\n  background: var(--%NS%surface-card);\n  color: var(--%NS%accent-green-dark);\n  font-size: 0.75rem;\n  font-weight: 800;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  white-space: nowrap;\n}\n.toast-close[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 22px;\n  height: 22px;\n  border: 0;\n  border-radius: 50%;\n  background: transparent;\n  color: rgba(255, 255, 255, 0.75);\n  font-size: 1rem;\n  cursor: pointer;\n}\n.toast-close[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.15);\n  color: var(--%NS%surface-card);\n}\n.currency-input-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.currency-symbol[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 0.7rem;\n  top: 50%;\n  transform: translateY(-50%);\n  color: var(--%NS%text-muted);\n  font-weight: 700;\n  pointer-events: none;\n}\n.form-group[_ngcontent-%COMP%]   .currency-input-wrapper[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:not([type=checkbox]):not([type=radio]) {\n  padding-left: 2rem;\n}\n@media (max-width: 768px) {\n  .plates-container[_ngcontent-%COMP%] {\n    padding: 1rem;\n    border-radius: 12px;\n  }\n  .plates-container[_ngcontent-%COMP%]   .toolbar[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n    padding: 0.8rem;\n  }\n  .search-wrapper[_ngcontent-%COMP%] {\n    flex: 1 1 auto;\n  }\n  .toolbar-select[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n    max-width: none;\n    width: 100%;\n  }\n  .plates-container[_ngcontent-%COMP%]   .results-count[_ngcontent-%COMP%] {\n    margin-left: 0;\n  }\n  .plates-grid[_ngcontent-%COMP%], \n   .skeleton-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .plates-container[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: stretch;\n    flex-direction: column;\n    gap: 0.85rem;\n  }\n  .plates-container[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%] {\n    justify-content: center;\n    width: 100%;\n  }\n  .drawer-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .drawer-actions[_ngcontent-%COMP%]   .btn-cancel[_ngcontent-%COMP%], \n   .drawer-actions[_ngcontent-%COMP%]   .btn-confirm[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n  }\n  .toast-host[_ngcontent-%COMP%] {\n    right: 0.7rem;\n    bottom: 0.7rem;\n    left: 0.7rem;\n    max-width: none;\n  }\n  .modal-actions[_ngcontent-%COMP%] {\n    flex-direction: column-reverse;\n    align-items: stretch;\n  }\n  .modal-actions[_ngcontent-%COMP%]   .btn-cancel[_ngcontent-%COMP%], \n   .modal-actions[_ngcontent-%COMP%]   .btn-confirm[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n  }\n}\n.button-icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 20px;\n  height: 20px;\n  margin-right: 0.25rem;\n  border: 1px solid rgba(16, 37, 31, 0.25);\n  border-radius: 50%;\n  font-size: 1rem;\n  line-height: 1;\n}\n.plates-container[_ngcontent-%COMP%]   .btn-icon[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border: 1px solid transparent;\n  background: var(--%NS%surface-subtle);\n}\n.plates-container[_ngcontent-%COMP%]   .btn-icon[_ngcontent-%COMP%]:hover {\n  border-color: var(--%NS%input-border);\n  background: var(--%NS%surface-card);\n  transform: translateY(-1px);\n}\n.plates-container[_ngcontent-%COMP%]   .btn-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n  fill: none;\n  stroke: currentColor;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n  stroke-width: 1.8;\n}\n.plates-container[_ngcontent-%COMP%]   .btn-delete[_ngcontent-%COMP%]:hover {\n  color: var(--%NS%danger-bright);\n  background: var(--%NS%danger-bg);\n}\n.plates-container[_ngcontent-%COMP%]   .btn-edit[_ngcontent-%COMP%]:hover {\n  color: var(--%NS%info);\n}\n.plates-container[_ngcontent-%COMP%]   .btn-toggle[_ngcontent-%COMP%] {\n  color: var(--%NS%accent-green-dark);\n  background: var(--%NS%accent-green-light);\n  border-color: #8bd39a;\n}\n.plates-container[_ngcontent-%COMP%]   .btn-toggle[_ngcontent-%COMP%]:hover {\n  color: #f59e0b;\n  background: var(--%NS%warning-bg);\n  border-color: var(--%NS%warning-border);\n}\n.plates-container[_ngcontent-%COMP%]   .btn-toggle.off[_ngcontent-%COMP%] {\n  color: var(--%NS%danger);\n  background: var(--%NS%danger-bg);\n  border-color: var(--%NS%danger-border);\n}\n.plates-container[_ngcontent-%COMP%]   .btn-toggle.off[_ngcontent-%COMP%]:hover {\n  color: var(--%NS%danger);\n  background: var(--%NS%danger-border);\n}\n.plates-container[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%]:not(.modal-overlay):not(.drawer-overlay):not(.toast-host) {\n  position: relative;\n  z-index: 1;\n}\n/*# sourceMappingURL=admin-plates.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminPlatesComponent, [{
    type: Component,
    args: [{ selector: "app-admin-plates", standalone: true, imports: [CommonModule, FormsModule], template: `<div class="plates-container">\r
    <div class="page-header">\r
        <div class="page-heading">\r
            <span class="page-kicker">Cat\xE1logo de placas</span>\r
            <h2>Placas de Estado</h2>\r
            <p>Gestiona las placas de estado disponibles en el cotizador. Los costos ingresados se usar\xE1n en el c\xE1lculo de cada cotizaci\xF3n.</p>\r
        </div>\r
        <button class="btn-primary" (click)="openNewPlate()"><span class="button-icon">+</span> Nueva Placa</button>\r
    </div>\r
\r
    <!-- TOOLBAR: B\xDASQUEDA + FILTROS -->\r
    <div class="toolbar">\r
        <div class="search-wrapper">\r
            <svg class="search-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>\r
            <input type="text" [(ngModel)]="searchTerm" (input)="onSearch()" placeholder="Buscar por nombre de placa..."\r
                class="search-input" />\r
            <button *ngIf="searchTerm" type="button" class="search-clear" (click)="searchTerm=''; onSearch()"\r
                aria-label="Limpiar b\xFAsqueda">\xD7</button>\r
        </div>\r
\r
        <label class="toolbar-select">\r
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1v22"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>\r
            <select [(ngModel)]="costFilter" (change)="onSearch()" name="costFilter" aria-label="Filtrar por costo">\r
                <option value="all">Todos los costos</option>\r
                <option value="withCost">Con costo</option>\r
            </select>\r
        </label>\r
\r
        <label class="toolbar-select">\r
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>\r
            <select [(ngModel)]="estadoFilter" (change)="onSearch()" name="estadoFilter" aria-label="Filtrar por estado">\r
                <option value="">Todos los estados</option>\r
                <option *ngFor="let estado of estadosMexico" [value]="estado">{{ estado }}</option>\r
            </select>\r
        </label>\r
\r
        <span class="results-count" *ngIf="!loading">{{ filteredPlates().length }} placa(s)</span>\r
    </div>\r
\r
    <div class="plates-grid" *ngIf="!loading && filteredPlates().length > 0">\r
        <article class="plate-card" *ngFor="let plate of filteredPlates()">\r
            <div class="plate-card-topline">\r
                <span class="plate-symbol" aria-hidden="true">\r
                    <svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="2"></rect><path d="M7 10h10M7 14h5"></path></svg>\r
                </span>\r
                <span class="plate-status" [class.protected]="isProtectedPlate(plate.id)"\r
                    [class.unavailable]="!isProtectedPlate(plate.id) && !isPlateAvailable(plate)">\r
                    {{ getAvailabilityLabel(plate) }}\r
                </span>\r
            </div>\r
            <h3>{{ plate.name }}</h3>\r
            <span class="plate-estado" title="Estado" *ngIf="plate.estado">\r
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>\r
                {{ plate.estado }}\r
            </span>\r
            <div class="plate-card-details">\r
                <span class="detail-label">Costo con IVA</span>\r
                <strong>{{ formatPrice(plate.costNet) }}</strong>\r
            </div>\r
            <div class="plate-card-footer">\r
                <span class="plate-usage">{{ isPlateAvailable(plate) ? 'Visible en el cotizador' : 'Oculta del cotizador' }}</span>\r
                <div class="action-buttons">\r
                    <button class="btn-icon btn-toggle" (click)="toggleDisponibilidad(plate)"\r
                        [class.off]="!isPlateAvailable(plate)"\r
                        [title]="isPlateAvailable(plate) ? 'Marcar como no disponible' : 'Marcar como disponible'"\r
                        [attr.aria-label]="isPlateAvailable(plate) ? 'Marcar como no disponible' : 'Marcar como disponible'">\r
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>\r
                    </button>\r
                    <button class="btn-icon btn-edit" (click)="openEditPlate(plate)" title="Editar" aria-label="Editar placa">\r
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg>\r
                    </button>\r
                    <button *ngIf="!isProtectedPlate(plate.id)" class="btn-icon btn-delete" (click)="deletePlate(plate.id)"\r
                        title="Eliminar" aria-label="Eliminar placa">\r
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="M19 6l-1 14H6L5 6"></path><path d="M10 11v5"></path><path d="M14 11v5"></path></svg>\r
                    </button>\r
                    <button *ngIf="isProtectedPlate(plate.id)" class="btn-icon btn-protected"\r
                        title="Protegida - no se puede eliminar" aria-label="Placa protegida">\r
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 17h1.5a2.5 2.5 0 0 0 2.5-2.5V9a2.5 2.5 0 0 0-2.5-2.5H11A2.5 2.5 0 0 0 8.5 9v5.5c0 1.37.9 2.5 2.5 2.5z"></path><path d="M8 11h8"></path><path d="M12 7v8"></path></svg>\r
                    </button>\r
                </div>\r
            </div>\r
        </article>\r
    </div>\r
\r
    <div *ngIf="loading" class="skeleton-grid" aria-label="Cargando placas">\r
        <div class="skeleton-card" *ngFor="let i of [0,1,2,3,4,5]"></div>\r
    </div>\r
    <div *ngIf="!loading && filteredPlates().length === 0" class="catalog-state empty-state">\r
        <span class="empty-state-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="2"></rect><path d="M7 10h10M7 14h5"></path></svg></span>\r
        <strong>No se encontraron placas</strong>\r
        <span>Prueba con otro t\xE9rmino o cambia los filtros de costo o estado.</span>\r
    </div>\r
</div>\r
\r
<!-- MODAL DE CONFIRMACI\xD3N -->\r
<div class="modal-overlay" *ngIf="showConfirmModal" (click)="cancelModal()">\r
    <div class="modal-content" (click)="$event.stopPropagation()">\r
        <div class="modal-heading modal-heading-warning">\r
            <span class="modal-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg></span>\r
            <div><span class="modal-eyebrow">Confirmaci\xF3n</span><h3>Confirmar acci\xF3n</h3></div>\r
        </div>\r
        <p *ngIf="confirmAction === 'toggle'">\xBFCambiar la disponibilidad de esta placa?</p>\r
        <p *ngIf="confirmAction !== 'toggle'">\xBFEst\xE1s seguro de eliminar esta placa?</p>\r
        <p class="warning-copy" *ngIf="confirmAction === 'toggle'"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg> Las placas marcadas como "No disponible" no aparecer\xE1n en el formulario del cotizador.</p>\r
        <p class="warning-copy" *ngIf="confirmAction !== 'toggle'"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.3 3.9 2.4 18h15.2l-3.1-6.2"></path></svg> Esta placa desaparecer\xE1 del cat\xE1logo de placas disponibles.</p>\r
        <div class="modal-actions">\r
            <button class="btn-cancel" (click)="cancelModal()">Cancelar</button>\r
            <button class="btn-confirm" (click)="confirmActionHandler()">\r
                {{ confirmAction === 'toggle' ? 'Cambiar' : 'Eliminar' }}\r
            </button>\r
        </div>\r
    </div>\r
</div>\r
\r
<!-- DRAWER: FORMULARIO (CREAR / EDITAR) -->\r
<div class="drawer-overlay" *ngIf="showFormDrawer" (click)="closeFormDrawer()">\r
    <aside class="drawer form-drawer" (click)="$event.stopPropagation()" role="dialog"\r
        [attr.aria-label]="isEditMode ? 'Editar placa' : 'Nueva placa'">\r
        <div class="drawer-header">\r
            <div>\r
                <span class="page-kicker">{{ isEditMode ? 'Edici\xF3n de placa' : 'Nuevo registro' }}</span>\r
                <h3>{{ isEditMode ? 'Editar Placa' : 'Nueva Placa' }}</h3>\r
            </div>\r
            <button class="drawer-close" (click)="closeFormDrawer()" aria-label="Cerrar formulario">\xD7</button>\r
        </div>\r
\r
        <div class="drawer-body">\r
            <div *ngIf="formError" class="form-banner error">{{ formError }}</div>\r
            <div *ngIf="formLoading" class="drawer-loading"><span class="catalog-spinner"></span> Cargando...</div>\r
\r
            <form (ngSubmit)="submitForm()" *ngIf="!formLoading" novalidate>\r
                <!-- Nombre -->\r
                <div class="form-group">\r
                    <label>Nombre *</label>\r
                    <input type="text" [(ngModel)]="plateForm.name" name="name" required\r
                        placeholder="Ej. Alta de placas CDMX" />\r
                </div>\r
\r
                <!-- Estado -->\r
                <div class="form-group">\r
                    <label>Estado *</label>\r
                    <select [(ngModel)]="plateForm.estado" name="estado" required>\r
                        <option value="" disabled>Selecciona un estado...</option>\r
                        <option *ngFor="let estado of estadosMexico" [value]="estado">{{ estado }}</option>\r
                    </select>\r
                    <small>Elige el estado de la Rep\xFAblica Mexicana al que corresponde la placa.</small>\r
                </div>\r
\r
                <!-- Disponibilidad -->\r
                <div class="form-group">\r
                    <label>Disponibilidad *</label>\r
                    <select [(ngModel)]="plateForm.disponible" name="disponible" required>\r
                        <option [ngValue]="true">Disponible</option>\r
                        <option [ngValue]="false">No disponible</option>\r
                    </select>\r
                    <small>Si est\xE1 "No disponible", la placa no aparecer\xE1 en el formulario del cotizador.</small>\r
                </div>\r
\r
                <!-- Costo Neto -->\r
                <div class="form-group">\r
                    <label>Costo Neto (con IVA) *</label>\r
                    <div class="currency-input-wrapper">\r
                        <span class="currency-symbol">$</span>\r
                        <input type="number" [(ngModel)]="plateForm.costnet" name="costnet"\r
                            required min="0" placeholder="Ej. 1432" />\r
                    </div>\r
                    <small>Costo en Pesos MXN incluyendo IVA. Usa 0 para opciones "pendientes por cotizar".</small>\r
                </div>\r
\r
                <div class="drawer-actions">\r
                    <button type="button" class="btn-cancel" (click)="closeFormDrawer()">Cancelar</button>\r
                    <button type="submit" class="btn-confirm" [disabled]="formLoading">\r
                        {{ formLoading ? 'Guardando...' : isEditMode ? 'Actualizar' : 'Crear' }}\r
                    </button>\r
                </div>\r
            </form>\r
        </div>\r
    </aside>\r
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
`, styles: ['/* src/app/components/admin/admin-plates/admin-plates.css */\n.plates-container {\n  position: relative;\n  overflow: hidden;\n  background: var(--surface-subtle);\n  border: 0;\n  padding: 0;\n  box-shadow: none;\n}\n.plates-container::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 38%;\n  height: 190px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(32, 176, 56, 0.14),\n      rgba(16, 37, 31, 0.07));\n  clip-path: polygon(35% 0, 100% 0, 100% 100%, 0 100%);\n  pointer-events: none;\n  z-index: 0;\n}\n.plates-container .page-header {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1.25rem;\n  min-height: 164px;\n  margin: 0 0 1.25rem;\n  padding: 1.5rem 1.75rem;\n  border: 1px solid rgba(139, 226, 140, 0.22);\n  border-radius: 16px;\n  background:\n    linear-gradient(\n      115deg,\n      #10251f 0%,\n      #173c2e 68%,\n      #1f6840 100%);\n  box-shadow: 0 16px 30px rgba(16, 37, 31, 0.16);\n}\n.plates-container .page-heading {\n  flex: 1 1 auto;\n  min-width: 0;\n  padding: 0;\n}\n.plates-container .page-heading h2 {\n  margin: 0.25rem 0 0.35rem;\n  color: var(--text-on-accent);\n  font-size: 2rem;\n  line-height: 1;\n}\n.plates-container .page-heading p {\n  max-width: 420px;\n  margin: 0;\n  color: #bdd6c7;\n  font-size: 0.88rem;\n}\n.plates-container .btn-primary {\n  position: relative;\n  z-index: 2;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.4rem;\n  min-height: 44px;\n  margin-left: auto;\n  padding: 0.75rem 1rem;\n  border: 0;\n  border-radius: 9px;\n  background: var(--btn-primary-bg);\n  color: var(--btn-primary-text);\n  box-shadow: none;\n  white-space: nowrap;\n  cursor: pointer;\n  font-weight: 700;\n  font-size: 0.9rem;\n  transition: all 0.2s ease;\n}\n.plates-container .btn-primary:hover {\n  background: var(--btn-primary-bg-hover);\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.16);\n}\n.plates-container .toolbar {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 0.6rem;\n  margin: 0 0 1.15rem;\n  padding: 0.6rem 0.75rem;\n  border: 1px solid var(--border-color);\n  border-radius: 14px;\n  background: var(--surface-card);\n  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.05);\n  position: relative;\n  z-index: 1;\n}\n.search-wrapper {\n  position: relative;\n  flex: 1 1 240px;\n  display: flex;\n  align-items: center;\n}\n.search-icon {\n  position: absolute;\n  left: 0.8rem;\n  width: 17px;\n  height: 17px;\n  fill: none;\n  stroke: var(--accent-silver);\n  stroke-width: 2;\n  stroke-linecap: round;\n  pointer-events: none;\n}\n.plates-container .search-input {\n  width: 100%;\n  min-height: 38px;\n  padding: 0.4rem 2.3rem 0.4rem 2.4rem;\n  border: 1px solid var(--input-border);\n  border-radius: 9px;\n  font-size: 0.9rem;\n  background: var(--surface-subtle);\n  color: var(--text-silver);\n  transition:\n    border-color 0.2s ease,\n    box-shadow 0.2s ease,\n    background 0.2s ease;\n}\n.plates-container .search-input::placeholder {\n  color: var(--accent-silver);\n}\n.plates-container .search-input:focus {\n  outline: none;\n  border-color: var(--accent-green);\n  background: var(--surface-card);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.1);\n}\n.search-clear {\n  position: absolute;\n  right: 0.45rem;\n  width: 24px;\n  height: 24px;\n  border: 0;\n  border-radius: 50%;\n  background: var(--surface-muted);\n  color: var(--text-muted);\n  font-size: 1rem;\n  line-height: 1;\n  cursor: pointer;\n}\n.search-clear:hover {\n  background: var(--input-border);\n  color: var(--text-main);\n}\n.toolbar-select {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n}\n.toolbar-select svg {\n  position: absolute;\n  left: 0.7rem;\n  width: 15px;\n  height: 15px;\n  fill: none;\n  stroke: var(--accent-silver);\n  stroke-width: 1.9;\n  stroke-linecap: round;\n  pointer-events: none;\n}\n.toolbar-select select {\n  min-height: 38px;\n  max-width: 220px;\n  padding: 0.4rem 1.9rem 0.4rem 2rem;\n  border: 1px solid var(--input-border);\n  border-radius: 9px;\n  background: var(--surface-subtle);\n  color: var(--text-silver);\n  font-size: 0.85rem;\n  cursor: pointer;\n  appearance: none;\n  transition: border-color 0.2s, box-shadow 0.2s;\n}\n.toolbar-select select:focus {\n  outline: none;\n  border-color: var(--accent-green);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.1);\n}\n.plates-container .results-count {\n  flex: 0 0 auto;\n  margin-left: auto;\n  color: var(--text-muted);\n  font-size: 0.8rem;\n  white-space: nowrap;\n}\n.page-kicker {\n  color: #8be28c;\n  font-size: 0.68rem;\n  font-weight: 700;\n  letter-spacing: 1.2px;\n  text-transform: uppercase;\n}\n.action-buttons {\n  display: flex;\n  gap: 0.3rem;\n}\n.loading,\n.empty-state {\n  text-align: center;\n  padding: 2rem;\n  color: var(--text-muted);\n}\n.empty-state {\n  font-style: italic;\n}\n.plates-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));\n  gap: 1rem;\n}\n.plate-card {\n  min-width: 0;\n  padding: 1.2rem;\n  border: 1px solid var(--border-color);\n  border-radius: 12px;\n  background: var(--surface-card);\n  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.04);\n  transition:\n    border-color 0.2s ease,\n    box-shadow 0.2s ease,\n    transform 0.2s ease;\n}\n.plate-card:hover {\n  border-color: rgba(32, 176, 56, 0.42);\n  box-shadow: 0 14px 28px rgba(15, 23, 42, 0.08);\n  transform: translateY(-2px);\n}\n.plate-card-topline,\n.plate-card-footer,\n.plate-card-details {\n  display: flex;\n  align-items: center;\n}\n.plate-card-topline,\n.plate-card-footer {\n  justify-content: space-between;\n  gap: 0.75rem;\n}\n.plate-symbol {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 38px;\n  height: 38px;\n  border-radius: 10px;\n  background: var(--accent-green-light);\n  color: var(--accent-green-dark);\n}\n.plate-symbol svg,\n.empty-state-icon svg {\n  width: 20px;\n  height: 20px;\n  fill: none;\n  stroke: currentColor;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n  stroke-width: 1.7;\n}\n.plate-status {\n  padding: 0.3rem 0.55rem;\n  border-radius: 999px;\n  background: var(--accent-green-light);\n  color: var(--accent-green-dark);\n  font-size: 0.66rem;\n  font-weight: 700;\n  letter-spacing: 0.5px;\n  text-transform: uppercase;\n}\n.plate-status.protected {\n  background: var(--warning-bg);\n  color: var(--warning);\n}\n.plate-status.unavailable {\n  background: var(--danger-bg);\n  color: var(--danger);\n}\n.plate-card h3 {\n  margin: 1rem 0 0.3rem;\n  color: var(--btn-primary-text);\n  font-size: 1.05rem;\n  line-height: 1.3;\n}\n.plate-estado {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  padding: 0.25rem 0.6rem;\n  border: 1px solid #8bd39a;\n  border-radius: 999px;\n  background: var(--accent-green-light);\n  color: var(--accent-green-dark);\n  font-size: 0.72rem;\n  font-weight: 600;\n}\n.plate-estado svg {\n  width: 13px;\n  height: 13px;\n  flex-shrink: 0;\n  fill: none;\n  stroke: currentColor;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n  stroke-width: 1.8;\n}\n.plate-card-details {\n  justify-content: space-between;\n  gap: 1rem;\n  margin: 1.2rem 0;\n  padding: 0.85rem 0;\n  border-top: 1px solid var(--border-color);\n  border-bottom: 1px solid var(--border-color);\n}\n.detail-label,\n.plate-usage {\n  color: var(--text-muted);\n  font-size: 0.73rem;\n}\n.plate-card-details strong {\n  color: var(--accent-green-dark);\n  font-size: 1.05rem;\n}\n.plate-usage {\n  max-width: 150px;\n}\n.catalog-state {\n  min-height: 170px;\n  padding: 2rem;\n  border: 1px dashed var(--border-strong);\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.7);\n  box-sizing: border-box;\n  text-align: center;\n}\n.catalog-state.loading {\n  display: grid;\n  place-items: center;\n}\n.catalog-state.empty-state {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  gap: 0.35rem;\n  font-style: normal;\n}\n.empty-state-icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 42px;\n  height: 42px;\n  margin-bottom: 0.35rem;\n  border-radius: 12px;\n  background: var(--surface-hover);\n  color: var(--text-muted);\n}\n.catalog-state.empty-state strong {\n  color: var(--text-silver);\n  font-size: 0.95rem;\n}\n.catalog-state.empty-state > span:last-child {\n  color: var(--accent-silver);\n  font-size: 0.8rem;\n}\n.modal-overlay {\n  position: fixed;\n  inset: 0;\n  z-index: 3500;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 1rem;\n  background: rgba(15, 23, 42, 0.5);\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: fadeIn 0.2s ease;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.modal-content {\n  width: 100%;\n  max-width: 470px;\n  max-height: 92vh;\n  overflow-y: auto;\n  border-radius: 18px;\n  background: var(--surface-card);\n  border: 1px solid var(--border-color);\n  padding: 1.6rem 1.7rem 1.4rem;\n  box-shadow: 0 30px 70px -20px rgba(15, 23, 42, 0.4);\n  animation: riseIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);\n}\n@keyframes riseIn {\n  from {\n    opacity: 0;\n    transform: translateY(18px) scale(0.97);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n.modal-content h3 {\n  margin: 0;\n  color: var(--btn-primary-text);\n  font-size: 1.15rem;\n}\n.modal-actions {\n  display: flex;\n  gap: 0.6rem;\n  justify-content: flex-end;\n  margin-top: 1.3rem;\n}\n.btn-cancel {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 40px;\n  padding: 0.55rem 1.15rem;\n  border: 1px solid var(--input-border);\n  border-radius: 9px;\n  background: var(--surface-card);\n  color: var(--text-silver);\n  font-weight: 700;\n  font-size: 0.85rem;\n  cursor: pointer;\n  transition: all 0.18s ease;\n}\n.btn-cancel:hover {\n  background: var(--surface-hover);\n  border-color: var(--border-strong);\n}\n.btn-confirm {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 40px;\n  padding: 0.55rem 1.3rem;\n  border: 0;\n  border-radius: 9px;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-green-dark),\n      var(--accent-green));\n  color: var(--text-on-accent);\n  font-weight: 700;\n  font-size: 0.85rem;\n  cursor: pointer;\n  box-shadow: 0 10px 20px -8px rgba(32, 176, 56, 0.5);\n  transition: transform 0.18s ease, box-shadow 0.18s ease;\n}\n.btn-confirm:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 14px 26px -8px rgba(32, 176, 56, 0.55);\n}\n.btn-confirm:disabled {\n  opacity: 0.65;\n  cursor: wait;\n  transform: none;\n}\n.plates-container .btn-cancel:focus-visible,\n.plates-container .btn-confirm:focus-visible,\n.plates-container .btn-icon:focus-visible {\n  outline: 3px solid rgba(32, 176, 56, 0.35);\n  outline-offset: 2px;\n}\n.error {\n  color: var(--danger);\n  background: var(--danger-bg);\n  padding: 0.5rem;\n  border-radius: 6px;\n  margin-bottom: 0.5rem;\n  text-align: center;\n}\n.catalog-error {\n  margin: 0 0 1rem;\n}\n.form-group {\n  margin-bottom: 1.15rem;\n}\n.form-group label {\n  display: block;\n  margin-bottom: 0.4rem;\n  color: var(--text-silver);\n  font-size: 0.78rem;\n  font-weight: 800;\n  letter-spacing: 0.5px;\n  text-transform: uppercase;\n}\n.form-group input:not([type=checkbox]):not([type=radio]),\n.form-group select,\n.form-group textarea {\n  width: 100%;\n  min-height: 44px;\n  padding: 0.65rem 0.85rem;\n  border: 1.5px solid var(--input-border);\n  border-radius: 10px;\n  background: var(--surface-card);\n  color: var(--text-main);\n  font-size: 0.92rem;\n  font-family: var(--font-body);\n  transition:\n    border-color 0.2s,\n    box-shadow 0.2s,\n    background 0.2s;\n}\n.form-group input:focus,\n.form-group select:focus,\n.form-group textarea:focus {\n  outline: none;\n  border-color: var(--accent-green);\n  background: var(--surface-card);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.1);\n}\n.form-group input:disabled {\n  background: var(--surface-hover);\n  color: var(--text-muted);\n  cursor: not-allowed;\n}\n.form-group small {\n  display: block;\n  margin-top: 0.35rem;\n  color: var(--accent-silver);\n  font-size: 0.76rem;\n}\n.modal-heading {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.8rem;\n  margin-bottom: 1rem;\n}\n.modal-heading h3 {\n  margin: 0.15rem 0 0;\n  color: var(--text-main);\n  font-size: 1.35rem;\n}\n.modal-eyebrow {\n  display: block;\n  color: var(--accent-silver);\n  font-size: 0.66rem;\n  font-weight: 700;\n  letter-spacing: 0.9px;\n  text-transform: uppercase;\n}\n.modal-icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 42px;\n  height: 42px;\n  flex-shrink: 0;\n  border-radius: 12px;\n}\n.modal-icon svg {\n  width: 21px;\n  height: 21px;\n  fill: none;\n  stroke: currentColor;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n  stroke-width: 1.8;\n}\n.modal-heading-warning .modal-icon {\n  background: var(--warning-bg);\n  color: var(--warning);\n}\n.modal-content > p {\n  color: var(--text-muted);\n  font-size: 0.92rem;\n  line-height: 1.6;\n}\n.warning-copy {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.45rem;\n  margin: 0.7rem 0;\n  padding: 0.7rem 0.8rem;\n  border: 1px solid #fed7aa;\n  border-radius: 9px;\n  background: var(--warning-bg);\n  color: var(--warning);\n  font-weight: 600;\n}\n.warning-copy svg {\n  width: 17px;\n  height: 17px;\n  flex-shrink: 0;\n}\n.drawer-overlay {\n  position: fixed;\n  inset: 0;\n  z-index: 3000;\n  display: flex;\n  justify-content: flex-end;\n  background: rgba(15, 23, 42, 0.45);\n  -webkit-backdrop-filter: blur(3px);\n  backdrop-filter: blur(3px);\n  animation: fadeIn 0.25s ease;\n}\n.drawer {\n  display: flex;\n  flex-direction: column;\n  width: min(500px, 100vw);\n  height: 100%;\n  background: var(--surface-subtle);\n  box-shadow: -24px 0 60px rgba(15, 23, 42, 0.28);\n  animation: slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1);\n  overflow: hidden;\n}\n@keyframes slideInRight {\n  from {\n    transform: translateX(100%);\n  }\n  to {\n    transform: translateX(0);\n  }\n}\n.form-drawer {\n  width: min(560px, 100vw);\n}\n.drawer-header {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n  flex-shrink: 0;\n  padding: 1.4rem 1.5rem 1.1rem;\n  border-bottom: 1px solid var(--border-color);\n  background: var(--surface-card);\n}\n.drawer-header h3 {\n  margin: 0.2rem 0 0;\n  color: var(--btn-primary-text);\n  font-size: 1.25rem;\n}\n.drawer-close {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 34px;\n  height: 34px;\n  flex-shrink: 0;\n  border: 1px solid var(--border-color);\n  border-radius: 10px;\n  background: var(--surface-subtle);\n  color: var(--text-silver);\n  font-size: 1.25rem;\n  line-height: 1;\n  cursor: pointer;\n  transition: all 0.18s ease;\n}\n.drawer-close:hover {\n  background: var(--danger-bg);\n  color: var(--danger);\n  border-color: var(--danger-border);\n}\n.drawer-body {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1.4rem 1.5rem;\n}\n.drawer-loading {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.6rem;\n  padding: 2rem;\n  color: var(--text-muted);\n  font-size: 0.9rem;\n}\n.catalog-spinner {\n  width: 18px;\n  height: 18px;\n  border: 2.5px solid var(--input-border);\n  border-top-color: var(--accent-green);\n  border-radius: 50%;\n  animation: spin 0.7s linear infinite;\n  display: inline-block;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.form-banner {\n  margin-bottom: 1rem;\n  padding: 0.7rem 0.9rem;\n  border-radius: 10px;\n  font-size: 0.85rem;\n  font-weight: 600;\n}\n.form-banner.error {\n  background: var(--danger-bg);\n  border: 1px solid var(--danger-border);\n  color: var(--danger);\n}\n.drawer-actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.6rem;\n  padding-top: 0.35rem;\n}\n.skeleton-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: 1.15rem;\n  position: relative;\n  z-index: 1;\n}\n.skeleton-card {\n  height: 180px;\n  border-radius: 14px;\n  border: 1px solid var(--border-color);\n  background:\n    linear-gradient(\n      90deg,\n      var(--surface-muted) 25%,\n      var(--surface-subtle) 50%,\n      var(--surface-muted) 75%);\n  background-size: 200% 100%;\n  animation: shimmer 1.4s infinite;\n}\n@keyframes shimmer {\n  0% {\n    background-position: 200% 0;\n  }\n  100% {\n    background-position: -200% 0;\n  }\n}\n.toast-host {\n  position: fixed;\n  z-index: 4000;\n  right: 1.1rem;\n  bottom: 1.1rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.6rem;\n  max-width: 400px;\n}\n.toast {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  padding: 0.75rem 0.9rem;\n  border-radius: 12px;\n  background: var(--text-main);\n  color: var(--surface-card);\n  font-size: 0.86rem;\n  box-shadow: 0 16px 34px -10px rgba(15, 23, 42, 0.35);\n  animation: toastIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);\n  cursor: pointer;\n}\n@keyframes toastIn {\n  from {\n    opacity: 0;\n    transform: translateY(14px) scale(0.97);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n.toast-success {\n  background:\n    linear-gradient(\n      135deg,\n      #14532d,\n      var(--accent-green-dark));\n}\n.toast-error {\n  background:\n    linear-gradient(\n      135deg,\n      #7f1d1d,\n      var(--danger));\n}\n.toast-info {\n  background: var(--text-main);\n}\n.toast-icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 22px;\n  height: 22px;\n  flex-shrink: 0;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, 0.18);\n  font-size: 0.75rem;\n  font-weight: 800;\n}\n.toast-msg {\n  flex: 1;\n  line-height: 1.35;\n}\n.toast-action {\n  padding: 0.28rem 0.65rem;\n  border-radius: 8px;\n  background: var(--surface-card);\n  color: var(--accent-green-dark);\n  font-size: 0.75rem;\n  font-weight: 800;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  white-space: nowrap;\n}\n.toast-close {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 22px;\n  height: 22px;\n  border: 0;\n  border-radius: 50%;\n  background: transparent;\n  color: rgba(255, 255, 255, 0.75);\n  font-size: 1rem;\n  cursor: pointer;\n}\n.toast-close:hover {\n  background: rgba(255, 255, 255, 0.15);\n  color: var(--surface-card);\n}\n.currency-input-wrapper {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.currency-symbol {\n  position: absolute;\n  left: 0.7rem;\n  top: 50%;\n  transform: translateY(-50%);\n  color: var(--text-muted);\n  font-weight: 700;\n  pointer-events: none;\n}\n.form-group .currency-input-wrapper input:not([type=checkbox]):not([type=radio]) {\n  padding-left: 2rem;\n}\n@media (max-width: 768px) {\n  .plates-container {\n    padding: 1rem;\n    border-radius: 12px;\n  }\n  .plates-container .toolbar {\n    flex-direction: column;\n    align-items: stretch;\n    padding: 0.8rem;\n  }\n  .search-wrapper {\n    flex: 1 1 auto;\n  }\n  .toolbar-select select {\n    max-width: none;\n    width: 100%;\n  }\n  .plates-container .results-count {\n    margin-left: 0;\n  }\n  .plates-grid,\n  .skeleton-grid {\n    grid-template-columns: 1fr;\n  }\n  .plates-container .page-header {\n    display: flex;\n    align-items: stretch;\n    flex-direction: column;\n    gap: 0.85rem;\n  }\n  .plates-container .btn-primary {\n    justify-content: center;\n    width: 100%;\n  }\n  .drawer-actions {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .drawer-actions .btn-cancel,\n  .drawer-actions .btn-confirm {\n    width: 100%;\n    justify-content: center;\n  }\n  .toast-host {\n    right: 0.7rem;\n    bottom: 0.7rem;\n    left: 0.7rem;\n    max-width: none;\n  }\n  .modal-actions {\n    flex-direction: column-reverse;\n    align-items: stretch;\n  }\n  .modal-actions .btn-cancel,\n  .modal-actions .btn-confirm {\n    width: 100%;\n    justify-content: center;\n  }\n}\n.button-icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 20px;\n  height: 20px;\n  margin-right: 0.25rem;\n  border: 1px solid rgba(16, 37, 31, 0.25);\n  border-radius: 50%;\n  font-size: 1rem;\n  line-height: 1;\n}\n.plates-container .btn-icon {\n  width: 34px;\n  height: 34px;\n  border: 1px solid transparent;\n  background: var(--surface-subtle);\n}\n.plates-container .btn-icon:hover {\n  border-color: var(--input-border);\n  background: var(--surface-card);\n  transform: translateY(-1px);\n}\n.plates-container .btn-icon svg {\n  width: 16px;\n  height: 16px;\n  fill: none;\n  stroke: currentColor;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n  stroke-width: 1.8;\n}\n.plates-container .btn-delete:hover {\n  color: var(--danger-bright);\n  background: var(--danger-bg);\n}\n.plates-container .btn-edit:hover {\n  color: var(--info);\n}\n.plates-container .btn-toggle {\n  color: var(--accent-green-dark);\n  background: var(--accent-green-light);\n  border-color: #8bd39a;\n}\n.plates-container .btn-toggle:hover {\n  color: #f59e0b;\n  background: var(--warning-bg);\n  border-color: var(--warning-border);\n}\n.plates-container .btn-toggle.off {\n  color: var(--danger);\n  background: var(--danger-bg);\n  border-color: var(--danger-border);\n}\n.plates-container .btn-toggle.off:hover {\n  color: var(--danger);\n  background: var(--danger-border);\n}\n.plates-container > *:not(.modal-overlay):not(.drawer-overlay):not(.toast-host) {\n  position: relative;\n  z-index: 1;\n}\n/*# sourceMappingURL=admin-plates.css.map */\n'] }]
  }], null, { onEscapeKey: [{
    type: HostListener,
    args: ["document:keydown.escape"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminPlatesComponent, { className: "AdminPlatesComponent", filePath: "src/app/components/admin/admin-plates/admin-plates.ts", lineNumber: 15 });
})();
export {
  AdminPlatesComponent
};
//# debugId=6b1d0703-654d-5950-8c31-802719acbf74
//# sourceMappingURL=chunk-YBX4YI3Y.js.map
