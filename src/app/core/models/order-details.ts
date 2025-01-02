import { Address } from "./address";

export interface OrderDetails {
  id: number,
  number: number,
  createdAt: string,
  updatedAt: string,
  status: string,
  paymentMethod: string,
  total: number,
  customer: any,
  store: any, 
  deliveryAddress: Address,
  orderItems: any
}