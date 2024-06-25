import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderResponseDto } from '../../../model/order/orderresponse';
import { OrderService } from '../../../services/order.service';
import { StorageService } from '../../../services/storage.service';
import { OrderCustomerResponseDto } from '../../../model/order/ordercustomerresponse';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent implements OnInit {

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  toastService = inject(ToastrService);
  storageService = inject(StorageService);
  orderService = inject(OrderService);

  order!: OrderCustomerResponseDto;

  ngOnInit(): void {
    let orderId = this.activatedRoute.snapshot.params['orderId'];
    this.findCustomerOrderById(orderId);
  }


  findCustomerOrderById(orderId: string) {
    return this.orderService.findOrderByIdWithOrderItems(orderId).subscribe({
      next: (orderCustomerResponse) => {
        this.order = orderCustomerResponse;
      },
      error: (e) => {
        this.toastService.error('ERRO AO CARREGAR DADOS DO PEDIDO!');
      }
    });
  }

}
