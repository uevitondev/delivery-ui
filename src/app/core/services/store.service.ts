import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Store } from '../models/store';
import { StorageService } from './storage.service';
import { PageData } from '../models/page-data';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  storageService = inject(StorageService);
  http = inject(HttpClient);

  apiUrl = environment.API_URL;

  getAll(name: string): Observable<Store[]> {
    return this.http.get<Store[]>(`${this.apiUrl}/stores?name=${name}`);
  }

  /*

  getStoreByName(name: string): Observable<Store> {
    return this.http.get<Store>(`${this.apiUrl}/stores/name?name=${name}`);
  }

  */

  getAllProductsByStoreId(storeId: string, productName: string, categoryName: string, pageIndex: number, pageSize: number): Observable<PageData> {
    return this.http.get<PageData>(`${this.apiUrl}/stores/${storeId}/products?name=${productName}&category=${categoryName}&page=${pageIndex}&size=${pageSize}`);
  }

}
