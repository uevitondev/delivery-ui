import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { CartService } from '../../cart/cart.service';
import { Category } from '../../category/category';
import { CategoryService } from '../../category/category.service';
import { Store } from '../../store/store';
import { StoreService } from '../../store/store.service';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { ProductCardComponent } from '../productcard/productcard.component';
import { PageData } from '../../models/page-data';
import { PaginatorComponent } from '../../paginator/paginator.component';
import { SearchComponent } from '../../search/search.component';
import { ErrorHandlerService } from '../../services/error-handler.service';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, SearchComponent, ProductCardComponent, PaginatorComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  @Input() store!: Store;

  errorHandlerService = inject(ErrorHandlerService);
  cartService = inject(CartService);
  storeService = inject(StoreService);
  categoryService = inject(CategoryService);
  productService = inject(ProductService);

  isLoading: boolean = false;
  products: Product[] = [];
  searchProductName: string = '';
  searchProductCategory: string = '';
  orderBy: string = '';
  selectedItem: any;

  pageNumber: number = 0;
  pageSize: number = 12;
  pages: number[] = [];

  ngOnInit(): void {
    this.onLoadProducts(this.pageNumber, this.pageSize);
  }

  onLoadProducts(pageNumber: number, pageSize: number) {
    this.isLoading = true;
    this.productService.getAll().subscribe({
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

  filterProductsAll() {
    this.searchProductCategory = '';
    this.onLoadProducts(this.pageNumber, this.pageSize);
  }

  filterProductsByCategory(category: Category) {
    category
      ? (() => {
        this.searchProductCategory = category.name;
        this.pageNumber = 0;
        this.onLoadProducts(this.pageNumber, this.pageSize);
      })()
      : this.filterProductsAll();
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
    this.onLoadProducts(this.pageNumber, this.pageSize);
  }

  setPageNumber(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.onLoadProducts(this.pageNumber, this.pageSize);
  }

  setPageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.onLoadProducts(this.pageNumber, this.pageSize);
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
