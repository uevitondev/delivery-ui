import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Product } from '../../../core/models/product';
import { CartService } from '../../../core/services/cart.service';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { ProductService } from '../../../core/services/product.service';
import { InputFormComponent } from '../../../shared/components/input-form/input-form.component';

@Component({
    selector: 'app-product-details',
    imports: [
        CommonModule,
        RouterLink,
        RouterOutlet,
        NgOptimizedImage,
        InputFormComponent,
        ReactiveFormsModule
    ],
    templateUrl: './product-details.component.html',
    styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {

  activatedRoute = inject(ActivatedRoute);
  productService = inject(ProductService);
  cartService = inject(CartService);
  errorHandlerService = inject(ErrorHandlerService);

  product!: Product;
  productQuantity: number = 1;


  ngOnInit(): void {
    let productId = this.activatedRoute.snapshot.params['productId'];
    this.loadProduct(productId);
  }

  loadProduct(productId: string) {
    this.productService.getById(productId).subscribe({
      next: (productDto) => {
        this.product = productDto;
      },
      error: (e) => {
        this.errorHandlerService.handleError(e, "OCORREU UM ERRO AO CARREGAR DETALHES DO PRODUTO");
      }
    });
  }


  incrementProductQuantity() {
    this.productQuantity += 1;
  }

  decrementProductQuantity() {
    if (this.productQuantity > 1) {
      this.productQuantity -= 1;
    } else {
      return;
    }
  }

  addToCart(product: Product) {
    this.cartService.addItemToCart({
      product: product,
      quantity: this.productQuantity,
      note: ''
    });
  }

  buyNow(product: Product) {
    this.addToCart(product);
  }






}
