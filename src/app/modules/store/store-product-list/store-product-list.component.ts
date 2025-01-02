import { Component, inject, Input } from '@angular/core';
import { Category } from '../../../core/models/category';
import { PageData } from '../../../core/models/page-data';
import { Product } from '../../../core/models/product';
import { Store } from '../../../core/models/store';
import { CartService } from '../../../core/services/cart.service';
import { CategoryService } from '../../../core/services/category.service';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { StoreService } from '../../../core/services/store.service';
import { UtilService } from '../../../core/services/util.service';
import { PaginatorComponent } from '../../../shared/components/paginator/paginator.component';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { ProductCardComponent } from '../../product/productcard/productcard.component';
import { LoadingComponent } from "../../../shared/components/loading/loading.component";

@Component({
  selector: 'app-store-product-list',
  standalone: true,
  imports: [SearchComponent, ProductCardComponent, PaginatorComponent, LoadingComponent],
  templateUrl: './store-product-list.component.html',
  styleUrl: './store-product-list.component.scss',
})
export class StoreProductListComponent {
  utilService = inject(UtilService);
  cartService = inject(CartService);
  storeService = inject(StoreService);
  categoryService = inject(CategoryService);
  errorHandlerService = inject(ErrorHandlerService);

  @Input() store!: Store;

  productName: string = '';
  categoryName: string = '';
  pageNumber: number = 0;
  pageSize: number = 12;
  orderBy: string = '';

  isLoading: boolean = false;
  products: Product[] = [];
  pages: number[] = [];

  ngOnInit(): void {
    this.onLoadProducts();
  }

  onLoadProducts() {
    this.isLoading = true;
    this.storeService
      .getAllProductsByStoreId(
        this.store.id,
        this.productName,
        this.categoryName,
        this.pageNumber,
        this.pageSize,
      )
      .subscribe({
        next: (pageData: PageData) => {
          this.products = pageData.content;
          this.pageNumber = pageData.page.number;
          this.pages = this.generateNumberList(pageData.page.totalPages);
          this.isLoading = false;
        },
        error: (e) => {
          this.isLoading = false;
          this.errorHandlerService.handleError(
            e,
            'OCORREU UM ERRO AO CARREGAR PRODUTOS',
          );
        },
      });
  }

  searchByProductName(productName: string) {
    this.productName = this.getStringLowerCase(productName);
    this.onLoadProducts();
    this.productName = "";
  }

  searchByCategoryName(categoryName: string) {
    this.categoryName = this.getStringLowerCase(categoryName);
    this.onLoadProducts();
    this.categoryName = "";
  }

  getStringLowerCase(value: string) {
    return value.toLowerCase();
  }

  filterProductsAll() {
    this.productName = '';
    this.categoryName = '';
    this.onLoadProducts();
  }

  /*

  filterProductsByCategory(category: Category) {
    category
      ? (() => {
          this.categoryName = category.name;
          this.pageNumber = 0;
          this.onLoadProducts();
        })()
      : this.filterProductsAll();
  }
  */

  addToCart(product: Product) {
    this.cartService.addItemToCart({
      product: product,
      quantity: 1,
      note: '',
    });
  }

  setPagination(pagination: { pageNumber: number; pageSize: number }) {
    this.pageNumber = pagination.pageNumber;
    this.pageSize = pagination.pageSize;
    this.onLoadProducts();
  }

  setPageNumber(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.onLoadProducts();
  }

  setPageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.onLoadProducts();
  }

  generateNumberList(number: number): number[] {
    const numberPagesList: number[] = [];
    for (let i = 1; i <= number; i++) {
      numberPagesList.push(i);
    }
    return numberPagesList;
  }

  productsIsEmpty() {
    return Array.isArray(this.products) && this.products.length === 0;
  }
}
