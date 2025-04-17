import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PageData } from '../models/page-data';
import { Store } from './store';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = environment.API_URL;

  getAll(name: string): Observable<Store[]> {
    return this.http.get<Store[]>(`${this.apiUrl}/stores?name=${name}`);
  }

  getById(id: string): Observable<Store> {
    return this.http.get<Store>(`${this.apiUrl}/stores/${id}`);
  }

  getAllBySeller(): Observable<Store[]> {
    return this.http.get<Store[]>(`${this.apiUrl}/stores/seller/list`);
  }

  getAllProductsByStoreId(route: string): Observable<PageData> {
    return this.http.get<PageData>(`${this.apiUrl}${route}`);
  }

  saveNewStoreBySeller(request: FormData): Observable<Store> {
    return this.http.post<Store>(`${this.apiUrl}/stores`, request);
  }
}
