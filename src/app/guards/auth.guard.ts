import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';

export const AuthGuard = async () => {
    const supabase = inject(SupabaseService);
    const router = inject(Router);

    // Esperar usuario
    let intentos = 0;
    while (!supabase.currentUser() && intentos < 15) {
        await new Promise(resolve => setTimeout(resolve, 200));
        intentos++;
    }

    if (!supabase.currentUser()) {
        router.navigate(['/login']);
        return false;
    }

    // Cargar perfil si no está disponible
    let profile = supabase.currentProfile();
    if (!profile) {
        const user = supabase.currentUser();
        if (user) {
            profile = await supabase.loadProfile(user.id);
        }
    }

    if (profile?.active === false) {
        await supabase.signOut();
        router.navigate(['/login']);
        return false;
    }

    // ✅ Permitir acceso a todas las rutas (el adminGuard se encargará de /admin)
    return true;
};
