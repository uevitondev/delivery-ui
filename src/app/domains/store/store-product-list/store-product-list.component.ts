import { Component, inject, Input } from '@angular/core';
import { PageData } from '../../../core/models/page-data';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { UtilService } from '../../../core/utils/util.service';
import { PaginatorComponent } from '../../../modules/shared/paginator/paginator.component';
import { SearchComponent } from "../../../modules/shared/search/search.component";
import { CartService } from '../../cart/cart.service';
import { Category } from '../../category/category';
import { CategoryListSelectComponent } from '../../category/category-list-select/category-list-select.component';
import { CategoryService } from '../../category/category.service';
import { Product } from '../../product/product';
import { ProductCardComponent } from '../../product/productcard/productcard.component';
import { Store } from '../store';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-store-product-list',
  imports: [ProductCardComponent, PaginatorComponent, CategoryListSelectComponent, SearchComponent],
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

  productName!: string;
  categoryName!: string;
  pageNumber!: number;
  pageSize!: number;
  orderBy!: string;

  isLoading: boolean = false;
  products: Product[] = [];
  pages: number[] = [];


  ngOnInit(): void {
    this.onLoadProducts();
  }

  buildFinalQuery(): string {
    let defaultStoreProductsRoute = `/stores/${this.store.id}/products?page=${this.pageNumber}&size=${this.pageSize}`;

    if (!this.productName && !this.categoryName) {
      return defaultStoreProductsRoute;
    }

    if (this.productName && !this.categoryName) {
      defaultStoreProductsRoute = `${defaultStoreProductsRoute}&product_name=${this.productName}`;
      return defaultStoreProductsRoute;
    }

    if (this.categoryName && !this.productName) {
      defaultStoreProductsRoute = `${defaultStoreProductsRoute}&category_name=${this.categoryName}`;
      return defaultStoreProductsRoute;
    }

    if (this.productName && this.categoryName) {
      defaultStoreProductsRoute = `${defaultStoreProductsRoute}&product_name=${this.productName}&category_name=${this.categoryName}`;
      return defaultStoreProductsRoute;
    }

    return defaultStoreProductsRoute;

  }

  onLoadProducts() {
    this.isLoading = true;
    this.storeService.getAllProductsByStoreId(this.buildFinalQuery()).subscribe({
      next: (pageData: PageData) => {
        this.products = pageData.content;
        this.pageNumber = pageData.page.number;
        this.pages = this.generateNumberList(pageData.page.totalPages);
        this.isLoading = false;
      },
      error: (e) => {
        this.isLoading = false;
        this.errorHandlerService.handleError(e);
      },
    });
  }

  filterProductsByName(productName: string) {
    this.productName = this.getStringLowerCase(productName);
    this.onLoadProducts();
  }

  filterProductByAllCategories(category: Category) {
    this.categoryName = '';
    this.onLoadProducts();
  }


  filterProductsByCategory(category: Category) {
    this.categoryName = this.getStringLowerCase(category.name);
    this.onLoadProducts();
  }


  filterProductsAll() {
    this.productName = '';
    this.categoryName = '';
    this.onLoadProducts();
  }

  getStringLowerCase(value: string) {
    return value.toLowerCase();
  }


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
