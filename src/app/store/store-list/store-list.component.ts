import { Component, inject, OnInit } from '@angular/core';
import { Store } from '../store';
import { StoreService } from '../store.service';
import { StoreCardComponent } from '../storecard/storecard.component';
import { environment } from '../../../environments/environment.development';
import { SearchComponent } from '../../search/search.component';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { StorageService } from '../../services/storage.service';
import { UtilService } from '../../utils/util.service';

@Component({
  selector: 'app-store-list',
  imports: [StoreCardComponent, SearchComponent],
  templateUrl: './store-list.component.html',
  styleUrl: './store-list.component.scss',
})
export class StoreListComponent implements OnInit {
  private readonly storedStore = environment.STORED_STORE;
  private readonly errorHandlerService = inject(ErrorHandlerService);
  private readonly storageService = inject(StorageService);
  private readonly storeService = inject(StoreService);
  readonly utilService = inject(UtilService);
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
        this.errorHandlerService.handleError(e);
      },
    });
  }

  searchByStoreName(name: string) {
    this.storeName = name;
    this.onLoadStores();
  }

  saveStoreInStorage(store: Store) {
    this.storageService.save(this.storedStore, store);
  }
}
