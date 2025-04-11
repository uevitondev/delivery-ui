import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { OrderListStoreComponent } from "../../order/order-list-store/order-list-store.component";
import { Store } from '../store';
import { StoreService } from '../store.service';
import { ProductListTableStoreComponent } from "../../product/product-list-table-store/product-list-table-store.component";
import { ErrorHandlerService } from '../../services/error-handler.service';

@Component({
  selector: 'app-seller-store-management',
  imports: [RouterModule, OrderListStoreComponent, ProductListTableStoreComponent],
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
