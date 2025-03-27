import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SessionStateService } from '../state/session-store';

@Injectable({
  providedIn: 'root',
})
export class SessionGuard implements CanActivate {
  private sessionStore = inject(SessionStateService);

  constructor(private router: Router) {}

  canActivate(): boolean {
    const { session } = this.sessionStore.getState();

    console.log('SessionGuard', session);

    if (!session) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    return true;
  }
}
