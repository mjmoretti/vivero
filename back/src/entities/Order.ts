import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OrderDetail } from "./OrderDetail";
import { User } from "./User";


// status: pending, approved, rejected

@Entity({ name: "orders" })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column()
  date: Date;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: "userId" })
  user: User;

 @OneToMany(
  () => OrderDetail,
  (orderDetail) => orderDetail.order
)
orderDetails: OrderDetail[];
}
