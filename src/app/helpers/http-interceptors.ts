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
  private ENV = environment;

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
        this.authService.setAuth(authResponse);
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
    this.authService.logout();
    this.toast.info("Sessão Expirou!");
    this.router.navigate(["signin"]);
  }

  private handle401Error() {
    this.toast.error("(401) Acesso Não Autorizado!");
    this.router.navigate(['signin']);
  }

  private handle403Error() {
    this.toast.error("(403) Acesso Negado!");
    this.router.navigate(['403']);
  }

  private requestWithHeader(request: HttpRequest<any>): HttpRequest<any> {

    if (this.isRefreshTokenUrl(request.url)) {
      return request;
    }

    if (this.authService.isLogged()) {
      const storedAuth = this.storageService.get(this.ENV.STORED_AUTH);
      return request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + storedAuth.accessToken),
      })
    }
    return request;

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
