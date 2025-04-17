import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfile } from './user-profile';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = environment.API_URL;
  private readonly http = inject(HttpClient);

  constructor() { }

  getUserProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(
      `${this.apiUrl}/users/account/profile`,
    );
  }
}
