import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export default class RegisterComponent {
  // using inject() instead of constructor for cleaner code
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);

  // reactive form setup: simple structure with basic validation
  form: FormGroup = this.fb.group({
    name: ['', Validators.required],                        // name is required
    email: ['', [Validators.required, Validators.email]],   // must look like a valid email
    password: ['', Validators.required],                    // password required
    password_confirmation: ['', Validators.required],       // confirm password field
  });

  loading = false;                                          // used to disable button & show spinner state
  error: string | null = null;                              // place to display error messages

  submit() {
     // prevent sending if form is invalid or already in progress
    if (this.form.invalid || this.loading) return;
    this.loading = true;
    this.error = null;

    // send form data to AuthService
    this.auth.register(this.form.value as any).subscribe({
      next: () => {
        this.loading = false;
        // on success we could navigate user to /login or home page
      },
      error: (e) => {
        this.loading = false;
        // show backend error message if available, otherwise a default text
        this.error = e?.error?.message || 'Register failed';
      },
    });
  }
}
