import {
  Injectable,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-6KRTW2LJ.js";
import {
  __spreadValues
} from "./chunk-FDMHZOCR.js";

// src/app/services/quote-draft.service.ts
var STORAGE_KEY = "golease_quote_draft";
var QuoteDraftService = class _QuoteDraftService {
  draftSignal = signal(
    this.readFromStorage(),
    ...ngDevMode ? [{ debugName: "draftSignal" }] : (
      /* istanbul ignore next */
      []
    )
  );
  draft = this.draftSignal.asReadonly();
  setDraft(input, quoteId, validUntil) {
    const draft = { input: __spreadValues({}, input), quoteId, validUntil };
    this.draftSignal.set(draft);
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch {
    }
  }
  clear() {
    this.draftSignal.set(null);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
    }
  }
  readFromStorage() {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw)
        return null;
      const parsed = JSON.parse(raw);
      return parsed?.input ? parsed : null;
    } catch {
      return null;
    }
  }
  static \u0275fac = function QuoteDraftService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _QuoteDraftService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _QuoteDraftService, factory: _QuoteDraftService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(QuoteDraftService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/utils/quote-validity.ts
var VALIDITY_WINDOW_DAYS = 7;
var EXPIRING_SOON_HOURS = 48;
function computeValidUntil(from, windowDays = VALIDITY_WINDOW_DAYS) {
  const base = from instanceof Date ? from : new Date(from);
  return new Date(base.getTime() + windowDays * 24 * 60 * 60 * 1e3);
}
function getValidityStatus(validUntil, now = /* @__PURE__ */ new Date()) {
  if (!validUntil) return "vigente";
  const deadline = validUntil instanceof Date ? validUntil : new Date(validUntil);
  if (deadline.getTime() <= now.getTime()) return "vencida";
  if (deadline.getTime() <= now.getTime() + EXPIRING_SOON_HOURS * 60 * 60 * 1e3) {
    return "proxima";
  }
  return "vigente";
}
function getValidityLabel(status) {
  switch (status) {
    case "vencida":
      return "Vencida";
    case "proxima":
      return "Por vencer";
    default:
      return "Vigente";
  }
}

export {
  QuoteDraftService,
  computeValidUntil,
  getValidityStatus,
  getValidityLabel
};
//# debugId=d71868e5-c92d-55c1-bd6f-3f9b09e9ed3f
//# sourceMappingURL=chunk-FYXOTE3J.js.map
