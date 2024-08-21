import { Product } from "./product";

export interface StoreData {
  products: Product[];
  search: string;
  currentPage: number;
  page?: number;
  pageable: any;
  totalElements: number;
  pageSize: number;
}