/**
 * Purpose: Component for user login form and handling auth logic.
 * Notes:
   - Uses Reactive Forms for validation (email + password).
   - Calls AuthService to perform login request to backend.
   - Shows loading state and error messages for better UX.
 */

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export default class LoginComponent {
  // get services with Angular "inject". Dependencies via inject — available before field initialisation
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);

  // Form creation. Define form with validation rules
  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],   // must be valid email
    password: ['', Validators.required],                    // password is required
  });

  loading = false;                // shows spinner/disabled button
  error: string | null = null;    // store error from backend

  /** Handle login submit */
  submit() {
    // stop if form invalid or already loading
    if (this.form.invalid || this.loading) return;

    this.loading = true;
    this.error = null;

    const { email, password } = this.form.value;

    // call backend login via AuthService
    this.auth.login({ email: email as string, password: password as string }).subscribe({
      next: () => {
        // login success -> stop loading, navigation handled in service
        this.loading = false;
      },

      error: (e) => {
        // show error from API or default message
        this.loading = false;
        this.error = e?.error?.message || 'Login failed';
      },
    });
  }
}
