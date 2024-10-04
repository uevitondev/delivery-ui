import { CartItem } from "./cart-item"

export interface ShoppingCartRequest {
  addressId: string,
  storeId: string,
  paymentMethod: string,
  cartItems: CartItem[]
}