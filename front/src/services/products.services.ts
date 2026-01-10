import { IProduct } from "@/interfaces/IProducts"

export const getAllProductsService = async ()=>{
try {
    const response = await fetch('http://localhost:3001/products', {
        method: "GET",
    })
    const products: IProduct[] = await response.json()
    return products
} catch (error: any) {
    throw new Error(error)
}
}

export const getProductByIdService = async (id:string)=>{
try {
    const allProducts = await getAllProductsService()
    const product = allProducts.find((product) => product.id === Number(id))
    
    if(!product){
        throw new Error("No se encontró producto con ese ID")
    }
    return product
} catch (error: any) {
  throw new Error(error)  
}
}



