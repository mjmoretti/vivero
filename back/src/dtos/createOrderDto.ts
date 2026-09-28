export interface CreateOrderDto {
  userId: number;
  products: {
    productId: number;
    quantity: number;
  }[];
}