import { Address } from "./address"
import { CartItem } from "./cart-item"
import { Store } from "./store"

export interface ShoppingCartRequest {  
  address: Address,
  store: Store,
  paymentMethod: string,
  cartItems: CartItem[]
}