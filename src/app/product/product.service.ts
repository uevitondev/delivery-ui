import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';
import { environment } from '../../environments/environment.development';
import { PageData } from '../models/page-data';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  
  apiUrl = environment.API_URL;
  http = inject(HttpClient);

  constructor() { }

  getAll(): Observable<PageData> {
    return this.http.get<PageData>(`${this.apiUrl}/products`);
  }

  getById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }


  saveNewProduct(formData: FormData) {
    return this.http.post<Product>(`${this.apiUrl}/products`, formData);
  }
}
