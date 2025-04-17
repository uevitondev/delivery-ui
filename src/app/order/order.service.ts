import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ShoppingCartRequest } from '../cart/shopping-cart-request';
import { OrderDetail } from './order-detail';
import { OrderResponse } from './order-response';


@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly apiUrl = environment.API_URL;
  private readonly http = inject(HttpClient);

  newOrder(shoppingcart: ShoppingCartRequest): Observable<OrderResponse> {
    return this.http.post<OrderResponse>(
      `${this.apiUrl}/orders`,
      shoppingcart,
    );
  }

  getAllByStore(storeId: string): Observable<OrderResponse[]> {
    return this.http.get<OrderResponse[]>(
      `${this.apiUrl}/orders/store/${storeId}`,
    );
  }




  getAllByCustomer(): Observable<OrderResponse[]> {
    return this.http.get<OrderResponse[]>(
      `${this.apiUrl}/orders/customer`,
    );
  }

  getByIdWithOrderItems(orderId: string): Observable<OrderDetail> {
    return this.http.get<OrderDetail>(
      `${this.apiUrl}/orders/${orderId}/customer`,
    );
  }
}
