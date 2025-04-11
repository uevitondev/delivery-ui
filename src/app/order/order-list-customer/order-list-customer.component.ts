import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { StorageService } from '../../services/storage.service';
import { OrderCardComponent } from '../order-card/order-card.component';
import { OrderResponse } from '../order-response';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-list-customer',
  imports: [CommonModule, OrderCardComponent],
  templateUrl: './order-list-customer.component.html',
  styleUrl: './order-list-customer.component.scss',
})
export class OrderListCustomerComponent implements OnInit {
  errorHandlerService = inject(ErrorHandlerService);
  storageService = inject(StorageService);
  orderService = inject(OrderService);

  orders!: OrderResponse[];
  isLoading: boolean = false;

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.isLoading = true;
    return this.orderService.getAllByCustomer().subscribe({
      next: (orderResponse) => {
        this.orders = orderResponse;
        this.isLoading = false;
      },
      error: (e) => {
        this.isLoading = false;
        throw new Error(e);
      },
    });
  }
}
