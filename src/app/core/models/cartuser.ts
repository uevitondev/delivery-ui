import { ProductDto } from "../../shared/domain/product/product-dto";
import { CartItem } from "./cartitem";

export interface CartUser {
  cartItems: CartItem[]
}