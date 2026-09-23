import { Injectable, computed, signal } from '@angular/core';

/**
 * Alcance global del panel admin.
 *
 * ELIMINACIÓN DEL TOGGLE — ajuste 11 (punto 1):
 *  - El super admin ve **siempre TODOS** los datos. El toggle "Todos / Solo mi red"
 *    fue eliminado del sidebar. `isScopeVisible()` devuelve `false`.
 *  - El socio y el seller no usan este toggle: su alcance lo impone RLS + RPCs
 *    server-side (`get_seller_scope_ids()`), por lo que `isRedMode()` devuelve `false`
 *    para ellos y `sellerIds()` devuelve `undefined` (sin filtrado local).
 *
 * Las señales `reloadCount` y `error` se conservan para no romper a consumidores
 * que aún las consultan (`admin-seller-performance`, `admin-seguimiento`).
 */
@Injectable({
  providedIn: 'root',
})
export class AdminScopeService {
  /** Alcance actual. Siempre 'todos': el toggle fue eliminado (punto 1). */
  readonly scope = signal<'todos'>('todos');

  /**
   * IDs de vendedores visibles en la "red" del usuario.
   *  - super admin → siempre undefined (ve todo vía RLS `is_admin()`).
   *  - socio / seller → undefined (el filtrado es server-side vía `get_seller_scope_ids`).
   * Se conserva como `computed` para compatibilidad con consumidores que
   * filtran localmente cuando es distinto de `undefined`.
   */
  readonly sellerIds = computed<Set<string> | undefined>(() => {
    // El toggle "Solo mi red" fue eliminado: nunca hay filtrado local.
    return undefined;
  });

  /** El toggle se eliminó: el alcance es siempre "todos". No visible para nadie. */
  readonly isScopeVisible = computed(() => false);

  /** Siempre false: el super admin ve todo, los demás filtran server-side. */
  readonly isRedMode = computed(() => false);

  /** Contador de recargas forzadas (no-op; se mantiene para consumidores que lo observan). */
  readonly reloadCount = signal(1);

  /** Sin error por defecto (no-op). */
  readonly error = signal<Error | null>(null);

  /** No-op: el toggle fue eliminado. El alcance es permanente "todos". */
  async setScope(): Promise<void> {}

  /** No-op: el toggle fue eliminado. */
  toggle(): void {}
}


