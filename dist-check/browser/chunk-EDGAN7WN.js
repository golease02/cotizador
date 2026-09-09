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
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinterpolate,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
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
import {
  __spreadValues
} from "./chunk-FDMHZOCR.js";

// src/app/components/admin/admin-admins/admin-admins.ts
var _c0 = () => [0, 1, 2, 3, 4];
function AdminAdminsComponent_button_52_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 45);
    \u0275\u0275listener("click", function AdminAdminsComponent_button_52_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.clearSearch());
    });
    \u0275\u0275text(1, "\xD7");
    \u0275\u0275elementEnd();
  }
}
function AdminAdminsComponent_span_72_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 46);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r1.filteredAdmins().length, " resultado(s)");
  }
}
function AdminAdminsComponent_div_73_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 49);
  }
}
function AdminAdminsComponent_div_73_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47);
    \u0275\u0275template(1, AdminAdminsComponent_div_73_div_1_Template, 1, 0, "div", 48);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", \u0275\u0275pureFunction0(1, _c0));
  }
}
function AdminAdminsComponent_div_74_tr_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 54);
    \u0275\u0275listener("click", function AdminAdminsComponent_div_74_tr_13_Template_tr_click_0_listener() {
      const admin_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openDetail(admin_r4));
    })("keydown.enter", function AdminAdminsComponent_div_74_tr_13_Template_tr_keydown_enter_0_listener() {
      const admin_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openDetail(admin_r4));
    })("keydown.space", function AdminAdminsComponent_div_74_tr_13_Template_tr_keydown_space_0_listener($event) {
      const admin_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.openDetail(admin_r4);
      return \u0275\u0275resetView($event.preventDefault());
    });
    \u0275\u0275elementStart(1, "td", 55)(2, "span", 56);
    \u0275\u0275text(3);
    \u0275\u0275element(4, "span", 57);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 58)(6, "strong");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "small");
    \u0275\u0275text(9, "Administrador");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "td", 59)(11, "span", 60);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "td", 61)(14, "button", 62);
    \u0275\u0275listener("click", function AdminAdminsComponent_div_74_tr_13_Template_button_click_14_listener($event) {
      const admin_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.toggleAdminStatus(admin_r4);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275element(15, "span", 63);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span", 64);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "td", 65);
    \u0275\u0275listener("click", function AdminAdminsComponent_div_74_tr_13_Template_td_click_18_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(19, "div", 66)(20, "button", 67);
    \u0275\u0275listener("click", function AdminAdminsComponent_div_74_tr_13_Template_button_click_20_listener() {
      const admin_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openEditAdmin(admin_r4));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(21, "svg", 9);
    \u0275\u0275element(22, "path", 68)(23, "path", 69);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(24, "button", 70);
    \u0275\u0275listener("click", function AdminAdminsComponent_div_74_tr_13_Template_button_click_24_listener() {
      const admin_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.deleteAdmin(admin_r4.id));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(25, "svg", 9);
    \u0275\u0275element(26, "path", 30)(27, "path", 71)(28, "path", 72)(29, "path", 73)(30, "path", 74);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const admin_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("is-selected", ctx_r1.showDetailDrawer && ctx_r1.detailAdmin?.id === admin_r4.id);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r1.getAvatarClass(admin_r4.full_name));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getInitials(admin_r4.full_name), " ");
    \u0275\u0275advance();
    \u0275\u0275classProp("is-on", admin_r4.active ?? true);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(admin_r4.full_name);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(admin_r4.seller_number || "-");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("is-on", admin_r4.active ?? true);
    \u0275\u0275property("title", "Cambiar estado (" + ctx_r1.getStatusLabel(admin_r4.active ?? true) + ")");
    \u0275\u0275attribute("aria-checked", admin_r4.active ?? true);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.getStatusLabel(admin_r4.active ?? true));
  }
}
function AdminAdminsComponent_div_74_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50)(1, "table", 51)(2, "thead")(3, "tr")(4, "th");
    \u0275\u0275text(5, "Administrador");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7, "N\xB0 de contacto");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "Estado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 52);
    \u0275\u0275text(11, "Acciones");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "tbody");
    \u0275\u0275template(13, AdminAdminsComponent_div_74_tr_13_Template, 31, 14, "tr", 53);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(13);
    \u0275\u0275property("ngForOf", ctx_r1.filteredAdmins());
  }
}
function AdminAdminsComponent_div_75_button_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 84);
    \u0275\u0275listener("click", function AdminAdminsComponent_div_75_button_11_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.clearFilters());
    });
    \u0275\u0275text(1, "Limpiar filtros");
    \u0275\u0275elementEnd();
  }
}
function AdminAdminsComponent_div_75_button_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 85);
    \u0275\u0275listener("click", function AdminAdminsComponent_div_75_button_12_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openNewAdmin());
    });
    \u0275\u0275text(1, "+ Nuevo Administrador");
    \u0275\u0275elementEnd();
  }
}
function AdminAdminsComponent_div_75_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 75)(1, "span", 76);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 77);
    \u0275\u0275element(3, "path", 78)(4, "circle", 79)(5, "path", 80)(6, "path", 81);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(7, "strong");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275template(11, AdminAdminsComponent_div_75_button_11_Template, 2, 0, "button", 82)(12, AdminAdminsComponent_div_75_button_12_Template, 2, 0, "button", 83);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.admins().length === 0 ? "A\xFAn no hay administradores registrados" : "Sin resultados");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.admins().length === 0 ? "Agrega tu primer administrador para empezar." : "Ajusta tu b\xFAsqueda o los filtros.");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.admins().length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.admins().length === 0);
  }
}
function AdminAdminsComponent_div_77_span_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 91);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r8.actionLabel);
  }
}
function AdminAdminsComponent_div_77_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 86);
    \u0275\u0275listener("click", function AdminAdminsComponent_div_77_Template_div_click_0_listener() {
      const t_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.handleToast(t_r8));
    });
    \u0275\u0275elementStart(1, "span", 87);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 88);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, AdminAdminsComponent_div_77_span_5_Template, 2, 1, "span", 89);
    \u0275\u0275elementStart(6, "button", 90);
    \u0275\u0275listener("click", function AdminAdminsComponent_div_77_Template_button_click_6_listener($event) {
      const t_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.toastService.dismiss(t_r8.id);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275text(7, "\xD7");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r8 = ctx.$implicit;
    \u0275\u0275classMap("toast-" + t_r8.type);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r8.type === "success" ? "\u2713" : t_r8.type === "error" ? "\u2715" : "\u2139");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r8.message);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", t_r8.actionLabel);
  }
}
function AdminAdminsComponent_div_78_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 92);
    \u0275\u0275listener("click", function AdminAdminsComponent_div_78_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelModal());
    });
    \u0275\u0275elementStart(1, "div", 93);
    \u0275\u0275listener("click", function AdminAdminsComponent_div_78_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 94)(3, "span", 95);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(4, "svg", 9);
    \u0275\u0275element(5, "path", 96)(6, "path", 97)(7, "path", 98);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "div")(9, "span", 99);
    \u0275\u0275text(10, "Confirmaci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "h3");
    \u0275\u0275text(12, "Eliminar administrador");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "p");
    \u0275\u0275text(14, " \xBFEst\xE1s seguro de que deseas eliminar a ");
    \u0275\u0275elementStart(15, "strong");
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275text(17, "? ");
    \u0275\u0275element(18, "br");
    \u0275\u0275text(19, " Esta operaci\xF3n no se puede deshacer. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 100)(21, "button", 101);
    \u0275\u0275listener("click", function AdminAdminsComponent_div_78_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelModal());
    });
    \u0275\u0275text(22, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "button", 102);
    \u0275\u0275listener("click", function AdminAdminsComponent_div_78_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.confirmAdminDelete());
    });
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(16);
    \u0275\u0275textInterpolate(ctx_r1.getAdminName());
    \u0275\u0275advance(7);
    \u0275\u0275property("disabled", ctx_r1.actionLoading);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.actionLoading ? "Eliminando..." : "Eliminar", " ");
  }
}
function AdminAdminsComponent_div_79_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 111);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.formError);
  }
}
function AdminAdminsComponent_div_79_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 112);
    \u0275\u0275element(1, "span", 113);
    \u0275\u0275text(2, " Cargando...");
    \u0275\u0275elementEnd();
  }
}
function AdminAdminsComponent_div_79_form_13_small_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 131);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.fieldErrors["seller_number"]);
  }
}
function AdminAdminsComponent_div_79_form_13_small_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small");
    \u0275\u0275text(1, "Se usar\xE1 para iniciar sesi\xF3n (junto con la contrase\xF1a).");
    \u0275\u0275elementEnd();
  }
}
function AdminAdminsComponent_div_79_form_13_small_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small");
    \u0275\u0275text(1, "Este n\xFAmero define el acceso; no se puede modificar.");
    \u0275\u0275elementEnd();
  }
}
function AdminAdminsComponent_div_79_form_13_small_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 131);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.fieldErrors["full_name"]);
  }
}
function AdminAdminsComponent_div_79_form_13_small_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 131);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.fieldErrors["password"]);
  }
}
function AdminAdminsComponent_div_79_form_13_div_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 115)(1, "label");
    \u0275\u0275text(2, "Estado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "select", 132);
    \u0275\u0275twoWayListener("ngModelChange", function AdminAdminsComponent_div_79_form_13_div_26_Template_select_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.adminForm.active, $event) || (ctx_r1.adminForm.active = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(4, "option", 133);
    \u0275\u0275text(5, "Activo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "option", 133);
    \u0275\u0275text(7, "Inactivo");
    \u0275\u0275elementEnd()();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.adminForm.active);
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", true);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngValue", false);
  }
}
function AdminAdminsComponent_div_79_form_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 114);
    \u0275\u0275listener("ngSubmit", function AdminAdminsComponent_div_79_form_13_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.submitForm());
    });
    \u0275\u0275elementStart(1, "div", 115)(2, "label");
    \u0275\u0275text(3, "N\xB0 de contacto *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 116);
    \u0275\u0275twoWayListener("ngModelChange", function AdminAdminsComponent_div_79_form_13_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.adminForm.seller_number, $event) || (ctx_r1.adminForm.seller_number = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function AdminAdminsComponent_div_79_form_13_Template_input_input_4_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onPhoneInput($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275template(5, AdminAdminsComponent_div_79_form_13_small_5_Template, 2, 1, "small", 117)(6, AdminAdminsComponent_div_79_form_13_small_6_Template, 2, 0, "small", 118)(7, AdminAdminsComponent_div_79_form_13_small_7_Template, 2, 0, "small", 118);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 115)(9, "label");
    \u0275\u0275text(10, "Nombre Completo *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "input", 119);
    \u0275\u0275twoWayListener("ngModelChange", function AdminAdminsComponent_div_79_form_13_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.adminForm.full_name, $event) || (ctx_r1.adminForm.full_name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275template(12, AdminAdminsComponent_div_79_form_13_small_12_Template, 2, 1, "small", 117);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 115)(14, "label");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 120)(17, "input", 121);
    \u0275\u0275twoWayListener("ngModelChange", function AdminAdminsComponent_div_79_form_13_Template_input_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.adminForm.password, $event) || (ctx_r1.adminForm.password = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(18, "button", 122);
    \u0275\u0275listener("click", function AdminAdminsComponent_div_79_form_13_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.showPassword = !ctx_r1.showPassword);
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(19, "svg", 9);
    \u0275\u0275element(20, "path", 123)(21, "circle", 124);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(22, "div", 125);
    \u0275\u0275template(23, AdminAdminsComponent_div_79_form_13_small_23_Template, 2, 1, "small", 117);
    \u0275\u0275elementStart(24, "button", 126);
    \u0275\u0275listener("click", function AdminAdminsComponent_div_79_form_13_Template_button_click_24_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.generatePassword());
    });
    \u0275\u0275text(25, "\u{1F6E1} Generar contrase\xF1a segura");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(26, AdminAdminsComponent_div_79_form_13_div_26_Template, 8, 3, "div", 127);
    \u0275\u0275elementStart(27, "div", 128)(28, "button", 129);
    \u0275\u0275listener("click", function AdminAdminsComponent_div_79_form_13_Template_button_click_28_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closeFormDrawer());
    });
    \u0275\u0275text(29, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "button", 130);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275classProp("has-error", ctx_r1.formValidated && ctx_r1.fieldErrors["seller_number"]);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.adminForm.seller_number);
    \u0275\u0275property("disabled", ctx_r1.isEditMode);
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.formValidated && ctx_r1.fieldErrors["seller_number"]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.isEditMode && !ctx_r1.fieldErrors["seller_number"]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isEditMode && !ctx_r1.fieldErrors["seller_number"]);
    \u0275\u0275advance();
    \u0275\u0275classProp("has-error", ctx_r1.formValidated && ctx_r1.fieldErrors["full_name"]);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.adminForm.full_name);
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.formValidated && ctx_r1.fieldErrors["full_name"]);
    \u0275\u0275advance();
    \u0275\u0275classProp("has-error", ctx_r1.formValidated && ctx_r1.fieldErrors["password"]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Contrase\xF1a ", ctx_r1.isEditMode ? "(opcional)" : "*");
    \u0275\u0275advance(2);
    \u0275\u0275property("placeholder", \u0275\u0275interpolate(ctx_r1.isEditMode ? "Dejar vac\xEDa conserva la actual" : "M\xEDnimo 6 caracteres"))("type", ctx_r1.showPassword ? "text" : "password");
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.adminForm.password);
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx_r1.showPassword ? "Ocultar contrase\xF1a" : "Mostrar contrase\xF1a");
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r1.formValidated && ctx_r1.fieldErrors["password"]);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.isEditMode);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.formLoading);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.formLoading ? "Guardando..." : ctx_r1.isEditMode ? "Actualizar" : "Crear", " ");
  }
}
function AdminAdminsComponent_div_79_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 103);
    \u0275\u0275listener("click", function AdminAdminsComponent_div_79_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeFormDrawer());
    });
    \u0275\u0275elementStart(1, "aside", 104);
    \u0275\u0275listener("click", function AdminAdminsComponent_div_79_Template_aside_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 105)(3, "div")(4, "span", 3);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "h3");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "button", 106);
    \u0275\u0275listener("click", function AdminAdminsComponent_div_79_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeFormDrawer());
    });
    \u0275\u0275text(9, "\xD7");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 107);
    \u0275\u0275template(11, AdminAdminsComponent_div_79_div_11_Template, 2, 1, "div", 108)(12, AdminAdminsComponent_div_79_div_12_Template, 3, 0, "div", 109)(13, AdminAdminsComponent_div_79_form_13_Template, 32, 23, "form", 110);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", ctx_r1.isEditMode ? "Editar administrador" : "Nuevo administrador");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.isEditMode ? "Edici\xF3n de administrador" : "Nuevo registro");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.isEditMode ? "Editar Administrador" : "Nuevo Administrador");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r1.formError);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.formLoading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.formLoading);
  }
}
function AdminAdminsComponent_div_80_div_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 142)(1, "small");
    \u0275\u0275text(2, "Correo de recuperaci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.detailAdmin.recovery_email);
  }
}
function AdminAdminsComponent_div_80_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 103);
    \u0275\u0275listener("click", function AdminAdminsComponent_div_80_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeDetail());
    });
    \u0275\u0275elementStart(1, "aside", 134);
    \u0275\u0275listener("click", function AdminAdminsComponent_div_80_Template_aside_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 105)(3, "div")(4, "span", 3);
    \u0275\u0275text(5, "Control de acceso");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "h3");
    \u0275\u0275text(7, "Detalle del Administrador");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "button", 135);
    \u0275\u0275listener("click", function AdminAdminsComponent_div_80_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeDetail());
    });
    \u0275\u0275text(9, "\xD7");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 107)(11, "div", 136)(12, "span", 137);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 138)(15, "strong");
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span", 139);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "div", 140)(20, "h4");
    \u0275\u0275text(21, "Informaci\xF3n de acceso");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 141)(23, "div", 142)(24, "small");
    \u0275\u0275text(25, "N\xB0 de contacto");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "strong");
    \u0275\u0275text(27);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 142)(29, "small");
    \u0275\u0275text(30, "Email de acceso");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "strong");
    \u0275\u0275text(32);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(33, AdminAdminsComponent_div_80_div_33_Template, 5, 1, "div", 143);
    \u0275\u0275elementStart(34, "div", 142)(35, "small");
    \u0275\u0275text(36, "Rol");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "strong");
    \u0275\u0275text(38);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "div", 142)(40, "small");
    \u0275\u0275text(41, "Registro");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "strong");
    \u0275\u0275text(43);
    \u0275\u0275pipe(44, "date");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(45, "div", 144)(46, "button", 129);
    \u0275\u0275listener("click", function AdminAdminsComponent_div_80_Template_button_click_46_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeDetail());
    });
    \u0275\u0275text(47, "Cerrar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "button", 85);
    \u0275\u0275listener("click", function AdminAdminsComponent_div_80_Template_button_click_48_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.detailEdit());
    });
    \u0275\u0275text(49, "Editar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "button", 145);
    \u0275\u0275listener("click", function AdminAdminsComponent_div_80_Template_button_click_50_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.detailDelete());
    });
    \u0275\u0275text(51, "Eliminar");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(12);
    \u0275\u0275classMap(ctx_r1.getAvatarClass(ctx_r1.detailAdmin.full_name));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getInitials(ctx_r1.detailAdmin.full_name), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.detailAdmin.full_name);
    \u0275\u0275advance();
    \u0275\u0275classProp("is-on", ctx_r1.detailAdmin.active ?? true);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getStatusLabel(ctx_r1.detailAdmin.active ?? true), " ");
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r1.detailAdmin.seller_number || "\u2014");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.detailAdmin.email || "\u2014");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.detailAdmin.recovery_email);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.detailAdmin.role === "seller" ? "Vendedor" : "Administrador");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(44, 12, ctx_r1.detailAdmin.created_at, "dd/MM/yyyy"));
  }
}
var AdminAdminsComponent = class _AdminAdminsComponent {
  auth = inject(AuthService);
  admin = inject(AdminService);
  client = getSupabaseClient();
  cdr = inject(ChangeDetectorRef);
  toastService = inject(ToastService);
  // ------------------- LISTADO -------------------
  admins = signal(
    [],
    ...ngDevMode ? [{ debugName: "admins" }] : (
      /* istanbul ignore next */
      []
    )
  );
  filteredAdmins = signal(
    [],
    ...ngDevMode ? [{ debugName: "filteredAdmins" }] : (
      /* istanbul ignore next */
      []
    )
  );
  loading = true;
  actionLoading = false;
  searchTerm = "";
  statusFilter = "todos";
  sortBy = "recientes";
  get stats() {
    const list = this.admins();
    const total = list.length;
    const activos = list.filter((a) => a.active ?? true).length;
    return { total, activos, inactivos: total - activos };
  }
  // ------------------- CONFIRMACIÓN (solo eliminar) -------------------
  showConfirmModal = false;
  selectedAdminId = null;
  selectedAdminCardId = null;
  // ------------------- FORMULARIO (DRAWER) -------------------
  showFormDrawer = false;
  isEditMode = false;
  formLoading = false;
  formError = "";
  showPassword = false;
  formValidated = false;
  fieldErrors = {};
  adminForm = {
    id: "",
    seller_number: "",
    full_name: "",
    password: "",
    active: true
  };
  // ------------------- DRAWER DE DETALLE -------------------
  showDetailDrawer = false;
  detailAdmin = null;
  async ngOnInit() {
    await this.loadAdmins();
  }
  onEscapeKey() {
    if (this.showConfirmModal)
      this.cancelModal();
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
  // ===================== DETALLE (DRAWER) =====================
  openDetail(admin) {
    this.detailAdmin = admin;
    this.showDetailDrawer = true;
  }
  closeDetail() {
    this.showDetailDrawer = false;
    this.detailAdmin = null;
  }
  detailEdit() {
    const admin = this.detailAdmin;
    this.closeDetail();
    if (admin)
      this.openEditAdmin(admin);
  }
  detailDelete() {
    const admin = this.detailAdmin;
    this.closeDetail();
    if (admin)
      this.deleteAdmin(admin.id);
  }
  // ===================== LISTADO =====================
  async loadAdmins() {
    this.loading = true;
    const { data, error } = await this.auth.getAdmins();
    if (!error) {
      this.admins.set(data || []);
      this.applyFilters();
    } else {
      this.toastService.error("No se pudieron cargar los administradores");
    }
    this.loading = false;
    this.cdr.detectChanges();
  }
  applyFilters() {
    let filtered = this.admins();
    const term = this.searchTerm.trim().toLowerCase();
    if (term) {
      filtered = filtered.filter((a) => (a.full_name || "").toLowerCase().includes(term) || (a.seller_number || "").toLowerCase().includes(term));
    }
    if (this.statusFilter === "activos")
      filtered = filtered.filter((a) => a.active ?? true);
    if (this.statusFilter === "inactivos")
      filtered = filtered.filter((a) => !(a.active ?? true));
    switch (this.sortBy) {
      case "nombre":
        filtered = [...filtered].sort((a, b) => (a.full_name || "").localeCompare(b.full_name || ""));
        break;
      case "antiguos":
        filtered = [...filtered].reverse();
        break;
      case "recientes":
      default:
        break;
    }
    this.filteredAdmins.set(filtered);
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
    this.sortBy = "recientes";
    this.selectedAdminCardId = null;
    this.applyFilters();
  }
  setStatusFilter(f) {
    this.statusFilter = f;
    this.applyFilters();
  }
  setSortBy(value) {
    this.sortBy = value;
    this.applyFilters();
  }
  selectAdmin(adminId) {
    this.selectedAdminCardId = adminId;
  }
  // ===================== TOGGLE DE ESTADO (INLINE + DESHACER) =====================
  async toggleAdminStatus(admin) {
    if (this.actionLoading)
      return;
    const previous = admin.active ?? true;
    const next = !previous;
    this.patchAdmin(admin.id, { active: next });
    const { error } = await this.auth.updateProfile(admin.id, { active: next });
    if (error) {
      this.patchAdmin(admin.id, { active: previous });
      this.toastService.error("No se pudo cambiar el estado: " + error.message);
      return;
    }
    this.toastService.undo(next ? `${admin.full_name} ahora est\xE1 activo` : `${admin.full_name} qued\xF3 inactivo`, () => {
      this.patchAdmin(admin.id, { active: previous });
      this.auth.updateProfile(admin.id, { active: previous });
    });
  }
  patchAdmin(id, patch) {
    this.admins.update((list) => list.map((a) => a.id === id ? __spreadValues(__spreadValues({}, a), patch) : a));
    this.applyFilters();
  }
  // ===================== ELIMINAR (CON CONFIRMACIÓN) =====================
  deleteAdmin(adminId) {
    this.selectedAdminId = adminId;
    this.showConfirmModal = true;
    this.cdr.detectChanges();
  }
  getAdminName() {
    const admin = this.admins().find((a) => a.id === this.selectedAdminId);
    return admin?.full_name || "este administrador";
  }
  confirmAdminDelete() {
    if (!this.selectedAdminId)
      return;
    this.actionLoading = true;
    this.cdr.detectChanges();
    this.auth.deleteUserFromAuth(this.selectedAdminId).then(({ error }) => {
      this.actionLoading = false;
      if (error) {
        this.toastService.error("Error al eliminar: " + error.message);
      } else {
        this.toastService.success("Administrador eliminado correctamente");
        this.showConfirmModal = false;
        this.selectedAdminId = null;
        this.loadAdmins();
      }
      this.cdr.detectChanges();
    });
  }
  cancelModal() {
    this.showConfirmModal = false;
    this.selectedAdminId = null;
    this.cdr.detectChanges();
  }
  // ===================== FORMULARIO (DRAWER) =====================
  openNewAdmin() {
    this.isEditMode = false;
    this.resetForm();
    this.showFormDrawer = true;
    this.cdr.detectChanges();
  }
  async openEditAdmin(admin) {
    this.isEditMode = true;
    this.resetForm();
    this.formLoading = true;
    this.showFormDrawer = true;
    this.cdr.detectChanges();
    try {
      const { data, error } = await this.auth.getProfileById(admin.id);
      if (error || !data || data.role !== "admin") {
        this.formError = "Error al cargar datos del administrador";
        this.formLoading = false;
        this.cdr.detectChanges();
        return;
      }
      this.adminForm = {
        id: data.id,
        seller_number: data.seller_number || "",
        full_name: data.full_name || "",
        password: "",
        active: data.active !== false
      };
      this.formLoading = false;
      this.cdr.detectChanges();
    } catch {
      this.formError = "Error inesperado al cargar el administrador";
      this.formLoading = false;
      this.cdr.detectChanges();
    }
  }
  resetForm() {
    this.adminForm = { id: "", seller_number: "", full_name: "", password: "", active: true };
    this.formError = "";
    this.fieldErrors = {};
    this.formValidated = false;
    this.showPassword = false;
    this.formLoading = false;
  }
  /** Filtra en vivo: solo dígitos, máximo 10 caracteres (igual que en el registro). */
  onPhoneInput(event) {
    const input = event.target;
    input.value = input.value.replace(/\D/g, "").slice(0, 10);
    this.adminForm.seller_number = input.value;
    if (this.fieldErrors["seller_number"])
      this.validateForm();
  }
  validateForm() {
    this.formValidated = true;
    this.fieldErrors = {};
    let valid = true;
    const numberField = this.adminForm.seller_number.trim();
    if (!this.isEditMode) {
      if (!numberField) {
        this.fieldErrors["seller_number"] = "El n\xFAmero de celular es obligatorio.";
        valid = false;
      } else if (!/^\d{10}$/.test(numberField)) {
        this.fieldErrors["seller_number"] = "Ingresa un n\xFAmero v\xE1lido de 10 d\xEDgitos.";
        valid = false;
      }
    }
    if (!this.adminForm.full_name.trim()) {
      this.fieldErrors["full_name"] = "El nombre completo es obligatorio.";
      valid = false;
    }
    if (!this.isEditMode) {
      if (!this.adminForm.password) {
        this.fieldErrors["password"] = "La contrase\xF1a es obligatoria.";
        valid = false;
      } else if (this.adminForm.password.length < 6) {
        this.fieldErrors["password"] = "La contrase\xF1a debe tener al menos 6 caracteres.";
        valid = false;
      }
    } else if (this.adminForm.password && this.adminForm.password.length < 6) {
      this.fieldErrors["password"] = "La contrase\xF1a debe tener al menos 6 caracteres.";
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
    this.adminForm.password = pw;
    this.fieldErrors["password"] = "";
    this.cdr.detectChanges();
  }
  closeFormDrawer() {
    this.showFormDrawer = false;
    this.cdr.detectChanges();
  }
  // ===================== GUARDAR (CREAR / EDITAR) =====================
  async submitForm() {
    this.formError = "";
    if (!this.validateForm())
      return;
    this.formLoading = true;
    this.cdr.detectChanges();
    try {
      if (this.isEditMode) {
        const { error } = await this.auth.updateProfile(this.adminForm.id, {
          full_name: this.adminForm.full_name.trim(),
          seller_number: this.adminForm.seller_number.trim(),
          active: this.adminForm.active,
          role: "admin",
          agency_name: "GoLease",
          agency_location: "Quer\xE9taro"
        });
        if (error) {
          this.formError = "Error al actualizar: " + error.message;
          this.formLoading = false;
          this.cdr.detectChanges();
          return;
        }
        if (this.adminForm.password) {
          const { error: pwdError } = await this.auth.updateUserPassword(this.adminForm.id, this.adminForm.password);
          if (pwdError) {
            this.formError = "Error al cambiar la contrase\xF1a: " + pwdError.message;
            this.formLoading = false;
            this.cdr.detectChanges();
            return;
          }
        }
        this.toastService.success("Administrador actualizado correctamente");
        this.closeFormDrawer();
        await this.loadAdmins();
        return;
      }
      const email = `admin_${this.adminForm.seller_number.trim()}@golease.com`;
      const created = await this.auth.createUserAsAdmin({
        email,
        password: this.adminForm.password,
        full_name: this.adminForm.full_name.trim(),
        role: "admin"
      });
      if (!created.error && created.data?.id) {
        const { error: profileError2 } = await this.auth.updateProfile(created.data.id, {
          email,
          seller_number: this.adminForm.seller_number.trim(),
          full_name: this.adminForm.full_name.trim(),
          active: true,
          role: "admin",
          agency_name: "GoLease",
          agency_location: "Quer\xE9taro"
        });
        if (profileError2) {
          this.toastService.error("Usuario creado, pero fall\xF3 su perfil: " + profileError2.message);
        } else {
          const roleOk2 = await this.ensureRole(created.data.id, "admin");
          if (roleOk2) {
            this.toastService.success("Administrador creado correctamente");
          } else {
            this.toastService.error("El usuario se cre\xF3 pero qued\xF3 como Vendedor. Elim\xEDnalo desde el CRUD e intenta de nuevo.");
          }
        }
        this.closeFormDrawer();
        await this.loadAdmins();
        this.cdr.detectChanges();
        return;
      }
      const { data: { session: adminSession } } = await this.client.auth.getSession();
      const { error: authError } = await this.auth.signUp(email, this.adminForm.password, this.adminForm.full_name);
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
        seller_number: this.adminForm.seller_number.trim(),
        full_name: this.adminForm.full_name.trim(),
        active: true,
        role: "admin",
        agency_name: "GoLease",
        agency_location: "Quer\xE9taro"
      });
      if (profileError) {
        this.formError = "Error al guardar perfil: " + profileError.message;
        this.formLoading = false;
        this.cdr.detectChanges();
        return;
      }
      const roleOk = await this.ensureRole(newUser.id, "admin");
      if (!roleOk) {
        this.formError = "El usuario se cre\xF3 pero qued\xF3 como Vendedor. Elim\xEDnalo desde el CRUD e intenta de nuevo.";
        this.toastService.error(this.formError);
        this.formLoading = false;
        this.cdr.detectChanges();
        return;
      }
      this.toastService.success("Administrador creado correctamente");
      this.closeFormDrawer();
      await this.loadAdmins();
      this.cdr.detectChanges();
    } catch (err) {
      this.formError = "Error inesperado: " + (err.message || "");
      this.formLoading = false;
      this.cdr.detectChanges();
    }
  }
  // ===================== HELPERS =====================
  /** Confirma que el perfil quedó con el rol esperado tras la creación. */
  async ensureRole(userId, expected) {
    const { data } = await this.auth.getProfileById(userId);
    return !!data && data.role === expected;
  }
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
  static \u0275fac = function AdminAdminsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminAdminsComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminAdminsComponent, selectors: [["app-admin-admins"]], hostBindings: function AdminAdminsComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("keydown.escape", function AdminAdminsComponent_keydown_escape_HostBindingHandler() {
        return ctx.onEscapeKey();
      }, \u0275\u0275resolveDocument);
    }
  }, decls: 81, vars: 26, consts: [[1, "admins-container"], [1, "page-header"], [1, "page-heading"], [1, "page-kicker"], [1, "btn-primary", 3, "click"], [1, "button-icon"], [1, "stats-grid"], ["type", "button", 1, "stat-card", 3, "click"], [1, "stat-icon", "tone-slate"], ["viewBox", "0 0 24 24", "aria-hidden", "true"], ["d", "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"], ["cx", "9", "cy", "7", "r", "4"], ["d", "M23 21v-2a4 4 0 0 0-3-3.87"], ["d", "M16 3.13a4 4 0 0 1 0 7.75"], [1, "stat-body"], [1, "stat-icon", "tone-green"], ["d", "M22 11.08V12a10 10 0 1 1-5.93-9.14"], ["d", "M22 4 12 14.01l-3-3"], [1, "stat-icon", "tone-amber"], ["d", "M8 11l3 3 6-6"], [1, "toolbar"], [1, "search-wrapper"], ["viewBox", "0 0 24 24", "aria-hidden", "true", 1, "search-icon"], ["cx", "11", "cy", "11", "r", "8"], ["x1", "21", "y1", "21", "x2", "16.65", "y2", "16.65"], ["type", "text", "placeholder", "Buscar por nombre o n\xFAmero...", 1, "search-input", 3, "ngModelChange", "input", "ngModel"], ["type", "button", "class", "search-clear", "aria-label", "Limpiar b\xFAsqueda", 3, "click", 4, "ngIf"], ["role", "group", "aria-label", "Filtrar por estado", 1, "chip-group"], ["type", "button", 1, "chip", 3, "click"], [1, "toolbar-select"], ["d", "M3 6h18"], ["d", "M7 12h10"], ["d", "M10 18h4"], [3, "ngModelChange", "change", "ngModel"], ["value", "recientes"], ["value", "nombre"], ["value", "antiguos"], ["class", "results-count", 4, "ngIf"], ["class", "skeleton-list", "aria-label", "Cargando administradores", 4, "ngIf"], ["class", "table-wrapper", 4, "ngIf"], ["class", "catalog-state empty-state", 4, "ngIf"], [1, "toast-host"], ["class", "toast", 3, "class", "click", 4, "ngFor", "ngForOf"], ["class", "modal-overlay", 3, "click", 4, "ngIf"], ["class", "drawer-overlay", 3, "click", 4, "ngIf"], ["type", "button", "aria-label", "Limpiar b\xFAsqueda", 1, "search-clear", 3, "click"], [1, "results-count"], ["aria-label", "Cargando administradores", 1, "skeleton-list"], ["class", "skeleton-row", 4, "ngFor", "ngForOf"], [1, "skeleton-row"], [1, "table-wrapper"], [1, "users-table"], [1, "actions-column"], ["tabindex", "0", 3, "is-selected", "click", "keydown.enter", "keydown.space", 4, "ngFor", "ngForOf"], ["tabindex", "0", 3, "click", "keydown.enter", "keydown.space"], ["data-label", "Administrador", 1, "user-cell"], ["aria-hidden", "true", 1, "avatar"], [1, "avatar-dot"], [1, "user-meta"], ["data-label", "N\xB0 de contacto"], [1, "id-chip"], ["data-label", "Estado"], ["type", "button", "role", "switch", 1, "switch", 3, "click", "title"], [1, "switch-thumb"], [1, "switch-label"], ["data-label", "Acciones", 1, "actions-column", 3, "click"], [1, "action-buttons"], ["title", "Editar", "aria-label", "Editar administrador", 1, "btn-icon", "btn-edit", 3, "click"], ["d", "M12 20h9"], ["d", "M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"], ["title", "Eliminar", "aria-label", "Eliminar administrador", 1, "btn-icon", "btn-delete", 3, "click"], ["d", "M8 6V4h8v2"], ["d", "M19 6l-1 14H6L5 6"], ["d", "M10 11v5"], ["d", "M14 11v5"], [1, "catalog-state", "empty-state"], ["aria-hidden", "true", 1, "empty-state-icon"], ["viewBox", "0 0 24 24"], ["d", "M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"], ["cx", "10", "cy", "7", "r", "4"], ["d", "M20 8v6"], ["d", "M23 11h-6"], ["type", "button", "class", "btn-secondary", 3, "click", 4, "ngIf"], ["type", "button", "class", "btn-primary", 3, "click", 4, "ngIf"], ["type", "button", 1, "btn-secondary", 3, "click"], ["type", "button", 1, "btn-primary", 3, "click"], [1, "toast", 3, "click"], [1, "toast-icon"], [1, "toast-msg"], ["class", "toast-action", 4, "ngIf"], ["aria-label", "Cerrar", 1, "toast-close", 3, "click"], [1, "toast-action"], [1, "modal-overlay", 3, "click"], [1, "modal-content", 3, "click"], [1, "modal-heading", "modal-heading-warning"], [1, "modal-icon"], ["d", "M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"], ["d", "M12 9v4"], ["d", "M12 17h.01"], [1, "modal-eyebrow"], [1, "modal-actions"], [1, "btn-cancel", 3, "click"], [1, "btn-confirm", 3, "click", "disabled"], [1, "drawer-overlay", 3, "click"], ["role", "dialog", 1, "drawer", "form-drawer", 3, "click"], [1, "drawer-header"], ["aria-label", "Cerrar formulario", 1, "drawer-close", 3, "click"], [1, "drawer-body"], ["class", "form-banner error", 4, "ngIf"], ["class", "drawer-loading", 4, "ngIf"], ["novalidate", "", 3, "ngSubmit", 4, "ngIf"], [1, "form-banner", "error"], [1, "drawer-loading"], [1, "catalog-spinner"], ["novalidate", "", 3, "ngSubmit"], [1, "form-group"], ["type", "text", "name", "seller_number", "placeholder", "Ej. 5512345678", "inputmode", "numeric", "maxlength", "10", 3, "ngModelChange", "input", "ngModel", "disabled"], ["class", "field-error", 4, "ngIf"], [4, "ngIf"], ["type", "text", "name", "full_name", "placeholder", "Juan P\xE9rez", 3, "ngModelChange", "ngModel"], [1, "input-with-action"], ["name", "password", 3, "ngModelChange", "type", "ngModel", "placeholder"], ["type", "button", 1, "btn-ghost-icon", 3, "click", "title"], ["d", "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"], ["cx", "12", "cy", "12", "r", "3"], [1, "field-actions"], ["type", "button", 1, "btn-link", 3, "click"], ["class", "form-group", 4, "ngIf"], [1, "drawer-actions"], ["type", "button", 1, "btn-cancel", 3, "click"], ["type", "submit", 1, "btn-confirm", 3, "disabled"], [1, "field-error"], ["name", "active", 3, "ngModelChange", "ngModel"], [3, "ngValue"], ["role", "dialog", "aria-label", "Detalle del administrador", 1, "drawer", "detail-drawer", 3, "click"], ["aria-label", "Cerrar detalle", 1, "drawer-close", 3, "click"], [1, "detail-hero"], ["aria-hidden", "true", 1, "detail-avatar"], [1, "detail-hero-meta"], [1, "status-pill"], [1, "detail-section"], [1, "detail-grid"], [1, "detail-item"], ["class", "detail-item", 4, "ngIf"], [1, "detail-actions"], ["type", "button", 1, "btn-danger", 3, "click"]], template: function AdminAdminsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "span", 3);
      \u0275\u0275text(4, "Control de acceso");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "h2");
      \u0275\u0275text(6, "Administradores");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "p");
      \u0275\u0275text(8, "Gestiona los perfiles con permisos para operar la plataforma.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "button", 4);
      \u0275\u0275listener("click", function AdminAdminsComponent_Template_button_click_9_listener() {
        return ctx.openNewAdmin();
      });
      \u0275\u0275elementStart(10, "span", 5);
      \u0275\u0275text(11, "+");
      \u0275\u0275elementEnd();
      \u0275\u0275text(12, " Nuevo Administrador");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "div", 6)(14, "button", 7);
      \u0275\u0275listener("click", function AdminAdminsComponent_Template_button_click_14_listener() {
        return ctx.setStatusFilter("todos");
      });
      \u0275\u0275elementStart(15, "span", 8);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(16, "svg", 9);
      \u0275\u0275element(17, "path", 10)(18, "circle", 11)(19, "path", 12)(20, "path", 13);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(21, "span", 14)(22, "strong");
      \u0275\u0275text(23);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "small");
      \u0275\u0275text(25, "Administradores");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(26, "button", 7);
      \u0275\u0275listener("click", function AdminAdminsComponent_Template_button_click_26_listener() {
        return ctx.setStatusFilter("activos");
      });
      \u0275\u0275elementStart(27, "span", 15);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(28, "svg", 9);
      \u0275\u0275element(29, "path", 16)(30, "path", 17);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(31, "span", 14)(32, "strong");
      \u0275\u0275text(33);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "small");
      \u0275\u0275text(35, "Activos");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(36, "button", 7);
      \u0275\u0275listener("click", function AdminAdminsComponent_Template_button_click_36_listener() {
        return ctx.setStatusFilter("inactivos");
      });
      \u0275\u0275elementStart(37, "span", 18);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(38, "svg", 9);
      \u0275\u0275element(39, "path", 16)(40, "path", 19);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(41, "span", 14)(42, "strong");
      \u0275\u0275text(43);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "small");
      \u0275\u0275text(45, "Inactivos");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(46, "div", 20)(47, "div", 21);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(48, "svg", 22);
      \u0275\u0275element(49, "circle", 23)(50, "line", 24);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(51, "input", 25);
      \u0275\u0275twoWayListener("ngModelChange", function AdminAdminsComponent_Template_input_ngModelChange_51_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
        return $event;
      });
      \u0275\u0275listener("input", function AdminAdminsComponent_Template_input_input_51_listener() {
        return ctx.onSearch();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275template(52, AdminAdminsComponent_button_52_Template, 2, 0, "button", 26);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(53, "div", 27)(54, "button", 28);
      \u0275\u0275listener("click", function AdminAdminsComponent_Template_button_click_54_listener() {
        return ctx.setStatusFilter("todos");
      });
      \u0275\u0275text(55, "Todos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(56, "button", 28);
      \u0275\u0275listener("click", function AdminAdminsComponent_Template_button_click_56_listener() {
        return ctx.setStatusFilter("activos");
      });
      \u0275\u0275text(57, "Activos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(58, "button", 28);
      \u0275\u0275listener("click", function AdminAdminsComponent_Template_button_click_58_listener() {
        return ctx.setStatusFilter("inactivos");
      });
      \u0275\u0275text(59, "Inactivos");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(60, "label", 29);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(61, "svg", 9);
      \u0275\u0275element(62, "path", 30)(63, "path", 31)(64, "path", 32);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(65, "select", 33);
      \u0275\u0275twoWayListener("ngModelChange", function AdminAdminsComponent_Template_select_ngModelChange_65_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.sortBy, $event) || (ctx.sortBy = $event);
        return $event;
      });
      \u0275\u0275listener("change", function AdminAdminsComponent_Template_select_change_65_listener() {
        return ctx.setSortBy(ctx.sortBy);
      });
      \u0275\u0275elementStart(66, "option", 34);
      \u0275\u0275text(67, "M\xE1s recientes");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(68, "option", 35);
      \u0275\u0275text(69, "Nombre A\u2013Z");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(70, "option", 36);
      \u0275\u0275text(71, "Antiguos");
      \u0275\u0275elementEnd()();
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275template(72, AdminAdminsComponent_span_72_Template, 2, 1, "span", 37);
      \u0275\u0275elementEnd();
      \u0275\u0275template(73, AdminAdminsComponent_div_73_Template, 2, 2, "div", 38)(74, AdminAdminsComponent_div_74_Template, 14, 1, "div", 39)(75, AdminAdminsComponent_div_75_Template, 13, 4, "div", 40);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(76, "div", 41);
      \u0275\u0275template(77, AdminAdminsComponent_div_77_Template, 8, 5, "div", 42);
      \u0275\u0275elementEnd();
      \u0275\u0275template(78, AdminAdminsComponent_div_78_Template, 25, 3, "div", 43)(79, AdminAdminsComponent_div_79_Template, 14, 6, "div", 44)(80, AdminAdminsComponent_div_80_Template, 52, 15, "div", 44);
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
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.sortBy);
      \u0275\u0275control();
      \u0275\u0275advance(7);
      \u0275\u0275property("ngIf", !ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && ctx.filteredAdmins().length > 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && ctx.filteredAdmins().length === 0);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", ctx.toastService.toasts());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showConfirmModal);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showFormDrawer);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showDetailDrawer && ctx.detailAdmin);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, MaxLengthValidator, NgModel, NgForm, DatePipe], styles: ['\n.admins-container[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  background: var(--%NS%surface-subtle);\n  border: 0;\n  padding: 0;\n  box-shadow: none;\n}\n.admins-container[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 38%;\n  height: 190px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(32, 176, 56, 0.14),\n      rgba(16, 37, 31, 0.07));\n  clip-path: polygon(35% 0, 100% 0, 100% 100%, 0 100%);\n  pointer-events: none;\n  z-index: 0;\n}\n.admins-container[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-end;\n  min-height: 152px;\n  margin: 0 0 1.15rem;\n  padding: 1.5rem 1.75rem;\n  border: 1px solid rgba(139, 226, 140, 0.22);\n  border-radius: 16px;\n  background:\n    linear-gradient(\n      115deg,\n      #10251f 0%,\n      #173c2e 68%,\n      #1f6840 100%);\n  box-shadow: 0 16px 30px rgba(16, 37, 31, 0.16);\n}\n.admins-container[_ngcontent-%COMP%]   .page-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0.25rem 0 0.35rem;\n  color: var(--%NS%text-on-accent);\n  font-size: 2rem;\n  line-height: 1;\n}\n.admins-container[_ngcontent-%COMP%]   .page-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  max-width: 420px;\n  margin: 0;\n  color: #bdd6c7;\n  font-size: 0.88rem;\n}\n.page-kicker[_ngcontent-%COMP%] {\n  color: #8be28c;\n  font-size: 0.68rem;\n  font-weight: 700;\n  letter-spacing: 1.2px;\n  text-transform: uppercase;\n}\n.admins-container[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%], \n.btn-primary[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 2;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  min-height: 44px;\n  padding: 0.75rem 1rem;\n  border: 0;\n  border-radius: 9px;\n  background: var(--%NS%btn-primary-bg);\n  color: var(--%NS%btn-primary-text);\n  box-shadow: none;\n  white-space: nowrap;\n  cursor: pointer;\n  font-weight: 700;\n  font-size: 0.9rem;\n  transition: all 0.2s;\n  text-decoration: none;\n}\n.admins-container[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%]:hover, \n.btn-primary[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%btn-primary-bg-hover);\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.16);\n}\n.button-icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 20px;\n  height: 20px;\n  margin-right: 0.25rem;\n  border: 1px solid rgba(16, 37, 31, 0.25);\n  border-radius: 50%;\n  font-size: 1rem;\n  line-height: 1;\n}\n.stats-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 0.8rem;\n  margin: 0 0 1rem;\n}\n.stat-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.7rem;\n  padding: 0.95rem 1rem;\n  border: 1px solid var(--%NS%border-color);\n  border-radius: 14px;\n  background: var(--%NS%surface-card);\n  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.05);\n  text-align: left;\n  cursor: pointer;\n  font-family: var(--%NS%font-body);\n  transition:\n    transform 0.18s ease,\n    border-color 0.18s ease,\n    box-shadow 0.18s ease;\n}\nbutton.stat-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  border-color: #bbe8bf;\n  box-shadow: 0 10px 22px rgba(15, 23, 42, 0.08);\n}\n.stat-card.is-active[_ngcontent-%COMP%] {\n  border-color: var(--%NS%accent-green);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.12);\n  background: var(--%NS%surface-hover);\n}\n.stat-icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 42px;\n  height: 42px;\n  flex-shrink: 0;\n  border-radius: 12px;\n}\n.stat-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 22px;\n  height: 22px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 1.8;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.tone-slate[_ngcontent-%COMP%] {\n  background: var(--%NS%surface-muted);\n  color: var(--%NS%text-silver);\n}\n.tone-green[_ngcontent-%COMP%] {\n  background: var(--%NS%accent-green-light);\n  color: var(--%NS%accent-green-dark);\n}\n.tone-amber[_ngcontent-%COMP%] {\n  background: var(--%NS%warning-bg);\n  color: var(--%NS%warning);\n}\n.stat-body[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  line-height: 1.1;\n}\n.stat-body[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 1.35rem;\n  font-weight: 800;\n  color: var(--%NS%btn-primary-text);\n}\n.stat-body[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  margin-top: 0.2rem;\n  color: var(--%NS%text-muted);\n  font-size: 0.72rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.4px;\n}\n.toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 0.6rem;\n  margin: 0 0 1.15rem;\n  padding: 0.6rem 0.75rem;\n  border: 1px solid var(--%NS%border-color);\n  border-radius: 14px;\n  background: var(--%NS%surface-card);\n  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.05);\n}\n.search-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  flex: 1 1 240px;\n  display: flex;\n  align-items: center;\n}\n.search-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 0.8rem;\n  width: 17px;\n  height: 17px;\n  fill: none;\n  stroke: var(--%NS%accent-silver);\n  stroke-width: 2;\n  stroke-linecap: round;\n  pointer-events: none;\n}\n.search-input[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 38px;\n  padding: 0.4rem 2.3rem 0.4rem 2.4rem;\n  border: 1px solid var(--%NS%input-border);\n  border-radius: 9px;\n  font-size: 0.9rem;\n  background: var(--%NS%surface-subtle);\n  color: var(--%NS%text-silver);\n  transition:\n    border-color 0.2s ease,\n    box-shadow 0.2s ease,\n    background 0.2s ease;\n}\n.search-input[_ngcontent-%COMP%]::placeholder {\n  color: var(--%NS%accent-silver);\n}\n.search-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--%NS%accent-green);\n  background: var(--%NS%surface-card);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.1);\n}\n.search-clear[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0.45rem;\n  width: 24px;\n  height: 24px;\n  border: 0;\n  border-radius: 50%;\n  background: var(--%NS%surface-muted);\n  color: var(--%NS%text-muted);\n  font-size: 1rem;\n  line-height: 1;\n  cursor: pointer;\n}\n.search-clear[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%input-border);\n  color: var(--%NS%text-main);\n}\n.chip-group[_ngcontent-%COMP%] {\n  display: inline-flex;\n  gap: 0.3rem;\n  padding: 0.22rem;\n  border-radius: 999px;\n  background: var(--%NS%surface-hover);\n}\n.chip[_ngcontent-%COMP%] {\n  padding: 0.35rem 0.85rem;\n  border: 0;\n  border-radius: 999px;\n  background: transparent;\n  color: var(--%NS%text-muted);\n  font-size: 0.78rem;\n  font-weight: 700;\n  cursor: pointer;\n  transition:\n    background 0.18s,\n    color 0.18s,\n    box-shadow 0.18s;\n}\n.chip[_ngcontent-%COMP%]:hover {\n  color: var(--%NS%text-silver);\n}\n.chip.is-active[_ngcontent-%COMP%] {\n  background: var(--%NS%surface-card);\n  color: var(--%NS%accent-green-dark);\n  box-shadow: 0 3px 8px rgba(15, 23, 42, 0.12);\n}\n.toolbar-select[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n}\n.toolbar-select[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 0.7rem;\n  width: 15px;\n  height: 15px;\n  fill: none;\n  stroke: var(--%NS%accent-silver);\n  stroke-width: 1.9;\n  stroke-linecap: round;\n  pointer-events: none;\n}\n.toolbar-select[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  min-height: 38px;\n  padding: 0.4rem 1.9rem 0.4rem 2rem;\n  border: 1px solid var(--%NS%input-border);\n  border-radius: 9px;\n  background: var(--%NS%surface-subtle);\n  color: var(--%NS%text-silver);\n  font-size: 0.85rem;\n  cursor: pointer;\n  appearance: none;\n  transition: border-color 0.2s, box-shadow 0.2s;\n}\n.toolbar-select[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--%NS%accent-green);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.1);\n}\n.results-count[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  margin-left: auto;\n  color: var(--%NS%text-muted);\n  font-size: 0.8rem;\n  white-space: nowrap;\n}\n.skeleton-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.7rem;\n}\n.skeleton-row[_ngcontent-%COMP%] {\n  height: 62px;\n  border-radius: 12px;\n  background:\n    linear-gradient(\n      90deg,\n      var(--%NS%surface-muted) 25%,\n      var(--%NS%surface-subtle) 50%,\n      var(--%NS%surface-muted) 75%);\n  background-size: 200% 100%;\n  animation: _ngcontent-%COMP%_shimmer 1.4s infinite;\n}\n@keyframes _ngcontent-%COMP%_shimmer {\n  0% {\n    background-position: 200% 0;\n  }\n  100% {\n    background-position: -200% 0;\n  }\n}\n.table-wrapper[_ngcontent-%COMP%] {\n  overflow-x: auto;\n  border: 1px solid var(--%NS%input-border);\n  border-radius: 14px;\n  background: var(--%NS%surface-card);\n  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.04);\n}\n.users-table[_ngcontent-%COMP%] {\n  width: 100%;\n  min-width: 640px;\n  border-collapse: collapse;\n  font-size: 0.88rem;\n}\n.users-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 0.85rem 1rem;\n  background: var(--%NS%surface-subtle);\n  color: var(--%NS%text-muted);\n  font-size: 0.7rem;\n  letter-spacing: 0.6px;\n  text-align: left;\n  text-transform: uppercase;\n  white-space: nowrap;\n}\n.users-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 0.8rem 1rem;\n  border-top: 1px solid var(--%NS%border-color);\n  color: var(--%NS%text-silver);\n  vertical-align: middle;\n}\n.users-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: background-color 0.2s ease;\n}\n.users-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: var(--%NS%surface-hover);\n}\n.users-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.is-selected[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  background: var(--%NS%accent-green-light);\n  border-top-color: #c4eacb;\n}\n.users-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.is-selected[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {\n  box-shadow: inset 4px 0 0 var(--%NS%accent-green);\n}\n.user-cell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  min-width: 220px;\n}\n.user-meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  line-height: 1.25;\n  min-width: 0;\n}\n.user-meta[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--%NS%btn-primary-text);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.user-meta[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: var(--%NS%accent-silver);\n  font-size: 0.78rem;\n}\n.avatar[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 44px;\n  height: 44px;\n  flex-shrink: 0;\n  border-radius: 50%;\n  color: var(--%NS%text-on-accent);\n  font-size: 0.92rem;\n  font-weight: 700;\n  letter-spacing: 0.5px;\n  box-shadow: 0 4px 10px rgba(15, 23, 42, 0.22);\n}\n.avatar-tone-0[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #065f46,\n      #34d399);\n}\n.avatar-tone-1[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #0f766e,\n      #2dd4bf);\n}\n.avatar-tone-2[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #1e3a8a,\n      #60a5fa);\n}\n.avatar-tone-3[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #7c3aed,\n      #a78bfa);\n}\n.avatar-tone-4[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #9a3412,\n      #fb923c);\n}\n.avatar-tone-5[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #10251f,\n      #1f6840);\n}\n.avatar-dot[_ngcontent-%COMP%] {\n  position: absolute;\n  right: -1px;\n  bottom: -1px;\n  width: 13px;\n  height: 13px;\n  border-radius: 50%;\n  border: 2.5px solid var(--%NS%surface-card);\n  background: var(--%NS%border-strong);\n}\n.avatar-dot.is-on[_ngcontent-%COMP%] {\n  background: #22c55e;\n  animation: _ngcontent-%COMP%_pulse 2s infinite;\n}\n@keyframes _ngcontent-%COMP%_pulse {\n  0%, 100% {\n    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.45);\n  }\n  70% {\n    box-shadow: 0 0 0 7px rgba(34, 197, 94, 0);\n  }\n}\n.id-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.28rem 0.7rem;\n  border-radius: 999px;\n  background: var(--%NS%surface-muted);\n  border: 1px solid var(--%NS%border-color);\n  color: var(--%NS%text-silver);\n  font-size: 0.8rem;\n  font-weight: 700;\n  font-family: var(--%NS%font-mono);\n  white-space: nowrap;\n}\n.switch[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-block;\n  width: 42px;\n  height: 24px;\n  border: 0;\n  border-radius: 999px;\n  background: var(--%NS%border-strong);\n  cursor: pointer;\n  vertical-align: middle;\n  box-shadow: inset 0 0 0 1px rgba(15, 23, 42, 0.06);\n  transition: background 0.25s ease;\n}\n.switch[_ngcontent-%COMP%]   .switch-thumb[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 3px;\n  left: 3px;\n  width: 18px;\n  height: 18px;\n  border-radius: 50%;\n  background: var(--%NS%surface-card);\n  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.28);\n  transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);\n}\n.switch.is-on[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      var(--%NS%accent-green-dark),\n      var(--%NS%accent-green));\n}\n.switch.is-on[_ngcontent-%COMP%]   .switch-thumb[_ngcontent-%COMP%] {\n  transform: translateX(18px);\n}\n.switch-label[_ngcontent-%COMP%] {\n  margin-left: 0.4rem;\n  font-size: 0.78rem;\n  font-weight: 700;\n  color: var(--%NS%text-muted);\n  vertical-align: middle;\n}\n.actions-column[_ngcontent-%COMP%] {\n  text-align: right !important;\n}\n.action-buttons[_ngcontent-%COMP%] {\n  display: inline-flex;\n  gap: 0.35rem;\n}\n.btn-icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 34px;\n  height: 34px;\n  border: 1px solid transparent;\n  border-radius: 9px;\n  background: transparent;\n  cursor: pointer;\n  transition: all 0.18s ease;\n}\n.btn-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 17px;\n  height: 17px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 1.9;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.btn-edit[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%info-bg);\n  color: var(--%NS%info);\n  border-color: var(--%NS%info-border);\n}\n.btn-delete[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%danger-bg);\n  color: var(--%NS%danger);\n  border-color: var(--%NS%danger-border);\n}\n.catalog-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 2.5rem 1.5rem;\n  color: var(--%NS%text-muted);\n}\n.catalog-state.empty-state[_ngcontent-%COMP%]    > strong[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 0.35rem;\n  color: var(--%NS%text-silver);\n  font-size: 1rem;\n}\n.catalog-state.empty-state[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:last-child {\n  display: block;\n  color: var(--%NS%accent-silver);\n  font-size: 0.82rem;\n  margin-bottom: 1rem;\n}\n.empty-state-icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 52px;\n  height: 52px;\n  margin-bottom: 0.6rem;\n  border-radius: 14px;\n  background: var(--%NS%accent-green-light);\n  color: var(--%NS%accent-green-dark);\n}\n.empty-state-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n  fill: none;\n  stroke: currentColor;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n  stroke-width: 1.7;\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.4rem;\n  min-height: 38px;\n  padding: 0.55rem 1rem;\n  border: 1px solid var(--%NS%input-border);\n  border-radius: 9px;\n  background: var(--%NS%surface-card);\n  color: var(--%NS%text-silver);\n  font-weight: 700;\n  font-size: 0.85rem;\n  cursor: pointer;\n  transition: all 0.18s ease;\n}\n.btn-secondary[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%surface-hover);\n  border-color: var(--%NS%border-strong);\n}\n.toast-host[_ngcontent-%COMP%] {\n  position: fixed;\n  z-index: 4000;\n  right: 1.1rem;\n  bottom: 1.1rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.6rem;\n  max-width: 400px;\n}\n.toast[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  padding: 0.75rem 0.9rem;\n  border-radius: 12px;\n  background: var(--%NS%text-main);\n  color: var(--%NS%surface-card);\n  font-size: 0.86rem;\n  box-shadow: 0 16px 34px -10px rgba(15, 23, 42, 0.35);\n  animation: _ngcontent-%COMP%_toastIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);\n  cursor: pointer;\n}\n@keyframes _ngcontent-%COMP%_toastIn {\n  from {\n    opacity: 0;\n    transform: translateY(14px) scale(0.97);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n.toast-success[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #14532d,\n      var(--%NS%accent-green-dark));\n}\n.toast-error[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #7f1d1d,\n      var(--%NS%danger));\n}\n.toast-info[_ngcontent-%COMP%] {\n  background: var(--%NS%text-main);\n}\n.toast-icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 22px;\n  height: 22px;\n  flex-shrink: 0;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, 0.18);\n  font-size: 0.75rem;\n  font-weight: 800;\n}\n.toast-msg[_ngcontent-%COMP%] {\n  flex: 1;\n  line-height: 1.35;\n}\n.toast-action[_ngcontent-%COMP%] {\n  padding: 0.28rem 0.65rem;\n  border-radius: 8px;\n  background: var(--%NS%surface-card);\n  color: var(--%NS%accent-green-dark);\n  font-size: 0.75rem;\n  font-weight: 800;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  white-space: nowrap;\n}\n.toast-close[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 22px;\n  height: 22px;\n  border: 0;\n  border-radius: 50%;\n  background: transparent;\n  color: rgba(255, 255, 255, 0.75);\n  font-size: 1rem;\n  cursor: pointer;\n}\n.toast-close[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.15);\n  color: var(--%NS%surface-card);\n}\n.drawer-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 3000;\n  display: flex;\n  justify-content: flex-end;\n  background: rgba(15, 23, 42, 0.45);\n  -webkit-backdrop-filter: blur(3px);\n  backdrop-filter: blur(3px);\n  animation: _ngcontent-%COMP%_fadeIn 0.25s ease;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.drawer[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  width: min(500px, 100vw);\n  height: 100%;\n  background: var(--%NS%surface-subtle);\n  box-shadow: -24px 0 60px rgba(15, 23, 42, 0.28);\n  animation: _ngcontent-%COMP%_slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1);\n  overflow: hidden;\n}\n@keyframes _ngcontent-%COMP%_slideInRight {\n  from {\n    transform: translateX(100%);\n  }\n  to {\n    transform: translateX(0);\n  }\n}\n.form-drawer[_ngcontent-%COMP%] {\n  width: min(560px, 100vw);\n}\n.drawer-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n  flex-shrink: 0;\n  padding: 1.4rem 1.5rem 1.1rem;\n  border-bottom: 1px solid var(--%NS%border-color);\n  background: var(--%NS%surface-card);\n}\n.drawer-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0.2rem 0 0;\n  color: var(--%NS%btn-primary-text);\n  font-size: 1.25rem;\n}\n.drawer-close[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 34px;\n  height: 34px;\n  flex-shrink: 0;\n  border: 1px solid var(--%NS%border-color);\n  border-radius: 10px;\n  background: var(--%NS%surface-subtle);\n  color: var(--%NS%text-silver);\n  font-size: 1.25rem;\n  line-height: 1;\n  cursor: pointer;\n  transition: all 0.18s ease;\n}\n.drawer-close[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%danger-bg);\n  color: var(--%NS%danger);\n  border-color: var(--%NS%danger-border);\n}\n.drawer-body[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1.4rem 1.5rem;\n}\n.drawer-loading[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.6rem;\n  padding: 2rem;\n  color: var(--%NS%text-muted);\n  font-size: 0.9rem;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 1.15rem;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 0.4rem;\n  color: var(--%NS%text-silver);\n  font-size: 0.78rem;\n  font-weight: 800;\n  letter-spacing: 0.5px;\n  text-transform: uppercase;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 44px;\n  padding: 0.65rem 0.85rem;\n  border: 1.5px solid var(--%NS%input-border);\n  border-radius: 10px;\n  background: var(--%NS%surface-card);\n  color: var(--%NS%text-main);\n  font-size: 0.92rem;\n  font-family: var(--%NS%font-body);\n  transition:\n    border-color 0.2s,\n    box-shadow 0.2s,\n    background 0.2s;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--%NS%accent-green);\n  background: var(--%NS%surface-card);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.1);\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:disabled {\n  background: var(--%NS%surface-hover);\n  color: var(--%NS%text-muted);\n  cursor: not-allowed;\n}\n.form-group[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 0.35rem;\n  color: var(--%NS%accent-silver);\n  font-size: 0.76rem;\n}\n.form-group.has-error[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.form-group.has-error[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.form-group.has-error[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  border-color: var(--%NS%danger);\n  background: var(--%NS%danger-bg);\n}\n.form-group.has-error[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.form-group.has-error[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, \n.form-group.has-error[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);\n}\n.field-error[_ngcontent-%COMP%] {\n  color: var(--%NS%danger) !important;\n  font-weight: 600;\n}\n.field-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.6rem;\n  margin-top: 0.35rem;\n}\n.btn-link[_ngcontent-%COMP%] {\n  border: 0;\n  background: transparent;\n  color: var(--%NS%accent-green-dark);\n  font-size: 0.78rem;\n  font-weight: 700;\n  cursor: pointer;\n  text-decoration: underline;\n  text-underline-offset: 3px;\n  padding: 0;\n}\n.btn-link[_ngcontent-%COMP%]:hover {\n  color: var(--%NS%accent-green-dark);\n}\n.input-with-action[_ngcontent-%COMP%] {\n  position: relative;\n}\n.input-with-action[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  padding-right: 3rem;\n}\n.input-with-action[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--%NS%accent-green);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.1);\n}\n.btn-ghost-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0.45rem;\n  top: 50%;\n  transform: translateY(-50%);\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  border: 0;\n  border-radius: 8px;\n  background: var(--%NS%surface-muted);\n  color: var(--%NS%text-silver);\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n.btn-ghost-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 17px;\n  height: 17px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 1.9;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.btn-ghost-icon[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%input-border);\n  color: var(--%NS%text-main);\n}\n.form-banner[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n  padding: 0.7rem 0.9rem;\n  border-radius: 10px;\n  font-size: 0.85rem;\n  font-weight: 600;\n}\n.form-banner.error[_ngcontent-%COMP%] {\n  background: var(--%NS%danger-bg);\n  border: 1px solid var(--%NS%danger-border);\n  color: var(--%NS%danger);\n}\n.drawer-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.6rem;\n  padding-top: 0.35rem;\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 3500;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 1rem;\n  background: rgba(15, 23, 42, 0.5);\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: _ngcontent-%COMP%_fadeIn 0.2s ease;\n}\n.modal-content[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 470px;\n  max-height: 92vh;\n  overflow-y: auto;\n  border-radius: 18px;\n  background: var(--%NS%surface-card);\n  border: 1px solid var(--%NS%border-color);\n  padding: 1.6rem 1.7rem 1.4rem;\n  box-shadow: 0 30px 70px -20px rgba(15, 23, 42, 0.4);\n  animation: _ngcontent-%COMP%_riseIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);\n}\n@keyframes _ngcontent-%COMP%_riseIn {\n  from {\n    opacity: 0;\n    transform: translateY(18px) scale(0.97);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n.modal-heading[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.8rem;\n  margin-bottom: 1rem;\n}\n.modal-icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 42px;\n  height: 42px;\n  flex-shrink: 0;\n  border-radius: 12px;\n}\n.modal-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 21px;\n  height: 21px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 1.8;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.modal-heading-warning[_ngcontent-%COMP%]   .modal-icon[_ngcontent-%COMP%] {\n  background: var(--%NS%warning-bg);\n  color: var(--%NS%warning);\n}\n.modal-eyebrow[_ngcontent-%COMP%] {\n  display: block;\n  color: var(--%NS%accent-silver);\n  font-size: 0.66rem;\n  font-weight: 800;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n}\n.modal-content[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--%NS%btn-primary-text);\n  font-size: 1.15rem;\n}\n.modal-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--%NS%text-silver);\n  font-size: 0.9rem;\n  line-height: 1.55;\n}\n.modal-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.6rem;\n  margin-top: 1.3rem;\n}\n.btn-cancel[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 40px;\n  padding: 0.55rem 1.15rem;\n  border: 1px solid var(--%NS%input-border);\n  border-radius: 9px;\n  background: var(--%NS%surface-card);\n  color: var(--%NS%text-silver);\n  font-weight: 700;\n  font-size: 0.85rem;\n  cursor: pointer;\n  transition: all 0.18s ease;\n}\n.btn-cancel[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%surface-hover);\n  border-color: var(--%NS%border-strong);\n}\n.btn-confirm[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 40px;\n  padding: 0.55rem 1.3rem;\n  border: 0;\n  border-radius: 9px;\n  background:\n    linear-gradient(\n      135deg,\n      var(--%NS%accent-green-dark),\n      var(--%NS%accent-green));\n  color: var(--%NS%text-on-accent);\n  font-weight: 700;\n  font-size: 0.85rem;\n  cursor: pointer;\n  box-shadow: 0 10px 20px -8px rgba(32, 176, 56, 0.5);\n  transition: transform 0.18s ease, box-shadow 0.18s ease;\n}\n.btn-confirm[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 14px 26px -8px rgba(32, 176, 56, 0.55);\n}\n.btn-confirm[_ngcontent-%COMP%]:disabled {\n  opacity: 0.65;\n  cursor: wait;\n  transform: none;\n}\n.status-active[_ngcontent-%COMP%] {\n  background: var(--%NS%accent-green-light);\n  color: var(--%NS%accent-green-dark);\n  border: 1px solid #c9ecd0;\n}\n.status-inactive[_ngcontent-%COMP%] {\n  background: var(--%NS%surface-hover);\n  color: var(--%NS%text-muted);\n  border: 1px solid var(--%NS%border-color);\n}\n@media (max-width: 768px) {\n  .admins-container[_ngcontent-%COMP%] {\n    padding: 1rem;\n    border-radius: 12px;\n  }\n  .admins-container[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n    gap: 0.85rem;\n    min-height: 0;\n    padding: 1.25rem;\n  }\n  .admins-container[_ngcontent-%COMP%]   .page-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 1.7rem;\n  }\n  .admins-container[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%] {\n    justify-content: center;\n    width: 100%;\n  }\n  .toolbar[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n    gap: 0.75rem;\n    padding: 1rem;\n  }\n  .search-wrapper[_ngcontent-%COMP%] {\n    flex: 0 0 auto;\n    width: 100%;\n  }\n  .search-input[_ngcontent-%COMP%] {\n    min-height: 44px;\n    font-size: 1rem;\n  }\n  .search-icon[_ngcontent-%COMP%] {\n    top: 50%;\n    transform: translateY(-50%);\n  }\n  .chip-group[_ngcontent-%COMP%] {\n    width: 100%;\n    display: flex;\n    flex-wrap: wrap;\n    justify-content: center;\n    gap: 0.5rem;\n    padding: 0;\n    background: transparent;\n    border-radius: 0;\n  }\n  .chip[_ngcontent-%COMP%] {\n    min-height: 38px;\n    padding: 0.4rem 1rem;\n    border: 1px solid var(--%NS%border-color);\n    background: var(--%NS%surface-subtle);\n    color: var(--%NS%text-silver);\n    border-radius: 999px;\n    white-space: nowrap;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n  }\n  .chip[_ngcontent-%COMP%]:hover {\n    border-color: #8bd39a;\n    background: var(--%NS%surface-hover);\n    color: var(--%NS%accent-green-dark);\n  }\n  .chip.is-active[_ngcontent-%COMP%] {\n    background: var(--%NS%accent-green-light);\n    border-color: var(--%NS%accent-green);\n    color: var(--%NS%accent-green-dark);\n  }\n  .toolbar-select[_ngcontent-%COMP%] {\n    flex: 0 0 auto;\n    width: 100%;\n  }\n  .toolbar-select[_ngcontent-%COMP%]::after {\n    content: "";\n    position: absolute;\n    right: 1.05rem;\n    top: 50%;\n    width: 9px;\n    height: 9px;\n    margin-top: -5px;\n    border-right: 2px solid var(--%NS%text-silver);\n    border-bottom: 2px solid var(--%NS%text-silver);\n    transform: rotate(45deg);\n    pointer-events: none;\n  }\n  .toolbar-select[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n    width: 100%;\n    min-height: 44px;\n    padding: 0.55rem 2.6rem 0.55rem 1.9rem;\n    font-size: 1rem;\n  }\n  .toolbar-select[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n    top: 50%;\n    transform: translateY(-50%);\n  }\n  .results-count[_ngcontent-%COMP%] {\n    margin-left: 0;\n    align-self: flex-end;\n  }\n  .stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr;\n  }\n  .drawer[_ngcontent-%COMP%] {\n    width: 100vw;\n  }\n  .modal-content[_ngcontent-%COMP%] {\n    padding: 1rem;\n    max-width: 100%;\n  }\n  .toast-host[_ngcontent-%COMP%] {\n    right: 0.7rem;\n    bottom: 0.7rem;\n    left: 0.7rem;\n    max-width: none;\n  }\n}\n@media (max-width: 768px) {\n  .table-wrapper[_ngcontent-%COMP%] {\n    overflow: visible;\n    border: none;\n    background: transparent;\n    box-shadow: none;\n  }\n  .users-table[_ngcontent-%COMP%] {\n    display: block;\n    min-width: 0;\n    background: transparent;\n  }\n  .users-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .users-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%] {\n    display: block;\n  }\n  .users-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    display: block;\n    padding: 0.9rem 1rem;\n    margin-bottom: 0.75rem;\n    background: var(--%NS%surface-card);\n    border: 1px solid var(--%NS%input-border);\n    border-radius: 14px;\n    box-shadow: 0 8px 20px rgba(15, 23, 42, 0.04);\n  }\n  .users-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n    background: transparent;\n  }\n  .users-table[_ngcontent-%COMP%]   tr.is-selected[_ngcontent-%COMP%] {\n    border-color: #8bd39a;\n  }\n  .users-table[_ngcontent-%COMP%]   tr.is-selected[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    background: transparent;\n    border-top-color: transparent;\n  }\n  .users-table[_ngcontent-%COMP%]   tr.is-selected[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {\n    box-shadow: none;\n  }\n  .users-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 0.9rem;\n    min-width: 0;\n    padding: 0.5rem 0;\n    border: 0;\n    color: var(--%NS%text-silver);\n  }\n  .users-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]    + td[_ngcontent-%COMP%] {\n    border-top: 1px solid var(--%NS%surface-hover);\n  }\n  .users-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]::before {\n    content: attr(data-label);\n    flex-shrink: 0;\n    font-size: 0.7rem;\n    font-weight: 700;\n    letter-spacing: 0.6px;\n    text-transform: uppercase;\n    color: var(--%NS%text-muted);\n  }\n  .users-table[_ngcontent-%COMP%]   td.user-cell[_ngcontent-%COMP%]::before {\n    display: none;\n  }\n  .user-cell[_ngcontent-%COMP%] {\n    justify-content: flex-start;\n    min-width: 0;\n    gap: 0.75rem;\n  }\n  .actions-column[_ngcontent-%COMP%] {\n    justify-content: flex-start;\n  }\n  .action-buttons[_ngcontent-%COMP%] {\n    margin-left: auto;\n    gap: 0.45rem;\n  }\n  .btn-icon[_ngcontent-%COMP%] {\n    width: 40px;\n    height: 40px;\n  }\n}\n.admins-container[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%]:focus-visible, \n.btn-primary[_ngcontent-%COMP%]:focus-visible, \n.admins-container[_ngcontent-%COMP%]   .btn-icon[_ngcontent-%COMP%]:focus-visible, \n.btn-icon[_ngcontent-%COMP%]:focus-visible, \n.admins-container[_ngcontent-%COMP%]   .btn-cancel[_ngcontent-%COMP%]:focus-visible, \n.btn-cancel[_ngcontent-%COMP%]:focus-visible, \n.admins-container[_ngcontent-%COMP%]   .btn-confirm[_ngcontent-%COMP%]:focus-visible, \n.btn-confirm[_ngcontent-%COMP%]:focus-visible, \n.admins-container[_ngcontent-%COMP%]   .switch[_ngcontent-%COMP%]:focus-visible, \n.switch[_ngcontent-%COMP%]:focus-visible, \n.admins-container[_ngcontent-%COMP%]   .chip[_ngcontent-%COMP%]:focus-visible, \n.chip[_ngcontent-%COMP%]:focus-visible, \n.drawer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:focus-visible, \n.drawer[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus-visible, \n.drawer[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus-visible, \n.drawer[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--%NS%accent-green);\n  outline-offset: 2px;\n}\n.btn-danger[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.45rem;\n  padding: 0.6rem 1.2rem;\n  border: none;\n  border-radius: 10px;\n  background: #e5484d;\n  color: var(--%NS%text-on-accent);\n  font-weight: 600;\n  font-size: 0.9rem;\n  font-family: inherit;\n  cursor: pointer;\n  transition:\n    background 0.2s ease,\n    transform 0.15s ease,\n    box-shadow 0.2s ease;\n}\n.btn-danger[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #d93a3f;\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(229, 72, 77, 0.25);\n}\n.btn-danger[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.btn-danger[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid #e5484d;\n  outline-offset: 2px;\n}\n.confirm-modal[_ngcontent-%COMP%] {\n  max-width: 420px;\n  width: calc(100% - 2rem);\n  text-align: center;\n}\n.confirm-icon[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 56px;\n  margin: 0 auto 0.9rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n}\n.confirm-icon.danger[_ngcontent-%COMP%] {\n  background: rgba(229, 72, 77, 0.12);\n  color: #e5484d;\n}\n.confirm-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 26px;\n  height: 26px;\n  stroke: currentColor;\n  fill: none;\n  stroke-width: 2;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.confirm-modal[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 0.5rem;\n  font-size: 1.15rem;\n  color: var(--%NS%text-main);\n}\n.confirm-modal[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 1.2rem;\n  color: #555555;\n  font-size: 0.92rem;\n  line-height: 1.5;\n}\n.confirm-modal[_ngcontent-%COMP%]   .modal-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.75rem;\n  justify-content: center;\n}\n.detail-drawer[_ngcontent-%COMP%] {\n  width: min(92vw, 470px);\n}\n.detail-hero[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  padding-bottom: 1.2rem;\n  margin-bottom: 1.2rem;\n  border-bottom: 1px solid var(--%NS%border-color);\n}\n.detail-avatar[_ngcontent-%COMP%] {\n  width: 72px;\n  height: 72px;\n  border-radius: 50%;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: 1.35rem;\n  color: var(--%NS%text-on-accent);\n  letter-spacing: 0.02em;\n  flex-shrink: 0;\n  background:\n    linear-gradient(\n      135deg,\n      var(--%NS%text-muted),\n      var(--%NS%text-silver));\n}\n.detail-avatar.avatar-tone-0[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #4f8cff,\n      #3b6fd4);\n}\n.detail-avatar.avatar-tone-1[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      var(--%NS%accent-green-dark));\n}\n.detail-avatar.avatar-tone-2[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      var(--%NS%warning));\n}\n.detail-avatar.avatar-tone-3[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #7e22ce);\n}\n.detail-avatar.avatar-tone-4[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ec4899,\n      #be185d);\n}\n.detail-avatar.avatar-tone-5[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #14b8a6,\n      #0f766e);\n}\n.detail-hero-meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 0.45rem;\n  min-width: 0;\n}\n.detail-hero-meta[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  color: var(--%NS%text-main);\n  line-height: 1.3;\n  word-break: break-word;\n}\n.status-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.25rem 0.7rem;\n  border-radius: 999px;\n  font-size: 0.75rem;\n  font-weight: 600;\n}\n.status-pill[_ngcontent-%COMP%]::before {\n  content: "";\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  background: currentColor;\n}\n.status-pill.is-on[_ngcontent-%COMP%] {\n  background: rgba(32, 176, 56, 0.12);\n  color: #1d8a34;\n}\n.status-pill[_ngcontent-%COMP%]:not(.is-on) {\n  background: rgba(229, 72, 77, 0.12);\n  color: #c53035;\n}\n.detail-section[_ngcontent-%COMP%] {\n  margin-bottom: 1.3rem;\n}\n.detail-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 0.75rem;\n  font-size: 0.78rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  color: #8a94a6;\n}\n.detail-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.75rem;\n}\n.detail-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.2rem;\n  padding: 0.7rem 0.9rem;\n  background: var(--%NS%surface-muted);\n  border: 1px solid var(--%NS%border-color);\n  border-radius: 10px;\n  min-width: 0;\n}\n.detail-item[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: #8a94a6;\n}\n.detail-item[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 0.92rem;\n  color: var(--%NS%text-main);\n  word-break: break-word;\n}\n.detail-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  margin-top: 1.5rem;\n}\n.detail-actions[_ngcontent-%COMP%]   .btn-cancel[_ngcontent-%COMP%] {\n  margin-right: auto;\n}\n@media (max-width: 520px) {\n  .detail-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .detail-hero[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n}\n@media (max-width: 480px) {\n  .stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .detail-actions[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n}\n.admins-container[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%]:not(.toast-host) {\n  position: relative;\n  z-index: 1;\n}\nhtml[data-theme="dark"][_nghost-%COMP%]   .avatar[_ngcontent-%COMP%], html[data-theme="dark"]   [_nghost-%COMP%]   .avatar[_ngcontent-%COMP%] {\n  box-shadow: inset 0 0 0 999px rgba(13, 21, 23, 0.32), 0 4px 10px rgba(0, 0, 0, 0.45);\n}\n@media (max-width: 768px) {\n  .chip[_ngcontent-%COMP%] {\n    padding: 0.55rem 1.05rem;\n  }\n  .switch[_ngcontent-%COMP%]::after {\n    content: "";\n    position: absolute;\n    inset: -10px;\n    border-radius: 999px;\n  }\n  .btn-icon[_ngcontent-%COMP%] {\n    width: 40px;\n    height: 40px;\n  }\n}\n/*# sourceMappingURL=admin-admins.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminAdminsComponent, [{
    type: Component,
    args: [{ selector: "app-admin-admins", standalone: true, imports: [CommonModule, FormsModule], template: `<div class="admins-container">\r
    <!-- CABECERA -->\r
    <div class="page-header">\r
        <div class="page-heading">\r
            <span class="page-kicker">Control de acceso</span>\r
            <h2>Administradores</h2>\r
            <p>Gestiona los perfiles con permisos para operar la plataforma.</p>\r
        </div>\r
        <button class="btn-primary" (click)="openNewAdmin()"><span class="button-icon">+</span> Nuevo Administrador</button>\r
    </div>\r
\r
    <!-- M\xC9TRICAS -->\r
    <div class="stats-grid">\r
        <button type="button" class="stat-card" [class.is-active]="statusFilter === 'todos'" (click)="setStatusFilter('todos')">\r
            <span class="stat-icon tone-slate">\r
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>\r
            </span>\r
            <span class="stat-body"><strong>{{ stats.total }}</strong><small>Administradores</small></span>\r
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
    </div>\r
\r
    <!-- B\xDASQUEDA Y FILTROS -->\r
    <div class="toolbar">\r
        <div class="search-wrapper">\r
            <svg class="search-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>\r
            <input type="text" [(ngModel)]="searchTerm" (input)="onSearch()"\r
                placeholder="Buscar por nombre o n\xFAmero..." class="search-input" />\r
            <button *ngIf="searchTerm" type="button" class="search-clear" (click)="clearSearch()" aria-label="Limpiar b\xFAsqueda">\xD7</button>\r
        </div>\r
\r
        <div class="chip-group" role="group" aria-label="Filtrar por estado">\r
            <button type="button" class="chip" [class.is-active]="statusFilter === 'todos'" (click)="setStatusFilter('todos')">Todos</button>\r
            <button type="button" class="chip" [class.is-active]="statusFilter === 'activos'" (click)="setStatusFilter('activos')">Activos</button>\r
            <button type="button" class="chip" [class.is-active]="statusFilter === 'inactivos'" (click)="setStatusFilter('inactivos')">Inactivos</button>\r
        </div>\r
\r
        <label class="toolbar-select">\r
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18"></path><path d="M7 12h10"></path><path d="M10 18h4"></path></svg>\r
            <select [(ngModel)]="sortBy" (change)="setSortBy(sortBy)">\r
                <option value="recientes">M\xE1s recientes</option>\r
                <option value="nombre">Nombre A\u2013Z</option>\r
                <option value="antiguos">Antiguos</option>\r
            </select>\r
        </label>\r
\r
        <span class="results-count" *ngIf="!loading">{{ filteredAdmins().length }} resultado(s)</span>\r
    </div>\r
\r
    <!-- SKELETON -->\r
    <div *ngIf="loading" class="skeleton-list" aria-label="Cargando administradores">\r
        <div class="skeleton-row" *ngFor="let i of [0,1,2,3,4]"></div>\r
    </div>\r
\r
    <!-- TABLA -->\r
    <div class="table-wrapper" *ngIf="!loading && filteredAdmins().length > 0">\r
        <table class="users-table">\r
            <thead>\r
                <tr><th>Administrador</th><th>N\xB0 de contacto</th><th>Estado</th><th class="actions-column">Acciones</th></tr>\r
            </thead>\r
            <tbody>\r
                <tr *ngFor="let admin of filteredAdmins()" [class.is-selected]="showDetailDrawer && detailAdmin?.id === admin.id"\r
                    (click)="openDetail(admin)" tabindex="0" (keydown.enter)="openDetail(admin)"\r
                    (keydown.space)="openDetail(admin); $event.preventDefault()">\r
                    <td class="user-cell" data-label="Administrador">\r
                        <span class="avatar" [class]="getAvatarClass(admin.full_name)" aria-hidden="true">\r
                            {{ getInitials(admin.full_name) }}\r
                            <span class="avatar-dot" [class.is-on]="admin.active ?? true"></span>\r
                        </span>\r
                        <span class="user-meta">\r
                            <strong>{{ admin.full_name }}</strong>\r
                            <small>Administrador</small>\r
                        </span>\r
                    </td>\r
                    <td data-label="N\xB0 de contacto"><span class="id-chip">{{ admin.seller_number || '-' }}</span></td>\r
                    <td data-label="Estado">\r
                        <button type="button" class="switch" [class.is-on]="admin.active ?? true" role="switch"\r
                            [attr.aria-checked]="admin.active ?? true"\r
                            [title]="'Cambiar estado (' + getStatusLabel(admin.active ?? true) + ')'"\r
                            (click)="toggleAdminStatus(admin); $event.stopPropagation()">\r
                            <span class="switch-thumb"></span>\r
                        </button>\r
                        <span class="switch-label">{{ getStatusLabel(admin.active ?? true) }}</span>\r
                    </td>\r
                    <td class="actions-column" data-label="Acciones" (click)="$event.stopPropagation()">\r
                        <div class="action-buttons">\r
                            <button class="btn-icon btn-edit" (click)="openEditAdmin(admin)" title="Editar" aria-label="Editar administrador">\r
                                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg>\r
                            </button>\r
                            <button class="btn-icon btn-delete" (click)="deleteAdmin(admin.id)" title="Eliminar" aria-label="Eliminar administrador">\r
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
    <div *ngIf="!loading && filteredAdmins().length === 0" class="catalog-state empty-state">\r
        <span class="empty-state-icon" aria-hidden="true">\r
            <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"></path><circle cx="10" cy="7" r="4"></circle><path d="M20 8v6"></path><path d="M23 11h-6"></path></svg>\r
        </span>\r
        <strong>{{ admins().length === 0 ? 'A\xFAn no hay administradores registrados' : 'Sin resultados' }}</strong>\r
        <span>{{ admins().length === 0 ? 'Agrega tu primer administrador para empezar.' : 'Ajusta tu b\xFAsqueda o los filtros.' }}</span>\r
        <button *ngIf="admins().length > 0" type="button" class="btn-secondary" (click)="clearFilters()">Limpiar filtros</button>\r
        <button *ngIf="admins().length === 0" type="button" class="btn-primary" (click)="openNewAdmin()">+ Nuevo Administrador</button>\r
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
\r
<!-- MODAL DE CONFIRMACI\xD3N (ELIMINAR) -->\r
<div class="modal-overlay" *ngIf="showConfirmModal" (click)="cancelModal()">\r
    <div class="modal-content" (click)="$event.stopPropagation()">\r
        <div class="modal-heading modal-heading-warning">\r
            <span class="modal-icon">\r
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>\r
            </span>\r
            <div><span class="modal-eyebrow">Confirmaci\xF3n</span><h3>Eliminar administrador</h3></div>\r
        </div>\r
        <p>\r
            \xBFEst\xE1s seguro de que deseas eliminar a <strong>{{ getAdminName() }}</strong>?\r
            <br>\r
            Esta operaci\xF3n no se puede deshacer.\r
        </p>\r
        <div class="modal-actions">\r
            <button class="btn-cancel" (click)="cancelModal()">Cancelar</button>\r
            <button class="btn-confirm" (click)="confirmAdminDelete()" [disabled]="actionLoading">\r
                {{ actionLoading ? 'Eliminando...' : 'Eliminar' }}\r
            </button>\r
        </div>\r
    </div>\r
</div>\r
    <!-- DRAWER: FORMULARIO (CREAR / EDITAR) -->\r
<div class="drawer-overlay" *ngIf="showFormDrawer" (click)="closeFormDrawer()">\r
    <aside class="drawer form-drawer" (click)="$event.stopPropagation()" role="dialog"\r
        [attr.aria-label]="isEditMode ? 'Editar administrador' : 'Nuevo administrador'">\r
        <div class="drawer-header">\r
            <div>\r
                <span class="page-kicker">{{ isEditMode ? 'Edici\xF3n de administrador' : 'Nuevo registro' }}</span>\r
                <h3>{{ isEditMode ? 'Editar Administrador' : 'Nuevo Administrador' }}</h3>\r
            </div>\r
            <button class="drawer-close" (click)="closeFormDrawer()" aria-label="Cerrar formulario">\xD7</button>\r
        </div>\r
\r
        <div class="drawer-body">\r
            <div *ngIf="formError" class="form-banner error">{{ formError }}</div>\r
            <div *ngIf="formLoading" class="drawer-loading"><span class="catalog-spinner"></span> Cargando...</div>\r
\r
            <form (ngSubmit)="submitForm()" *ngIf="!formLoading" novalidate>\r
                <div class="form-group" [class.has-error]="formValidated && fieldErrors['seller_number']">\r
                    <label>N\xB0 de contacto *</label>\r
                    <input type="text" [(ngModel)]="adminForm.seller_number" name="seller_number"\r
                        [disabled]="isEditMode" placeholder="Ej. 5512345678" inputmode="numeric" maxlength="10" (input)="onPhoneInput($event)" />\r
                    <small class="field-error" *ngIf="formValidated && fieldErrors['seller_number']">{{ fieldErrors['seller_number'] }}</small>\r
                    <small *ngIf="!isEditMode && !fieldErrors['seller_number']">Se usar\xE1 para iniciar sesi\xF3n (junto con la contrase\xF1a).</small>\r
                    <small *ngIf="isEditMode && !fieldErrors['seller_number']">Este n\xFAmero define el acceso; no se puede modificar.</small>\r
                </div>\r
\r
                <div class="form-group" [class.has-error]="formValidated && fieldErrors['full_name']">\r
                    <label>Nombre Completo *</label>\r
                    <input type="text" [(ngModel)]="adminForm.full_name" name="full_name" placeholder="Juan P\xE9rez" />\r
                    <small class="field-error" *ngIf="formValidated && fieldErrors['full_name']">{{ fieldErrors['full_name'] }}</small>\r
                </div>\r
\r
                <div class="form-group" [class.has-error]="formValidated && fieldErrors['password']">\r
                    <label>Contrase\xF1a {{ isEditMode ? '(opcional)' : '*' }}</label>\r
                    <div class="input-with-action">\r
                        <input [type]="showPassword ? 'text' : 'password'" [(ngModel)]="adminForm.password"\r
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
                    <select [(ngModel)]="adminForm.active" name="active">\r
                        <option [ngValue]="true">Activo</option>\r
                        <option [ngValue]="false">Inactivo</option>\r
                    </select>\r
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
<!-- DRAWER: DETALLE DE ADMINISTRADOR -->\r
<div class="drawer-overlay" *ngIf="showDetailDrawer && detailAdmin" (click)="closeDetail()">\r
    <aside class="drawer detail-drawer" (click)="$event.stopPropagation()" role="dialog" aria-label="Detalle del administrador">\r
        <div class="drawer-header">\r
            <div>\r
                <span class="page-kicker">Control de acceso</span>\r
                <h3>Detalle del Administrador</h3>\r
            </div>\r
            <button class="drawer-close" (click)="closeDetail()" aria-label="Cerrar detalle">\xD7</button>\r
        </div>\r
\r
        <div class="drawer-body">\r
            <div class="detail-hero">\r
                <span class="detail-avatar" [class]="getAvatarClass(detailAdmin.full_name)" aria-hidden="true">\r
                    {{ getInitials(detailAdmin.full_name) }}\r
                </span>\r
                <div class="detail-hero-meta">\r
                    <strong>{{ detailAdmin.full_name }}</strong>\r
                    <span class="status-pill" [class.is-on]="detailAdmin.active ?? true">\r
                        {{ getStatusLabel(detailAdmin.active ?? true) }}\r
                    </span>\r
                </div>\r
            </div>\r
\r
            <div class="detail-section">\r
                <h4>Informaci\xF3n de acceso</h4>\r
                <div class="detail-grid">\r
                    <div class="detail-item">\r
                        <small>N\xB0 de contacto</small>\r
                        <strong>{{ detailAdmin.seller_number || '\u2014' }}</strong>\r
                    </div>\r
                    <div class="detail-item">\r
                        <small>Email de acceso</small>\r
                        <strong>{{ detailAdmin.email || '\u2014' }}</strong>\r
                    </div>\r
                    <div class="detail-item" *ngIf="detailAdmin.recovery_email">\r
                        <small>Correo de recuperaci\xF3n</small>\r
                        <strong>{{ detailAdmin.recovery_email }}</strong>\r
                    </div>\r
                    <div class="detail-item">\r
                        <small>Rol</small>\r
                        <strong>{{ detailAdmin.role === 'seller' ? 'Vendedor' : 'Administrador' }}</strong>\r
                    </div>\r
                    <div class="detail-item">\r
                        <small>Registro</small>\r
                        <strong>{{ detailAdmin.created_at | date:'dd/MM/yyyy' }}</strong>\r
                    </div>\r
                </div>\r
            </div>\r
\r
            <div class="detail-actions">\r
                <button type="button" class="btn-cancel" (click)="closeDetail()">Cerrar</button>\r
                <button type="button" class="btn-primary" (click)="detailEdit()">Editar</button>\r
                <button type="button" class="btn-danger" (click)="detailDelete()">Eliminar</button>\r
            </div>\r
        </div>\r
    </aside>\r
</div>`, styles: ['/* src/app/components/admin/admin-admins/admin-admins.css */\n.admins-container {\n  position: relative;\n  overflow: hidden;\n  background: var(--surface-subtle);\n  border: 0;\n  padding: 0;\n  box-shadow: none;\n}\n.admins-container::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 38%;\n  height: 190px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(32, 176, 56, 0.14),\n      rgba(16, 37, 31, 0.07));\n  clip-path: polygon(35% 0, 100% 0, 100% 100%, 0 100%);\n  pointer-events: none;\n  z-index: 0;\n}\n.admins-container .page-header {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-end;\n  min-height: 152px;\n  margin: 0 0 1.15rem;\n  padding: 1.5rem 1.75rem;\n  border: 1px solid rgba(139, 226, 140, 0.22);\n  border-radius: 16px;\n  background:\n    linear-gradient(\n      115deg,\n      #10251f 0%,\n      #173c2e 68%,\n      #1f6840 100%);\n  box-shadow: 0 16px 30px rgba(16, 37, 31, 0.16);\n}\n.admins-container .page-heading h2 {\n  margin: 0.25rem 0 0.35rem;\n  color: var(--text-on-accent);\n  font-size: 2rem;\n  line-height: 1;\n}\n.admins-container .page-heading p {\n  max-width: 420px;\n  margin: 0;\n  color: #bdd6c7;\n  font-size: 0.88rem;\n}\n.page-kicker {\n  color: #8be28c;\n  font-size: 0.68rem;\n  font-weight: 700;\n  letter-spacing: 1.2px;\n  text-transform: uppercase;\n}\n.admins-container .btn-primary,\n.btn-primary {\n  position: relative;\n  z-index: 2;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  min-height: 44px;\n  padding: 0.75rem 1rem;\n  border: 0;\n  border-radius: 9px;\n  background: var(--btn-primary-bg);\n  color: var(--btn-primary-text);\n  box-shadow: none;\n  white-space: nowrap;\n  cursor: pointer;\n  font-weight: 700;\n  font-size: 0.9rem;\n  transition: all 0.2s;\n  text-decoration: none;\n}\n.admins-container .btn-primary:hover,\n.btn-primary:hover {\n  background: var(--btn-primary-bg-hover);\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.16);\n}\n.button-icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 20px;\n  height: 20px;\n  margin-right: 0.25rem;\n  border: 1px solid rgba(16, 37, 31, 0.25);\n  border-radius: 50%;\n  font-size: 1rem;\n  line-height: 1;\n}\n.stats-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 0.8rem;\n  margin: 0 0 1rem;\n}\n.stat-card {\n  display: flex;\n  align-items: center;\n  gap: 0.7rem;\n  padding: 0.95rem 1rem;\n  border: 1px solid var(--border-color);\n  border-radius: 14px;\n  background: var(--surface-card);\n  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.05);\n  text-align: left;\n  cursor: pointer;\n  font-family: var(--font-body);\n  transition:\n    transform 0.18s ease,\n    border-color 0.18s ease,\n    box-shadow 0.18s ease;\n}\nbutton.stat-card:hover {\n  transform: translateY(-2px);\n  border-color: #bbe8bf;\n  box-shadow: 0 10px 22px rgba(15, 23, 42, 0.08);\n}\n.stat-card.is-active {\n  border-color: var(--accent-green);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.12);\n  background: var(--surface-hover);\n}\n.stat-icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 42px;\n  height: 42px;\n  flex-shrink: 0;\n  border-radius: 12px;\n}\n.stat-icon svg {\n  width: 22px;\n  height: 22px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 1.8;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.tone-slate {\n  background: var(--surface-muted);\n  color: var(--text-silver);\n}\n.tone-green {\n  background: var(--accent-green-light);\n  color: var(--accent-green-dark);\n}\n.tone-amber {\n  background: var(--warning-bg);\n  color: var(--warning);\n}\n.stat-body {\n  display: flex;\n  flex-direction: column;\n  line-height: 1.1;\n}\n.stat-body strong {\n  font-size: 1.35rem;\n  font-weight: 800;\n  color: var(--btn-primary-text);\n}\n.stat-body small {\n  margin-top: 0.2rem;\n  color: var(--text-muted);\n  font-size: 0.72rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.4px;\n}\n.toolbar {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 0.6rem;\n  margin: 0 0 1.15rem;\n  padding: 0.6rem 0.75rem;\n  border: 1px solid var(--border-color);\n  border-radius: 14px;\n  background: var(--surface-card);\n  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.05);\n}\n.search-wrapper {\n  position: relative;\n  flex: 1 1 240px;\n  display: flex;\n  align-items: center;\n}\n.search-icon {\n  position: absolute;\n  left: 0.8rem;\n  width: 17px;\n  height: 17px;\n  fill: none;\n  stroke: var(--accent-silver);\n  stroke-width: 2;\n  stroke-linecap: round;\n  pointer-events: none;\n}\n.search-input {\n  width: 100%;\n  min-height: 38px;\n  padding: 0.4rem 2.3rem 0.4rem 2.4rem;\n  border: 1px solid var(--input-border);\n  border-radius: 9px;\n  font-size: 0.9rem;\n  background: var(--surface-subtle);\n  color: var(--text-silver);\n  transition:\n    border-color 0.2s ease,\n    box-shadow 0.2s ease,\n    background 0.2s ease;\n}\n.search-input::placeholder {\n  color: var(--accent-silver);\n}\n.search-input:focus {\n  outline: none;\n  border-color: var(--accent-green);\n  background: var(--surface-card);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.1);\n}\n.search-clear {\n  position: absolute;\n  right: 0.45rem;\n  width: 24px;\n  height: 24px;\n  border: 0;\n  border-radius: 50%;\n  background: var(--surface-muted);\n  color: var(--text-muted);\n  font-size: 1rem;\n  line-height: 1;\n  cursor: pointer;\n}\n.search-clear:hover {\n  background: var(--input-border);\n  color: var(--text-main);\n}\n.chip-group {\n  display: inline-flex;\n  gap: 0.3rem;\n  padding: 0.22rem;\n  border-radius: 999px;\n  background: var(--surface-hover);\n}\n.chip {\n  padding: 0.35rem 0.85rem;\n  border: 0;\n  border-radius: 999px;\n  background: transparent;\n  color: var(--text-muted);\n  font-size: 0.78rem;\n  font-weight: 700;\n  cursor: pointer;\n  transition:\n    background 0.18s,\n    color 0.18s,\n    box-shadow 0.18s;\n}\n.chip:hover {\n  color: var(--text-silver);\n}\n.chip.is-active {\n  background: var(--surface-card);\n  color: var(--accent-green-dark);\n  box-shadow: 0 3px 8px rgba(15, 23, 42, 0.12);\n}\n.toolbar-select {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n}\n.toolbar-select svg {\n  position: absolute;\n  left: 0.7rem;\n  width: 15px;\n  height: 15px;\n  fill: none;\n  stroke: var(--accent-silver);\n  stroke-width: 1.9;\n  stroke-linecap: round;\n  pointer-events: none;\n}\n.toolbar-select select {\n  min-height: 38px;\n  padding: 0.4rem 1.9rem 0.4rem 2rem;\n  border: 1px solid var(--input-border);\n  border-radius: 9px;\n  background: var(--surface-subtle);\n  color: var(--text-silver);\n  font-size: 0.85rem;\n  cursor: pointer;\n  appearance: none;\n  transition: border-color 0.2s, box-shadow 0.2s;\n}\n.toolbar-select select:focus {\n  outline: none;\n  border-color: var(--accent-green);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.1);\n}\n.results-count {\n  flex: 0 0 auto;\n  margin-left: auto;\n  color: var(--text-muted);\n  font-size: 0.8rem;\n  white-space: nowrap;\n}\n.skeleton-list {\n  display: flex;\n  flex-direction: column;\n  gap: 0.7rem;\n}\n.skeleton-row {\n  height: 62px;\n  border-radius: 12px;\n  background:\n    linear-gradient(\n      90deg,\n      var(--surface-muted) 25%,\n      var(--surface-subtle) 50%,\n      var(--surface-muted) 75%);\n  background-size: 200% 100%;\n  animation: shimmer 1.4s infinite;\n}\n@keyframes shimmer {\n  0% {\n    background-position: 200% 0;\n  }\n  100% {\n    background-position: -200% 0;\n  }\n}\n.table-wrapper {\n  overflow-x: auto;\n  border: 1px solid var(--input-border);\n  border-radius: 14px;\n  background: var(--surface-card);\n  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.04);\n}\n.users-table {\n  width: 100%;\n  min-width: 640px;\n  border-collapse: collapse;\n  font-size: 0.88rem;\n}\n.users-table th {\n  padding: 0.85rem 1rem;\n  background: var(--surface-subtle);\n  color: var(--text-muted);\n  font-size: 0.7rem;\n  letter-spacing: 0.6px;\n  text-align: left;\n  text-transform: uppercase;\n  white-space: nowrap;\n}\n.users-table td {\n  padding: 0.8rem 1rem;\n  border-top: 1px solid var(--border-color);\n  color: var(--text-silver);\n  vertical-align: middle;\n}\n.users-table tbody tr {\n  cursor: pointer;\n  transition: background-color 0.2s ease;\n}\n.users-table tbody tr:hover td {\n  background: var(--surface-hover);\n}\n.users-table tbody tr.is-selected td {\n  background: var(--accent-green-light);\n  border-top-color: #c4eacb;\n}\n.users-table tbody tr.is-selected td:first-child {\n  box-shadow: inset 4px 0 0 var(--accent-green);\n}\n.user-cell {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  min-width: 220px;\n}\n.user-meta {\n  display: flex;\n  flex-direction: column;\n  line-height: 1.25;\n  min-width: 0;\n}\n.user-meta strong {\n  color: var(--btn-primary-text);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.user-meta small {\n  color: var(--accent-silver);\n  font-size: 0.78rem;\n}\n.avatar {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 44px;\n  height: 44px;\n  flex-shrink: 0;\n  border-radius: 50%;\n  color: var(--text-on-accent);\n  font-size: 0.92rem;\n  font-weight: 700;\n  letter-spacing: 0.5px;\n  box-shadow: 0 4px 10px rgba(15, 23, 42, 0.22);\n}\n.avatar-tone-0 {\n  background:\n    linear-gradient(\n      135deg,\n      #065f46,\n      #34d399);\n}\n.avatar-tone-1 {\n  background:\n    linear-gradient(\n      135deg,\n      #0f766e,\n      #2dd4bf);\n}\n.avatar-tone-2 {\n  background:\n    linear-gradient(\n      135deg,\n      #1e3a8a,\n      #60a5fa);\n}\n.avatar-tone-3 {\n  background:\n    linear-gradient(\n      135deg,\n      #7c3aed,\n      #a78bfa);\n}\n.avatar-tone-4 {\n  background:\n    linear-gradient(\n      135deg,\n      #9a3412,\n      #fb923c);\n}\n.avatar-tone-5 {\n  background:\n    linear-gradient(\n      135deg,\n      #10251f,\n      #1f6840);\n}\n.avatar-dot {\n  position: absolute;\n  right: -1px;\n  bottom: -1px;\n  width: 13px;\n  height: 13px;\n  border-radius: 50%;\n  border: 2.5px solid var(--surface-card);\n  background: var(--border-strong);\n}\n.avatar-dot.is-on {\n  background: #22c55e;\n  animation: pulse 2s infinite;\n}\n@keyframes pulse {\n  0%, 100% {\n    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.45);\n  }\n  70% {\n    box-shadow: 0 0 0 7px rgba(34, 197, 94, 0);\n  }\n}\n.id-chip {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.28rem 0.7rem;\n  border-radius: 999px;\n  background: var(--surface-muted);\n  border: 1px solid var(--border-color);\n  color: var(--text-silver);\n  font-size: 0.8rem;\n  font-weight: 700;\n  font-family: var(--font-mono);\n  white-space: nowrap;\n}\n.switch {\n  position: relative;\n  display: inline-block;\n  width: 42px;\n  height: 24px;\n  border: 0;\n  border-radius: 999px;\n  background: var(--border-strong);\n  cursor: pointer;\n  vertical-align: middle;\n  box-shadow: inset 0 0 0 1px rgba(15, 23, 42, 0.06);\n  transition: background 0.25s ease;\n}\n.switch .switch-thumb {\n  position: absolute;\n  top: 3px;\n  left: 3px;\n  width: 18px;\n  height: 18px;\n  border-radius: 50%;\n  background: var(--surface-card);\n  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.28);\n  transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);\n}\n.switch.is-on {\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-green-dark),\n      var(--accent-green));\n}\n.switch.is-on .switch-thumb {\n  transform: translateX(18px);\n}\n.switch-label {\n  margin-left: 0.4rem;\n  font-size: 0.78rem;\n  font-weight: 700;\n  color: var(--text-muted);\n  vertical-align: middle;\n}\n.actions-column {\n  text-align: right !important;\n}\n.action-buttons {\n  display: inline-flex;\n  gap: 0.35rem;\n}\n.btn-icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 34px;\n  height: 34px;\n  border: 1px solid transparent;\n  border-radius: 9px;\n  background: transparent;\n  cursor: pointer;\n  transition: all 0.18s ease;\n}\n.btn-icon svg {\n  width: 17px;\n  height: 17px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 1.9;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.btn-edit:hover {\n  background: var(--info-bg);\n  color: var(--info);\n  border-color: var(--info-border);\n}\n.btn-delete:hover {\n  background: var(--danger-bg);\n  color: var(--danger);\n  border-color: var(--danger-border);\n}\n.catalog-state {\n  text-align: center;\n  padding: 2.5rem 1.5rem;\n  color: var(--text-muted);\n}\n.catalog-state.empty-state > strong {\n  display: block;\n  margin-bottom: 0.35rem;\n  color: var(--text-silver);\n  font-size: 1rem;\n}\n.catalog-state.empty-state > span:last-child {\n  display: block;\n  color: var(--accent-silver);\n  font-size: 0.82rem;\n  margin-bottom: 1rem;\n}\n.empty-state-icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 52px;\n  height: 52px;\n  margin-bottom: 0.6rem;\n  border-radius: 14px;\n  background: var(--accent-green-light);\n  color: var(--accent-green-dark);\n}\n.empty-state-icon svg {\n  width: 24px;\n  height: 24px;\n  fill: none;\n  stroke: currentColor;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n  stroke-width: 1.7;\n}\n.btn-secondary {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.4rem;\n  min-height: 38px;\n  padding: 0.55rem 1rem;\n  border: 1px solid var(--input-border);\n  border-radius: 9px;\n  background: var(--surface-card);\n  color: var(--text-silver);\n  font-weight: 700;\n  font-size: 0.85rem;\n  cursor: pointer;\n  transition: all 0.18s ease;\n}\n.btn-secondary:hover {\n  background: var(--surface-hover);\n  border-color: var(--border-strong);\n}\n.toast-host {\n  position: fixed;\n  z-index: 4000;\n  right: 1.1rem;\n  bottom: 1.1rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.6rem;\n  max-width: 400px;\n}\n.toast {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  padding: 0.75rem 0.9rem;\n  border-radius: 12px;\n  background: var(--text-main);\n  color: var(--surface-card);\n  font-size: 0.86rem;\n  box-shadow: 0 16px 34px -10px rgba(15, 23, 42, 0.35);\n  animation: toastIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);\n  cursor: pointer;\n}\n@keyframes toastIn {\n  from {\n    opacity: 0;\n    transform: translateY(14px) scale(0.97);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n.toast-success {\n  background:\n    linear-gradient(\n      135deg,\n      #14532d,\n      var(--accent-green-dark));\n}\n.toast-error {\n  background:\n    linear-gradient(\n      135deg,\n      #7f1d1d,\n      var(--danger));\n}\n.toast-info {\n  background: var(--text-main);\n}\n.toast-icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 22px;\n  height: 22px;\n  flex-shrink: 0;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, 0.18);\n  font-size: 0.75rem;\n  font-weight: 800;\n}\n.toast-msg {\n  flex: 1;\n  line-height: 1.35;\n}\n.toast-action {\n  padding: 0.28rem 0.65rem;\n  border-radius: 8px;\n  background: var(--surface-card);\n  color: var(--accent-green-dark);\n  font-size: 0.75rem;\n  font-weight: 800;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  white-space: nowrap;\n}\n.toast-close {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 22px;\n  height: 22px;\n  border: 0;\n  border-radius: 50%;\n  background: transparent;\n  color: rgba(255, 255, 255, 0.75);\n  font-size: 1rem;\n  cursor: pointer;\n}\n.toast-close:hover {\n  background: rgba(255, 255, 255, 0.15);\n  color: var(--surface-card);\n}\n.drawer-overlay {\n  position: fixed;\n  inset: 0;\n  z-index: 3000;\n  display: flex;\n  justify-content: flex-end;\n  background: rgba(15, 23, 42, 0.45);\n  -webkit-backdrop-filter: blur(3px);\n  backdrop-filter: blur(3px);\n  animation: fadeIn 0.25s ease;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.drawer {\n  display: flex;\n  flex-direction: column;\n  width: min(500px, 100vw);\n  height: 100%;\n  background: var(--surface-subtle);\n  box-shadow: -24px 0 60px rgba(15, 23, 42, 0.28);\n  animation: slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1);\n  overflow: hidden;\n}\n@keyframes slideInRight {\n  from {\n    transform: translateX(100%);\n  }\n  to {\n    transform: translateX(0);\n  }\n}\n.form-drawer {\n  width: min(560px, 100vw);\n}\n.drawer-header {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n  flex-shrink: 0;\n  padding: 1.4rem 1.5rem 1.1rem;\n  border-bottom: 1px solid var(--border-color);\n  background: var(--surface-card);\n}\n.drawer-header h3 {\n  margin: 0.2rem 0 0;\n  color: var(--btn-primary-text);\n  font-size: 1.25rem;\n}\n.drawer-close {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 34px;\n  height: 34px;\n  flex-shrink: 0;\n  border: 1px solid var(--border-color);\n  border-radius: 10px;\n  background: var(--surface-subtle);\n  color: var(--text-silver);\n  font-size: 1.25rem;\n  line-height: 1;\n  cursor: pointer;\n  transition: all 0.18s ease;\n}\n.drawer-close:hover {\n  background: var(--danger-bg);\n  color: var(--danger);\n  border-color: var(--danger-border);\n}\n.drawer-body {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1.4rem 1.5rem;\n}\n.drawer-loading {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.6rem;\n  padding: 2rem;\n  color: var(--text-muted);\n  font-size: 0.9rem;\n}\n.form-group {\n  margin-bottom: 1.15rem;\n}\n.form-group label {\n  display: block;\n  margin-bottom: 0.4rem;\n  color: var(--text-silver);\n  font-size: 0.78rem;\n  font-weight: 800;\n  letter-spacing: 0.5px;\n  text-transform: uppercase;\n}\n.form-group input,\n.form-group select,\n.form-group textarea {\n  width: 100%;\n  min-height: 44px;\n  padding: 0.65rem 0.85rem;\n  border: 1.5px solid var(--input-border);\n  border-radius: 10px;\n  background: var(--surface-card);\n  color: var(--text-main);\n  font-size: 0.92rem;\n  font-family: var(--font-body);\n  transition:\n    border-color 0.2s,\n    box-shadow 0.2s,\n    background 0.2s;\n}\n.form-group input:focus,\n.form-group select:focus,\n.form-group textarea:focus {\n  outline: none;\n  border-color: var(--accent-green);\n  background: var(--surface-card);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.1);\n}\n.form-group input:disabled {\n  background: var(--surface-hover);\n  color: var(--text-muted);\n  cursor: not-allowed;\n}\n.form-group small {\n  display: block;\n  margin-top: 0.35rem;\n  color: var(--accent-silver);\n  font-size: 0.76rem;\n}\n.form-group.has-error input,\n.form-group.has-error select,\n.form-group.has-error textarea {\n  border-color: var(--danger);\n  background: var(--danger-bg);\n}\n.form-group.has-error input:focus,\n.form-group.has-error select:focus,\n.form-group.has-error textarea:focus {\n  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);\n}\n.field-error {\n  color: var(--danger) !important;\n  font-weight: 600;\n}\n.field-actions {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.6rem;\n  margin-top: 0.35rem;\n}\n.btn-link {\n  border: 0;\n  background: transparent;\n  color: var(--accent-green-dark);\n  font-size: 0.78rem;\n  font-weight: 700;\n  cursor: pointer;\n  text-decoration: underline;\n  text-underline-offset: 3px;\n  padding: 0;\n}\n.btn-link:hover {\n  color: var(--accent-green-dark);\n}\n.input-with-action {\n  position: relative;\n}\n.input-with-action input {\n  padding-right: 3rem;\n}\n.input-with-action input:focus {\n  outline: none;\n  border-color: var(--accent-green);\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.1);\n}\n.btn-ghost-icon {\n  position: absolute;\n  right: 0.45rem;\n  top: 50%;\n  transform: translateY(-50%);\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  border: 0;\n  border-radius: 8px;\n  background: var(--surface-muted);\n  color: var(--text-silver);\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n.btn-ghost-icon svg {\n  width: 17px;\n  height: 17px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 1.9;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.btn-ghost-icon:hover {\n  background: var(--input-border);\n  color: var(--text-main);\n}\n.form-banner {\n  margin-bottom: 1rem;\n  padding: 0.7rem 0.9rem;\n  border-radius: 10px;\n  font-size: 0.85rem;\n  font-weight: 600;\n}\n.form-banner.error {\n  background: var(--danger-bg);\n  border: 1px solid var(--danger-border);\n  color: var(--danger);\n}\n.drawer-actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.6rem;\n  padding-top: 0.35rem;\n}\n.modal-overlay {\n  position: fixed;\n  inset: 0;\n  z-index: 3500;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 1rem;\n  background: rgba(15, 23, 42, 0.5);\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: fadeIn 0.2s ease;\n}\n.modal-content {\n  width: 100%;\n  max-width: 470px;\n  max-height: 92vh;\n  overflow-y: auto;\n  border-radius: 18px;\n  background: var(--surface-card);\n  border: 1px solid var(--border-color);\n  padding: 1.6rem 1.7rem 1.4rem;\n  box-shadow: 0 30px 70px -20px rgba(15, 23, 42, 0.4);\n  animation: riseIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);\n}\n@keyframes riseIn {\n  from {\n    opacity: 0;\n    transform: translateY(18px) scale(0.97);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n.modal-heading {\n  display: flex;\n  align-items: center;\n  gap: 0.8rem;\n  margin-bottom: 1rem;\n}\n.modal-icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 42px;\n  height: 42px;\n  flex-shrink: 0;\n  border-radius: 12px;\n}\n.modal-icon svg {\n  width: 21px;\n  height: 21px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 1.8;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.modal-heading-warning .modal-icon {\n  background: var(--warning-bg);\n  color: var(--warning);\n}\n.modal-eyebrow {\n  display: block;\n  color: var(--accent-silver);\n  font-size: 0.66rem;\n  font-weight: 800;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n}\n.modal-content h3 {\n  margin: 0;\n  color: var(--btn-primary-text);\n  font-size: 1.15rem;\n}\n.modal-content p {\n  color: var(--text-silver);\n  font-size: 0.9rem;\n  line-height: 1.55;\n}\n.modal-actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.6rem;\n  margin-top: 1.3rem;\n}\n.btn-cancel {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 40px;\n  padding: 0.55rem 1.15rem;\n  border: 1px solid var(--input-border);\n  border-radius: 9px;\n  background: var(--surface-card);\n  color: var(--text-silver);\n  font-weight: 700;\n  font-size: 0.85rem;\n  cursor: pointer;\n  transition: all 0.18s ease;\n}\n.btn-cancel:hover {\n  background: var(--surface-hover);\n  border-color: var(--border-strong);\n}\n.btn-confirm {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 40px;\n  padding: 0.55rem 1.3rem;\n  border: 0;\n  border-radius: 9px;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-green-dark),\n      var(--accent-green));\n  color: var(--text-on-accent);\n  font-weight: 700;\n  font-size: 0.85rem;\n  cursor: pointer;\n  box-shadow: 0 10px 20px -8px rgba(32, 176, 56, 0.5);\n  transition: transform 0.18s ease, box-shadow 0.18s ease;\n}\n.btn-confirm:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 14px 26px -8px rgba(32, 176, 56, 0.55);\n}\n.btn-confirm:disabled {\n  opacity: 0.65;\n  cursor: wait;\n  transform: none;\n}\n.status-active {\n  background: var(--accent-green-light);\n  color: var(--accent-green-dark);\n  border: 1px solid #c9ecd0;\n}\n.status-inactive {\n  background: var(--surface-hover);\n  color: var(--text-muted);\n  border: 1px solid var(--border-color);\n}\n@media (max-width: 768px) {\n  .admins-container {\n    padding: 1rem;\n    border-radius: 12px;\n  }\n  .admins-container .page-header {\n    flex-direction: column;\n    align-items: stretch;\n    gap: 0.85rem;\n    min-height: 0;\n    padding: 1.25rem;\n  }\n  .admins-container .page-heading h2 {\n    font-size: 1.7rem;\n  }\n  .admins-container .btn-primary {\n    justify-content: center;\n    width: 100%;\n  }\n  .toolbar {\n    flex-direction: column;\n    align-items: stretch;\n    gap: 0.75rem;\n    padding: 1rem;\n  }\n  .search-wrapper {\n    flex: 0 0 auto;\n    width: 100%;\n  }\n  .search-input {\n    min-height: 44px;\n    font-size: 1rem;\n  }\n  .search-icon {\n    top: 50%;\n    transform: translateY(-50%);\n  }\n  .chip-group {\n    width: 100%;\n    display: flex;\n    flex-wrap: wrap;\n    justify-content: center;\n    gap: 0.5rem;\n    padding: 0;\n    background: transparent;\n    border-radius: 0;\n  }\n  .chip {\n    min-height: 38px;\n    padding: 0.4rem 1rem;\n    border: 1px solid var(--border-color);\n    background: var(--surface-subtle);\n    color: var(--text-silver);\n    border-radius: 999px;\n    white-space: nowrap;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n  }\n  .chip:hover {\n    border-color: #8bd39a;\n    background: var(--surface-hover);\n    color: var(--accent-green-dark);\n  }\n  .chip.is-active {\n    background: var(--accent-green-light);\n    border-color: var(--accent-green);\n    color: var(--accent-green-dark);\n  }\n  .toolbar-select {\n    flex: 0 0 auto;\n    width: 100%;\n  }\n  .toolbar-select::after {\n    content: "";\n    position: absolute;\n    right: 1.05rem;\n    top: 50%;\n    width: 9px;\n    height: 9px;\n    margin-top: -5px;\n    border-right: 2px solid var(--text-silver);\n    border-bottom: 2px solid var(--text-silver);\n    transform: rotate(45deg);\n    pointer-events: none;\n  }\n  .toolbar-select select {\n    width: 100%;\n    min-height: 44px;\n    padding: 0.55rem 2.6rem 0.55rem 1.9rem;\n    font-size: 1rem;\n  }\n  .toolbar-select svg {\n    top: 50%;\n    transform: translateY(-50%);\n  }\n  .results-count {\n    margin-left: 0;\n    align-self: flex-end;\n  }\n  .stats-grid {\n    grid-template-columns: 1fr 1fr;\n  }\n  .drawer {\n    width: 100vw;\n  }\n  .modal-content {\n    padding: 1rem;\n    max-width: 100%;\n  }\n  .toast-host {\n    right: 0.7rem;\n    bottom: 0.7rem;\n    left: 0.7rem;\n    max-width: none;\n  }\n}\n@media (max-width: 768px) {\n  .table-wrapper {\n    overflow: visible;\n    border: none;\n    background: transparent;\n    box-shadow: none;\n  }\n  .users-table {\n    display: block;\n    min-width: 0;\n    background: transparent;\n  }\n  .users-table thead {\n    display: none;\n  }\n  .users-table tbody {\n    display: block;\n  }\n  .users-table tr {\n    display: block;\n    padding: 0.9rem 1rem;\n    margin-bottom: 0.75rem;\n    background: var(--surface-card);\n    border: 1px solid var(--input-border);\n    border-radius: 14px;\n    box-shadow: 0 8px 20px rgba(15, 23, 42, 0.04);\n  }\n  .users-table tr:hover td {\n    background: transparent;\n  }\n  .users-table tr.is-selected {\n    border-color: #8bd39a;\n  }\n  .users-table tr.is-selected td {\n    background: transparent;\n    border-top-color: transparent;\n  }\n  .users-table tr.is-selected td:first-child {\n    box-shadow: none;\n  }\n  .users-table td {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 0.9rem;\n    min-width: 0;\n    padding: 0.5rem 0;\n    border: 0;\n    color: var(--text-silver);\n  }\n  .users-table td + td {\n    border-top: 1px solid var(--surface-hover);\n  }\n  .users-table td::before {\n    content: attr(data-label);\n    flex-shrink: 0;\n    font-size: 0.7rem;\n    font-weight: 700;\n    letter-spacing: 0.6px;\n    text-transform: uppercase;\n    color: var(--text-muted);\n  }\n  .users-table td.user-cell::before {\n    display: none;\n  }\n  .user-cell {\n    justify-content: flex-start;\n    min-width: 0;\n    gap: 0.75rem;\n  }\n  .actions-column {\n    justify-content: flex-start;\n  }\n  .action-buttons {\n    margin-left: auto;\n    gap: 0.45rem;\n  }\n  .btn-icon {\n    width: 40px;\n    height: 40px;\n  }\n}\n.admins-container .btn-primary:focus-visible,\n.btn-primary:focus-visible,\n.admins-container .btn-icon:focus-visible,\n.btn-icon:focus-visible,\n.admins-container .btn-cancel:focus-visible,\n.btn-cancel:focus-visible,\n.admins-container .btn-confirm:focus-visible,\n.btn-confirm:focus-visible,\n.admins-container .switch:focus-visible,\n.switch:focus-visible,\n.admins-container .chip:focus-visible,\n.chip:focus-visible,\n.drawer button:focus-visible,\n.drawer input:focus-visible,\n.drawer select:focus-visible,\n.drawer textarea:focus-visible {\n  outline: 2px solid var(--accent-green);\n  outline-offset: 2px;\n}\n.btn-danger {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.45rem;\n  padding: 0.6rem 1.2rem;\n  border: none;\n  border-radius: 10px;\n  background: #e5484d;\n  color: var(--text-on-accent);\n  font-weight: 600;\n  font-size: 0.9rem;\n  font-family: inherit;\n  cursor: pointer;\n  transition:\n    background 0.2s ease,\n    transform 0.15s ease,\n    box-shadow 0.2s ease;\n}\n.btn-danger:hover:not(:disabled) {\n  background: #d93a3f;\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(229, 72, 77, 0.25);\n}\n.btn-danger:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.btn-danger:focus-visible {\n  outline: 2px solid #e5484d;\n  outline-offset: 2px;\n}\n.confirm-modal {\n  max-width: 420px;\n  width: calc(100% - 2rem);\n  text-align: center;\n}\n.confirm-icon {\n  width: 56px;\n  height: 56px;\n  margin: 0 auto 0.9rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n}\n.confirm-icon.danger {\n  background: rgba(229, 72, 77, 0.12);\n  color: #e5484d;\n}\n.confirm-icon svg {\n  width: 26px;\n  height: 26px;\n  stroke: currentColor;\n  fill: none;\n  stroke-width: 2;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.confirm-modal h3 {\n  margin: 0 0 0.5rem;\n  font-size: 1.15rem;\n  color: var(--text-main);\n}\n.confirm-modal p {\n  margin: 0 0 1.2rem;\n  color: #555555;\n  font-size: 0.92rem;\n  line-height: 1.5;\n}\n.confirm-modal .modal-actions {\n  display: flex;\n  gap: 0.75rem;\n  justify-content: center;\n}\n.detail-drawer {\n  width: min(92vw, 470px);\n}\n.detail-hero {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  padding-bottom: 1.2rem;\n  margin-bottom: 1.2rem;\n  border-bottom: 1px solid var(--border-color);\n}\n.detail-avatar {\n  width: 72px;\n  height: 72px;\n  border-radius: 50%;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: 1.35rem;\n  color: var(--text-on-accent);\n  letter-spacing: 0.02em;\n  flex-shrink: 0;\n  background:\n    linear-gradient(\n      135deg,\n      var(--text-muted),\n      var(--text-silver));\n}\n.detail-avatar.avatar-tone-0 {\n  background:\n    linear-gradient(\n      135deg,\n      #4f8cff,\n      #3b6fd4);\n}\n.detail-avatar.avatar-tone-1 {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      var(--accent-green-dark));\n}\n.detail-avatar.avatar-tone-2 {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      var(--warning));\n}\n.detail-avatar.avatar-tone-3 {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #7e22ce);\n}\n.detail-avatar.avatar-tone-4 {\n  background:\n    linear-gradient(\n      135deg,\n      #ec4899,\n      #be185d);\n}\n.detail-avatar.avatar-tone-5 {\n  background:\n    linear-gradient(\n      135deg,\n      #14b8a6,\n      #0f766e);\n}\n.detail-hero-meta {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 0.45rem;\n  min-width: 0;\n}\n.detail-hero-meta strong {\n  font-size: 1.1rem;\n  color: var(--text-main);\n  line-height: 1.3;\n  word-break: break-word;\n}\n.status-pill {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.25rem 0.7rem;\n  border-radius: 999px;\n  font-size: 0.75rem;\n  font-weight: 600;\n}\n.status-pill::before {\n  content: "";\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  background: currentColor;\n}\n.status-pill.is-on {\n  background: rgba(32, 176, 56, 0.12);\n  color: #1d8a34;\n}\n.status-pill:not(.is-on) {\n  background: rgba(229, 72, 77, 0.12);\n  color: #c53035;\n}\n.detail-section {\n  margin-bottom: 1.3rem;\n}\n.detail-section h4 {\n  margin: 0 0 0.75rem;\n  font-size: 0.78rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  color: #8a94a6;\n}\n.detail-grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.75rem;\n}\n.detail-item {\n  display: flex;\n  flex-direction: column;\n  gap: 0.2rem;\n  padding: 0.7rem 0.9rem;\n  background: var(--surface-muted);\n  border: 1px solid var(--border-color);\n  border-radius: 10px;\n  min-width: 0;\n}\n.detail-item small {\n  font-size: 0.7rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: #8a94a6;\n}\n.detail-item strong {\n  font-size: 0.92rem;\n  color: var(--text-main);\n  word-break: break-word;\n}\n.detail-actions {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  margin-top: 1.5rem;\n}\n.detail-actions .btn-cancel {\n  margin-right: auto;\n}\n@media (max-width: 520px) {\n  .detail-grid {\n    grid-template-columns: 1fr;\n  }\n  .detail-hero {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n}\n@media (max-width: 480px) {\n  .stats-grid {\n    grid-template-columns: 1fr;\n  }\n  .detail-actions {\n    flex-wrap: wrap;\n  }\n}\n.admins-container > *:not(.toast-host) {\n  position: relative;\n  z-index: 1;\n}\n:host-context(html[data-theme="dark"]) .avatar {\n  box-shadow: inset 0 0 0 999px rgba(13, 21, 23, 0.32), 0 4px 10px rgba(0, 0, 0, 0.45);\n}\n@media (max-width: 768px) {\n  .chip {\n    padding: 0.55rem 1.05rem;\n  }\n  .switch::after {\n    content: "";\n    position: absolute;\n    inset: -10px;\n    border-radius: 999px;\n  }\n  .btn-icon {\n    width: 40px;\n    height: 40px;\n  }\n}\n/*# sourceMappingURL=admin-admins.css.map */\n'] }]
  }], null, { onEscapeKey: [{
    type: HostListener,
    args: ["document:keydown.escape"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminAdminsComponent, { className: "AdminAdminsComponent", filePath: "src/app/components/admin/admin-admins/admin-admins.ts", lineNumber: 16 });
})();
export {
  AdminAdminsComponent
};
//# debugId=72245647-9423-5b0d-86f7-c64c87d0a792
//# sourceMappingURL=chunk-EDGAN7WN.js.map
