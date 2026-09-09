import {
  Injectable,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-6KRTW2LJ.js";

// src/app/services/toast.service.ts
var toastCounter = 0;
var ToastService = class _ToastService {
  toastsSignal = signal(
    [],
    ...ngDevMode ? [{ debugName: "toastsSignal" }] : (
      /* istanbul ignore next */
      []
    )
  );
  toasts = this.toastsSignal.asReadonly();
  push(toast, duration) {
    this.toastsSignal.update((list) => [...list, toast]);
    if (duration > 0) {
      setTimeout(() => this.dismiss(toast.id), duration);
    }
  }
  success(message, duration = 4200) {
    this.push({ id: ++toastCounter, type: "success", message }, duration);
  }
  error(message, duration = 6500) {
    this.push({ id: ++toastCounter, type: "error", message }, duration);
  }
  info(message, duration = 4e3) {
    this.push({ id: ++toastCounter, type: "info", message }, duration);
  }
  /** Toast con acción de deshacer (por ejemplo, para el toggle de estado). */
  undo(message, action, duration = 8e3) {
    this.push({ id: ++toastCounter, type: "info", message, actionLabel: "Deshacer", action }, duration);
  }
  dismiss(id) {
    this.toastsSignal.update((list) => list.filter((t) => t.id !== id));
  }
  static \u0275fac = function ToastService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ToastService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ToastService, factory: _ToastService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ToastService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  ToastService
};
//# debugId=6661a03e-716b-5325-ba9a-534da065943f
//# sourceMappingURL=chunk-74RWLUMR.js.map
