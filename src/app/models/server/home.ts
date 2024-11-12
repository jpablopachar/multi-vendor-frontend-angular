export interface GetProductsResponse {
  products: ProductInfo[];
  latestProduct: ProductInfo[][];
  topRatedProduct: ProductInfo[][];
  discountProduct: ProductInfo[][];
}

export interface ProductInfo {
  _id: string;
  sellerId: string;
  name: string;
  slug: string;
  category: string;
  brand: string;
  price: number;
  stock: number;
  discount: number;
  description: string;
  shopName: string;
  images: string[];
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface GetCategoriesResponse {
  categories: Category[];
}

export interface Category {
  _id: string;
  name: string;
  image: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductPriceRangeLatestResponse {
  latestProduct: ProductInfo[][];
  priceRange: PriceRange;
}

export interface PriceRange {
  low: number | null;
  high: number | null;
}

export interface QueryProductsResponse {
  products: ProductInfo[];
  totalProducts: number;
  parPage: number;
}

export interface QueryProductsRequest {
  category: string;
  rating: string | number;
  low: number;
  high: number;
  sortPrice: string;
  pageNumber: number;
  searchValue?: string;
}
