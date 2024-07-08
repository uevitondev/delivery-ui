import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { StorageService } from '../../../core/services/storage.service';
import { CategoryListComponent } from '../../category/category-list/category-list.component';
import { ProductListComponent } from '../../product/product-list/product-list.component';
import { CategoryDto } from '../../../core/models/category';

@Component({
  selector: 'app-store-page',
  standalone: true,
  imports: [
    CategoryListComponent,
    ProductListComponent
  ],
  templateUrl: './store-page.component.html',
  styleUrl: './store-page.component.scss'
})
export class StorePageComponent implements OnInit {

  @ViewChild(ProductListComponent) productListComponent!: ProductListComponent;

  router = inject(Router);
  storageService = inject(StorageService);
  STORED_STORE = environment.STORED_STORE;

  ngOnInit(): void {
    const storedStore = this.storageService.get(this.STORED_STORE);
    storedStore ? {} : this.router.navigate(['stores']);
  }

  sendEventSelectedCategoryToProductList(category: CategoryDto) {
    this.productListComponent.filterProductsByCategory(category);
  }

}
