export interface GetProductsResponse {
  products: Product[];
  latestProduct: Product[];
  topRatedProduct: Product[];
  discountProduct: Product[];
}

export interface Product {
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
