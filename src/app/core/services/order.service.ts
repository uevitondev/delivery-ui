import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { OrderCustomerResponse } from '../models/order-customer-response';
import { OrderResponse } from '../models/order-response';
import { ShoppingCartRequest } from '../models/shopping-cart-request';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  ENV = environment;
  httpClient = inject(HttpClient);

  saveNew(shoppingcart: ShoppingCartRequest): Observable<OrderResponse> {
    return this.httpClient.post<OrderResponse>(`${this.ENV.API_URL}/orders`, shoppingcart);
  }

  getAllByCustomer(): Observable<OrderResponse[]> {
    return this.httpClient.get<OrderResponse[]>(`${this.ENV.API_URL}/orders/customer`);
  }

  getByIdWithOrderItems(orderId: string): Observable<OrderCustomerResponse> {
    return this.httpClient.get<OrderCustomerResponse>(`${this.ENV.API_URL}/orders/${orderId}/customer`);
  }



}
