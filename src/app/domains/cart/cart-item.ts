import { Product } from '../../domains/product/product';

export interface CartItem {
  product: Product;
  quantity: number;
  note: string;
}
