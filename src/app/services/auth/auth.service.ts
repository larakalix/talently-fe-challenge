import type { AuthUser, AuthCredentials } from '../../types/auth.type';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environment';
import { sessionSignal } from '../../state/session.signal';
import { tasksSignal } from '../../state/tasks.signal';
import { ApiResponse } from '../../types/api.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private defaultHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  login(credentials: AuthCredentials) {
    return this.http
      .post<ApiResponse<AuthUser>>(
        `${environment.API_URL}auth/login`,
        credentials,
        { headers: this.defaultHeaders }
      )
      .subscribe({
        next: (response) => {
          console.log('login ->', response);
          sessionSignal.set(response.data);
        },
        error: (error) => {
          console.error('Login ERROR ->', error);
        },
      });
  }

  register(user: AuthCredentials) {
    return this.http
      .post<ApiResponse<Omit<AuthUser, 'token'>>>(
        `${environment.API_URL}auth/register`,
        user,
        { headers: this.defaultHeaders }
      )
      .subscribe({
        next: (response) => {
          console.log('register ->', response);
          sessionSignal.set(response.data);
        },
        error: (error) => {
          console.error('Register ERROR ->', error);
        },
      });
  }

  logout() {
    sessionSignal.set(null);
    tasksSignal.set([]);
  }
}
