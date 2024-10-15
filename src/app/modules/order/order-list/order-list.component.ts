import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderResponse } from '../../../core/models/order-response';
import { OrderService } from '../../../core/services/order.service';
import { StorageService } from '../../../core/services/storage.service';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss'
})
export class OrderListComponent implements OnInit {

  router = inject(Router);
  toastService = inject(ToastrService);
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
    this.router.navigate(['orders/details/', order.id]);
  }


}
