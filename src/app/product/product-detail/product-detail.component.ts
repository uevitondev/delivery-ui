import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../product';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { CartService } from '../../cart/cart.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {
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
        this.errorHandlerService.handleError(e);
      },
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
      note: '',
    });
  }

  buyNow(product: Product) {
    this.addToCart(product);
  }
}
