import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { UtilService } from '../../../core/utils/util.service';
import { Store } from '../../store/store';
import { StoreService } from '../../store/store.service';
import { StoreCardComponent } from '../../store/storecard/storecard.component';

@Component({
  selector: 'app-seller-stores',
  imports: [RouterModule, StoreCardComponent],
  templateUrl: './seller-stores.component.html',
  styleUrl: './seller-stores.component.scss',
})
export class SellerStoresComponent implements OnInit {
  private readonly storeService = inject(StoreService);
  private readonly errorHandlerService = inject(ErrorHandlerService);
  utilService = inject(UtilService);
  stores: Store[] = [];
  isLoading: boolean = false;

  ngOnInit(): void {
    this.onLoadStores();
  }

  onLoadStores() {
    this.isLoading = true;
    this.storeService.getAllBySeller().subscribe({
      next: (response) => {
        this.stores = response;
        this.isLoading = false;
      },
      error: (e) => {
        this.isLoading = false;
        this.errorHandlerService.handleError(e);
      },
    });
  }


  public getFinalUrlByStore(store: Store) {
    return `/seller/stores/${store.id}`;
  }




}
