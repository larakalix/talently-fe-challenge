import type { AuthCredentials } from '../../../types/auth.type';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthFormBase } from '../common/auth-form.base';
import { SharedFormModule } from '../common/shared-form.module';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedFormModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent extends AuthFormBase {
  constructor(private fb: FormBuilder, authService: AuthService) {
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
          // Redirect or update UI as needed
          console.log('Registered user:', response);
        },
        error: (error) => {
          console.error('Error registering:', error);
        },
      });
    }
  }
}
