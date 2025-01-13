import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OrderResponse } from '../../../core/models/order-response';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { OrderService } from '../../../core/services/order.service';
import { StorageService } from '../../../core/services/storage.service';

@Component({
  selector: 'app-order-list',
  imports: [
    CommonModule,
    RouterLink,
  ],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss'
})
export class OrderListComponent implements OnInit {

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
      }
    });
  }

  navigateToOrderDetail(order: any) {

  }


}
