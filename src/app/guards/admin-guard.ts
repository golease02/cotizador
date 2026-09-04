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

  if (profile?.role === 'admin' && profile.active !== false) {
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
