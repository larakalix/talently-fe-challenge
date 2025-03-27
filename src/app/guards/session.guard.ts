import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { sessionSignal } from '../state/session.signal';

@Injectable({
  providedIn: 'root',
})
export class SessionGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (!sessionSignal()) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    return true;
  }
}
