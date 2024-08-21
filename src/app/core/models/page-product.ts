import { Product } from "./product";

export interface PageProduct {
  content: Product[],
  pageable: any;
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