import type { LoadingState } from '../../types/common-state.type';
import type { Task } from '../../types/task.type';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { finalize } from 'rxjs';
import { TaskService } from '../../services/tasks/task.service';
import { SessionStateService } from '../../state/session-store';
import { TaskStateService } from '../../state/tasks-store';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { HeaderComponent } from './header/header.component';
import { ConfirmDialogComponent } from '../../ui/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-tasks',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    HeaderComponent,
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

  constructor(private taskService: TaskService) {}

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

  deleteTask(id: Task['id']): void {
    this.taskService.deleteTask(id).subscribe({
      next: (response) => {
        const { removeTask } = this.taskStore.getState();
        removeTask(id);
      },
      error: (error) => {
        console.error('Error deleting task:', error);
      },
    });
  }

  confirmDelete(task: Task): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'Confirm Deletion',
        message: `Are you sure you want to delete the task "${task.title}"?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      if (result === true) {
        this.deleteTask(task.id!);
      }
    });
  }
}
