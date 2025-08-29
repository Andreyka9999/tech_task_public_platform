import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

// DTO types just describe what data we send/receive to the API
type LoginDto = { email: string; password: string };
type RegisterDto = { name: string; email: string; password: string; password_confirmation: string };
type LoginResponse = { token: string; user: User };
type RegisterResponse = { token: string; user: User };

@Injectable({ providedIn: 'root' })
export class AuthService {
  // keep token in memory + localStorage (so user stays logged in after refresh)
  token: string | null = localStorage.getItem('token');
  private _currentUser: User | null = JSON.parse(localStorage.getItem('currentUser') || 'null');

  // expose current user (read-only outside)
  get currentUser(): User | null {
    return this._currentUser;
  }

  // small helper, just tells if user is logged in
  get isAuthenticated(): boolean {
    return !!this.token;
  }

  constructor(private http: HttpClient, private router: Router) {}

  // login call → sends email/password to backend
  // if success, we save token + user in localStorage and redirect home
  login(data: LoginDto): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, data).pipe(
      tap((res) => {
        this.token = res.token;
        this._currentUser = res.user;
        localStorage.setItem('token', res.token);
        localStorage.setItem('currentUser', JSON.stringify(res.user));
        this.router.navigateByUrl('/');
      })
    );
  }

  // registration is basically the same as login but with extra fields
  // after success we also log the user in immediately
  register(data: RegisterDto): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${environment.apiUrl}/auth/register`, data).pipe(
      tap((res) => {
        this.token = res.token;
        this._currentUser = res.user;
        localStorage.setItem('token', res.token);
        localStorage.setItem('currentUser', JSON.stringify(res.user));
        this.router.navigateByUrl('/');
      })
    );
  }

  // logout → clear local data and send user back to login page
  logout(): void {
    this.token = null;
    this._currentUser = null;
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.router.navigateByUrl('/login');
  }
}
