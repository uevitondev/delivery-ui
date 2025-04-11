export interface OrderResponse {
  id: string;
  number: number;
  createdAt: string;
  updatedAt: string;
  status: string;
  paymentMethod: string;
  total: number;
}
