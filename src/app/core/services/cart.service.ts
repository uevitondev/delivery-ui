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
  private storedCart: CartItem[] = this.storageService.get(this.STORED_CART);
  cart = new BehaviorSubject<CartItem[]>(this.storedCart ? this.storedCart : [])

  cartItems() { return this.cart.getValue(); }
  cartSubtotal() { return this.cartItems().reduce((count, item) => count += (item.product.price * item.quantity), 0); }
  cartTotal() { return this.cartSubtotal(); }
  //cartCount() { return this.cartItems().reduce((count, item) => count += item.quantity, 0); }

  addItemToCart(item: CartItem): void {
    const indexFound = this.cartItems().findIndex((cartItem) => cartItem.product.id === item.product.id);
    if (indexFound >= 0) {
      this.updateItemQuantity(item);
    } else {
      this.cartItems().push(item);
      this.cart.next(this.cartItems());
    }
    this.saveCart();
  }

  updateItemQuantity(item: CartItem): void {
    const indexFound = this.cartItems().findIndex((cartItem) => cartItem.product.id === item.product.id);
    if (indexFound >= 0) {
      const itemFound: CartItem = this.cartItems()[indexFound];
      itemFound.quantity += item.quantity;
      this.cart.next(this.cartItems().map((cartItem) => cartItem.product.id === itemFound.product.id ? itemFound : cartItem));
      this.saveCart();
    }
  }

  decreaseItemQuantity(item: CartItem) {
    const indexFound = this.cartItems().findIndex((cartItem) => cartItem.product.id === item.product.id);
    if (indexFound >= 0) {
      const itemFound: CartItem = this.cartItems()[indexFound];
      if (itemFound.quantity > 1) {
        itemFound.quantity--;
        this.cart.next(this.cartItems().map((cartItem) => cartItem.product.id === itemFound.product.id ? itemFound : cartItem));
        this.saveCart();
      }
    }
  }


  increaseItemQuantity(item: CartItem) {
    const indexFound = this.cartItems().findIndex((cartItem) => cartItem.product.id === item.product.id);
    if (indexFound >= 0) {
      const itemFound: CartItem = this.cartItems()[indexFound];
      itemFound.quantity++;
      this.cart.next(this.cartItems().map((cartItem) => cartItem.product.id === itemFound.product.id ? itemFound : cartItem));
    }
    this.saveCart();
  }


  addNoteToItem(item: CartItem, note: string) {
    const indexFound = this.cartItems().findIndex((cartItem) => cartItem.product.id === item.product.id);
    if (indexFound >= 0) {
      const itemFound: CartItem = this.cartItems()[indexFound];
      itemFound.note = note;
      this.cart.next(this.cartItems().map((cartItem) => cartItem.product.id === itemFound.product.id ? itemFound : cartItem));
    }
    this.saveCart();
  }

  removeItem(item: CartItem): void {
    this.cart.next(this.cartItems().filter((cartItem) => cartItem.product.id !== item.product.id));
    this.saveCart();
  }

  clearCart() {
    const emptyCart: CartItem[] = [];
    this.cart.next(emptyCart);
    this.saveCart();
  }

  saveCart() {
    this.storageService.save(this.STORED_CART, this.cartItems);
  }

}
