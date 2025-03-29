import type { Task } from '../types/task.type';
import { Injectable, signal, computed, effect } from '@angular/core';
import { isBrowser } from '../utils/utils.methods';

export type TaskState = {
  tasks: Task[];
};

export const SESSION_STORAGE_KEY = 'task-store';

@Injectable({
  providedIn: 'root',
})
export class TaskStateService {
  private readonly _tasks = signal<TaskState>(this.loadTasks());

  readonly tasks = computed(() => this._tasks());

  constructor() {
    effect(() => {
      if (!isBrowser()) return;

      const current = this._tasks();
      if (current) {
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(current));
      } else {
        localStorage.removeItem(SESSION_STORAGE_KEY);
      }
    });
  }

  setTasks(tasks: Task[]): void {
    this._tasks.set({
      tasks,
    });
  }

  clearTasks(): void {
    this._tasks.set({
      tasks: [],
    } as TaskState);
  }

  addTask(task: Task): void {
    this._tasks.update((prev) => ({
      tasks: [...prev.tasks, task],
    }));
  }

  updateTask(updatedTask: Task): void {
    this._tasks.update((prev) => ({
      tasks: prev.tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      ),
    }));
  }

  removeTask(id: string): void {
    this._tasks.update((prev) => ({
      tasks: prev.tasks.filter((task) => task.id !== id),
    }));
  }

  private loadTasks(): TaskState {
    try {
      const stored = localStorage.getItem(SESSION_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored) as TaskState;
      }
      return { tasks: [] };
    } catch {
      return {
        tasks: [],
      };
    }
  }
}
