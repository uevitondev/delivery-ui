import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from './address';
import { AddressViaCep } from './address-viacep';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  API_URL = environment.API_URL;
  httpClient = inject(HttpClient);

  getAddressViaCepByCep(cep: string): Observable<AddressViaCep> {
    return this.httpClient.get<AddressViaCep>(
      `${this.API_URL}/addresses/viacep?cep=${cep}`,
    );
  }

  getAllByUser(): Observable<Address[]> {
    return this.httpClient.get<Address[]>(`${this.API_URL}/addresses/user/all`);
  }

  newAddress(address: Address): Observable<any> {
    return this.httpClient.post<any>(`${this.API_URL}/addresses/new`, address);
  }

  updateAddress(id: string, address: Address): Observable<any> {
    return this.httpClient.put<any>(`${this.API_URL}/addresses/update`, address);
  }

  deleteAddressById(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.API_URL}/addresses/${id}`);
  }
}
