import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SessionStateService } from '../state/session-store';

@Injectable({
  providedIn: 'root',
})
export class PublicGuard implements CanActivate {
  private sessionStore = inject(SessionStateService);

  constructor(private router: Router) {}

  canActivate(): boolean {
    const { session } = this.sessionStore.getState();

    if (session) {
      this.router.navigate(['/tasks']);
      return false;
    }

    return true;
  }
}
