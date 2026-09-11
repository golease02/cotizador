import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard = async () => {
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

  if (
    (profile?.role === 'super_admin' || profile?.role === 'socio') &&
    profile.active !== false
  ) {
    return true;
  } else {
    if (profile?.active === false) {
      await auth.signOut();
      router.navigate(['/login']);
      return false;
    }
    router.navigate(['/']);
    return false;
  }
};

/**
 * Guard de permisos granulares para rutas hijas del panel admin.
 * - super_admin siempre tiene acceso.
 * - socio solo accede si su JSONB de permisos le otorga el módulo.
 * - El módulo 'dashboard' siempre está permitido (permite llegar al panel).
 */
export const moduleGuard = (module: string) => {
  return async () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    await auth.waitForSession();

    const profile = auth.currentProfile();
    if (!profile) {
      router.navigate(['/login']);
      return false;
    }

    if (auth.canAccessModule(module)) {
      return true;
    }

    // Sin permisos → redirigir al dashboard del admin
    router.navigate(['/admin']);
    return false;
  };
};
