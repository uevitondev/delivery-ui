import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../../core/models/product';
import { CartService } from '../../../core/services/cart.service';
import { ProductService } from '../../../core/services/product.service';
import { InputFormComponent } from '../../../shared/components/input-form/input-form.component';

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
  activatedRoute = inject(ActivatedRoute);
  productService = inject(ProductService);
  cartService = inject(CartService);
  noteForm!: FormGroup;
  noteMaxLength: number = 60;
  product!: Product;
  productQuantity: number = 1;


  ngOnInit(): void {
    let productId = this.activatedRoute.snapshot.params['productId'];
    this.loadProduct(productId);
    this.noteForm = new FormGroup({
      note: new FormControl('', [Validators.required, Validators.maxLength(this.noteMaxLength)])
    });

  }

  loadProduct(productId: string) {
    this.productService.getById(productId).subscribe({
      next: (productDto) => {
        this.product = productDto;
        this.getNoteIfIsInCart(this.product);
      },
      error: (error) => {
        this.toastService.error("erro ao carregar dados do produto");
      }
    });
  }

  getNoteIfIsInCart(product: Product) {
    const cartItem = this.cartService.getCartItem({
      product: product,
      quantity: 1,
      note: ''
    });

    if (cartItem) {
      this.noteForm.patchValue({
        note: cartItem.note
      });
    }
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
    this.cartService.addToCart({
      product: product,
      quantity: this.productQuantity,
      note: this.noteForm.value.note
    });

    this.toastService.info("Adicionado ao carrinho!")
  }



}
