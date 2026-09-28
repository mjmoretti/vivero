import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
   OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OrderDetail } from "./OrderDetail";
import { Category } from "./Category";

@Entity({ name: "products" })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  @Column()
  image: string;

  @Column()
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: "categoryId" })
  category: Category;

  @OneToMany(
  () => OrderDetail,
  (orderDetail) => orderDetail.product
)
orderDetails: OrderDetail[];
}
