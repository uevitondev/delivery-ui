import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';
import { Store } from '../../../core/models/store';
import { StorageService } from '../../../core/services/storage.service';
import { StoreService } from '../../../core/services/store.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-list-store',
  standalone: true,
  imports: [],
  templateUrl: './list-store.component.html',
  styleUrl: './list-store.component.scss'
})
export class ListStoreComponent implements OnInit {

  storageService = inject(StorageService);
  storeService = inject(StoreService);
  toastService = inject(ToastrService);
  router = inject(Router);

  ENV = environment;
  stores!: Store[];
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
        throw new Error(e);
      }
    });
  }

  selectStore(store: Store) {
    this.storageService.remove(this.ENV.STORED_STORE);
    this.storageService.save(this.ENV.STORED_STORE, store);
    this.router.navigate(["home"]);
  }

}
