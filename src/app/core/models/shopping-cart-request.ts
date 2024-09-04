import { Address } from "./address"
import { CartItem } from "./cart-item"
import { StoreResponse } from "./store-response"

export interface ShoppingCartRequest {
  address: Address,
  store: StoreResponse,
  paymentMethod: string,
  cartItems: CartItem[]
}