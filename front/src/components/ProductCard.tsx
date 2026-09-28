
import { IProduct } from "@/interfaces/IProducts"
import Link from "next/link"


interface CardProps {
product: IProduct
}


const ProductCard=({product}: CardProps) => {
    return (
        <Link href={`/product/${product.id}`} className="group">
        <article className=" bg-salmonclaro rounded-xl overflow-hidden cursor-pointer ">
            <div className="relative w-full h-64 flex items-center justify-center overflow-hidden">
    <img
        src={product.image}
        className="w-full h-auto block rounded-2xl mb-14"
    />

    <div
        className="
            absolute inset-0
            bg-white/60
            opacity-0
            group-hover:opacity-100
            transition duration-300
            flex items-center justify-center
        "
    >
        <span className="text-5xl text-verdeoscuro font-light">
            +
        </span>
    </div>
</div>
            {/* <div className="w-full h-64 flex items-center justify-center">
                <img src={product.image} 
                // alt={product.name}
                className="w-full h-auto block rounded-2xl mb-14"/>
            </div> */}
            <div className="text-center p-4">
                <h3 className="text xl font-semibold mb-0.2 text-verdeoscuro">{product.name}</h3>
             
                <p className="text xl font-bold text-verdeclaro leading-tight">{product.price}</p>
            </div>
        </article>
        </Link>
    )

}
export default ProductCard