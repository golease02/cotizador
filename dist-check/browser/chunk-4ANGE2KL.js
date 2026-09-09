import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  ɵNgNoValidate
} from "./chunk-MVJCDSIT.js";
import {
  Router,
  RouterModule
} from "./chunk-UUNAMTTY.js";
import {
  AuthService
} from "./chunk-XCV63D25.js";
import {
  CommonModule,
  Component,
  NgIf,
  getSupabaseClient,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵcontrol,
  ɵɵcontrolCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-6KRTW2LJ.js";
import "./chunk-FDMHZOCR.js";

// src/app/components/auth/reset-password/reset-password.ts
function ResetPasswordComponent__svg_svg_63_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 35);
    \u0275\u0275element(1, "path", 49)(2, "circle", 50);
    \u0275\u0275elementEnd();
  }
}
function ResetPasswordComponent__svg_svg_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 35);
    \u0275\u0275element(1, "path", 51)(2, "line", 52);
    \u0275\u0275elementEnd();
  }
}
function ResetPasswordComponent_p_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 53);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 54);
    \u0275\u0275element(2, "path", 55)(3, "line", 56)(4, "line", 57);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.passwordError, " ");
  }
}
function ResetPasswordComponent__svg_svg_76_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 35);
    \u0275\u0275element(1, "path", 49)(2, "circle", 50);
    \u0275\u0275elementEnd();
  }
}
function ResetPasswordComponent__svg_svg_77_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 35);
    \u0275\u0275element(1, "path", 51)(2, "line", 52);
    \u0275\u0275elementEnd();
  }
}
function ResetPasswordComponent_p_78_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 58);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 54);
    \u0275\u0275element(2, "path", 55)(3, "line", 56)(4, "line", 57);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.confirmationError, " ");
  }
}
function ResetPasswordComponent_span_81_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 59);
  }
}
function ResetPasswordComponent__svg_svg_84_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 60);
    \u0275\u0275element(1, "line", 61)(2, "polyline", 62);
    \u0275\u0275elementEnd();
  }
}
function ResetPasswordComponent_p_85_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 63);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 64);
    \u0275\u0275element(2, "polyline", 65);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.successMessage());
  }
}
function ResetPasswordComponent_p_86_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 66);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 64);
    \u0275\u0275element(2, "circle", 67)(3, "line", 68)(4, "line", 69);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.errorMessage());
  }
}
var ResetPasswordComponent = class _ResetPasswordComponent {
  auth = inject(AuthService);
  client = getSupabaseClient();
  router = inject(Router);
  password = "";
  confirmation = "";
  errorMessage = signal(
    "",
    ...ngDevMode ? [{ debugName: "errorMessage" }] : (
      /* istanbul ignore next */
      []
    )
  );
  successMessage = signal(
    "",
    ...ngDevMode ? [{ debugName: "successMessage" }] : (
      /* istanbul ignore next */
      []
    )
  );
  loading = signal(
    false,
    ...ngDevMode ? [{ debugName: "loading" }] : (
      /* istanbul ignore next */
      []
    )
  );
  // Errores de validación por campo
  passwordError = "";
  confirmationError = "";
  // Estado de UI
  showPassword = false;
  showConfirmation = false;
  ngOnInit() {
    const fullHash = window.location.hash;
    let accessToken = null;
    let refreshToken = null;
    const accessMatch = fullHash.match(/access_token=([^&]+)/);
    const refreshMatch = fullHash.match(/refresh_token=([^&]+)/);
    if (accessMatch) {
      accessToken = accessMatch[1];
    }
    if (refreshMatch) {
      refreshToken = refreshMatch[1];
    }
    if (accessToken) {
      this.client.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken || ""
      }).then(({ error }) => {
        if (error) {
          this.errorMessage.set("El enlace no es v\xE1lido o ya expir\xF3.");
        }
      }).catch(() => {
        this.errorMessage.set("Error al procesar el enlace.");
      });
    } else {
      this.errorMessage.set("El enlace no es v\xE1lido o ya expir\xF3.");
    }
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  toggleConfirmationVisibility() {
    this.showConfirmation = !this.showConfirmation;
  }
  onPasswordInput() {
    if (this.passwordError)
      this.validatePassword();
    if (this.confirmation && this.confirmationError)
      this.validateConfirmation();
  }
  onPasswordBlur() {
    this.validatePassword();
    if (this.confirmation)
      this.validateConfirmation();
  }
  validatePassword() {
    if (!this.password) {
      this.passwordError = "La contrase\xF1a es obligatoria.";
      return false;
    }
    if (this.password.length < 6) {
      this.passwordError = "La contrase\xF1a debe tener al menos 6 caracteres.";
      return false;
    }
    this.passwordError = "";
    return true;
  }
  onConfirmationInput() {
    if (this.confirmationError)
      this.validateConfirmation();
  }
  onConfirmationBlur() {
    this.validateConfirmation();
  }
  validateConfirmation() {
    if (!this.confirmation) {
      this.confirmationError = "Confirma tu nueva contrase\xF1a.";
      return false;
    }
    if (this.confirmation !== this.password) {
      this.confirmationError = "Las contrase\xF1as no coinciden.";
      return false;
    }
    this.confirmationError = "";
    return true;
  }
  async onSubmit() {
    this.errorMessage.set("");
    this.successMessage.set("");
    const passwordOk = this.validatePassword();
    const confirmationOk = this.validateConfirmation();
    if (!passwordOk || !confirmationOk)
      return;
    this.loading.set(true);
    try {
      const { data: { session } } = await this.client.auth.getSession();
      if (!session) {
        this.errorMessage.set("El enlace no es v\xE1lido o ya expir\xF3.");
        this.loading.set(false);
        return;
      }
      const { error } = await this.client.auth.updateUser({ password: this.password });
      if (error) {
        this.errorMessage.set("No se pudo actualizar la contrase\xF1a.");
        this.loading.set(false);
        return;
      }
      await this.auth.signOut();
      this.successMessage.set("Contrase\xF1a actualizada. Ahora puedes iniciar sesi\xF3n con tu nueva contrase\xF1a.");
      setTimeout(() => this.router.navigate(["/login"]), 1500);
    } catch {
      this.errorMessage.set("Ocurri\xF3 un error inesperado.");
    } finally {
      this.loading.set(false);
    }
  }
  static \u0275fac = function ResetPasswordComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ResetPasswordComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ResetPasswordComponent, selectors: [["app-reset-password"]], decls: 87, vars: 28, consts: [[1, "auth-container"], [1, "auth-inner"], [1, "auth-brand"], [1, "brand-blob", "brand-blob--1"], [1, "brand-blob", "brand-blob--2"], [1, "brand-top"], [1, "brand-mark"], [1, "brand-names"], [1, "brand-name"], [1, "brand-tag"], [1, "brand-quote"], [1, "brand-features"], [1, "feature-icon"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "3", "stroke-linecap", "round", "stroke-linejoin", "round"], ["x", "3", "y", "11", "width", "18", "height", "11", "rx", "2"], ["d", "M7 11V7a5 5 0 0 1 10 0v4"], ["d", "M20 6L9 17l-5-5"], ["d", "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"], ["cx", "9", "cy", "7", "r", "4"], ["d", "M22 21v-2a4 4 0 0 0-3-3.87"], ["d", "M16 3.13a4 4 0 0 1 0 7.75"], [1, "brand-footer"], ["width", "15", "height", "15", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], [1, "auth-form-panel"], [1, "auth-card"], [1, "card-topline"], [1, "auth-header"], [1, "auth-eyebrow"], [1, "pulse-dot"], [1, "auth-title"], ["novalidate", "", 3, "ngSubmit"], [1, "form-group"], ["for", "new-password"], [1, "input-wrapper", "has-toggle"], [1, "input-icon"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["id", "new-password", "autocomplete", "new-password", "name", "password", "placeholder", "M\xEDnimo 6 caracteres", "aria-describedby", "new-password-error", 3, "ngModelChange", "input", "blur", "type", "ngModel"], ["type", "button", 1, "password-toggle", 3, "click"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round", 4, "ngIf"], ["class", "field-error", "id", "new-password-error", 4, "ngIf"], ["for", "password-confirmation"], ["id", "password-confirmation", "autocomplete", "new-password", "name", "confirmation", "placeholder", "Repite tu contrase\xF1a", "aria-describedby", "password-confirmation-error", 3, "ngModelChange", "input", "blur", "type", "ngModel"], ["class", "field-error", "id", "password-confirmation-error", 4, "ngIf"], [1, "form-action"], ["type", "submit", 1, "btn-primary", 3, "disabled"], ["class", "spinner", "aria-hidden", "true", 4, "ngIf"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round", 4, "ngIf"], ["class", "success", 4, "ngIf"], ["class", "error", 4, "ngIf"], ["d", "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"], ["cx", "12", "cy", "12", "r", "3"], ["d", "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"], ["x1", "1", "y1", "1", "x2", "23", "y2", "23"], ["id", "new-password-error", 1, "field-error"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"], ["x1", "12", "y1", "9", "x2", "12", "y2", "13"], ["x1", "12", "y1", "17", "x2", "12.01", "y2", "17"], ["id", "password-confirmation-error", 1, "field-error"], ["aria-hidden", "true", 1, "spinner"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["x1", "5", "y1", "12", "x2", "19", "y2", "12"], ["points", "12 5 19 12 12 19"], [1, "success"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["points", "20 6 9 17 4 12"], [1, "error"], ["cx", "12", "cy", "12", "r", "10"], ["x1", "12", "y1", "8", "x2", "12", "y2", "12"], ["x1", "12", "y1", "16", "x2", "12.01", "y2", "16"]], template: function ResetPasswordComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "aside", 2);
      \u0275\u0275element(3, "div", 3)(4, "div", 4);
      \u0275\u0275elementStart(5, "div", 5)(6, "span", 6);
      \u0275\u0275text(7, "G");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "div", 7)(9, "strong", 8);
      \u0275\u0275text(10, "GO LEASE MX");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "em", 9);
      \u0275\u0275text(12, "Nueva contrase\xF1a");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(13, "div", 10)(14, "p");
      \u0275\u0275text(15, '"Protege tu cuenta con una contrase\xF1a segura"');
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "ul", 11)(17, "li")(18, "span", 12);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(19, "svg", 13);
      \u0275\u0275element(20, "rect", 14)(21, "path", 15);
      \u0275\u0275elementEnd()();
      \u0275\u0275text(22, " Crea una contrase\xF1a de al menos 6 caracteres. ");
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(23, "li")(24, "span", 12);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(25, "svg", 13);
      \u0275\u0275element(26, "path", 16);
      \u0275\u0275elementEnd()();
      \u0275\u0275text(27, " Confirma tu nueva contrase\xF1a para evitar errores. ");
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(28, "li")(29, "span", 12);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(30, "svg", 13);
      \u0275\u0275element(31, "path", 17)(32, "circle", 18)(33, "path", 19)(34, "path", 20);
      \u0275\u0275elementEnd()();
      \u0275\u0275text(35, " Inicia sesi\xF3n con tu nueva contrase\xF1a. ");
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(36, "div", 21);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(37, "svg", 22);
      \u0275\u0275element(38, "rect", 14)(39, "path", 15);
      \u0275\u0275elementEnd();
      \u0275\u0275text(40, " Datos protegidos y seguros ");
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(41, "section", 23)(42, "div", 24);
      \u0275\u0275element(43, "span", 25);
      \u0275\u0275elementStart(44, "div", 26)(45, "span", 27);
      \u0275\u0275element(46, "span", 28);
      \u0275\u0275text(47, "Seguridad de la cuenta");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "h2", 29);
      \u0275\u0275text(49, "Nueva Contrase\xF1a");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(50, "p");
      \u0275\u0275text(51, "Define una contrase\xF1a nueva para tu cuenta.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(52, "form", 30);
      \u0275\u0275listener("ngSubmit", function ResetPasswordComponent_Template_form_ngSubmit_52_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(53, "div", 31)(54, "label", 32);
      \u0275\u0275text(55, "Nueva contrase\xF1a");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(56, "div", 33)(57, "span", 34);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(58, "svg", 35);
      \u0275\u0275element(59, "rect", 14)(60, "path", 15);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(61, "input", 36);
      \u0275\u0275twoWayListener("ngModelChange", function ResetPasswordComponent_Template_input_ngModelChange_61_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.password, $event) || (ctx.password = $event);
        return $event;
      });
      \u0275\u0275listener("input", function ResetPasswordComponent_Template_input_input_61_listener() {
        return ctx.onPasswordInput();
      })("blur", function ResetPasswordComponent_Template_input_blur_61_listener() {
        return ctx.onPasswordBlur();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275elementStart(62, "button", 37);
      \u0275\u0275listener("click", function ResetPasswordComponent_Template_button_click_62_listener() {
        return ctx.togglePasswordVisibility();
      });
      \u0275\u0275template(63, ResetPasswordComponent__svg_svg_63_Template, 3, 0, "svg", 38)(64, ResetPasswordComponent__svg_svg_64_Template, 3, 0, "svg", 38);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(65, ResetPasswordComponent_p_65_Template, 6, 1, "p", 39);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(66, "div", 31)(67, "label", 40);
      \u0275\u0275text(68, "Confirmar contrase\xF1a");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(69, "div", 33)(70, "span", 34);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(71, "svg", 35);
      \u0275\u0275element(72, "rect", 14)(73, "path", 15);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(74, "input", 41);
      \u0275\u0275twoWayListener("ngModelChange", function ResetPasswordComponent_Template_input_ngModelChange_74_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.confirmation, $event) || (ctx.confirmation = $event);
        return $event;
      });
      \u0275\u0275listener("input", function ResetPasswordComponent_Template_input_input_74_listener() {
        return ctx.onConfirmationInput();
      })("blur", function ResetPasswordComponent_Template_input_blur_74_listener() {
        return ctx.onConfirmationBlur();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275elementStart(75, "button", 37);
      \u0275\u0275listener("click", function ResetPasswordComponent_Template_button_click_75_listener() {
        return ctx.toggleConfirmationVisibility();
      });
      \u0275\u0275template(76, ResetPasswordComponent__svg_svg_76_Template, 3, 0, "svg", 38)(77, ResetPasswordComponent__svg_svg_77_Template, 3, 0, "svg", 38);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(78, ResetPasswordComponent_p_78_Template, 6, 1, "p", 42);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(79, "div", 43)(80, "button", 44);
      \u0275\u0275template(81, ResetPasswordComponent_span_81_Template, 1, 0, "span", 45);
      \u0275\u0275elementStart(82, "span");
      \u0275\u0275text(83);
      \u0275\u0275elementEnd();
      \u0275\u0275template(84, ResetPasswordComponent__svg_svg_84_Template, 3, 0, "svg", 46);
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(85, ResetPasswordComponent_p_85_Template, 5, 1, "p", 47)(86, ResetPasswordComponent_p_86_Template, 7, 1, "p", 48);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(56);
      \u0275\u0275classProp("is-invalid", !!ctx.passwordError)("is-valid", !ctx.passwordError && ctx.password.length >= 6);
      \u0275\u0275advance(5);
      \u0275\u0275property("type", ctx.showPassword ? "text" : "password");
      \u0275\u0275twoWayProperty("ngModel", ctx.password);
      \u0275\u0275attribute("aria-invalid", ctx.passwordError ? true : null);
      \u0275\u0275control();
      \u0275\u0275advance();
      \u0275\u0275attribute("aria-label", ctx.showPassword ? "Ocultar contrase\xF1a" : "Mostrar contrase\xF1a");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.showPassword);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showPassword);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.passwordError);
      \u0275\u0275advance(4);
      \u0275\u0275classProp("is-invalid", !!ctx.confirmationError)("is-valid", !ctx.confirmationError && ctx.confirmation.length >= 6 && ctx.confirmation === ctx.password);
      \u0275\u0275advance(5);
      \u0275\u0275property("type", ctx.showConfirmation ? "text" : "password");
      \u0275\u0275twoWayProperty("ngModel", ctx.confirmation);
      \u0275\u0275attribute("aria-invalid", ctx.confirmationError ? true : null);
      \u0275\u0275control();
      \u0275\u0275advance();
      \u0275\u0275attribute("aria-label", ctx.showConfirmation ? "Ocultar contrase\xF1a" : "Mostrar contrase\xF1a");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.showConfirmation);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showConfirmation);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.confirmationError);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.loading());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loading());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.loading() ? "Actualizando..." : "Actualizar contrase\xF1a");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.successMessage());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.errorMessage());
    }
  }, dependencies: [CommonModule, NgIf, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, NgModel, NgForm, RouterModule], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ResetPasswordComponent, [{
    type: Component,
    args: [{ selector: "app-reset-password", standalone: true, imports: [CommonModule, FormsModule, RouterModule], template: `<div class="auth-container">\r
    <div class="auth-inner">\r
        <!-- Panel de marca -->\r
        <aside class="auth-brand">\r
            <div class="brand-blob brand-blob--1"></div>\r
            <div class="brand-blob brand-blob--2"></div>\r
\r
            <div class="brand-top">\r
                <span class="brand-mark">G</span>\r
                <div class="brand-names">\r
                    <strong class="brand-name">GO LEASE MX</strong>\r
                    <em class="brand-tag">Nueva contrase\xF1a</em>\r
                </div>\r
            </div>\r
\r
            <div class="brand-quote">\r
                <p>"Protege tu cuenta con una contrase\xF1a segura"</p>\r
            </div>\r
\r
            <ul class="brand-features">\r
                <li>\r
                    <span class="feature-icon">\r
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>\r
                    </span>\r
                    Crea una contrase\xF1a de al menos 6 caracteres.\r
                </li>\r
                <li>\r
                    <span class="feature-icon">\r
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5" /></svg>\r
                    </span>\r
                    Confirma tu nueva contrase\xF1a para evitar errores.\r
                </li>\r
                <li>\r
                    <span class="feature-icon">\r
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>\r
                    </span>\r
                    Inicia sesi\xF3n con tu nueva contrase\xF1a.\r
                </li>\r
            </ul>\r
\r
            <div class="brand-footer">\r
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>\r
                Datos protegidos y seguros\r
            </div>\r
        </aside>\r
\r
        <section class="auth-form-panel">\r
            <div class="auth-card">\r
                <span class="card-topline"></span>\r
\r
                <div class="auth-header">\r
                    <span class="auth-eyebrow"><span class="pulse-dot"></span>Seguridad de la cuenta</span>\r
                    <h2 class="auth-title">Nueva Contrase\xF1a</h2>\r
                    <p>Define una contrase\xF1a nueva para tu cuenta.</p>\r
                </div>\r
\r
                <form (ngSubmit)="onSubmit()" novalidate>\r
                    <div class="form-group">\r
                        <label for="new-password">Nueva contrase\xF1a</label>\r
                        <div class="input-wrapper has-toggle" [class.is-invalid]="!!passwordError" [class.is-valid]="!passwordError && password.length >= 6">\r
                            <span class="input-icon">\r
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>\r
                            </span>\r
                            <input id="new-password" [type]="showPassword ? 'text' : 'password'" autocomplete="new-password"\r
                                [(ngModel)]="password" name="password" placeholder="M\xEDnimo 6 caracteres"\r
                                (input)="onPasswordInput()" (blur)="onPasswordBlur()"\r
                                [attr.aria-invalid]="passwordError ? true : null" aria-describedby="new-password-error" />\r
                            <button type="button" class="password-toggle" (click)="togglePasswordVisibility()"\r
                                [attr.aria-label]="showPassword ? 'Ocultar contrase\xF1a' : 'Mostrar contrase\xF1a'">\r
                                <svg *ngIf="!showPassword" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>\r
                                <svg *ngIf="showPassword" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>\r
                            </button>\r
                        </div>\r
                        <p class="field-error" id="new-password-error" *ngIf="passwordError">\r
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>\r
                            {{ passwordError }}\r
                        </p>\r
                    </div>\r
\r
                    <div class="form-group">\r
                        <label for="password-confirmation">Confirmar contrase\xF1a</label>\r
                        <div class="input-wrapper has-toggle" [class.is-invalid]="!!confirmationError" [class.is-valid]="!confirmationError && confirmation.length >= 6 && confirmation === password">\r
                            <span class="input-icon">\r
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>\r
                            </span>\r
                            <input id="password-confirmation" [type]="showConfirmation ? 'text' : 'password'" autocomplete="new-password"\r
                                [(ngModel)]="confirmation" name="confirmation" placeholder="Repite tu contrase\xF1a"\r
                                (input)="onConfirmationInput()" (blur)="onConfirmationBlur()"\r
                                [attr.aria-invalid]="confirmationError ? true : null" aria-describedby="password-confirmation-error" />\r
                            <button type="button" class="password-toggle" (click)="toggleConfirmationVisibility()"\r
                                [attr.aria-label]="showConfirmation ? 'Ocultar contrase\xF1a' : 'Mostrar contrase\xF1a'">\r
                                <svg *ngIf="!showConfirmation" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>\r
                                <svg *ngIf="showConfirmation" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>\r
                            </button>\r
                        </div>\r
                        <p class="field-error" id="password-confirmation-error" *ngIf="confirmationError">\r
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>\r
                            {{ confirmationError }}\r
                        </p>\r
                    </div>\r
\r
                    <div class="form-action">\r
                        <button type="submit" class="btn-primary" [disabled]="loading()">\r
                            <span class="spinner" *ngIf="loading()" aria-hidden="true"></span>\r
                            <span>{{ loading() ? 'Actualizando...' : 'Actualizar contrase\xF1a' }}</span>\r
                            <svg *ngIf="!loading()" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>\r
                        </button>\r
                    </div>\r
                </form>\r
\r
                <p *ngIf="successMessage()" class="success">\r
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>\r
                    <span>{{ successMessage() }}</span>\r
                </p>\r
                <p *ngIf="errorMessage()" class="error">\r
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>\r
                    <span>{{ errorMessage() }}</span>\r
                </p>\r
            </div>\r
        </section>\r
    </div>\r
</div>\r
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ResetPasswordComponent, { className: "ResetPasswordComponent", filePath: "src/app/components/auth/reset-password/reset-password.ts", lineNumber: 14 });
})();
export {
  ResetPasswordComponent
};
//# debugId=fab5740f-f1d5-540d-8e09-2425c0ae2fab
//# sourceMappingURL=chunk-4ANGE2KL.js.map
