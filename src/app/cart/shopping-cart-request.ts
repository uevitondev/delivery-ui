import { CartItem } from './cart-item';

export interface ShoppingCartRequest {
  addressId: string;
  storeId: string;
  paymentMethodId: string;
  cartItems: CartItem[];
}
