import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { SessionState, SessionStateService } from '../../state/session-store';
import { AuthUser } from '../../types/auth.type';

@Component({
  selector: 'app-auth-layout',
  imports: [CommonModule, RouterOutlet, MatCardModule],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLayoutComponent {
  public readonly sessionStore: SessionState =
    inject(SessionStateService).session();

  constructor() {}
}
