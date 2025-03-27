import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { sessionSignal } from '../state/session.signal';

@Injectable({
  providedIn: 'root',
})
export class PublicGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (sessionSignal()) {
      this.router.navigate(['/tasks']);
      return false;
    }

    return true;
  }
}
