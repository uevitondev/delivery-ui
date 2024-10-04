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

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  ENV = environment;
  httpClient = inject(HttpClient);
  storageService = inject(StorageService);
  private authSubject: BehaviorSubject<AuthResponse | null> = new BehaviorSubject<AuthResponse | null>(null);
  constructor() {
    const storedAuth = this.storageService.get(this.ENV.STORED_AUTH);
    storedAuth ? this.setAuth(storedAuth) : () => { };
  }

  setAuth(authResponse: AuthResponse): void {
    this.storageService.save(this.ENV.STORED_AUTH, authResponse);
    this.authSubject.next(authResponse);
  }

  clearAuth(): void {
    this.authSubject.next(null);
    this.storageService.remove(this.ENV.STORED_AUTH);
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
    return this.httpClient.post<AuthResponse>(`${this.ENV.API_URL}/auth/sign-in`, signinRequest);
  }

  resetPassword(email: string): Observable<any> {
    return this.httpClient.post<any>(`${this.ENV.API_URL}/auth/reset-password?email=${email}`, {});
  }

  changePassword(passwordResetToken: PasswordResetToken): Observable<any> {
    return this.httpClient.post<any>(`${this.ENV.API_URL}/auth/change-password`, passwordResetToken);
  }

  refreshToken(): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.ENV.API_URL}/auth/refresh-token`, {}, { withCredentials: true });
  }

  signup(signUpRequest: SignUpRequest): Observable<any> {
    return this.httpClient.post<any>(`${this.ENV.API_URL}/auth/sign-up`, signUpRequest);
  }

  verificationNewToken(email: string): Observable<any> {
    return this.httpClient.post<any>(`${this.ENV.API_URL}/auth/verification/new-token?email=${email}`, {});
  }

  verificationToken(tokenRequest: TokenRequest): Observable<any> {
    return this.httpClient.post<any>(`${this.ENV.API_URL}/auth/verification`, tokenRequest);
  }




  logout() {
    this.clearAuth();
  }


  teste(): Observable<any> {
    return this.httpClient.get<any>(`${this.ENV.API_URL}/test/admin`);
  }

}
