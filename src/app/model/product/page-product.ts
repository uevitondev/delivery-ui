import { ProductDto } from "./product-dto";

export interface PageProduct {
  content: ProductDto[],
  peageable: any;
  last: boolean,
  totalElements: number,
  totalPages: number,
  size: number,
  number: number,
  sort: any,
  first: boolean,
  numberOfElements: number,
  empty: boolean
}