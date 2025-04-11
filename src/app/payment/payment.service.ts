import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { PaymentMethod } from './payment-method';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  apiUrl = environment.API_URL;
  httpClient = inject(HttpClient);

  getAllPaymentMethods(): Observable<PaymentMethod[]> {
    return this.httpClient.get<PaymentMethod[]>(
      `${this.apiUrl}/payments/methods`,
    );
  }
}
