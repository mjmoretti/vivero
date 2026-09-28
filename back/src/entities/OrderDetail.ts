import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { Order } from "./Order";
import { Product } from "./Product";

@Entity({ name: "order_details" })
export class OrderDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Order, (order) => order.orderDetails)
  @JoinColumn({ name: "orderId" })
  order: Order;

@ManyToOne(
  () => Product,
  (product) => product.orderDetails
)
@JoinColumn({ name: "productId" })
product: Product;
}