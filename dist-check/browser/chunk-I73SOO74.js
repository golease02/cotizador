import {
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  ɵNgNoValidate
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
  NgIf,
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

// src/app/components/auth/login/login.ts
function LoginComponent_span_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 52);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r0.phoneNumber.length, "/10");
  }
}
function LoginComponent_span_59_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 53);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 54);
    \u0275\u0275element(2, "polyline", 14);
    \u0275\u0275elementEnd()();
  }
}
function LoginComponent_p_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 55);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 56);
    \u0275\u0275element(2, "path", 57)(3, "line", 58)(4, "line", 59);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.phoneError, " ");
  }
}
function LoginComponent__svg_svg_71_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 31);
    \u0275\u0275element(1, "path", 60)(2, "circle", 61);
    \u0275\u0275elementEnd();
  }
}
function LoginComponent__svg_svg_72_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 31);
    \u0275\u0275element(1, "path", 62)(2, "line", 63);
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_p_73_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 64);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 56);
    \u0275\u0275element(2, "path", 57)(3, "line", 58)(4, "line", 59);
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
function LoginComponent_span_76_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 65);
  }
}
function LoginComponent__svg_svg_79_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 66);
    \u0275\u0275element(1, "line", 67)(2, "polyline", 68);
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_p_87_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 69);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 70);
    \u0275\u0275element(2, "circle", 71)(3, "line", 72)(4, "line", 73);
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
var LoginComponent = class _LoginComponent {
  auth = inject(AuthService);
  router = inject(Router);
  phoneNumber = "";
  password = "";
  errorMessage = signal(
    "",
    ...ngDevMode ? [{ debugName: "errorMessage" }] : (
      /* istanbul ignore next */
      []
    )
  );
  // Errores de validación por campo
  phoneError = "";
  passwordError = "";
  // Estado de UI
  isLoading = signal(
    false,
    ...ngDevMode ? [{ debugName: "isLoading" }] : (
      /* istanbul ignore next */
      []
    )
  );
  showPassword = false;
  phoneRegex = /^\d{10}$/;
  /** Filtra en vivo: solo dígitos, máximo 10 caracteres. */
  onPhoneInput(event) {
    const input = event.target;
    input.value = input.value.replace(/\D/g, "").slice(0, 10);
    this.phoneNumber = input.value;
    if (this.phoneError)
      this.validatePhone();
  }
  onPhoneBlur() {
    this.validatePhone();
  }
  validatePhone() {
    if (!this.phoneNumber) {
      this.phoneError = "El n\xFAmero de celular es obligatorio.";
      return false;
    }
    if (!this.phoneRegex.test(this.phoneNumber)) {
      this.phoneError = "Ingresa un n\xFAmero v\xE1lido de 10 d\xEDgitos.";
      return false;
    }
    this.phoneError = "";
    return true;
  }
  onPasswordInput() {
    if (this.passwordError)
      this.validatePassword();
  }
  onPasswordBlur() {
    this.validatePassword();
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
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  async onLogin() {
    this.errorMessage.set("");
    const phoneOk = this.validatePhone();
    const passwordOk = this.validatePassword();
    if (!phoneOk || !passwordOk)
      return;
    this.isLoading.set(true);
    try {
      const { data: profile, error: profileError } = await this.auth.getProfileBySellerNumber(this.phoneNumber);
      if (profileError || !profile) {
        this.errorMessage.set("N\xFAmero de celular no registrado.");
        return;
      }
      const email = profile.email?.trim().toLowerCase();
      if (!email) {
        this.errorMessage.set("La cuenta no tiene un correo de autenticaci\xF3n configurado.");
        return;
      }
      const { error } = await this.auth.signIn(email, this.password);
      if (error) {
        this.errorMessage.set(error.message || "Error al iniciar sesi\xF3n.");
        return;
      }
      const user = this.auth.currentUser();
      if (!user) {
        this.errorMessage.set("No se pudo obtener el usuario.");
        return;
      }
      const loggedProfile = await this.auth.loadProfile(user.id);
      if (loggedProfile?.role === "admin") {
        this.router.navigate(["/admin"]);
      } else {
        this.router.navigate(["/"]);
      }
    } catch {
      this.errorMessage.set("Ocurri\xF3 un error inesperado. Intenta de nuevo.");
    } finally {
      this.isLoading.set(false);
    }
  }
  static \u0275fac = function LoginComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LoginComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], decls: 88, vars: 25, consts: [[1, "auth-container"], [1, "auth-inner"], [1, "auth-brand"], [1, "brand-blob", "brand-blob--1"], [1, "brand-blob", "brand-blob--2"], [1, "brand-top"], [1, "brand-mark"], [1, "brand-names"], [1, "brand-name"], [1, "brand-tag"], [1, "brand-quote"], [1, "brand-features"], [1, "feature-icon"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "3", "stroke-linecap", "round", "stroke-linejoin", "round"], ["points", "20 6 9 17 4 12"], ["x", "3", "y", "11", "width", "18", "height", "11", "rx", "2"], ["d", "M7 11V7a5 5 0 0 1 10 0v4"], [1, "brand-footer"], ["width", "15", "height", "15", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], [1, "auth-form-panel"], [1, "auth-card"], [1, "card-topline"], [1, "auth-header"], [1, "auth-eyebrow"], [1, "pulse-dot"], [1, "auth-title"], ["novalidate", "", 3, "ngSubmit"], [1, "form-group"], ["for", "login-phone"], [1, "input-wrapper"], [1, "input-icon"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.13a2 2 0 0 1 1.99-2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"], ["id", "login-phone", "type", "text", "inputmode", "numeric", "maxlength", "10", "autocomplete", "tel", "name", "phoneNumber", "placeholder", "Ej. 5512345678", "aria-describedby", "login-phone-error", 3, "ngModelChange", "input", "blur", "ngModel"], ["class", "phone-counter", 4, "ngIf"], ["class", "valid-check", "aria-hidden", "true", 4, "ngIf"], ["class", "field-error", "id", "login-phone-error", 4, "ngIf"], ["for", "login-password"], [1, "input-wrapper", "has-toggle"], ["id", "login-password", "autocomplete", "current-password", "name", "password", "placeholder", "M\xEDnimo 6 caracteres", "aria-describedby", "login-password-error", 3, "ngModelChange", "input", "blur", "type", "ngModel"], ["type", "button", 1, "password-toggle", 3, "click"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round", 4, "ngIf"], ["class", "field-error", "id", "login-password-error", 4, "ngIf"], [1, "form-action"], ["type", "submit", 1, "btn-primary", 3, "disabled"], ["class", "spinner", "aria-hidden", "true", 4, "ngIf"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round", 4, "ngIf"], [1, "auth-links"], [1, "auth-link"], ["routerLink", "/register"], ["routerLink", "/recuperar-contrasena", 1, "forgot-link"], ["class", "error", 4, "ngIf"], [1, "phone-counter"], ["aria-hidden", "true", 1, "valid-check"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "3", "stroke-linecap", "round", "stroke-linejoin", "round"], ["id", "login-phone-error", 1, "field-error"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"], ["x1", "12", "y1", "9", "x2", "12", "y2", "13"], ["x1", "12", "y1", "17", "x2", "12.01", "y2", "17"], ["d", "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"], ["cx", "12", "cy", "12", "r", "3"], ["d", "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"], ["x1", "1", "y1", "1", "x2", "23", "y2", "23"], ["id", "login-password-error", 1, "field-error"], ["aria-hidden", "true", 1, "spinner"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["x1", "5", "y1", "12", "x2", "19", "y2", "12"], ["points", "12 5 19 12 12 19"], [1, "error"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["cx", "12", "cy", "12", "r", "10"], ["x1", "12", "y1", "8", "x2", "12", "y2", "12"], ["x1", "12", "y1", "16", "x2", "12.01", "y2", "16"]], template: function LoginComponent_Template(rf, ctx) {
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
      \u0275\u0275text(12, "Cotizador de veh\xEDculos");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(13, "div", 10)(14, "p");
      \u0275\u0275text(15, '"Haz de tus impuestos, la renta de tu auto"');
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "ul", 11)(17, "li")(18, "span", 12);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(19, "svg", 13);
      \u0275\u0275element(20, "polyline", 14);
      \u0275\u0275elementEnd()();
      \u0275\u0275text(21, " Ingresa con tu n\xFAmero de celular y contrase\xF1a registrados. ");
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(22, "li")(23, "span", 12);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(24, "svg", 13);
      \u0275\u0275element(25, "polyline", 14);
      \u0275\u0275elementEnd()();
      \u0275\u0275text(26, " Genera cotizaciones y consulta tu historial. ");
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(27, "li")(28, "span", 12);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(29, "svg", 13);
      \u0275\u0275element(30, "rect", 15)(31, "path", 16);
      \u0275\u0275elementEnd()();
      \u0275\u0275text(32, " \xBFOlvidaste tu contrase\xF1a? Recup\xE9rala desde el formulario. ");
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(33, "div", 17);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(34, "svg", 18);
      \u0275\u0275element(35, "rect", 15)(36, "path", 16);
      \u0275\u0275elementEnd();
      \u0275\u0275text(37, " Conexi\xF3n segura SSL ");
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(38, "section", 19)(39, "div", 20);
      \u0275\u0275element(40, "span", 21);
      \u0275\u0275elementStart(41, "div", 22)(42, "span", 23);
      \u0275\u0275element(43, "span", 24);
      \u0275\u0275text(44, "Portal de vendedores");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "h2", 25);
      \u0275\u0275text(46, "Iniciar Sesi\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(47, "p");
      \u0275\u0275text(48, "Usa tu n\xFAmero de celular y contrase\xF1a");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(49, "form", 26);
      \u0275\u0275listener("ngSubmit", function LoginComponent_Template_form_ngSubmit_49_listener() {
        return ctx.onLogin();
      });
      \u0275\u0275elementStart(50, "div", 27)(51, "label", 28);
      \u0275\u0275text(52, "N\xFAmero de celular");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(53, "div", 29)(54, "span", 30);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(55, "svg", 31);
      \u0275\u0275element(56, "path", 32);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(57, "input", 33);
      \u0275\u0275twoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_57_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.phoneNumber, $event) || (ctx.phoneNumber = $event);
        return $event;
      });
      \u0275\u0275listener("input", function LoginComponent_Template_input_input_57_listener($event) {
        return ctx.onPhoneInput($event);
      })("blur", function LoginComponent_Template_input_blur_57_listener() {
        return ctx.onPhoneBlur();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275template(58, LoginComponent_span_58_Template, 2, 1, "span", 34)(59, LoginComponent_span_59_Template, 3, 0, "span", 35);
      \u0275\u0275elementEnd();
      \u0275\u0275template(60, LoginComponent_p_60_Template, 6, 1, "p", 36);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(61, "div", 27)(62, "label", 37);
      \u0275\u0275text(63, "Contrase\xF1a");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(64, "div", 38)(65, "span", 30);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(66, "svg", 31);
      \u0275\u0275element(67, "rect", 15)(68, "path", 16);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(69, "input", 39);
      \u0275\u0275twoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_69_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.password, $event) || (ctx.password = $event);
        return $event;
      });
      \u0275\u0275listener("input", function LoginComponent_Template_input_input_69_listener() {
        return ctx.onPasswordInput();
      })("blur", function LoginComponent_Template_input_blur_69_listener() {
        return ctx.onPasswordBlur();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275elementStart(70, "button", 40);
      \u0275\u0275listener("click", function LoginComponent_Template_button_click_70_listener() {
        return ctx.togglePasswordVisibility();
      });
      \u0275\u0275template(71, LoginComponent__svg_svg_71_Template, 3, 0, "svg", 41)(72, LoginComponent__svg_svg_72_Template, 3, 0, "svg", 41);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(73, LoginComponent_p_73_Template, 6, 1, "p", 42);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(74, "div", 43)(75, "button", 44);
      \u0275\u0275template(76, LoginComponent_span_76_Template, 1, 0, "span", 45);
      \u0275\u0275elementStart(77, "span");
      \u0275\u0275text(78);
      \u0275\u0275elementEnd();
      \u0275\u0275template(79, LoginComponent__svg_svg_79_Template, 3, 0, "svg", 46);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(80, "div", 47)(81, "p", 48);
      \u0275\u0275text(82, " \xBFNo tienes cuenta? ");
      \u0275\u0275elementStart(83, "a", 49);
      \u0275\u0275text(84, "Reg\xEDstrate");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(85, "a", 50);
      \u0275\u0275text(86, "\xBFOlvidaste tu contrase\xF1a?");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(87, LoginComponent_p_87_Template, 7, 1, "p", 51);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(53);
      \u0275\u0275classProp("is-invalid", !!ctx.phoneError)("is-valid", !ctx.phoneError && ctx.phoneNumber.length === 10);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.phoneNumber);
      \u0275\u0275attribute("aria-invalid", ctx.phoneError ? true : null);
      \u0275\u0275control();
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.phoneNumber.length > 0 && ctx.phoneNumber.length < 10);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.phoneNumber.length === 10);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.phoneError);
      \u0275\u0275advance(4);
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
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.isLoading());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isLoading());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.isLoading() ? "Ingresando..." : "Iniciar sesi\xF3n");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoading());
      \u0275\u0275advance(8);
      \u0275\u0275property("ngIf", ctx.errorMessage());
    }
  }, dependencies: [CommonModule, NgIf, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, MaxLengthValidator, NgModel, NgForm, RouterModule, RouterLink], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoginComponent, [{
    type: Component,
    args: [{ selector: "app-login", standalone: true, imports: [CommonModule, FormsModule, RouterModule], template: `<div class="auth-container">\r
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
                    <em class="brand-tag">Cotizador de veh\xEDculos</em>\r
                </div>\r
            </div>\r
\r
            <div class="brand-quote">\r
                <p>"Haz de tus impuestos, la renta de tu auto"</p>\r
            </div>\r
\r
            <ul class="brand-features">\r
                <li>\r
                    <span class="feature-icon">\r
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>\r
                    </span>\r
                    Ingresa con tu n\xFAmero de celular y contrase\xF1a registrados.\r
                </li>\r
                <li>\r
                    <span class="feature-icon">\r
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>\r
                    </span>\r
                    Genera cotizaciones y consulta tu historial.\r
                </li>\r
                <li>\r
                    <span class="feature-icon">\r
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>\r
                    </span>\r
                    \xBFOlvidaste tu contrase\xF1a? Recup\xE9rala desde el formulario.\r
                </li>\r
            </ul>\r
\r
            <div class="brand-footer">\r
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>\r
                Conexi\xF3n segura SSL\r
            </div>\r
        </aside>\r
\r
        <!-- Panel del formulario -->\r
        <section class="auth-form-panel">\r
            <div class="auth-card">\r
                <span class="card-topline"></span>\r
\r
                <div class="auth-header">\r
                    <span class="auth-eyebrow"><span class="pulse-dot"></span>Portal de vendedores</span>\r
                    <h2 class="auth-title">Iniciar Sesi\xF3n</h2>\r
                    <p>Usa tu n\xFAmero de celular y contrase\xF1a</p>\r
                </div>\r
\r
                <form (ngSubmit)="onLogin()" novalidate>\r
                    <div class="form-group">\r
                        <label for="login-phone">N\xFAmero de celular</label>\r
                        <div class="input-wrapper" [class.is-invalid]="!!phoneError" [class.is-valid]="!phoneError && phoneNumber.length === 10">\r
                            <span class="input-icon">\r
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.13a2 2 0 0 1 1.99-2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>\r
                            </span>\r
                            <input id="login-phone" type="text" inputmode="numeric" maxlength="10" autocomplete="tel"\r
                                [(ngModel)]="phoneNumber" name="phoneNumber" placeholder="Ej. 5512345678"\r
                                (input)="onPhoneInput($event)" (blur)="onPhoneBlur()"\r
                                [attr.aria-invalid]="phoneError ? true : null" aria-describedby="login-phone-error" />\r
                            <span class="phone-counter" *ngIf="phoneNumber.length > 0 && phoneNumber.length < 10">{{ phoneNumber.length }}/10</span>\r
                            <span class="valid-check" *ngIf="phoneNumber.length === 10" aria-hidden="true">\r
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>\r
                            </span>\r
                        </div>\r
                        <p class="field-error" id="login-phone-error" *ngIf="phoneError">\r
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>\r
                            {{ phoneError }}\r
                        </p>\r
                    </div>\r
\r
                    <div class="form-group">\r
                        <label for="login-password">Contrase\xF1a</label>\r
                        <div class="input-wrapper has-toggle" [class.is-invalid]="!!passwordError" [class.is-valid]="!passwordError && password.length >= 6">\r
                            <span class="input-icon">\r
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>\r
                            </span>\r
                            <input id="login-password" [type]="showPassword ? 'text' : 'password'" autocomplete="current-password"\r
                                [(ngModel)]="password" name="password" placeholder="M\xEDnimo 6 caracteres"\r
                                (input)="onPasswordInput()" (blur)="onPasswordBlur()"\r
                                [attr.aria-invalid]="passwordError ? true : null" aria-describedby="login-password-error" />\r
                            <button type="button" class="password-toggle" (click)="togglePasswordVisibility()"\r
                                [attr.aria-label]="showPassword ? 'Ocultar contrase\xF1a' : 'Mostrar contrase\xF1a'">\r
                                <svg *ngIf="!showPassword" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>\r
                                <svg *ngIf="showPassword" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>\r
                            </button>\r
                        </div>\r
                        <p class="field-error" id="login-password-error" *ngIf="passwordError">\r
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>\r
                            {{ passwordError }}\r
                        </p>\r
                    </div>\r
\r
                    <div class="form-action">\r
                        <button type="submit" class="btn-primary" [disabled]="isLoading()">\r
                            <span class="spinner" *ngIf="isLoading()" aria-hidden="true"></span>\r
                            <span>{{ isLoading() ? 'Ingresando...' : 'Iniciar sesi\xF3n' }}</span>\r
                            <svg *ngIf="!isLoading()" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>\r
                        </button>\r
                    </div>\r
                </form>\r
\r
                <div class="auth-links">\r
                    <p class="auth-link">\r
                        \xBFNo tienes cuenta? <a routerLink="/register">Reg\xEDstrate</a>\r
                    </p>\r
                    <a class="forgot-link" routerLink="/recuperar-contrasena">\xBFOlvidaste tu contrase\xF1a?</a>\r
                </div>\r
\r
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src/app/components/auth/login/login.ts", lineNumber: 13 });
})();
export {
  LoginComponent
};
//# debugId=ef7d99c5-71bf-55ad-9d78-cf7886fcb645
//# sourceMappingURL=chunk-I73SOO74.js.map
