/**
 * Purpose: Protects Angular routes from unauthenticated access.
 * Notes:
   - Requirement: only logged-in users can access feed, posts CRUD, and comments.
   - If no valid token, redirect to login and block navigation.
 */


import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

 /** Angular DI metadata: makes guard available app-wide */
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  
  /** Gate navigation: allow only if user is authenticated */
  canActivate(): boolean {
    if (this.auth.isAuthenticated) return true;
  // Security: if no token -> redirect to login
    this.router.navigate(['/login']);
    return false;
  }
}
