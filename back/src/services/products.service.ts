import { ILike } from "typeorm";
import { Product } from "../entities/Product";
import { ProductRepository } from "../repositories/product.repository";

export const checkProductExists = async (itemId: number): Promise<boolean> => {
  const item: Product | null = await ProductRepository.findOneBy({
    id: itemId,
  });
  return !!item;
};

export const getProductsService = async (search?: string, categoryId?: number): Promise<Product[]> => {
  if (search) {
    return await ProductRepository.find({
      where: { name: ILike(`%${search}%`) },
    });
  }
  if (categoryId) {
    return await ProductRepository.find({
      where: { categoryId },
    });
  }
  return await ProductRepository.find();
};