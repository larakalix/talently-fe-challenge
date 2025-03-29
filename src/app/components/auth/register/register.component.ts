import type { AuthCredentials } from '../../../types/auth.type';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthFormBase } from '../common/auth-form.base';
import { SharedFormModule } from '../common/shared-form.module';
import { AuthService } from '../../../services/auth/auth.service';
import { SessionStateService } from '../../../state/session-store';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedFormModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent extends AuthFormBase {
  private sessionStore = inject(SessionStateService);

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder,
    authService: AuthService
  ) {
    super(authService);

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const credentials = this.form.value satisfies AuthCredentials;

      this.authService.register(credentials).subscribe({
        next: (response) => {
          this.sessionStore.getState().setSession(response.data);

          this.toastr.success('Registration successful', 'Success');

          this.form.reset();
          this.router.navigate(['/tasks']);
        },
        error: (error) => {
          console.error('Error registering:', error);
          this.toastr.error('Registration failed', 'Error');
        },
      });
    }
  }
}
