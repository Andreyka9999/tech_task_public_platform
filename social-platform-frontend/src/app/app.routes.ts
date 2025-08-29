import { Routes } from '@angular/router';

import LoginComponent from './pages/login/login';
import RegisterComponent from './pages/register/register';
import FeedComponent from './pages/feed/feed';
import PostDetailComponent from './pages/post-detail/post-detail';
import PostFormComponent from './pages/post-form/post-form';
import ProfileComponent from './pages/profile/profile';

import { AuthGuard } from './guards/auth-guard';

// Here we define all app routes
export const routes: Routes = [
  // public routes (no auth required)
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // protected routes (user must be logged in → checked by AuthGuard)
  { path: '', component: FeedComponent, canActivate: [AuthGuard] },                     // main feed
  { path: 'posts/new', component: PostFormComponent, canActivate: [AuthGuard] },        // create post
  { path: 'posts/:id/edit', component: PostFormComponent, canActivate: [AuthGuard] },   // edit post
  { path: 'posts/:id', component: PostDetailComponent, canActivate: [AuthGuard] },      // view single post
  { path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard] },       // user profile page

  // fallback: if route not found → redirect to home (feed)
  { path: '**', redirectTo: '' },
];
