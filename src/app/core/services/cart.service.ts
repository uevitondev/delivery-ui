import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CartItem } from '../models/cart-item';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  storageService = inject(StorageService);
  STORED_CART = environment.STORED_CART;

  private cart = new BehaviorSubject<CartItem[]>([])

  constructor() {
    const cartItems = this.storageService.get(this.STORED_CART);
    this.cart.next(cartItems ? cartItems : []);
  }

  cartItems() {
    return this.cart.getValue()
  }

  cartSubtotal() {
    const cartItems: CartItem[] = this.cart.getValue();
    return cartItems.reduce((count, item) => count += (item.product.price * item.quantity), 0);
  }

  cartTotal() {
    return this.cartSubtotal();
  }

  cartCount() {
    const cartItems: CartItem[] = this.cart.getValue();
    let count = 0;
    cartItems.forEach((cartItem) => count += cartItem.quantity);
    return count;
  }

  addItemToCart(item: CartItem): void {
    const cartItems = this.cart.getValue();
    const itemFound = cartItems.find((cartItem) => cartItem.product.id === item.product.id);
    if (itemFound) {
      itemFound.quantity += item.quantity;
      this.cart.next(cartItems.map((cartItem) => cartItem.product.id === itemFound.product.id ? itemFound : cartItem));
    } else {
      cartItems.push(item);
      this.cart.next(cartItems);
    }
    this.saveCart();
  }


  decreaseItemQuantity(item: CartItem) {
    const cartItems = this.cart.getValue();
    const itemFound = cartItems.find((cartItem) => cartItem.product.id === item.product.id);
    if (itemFound) {
      if (itemFound.quantity > 1) {
        itemFound.quantity--;
        this.cart.next(cartItems.map((cartItem) => cartItem.product.id === itemFound.product.id ? itemFound : cartItem));
        this.saveCart();
      }
    }
  }


  increaseItemQuantity(item: CartItem) {
    const cartItems = this.cart.getValue();
    const itemFound = cartItems.find((cartItem) => cartItem.product.id === item.product.id);
    if (itemFound) {
      itemFound.quantity++;
      this.cart.next(cartItems.map((cartItem) => cartItem.product.id === itemFound.product.id ? itemFound : cartItem));
    }
    this.saveCart();
  }


  addNoteToItem(item: CartItem, note: string) {
    const cartItems = this.cart.getValue();
    const itemFound = cartItems.find((cartItem) => cartItem.product.id === item.product.id);
    if (itemFound) {
      itemFound.note = note;
      this.cart.next(cartItems.map((cartItem) => cartItem.product.id === itemFound.product.id ? itemFound : cartItem));
    }
    this.saveCart();
  }

  removeItem(item: CartItem): void {
    const cartItems = this.cart.getValue();
    this.cart.next(cartItems.filter((cartItem) => cartItem.product.id !== item.product.id));
    this.saveCart();
  }

  clearCart() {
    const emptyCart: CartItem[] = [];
    this.cart.next(emptyCart);
    this.saveCart();
  }

  saveCart() {
    const cartItems = this.cart.getValue();
    this.storageService.save(this.STORED_CART, cartItems);
  }

}
