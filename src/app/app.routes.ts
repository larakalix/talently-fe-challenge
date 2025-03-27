import { Routes } from '@angular/router';
import { SessionGuard } from './guards/session.guard';
import { PublicGuard } from './guards/public.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  {
    path: 'tasks',
    canActivate: [SessionGuard],
    loadComponent: () =>
      import('./components/tasks/tasks.component').then(
        (m) => m.TasksComponent
      ),
  },
  {
    path: 'auth',
    canActivate: [PublicGuard],
    loadComponent: () =>
      import('./components/auth/auth-layout.component').then(
        (m) => m.AuthLayoutComponent
      ),
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () =>
          import('./components/auth/login/login.component').then(
            (m) => m.LoginComponent
          ),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./components/auth/register/register.component').then(
            (m) => m.RegisterComponent
          ),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
