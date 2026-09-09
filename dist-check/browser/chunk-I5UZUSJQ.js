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
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
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

// src/app/components/auth/password-recovery/password-recovery.ts
function PasswordRecoveryComponent_form_50_span_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 52);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r1.phoneNumber.length, "/10");
  }
}
function PasswordRecoveryComponent_form_50_span_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 53);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 54);
    \u0275\u0275element(2, "polyline", 14);
    \u0275\u0275elementEnd()();
  }
}
function PasswordRecoveryComponent_form_50_p_11_Template(rf, ctx) {
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
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r1.phoneError, " ");
  }
}
function PasswordRecoveryComponent_form_50_span_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 53);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 54);
    \u0275\u0275element(2, "polyline", 14);
    \u0275\u0275elementEnd()();
  }
}
function PasswordRecoveryComponent_form_50_p_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 60);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 56);
    \u0275\u0275element(2, "path", 57)(3, "line", 58)(4, "line", 59);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r1.emailError, " ");
  }
}
function PasswordRecoveryComponent_form_50_span_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 61);
  }
}
function PasswordRecoveryComponent_form_50__svg_svg_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 62);
    \u0275\u0275element(1, "line", 63)(2, "polyline", 64);
    \u0275\u0275elementEnd();
  }
}
function PasswordRecoveryComponent_form_50_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 34);
    \u0275\u0275listener("ngSubmit", function PasswordRecoveryComponent_form_50_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSubmit());
    });
    \u0275\u0275elementStart(1, "div", 35)(2, "label", 36);
    \u0275\u0275text(3, "N\xFAmero de celular");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 37)(5, "span", 38);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(6, "svg", 39);
    \u0275\u0275element(7, "path", 40);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "input", 41);
    \u0275\u0275twoWayListener("ngModelChange", function PasswordRecoveryComponent_form_50_Template_input_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.phoneNumber, $event) || (ctx_r1.phoneNumber = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function PasswordRecoveryComponent_form_50_Template_input_input_8_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onPhoneInput($event));
    })("blur", function PasswordRecoveryComponent_form_50_Template_input_blur_8_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onPhoneBlur());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275template(9, PasswordRecoveryComponent_form_50_span_9_Template, 2, 1, "span", 42)(10, PasswordRecoveryComponent_form_50_span_10_Template, 3, 0, "span", 43);
    \u0275\u0275elementEnd();
    \u0275\u0275template(11, PasswordRecoveryComponent_form_50_p_11_Template, 6, 1, "p", 44);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 35)(13, "label", 45);
    \u0275\u0275text(14, "Correo de recuperaci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 37)(16, "span", 38);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(17, "svg", 39);
    \u0275\u0275element(18, "rect", 15)(19, "path", 16);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(20, "input", 46);
    \u0275\u0275twoWayListener("ngModelChange", function PasswordRecoveryComponent_form_50_Template_input_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.recoveryEmail, $event) || (ctx_r1.recoveryEmail = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function PasswordRecoveryComponent_form_50_Template_input_input_20_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onEmailInput());
    })("blur", function PasswordRecoveryComponent_form_50_Template_input_blur_20_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onEmailBlur());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275template(21, PasswordRecoveryComponent_form_50_span_21_Template, 3, 0, "span", 43);
    \u0275\u0275elementEnd();
    \u0275\u0275template(22, PasswordRecoveryComponent_form_50_p_22_Template, 6, 1, "p", 47);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div", 48)(24, "button", 49);
    \u0275\u0275template(25, PasswordRecoveryComponent_form_50_span_25_Template, 1, 0, "span", 50);
    \u0275\u0275elementStart(26, "span");
    \u0275\u0275text(27);
    \u0275\u0275elementEnd();
    \u0275\u0275template(28, PasswordRecoveryComponent_form_50__svg_svg_28_Template, 3, 0, "svg", 51);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275classProp("is-invalid", !!ctx_r1.phoneError)("is-valid", !ctx_r1.phoneError && ctx_r1.phoneNumber.length === 10);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.phoneNumber);
    \u0275\u0275attribute("aria-invalid", ctx_r1.phoneError ? true : null);
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.phoneNumber.length > 0 && ctx_r1.phoneNumber.length < 10);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.phoneNumber.length === 10);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.phoneError);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("is-invalid", !!ctx_r1.emailError)("is-valid", !ctx_r1.emailError && ctx_r1.emailIsValid);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.recoveryEmail);
    \u0275\u0275attribute("aria-invalid", ctx_r1.emailError ? true : null);
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.emailError && ctx_r1.emailIsValid);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.emailError);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.loading());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.loading());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.loading() ? "Enviando..." : "Enviar enlace");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.loading());
  }
}
function PasswordRecoveryComponent_p_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 65);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 66);
    \u0275\u0275element(2, "polyline", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "Si los datos son v\xE1lidos, recibir\xE1s un enlace para cambiar tu contrase\xF1a. Revisa tu correo.");
    \u0275\u0275elementEnd()();
  }
}
function PasswordRecoveryComponent_p_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 67);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 66);
    \u0275\u0275element(2, "circle", 68)(3, "line", 69)(4, "line", 70);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.errorMessage());
  }
}
var PasswordRecoveryComponent = class _PasswordRecoveryComponent {
  auth = inject(AuthService);
  phoneNumber = "";
  recoveryEmail = "";
  errorMessage = signal(
    "",
    ...ngDevMode ? [{ debugName: "errorMessage" }] : (
      /* istanbul ignore next */
      []
    )
  );
  submitted = signal(
    false,
    ...ngDevMode ? [{ debugName: "submitted" }] : (
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
  phoneError = "";
  emailError = "";
  phoneRegex = /^\d{10}$/;
  emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
  onEmailInput() {
    if (this.emailError)
      this.validateEmail();
  }
  onEmailBlur() {
    this.validateEmail();
  }
  validateEmail() {
    if (!this.recoveryEmail.trim()) {
      this.emailError = "El correo de recuperaci\xF3n es obligatorio.";
      return false;
    }
    if (!this.emailRegex.test(this.recoveryEmail.trim())) {
      this.emailError = "Ingresa un correo de recuperaci\xF3n v\xE1lido.";
      return false;
    }
    this.emailError = "";
    return true;
  }
  /** Estado visual del campo de correo (check verde). */
  get emailIsValid() {
    return this.emailRegex.test(this.recoveryEmail.trim());
  }
  async onSubmit() {
    this.errorMessage.set("");
    const phoneOk = this.validatePhone();
    const emailOk = this.validateEmail();
    if (!phoneOk || !emailOk)
      return;
    this.loading.set(true);
    try {
      await this.auth.requestPasswordRecovery(this.phoneNumber, this.recoveryEmail);
      this.submitted.set(true);
    } catch {
      this.submitted.set(true);
    } finally {
      this.loading.set(false);
    }
  }
  static \u0275fac = function PasswordRecoveryComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PasswordRecoveryComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PasswordRecoveryComponent, selectors: [["app-password-recovery"]], decls: 57, vars: 3, consts: [[1, "auth-container"], [1, "auth-inner"], [1, "auth-brand"], [1, "brand-blob", "brand-blob--1"], [1, "brand-blob", "brand-blob--2"], [1, "brand-top"], [1, "brand-mark"], [1, "brand-names"], [1, "brand-name"], [1, "brand-tag"], [1, "brand-quote"], [1, "brand-features"], [1, "feature-icon"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "3", "stroke-linecap", "round", "stroke-linejoin", "round"], ["points", "20 6 9 17 4 12"], ["x", "2", "y", "4", "width", "20", "height", "16", "rx", "2"], ["d", "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"], ["x", "3", "y", "11", "width", "18", "height", "11", "rx", "2"], ["d", "M7 11V7a5 5 0 0 1 10 0v4"], [1, "brand-footer"], ["width", "15", "height", "15", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], [1, "auth-form-panel"], [1, "auth-card"], [1, "card-topline"], [1, "auth-header"], [1, "auth-eyebrow"], [1, "pulse-dot"], [1, "auth-title"], ["novalidate", "", 3, "ngSubmit", 4, "ngIf"], ["class", "success", 4, "ngIf"], ["class", "error", 4, "ngIf"], [1, "auth-links"], [1, "auth-link"], ["routerLink", "/login"], ["novalidate", "", 3, "ngSubmit"], [1, "form-group"], ["for", "recovery-phone"], [1, "input-wrapper"], [1, "input-icon"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.13a2 2 0 0 1 1.99-2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"], ["id", "recovery-phone", "type", "text", "inputmode", "numeric", "maxlength", "10", "autocomplete", "tel", "name", "phoneNumber", "placeholder", "Ej. 5512345678", "aria-describedby", "recovery-phone-error", 3, "ngModelChange", "input", "blur", "ngModel"], ["class", "phone-counter", 4, "ngIf"], ["class", "valid-check", "aria-hidden", "true", 4, "ngIf"], ["class", "field-error", "id", "recovery-phone-error", 4, "ngIf"], ["for", "recovery-email"], ["id", "recovery-email", "type", "email", "name", "recoveryEmail", "autocomplete", "email", "placeholder", "nombre@dominio.com", "aria-describedby", "recovery-email-error", 3, "ngModelChange", "input", "blur", "ngModel"], ["class", "field-error", "id", "recovery-email-error", 4, "ngIf"], [1, "form-action"], ["type", "submit", 1, "btn-primary", 3, "disabled"], ["class", "spinner", "aria-hidden", "true", 4, "ngIf"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round", 4, "ngIf"], [1, "phone-counter"], ["aria-hidden", "true", 1, "valid-check"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "3", "stroke-linecap", "round", "stroke-linejoin", "round"], ["id", "recovery-phone-error", 1, "field-error"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"], ["x1", "12", "y1", "9", "x2", "12", "y2", "13"], ["x1", "12", "y1", "17", "x2", "12.01", "y2", "17"], ["id", "recovery-email-error", 1, "field-error"], ["aria-hidden", "true", 1, "spinner"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["x1", "5", "y1", "12", "x2", "19", "y2", "12"], ["points", "12 5 19 12 12 19"], [1, "success"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], [1, "error"], ["cx", "12", "cy", "12", "r", "10"], ["x1", "12", "y1", "8", "x2", "12", "y2", "12"], ["x1", "12", "y1", "16", "x2", "12.01", "y2", "16"]], template: function PasswordRecoveryComponent_Template(rf, ctx) {
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
      \u0275\u0275text(12, "Recuperaci\xF3n de contrase\xF1a");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(13, "div", 10)(14, "p");
      \u0275\u0275text(15, '"Recupera tu acceso en minutos"');
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "ul", 11)(17, "li")(18, "span", 12);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(19, "svg", 13);
      \u0275\u0275element(20, "polyline", 14);
      \u0275\u0275elementEnd()();
      \u0275\u0275text(21, " Verifica tu identidad con tu n\xFAmero de celular. ");
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(22, "li")(23, "span", 12);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(24, "svg", 13);
      \u0275\u0275element(25, "rect", 15)(26, "path", 16);
      \u0275\u0275elementEnd()();
      \u0275\u0275text(27, " Recibe el enlace en tu correo personal. ");
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(28, "li")(29, "span", 12);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(30, "svg", 13);
      \u0275\u0275element(31, "rect", 17)(32, "path", 18);
      \u0275\u0275elementEnd()();
      \u0275\u0275text(33, " Restablece tu acceso de forma segura. ");
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(34, "div", 19);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(35, "svg", 20);
      \u0275\u0275element(36, "rect", 17)(37, "path", 18);
      \u0275\u0275elementEnd();
      \u0275\u0275text(38, " Datos protegidos y seguros ");
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(39, "section", 21)(40, "div", 22);
      \u0275\u0275element(41, "span", 23);
      \u0275\u0275elementStart(42, "div", 24)(43, "span", 25);
      \u0275\u0275element(44, "span", 26);
      \u0275\u0275text(45, "Recuperaci\xF3n de acceso");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "h2", 27);
      \u0275\u0275text(47, "Recuperar Contrase\xF1a");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "p");
      \u0275\u0275text(49, "Ingresa tu n\xFAmero y un correo al que tengas acceso.");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(50, PasswordRecoveryComponent_form_50_Template, 29, 21, "form", 28)(51, PasswordRecoveryComponent_p_51_Template, 5, 0, "p", 29)(52, PasswordRecoveryComponent_p_52_Template, 7, 1, "p", 30);
      \u0275\u0275elementStart(53, "div", 31)(54, "p", 32)(55, "a", 33);
      \u0275\u0275text(56, "Volver al inicio de sesi\xF3n");
      \u0275\u0275elementEnd()()()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(50);
      \u0275\u0275property("ngIf", !ctx.submitted());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.submitted());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.errorMessage());
    }
  }, dependencies: [CommonModule, NgIf, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, MaxLengthValidator, NgModel, NgForm, RouterModule, RouterLink], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PasswordRecoveryComponent, [{
    type: Component,
    args: [{ selector: "app-password-recovery", standalone: true, imports: [CommonModule, FormsModule, RouterModule], template: `<div class="auth-container">\r
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
                    <em class="brand-tag">Recuperaci\xF3n de contrase\xF1a</em>\r
                </div>\r
            </div>\r
\r
            <div class="brand-quote">\r
                <p>"Recupera tu acceso en minutos"</p>\r
            </div>\r
\r
            <ul class="brand-features">\r
                <li>\r
                    <span class="feature-icon">\r
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>\r
                    </span>\r
                    Verifica tu identidad con tu n\xFAmero de celular.\r
                </li>\r
                <li>\r
                    <span class="feature-icon">\r
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>\r
                    </span>\r
                    Recibe el enlace en tu correo personal.\r
                </li>\r
                <li>\r
                    <span class="feature-icon">\r
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>\r
                    </span>\r
                    Restablece tu acceso de forma segura.\r
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
                    <span class="auth-eyebrow"><span class="pulse-dot"></span>Recuperaci\xF3n de acceso</span>\r
                    <h2 class="auth-title">Recuperar Contrase\xF1a</h2>\r
                    <p>Ingresa tu n\xFAmero y un correo al que tengas acceso.</p>\r
                </div>\r
\r
                <form *ngIf="!submitted()" (ngSubmit)="onSubmit()" novalidate>\r
                    <div class="form-group">\r
                        <label for="recovery-phone">N\xFAmero de celular</label>\r
                        <div class="input-wrapper" [class.is-invalid]="!!phoneError" [class.is-valid]="!phoneError && phoneNumber.length === 10">\r
                            <span class="input-icon">\r
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.13a2 2 0 0 1 1.99-2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>\r
                            </span>\r
                            <input id="recovery-phone" type="text" inputmode="numeric" maxlength="10" autocomplete="tel"\r
                                [(ngModel)]="phoneNumber" name="phoneNumber" placeholder="Ej. 5512345678"\r
                                (input)="onPhoneInput($event)" (blur)="onPhoneBlur()"\r
                                [attr.aria-invalid]="phoneError ? true : null" aria-describedby="recovery-phone-error" />\r
                            <span class="phone-counter" *ngIf="phoneNumber.length > 0 && phoneNumber.length < 10">{{ phoneNumber.length }}/10</span>\r
                            <span class="valid-check" *ngIf="phoneNumber.length === 10" aria-hidden="true">\r
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>\r
                            </span>\r
                        </div>\r
                        <p class="field-error" id="recovery-phone-error" *ngIf="phoneError">\r
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>\r
                            {{ phoneError }}\r
                        </p>\r
                    </div>\r
\r
                    <div class="form-group">\r
                        <label for="recovery-email">Correo de recuperaci\xF3n</label>\r
                        <div class="input-wrapper" [class.is-invalid]="!!emailError" [class.is-valid]="!emailError && emailIsValid">\r
                            <span class="input-icon">\r
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>\r
                            </span>\r
                            <input id="recovery-email" type="email" [(ngModel)]="recoveryEmail" name="recoveryEmail"\r
                                autocomplete="email" placeholder="nombre@dominio.com"\r
                                (input)="onEmailInput()" (blur)="onEmailBlur()"\r
                                [attr.aria-invalid]="emailError ? true : null" aria-describedby="recovery-email-error" />\r
                            <span class="valid-check" *ngIf="!emailError && emailIsValid" aria-hidden="true">\r
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>\r
                            </span>\r
                        </div>\r
                        <p class="field-error" id="recovery-email-error" *ngIf="emailError">\r
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>\r
                            {{ emailError }}\r
                        </p>\r
                    </div>\r
\r
                    <div class="form-action">\r
                        <button type="submit" class="btn-primary" [disabled]="loading()">\r
                            <span class="spinner" *ngIf="loading()" aria-hidden="true"></span>\r
                            <span>{{ loading() ? 'Enviando...' : 'Enviar enlace' }}</span>\r
                            <svg *ngIf="!loading()" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>\r
                        </button>\r
                    </div>\r
                </form>\r
\r
                <p *ngIf="submitted()" class="success">\r
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>\r
                    <span>Si los datos son v\xE1lidos, recibir\xE1s un enlace para cambiar tu contrase\xF1a. Revisa tu correo.</span>\r
                </p>\r
                <p *ngIf="errorMessage()" class="error">\r
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>\r
                    <span>{{ errorMessage() }}</span>\r
                </p>\r
\r
                <div class="auth-links">\r
                    <p class="auth-link">\r
                        <a routerLink="/login">Volver al inicio de sesi\xF3n</a>\r
                    </p>\r
                </div>\r
            </div>\r
        </section>\r
    </div>\r
</div>\r
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PasswordRecoveryComponent, { className: "PasswordRecoveryComponent", filePath: "src/app/components/auth/password-recovery/password-recovery.ts", lineNumber: 13 });
})();
export {
  PasswordRecoveryComponent
};
//# debugId=ccb7c9e5-452c-5eac-844a-59d0af902b06
//# sourceMappingURL=chunk-I5UZUSJQ.js.map
