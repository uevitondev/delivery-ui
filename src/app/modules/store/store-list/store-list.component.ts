import { Component, inject, OnInit } from '@angular/core';
import { Store } from '../../../core/models/store';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { StoreService } from '../../../core/services/store.service';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { StoreCardComponent } from '../storecard/storecard.component';

@Component({
  selector: 'app-store-list',
  standalone: true,
  imports: [StoreCardComponent, SearchComponent],
  templateUrl: './store-list.component.html',
  styleUrl: './store-list.component.scss',
})
export class StoreListComponent implements OnInit {
  errorHandlerService = inject(ErrorHandlerService);
  storeService = inject(StoreService);
  stores: Store[] = [];
  storeName: string = '';
  isLoading: boolean = false;

  ngOnInit(): void {
    this.onLoadStores();
  }

  onLoadStores() {
    this.isLoading = true;
    this.storeService.getAll(this.storeName).subscribe({
      next: (response) => {
        this.stores = response;
        this.isLoading = false;
      },
      error: (e) => {
        this.isLoading = false;
        this.errorHandlerService.handleError(
          e,
          'OCORREU UM ERRO AO CARREGAR LOJAS',
        );
      },
    });
  }

  searchByStoreName(name: string) {
    this.storeName = name;
    this.onLoadStores();
  }

  setStore(store: Store) {
    console.log(store);
  }
}
