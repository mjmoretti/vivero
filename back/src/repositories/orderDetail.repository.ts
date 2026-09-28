import { AppDataSource } from "../config/dataSource";
import { OrderDetail } from "../entities/OrderDetail";

export const OrderDetailRepository =
  AppDataSource.getRepository(OrderDetail);