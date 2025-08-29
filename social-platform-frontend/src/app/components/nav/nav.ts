/**
 * Purpose: Navigation component for the Social Publishing Platform.
*/

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './nav.html',
  styleUrls: ['./nav.css'],
})

/** Component entry point: controls navbar UI and auth-based routing */
export default class NavComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  get isAuth() { return this.auth.isAuthenticated; }
  get user() { return this.auth.currentUser; }

/** Logout logic: clears token/session and redirects to login page */
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
