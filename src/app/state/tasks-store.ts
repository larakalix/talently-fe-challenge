import type { Task } from '../types/task.type';
import { Injectable } from '@angular/core';
import { StateCreator, ZustandBaseService } from 'ngx-zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';

export type TaskState = {
  tasks: Task[];
  addTask: (task: Task) => void;
  removeTask: (id: string) => void;
  updateTask: (task: Task) => void;
  clearTasks: () => void;
  setTasks: (tasks: Task[]) => void;
};

@Injectable({
  providedIn: 'root',
})
export class TaskStateService extends ZustandBaseService<TaskState> {
  initStore(): StateCreator<TaskState> {
    return (set, get) => ({
      tasks: [],
      addTask: (task: Task) =>
        set((state) => ({ tasks: [...state.tasks, task] })),
      removeTask: (id: string) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      updateTask: (task: Task) => {
        const { tasks } = get();
        const taskIndex = tasks.findIndex((t) => t.id === task.id);
        if (taskIndex === -1) return;

        tasks[taskIndex] = task;
        set({ tasks });
      },
      clearTasks: () => set({ tasks: [] }),
      setTasks: (tasks: Task[]) => set({ tasks }),
    });
  }

  override createStore() {
    return createStore(
      persist<TaskState>(this.initStore(), {
        name: 'task-storage',
        storage: createJSONStorage(() => sessionStorage),
      })
    );
  }
}
