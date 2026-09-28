import { CreateOrderDto } from "../dtos/createOrderDto";
import { Order } from "../entities/Order";
import { OrderRepository } from "../repositories/order.repository";
import { ProductRepository } from "../repositories/product.repository";
import { UserRepository } from "../repositories/user.repository";
import { OrderDetailRepository } from "../repositories/orderDetail.repository";

export const createOrderService = async (
  createOrderDto: CreateOrderDto,
): Promise<Order> => {
  const userF = await UserRepository.findOneBy({
    id: createOrderDto.userId,
  });

  if (!userF) {
    throw new Error("User not found");
  }

  const newOrder = OrderRepository.create();

  newOrder.status = "approved";
  newOrder.date = new Date();
  newOrder.user = userF;

  await OrderRepository.save(newOrder);

  for (const item of createOrderDto.products) {
    console.log("ITEM RECIBIDO:", item);
    const product = await ProductRepository.findOneBy({
      id: item.productId,
    });

    if (!product) {
      throw new Error("Product not found");
    }

    const orderDetail = OrderDetailRepository.create();

    orderDetail.order = newOrder;
    orderDetail.product = product;
    orderDetail.quantity = item.quantity;

    await OrderDetailRepository.save(orderDetail);
  }

  return newOrder;
};
