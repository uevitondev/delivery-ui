import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { ErrorHandlerService } from '../services/error-handler.service';
import { StorageService } from '../services/storage.service';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../environments/environment';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastrService);
  private readonly storageService = inject(StorageService);
  private readonly authService = inject(AuthService);
  private readonly errorHandlerService = inject(ErrorHandlerService);
  private readonly storedAuth = environment.STORED_AUTH;

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      withCredentials: true,
    });

    return next.handle(this.requestWithHeader(request)).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == 400) {
          this.handle400Error();
          return throwError(() => error);
        }

        if (
          error.status === 401 &&
          !this.isAuthUrl(request.url) &&
          this.authService.isLogged()
        ) {
          return this.handle401Error(request, next);
        }

        if (error.status == 403) {
          this.handle403Error();
          return throwError(() => error);
        }

        if (error.status == 404) {
          this.handle404Error();
          return throwError(() => error);
        }

        return throwError(() => error);
      }),
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isAuthUrl(request.url) && this.authService.isLogged()) {
      return this.authService.refreshToken().pipe(
        switchMap((authResponse) => {
          this.authService.setAuth(authResponse);
          return next.handle(this.requestWithHeader(request));
        }),
        catchError((error) => {
          this.errorHandlerService.handleError(error);
          this.authService.logout();
          return throwError(() => error);
        }),
      );
    }

    return next.handle(request);
  }

  private handle400Error() {
    this.toastService.error('BAD REQUEST');
    this.router.navigate(['error/badrequest']);
  }

  private handle403Error() {
    this.toastService.error('FORBIDDEN');
    this.router.navigate(['error/forbidden']);
  }

  private handle404Error() {
    this.router.navigate(['notfound']);
  }

  private requestWithHeader(request: HttpRequest<any>): HttpRequest<any> {
    if (this.isAuthUrl(request.url)) {
      return request;
    }

    if (this.authService.isLogged()) {
      const storedAuth = this.storageService.get(this.storedAuth);
      return request.clone({
        headers: request.headers.set(
          'Authorization',
          'Bearer ' + storedAuth.accessToken,
        ),
      });
    }
    return request;
  }

  private isAuthUrl(url: string): boolean {
    return url.includes('auth/sign-in') || url.includes('auth/refresh-token');
  }
}
