/* eslint-disable @typescript-eslint/no-explicit-any */

import { ProductInfo } from './home'

export interface GetCardProductsResponse {
  cardProducts: CardProduct[];
  price: number;
  cardProductCount: number;
  shippingFee: number;
  outOfStockProducts: any[];
  buyProductItem: number;
}

export interface GetWhishlistProductsResponse {
  wishListCount: number;
  wishList: any[];
}

export interface CardProduct {
  sellerId: string;
  shopName: string;
  price: number;
  products: Product[];
}

export interface Product {
  id: string;
  quantity: number;
  productInfo: ProductInfo;
}
