import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../../core/models/product';
import { CartService } from '../../../core/services/cart.service';
import { ProductService } from '../../../core/services/product.service';
import { InputFormComponent } from '../../../shared/components/input-form/input-form.component';
import { RouterService } from '../../../core/services/router.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    InputFormComponent,
    ReactiveFormsModule
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {

  toastService = inject(ToastrService);
  routerService = inject(RouterService);
  activatedRoute = inject(ActivatedRoute);
  productService = inject(ProductService);
  cartService = inject(CartService);

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
      error: (error) => {
        this.toastService.error("erro ao carregar dados do produto");
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
    this.routerService.toCart();
  }



}
