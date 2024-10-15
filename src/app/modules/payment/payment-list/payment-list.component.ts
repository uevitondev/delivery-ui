import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-payment-list',
  standalone: true,
  imports: [],
  templateUrl: './payment-list.component.html',
  styleUrl: './payment-list.component.scss'
})
export class PaymentListComponent implements OnInit {

  @Output() selectedPaymentMethodEvent = new EventEmitter<string>;
  paymentMethods: string[] = [];
  isLoading: boolean = false;

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments() {
    this.isLoading = true;
    let payments: string[] = ["DINHEIRO (ESPÉCIE)", "PIX", "CARTÃO"];
    this.paymentMethods = payments;
    this.isLoading = false;
  }


  selectPaymentMethod(paymentMethod: string) {
    this.selectedPaymentMethodEvent.emit(paymentMethod);
  }

}
