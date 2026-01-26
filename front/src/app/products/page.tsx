import  ProductCard  from "@/components/ProductCard";
import { IProduct } from "@/interfaces/IProducts";
import { getAllProductsService } from "@/services/products.services";


const Products = async ()=> {
  const allProducts = await getAllProductsService()
  return (
    <section className=" bg-salmonclaro py-8 pt-15">
    <div className="mx-auto max-w-7x1 px-7" >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" >
        { allProducts && allProducts.map((product:IProduct)=> {
return <ProductCard product={product} key={product.name}
    />
        })}
      </div>
    </div>
</section>
  );
}
export default Products




