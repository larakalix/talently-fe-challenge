import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environment';
import { sessionSignal } from '../../state/session.signal';
import { Task } from '../../types/task.type';
import { tasksSignal } from '../../state/tasks.signal';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  fetchTasks() {
    const token = sessionSignal()?.token;
    if (!token) return;

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http
      .get<Task[]>(`${environment.API_URL}tasks`, { headers })
      .subscribe((tasks) => tasksSignal.set(tasks));
  }
}
