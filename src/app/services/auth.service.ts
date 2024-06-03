import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { AuthRequest } from '../model/auth/auth-request';
import { AuthResponse } from '../model/auth/auth-response';
import { UserSignUp } from '../model/auth/user-signup';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.apiUrl;
  httpClient = inject(HttpClient);
  storage = inject(StorageService);
  loggedIn = new BehaviorSubject<boolean>(false);

  signup(userSignUp: UserSignUp): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/auth/sign-up`, userSignUp);
  }

  signin(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.apiUrl}/auth/sign-in`, authRequest);
  }

  refreshToken(): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.apiUrl}/auth/refresh-token`, {}, { withCredentials: true });
  }

  userLoggedSuccess(authResponse: AuthResponse) {
    this.storage.save(environment.authUser, authResponse);
    this.loggedIn.next(true);
  }

  isLoggedIn() {
    if (this.storage.get(environment.authUser)) {
      this.loggedIn.next(true);
      return this.loggedIn.asObservable();
    }
    return this.loggedIn.asObservable();
  }

  isLogged() {
    if (this.storage.get(environment.authUser)) {
      return true;
    } else {
      return false;
    }
  }

  userLogout(): Observable<any> {
    this.storage.remove(environment.authUser);
    this.loggedIn.next(false);
    return new Observable;
  }


  teste(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/test/admin`);
  }

}
