import { ILike } from "typeorm";
import { Product } from "../entities/Product";
import { ProductRepository } from "../repositories/product.repository";

export const checkProductExists = async (itemId: number): Promise<boolean> => {
  const item: Product | null = await ProductRepository.findOneBy({ id: itemId });
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

export const createProductService = async (productData: {
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
  image: string;
}): Promise<Product> => {
  const product = ProductRepository.create(productData);
  return await ProductRepository.save(product);
};

export const updateProductService = async (
  id: number,
  productData: Partial<{
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryId: number;
    image: string;
  }>
): Promise<Product> => {
  const product = await ProductRepository.findOneBy({ id });
  if (!product) throw new Error("Product not found");
  Object.assign(product, productData);
  return await ProductRepository.save(product);
};

export const deleteProductService = async (id: number): Promise<void> => {
  const product = await ProductRepository.findOneBy({ id });
  if (!product) throw new Error("Product not found");
  await ProductRepository.remove(product);
};