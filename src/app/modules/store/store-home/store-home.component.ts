import { Component, OnInit, ViewChild, inject } from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { environment } from '../../../../environments/environment';
import { Category } from '../../../core/models/category';
import { Store } from '../../../core/models/store';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { StorageService } from '../../../core/services/storage.service';
import { StoreService } from '../../../core/services/store.service';
import { UtilService } from '../../../core/services/util.service';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { CategoryListComponent } from '../../category/category-list/category-list.component';
import { StoreProductListComponent } from '../store-product-list/store-product-list.component';
import { SearchComponent } from '../../../shared/components/search/search.component';

@Component({
  selector: 'app-store-home',
  standalone: true,
  imports: [CategoryListComponent, StoreProductListComponent, LoadingComponent, SearchComponent],
  templateUrl: './store-home.component.html',
  styleUrl: './store-home.component.scss',
})
export class StoreHomeComponent implements OnInit {
  @ViewChild(StoreProductListComponent)
  storeProductListComponent!: StoreProductListComponent;

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


  searchByCategoryName(category: Category) {
    if (category) {
      this.storeProductListComponent.categoryName = category.name;
      this.storeProductListComponent.onLoadProducts();
      //this.storeProductListComponent.filterProductsByCategory(category);
    } else {
      this.storeProductListComponent.categoryName = "";
      this.storeProductListComponent.onLoadProducts();
    }
    
  }
  

  searchByProductName(productName: string) {
    this.storeProductListComponent.searchByProductName(productName);
  }




  setAndValidateStoreByParamValue(paramValue: string) {
    const storedStore = this.storageService.get(this.storedStore);
    if (
      this.utilService.splitAndJoinString(storedStore.name, '-', ' ') ===
      this.utilService.splitAndJoinString(paramValue, '-', ' ')
    ) {
      this.store = storedStore;
      this.storeIsValid = true;
    } else {
      this.router.navigate(['error/notfound']);
    }
  }

}
