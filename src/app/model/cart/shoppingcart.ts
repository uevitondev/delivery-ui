import { CartItem } from "./cartitem";

export interface ShoppingCartDto {
  pizzeriaId: string,
  userAddressId: string,
  cartItems: CartItem[]
}