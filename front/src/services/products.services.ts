import { IProduct } from "@/interfaces/IProducts"

export const getAllProductsService = async (search?: string, categoryId?: number) => {
  try {
    let url = 'http://localhost:3001/products'
    
    if (search) url += `?search=${search}`
    else if (categoryId) url += `?categoryId=${categoryId}`
    
    const response = await fetch(url, { method: "GET" })
    const products: IProduct[] = await response.json()
    return products
  } catch (error: any) {
    throw new Error(error)
  }
}

export const getProductByIdService = async (id: string) => {
  try {
    const allProducts = await getAllProductsService()
    const product = allProducts.find((product) => product.id === Number(id))
    if (!product) {
      throw new Error("No se encontró producto con ese ID")
    }
    return product
  } catch (error: any) {
    throw new Error(error)
  }
}


