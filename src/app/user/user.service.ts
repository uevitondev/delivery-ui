import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { UserProfile } from './user-profile';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = environment.API_URL;
  httpClient = inject(HttpClient);

  constructor() {}

  getUserProfile(): Observable<UserProfile> {
    return this.httpClient.get<UserProfile>(
      `${this.apiUrl}/users/account/profile`,
    );
  }
}
