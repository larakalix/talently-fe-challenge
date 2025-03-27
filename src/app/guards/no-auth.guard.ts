import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AppStateService } from '../services/app-state/app-state.service';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(private state: AppStateService, private router: Router) {}

  canActivate(): boolean {
    if (!this.state.session()) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    return true;
  }
}
