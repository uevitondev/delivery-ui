import { CartItem } from "./cartitem";

export interface Cart {
  storeId: string,
  userAddressId: string,
  paymentMethod: string;
  cartItems: CartItem[]
}