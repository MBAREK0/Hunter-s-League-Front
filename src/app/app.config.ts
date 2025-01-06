import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { importProvidersFrom } from '@angular/core';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptorInterceptor } from '../core/interceptors/auth-interceptor.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      MatButtonModule,
      MatToolbarModule
    ),
    provideHttpClient(
      withInterceptors([authInterceptorInterceptor])
    ),
  ],
};
