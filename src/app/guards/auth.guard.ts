import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';  // ← cerrar comilla

export const AuthGuard = () => {
    const supabase = inject(SupabaseService);
    const router = inject(Router);

    if (supabase.currentUser()) {
        return true;
    } else {
        router.navigate(['/login']);
        return false;
    }
};