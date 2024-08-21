import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthRequest } from '../models/auth-request';
import { AuthResponse } from '../models/auth-response';
import { UserSignUp } from '../models/user-signup';
import { StorageService } from './storage.service';

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
    return auth ? auth.authName : null;
  }

  signup(userSignUp: UserSignUp): Observable<any> {
    return this.httpClient.post<any>(`${this.ENV.API_URL}/auth/sign-up`, userSignUp);
  }

  signin(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.ENV.API_URL}/auth/sign-in`, authRequest);
  }

  refreshToken(): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.ENV.API_URL}/auth/refresh-token`, {}, { withCredentials: true });
  }

  logout() {
    this.clearAuth();
  }


  teste(): Observable<any> {
    return this.httpClient.get<any>(`${this.ENV.API_URL}/test/admin`);
  }

}
