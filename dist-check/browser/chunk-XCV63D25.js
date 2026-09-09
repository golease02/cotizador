import {
  Injectable,
  currentUserSignal,
  getSupabaseClient,
  resetSessionReady,
  sessionReady,
  setClassMetadata,
  setSessionUser,
  signal,
  ɵɵdefineInjectable
} from "./chunk-6KRTW2LJ.js";
import {
  __spreadValues
} from "./chunk-FDMHZOCR.js";

// src/app/services/auth.service.ts
var AuthService = class _AuthService {
  client = getSupabaseClient();
  currentProfileSignal = signal(
    null,
    ...ngDevMode ? [{ debugName: "currentProfileSignal" }] : (
      /* istanbul ignore next */
      []
    )
  );
  currentUser = currentUserSignal.asReadonly();
  currentProfile = this.currentProfileSignal.asReadonly();
  maxFieldLength = {
    full_name: 120,
    seller_number: 40,
    agency_name: 120,
    agency_brand: 120,
    agency_location: 300,
    email: 160,
    content: 3e3,
    client_name: 120,
    brand: 80,
    model: 80
  };
  async waitForSession() {
    await sessionReady();
  }
  async getSessionUser() {
    await sessionReady();
    return currentUserSignal();
  }
  isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
  }
  sanitizeText(value, fieldName, maxLength = 200) {
    const raw = String(value ?? "");
    const normalized = raw.replace(/<script\b[^>]*>.*?<\/script>/gi, "").replace(/<[^>]*>/g, "").replace(/javascript\s*:/gi, "").replace(/on\w+\s*=\s*(['"]).*?\1/gi, "").replace(/[\u0000-\u001f\u007f]+/g, " ").replace(/\s+/g, " ").trim();
    const limit = this.maxFieldLength[fieldName] ?? maxLength;
    return normalized.slice(0, limit);
  }
  canManageProfile(targetUserId) {
    const currentUser = currentUserSignal();
    const currentProfile = this.currentProfileSignal();
    if (!currentUser || !targetUserId)
      return false;
    if (currentUser.id === targetUserId)
      return true;
    return currentProfile?.role === "admin" && currentProfile?.active !== false;
  }
  async signUp(email, password, fullName) {
    const safeEmail = this.sanitizeText(email, "email", 160).toLowerCase();
    const safeName = this.sanitizeText(fullName, "full_name", 120);
    if (!safeEmail || !this.isValidEmail(safeEmail)) {
      return { error: { message: "El correo electr\xF3nico es inv\xE1lido." } };
    }
    if (!password || password.length < 6) {
      return { error: { message: "La contrase\xF1a debe tener al menos 6 caracteres." } };
    }
    const { data, error } = await this.client.auth.signUp({
      email: safeEmail,
      password,
      options: { data: { full_name: safeName } }
    });
    if (!error && data.user) {
      setSessionUser(data.user);
      await this.updateProfile(data.user.id, { email: safeEmail });
      await this.loadProfile(data.user.id);
    }
    return { error };
  }
  async signIn(email, password) {
    const { data, error } = await this.client.auth.signInWithPassword({ email, password });
    if (!error && data.user) {
      setSessionUser(data.user);
      const profile = await this.loadProfile(data.user.id);
      if (profile?.active === false) {
        await this.signOut();
        return { error: { message: "Tu cuenta est\xE1 inactiva. Contacta a un administrador." } };
      }
    }
    return { error };
  }
  async signOut() {
    await this.client.auth.signOut();
    resetSessionReady();
    this.currentProfileSignal.set(null);
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("golease_quotes");
      } catch {
      }
    }
  }
  /** Fuerza la recarga del perfil del usuario autenticado. */
  async refreshProfile() {
    const user = currentUserSignal();
    if (!user)
      return null;
    return this.loadProfile(user.id);
  }
  async getProfileById(userId) {
    if (!userId || !this.canManageProfile(userId)) {
      return { data: null, error: { message: "No tienes permisos para consultar este perfil." } };
    }
    const { data, error } = await this.client.from("profiles").select("*").eq("id", userId).maybeSingle();
    return { data, error };
  }
  getCurrentSellerId() {
    return currentUserSignal()?.id || null;
  }
  async loadProfile(userId) {
    const { data, error } = await this.client.from("profiles").select("id, email, recovery_email, full_name, role, active, seller_number, agency_brand, agency_location, latitude, longitude").eq("id", userId).maybeSingle();
    if (!error && data) {
      this.currentProfileSignal.set(data);
      return data;
    }
    return null;
  }
  async updateProfile(userId, data) {
    if (!userId || !this.canManageProfile(userId)) {
      return { error: { message: "No tienes permisos para modificar este perfil." } };
    }
    const safeData = {};
    for (const [key, value] of Object.entries(data ?? {})) {
      if (key === "id")
        continue;
      if (key === "email") {
        if (typeof value !== "string")
          continue;
        const clean = this.sanitizeText(value, "email", 160).toLowerCase();
        if (this.isValidEmail(clean)) {
          safeData["email"] = clean;
        }
        continue;
      }
      if (typeof value === "string") {
        safeData[key] = this.sanitizeText(value, key, this.maxFieldLength[key] ?? 200);
      } else if (typeof value === "number" || typeof value === "boolean" || value === null) {
        safeData[key] = value;
      } else if (value !== void 0) {
        safeData[key] = this.sanitizeText(String(value), key, this.maxFieldLength[key] ?? 200);
      }
    }
    const { error } = await this.client.from("profiles").upsert(__spreadValues({ id: userId }, safeData), { onConflict: "id" });
    return { error };
  }
  isAdmin() {
    return this.currentProfileSignal()?.role === "admin";
  }
  async getAdmins() {
    const { data, error } = await this.client.from("profiles").select("id, email, full_name, seller_number, recovery_email, role, active, created_at").eq("role", "admin").order("created_at", { ascending: false });
    return { data, error };
  }
  async getProfileBySellerNumber(sellerNumber) {
    const { data, error } = await this.client.rpc("get_profile_by_seller", {
      seller_number_input: sellerNumber
    });
    if (error) {
      return { data: null, error };
    }
    const profile = Array.isArray(data) && data.length > 0 ? data[0] : data ?? null;
    if (!profile || typeof profile.email !== "string" || !profile.email.trim()) {
      return { data: null, error: { message: "Perfil sin email de autenticaci\xF3n." } };
    }
    return { data: profile, error: null };
  }
  async requestPasswordRecovery(sellerNumber, recoveryEmail) {
    const normalizedSeller = sellerNumber.trim();
    const normalizedEmail = recoveryEmail.trim().toLowerCase();
    if (!/^\d{10}$/.test(normalizedSeller)) {
      return { error: { message: "N\xFAmero de celular inv\xE1lido." } };
    }
    if (!this.isValidEmail(normalizedEmail) || normalizedEmail.length > 160) {
      return { error: { message: "Correo de recuperaci\xF3n inv\xE1lido." } };
    }
    const { data: accepted, error } = await this.client.rpc("request_password_recovery", {
      seller_number_input: normalizedSeller,
      recovery_email_input: normalizedEmail
    });
    if (!error && accepted) {
      await this.client.auth.resetPasswordForEmail(normalizedEmail, {
        redirectTo: `${window.location.origin}/#/reset-password`
      });
    }
    return { error };
  }
  async deleteUserFromAuth(userId) {
    const currentUser = currentUserSignal();
    const currentProfile = this.currentProfileSignal();
    if (!currentUser || !this.canManageProfile(userId)) {
      return { error: { message: "No tienes permisos para eliminar este usuario." } };
    }
    if (currentUser.id === userId) {
      return { error: { message: "No puedes eliminar tu propio usuario." } };
    }
    if (currentProfile?.role !== "admin") {
      return { error: { message: "Solo los administradores pueden eliminar usuarios." } };
    }
    const { error } = await this.client.rpc("delete_user", { user_id: userId });
    return { error };
  }
  async createUserAsAdmin(payload) {
    const currentProfile = this.currentProfileSignal();
    if (!currentUserSignal() || currentProfile?.role !== "admin" || currentProfile?.active === false) {
      return { data: null, error: { message: "No tienes permisos para crear usuarios." } };
    }
    const safeEmail = this.sanitizeText(payload.email, "email", 160).toLowerCase();
    const safeName = this.sanitizeText(payload.full_name, "full_name", 120);
    if (!safeEmail || !payload.password || payload.password.length < 6) {
      return { data: null, error: { message: "Datos inv\xE1lidos para crear el usuario." } };
    }
    const { data, error } = await this.client.rpc("create_user", {
      p_email: safeEmail,
      p_password: payload.password,
      p_full_name: safeName,
      p_role: payload.role
    });
    if (error)
      return { data: null, error };
    if (data && typeof data === "object" && data?.error) {
      return { data: null, error: { message: data.error } };
    }
    const userId = data?.id ?? null;
    return { data: userId ? { id: userId } : null, error: null };
  }
  async restoreSession(session) {
    if (!session)
      return;
    await this.client.auth.setSession({
      access_token: session.access_token,
      refresh_token: session.refresh_token
    });
    if (session.user) {
      setSessionUser(session.user);
      await this.loadProfile(session.user.id);
    }
  }
  async updateUserPassword(userId, password) {
    const currentUser = currentUserSignal();
    const currentProfile = this.currentProfileSignal();
    if (!currentUser || !this.canManageProfile(userId)) {
      return { error: { message: "No tienes permisos para actualizar esta contrase\xF1a." } };
    }
    if (password.length < 6 || password.length > 128) {
      return { error: { message: "La contrase\xF1a debe tener entre 6 y 128 caracteres." } };
    }
    if (currentProfile?.role !== "admin" && currentUser.id !== userId) {
      return { error: { message: "No puedes restablecer otra contrase\xF1a." } };
    }
    const { error } = await this.client.rpc("update_user_password", {
      target_user_id: userId,
      new_password: password
    });
    return { error };
  }
  static \u0275fac = function AuthService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AuthService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  AuthService
};
//# debugId=59e97a71-bc1c-5979-af0d-245ce9fed367
//# sourceMappingURL=chunk-XCV63D25.js.map
