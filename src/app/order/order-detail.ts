import { Address } from '../address/address';

export interface OrderDetail {
  id: number;
  number: number;
  createdAt: string;
  updatedAt: string;
  status: string;
  paymentMethod: string;
  total: number;
  customer: any;
  store: any;
  deliveryAddress: Address;
  orderItems: any;
}
