import { NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cart } from '../../../core/models/cart';
import { CartItem } from '../../../core/models/cartitem';
import { CartService } from '../../../core/services/cart.service';
import { OrderService } from '../../../core/services/order.service';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [MatIconModule, NgIf, MatMenuModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent implements OnInit {
  router = inject(Router);
  toastService = inject(ToastrService);
  orderService = inject(OrderService);
  cartService = inject(CartService);

  cart!: Cart;
  total!: number;

  ngOnInit(): void {
    this.cartService.getCart().subscribe(cart => {
      this.cart = cart;
      this.total = this.cartService.getTotal();
    });
  }

  incrementItemQuantity(item: CartItem) {
    this.cartService.incrementItemQuantity(item);
    this.total = this.cartService.getTotal();
  }

  decrementItemQuantity(item: CartItem) {
    this.cartService.decrementItemQuantity(item);
    this.total = this.cartService.getTotal();
  }

  removeItem(item: CartItem) {
    this.cartService.removeItem(item);
    this.total = this.cartService.getTotal();
  }

  addObservation(item: CartItem, observation: string) {
    this.cartService.addObservation(item, observation);
  }

  getSubtotal(item: CartItem): number {
    return this.cartService.getSubtotal(item);
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }

  getItemCount(): number {
    return this.cartService.getItemCount()
  }

  clearCart() {
    return this.cartService.clearCart();
  }

  goToCheckout() {
    this.router.navigate(["checkout"]);
  }

  navigateToStore() {
    this.router.navigate(["store"]);
  }

}
