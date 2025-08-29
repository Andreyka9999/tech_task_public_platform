import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import  App  from './app/app';


// Entry point of the Angular app
// bootstrapApplication replaces the old AppModule approach (since Angular 15+)
bootstrapApplication(App, appConfig)
// just log any startup errors
  .catch((err) => console.error(err));    
