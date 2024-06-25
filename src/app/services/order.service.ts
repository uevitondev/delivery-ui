import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { ShoppingCartDto } from '../model/cart/shoppingcart';
import { OrderCustomerResponseDto } from '../model/order/ordercustomerresponse';
import { OrderResponseDto } from '../model/order/orderresponse';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  ENV = environment;
  httpClient = inject(HttpClient);

  saveNewOrder(shoppingcart: ShoppingCartDto): Observable<OrderResponseDto> {
    return this.httpClient.post<OrderResponseDto>(`${this.ENV.API_URL}/orders`, shoppingcart);
  }

  findAllOrdersByCustomer(): Observable<OrderResponseDto[]> {
    return this.httpClient.get<OrderResponseDto[]>(`${this.ENV.API_URL}/orders/customer`);
  }

  findOrderByIdWithOrderItems(orderId: string): Observable<OrderCustomerResponseDto> {
    return this.httpClient.get<OrderCustomerResponseDto>(`${this.ENV.API_URL}/orders/${orderId}/customer`);
  }



}
