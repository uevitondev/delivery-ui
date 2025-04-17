import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from './address';
import { AddressViaCep } from './address-viacep';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private readonly apiUrl = environment.API_URL;
  private readonly httpClient = inject(HttpClient);

  getAddressViaCepByCep(cep: string): Observable<AddressViaCep> {
    return this.httpClient.get<AddressViaCep>(
      `${this.apiUrl}/addresses/viacep?cep=${cep}`,
    );
  }

  getAllByUser(): Observable<Address[]> {
    return this.httpClient.get<Address[]>(`${this.apiUrl}/addresses/user/all`);
  }

  newAddress(address: Address): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/addresses/new`, address);
  }

  updateAddress(id: string, address: Address): Observable<any> {
    return this.httpClient.put<any>(`${this.apiUrl}/addresses/update`, address);
  }

  deleteAddressById(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}/addresses/${id}`);
  }
}
