import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { Store } from '../store';
import { StoreProductListSellerComponent } from "../store-product-list-seller/store-product-list-seller.component";
import { StoreService } from '../store.service';
import { OrderListStoreComponent } from "../../order/order-list-store/order-list-store.component";

@Component({
  selector: 'app-seller-store-management',
  imports: [RouterModule, StoreProductListSellerComponent, OrderListStoreComponent],
  templateUrl: './store-management.component.html',
  styleUrl: './store-management.component.scss',
})
export class StoreManagementComponent implements OnInit {
  @Input() store!: Store;
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly storeService = inject(StoreService);
  private readonly errorHandlerService = inject(ErrorHandlerService);

  ngOnInit(): void {
    let storeId = this.activatedRoute.snapshot.params['storeId'];
    this.loadStore(storeId);
  }

  loadStore(storeId: string) {
    this.storeService.getById(storeId).subscribe({
      next: (store) => {
        this.store = store;
      },
      error: (e) => {
        this.errorHandlerService.handleError(e);
      },
    });
  }

}
