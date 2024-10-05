import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CartItem } from '../models/cart-item';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private STORED_CART = environment.STORED_CART;
  private storageService = inject(StorageService);
  private storedCart = new BehaviorSubject<CartItem[]>([]);

  constructor() {
    const stored: CartItem[] = this.storageService.get(this.STORED_CART);
    stored ? (() => {
      this.storedCart.next(stored);
      this.saveCart();
    })() : (() => {
      this.saveCart();
    })();
  }

  cartItems() {
    return this.storedCart;
  }

  cartCount() {
    return this.storedCart.getValue().reduce((count, item) => count += item.quantity, 0);
  }

  cartSubtotal() {
    return this.storedCart.getValue().reduce((count, item) => count += (item.product.price * item.quantity), 0);
  }

  cartTotal() {
    return this.cartSubtotal();
  }

  addItemToCart(item: CartItem): void {
    const indexFound = this.storedCart.getValue().findIndex((cartItem) => cartItem.product.id === item.product.id);
    if (indexFound >= 0) {
      this.updateItemQuantity(item);
    } else {
      this.storedCart.getValue().push(item);
      this.storedCart.next(this.storedCart.getValue());
    }
    this.saveCart();
  }

  updateItemQuantity(item: CartItem): void {
    const indexFound = this.storedCart.getValue().findIndex((cartItem) => cartItem.product.id === item.product.id);
    if (indexFound >= 0) {
      const itemFound: CartItem = this.storedCart.getValue()[indexFound];
      itemFound.quantity += item.quantity;
      this.storedCart.next(this.storedCart.getValue().map((cartItem) => cartItem.product.id === itemFound.product.id ? itemFound : cartItem));
      this.saveCart();
    }
  }

  decreaseItemQuantity(item: CartItem) {
    const indexFound = this.storedCart.getValue().findIndex((cartItem) => cartItem.product.id === item.product.id);
    if (indexFound >= 0) {
      const itemFound: CartItem = this.storedCart.getValue()[indexFound];
      if (itemFound.quantity > 1) {
        itemFound.quantity--;
        this.storedCart.next(this.storedCart.getValue().map((cartItem) => cartItem.product.id === itemFound.product.id ? itemFound : cartItem));
        this.saveCart();
      }
    }
  }


  increaseItemQuantity(item: CartItem) {
    const indexFound = this.storedCart.getValue().findIndex((cartItem) => cartItem.product.id === item.product.id);
    if (indexFound >= 0) {
      const itemFound: CartItem = this.storedCart.getValue()[indexFound];
      itemFound.quantity++;
      this.storedCart.next(this.storedCart.getValue().map((cartItem) => cartItem.product.id === itemFound.product.id ? itemFound : cartItem));
    }
    this.saveCart();
  }


  addNoteToItem(item: CartItem, note: string) {
    const indexFound = this.storedCart.getValue().findIndex((cartItem) => cartItem.product.id === item.product.id);
    if (indexFound >= 0) {
      const itemFound: CartItem = this.storedCart.getValue()[indexFound];
      itemFound.note = note;
      this.storedCart.next(this.storedCart.getValue().map((cartItem) => cartItem.product.id === itemFound.product.id ? itemFound : cartItem));
    }
    this.saveCart();
  }

  removeItem(item: CartItem): void {
    this.storedCart.next(this.storedCart.getValue().filter((cartItem) => cartItem.product.id !== item.product.id));
    this.saveCart();
  }

  clearCart() {
    const emptyCart: CartItem[] = [];
    this.storedCart.next(emptyCart);
    this.saveCart();
  }

  saveCart() {
    this.storageService.save(this.STORED_CART, this.storedCart.getValue());
  }

}
