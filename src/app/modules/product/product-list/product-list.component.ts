import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';
import { Category } from '../../../core/models/category';
import { PageData } from '../../../core/models/page-data';
import { Product } from '../../../core/models/product';
import { CartService } from '../../../core/services/cart.service';
import { CategoryService } from '../../../core/services/category.service';
import { ProductService } from '../../../core/services/product.service';
import { RouterService } from '../../../core/services/router.service';
import { StorageService } from '../../../core/services/storage.service';
import { StoreService } from '../../../core/services/store.service';
import { MyPaginatorComponent } from '../../../shared/components/my-paginator/my-paginator.component';
import { Store } from '../../../core/models/store';
import { delay } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    MyPaginatorComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {

  @Input() store!: Store;

  toastService = inject(ToastrService);
  routerService = inject(RouterService);
  storageService = inject(StorageService);
  cartService = inject(CartService);
  storeService = inject(StoreService);
  categoryService = inject(CategoryService);
  productService = inject(ProductService);

  STORED_STORE = environment.STORED_STORE;
  isLoading: boolean = false;
  products: Product[] = [];
  categoryName: string = "";
  orderBy: string = "";
  selectedItem: any;


  pageNumber: number = 0;
  pageSize: number = 12;
  pages: number[] = [];

  ngOnInit(): void {
    this.loadProductsList(this.store.id, this.categoryName, this.pageNumber, this.pageSize);
  }

  loadProductsList(storeId: string, categoryName: string, pageNumber: number, pageSize: number) {
    this.isLoading = true;
    this.productService.getAllByStorePagedAndFiltered(storeId, categoryName, pageNumber, pageSize).subscribe({
      next: (pageData: PageData) => {
        this.products = pageData.content;
        this.pageNumber = pageData.page.number;
        this.pages = this.generateNumberList(pageData.page.totalPages);
        this.isLoading = false;
      },
      error: (e) => {
        this.toastService.error("Erro ao Carregar Dados da Loja!");
        this.isLoading = false;
      }
    });
  }


  filterProductsAll() {
    this.categoryName = '';
    this.loadProductsList(this.store.id, this.categoryName, this.pageNumber, this.pageSize)
  }

  filterProductsByCategory(category: Category) {
    category ? (() => {
      this.categoryName = category.name;
      this.pageNumber = 0;
      this.loadProductsList(this.store.id, this.categoryName, this.pageNumber, this.pageSize);
    })() : this.filterProductsAll();

  }

  addToCart(product: Product) {
    this.cartService.addToCart({
      product: product,
      quantity: 1,
      note: ""
    });
  }

  setPagination(pagination: { pageNumber: number, pageSize: number }) {
    this.pageNumber = pagination.pageNumber;
    this.pageSize = pagination.pageSize;
    this.loadProductsList(this.store.id, this.categoryName, this.pageNumber, this.pageSize);
  }

  setPageNumber(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.loadProductsList(this.store.id, this.categoryName, this.pageNumber, this.pageSize);
  }

  setPageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.loadProductsList(this.store.id, this.categoryName, this.pageNumber, this.pageSize);
  }

  generateNumberList(number: number): number[] {
    const numberPagesList: number[] = [];
    for (let i = 1; i <= number; i++) {
      numberPagesList.push(i);
    }
    return numberPagesList;
  }


  productsIsEmpty() {
    return Array.isArray(this.products) && this.products.length === 0
  }

}
