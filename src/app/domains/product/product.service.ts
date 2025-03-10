import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PageData } from '../../core/models/page-data';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  ENV = environment;
  http = inject(HttpClient);

  constructor() { }

  getAll(): Observable<PageData> {
    return this.http.get<PageData>(`${this.ENV.API_URL}/products`);
  }

  getById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.ENV.API_URL}/products/${id}`);
  }


  saveNewProduct(formData: FormData) {
    return this.http.post<Product>(`${this.ENV.API_URL}/products`, formData);
  }
}
