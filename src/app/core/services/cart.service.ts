import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CartItem } from '../models/cart-item';
import { StoredCart } from '../models/stored-cart';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  storageService = inject(StorageService);
  STORED_CART = environment.STORED_CART;
  private cart = new BehaviorSubject<StoredCart>({ cartItems: [] });

  constructor() {
    const storedCart: StoredCart = this.storageService.get(this.STORED_CART);
    this.cart.next(storedCart ? storedCart : { cartItems: [] });
  }

  cartItems() {
    return this.cart.getValue()?.cartItems;
  }

  cartSubtotal() {
    return this.cartItems().reduce((count, cartItem) => count += (cartItem.product.price * cartItem.quantity), 0);    
  }

  cartTotal() {
    return this.cartSubtotal();
  }

  cartCount() {
    return this.cartItems().reduce((count, cartItem) => count += cartItem.quantity, 0);
  }

  addItemToCart(item: CartItem): void {
    const itemFound = this.cartItems().find((cartItem) => cartItem.product.id === item.product.id);
    if (itemFound) {
      itemFound.quantity += item.quantity;
      this.cart.next({ cartItems: this.cartItems().map((cartItem) => cartItem.product.id === itemFound.product.id ? itemFound : cartItem) });
    } else {
      this.cartItems().push(item);
      this.cart.next({ cartItems: this.cartItems() });
    }
    this.saveCart();
  }


  decreaseItemQuantity(item: CartItem) {
    const itemFound = this.cartItems().find((cartItem) => cartItem.product.id === item.product.id);
    if (itemFound) {
      if (itemFound.quantity > 1) {
        itemFound.quantity--;
        this.cart.next({ cartItems: this.cartItems().map((cartItem) => cartItem.product.id === itemFound.product.id ? itemFound : cartItem) });
        this.saveCart();
      }
    }
  }


  increaseItemQuantity(item: CartItem) {
    const itemFound = this.cartItems().find((cartItem) => cartItem.product.id === item.product.id);
    if (itemFound) {
      itemFound.quantity++;
      this.cart.next({ cartItems: this.cartItems().map((cartItem) => cartItem.product.id === itemFound.product.id ? itemFound : cartItem) });
    }
    this.saveCart();
  }


  addNoteToItem(item: CartItem, note: string) {
    const itemFound = this.cartItems().find((cartItem) => cartItem.product.id === item.product.id);
    if (itemFound) {
      itemFound.note = note;
      this.cart.next({ cartItems: this.cartItems().map((cartItem) => cartItem.product.id === itemFound.product.id ? itemFound : cartItem) });
    }
    this.saveCart();
  }

  removeItem(item: CartItem): void {
    this.cart.next({ cartItems: this.cartItems().filter((cartItem) => cartItem.product.id !== item.product.id) });
    this.saveCart();
  }

  clearCart() {
    this.cart.next({ cartItems: [] });
    this.saveCart();
  }

  saveCart() {
    this.storageService.save(this.STORED_CART, this.cart.getValue());
  }

}
