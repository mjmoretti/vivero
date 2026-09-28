import { IProduct } from "./IProducts";

export interface IOrderDetail {
  id: number;
  quantity: number;
  product: IProduct;
}

export interface Order {
  id: number;
  date: string;
  status: string;
  orderDetails: IOrderDetail[];
}