import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { OrderCustomerResponseDto } from '../models/ordercustomerresponse';
import { OrderResponseDto } from '../models/orderresponse';
import { ShoppingCartDto } from '../models/shoppingcart';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  ENV = environment;
  httpClient = inject(HttpClient);

  saveNew(shoppingcart: ShoppingCartDto): Observable<OrderResponseDto> {
    return this.httpClient.post<OrderResponseDto>(`${this.ENV.API_URL}/orders`, shoppingcart);
  }

  getAllByCustomer(): Observable<OrderResponseDto[]> {
    return this.httpClient.get<OrderResponseDto[]>(`${this.ENV.API_URL}/orders/customer`);
  }

  getByIdWithOrderItems(orderId: string): Observable<OrderCustomerResponseDto> {
    return this.httpClient.get<OrderCustomerResponseDto>(`${this.ENV.API_URL}/orders/${orderId}/customer`);
  }



}
