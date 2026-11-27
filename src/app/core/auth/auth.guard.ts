import { inject, PLATFORM_ID } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthStore } from './auth.store';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanMatchFn = (route, state) => {
  const platformId = inject(PLATFORM_ID);
  if (!isPlatformBrowser(platformId)) return true;
  const authStore = inject(AuthStore);

  if (authStore.isLoggedIn()) {
    return true;
  }

  const router = inject(Router);
  // Redirige vers la page de login si non connecté
  return router.createUrlTree(['/login']);
};
