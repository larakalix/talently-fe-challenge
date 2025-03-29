import { inject, Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { SessionStateService } from '../state/session-store';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private sessionStore = inject(SessionStateService);

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const requiresAuth: boolean = route.data['requiresAuth'] ?? false;
    const { session } = this.sessionStore.session();

    if (requiresAuth && !session) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    if (!requiresAuth && session) {
      this.router.navigate(['/tasks']);
      return false;
    }

    return true;
  }
}
