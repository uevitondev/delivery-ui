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
  cartItems = new BehaviorSubject<CartItem[]>([]);

  constructor() {
    const cartItems = this.storageService.get(this.STORED_CART);
    cartItems ? (() => {
      this.cartItems.next(cartItems);
    })() : (() => {
      return;
    })();
  }

  updateCart(cartItems: CartItem[]) {
    localStorage.setItem(this.STORED_CART, JSON.stringify(cartItems));
    this.cartItems.next(cartItems);
  }

  addToCart(item: CartItem) {
    const cartItems = this.cartItems.getValue();
    const existingItem = this.existingInCart(item);
    

    if (existingItem) {
      this.increaseCartItemQuantity(item);
    } else {
      cartItems.push({
        product: item.product,
        quantity: item.quantity,
        note: item.note
      });
    }
    this.updateCart(cartItems);
  }

  addNoteToCartItem(item: CartItem, note: string) {
    const cartItems = this.cartItems.getValue();
    let cartItem = cartItems.find(cartItem => cartItem.product.id === item.product.id);
    if(cartItem){
      cartItem.note = note;
      this.updateCart(cartItems);
    }   

  }

  existingInCart(item: CartItem) {
    const cartItems = this.cartItems.getValue();
    return cartItems.find(cartItem => cartItem.product.id === item.product.id) ? true : false;
  }

  getCartItem(item: CartItem) {
    const cartItems = this.cartItems.getValue();
    return cartItems.find(cartItem => cartItem.product.id === item.product.id);
  }


  increaseCartItemQuantity(item: CartItem) {
    item.quantity++;
    this.updateCart(this.cartItems.getValue());
  }

  decreaseCartItemQuantity(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateCart(this.cartItems.getValue());
    }
  }

  removeCartItem(item: CartItem) {
    let cartItems = this.cartItems.getValue();
    cartItems = cartItems.filter(cartItem => cartItem !== item);
    this.updateCart(cartItems);
  }

  getTotal(): number {
    return this.cartItems.getValue().reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  getCount(): number {
    return this.cartItems.getValue().length;
  }

  getCartItemSubtotal(item: CartItem): number {
    return item.product.price * item.quantity;
  }

  clearCart() {
    let emptyCart: CartItem[] = [];
    this.updateCart(emptyCart);
  }

}
