import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';

export const AuthGuard = async () => {
    const supabase = inject(SupabaseService);
    const router = inject(Router);

    let intentos = 0;
    while (!supabase.currentUser() && intentos < 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        intentos++;
    }

    if (supabase.currentUser()) {
        return true;
    } else {
        router.navigate(['/login']);
        return false;
    }
};

