import type { AuthUser } from '../../types/auth.type';
import type { Task } from '../../types/task.type';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  session = signal<AuthUser | null>(null);

  tasks = signal<Task[]>([]);

  setSession(user: AuthUser) {
    this.session.set(user);
  }

  clearSession() {
    this.session.set(null);
  }

  setTasks(newTasks: Task[]) {
    this.tasks.set(newTasks);
  }
}
