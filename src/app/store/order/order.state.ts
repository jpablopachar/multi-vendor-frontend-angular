import { Order } from "@app/models"

export interface OrderState {
  orders: Order[];
  errorMessage: string;
  successMessage: string;
  order: Order | null;
}