import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';

export const adminGuard = async () => {
  const supabase = inject(SupabaseService);
  const router = inject(Router);

  let intentos = 0;
  while (!supabase.currentProfile() && intentos < 10) {
    await new Promise(resolve => setTimeout(resolve, 200));
    intentos++;
  }

  const profile = supabase.currentProfile();
  console.log('🔍 AdminGuard - Perfil:', profile);

  if (profile?.role === 'admin') {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};