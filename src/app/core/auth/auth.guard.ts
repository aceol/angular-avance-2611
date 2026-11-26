import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthStore } from './auth.store';

export const authGuard: CanMatchFn = (route, state) => {
  const authStore = inject(AuthStore);
  if (authStore.isLoggedIn()) {
    return true;
  }

  const router = inject(Router);
  // Redirige vers la page de login si non connecté
  return router.createUrlTree(['/login']);
};
