import { signal } from '@angular/core';
import { createClient, SupabaseClient, Session, User } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

let _client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (!_client) {
    _client = createClient(environment.supabaseUrl, environment.supabaseKey);
  }
  return _client;
}

let _sessionReadyPromise: Promise<void> | null = null;

export function sessionReady(): Promise<void> {
  if (!_sessionReadyPromise) {
    _sessionReadyPromise = resolveSessionReady();
  }
  return _sessionReadyPromise;
}

async function resolveSessionReady(): Promise<void> {
  const client = getSupabaseClient();
  const { data } = await client.auth.getSession();
  if (data?.session?.user) {
    currentUserSignal.set(data.session.user);
  }
}

export const currentUserSignal = signal<User | null>(null);

export function resetSessionReady(): void {
  _sessionReadyPromise = null;
  currentUserSignal.set(null);
}

export function setSessionUser(user: User | null): void {
  currentUserSignal.set(user);
  // Un login exitoso ya resolvió la sesión; evita que el guard vuelva a
  // consultar getSession() al navegar a la página destino.
  if (user) {
    _sessionReadyPromise = Promise.resolve();
  }
}

export type { Session };
