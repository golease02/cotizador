import {
  ThemeService
} from "./chunk-WDXLETH5.js";
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet
} from "./chunk-UUNAMTTY.js";
import {
  AuthService
} from "./chunk-XCV63D25.js";
import {
  CommonModule,
  Component,
  NgIf,
  filter,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
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
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-6KRTW2LJ.js";
import "./chunk-FDMHZOCR.js";

// src/app/components/admin/admin-dashboard/admin-dashboard.ts
var _c0 = () => ({ exact: true });
function AdminDashboardComponent_button_140_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 94);
    \u0275\u0275listener("click", function AdminDashboardComponent_button_140_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeSidebar());
    });
    \u0275\u0275elementEnd();
  }
}
var AdminDashboardComponent = class _AdminDashboardComponent {
  auth = inject(AuthService);
  theme = inject(ThemeService);
  router = inject(Router);
  routerEventsSub;
  sidebarOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "sidebarOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    this.routerEventsSub = this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => this.sidebarOpen.set(false));
  }
  ngOnDestroy() {
    this.routerEventsSub?.unsubscribe();
  }
  toggleSidebar() {
    this.sidebarOpen.update((open) => !open);
  }
  closeSidebar() {
    this.sidebarOpen.set(false);
  }
  toggleTheme() {
    this.theme.toggle();
  }
  async logout() {
    await this.auth.signOut();
    this.router.navigate(["/login"]);
  }
  static \u0275fac = function AdminDashboardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminDashboardComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminDashboardComponent, selectors: [["app-admin-dashboard"]], decls: 143, vars: 12, consts: [[1, "admin-layout"], [1, "admin-mobile-topbar"], ["type", "button", "aria-label", "Abrir men\xFA de navegaci\xF3n", "title", "Men\xFA", 1, "menu-toggle", 3, "click"], ["width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M3 12h18"], ["d", "M3 6h18"], ["d", "M3 18h18"], [1, "mobile-topbar-title"], [1, "mobile-brand"], [1, "mobile-subtitle"], ["type", "button", 1, "theme-toggle", 3, "click", "title"], ["width", "19", "height", "19", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round", 1, "icon-sun"], ["cx", "12", "cy", "12", "r", "4"], ["d", "M12 2v2"], ["d", "M12 20v2"], ["d", "m4.93 4.93 1.41 1.41"], ["d", "m17.66 17.66 1.41 1.41"], ["d", "M2 12h2"], ["d", "M20 12h2"], ["d", "m6.34 17.66-1.41 1.41"], ["d", "m19.07 4.93-1.41 1.41"], ["width", "19", "height", "19", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round", 1, "icon-moon"], ["d", "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"], [1, "admin-sidebar"], [1, "sidebar-header"], [1, "sidebar-logo"], [1, "logo-mark"], [1, "logo-text"], [1, "logo-title"], [1, "logo-subtitle"], ["type", "button", "aria-label", "Cerrar men\xFA", "title", "Cerrar", 1, "drawer-close", 3, "click"], ["d", "M18 6 6 18"], ["d", "m6 6 12 12"], [1, "nav-section-label"], ["routerLink", "/admin", "routerLinkActive", "active", 3, "routerLinkActiveOptions"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["x", "3", "y", "3", "width", "7", "height", "7"], ["x", "14", "y", "3", "width", "7", "height", "7"], ["x", "14", "y", "14", "width", "7", "height", "7"], ["x", "3", "y", "14", "width", "7", "height", "7"], ["routerLink", "/admin/sellers", "routerLinkActive", "active"], ["d", "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"], ["cx", "9", "cy", "7", "r", "4"], ["d", "M23 21v-2a4 4 0 0 0-3-3.87"], ["d", "M16 3.13a4 4 0 0 1 0 7.75"], ["routerLink", "/admin/admins", "routerLinkActive", "active"], ["d", "M12 2 2 7l10 5 10-5-10-5z"], ["d", "M2 17l10 5 10-5"], ["d", "M2 12l10 5 10-5"], ["routerLink", "/admin/quotes", "routerLinkActive", "active"], ["d", "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"], ["points", "14 2 14 8 20 8"], ["x1", "16", "y1", "13", "x2", "8", "y2", "13"], ["x1", "16", "y1", "17", "x2", "8", "y2", "17"], ["routerLink", "/admin/vehicles", "routerLinkActive", "active"], ["d", "M5 17h14"], ["d", "M7 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"], ["d", "M21 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"], ["d", "M17 17H7"], ["d", "M2 12 4 6h16l2 6"], ["d", "M2 12h20v3h-2"], ["routerLink", "/admin/plates", "routerLinkActive", "active"], ["x", "2", "y", "7", "width", "20", "height", "10", "rx", "2"], ["x1", "6", "y1", "11", "x2", "18", "y2", "11"], ["cx", "6", "cy", "14", "r", "0.5"], ["cx", "9", "cy", "14", "r", "0.5"], ["cx", "12", "cy", "14", "r", "0.5"], ["cx", "15", "cy", "14", "r", "0.5"], ["cx", "18", "cy", "14", "r", "0.5"], ["routerLink", "/admin/parameters", "routerLinkActive", "active"], ["cx", "12", "cy", "12", "r", "3"], ["d", "M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-1.8 1.8-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V22h-2.55v-.1a1.7 1.7 0 0 0-1.03-1.56 1.7 1.7 0 0 0-1.88.34l-.06.06-1.8-1.8.06-.06A1.7 1.7 0 0 0 8.1 17a1.7 1.7 0 0 0-1.56-1.03H6.45v-2.55h.1A1.7 1.7 0 0 0 8.1 12a1.7 1.7 0 0 0-.34-1.88L7.7 10.06l1.8-1.8.06.06a1.7 1.7 0 0 0 1.88.34 1.7 1.7 0 0 0 1.03-1.56V7h2.55v.1a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.88-.34l.06-.06 1.8 1.8-.06.06A1.7 1.7 0 0 0 19.4 12a1.7 1.7 0 0 0 1.56 1.03h.1v2.55h-.1A1.7 1.7 0 0 0 19.4 15Z"], [1, "sidebar-footer"], [1, "sidebar-user"], ["routerLink", "/perfil", "routerLinkActive", "active", "title", "Ver mi perfil", "aria-label", "Ver mi perfil", 1, "sidebar-user-link"], [1, "user-avatar"], [1, "user-info"], [1, "user-name"], [1, "user-role"], ["width", "17", "height", "17", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round", 1, "icon-sun"], ["width", "17", "height", "17", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round", 1, "icon-moon"], ["type", "button", "title", "Cerrar sesi\xF3n", "aria-label", "Cerrar sesi\xF3n", 1, "logout-btn", 3, "click"], ["width", "17", "height", "17", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"], ["points", "16 17 21 12 16 7"], ["x1", "21", "y1", "12", "x2", "9", "y2", "12"], ["routerLink", "/", 1, "back-link"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["x1", "19", "y1", "12", "x2", "5", "y2", "12"], ["points", "12 19 5 12 12 5"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round", 1, "back-arrow"], ["points", "9 18 15 12 9 6"], ["class", "sidebar-overlay", "aria-label", "Cerrar men\xFA", 3, "click", 4, "ngIf"], [1, "admin-content"], ["aria-label", "Cerrar men\xFA", 1, "sidebar-overlay", 3, "click"]], template: function AdminDashboardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "button", 2);
      \u0275\u0275listener("click", function AdminDashboardComponent_Template_button_click_2_listener() {
        return ctx.toggleSidebar();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(3, "svg", 3);
      \u0275\u0275element(4, "path", 4)(5, "path", 5)(6, "path", 6);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(7, "div", 7)(8, "span", 8);
      \u0275\u0275text(9, "Go Lease");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "span", 9);
      \u0275\u0275text(11, "Panel Admin");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "button", 10);
      \u0275\u0275listener("click", function AdminDashboardComponent_Template_button_click_12_listener() {
        return ctx.toggleTheme();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(13, "svg", 11);
      \u0275\u0275element(14, "circle", 12)(15, "path", 13)(16, "path", 14)(17, "path", 15)(18, "path", 16)(19, "path", 17)(20, "path", 18)(21, "path", 19)(22, "path", 20);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "svg", 21);
      \u0275\u0275element(24, "path", 22);
      \u0275\u0275elementEnd()()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(25, "aside", 23)(26, "div", 24)(27, "div", 25)(28, "span", 26);
      \u0275\u0275text(29, "GL");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "div", 27)(31, "span", 28);
      \u0275\u0275text(32, "Go Lease");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "span", 29);
      \u0275\u0275text(34, "Panel Admin");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(35, "button", 30);
      \u0275\u0275listener("click", function AdminDashboardComponent_Template_button_click_35_listener() {
        return ctx.closeSidebar();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(36, "svg", 3);
      \u0275\u0275element(37, "path", 31)(38, "path", 32);
      \u0275\u0275elementEnd()()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(39, "nav")(40, "span", 33);
      \u0275\u0275text(41, "General");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "ul")(43, "li")(44, "a", 34);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(45, "svg", 35);
      \u0275\u0275element(46, "rect", 36)(47, "rect", 37)(48, "rect", 38)(49, "rect", 39);
      \u0275\u0275elementEnd();
      \u0275\u0275text(50, " Dashboard ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(51, "span", 33);
      \u0275\u0275text(52, "Gesti\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(53, "ul")(54, "li")(55, "a", 40);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(56, "svg", 35);
      \u0275\u0275element(57, "path", 41)(58, "circle", 42)(59, "path", 43)(60, "path", 44);
      \u0275\u0275elementEnd();
      \u0275\u0275text(61, " Vendedores ");
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(62, "li")(63, "a", 45);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(64, "svg", 35);
      \u0275\u0275element(65, "path", 46)(66, "path", 47)(67, "path", 48);
      \u0275\u0275elementEnd();
      \u0275\u0275text(68, " Administradores ");
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(69, "li")(70, "a", 49);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(71, "svg", 35);
      \u0275\u0275element(72, "path", 50)(73, "polyline", 51)(74, "line", 52)(75, "line", 53);
      \u0275\u0275elementEnd();
      \u0275\u0275text(76, " Cotizaciones ");
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(77, "li")(78, "a", 54);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(79, "svg", 35);
      \u0275\u0275element(80, "path", 55)(81, "path", 56)(82, "path", 57)(83, "path", 58)(84, "path", 59)(85, "path", 60);
      \u0275\u0275elementEnd();
      \u0275\u0275text(86, " Veh\xEDculos ");
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(87, "li")(88, "a", 61);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(89, "svg", 35);
      \u0275\u0275element(90, "rect", 62)(91, "line", 63)(92, "circle", 64)(93, "circle", 65)(94, "circle", 66)(95, "circle", 67)(96, "circle", 68);
      \u0275\u0275elementEnd();
      \u0275\u0275text(97, " Placas de Estado ");
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(98, "li")(99, "a", 69);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(100, "svg", 35);
      \u0275\u0275element(101, "circle", 70)(102, "path", 71);
      \u0275\u0275elementEnd();
      \u0275\u0275text(103, " Par\xE1metros del cotizador ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(104, "div", 72)(105, "div", 73)(106, "a", 74)(107, "span", 75);
      \u0275\u0275text(108);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(109, "div", 76)(110, "span", 77);
      \u0275\u0275text(111);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(112, "span", 78);
      \u0275\u0275text(113, "Administrador");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(114, "button", 10);
      \u0275\u0275listener("click", function AdminDashboardComponent_Template_button_click_114_listener() {
        return ctx.toggleTheme();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(115, "svg", 79);
      \u0275\u0275element(116, "circle", 12)(117, "path", 13)(118, "path", 14)(119, "path", 15)(120, "path", 16)(121, "path", 17)(122, "path", 18)(123, "path", 19)(124, "path", 20);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(125, "svg", 80);
      \u0275\u0275element(126, "path", 22);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(127, "button", 81);
      \u0275\u0275listener("click", function AdminDashboardComponent_Template_button_click_127_listener() {
        return ctx.logout();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(128, "svg", 82);
      \u0275\u0275element(129, "path", 83)(130, "polyline", 84)(131, "line", 85);
      \u0275\u0275elementEnd()()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(132, "a", 86);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(133, "svg", 87);
      \u0275\u0275element(134, "line", 88)(135, "polyline", 89);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(136, "span");
      \u0275\u0275text(137, "Volver al Cotizador");
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(138, "svg", 90);
      \u0275\u0275element(139, "polyline", 91);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275template(140, AdminDashboardComponent_button_140_Template, 1, 0, "button", 92);
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(141, "main", 93);
      \u0275\u0275element(142, "router-outlet");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275attribute("aria-expanded", ctx.sidebarOpen());
      \u0275\u0275advance(10);
      \u0275\u0275property("title", ctx.theme.theme() === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
      \u0275\u0275attribute("aria-label", ctx.theme.theme() === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
      \u0275\u0275advance(13);
      \u0275\u0275classProp("sidebar-open", ctx.sidebarOpen());
      \u0275\u0275advance(19);
      \u0275\u0275property("routerLinkActiveOptions", \u0275\u0275pureFunction0(11, _c0));
      \u0275\u0275advance(64);
      \u0275\u0275textInterpolate((ctx.auth.currentProfile()?.full_name || "A").charAt(0).toUpperCase());
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.auth.currentProfile()?.full_name || "Administrador");
      \u0275\u0275advance(3);
      \u0275\u0275property("title", ctx.theme.theme() === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
      \u0275\u0275attribute("aria-label", ctx.theme.theme() === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
      \u0275\u0275advance(26);
      \u0275\u0275property("ngIf", ctx.sidebarOpen());
    }
  }, dependencies: [CommonModule, NgIf, RouterOutlet, RouterModule, RouterLink, RouterLinkActive], styles: ['\n.admin-layout[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 100vh;\n  background: #f4f6f8;\n}\n.menu-toggle[_ngcontent-%COMP%] {\n  display: none;\n}\n.admin-mobile-topbar[_ngcontent-%COMP%] {\n  display: none;\n}\n.drawer-close[_ngcontent-%COMP%] {\n  display: none;\n}\n.admin-sidebar[_ngcontent-%COMP%] {\n  width: 272px;\n  background: #10251f;\n  color: white;\n  padding: 1.25rem 0.9rem 1rem;\n  position: sticky;\n  top: 0;\n  height: 100vh;\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column;\n  box-sizing: border-box;\n  border-right: 1px solid rgba(255, 255, 255, 0.06);\n  box-shadow: 10px 0 30px rgba(15, 23, 42, 0.08);\n  isolation: isolate;\n}\n.admin-sidebar[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  inset: 0;\n  z-index: -1;\n  pointer-events: none;\n  opacity: 0.45;\n  background-image:\n    linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),\n    linear-gradient(\n      90deg,\n      rgba(255, 255, 255, 0.035) 1px,\n      transparent 1px);\n  background-size: 28px 28px;\n  -webkit-mask-image:\n    linear-gradient(\n      to bottom,\n      black,\n      transparent 85%);\n  mask-image:\n    linear-gradient(\n      to bottom,\n      black,\n      transparent 85%);\n}\n.sidebar-header[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n  padding: 0.25rem 0.45rem 1.35rem;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.1);\n}\n.sidebar-logo[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.7rem;\n}\n.logo-mark[_ngcontent-%COMP%] {\n  width: 42px;\n  height: 42px;\n  border-radius: 12px;\n  background:\n    linear-gradient(\n      145deg,\n      #8be28c,\n      #20b038);\n  color: var(--%NS%accent-slate);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: "Fjalla One", sans-serif;\n  font-size: 1.05rem;\n  letter-spacing: 0.4px;\n  flex-shrink: 0;\n  box-shadow: 0 8px 18px rgba(32, 176, 56, 0.2);\n}\n.logo-text[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  line-height: 1.2;\n}\n.logo-title[_ngcontent-%COMP%] {\n  font-family: "Fjalla One", sans-serif;\n  font-size: 1.15rem;\n  color: #ffffff;\n  letter-spacing: 0.5px;\n}\n.logo-subtitle[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  color: #9db6ab;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.nav-section-label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.68rem;\n  font-weight: 700;\n  color: #7fa394;\n  text-transform: uppercase;\n  letter-spacing: 0.6px;\n  margin: 1.35rem 0.75rem 0.55rem;\n}\n.admin-sidebar[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n.admin-sidebar[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin-bottom: 0.3rem;\n}\n.admin-sidebar[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  min-height: 46px;\n  padding: 0.72rem 0.85rem;\n  color: #c6d8d0;\n  text-decoration: none;\n  border: 1px solid transparent;\n  border-radius: 12px;\n  font-size: 0.9rem;\n  font-weight: 600;\n  letter-spacing: 0.1px;\n  transition:\n    background-color 0.2s ease,\n    border-color 0.2s ease,\n    color 0.2s ease,\n    transform 0.2s ease,\n    box-shadow 0.2s ease;\n}\n.admin-sidebar[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  opacity: 0.85;\n}\n.admin-sidebar[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  background: rgba(139, 226, 140, 0.08);\n  border-color: rgba(139, 226, 140, 0.18);\n  color: white;\n  transform: translateX(2px);\n  box-shadow: inset 0 0 0 1px rgba(139, 226, 140, 0.08);\n}\n.admin-sidebar[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%]   a.active[_ngcontent-%COMP%] {\n  position: relative;\n  background:\n    linear-gradient(\n      100deg,\n      rgba(32, 176, 56, 0.28),\n      rgba(32, 176, 56, 0.12));\n  border-color: rgba(139, 226, 140, 0.25);\n  color: white;\n  box-shadow: inset 3px 0 0 #65d66e, 0 10px 18px rgba(0, 0, 0, 0.12);\n}\n.admin-sidebar[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%]   a.active[_ngcontent-%COMP%]::after {\n  content: "";\n  width: 6px;\n  height: 6px;\n  margin-left: auto;\n  border-radius: 50%;\n  background: #8be28c;\n  box-shadow: 0 0 0 4px rgba(139, 226, 140, 0.12);\n}\n.admin-sidebar[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%]   a.active[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.sidebar-footer[_ngcontent-%COMP%] {\n  margin-top: auto;\n  padding-top: 1rem;\n  border-top: 1px solid rgba(255, 255, 255, 0.1);\n}\n.sidebar-user[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n  padding: 0.65rem 0.6rem;\n  margin-bottom: 0.7rem;\n  background: rgba(255, 255, 255, 0.06);\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  border-radius: 11px;\n}\n.sidebar-user[_ngcontent-%COMP%]   .user-avatar[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: 9px;\n  background: #8be28c;\n  color: var(--%NS%accent-slate);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  font-weight: 700;\n}\n.sidebar-user[_ngcontent-%COMP%]   .user-info[_ngcontent-%COMP%] {\n  min-width: 0;\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 0.1rem;\n}\n.sidebar-user-link[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n  min-width: 0;\n  flex: 1;\n  padding: 0.2rem;\n  border-radius: 8px;\n  text-decoration: none;\n  transition: background-color 0.2s ease;\n}\n.sidebar-user-link[_ngcontent-%COMP%]:hover {\n  background: rgba(139, 226, 140, 0.1);\n}\n.sidebar-user-link[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid #8be28c;\n  outline-offset: 2px;\n}\n.sidebar-user-link.active[_ngcontent-%COMP%] {\n  background: rgba(139, 226, 140, 0.14);\n}\n.sidebar-user[_ngcontent-%COMP%]   .user-name[_ngcontent-%COMP%] {\n  overflow: hidden;\n  color: #ffffff;\n  font-size: 0.78rem;\n  font-weight: 700;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.sidebar-user[_ngcontent-%COMP%]   .user-role[_ngcontent-%COMP%] {\n  color: #9db6ab;\n  font-size: 0.62rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.4px;\n}\n.logout-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  margin-left: auto;\n  padding: 0.4rem;\n  border: 0;\n  border-radius: 7px;\n  background: transparent;\n  color: #9db6ab;\n  cursor: pointer;\n  transition: background-color 0.2s ease, color 0.2s ease;\n}\n.logout-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.15);\n  color: #fca5a5;\n}\n.logout-btn[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid #8be28c;\n  outline-offset: 2px;\n}\n.back-link[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  justify-content: flex-start;\n  padding: 0.75rem 0.8rem;\n  border: 1px solid rgba(139, 226, 140, 0.28);\n  border-radius: 10px;\n  background: rgba(32, 176, 56, 0.14);\n  color: #ccebd2;\n  text-decoration: none;\n  font-size: 0.82rem;\n  font-weight: 600;\n  transition:\n    background-color 0.2s ease,\n    border-color 0.2s ease,\n    color 0.2s ease,\n    transform 0.2s ease;\n}\n.back-link[_ngcontent-%COMP%]:hover {\n  color: #ffffff;\n  background: rgba(32, 176, 56, 0.25);\n  border-color: rgba(139, 226, 140, 0.5);\n  transform: translateY(-1px);\n}\n.back-arrow[_ngcontent-%COMP%] {\n  margin-left: auto;\n}\n.admin-sidebar[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:focus-visible, \n.back-link[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid #8be28c;\n  outline-offset: 3px;\n}\n.admin-content[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 2rem;\n  overflow-x: auto;\n  max-width: 100%;\n  box-sizing: border-box;\n}\n@media (max-width: 768px) {\n  .admin-layout[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .admin-mobile-topbar[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 0.75rem;\n    position: sticky;\n    top: 0;\n    z-index: 1090;\n    padding: 0.65rem 1rem;\n    background: #10251f;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.1);\n    box-shadow: 0 8px 20px rgba(15, 23, 42, 0.16);\n  }\n  .mobile-topbar-title[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    line-height: 1.15;\n    min-width: 0;\n  }\n  .mobile-brand[_ngcontent-%COMP%] {\n    font-family: "Fjalla One", sans-serif;\n    font-size: 1.05rem;\n    letter-spacing: 0.5px;\n    color: #ffffff;\n    white-space: nowrap;\n  }\n  .mobile-subtitle[_ngcontent-%COMP%] {\n    font-size: 0.62rem;\n    font-weight: 600;\n    text-transform: uppercase;\n    letter-spacing: 0.5px;\n    color: #9db6ab;\n  }\n  .menu-toggle[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    width: 44px;\n    height: 44px;\n    flex-shrink: 0;\n    background: rgba(255, 255, 255, 0.08);\n    border: 1px solid rgba(255, 255, 255, 0.14);\n    border-radius: 10px;\n    color: #eafdf0;\n    cursor: pointer;\n    transition:\n      background-color 0.2s ease,\n      border-color 0.2s ease,\n      transform 0.2s ease;\n  }\n  .menu-toggle[_ngcontent-%COMP%]:hover {\n    background: rgba(139, 226, 140, 0.16);\n    border-color: rgba(139, 226, 140, 0.4);\n  }\n  .menu-toggle[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid #8be28c;\n    outline-offset: 2px;\n  }\n  .menu-toggle[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n    stroke: currentColor;\n  }\n  .drawer-close[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    width: 44px;\n    height: 44px;\n    flex-shrink: 0;\n    margin-left: auto;\n    background: rgba(255, 255, 255, 0.08);\n    border: 1px solid rgba(255, 255, 255, 0.14);\n    border-radius: 10px;\n    color: #eafdf0;\n    cursor: pointer;\n    transition: background-color 0.2s ease, border-color 0.2s ease;\n  }\n  .drawer-close[_ngcontent-%COMP%]:hover {\n    background: rgba(239, 68, 68, 0.16);\n    border-color: rgba(239, 68, 68, 0.4);\n    color: #fca5a5;\n  }\n  .drawer-close[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid #8be28c;\n    outline-offset: 2px;\n  }\n  .drawer-close[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n    stroke: currentColor;\n  }\n  .admin-sidebar[_ngcontent-%COMP%] {\n    position: fixed;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    width: min(300px, 86vw);\n    height: 100dvh;\n    padding: 1rem 1rem 1.25rem;\n    z-index: 1110;\n    border-right: 1px solid rgba(255, 255, 255, 0.08);\n    box-shadow: 16px 0 40px rgba(15, 23, 42, 0.28);\n    transform: translateX(-100%);\n    visibility: hidden;\n    transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.28s;\n  }\n  .admin-sidebar.sidebar-open[_ngcontent-%COMP%] {\n    transform: translateX(0);\n    visibility: visible;\n  }\n  .sidebar-header[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 0.75rem;\n    margin-bottom: 1rem;\n    padding-bottom: 1rem;\n  }\n  .admin-sidebar[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%] {\n    overflow-y: auto;\n    flex: 1;\n  }\n  .sidebar-footer[_ngcontent-%COMP%] {\n    padding-top: 0.85rem;\n  }\n  .back-link[_ngcontent-%COMP%] {\n    margin-top: 0.55rem;\n  }\n  .sidebar-overlay[_ngcontent-%COMP%] {\n    position: fixed;\n    inset: 0;\n    z-index: 1100;\n    background: rgba(15, 23, 42, 0.55);\n    border: none;\n    cursor: pointer;\n    animation: overlayFade 0.25s ease both;\n  }\n  @keyframes overlayFade {\n    from {\n      opacity: 0;\n    }\n    to {\n      opacity: 1;\n    }\n  }\n  .admin-content[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n}\n.theme-toggle[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 38px;\n  height: 38px;\n  flex-shrink: 0;\n  background: rgba(255, 255, 255, 0.08);\n  border: 1px solid rgba(255, 255, 255, 0.14);\n  border-radius: 10px;\n  color: #c6d8d0;\n  cursor: pointer;\n  transition:\n    background-color 0.2s ease,\n    border-color 0.2s ease,\n    color 0.2s ease,\n    transform 0.2s ease;\n  position: relative;\n}\n.theme-toggle[_ngcontent-%COMP%]:hover {\n  background: rgba(139, 226, 140, 0.16);\n  border-color: rgba(139, 226, 140, 0.4);\n  color: white;\n  transform: scale(1.08);\n}\n.theme-toggle[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid #8be28c;\n  outline-offset: 2px;\n}\n.theme-toggle[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  stroke: currentColor;\n  position: absolute;\n  transition: opacity 0.25s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);\n}\n.theme-toggle[_ngcontent-%COMP%]   .icon-moon[_ngcontent-%COMP%] {\n  opacity: 1;\n  transform: rotate(0deg) scale(1);\n}\n.theme-toggle[_ngcontent-%COMP%]   .icon-sun[_ngcontent-%COMP%] {\n  opacity: 0;\n  transform: rotate(-90deg) scale(0.6);\n}\nhtml[data-theme="dark"][_nghost-%COMP%]   .theme-toggle[_ngcontent-%COMP%]   .icon-moon[_ngcontent-%COMP%], html[data-theme="dark"]   [_nghost-%COMP%]   .theme-toggle[_ngcontent-%COMP%]   .icon-moon[_ngcontent-%COMP%] {\n  opacity: 0;\n  transform: rotate(90deg) scale(0.6);\n}\nhtml[data-theme="dark"][_nghost-%COMP%]   .theme-toggle[_ngcontent-%COMP%]   .icon-sun[_ngcontent-%COMP%], html[data-theme="dark"]   [_nghost-%COMP%]   .theme-toggle[_ngcontent-%COMP%]   .icon-sun[_ngcontent-%COMP%] {\n  opacity: 1;\n  transform: rotate(0deg) scale(1);\n}\nhtml[data-theme="dark"][_nghost-%COMP%]   .admin-layout[_ngcontent-%COMP%], html[data-theme="dark"]   [_nghost-%COMP%]   .admin-layout[_ngcontent-%COMP%] {\n  background: var(--%NS%bg-primary);\n}\nhtml[data-theme="dark"][_nghost-%COMP%]   .admin-sidebar[_ngcontent-%COMP%], html[data-theme="dark"]   [_nghost-%COMP%]   .admin-sidebar[_ngcontent-%COMP%] {\n  background: #0c1a16;\n  border-right-color: rgba(139, 226, 140, 0.12);\n  box-shadow: 10px 0 30px rgba(0, 0, 0, 0.4);\n}\nhtml[data-theme="dark"][_nghost-%COMP%]   .sidebar-header[_ngcontent-%COMP%], html[data-theme="dark"]   [_nghost-%COMP%]   .sidebar-header[_ngcontent-%COMP%] {\n  border-bottom-color: rgba(139, 226, 140, 0.14);\n}\nhtml[data-theme="dark"][_nghost-%COMP%]   .nav-section-label[_ngcontent-%COMP%], html[data-theme="dark"]   [_nghost-%COMP%]   .nav-section-label[_ngcontent-%COMP%] {\n  color: #6f9a86;\n}\nhtml[data-theme="dark"][_nghost-%COMP%]   .logo-subtitle[_ngcontent-%COMP%], html[data-theme="dark"]   [_nghost-%COMP%]   .logo-subtitle[_ngcontent-%COMP%] {\n  color: #7fa897;\n}\nhtml[data-theme="dark"][_nghost-%COMP%]   .admin-mobile-topbar[_ngcontent-%COMP%], html[data-theme="dark"]   [_nghost-%COMP%]   .admin-mobile-topbar[_ngcontent-%COMP%] {\n  background: #0c1a16;\n  border-bottom-color: rgba(139, 226, 140, 0.14);\n}\nhtml[data-theme="dark"][_nghost-%COMP%]   .mobile-brand[_ngcontent-%COMP%], html[data-theme="dark"]   [_nghost-%COMP%]   .mobile-brand[_ngcontent-%COMP%] {\n  color: #eafdf0;\n}\nhtml[data-theme="dark"][_nghost-%COMP%]   .mobile-subtitle[_ngcontent-%COMP%], html[data-theme="dark"]   [_nghost-%COMP%]   .mobile-subtitle[_ngcontent-%COMP%] {\n  color: #7fa897;\n}\nhtml[data-theme="dark"][_nghost-%COMP%]   .menu-toggle[_ngcontent-%COMP%], html[data-theme="dark"]   [_nghost-%COMP%]   .menu-toggle[_ngcontent-%COMP%] {\n  background: rgba(139, 226, 140, 0.1);\n  border-color: rgba(139, 226, 140, 0.2);\n  color: #eafdf0;\n}\nhtml[data-theme="dark"][_nghost-%COMP%]   .menu-toggle[_ngcontent-%COMP%]:hover, html[data-theme="dark"]   [_nghost-%COMP%]   .menu-toggle[_ngcontent-%COMP%]:hover {\n  background: rgba(139, 226, 140, 0.2);\n}\nhtml[data-theme="dark"][_nghost-%COMP%]   .drawer-close[_ngcontent-%COMP%], html[data-theme="dark"]   [_nghost-%COMP%]   .drawer-close[_ngcontent-%COMP%] {\n  background: rgba(139, 226, 140, 0.1);\n  border-color: rgba(139, 226, 140, 0.2);\n  color: #eafdf0;\n}\nhtml[data-theme="dark"][_nghost-%COMP%]   .sidebar-footer[_ngcontent-%COMP%], html[data-theme="dark"]   [_nghost-%COMP%]   .sidebar-footer[_ngcontent-%COMP%] {\n  border-top-color: rgba(139, 226, 140, 0.14);\n}\nhtml[data-theme="dark"][_nghost-%COMP%]   .back-link[_ngcontent-%COMP%], html[data-theme="dark"]   [_nghost-%COMP%]   .back-link[_ngcontent-%COMP%] {\n  color: #9db6ab;\n}\nhtml[data-theme="dark"][_nghost-%COMP%]   .back-link[_ngcontent-%COMP%]:hover, html[data-theme="dark"]   [_nghost-%COMP%]   .back-link[_ngcontent-%COMP%]:hover {\n  color: #8be28c;\n}\nhtml[data-theme="dark"][_nghost-%COMP%]   .sidebar-overlay[_ngcontent-%COMP%], html[data-theme="dark"]   [_nghost-%COMP%]   .sidebar-overlay[_ngcontent-%COMP%] {\n  background: rgba(0, 0, 0, 0.65);\n}\nhtml[data-theme="dark"][_nghost-%COMP%]   .back-link[_ngcontent-%COMP%], html[data-theme="dark"]   [_nghost-%COMP%]   .back-link[_ngcontent-%COMP%] {\n  background: rgba(139, 226, 140, 0.14);\n  border-color: rgba(139, 226, 140, 0.4);\n  color: #d9ede0;\n}\nhtml[data-theme="dark"][_nghost-%COMP%]   .back-link[_ngcontent-%COMP%]:hover, html[data-theme="dark"]   [_nghost-%COMP%]   .back-link[_ngcontent-%COMP%]:hover {\n  background: rgba(139, 226, 140, 0.26);\n  color: #ffffff;\n}\n/*# sourceMappingURL=admin-dashboard.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminDashboardComponent, [{
    type: Component,
    args: [{ selector: "app-admin-dashboard", standalone: true, imports: [CommonModule, RouterOutlet, RouterModule], template: `<div class="admin-layout">
    <div class="admin-mobile-topbar">
        <button class="menu-toggle" type="button" (click)="toggleSidebar()"
            [attr.aria-expanded]="sidebarOpen()" aria-label="Abrir men\xFA de navegaci\xF3n" title="Men\xFA">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 12h18"></path>
                <path d="M3 6h18"></path>
                <path d="M3 18h18"></path>
            </svg>
        </button>
        <div class="mobile-topbar-title">
            <span class="mobile-brand">Go Lease</span>
            <span class="mobile-subtitle">Panel Admin</span>
        </div>
        <button class="theme-toggle" type="button" (click)="toggleTheme()"
            [attr.aria-label]="theme.theme() === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
            [title]="theme.theme() === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'">
            <svg class="icon-sun" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path><path d="M12 20v2"></path>
                <path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path>
                <path d="M2 12h2"></path><path d="M20 12h2"></path>
                <path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path>
            </svg>
            <svg class="icon-moon" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            </svg>
        </button>
    </div>

    <aside class="admin-sidebar" [class.sidebar-open]="sidebarOpen()">
        <div class="sidebar-header">
            <div class="sidebar-logo">
                <span class="logo-mark">GL</span>
                <div class="logo-text">
                    <span class="logo-title">Go Lease</span>
                    <span class="logo-subtitle">Panel Admin</span>
                </div>
            </div>
            <button class="drawer-close" type="button" (click)="closeSidebar()" aria-label="Cerrar men\xFA" title="Cerrar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                </svg>
            </button>
        </div>

        <nav>
            <span class="nav-section-label">General</span>
            <ul>
                <li>
                    <a routerLink="/admin" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="3" y="3" width="7" height="7"></rect>
                            <rect x="14" y="3" width="7" height="7"></rect>
                            <rect x="14" y="14" width="7" height="7"></rect>
                            <rect x="3" y="14" width="7" height="7"></rect>
                        </svg>
                        Dashboard
                    </a>
                </li>
            </ul>

            <span class="nav-section-label">Gesti\xF3n</span>
            <ul>
                <li>
                    <a routerLink="/admin/sellers" routerLinkActive="active">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                        Vendedores
                    </a>
                </li>
                <li>
                    <a routerLink="/admin/admins" routerLinkActive="active">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 2 2 7l10 5 10-5-10-5z"></path>
                            <path d="M2 17l10 5 10-5"></path>
                            <path d="M2 12l10 5 10-5"></path>
                        </svg>
                        Administradores
                    </a>
                </li>
                <li>
                    <a routerLink="/admin/quotes" routerLinkActive="active">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                        </svg>
                        Cotizaciones
                    </a>
                </li>
                <li>
                    <a routerLink="/admin/vehicles" routerLinkActive="active">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M5 17h14"></path>
                            <path d="M7 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"></path>
                            <path d="M21 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"></path>
                            <path d="M17 17H7"></path>
                            <path d="M2 12 4 6h16l2 6"></path>
                            <path d="M2 12h20v3h-2"></path>
                        </svg>
                        Veh\xEDculos
                    </a>
                </li>
                <li>
                    <a routerLink="/admin/plates" routerLinkActive="active">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="2" y="7" width="20" height="10" rx="2"></rect>
                            <line x1="6" y1="11" x2="18" y2="11"></line>
                            <circle cx="6" cy="14" r="0.5"></circle>
                            <circle cx="9" cy="14" r="0.5"></circle>
                            <circle cx="12" cy="14" r="0.5"></circle>
                            <circle cx="15" cy="14" r="0.5"></circle>
                            <circle cx="18" cy="14" r="0.5"></circle>
                        </svg>
                        Placas de Estado
                    </a>
                </li>
                <li>
                    <a routerLink="/admin/parameters" routerLinkActive="active">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-1.8 1.8-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V22h-2.55v-.1a1.7 1.7 0 0 0-1.03-1.56 1.7 1.7 0 0 0-1.88.34l-.06.06-1.8-1.8.06-.06A1.7 1.7 0 0 0 8.1 17a1.7 1.7 0 0 0-1.56-1.03H6.45v-2.55h.1A1.7 1.7 0 0 0 8.1 12a1.7 1.7 0 0 0-.34-1.88L7.7 10.06l1.8-1.8.06.06a1.7 1.7 0 0 0 1.88.34 1.7 1.7 0 0 0 1.03-1.56V7h2.55v.1a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.88-.34l.06-.06 1.8 1.8-.06.06A1.7 1.7 0 0 0 19.4 12a1.7 1.7 0 0 0 1.56 1.03h.1v2.55h-.1A1.7 1.7 0 0 0 19.4 15Z"></path>
                        </svg>
                        Par\xE1metros del cotizador
                    </a>
                </li>
            </ul>
        </nav>

        <div class="sidebar-footer">
            <div class="sidebar-user">
                <a class="sidebar-user-link" routerLink="/perfil" routerLinkActive="active" title="Ver mi perfil"
                    aria-label="Ver mi perfil">
                    <span class="user-avatar">{{ (auth.currentProfile()?.full_name || 'A').charAt(0).toUpperCase() }}</span>
                    <div class="user-info">
                        <span class="user-name">{{ auth.currentProfile()?.full_name || 'Administrador' }}</span>
                        <span class="user-role">Administrador</span>
                    </div>
                </a>
                <button class="theme-toggle" type="button" (click)="toggleTheme()"
                    [attr.aria-label]="theme.theme() === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
                    [title]="theme.theme() === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'">
                    <svg class="icon-sun" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="4"></circle>
                        <path d="M12 2v2"></path><path d="M12 20v2"></path>
                        <path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path>
                        <path d="M2 12h2"></path><path d="M20 12h2"></path>
                        <path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path>
                    </svg>
                    <svg class="icon-moon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                    </svg>
                </button>
                <button class="logout-btn" type="button" (click)="logout()" title="Cerrar sesi\xF3n" aria-label="Cerrar sesi\xF3n">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                </button>
            </div>

            <a routerLink="/" class="back-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                <span>Volver al Cotizador</span>
                <svg class="back-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </a>
        </div>
    </aside>

    <button class="sidebar-overlay" *ngIf="sidebarOpen()" (click)="closeSidebar()"
        aria-label="Cerrar men\xFA"></button>

    <main class="admin-content">
        <router-outlet></router-outlet>
    </main>
</div>
`, styles: ['/* src/app/components/admin/admin-dashboard/admin-dashboard.component.css */\n.admin-layout {\n  display: flex;\n  min-height: 100vh;\n  background: #f4f6f8;\n}\n.menu-toggle {\n  display: none;\n}\n.admin-mobile-topbar {\n  display: none;\n}\n.drawer-close {\n  display: none;\n}\n.admin-sidebar {\n  width: 272px;\n  background: #10251f;\n  color: white;\n  padding: 1.25rem 0.9rem 1rem;\n  position: sticky;\n  top: 0;\n  height: 100vh;\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column;\n  box-sizing: border-box;\n  border-right: 1px solid rgba(255, 255, 255, 0.06);\n  box-shadow: 10px 0 30px rgba(15, 23, 42, 0.08);\n  isolation: isolate;\n}\n.admin-sidebar::before {\n  content: "";\n  position: absolute;\n  inset: 0;\n  z-index: -1;\n  pointer-events: none;\n  opacity: 0.45;\n  background-image:\n    linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),\n    linear-gradient(\n      90deg,\n      rgba(255, 255, 255, 0.035) 1px,\n      transparent 1px);\n  background-size: 28px 28px;\n  -webkit-mask-image:\n    linear-gradient(\n      to bottom,\n      black,\n      transparent 85%);\n  mask-image:\n    linear-gradient(\n      to bottom,\n      black,\n      transparent 85%);\n}\n.sidebar-header {\n  margin-bottom: 1.5rem;\n  padding: 0.25rem 0.45rem 1.35rem;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.1);\n}\n.sidebar-logo {\n  display: flex;\n  gap: 0.7rem;\n}\n.logo-mark {\n  width: 42px;\n  height: 42px;\n  border-radius: 12px;\n  background:\n    linear-gradient(\n      145deg,\n      #8be28c,\n      #20b038);\n  color: var(--accent-slate);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: "Fjalla One", sans-serif;\n  font-size: 1.05rem;\n  letter-spacing: 0.4px;\n  flex-shrink: 0;\n  box-shadow: 0 8px 18px rgba(32, 176, 56, 0.2);\n}\n.logo-text {\n  display: flex;\n  flex-direction: column;\n  line-height: 1.2;\n}\n.logo-title {\n  font-family: "Fjalla One", sans-serif;\n  font-size: 1.15rem;\n  color: #ffffff;\n  letter-spacing: 0.5px;\n}\n.logo-subtitle {\n  font-size: 0.7rem;\n  color: #9db6ab;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.nav-section-label {\n  display: block;\n  font-size: 0.68rem;\n  font-weight: 700;\n  color: #7fa394;\n  text-transform: uppercase;\n  letter-spacing: 0.6px;\n  margin: 1.35rem 0.75rem 0.55rem;\n}\n.admin-sidebar nav ul {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n.admin-sidebar nav li {\n  margin-bottom: 0.3rem;\n}\n.admin-sidebar nav a {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  min-height: 46px;\n  padding: 0.72rem 0.85rem;\n  color: #c6d8d0;\n  text-decoration: none;\n  border: 1px solid transparent;\n  border-radius: 12px;\n  font-size: 0.9rem;\n  font-weight: 600;\n  letter-spacing: 0.1px;\n  transition:\n    background-color 0.2s ease,\n    border-color 0.2s ease,\n    color 0.2s ease,\n    transform 0.2s ease,\n    box-shadow 0.2s ease;\n}\n.admin-sidebar nav a svg {\n  flex-shrink: 0;\n  opacity: 0.85;\n}\n.admin-sidebar nav a:hover {\n  background: rgba(139, 226, 140, 0.08);\n  border-color: rgba(139, 226, 140, 0.18);\n  color: white;\n  transform: translateX(2px);\n  box-shadow: inset 0 0 0 1px rgba(139, 226, 140, 0.08);\n}\n.admin-sidebar nav a.active {\n  position: relative;\n  background:\n    linear-gradient(\n      100deg,\n      rgba(32, 176, 56, 0.28),\n      rgba(32, 176, 56, 0.12));\n  border-color: rgba(139, 226, 140, 0.25);\n  color: white;\n  box-shadow: inset 3px 0 0 #65d66e, 0 10px 18px rgba(0, 0, 0, 0.12);\n}\n.admin-sidebar nav a.active::after {\n  content: "";\n  width: 6px;\n  height: 6px;\n  margin-left: auto;\n  border-radius: 50%;\n  background: #8be28c;\n  box-shadow: 0 0 0 4px rgba(139, 226, 140, 0.12);\n}\n.admin-sidebar nav a.active svg {\n  opacity: 1;\n}\n.sidebar-footer {\n  margin-top: auto;\n  padding-top: 1rem;\n  border-top: 1px solid rgba(255, 255, 255, 0.1);\n}\n.sidebar-user {\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n  padding: 0.65rem 0.6rem;\n  margin-bottom: 0.7rem;\n  background: rgba(255, 255, 255, 0.06);\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  border-radius: 11px;\n}\n.sidebar-user .user-avatar {\n  width: 32px;\n  height: 32px;\n  border-radius: 9px;\n  background: #8be28c;\n  color: var(--accent-slate);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  font-weight: 700;\n}\n.sidebar-user .user-info {\n  min-width: 0;\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 0.1rem;\n}\n.sidebar-user-link {\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n  min-width: 0;\n  flex: 1;\n  padding: 0.2rem;\n  border-radius: 8px;\n  text-decoration: none;\n  transition: background-color 0.2s ease;\n}\n.sidebar-user-link:hover {\n  background: rgba(139, 226, 140, 0.1);\n}\n.sidebar-user-link:focus-visible {\n  outline: 2px solid #8be28c;\n  outline-offset: 2px;\n}\n.sidebar-user-link.active {\n  background: rgba(139, 226, 140, 0.14);\n}\n.sidebar-user .user-name {\n  overflow: hidden;\n  color: #ffffff;\n  font-size: 0.78rem;\n  font-weight: 700;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.sidebar-user .user-role {\n  color: #9db6ab;\n  font-size: 0.62rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.4px;\n}\n.logout-btn {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  margin-left: auto;\n  padding: 0.4rem;\n  border: 0;\n  border-radius: 7px;\n  background: transparent;\n  color: #9db6ab;\n  cursor: pointer;\n  transition: background-color 0.2s ease, color 0.2s ease;\n}\n.logout-btn:hover {\n  background: rgba(239, 68, 68, 0.15);\n  color: #fca5a5;\n}\n.logout-btn:focus-visible {\n  outline: 2px solid #8be28c;\n  outline-offset: 2px;\n}\n.back-link {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  justify-content: flex-start;\n  padding: 0.75rem 0.8rem;\n  border: 1px solid rgba(139, 226, 140, 0.28);\n  border-radius: 10px;\n  background: rgba(32, 176, 56, 0.14);\n  color: #ccebd2;\n  text-decoration: none;\n  font-size: 0.82rem;\n  font-weight: 600;\n  transition:\n    background-color 0.2s ease,\n    border-color 0.2s ease,\n    color 0.2s ease,\n    transform 0.2s ease;\n}\n.back-link:hover {\n  color: #ffffff;\n  background: rgba(32, 176, 56, 0.25);\n  border-color: rgba(139, 226, 140, 0.5);\n  transform: translateY(-1px);\n}\n.back-arrow {\n  margin-left: auto;\n}\n.admin-sidebar nav a:focus-visible,\n.back-link:focus-visible {\n  outline: 2px solid #8be28c;\n  outline-offset: 3px;\n}\n.admin-content {\n  flex: 1;\n  padding: 2rem;\n  overflow-x: auto;\n  max-width: 100%;\n  box-sizing: border-box;\n}\n@media (max-width: 768px) {\n  .admin-layout {\n    flex-direction: column;\n  }\n  .admin-mobile-topbar {\n    display: flex;\n    align-items: center;\n    gap: 0.75rem;\n    position: sticky;\n    top: 0;\n    z-index: 1090;\n    padding: 0.65rem 1rem;\n    background: #10251f;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.1);\n    box-shadow: 0 8px 20px rgba(15, 23, 42, 0.16);\n  }\n  .mobile-topbar-title {\n    display: flex;\n    flex-direction: column;\n    line-height: 1.15;\n    min-width: 0;\n  }\n  .mobile-brand {\n    font-family: "Fjalla One", sans-serif;\n    font-size: 1.05rem;\n    letter-spacing: 0.5px;\n    color: #ffffff;\n    white-space: nowrap;\n  }\n  .mobile-subtitle {\n    font-size: 0.62rem;\n    font-weight: 600;\n    text-transform: uppercase;\n    letter-spacing: 0.5px;\n    color: #9db6ab;\n  }\n  .menu-toggle {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    width: 44px;\n    height: 44px;\n    flex-shrink: 0;\n    background: rgba(255, 255, 255, 0.08);\n    border: 1px solid rgba(255, 255, 255, 0.14);\n    border-radius: 10px;\n    color: #eafdf0;\n    cursor: pointer;\n    transition:\n      background-color 0.2s ease,\n      border-color 0.2s ease,\n      transform 0.2s ease;\n  }\n  .menu-toggle:hover {\n    background: rgba(139, 226, 140, 0.16);\n    border-color: rgba(139, 226, 140, 0.4);\n  }\n  .menu-toggle:focus-visible {\n    outline: 2px solid #8be28c;\n    outline-offset: 2px;\n  }\n  .menu-toggle svg {\n    stroke: currentColor;\n  }\n  .drawer-close {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    width: 44px;\n    height: 44px;\n    flex-shrink: 0;\n    margin-left: auto;\n    background: rgba(255, 255, 255, 0.08);\n    border: 1px solid rgba(255, 255, 255, 0.14);\n    border-radius: 10px;\n    color: #eafdf0;\n    cursor: pointer;\n    transition: background-color 0.2s ease, border-color 0.2s ease;\n  }\n  .drawer-close:hover {\n    background: rgba(239, 68, 68, 0.16);\n    border-color: rgba(239, 68, 68, 0.4);\n    color: #fca5a5;\n  }\n  .drawer-close:focus-visible {\n    outline: 2px solid #8be28c;\n    outline-offset: 2px;\n  }\n  .drawer-close svg {\n    stroke: currentColor;\n  }\n  .admin-sidebar {\n    position: fixed;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    width: min(300px, 86vw);\n    height: 100dvh;\n    padding: 1rem 1rem 1.25rem;\n    z-index: 1110;\n    border-right: 1px solid rgba(255, 255, 255, 0.08);\n    box-shadow: 16px 0 40px rgba(15, 23, 42, 0.28);\n    transform: translateX(-100%);\n    visibility: hidden;\n    transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.28s;\n  }\n  .admin-sidebar.sidebar-open {\n    transform: translateX(0);\n    visibility: visible;\n  }\n  .sidebar-header {\n    display: flex;\n    align-items: center;\n    gap: 0.75rem;\n    margin-bottom: 1rem;\n    padding-bottom: 1rem;\n  }\n  .admin-sidebar nav {\n    overflow-y: auto;\n    flex: 1;\n  }\n  .sidebar-footer {\n    padding-top: 0.85rem;\n  }\n  .back-link {\n    margin-top: 0.55rem;\n  }\n  .sidebar-overlay {\n    position: fixed;\n    inset: 0;\n    z-index: 1100;\n    background: rgba(15, 23, 42, 0.55);\n    border: none;\n    cursor: pointer;\n    animation: overlayFade 0.25s ease both;\n  }\n  @keyframes overlayFade {\n    from {\n      opacity: 0;\n    }\n    to {\n      opacity: 1;\n    }\n  }\n  .admin-content {\n    padding: 1rem;\n  }\n}\n.theme-toggle {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 38px;\n  height: 38px;\n  flex-shrink: 0;\n  background: rgba(255, 255, 255, 0.08);\n  border: 1px solid rgba(255, 255, 255, 0.14);\n  border-radius: 10px;\n  color: #c6d8d0;\n  cursor: pointer;\n  transition:\n    background-color 0.2s ease,\n    border-color 0.2s ease,\n    color 0.2s ease,\n    transform 0.2s ease;\n  position: relative;\n}\n.theme-toggle:hover {\n  background: rgba(139, 226, 140, 0.16);\n  border-color: rgba(139, 226, 140, 0.4);\n  color: white;\n  transform: scale(1.08);\n}\n.theme-toggle:focus-visible {\n  outline: 2px solid #8be28c;\n  outline-offset: 2px;\n}\n.theme-toggle svg {\n  stroke: currentColor;\n  position: absolute;\n  transition: opacity 0.25s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);\n}\n.theme-toggle .icon-moon {\n  opacity: 1;\n  transform: rotate(0deg) scale(1);\n}\n.theme-toggle .icon-sun {\n  opacity: 0;\n  transform: rotate(-90deg) scale(0.6);\n}\n:host-context(html[data-theme="dark"]) .theme-toggle .icon-moon {\n  opacity: 0;\n  transform: rotate(90deg) scale(0.6);\n}\n:host-context(html[data-theme="dark"]) .theme-toggle .icon-sun {\n  opacity: 1;\n  transform: rotate(0deg) scale(1);\n}\n:host-context(html[data-theme="dark"]) .admin-layout {\n  background: var(--bg-primary);\n}\n:host-context(html[data-theme="dark"]) .admin-sidebar {\n  background: #0c1a16;\n  border-right-color: rgba(139, 226, 140, 0.12);\n  box-shadow: 10px 0 30px rgba(0, 0, 0, 0.4);\n}\n:host-context(html[data-theme="dark"]) .sidebar-header {\n  border-bottom-color: rgba(139, 226, 140, 0.14);\n}\n:host-context(html[data-theme="dark"]) .nav-section-label {\n  color: #6f9a86;\n}\n:host-context(html[data-theme="dark"]) .logo-subtitle {\n  color: #7fa897;\n}\n:host-context(html[data-theme="dark"]) .admin-mobile-topbar {\n  background: #0c1a16;\n  border-bottom-color: rgba(139, 226, 140, 0.14);\n}\n:host-context(html[data-theme="dark"]) .mobile-brand {\n  color: #eafdf0;\n}\n:host-context(html[data-theme="dark"]) .mobile-subtitle {\n  color: #7fa897;\n}\n:host-context(html[data-theme="dark"]) .menu-toggle {\n  background: rgba(139, 226, 140, 0.1);\n  border-color: rgba(139, 226, 140, 0.2);\n  color: #eafdf0;\n}\n:host-context(html[data-theme="dark"]) .menu-toggle:hover {\n  background: rgba(139, 226, 140, 0.2);\n}\n:host-context(html[data-theme="dark"]) .drawer-close {\n  background: rgba(139, 226, 140, 0.1);\n  border-color: rgba(139, 226, 140, 0.2);\n  color: #eafdf0;\n}\n:host-context(html[data-theme="dark"]) .sidebar-footer {\n  border-top-color: rgba(139, 226, 140, 0.14);\n}\n:host-context(html[data-theme="dark"]) .back-link {\n  color: #9db6ab;\n}\n:host-context(html[data-theme="dark"]) .back-link:hover {\n  color: #8be28c;\n}\n:host-context(html[data-theme="dark"]) .sidebar-overlay {\n  background: rgba(0, 0, 0, 0.65);\n}\n:host-context(html[data-theme="dark"]) .back-link {\n  background: rgba(139, 226, 140, 0.14);\n  border-color: rgba(139, 226, 140, 0.4);\n  color: #d9ede0;\n}\n:host-context(html[data-theme="dark"]) .back-link:hover {\n  background: rgba(139, 226, 140, 0.26);\n  color: #ffffff;\n}\n/*# sourceMappingURL=admin-dashboard.component.css.map */\n'] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminDashboardComponent, { className: "AdminDashboardComponent", filePath: "src/app/components/admin/admin-dashboard/admin-dashboard.ts", lineNumber: 15 });
})();
export {
  AdminDashboardComponent
};
//# debugId=c6d1cd60-73c0-564e-ac21-63a5ca2a60f8
//# sourceMappingURL=chunk-6WZNLTIQ.js.map
