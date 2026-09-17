import { Injectable, computed, effect, inject, signal, untracked } from '@angular/core';
import { AuthService } from './auth.service';
import { currentUserSignal, getSupabaseClient, sessionReady } from './supabase-client';

export type AdminScope = 'todos' | 'red';

const SCOPE_STORAGE_KEY = 'golease_admin_scope';

/**
 * Alcance global del panel admin para el super admin.
 *
 * El super admin por defecto ve TODOS los datos (RLS `is_admin()` = todo).
 * Con el toggle "Solo mi red" se restringe el alcance a sus vendedores
 * asociados: vendedores cuyo `profiles.socio_id` apunta al perfil del super
 * admin, mas las cotizaciones creadas directamente por el.
 *
 * El socio y el vendedor no usan este toggle: su alcance ya lo impone RLS +
 * las RPCs server-side, asi que `isRedMode()` devuelve siempre `false` para ellos.
 */
@Injectable({
  providedIn: 'root',
})
export class AdminScopeService {
  private readonly auth = inject(AuthService);
  private readonly client = getSupabaseClient();

  private readonly scopeSignal = signal<AdminScope>(this.readStorage());
  readonly scope = this.scopeSignal.asReadonly();

  /** IDs de vendedores en la "red" del super admin (vacio cuando no aplica). */
  private readonly sellerIdsSignal = signal<Set<string>>(new Set());
  readonly sellerIds = this.sellerIdsSignal.asReadonly();

  /** Contador de recargas; los paneles observan este signal para refrescar datos. */
  private readonly reloadCountSignal = signal(0);
  readonly reloadCount = this.reloadCountSignal.asReadonly();

  /** El toggle solo es visible y efectivo para el super admin. */
  readonly isScopeVisible = computed(() => this.auth.isSuperAdmin());
  readonly isRedMode = computed(() => this.auth.isSuperAdmin() && this.scopeSignal() === 'red');

  private requestId = 0;
  private lastSessionKey: string | undefined;
  readonly error = signal<string | null>(null);

  constructor() {
    // Restaura la red al iniciar/recuperar sesion y la resetea si cambia el usuario.
    // La clave incluye el estado del perfil, pero NUNCA dispara recargas solo porque
    // el perfil termino de cargar (evita dobles cargas en los paneles).
    effect(() => {
      const uid = currentUserSignal()?.id ?? null;
      const isAdmin = this.auth.isSuperAdmin();
      const sessionKey = `${uid}:${isAdmin}`;
      untracked(() => {
        if (this.lastSessionKey === undefined) {
          this.lastSessionKey = sessionKey;
          if (uid && isAdmin && this.scopeSignal() === 'red') void this.loadSellerIds();
          return;
        }
        if (this.lastSessionKey === sessionKey) return;
        this.lastSessionKey = sessionKey;
        this.requestId++;
        this.sellerIdsSignal.set(new Set());
        // Solo recarga si el nuevo contexto requiere resolver la red; el bump
        // final lo hace loadSellerIds. En modo 'todos' no hay nada que refrescar.
        if (uid && isAdmin && this.scopeSignal() === 'red') void this.loadSellerIds();
      });
    });
  }

  private readStorage(): AdminScope {
    try {
      return localStorage.getItem(SCOPE_STORAGE_KEY) === 'red' ? 'red' : 'todos';
    } catch {
      return 'todos';
    }
  }

  private persist(value: AdminScope): void {
    try {
      if (value === 'red') {
        localStorage.setItem(SCOPE_STORAGE_KEY, 'red');
      } else {
        localStorage.removeItem(SCOPE_STORAGE_KEY);
      }
    } catch {
      /* localStorage no disponible: la preferencia no se persiste */
    }
  }

  /** Cambia el alcance y dispara un refresco de los paneles. */
  async setScope(value: AdminScope): Promise<void> {
    if (!this.auth.isSuperAdmin()) return;
    ++this.requestId;
    this.error.set(null);
    this.persist(value);
    this.scopeSignal.set(value);
    this.sellerIdsSignal.set(new Set());
    this.reloadCountSignal.update((n) => n + 1);
    if (value === 'red') await this.loadSellerIds();
  }

  toggle(): void {
    void this.setScope(this.scopeSignal() === 'red' ? 'todos' : 'red');
  }

  /**
   * Resuelve los vendedores asociados al super admin:
   * `profiles.socio_id = auth.uid()` + el propio super admin (sus cotizaciones).
   * El resultado se cachea mientras el modo "red" este activo; se invalida
   * al volver a "todos".
   */
  private async loadSellerIds(): Promise<void> {
    const request = ++this.requestId;
    await sessionReady();
    const uid = currentUserSignal()?.id;
    if (!uid || !this.isRedMode() || request !== this.requestId) return;
    try {
      const { data, error } = await this.client
        .from('profiles')
        .select('id')
        .eq('role', 'seller')
        .eq('socio_id', uid);
      if (request !== this.requestId || uid !== currentUserSignal()?.id) return;
      if (error) throw error;
      const ids = new Set<string>((data ?? []).map((row: { id: string }) => row.id));
      ids.add(uid);
      this.sellerIdsSignal.set(ids);
    } catch {
      if (request !== this.requestId) return;
      this.sellerIdsSignal.set(new Set());
      this.error.set('No se pudo cargar tu red. Vuelve a seleccionar Mis vendedores para reintentar.');
    }
    this.reloadCountSignal.update((n) => n + 1);
  }
}
