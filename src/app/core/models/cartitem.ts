import { ProductDto } from "./product-dto";

export interface CartItem {
  product: ProductDto,
  observation: string,
  quantity: number
}