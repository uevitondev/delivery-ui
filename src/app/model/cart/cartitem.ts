import { ProductDto } from "../product/product-dto";

export interface CartItem {
  product: ProductDto,
  observation: string,
  quantity: number
}