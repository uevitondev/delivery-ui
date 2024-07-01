import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { PageProduct } from '../models/page-product';
import { ProductDto } from '../models/product-dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  ENV = environment;
  http = inject(HttpClient);

  constructor() { }

  getAllByStorePagedAndFiltered(storeId: string, categoryName: string, pageIndex: number, pageSize: number): Observable<PageProduct> {
    return this.http.get<PageProduct>(`${this.ENV.API_URL}/products/store/${storeId}?categoryName=${categoryName}&page=${pageIndex}&size=${pageSize}`);
    //return this.http.get<PageProduct>(`${this.ENV.API_URL}/products/store/${storeId}?page=${pageIndex}&size=${pageSize}`);
  }

  getById(id: string): Observable<ProductDto> {
    return this.http.get<ProductDto>(`${this.ENV.API_URL}/products/${id}`);
  }

}
