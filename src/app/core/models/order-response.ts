export interface OrderResponse {
  id: number,
  createdAt: string,
  updatedAt: string,
  status: string,
  paymentMethod: string,
  total: number
}