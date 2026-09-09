import {
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  NgSelectOption,
  RequiredValidator,
  SelectControlValueAccessor,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
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
  ChangeDetectorRef,
  CommonModule,
  Component,
  NgForOf,
  NgIf,
  ViewChild,
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
  ɵɵloadQuery,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-6KRTW2LJ.js";
import "./chunk-FDMHZOCR.js";

// src/app/components/auth/register/register.ts
var _c0 = ["mapContainer"];
function RegisterComponent_span_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 87);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r1.phoneNumber.length, "/10");
  }
}
function RegisterComponent_span_66_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 88);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 89);
    \u0275\u0275element(2, "polyline", 15);
    \u0275\u0275elementEnd()();
  }
}
function RegisterComponent_p_67_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 90);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 91);
    \u0275\u0275element(2, "path", 92)(3, "line", 93)(4, "line", 94);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r1.phoneError, " ");
  }
}
function RegisterComponent__svg_svg_87_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 40);
    \u0275\u0275element(1, "path", 95)(2, "circle", 96);
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent__svg_svg_88_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 40);
    \u0275\u0275element(1, "path", 97)(2, "line", 98);
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_div_89_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 99)(1, "div", 100);
    \u0275\u0275element(2, "span", 101)(3, "span", 101)(4, "span", 101);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 102);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("level-1", ctx_r1.passwordStrengthLevel === 1)("level-2", ctx_r1.passwordStrengthLevel === 2)("level-3", ctx_r1.passwordStrengthLevel === 3);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.passwordStrengthLevel >= 1);
    \u0275\u0275advance();
    \u0275\u0275classProp("active", ctx_r1.passwordStrengthLevel >= 2);
    \u0275\u0275advance();
    \u0275\u0275classProp("active", ctx_r1.passwordStrengthLevel >= 3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.passwordStrengthLabel);
  }
}
function RegisterComponent_ul_90_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 103)(1, "li");
    \u0275\u0275text(2, "M\xEDnimo 6 caracteres");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "li");
    \u0275\u0275text(4, "8+ caracteres (recomendado)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "li");
    \u0275\u0275text(6, "Letras y n\xFAmeros (recomendado)");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classProp("met", ctx_r1.password.length >= 6);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("met", ctx_r1.password.length >= 8);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("met", ctx_r1.hasLetterAndNumber);
  }
}
function RegisterComponent_p_91_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 104);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 91);
    \u0275\u0275element(2, "path", 92)(3, "line", 93)(4, "line", 94);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r1.passwordError, " ");
  }
}
function RegisterComponent_option_110_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 105);
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
function RegisterComponent_input_116_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 106);
    \u0275\u0275twoWayListener("ngModelChange", function RegisterComponent_input_116_Template_input_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.otherBrand, $event) || (ctx_r1.otherBrand = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.otherBrand);
    \u0275\u0275control();
  }
}
function RegisterComponent_div_146_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 107)(1, "span", 108);
    \u0275\u0275text(2, "\u{1F4CD} Direcci\xF3n:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 109);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.addressText || "Cargando direcci\xF3n...");
  }
}
function RegisterComponent_span_150_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 110);
  }
}
function RegisterComponent__svg_svg_153_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 75);
    \u0275\u0275element(1, "line", 111)(2, "polyline", 112);
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_p_158_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 113);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 67);
    \u0275\u0275element(2, "circle", 114)(3, "line", 115)(4, "line", 116);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.errorMessage);
  }
}
var RegisterComponent = class _RegisterComponent {
  auth = inject(AuthService);
  router = inject(Router);
  cdr = inject(ChangeDetectorRef);
  mapContainer;
  phoneNumber = "";
  fullName = "";
  password = "";
  agencyBrand = "";
  otherBrand = "";
  manualAddress = "";
  errorMessage = "";
  selectedCoords = null;
  addressText = "";
  isSearching = signal(
    false,
    ...ngDevMode ? [{ debugName: "isSearching" }] : (
      /* istanbul ignore next */
      []
    )
  );
  // Errores de validación por campo
  phoneError = "";
  passwordError = "";
  // Estado de UI
  isLoading = false;
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
  /** Nivel de fortaleza: 0 vacía · 1 débil · 2 media · 3 fuerte */
  get passwordStrengthLevel() {
    const p = this.password;
    if (!p)
      return 0;
    let score = 0;
    if (p.length >= 6)
      score++;
    if (p.length >= 8)
      score++;
    if (/[A-Za-z]/.test(p) && /\d/.test(p))
      score++;
    if (/[^A-Za-z0-9]/.test(p))
      score++;
    if (score <= 1)
      return 1;
    if (score === 2)
      return 2;
    return 3;
  }
  get passwordStrengthLabel() {
    return ["Sin definir", "D\xE9bil", "Media", "Fuerte"][this.passwordStrengthLevel];
  }
  get hasLetterAndNumber() {
    return /[A-Za-z]/.test(this.password) && /\d/.test(this.password);
  }
  map;
  marker;
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
  async ngAfterViewInit() {
    await this.initMap();
  }
  async initMap() {
    const L = await import("./chunk-T6GJ6UKQ.js");
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "/leaflet/marker-icon-2x.png",
      iconUrl: "/leaflet/marker-icon.png",
      shadowUrl: "/leaflet/marker-shadow.png"
    });
    const queretaroCoords = [20.5921, -100.3947];
    this.map = L.map(this.mapContainer.nativeElement).setView(queretaroCoords, 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(this.map);
    this.marker = L.marker(queretaroCoords, { draggable: true }).addTo(this.map);
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
      if (data && data.display_name) {
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
      this.errorMessage = "Escribe una direcci\xF3n para buscar";
      return;
    }
    this.isSearching.set(true);
    this.errorMessage = "";
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1&addressdetails=1`);
      const data = await response.json();
      if (data && data.length > 0) {
        const result = data[0];
        const lat = parseFloat(result.lat);
        const lng = parseFloat(result.lon);
        this.map.setView([lat, lng], 16);
        this.marker.setLatLng([lat, lng]);
        this.selectedCoords = { lat, lng };
        this.addressText = result.display_name || `${lat}, ${lng}`;
        this.manualAddress = this.addressText;
        this.cdr.detectChanges();
      } else {
        this.errorMessage = "No se encontr\xF3 la direcci\xF3n. Intenta con otra b\xFAsqueda.";
      }
    } catch {
      this.errorMessage = "Error al buscar la direcci\xF3n. Intenta de nuevo.";
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
  async onRegister() {
    this.errorMessage = "";
    const phoneOk = this.validatePhone();
    const passwordOk = this.validatePassword();
    if (!phoneOk || !passwordOk)
      return;
    if (!this.fullName.trim()) {
      this.errorMessage = "El nombre completo es obligatorio";
      return;
    }
    if (!this.agencyBrand) {
      this.errorMessage = "Selecciona la marca de tu agencia";
      return;
    }
    let finalLocation = "";
    if (this.selectedCoords) {
      finalLocation = this.addressText || `${this.selectedCoords.lat}, ${this.selectedCoords.lng}`;
    } else if (this.manualAddress.trim()) {
      finalLocation = this.manualAddress.trim();
    } else {
      this.errorMessage = 'Selecciona una ubicaci\xF3n en el mapa o escribe una direcci\xF3n y presiona "Buscar"';
      return;
    }
    const finalBrand = this.agencyBrand === "Otro" ? this.otherBrand : this.agencyBrand;
    if (!finalBrand) {
      this.errorMessage = "Debes escribir el nombre de la marca";
      return;
    }
    const email = `vendedor_${this.phoneNumber}@golease.com`;
    this.isLoading = true;
    try {
      const { error: authError } = await this.auth.signUp(email, this.password, this.fullName);
      if (authError) {
        this.errorMessage = authError.message || "Error al registrarse";
        return;
      }
      const user = this.auth.currentUser();
      if (!user) {
        this.errorMessage = "No se pudo obtener el usuario despu\xE9s del registro";
        return;
      }
      const profileData = {
        // profiles.email es el "email espejo" del email de autenticación
        // (auth.users.email). El login lo usa como email de la cuenta.
        email,
        seller_number: this.phoneNumber,
        full_name: this.fullName.trim(),
        agency_brand: finalBrand,
        agency_location: finalLocation
      };
      if (this.selectedCoords) {
        profileData.latitude = this.selectedCoords.lat;
        profileData.longitude = this.selectedCoords.lng;
      }
      const { error: profileError } = await this.auth.updateProfile(user.id, profileData);
      if (profileError) {
        this.errorMessage = `Error al guardar datos: ${profileError.message || "desconocido"}`;
        return;
      }
      await this.router.navigate(["/"]);
    } catch (error) {
      this.errorMessage = error.message || "Error inesperado. Intenta de nuevo.";
    } finally {
      this.isLoading = false;
    }
  }
  static \u0275fac = function RegisterComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RegisterComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RegisterComponent, selectors: [["app-register"]], viewQuery: function RegisterComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.mapContainer = _t.first);
    }
  }, decls: 159, vars: 35, consts: [["mapContainer", ""], [1, "auth-container"], [1, "auth-inner", "register-inner"], [1, "auth-brand"], [1, "brand-blob", "brand-blob--1"], [1, "brand-blob", "brand-blob--2"], [1, "brand-top"], [1, "brand-mark"], [1, "brand-names"], [1, "brand-name"], [1, "brand-tag"], [1, "brand-quote"], [1, "brand-features"], [1, "feature-icon"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "3", "stroke-linecap", "round", "stroke-linejoin", "round"], ["points", "20 6 9 17 4 12"], ["d", "M3 21h18M5 21V7l7-4 7 4v14"], ["d", "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"], ["cx", "12", "cy", "10", "r", "3"], [1, "brand-footer"], ["width", "15", "height", "15", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["x", "3", "y", "11", "width", "18", "height", "11", "rx", "2"], ["d", "M7 11V7a5 5 0 0 1 10 0v4"], [1, "auth-form-panel"], [1, "auth-card", "register-card"], [1, "card-topline"], [1, "auth-header"], [1, "auth-eyebrow"], [1, "pulse-dot"], [1, "auth-title"], [3, "ngSubmit"], [1, "auth-section"], [1, "section-head"], [1, "section-badge"], [1, "section-name"], [1, "section-line"], [1, "form-group"], ["for", "reg-phone"], [1, "input-wrapper"], [1, "input-icon"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.13a2 2 0 0 1 1.99-2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"], ["id", "reg-phone", "type", "text", "inputmode", "numeric", "maxlength", "10", "autocomplete", "tel", "name", "phoneNumber", "placeholder", "Ej. 5512345678", "aria-describedby", "reg-phone-error", 3, "ngModelChange", "input", "blur", "ngModel"], ["class", "phone-counter", 4, "ngIf"], ["class", "valid-check", "aria-hidden", "true", 4, "ngIf"], ["class", "field-error", "id", "reg-phone-error", 4, "ngIf"], ["for", "reg-name"], ["cx", "12", "cy", "8", "r", "4"], ["d", "M4 21v-1a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v1"], ["id", "reg-name", "type", "text", "name", "fullName", "required", "", "placeholder", "Juan P\xE9rez", 3, "ngModelChange", "ngModel"], ["for", "reg-password"], [1, "input-wrapper", "has-toggle"], ["id", "reg-password", "autocomplete", "new-password", "name", "password", "placeholder", "M\xEDnimo 6 caracteres", "aria-describedby", "reg-password-error", 3, "ngModelChange", "input", "blur", "type", "ngModel"], ["type", "button", 1, "password-toggle", 3, "click"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round", 4, "ngIf"], ["class", "strength-meter", 3, "level-1", "level-2", "level-3", 4, "ngIf"], ["class", "password-checklist", 4, "ngIf"], ["class", "field-error", "id", "reg-password-error", 4, "ngIf"], ["for", "reg-brand"], [1, "input-wrapper", "select-wrapper"], ["d", "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"], ["x1", "7", "y1", "7", "x2", "7.01", "y2", "7"], ["id", "reg-brand", "name", "agencyBrand", "required", "", 3, "ngModelChange", "ngModel"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], ["value", "Otro"], [1, "select-arrow"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["points", "6 9 12 15 18 9"], ["class", "brand-other", "type", "text", "placeholder", "Escribe la marca", "name", "otherBrand", 3, "ngModel", "ngModelChange", 4, "ngIf"], ["for", "reg-search"], [1, "search-group"], [1, "input-wrapper", "search-wrapper"], ["id", "reg-search", "type", "text", "name", "manualAddress", "placeholder", "Ej. Toyota Quer\xE9taro", 1, "search-input", 3, "ngModelChange", "keydown", "ngModel"], ["type", "button", 1, "btn-search", 3, "click", "disabled"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["cx", "11", "cy", "11", "r", "8"], ["x1", "21", "y1", "21", "x2", "16.65", "y2", "16.65"], [1, "map-hint"], [1, "map-container"], ["class", "coords-info", 4, "ngIf"], ["type", "submit", 1, "btn-primary", 3, "disabled"], ["class", "spinner", "aria-hidden", "true", 4, "ngIf"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round", 4, "ngIf"], [1, "auth-link", "register-link"], ["routerLink", "/login"], ["class", "error", 4, "ngIf"], [1, "phone-counter"], ["aria-hidden", "true", 1, "valid-check"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "3", "stroke-linecap", "round", "stroke-linejoin", "round"], ["id", "reg-phone-error", 1, "field-error"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"], ["x1", "12", "y1", "9", "x2", "12", "y2", "13"], ["x1", "12", "y1", "17", "x2", "12.01", "y2", "17"], ["d", "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"], ["cx", "12", "cy", "12", "r", "3"], ["d", "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"], ["x1", "1", "y1", "1", "x2", "23", "y2", "23"], [1, "strength-meter"], ["aria-hidden", "true", 1, "strength-bars"], [1, "strength-bar"], [1, "strength-label"], [1, "password-checklist"], ["id", "reg-password-error", 1, "field-error"], [3, "value"], ["type", "text", "placeholder", "Escribe la marca", "name", "otherBrand", 1, "brand-other", 3, "ngModelChange", "ngModel"], [1, "coords-info"], [1, "coord-label"], [1, "coord-value"], ["aria-hidden", "true", 1, "spinner"], ["x1", "5", "y1", "12", "x2", "19", "y2", "12"], ["points", "12 5 19 12 12 19"], [1, "error"], ["cx", "12", "cy", "12", "r", "10"], ["x1", "12", "y1", "8", "x2", "12", "y2", "12"], ["x1", "12", "y1", "16", "x2", "12.01", "y2", "16"]], template: function RegisterComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "aside", 3);
      \u0275\u0275element(3, "div", 4)(4, "div", 5);
      \u0275\u0275elementStart(5, "div", 6)(6, "span", 7);
      \u0275\u0275text(7, "G");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "div", 8)(9, "strong", 9);
      \u0275\u0275text(10, "GO LEASE MX");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "em", 10);
      \u0275\u0275text(12, "Registro de vendedores");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(13, "div", 11)(14, "p");
      \u0275\u0275text(15, '"Haz de tus impuestos, la renta de tu auto"');
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "ul", 12)(17, "li")(18, "span", 13);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(19, "svg", 14);
      \u0275\u0275element(20, "polyline", 15);
      \u0275\u0275elementEnd()();
      \u0275\u0275text(21, " Crea tu cuenta en minutos ");
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(22, "li")(23, "span", 13);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(24, "svg", 14);
      \u0275\u0275element(25, "path", 16);
      \u0275\u0275elementEnd()();
      \u0275\u0275text(26, " Selecciona la marca de tu agencia ");
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(27, "li")(28, "span", 13);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(29, "svg", 14);
      \u0275\u0275element(30, "path", 17)(31, "circle", 18);
      \u0275\u0275elementEnd()();
      \u0275\u0275text(32, " Marca tu sucursal en el mapa interactivo ");
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(33, "div", 19);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(34, "svg", 20);
      \u0275\u0275element(35, "rect", 21)(36, "path", 22);
      \u0275\u0275elementEnd();
      \u0275\u0275text(37, " Datos protegidos y seguros ");
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(38, "section", 23)(39, "div", 24);
      \u0275\u0275element(40, "span", 25);
      \u0275\u0275elementStart(41, "div", 26)(42, "span", 27);
      \u0275\u0275element(43, "span", 28);
      \u0275\u0275text(44, "Nuevo usuario");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "h2", 29);
      \u0275\u0275text(46, "Registrarse");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(47, "p");
      \u0275\u0275text(48, "Ingresa tus datos para comenzar a cotizar");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(49, "form", 30);
      \u0275\u0275listener("ngSubmit", function RegisterComponent_Template_form_ngSubmit_49_listener() {
        return ctx.onRegister();
      });
      \u0275\u0275elementStart(50, "div", 31)(51, "div", 32)(52, "span", 33);
      \u0275\u0275text(53, "1");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(54, "h3", 34);
      \u0275\u0275text(55, "Cuenta de acceso");
      \u0275\u0275elementEnd();
      \u0275\u0275element(56, "span", 35);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(57, "div", 36)(58, "label", 37);
      \u0275\u0275text(59, "N\xFAmero de celular *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(60, "div", 38)(61, "span", 39);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(62, "svg", 40);
      \u0275\u0275element(63, "path", 41);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(64, "input", 42);
      \u0275\u0275twoWayListener("ngModelChange", function RegisterComponent_Template_input_ngModelChange_64_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.phoneNumber, $event) || (ctx.phoneNumber = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("input", function RegisterComponent_Template_input_input_64_listener($event) {
        return ctx.onPhoneInput($event);
      })("blur", function RegisterComponent_Template_input_blur_64_listener() {
        return ctx.onPhoneBlur();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275template(65, RegisterComponent_span_65_Template, 2, 1, "span", 43)(66, RegisterComponent_span_66_Template, 3, 0, "span", 44);
      \u0275\u0275elementEnd();
      \u0275\u0275template(67, RegisterComponent_p_67_Template, 6, 1, "p", 45);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(68, "div", 36)(69, "label", 46);
      \u0275\u0275text(70, "Nombre Completo *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(71, "div", 38)(72, "span", 39);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(73, "svg", 40);
      \u0275\u0275element(74, "circle", 47)(75, "path", 48);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(76, "input", 49);
      \u0275\u0275twoWayListener("ngModelChange", function RegisterComponent_Template_input_ngModelChange_76_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.fullName, $event) || (ctx.fullName = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(77, "div", 36)(78, "label", 50);
      \u0275\u0275text(79, "Contrase\xF1a *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(80, "div", 51)(81, "span", 39);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(82, "svg", 40);
      \u0275\u0275element(83, "rect", 21)(84, "path", 22);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(85, "input", 52);
      \u0275\u0275twoWayListener("ngModelChange", function RegisterComponent_Template_input_ngModelChange_85_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.password, $event) || (ctx.password = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("input", function RegisterComponent_Template_input_input_85_listener() {
        return ctx.onPasswordInput();
      })("blur", function RegisterComponent_Template_input_blur_85_listener() {
        return ctx.onPasswordBlur();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275elementStart(86, "button", 53);
      \u0275\u0275listener("click", function RegisterComponent_Template_button_click_86_listener() {
        return ctx.togglePasswordVisibility();
      });
      \u0275\u0275template(87, RegisterComponent__svg_svg_87_Template, 3, 0, "svg", 54)(88, RegisterComponent__svg_svg_88_Template, 3, 0, "svg", 54);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(89, RegisterComponent_div_89_Template, 7, 13, "div", 55)(90, RegisterComponent_ul_90_Template, 7, 6, "ul", 56)(91, RegisterComponent_p_91_Template, 6, 1, "p", 57);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(92, "div", 31)(93, "div", 32)(94, "span", 33);
      \u0275\u0275text(95, "2");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(96, "h3", 34);
      \u0275\u0275text(97, "Agencia");
      \u0275\u0275elementEnd();
      \u0275\u0275element(98, "span", 35);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(99, "div", 36)(100, "label", 58);
      \u0275\u0275text(101, "Marca (Agencia) *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(102, "div", 59)(103, "span", 39);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(104, "svg", 40);
      \u0275\u0275element(105, "path", 60)(106, "line", 61);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(107, "select", 62);
      \u0275\u0275twoWayListener("ngModelChange", function RegisterComponent_Template_select_ngModelChange_107_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.agencyBrand, $event) || (ctx.agencyBrand = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementStart(108, "option", 63);
      \u0275\u0275text(109, "Selecciona una marca");
      \u0275\u0275elementEnd();
      \u0275\u0275template(110, RegisterComponent_option_110_Template, 2, 2, "option", 64);
      \u0275\u0275elementStart(111, "option", 65);
      \u0275\u0275text(112, "Otro");
      \u0275\u0275elementEnd()();
      \u0275\u0275controlCreate();
      \u0275\u0275elementStart(113, "span", 66);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(114, "svg", 67);
      \u0275\u0275element(115, "polyline", 68);
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(116, RegisterComponent_input_116_Template, 1, 1, "input", 69);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(117, "div", 31)(118, "div", 32)(119, "span", 33);
      \u0275\u0275text(120, "3");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(121, "h3", 34);
      \u0275\u0275text(122, "Ubicaci\xF3n de la sucursal");
      \u0275\u0275elementEnd();
      \u0275\u0275element(123, "span", 35);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(124, "div", 36)(125, "label", 70);
      \u0275\u0275text(126, "Buscar sucursal en el mapa");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(127, "div", 71)(128, "div", 72)(129, "span", 39);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(130, "svg", 40);
      \u0275\u0275element(131, "path", 17)(132, "circle", 18);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(133, "input", 73);
      \u0275\u0275twoWayListener("ngModelChange", function RegisterComponent_Template_input_ngModelChange_133_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.manualAddress, $event) || (ctx.manualAddress = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("keydown", function RegisterComponent_Template_input_keydown_133_listener($event) {
        return ctx.onSearchKeydown($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(134, "button", 74);
      \u0275\u0275listener("click", function RegisterComponent_Template_button_click_134_listener() {
        return ctx.searchLocation();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(135, "svg", 75);
      \u0275\u0275element(136, "circle", 76)(137, "line", 77);
      \u0275\u0275elementEnd();
      \u0275\u0275text(138);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(139, "p", 78);
      \u0275\u0275text(140, 'Escribe una direcci\xF3n y presiona Enter o haz clic en "Buscar"');
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(141, "div", 36)(142, "label");
      \u0275\u0275text(143, "Ubicaci\xF3n de Sucursal *");
      \u0275\u0275elementEnd();
      \u0275\u0275element(144, "div", 79, 0);
      \u0275\u0275template(146, RegisterComponent_div_146_Template, 5, 1, "div", 80);
      \u0275\u0275elementStart(147, "p", 78);
      \u0275\u0275text(148, "Haz clic en el mapa para marcar la ubicaci\xF3n exacta de tu sucursal");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(149, "button", 81);
      \u0275\u0275template(150, RegisterComponent_span_150_Template, 1, 0, "span", 82);
      \u0275\u0275elementStart(151, "span");
      \u0275\u0275text(152);
      \u0275\u0275elementEnd();
      \u0275\u0275template(153, RegisterComponent__svg_svg_153_Template, 3, 0, "svg", 83);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(154, "p", 84);
      \u0275\u0275text(155, " \xBFYa tienes cuenta? ");
      \u0275\u0275elementStart(156, "a", 85);
      \u0275\u0275text(157, "Inicia sesi\xF3n");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(158, RegisterComponent_p_158_Template, 7, 1, "p", 86);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(60);
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
      \u0275\u0275advance(9);
      \u0275\u0275twoWayProperty("ngModel", ctx.fullName);
      \u0275\u0275control();
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
      \u0275\u0275property("ngIf", ctx.password);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.password);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.passwordError);
      \u0275\u0275advance(16);
      \u0275\u0275twoWayProperty("ngModel", ctx.agencyBrand);
      \u0275\u0275control();
      \u0275\u0275advance(3);
      \u0275\u0275property("ngForOf", ctx.brands);
      \u0275\u0275advance(6);
      \u0275\u0275property("ngIf", ctx.agencyBrand === "Otro");
      \u0275\u0275advance(17);
      \u0275\u0275twoWayProperty("ngModel", ctx.manualAddress);
      \u0275\u0275control();
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.isSearching());
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", ctx.isSearching() ? "Buscando..." : "Buscar", " ");
      \u0275\u0275advance(8);
      \u0275\u0275property("ngIf", ctx.selectedCoords);
      \u0275\u0275advance(3);
      \u0275\u0275property("disabled", ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isLoading);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.isLoading ? "Creando cuenta..." : "Registrarse");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoading);
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", ctx.errorMessage);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MaxLengthValidator, NgModel, NgForm, RouterModule, RouterLink], styles: ['\n.register-inner[_ngcontent-%COMP%] {\n  max-width: 1120px;\n  min-height: 620px;\n}\n.register-card[_ngcontent-%COMP%] {\n  max-width: 520px;\n}\n.auth-section[_ngcontent-%COMP%] {\n  margin: 0 0 1.5rem;\n  padding: 1.35rem 1.25rem 0.6rem;\n  border: 1px solid var(--%NS%input-border);\n  border-radius: 16px;\n  background: var(--%NS%surface-card);\n}\n.section-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n  margin-bottom: 1.15rem;\n}\n.section-badge[_ngcontent-%COMP%] {\n  width: 26px;\n  height: 26px;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background:\n    linear-gradient(\n      135deg,\n      var(--%NS%accent-green-dark),\n      var(--%NS%accent-green));\n  color: #fff;\n  font-weight: 700;\n  font-size: 0.86rem;\n  flex-shrink: 0;\n  box-shadow: 0 6px 14px -6px rgba(32, 176, 56, 0.55);\n}\n.section-name[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  margin: 0;\n  color: var(--%NS%accent-slate);\n  letter-spacing: 0.4px;\n}\n.section-line[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 1px;\n  background:\n    linear-gradient(\n      90deg,\n      var(--%NS%input-border),\n      transparent);\n}\n.select-wrapper[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  appearance: none;\n  cursor: pointer;\n  padding-right: 2.6rem;\n}\n.select-arrow[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0.95rem;\n  top: 50%;\n  transform: translateY(-50%);\n  display: flex;\n  color: var(--%NS%accent-silver);\n  pointer-events: none;\n}\n.select-wrapper[_ngcontent-%COMP%]:focus-within   .select-arrow[_ngcontent-%COMP%] {\n  color: var(--%NS%accent-green);\n}\n.brand-other[_ngcontent-%COMP%], \n.search-input[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 48px;\n  padding: 0.75rem 1rem;\n  border: 1.5px solid var(--%NS%border-color);\n  border-radius: 12px;\n  font-size: 0.98rem;\n  font-family: var(--%NS%font-body);\n  color: var(--%NS%text-main);\n  background: var(--%NS%surface-subtle);\n  box-sizing: border-box;\n}\n.brand-other[_ngcontent-%COMP%] {\n  margin-top: 0.6rem;\n}\n.search-group[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.6rem;\n  align-items: stretch;\n  width: 100%;\n}\n.search-wrapper[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.search-input[_ngcontent-%COMP%] {\n  padding-left: 2.9rem;\n}\n.brand-other[_ngcontent-%COMP%]:focus, \n.search-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--%NS%accent-green);\n  background: var(--%NS%surface-card);\n  box-shadow: 0 0 0 4px rgba(32, 176, 56, 0.12);\n}\n.btn-search[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.45rem;\n  min-height: 48px;\n  padding: 0.75rem 1.1rem;\n  border: 0;\n  border-radius: 12px;\n  background:\n    linear-gradient(\n      135deg,\n      var(--%NS%accent-green-dark),\n      var(--%NS%accent-green));\n  color: #fff;\n  font-weight: 700;\n  font-size: 0.9rem;\n  cursor: pointer;\n  white-space: nowrap;\n  flex-shrink: 0;\n  box-shadow: 0 10px 20px -8px rgba(32, 176, 56, 0.5);\n}\n.btn-search[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n}\n.btn-search[_ngcontent-%COMP%]:disabled {\n  opacity: 0.65;\n  cursor: not-allowed;\n  transform: none;\n}\n.map-hint[_ngcontent-%COMP%] {\n  margin-top: 0.4rem;\n  color: var(--%NS%text-muted);\n  font-size: 0.74rem;\n  font-style: italic;\n}\n.map-container[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 300px;\n  border: 1.5px solid var(--%NS%border-color);\n  border-radius: 14px;\n  overflow: hidden;\n  cursor: crosshair;\n  box-shadow: inset 0 0 0 4px var(--%NS%surface-subtle);\n}\n.coords-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.4rem;\n  margin-top: 0.55rem;\n  padding: 0.65rem 0.85rem;\n  border: 1px solid #bbf7d0;\n  border-radius: 10px;\n  background: var(--%NS%accent-green-light);\n  font-size: 0.85rem;\n}\n.coord-label[_ngcontent-%COMP%] {\n  color: #166534;\n  font-weight: 700;\n  white-space: nowrap;\n}\n.coord-value[_ngcontent-%COMP%] {\n  color: var(--%NS%text-main);\n  word-break: break-all;\n}\n.auth-link.register-link[_ngcontent-%COMP%] {\n  margin-top: 1.5rem;\n  text-align: center;\n}\n.btn-search[_ngcontent-%COMP%]:focus-visible, \n.search-input[_ngcontent-%COMP%]:focus-visible, \n.brand-other[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--%NS%accent-green);\n  outline-offset: 3px;\n}\n@media (max-width: 600px) {\n  .map-container[_ngcontent-%COMP%] {\n    height: 220px;\n  }\n  .search-group[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .btn-search[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .password-checklist[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.auth-section[_ngcontent-%COMP%] {\n  animation: fieldIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;\n}\n.auth-section[_ngcontent-%COMP%]:nth-of-type(1) {\n  animation-delay: 0.05s;\n}\n.auth-section[_ngcontent-%COMP%]:nth-of-type(2) {\n  animation-delay: 0.13s;\n}\n.auth-section[_ngcontent-%COMP%]:nth-of-type(3) {\n  animation-delay: 0.21s;\n}\n.auth-section[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%] {\n  animation: fieldIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;\n  animation-delay: 0.24s;\n}\n.register-card[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]    > .btn-primary[_ngcontent-%COMP%] {\n  animation: fieldIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;\n  animation-delay: 0.3s;\n}\n.strength-meter[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n  margin-top: 0.6rem;\n  animation: fieldIn 0.3s ease both;\n}\n.strength-bars[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.3rem;\n  flex: 1;\n}\n.strength-bar[_ngcontent-%COMP%] {\n  height: 5px;\n  flex: 1;\n  border-radius: 999px;\n  background: var(--%NS%border-color);\n  transition: background 0.3s ease;\n}\n.strength-meter.level-1[_ngcontent-%COMP%]   .strength-bar.active[_ngcontent-%COMP%] {\n  background: var(--%NS%danger-bright);\n}\n.strength-meter.level-2[_ngcontent-%COMP%]   .strength-bar.active[_ngcontent-%COMP%] {\n  background: #f59e0b;\n}\n.strength-meter.level-3[_ngcontent-%COMP%]   .strength-bar.active[_ngcontent-%COMP%] {\n  background: var(--%NS%accent-green);\n}\n.strength-label[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  min-width: 4.2rem;\n  text-align: right;\n}\n.strength-meter.level-1[_ngcontent-%COMP%]   .strength-label[_ngcontent-%COMP%] {\n  color: var(--%NS%danger);\n}\n.strength-meter.level-2[_ngcontent-%COMP%]   .strength-label[_ngcontent-%COMP%] {\n  color: var(--%NS%warning);\n}\n.strength-meter.level-3[_ngcontent-%COMP%]   .strength-label[_ngcontent-%COMP%] {\n  color: #16a34a;\n}\n.password-checklist[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: 0.55rem 0 0;\n  padding: 0;\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.3rem 0.8rem;\n  animation: fieldIn 0.3s ease both;\n}\n.password-checklist[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  font-size: 0.78rem;\n  font-weight: 600;\n  color: var(--%NS%accent-silver);\n  transition: color 0.25s ease;\n}\n.password-checklist[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]::before {\n  content: "\\25cb";\n  font-size: 0.85rem;\n  line-height: 1;\n}\n.password-checklist[_ngcontent-%COMP%]   li.met[_ngcontent-%COMP%] {\n  color: #16a34a;\n}\n.password-checklist[_ngcontent-%COMP%]   li.met[_ngcontent-%COMP%]::before {\n  content: "\\2713";\n  font-weight: 700;\n}\n/*# sourceMappingURL=register.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RegisterComponent, [{
    type: Component,
    args: [{ selector: "app-register", standalone: true, imports: [CommonModule, FormsModule, RouterModule], template: `<div class="auth-container">\r
    <div class="auth-inner register-inner">\r
        <!-- Panel de marca -->\r
        <aside class="auth-brand">\r
            <div class="brand-blob brand-blob--1"></div>\r
            <div class="brand-blob brand-blob--2"></div>\r
\r
            <div class="brand-top">\r
                <span class="brand-mark">G</span>\r
                <div class="brand-names">\r
                    <strong class="brand-name">GO LEASE MX</strong>\r
                    <em class="brand-tag">Registro de vendedores</em>\r
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
                    Crea tu cuenta en minutos\r
                </li>\r
                <li>\r
                    <span class="feature-icon">\r
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M5 21V7l7-4 7 4v14" /></svg>\r
                    </span>\r
                    Selecciona la marca de tu agencia\r
                </li>\r
                <li>\r
                    <span class="feature-icon">\r
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>\r
                    </span>\r
                    Marca tu sucursal en el mapa interactivo\r
                </li>\r
            </ul>\r
\r
            <div class="brand-footer">\r
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>\r
                Datos protegidos y seguros\r
            </div>\r
        </aside>\r
\r
        <!-- Panel del formulario -->\r
        <section class="auth-form-panel">\r
            <div class="auth-card register-card">\r
                <span class="card-topline"></span>\r
\r
                <div class="auth-header">\r
                    <span class="auth-eyebrow"><span class="pulse-dot"></span>Nuevo usuario</span>\r
                    <h2 class="auth-title">Registrarse</h2>\r
                    <p>Ingresa tus datos para comenzar a cotizar</p>\r
                </div>\r
\r
                <form (ngSubmit)="onRegister()">\r
                    <!-- Secci\xF3n 1 \xB7 Cuenta -->\r
                    <div class="auth-section">\r
                        <div class="section-head">\r
                            <span class="section-badge">1</span>\r
                            <h3 class="section-name">Cuenta de acceso</h3>\r
                            <span class="section-line"></span>\r
                        </div>\r
\r
                        <div class="form-group">\r
                            <label for="reg-phone">N\xFAmero de celular *</label>\r
                            <div class="input-wrapper" [class.is-invalid]="!!phoneError" [class.is-valid]="!phoneError && phoneNumber.length === 10">\r
                                <span class="input-icon">\r
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.13a2 2 0 0 1 1.99-2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>\r
                                </span>\r
                                <input id="reg-phone" type="text" inputmode="numeric" maxlength="10" autocomplete="tel"\r
                                    [(ngModel)]="phoneNumber" name="phoneNumber" placeholder="Ej. 5512345678"\r
                                    (input)="onPhoneInput($event)" (blur)="onPhoneBlur()"\r
                                    [attr.aria-invalid]="phoneError ? true : null" aria-describedby="reg-phone-error" />\r
                                <span class="phone-counter" *ngIf="phoneNumber.length > 0 && phoneNumber.length < 10">{{ phoneNumber.length }}/10</span>\r
                                <span class="valid-check" *ngIf="phoneNumber.length === 10" aria-hidden="true">\r
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>\r
                                </span>\r
                            </div>\r
                            <p class="field-error" id="reg-phone-error" *ngIf="phoneError">\r
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>\r
                                {{ phoneError }}\r
                            </p>\r
                        </div>\r
\r
                        <div class="form-group">\r
                            <label for="reg-name">Nombre Completo *</label>\r
                            <div class="input-wrapper">\r
                                <span class="input-icon">\r
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 21v-1a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v1" /></svg>\r
                                </span>\r
                                <input id="reg-name" type="text" [(ngModel)]="fullName" name="fullName" required placeholder="Juan P\xE9rez" />\r
                            </div>\r
                        </div>\r
\r
                        <div class="form-group">\r
                            <label for="reg-password">Contrase\xF1a *</label>\r
                            <div class="input-wrapper has-toggle" [class.is-invalid]="!!passwordError" [class.is-valid]="!passwordError && password.length >= 6">\r
                                <span class="input-icon">\r
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>\r
                                </span>\r
                                <input id="reg-password" [type]="showPassword ? 'text' : 'password'" autocomplete="new-password"\r
                                    [(ngModel)]="password" name="password" placeholder="M\xEDnimo 6 caracteres"\r
                                    (input)="onPasswordInput()" (blur)="onPasswordBlur()"\r
                                    [attr.aria-invalid]="passwordError ? true : null" aria-describedby="reg-password-error" />\r
                                <button type="button" class="password-toggle" (click)="togglePasswordVisibility()"\r
                                    [attr.aria-label]="showPassword ? 'Ocultar contrase\xF1a' : 'Mostrar contrase\xF1a'">\r
                                    <svg *ngIf="!showPassword" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>\r
                                    <svg *ngIf="showPassword" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>\r
                                </button>\r
                            </div>\r
\r
                            <div class="strength-meter" *ngIf="password"\r
                                [class.level-1]="passwordStrengthLevel === 1"\r
                                [class.level-2]="passwordStrengthLevel === 2"\r
                                [class.level-3]="passwordStrengthLevel === 3">\r
                                <div class="strength-bars" aria-hidden="true">\r
                                    <span class="strength-bar" [class.active]="passwordStrengthLevel >= 1"></span>\r
                                    <span class="strength-bar" [class.active]="passwordStrengthLevel >= 2"></span>\r
                                    <span class="strength-bar" [class.active]="passwordStrengthLevel >= 3"></span>\r
                                </div>\r
                                <span class="strength-label">{{ passwordStrengthLabel }}</span>\r
                            </div>\r
\r
                            <ul class="password-checklist" *ngIf="password">\r
                                <li [class.met]="password.length >= 6">M\xEDnimo 6 caracteres</li>\r
                                <li [class.met]="password.length >= 8">8+ caracteres (recomendado)</li>\r
                                <li [class.met]="hasLetterAndNumber">Letras y n\xFAmeros (recomendado)</li>\r
                            </ul>\r
\r
                            <p class="field-error" id="reg-password-error" *ngIf="passwordError">\r
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>\r
                                {{ passwordError }}\r
                            </p>\r
                        </div>\r
                    </div>\r
                    <!-- Secci\xF3n 2 \xB7 Agencia -->\r
                    <div class="auth-section">\r
                        <div class="section-head">\r
                            <span class="section-badge">2</span>\r
                            <h3 class="section-name">Agencia</h3>\r
                            <span class="section-line"></span>\r
                        </div>\r
\r
                        <div class="form-group">\r
                            <label for="reg-brand">Marca (Agencia) *</label>\r
                            <div class="input-wrapper select-wrapper">\r
                                <span class="input-icon">\r
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg>\r
                                </span>\r
                                <select id="reg-brand" [(ngModel)]="agencyBrand" name="agencyBrand" required>\r
                                    <option value="">Selecciona una marca</option>\r
                                    <option *ngFor="let brand of brands" [value]="brand">{{ brand }}</option>\r
                                    <option value="Otro">Otro</option>\r
                                </select>\r
                                <span class="select-arrow">\r
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>\r
                                </span>\r
                            </div>\r
                            <input *ngIf="agencyBrand === 'Otro'" class="brand-other" type="text" [(ngModel)]="otherBrand"\r
                                placeholder="Escribe la marca" name="otherBrand" />\r
                        </div>\r
                    </div>\r
\r
                    <!-- Secci\xF3n 3 \xB7 Ubicaci\xF3n -->\r
                    <div class="auth-section">\r
                        <div class="section-head">\r
                            <span class="section-badge">3</span>\r
                            <h3 class="section-name">Ubicaci\xF3n de la sucursal</h3>\r
                            <span class="section-line"></span>\r
                        </div>\r
\r
                        <div class="form-group">\r
                            <label for="reg-search">Buscar sucursal en el mapa</label>\r
                            <div class="search-group">\r
                                <div class="input-wrapper search-wrapper">\r
                                    <span class="input-icon">\r
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>\r
                                    </span>\r
                                    <input id="reg-search" type="text" [(ngModel)]="manualAddress" name="manualAddress"\r
                                        placeholder="Ej. Toyota Quer\xE9taro" (keydown)="onSearchKeydown($event)" class="search-input" />\r
                                </div>\r
                                <button type="button" class="btn-search" (click)="searchLocation()" [disabled]="isSearching()">\r
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>\r
                                    {{ isSearching() ? 'Buscando...' : 'Buscar' }}\r
                                </button>\r
                            </div>\r
                            <p class="map-hint">Escribe una direcci\xF3n y presiona Enter o haz clic en "Buscar"</p>\r
                        </div>\r
\r
                        <div class="form-group">\r
                            <label>Ubicaci\xF3n de Sucursal *</label>\r
                            <div #mapContainer class="map-container"></div>\r
                            <div *ngIf="selectedCoords" class="coords-info">\r
                                <span class="coord-label">\u{1F4CD} Direcci\xF3n:</span>\r
                                <span class="coord-value">{{ addressText || 'Cargando direcci\xF3n...' }}</span>\r
                            </div>\r
                            <p class="map-hint">Haz clic en el mapa para marcar la ubicaci\xF3n exacta de tu sucursal</p>\r
                        </div>\r
                    </div>\r
\r
                    <button type="submit" class="btn-primary" [disabled]="isLoading">\r
                        <span class="spinner" *ngIf="isLoading" aria-hidden="true"></span>\r
                        <span>{{ isLoading ? 'Creando cuenta...' : 'Registrarse' }}</span>\r
                        <svg *ngIf="!isLoading" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>\r
                    </button>\r
                </form>\r
\r
                <p class="auth-link register-link">\r
                    \xBFYa tienes cuenta? <a routerLink="/login">Inicia sesi\xF3n</a>\r
                </p>\r
                <p *ngIf="errorMessage" class="error">\r
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>\r
                    <span>{{ errorMessage }}</span>\r
                </p>\r
            </div>\r
        </section>\r
    </div>\r
</div>\r
`, styles: ['/* src/app/components/auth/register/register.css */\n.register-inner {\n  max-width: 1120px;\n  min-height: 620px;\n}\n.register-card {\n  max-width: 520px;\n}\n.auth-section {\n  margin: 0 0 1.5rem;\n  padding: 1.35rem 1.25rem 0.6rem;\n  border: 1px solid var(--input-border);\n  border-radius: 16px;\n  background: var(--surface-card);\n}\n.section-head {\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n  margin-bottom: 1.15rem;\n}\n.section-badge {\n  width: 26px;\n  height: 26px;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-green-dark),\n      var(--accent-green));\n  color: #fff;\n  font-weight: 700;\n  font-size: 0.86rem;\n  flex-shrink: 0;\n  box-shadow: 0 6px 14px -6px rgba(32, 176, 56, 0.55);\n}\n.section-name {\n  font-size: 0.95rem;\n  margin: 0;\n  color: var(--accent-slate);\n  letter-spacing: 0.4px;\n}\n.section-line {\n  flex: 1;\n  height: 1px;\n  background:\n    linear-gradient(\n      90deg,\n      var(--input-border),\n      transparent);\n}\n.select-wrapper select {\n  appearance: none;\n  cursor: pointer;\n  padding-right: 2.6rem;\n}\n.select-arrow {\n  position: absolute;\n  right: 0.95rem;\n  top: 50%;\n  transform: translateY(-50%);\n  display: flex;\n  color: var(--accent-silver);\n  pointer-events: none;\n}\n.select-wrapper:focus-within .select-arrow {\n  color: var(--accent-green);\n}\n.brand-other,\n.search-input {\n  width: 100%;\n  min-height: 48px;\n  padding: 0.75rem 1rem;\n  border: 1.5px solid var(--border-color);\n  border-radius: 12px;\n  font-size: 0.98rem;\n  font-family: var(--font-body);\n  color: var(--text-main);\n  background: var(--surface-subtle);\n  box-sizing: border-box;\n}\n.brand-other {\n  margin-top: 0.6rem;\n}\n.search-group {\n  display: flex;\n  gap: 0.6rem;\n  align-items: stretch;\n  width: 100%;\n}\n.search-wrapper {\n  flex: 1;\n  min-width: 0;\n}\n.search-input {\n  padding-left: 2.9rem;\n}\n.brand-other:focus,\n.search-input:focus {\n  outline: none;\n  border-color: var(--accent-green);\n  background: var(--surface-card);\n  box-shadow: 0 0 0 4px rgba(32, 176, 56, 0.12);\n}\n.btn-search {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.45rem;\n  min-height: 48px;\n  padding: 0.75rem 1.1rem;\n  border: 0;\n  border-radius: 12px;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-green-dark),\n      var(--accent-green));\n  color: #fff;\n  font-weight: 700;\n  font-size: 0.9rem;\n  cursor: pointer;\n  white-space: nowrap;\n  flex-shrink: 0;\n  box-shadow: 0 10px 20px -8px rgba(32, 176, 56, 0.5);\n}\n.btn-search:hover {\n  transform: translateY(-2px);\n}\n.btn-search:disabled {\n  opacity: 0.65;\n  cursor: not-allowed;\n  transform: none;\n}\n.map-hint {\n  margin-top: 0.4rem;\n  color: var(--text-muted);\n  font-size: 0.74rem;\n  font-style: italic;\n}\n.map-container {\n  width: 100%;\n  height: 300px;\n  border: 1.5px solid var(--border-color);\n  border-radius: 14px;\n  overflow: hidden;\n  cursor: crosshair;\n  box-shadow: inset 0 0 0 4px var(--surface-subtle);\n}\n.coords-info {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.4rem;\n  margin-top: 0.55rem;\n  padding: 0.65rem 0.85rem;\n  border: 1px solid #bbf7d0;\n  border-radius: 10px;\n  background: var(--accent-green-light);\n  font-size: 0.85rem;\n}\n.coord-label {\n  color: #166534;\n  font-weight: 700;\n  white-space: nowrap;\n}\n.coord-value {\n  color: var(--text-main);\n  word-break: break-all;\n}\n.auth-link.register-link {\n  margin-top: 1.5rem;\n  text-align: center;\n}\n.btn-search:focus-visible,\n.search-input:focus-visible,\n.brand-other:focus-visible {\n  outline: 2px solid var(--accent-green);\n  outline-offset: 3px;\n}\n@media (max-width: 600px) {\n  .map-container {\n    height: 220px;\n  }\n  .search-group {\n    flex-direction: column;\n  }\n  .btn-search {\n    width: 100%;\n  }\n  .password-checklist {\n    grid-template-columns: 1fr;\n  }\n}\n.auth-section {\n  animation: fieldIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;\n}\n.auth-section:nth-of-type(1) {\n  animation-delay: 0.05s;\n}\n.auth-section:nth-of-type(2) {\n  animation-delay: 0.13s;\n}\n.auth-section:nth-of-type(3) {\n  animation-delay: 0.21s;\n}\n.auth-section .form-group {\n  animation: fieldIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;\n  animation-delay: 0.24s;\n}\n.register-card form > .btn-primary {\n  animation: fieldIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;\n  animation-delay: 0.3s;\n}\n.strength-meter {\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n  margin-top: 0.6rem;\n  animation: fieldIn 0.3s ease both;\n}\n.strength-bars {\n  display: flex;\n  gap: 0.3rem;\n  flex: 1;\n}\n.strength-bar {\n  height: 5px;\n  flex: 1;\n  border-radius: 999px;\n  background: var(--border-color);\n  transition: background 0.3s ease;\n}\n.strength-meter.level-1 .strength-bar.active {\n  background: var(--danger-bright);\n}\n.strength-meter.level-2 .strength-bar.active {\n  background: #f59e0b;\n}\n.strength-meter.level-3 .strength-bar.active {\n  background: var(--accent-green);\n}\n.strength-label {\n  font-size: 0.7rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  min-width: 4.2rem;\n  text-align: right;\n}\n.strength-meter.level-1 .strength-label {\n  color: var(--danger);\n}\n.strength-meter.level-2 .strength-label {\n  color: var(--warning);\n}\n.strength-meter.level-3 .strength-label {\n  color: #16a34a;\n}\n.password-checklist {\n  list-style: none;\n  margin: 0.55rem 0 0;\n  padding: 0;\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.3rem 0.8rem;\n  animation: fieldIn 0.3s ease both;\n}\n.password-checklist li {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  font-size: 0.78rem;\n  font-weight: 600;\n  color: var(--accent-silver);\n  transition: color 0.25s ease;\n}\n.password-checklist li::before {\n  content: "\\25cb";\n  font-size: 0.85rem;\n  line-height: 1;\n}\n.password-checklist li.met {\n  color: #16a34a;\n}\n.password-checklist li.met::before {\n  content: "\\2713";\n  font-weight: 700;\n}\n/*# sourceMappingURL=register.css.map */\n'] }]
  }], null, { mapContainer: [{
    type: ViewChild,
    args: ["mapContainer"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RegisterComponent, { className: "RegisterComponent", filePath: "src/app/components/auth/register/register.ts", lineNumber: 15 });
})();
export {
  RegisterComponent
};
//# debugId=5e06d4a7-b015-53ab-9af7-6e7a30b249b8
//# sourceMappingURL=chunk-6CU3PFYP.js.map
