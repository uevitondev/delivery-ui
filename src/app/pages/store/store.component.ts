import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment.development';
import { PageProduct } from '../../model/product/page-product';
import { StoreData } from '../../model/store/store-data';
import { ProductService } from '../../services/product.service';
import { StorageService } from '../../services/storage.service';
import { StoreService } from '../../services/store.service';
import { ProductDto } from '../../model/product/product-dto';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss'
})
export class StoreComponent {
  storageService = inject(StorageService);
  storeService = inject(StoreService);
  productService = inject(ProductService);
  toastService = inject(ToastrService);
  router = inject(Router);
  products!: ProductDto[];
  storeData!: StoreData;
  orderBy: string = "";
  pageIndex: number = 0;
  pageSize: number = 10;
  totalItems: number = 0;

  constructor() {
    const store = this.storageService.get(environment.store);
    if (store == null) {
      this.router.navigate(['stores']);
    }
    this.fetchStoreData(store.id);
  }

  fetchStoreData(storeId: string) {
    this.productService.findAllProductsByStoreId(storeId, this.pageIndex, this.pageSize).subscribe({
      next: (pageProduct) => {
        this.products = pageProduct.content;
        //this.getStoreDataFromPageProduct(pageProduct);
      },
      error: (error) => {
        this.toastService.error("Erro ao Carregar Dados da Loja!");
      }
    });
  }


  getStoreDataFromPageProduct(pageProduct: PageProduct): StoreData {
    let data: StoreData = {
      products: pageProduct.content,
      search: "",
      currentPage: pageProduct.number,
      page: pageProduct.totalPages,
      pageable: pageProduct.peageable,
      totalElements: pageProduct.totalElements,
      pageSize: pageProduct.size,
    };
    return data;
  }

  navigateToProductDetails(product: any) { 
    this.toastService.info("navigate to details for product: "+ product.name);
  }
  addProductToCart(product: any) {
    this.toastService.info("add to cart product: "+ product.name);
  }


}
