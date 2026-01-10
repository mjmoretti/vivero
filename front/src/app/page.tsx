import  ProductCard  from "@/components/ProductCard";
import { IProduct } from "@/interfaces/IProducts";
import { getAllProductsService } from "@/services/products.services";


const Landing = async ()=> {
  const allProducts = await getAllProductsService()
  return (
    <div >
      <div className="flex flex-row gap-4 bg-salmonclaro" >
        { allProducts && allProducts.map((product:IProduct)=> {
return <ProductCard product={product} key={product.name}
    
  
/>
        })}
      </div>
    </div>
  );
}
export default Landing