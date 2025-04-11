import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '../../store/store';
import { StoreService } from '../../store/store.service';
import { StoreCardComponent } from '../../store/storecard/storecard.component';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { UtilService } from '../../utils/util.service';

@Component({
  selector: 'app-store-list-seller',
  imports: [RouterModule, StoreCardComponent],
  templateUrl: './store-list-seller.component.html',
  styleUrl: './store-list-seller.component.scss',
})
export class StoreListSellerComponent implements OnInit {
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
