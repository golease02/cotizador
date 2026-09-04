import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const AuthGuard = async () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    // Esperar a que la sesión se resuelva (sin polling)
    await auth.waitForSession();

    const user = auth.currentUser();
    if (!user) {
        router.navigate(['/login']);
        return false;
    }

    // Cargar perfil si no está disponible
    let profile = auth.currentProfile();
    if (!profile) {
        profile = await auth.loadProfile(user.id);
    }

    if (profile?.active === false) {
        await auth.signOut();
        router.navigate(['/login']);
        return false;
    }

    return true;
};
