export interface OrderResponse {
  id: number,
  number: number,
  createdAt: string,
  updatedAt: string,
  status: string,
  paymentMethod: string,
  total: number
}