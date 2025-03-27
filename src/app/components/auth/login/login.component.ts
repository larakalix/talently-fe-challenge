import type { AuthCredentials, AuthUser } from '../../../types/auth.type';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthFormBase } from '../common/auth-form.base';
import { SharedFormModule } from '../common/shared-form.module';
import { AuthService } from '../../../services/auth/auth.service';
import { SessionStateService } from '../../../state/session-store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedFormModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent extends AuthFormBase {
  private sessionStore = inject(SessionStateService);

  constructor(
    private router: Router,
    private fb: FormBuilder,
    authService: AuthService
  ) {
    super(authService);

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  setState(session: AuthUser): void {
    const { setSession } = this.sessionStore.getState();
    setSession(session);
  }

  async onSubmit(): Promise<void> {
    if (this.form.valid) {
      const credentials = this.form.value satisfies AuthCredentials;

      this.authService.login(credentials).subscribe({
        next: (response) => {
          this.setState(response.data);
          this.router.navigate(['/tasks']);
        },
        error: (error) => {
          console.error('Error logging in:', error);
        },
      });
    }
  }
}
