import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth-interceptor';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // catch any unhandled errors globally (instead of every component separately)
    provideBrowserGlobalErrorListeners(),

    // makes Angular zone updates more efficient (groups multiple events together)
    provideZoneChangeDetection({ eventCoalescing: true }),

    // register our app routes (from app.routes.ts)
    provideRouter(routes),

    // enable HttpClient + attach our AuthInterceptor for adding tokens to requests
    provideHttpClient(withInterceptors([AuthInterceptor]))
  ]
};
