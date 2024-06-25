import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { UserAccountDataDto } from '../model/user/user-accountdata';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  ENV = environment;
  httpClient = inject(HttpClient);

  constructor() { }

  getUserAccountData(): Observable<UserAccountDataDto> {
    return this.httpClient.get<UserAccountDataDto>(`${this.ENV.API_URL}/users/account-data`);
  }

}
