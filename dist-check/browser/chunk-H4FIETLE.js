import {
  DefaultValueAccessor,
  FormsModule,
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
  Router,
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
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
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

// src/app/components/perfil/perfil.component.ts
var _c0 = ["mapContainer"];
function PerfilComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.errorMessage());
  }
}
function PerfilComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.successMessage());
  }
}
function PerfilComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275text(1, "Cargando informaci\xF3n...");
    \u0275\u0275elementEnd();
  }
}
function PerfilComponent_form_19_button_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 28);
    \u0275\u0275listener("click", function PerfilComponent_form_19_button_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.startEditing());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 29);
    \u0275\u0275element(2, "path", 30)(3, "path", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Editar ");
    \u0275\u0275elementEnd();
  }
}
function PerfilComponent_form_19_div_6_option_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 40);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const brand_r5 = ctx.$implicit;
    \u0275\u0275property("value", brand_r5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(brand_r5);
  }
}
function PerfilComponent_form_19_div_6_div_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 33)(1, "label");
    \u0275\u0275text(2, "Especifica otra marca");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 41);
    \u0275\u0275twoWayListener("ngModelChange", function PerfilComponent_form_19_div_6_div_16_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r0.otherBrand, $event) || (ctx_r0.otherBrand = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.otherBrand);
    \u0275\u0275control();
  }
}
function PerfilComponent_form_19_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 32)(1, "div", 33)(2, "label");
    \u0275\u0275text(3, "Nombre completo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 34);
    \u0275\u0275twoWayListener("ngModelChange", function PerfilComponent_form_19_div_6_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.fullName, $event) || (ctx_r0.fullName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 33)(6, "label");
    \u0275\u0275text(7, "N\xFAmero de vendedor");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "input", 35);
    \u0275\u0275twoWayListener("ngModelChange", function PerfilComponent_form_19_div_6_Template_input_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.sellerNumber, $event) || (ctx_r0.sellerNumber = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 33)(10, "label");
    \u0275\u0275text(11, "Marca / Agencia");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "select", 36);
    \u0275\u0275twoWayListener("ngModelChange", function PerfilComponent_form_19_div_6_Template_select_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.agencyBrand, $event) || (ctx_r0.agencyBrand = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(13, "option", 37);
    \u0275\u0275text(14, "Selecciona una marca");
    \u0275\u0275elementEnd();
    \u0275\u0275template(15, PerfilComponent_form_19_div_6_option_15_Template, 2, 2, "option", 38);
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275template(16, PerfilComponent_form_19_div_6_div_16_Template, 4, 1, "div", 39);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.fullName);
    \u0275\u0275control();
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.sellerNumber);
    \u0275\u0275control();
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.agencyBrand);
    \u0275\u0275control();
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r0.brands);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.agencyBrand === "Otro");
  }
}
function PerfilComponent_form_19_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 42)(1, "div", 43)(2, "span", 44);
    \u0275\u0275text(3, "Nombre completo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 45);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 43)(7, "span", 44);
    \u0275\u0275text(8, "N\xFAmero de vendedor");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 45);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 43)(12, "span", 44);
    \u0275\u0275text(13, "Marca / Agencia");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 45);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.fullName || "\u2014");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.sellerNumber || "\u2014");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.displayAgencyBrand);
  }
}
function PerfilComponent_form_19_div_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 46)(1, "input", 47);
    \u0275\u0275twoWayListener("ngModelChange", function PerfilComponent_form_19_div_12_Template_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.manualAddress, $event) || (ctx_r0.manualAddress = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(2, "button", 48);
    \u0275\u0275listener("click", function PerfilComponent_form_19_div_12_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.searchLocation());
    });
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.manualAddress);
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.isSearching());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.isSearching() ? "Buscando..." : "Buscar", " ");
  }
}
function PerfilComponent_form_19_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 49);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 29);
    \u0275\u0275element(2, "path", 50)(3, "circle", 51);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.manualAddress || ctx_r0.addressText || "Sin ubicaci\xF3n registrada");
  }
}
function PerfilComponent_form_19_div_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 52)(1, "button", 53);
    \u0275\u0275listener("click", function PerfilComponent_form_19_div_17_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.cancelEditing());
    });
    \u0275\u0275text(2, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 54);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.saving());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.saving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.saving() ? "Guardando..." : "Guardar cambios", " ");
  }
}
function PerfilComponent_form_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 15);
    \u0275\u0275listener("ngSubmit", function PerfilComponent_form_19_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.saveProfile());
    });
    \u0275\u0275elementStart(1, "div", 16)(2, "div", 17)(3, "span", 18);
    \u0275\u0275text(4, "Datos del usuario");
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, PerfilComponent_form_19_button_5_Template, 5, 0, "button", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, PerfilComponent_form_19_div_6_Template, 17, 5, "div", 20)(7, PerfilComponent_form_19_div_7_Template, 16, 3, "div", 21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 22)(9, "div", 17)(10, "span", 18);
    \u0275\u0275text(11, "Ubicaci\xF3n");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(12, PerfilComponent_form_19_div_12_Template, 4, 3, "div", 23)(13, PerfilComponent_form_19_div_13_Template, 6, 1, "div", 24);
    \u0275\u0275elementStart(14, "div", 25);
    \u0275\u0275element(15, "div", 26, 0);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(17, PerfilComponent_form_19_div_17_Template, 5, 3, "div", 27);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", !ctx_r0.isEditing());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.isEditing());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.isEditing());
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r0.isEditing());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.isEditing());
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r0.isEditing());
  }
}
var PerfilComponent = class _PerfilComponent {
  auth = inject(AuthService);
  router = inject(Router);
  cdr = inject(ChangeDetectorRef);
  mapContainer;
  isAdmin = computed(
    () => this.auth.isAdmin(),
    ...ngDevMode ? [{ debugName: "isAdmin" }] : (
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
  isEditing = signal(
    false,
    ...ngDevMode ? [{ debugName: "isEditing" }] : (
      /* istanbul ignore next */
      []
    )
  );
  saving = signal(
    false,
    ...ngDevMode ? [{ debugName: "saving" }] : (
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
  errorMessage = signal(
    "",
    ...ngDevMode ? [{ debugName: "errorMessage" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isSearching = signal(
    false,
    ...ngDevMode ? [{ debugName: "isSearching" }] : (
      /* istanbul ignore next */
      []
    )
  );
  fullName = "";
  sellerNumber = "";
  agencyBrand = "";
  otherBrand = "";
  manualAddress = "";
  addressText = "";
  selectedCoords = null;
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
    "MAZDA",
    "MASERATI",
    "LEXUS",
    "INFINITI",
    "ACURA",
    "Otro"
  ];
  map;
  marker;
  ngOnInit() {
    this.loadProfile();
  }
  ngOnDestroy() {
    this.destroyMap();
  }
  async ngAfterViewInit() {
    if (this.mapContainer && !this.map) {
      await this.initMap();
    }
  }
  goBack() {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }
    this.router.navigate(["/"]);
  }
  startEditing() {
    this.errorMessage.set("");
    this.successMessage.set("");
    this.isEditing.set(true);
    this.syncMapEditMode();
    this.map?.invalidateSize();
  }
  async cancelEditing() {
    this.successMessage.set("");
    this.isEditing.set(false);
    this.syncMapEditMode();
    await this.loadProfile();
    this.map?.invalidateSize();
  }
  get displayAgencyBrand() {
    return this.agencyBrand === "Otro" ? this.otherBrand.trim() || "Otro" : this.agencyBrand || "\u2014";
  }
  syncMapEditMode() {
    const marker = this.marker;
    if (!marker?.dragging) {
      return;
    }
    if (this.isEditing()) {
      marker.dragging.enable();
    } else {
      marker.dragging.disable();
    }
  }
  destroyMap() {
    if (this.marker) {
      this.marker.off();
      this.marker.remove();
      this.marker = void 0;
    }
    if (this.map) {
      this.map.off();
      this.map.remove();
      this.map = void 0;
    }
  }
  async initMap() {
    if (!this.mapContainer || this.map) {
      return;
    }
    const L = await import("./chunk-T6GJ6UKQ.js");
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "/leaflet/marker-icon-2x.png",
      iconUrl: "/leaflet/marker-icon.png",
      shadowUrl: "/leaflet/marker-shadow.png"
    });
    const queretaroCoords = [20.5921, -100.3947];
    const map = L.map(this.mapContainer.nativeElement).setView(queretaroCoords, 13);
    this.map = map;
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);
    const marker = L.marker(queretaroCoords, { draggable: true }).addTo(map);
    this.marker = marker;
    map.on("click", (e) => {
      if (!this.isEditing()) {
        return;
      }
      const { lat, lng } = e.latlng;
      this.setMarkerAndReverseGeocode(lat, lng);
    });
    marker.on("dragend", () => {
      if (!this.isEditing()) {
        return;
      }
      const pos = marker.getLatLng();
      this.setMarkerAndReverseGeocode(pos.lat, pos.lng);
    });
    this.syncMapEditMode();
    if (this.manualAddress || this.addressText) {
      map.setView(this.selectedCoords ? [this.selectedCoords.lat, this.selectedCoords.lng] : queretaroCoords, 14);
    }
  }
  async setMarkerAndReverseGeocode(lat, lng) {
    if (!this.isEditing() || !this.marker) {
      return;
    }
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
    if (!this.isEditing()) {
      return;
    }
    const query = this.manualAddress.trim();
    if (!query) {
      this.errorMessage.set("Escribe una ubicaci\xF3n para buscar.");
      return;
    }
    this.isSearching.set(true);
    this.errorMessage.set("");
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1&addressdetails=1`);
      const data = await response.json();
      if (data && data.length > 0) {
        const result = data[0];
        const lat = parseFloat(result.lat);
        const lng = parseFloat(result.lon);
        this.map?.setView([lat, lng], 16);
        this.marker?.setLatLng([lat, lng]);
        this.selectedCoords = { lat, lng };
        this.addressText = result.display_name || `${lat}, ${lng}`;
        this.manualAddress = this.addressText;
        this.cdr.detectChanges();
      } else {
        this.errorMessage.set("No se encontr\xF3 la ubicaci\xF3n. Intenta con otra direcci\xF3n.");
      }
    } catch {
      this.errorMessage.set("Ocurri\xF3 un error al buscar la ubicaci\xF3n.");
    } finally {
      this.isSearching.set(false);
    }
  }
  async loadProfile() {
    this.destroyMap();
    this.loading.set(true);
    this.errorMessage.set("");
    const user = this.auth.currentUser();
    if (!user) {
      this.loading.set(false);
      this.errorMessage.set("No hay una sesi\xF3n activa.");
      return;
    }
    const loadedProfile = await this.auth.loadProfile(user.id);
    if (!loadedProfile) {
      this.loading.set(false);
      this.errorMessage.set("No se pudo cargar tu informaci\xF3n de perfil.");
      return;
    }
    const agencyBrandValue = loadedProfile.agency_brand || "";
    const isKnownBrand = agencyBrandValue && this.brands.some((b) => b.toLowerCase() === agencyBrandValue.toLowerCase());
    const finalBrand = agencyBrandValue && !isKnownBrand ? "Otro" : agencyBrandValue;
    this.fullName = loadedProfile.full_name || "";
    this.sellerNumber = loadedProfile.seller_number || "";
    this.agencyBrand = finalBrand;
    this.otherBrand = finalBrand === "Otro" && agencyBrandValue ? agencyBrandValue : "";
    this.manualAddress = loadedProfile.agency_location || "";
    this.addressText = this.manualAddress;
    if (loadedProfile.latitude && loadedProfile.longitude) {
      this.selectedCoords = {
        lat: Number(loadedProfile.latitude),
        lng: Number(loadedProfile.longitude)
      };
    }
    if (this.map && this.selectedCoords && this.marker) {
      this.map.setView([this.selectedCoords.lat, this.selectedCoords.lng], 14);
      this.marker.setLatLng([this.selectedCoords.lat, this.selectedCoords.lng]);
    }
    this.loading.set(false);
    this.cdr.detectChanges();
    if (!this.map) {
      await this.initMap();
    }
    this.map?.invalidateSize();
  }
  async saveProfile() {
    const user = this.auth.currentUser();
    if (!user) {
      this.errorMessage.set("No hay una sesi\xF3n activa.");
      return;
    }
    if (!this.fullName.trim()) {
      this.errorMessage.set("El nombre completo es obligatorio.");
      return;
    }
    if (!this.sellerNumber.trim()) {
      this.errorMessage.set("El n\xFAmero de vendedor es obligatorio.");
      return;
    }
    const brandToSave = this.agencyBrand === "Otro" ? (this.otherBrand || "").trim() : this.agencyBrand.trim();
    if (!brandToSave) {
      this.errorMessage.set("Debes seleccionar o escribir la marca o agencia.");
      return;
    }
    const locationToSave = this.manualAddress.trim() || this.addressText.trim();
    if (!locationToSave) {
      this.errorMessage.set("Debes seleccionar una ubicaci\xF3n v\xE1lida.");
      return;
    }
    this.saving.set(true);
    this.errorMessage.set("");
    this.successMessage.set("");
    try {
      const payload = {
        full_name: this.fullName.trim(),
        seller_number: this.sellerNumber.trim(),
        agency_brand: brandToSave,
        agency_location: locationToSave
      };
      if (this.selectedCoords) {
        payload.latitude = this.selectedCoords.lat;
        payload.longitude = this.selectedCoords.lng;
      }
      const { error } = await this.auth.updateProfile(user.id, payload);
      if (error) {
        this.errorMessage.set(error.message || "No se pudo guardar tu informaci\xF3n.");
        return;
      }
      this.successMessage.set("Tu informaci\xF3n se actualiz\xF3 correctamente.");
      this.isEditing.set(false);
      this.syncMapEditMode();
      await this.loadProfile();
    } finally {
      this.saving.set(false);
    }
  }
  static \u0275fac = function PerfilComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PerfilComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PerfilComponent, selectors: [["app-perfil"]], viewQuery: function PerfilComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.mapContainer = _t.first);
    }
  }, decls: 20, vars: 7, consts: [["mapContainer", ""], [1, "profile-shell"], [1, "profile-hero"], [1, "hero-user"], [1, "profile-avatar"], [1, "hero-copy"], [1, "eyebrow"], ["type", "button", 1, "btn-back", 3, "click"], ["class", "alert error", 4, "ngIf"], ["class", "alert success", 4, "ngIf"], ["class", "profile-loading", 4, "ngIf"], ["class", "profile-content", 3, "ngSubmit", 4, "ngIf"], [1, "alert", "error"], [1, "alert", "success"], [1, "profile-loading"], [1, "profile-content", 3, "ngSubmit"], [1, "profile-card", "form-card"], [1, "section-header"], [1, "section-title"], ["type", "button", "class", "btn-edit-profile", 3, "click", 4, "ngIf"], ["class", "field-grid", 4, "ngIf"], ["class", "detail-grid", 4, "ngIf"], [1, "profile-card", "map-card"], ["class", "search-row", 4, "ngIf"], ["class", "location-readonly", 4, "ngIf"], [1, "map-box"], [1, "map-container"], ["class", "profile-actions", 4, "ngIf"], ["type", "button", 1, "btn-edit-profile", 3, "click"], ["viewBox", "0 0 24 24", "aria-hidden", "true"], ["d", "M12 20h9"], ["d", "M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"], [1, "field-grid"], [1, "form-field"], ["type", "text", "name", "fullName", "placeholder", "Ej. Juan P\xE9rez", 3, "ngModelChange", "ngModel"], ["type", "text", "name", "sellerNumber", "placeholder", "Ej. 4421234567", 3, "ngModelChange", "ngModel"], ["name", "agencyBrand", 3, "ngModelChange", "ngModel"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], ["class", "form-field", 4, "ngIf"], [3, "value"], ["type", "text", "name", "otherBrand", "placeholder", "Nombre de la marca", 3, "ngModelChange", "ngModel"], [1, "detail-grid"], [1, "detail-field"], [1, "detail-label"], [1, "detail-value"], [1, "search-row"], ["type", "text", "name", "manualAddress", "placeholder", "Busca tu ubicaci\xF3n o direcci\xF3n", 3, "ngModelChange", "ngModel"], ["type", "button", 1, "btn-search", 3, "click", "disabled"], [1, "location-readonly"], ["d", "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z"], ["cx", "12", "cy", "10", "r", "3"], [1, "profile-actions"], ["type", "button", 1, "btn-secondary", 3, "click", "disabled"], ["type", "submit", 1, "btn-primary", 3, "disabled"]], template: function PerfilComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 1)(1, "div", 2)(2, "div", 3)(3, "div", 4);
      \u0275\u0275text(4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div", 5)(6, "span", 6);
      \u0275\u0275text(7, "Mi perfil");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "h2");
      \u0275\u0275text(9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "p");
      \u0275\u0275text(11);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(12, "button", 7);
      \u0275\u0275listener("click", function PerfilComponent_Template_button_click_12_listener() {
        return ctx.goBack();
      });
      \u0275\u0275elementStart(13, "span");
      \u0275\u0275text(14, "\u2190");
      \u0275\u0275elementEnd();
      \u0275\u0275text(15, " Volver ");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(16, PerfilComponent_div_16_Template, 2, 1, "div", 8)(17, PerfilComponent_div_17_Template, 2, 1, "div", 9)(18, PerfilComponent_div_18_Template, 2, 0, "div", 10)(19, PerfilComponent_form_19_Template, 18, 6, "form", 11);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate((ctx.fullName || "U").charAt(0).toUpperCase());
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.fullName || "Usuario");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.isAdmin() ? "Administrador" : "Vendedor");
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", ctx.errorMessage());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.successMessage());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loading());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading());
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, NgModel, NgForm, RouterModule], styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n}\n.profile-shell[_ngcontent-%COMP%] {\n  width: min(1100px, 100%);\n  margin: 0 auto;\n  padding: 0.5rem 0 2.5rem;\n}\n.profile-hero[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 1.5rem 1.5rem 1.3rem;\n  margin-bottom: 1.25rem;\n  border-radius: 20px;\n  background:\n    linear-gradient(\n      135deg,\n      #10251f 0%,\n      #153e2e 40%,\n      #1a5d3a 100%);\n  border: 1px solid rgba(139, 226, 140, 0.2);\n  box-shadow: 0 16px 36px rgba(16, 37, 31, 0.18);\n}\n.hero-user[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.profile-avatar[_ngcontent-%COMP%] {\n  width: 68px;\n  height: 68px;\n  border-radius: 18px;\n  background:\n    linear-gradient(\n      135deg,\n      #8be28c,\n      var(--%NS%accent-green));\n  color: var(--%NS%accent-slate);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.8rem;\n  font-weight: 800;\n  box-shadow: 0 12px 24px rgba(32, 176, 56, 0.25);\n}\n.eyebrow[_ngcontent-%COMP%] {\n  display: block;\n  color: #8fe58f;\n  font-size: 0.7rem;\n  font-weight: 800;\n  letter-spacing: 1.3px;\n  text-transform: uppercase;\n}\n.hero-copy[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0.1rem 0 0.2rem;\n  color: var(--%NS%text-on-accent);\n  font-size: clamp(2rem, 2vw, 2.5rem);\n  line-height: 1.05;\n}\n.hero-copy[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #d4e7db;\n  font-size: 0.92rem;\n}\n.btn-back[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  min-height: 46px;\n  padding: 0.8rem 1.1rem;\n  border: 1px solid rgba(139, 226, 140, 0.25);\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.06);\n  color: var(--%NS%surface-hover);\n  font-weight: 700;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.btn-back[_ngcontent-%COMP%]:hover {\n  background: rgba(139, 226, 140, 0.12);\n  border-color: rgba(139, 226, 140, 0.4);\n}\n.profile-content[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 1.25rem;\n}\n.profile-card[_ngcontent-%COMP%] {\n  background: var(--%NS%surface-card);\n  border: 1px solid var(--%NS%border-color);\n  border-radius: 18px;\n  box-shadow: 0 12px 28px var(--%NS%shadow-soft);\n  padding: 1.2rem 1.25rem;\n}\n.section-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  margin-bottom: 1rem;\n  padding-bottom: 0.8rem;\n  border-bottom: 1px solid var(--%NS%border-color);\n}\n.section-title[_ngcontent-%COMP%] {\n  color: var(--%NS%accent-slate);\n  font-size: 0.8rem;\n  font-weight: 800;\n  letter-spacing: 1.2px;\n  text-transform: uppercase;\n}\n.btn-edit-profile[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  flex-shrink: 0;\n  min-height: 38px;\n  padding: 0.5rem 0.95rem;\n  border: 1px solid var(--%NS%border-strong);\n  border-radius: 10px;\n  background: var(--%NS%surface-subtle);\n  color: var(--%NS%text-silver);\n  font-size: 0.85rem;\n  font-weight: 700;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.btn-edit-profile[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 2;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.btn-edit-profile[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%surface-hover);\n  border-color: var(--%NS%accent-green);\n  color: var(--%NS%accent-green);\n}\n.detail-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(220px, 1fr));\n  gap: 1.25rem 1rem;\n}\n.detail-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n}\n.detail-label[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  font-weight: 700;\n  color: var(--%NS%text-silver);\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.detail-value[_ngcontent-%COMP%] {\n  font-size: 1.05rem;\n  font-weight: 600;\n  color: var(--%NS%text-main);\n  padding-bottom: 0.5rem;\n  border-bottom: 1px dashed var(--%NS%border-color);\n}\n.location-readonly[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  padding: 0.85rem 1rem;\n  margin-bottom: 1rem;\n  border: 1px solid var(--%NS%input-border);\n  border-radius: 12px;\n  background: var(--%NS%surface-subtle);\n  color: var(--%NS%text-main);\n  font-size: 0.95rem;\n}\n.location-readonly[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  flex-shrink: 0;\n  fill: none;\n  stroke: var(--%NS%accent-green);\n  stroke-width: 2;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.field-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(220px, 1fr));\n  gap: 1rem;\n}\n.form-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.form-field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  font-weight: 700;\n  color: var(--%NS%text-silver);\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.form-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.form-field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 46px;\n  padding: 0.8rem 0.9rem;\n  border: 1px solid var(--%NS%input-border);\n  border-radius: 12px;\n  background: var(--%NS%surface-subtle);\n  color: var(--%NS%text-main);\n  font-size: 0.95rem;\n  transition: border-color 0.2s ease, box-shadow 0.2s ease;\n}\n.form-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.form-field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--%NS%accent-green);\n  box-shadow: 0 0 0 4px rgba(32, 176, 56, 0.08);\n}\n.search-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.75rem;\n  margin-bottom: 1rem;\n}\n.search-row[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 46px;\n  border: 1px solid var(--%NS%input-border);\n  border-radius: 12px;\n  background: var(--%NS%surface-subtle);\n  padding: 0.8rem 0.9rem;\n  color: var(--%NS%text-main);\n}\n.btn-search[_ngcontent-%COMP%], \n.btn-primary[_ngcontent-%COMP%], \n.btn-secondary[_ngcontent-%COMP%] {\n  min-height: 46px;\n  border: none;\n  border-radius: 12px;\n  font-weight: 800;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.btn-search[_ngcontent-%COMP%] {\n  min-width: 120px;\n  background: #1b5d3b;\n  color: var(--%NS%text-on-accent);\n}\n.btn-search[_ngcontent-%COMP%]:hover {\n  background: #1d6d42;\n}\n.map-box[_ngcontent-%COMP%] {\n  overflow: hidden;\n  border-radius: 16px;\n  border: 1px solid var(--%NS%input-border);\n  background: #e9f3eb;\n}\n.map-container[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 260px;\n  min-height: 260px;\n}\n.profile-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.8rem;\n  padding: 0.25rem 0 0;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  min-width: 180px;\n  background: var(--%NS%btn-primary-bg);\n  color: var(--%NS%btn-primary-text);\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%btn-primary-bg-hover);\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  min-width: 150px;\n  background: var(--%NS%surface-hover);\n  color: var(--%NS%text-silver);\n}\n.btn-secondary[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%border-color);\n}\n.alert[_ngcontent-%COMP%] {\n  margin: 0 0 1rem;\n  padding: 0.9rem 1rem;\n  border-radius: 12px;\n  font-size: 0.92rem;\n}\n.alert.error[_ngcontent-%COMP%] {\n  background: var(--%NS%danger-bg);\n  color: var(--%NS%danger);\n  border: 1px solid var(--%NS%danger-border);\n}\n.alert.success[_ngcontent-%COMP%] {\n  background: var(--%NS%accent-green-light);\n  color: #166534;\n  border: 1px solid #bbf7d0;\n}\n.profile-loading[_ngcontent-%COMP%] {\n  padding: 1.5rem 0;\n  color: var(--%NS%text-muted);\n  font-weight: 600;\n}\n@media (max-width: 768px) {\n  .profile-shell[_ngcontent-%COMP%] {\n    padding: 0.75rem 0.85rem 2rem;\n  }\n  .profile-hero[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .hero-user[_ngcontent-%COMP%] {\n    max-width: 100%;\n    min-width: 0;\n  }\n  .hero-copy[_ngcontent-%COMP%] {\n    min-width: 0;\n  }\n  .hero-copy[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], \n   .hero-copy[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    overflow-wrap: break-word;\n  }\n  .field-grid[_ngcontent-%COMP%], \n   .detail-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .search-row[_ngcontent-%COMP%], \n   .profile-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .btn-search[_ngcontent-%COMP%], \n   .btn-primary[_ngcontent-%COMP%], \n   .btn-secondary[_ngcontent-%COMP%], \n   .btn-edit-profile[_ngcontent-%COMP%], \n   .btn-back[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .section-header[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n  .btn-edit-profile[_ngcontent-%COMP%] {\n    justify-content: center;\n    min-height: 44px;\n  }\n  .location-readonly[_ngcontent-%COMP%] {\n    align-items: flex-start;\n    line-height: 1.35;\n  }\n  .form-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n   .form-field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n   .search-row[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    font-size: 1rem;\n  }\n}\n@media (max-width: 480px) {\n  .profile-shell[_ngcontent-%COMP%] {\n    padding: 0 0.85rem 1.5rem;\n  }\n  .profile-hero[_ngcontent-%COMP%] {\n    padding: 1.25rem 1rem;\n  }\n  .profile-avatar[_ngcontent-%COMP%] {\n    width: 54px;\n    height: 54px;\n    font-size: 1.4rem;\n    border-radius: 14px;\n  }\n  .hero-user[_ngcontent-%COMP%] {\n    gap: 0.85rem;\n  }\n  .hero-copy[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 1.6rem;\n  }\n  .section-title[_ngcontent-%COMP%] {\n    font-size: 0.75rem;\n  }\n  .profile-card[_ngcontent-%COMP%] {\n    padding: 1rem 0.9rem;\n  }\n  .profile-actions[_ngcontent-%COMP%] {\n    gap: 0.6rem;\n  }\n  .map-container[_ngcontent-%COMP%] {\n    height: 220px;\n    min-height: 220px;\n  }\n}\nhtml[data-theme="dark"][_nghost-%COMP%]   .btn-back[_ngcontent-%COMP%], html[data-theme="dark"]   [_nghost-%COMP%]   .btn-back[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.12);\n  border-color: rgba(139, 226, 140, 0.45);\n  color: #ffffff;\n}\nhtml[data-theme="dark"][_nghost-%COMP%]   .btn-edit-profile[_ngcontent-%COMP%], html[data-theme="dark"]   [_nghost-%COMP%]   .btn-edit-profile[_ngcontent-%COMP%] {\n  background: rgba(139, 226, 140, 0.12);\n  border-color: rgba(139, 226, 140, 0.45);\n  color: #ffffff;\n}\nhtml[data-theme="dark"][_nghost-%COMP%]   .btn-edit-profile[_ngcontent-%COMP%]:hover, html[data-theme="dark"]   [_nghost-%COMP%]   .btn-edit-profile[_ngcontent-%COMP%]:hover {\n  background: rgba(139, 226, 140, 0.2);\n  border-color: var(--%NS%accent-green-bright);\n  color: var(--%NS%accent-green-bright);\n}\nhtml[data-theme="dark"][_nghost-%COMP%]   .alert.success[_ngcontent-%COMP%], html[data-theme="dark"]   [_nghost-%COMP%]   .alert.success[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.14);\n  color: var(--%NS%accent-green-bright);\n  border-color: rgba(74, 222, 128, 0.4);\n}\n/*# sourceMappingURL=perfil.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PerfilComponent, [{
    type: Component,
    args: [{ selector: "app-perfil", standalone: true, imports: [CommonModule, FormsModule, RouterModule], template: `<section class="profile-shell">\r
  <div class="profile-hero">\r
    <div class="hero-user">\r
      <div class="profile-avatar">{{ (fullName || 'U').charAt(0).toUpperCase() }}</div>\r
      <div class="hero-copy">\r
        <span class="eyebrow">Mi perfil</span>\r
        <h2>{{ fullName || 'Usuario' }}</h2>\r
        <p>{{ isAdmin() ? 'Administrador' : 'Vendedor' }}</p>\r
      </div>\r
    </div>\r
\r
    <button type="button" class="btn-back" (click)="goBack()">\r
      <span>\u2190</span> Volver\r
    </button>\r
  </div>\r
\r
  <div *ngIf="errorMessage()" class="alert error">{{ errorMessage() }}</div>\r
  <div *ngIf="successMessage()" class="alert success">{{ successMessage() }}</div>\r
\r
  <div *ngIf="loading()" class="profile-loading">Cargando informaci\xF3n...</div>\r
\r
  <form *ngIf="!loading()" class="profile-content" (ngSubmit)="saveProfile()">\r
    <div class="profile-card form-card">\r
      <div class="section-header">\r
        <span class="section-title">Datos del usuario</span>\r
        <button *ngIf="!isEditing()" type="button" class="btn-edit-profile" (click)="startEditing()">\r
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg>\r
          Editar\r
        </button>\r
      </div>\r
\r
      <div *ngIf="isEditing()" class="field-grid">\r
        <div class="form-field">\r
          <label>Nombre completo</label>\r
          <input type="text" [(ngModel)]="fullName" name="fullName" placeholder="Ej. Juan P\xE9rez" />\r
        </div>\r
\r
        <div class="form-field">\r
          <label>N\xFAmero de vendedor</label>\r
          <input type="text" [(ngModel)]="sellerNumber" name="sellerNumber" placeholder="Ej. 4421234567" />\r
        </div>\r
\r
        <div class="form-field">\r
          <label>Marca / Agencia</label>\r
          <select [(ngModel)]="agencyBrand" name="agencyBrand">\r
            <option value="">Selecciona una marca</option>\r
            <option *ngFor="let brand of brands" [value]="brand">{{ brand }}</option>\r
          </select>\r
        </div>\r
\r
        <div class="form-field" *ngIf="agencyBrand === 'Otro'">\r
          <label>Especifica otra marca</label>\r
          <input type="text" [(ngModel)]="otherBrand" name="otherBrand" placeholder="Nombre de la marca" />\r
        </div>\r
      </div>\r
\r
      <div *ngIf="!isEditing()" class="detail-grid">\r
        <div class="detail-field">\r
          <span class="detail-label">Nombre completo</span>\r
          <span class="detail-value">{{ fullName || '\u2014' }}</span>\r
        </div>\r
\r
        <div class="detail-field">\r
          <span class="detail-label">N\xFAmero de vendedor</span>\r
          <span class="detail-value">{{ sellerNumber || '\u2014' }}</span>\r
        </div>\r
\r
        <div class="detail-field">\r
          <span class="detail-label">Marca / Agencia</span>\r
          <span class="detail-value">{{ displayAgencyBrand }}</span>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <div class="profile-card map-card">\r
      <div class="section-header">\r
        <span class="section-title">Ubicaci\xF3n</span>\r
      </div>\r
\r
      <div *ngIf="isEditing()" class="search-row">\r
        <input type="text" [(ngModel)]="manualAddress" name="manualAddress" placeholder="Busca tu ubicaci\xF3n o direcci\xF3n" />\r
        <button type="button" class="btn-search" (click)="searchLocation()" [disabled]="isSearching()">\r
          {{ isSearching() ? 'Buscando...' : 'Buscar' }}\r
        </button>\r
      </div>\r
\r
      <div *ngIf="!isEditing()" class="location-readonly">\r
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>\r
        <span>{{ manualAddress || addressText || 'Sin ubicaci\xF3n registrada' }}</span>\r
      </div>\r
\r
      <div class="map-box">\r
        <div #mapContainer class="map-container"></div>\r
      </div>\r
    </div>\r
\r
    <div *ngIf="isEditing()" class="profile-actions">\r
      <button type="button" class="btn-secondary" (click)="cancelEditing()" [disabled]="saving()">\r
        Cancelar\r
      </button>\r
      <button type="submit" class="btn-primary" [disabled]="saving()">\r
        {{ saving() ? 'Guardando...' : 'Guardar cambios' }}\r
      </button>\r
    </div>\r
  </form>\r
</section>\r
`, styles: ['/* src/app/components/perfil/perfil.component.css */\n:host {\n  display: block;\n  width: 100%;\n}\n.profile-shell {\n  width: min(1100px, 100%);\n  margin: 0 auto;\n  padding: 0.5rem 0 2.5rem;\n}\n.profile-hero {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 1.5rem 1.5rem 1.3rem;\n  margin-bottom: 1.25rem;\n  border-radius: 20px;\n  background:\n    linear-gradient(\n      135deg,\n      #10251f 0%,\n      #153e2e 40%,\n      #1a5d3a 100%);\n  border: 1px solid rgba(139, 226, 140, 0.2);\n  box-shadow: 0 16px 36px rgba(16, 37, 31, 0.18);\n}\n.hero-user {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.profile-avatar {\n  width: 68px;\n  height: 68px;\n  border-radius: 18px;\n  background:\n    linear-gradient(\n      135deg,\n      #8be28c,\n      var(--accent-green));\n  color: var(--accent-slate);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.8rem;\n  font-weight: 800;\n  box-shadow: 0 12px 24px rgba(32, 176, 56, 0.25);\n}\n.eyebrow {\n  display: block;\n  color: #8fe58f;\n  font-size: 0.7rem;\n  font-weight: 800;\n  letter-spacing: 1.3px;\n  text-transform: uppercase;\n}\n.hero-copy h2 {\n  margin: 0.1rem 0 0.2rem;\n  color: var(--text-on-accent);\n  font-size: clamp(2rem, 2vw, 2.5rem);\n  line-height: 1.05;\n}\n.hero-copy p {\n  margin: 0;\n  color: #d4e7db;\n  font-size: 0.92rem;\n}\n.btn-back {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  min-height: 46px;\n  padding: 0.8rem 1.1rem;\n  border: 1px solid rgba(139, 226, 140, 0.25);\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.06);\n  color: var(--surface-hover);\n  font-weight: 700;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.btn-back:hover {\n  background: rgba(139, 226, 140, 0.12);\n  border-color: rgba(139, 226, 140, 0.4);\n}\n.profile-content {\n  display: grid;\n  gap: 1.25rem;\n}\n.profile-card {\n  background: var(--surface-card);\n  border: 1px solid var(--border-color);\n  border-radius: 18px;\n  box-shadow: 0 12px 28px var(--shadow-soft);\n  padding: 1.2rem 1.25rem;\n}\n.section-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  margin-bottom: 1rem;\n  padding-bottom: 0.8rem;\n  border-bottom: 1px solid var(--border-color);\n}\n.section-title {\n  color: var(--accent-slate);\n  font-size: 0.8rem;\n  font-weight: 800;\n  letter-spacing: 1.2px;\n  text-transform: uppercase;\n}\n.btn-edit-profile {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  flex-shrink: 0;\n  min-height: 38px;\n  padding: 0.5rem 0.95rem;\n  border: 1px solid var(--border-strong);\n  border-radius: 10px;\n  background: var(--surface-subtle);\n  color: var(--text-silver);\n  font-size: 0.85rem;\n  font-weight: 700;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.btn-edit-profile svg {\n  width: 16px;\n  height: 16px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 2;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.btn-edit-profile:hover {\n  background: var(--surface-hover);\n  border-color: var(--accent-green);\n  color: var(--accent-green);\n}\n.detail-grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(220px, 1fr));\n  gap: 1.25rem 1rem;\n}\n.detail-field {\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n}\n.detail-label {\n  font-size: 0.75rem;\n  font-weight: 700;\n  color: var(--text-silver);\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.detail-value {\n  font-size: 1.05rem;\n  font-weight: 600;\n  color: var(--text-main);\n  padding-bottom: 0.5rem;\n  border-bottom: 1px dashed var(--border-color);\n}\n.location-readonly {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  padding: 0.85rem 1rem;\n  margin-bottom: 1rem;\n  border: 1px solid var(--input-border);\n  border-radius: 12px;\n  background: var(--surface-subtle);\n  color: var(--text-main);\n  font-size: 0.95rem;\n}\n.location-readonly svg {\n  width: 18px;\n  height: 18px;\n  flex-shrink: 0;\n  fill: none;\n  stroke: var(--accent-green);\n  stroke-width: 2;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.field-grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(220px, 1fr));\n  gap: 1rem;\n}\n.form-field {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.form-field label {\n  font-size: 0.75rem;\n  font-weight: 700;\n  color: var(--text-silver);\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.form-field input,\n.form-field select {\n  width: 100%;\n  min-height: 46px;\n  padding: 0.8rem 0.9rem;\n  border: 1px solid var(--input-border);\n  border-radius: 12px;\n  background: var(--surface-subtle);\n  color: var(--text-main);\n  font-size: 0.95rem;\n  transition: border-color 0.2s ease, box-shadow 0.2s ease;\n}\n.form-field input:focus,\n.form-field select:focus {\n  outline: none;\n  border-color: var(--accent-green);\n  box-shadow: 0 0 0 4px rgba(32, 176, 56, 0.08);\n}\n.search-row {\n  display: flex;\n  gap: 0.75rem;\n  margin-bottom: 1rem;\n}\n.search-row input {\n  flex: 1;\n  min-height: 46px;\n  border: 1px solid var(--input-border);\n  border-radius: 12px;\n  background: var(--surface-subtle);\n  padding: 0.8rem 0.9rem;\n  color: var(--text-main);\n}\n.btn-search,\n.btn-primary,\n.btn-secondary {\n  min-height: 46px;\n  border: none;\n  border-radius: 12px;\n  font-weight: 800;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.btn-search {\n  min-width: 120px;\n  background: #1b5d3b;\n  color: var(--text-on-accent);\n}\n.btn-search:hover {\n  background: #1d6d42;\n}\n.map-box {\n  overflow: hidden;\n  border-radius: 16px;\n  border: 1px solid var(--input-border);\n  background: #e9f3eb;\n}\n.map-container {\n  width: 100%;\n  height: 260px;\n  min-height: 260px;\n}\n.profile-actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.8rem;\n  padding: 0.25rem 0 0;\n}\n.btn-primary {\n  min-width: 180px;\n  background: var(--btn-primary-bg);\n  color: var(--btn-primary-text);\n}\n.btn-primary:hover {\n  background: var(--btn-primary-bg-hover);\n}\n.btn-secondary {\n  min-width: 150px;\n  background: var(--surface-hover);\n  color: var(--text-silver);\n}\n.btn-secondary:hover {\n  background: var(--border-color);\n}\n.alert {\n  margin: 0 0 1rem;\n  padding: 0.9rem 1rem;\n  border-radius: 12px;\n  font-size: 0.92rem;\n}\n.alert.error {\n  background: var(--danger-bg);\n  color: var(--danger);\n  border: 1px solid var(--danger-border);\n}\n.alert.success {\n  background: var(--accent-green-light);\n  color: #166534;\n  border: 1px solid #bbf7d0;\n}\n.profile-loading {\n  padding: 1.5rem 0;\n  color: var(--text-muted);\n  font-weight: 600;\n}\n@media (max-width: 768px) {\n  .profile-shell {\n    padding: 0.75rem 0.85rem 2rem;\n  }\n  .profile-hero {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .hero-user {\n    max-width: 100%;\n    min-width: 0;\n  }\n  .hero-copy {\n    min-width: 0;\n  }\n  .hero-copy h2,\n  .hero-copy p {\n    overflow-wrap: break-word;\n  }\n  .field-grid,\n  .detail-grid {\n    grid-template-columns: 1fr;\n  }\n  .search-row,\n  .profile-actions {\n    flex-direction: column;\n  }\n  .btn-search,\n  .btn-primary,\n  .btn-secondary,\n  .btn-edit-profile,\n  .btn-back {\n    width: 100%;\n  }\n  .section-header {\n    flex-wrap: wrap;\n  }\n  .btn-edit-profile {\n    justify-content: center;\n    min-height: 44px;\n  }\n  .location-readonly {\n    align-items: flex-start;\n    line-height: 1.35;\n  }\n  .form-field input,\n  .form-field select,\n  .search-row input {\n    font-size: 1rem;\n  }\n}\n@media (max-width: 480px) {\n  .profile-shell {\n    padding: 0 0.85rem 1.5rem;\n  }\n  .profile-hero {\n    padding: 1.25rem 1rem;\n  }\n  .profile-avatar {\n    width: 54px;\n    height: 54px;\n    font-size: 1.4rem;\n    border-radius: 14px;\n  }\n  .hero-user {\n    gap: 0.85rem;\n  }\n  .hero-copy h2 {\n    font-size: 1.6rem;\n  }\n  .section-title {\n    font-size: 0.75rem;\n  }\n  .profile-card {\n    padding: 1rem 0.9rem;\n  }\n  .profile-actions {\n    gap: 0.6rem;\n  }\n  .map-container {\n    height: 220px;\n    min-height: 220px;\n  }\n}\n:host-context(html[data-theme="dark"]) .btn-back {\n  background: rgba(255, 255, 255, 0.12);\n  border-color: rgba(139, 226, 140, 0.45);\n  color: #ffffff;\n}\n:host-context(html[data-theme="dark"]) .btn-edit-profile {\n  background: rgba(139, 226, 140, 0.12);\n  border-color: rgba(139, 226, 140, 0.45);\n  color: #ffffff;\n}\n:host-context(html[data-theme="dark"]) .btn-edit-profile:hover {\n  background: rgba(139, 226, 140, 0.2);\n  border-color: var(--accent-green-bright);\n  color: var(--accent-green-bright);\n}\n:host-context(html[data-theme="dark"]) .alert.success {\n  background: rgba(34, 197, 94, 0.14);\n  color: var(--accent-green-bright);\n  border-color: rgba(74, 222, 128, 0.4);\n}\n/*# sourceMappingURL=perfil.component.css.map */\n'] }]
  }], null, { mapContainer: [{
    type: ViewChild,
    args: ["mapContainer"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PerfilComponent, { className: "PerfilComponent", filePath: "src/app/components/perfil/perfil.component.ts", lineNumber: 15 });
})();
export {
  PerfilComponent
};
//# debugId=268f3bfc-ea88-59f1-9e2a-64e081daeacc
//# sourceMappingURL=chunk-H4FIETLE.js.map
