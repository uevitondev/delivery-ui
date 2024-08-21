import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Address } from '../models/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  API_URL = environment.API_URL;
  httpClient = inject(HttpClient);

  getAllByUser(): Observable<Address[]> {
    return this.httpClient.get<Address[]>(`${this.API_URL}/addresses/user/all`);
  }

  updateAddress(id: string, address: any): Observable<any> {
    return this.httpClient.put<any>(`${this.API_URL}/${id}`, address);
  }

  deleteAddress(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.API_URL}/${id}`);
  }
}
