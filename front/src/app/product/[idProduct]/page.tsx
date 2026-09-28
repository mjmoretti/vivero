import ButtonAddToCart from "@/components/ButtonAddToCart"
import Container from "@/components/Container"
import { IProduct } from "@/interfaces/IProducts"
import { getProductByIdService } from "@/services/products.services"
import { notFound } from "next/navigation"

interface ProductsDetailsProps {
  params: Promise<{
    idProduct: string
  }>
}

const ProductsDetailsPage = async ({ params }: ProductsDetailsProps) => {
  const { idProduct } = await params

  let product: IProduct
  try {
    product = await getProductByIdService(idProduct)
  } catch (error) {
    notFound()
  }

  return (
    <section className="py-8 bg-white md:py-16 antialiased">
      <Container>
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
            <img
              className="w-full h-auto rounded-lg"
              src={product.image}
              alt={product.name}
            />
          </div>

          <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-5xl">
              {product.name}
            </h1>
            <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
              <p className="text-2xl font-extrabold text-gray-900 sm:text-4xl">
                $ {product.price}
              </p>
            </div>

            <ButtonAddToCart product={product} />

            <hr className="my-6 md:my-8 border-gray-200" />

            <p className="mb-6 text-gray-500">
              {product.description}
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default ProductsDetailsPage;




