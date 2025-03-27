import type { AuthUser, AuthCredentials } from '../../types/auth.type';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../../environment';
import { ApiResponse } from '../../types/api.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private defaultHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  login(credentials: AuthCredentials): Observable<ApiResponse<AuthUser>> {
    return this.http
      .post<ApiResponse<AuthUser>>(
        `${environment.API_URL}auth/login`,
        credentials,
        {
          headers: this.defaultHeaders,
        }
      )
      .pipe(
        tap((response) => {
          return response;
        }),
        catchError((error) => {
          console.error('Login error:', error);
          return throwError(() => error);
        })
      );
  }

  register(
    user: AuthCredentials
  ): Observable<ApiResponse<Omit<AuthUser, 'token'>>> {
    return this.http
      .post<ApiResponse<Omit<AuthUser, 'token'>>>(
        `${environment.API_URL}auth/register`,
        user,
        {
          headers: this.defaultHeaders,
        }
      )
      .pipe(
        tap((response) => {
          return response;
        }),
        catchError((error) => {
          console.error('Register error:', error);
          return throwError(() => error);
        })
      );
  }
}
