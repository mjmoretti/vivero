"use client"
import { useCart } from "@/app/contexts/Cartcontext"
import { IProduct } from "@/interfaces/IProducts"
import React from "react"

interface ButtonAddToCartProps {
    product: IProduct
}

const ButtonAddToCart = ({product}: ButtonAddToCartProps)=>{
    const {addToCart} = useCart()
    return(
        <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
            
            <button onClick={() => addToCart(product)}
  className="
    mt-4
    sm:mt-0
  bg-green-600
 hover:bg-green-700
    text-white
    font-semibold
    px-3
    py-2
    rounded-xl
    shadow-md
    hover:shadow-lg
    transition-all
    duration-300
    cursor-pointer
    flex
    items-center
    justify-center
    gap-2
  "
>
  <svg
    className="w-5 h-5"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
    />
  </svg>


              Añadir al carrito
            </button>
          </div>
    )
}
export default ButtonAddToCart