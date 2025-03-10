import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { StorageService } from '../../../core/services/storage.service';
import { UtilService } from '../../../core/utils/util.service';
import { LoadingComponent } from '../../../modules/shared/loading/loading.component';
import { Store } from '../store';
import { StoreProductListComponent } from '../store-product-list/store-product-list.component';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-store-home',
  imports: [
    StoreProductListComponent,
    LoadingComponent,
  ],
  templateUrl: './store-home.component.html',
  styleUrl: './store-home.component.scss',
})
export class StoreHomeComponent implements OnInit {

  errorHandlerService = inject(ErrorHandlerService);
  activatedRoute = inject(ActivatedRoute);
  storeService = inject(StoreService);
  storageService = inject(StorageService);
  utilService = inject(UtilService);
  router = inject(Router);

  storedStore = environment.STORED_STORE;
  store!: Store;
  storeIsValid: boolean = false;
  isLoading: boolean = false;

  ngOnInit(): void {
    this.store = this.storageService.get(this.storedStore);
    let paramValue = this.activatedRoute.snapshot.params['storeName'];
    this.setAndValidateStoreByParamValue(paramValue);
  }



  setAndValidateStoreByParamValue(paramValue: string) {
    const storedStore = this.storageService.get(this.storedStore);
    if (
      storedStore &&
      storedStore.name.toLowerCase() ===
      this.utilService.splitStringByIfenAndJoinBySpaceLower(paramValue)
    ) {
      this.store = storedStore;
      this.storeIsValid = true;
    } else {
      this.router.navigate(['error/notfound']);
    }
  }
}
