export interface UserInfo {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  payment: string;
  method: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  shopInfo?: ShopInfo;
  sellerId: string;
}

export interface ShopInfo {
  division: string;
  district: string;
  shopName: string;
  sub_district: string;
}