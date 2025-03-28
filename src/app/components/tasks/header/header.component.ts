import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { SessionStateService } from '../../../state/session-store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks-header',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatToolbarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private sessionStore = inject(SessionStateService);
  session$ = this.sessionStore.useStore((state) => state.session);

  constructor(private router: Router) {}

  logout(): void {
    const { setSession } = this.sessionStore.getState();

    setSession(null);
    this.router.navigate(['/auth/login']);
  }
}
