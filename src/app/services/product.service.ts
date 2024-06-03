import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { PageProduct } from '../model/product/page-product';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProductDto } from '../model/product/product-dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl = environment.apiUrl;
  http = inject(HttpClient);
  
  constructor() { }

  findAllProductsByStoreId(id: string, pageIndex: number, pageSize: number): Observable<PageProduct> {
    return this.http.get<PageProduct>(`${this.apiUrl}/products/store/${id}?page=${pageIndex}&size=${pageSize}`);
  }

  findProductById(id: number): Observable<ProductDto> {
    return this.http.get<ProductDto>(`${this.apiUrl}/products/${id}`);
  }

}
