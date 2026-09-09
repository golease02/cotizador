import {
  CatalogService
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
  LowerCasePipe,
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
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵrestoreView,
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

// src/app/components/admin/admin-vehicles/admin-vehicles.ts
var _c0 = () => [1, 2, 3, 4, 5, 6];
function AdminVehiclesComponent_button_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 48);
    \u0275\u0275listener("click", function AdminVehiclesComponent_button_19_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.searchTerm = "";
      return \u0275\u0275resetView(ctx_r1.onSearch());
    });
    \u0275\u0275text(1, "\xD7");
    \u0275\u0275elementEnd();
  }
}
function AdminVehiclesComponent_option_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 49);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const brand_r3 = ctx.$implicit;
    \u0275\u0275property("value", brand_r3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(brand_r3);
  }
}
function AdminVehiclesComponent_option_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 49);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const year_r4 = ctx.$implicit;
    \u0275\u0275property("value", year_r4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(year_r4);
  }
}
function AdminVehiclesComponent_button_58_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 50);
    \u0275\u0275listener("click", function AdminVehiclesComponent_button_58_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.resetFilters());
    });
    \u0275\u0275text(1, "Limpiar filtros");
    \u0275\u0275elementEnd();
  }
}
function AdminVehiclesComponent_span_59_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 51);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r1.filteredVehicles().length, " veh\xEDculo(s)");
  }
}
function AdminVehiclesComponent_div_60_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 54);
  }
}
function AdminVehiclesComponent_div_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 52);
    \u0275\u0275template(1, AdminVehiclesComponent_div_60_div_1_Template, 1, 0, "div", 53);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", \u0275\u0275pureFunction0(1, _c0));
  }
}
function AdminVehiclesComponent_div_61_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 55)(1, "div", 56);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 14);
    \u0275\u0275element(3, "circle", 15)(4, "circle", 16)(5, "path", 17)(6, "path", 18)(7, "path", 19)(8, "path", 20);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(9, "h3", 57);
    \u0275\u0275text(10, "No hay veh\xEDculos disponibles");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p", 58);
    \u0275\u0275text(12, "A\xF1ade un veh\xEDculo para que aparezca en las opciones de autocompletado del cotizador.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 59);
    \u0275\u0275listener("click", function AdminVehiclesComponent_div_61_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openNewVehicle());
    });
    \u0275\u0275elementStart(14, "span", 5);
    \u0275\u0275text(15, "+");
    \u0275\u0275elementEnd();
    \u0275\u0275text(16, " Crear primer veh\xEDculo ");
    \u0275\u0275elementEnd()();
  }
}
function AdminVehiclesComponent_div_62_button_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 66);
    \u0275\u0275listener("click", function AdminVehiclesComponent_div_62_button_4_Template_button_click_0_listener() {
      const group_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.scrollToBrand(group_r8.brand));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const group_r8 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", group_r8.brand, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(group_r8.vehicles.length);
  }
}
function AdminVehiclesComponent_div_62_section_6_article_11__svg_svg_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 14);
    \u0275\u0275element(1, "polygon", 35);
    \u0275\u0275elementEnd();
  }
}
function AdminVehiclesComponent_div_62_section_6_article_11__svg_svg_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 14);
    \u0275\u0275element(1, "path", 91);
    \u0275\u0275elementEnd();
  }
}
function AdminVehiclesComponent_div_62_section_6_article_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article", 73)(1, "div", 74)(2, "span", 75);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 76);
    \u0275\u0275template(5, AdminVehiclesComponent_div_62_section_6_article_11__svg_svg_5_Template, 2, 0, "svg", 77)(6, AdminVehiclesComponent_div_62_section_6_article_11__svg_svg_6_Template, 2, 0, "svg", 77);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "h4");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 78);
    \u0275\u0275text(11, "Precio sugerido de lista");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "strong", 79);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 80)(15, "div", 81)(16, "button", 82);
    \u0275\u0275listener("click", function AdminVehiclesComponent_div_62_section_6_article_11_Template_button_click_16_listener() {
      const vehicle_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.openEditVehicle(vehicle_r10));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(17, "svg", 14);
    \u0275\u0275element(18, "path", 83)(19, "path", 84);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(20, "button", 85);
    \u0275\u0275listener("click", function AdminVehiclesComponent_div_62_section_6_article_11_Template_button_click_20_listener() {
      const vehicle_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.deleteVehicle(vehicle_r10.id));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(21, "svg", 14);
    \u0275\u0275element(22, "path", 86)(23, "path", 87)(24, "path", 88)(25, "path", 89)(26, "path", 90);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const vehicle_r10 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(vehicle_r10.year);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.getHybridClass(vehicle_r10.isHybridOrElectric));
    \u0275\u0275property("title", ctx_r1.getHybridTooltip(vehicle_r10.isHybridOrElectric));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", vehicle_r10.isHybridOrElectric);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !vehicle_r10.isHybridOrElectric);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getHybridLabel(vehicle_r10.isHybridOrElectric), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(vehicle_r10.model);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.formatPrice(vehicle_r10.suggestedPriceNet));
  }
}
function AdminVehiclesComponent_div_62_section_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 67);
    \u0275\u0275pipe(1, "lowercase");
    \u0275\u0275elementStart(2, "div", 68)(3, "div")(4, "span", 69);
    \u0275\u0275text(5, "Marca");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "h3");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "span", 70);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 71);
    \u0275\u0275template(11, AdminVehiclesComponent_div_62_section_6_article_11_Template, 27, 9, "article", 72);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const group_r11 = ctx.$implicit;
    \u0275\u0275property("id", "brand-" + \u0275\u0275pipeBind1(1, 5, group_r11.brand));
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(group_r11.brand);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", group_r11.vehicles.length, " modelo", group_r11.vehicles.length === 1 ? "" : "s");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", group_r11.vehicles);
  }
}
function AdminVehiclesComponent_div_62_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 60)(1, "aside", 61)(2, "span", 62);
    \u0275\u0275text(3, "Marcas");
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, AdminVehiclesComponent_div_62_button_4_Template, 4, 2, "button", 63);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 64);
    \u0275\u0275template(6, AdminVehiclesComponent_div_62_section_6_Template, 12, 7, "section", 65);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r1.brandGroups);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.brandGroups);
  }
}
function AdminVehiclesComponent_div_63_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 92);
    \u0275\u0275listener("click", function AdminVehiclesComponent_div_63_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelModal());
    });
    \u0275\u0275elementStart(1, "div", 93);
    \u0275\u0275listener("click", function AdminVehiclesComponent_div_63_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 94)(3, "span", 95);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(4, "svg", 14);
    \u0275\u0275element(5, "path", 96)(6, "path", 97)(7, "path", 98);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "div")(9, "span", 99);
    \u0275\u0275text(10, "Confirmaci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "h3");
    \u0275\u0275text(12, "Confirmar acci\xF3n");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "p");
    \u0275\u0275text(14, "\xBFEst\xE1s seguro de eliminar este veh\xEDculo?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "p", 100);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(16, "svg", 14);
    \u0275\u0275element(17, "path", 101);
    \u0275\u0275elementEnd();
    \u0275\u0275text(18, " Este veh\xEDculo desaparecer\xE1 del cat\xE1logo de autocompletado del cotizador.");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(19, "div", 102)(20, "button", 103);
    \u0275\u0275listener("click", function AdminVehiclesComponent_div_63_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelModal());
    });
    \u0275\u0275text(21, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "button", 104);
    \u0275\u0275listener("click", function AdminVehiclesComponent_div_63_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.confirmActionHandler());
    });
    \u0275\u0275text(23, "Eliminar");
    \u0275\u0275elementEnd()()()();
  }
}
function AdminVehiclesComponent_div_64_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 113);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.formError);
  }
}
function AdminVehiclesComponent_div_64_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 114);
    \u0275\u0275element(1, "div", 115);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Guardando...");
    \u0275\u0275elementEnd()();
  }
}
function AdminVehiclesComponent_div_64_form_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 116);
    \u0275\u0275listener("ngSubmit", function AdminVehiclesComponent_div_64_form_13_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.submitForm());
    });
    \u0275\u0275elementStart(1, "div", 117)(2, "label");
    \u0275\u0275text(3, "Marca *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 118);
    \u0275\u0275twoWayListener("ngModelChange", function AdminVehiclesComponent_div_64_form_13_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.vehicleForm.brand, $event) || (ctx_r1.vehicleForm.brand = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function AdminVehiclesComponent_div_64_form_13_Template_input_input_4_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onBrandInput($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(5, "small");
    \u0275\u0275text(6, "El nombre de la marca se escribe siempre en MAY\xDASCULAS para evitar marcas duplicadas.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 117)(8, "label");
    \u0275\u0275text(9, "Modelo *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "input", 119);
    \u0275\u0275twoWayListener("ngModelChange", function AdminVehiclesComponent_div_64_form_13_Template_input_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.vehicleForm.model, $event) || (ctx_r1.vehicleForm.model = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 117)(12, "label");
    \u0275\u0275text(13, "A\xF1o Modelo *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "input", 120);
    \u0275\u0275twoWayListener("ngModelChange", function AdminVehiclesComponent_div_64_form_13_Template_input_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.vehicleForm.year, $event) || (ctx_r1.vehicleForm.year = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(15, "small");
    \u0275\u0275text(16, "A\xF1o del veh\xEDculo. Valores menores a 2024 se consideran seminuevos.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 117)(18, "label");
    \u0275\u0275text(19, "Precio Neto (con IVA) *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 121)(21, "span", 122);
    \u0275\u0275text(22, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "input", 123);
    \u0275\u0275twoWayListener("ngModelChange", function AdminVehiclesComponent_div_64_form_13_Template_input_ngModelChange_23_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.vehicleForm.suggestedPriceNet, $event) || (ctx_r1.vehicleForm.suggestedPriceNet = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "small");
    \u0275\u0275text(25, "Precio de lista del veh\xEDculo. Este valor aparece preseleccionado en el cotizador.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 117)(27, "label");
    \u0275\u0275text(28, "\xBFEs h\xEDbrido o el\xE9ctrico?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "div", 124)(30, "button", 125);
    \u0275\u0275listener("click", function AdminVehiclesComponent_div_64_form_13_Template_button_click_30_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.vehicleForm.isHybridOrElectric = false);
    });
    \u0275\u0275text(31, " No (Renta b\xE1sica $6,000 + IVA)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "button", 125);
    \u0275\u0275listener("click", function AdminVehiclesComponent_div_64_form_13_Template_button_click_32_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.vehicleForm.isHybridOrElectric = true);
    });
    \u0275\u0275text(33, " S\xED (Renta b\xE1sica $8,550 + IVA)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "small");
    \u0275\u0275text(35, "Este atributo afecta el c\xE1lculo de la renta mensual b\xE1sica.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "div", 126)(37, "button", 127);
    \u0275\u0275listener("click", function AdminVehiclesComponent_div_64_form_13_Template_button_click_37_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closeFormDrawer());
    });
    \u0275\u0275text(38, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "button", 128);
    \u0275\u0275text(40);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.vehicleForm.brand);
    \u0275\u0275control();
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.vehicleForm.model);
    \u0275\u0275control();
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.vehicleForm.year);
    \u0275\u0275control();
    \u0275\u0275advance(9);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.vehicleForm.suggestedPriceNet);
    \u0275\u0275control();
    \u0275\u0275advance(7);
    \u0275\u0275classProp("active", !ctx_r1.vehicleForm.isHybridOrElectric);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.vehicleForm.isHybridOrElectric);
    \u0275\u0275advance(7);
    \u0275\u0275property("disabled", ctx_r1.formLoading);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.isEditMode ? "Actualizar" : "Crear", " ");
  }
}
function AdminVehiclesComponent_div_64_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 105);
    \u0275\u0275listener("click", function AdminVehiclesComponent_div_64_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeFormDrawer());
    });
    \u0275\u0275elementStart(1, "aside", 106);
    \u0275\u0275listener("click", function AdminVehiclesComponent_div_64_Template_aside_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 107)(3, "div")(4, "span", 3);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "h3");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "button", 108);
    \u0275\u0275listener("click", function AdminVehiclesComponent_div_64_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeFormDrawer());
    });
    \u0275\u0275text(9, "\xD7");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 109);
    \u0275\u0275template(11, AdminVehiclesComponent_div_64_div_11_Template, 2, 1, "div", 110)(12, AdminVehiclesComponent_div_64_div_12_Template, 4, 0, "div", 111)(13, AdminVehiclesComponent_div_64_form_13_Template, 41, 10, "form", 112);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", ctx_r1.isEditMode ? "Editar veh\xEDculo" : "Nuevo veh\xEDculo");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.isEditMode ? "Edici\xF3n de veh\xEDculo" : "Nuevo registro");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.isEditMode ? "Editar Veh\xEDculo" : "Nuevo Veh\xEDculo");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r1.formError);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.formLoading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.formLoading);
  }
}
function AdminVehiclesComponent_div_66_span_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 134);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r16 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r16.actionLabel);
  }
}
function AdminVehiclesComponent_div_66_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 129);
    \u0275\u0275listener("click", function AdminVehiclesComponent_div_66_Template_div_click_0_listener() {
      const t_r16 = \u0275\u0275restoreView(_r15).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.handleToast(t_r16));
    });
    \u0275\u0275elementStart(1, "span", 130);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 131);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, AdminVehiclesComponent_div_66_span_5_Template, 2, 1, "span", 132);
    \u0275\u0275elementStart(6, "button", 133);
    \u0275\u0275listener("click", function AdminVehiclesComponent_div_66_Template_button_click_6_listener($event) {
      const t_r16 = \u0275\u0275restoreView(_r15).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.toastService.dismiss(t_r16.id);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275text(7, "\xD7");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r16 = ctx.$implicit;
    \u0275\u0275classMap("toast-" + t_r16.type);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r16.type === "success" ? "\u2713" : t_r16.type === "error" ? "\u2715" : "\u2139");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r16.message);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", t_r16.actionLabel);
  }
}
var AdminVehiclesComponent = class _AdminVehiclesComponent {
  catalog = inject(CatalogService);
  cdr = inject(ChangeDetectorRef);
  toastService = inject(ToastService);
  // Listado
  vehicles = signal(
    [],
    ...ngDevMode ? [{ debugName: "vehicles" }] : (
      /* istanbul ignore next */
      []
    )
  );
  filteredVehicles = signal(
    [],
    ...ngDevMode ? [{ debugName: "filteredVehicles" }] : (
      /* istanbul ignore next */
      []
    )
  );
  loading = true;
  searchTerm = "";
  brandFilter = "all";
  yearFilter = "all";
  typeFilter = "all";
  // Modales
  showConfirmModal = false;
  selectedVehicleId = null;
  showFormDrawer = false;
  isEditMode = false;
  formLoading = false;
  formError = "";
  // Formulario
  vehicleForm = {
    id: "",
    brand: "",
    model: "",
    year: (/* @__PURE__ */ new Date()).getFullYear(),
    suggestedPriceNet: 0,
    isHybridOrElectric: false
  };
  async ngOnInit() {
    await this.loadVehicles();
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
  async loadVehicles() {
    this.loading = true;
    const { data, error } = await this.catalog.getAllVehicles();
    if (error) {
      this.toastService.error("No fue posible cargar los veh\xEDculos: " + error.message);
    } else {
      this.vehicles.set(data || []);
      this.applyFilters();
    }
    this.loading = false;
    this.cdr.detectChanges();
  }
  applyFilters() {
    let filtered = this.vehicles();
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim();
      filtered = filtered.filter((v) => (v.brand || "").toLowerCase().includes(term) || (v.model || "").toLowerCase().includes(term));
    }
    if (this.brandFilter !== "all") {
      filtered = filtered.filter((v) => v.brand === this.brandFilter);
    }
    if (this.yearFilter !== "all") {
      filtered = filtered.filter((v) => String(v.year) === this.yearFilter);
    }
    if (this.typeFilter === "hybrid") {
      filtered = filtered.filter((v) => v.isHybridOrElectric);
    } else if (this.typeFilter === "combustion") {
      filtered = filtered.filter((v) => !v.isHybridOrElectric);
    }
    this.filteredVehicles.set(filtered);
    this.cdr.detectChanges();
  }
  onSearch() {
    this.applyFilters();
  }
  resetFilters() {
    this.searchTerm = "";
    this.brandFilter = "all";
    this.yearFilter = "all";
    this.typeFilter = "all";
    this.applyFilters();
  }
  get hasActiveFilters() {
    return this.searchTerm.trim() !== "" || this.brandFilter !== "all" || this.yearFilter !== "all" || this.typeFilter !== "all";
  }
  get brandOptions() {
    const set = /* @__PURE__ */ new Set();
    for (const v of this.vehicles()) {
      const brand = (v.brand || "").trim();
      if (brand)
        set.add(brand);
    }
    return [...set].sort((a, b) => a.localeCompare(b, "es"));
  }
  get brandGroups() {
    const groups = /* @__PURE__ */ new Map();
    for (const vehicle of this.filteredVehicles()) {
      const brand = (vehicle.brand || "Sin marca").trim();
      if (!groups.has(brand))
        groups.set(brand, []);
      groups.get(brand).push(vehicle);
    }
    return [...groups.entries()].sort(([brandA], [brandB]) => brandA.localeCompare(brandB, "es")).map(([brand, vehicles]) => ({ brand, vehicles }));
  }
  scrollToBrand(brand) {
    document.getElementById(`brand-${brand.toLowerCase()}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
  get yearOptions() {
    const set = /* @__PURE__ */ new Set();
    for (const v of this.vehicles()) {
      if (v.year)
        set.add(v.year);
    }
    return [...set].sort((a, b) => b - a);
  }
  // ===================== MODAL DE CONFIRMACIÓN =====================
  deleteVehicle(vehicleId) {
    this.selectedVehicleId = vehicleId;
    this.showConfirmModal = true;
    this.cdr.detectChanges();
  }
  async confirmActionHandler() {
    if (!this.selectedVehicleId)
      return;
    this.formLoading = true;
    let succeeded = false;
    const { error } = await this.catalog.deleteVehicle(this.selectedVehicleId);
    if (error) {
      this.toastService.error("Error al eliminar: " + error.message);
    } else {
      this.toastService.success("Veh\xEDculo eliminado correctamente");
      succeeded = true;
    }
    this.showConfirmModal = false;
    this.selectedVehicleId = null;
    this.formLoading = false;
    if (succeeded) {
      await this.loadVehicles();
    }
    this.cdr.detectChanges();
  }
  cancelModal() {
    this.showConfirmModal = false;
    this.cdr.detectChanges();
  }
  // ===================== DRAWER DE FORMULARIO =====================
  openNewVehicle() {
    this.isEditMode = false;
    this.vehicleForm = {
      id: "",
      brand: "",
      model: "",
      year: (/* @__PURE__ */ new Date()).getFullYear(),
      suggestedPriceNet: 0,
      isHybridOrElectric: false
    };
    this.formError = "";
    this.showFormDrawer = true;
    this.cdr.detectChanges();
  }
  openEditVehicle(vehicle) {
    this.isEditMode = true;
    this.vehicleForm = {
      id: vehicle.id,
      brand: (vehicle.brand || "").toUpperCase(),
      model: vehicle.model,
      year: vehicle.year,
      suggestedPriceNet: vehicle.suggestedPriceNet,
      isHybridOrElectric: vehicle.isHybridOrElectric
    };
    this.formError = "";
    this.showFormDrawer = true;
    this.cdr.detectChanges();
  }
  closeFormDrawer() {
    this.showFormDrawer = false;
    this.cdr.detectChanges();
  }
  /** Convierte en vivo el nombre de la marca a mayúsculas (evita duplicados como "Toyota" vs "TOYOTA"). */
  onBrandInput(event) {
    const input = event.target;
    const upper = input.value.toUpperCase();
    if (upper === input.value)
      return;
    const { selectionStart, selectionEnd } = input;
    input.value = upper;
    if (this.vehicleForm.brand !== upper) {
      this.vehicleForm.brand = upper;
    }
    input.setSelectionRange(selectionStart ?? upper.length, selectionEnd ?? upper.length);
  }
  async submitForm() {
    if (this.formLoading)
      return;
    this.formLoading = true;
    this.formError = "";
    let operationSucceeded = false;
    this.vehicleForm.brand = (this.vehicleForm.brand || "").trim().toUpperCase();
    if (!this.vehicleForm.brand || !this.vehicleForm.model) {
      this.formError = "Marca y Modelo son obligatorios";
      this.formLoading = false;
      return;
    }
    if (this.vehicleForm.year < 2010 || this.vehicleForm.year > 2030) {
      this.formError = "El a\xF1o debe estar entre 2010 y 2030";
      this.formLoading = false;
      return;
    }
    if (this.vehicleForm.suggestedPriceNet <= 0) {
      this.formError = "El precio neto debe ser mayor a 0";
      this.formLoading = false;
      return;
    }
    try {
      if (this.isEditMode) {
        const { error } = await this.catalog.updateVehicle(this.vehicleForm.id, {
          brand: this.vehicleForm.brand,
          model: this.vehicleForm.model,
          year: this.vehicleForm.year,
          suggestedPriceNet: this.vehicleForm.suggestedPriceNet,
          isHybridOrElectric: this.vehicleForm.isHybridOrElectric
        });
        if (error) {
          this.formError = "Error al actualizar: " + error.message;
        } else {
          operationSucceeded = true;
        }
      } else {
        const { error } = await this.catalog.createVehicle({
          brand: this.vehicleForm.brand,
          model: this.vehicleForm.model,
          year: this.vehicleForm.year,
          suggestedPriceNet: this.vehicleForm.suggestedPriceNet,
          isHybridOrElectric: this.vehicleForm.isHybridOrElectric
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
        this.toastService.success(this.isEditMode ? "Veh\xEDculo actualizado correctamente" : "Veh\xEDculo creado correctamente");
        await this.loadVehicles();
      }
    }
  }
  // ===================== HELPERS =====================
  getHybridLabel(isHybrid) {
    return isHybrid ? "H\xEDbrido / El\xE9ctrico" : "Combusti\xF3n";
  }
  getHybridTooltip(isHybrid) {
    return isHybrid ? "S\xED, es h\xEDbrido o el\xE9ctrico. Afecta la renta mensual b\xE1sica ($8,550 + IVA)." : "No, es de combusti\xF3n. Renta mensual b\xE1sica ($6,000 + IVA).";
  }
  getHybridClass(isHybrid) {
    return isHybrid ? "status-hybrid" : "status-combustion";
  }
  formatPrice(price) {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      maximumFractionDigits: 0
    }).format(price);
  }
  static \u0275fac = function AdminVehiclesComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminVehiclesComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminVehiclesComponent, selectors: [["app-admin-vehicles"]], hostBindings: function AdminVehiclesComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("keydown.escape", function AdminVehiclesComponent_keydown_escape_HostBindingHandler() {
        return ctx.onEscapeKey();
      }, \u0275\u0275resolveDocument);
    }
  }, decls: 67, vars: 15, consts: [[1, "vehicles-container"], [1, "page-header"], [1, "page-heading"], [1, "page-kicker"], [1, "btn-primary", 3, "click"], [1, "button-icon"], [1, "toolbar"], [1, "search-wrapper"], ["viewBox", "0 0 24 24", "aria-hidden", "true", 1, "search-icon"], ["cx", "11", "cy", "11", "r", "8"], ["x1", "21", "y1", "21", "x2", "16.65", "y2", "16.65"], ["type", "text", "placeholder", "Buscar por marca o modelo", 1, "search-input", 3, "ngModelChange", "input", "ngModel"], ["type", "button", "class", "search-clear", "aria-label", "Limpiar b\xFAsqueda", 3, "click", 4, "ngIf"], [1, "toolbar-select"], ["viewBox", "0 0 24 24", "aria-hidden", "true"], ["cx", "7", "cy", "17", "r", "2"], ["cx", "17", "cy", "17", "r", "2"], ["d", "M9.3 17H6V6h5v11z"], ["d", "M8 10h6"], ["d", "M4 6V4"], ["d", "M15 6V4"], ["name", "brandFilter", "aria-label", "Filtrar por marca", 3, "ngModelChange", "change", "ngModel"], ["value", "all"], [3, "value", 4, "ngFor", "ngForOf"], ["x", "3", "y", "4", "width", "18", "height", "18", "rx", "2"], ["d", "M16 2v4"], ["d", "M8 2v4"], ["d", "M3 10h18"], ["d", "M8 14h.01"], ["d", "M12 14h.01"], ["d", "M16 14h.01"], ["d", "M8 18h.01"], ["d", "M12 18h.01"], ["d", "M16 18h.01"], ["name", "yearFilter", "aria-label", "Filtrar por a\xF1o", 3, "ngModelChange", "change", "ngModel"], ["points", "13 2 3 14 12 14 11 22 21 10 12 10 13 2"], ["name", "typeFilter", "aria-label", "Filtrar por tipo", 3, "ngModelChange", "change", "ngModel"], ["value", "hybrid"], ["value", "combustion"], ["type", "button", "class", "filter-reset", 3, "click", 4, "ngIf"], ["class", "results-count", 4, "ngIf"], ["class", "skeleton-grid", "aria-label", "Cargando veh\xEDculos", 4, "ngIf"], ["class", "empty-state catalog-state", 4, "ngIf"], ["class", "vehicle-catalog", 4, "ngIf"], ["class", "modal-overlay", 3, "click", 4, "ngIf"], ["class", "drawer-overlay", 3, "click", 4, "ngIf"], [1, "toast-host"], ["class", "toast", 3, "class", "click", 4, "ngFor", "ngForOf"], ["type", "button", "aria-label", "Limpiar b\xFAsqueda", 1, "search-clear", 3, "click"], [3, "value"], ["type", "button", 1, "filter-reset", 3, "click"], [1, "results-count"], ["aria-label", "Cargando veh\xEDculos", 1, "skeleton-grid"], ["class", "skeleton-card", 4, "ngFor", "ngForOf"], [1, "skeleton-card"], [1, "empty-state", "catalog-state"], [1, "empty-state-icon"], [1, "empty-state-title"], [1, "empty-state-text"], [1, "btn-primary", "btn-add-vehicle", 3, "click"], [1, "vehicle-catalog"], ["aria-label", "Marcas del cat\xE1logo", 1, "brand-index"], [1, "index-label"], ["type", "button", 3, "click", 4, "ngFor", "ngForOf"], [1, "brand-sections"], ["class", "brand-section", 3, "id", 4, "ngFor", "ngForOf"], ["type", "button", 3, "click"], [1, "brand-section", 3, "id"], [1, "brand-heading"], [1, "brand-kicker"], [1, "brand-count"], [1, "vehicle-cards"], ["class", "vehicle-card", 4, "ngFor", "ngForOf"], [1, "vehicle-card"], [1, "vehicle-card-head"], [1, "vehicle-year"], [1, "status-badge", 3, "title"], ["viewBox", "0 0 24 24", "aria-hidden", "true", 4, "ngIf"], [1, "vehicle-reference"], [1, "vehicle-price"], [1, "vehicle-card-footer"], [1, "action-buttons"], ["title", "Editar", "aria-label", "Editar veh\xEDculo", 1, "btn-icon", "btn-edit", 3, "click"], ["d", "M12 20h9"], ["d", "M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"], ["title", "Eliminar", "aria-label", "Eliminar veh\xEDculo", 1, "btn-icon", "btn-delete", 3, "click"], ["d", "M3 6h18"], ["d", "M8 6V4h8v2"], ["d", "M19 6l-1 14H6L5 6"], ["d", "M10 11v5"], ["d", "M14 11v5"], ["d", "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"], [1, "modal-overlay", 3, "click"], [1, "modal-content", 3, "click"], [1, "modal-heading", "modal-heading-warning"], [1, "modal-icon"], ["d", "M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"], ["d", "M12 9v4"], ["d", "M12 17h.01"], [1, "modal-eyebrow"], [1, "warning-copy"], ["d", "M10.3 3.9 2.4 18h15.2l-3.1-6.2"], [1, "modal-actions"], [1, "btn-cancel", 3, "click"], [1, "btn-confirm", 3, "click"], [1, "drawer-overlay", 3, "click"], ["role", "dialog", 1, "drawer", "form-drawer", 3, "click"], [1, "drawer-header"], ["aria-label", "Cerrar formulario", 1, "drawer-close", 3, "click"], [1, "drawer-body"], ["class", "form-banner error", 4, "ngIf"], ["class", "drawer-loading", 4, "ngIf"], [3, "ngSubmit", 4, "ngIf"], [1, "form-banner", "error"], [1, "drawer-loading"], [1, "catalog-spinner"], [3, "ngSubmit"], [1, "form-group"], ["type", "text", "name", "brand", "required", "", "placeholder", "Ej. HINO, TOYOTA, AUDI", 1, "brand-input", 3, "ngModelChange", "input", "ngModel"], ["type", "text", "name", "model", "required", "", "placeholder", "Ej. 616 LONG, Q3 Sportback", 3, "ngModelChange", "ngModel"], ["type", "number", "name", "year", "required", "", "min", "2010", "max", "2030", "placeholder", "Ej. 2026", 3, "ngModelChange", "ngModel"], [1, "currency-input-wrapper"], [1, "currency-symbol"], ["type", "number", "name", "suggestedPriceNet", "required", "", "min", "1", "placeholder", "Ej. 407900", 3, "ngModelChange", "ngModel"], [1, "toggle-group"], ["type", "button", 1, "toggle-btn", 3, "click"], [1, "drawer-actions"], ["type", "button", 1, "btn-cancel", 3, "click"], ["type", "submit", 1, "btn-confirm", 3, "disabled"], [1, "toast", 3, "click"], [1, "toast-icon"], [1, "toast-msg"], ["class", "toast-action", 4, "ngIf"], ["aria-label", "Cerrar", 1, "toast-close", 3, "click"], [1, "toast-action"]], template: function AdminVehiclesComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "span", 3);
      \u0275\u0275text(4, "Cat\xE1logo de veh\xEDculos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "h2");
      \u0275\u0275text(6, "Veh\xEDculos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "p");
      \u0275\u0275text(8, "Gestiona la lista de veh\xEDculos disponibles para cotizar. Los modelos ingresados aparecer\xE1n en las opciones de autocompletado del cotizador.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "button", 4);
      \u0275\u0275listener("click", function AdminVehiclesComponent_Template_button_click_9_listener() {
        return ctx.openNewVehicle();
      });
      \u0275\u0275elementStart(10, "span", 5);
      \u0275\u0275text(11, "+");
      \u0275\u0275elementEnd();
      \u0275\u0275text(12, " Nuevo Veh\xEDculo");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "div", 6)(14, "div", 7);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(15, "svg", 8);
      \u0275\u0275element(16, "circle", 9)(17, "line", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(18, "input", 11);
      \u0275\u0275twoWayListener("ngModelChange", function AdminVehiclesComponent_Template_input_ngModelChange_18_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
        return $event;
      });
      \u0275\u0275listener("input", function AdminVehiclesComponent_Template_input_input_18_listener() {
        return ctx.onSearch();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275template(19, AdminVehiclesComponent_button_19_Template, 2, 0, "button", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "label", 13);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(21, "svg", 14);
      \u0275\u0275element(22, "circle", 15)(23, "circle", 16)(24, "path", 17)(25, "path", 18)(26, "path", 19)(27, "path", 20);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(28, "select", 21);
      \u0275\u0275twoWayListener("ngModelChange", function AdminVehiclesComponent_Template_select_ngModelChange_28_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.brandFilter, $event) || (ctx.brandFilter = $event);
        return $event;
      });
      \u0275\u0275listener("change", function AdminVehiclesComponent_Template_select_change_28_listener() {
        return ctx.onSearch();
      });
      \u0275\u0275elementStart(29, "option", 22);
      \u0275\u0275text(30, "Todas las marcas");
      \u0275\u0275elementEnd();
      \u0275\u0275template(31, AdminVehiclesComponent_option_31_Template, 2, 2, "option", 23);
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "label", 13);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(33, "svg", 14);
      \u0275\u0275element(34, "rect", 24)(35, "path", 25)(36, "path", 26)(37, "path", 27)(38, "path", 28)(39, "path", 29)(40, "path", 30)(41, "path", 31)(42, "path", 32)(43, "path", 33);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(44, "select", 34);
      \u0275\u0275twoWayListener("ngModelChange", function AdminVehiclesComponent_Template_select_ngModelChange_44_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.yearFilter, $event) || (ctx.yearFilter = $event);
        return $event;
      });
      \u0275\u0275listener("change", function AdminVehiclesComponent_Template_select_change_44_listener() {
        return ctx.onSearch();
      });
      \u0275\u0275elementStart(45, "option", 22);
      \u0275\u0275text(46, "Todos los a\xF1os");
      \u0275\u0275elementEnd();
      \u0275\u0275template(47, AdminVehiclesComponent_option_47_Template, 2, 2, "option", 23);
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "label", 13);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(49, "svg", 14);
      \u0275\u0275element(50, "polygon", 35);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(51, "select", 36);
      \u0275\u0275twoWayListener("ngModelChange", function AdminVehiclesComponent_Template_select_ngModelChange_51_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.typeFilter, $event) || (ctx.typeFilter = $event);
        return $event;
      });
      \u0275\u0275listener("change", function AdminVehiclesComponent_Template_select_change_51_listener() {
        return ctx.onSearch();
      });
      \u0275\u0275elementStart(52, "option", 22);
      \u0275\u0275text(53, "Todos los tipos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(54, "option", 37);
      \u0275\u0275text(55, "H\xEDbridos / El\xE9ctricos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(56, "option", 38);
      \u0275\u0275text(57, "Combusti\xF3n");
      \u0275\u0275elementEnd()();
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275template(58, AdminVehiclesComponent_button_58_Template, 2, 0, "button", 39)(59, AdminVehiclesComponent_span_59_Template, 2, 1, "span", 40);
      \u0275\u0275elementEnd();
      \u0275\u0275template(60, AdminVehiclesComponent_div_60_Template, 2, 2, "div", 41)(61, AdminVehiclesComponent_div_61_Template, 17, 0, "div", 42)(62, AdminVehiclesComponent_div_62_Template, 7, 2, "div", 43);
      \u0275\u0275elementEnd();
      \u0275\u0275template(63, AdminVehiclesComponent_div_63_Template, 24, 0, "div", 44)(64, AdminVehiclesComponent_div_64_Template, 14, 6, "div", 45);
      \u0275\u0275elementStart(65, "div", 46);
      \u0275\u0275template(66, AdminVehiclesComponent_div_66_Template, 8, 5, "div", 47);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(18);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchTerm);
      \u0275\u0275control();
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.searchTerm);
      \u0275\u0275advance(9);
      \u0275\u0275twoWayProperty("ngModel", ctx.brandFilter);
      \u0275\u0275control();
      \u0275\u0275advance(3);
      \u0275\u0275property("ngForOf", ctx.brandOptions);
      \u0275\u0275advance(13);
      \u0275\u0275twoWayProperty("ngModel", ctx.yearFilter);
      \u0275\u0275control();
      \u0275\u0275advance(3);
      \u0275\u0275property("ngForOf", ctx.yearOptions);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.typeFilter);
      \u0275\u0275control();
      \u0275\u0275advance(7);
      \u0275\u0275property("ngIf", ctx.hasActiveFilters);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && ctx.filteredVehicles().length === 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && ctx.filteredVehicles().length > 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showConfirmModal);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showFormDrawer);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", ctx.toastService.toasts());
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinValidator, MaxValidator, NgModel, NgForm, LowerCasePipe], styles: ['\n.vehicles-container[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  background: var(--%NS%surface-subtle);\n  border: 0;\n  padding: 0;\n  box-shadow: none;\n}\n.vehicles-container[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 38%;\n  height: 190px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(32, 176, 56, 0.14),\n      rgba(16, 37, 31, 0.07));\n  clip-path: polygon(35% 0, 100% 0, 100% 100%, 0 100%);\n  pointer-events: none;\n  z-index: 0;\n}\n.vehicles-container[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1.25rem;\n  min-height: 164px;\n  margin: 0 0 1.25rem;\n  padding: 1.5rem 1.75rem;\n  border: 1px solid rgba(139, 226, 140, 0.22);\n  border-radius: 16px;\n  background:\n    linear-gradient(\n      115deg,\n      #10251f 0%,\n      #173c2e 68%,\n      #1f6840 100%);\n  box-shadow: 0 16px 30px rgba(16, 37, 31, 0.16);\n}\n.vehicles-container[_ngcontent-%COMP%]   .page-heading[_ngcontent-%COMP%] {\n  flex: 1 1 auto;\n  min-width: 0;\n  padding: 0;\n}\n.vehicles-container[_ngcontent-%COMP%]   .page-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0.25rem 0 0.35rem;\n  color: var(--%NS%text-on-accent);\n  font-size: 2rem;\n  line-height: 1;\n}\n.vehicles-container[_ngcontent-%COMP%]   .page-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  max-width: 420px;\n  margin: 0;\n  color: #bdd6c7;\n  font-size: 0.88rem;\n}\n.vehicles-container[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 2;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.4rem;\n  min-height: 44px;\n  margin-left: auto;\n  padding: 0.75rem 1rem;\n  border: 0;\n  border-radius: 9px;\n  background: var(--%NS%btn-primary-bg);\n  color: var(--%NS%btn-primary-text);\n  box-shadow: none;\n  white-space: nowrap;\n  cursor: pointer;\n  font-weight: 700;\n  font-size: 0.9rem;\n  transition: all 0.2s ease;\n}\n.vehicles-container[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%btn-primary-bg-hover);\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.16);\n}\n.vehicles-container[_ngcontent-%COMP%]   .toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 0.6rem;\n  margin: 0 0 1.25rem;\n  padding: 0.5rem 0.75rem;\n  border: 1px solid var(--%NS%border-color);\n  border-radius: 14px;\n  background: var(--%NS%surface-card);\n  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.05);\n}\n.vehicles-container[_ngcontent-%COMP%]   .search-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  flex: 1 1 200px;\n  display: flex;\n  align-items: center;\n}\n.vehicles-container[_ngcontent-%COMP%]   .search-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 0.65rem;\n  width: 16px;\n  height: 16px;\n  fill: none;\n  stroke: var(--%NS%accent-silver);\n  stroke-linecap: round;\n  stroke-linejoin: round;\n  stroke-width: 2;\n  pointer-events: none;\n}\n.vehicles-container[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 40px;\n  padding: 0.4rem 2rem 0.4rem 2.2rem;\n  border: 1px solid var(--%NS%input-border);\n  border-radius: 8px;\n  font-size: 0.9rem;\n  background: var(--%NS%surface-subtle);\n  color: var(--%NS%text-silver);\n  transition:\n    border-color 0.2s ease,\n    box-shadow 0.2s ease,\n    background 0.2s ease;\n}\n.vehicles-container[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%]::placeholder {\n  color: var(--%NS%accent-silver);\n}\n.vehicles-container[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--%NS%accent-green);\n  background: var(--%NS%surface-card);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.1);\n}\n.vehicles-container[_ngcontent-%COMP%]   .search-clear[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0.4rem;\n  width: 24px;\n  height: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 0;\n  border-radius: 50%;\n  background: transparent;\n  color: var(--%NS%accent-silver);\n  font-size: 1rem;\n  line-height: 1;\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n.vehicles-container[_ngcontent-%COMP%]   .search-clear[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%surface-hover);\n  color: var(--%NS%text-silver);\n}\n.vehicles-container[_ngcontent-%COMP%]   .toolbar-select[_ngcontent-%COMP%] {\n  position: relative;\n  flex: 0 0 auto;\n  display: flex;\n  align-items: center;\n}\n.vehicles-container[_ngcontent-%COMP%]   .toolbar-select[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 0.6rem;\n  width: 15px;\n  height: 15px;\n  fill: none;\n  stroke: var(--%NS%accent-silver);\n  stroke-linecap: round;\n  stroke-linejoin: round;\n  stroke-width: 2;\n  pointer-events: none;\n}\n.vehicles-container[_ngcontent-%COMP%]   .toolbar-select[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  min-height: 40px;\n  padding: 0.4rem 0.8rem 0.4rem 1.9rem;\n  border: 1px solid var(--%NS%input-border);\n  border-radius: 8px;\n  background: var(--%NS%surface-subtle);\n  color: var(--%NS%text-silver);\n  font-size: 0.85rem;\n  transition:\n    border-color 0.2s ease,\n    box-shadow 0.2s ease,\n    background 0.2s ease;\n  cursor: pointer;\n  appearance: none;\n  -webkit-appearance: none;\n}\n.vehicles-container[_ngcontent-%COMP%]   .toolbar-select[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--%NS%accent-green);\n  background: var(--%NS%surface-card);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.1);\n}\n.vehicles-container[_ngcontent-%COMP%]   .filter-reset[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  min-height: 40px;\n  padding: 0.4rem 0.8rem;\n  border: 1px solid var(--%NS%border-color);\n  border-radius: 8px;\n  background: var(--%NS%surface-card);\n  color: var(--%NS%text-silver);\n  font-size: 0.85rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  white-space: nowrap;\n}\n.vehicles-container[_ngcontent-%COMP%]   .filter-reset[_ngcontent-%COMP%]:hover {\n  border-color: var(--%NS%accent-green);\n  color: var(--%NS%accent-green);\n  background: var(--%NS%accent-green-light);\n}\n.vehicles-container[_ngcontent-%COMP%]   .results-count[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  margin-left: auto;\n  padding: 0.35rem 0.65rem;\n  border-radius: 999px;\n  background: var(--%NS%surface-hover);\n  color: var(--%NS%text-silver);\n  font-size: 0.8rem;\n  font-weight: 600;\n  white-space: nowrap;\n}\n.vehicles-container[_ngcontent-%COMP%]   .table-wrapper[_ngcontent-%COMP%] {\n  border: 1px solid var(--%NS%border-color);\n  border-radius: 11px;\n  overflow: auto;\n  background: var(--%NS%surface-card);\n  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.04);\n}\n.vehicles-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {\n  min-width: 640px;\n}\n.vehicles-container[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 0.85rem 1rem;\n  background: var(--%NS%surface-subtle);\n  color: var(--%NS%text-muted);\n  font-size: 0.72rem;\n  letter-spacing: 0.55px;\n  text-transform: uppercase;\n}\n.vehicles-container[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 0.95rem 1rem;\n  color: var(--%NS%text-silver);\n  border-bottom-color: var(--%NS%border-color);\n}\n.vehicles-container[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: 0;\n}\n.vehicles-container[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: #f8fcf9;\n}\n.vehicles-container[_ngcontent-%COMP%]   .status-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.3rem;\n  padding: 0.28rem 0.55rem;\n  border: 1px solid transparent;\n  border-radius: 999px;\n  font-size: 0.64rem;\n  font-weight: 700;\n  letter-spacing: 0.2px;\n  white-space: nowrap;\n}\n.vehicles-container[_ngcontent-%COMP%]   .status-badge[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 12px;\n  height: 12px;\n  flex-shrink: 0;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 2;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.status-hybrid[_ngcontent-%COMP%] {\n  background: #e0f2fe;\n  color: #0369a1;\n  border-color: #bae6fd;\n}\n.status-combustion[_ngcontent-%COMP%] {\n  background: var(--%NS%surface-hover);\n  color: var(--%NS%text-silver);\n  border-color: var(--%NS%border-color);\n}\n.vehicles-container[_ngcontent-%COMP%]   .btn-icon[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border: 1px solid transparent;\n  background: var(--%NS%surface-subtle);\n}\n.vehicles-container[_ngcontent-%COMP%]   .btn-icon[_ngcontent-%COMP%]:hover {\n  border-color: var(--%NS%input-border);\n  background: var(--%NS%surface-card);\n  transform: translateY(-1px);\n}\n.vehicles-container[_ngcontent-%COMP%]   .btn-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n  fill: none;\n  stroke: currentColor;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n  stroke-width: 1.8;\n}\n.vehicles-container[_ngcontent-%COMP%]   .btn-delete[_ngcontent-%COMP%]:hover {\n  color: var(--%NS%danger-bright);\n  background: var(--%NS%danger-bg);\n}\n.vehicles-container[_ngcontent-%COMP%]   .btn-edit[_ngcontent-%COMP%]:hover {\n  color: var(--%NS%info);\n}\n.page-kicker[_ngcontent-%COMP%] {\n  color: #8be28c;\n  font-size: 0.68rem;\n  font-weight: 700;\n  letter-spacing: 1.2px;\n  text-transform: uppercase;\n}\n.action-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.3rem;\n}\n.loading[_ngcontent-%COMP%], \n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 2rem;\n  color: var(--%NS%text-muted);\n}\n.empty-state[_ngcontent-%COMP%] {\n  font-style: italic;\n}\n.vehicle-catalog[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 170px minmax(0, 1fr);\n  gap: 1.25rem;\n  align-items: start;\n}\n.brand-index[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 1.25rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.15rem;\n  padding: 1rem 0.75rem;\n  border: 1px solid var(--%NS%border-color);\n  border-radius: 12px;\n  background: var(--%NS%surface-card);\n  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.04);\n}\n.index-label[_ngcontent-%COMP%] {\n  margin: 0 0 0.55rem 0.55rem;\n  color: var(--%NS%accent-silver);\n  font-size: 0.68rem;\n  font-weight: 700;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n}\n.brand-index[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  width: 100%;\n  border: 0;\n  justify-content: space-between;\n  gap: 0.5rem;\n  padding: 0.55rem;\n  border-radius: 7px;\n  color: var(--%NS%text-silver);\n  background: transparent;\n  font-size: 0.8rem;\n  font-weight: 700;\n  font-family: inherit;\n  text-align: left;\n  cursor: pointer;\n  text-decoration: none;\n  transition: background-color 0.2s ease, color 0.2s ease;\n}\n.brand-index[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: var(--%NS%accent-silver);\n  font-size: 0.7rem;\n}\n.brand-index[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%accent-green-light);\n  color: var(--%NS%accent-green-dark);\n}\n.brand-sections[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n  min-width: 0;\n}\n.brand-section[_ngcontent-%COMP%] {\n  scroll-margin-top: 1.25rem;\n}\n.brand-heading[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: end;\n  justify-content: space-between;\n  gap: 1rem;\n  margin-bottom: 0.7rem;\n  padding: 0 0.25rem;\n  border-bottom: 1px solid var(--%NS%input-border);\n}\n.brand-kicker[_ngcontent-%COMP%] {\n  color: var(--%NS%accent-green-dark);\n  font-size: 0.65rem;\n  font-weight: 700;\n  letter-spacing: 1.1px;\n  text-transform: uppercase;\n}\n.brand-heading[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0.2rem 0 0.65rem;\n  color: var(--%NS%btn-primary-text);\n  font-size: 1.35rem;\n  line-height: 1;\n}\n.brand-count[_ngcontent-%COMP%] {\n  padding-bottom: 0.7rem;\n  color: var(--%NS%text-muted);\n  font-size: 0.75rem;\n}\n.vehicle-cards[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(245px, 1fr));\n  gap: 0.85rem;\n}\n.vehicle-card[_ngcontent-%COMP%] {\n  min-width: 0;\n  padding: 1rem;\n  border: 1px solid var(--%NS%input-border);\n  border-top: 3px solid var(--%NS%accent-green);\n  border-radius: 10px;\n  background:\n    linear-gradient(\n      145deg,\n      var(--%NS%surface-card) 0%,\n      var(--%NS%surface-card) 72%,\n      var(--%NS%accent-green-light) 100%);\n  box-shadow: 0 7px 18px rgba(15, 23, 42, 0.035);\n  transition:\n    border-color 0.2s ease,\n    box-shadow 0.2s ease,\n    transform 0.2s ease;\n}\n.vehicle-card[_ngcontent-%COMP%]:hover {\n  border-color: rgba(32, 176, 56, 0.42);\n  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.07);\n  transform: translateY(-2px);\n}\n.vehicle-card[_ngcontent-%COMP%]:nth-child(3n+2) {\n  border-top-color: #65a30d;\n}\n.vehicle-card[_ngcontent-%COMP%]:nth-child(3n+3) {\n  border-top-color: #0f766e;\n}\n.vehicle-card-head[_ngcontent-%COMP%], \n.vehicle-card-footer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n}\n.vehicle-year[_ngcontent-%COMP%] {\n  color: var(--%NS%accent-green-dark);\n  font-size: 0.75rem;\n  font-weight: 800;\n}\n.vehicle-card[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 1rem 0 0.25rem;\n  overflow: hidden;\n  color: var(--%NS%btn-primary-text);\n  font-size: 1.05rem;\n  line-height: 1.3;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.vehicle-reference[_ngcontent-%COMP%] {\n  display: block;\n  color: var(--%NS%accent-silver);\n  font-size: 0.7rem;\n}\n.vehicle-price[_ngcontent-%COMP%] {\n  display: block;\n  margin: 0.25rem 0 1rem;\n  color: var(--%NS%accent-green-dark);\n  font-size: 1.2rem;\n}\n.vehicle-card-footer[_ngcontent-%COMP%] {\n  justify-content: flex-end;\n  padding-top: 0.75rem;\n  border-top: 1px solid var(--%NS%border-color);\n}\n.catalog-state[_ngcontent-%COMP%] {\n  min-height: 170px;\n  padding: 2rem;\n  border: 1px dashed var(--%NS%border-strong);\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.7);\n  box-sizing: border-box;\n  color: var(--%NS%text-muted);\n  text-align: center;\n}\n.catalog-state.loading[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n}\n.button-icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 20px;\n  height: 20px;\n  margin-right: 0.25rem;\n  border: 1px solid rgba(16, 37, 31, 0.25);\n  border-radius: 50%;\n  font-size: 1rem;\n  line-height: 1;\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 3500;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 1.25rem;\n  background: rgba(15, 23, 42, 0.55);\n  -webkit-backdrop-filter: blur(3px);\n  backdrop-filter: blur(3px);\n  animation: _ngcontent-%COMP%_fadeIn 0.2s ease;\n}\n.modal-content[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 470px;\n  max-height: 90vh;\n  overflow-y: auto;\n  padding: 1.5rem;\n  border-radius: 18px;\n  background: var(--%NS%surface-card);\n  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.25);\n  animation: _ngcontent-%COMP%_riseIn 0.25s ease;\n}\n.modal-content[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin-top: 0;\n  font-family: "Fjalla One", sans-serif;\n  font-size: 1.3rem;\n}\n.modal-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.6rem;\n  margin-top: 1.25rem;\n}\n.btn-cancel[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 44px;\n  padding: 0.6rem 1rem;\n  border: 1.5px solid var(--%NS%border-color);\n  border-radius: 9px;\n  background: var(--%NS%surface-card);\n  color: var(--%NS%text-silver);\n  font-weight: 600;\n  font-size: 0.9rem;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.btn-cancel[_ngcontent-%COMP%]:hover {\n  border-color: var(--%NS%border-strong);\n  background: var(--%NS%surface-subtle);\n}\n.btn-confirm[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 44px;\n  padding: 0.6rem 1rem;\n  border: 0;\n  border-radius: 9px;\n  background:\n    linear-gradient(\n      135deg,\n      var(--%NS%accent-green),\n      var(--%NS%accent-green-dark));\n  color: var(--%NS%text-on-accent);\n  font-weight: 700;\n  font-size: 0.9rem;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  box-shadow: 0 4px 12px rgba(32, 176, 56, 0.25);\n}\n.btn-confirm[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 6px 18px rgba(32, 176, 56, 0.35);\n  transform: translateY(-1px);\n}\n.btn-confirm[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none;\n  box-shadow: none;\n}\n.vehicles-container[_ngcontent-%COMP%]   .btn-cancel[_ngcontent-%COMP%]:focus-visible, \n.vehicles-container[_ngcontent-%COMP%]   .btn-confirm[_ngcontent-%COMP%]:focus-visible, \n.vehicles-container[_ngcontent-%COMP%]   .btn-icon[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--%NS%accent-green);\n  outline-offset: 2px;\n}\n.form-banner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.45rem;\n  margin-bottom: 0.9rem;\n  padding: 0.65rem 0.8rem;\n  border-radius: 9px;\n  font-size: 0.85rem;\n  font-weight: 600;\n}\n.form-banner.error[_ngcontent-%COMP%] {\n  border: 1px solid #fecaca;\n  background: var(--%NS%danger-bg);\n  color: var(--%NS%danger);\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 0.95rem;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 0.3rem;\n  color: var(--%NS%text-silver);\n  font-size: 0.78rem;\n  font-weight: 800;\n  letter-spacing: 0.4px;\n  text-transform: uppercase;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 44px;\n  padding: 0.55rem 0.75rem;\n  border: 1.5px solid var(--%NS%input-border);\n  border-radius: 9px;\n  background: var(--%NS%surface-card);\n  color: var(--%NS%text-silver);\n  font-size: 0.9rem;\n  font-family: inherit;\n  box-sizing: border-box;\n  transition: border-color 0.2s ease, box-shadow 0.2s ease;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--%NS%accent-green);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.12);\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:disabled {\n  background: var(--%NS%surface-hover);\n  cursor: not-allowed;\n}\n.form-group[_ngcontent-%COMP%]   .brand-input[_ngcontent-%COMP%] {\n  text-transform: uppercase;\n}\n.form-group[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 0.3rem;\n  color: var(--%NS%accent-silver);\n  font-size: 0.74rem;\n  line-height: 1.4;\n}\n.modal-heading[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.8rem;\n  margin-bottom: 1rem;\n}\n.modal-heading[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0.15rem 0 0;\n  color: var(--%NS%text-main);\n  font-size: 1.35rem;\n}\n.modal-eyebrow[_ngcontent-%COMP%] {\n  display: block;\n  color: var(--%NS%accent-silver);\n  font-size: 0.66rem;\n  font-weight: 700;\n  letter-spacing: 0.9px;\n  text-transform: uppercase;\n}\n.modal-icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 42px;\n  height: 42px;\n  flex-shrink: 0;\n  border-radius: 12px;\n}\n.modal-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 21px;\n  height: 21px;\n  fill: none;\n  stroke: currentColor;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n  stroke-width: 1.8;\n}\n.modal-heading-warning[_ngcontent-%COMP%]   .modal-icon[_ngcontent-%COMP%] {\n  background: var(--%NS%warning-bg);\n  color: var(--%NS%warning);\n}\n.modal-content[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  color: var(--%NS%text-muted);\n  font-size: 0.92rem;\n  line-height: 1.6;\n}\n.warning-copy[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.45rem;\n  margin: 0.7rem 0;\n  padding: 0.7rem 0.8rem;\n  border: 1px solid #fed7aa;\n  border-radius: 9px;\n  background: var(--%NS%warning-bg);\n  color: var(--%NS%warning);\n  font-weight: 600;\n}\n.warning-copy[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 17px;\n  height: 17px;\n  flex-shrink: 0;\n}\n.currency-input-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.currency-symbol[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 0.7rem;\n  color: var(--%NS%text-muted);\n  font-weight: 700;\n  pointer-events: none;\n}\n.currency-input-wrapper[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  padding-left: 2rem;\n}\n.toggle-group[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n}\n.toggle-btn[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 0.5rem 0.75rem;\n  border: 1px solid var(--%NS%border-strong);\n  border-radius: 8px;\n  background: var(--%NS%surface-subtle);\n  font-size: 0.8rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n  text-align: center;\n}\n.toggle-btn.active[_ngcontent-%COMP%] {\n  background: #bbf7d0;\n  color: var(--%NS%accent-green-dark);\n  border-color: #86efac;\n}\n.toggle-btn[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%surface-hover);\n}\n.drawer-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 3000;\n  background: rgba(15, 23, 42, 0.55);\n  -webkit-backdrop-filter: blur(3px);\n  backdrop-filter: blur(3px);\n  animation: _ngcontent-%COMP%_fadeIn 0.2s ease;\n}\n.drawer[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 3001;\n  display: flex;\n  flex-direction: column;\n  width: min(560px, 92vw);\n  background: var(--%NS%surface-card);\n  box-shadow: -20px 0 50px rgba(15, 23, 42, 0.25);\n  animation: _ngcontent-%COMP%_drawerIn 0.28s ease;\n}\n.form-drawer[_ngcontent-%COMP%] {\n  width: min(560px, 92vw);\n}\n.drawer-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 1.25rem 1.5rem 1rem;\n  border-bottom: 1px solid var(--%NS%border-color);\n  background:\n    linear-gradient(\n      135deg,\n      #10251f,\n      #1f6840);\n}\n.drawer-header[_ngcontent-%COMP%]   .page-kicker[_ngcontent-%COMP%] {\n  color: #8be28c;\n  font-size: 0.66rem;\n  font-weight: 700;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n}\n.drawer-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0.25rem 0 0;\n  color: var(--%NS%text-on-accent);\n  font-family: "Fjalla One", sans-serif;\n  font-size: 1.3rem;\n}\n.drawer-close[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 34px;\n  height: 34px;\n  flex-shrink: 0;\n  border: 0;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, 0.12);\n  color: var(--%NS%text-on-accent);\n  font-size: 1.4rem;\n  line-height: 1;\n  cursor: pointer;\n  transition: background 0.2s ease, transform 0.2s ease;\n}\n.drawer-close[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.24);\n  transform: rotate(90deg);\n}\n.drawer-body[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1.25rem 1.5rem 1.5rem;\n}\n.drawer-loading[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  gap: 0.75rem;\n  padding: 2.5rem 1rem;\n  color: var(--%NS%text-muted);\n  font-size: 0.88rem;\n}\n.drawer-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.6rem;\n  margin-top: 1.25rem;\n  padding-top: 1rem;\n  border-top: 1px solid var(--%NS%border-color);\n}\n.drawer-actions[_ngcontent-%COMP%]   .btn-cancel[_ngcontent-%COMP%], \n.drawer-actions[_ngcontent-%COMP%]   .btn-confirm[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.catalog-spinner[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border: 3px solid var(--%NS%border-color);\n  border-top-color: var(--%NS%accent-green);\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n}\n.skeleton-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(245px, 1fr));\n  gap: 0.85rem;\n}\n.skeleton-card[_ngcontent-%COMP%] {\n  height: 150px;\n  border-radius: 10px;\n  background:\n    linear-gradient(\n      100deg,\n      var(--%NS%surface-muted) 40%,\n      var(--%NS%surface-subtle) 50%,\n      var(--%NS%surface-muted) 60%);\n  background-size: 200% 100%;\n  animation: _ngcontent-%COMP%_shimmer 1.4s ease-in-out infinite;\n}\n.empty-state-icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 56px;\n  height: 56px;\n  margin-bottom: 0.9rem;\n  border-radius: 16px;\n  background: var(--%NS%accent-green-light);\n  color: var(--%NS%accent-green);\n}\n.empty-state-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  fill: none;\n  stroke: currentColor;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n  stroke-width: 1.6;\n}\n.empty-state-title[_ngcontent-%COMP%] {\n  margin: 0 0 0.4rem;\n  color: var(--%NS%btn-primary-text);\n  font-size: 1.05rem;\n  font-style: normal;\n  font-weight: 700;\n}\n.empty-state-text[_ngcontent-%COMP%] {\n  max-width: 380px;\n  margin: 0 auto 1.1rem;\n  color: var(--%NS%accent-silver);\n  font-size: 0.88rem;\n  font-style: normal;\n  line-height: 1.55;\n}\n.empty-state[_ngcontent-%COMP%]   .btn-add-vehicle[_ngcontent-%COMP%] {\n  margin: 0 auto;\n}\n.toast-host[_ngcontent-%COMP%] {\n  position: fixed;\n  z-index: 4000;\n  right: 1.1rem;\n  bottom: 1.1rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.6rem;\n  max-width: 400px;\n}\n.toast[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  padding: 0.75rem 0.9rem;\n  border-radius: 12px;\n  background: var(--%NS%text-main);\n  color: var(--%NS%surface-card);\n  font-size: 0.86rem;\n  box-shadow: 0 16px 34px -10px rgba(15, 23, 42, 0.35);\n  animation: _ngcontent-%COMP%_toastIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);\n  cursor: pointer;\n}\n.toast-success[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #14532d,\n      var(--%NS%accent-green-dark));\n}\n.toast-error[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #7f1d1d,\n      var(--%NS%danger));\n}\n.toast-info[_ngcontent-%COMP%] {\n  background: var(--%NS%text-main);\n}\n.toast-icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 22px;\n  height: 22px;\n  flex-shrink: 0;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, 0.18);\n  font-size: 0.75rem;\n  font-weight: 800;\n}\n.toast-msg[_ngcontent-%COMP%] {\n  flex: 1;\n  line-height: 1.35;\n}\n.toast-action[_ngcontent-%COMP%] {\n  padding: 0.28rem 0.65rem;\n  border-radius: 8px;\n  background: var(--%NS%surface-card);\n  color: var(--%NS%accent-green-dark);\n  font-size: 0.75rem;\n  font-weight: 800;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  white-space: nowrap;\n}\n.toast-close[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 22px;\n  height: 22px;\n  border: 0;\n  border-radius: 50%;\n  background: transparent;\n  color: rgba(255, 255, 255, 0.75);\n  font-size: 1rem;\n  cursor: pointer;\n}\n.toast-close[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.15);\n  color: var(--%NS%surface-card);\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_riseIn {\n  from {\n    opacity: 0;\n    transform: translateY(14px) scale(0.98);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n@keyframes _ngcontent-%COMP%_drawerIn {\n  from {\n    transform: translateX(100%);\n  }\n  to {\n    transform: translateX(0);\n  }\n}\n@keyframes _ngcontent-%COMP%_shimmer {\n  0% {\n    background-position: 200% 0;\n  }\n  100% {\n    background-position: -200% 0;\n  }\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@keyframes _ngcontent-%COMP%_toastIn {\n  from {\n    opacity: 0;\n    transform: translateY(14px) scale(0.97);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n@media (max-width: 768px) {\n  .vehicles-container[_ngcontent-%COMP%] {\n    padding: 1rem;\n    border-radius: 12px;\n  }\n  .vehicles-container[_ngcontent-%COMP%]   .toolbar[_ngcontent-%COMP%] {\n    align-items: stretch;\n    flex-direction: column;\n    padding: 0.85rem 1rem;\n    gap: 0.75rem;\n  }\n  .vehicles-container[_ngcontent-%COMP%]   .search-wrapper[_ngcontent-%COMP%] {\n    flex: 0 0 auto;\n    width: 100%;\n  }\n  .vehicles-container[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%], \n   .vehicles-container[_ngcontent-%COMP%]   .toolbar-select[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n    font-size: 1rem;\n  }\n  .vehicles-container[_ngcontent-%COMP%]   .toolbar-select[_ngcontent-%COMP%] {\n    flex: 0 0 auto;\n    width: 100%;\n  }\n  .vehicles-container[_ngcontent-%COMP%]   .toolbar-select[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n   .vehicles-container[_ngcontent-%COMP%]   .filter-reset[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .vehicles-container[_ngcontent-%COMP%]   .results-count[_ngcontent-%COMP%] {\n    margin-left: 0;\n    align-self: flex-end;\n  }\n  .skeleton-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .drawer[_ngcontent-%COMP%] {\n    width: 100vw;\n  }\n  .drawer-body[_ngcontent-%COMP%] {\n    padding: 1rem 1.1rem 1.25rem;\n  }\n  .drawer-actions[_ngcontent-%COMP%] {\n    flex-direction: column-reverse;\n  }\n  .drawer-actions[_ngcontent-%COMP%]   .btn-cancel[_ngcontent-%COMP%], \n   .drawer-actions[_ngcontent-%COMP%]   .btn-confirm[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .vehicles-container[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: stretch;\n    flex-direction: column;\n    gap: 0.85rem;\n  }\n  .vehicles-container[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%] {\n    justify-content: center;\n    width: 100%;\n  }\n  .vehicle-catalog[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .brand-index[_ngcontent-%COMP%] {\n    position: static;\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));\n    gap: 0.2rem;\n  }\n  .index-label[_ngcontent-%COMP%] {\n    grid-column: 1 / -1;\n  }\n  .vehicles-container[_ngcontent-%COMP%]   .btn-icon[_ngcontent-%COMP%] {\n    width: 40px;\n    height: 40px;\n  }\n}\n@media (max-width: 600px) {\n  .toggle-group[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n.vehicles-container[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%]:not(.modal-overlay):not(.drawer-overlay):not(.toast-host) {\n  position: relative;\n  z-index: 1;\n}\n/*# sourceMappingURL=admin-vehicles.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminVehiclesComponent, [{
    type: Component,
    args: [{ selector: "app-admin-vehicles", standalone: true, imports: [CommonModule, FormsModule], template: `<div class="vehicles-container">\r
    <div class="page-header">\r
        <div class="page-heading">\r
            <span class="page-kicker">Cat\xE1logo de veh\xEDculos</span>\r
            <h2>Veh\xEDculos</h2>\r
            <p>Gestiona la lista de veh\xEDculos disponibles para cotizar. Los modelos ingresados aparecer\xE1n en las opciones de autocompletado del cotizador.</p>\r
        </div>\r
        <button class="btn-primary" (click)="openNewVehicle()"><span class="button-icon">+</span> Nuevo Veh\xEDculo</button>\r
    </div>\r
\r
    <!-- TOOLBAR: B\xDASQUEDA + FILTROS -->\r
    <div class="toolbar">\r
        <div class="search-wrapper">\r
            <svg class="search-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>\r
            <input type="text" [(ngModel)]="searchTerm" (input)="onSearch()" placeholder="Buscar por marca o modelo"\r
                class="search-input" />\r
            <button *ngIf="searchTerm" type="button" class="search-clear" (click)="searchTerm=''; onSearch()"\r
                aria-label="Limpiar b\xFAsqueda">\xD7</button>\r
        </div>\r
\r
        <label class="toolbar-select">\r
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="7" cy="17" r="2"></circle><circle cx="17" cy="17" r="2"></circle><path d="M9.3 17H6V6h5v11z"></path><path d="M8 10h6"></path><path d="M4 6V4"></path><path d="M15 6V4"></path></svg>\r
            <select [(ngModel)]="brandFilter" (change)="onSearch()" name="brandFilter" aria-label="Filtrar por marca">\r
                <option value="all">Todas las marcas</option>\r
                <option *ngFor="let brand of brandOptions" [value]="brand">{{ brand }}</option>\r
            </select>\r
        </label>\r
\r
        <label class="toolbar-select">\r
            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"></rect><path d="M16 2v4"></path><path d="M8 2v4"></path><path d="M3 10h18"></path><path d="M8 14h.01"></path><path d="M12 14h.01"></path><path d="M16 14h.01"></path><path d="M8 18h.01"></path><path d="M12 18h.01"></path><path d="M16 18h.01"></path></svg>\r
            <select [(ngModel)]="yearFilter" (change)="onSearch()" name="yearFilter" aria-label="Filtrar por a\xF1o">\r
                <option value="all">Todos los a\xF1os</option>\r
                <option *ngFor="let year of yearOptions" [value]="year">{{ year }}</option>\r
            </select>\r
        </label>\r
\r
        <label class="toolbar-select">\r
            <svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>\r
            <select [(ngModel)]="typeFilter" (change)="onSearch()" name="typeFilter" aria-label="Filtrar por tipo">\r
                <option value="all">Todos los tipos</option>\r
                <option value="hybrid">H\xEDbridos / El\xE9ctricos</option>\r
                <option value="combustion">Combusti\xF3n</option>\r
            </select>\r
        </label>\r
\r
        <button *ngIf="hasActiveFilters" type="button" class="filter-reset" (click)="resetFilters()">Limpiar filtros</button>\r
        <span class="results-count" *ngIf="!loading">{{ filteredVehicles().length }} veh\xEDculo(s)</span>\r
    </div>\r
\r
    <!-- ESTADO DE CARGA: Skeleton -->\r
    <div *ngIf="loading" class="skeleton-grid" aria-label="Cargando veh\xEDculos">\r
        <div class="skeleton-card" *ngFor="let _ of [1,2,3,4,5,6]"></div>\r
    </div>\r
\r
    <!-- ESTADO VAC\xCDO -->\r
    <div *ngIf="!loading && filteredVehicles().length === 0" class="empty-state catalog-state">\r
        <div class="empty-state-icon">\r
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="7" cy="17" r="2"></circle><circle cx="17" cy="17" r="2"></circle><path d="M9.3 17H6V6h5v11z"></path><path d="M8 10h6"></path><path d="M4 6V4"></path><path d="M15 6V4"></path></svg>\r
        </div>\r
        <h3 class="empty-state-title">No hay veh\xEDculos disponibles</h3>\r
        <p class="empty-state-text">A\xF1ade un veh\xEDculo para que aparezca en las opciones de autocompletado del cotizador.</p>\r
        <button class="btn-primary btn-add-vehicle" (click)="openNewVehicle()">\r
            <span class="button-icon">+</span> Crear primer veh\xEDculo\r
        </button>\r
    </div>\r
\r
    <div class="vehicle-catalog" *ngIf="!loading && filteredVehicles().length > 0">\r
        <aside class="brand-index" aria-label="Marcas del cat\xE1logo">\r
            <span class="index-label">Marcas</span>\r
            <button *ngFor="let group of brandGroups" type="button" (click)="scrollToBrand(group.brand)">\r
                {{ group.brand }} <span>{{ group.vehicles.length }}</span>\r
            </button>\r
        </aside>\r
\r
        <div class="brand-sections">\r
            <section class="brand-section" *ngFor="let group of brandGroups" [id]="'brand-' + (group.brand | lowercase)">\r
                <div class="brand-heading">\r
                    <div>\r
                        <span class="brand-kicker">Marca</span>\r
                        <h3>{{ group.brand }}</h3>\r
                    </div>\r
                    <span class="brand-count">{{ group.vehicles.length }} modelo{{ group.vehicles.length === 1 ? '' : 's' }}</span>\r
                </div>\r
\r
                <div class="vehicle-cards">\r
                    <article class="vehicle-card" *ngFor="let vehicle of group.vehicles">\r
                        <div class="vehicle-card-head">\r
                            <span class="vehicle-year">{{ vehicle.year }}</span>\r
                            <span class="status-badge" [class]="getHybridClass(vehicle.isHybridOrElectric)"\r
                                [title]="getHybridTooltip(vehicle.isHybridOrElectric)">\r
                                <svg *ngIf="vehicle.isHybridOrElectric" viewBox="0 0 24 24" aria-hidden="true">\r
                                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>\r
                                </svg>\r
                                <svg *ngIf="!vehicle.isHybridOrElectric" viewBox="0 0 24 24" aria-hidden="true">\r
                                    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>\r
                                </svg>\r
                                {{ getHybridLabel(vehicle.isHybridOrElectric) }}\r
                            </span>\r
                        </div>\r
                        <h4>{{ vehicle.model }}</h4>\r
                        <span class="vehicle-reference">Precio sugerido de lista</span>\r
                        <strong class="vehicle-price">{{ formatPrice(vehicle.suggestedPriceNet) }}</strong>\r
                        <div class="vehicle-card-footer">\r
                            <div class="action-buttons">\r
                                <button class="btn-icon btn-edit" (click)="openEditVehicle(vehicle)" title="Editar" aria-label="Editar veh\xEDculo">\r
                                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg>\r
                                </button>\r
                                <button class="btn-icon btn-delete" (click)="deleteVehicle(vehicle.id)"\r
                                    title="Eliminar" aria-label="Eliminar veh\xEDculo">\r
                                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="M19 6l-1 14H6L5 6"></path><path d="M10 11v5"></path><path d="M14 11v5"></path></svg>\r
                                </button>\r
                            </div>\r
                        </div>\r
                    </article>\r
                </div>\r
            </section>\r
        </div>\r
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
        <p>\xBFEst\xE1s seguro de eliminar este veh\xEDculo?</p>\r
        <p class="warning-copy"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.3 3.9 2.4 18h15.2l-3.1-6.2"></path></svg> Este veh\xEDculo desaparecer\xE1 del cat\xE1logo de autocompletado del cotizador.</p>\r
        <div class="modal-actions">\r
            <button class="btn-cancel" (click)="cancelModal()">Cancelar</button>\r
            <button class="btn-confirm" (click)="confirmActionHandler()">Eliminar</button>\r
        </div>\r
    </div>\r
</div>\r
\r
<!-- DRAWER LATERAL: FORMULARIO CREAR/EDITAR VEH\xCDCULO -->\r
<div class="drawer-overlay" *ngIf="showFormDrawer" (click)="closeFormDrawer()">\r
    <aside class="drawer form-drawer" (click)="$event.stopPropagation()" role="dialog"\r
        [attr.aria-label]="isEditMode ? 'Editar veh\xEDculo' : 'Nuevo veh\xEDculo'">\r
        <div class="drawer-header">\r
            <div>\r
                <span class="page-kicker">{{ isEditMode ? 'Edici\xF3n de veh\xEDculo' : 'Nuevo registro' }}</span>\r
                <h3>{{ isEditMode ? 'Editar Veh\xEDculo' : 'Nuevo Veh\xEDculo' }}</h3>\r
            </div>\r
            <button class="drawer-close" (click)="closeFormDrawer()" aria-label="Cerrar formulario">\xD7</button>\r
        </div>\r
\r
        <div class="drawer-body">\r
            <div *ngIf="formError" class="form-banner error">{{ formError }}</div>\r
            <div *ngIf="formLoading" class="drawer-loading">\r
                <div class="catalog-spinner"></div>\r
                <span>Guardando...</span>\r
            </div>\r
\r
            <form (ngSubmit)="submitForm()" *ngIf="!formLoading">\r
                <!-- Marca -->\r
                <div class="form-group">\r
                    <label>Marca *</label>\r
                    <input type="text" class="brand-input" [(ngModel)]="vehicleForm.brand" name="brand" required\r
                        placeholder="Ej. HINO, TOYOTA, AUDI" (input)="onBrandInput($event)" />\r
                    <small>El nombre de la marca se escribe siempre en MAY\xDASCULAS para evitar marcas duplicadas.</small>\r
                </div>\r
\r
                <!-- Modelo -->\r
                <div class="form-group">\r
                    <label>Modelo *</label>\r
                    <input type="text" [(ngModel)]="vehicleForm.model" name="model" required\r
                        placeholder="Ej. 616 LONG, Q3 Sportback" />\r
                </div>\r
\r
                <!-- A\xF1o -->\r
                <div class="form-group">\r
                    <label>A\xF1o Modelo *</label>\r
                    <input type="number" [(ngModel)]="vehicleForm.year" name="year" required\r
                        min="2010" max="2030" placeholder="Ej. 2026" />\r
                    <small>A\xF1o del veh\xEDculo. Valores menores a 2024 se consideran seminuevos.</small>\r
                </div>\r
\r
                <!-- Precio Neto -->\r
                <div class="form-group">\r
                    <label>Precio Neto (con IVA) *</label>\r
                    <div class="currency-input-wrapper">\r
                        <span class="currency-symbol">$</span>\r
                        <input type="number" [(ngModel)]="vehicleForm.suggestedPriceNet"\r
                            name="suggestedPriceNet" required min="1" placeholder="Ej. 407900" />\r
                    </div>\r
                    <small>Precio de lista del veh\xEDculo. Este valor aparece preseleccionado en el cotizador.</small>\r
                </div>\r
\r
                <!-- H\xEDbrido / El\xE9ctrico -->\r
                <div class="form-group">\r
                    <label>\xBFEs h\xEDbrido o el\xE9ctrico?</label>\r
                    <div class="toggle-group">\r
                        <button type="button" class="toggle-btn"\r
                            [class.active]="!vehicleForm.isHybridOrElectric"\r
                            (click)="vehicleForm.isHybridOrElectric = false">\r
                            No (Renta b\xE1sica $6,000 + IVA)</button>\r
                        <button type="button" class="toggle-btn"\r
                            [class.active]="vehicleForm.isHybridOrElectric"\r
                            (click)="vehicleForm.isHybridOrElectric = true">\r
                            S\xED (Renta b\xE1sica $8,550 + IVA)</button>\r
                    </div>\r
                    <small>Este atributo afecta el c\xE1lculo de la renta mensual b\xE1sica.</small>\r
                </div>\r
\r
                <div class="drawer-actions">\r
                    <button type="button" class="btn-cancel" (click)="closeFormDrawer()">Cancelar</button>\r
                    <button type="submit" class="btn-confirm" [disabled]="formLoading">\r
                        {{ isEditMode ? 'Actualizar' : 'Crear' }}\r
                    </button>\r
                </div>\r
            </form>\r
        </div>\r
    </aside>\r
</div>\r
\r
<!-- TOAST HOST -->\r
<div class="toast-host">\r
    <div *ngFor="let t of toastService.toasts()" class="toast" [class]="'toast-' + t.type"\r
        (click)="handleToast(t)">\r
        <span class="toast-icon">{{ t.type === 'success' ? '\u2713' : t.type === 'error' ? '\u2715' : '\u2139' }}</span>\r
        <span class="toast-msg">{{ t.message }}</span>\r
        <span class="toast-action" *ngIf="t.actionLabel">{{ t.actionLabel }}</span>\r
        <button class="toast-close" (click)="toastService.dismiss(t.id); $event.stopPropagation()"\r
            aria-label="Cerrar">\xD7</button>\r
    </div>\r
</div>\r
`, styles: ['/* src/app/components/admin/admin-vehicles/admin-vehicles.css */\n.vehicles-container {\n  position: relative;\n  overflow: hidden;\n  background: var(--surface-subtle);\n  border: 0;\n  padding: 0;\n  box-shadow: none;\n}\n.vehicles-container::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 38%;\n  height: 190px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(32, 176, 56, 0.14),\n      rgba(16, 37, 31, 0.07));\n  clip-path: polygon(35% 0, 100% 0, 100% 100%, 0 100%);\n  pointer-events: none;\n  z-index: 0;\n}\n.vehicles-container .page-header {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1.25rem;\n  min-height: 164px;\n  margin: 0 0 1.25rem;\n  padding: 1.5rem 1.75rem;\n  border: 1px solid rgba(139, 226, 140, 0.22);\n  border-radius: 16px;\n  background:\n    linear-gradient(\n      115deg,\n      #10251f 0%,\n      #173c2e 68%,\n      #1f6840 100%);\n  box-shadow: 0 16px 30px rgba(16, 37, 31, 0.16);\n}\n.vehicles-container .page-heading {\n  flex: 1 1 auto;\n  min-width: 0;\n  padding: 0;\n}\n.vehicles-container .page-heading h2 {\n  margin: 0.25rem 0 0.35rem;\n  color: var(--text-on-accent);\n  font-size: 2rem;\n  line-height: 1;\n}\n.vehicles-container .page-heading p {\n  max-width: 420px;\n  margin: 0;\n  color: #bdd6c7;\n  font-size: 0.88rem;\n}\n.vehicles-container .btn-primary {\n  position: relative;\n  z-index: 2;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.4rem;\n  min-height: 44px;\n  margin-left: auto;\n  padding: 0.75rem 1rem;\n  border: 0;\n  border-radius: 9px;\n  background: var(--btn-primary-bg);\n  color: var(--btn-primary-text);\n  box-shadow: none;\n  white-space: nowrap;\n  cursor: pointer;\n  font-weight: 700;\n  font-size: 0.9rem;\n  transition: all 0.2s ease;\n}\n.vehicles-container .btn-primary:hover {\n  background: var(--btn-primary-bg-hover);\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.16);\n}\n.vehicles-container .toolbar {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 0.6rem;\n  margin: 0 0 1.25rem;\n  padding: 0.5rem 0.75rem;\n  border: 1px solid var(--border-color);\n  border-radius: 14px;\n  background: var(--surface-card);\n  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.05);\n}\n.vehicles-container .search-wrapper {\n  position: relative;\n  flex: 1 1 200px;\n  display: flex;\n  align-items: center;\n}\n.vehicles-container .search-icon {\n  position: absolute;\n  left: 0.65rem;\n  width: 16px;\n  height: 16px;\n  fill: none;\n  stroke: var(--accent-silver);\n  stroke-linecap: round;\n  stroke-linejoin: round;\n  stroke-width: 2;\n  pointer-events: none;\n}\n.vehicles-container .search-input {\n  width: 100%;\n  min-height: 40px;\n  padding: 0.4rem 2rem 0.4rem 2.2rem;\n  border: 1px solid var(--input-border);\n  border-radius: 8px;\n  font-size: 0.9rem;\n  background: var(--surface-subtle);\n  color: var(--text-silver);\n  transition:\n    border-color 0.2s ease,\n    box-shadow 0.2s ease,\n    background 0.2s ease;\n}\n.vehicles-container .search-input::placeholder {\n  color: var(--accent-silver);\n}\n.vehicles-container .search-input:focus {\n  outline: none;\n  border-color: var(--accent-green);\n  background: var(--surface-card);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.1);\n}\n.vehicles-container .search-clear {\n  position: absolute;\n  right: 0.4rem;\n  width: 24px;\n  height: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 0;\n  border-radius: 50%;\n  background: transparent;\n  color: var(--accent-silver);\n  font-size: 1rem;\n  line-height: 1;\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n.vehicles-container .search-clear:hover {\n  background: var(--surface-hover);\n  color: var(--text-silver);\n}\n.vehicles-container .toolbar-select {\n  position: relative;\n  flex: 0 0 auto;\n  display: flex;\n  align-items: center;\n}\n.vehicles-container .toolbar-select svg {\n  position: absolute;\n  left: 0.6rem;\n  width: 15px;\n  height: 15px;\n  fill: none;\n  stroke: var(--accent-silver);\n  stroke-linecap: round;\n  stroke-linejoin: round;\n  stroke-width: 2;\n  pointer-events: none;\n}\n.vehicles-container .toolbar-select select {\n  min-height: 40px;\n  padding: 0.4rem 0.8rem 0.4rem 1.9rem;\n  border: 1px solid var(--input-border);\n  border-radius: 8px;\n  background: var(--surface-subtle);\n  color: var(--text-silver);\n  font-size: 0.85rem;\n  transition:\n    border-color 0.2s ease,\n    box-shadow 0.2s ease,\n    background 0.2s ease;\n  cursor: pointer;\n  appearance: none;\n  -webkit-appearance: none;\n}\n.vehicles-container .toolbar-select select:focus {\n  outline: none;\n  border-color: var(--accent-green);\n  background: var(--surface-card);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.1);\n}\n.vehicles-container .filter-reset {\n  flex: 0 0 auto;\n  min-height: 40px;\n  padding: 0.4rem 0.8rem;\n  border: 1px solid var(--border-color);\n  border-radius: 8px;\n  background: var(--surface-card);\n  color: var(--text-silver);\n  font-size: 0.85rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  white-space: nowrap;\n}\n.vehicles-container .filter-reset:hover {\n  border-color: var(--accent-green);\n  color: var(--accent-green);\n  background: var(--accent-green-light);\n}\n.vehicles-container .results-count {\n  flex: 0 0 auto;\n  margin-left: auto;\n  padding: 0.35rem 0.65rem;\n  border-radius: 999px;\n  background: var(--surface-hover);\n  color: var(--text-silver);\n  font-size: 0.8rem;\n  font-weight: 600;\n  white-space: nowrap;\n}\n.vehicles-container .table-wrapper {\n  border: 1px solid var(--border-color);\n  border-radius: 11px;\n  overflow: auto;\n  background: var(--surface-card);\n  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.04);\n}\n.vehicles-container table {\n  min-width: 640px;\n}\n.vehicles-container th {\n  padding: 0.85rem 1rem;\n  background: var(--surface-subtle);\n  color: var(--text-muted);\n  font-size: 0.72rem;\n  letter-spacing: 0.55px;\n  text-transform: uppercase;\n}\n.vehicles-container td {\n  padding: 0.95rem 1rem;\n  color: var(--text-silver);\n  border-bottom-color: var(--border-color);\n}\n.vehicles-container tbody tr:last-child td {\n  border-bottom: 0;\n}\n.vehicles-container tbody tr:hover td {\n  background: #f8fcf9;\n}\n.vehicles-container .status-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.3rem;\n  padding: 0.28rem 0.55rem;\n  border: 1px solid transparent;\n  border-radius: 999px;\n  font-size: 0.64rem;\n  font-weight: 700;\n  letter-spacing: 0.2px;\n  white-space: nowrap;\n}\n.vehicles-container .status-badge svg {\n  width: 12px;\n  height: 12px;\n  flex-shrink: 0;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 2;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.status-hybrid {\n  background: #e0f2fe;\n  color: #0369a1;\n  border-color: #bae6fd;\n}\n.status-combustion {\n  background: var(--surface-hover);\n  color: var(--text-silver);\n  border-color: var(--border-color);\n}\n.vehicles-container .btn-icon {\n  width: 34px;\n  height: 34px;\n  border: 1px solid transparent;\n  background: var(--surface-subtle);\n}\n.vehicles-container .btn-icon:hover {\n  border-color: var(--input-border);\n  background: var(--surface-card);\n  transform: translateY(-1px);\n}\n.vehicles-container .btn-icon svg {\n  width: 16px;\n  height: 16px;\n  fill: none;\n  stroke: currentColor;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n  stroke-width: 1.8;\n}\n.vehicles-container .btn-delete:hover {\n  color: var(--danger-bright);\n  background: var(--danger-bg);\n}\n.vehicles-container .btn-edit:hover {\n  color: var(--info);\n}\n.page-kicker {\n  color: #8be28c;\n  font-size: 0.68rem;\n  font-weight: 700;\n  letter-spacing: 1.2px;\n  text-transform: uppercase;\n}\n.action-buttons {\n  display: flex;\n  gap: 0.3rem;\n}\n.loading,\n.empty-state {\n  text-align: center;\n  padding: 2rem;\n  color: var(--text-muted);\n}\n.empty-state {\n  font-style: italic;\n}\n.vehicle-catalog {\n  display: grid;\n  grid-template-columns: 170px minmax(0, 1fr);\n  gap: 1.25rem;\n  align-items: start;\n}\n.brand-index {\n  position: sticky;\n  top: 1.25rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.15rem;\n  padding: 1rem 0.75rem;\n  border: 1px solid var(--border-color);\n  border-radius: 12px;\n  background: var(--surface-card);\n  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.04);\n}\n.index-label {\n  margin: 0 0 0.55rem 0.55rem;\n  color: var(--accent-silver);\n  font-size: 0.68rem;\n  font-weight: 700;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n}\n.brand-index button {\n  display: flex;\n  width: 100%;\n  border: 0;\n  justify-content: space-between;\n  gap: 0.5rem;\n  padding: 0.55rem;\n  border-radius: 7px;\n  color: var(--text-silver);\n  background: transparent;\n  font-size: 0.8rem;\n  font-weight: 700;\n  font-family: inherit;\n  text-align: left;\n  cursor: pointer;\n  text-decoration: none;\n  transition: background-color 0.2s ease, color 0.2s ease;\n}\n.brand-index button span {\n  color: var(--accent-silver);\n  font-size: 0.7rem;\n}\n.brand-index button:hover {\n  background: var(--accent-green-light);\n  color: var(--accent-green-dark);\n}\n.brand-sections {\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n  min-width: 0;\n}\n.brand-section {\n  scroll-margin-top: 1.25rem;\n}\n.brand-heading {\n  display: flex;\n  align-items: end;\n  justify-content: space-between;\n  gap: 1rem;\n  margin-bottom: 0.7rem;\n  padding: 0 0.25rem;\n  border-bottom: 1px solid var(--input-border);\n}\n.brand-kicker {\n  color: var(--accent-green-dark);\n  font-size: 0.65rem;\n  font-weight: 700;\n  letter-spacing: 1.1px;\n  text-transform: uppercase;\n}\n.brand-heading h3 {\n  margin: 0.2rem 0 0.65rem;\n  color: var(--btn-primary-text);\n  font-size: 1.35rem;\n  line-height: 1;\n}\n.brand-count {\n  padding-bottom: 0.7rem;\n  color: var(--text-muted);\n  font-size: 0.75rem;\n}\n.vehicle-cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(245px, 1fr));\n  gap: 0.85rem;\n}\n.vehicle-card {\n  min-width: 0;\n  padding: 1rem;\n  border: 1px solid var(--input-border);\n  border-top: 3px solid var(--accent-green);\n  border-radius: 10px;\n  background:\n    linear-gradient(\n      145deg,\n      var(--surface-card) 0%,\n      var(--surface-card) 72%,\n      var(--accent-green-light) 100%);\n  box-shadow: 0 7px 18px rgba(15, 23, 42, 0.035);\n  transition:\n    border-color 0.2s ease,\n    box-shadow 0.2s ease,\n    transform 0.2s ease;\n}\n.vehicle-card:hover {\n  border-color: rgba(32, 176, 56, 0.42);\n  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.07);\n  transform: translateY(-2px);\n}\n.vehicle-card:nth-child(3n+2) {\n  border-top-color: #65a30d;\n}\n.vehicle-card:nth-child(3n+3) {\n  border-top-color: #0f766e;\n}\n.vehicle-card-head,\n.vehicle-card-footer {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n}\n.vehicle-year {\n  color: var(--accent-green-dark);\n  font-size: 0.75rem;\n  font-weight: 800;\n}\n.vehicle-card h4 {\n  margin: 1rem 0 0.25rem;\n  overflow: hidden;\n  color: var(--btn-primary-text);\n  font-size: 1.05rem;\n  line-height: 1.3;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.vehicle-reference {\n  display: block;\n  color: var(--accent-silver);\n  font-size: 0.7rem;\n}\n.vehicle-price {\n  display: block;\n  margin: 0.25rem 0 1rem;\n  color: var(--accent-green-dark);\n  font-size: 1.2rem;\n}\n.vehicle-card-footer {\n  justify-content: flex-end;\n  padding-top: 0.75rem;\n  border-top: 1px solid var(--border-color);\n}\n.catalog-state {\n  min-height: 170px;\n  padding: 2rem;\n  border: 1px dashed var(--border-strong);\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.7);\n  box-sizing: border-box;\n  color: var(--text-muted);\n  text-align: center;\n}\n.catalog-state.loading {\n  display: grid;\n  place-items: center;\n}\n.button-icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 20px;\n  height: 20px;\n  margin-right: 0.25rem;\n  border: 1px solid rgba(16, 37, 31, 0.25);\n  border-radius: 50%;\n  font-size: 1rem;\n  line-height: 1;\n}\n.modal-overlay {\n  position: fixed;\n  inset: 0;\n  z-index: 3500;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 1.25rem;\n  background: rgba(15, 23, 42, 0.55);\n  -webkit-backdrop-filter: blur(3px);\n  backdrop-filter: blur(3px);\n  animation: fadeIn 0.2s ease;\n}\n.modal-content {\n  width: 100%;\n  max-width: 470px;\n  max-height: 90vh;\n  overflow-y: auto;\n  padding: 1.5rem;\n  border-radius: 18px;\n  background: var(--surface-card);\n  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.25);\n  animation: riseIn 0.25s ease;\n}\n.modal-content h3 {\n  margin-top: 0;\n  font-family: "Fjalla One", sans-serif;\n  font-size: 1.3rem;\n}\n.modal-actions {\n  display: flex;\n  gap: 0.6rem;\n  margin-top: 1.25rem;\n}\n.btn-cancel {\n  flex: 1;\n  min-height: 44px;\n  padding: 0.6rem 1rem;\n  border: 1.5px solid var(--border-color);\n  border-radius: 9px;\n  background: var(--surface-card);\n  color: var(--text-silver);\n  font-weight: 600;\n  font-size: 0.9rem;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.btn-cancel:hover {\n  border-color: var(--border-strong);\n  background: var(--surface-subtle);\n}\n.btn-confirm {\n  flex: 1;\n  min-height: 44px;\n  padding: 0.6rem 1rem;\n  border: 0;\n  border-radius: 9px;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-green),\n      var(--accent-green-dark));\n  color: var(--text-on-accent);\n  font-weight: 700;\n  font-size: 0.9rem;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  box-shadow: 0 4px 12px rgba(32, 176, 56, 0.25);\n}\n.btn-confirm:hover {\n  box-shadow: 0 6px 18px rgba(32, 176, 56, 0.35);\n  transform: translateY(-1px);\n}\n.btn-confirm:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none;\n  box-shadow: none;\n}\n.vehicles-container .btn-cancel:focus-visible,\n.vehicles-container .btn-confirm:focus-visible,\n.vehicles-container .btn-icon:focus-visible {\n  outline: 2px solid var(--accent-green);\n  outline-offset: 2px;\n}\n.form-banner {\n  display: flex;\n  align-items: center;\n  gap: 0.45rem;\n  margin-bottom: 0.9rem;\n  padding: 0.65rem 0.8rem;\n  border-radius: 9px;\n  font-size: 0.85rem;\n  font-weight: 600;\n}\n.form-banner.error {\n  border: 1px solid #fecaca;\n  background: var(--danger-bg);\n  color: var(--danger);\n}\n.form-group {\n  margin-bottom: 0.95rem;\n}\n.form-group label {\n  display: block;\n  margin-bottom: 0.3rem;\n  color: var(--text-silver);\n  font-size: 0.78rem;\n  font-weight: 800;\n  letter-spacing: 0.4px;\n  text-transform: uppercase;\n}\n.form-group input,\n.form-group select {\n  width: 100%;\n  min-height: 44px;\n  padding: 0.55rem 0.75rem;\n  border: 1.5px solid var(--input-border);\n  border-radius: 9px;\n  background: var(--surface-card);\n  color: var(--text-silver);\n  font-size: 0.9rem;\n  font-family: inherit;\n  box-sizing: border-box;\n  transition: border-color 0.2s ease, box-shadow 0.2s ease;\n}\n.form-group input:focus,\n.form-group select:focus {\n  outline: none;\n  border-color: var(--accent-green);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.12);\n}\n.form-group input:disabled {\n  background: var(--surface-hover);\n  cursor: not-allowed;\n}\n.form-group .brand-input {\n  text-transform: uppercase;\n}\n.form-group small {\n  display: block;\n  margin-top: 0.3rem;\n  color: var(--accent-silver);\n  font-size: 0.74rem;\n  line-height: 1.4;\n}\n.modal-heading {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.8rem;\n  margin-bottom: 1rem;\n}\n.modal-heading h3 {\n  margin: 0.15rem 0 0;\n  color: var(--text-main);\n  font-size: 1.35rem;\n}\n.modal-eyebrow {\n  display: block;\n  color: var(--accent-silver);\n  font-size: 0.66rem;\n  font-weight: 700;\n  letter-spacing: 0.9px;\n  text-transform: uppercase;\n}\n.modal-icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 42px;\n  height: 42px;\n  flex-shrink: 0;\n  border-radius: 12px;\n}\n.modal-icon svg {\n  width: 21px;\n  height: 21px;\n  fill: none;\n  stroke: currentColor;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n  stroke-width: 1.8;\n}\n.modal-heading-warning .modal-icon {\n  background: var(--warning-bg);\n  color: var(--warning);\n}\n.modal-content > p {\n  color: var(--text-muted);\n  font-size: 0.92rem;\n  line-height: 1.6;\n}\n.warning-copy {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.45rem;\n  margin: 0.7rem 0;\n  padding: 0.7rem 0.8rem;\n  border: 1px solid #fed7aa;\n  border-radius: 9px;\n  background: var(--warning-bg);\n  color: var(--warning);\n  font-weight: 600;\n}\n.warning-copy svg {\n  width: 17px;\n  height: 17px;\n  flex-shrink: 0;\n}\n.currency-input-wrapper {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.currency-symbol {\n  position: absolute;\n  left: 0.7rem;\n  color: var(--text-muted);\n  font-weight: 700;\n  pointer-events: none;\n}\n.currency-input-wrapper input {\n  padding-left: 2rem;\n}\n.toggle-group {\n  display: flex;\n  gap: 0.5rem;\n}\n.toggle-btn {\n  flex: 1;\n  padding: 0.5rem 0.75rem;\n  border: 1px solid var(--border-strong);\n  border-radius: 8px;\n  background: var(--surface-subtle);\n  font-size: 0.8rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n  text-align: center;\n}\n.toggle-btn.active {\n  background: #bbf7d0;\n  color: var(--accent-green-dark);\n  border-color: #86efac;\n}\n.toggle-btn:hover {\n  background: var(--surface-hover);\n}\n.drawer-overlay {\n  position: fixed;\n  inset: 0;\n  z-index: 3000;\n  background: rgba(15, 23, 42, 0.55);\n  -webkit-backdrop-filter: blur(3px);\n  backdrop-filter: blur(3px);\n  animation: fadeIn 0.2s ease;\n}\n.drawer {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 3001;\n  display: flex;\n  flex-direction: column;\n  width: min(560px, 92vw);\n  background: var(--surface-card);\n  box-shadow: -20px 0 50px rgba(15, 23, 42, 0.25);\n  animation: drawerIn 0.28s ease;\n}\n.form-drawer {\n  width: min(560px, 92vw);\n}\n.drawer-header {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 1.25rem 1.5rem 1rem;\n  border-bottom: 1px solid var(--border-color);\n  background:\n    linear-gradient(\n      135deg,\n      #10251f,\n      #1f6840);\n}\n.drawer-header .page-kicker {\n  color: #8be28c;\n  font-size: 0.66rem;\n  font-weight: 700;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n}\n.drawer-header h3 {\n  margin: 0.25rem 0 0;\n  color: var(--text-on-accent);\n  font-family: "Fjalla One", sans-serif;\n  font-size: 1.3rem;\n}\n.drawer-close {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 34px;\n  height: 34px;\n  flex-shrink: 0;\n  border: 0;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, 0.12);\n  color: var(--text-on-accent);\n  font-size: 1.4rem;\n  line-height: 1;\n  cursor: pointer;\n  transition: background 0.2s ease, transform 0.2s ease;\n}\n.drawer-close:hover {\n  background: rgba(255, 255, 255, 0.24);\n  transform: rotate(90deg);\n}\n.drawer-body {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1.25rem 1.5rem 1.5rem;\n}\n.drawer-loading {\n  display: grid;\n  place-items: center;\n  gap: 0.75rem;\n  padding: 2.5rem 1rem;\n  color: var(--text-muted);\n  font-size: 0.88rem;\n}\n.drawer-actions {\n  display: flex;\n  gap: 0.6rem;\n  margin-top: 1.25rem;\n  padding-top: 1rem;\n  border-top: 1px solid var(--border-color);\n}\n.drawer-actions .btn-cancel,\n.drawer-actions .btn-confirm {\n  flex: 1;\n}\n.catalog-spinner {\n  width: 34px;\n  height: 34px;\n  border: 3px solid var(--border-color);\n  border-top-color: var(--accent-green);\n  border-radius: 50%;\n  animation: spin 0.8s linear infinite;\n}\n.skeleton-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(245px, 1fr));\n  gap: 0.85rem;\n}\n.skeleton-card {\n  height: 150px;\n  border-radius: 10px;\n  background:\n    linear-gradient(\n      100deg,\n      var(--surface-muted) 40%,\n      var(--surface-subtle) 50%,\n      var(--surface-muted) 60%);\n  background-size: 200% 100%;\n  animation: shimmer 1.4s ease-in-out infinite;\n}\n.empty-state-icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 56px;\n  height: 56px;\n  margin-bottom: 0.9rem;\n  border-radius: 16px;\n  background: var(--accent-green-light);\n  color: var(--accent-green);\n}\n.empty-state-icon svg {\n  width: 28px;\n  height: 28px;\n  fill: none;\n  stroke: currentColor;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n  stroke-width: 1.6;\n}\n.empty-state-title {\n  margin: 0 0 0.4rem;\n  color: var(--btn-primary-text);\n  font-size: 1.05rem;\n  font-style: normal;\n  font-weight: 700;\n}\n.empty-state-text {\n  max-width: 380px;\n  margin: 0 auto 1.1rem;\n  color: var(--accent-silver);\n  font-size: 0.88rem;\n  font-style: normal;\n  line-height: 1.55;\n}\n.empty-state .btn-add-vehicle {\n  margin: 0 auto;\n}\n.toast-host {\n  position: fixed;\n  z-index: 4000;\n  right: 1.1rem;\n  bottom: 1.1rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.6rem;\n  max-width: 400px;\n}\n.toast {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  padding: 0.75rem 0.9rem;\n  border-radius: 12px;\n  background: var(--text-main);\n  color: var(--surface-card);\n  font-size: 0.86rem;\n  box-shadow: 0 16px 34px -10px rgba(15, 23, 42, 0.35);\n  animation: toastIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);\n  cursor: pointer;\n}\n.toast-success {\n  background:\n    linear-gradient(\n      135deg,\n      #14532d,\n      var(--accent-green-dark));\n}\n.toast-error {\n  background:\n    linear-gradient(\n      135deg,\n      #7f1d1d,\n      var(--danger));\n}\n.toast-info {\n  background: var(--text-main);\n}\n.toast-icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 22px;\n  height: 22px;\n  flex-shrink: 0;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, 0.18);\n  font-size: 0.75rem;\n  font-weight: 800;\n}\n.toast-msg {\n  flex: 1;\n  line-height: 1.35;\n}\n.toast-action {\n  padding: 0.28rem 0.65rem;\n  border-radius: 8px;\n  background: var(--surface-card);\n  color: var(--accent-green-dark);\n  font-size: 0.75rem;\n  font-weight: 800;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  white-space: nowrap;\n}\n.toast-close {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 22px;\n  height: 22px;\n  border: 0;\n  border-radius: 50%;\n  background: transparent;\n  color: rgba(255, 255, 255, 0.75);\n  font-size: 1rem;\n  cursor: pointer;\n}\n.toast-close:hover {\n  background: rgba(255, 255, 255, 0.15);\n  color: var(--surface-card);\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes riseIn {\n  from {\n    opacity: 0;\n    transform: translateY(14px) scale(0.98);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n@keyframes drawerIn {\n  from {\n    transform: translateX(100%);\n  }\n  to {\n    transform: translateX(0);\n  }\n}\n@keyframes shimmer {\n  0% {\n    background-position: 200% 0;\n  }\n  100% {\n    background-position: -200% 0;\n  }\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@keyframes toastIn {\n  from {\n    opacity: 0;\n    transform: translateY(14px) scale(0.97);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n@media (max-width: 768px) {\n  .vehicles-container {\n    padding: 1rem;\n    border-radius: 12px;\n  }\n  .vehicles-container .toolbar {\n    align-items: stretch;\n    flex-direction: column;\n    padding: 0.85rem 1rem;\n    gap: 0.75rem;\n  }\n  .vehicles-container .search-wrapper {\n    flex: 0 0 auto;\n    width: 100%;\n  }\n  .vehicles-container .search-input,\n  .vehicles-container .toolbar-select select {\n    font-size: 1rem;\n  }\n  .vehicles-container .toolbar-select {\n    flex: 0 0 auto;\n    width: 100%;\n  }\n  .vehicles-container .toolbar-select select,\n  .vehicles-container .filter-reset {\n    width: 100%;\n  }\n  .vehicles-container .results-count {\n    margin-left: 0;\n    align-self: flex-end;\n  }\n  .skeleton-grid {\n    grid-template-columns: 1fr;\n  }\n  .drawer {\n    width: 100vw;\n  }\n  .drawer-body {\n    padding: 1rem 1.1rem 1.25rem;\n  }\n  .drawer-actions {\n    flex-direction: column-reverse;\n  }\n  .drawer-actions .btn-cancel,\n  .drawer-actions .btn-confirm {\n    width: 100%;\n  }\n  .vehicles-container .page-header {\n    display: flex;\n    align-items: stretch;\n    flex-direction: column;\n    gap: 0.85rem;\n  }\n  .vehicles-container .btn-primary {\n    justify-content: center;\n    width: 100%;\n  }\n  .vehicle-catalog {\n    grid-template-columns: 1fr;\n  }\n  .brand-index {\n    position: static;\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));\n    gap: 0.2rem;\n  }\n  .index-label {\n    grid-column: 1 / -1;\n  }\n  .vehicles-container .btn-icon {\n    width: 40px;\n    height: 40px;\n  }\n}\n@media (max-width: 600px) {\n  .toggle-group {\n    flex-direction: column;\n  }\n}\n.vehicles-container > *:not(.modal-overlay):not(.drawer-overlay):not(.toast-host) {\n  position: relative;\n  z-index: 1;\n}\n/*# sourceMappingURL=admin-vehicles.css.map */\n'] }]
  }], null, { onEscapeKey: [{
    type: HostListener,
    args: ["document:keydown.escape"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminVehiclesComponent, { className: "AdminVehiclesComponent", filePath: "src/app/components/admin/admin-vehicles/admin-vehicles.ts", lineNumber: 14 });
})();
export {
  AdminVehiclesComponent
};
//# debugId=f9232d41-e102-5104-aa0c-864ba6819c73
//# sourceMappingURL=chunk-HWJ4T4I3.js.map
