import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { PaymentMethod } from '../../../core/models/payment-method';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { PaymentService } from '../../../core/services/payment.service';

@Component({
  selector: 'app-payment-list',
  standalone: true,
  imports: [],
  templateUrl: './payment-list.component.html',
  styleUrl: './payment-list.component.scss'
})
export class PaymentListComponent implements OnInit {

  @Output() selectedPaymentMethodEvent = new EventEmitter<PaymentMethod>();
  @Input() selectedId!: string;

  paymentService = inject(PaymentService);
  errorHandlerService = inject(ErrorHandlerService);


  paymentMethods: PaymentMethod[] = [];
  isLoading: boolean = false;

  ngOnInit(): void {
    this.onLoadPayments();
  }

  onLoadPayments() {
    this.isLoading = true;
    this.paymentService.getAllPaymentMethods().subscribe({
      next: (response) => {
        this.paymentMethods = response;
        this.isLoading = false;
      },
      error: (e) => {
        this.isLoading = false;
        this.errorHandlerService.handleError(e, "OCORREU UM ERRO AO CARREGAR METHODOS DE PAGAMENTO");
      }
    });
  }


  selectPaymentMethod(paymentMethod: PaymentMethod) {
    this.selectedPaymentMethodEvent.emit(paymentMethod);
  }

}
