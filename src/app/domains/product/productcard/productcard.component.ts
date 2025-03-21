import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../product';

@Component({
  selector: 'app-productcard',
  imports: [RouterLink, CommonModule, NgOptimizedImage],
  templateUrl: './productcard.component.html',
  styleUrl: './productcard.component.scss',
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() addToCartEvent = new EventEmitter<Product>();

  addToCart() {
    this.addToCartEvent.emit(this.product);
  }
}
