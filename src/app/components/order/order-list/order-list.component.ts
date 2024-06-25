import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderResponseDto } from '../../../model/order/orderresponse';
import { OrderService } from '../../../services/order.service';
import { StorageService } from '../../../services/storage.service';

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
    this.findAllOrders();
  }

  findAllOrders() {
    return this.orderService.findAllOrdersByCustomer().subscribe({
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
