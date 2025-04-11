import { CartItem } from './cart-item';

export interface StoredCart {
  cartStoreId: string, 
  cartItems: CartItem[];
}
