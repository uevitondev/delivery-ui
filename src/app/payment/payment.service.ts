import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentMethod } from './payment-method';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private readonly apiUrl = environment.API_URL;
  private readonly http = inject(HttpClient);

  getAllPaymentMethods(): Observable<PaymentMethod[]> {
    return this.http.get<PaymentMethod[]>(
      `${this.apiUrl}/payments/methods`,
    );
  }
}
