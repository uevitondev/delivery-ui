import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderDetails } from '../../../core/models/order-details';
import { OrderService } from '../../../core/services/order.service';
import { StorageService } from '../../../core/services/storage.service';
import { StoreCardComponent } from '../../store/storecard/storecard.component';

@Component({
    selector: 'app-order-details',
    imports: [
        CommonModule,
        StoreCardComponent
    ],
    templateUrl: './order-details.component.html',
    styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent implements OnInit {

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  toastService = inject(ToastrService);
  storageService = inject(StorageService);
  orderService = inject(OrderService);

  orderDetails!: OrderDetails;

  ngOnInit(): void {
    let orderId = this.activatedRoute.snapshot.params['orderId'];
    this.loadOrderDetails(orderId);
  }


  loadOrderDetails(orderId: string) {
    return this.orderService.getByIdWithOrderItems(orderId).subscribe({
      next: (response) => {
        this.orderDetails = response;
      },
      error: (e) => {
        return new Error(e);
      }
    });
  }

}
