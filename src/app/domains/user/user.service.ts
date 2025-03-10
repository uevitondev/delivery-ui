import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserProfile } from '../../domains/user/user-profile';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  ENV = environment;
  httpClient = inject(HttpClient);

  constructor() {}

  getUserProfile(): Observable<UserProfile> {
    return this.httpClient.get<UserProfile>(
      `${this.ENV.API_URL}/users/account/profile`,
    );
  }
}
