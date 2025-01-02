import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { OrderDetails } from '../models/order-details';
import { OrderResponse } from '../models/order-response';
import { ShoppingCartRequest } from '../models/shopping-cart-request';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl = environment.API_URL;
  httpClient = inject(HttpClient);

  newOrder(shoppingcart: ShoppingCartRequest): Observable<OrderResponse> {
    return this.httpClient.post<OrderResponse>(`${this.apiUrl}/orders`, shoppingcart);
  }

  getAllByCustomer(): Observable<OrderResponse[]> {
    return this.httpClient.get<OrderResponse[]>(`${this.apiUrl}/orders/customer`);
  }

  getByIdWithOrderItems(orderId: string): Observable<OrderDetails> {
    return this.httpClient.get<OrderDetails>(`${this.apiUrl}/orders/${orderId}/customer`);
  }

}
