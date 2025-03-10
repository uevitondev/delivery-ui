import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { StorageService } from '../../core/services/storage.service';
import { AuthResponse } from './auth-response';
import { PasswordResetToken } from './password-reset-token';
import { AuthRequest } from './signin-request';
import { SignUpRequest } from './signup-request';
import { TokenRequest } from './token-request';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly storageService = inject(StorageService);
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly storedAuth = environment.STORED_AUTH;
  private readonly apiUrl = environment.API_URL;

  private authSubject: BehaviorSubject<AuthResponse | null> =
    new BehaviorSubject<AuthResponse | null>(null);
  constructor() {
    const storedAuth = this.storageService.get(this.storedAuth);
    storedAuth ? this.setAuth(storedAuth) : () => {};
  }

  signin(signinRequest: AuthRequest): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(
      `${this.apiUrl}/auth/sign-in`,
      signinRequest,
    );
  }

  resetPassword(email: string): Observable<any> {
    return this.httpClient.post<any>(
      `${this.apiUrl}/auth/reset-password?email=${email}`,
      {},
    );
  }

  changePassword(passwordResetToken: PasswordResetToken): Observable<any> {
    return this.httpClient.post<any>(
      `${this.apiUrl}/auth/change-password`,
      passwordResetToken,
    );
  }

  refreshToken(): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(
      `${this.apiUrl}/auth/refresh-token`,
      {},
      { withCredentials: true },
    );
  }

  signup(signUpRequest: SignUpRequest): Observable<any> {
    return this.httpClient.post<any>(
      `${this.apiUrl}/auth/sign-up`,
      signUpRequest,
    );
  }

  verificationNewToken(email: string): Observable<any> {
    return this.httpClient.post<any>(
      `${this.apiUrl}/auth/verification/new-token?email=${email}`,
      {},
    );
  }

  verificationToken(tokenRequest: TokenRequest): Observable<any> {
    return this.httpClient.post<any>(
      `${this.apiUrl}/auth/verification`,
      tokenRequest,
    );
  }

  logout() {
    this.clearAuth();
    this.router.navigate(['/auth/signin']);
  }

  setAuth(authResponse: AuthResponse): void {
    this.storageService.save(this.storedAuth, authResponse);
    this.authSubject.next(authResponse);
  }

  clearAuth(): void {
    this.authSubject.next(null);
    this.storageService.remove(this.storedAuth);
  }

  isLogged(): boolean {
    return !!this.getAuth();
  }

  getAuth(): AuthResponse | null {
    return this.authSubject.getValue();
  }

  hasRole(requiredRoles: string[]): boolean | undefined {
    if (!this.getAuth()) return false;

    return this.getAuth()?.roles.some((role) => requiredRoles.includes(role));
  }

  getRoles(): string[] | undefined {
    return this.getAuth()?.roles;
  }

  getAuthName(): string | null {
    const auth = this.getAuth();
    return auth ? auth.name : null;
  }
}
