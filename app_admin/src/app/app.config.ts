import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { authInterceptProvider } from './utils/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [ 
    provideRouter(routes), 
    provideHttpClient(withInterceptorsFromDi()),  // Provides HttpClient service
    authInterceptProvider
  ]
};
