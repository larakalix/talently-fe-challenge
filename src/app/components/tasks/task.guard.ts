import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { sessionSignal } from '../../state/session.signal';

@Injectable({ providedIn: 'root' })
export class TaskGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (sessionSignal()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
