import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Cart } from '../model/cart/cart';
import { CartItem } from '../model/cart/cartitem';
import { ProductDto } from '../model/product/product-dto';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private ENV = environment;
  private storageService = inject(StorageService);
  private cartSubject: BehaviorSubject<Cart>;
  
  constructor() {
    const storedCart = this.storageService.get(this.ENV.STORED_CART);
    const storedStore = this.storageService.get(this.ENV.STORED_STORE);
    this.cartSubject = new BehaviorSubject<Cart>(storedCart ? storedCart : {
      storeId: storedStore ? storedStore.id : '',
      userAddressId: '',
      paymentMethod: '',
      cartItems: []
    });
  }

  getCart() {
    return this.cartSubject.asObservable();
  }

  updateCart(cart: Cart) {
    localStorage.setItem(this.ENV.STORED_CART, JSON.stringify(cart));
    this.cartSubject.next(cart);
  }

  addToCart(product: ProductDto, quantity: number, observation: string = '') {
    const cart = this.cartSubject.getValue();
    const existingItem = cart.cartItems.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.cartItems.push({
        product,
        quantity,
        observation
      });
    }

    this.updateCart(cart);
  }

  incrementItemQuantity(item: CartItem) {
    item.quantity++;
    this.updateCart(this.cartSubject.getValue());
  }

  decrementItemQuantity(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateCart(this.cartSubject.getValue());
    }
  }

  removeItem(item: CartItem) {
    const cart = this.cartSubject.getValue();
    cart.cartItems = cart.cartItems.filter(cartItem => cartItem !== item);
    this.updateCart(cart);
  }

  addObservation(item: CartItem, observation: string) {
    item.observation = observation;
    this.updateCart(this.cartSubject.getValue());
  }

  getTotal(): number {
    return this.cartSubject.getValue().cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  getItemCount(): number {
    return this.cartSubject.getValue().cartItems.length;
  }

  getSubtotal(item: CartItem): number {
    return item.product.price * item.quantity;
  }

  clearCart() {
    const emptyCart: Cart = {
      storeId: '',
      userAddressId: '',
      paymentMethod: '',
      cartItems: []
    };
    this.updateCart(emptyCart);
  }

}
