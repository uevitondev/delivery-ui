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

  ENV = environment;
  http = inject(HttpClient);

  constructor() { }


  findAllProductsByStoreAndCategory(storeId: string, categoryName: string, pageIndex: number, pageSize: number): Observable<PageProduct> {
    return this.http.get<PageProduct>(`${this.ENV.API_URL}/products/store/${storeId}?categoryName=${categoryName}&page=${pageIndex}&size=${pageSize}`);
    //return this.http.get<PageProduct>(`${this.ENV.API_URL}/products/store/${storeId}?page=${pageIndex}&size=${pageSize}`);
  }

  findAllProductsStoreByCategory(storeId: string, categoryName: string, pageIndex: number, pageSize: number): Observable<PageProduct> {
    return this.http.get<PageProduct>(`${this.ENV.API_URL}/products/store/${storeId}?categoryName=${categoryName}&page=${pageIndex}&size=${pageSize}`);
  }

  findProductById(id: string): Observable<ProductDto> {
    return this.http.get<ProductDto>(`${this.ENV.API_URL}/products/${id}`);
  }

}
