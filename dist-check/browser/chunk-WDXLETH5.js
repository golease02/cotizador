import {
  Injectable,
  PLATFORM_ID,
  effect,
  inject,
  isPlatformBrowser,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-6KRTW2LJ.js";

// src/app/services/theme.service.ts
var STORAGE_KEY = "cotizador-theme";
var ThemeService = class _ThemeService {
  platformId = inject(PLATFORM_ID);
  theme = signal(
    "light",
    ...ngDevMode ? [{ debugName: "theme" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isBrowser() {
    return isPlatformBrowser(this.platformId);
  }
  constructor() {
    const initial = this.loadInitialTheme();
    this.theme.set(initial);
    if (this.isBrowser()) {
      effect(() => {
        const current = this.theme();
        document.documentElement.setAttribute("data-theme", current);
        try {
          localStorage.setItem(STORAGE_KEY, current);
        } catch {
        }
      });
    }
  }
  toggle() {
    this.theme.update((current) => current === "dark" ? "light" : "dark");
  }
  loadInitialTheme() {
    if (!this.isBrowser())
      return "light";
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "light" || stored === "dark")
        return stored;
    } catch {
    }
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light";
  }
  static \u0275fac = function ThemeService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ThemeService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ThemeService, factory: _ThemeService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ThemeService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [], null);
})();

export {
  ThemeService
};
//# debugId=f2bc5959-1db7-5a9c-80a6-c570b41dc72d
//# sourceMappingURL=chunk-WDXLETH5.js.map
