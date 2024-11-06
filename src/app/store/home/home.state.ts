/* eslint-disable @typescript-eslint/no-explicit-any */

import { Category, Product } from "@app/models"

export interface HomeState {
  categories: Category[];
  products: Product[];
  totalProduct: number;
  parPage: number;
  latestProduct: Product[];
  topRatedProduct: Product[];
  discountProduct: Product[];
  priceRange: { low: number, high: number };
  product: Product | null;
  relatedProducts: Product[];
  moreProducts: Product[];
  errorMessage: string;
  successMessage: string;
  totalReview: number;
  ratingReview: any[];
  reviews: any[];
  banners: any[];
}