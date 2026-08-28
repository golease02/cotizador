import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';

export const adminGuard = async () => {
  const supabase = inject(SupabaseService);
  const router = inject(Router);

  // Cargar perfil si no está disponible
  let profile = supabase.currentProfile();
  if (!profile) {
    const user = supabase.currentUser();
    if (user) {
      profile = await supabase.loadProfile(user.id);
    }
  }

  if (profile?.role === 'admin' && profile.active !== false) {
    return true;
  } else {
    if (profile?.active === false) {
      await supabase.signOut();
      router.navigate(['/login']);
      return false;
    }
    router.navigate(['/']);
    return false;
  }
};
