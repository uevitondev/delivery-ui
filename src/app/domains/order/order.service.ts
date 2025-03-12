import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ShoppingCartRequest } from '../cart/shopping-cart-request';
import { OrderDetail } from './order-detail';
import { OrderResponse } from './order-response';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  apiUrl = environment.API_URL;
  httpClient = inject(HttpClient);

  newOrder(shoppingcart: ShoppingCartRequest): Observable<OrderResponse> {
    return this.httpClient.post<OrderResponse>(
      `${this.apiUrl}/orders`,
      shoppingcart,
    );
  }

  getAllByStore(storeId: string): Observable<OrderResponse[]> {
    return this.httpClient.get<OrderResponse[]>(
      `${this.apiUrl}/orders/store/${storeId}`,
    );
  }




  getAllByCustomer(): Observable<OrderResponse[]> {
    return this.httpClient.get<OrderResponse[]>(
      `${this.apiUrl}/orders/customer`,
    );
  }

  getByIdWithOrderItems(orderId: string): Observable<OrderDetail> {
    return this.httpClient.get<OrderDetail>(
      `${this.apiUrl}/orders/${orderId}/customer`,
    );
  }
}
