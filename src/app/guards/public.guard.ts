import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';
import { SessionStateService } from '../state/session-store';
@Injectable({
  providedIn: 'root',
})
export class PublicGuard implements CanActivate {
  private sessionStore = inject(SessionStateService);

  constructor(private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.sessionStore
      .useStore((state) => state.session)
      .pipe(
        filter((session) => session !== undefined),
        first(),
        map((session) => {
          if (!session) {
            return true;
          }
          this.router.navigate(['/tasks']);
          return false;
        })
      );
  }
}
