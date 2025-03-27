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

  getTasks(): Observable<ApiResponse<Task[]>> {
    const { session } = this.sessionService.getState();
    if (!session) return throwError(() => 'No session found');

    const headers = this.defaultHeaders.append(
      'Authorization',
      `Bearer ${session.token}`
    );

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
}
