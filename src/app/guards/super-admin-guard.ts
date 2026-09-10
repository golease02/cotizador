import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const superAdminGuard = async () => {
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

  if (profile?.role === 'super_admin' && profile.active !== false) {
    return true;
  } else {
    router.navigate(['/admin']);
    return false;
  }
};