import { IsNull } from "typeorm";
import { CategoryRepository } from "../repositories/category.respository";

export const getCategoriesService = async () => {
  return await CategoryRepository.find({
    where: { parent: IsNull() },
    relations: ["subcategories"],
  });
};