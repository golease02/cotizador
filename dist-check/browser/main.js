import {
  ThemeService
} from "./chunk-WDXLETH5.js";
import {
  ToastService
} from "./chunk-74RWLUMR.js";
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
  bootstrapApplication,
  provideRouter,
  withHashLocation
} from "./chunk-UUNAMTTY.js";
import {
  AuthService
} from "./chunk-XCV63D25.js";
import {
  CommonModule,
  Component,
  NgIf,
  inject,
  provideBrowserGlobalErrorListeners,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
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
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-6KRTW2LJ.js";
import "./chunk-FDMHZOCR.js";

// src/app/guards/auth.guard.ts
var AuthGuard = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  await auth.waitForSession();
  const user = auth.currentUser();
  if (!user) {
    router.navigate(["/login"]);
    return false;
  }
  let profile = auth.currentProfile();
  if (!profile) {
    profile = await auth.loadProfile(user.id);
  }
  if (profile?.active === false) {
    await auth.signOut();
    router.navigate(["/login"]);
    return false;
  }
  return true;
};

// src/app/guards/admin-guard.ts
var adminGuard = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  await auth.waitForSession();
  let profile = auth.currentProfile();
  if (!profile) {
    const user = auth.currentUser();
    if (user) {
      profile = await auth.loadProfile(user.id);
    }
  }
  if (profile?.role === "admin" && profile.active !== false) {
    return true;
  } else {
    if (profile?.active === false) {
      await auth.signOut();
      router.navigate(["/login"]);
      return false;
    }
    router.navigate(["/"]);
    return false;
  }
};

// src/app/app.routes.ts
var routes = [
  {
    path: "login",
    loadComponent: () => import("./chunk-I73SOO74.js").then((m) => m.LoginComponent)
  },
  {
    path: "register",
    loadComponent: () => import("./chunk-6CU3PFYP.js").then((m) => m.RegisterComponent)
  },
  {
    path: "recuperar-contrasena",
    loadComponent: () => import("./chunk-I5UZUSJQ.js").then((m) => m.PasswordRecoveryComponent)
  },
  {
    path: "reset-password",
    loadComponent: () => import("./chunk-4ANGE2KL.js").then((m) => m.ResetPasswordComponent)
  },
  // ✅ Ruta raíz → Mis Cotizaciones (página principal del vendedor)
  {
    path: "",
    loadComponent: () => import("./chunk-RDFIEONG.js").then((m) => m.MisCotizacionesComponent),
    canActivate: [AuthGuard]
  },
  // ✅ Ruta del Cotizador (accesible desde Mis Cotizaciones)
  {
    path: "cotizador",
    loadComponent: () => import("./chunk-QCVUOKYO.js").then((m) => m.CotizadorComponent),
    canActivate: [AuthGuard]
  },
  {
    path: "perfil",
    loadComponent: () => import("./chunk-H4FIETLE.js").then((m) => m.PerfilComponent),
    canActivate: [AuthGuard]
  },
  // ✅ Ruta alternativa por si alguien escribe /mis-cotizaciones (redirige a raíz)
  {
    path: "mis-cotizaciones",
    redirectTo: "",
    pathMatch: "full"
  },
  {
    path: "admin",
    loadComponent: () => import("./chunk-6WZNLTIQ.js").then((m) => m.AdminDashboardComponent),
    canActivate: [AuthGuard, adminGuard],
    children: [
      {
        path: "",
        loadComponent: () => import("./chunk-INU2UMXU.js").then((m) => m.AdminStatsComponent)
      },
      {
        path: "sellers",
        loadComponent: () => import("./chunk-YOHL55G2.js").then((m) => m.AdminSellersComponent)
      },
      {
        path: "admins",
        loadComponent: () => import("./chunk-EDGAN7WN.js").then((m) => m.AdminAdminsComponent)
      },
      {
        path: "quotes",
        loadComponent: () => import("./chunk-C5WI2TYZ.js").then((m) => m.AdminQuotesComponent)
      },
      {
        path: "vehicles",
        loadComponent: () => import("./chunk-HWJ4T4I3.js").then((m) => m.AdminVehiclesComponent)
      },
      {
        path: "plates",
        loadComponent: () => import("./chunk-YBX4YI3Y.js").then((m) => m.AdminPlatesComponent)
      },
      {
        path: "parameters",
        loadComponent: () => import("./chunk-7GMOW3SQ.js").then((m) => m.AdminParametersComponent)
      }
    ]
  },
  { path: "**", redirectTo: "" }
];

// src/app/app.config.ts
var appConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withHashLocation())
  ]
};

// src/app/components/header/header.component.ts
var _c0 = () => ({ exact: true });
function HeaderComponent_div_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 24)(1, "a", 25)(2, "span", 26);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 27)(5, "span", 28);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 29);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "button", 30);
    \u0275\u0275listener("click", function HeaderComponent_div_24_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.logout());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(10, "svg", 31);
    \u0275\u0275element(11, "path", 32)(12, "polyline", 33)(13, "line", 34);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate((ctx_r1.auth.currentProfile()?.full_name || "V").charAt(0).toUpperCase());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.auth.currentProfile()?.full_name || "Vendedor");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.auth.isAdmin() ? "Administrador" : "Vendedor");
  }
}
function HeaderComponent_nav_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nav", 35)(1, "a", 36);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 37);
    \u0275\u0275element(3, "path", 38)(4, "polyline", 39);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6, "Inicio");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "a", 40)(8, "span", 41);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(9, "svg", 42);
    \u0275\u0275element(10, "line", 43)(11, "line", 44);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(12, "span");
    \u0275\u0275text(13, "Cotizar");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "a", 45);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(15, "svg", 37);
    \u0275\u0275element(16, "path", 46)(17, "circle", 47);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(18, "span");
    \u0275\u0275text(19, "Perfil");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("routerLinkActiveOptions", \u0275\u0275pureFunction0(1, _c0));
  }
}
var HeaderComponent = class _HeaderComponent {
  auth = inject(AuthService);
  theme = inject(ThemeService);
  router = inject(Router);
  async ngOnInit() {
    const user = this.auth.currentUser();
    if (user && !this.auth.currentProfile()) {
      await this.auth.loadProfile(user.id);
    }
  }
  toggleTheme() {
    this.theme.toggle();
  }
  async logout() {
    await this.auth.signOut();
    this.router.navigate(["/login"]);
  }
  static \u0275fac = function HeaderComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HeaderComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HeaderComponent, selectors: [["app-header"]], decls: 26, vars: 4, consts: [[1, "app-header"], [1, "header-container"], [1, "brand-logo-container"], ["routerLink", "/", 1, "logo-link"], ["src", "https://img1.wsimg.com/isteam/ip/b2c8c497-599d-4df4-9ab6-2aaaf690a095/LOGO%20GOLEASE%20SIN%20FONDO.png", "alt", "GO LEASE MX Logo", 1, "header-logo-img"], [1, "logo-text"], [1, "brand-title"], [1, "brand-slogan"], [1, "header-right"], ["type", "button", 1, "theme-toggle", 3, "click", "title"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round", 1, "icon-sun"], ["cx", "12", "cy", "12", "r", "4"], ["d", "M12 2v2"], ["d", "M12 20v2"], ["d", "m4.93 4.93 1.41 1.41"], ["d", "m17.66 17.66 1.41 1.41"], ["d", "M2 12h2"], ["d", "M20 12h2"], ["d", "m6.34 17.66-1.41 1.41"], ["d", "m19.07 4.93-1.41 1.41"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round", 1, "icon-moon"], ["d", "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"], ["class", "user-area", 4, "ngIf"], ["class", "mobile-bottom-nav", "aria-label", "Navegaci\xF3n principal", 4, "ngIf"], [1, "user-area"], ["routerLink", "/perfil", "title", "Ver perfil", 1, "user-profile-link"], [1, "user-avatar"], [1, "user-info"], [1, "user-name"], [1, "user-role"], ["title", "Cerrar sesi\xF3n", 1, "logout-btn", 3, "click"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"], ["points", "16 17 21 12 16 7"], ["x1", "21", "y1", "12", "x2", "9", "y2", "12"], ["aria-label", "Navegaci\xF3n principal", 1, "mobile-bottom-nav"], ["routerLink", "/", "routerLinkActive", "active", "aria-label", "Mis Cotizaciones", "title", "Mis Cotizaciones", 1, "nav-item", 3, "routerLinkActiveOptions"], ["width", "22", "height", "22", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M3 9.5 12 3l9 6.5V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"], ["points", "9 22 9 12 15 12 15 22"], ["routerLink", "/cotizador", "routerLinkActive", "active", "aria-label", "Nueva Cotizaci\xF3n", "title", "Nueva Cotizaci\xF3n", 1, "nav-item", "nav-item-cta"], [1, "cta-bubble"], ["width", "24", "height", "24", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["x1", "12", "y1", "5", "x2", "12", "y2", "19"], ["x1", "5", "y1", "12", "x2", "19", "y2", "12"], ["routerLink", "/perfil", "routerLinkActive", "active", "aria-label", "Mi Perfil", "title", "Mi Perfil", 1, "nav-item"], ["d", "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"], ["cx", "12", "cy", "7", "r", "4"]], template: function HeaderComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "header", 0)(1, "div", 1)(2, "div", 2)(3, "a", 3);
      \u0275\u0275element(4, "img", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div", 5)(6, "span", 6);
      \u0275\u0275text(7, "GO LEASE MX");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "span", 7);
      \u0275\u0275text(9, '"Haz de tus impuestos, la renta de tu auto"');
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(10, "div", 8)(11, "button", 9);
      \u0275\u0275listener("click", function HeaderComponent_Template_button_click_11_listener() {
        return ctx.toggleTheme();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(12, "svg", 10);
      \u0275\u0275element(13, "circle", 11)(14, "path", 12)(15, "path", 13)(16, "path", 14)(17, "path", 15)(18, "path", 16)(19, "path", 17)(20, "path", 18)(21, "path", 19);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "svg", 20);
      \u0275\u0275element(23, "path", 21);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(24, HeaderComponent_div_24_Template, 14, 3, "div", 22);
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(25, HeaderComponent_nav_25_Template, 20, 2, "nav", 23);
    }
    if (rf & 2) {
      \u0275\u0275advance(11);
      \u0275\u0275property("title", ctx.theme.theme() === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
      \u0275\u0275attribute("aria-label", ctx.theme.theme() === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
      \u0275\u0275advance(13);
      \u0275\u0275property("ngIf", ctx.auth.currentUser());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.auth.currentUser());
    }
  }, dependencies: [CommonModule, NgIf, RouterModule, RouterLink, RouterLinkActive], styles: ['\n.app-header[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.94);\n  -webkit-backdrop-filter: blur(14px);\n  backdrop-filter: blur(14px);\n  border-bottom: 1px solid #e2e8f0;\n  position: sticky;\n  top: 0;\n  z-index: 100;\n  padding: 0.65rem 2rem;\n  box-shadow: 0 4px 18px rgba(15, 23, 42, 0.04);\n  transition: box-shadow 0.3s ease, border-color 0.3s ease;\n  animation: _ngcontent-%COMP%_slideDown 0.5s ease forwards;\n}\n.app-header[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: -1px;\n  height: 2px;\n  background:\n    linear-gradient(\n      90deg,\n      #15803d,\n      #20b038 45%,\n      rgba(32, 176, 56, 0));\n  pointer-events: none;\n}\n@keyframes _ngcontent-%COMP%_slideDown {\n  from {\n    transform: translateY(-100%);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n.app-header.scrolled[_ngcontent-%COMP%] {\n  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);\n  border-bottom-color: rgba(226, 232, 240, 0.7);\n}\n.header-container[_ngcontent-%COMP%] {\n  max-width: 1400px;\n  margin: 0 auto;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1.5rem;\n}\n.brand-logo-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.9rem;\n  flex-shrink: 0;\n}\n.logo-link[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  text-decoration: none;\n}\n.header-logo-img[_ngcontent-%COMP%] {\n  height: 46px;\n  width: auto;\n  object-fit: contain;\n  transition: transform 0.25s ease;\n}\n.logo-link[_ngcontent-%COMP%]:hover   .header-logo-img[_ngcontent-%COMP%] {\n  transform: scale(1.05);\n}\n.logo-text[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  line-height: 1.2;\n}\n.brand-title[_ngcontent-%COMP%] {\n  font-family: "Fjalla One", sans-serif;\n  font-size: 1.2rem;\n  color: #0f172a;\n  letter-spacing: 0.5px;\n}\n.brand-slogan[_ngcontent-%COMP%] {\n  font-family: "Source Sans Pro", sans-serif;\n  font-size: 0.72rem;\n  color: #20b038;\n  font-style: italic;\n  font-weight: 700;\n}\n.header-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  flex-shrink: 0;\n}\n.user-area[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.7rem;\n  background: #f5faf6;\n  border: 1px solid #dcebe0;\n  border-radius: 12px;\n  padding: 0.3rem 0.55rem 0.3rem 0.4rem;\n  transition: border-color 0.2s ease, box-shadow 0.2s ease;\n}\n.user-area[_ngcontent-%COMP%]:hover {\n  border-color: #8bd39a;\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.09);\n}\n.user-profile-link[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.7rem;\n  text-decoration: none;\n  color: inherit;\n}\n.user-avatar[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  background:\n    linear-gradient(\n      135deg,\n      #15803d,\n      #20b038);\n  color: white;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: 1rem;\n  flex-shrink: 0;\n}\n.user-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  line-height: 1.2;\n}\n.user-name[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 0.88rem;\n  color: #0f172a;\n}\n.user-role[_ngcontent-%COMP%] {\n  font-size: 0.62rem;\n  color: #94a3b8;\n  text-transform: uppercase;\n  letter-spacing: 0.3px;\n}\n.logout-btn[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  color: #94a3b8;\n  padding: 0.45rem;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all 0.2s;\n  display: flex;\n  align-items: center;\n}\n.logout-btn[_ngcontent-%COMP%]:hover {\n  color: #ef4444;\n  background: #fef2f2;\n  transform: scale(1.1);\n}\n.logout-btn[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid #20b038;\n  outline-offset: 2px;\n}\n.logout-btn[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  stroke: currentColor;\n}\n.theme-toggle[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n  height: 40px;\n  flex-shrink: 0;\n  background: var(--%NS%surface-subtle);\n  border: 1px solid var(--%NS%border-color);\n  border-radius: 10px;\n  color: var(--%NS%text-silver);\n  cursor: pointer;\n  transition:\n    background-color 0.2s ease,\n    border-color 0.2s ease,\n    color 0.2s ease,\n    transform 0.2s ease;\n  position: relative;\n}\n.theme-toggle[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%surface-hover);\n  border-color: var(--%NS%accent-green);\n  color: var(--%NS%accent-green);\n  transform: scale(1.08);\n}\n.theme-toggle[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--%NS%accent-green);\n  outline-offset: 2px;\n}\n.theme-toggle[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  stroke: currentColor;\n  position: absolute;\n  transition: opacity 0.25s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);\n}\n.theme-toggle[_ngcontent-%COMP%]   .icon-moon[_ngcontent-%COMP%] {\n  opacity: 1;\n  transform: rotate(0deg) scale(1);\n}\n.theme-toggle[_ngcontent-%COMP%]   .icon-sun[_ngcontent-%COMP%] {\n  opacity: 0;\n  transform: rotate(-90deg) scale(0.6);\n}\nhtml[data-theme="dark"][_nghost-%COMP%]   .theme-toggle[_ngcontent-%COMP%]   .icon-moon[_ngcontent-%COMP%], html[data-theme="dark"]   [_nghost-%COMP%]   .theme-toggle[_ngcontent-%COMP%]   .icon-moon[_ngcontent-%COMP%] {\n  opacity: 0;\n  transform: rotate(90deg) scale(0.6);\n}\nhtml[data-theme="dark"][_nghost-%COMP%]   .theme-toggle[_ngcontent-%COMP%]   .icon-sun[_ngcontent-%COMP%], html[data-theme="dark"]   [_nghost-%COMP%]   .theme-toggle[_ngcontent-%COMP%]   .icon-sun[_ngcontent-%COMP%] {\n  opacity: 1;\n  transform: rotate(0deg) scale(1);\n}\n.theme-toggle[_ngcontent-%COMP%] {\n  width: 38px;\n  height: 38px;\n}\n@media (max-width: 768px) {\n  .app-header[_ngcontent-%COMP%] {\n    padding: 0.55rem 1rem;\n  }\n  .header-logo-img[_ngcontent-%COMP%] {\n    height: 38px;\n  }\n  .brand-title[_ngcontent-%COMP%] {\n    font-size: 0.98rem;\n  }\n  .brand-slogan[_ngcontent-%COMP%] {\n    font-size: 0.6rem;\n  }\n  .user-avatar[_ngcontent-%COMP%] {\n    width: 28px;\n    height: 28px;\n    font-size: 0.8rem;\n  }\n  .user-name[_ngcontent-%COMP%] {\n    font-size: 0.78rem;\n  }\n  .user-role[_ngcontent-%COMP%] {\n    font-size: 0.55rem;\n  }\n  .logout-btn[_ngcontent-%COMP%] {\n    width: 40px;\n    height: 40px;\n    padding: 0;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n  }\n}\n@media (max-width: 480px) {\n  .brand-slogan[_ngcontent-%COMP%], \n   .user-info[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .app-header[_ngcontent-%COMP%] {\n    padding: 0.45rem 0.7rem;\n  }\n  .header-logo-img[_ngcontent-%COMP%] {\n    height: 30px;\n  }\n  .brand-title[_ngcontent-%COMP%] {\n    font-size: 0.9rem;\n  }\n}\n.mobile-bottom-nav[_ngcontent-%COMP%] {\n  display: none;\n}\n@media (max-width: 768px) {\n  .mobile-bottom-nav[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: flex-end;\n    justify-content: space-around;\n    position: fixed;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    z-index: 990;\n    min-height: calc(60px + env(safe-area-inset-bottom, 0px));\n    padding: 0 0.5rem env(safe-area-inset-bottom, 0px);\n    background: rgba(255, 255, 255, 0.94);\n    -webkit-backdrop-filter: blur(14px);\n    backdrop-filter: blur(14px);\n    border-top: 1px solid #e2e8f0;\n    box-shadow: 0 -6px 20px rgba(15, 23, 42, 0.07);\n    box-sizing: border-box;\n    user-select: none;\n    -webkit-user-select: none;\n  }\n  .mobile-bottom-nav[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%] {\n    flex: 1 1 0;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    gap: 0.15rem;\n    min-height: 52px;\n    padding: 0.35rem 0.25rem 0.3rem;\n    border-radius: 12px;\n    text-decoration: none;\n    color: #94a3b8;\n    font-size: 0.62rem;\n    font-weight: 700;\n    letter-spacing: 0.3px;\n    -webkit-tap-highlight-color: transparent;\n    transition:\n      color 0.2s ease,\n      background-color 0.2s ease,\n      transform 0.2s ease;\n  }\n  .mobile-bottom-nav[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n    stroke: currentColor;\n    flex-shrink: 0;\n  }\n  .mobile-bottom-nav[_ngcontent-%COMP%]   .nav-item.active[_ngcontent-%COMP%] {\n    color: #15803d;\n    background: rgba(32, 176, 56, 0.08);\n  }\n  .mobile-bottom-nav[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%]:active {\n    transform: scale(0.94);\n  }\n  .mobile-bottom-nav[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid #20b038;\n    outline-offset: 2px;\n  }\n  .mobile-bottom-nav[_ngcontent-%COMP%]   .nav-item-cta[_ngcontent-%COMP%] {\n    flex: 0 1 auto;\n    min-width: 88px;\n    padding: 0;\n  }\n  .mobile-bottom-nav[_ngcontent-%COMP%]   .cta-bubble[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 52px;\n    height: 52px;\n    margin-top: -20px;\n    border-radius: 50%;\n    color: #ffffff;\n    background:\n      linear-gradient(\n        135deg,\n        #15803d 0%,\n        #20b038 100%);\n    box-shadow: 0 6px 16px rgba(32, 176, 56, 0.42);\n    transition: transform 0.2s ease, box-shadow 0.2s ease;\n  }\n  .mobile-bottom-nav[_ngcontent-%COMP%]   .nav-item-cta[_ngcontent-%COMP%]:active   .cta-bubble[_ngcontent-%COMP%] {\n    transform: scale(0.92);\n  }\n  .mobile-bottom-nav[_ngcontent-%COMP%]   .nav-item-cta.active[_ngcontent-%COMP%]   .cta-bubble[_ngcontent-%COMP%] {\n    box-shadow: 0 0 0 4px rgba(32, 176, 56, 0.18), 0 6px 16px rgba(32, 176, 56, 0.42);\n  }\n}\nhtml[data-theme="dark"][_nghost-%COMP%]   .mobile-bottom-nav[_ngcontent-%COMP%], html[data-theme="dark"]   [_nghost-%COMP%]   .mobile-bottom-nav[_ngcontent-%COMP%] {\n  background: rgba(18, 30, 33, 0.94);\n  border-top-color: #304348;\n  box-shadow: 0 -6px 20px rgba(0, 0, 0, 0.5);\n}\nhtml[data-theme="dark"][_nghost-%COMP%]   .mobile-bottom-nav[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%], html[data-theme="dark"]   [_nghost-%COMP%]   .mobile-bottom-nav[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%] {\n  color: #9fb4ae;\n}\nhtml[data-theme="dark"][_nghost-%COMP%]   .mobile-bottom-nav[_ngcontent-%COMP%]   .nav-item.active[_ngcontent-%COMP%], html[data-theme="dark"]   [_nghost-%COMP%]   .mobile-bottom-nav[_ngcontent-%COMP%]   .nav-item.active[_ngcontent-%COMP%] {\n  color: #4ade80;\n  background: rgba(34, 197, 94, 0.12);\n}\n/*# sourceMappingURL=header.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HeaderComponent, [{
    type: Component,
    args: [{ selector: "app-header", standalone: true, imports: [CommonModule, RouterModule], template: `<header class="app-header">
  <div class="header-container">
    <!-- Logo y eslogan -->
    <div class="brand-logo-container">
      <a routerLink="/" class="logo-link">
        <img
          src="https://img1.wsimg.com/isteam/ip/b2c8c497-599d-4df4-9ab6-2aaaf690a095/LOGO%20GOLEASE%20SIN%20FONDO.png"
          alt="GO LEASE MX Logo" class="header-logo-img" />
      </a>
      <div class="logo-text">
        <span class="brand-title">GO LEASE MX</span>
        <span class="brand-slogan">"Haz de tus impuestos, la renta de tu auto"</span>
      </div>
    </div>

    <!-- \xC1rea de usuario + toggle tema -->
    <div class="header-right">
      <button class="theme-toggle" type="button" (click)="toggleTheme()"
        [attr.aria-label]="theme.theme() === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
        [title]="theme.theme() === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'">
        <svg class="icon-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="4"></circle>
          <path d="M12 2v2"></path>
          <path d="M12 20v2"></path>
          <path d="m4.93 4.93 1.41 1.41"></path>
          <path d="m17.66 17.66 1.41 1.41"></path>
          <path d="M2 12h2"></path>
          <path d="M20 12h2"></path>
          <path d="m6.34 17.66-1.41 1.41"></path>
          <path d="m19.07 4.93-1.41 1.41"></path>
        </svg>
        <svg class="icon-moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
        </svg>
      </button>

      <div *ngIf="auth.currentUser()" class="user-area">
        <a class="user-profile-link" routerLink="/perfil" title="Ver perfil">
          <span class="user-avatar">{{ (auth.currentProfile()?.full_name || 'V').charAt(0).toUpperCase() }}</span>
          <div class="user-info">
            <span class="user-name">{{ auth.currentProfile()?.full_name || 'Vendedor' }}</span>
            <span class="user-role">{{ auth.isAdmin() ? 'Administrador' : 'Vendedor' }}</span>
          </div>
        </a>
        <button class="logout-btn" (click)="logout()" title="Cerrar sesi\xF3n">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</header>

<!-- Navegaci\xF3n inferior m\xF3vil (solo pantallas peque\xF1as y con sesi\xF3n iniciada) -->
<nav class="mobile-bottom-nav" *ngIf="auth.currentUser()" aria-label="Navegaci\xF3n principal">
  <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" class="nav-item"
    aria-label="Mis Cotizaciones" title="Mis Cotizaciones">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 9.5 12 3l9 6.5V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
    <span>Inicio</span>
  </a>

  <a routerLink="/cotizador" routerLinkActive="active" class="nav-item nav-item-cta" aria-label="Nueva Cotizaci\xF3n"
    title="Nueva Cotizaci\xF3n">
    <span class="cta-bubble">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"
        stroke-linecap="round" stroke-linejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </span>
    <span>Cotizar</span>
  </a>

  <a routerLink="/perfil" routerLinkActive="active" class="nav-item" aria-label="Mi Perfil" title="Mi Perfil">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
    <span>Perfil</span>
  </a>
</nav>
`, styles: ['/* src/app/components/header/header.component.css */\n.app-header {\n  background: rgba(255, 255, 255, 0.94);\n  -webkit-backdrop-filter: blur(14px);\n  backdrop-filter: blur(14px);\n  border-bottom: 1px solid #e2e8f0;\n  position: sticky;\n  top: 0;\n  z-index: 100;\n  padding: 0.65rem 2rem;\n  box-shadow: 0 4px 18px rgba(15, 23, 42, 0.04);\n  transition: box-shadow 0.3s ease, border-color 0.3s ease;\n  animation: slideDown 0.5s ease forwards;\n}\n.app-header::after {\n  content: "";\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: -1px;\n  height: 2px;\n  background:\n    linear-gradient(\n      90deg,\n      #15803d,\n      #20b038 45%,\n      rgba(32, 176, 56, 0));\n  pointer-events: none;\n}\n@keyframes slideDown {\n  from {\n    transform: translateY(-100%);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n.app-header.scrolled {\n  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);\n  border-bottom-color: rgba(226, 232, 240, 0.7);\n}\n.header-container {\n  max-width: 1400px;\n  margin: 0 auto;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1.5rem;\n}\n.brand-logo-container {\n  display: flex;\n  align-items: center;\n  gap: 0.9rem;\n  flex-shrink: 0;\n}\n.logo-link {\n  display: flex;\n  align-items: center;\n  text-decoration: none;\n}\n.header-logo-img {\n  height: 46px;\n  width: auto;\n  object-fit: contain;\n  transition: transform 0.25s ease;\n}\n.logo-link:hover .header-logo-img {\n  transform: scale(1.05);\n}\n.logo-text {\n  display: flex;\n  flex-direction: column;\n  line-height: 1.2;\n}\n.brand-title {\n  font-family: "Fjalla One", sans-serif;\n  font-size: 1.2rem;\n  color: #0f172a;\n  letter-spacing: 0.5px;\n}\n.brand-slogan {\n  font-family: "Source Sans Pro", sans-serif;\n  font-size: 0.72rem;\n  color: #20b038;\n  font-style: italic;\n  font-weight: 700;\n}\n.header-right {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  flex-shrink: 0;\n}\n.user-area {\n  display: flex;\n  align-items: center;\n  gap: 0.7rem;\n  background: #f5faf6;\n  border: 1px solid #dcebe0;\n  border-radius: 12px;\n  padding: 0.3rem 0.55rem 0.3rem 0.4rem;\n  transition: border-color 0.2s ease, box-shadow 0.2s ease;\n}\n.user-area:hover {\n  border-color: #8bd39a;\n  box-shadow: 0 0 0 3px rgba(32, 176, 56, 0.09);\n}\n.user-profile-link {\n  display: flex;\n  align-items: center;\n  gap: 0.7rem;\n  text-decoration: none;\n  color: inherit;\n}\n.user-avatar {\n  width: 34px;\n  height: 34px;\n  background:\n    linear-gradient(\n      135deg,\n      #15803d,\n      #20b038);\n  color: white;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: 1rem;\n  flex-shrink: 0;\n}\n.user-info {\n  display: flex;\n  flex-direction: column;\n  line-height: 1.2;\n}\n.user-name {\n  font-weight: 700;\n  font-size: 0.88rem;\n  color: #0f172a;\n}\n.user-role {\n  font-size: 0.62rem;\n  color: #94a3b8;\n  text-transform: uppercase;\n  letter-spacing: 0.3px;\n}\n.logout-btn {\n  background: transparent;\n  border: none;\n  color: #94a3b8;\n  padding: 0.45rem;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all 0.2s;\n  display: flex;\n  align-items: center;\n}\n.logout-btn:hover {\n  color: #ef4444;\n  background: #fef2f2;\n  transform: scale(1.1);\n}\n.logout-btn:focus-visible {\n  outline: 2px solid #20b038;\n  outline-offset: 2px;\n}\n.logout-btn svg {\n  stroke: currentColor;\n}\n.theme-toggle {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n  height: 40px;\n  flex-shrink: 0;\n  background: var(--surface-subtle);\n  border: 1px solid var(--border-color);\n  border-radius: 10px;\n  color: var(--text-silver);\n  cursor: pointer;\n  transition:\n    background-color 0.2s ease,\n    border-color 0.2s ease,\n    color 0.2s ease,\n    transform 0.2s ease;\n  position: relative;\n}\n.theme-toggle:hover {\n  background: var(--surface-hover);\n  border-color: var(--accent-green);\n  color: var(--accent-green);\n  transform: scale(1.08);\n}\n.theme-toggle:focus-visible {\n  outline: 2px solid var(--accent-green);\n  outline-offset: 2px;\n}\n.theme-toggle svg {\n  stroke: currentColor;\n  position: absolute;\n  transition: opacity 0.25s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);\n}\n.theme-toggle .icon-moon {\n  opacity: 1;\n  transform: rotate(0deg) scale(1);\n}\n.theme-toggle .icon-sun {\n  opacity: 0;\n  transform: rotate(-90deg) scale(0.6);\n}\n:host-context(html[data-theme="dark"]) .theme-toggle .icon-moon {\n  opacity: 0;\n  transform: rotate(90deg) scale(0.6);\n}\n:host-context(html[data-theme="dark"]) .theme-toggle .icon-sun {\n  opacity: 1;\n  transform: rotate(0deg) scale(1);\n}\n.theme-toggle {\n  width: 38px;\n  height: 38px;\n}\n@media (max-width: 768px) {\n  .app-header {\n    padding: 0.55rem 1rem;\n  }\n  .header-logo-img {\n    height: 38px;\n  }\n  .brand-title {\n    font-size: 0.98rem;\n  }\n  .brand-slogan {\n    font-size: 0.6rem;\n  }\n  .user-avatar {\n    width: 28px;\n    height: 28px;\n    font-size: 0.8rem;\n  }\n  .user-name {\n    font-size: 0.78rem;\n  }\n  .user-role {\n    font-size: 0.55rem;\n  }\n  .logout-btn {\n    width: 40px;\n    height: 40px;\n    padding: 0;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n  }\n}\n@media (max-width: 480px) {\n  .brand-slogan,\n  .user-info {\n    display: none;\n  }\n  .app-header {\n    padding: 0.45rem 0.7rem;\n  }\n  .header-logo-img {\n    height: 30px;\n  }\n  .brand-title {\n    font-size: 0.9rem;\n  }\n}\n.mobile-bottom-nav {\n  display: none;\n}\n@media (max-width: 768px) {\n  .mobile-bottom-nav {\n    display: flex;\n    align-items: flex-end;\n    justify-content: space-around;\n    position: fixed;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    z-index: 990;\n    min-height: calc(60px + env(safe-area-inset-bottom, 0px));\n    padding: 0 0.5rem env(safe-area-inset-bottom, 0px);\n    background: rgba(255, 255, 255, 0.94);\n    -webkit-backdrop-filter: blur(14px);\n    backdrop-filter: blur(14px);\n    border-top: 1px solid #e2e8f0;\n    box-shadow: 0 -6px 20px rgba(15, 23, 42, 0.07);\n    box-sizing: border-box;\n    user-select: none;\n    -webkit-user-select: none;\n  }\n  .mobile-bottom-nav .nav-item {\n    flex: 1 1 0;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    gap: 0.15rem;\n    min-height: 52px;\n    padding: 0.35rem 0.25rem 0.3rem;\n    border-radius: 12px;\n    text-decoration: none;\n    color: #94a3b8;\n    font-size: 0.62rem;\n    font-weight: 700;\n    letter-spacing: 0.3px;\n    -webkit-tap-highlight-color: transparent;\n    transition:\n      color 0.2s ease,\n      background-color 0.2s ease,\n      transform 0.2s ease;\n  }\n  .mobile-bottom-nav .nav-item svg {\n    stroke: currentColor;\n    flex-shrink: 0;\n  }\n  .mobile-bottom-nav .nav-item.active {\n    color: #15803d;\n    background: rgba(32, 176, 56, 0.08);\n  }\n  .mobile-bottom-nav .nav-item:active {\n    transform: scale(0.94);\n  }\n  .mobile-bottom-nav .nav-item:focus-visible {\n    outline: 2px solid #20b038;\n    outline-offset: 2px;\n  }\n  .mobile-bottom-nav .nav-item-cta {\n    flex: 0 1 auto;\n    min-width: 88px;\n    padding: 0;\n  }\n  .mobile-bottom-nav .cta-bubble {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 52px;\n    height: 52px;\n    margin-top: -20px;\n    border-radius: 50%;\n    color: #ffffff;\n    background:\n      linear-gradient(\n        135deg,\n        #15803d 0%,\n        #20b038 100%);\n    box-shadow: 0 6px 16px rgba(32, 176, 56, 0.42);\n    transition: transform 0.2s ease, box-shadow 0.2s ease;\n  }\n  .mobile-bottom-nav .nav-item-cta:active .cta-bubble {\n    transform: scale(0.92);\n  }\n  .mobile-bottom-nav .nav-item-cta.active .cta-bubble {\n    box-shadow: 0 0 0 4px rgba(32, 176, 56, 0.18), 0 6px 16px rgba(32, 176, 56, 0.42);\n  }\n}\n:host-context(html[data-theme="dark"]) .mobile-bottom-nav {\n  background: rgba(18, 30, 33, 0.94);\n  border-top-color: #304348;\n  box-shadow: 0 -6px 20px rgba(0, 0, 0, 0.5);\n}\n:host-context(html[data-theme="dark"]) .mobile-bottom-nav .nav-item {\n  color: #9fb4ae;\n}\n:host-context(html[data-theme="dark"]) .mobile-bottom-nav .nav-item.active {\n  color: #4ade80;\n  background: rgba(34, 197, 94, 0.12);\n}\n/*# sourceMappingURL=header.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HeaderComponent, { className: "HeaderComponent", filePath: "src/app/components/header/header.component.ts", lineNumber: 14 });
})();

// src/app/app.ts
var _forTrack0 = ($index, $item) => $item.id;
function App_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-header");
  }
}
function App_Conditional_2_For_2_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r2.actionLabel);
  }
}
function App_Conditional_2_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275listener("click", function App_Conditional_2_For_2_Template_div_click_0_listener() {
      const t_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.handleToast(t_r2));
    });
    \u0275\u0275elementStart(1, "span", 3);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 4);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, App_Conditional_2_For_2_Conditional_5_Template, 2, 1, "span", 5);
    \u0275\u0275elementStart(6, "button", 6);
    \u0275\u0275listener("click", function App_Conditional_2_For_2_Template_button_click_6_listener($event) {
      const t_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      ctx_r2.toastService.dismiss(t_r2.id);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275text(7, "\xD7");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r2 = ctx.$implicit;
    \u0275\u0275classMap("toast-" + t_r2.type);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r2.type === "success" ? "\u2713" : t_r2.type === "error" ? "\u2715" : "\u2139");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r2.message);
    \u0275\u0275advance();
    \u0275\u0275conditional(t_r2.actionLabel ? 5 : -1);
  }
}
function App_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275repeaterCreate(1, App_Conditional_2_For_2_Template, 8, 5, "div", 1, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.toastService.toasts());
  }
}
var App = class _App {
  constructor(router) {
    this.router = router;
  }
  router;
  toastService = inject(ToastService);
  isAdminRoute() {
    return this.router.url.startsWith("/admin");
  }
  handleToast(t) {
    if (t.action)
      t.action();
    this.toastService.dismiss(t.id);
  }
  static \u0275fac = function App_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _App)(\u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _App, selectors: [["app-root"]], decls: 3, vars: 2, consts: [["aria-live", "polite", 1, "toast-host"], [1, "toast", 3, "class"], [1, "toast", 3, "click"], [1, "toast-icon"], [1, "toast-msg"], [1, "toast-action"], ["aria-label", "Cerrar", 1, "toast-close", 3, "click"]], template: function App_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, App_Conditional_0_Template, 1, 0, "app-header");
      \u0275\u0275element(1, "router-outlet");
      \u0275\u0275conditionalCreate(2, App_Conditional_2_Template, 3, 0, "div", 0);
    }
    if (rf & 2) {
      \u0275\u0275conditional(!ctx.isAdminRoute() ? 0 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.isAdminRoute() && ctx.toastService.toasts().length ? 2 : -1);
    }
  }, dependencies: [RouterOutlet, HeaderComponent], styles: ["\n.app-layout[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n}\n.main-content[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 1.5rem 1.5rem 3rem 1.5rem;\n}\n.container[_ngcontent-%COMP%] {\n  max-width: 1400px;\n  margin: 0 auto;\n  position: relative;\n}\n.cotizador-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(340px, 400px) 1fr;\n  gap: 1.5rem;\n  align-items: start;\n}\n.sidebar-col[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.results-col[_ngcontent-%COMP%] {\n  width: 100%;\n  min-width: 0;\n}\n.toast-notification[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 24px;\n  right: 24px;\n  background:\n    linear-gradient(\n      135deg,\n      var(--%NS%accent-green-dark) 0%,\n      var(--%NS%accent-green) 100%);\n  color: var(--%NS%text-on-accent);\n  padding: 0.85rem 1.5rem;\n  border-radius: 12px;\n  font-weight: 700;\n  font-size: 0.9rem;\n  box-shadow: 0 10px 25px rgba(32, 176, 56, 0.35);\n  z-index: 1000;\n  animation: _ngcontent-%COMP%_slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);\n}\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    transform: translateY(20px);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n@media (max-width: 1100px) {\n  .cotizador-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .main-content[_ngcontent-%COMP%] {\n    padding: 1rem 1rem 2rem 1rem;\n  }\n}\n@media (max-width: 600px) {\n  .toast-notification[_ngcontent-%COMP%] {\n    left: 1rem;\n    right: 1rem;\n    bottom: 14px;\n    width: auto;\n    max-width: none;\n    padding: 0.8rem 1rem;\n    font-size: 0.85rem;\n    text-align: center;\n  }\n}\n.toast-host[_ngcontent-%COMP%] {\n  position: fixed;\n  z-index: 4000;\n  right: 1.1rem;\n  bottom: 1.1rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.6rem;\n  max-width: 400px;\n}\n.toast[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  padding: 0.75rem 0.9rem;\n  border-radius: 12px;\n  background: var(--%NS%text-main);\n  color: var(--%NS%surface-card);\n  font-size: 0.86rem;\n  box-shadow: 0 16px 34px -10px rgba(15, 23, 42, 0.35);\n  animation: _ngcontent-%COMP%_toastIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);\n  cursor: pointer;\n}\n@keyframes _ngcontent-%COMP%_toastIn {\n  from {\n    opacity: 0;\n    transform: translateY(14px) scale(0.97);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n.toast-success[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #14532d,\n      var(--%NS%accent-green-dark));\n}\n.toast-error[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #7f1d1d,\n      var(--%NS%danger));\n}\n.toast-info[_ngcontent-%COMP%] {\n  background: var(--%NS%text-main);\n}\n.toast-icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 22px;\n  height: 22px;\n  flex-shrink: 0;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, 0.18);\n  font-size: 0.75rem;\n  font-weight: 800;\n}\n.toast-msg[_ngcontent-%COMP%] {\n  flex: 1;\n  line-height: 1.35;\n}\n.toast-action[_ngcontent-%COMP%] {\n  padding: 0.28rem 0.65rem;\n  border-radius: 8px;\n  background: var(--%NS%surface-card);\n  color: var(--%NS%accent-green-dark);\n  font-size: 0.75rem;\n  font-weight: 800;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  white-space: nowrap;\n}\n.toast-close[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 22px;\n  height: 22px;\n  border: 0;\n  border-radius: 50%;\n  background: transparent;\n  color: rgba(255, 255, 255, 0.75);\n  font-size: 1rem;\n  cursor: pointer;\n}\n.toast-close[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.15);\n  color: var(--%NS%surface-card);\n}\n@media (max-width: 600px) {\n  .toast-host[_ngcontent-%COMP%] {\n    right: 0.7rem;\n    bottom: 0.7rem;\n    left: 0.7rem;\n  }\n}\n/*# sourceMappingURL=app.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(App, [{
    type: Component,
    args: [{ selector: "app-root", standalone: true, imports: [RouterOutlet, HeaderComponent], template: `@if (!isAdminRoute()) {
	<app-header />
}
<router-outlet />
@if (!isAdminRoute() && toastService.toasts().length) {
	<div class="toast-host" aria-live="polite">
		@for (t of toastService.toasts(); track t.id) {
			<div class="toast" [class]="'toast-' + t.type" (click)="handleToast(t)">
				<span class="toast-icon">{{ t.type === 'success' ? '\u2713' : t.type === 'error' ? '\u2715' : '\u2139' }}</span>
				<span class="toast-msg">{{ t.message }}</span>
				@if (t.actionLabel) {
					<span class="toast-action">{{ t.actionLabel }}</span>
				}
				<button class="toast-close" (click)="toastService.dismiss(t.id); $event.stopPropagation()"
					aria-label="Cerrar">\xD7</button>
			</div>
		}
	</div>
}`, styles: ["/* src/app/app.css */\n.app-layout {\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n}\n.main-content {\n  flex: 1;\n  padding: 1.5rem 1.5rem 3rem 1.5rem;\n}\n.container {\n  max-width: 1400px;\n  margin: 0 auto;\n  position: relative;\n}\n.cotizador-grid {\n  display: grid;\n  grid-template-columns: minmax(340px, 400px) 1fr;\n  gap: 1.5rem;\n  align-items: start;\n}\n.sidebar-col {\n  width: 100%;\n}\n.results-col {\n  width: 100%;\n  min-width: 0;\n}\n.toast-notification {\n  position: fixed;\n  bottom: 24px;\n  right: 24px;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-green-dark) 0%,\n      var(--accent-green) 100%);\n  color: var(--text-on-accent);\n  padding: 0.85rem 1.5rem;\n  border-radius: 12px;\n  font-weight: 700;\n  font-size: 0.9rem;\n  box-shadow: 0 10px 25px rgba(32, 176, 56, 0.35);\n  z-index: 1000;\n  animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);\n}\n@keyframes slideUp {\n  from {\n    transform: translateY(20px);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n@media (max-width: 1100px) {\n  .cotizador-grid {\n    grid-template-columns: 1fr;\n  }\n  .main-content {\n    padding: 1rem 1rem 2rem 1rem;\n  }\n}\n@media (max-width: 600px) {\n  .toast-notification {\n    left: 1rem;\n    right: 1rem;\n    bottom: 14px;\n    width: auto;\n    max-width: none;\n    padding: 0.8rem 1rem;\n    font-size: 0.85rem;\n    text-align: center;\n  }\n}\n.toast-host {\n  position: fixed;\n  z-index: 4000;\n  right: 1.1rem;\n  bottom: 1.1rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.6rem;\n  max-width: 400px;\n}\n.toast {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  padding: 0.75rem 0.9rem;\n  border-radius: 12px;\n  background: var(--text-main);\n  color: var(--surface-card);\n  font-size: 0.86rem;\n  box-shadow: 0 16px 34px -10px rgba(15, 23, 42, 0.35);\n  animation: toastIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);\n  cursor: pointer;\n}\n@keyframes toastIn {\n  from {\n    opacity: 0;\n    transform: translateY(14px) scale(0.97);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n.toast-success {\n  background:\n    linear-gradient(\n      135deg,\n      #14532d,\n      var(--accent-green-dark));\n}\n.toast-error {\n  background:\n    linear-gradient(\n      135deg,\n      #7f1d1d,\n      var(--danger));\n}\n.toast-info {\n  background: var(--text-main);\n}\n.toast-icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 22px;\n  height: 22px;\n  flex-shrink: 0;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, 0.18);\n  font-size: 0.75rem;\n  font-weight: 800;\n}\n.toast-msg {\n  flex: 1;\n  line-height: 1.35;\n}\n.toast-action {\n  padding: 0.28rem 0.65rem;\n  border-radius: 8px;\n  background: var(--surface-card);\n  color: var(--accent-green-dark);\n  font-size: 0.75rem;\n  font-weight: 800;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  white-space: nowrap;\n}\n.toast-close {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 22px;\n  height: 22px;\n  border: 0;\n  border-radius: 50%;\n  background: transparent;\n  color: rgba(255, 255, 255, 0.75);\n  font-size: 1rem;\n  cursor: pointer;\n}\n.toast-close:hover {\n  background: rgba(255, 255, 255, 0.15);\n  color: var(--surface-card);\n}\n@media (max-width: 600px) {\n  .toast-host {\n    right: 0.7rem;\n    bottom: 0.7rem;\n    left: 0.7rem;\n  }\n}\n/*# sourceMappingURL=app.css.map */\n"] }]
  }], () => [{ type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(App, { className: "App", filePath: "src/app/app.ts", lineNumber: 13 });
})();

// src/main.ts
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
//# debugId=27ba52b5-5ceb-5271-8a4f-f1aed6b0725e
//# sourceMappingURL=main.js.map
