import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment.development';
import { CategoryDto } from '../../../core/models/category';
import { PageProduct } from '../../../core/models/page-product';
import { ProductDto } from '../../../core/models/product-dto';
import { StoreData } from '../../../core/models/store-data';
import { CartService } from '../../../core/services/cart.service';
import { CategoryService } from '../../../core/services/category.service';
import { ProductService } from '../../../core/services/product.service';
import { StorageService } from '../../../core/services/storage.service';
import { StoreService } from '../../../core/services/store.service';
@Component({
  selector: 'app-store-page',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './store-page.component.html',
  styleUrl: './store-page.component.scss'
})
export class StorePageComponent implements OnInit {
  ENV = environment;
  router = inject(Router);
  toastService = inject(ToastrService);
  storageService = inject(StorageService);
  storeService = inject(StoreService);
  productService = inject(ProductService);
  categoryService = inject(CategoryService);
  cartService = inject(CartService);

  categories!: CategoryDto[];
  products!: ProductDto[];
  storeData!: StoreData;
  storeId!: string;
  categoryName: string = '';
  orderBy: string = "";
  pageIndex: number = 0;
  pageSize: number = 10;
  totalItems: number = 0;

  ngOnInit(): void {
    const storedStore = this.storageService.get(this.ENV.STORED_STORE);
    this.storeId = storedStore ? storedStore.id : '';
    storedStore ? this.loadStoreData() : this.router.navigate(['stores']);
    this.loadCategories();
  }

  filterProductsAll() {
    this.categoryName = '';
    this.loadStoreData();
  }

  filterProductsByCategory(category: any) {
    this.categoryName = category.name;
    this.loadStoreData();
  }

  loadCategories() {
    this.categoryService.getAll().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        this.toastService.error("Erro ao Carregar Categorias de Produtos!");
      }
    });
  }


  loadStoreData() {
    this.productService.getAllByStorePagedAndFiltered(this.storeId, this.categoryName, this.pageIndex, this.pageSize,).subscribe({
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

  navigateToProductDetails(product: ProductDto) {
    this.router.navigate(['products/details', product.id]);
  }

  addToCart(productDto: ProductDto) {
    this.cartService.addToCart(productDto, 1, "")
    this.toastService.info("Adicionado Ao Carrinho: " + productDto.name);
  }


}
