import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { AuthResponse } from '../model/auth-response';
import { UserSignIn } from '../model/user-signin';
import { UserSignUp } from '../model/user-signup';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.apiUrl;
  httpClient = inject(HttpClient);

  signup(userSignUp: UserSignUp): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/auth/sign-up`, userSignUp);
  }

  signin(userSignIn: UserSignIn): Observable<AuthResponse> {
    const encodedCredentials = btoa(`${userSignIn.username}:${userSignIn.password}`);
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': `Basic ${encodedCredentials}` }),
      //withCredentials: true
    }
    return this.httpClient.post<AuthResponse>(`${this.apiUrl}/auth/sign-in`, httpOptions);
  }

  refreshToken(): Observable<any> {
    return this.httpClient.post<AuthResponse>(`${this.apiUrl}/auth/refresh-token`, {withCredentials: true });
  }
  teste(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/test/public`);
  }

}
