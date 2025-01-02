import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Category } from '../../../core/models/category';
import { PageData } from '../../../core/models/page-data';
import { Product } from '../../../core/models/product';
import { Store } from '../../../core/models/store';
import { CartService } from '../../../core/services/cart.service';
import { CategoryService } from '../../../core/services/category.service';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { ProductService } from '../../../core/services/product.service';
import { StoreService } from '../../../core/services/store.service';
import { PaginatorComponent } from '../../../shared/components/paginator/paginator.component';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { ProductCardComponent } from '../productcard/productcard.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    CommonModule,
    NgOptimizedImage,
    SearchComponent,
    ProductCardComponent,
    PaginatorComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
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
  searchProductName: string = "";
  searchProductCategory: string = "";
  orderBy: string = "";
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
        this.errorHandlerService.handleError(e, "OCORREU UM ERRO AO CARREGAR PRODUTOS");
      }
    });
  }


  filterProductsAll() {
    this.searchProductCategory = '';
    this.onLoadProducts(this.pageNumber, this.pageSize)
  }

  filterProductsByCategory(category: Category) {
    category ? (() => {
      this.searchProductCategory = category.name;
      this.pageNumber = 0;
      this.onLoadProducts(this.pageNumber, this.pageSize);
    })() : this.filterProductsAll();

  }

  addToCart(product: Product) {
    this.cartService.addItemToCart({
      product: product,
      quantity: 1,
      note: ""
    });
  }

  setPagination(pagination: { pageNumber: number, pageSize: number }) {
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
    return Array.isArray(this.products) && this.products.length === 0
  }

}
