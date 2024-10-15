import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';
import { Store } from '../../../core/models/store';
import { StorageService } from '../../../core/services/storage.service';
import { StoreService } from '../../../core/services/store.service';
import { RouterService } from '../../../core/services/router.service';

@Component({
  selector: 'app-store-list',
  standalone: true,
  imports: [],
  templateUrl: './store-list.component.html',
  styleUrl: './store-list.component.scss'
})
export class StoreListComponent implements OnInit {

  storageService = inject(StorageService);
  storeService = inject(StoreService);
  toastService = inject(ToastrService);
  routerService = inject(RouterService);

  storedStore = environment.STORED_STORE;

  stores: Store[] = [];
  isLoading: boolean = false;

  ngOnInit(): void {
    this.loadStores();
  }


  loadStores() {
    this.isLoading = true;
    this.storeService.getAll().subscribe({
      next: (stores) => {
        this.stores = stores;
        this.isLoading = false;
      },
      error: (e) => {
        this.isLoading = false;
        return new Error(e);
      }
    });
  }

  selectStore(store: Store) {
    this.storageService.remove(this.storedStore);
    this.storageService.save(this.storedStore, store);
    this.routerService.toHome();
  }

}
