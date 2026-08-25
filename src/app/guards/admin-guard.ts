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

  console.log('🔍 adminGuard - Perfil:', profile);

  if (profile?.role === 'admin') {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};