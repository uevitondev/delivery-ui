import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { PaymentService } from '../../../core/services/payment.service';
import { PaymentMethod } from '../../../core/models/payment-method';

@Component({
  selector: 'app-payment-list',
  standalone: true,
  imports: [],
  templateUrl: './payment-list.component.html',
  styleUrl: './payment-list.component.scss'
})
export class PaymentListComponent implements OnInit {

  @Output() selectedPaymentMethodEvent = new EventEmitter<PaymentMethod>;

  paymentService = inject(PaymentService);
  paymentMethods: PaymentMethod[] = [];
  isLoading: boolean = false;

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments() {
    this.isLoading = true;
    this.paymentService.getAllPaymentMethods().subscribe({
      next: (response) => {
        this.paymentMethods = response;
        this.isLoading = false;
      },
      error: (e) => {
        this.isLoading = false;
        throw new Error(e);
      }
    });
  }


  selectPaymentMethod(paymentMethod: PaymentMethod) {
    this.selectedPaymentMethodEvent.emit(paymentMethod);
  }

}
