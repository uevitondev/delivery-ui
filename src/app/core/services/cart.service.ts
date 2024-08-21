import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { CartItem } from '../models/cart-item';
import { Product } from '../models/product';
import { ShoppingCartStored } from '../models/shopping-cart-stored';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private STORED_CART = environment.STORED_CART;
  private STORED_STORE = environment.STORED_STORE;
  private storageService = inject(StorageService);
  cart!: BehaviorSubject<ShoppingCartStored>;

  constructor() {
    const storedCart = this.storageService.get(this.STORED_CART);
    const storedStore = this.storageService.get(this.STORED_STORE);
    storedCart && storedStore ? (() => {
      storedCart.store = storedStore;
      this.cart = new BehaviorSubject<ShoppingCartStored>(storedCart);
      this.cart.next(storedCart);
    })() : (() => {
      this.cart = new BehaviorSubject<ShoppingCartStored>({
        store: {id:'', name:''},
        cartItems: []
      });
      return;
    })();

  }

  getCart() {
    return this.cart.asObservable();
  }

  updateCart(cart: ShoppingCartStored) {
    localStorage.setItem(this.STORED_CART, JSON.stringify(cart));
    this.cart.next(cart);
  }

  addToCart(item: CartItem) {
    const cart = this.cart.getValue();
    const existingItem = cart.cartItems.find(cartItem => item.product.id === cartItem.product.id);

    if (existingItem) {
      existingItem.quantity += item.quantity;
      existingItem.note = item.note; 
    } else {
      cart.cartItems.push({
        product: item.product,
        quantity: item.quantity,
        note: item.note
      });
    }
    this.updateCart(cart);
  }

  addNote(item: CartItem, note: string,) {
    const cart = this.cart.getValue();
    const existingItem = cart.cartItems.find(cartItem => item.product.id === cartItem.product.id);
    if (existingItem) {
      existingItem.note = note;
      this.updateCart(cart);
      return;
    }
    return;
  }

  existingInCart(item: CartItem) {
    const cart = this.cart.getValue();
    return cart.cartItems.find(cartItem => item.product.id === cartItem.product.id) ? true : false;
  }

  getCartItem(item: CartItem) {
    const cart = this.cart.getValue();
    return cart.cartItems.find(cartItem => item.product.id === cartItem.product.id);
  }


  increaseCartItemQuantity(item: CartItem) {
    item.quantity++;
    this.updateCart(this.cart.getValue());
  }

  decreaseCartItemQuantity(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateCart(this.cart.getValue());
    }
  }

  removeCartItem(item: CartItem) {
    const cart = this.cart.getValue();
    cart.cartItems = cart.cartItems.filter(cartItem => cartItem !== item);
    this.updateCart(cart);
  }

  getCartTotal(): number {
    return this.cart.getValue().cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  getCartCount(): number {
    return this.cart.getValue().cartItems?.length;
  }

  getCartItemSubtotal(item: CartItem): number {
    return item.product.price * item.quantity;
  }

  clearCart() {
    this.cart.getValue().cartItems = [];
    this.updateCart(this.cart.getValue());
  }

}
