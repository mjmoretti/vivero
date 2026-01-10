
import { IProduct } from "@/interfaces/IProducts"

interface CardProps {
product: IProduct
}


const ProductCard=({product}: CardProps) => {
    return (
        <div>
            <div>
                <img src={product.image} className="w-40 h-40"/>
            </div>
            <div>
                <h3 className="text-xl text-black">{product.name}</h3>
                <p className="text-xl text-black">{product.description}</p>
                <p className="text-xl text-black">{product.price}</p>
            </div>
        </div>
    )

}
export default ProductCard