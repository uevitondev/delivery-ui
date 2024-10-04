import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { Category } from '../../../core/models/category';
import { StorageService } from '../../../core/services/storage.service';
import { CategoryListComponent } from '../../category/category-list/category-list.component';
import { ProductListComponent } from '../../product/product-list/product-list.component';
import { RouterService } from '../../../core/services/router.service';
import { Store } from '../../../core/models/store';

@Component({
  selector: 'app-store-home',
  standalone: true,
  imports: [
    CategoryListComponent,
    ProductListComponent
  ],
  templateUrl: './store-home.component.html',
  styleUrl: './store-home.component.scss'
})
export class StoreHomeComponent implements OnInit {

  @ViewChild(ProductListComponent) productListComponent!: ProductListComponent;

  routerService = inject(RouterService);
  storageService = inject(StorageService);
  STORED_STORE = environment.STORED_STORE;
  store!: Store;
  hasStore = false;

  ngOnInit(): void {
    const storedStore = this.storageService.get(this.STORED_STORE);
    storedStore ? (() => {
      this.hasStore = true;
      this.store = storedStore;
    })() : null;
  }

  filterProductsByCategory(category: Category) {
    this.productListComponent.filterProductsByCategory(category);
  }

}
