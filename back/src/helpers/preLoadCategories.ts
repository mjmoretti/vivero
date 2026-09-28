import { AppDataSource } from "../config/dataSource";
import { Category } from "../entities/Category";
import { CategoryRepository } from "../repositories/category.respository";

export const preLoadCategories = async () => {
  const categories = await CategoryRepository.find();
  if (categories.length) {
    console.log('Categories preloaded');
    return;
  }

  // Categorías padre
  const plantas = await CategoryRepository.save({ name: 'Plantas' });
  const maceteria = await CategoryRepository.save({ name: 'Macetería' });
  const agroquimicos = await CategoryRepository.save({ name: 'Agroquímicos' });
  const cactaceas = await CategoryRepository.save({ name: 'Cactáceas' });
  const huerta = await CategoryRepository.save({ name: 'Huerta' });
  const jardin = await CategoryRepository.save({ name: 'Jardín' });

  // Subcategorías de Plantas
  await CategoryRepository.save({ name: 'Interior', parent: plantas });
  await CategoryRepository.save({ name: 'Exterior', parent: plantas });
  await CategoryRepository.save({ name: 'Nativas', parent: plantas });

  // Subcategorías de Macetería
  await CategoryRepository.save({ name: 'Cerámica', parent: maceteria });
  await CategoryRepository.save({ name: 'Barro', parent: maceteria });
  await CategoryRepository.save({ name: 'Plástico', parent: maceteria });
  await CategoryRepository.save({ name: 'Fibrocemento', parent: maceteria });

  //Subcategorías de Agroquímicos
  await CategoryRepository.save({ name: 'Fertilizantes', parent: agroquimicos });
  await CategoryRepository.save({ name: 'Plaguicidas', parent: agroquimicos });

  //Subcategorías de Cactáceas
  await CategoryRepository.save({ name: 'Cactus', parent: cactaceas });
  await CategoryRepository.save({ name: 'Suculentas', parent: cactaceas });

  console.log('Categories preloaded');
};