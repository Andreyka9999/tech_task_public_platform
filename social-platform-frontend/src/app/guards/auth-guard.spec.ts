/**
 * Purpose: Unit tests for AuthGuard (route access control).
 * Notes:
    - Critical requirement: only authenticated users can access protected routes.
    - Specs should verify guard creation and auth-based navigation logic.
 */

import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth-guard';

/** Test suite: ensures AuthGuard is properly created */
describe('AuthGuard', () => {
  /** Spec: guard instance should exist */
  it('should be defined', () => {
    expect(AuthGuard).toBeTruthy();
  });
});
