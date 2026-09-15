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

/** Guard de redirección por rol para la ruta raíz del admin (`/admin`).
 *  - super_admin → carga AdminStatsComponent (Dashboard global).
 *  - socio activo → redirige a /admin/rendimiento (nunca ve admin-stats).
 *  Los vendedores son rechazados por el adminGuard del padre. */
export const adminHomeGuard = async (): Promise<boolean> => {
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

  const currentProfile = auth.currentProfile();
  if (!currentProfile || currentProfile.active === false) {
    if (currentProfile?.active === false) {
      await auth.signOut();
    }
    router.navigate(['/login']);
    return false;
  }

  if (currentProfile.role === 'super_admin') {
    return true;
  }

  // socio activo → su panel principal es Rendimiento
  router.navigate(['/admin/rendimiento']);
  return false;
};

/** Redirect target for any module that the current socio does not have access to.
 *  Kept as a constant so both the guard and the template stay aligned. */
const MODULE_FORBIDDEN_ROUTE = '/admin/sin-acceso';

/** Guard de permisos granulares para rutas hijas del panel admin.
 *  - super_admin siempre tiene acceso (canAccessModule devuelve true).
 *  - socio solo accede si su JSONB de permisos le otorga el módulo.
 *  - 'dashboard'/'stats' son exclusivos del super admin; 'rendimiento' es
 *    inherente al socio y no usa este guard (se valida vía adminGuard del padre).
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

    // Sin permisos → redirigir a la página de "Sin acceso" en lugar de volver
    // a `/admin`, que volvería a disparar la misma evaluación y producir un loop.
    router.navigate([MODULE_FORBIDDEN_ROUTE]);
    return false;
  };
};
