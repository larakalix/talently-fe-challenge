import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-auth-form-base',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: '',
})
export abstract class AuthFormBase {
  form!: FormGroup;

  constructor(protected authService: AuthService) {}

  isFieldTouched(fieldName: string): boolean {
    return this.form.get(fieldName)?.touched ?? false;
  }

  hasFieldError(fieldName: string, errorName: string): boolean {
    return this.form.get(fieldName)?.errors?.[errorName] ?? false;
  }
}
