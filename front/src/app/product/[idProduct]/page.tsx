import ButtonAddToCart from "@/components/ButtonAddToCart"
import { IProduct } from "@/interfaces/IProducts"
import { getProductByIdService } from "@/services/products.services"
import { notFound } from "next/navigation"

interface ProductsDetailsProps {
    params:{
idProduct : string
    }
}

const ProductsDetailsPage = async ({params}: ProductsDetailsProps)=> {
    const {idProduct} = params 

    let product: IProduct
    try {
        product = await getProductByIdService(idProduct)
    } catch (error) {
        notFound()
    }
    return(
        <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
    <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
      <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
        <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
          <img className="w-full" src= {product.image} alt="" />
          
        </div>

        <div className="mt-6 sm:mt-8 lg:mt-0">
          <h1
            className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white"
          >
          {product.name}
          </h1>
          <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
            <p
              className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white"
            >
              $1,249.99
            </p>

            </div>

          <ButtonAddToCart product={product}/>

          <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

          <p className="mb-6 text-gray-500 dark:text-gray-400">
            Studio quality three mic array for crystal clear calls and voice
            recordings. Six-speaker sound system for a remarkably robust and
            high-quality audio experience. Up to 256GB of ultrafast SSD storage.
          </p>

          <p className="text-gray-500 dark:text-gray-400">
            Two Thunderbolt USB 4 ports and up to two USB 3 ports. Ultrafast
            Wi-Fi 6 and Bluetooth 5.0 wireless. Color matched Magic Mouse with
            Magic Keyboard or Magic Keyboard with Touch ID.
          </p>
        </div>
      </div>
    </div>
  </section>
    )
}
export default ProductsDetailsPage;




