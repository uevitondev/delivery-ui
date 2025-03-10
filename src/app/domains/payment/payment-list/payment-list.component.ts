import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { PaymentMethod } from '../payment-method';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-payment-list',
  imports: [],
  templateUrl: './payment-list.component.html',
  styleUrl: './payment-list.component.scss',
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
        this.errorHandlerService.handleError(e);
      },
    });
  }

  selectPaymentMethod(paymentMethod: PaymentMethod) {
    this.selectedPaymentMethodEvent.emit(paymentMethod);
  }
}
