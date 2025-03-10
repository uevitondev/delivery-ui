import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { StorageService } from '../../core/services/storage.service';
import { CartItem } from './cart-item';
import { StoredCart } from './stored-cart';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  toastService = inject(ToastrService);
  storageService = inject(StorageService);
  storedStore = environment.STORED_STORE;
  storedCart = environment.STORED_CART;
  private cart = new BehaviorSubject<StoredCart>({ cartStoreId: '', cartItems: [] });

  constructor() {
    const storedStore = this.storageService.get(this.storedStore);
    const storedCart: StoredCart = this.storageService.get(this.storedCart);
    this.cart.next(storedCart ? storedCart : { cartStoreId: storedStore ? storedStore.id : '', cartItems: [] });

  }

  cartStoreId() {
    return this.cart.getValue().cartStoreId;
  }

  cartItems() {
    return this.cart.getValue().cartItems;
  }

  cartSubtotal() {
    return this.cartItems().reduce(
      (count, cartItem) =>
        (count += cartItem.product.price * cartItem.quantity),
      0,
    );
  }

  cartTotal() {
    return this.cartSubtotal();
  }

  cartCount() {
    return this.cartItems().reduce(
      (count, cartItem) => (count += cartItem.quantity),
      0,
    );
  }

  checkCartStoreByItem(item: CartItem): boolean {
    if (this.cartStoreId() == '') {
      this.cart.next({ cartStoreId: item.product.storeId, cartItems: this.cartItems() });
      return true
    }
    let isValid: boolean = false;
    this.cartItems().forEach(i => {
      if (i.product.storeId === item.product.storeId) {
        isValid = true
      }
    })
    return isValid;
  }

  addItemToCart(item: CartItem): void {
    if (this.checkCartStoreByItem(item)) {
      const itemFound = this.cartItems().find(
        (cartItem) => cartItem.product.id === item.product.id,
      );
      if (itemFound) {
        itemFound.quantity += item.quantity;
        this.cart.next({
          cartStoreId: this.cartStoreId(),
          cartItems: this.cartItems().map((cartItem) =>
            cartItem.product.id === itemFound.product.id ? itemFound : cartItem,
          ),
        });
      } else {
        this.cartItems().push(item);
        this.cart.next({ cartStoreId: this.cartStoreId(), cartItems: this.cartItems() });
      }
      this.saveCart();
    } else {
      this.toastService.warning("NÃO ADICIONADO, CATÁLOGO DO CARRINHO DE LOJA DIFERENTE");
    }


  }

  decreaseItemQuantity(item: CartItem) {
    const itemFound = this.cartItems().find(
      (cartItem) => cartItem.product.id === item.product.id,
    );
    if (itemFound && itemFound.quantity > 1) {
      itemFound.quantity--;
      this.cart.next({
        cartStoreId: this.cartStoreId(),
        cartItems: this.cartItems().map((cartItem) =>
          cartItem.product.id === itemFound.product.id ? itemFound : cartItem,
        ),
      });
      this.saveCart();
    }
  }

  increaseItemQuantity(item: CartItem) {
    const itemFound = this.cartItems().find(
      (cartItem) => cartItem.product.id === item.product.id,
    );
    if (itemFound) {
      itemFound.quantity++;
      this.cart.next({
        cartStoreId: this.cartStoreId(),
        cartItems: this.cartItems().map((cartItem) =>
          cartItem.product.id === itemFound.product.id ? itemFound : cartItem,
        ),
      });
    }
    this.saveCart();
  }

  addNoteToItem(item: CartItem, note: string) {
    const itemFound = this.cartItems().find(
      (cartItem) => cartItem.product.id === item.product.id,
    );
    if (itemFound) {
      itemFound.note = note;
      this.cart.next({
        cartStoreId: this.cartStoreId(),
        cartItems: this.cartItems().map((cartItem) =>
          cartItem.product.id === itemFound.product.id ? itemFound : cartItem,
        ),
      });
    }
    this.saveCart();
  }

  removeItem(item: CartItem): void {
    this.cart.next({
      cartStoreId: this.cartStoreId(),
      cartItems: this.cartItems().filter(
        (cartItem) => cartItem.product.id !== item.product.id,
      ),
    });
    this.saveCart();
  }

  clearCart() {
    this.cart.next({ cartStoreId: '', cartItems: [] });
    this.saveCart();
  }

  saveCart() {
    this.storageService.save(this.storedCart, this.cart.getValue());
  }
}


