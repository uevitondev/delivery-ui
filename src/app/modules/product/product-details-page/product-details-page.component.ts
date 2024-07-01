import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductDto } from '../../../core/models/product-dto';
import { CartService } from '../../../core/services/cart.service';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-product-details-page',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './product-details-page.component.html',
  styleUrl: './product-details-page.component.scss'
})
export class ProductDetailsPageComponent implements OnInit {
  toastService = inject(ToastrService);
  activatedRoute = inject(ActivatedRoute);
  productService = inject(ProductService);
  cartService = inject(CartService);
  product!: ProductDto;

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

  addToCart(product: ProductDto) {
    this.cartService.addToCart(product, 1, "");
    this.toastService.info("Adicionado ao carrinho!")
  }



}
