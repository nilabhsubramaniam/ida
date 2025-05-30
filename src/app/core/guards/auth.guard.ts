import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map, tap } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  return authService.isLoggedIn$.pipe(
    tap(isLoggedIn => {
      if (!isLoggedIn) {
        // Redirect to login if not authenticated
        router.navigate(['/login'], {
          queryParams: { returnUrl: state.url }
        });
      } else {
        // Special handling for root path - if logged in and trying to access root
        // redirect to dashboard, unless explicitly coming from login
        if (state.url === '/' && !state.root.queryParams['fromLogin']) {
          router.navigate(['/dashboard']);
        }
      }
    }),
    map(isLoggedIn => isLoggedIn) // Return true if logged in, false otherwise
  );
};
