import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { EMPTY, Observable, catchError, switchMap, throwError } from "rxjs";
import { environment } from "../../environments/environment.development";
import { AuthService } from "../services/auth.service";
import { StorageService } from "../services/storage.service";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private router: Router,
    private toast: ToastrService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      withCredentials: true
    });

    return next.handle(this.requestWithHeader(request)).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !this.isAuthUrl(request.url) && this.authService.isLogged()) {
          return this.handle401UnauthorizedError(request, next);
        }
        if ((error.status === 401 || error.status === 403) && this.isRefreshTokenUrl(request.url)) {
          this.handleRefreshTokenError();
          return EMPTY;
        }

        if (error.status === 401 && !this.isRefreshTokenUrl(request.url) && !request.url.includes("auth/sign-in")) {
          this.handle401Error();
          return EMPTY;
        }

        if (error.status === 403 && !this.isRefreshTokenUrl(request.url)) {
          this.handle403Error();
          return EMPTY;
        }

        return throwError(() => error);
      })
    );
  }

  private handle401UnauthorizedError(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.refreshToken().pipe(
      switchMap((authResponse) => {
        this.authService.userLoggedSuccess(authResponse);
        return next.handle(this.requestWithHeader(request)).pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 403) {
              this.handle403Error();
              return EMPTY;
            }
            return throwError(() => error);
          })
        );
      }),
      catchError((refreshError) => {
        this.handleRefreshTokenError();
        return throwError(() => refreshError);
      })
    );
  }

  private handleRefreshTokenError() {
    this.handleSessionExpired();
  }

  private handleSessionExpired() {
    this.deleteRefreshTokenCookie();
    this.authService.userLogout();
    this.toast.info("sessão expirada!");
    this.router.navigate(["signin"]);
  }

  private handle401Error() {
    this.toast.error("unauthorized - efetue login");
    this.router.navigate(['signin']);
  }

  private handle403Error() {
    this.toast.error("forbidden - sem autorização");
    this.router.navigate(['forbidden']);
  }

  private requestWithHeader(request: HttpRequest<any>): HttpRequest<any> {
    const authUser = this.storageService.get(environment.authUser);
    if (authUser != null) {
      return request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + authUser.accessToken),
      });
    } else {
      return request;
    }
  }

  private deleteRefreshTokenCookie() {
    document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/delivery/v1/api/auth/refresh-token";
  }

  private isAuthUrl(url: string): boolean {
    return url.includes('auth/signin') || url.includes('auth/refresh-token');
  }

  private isRefreshTokenUrl(url: string): boolean {
    return url.includes('auth/refresh-token');
  }
}
