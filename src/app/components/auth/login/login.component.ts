import type { AuthCredentials } from '../../../types/auth.type';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthFormBase } from '../common/auth-form.base';
import { SharedFormModule } from '../common/shared-form.module';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedFormModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent extends AuthFormBase {
  constructor(private fb: FormBuilder, authService: AuthService) {
    super(authService);

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  async onSubmit(): Promise<void> {
    if (this.form.valid) {
      const credentials = this.form.value satisfies AuthCredentials;
      console.log('credentials ->', credentials);

      this.authService.login(credentials);
    }
  }
}
