import { ICategory } from "@/interfaces/ICategory";

export const getCategories = async (): Promise<ICategory[]> => {
  try {
    const res = await fetch("http://localhost:3001/categories");
    const categories = await res.json();
    return categories;
  } catch (error) {
    throw new Error(error as string);
  }
}