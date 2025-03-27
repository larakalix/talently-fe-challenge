import type { Task } from './../types/task.type';
import { signal } from '@angular/core';

export const tasksSignal = signal<Task[]>([]);
