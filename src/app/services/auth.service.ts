import { Injectable, signal } from '@angular/core';
import { User } from '@supabase/supabase-js';
import {
  getSupabaseClient,
  sessionReady,
  currentUserSignal,
  setSessionUser,
  resetSessionReady,
} from './supabase-client';

export interface Profile {
  id: string;
  email: string;
  recovery_email?: string;
  full_name: string;
  role: 'admin' | 'seller';
  active?: boolean;
}

export interface AuthResult {
  error: any;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private client = getSupabaseClient();

  private currentProfileSignal = signal<Profile | null>(null);
  public readonly currentUser = currentUserSignal.asReadonly();
  public readonly currentProfile = this.currentProfileSignal.asReadonly();

  private readonly maxFieldLength: Record<string, number> = {
    full_name: 120,
    seller_number: 40,
    agency_name: 120,
    agency_brand: 120,
    agency_location: 300,
    email: 160,
    content: 3000,
    client_name: 120,
    brand: 80,
    model: 80,
  };

  public async waitForSession(): Promise<void> {
    await sessionReady();
  }

  public async getSessionUser(): Promise<User | null> {
    await sessionReady();
    return currentUserSignal();
  }

  private isValidEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
  }

  public sanitizeText(value: unknown, fieldName: string, maxLength = 200): string {
    const raw = String(value ?? '');
    const normalized = raw
      .replace(/<script\b[^>]*>.*?<\/script>/gi, '')
      .replace(/<[^>]*>/g, '')
      .replace(/javascript\s*:/gi, '')
      .replace(/on\w+\s*=\s*(['"]).*?\1/gi, '')
      .replace(/[\u0000-\u001f\u007f]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    const limit = this.maxFieldLength[fieldName] ?? maxLength;
    return normalized.slice(0, limit);
  }

  public canManageProfile(targetUserId: string): boolean {
    const currentUser = currentUserSignal();
    const currentProfile = this.currentProfileSignal();
    if (!currentUser || !targetUserId) return false;
    if (currentUser.id === targetUserId) return true;
    return currentProfile?.role === 'admin' && currentProfile?.active !== false;
  }

  public async signUp(email: string, password: string, fullName: string): Promise<AuthResult> {
    const safeEmail = this.sanitizeText(email, 'email', 160).toLowerCase();
    const safeName = this.sanitizeText(fullName, 'full_name', 120);
    if (!safeEmail || !this.isValidEmail(safeEmail)) {
      return { error: { message: 'El correo electrónico es inválido.' } };
    }
    if (!password || password.length < 6) {
      return { error: { message: 'La contraseña debe tener al menos 6 caracteres.' } };
    }
    const { data, error } = await this.client.auth.signUp({
      email: safeEmail,
      password,
      options: { data: { full_name: safeName } },
    });
    if (!error && data.user) {
      setSessionUser(data.user);
      await this.updateProfile(data.user.id, { email: safeEmail });
      await this.loadProfile(data.user.id);
    }
    return { error };
  }

  public async signIn(email: string, password: string): Promise<AuthResult> {
    const { data, error } = await this.client.auth.signInWithPassword({ email, password });
    if (!error && data.user) {
      setSessionUser(data.user);
      const profile = await this.loadProfile(data.user.id);
      if (profile?.active === false) {
        await this.signOut();
        return { error: { message: 'Tu cuenta está inactiva. Contacta a un administrador.' } };
      }
    }
    return { error };
  }

  public async signOut(): Promise<void> {
    await this.client.auth.signOut();
    resetSessionReady();
    this.currentProfileSignal.set(null);
    if (typeof window !== 'undefined') {
      try { localStorage.removeItem('golease_quotes'); } catch { /* noop */ }
    }
  }

  /** Fuerza la recarga del perfil del usuario autenticado. */
  public async refreshProfile(): Promise<Profile | null> {
    const user = currentUserSignal();
    if (!user) return null;
    return this.loadProfile(user.id);
  }

  public async getProfileById(userId: string): Promise<{ data: any; error: any }> {
    if (!userId || !this.canManageProfile(userId)) {
      return { data: null, error: { message: 'No tienes permisos para consultar este perfil.' } };
    }
    const { data, error } = await this.client
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    return { data, error };
  }

  public getCurrentSellerId(): string | null {
    return currentUserSignal()?.id || null;
  }

  public async loadProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await this.client
      .from('profiles')
      .select('id, email, recovery_email, full_name, role, active')
      .eq('id', userId)
      .maybeSingle();
    if (!error && data) {
      this.currentProfileSignal.set(data as Profile);
      return data as Profile;
    }
    return null;
  }

  public async updateProfile(
    userId: string,
    data: Record<string, unknown>
  ): Promise<AuthResult> {
    if (!userId || !this.canManageProfile(userId)) {
      return { error: { message: 'No tienes permisos para modificar este perfil.' } };
    }
    const safeData: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data ?? {})) {
      if (key === 'id') continue;
      if (key === 'email') {
        if (typeof value !== 'string') continue;
        const clean = this.sanitizeText(value, 'email', 160).toLowerCase();
        if (this.isValidEmail(clean)) {
          safeData['email'] = clean;
        }
        continue;
      }
      if (typeof value === 'string') {
        safeData[key] = this.sanitizeText(value, key, this.maxFieldLength[key] ?? 200);
      } else if (typeof value === 'number' || typeof value === 'boolean' || value === null) {
        safeData[key] = value;
      } else if (value !== undefined) {
        safeData[key] = this.sanitizeText(String(value), key, this.maxFieldLength[key] ?? 200);
      }
    }
    const { error } = await this.client
      .from('profiles')
      .upsert({ id: userId, ...safeData }, { onConflict: 'id' });
    return { error };
  }

  public isAdmin(): boolean {
    return this.currentProfileSignal()?.role === 'admin';
  }

  public async getAdmins(): Promise<{ data: any; error: any }> {
    const { data, error } = await this.client
      .from('profiles')
      .select('id, email, full_name, seller_number, recovery_email, role, active, created_at')
      .eq('role', 'admin')
      .order('created_at', { ascending: false });
    return { data, error };
  }

  public async getProfileBySellerNumber(
    sellerNumber: string
  ): Promise<{ data: any; error: any }> {
    const { data, error } = await this.client.rpc('get_profile_by_seller', {
      seller_number_input: sellerNumber,
    });
    if (error) {
      return { data: null, error };
    }
    const profile = Array.isArray(data) && data.length > 0 ? data[0] : data ?? null;
    if (!profile || typeof profile.email !== 'string' || !profile.email.trim()) {
      return { data: null, error: { message: 'Perfil sin email de autenticación.' } };
    }
    return { data: profile, error: null };
  }

  public async requestPasswordRecovery(
    sellerNumber: string,
    recoveryEmail: string
  ): Promise<AuthResult> {
    const normalizedSeller = sellerNumber.trim();
    const normalizedEmail = recoveryEmail.trim().toLowerCase();
    if (!/^\d{10}$/.test(normalizedSeller)) {
      return { error: { message: 'Número de celular inválido.' } };
    }
    if (!this.isValidEmail(normalizedEmail) || normalizedEmail.length > 160) {
      return { error: { message: 'Correo de recuperación inválido.' } };
    }
    const { data: accepted, error } = await this.client.rpc('request_password_recovery', {
      seller_number_input: normalizedSeller,
      recovery_email_input: normalizedEmail,
    });
    if (!error && accepted) {
      await this.client.auth.resetPasswordForEmail(normalizedEmail, {
        redirectTo: `${window.location.origin}/#/reset-password`,
      });
    }
    return { error };
  }

  public async deleteUserFromAuth(userId: string): Promise<AuthResult> {
    const currentUser = currentUserSignal();
    const currentProfile = this.currentProfileSignal();

    if (!currentUser || !this.canManageProfile(userId)) {
      return { error: { message: 'No tienes permisos para eliminar este usuario.' } };
    }
    if (currentUser.id === userId) {
      return { error: { message: 'No puedes eliminar tu propio usuario.' } };
    }
    if (currentProfile?.role !== 'admin') {
      return { error: { message: 'Solo los administradores pueden eliminar usuarios.' } };
    }
    const { error } = await this.client.rpc('delete_user', { user_id: userId });
    return { error };
  }

  public async createUserAsAdmin(payload: {
    email: string;
    password: string;
    full_name: string;
    role: 'admin' | 'seller';
  }): Promise<{ data: { id: string } | null; error: any }> {
    const currentProfile = this.currentProfileSignal();
    if (!currentUserSignal() || currentProfile?.role !== 'admin' || currentProfile?.active === false) {
      return { data: null, error: { message: 'No tienes permisos para crear usuarios.' } };
    }
    const safeEmail = this.sanitizeText(payload.email, 'email', 160).toLowerCase();
    const safeName = this.sanitizeText(payload.full_name, 'full_name', 120);
    if (!safeEmail || !payload.password || payload.password.length < 6) {
      return { data: null, error: { message: 'Datos inválidos para crear el usuario.' } };
    }
    const { data, error } = await this.client.rpc('create_user', {
      p_email: safeEmail,
      p_password: payload.password,
      p_full_name: safeName,
      p_role: payload.role,
    });
    if (error) return { data: null, error };
    if (data && typeof data === 'object' && (data as any)?.error) {
      return { data: null, error: { message: (data as any).error } };
    }
    const userId = (data as any)?.id ?? null;
    return { data: userId ? { id: userId } : null, error: null };
  }

  public async restoreSession(session: any): Promise<void> {
    if (!session) return;
    await this.client.auth.setSession({
      access_token: session.access_token,
      refresh_token: session.refresh_token,
    });
    if (session.user) {
      setSessionUser(session.user);
      await this.loadProfile(session.user.id);
    }
  }

  public async updateUserPassword(userId: string, password: string): Promise<AuthResult> {
    const currentUser = currentUserSignal();
    const currentProfile = this.currentProfileSignal();

    if (!currentUser || !this.canManageProfile(userId)) {
      return { error: { message: 'No tienes permisos para actualizar esta contraseña.' } };
    }
    if (password.length < 6 || password.length > 128) {
      return { error: { message: 'La contraseña debe tener entre 6 y 128 caracteres.' } };
    }
    if (currentProfile?.role !== 'admin' && currentUser.id !== userId) {
      return { error: { message: 'No puedes restablecer otra contraseña.' } };
    }
    const { error } = await this.client.rpc('update_user_password', {
      target_user_id: userId,
      new_password: password,
    });
    return { error };
  }
}