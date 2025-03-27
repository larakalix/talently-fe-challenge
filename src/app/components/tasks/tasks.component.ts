import type { LoadingState } from '../../types/common-state.type';
import type { Task } from '../../types/task.type';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TaskService } from '../../services/tasks/task.service';
import { SessionStateService } from '../../state/session-store';
import { TaskStateService } from '../../state/tasks-store';
import { finalize } from 'rxjs';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';

@Component({
  selector: 'app-tasks',
  imports: [
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent implements OnInit {
  readonly dialog = inject(MatDialog);

  private sessionStore = inject(SessionStateService);
  private taskStore = inject(TaskStateService);

  session$ = this.sessionStore.useStore((state) => state.session);
  tasks$ = this.taskStore.useStore((state) => state.tasks);

  loadingState: LoadingState = 'idle';

  constructor(private router: Router, private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadingState = 'loading';

    this.taskService
      .getTasks()
      .pipe(
        finalize(() => {
          this.loadingState = 'idle';
        })
      )
      .subscribe({
        next: (response) => {
          const { setTasks } = this.taskStore.getState();
          setTasks(response.data);
        },
        error: (err) => console.error('Error fetching tasks:', err),
      });
  }

  openDialog() {}

  addTask(task?: Task): void {
    this.dialog.open(TaskDialogComponent, { data: { task } });
  }

  editTask(task: Task): void {
    this.dialog.open(TaskDialogComponent, { data: { task } });
  }

  deleteTask(task: Task): void {}

  logout(): void {
    const { setSession } = this.sessionStore.getState();

    setSession(null);
    this.router.navigate(['/auth/login']);
  }
}
