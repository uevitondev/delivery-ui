import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from './cart-item';
import { StoredCart } from './stored-cart';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../services/storage.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly toastService = inject(ToastrService);
  private readonly storageService = inject(StorageService);
  private readonly storedStore = environment.STORED_STORE;
  private readonly storedCart = environment.STORED_CART;
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


  addItemToCart(item: CartItem): void {
    if (!this.belongsToSameStoreAsCart(item, this.cart.getValue())) {
      this.toastService.warning("NÃO ADICIONADO, CATÁLOGO DO CARRINHO DE LOJA DIFERENTE");
    } else {
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
    }
  }

  belongsToSameStoreAsCart(item: CartItem, cart: StoredCart): boolean {
    if (cart.cartItems.length === 0) {
      this.clearCart();
      return true;
    }
    const cartStoreId = cart.cartItems[0].product.storeId;
    return item.product.storeId === cartStoreId;
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
    if (this.cartItems().length < 1) {
      this.clearCart();
    }
    this.saveCart();
  }

  clearCart() {
    this.cart.next({ cartStoreId: '', cartItems: [] });
    this.storageService.remove(this.storedCart);
    this.saveCart();
  }

  saveCart() {
    this.storageService.save(this.storedCart, this.cart.getValue());
  }
}


