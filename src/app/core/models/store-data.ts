import { ProductDto } from "./product-dto";

export interface StoreData {
  products: ProductDto[];
  search: string;
  currentPage: number;
  page?: number;
  pageable: any;
  totalElements: number;
  pageSize: number;
}