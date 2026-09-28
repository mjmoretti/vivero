import ProductCard from "@/components/ProductCard";
import Container from "@/components/Container";
import { IProduct } from "@/interfaces/IProducts";
import { getAllProductsService } from "@/services/products.services";

interface ProductsProps {
  searchParams: Promise<{ search?: string, categoryId?: string }>
}

const Products = async ({ searchParams }: ProductsProps) => {
  const { search, categoryId } = await searchParams
  const allProducts = await getAllProductsService(search, categoryId ? Number(categoryId) : undefined)

  return (
    <section className="bg-salmonclaro py-8 pt-15">
      <Container>
        {search && (
          <p className="text-verdeclaro mb-4 text-sm">
            Resultados para: <strong>{search}</strong>
          </p>
        )}
        {categoryId && !search && (
          <p className="text-verdeclaro mb-4 text-sm">
            Filtrando por categoría
          </p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allProducts && allProducts.map((product: IProduct) => (
            <ProductCard product={product} key={product.name} />
          ))}
        </div>
      </Container>
    </section>
  )
}

export default Products





