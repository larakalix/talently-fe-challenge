import { inject, Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';
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
  ): Observable<boolean> {
    const requiresAuth: boolean = route.data['requiresAuth'];

    return this.sessionStore
      .useStore((state) => state.session)
      .pipe(
        filter((session) => session !== undefined),
        first(),
        map((session) => {
          if (requiresAuth && !session) {
            this.router.navigate(['/auth/login']);
            return false;
          }

          if (!requiresAuth && session) {
            this.router.navigate(['/tasks']);
            return false;
          }

          return true;

        })
      );
  }
}
