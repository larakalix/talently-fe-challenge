import type { AuthUser, AuthCredentials } from '../../types/auth.type';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment';
import { sessionSignal } from '../../state/session.signal';
import { tasksSignal } from '../../state/tasks.signal';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: AuthCredentials) {
    return this.http
      .post<AuthUser>(`${environment.API_URL}auth/login`, credentials)
      .subscribe((response) => sessionSignal.set(response));
  }

  register(user: AuthCredentials) {
    return this.http.post(`${environment.API_URL}auth/register`, user);
  }

  logout() {
    sessionSignal.set(null);
    tasksSignal.set([]);
  }
}
