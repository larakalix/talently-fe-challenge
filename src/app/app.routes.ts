import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  {
    path: 'tasks',
    loadComponent: () =>
      import('./components/tasks/tasks.component').then(
        (m) => m.TasksComponent
      ),
  },
  {
    path: 'auth',
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
