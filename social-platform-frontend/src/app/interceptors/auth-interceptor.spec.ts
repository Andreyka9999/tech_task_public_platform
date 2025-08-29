/**
 * Purpose: Tests for AuthInterceptor.
 * Here we check that the interceptor can be created.
 */

import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn } from '@angular/common/http';

import { AuthInterceptor } from './auth-interceptor';

// Test block for AuthInterceptor
describe('authInterceptor', () => {
   // Create interceptor function inside Angular test context
  const interceptor: HttpInterceptorFn = (req, next) => 
    TestBed.runInInjectionContext(() => AuthInterceptor(req, next));

  beforeEach(() => {
    // Setup testing module (empty here, just to initialize TestBed)
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    // Just making sure the interceptor is defined and works in test
    expect(interceptor).toBeTruthy();
  });
});
