import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {
  SessionState,
  SessionStateService,
} from '../../../state/session-store';
import { TaskStateService } from '../../../state/tasks-store';

@Component({
  selector: 'app-tasks-header',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatToolbarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private taskStore = inject(TaskStateService);
  private sessionStore = inject(SessionStateService);

  public readonly sessionState: SessionState = inject(SessionStateService).session();

  constructor(private router: Router) {}

  logout(): void {
    this.taskStore.clearTasks();
    this.sessionStore.clearSession();

    this.router.navigate(['/auth/login']);
  }
}
