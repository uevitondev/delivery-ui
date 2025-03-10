import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../../../core/services/storage.service';
import { StoreCardComponent } from '../../store/storecard/storecard.component';
import { OrderDetail } from '../order-detail';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-detail',
  imports: [CommonModule, StoreCardComponent],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss',
})
export class OrderDetailComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  toastService = inject(ToastrService);
  storageService = inject(StorageService);
  orderService = inject(OrderService);

  orderDetail!: OrderDetail;

  ngOnInit(): void {
    let orderId = this.activatedRoute.snapshot.params['orderId'];
    this.loadOrderDetail(orderId);
  }

  loadOrderDetail(orderId: string) {
    return this.orderService.getByIdWithOrderItems(orderId).subscribe({
      next: (response) => {
        this.orderDetail = response;
      },
      error: (e) => {
        return new Error(e);
      },
    });
  }
}
