import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse } from '../models/auth-response';
import { AuthRequest } from '../models/signin-request';
import { SignUpRequest } from '../models/signup-request';
import { TokenRequest } from '../models/token-request';
import { StorageService } from './storage.service';
import { PasswordResetToken } from '../models/password-reset-token';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  storageService = inject(StorageService);
  httpClient = inject(HttpClient);
  router = inject(Router);
  storedAuth = environment.STORED_AUTH;
  apiUrl = environment.API_URL;

  private authSubject: BehaviorSubject<AuthResponse | null> = new BehaviorSubject<AuthResponse | null>(null);
  constructor() {
    const storedAuth = this.storageService.get(this.storedAuth);
    storedAuth ? this.setAuth(storedAuth) : () => { };
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

  getAuthName(): string | null {
    const auth = this.getAuth();
    return auth ? auth.name : null;
  }

  signin(signinRequest: AuthRequest): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.apiUrl}/auth/sign-in`, signinRequest);
  }

  resetPassword(email: string): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/auth/reset-password?email=${email}`, {});
  }

  changePassword(passwordResetToken: PasswordResetToken): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/auth/change-password`, passwordResetToken);
  }

  refreshToken(): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.apiUrl}/auth/refresh-token`, {}, { withCredentials: true });
  }

  signup(signUpRequest: SignUpRequest): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/auth/sign-up`, signUpRequest);
  }

  verificationNewToken(email: string): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/auth/verification/new-token?email=${email}`, {});
  }

  verificationToken(tokenRequest: TokenRequest): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/auth/verification`, tokenRequest);
  }


  logout() {
    this.clearAuth();
    this.router.navigate(['/auth/signin']);
  }


  teste(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/test/admin`);
  }

}
