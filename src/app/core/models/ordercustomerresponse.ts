import { AddressDto } from "./address";

export interface OrderCustomerResponseDto {
  id: number,
  createdAt: string,
  updatedAt: string,
  status: string,
  paymentMethod: string,
  total: number,
  customerData: any,
  storeData: any, 
  deliveryAddress: AddressDto,
  orderItems: any
}