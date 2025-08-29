/**
 * Purpose: Add JWT token to every request and handle auth errors.
 * Note:
   - This runs before each HTTP call.
   - If token exists -> attach it to headers.
 * - If backend says 401 (unauthorized) -> logout and go to login page.
 */

import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  // get services we need
  const auth = inject(AuthService);
  const router = inject(Router);

  // if we have a token, add it to request headers
  const token = auth.token;
  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  // send request forward + catch errors
  return next(authReq).pipe(
    catchError((err: HttpErrorResponse) => {
      // if server says "unauthorized" -> clear token and redirect to login
      if (err.status === 401) {
        auth.logout();              // clear a token
        router.navigateByUrl('/login');
      }
      // text skip 422/other errors to top
      return throwError(() => err);
    })
  );
};
