import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../../environment';
import { Task } from '../../types/task.type';
import { SessionStateService } from '../../state/session-store';
import { ApiResponse } from '../../types/api.type';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private sessionService = inject(SessionStateService);

  private defaultHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  getHeaders(): HttpHeaders {
    const { session } = this.sessionService.getState();
    if (!session) return this.defaultHeaders;

    return this.defaultHeaders.append(
      'Authorization',
      `Bearer ${session.token}`
    );
  }

  getTasks(): Observable<ApiResponse<Task[]>> {
    const headers = this.getHeaders();

    return this.http
      .get<ApiResponse<Task[]>>(`${environment.API_URL}tasks`, { headers })
      .pipe(
        tap((response) => {
          return response;
        }),
        catchError((error) => {
          console.error('Fetch tasks error:', error);
          return throwError(() => error);
        })
      );
  }

  createTask(task: Task): Observable<ApiResponse<Task>> {
    const headers = this.getHeaders();

    return this.http
      .post<ApiResponse<Task>>(`${environment.API_URL}tasks`, task, {
        headers,
      })
      .pipe(
        tap((response) => {
          return response;
        }),
        catchError((error) => {
          console.error('Create task error:', error);
          return throwError(() => error);
        })
      );
  }

  updateTask(task: Task): Observable<ApiResponse<Task>> {
    const headers = this.getHeaders();

    return this.http
      .post<ApiResponse<Task>>(`${environment.API_URL}tasks`, task, {
        headers,
      })
      .pipe(
        tap((response) => {
          return response;
        }),
        catchError((error) => {
          console.error('Create task error:', error);
          return throwError(() => error);
        })
      );
  }

  deleteTask(id: Task['id']): Observable<ApiResponse<Task>> {
    const headers = this.getHeaders();

    return this.http
      .delete<ApiResponse<Task>>(`${environment.API_URL}tasks/${id}`, {
        headers,
      })
      .pipe(
        tap((response) => {
          return response;
        }),
        catchError((error) => {
          console.error('Delete task error:', error);
          return throwError(() => error);
        })
      );
  }
}
