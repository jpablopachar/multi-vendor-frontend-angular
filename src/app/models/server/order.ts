import { CardProduct } from "./card"
import { ProductInfo } from "./home"

export interface PlaceOrderRequest {
  price: number;
  products: CardProduct[];
  shippingFee: number;
  items: number;
  shippingInfo: ShippingInfo;
  userId: string;
}

export interface PlaceOrderResponse {
  message: string;
  orderId: string;
}

export interface ShippingInfo {
  name: string;
  address: string;
  phone: string;
  post: string;
  province: string;
  city: string;
  area: string;
}

export interface GetOrdersResponse {
  orders: Order[];
}

export interface GetOrderDetailsResponse {
  order: Order;
}

export interface Order {
  _id: string;
  customerId: string;
  products: ProductInfo[];
  price: number;
  paymentStatus: string;
  shippingInfo: ShippingInfo;
  deliveryStatus: string;
  date: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderQuery {
  customerId: string;
  status: string;
}