import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment.development';
import { Category } from '../../../core/models/category';
import { PageProduct } from '../../../core/models/page-product';
import { Product } from '../../../core/models/product';
import { StoreData } from '../../../core/models/store-data';
import { CartService } from '../../../core/services/cart.service';
import { CategoryService } from '../../../core/services/category.service';
import { ProductService } from '../../../core/services/product.service';
import { RouterService } from '../../../core/services/router.service';
import { StorageService } from '../../../core/services/storage.service';
import { StoreService } from '../../../core/services/store.service';
import { MyPaginatorComponent } from '../../../shared/components/my-paginator/my-paginator.component';

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

  toastService = inject(ToastrService);
  routerService = inject(RouterService);
  storageService = inject(StorageService);
  cartService = inject(CartService);
  storeService = inject(StoreService);
  categoryService = inject(CategoryService);
  productService = inject(ProductService);

  STORED_STORE = environment.STORED_STORE;
  products: Product[] = [];
  storeData!: StoreData;
  storeId!: string;
  categoryName: string = "";
  orderBy: string = "";
  selectedItem: any;

  pageNumber: number = 0;
  pageSize: number = 8;
  pages: number[] = [];

  ngOnInit(): void {
    const storedStore = this.storageService.get(this.STORED_STORE);
    storedStore ? (() => {
      this.storeId = storedStore.id;
      this.loadProductsList(this.storeId, this.categoryName, this.pageNumber, this.pageSize);
    })() : this.routerService.toStores();
  }

  loadProductsList(storeId: string, categoryName: string, pageNumber: number, pageSize: number) {
    console.log('get page with page number: ' + this.pageNumber);
    console.log('get page with page size: ' + this.pageSize);
    this.productService.getAllByStorePagedAndFiltered(storeId, categoryName, pageNumber, pageSize).subscribe({
      next: (pageProduct) => {
        this.products = pageProduct.content;
        this.pageNumber = pageProduct.pageable.pageNumber;
        this.pages = this.generateNumberList(pageProduct.totalPages);
      },
      error: (e) => {
        this.toastService.error("Erro ao Carregar Dados da Loja!");
      }
    });
  }


  filterProductsAll() {
    this.categoryName = '';
    this.loadProductsList(this.storeId, this.categoryName, this.pageNumber, this.pageSize)
  }

  filterProductsByCategory(category: Category) {
    category ? (() => {
      this.categoryName = category.name;
      this.pageNumber = 0;
      this.loadProductsList(this.storeId, this.categoryName, this.pageNumber, this.pageSize);
    })() : this.filterProductsAll();

  }

  getStoreDataFromPageProduct(pageProduct: PageProduct): StoreData {
    let data: StoreData = {
      products: pageProduct.content,
      search: "",
      currentPage: pageProduct.number,
      page: pageProduct.totalPages,
      pageable: pageProduct.pageable,
      totalElements: pageProduct.totalElements,
      pageSize: pageProduct.size,
    };
    return data;
  }

  addToCart(product: Product) {
    this.cartService.addToCart({
      product: product,
      quantity: 1,
      note: ""
    });
    this.toastService.info("Adicionado Ao Carrinho: " + product.name);
  }

  setPagination(pagination: { pageNumber: number, pageSize: number }) {

    this.pageNumber = pagination.pageNumber;
    this.pageSize = pagination.pageSize;
    console.log('page size value from paginator: ' + pagination.pageSize);

    console.log('setPagination()');
    console.log('set page number: ' + this.pageNumber);
    console.log('set page size: ' + this.pageSize);
    this.loadProductsList(this.storeId, this.categoryName, this.pageNumber, this.pageSize);

  }

  setPageNumber(pageNumber: number) {
    this.pageNumber = pageNumber;
    console.log('set page number: ' + this.pageNumber);
    this.loadProductsList(this.storeId, this.categoryName, this.pageNumber, this.pageSize);
  }

  setPageSize(pageSize: number) {
    this.pageSize = pageSize;
    console.log('set page size: ' + this.pageSize);
    this.loadProductsList(this.storeId, this.categoryName, this.pageNumber, this.pageSize);
  }

  generateNumberList(number: number): number[] {
    const numberPagesList: number[] = [];
    for (let i = 1; i <= number; i++) {
      numberPagesList.push(i);
    }
    console.log('pages: ' + numberPagesList);
    console.log('number of pages length: ' + numberPagesList.length);
    return numberPagesList;
  }

}
