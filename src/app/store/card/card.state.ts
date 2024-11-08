/* eslint-disable @typescript-eslint/no-explicit-any */
import { CardProduct, OutOfStockProduct } from "@app/models"

export interface CardState {
  cardProducts: CardProduct[];
  cardProductCount: number;
  wishlistCount: number;
  wishlist: any[];
  price: number;
  errorMessage: string;
  successMessage: string;
  shippingFee: number;
  outOfStockProducts: OutOfStockProduct[];
  buyProductItem: number;
}