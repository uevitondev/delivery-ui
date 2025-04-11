import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import {  HTTP_INTERCEPTORS,  provideHttpClient,  withInterceptorsFromDi,} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { provideToastr } from 'ngx-toastr';
import { APP_ROUTES } from './app.routes';
import { AuthGuard } from './guards/auth-guard';
import { HttpRequestInterceptor } from './interceptors/http-interceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideEnvironmentNgxMask(),
    provideToastr(),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(APP_ROUTES),
    { provide: AuthGuard },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
  ],
};
