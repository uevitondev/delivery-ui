import { CartItem } from "./cart-item"
import { StoreResponse } from "./store-response"

export interface ShoppingCartStored {
  store: StoreResponse,
  cartItems: CartItem[]
}