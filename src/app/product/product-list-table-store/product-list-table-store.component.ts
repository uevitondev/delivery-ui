import { CdkPortal } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { Component, inject, Input, ViewChild } from '@angular/core';
import { CartService } from '../../cart/cart.service';
import { CategoryService } from '../../category/category.service';
import { Store } from '../../store/store';
import { StoreService } from '../../store/store.service';
import { Product } from '../product';
import { ProductFormComponent } from '../product-form/product-form.component';
import { MatTableModule } from '@angular/material/table';
import { LoadingComponent } from '../../loading/loading.component';
import { ModalComponent } from '../../modal/modal.component';
import { PageData } from '../../models/page-data';
import { PaginatorComponent } from '../../paginator/paginator.component';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { ModalService, ModalOverlayRef } from '../../services/modal.service';
import { UtilService } from '../../utils/util.service';

@Component({
  selector: 'app-product-list-table-store',
  imports: [CommonModule, PaginatorComponent, LoadingComponent, ModalComponent, ProductFormComponent, CdkPortal, MatTableModule],
  templateUrl: './product-list-table-store.component.html',
  styleUrl: './product-list-table-store.component.scss',
})
export class ProductListTableStoreComponent {

  displayedColumns: string[] = ['actions', 'name', 'description', 'price'];

  utilService = inject(UtilService);
  cartService = inject(CartService);
  storeService = inject(StoreService);
  categoryService = inject(CategoryService);
  errorHandlerService = inject(ErrorHandlerService);
  modalService = inject(ModalService);

  @Input() store!: Store;

  modalOverlayRef!: ModalOverlayRef;

  @ViewChild(ProductFormComponent)
  private readonly productFormComponent!: ProductFormComponent;
  productName!: string;
  categoryName!: string;
  pageNumber: number = 0;
  pageSize: number = 12;
  orderBy: string = '';

  isLoading: boolean = false;
  products: Product[] = [];
  pages: number[] = [];

  confirmButtonStatus: boolean = true;

  ngOnInit(): void {
    this.onLoadProducts();
  }

  setConfirmButtonStatusByFormStatus(event: any) {
    this.confirmButtonStatus = event;
  }

  buildFinalQuery(): string {
    let defaultStoreProductsRoute = `/stores/${this.store.id}/products?page=${this.pageNumber}&size=${this.pageSize}`;

    if (!this.productName && !this.categoryName) {
      return defaultStoreProductsRoute;
    }

    if (this.productName && !this.categoryName) {
      defaultStoreProductsRoute = `${defaultStoreProductsRoute}&name=${this.productName}`;
      return defaultStoreProductsRoute;
    }

    if (this.categoryName && !this.productName) {
      defaultStoreProductsRoute = `${defaultStoreProductsRoute}&category=${this.categoryName}`;
      return defaultStoreProductsRoute;
    }

    if (this.productName && this.categoryName) {
      defaultStoreProductsRoute = `${defaultStoreProductsRoute}&name=${this.productName}&category=${this.categoryName}`;
      return defaultStoreProductsRoute;
    }

    return defaultStoreProductsRoute;

  }

  onLoadProducts() {
    this.isLoading = true;
    this.storeService.getAllProductsByStoreId(this.buildFinalQuery())
      .subscribe({
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

  searchByProductName(productName: string) {
    this.productName = this.getStringLowerCase(productName);
    this.onLoadProducts();
    this.productName = '';
  }

  searchByCategoryName(categoryName: string) {
    this.categoryName = this.getStringLowerCase(categoryName);
    this.onLoadProducts();
    this.categoryName = '';
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

  public confirmTemplateModal() {
    this.productFormComponent.onSubmit();
  }
}



