import { ICategory } from "@/interfaces/ICategory";

export const getCategories = async (): Promise<ICategory[]> => {
  try {
    const res = await fetch("https://vivero-back-6wsh.onrender.com/categories");
    const categories = await res.json();
    return categories;
  } catch (error) {
    throw new Error(error as string);
  }
}