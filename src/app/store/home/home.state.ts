/* eslint-disable @typescript-eslint/no-explicit-any */

import { Category, ProductInfo } from "@app/models"

export interface HomeState {
  categories: Category[];
  products: ProductInfo[];
  totalProduct: number;
  parPage: number;
  latestProduct: ProductInfo[][];
  topRatedProduct: ProductInfo[][];
  discountProduct: ProductInfo[][];
  priceRange: { low: number, high: number };
  product: ProductInfo | null;
  relatedProducts: ProductInfo[];
  moreProducts: ProductInfo[];
  errorMessage: string;
  successMessage: string;
  totalReview: number;
  ratingReview: any[];
  reviews: any[];
  banners: any[];
}