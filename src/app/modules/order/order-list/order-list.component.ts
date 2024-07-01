import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderResponseDto } from '../../../core/models/orderresponse';
import { OrderService } from '../../../core/services/order.service';
import { StorageService } from '../../../core/services/storage.service';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss'
})
export class OrderListComponent implements OnInit {

  router = inject(Router);
  toastService = inject(ToastrService);
  storageService = inject(StorageService);
  orderService = inject(OrderService);
  orders!: OrderResponseDto[];

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    return this.orderService.getAllByCustomer().subscribe({
      next: (orderResponse) => {
        this.orders = orderResponse;
      },
      error: (e) => {
        this.toastService.error('ERRO AO LISTAR PEDIDOS!');
      }
    });
  }

  navigateToOrderDetail(order: any) {
    this.router.navigate(['orders/details/', order.id]);
  }


}
