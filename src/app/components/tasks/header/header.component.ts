import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { SessionStateService } from '../../../state/session-store';
import { Router } from '@angular/router';
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
  session$ = this.sessionStore.useStore((state) => state.session);

  constructor(private router: Router) {}

  logout(): void {
    const { setSession } = this.sessionStore.getState();
    const { clearTasks } = this.taskStore.getState();

    clearTasks();
    setSession(null);

    this.router.navigate(['/auth/login']);
  }
}
