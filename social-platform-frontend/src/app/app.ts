import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, Router, RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import { User } from './models/user';
import NavComponent from './components/nav/nav';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavComponent, RouterModule],
  templateUrl: './app.html',
})
export default class App {
  // inject services (auth for user state, router for navigation)
  private auth = inject(AuthService);
  private router = inject(Router);

  // getter: returns currently logged-in user (or null if not logged in)
  get currentUser(): User | null {
    return this.auth.currentUser; 
  }

  // simple boolean flag to check if user is authenticated
  get isLoggedIn(): boolean {
    return this.auth.isAuthenticated;
  }

  // logout action: clears session + redirects to login page
  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
