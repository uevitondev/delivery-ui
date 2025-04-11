import { Component, inject, Input } from '@angular/core';
import { CartService } from '../../cart/cart.service';
import { Category } from '../../category/category';
import { CategoryListSelectComponent } from '../../category/category-list-select/category-list-select.component';
import { CategoryService } from '../../category/category.service';
import { Store } from '../../store/store';
import { StoreService } from '../../store/store.service';
import { Product } from '../product';
import { ProductCardComponent } from '../productcard/productcard.component';
import { PageData } from '../../models/page-data';
import { PaginatorComponent } from '../../paginator/paginator.component';
import { SearchComponent } from '../../search/search.component';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { UtilService } from '../../utils/util.service';

@Component({
  selector: 'app-product-list-store',
  imports: [ProductCardComponent, PaginatorComponent, CategoryListSelectComponent, SearchComponent],
  templateUrl: './product-list-store.component.html',
  styleUrl: './product-list-store.component.scss',
})
export class ProductListStoreComponent {
  utilService = inject(UtilService);
  cartService = inject(CartService);
  storeService = inject(StoreService);
  categoryService = inject(CategoryService);
  errorHandlerService = inject(ErrorHandlerService);

  @Input() store!: Store;

  productName!: string;
  categoryName!: string;
  pageNumber: number = 0;
  pageSize: number = 12;
  orderBy: string = 'ASC';

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
