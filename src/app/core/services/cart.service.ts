import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CartItem } from '../models/cart-item';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private storageService = inject(StorageService);
  private STORED_CART = environment.STORED_CART;

  storedCart: CartItem[] = this.storageService.get(this.STORED_CART);

  private cart = new BehaviorSubject<CartItem[]>(
    this.storedCart ? this.storedCart : []
  );

  cartItems() {
    return this.cart;
  }

  cartSubtotal() {
    return this.cart.getValue().reduce((count, item) => count += (item.product.price * item.quantity), 0);
  }

  cartTotal() {
    return this.cartSubtotal();
  }

  cartCount() {
    return this.cart.getValue().reduce((count, item) => count + item.quantity, 0);
  }


  addItemToCart(item: CartItem): void {
    const indexFound = this.cart.getValue().findIndex((cartItem) => cartItem.product.id === item.product.id);
    if (indexFound >= 0) {
      this.updateItemQuantity(item);
    } else {
      this.cart.getValue().push(item);
      this.cart.next(this.cart.getValue());
    }
    this.saveCart();
  }

  updateItemQuantity(item: CartItem): void {
    const indexFound = this.cart.getValue().findIndex((cartItem) => cartItem.product.id === item.product.id);
    if (indexFound >= 0) {
      const itemFound: CartItem = this.cart.getValue()[indexFound];
      itemFound.quantity += item.quantity;
      this.cart.next(this.cart.getValue().map((cartItem) => cartItem.product.id === itemFound.product.id ? itemFound : cartItem));
      this.saveCart();
    }
  }

  decreaseItemQuantity(item: CartItem) {
    const indexFound = this.cart.getValue().findIndex((cartItem) => cartItem.product.id === item.product.id);
    if (indexFound >= 0) {
      const itemFound: CartItem = this.cart.getValue()[indexFound];
      if (itemFound.quantity > 1) {
        itemFound.quantity--;
        this.cart.next(this.cart.getValue().map((cartItem) => cartItem.product.id === itemFound.product.id ? itemFound : cartItem));
        this.saveCart();
      }
    }
  }


  increaseItemQuantity(item: CartItem) {
    const indexFound = this.cart.getValue().findIndex((cartItem) => cartItem.product.id === item.product.id);
    if (indexFound >= 0) {
      const itemFound: CartItem = this.cart.getValue()[indexFound];
      itemFound.quantity++;
      this.cart.next(this.cart.getValue().map((cartItem) => cartItem.product.id === itemFound.product.id ? itemFound : cartItem));
    }
    this.saveCart();
  }


  addNoteToItem(item: CartItem, note: string) {
    const indexFound = this.cart.getValue().findIndex((cartItem) => cartItem.product.id === item.product.id);
    if (indexFound >= 0) {
      const itemFound: CartItem = this.cart.getValue()[indexFound];
      itemFound.note = note;
      this.cart.next(this.cart.getValue().map((cartItem) => cartItem.product.id === itemFound.product.id ? itemFound : cartItem));
    }
    this.saveCart();
  }

  removeItem(item: CartItem): void {
    this.cart.next(this.cart.getValue().filter((cartItem) => cartItem.product.id !== item.product.id));
    this.saveCart();
  }

  clearCart() {
    const emptyCart: CartItem[] = [];
    this.cart.next(emptyCart);
    this.saveCart();
  }

  saveCart() {
    this.storageService.save(this.STORED_CART, this.cart.getValue());
  }

}
