/**
 * Purpose: Data model for application users.
 * Note: user info comes from backend after login/registration.
 */

export interface User {
  id: number;         // unique id of the user
  name: string;       // display name shown in UI (e.g. in navbar, posts, comments)
}