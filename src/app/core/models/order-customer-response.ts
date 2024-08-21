import { Address } from "./address";

export interface OrderCustomerResponse {
  id: number,
  createdAt: string,
  updatedAt: string,
  status: string,
  paymentMethod: string,
  total: number,
  customerData: any,
  storeData: any, 
  deliveryAddress: Address,
  orderItems: any
}