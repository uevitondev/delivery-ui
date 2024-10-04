import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-payment-list',
  standalone: true,
  imports: [],
  templateUrl: './payment-list.component.html',
  styleUrl: './payment-list.component.scss'
})
export class PaymentListComponent {

  @Output() selectedPaymentMethodEvent = new EventEmitter<string>;  
  paymentMethods: string[] = ["DINHEIRO (ESPÉCIE)", "PIX", "CARTÃO"];

  selectPaymentMethod(paymentMethod: string) {
    this.selectedPaymentMethodEvent.emit(paymentMethod);
  }

}
