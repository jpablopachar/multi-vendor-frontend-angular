/* eslint-disable @typescript-eslint/no-explicit-any */

import { ProductInfo } from './home'

export interface GetCardProductsResponse {
  cardProducts: CardProduct[];
  price: number;
  cardProductCount: number;
  shippingFee: number;
  outOfStockProducts: OutOfStockProduct[];
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
  _id: string;
  quantity: number;
  productInfo: ProductInfo;
}

export interface AddProductToCardRequest {
  userId: string;
  quantity: number;
  productId: string;
}

export interface AddProductToCardResponse {
  message: string;
  product: ProductInCard;
}

export interface ProductInCard {
  userId: string;
  productId: string;
  quantity: number;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AddProductToWishlistRequest {
  userId: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  discount: number;
  rating: number;
  slug: string;
}

export interface OutOfStockProduct {
  _id:       string;
  userId:    string;
  productId: string;
  quantity:  number;
  createdAt: Date;
  updatedAt: Date;
  products:  ProductInfo[];
}

export interface ShippingParams {
  products: CardProduct[];
  price: number;
  shippingFee: number;
  items: number;
}