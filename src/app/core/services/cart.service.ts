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

  cart = new BehaviorSubject<CartItem[]>([])

  constructor() {
    const storedCart = this.storageService.get(this.STORED_CART);
    this.cart.next(storedCart ? storedCart : []);
  }

  cartItems() {
    return this.cart.getValue();
  }

  cartSubtotal() {
    const cartItems = this.cartItems();
    return cartItems.reduce((count, item) => count += (item.product.price * item.quantity), 0);
  }

  cartTotal() {
    return this.cartSubtotal();
  }

  cartCount() {    
    return 0;
  }

  addItemToCart(item: CartItem): void {
    const cartItems = this.cartItems();
    const indexFound = cartItems.findIndex((cartItem) => cartItem.product.id === item.product.id);
    if (indexFound >= 0) {
      this.updateItemQuantity(item);
    } else {
      cartItems.push(item);
      this.cart.next(cartItems);
    }
    this.saveCart();
  }

  updateItemQuantity(item: CartItem): void {
    const cartItems = this.cartItems();
    const indexFound = cartItems.findIndex((cartItem) => cartItem.product.id === item.product.id);
    if (indexFound >= 0) {
      const itemFound = cartItems[indexFound];
      itemFound.quantity += item.quantity;
      this.cart.next(cartItems.map((cartItem) => cartItem.product.id === itemFound.product.id ? itemFound : cartItem));
      this.saveCart();
    }
  }

  decreaseItemQuantity(item: CartItem) {
    const cartItems = this.cartItems();
    const indexFound = cartItems.findIndex((cartItem) => cartItem.product.id === item.product.id);
    if (indexFound >= 0) {
      const itemFound = cartItems[indexFound];
      if (itemFound.quantity > 1) {
        itemFound.quantity--;
        this.cart.next(cartItems.map((cartItem) => cartItem.product.id === itemFound.product.id ? itemFound : cartItem));
        this.saveCart();
      }
    }
  }


  increaseItemQuantity(item: CartItem) {
    const cartItems = this.cartItems();
    const indexFound = cartItems.findIndex((cartItem) => cartItem.product.id === item.product.id);
    if (indexFound >= 0) {
      const itemFound = cartItems[indexFound];
      itemFound.quantity++;
      this.cart.next(cartItems.map((cartItem) => cartItem.product.id === itemFound.product.id ? itemFound : cartItem));
    }
    this.saveCart();
  }


  addNoteToItem(item: CartItem, note: string) {
    const cartItems = this.cartItems();
    const indexFound = cartItems.findIndex((cartItem) => cartItem.product.id === item.product.id);
    if (indexFound >= 0) {
      const itemFound = cartItems[indexFound];
      itemFound.note = note;
      this.cart.next(cartItems.map((cartItem) => cartItem.product.id === itemFound.product.id ? itemFound : cartItem));
    }
    this.saveCart();
  }

  removeItem(item: CartItem): void {
    const cartItems = this.cartItems();
    this.cart.next(cartItems.filter((cartItem) => cartItem.product.id !== item.product.id));
    this.saveCart();
  }

  clearCart() {
    const emptyCart: CartItem[] = [];
    this.cart.next(emptyCart);
    this.saveCart();
  }

  saveCart() {
    const cartItems = this.cartItems();
    this.storageService.save(this.STORED_CART, cartItems);
  }

}
