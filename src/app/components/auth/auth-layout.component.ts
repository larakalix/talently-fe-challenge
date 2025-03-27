import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { SessionStateService } from '../../state/session-store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-layout',
  imports: [CommonModule, RouterOutlet, MatCardModule],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLayoutComponent {
  private sessionStore = inject(SessionStateService);
  session$ = this.sessionStore.useStore((state) => state.session);
}
