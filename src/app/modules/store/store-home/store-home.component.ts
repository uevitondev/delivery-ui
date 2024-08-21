import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { Category } from '../../../core/models/category';
import { StorageService } from '../../../core/services/storage.service';
import { CategoryListComponent } from '../../category/category-list/category-list.component';
import { ProductListComponent } from '../../product/product-list/product-list.component';

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

  router = inject(Router);
  storageService = inject(StorageService);
  STORED_STORE = environment.STORED_STORE;

  ngOnInit(): void {
    const storedStore = this.storageService.get(this.STORED_STORE);
    storedStore ? {} : this.router.navigate(['stores']);
  }

  filterProductsByCategory(category: Category) {
    this.productListComponent.filterProductsByCategory(category);
  }

}
