import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { AddressDto } from '../model/address/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  ENV = environment;
  httpClient = inject(HttpClient);

  getUserAddresses(): Observable<AddressDto[]> {
    return this.httpClient.get<AddressDto[]>(`${this.ENV.API_URL}/addresses/user/all`);
  }
}
