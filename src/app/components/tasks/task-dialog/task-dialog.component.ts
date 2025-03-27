import type { Task } from '../../../types/task.type';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogTitle,
  MatDialogActions,
} from '@angular/material/dialog';
import { TaskService } from '../../../services/tasks/task.service';
import { TaskStateService } from '../../../state/tasks-store';

export type DialogData = {
  task: Task | null;
};

@Component({
  selector: 'app-task-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './task-dialog.component.html',
  styleUrl: './task-dialog.component.scss',
})
export class TaskDialogComponent {
  private taskStore = inject(TaskStateService);
  data = inject(MAT_DIALOG_DATA) as DialogData;
  form: FormGroup;
  statuses = [
    { value: 'todo', label: 'To do' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'done', label: 'Done' },
  ];

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    private fb: FormBuilder,
    private taskService: TaskService
  ) {
    const { task } = this.data;

    this.form = this.fb.group({
      title: [task ? task.title : ''],
      description: [task ? task.description : ''],
      status: [task ? task.status : 'todo'],
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  submit(): void {
    if (this.form.valid) {
      const { task } = this.data;
      const formTask = this.form.value as Pick<
        Task,
        'title' | 'description' | 'status'
      >;

      const newTask = {
        ...task,
        ...formTask,
      } as Task;

      if (!task) {
        this.createTask(newTask);
      } else {
        this.updateTask(newTask);
      }

      // this.dialogRef.close(this.form.value);
    }
  }

  deleteTask(id: Task['id']): void {
    this.taskService.deleteTask(id).subscribe({
      next: (response) => {
        const { removeTask } = this.taskStore.getState();
        console.log('Deleted task:', response);
        removeTask(id);
      },
      error: (error) => {
        console.error('Error deleting task:', error);
      },
    });
  }

  private createTask(task: Task): void {
    this.taskService.createTask(task).subscribe({
      next: (response) => {
        const { addTask } = this.taskStore.getState();
        console.log('Created task:', response);
        addTask(response.data);
      },
      error: (error) => {
        console.error('Error creating task:', error);
      },
    });
  }

  private updateTask(task: Task): void {
    this.taskService.updateTask(task).subscribe({
      next: (response) => {
        const { updateTask } = this.taskStore.getState();
        console.log('Updated task:', response);
        updateTask(task);
      },
      error: (error) => {
        console.error('Error updating task:', error);
      },
    });
  }
}
