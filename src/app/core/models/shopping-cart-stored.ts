import { CartItem } from "./cart-item"
import { Store } from "./store"

export interface ShoppingCartStored {
  store: Store,
  cartItems: CartItem[]
}