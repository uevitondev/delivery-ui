import { ProductDto } from "../product/product-dto";
import { CartItem } from "./cartitem";

export interface CartUser {
  cartItems: CartItem[]
}