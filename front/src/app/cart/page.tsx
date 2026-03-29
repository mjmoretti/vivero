"use client"

import { createOrder } from "@/services/orders.services";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/Cartcontext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


const CartPage = ()=>{
    const {cartItems,clearCart,getIdItems,getItemCount,removeFromCart, getTotal} = useCart()

    const {dataUser}= useAuth()

    const router = useRouter()
    
    useEffect (()=>{
      if(!dataUser){
        router.push("/login")
      }
    },[dataUser])
    if(!dataUser) return null
    
const handleCheckout = async ()=>{
  if (!dataUser?.token){
    alert("Debes iniciar sesión para comprar")
    return
  }
  
  try {
    await createOrder(getIdItems(), dataUser?.token)
    
    clearCart()
  } catch (error) {
    console.log("Error en la compra:", error)
  }
}

    return(  
    <div className="min-h-screen w-full bg-slate-900 flex flex-col items-center pt-10">
      <div className="container mx-auto px-4 max-w-6xl flex flex-col items-center justify-center">
        
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg mt-15">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h18M3 3l1.5 9h15L21 3M5 21h14a2 2 0 002-2V9H3v10a2 2 0 002 2z"
            />
          </svg>
          <h2 className="text-xl text-gray-600">Tu carrito está vacío</h2>
          <p className="text-gray-500 mt-2">
            Agrega productos para comenzar tu compra
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-4xl w-full mx-auto">
          {/* Encabezado de la tabla */}
          <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-100 font-semibold text-gray-700 border-b">
            <div className="col-span-6">Productos</div>
            <div className="col-span-2 text-center">Precio</div>
            <div className="col-span-2 text-center">Acciones</div>
          </div>

          {/* Productos del carrito */}
          <div className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 transition-colors duration-150"
              >
                <div className="col-span-6 flex items-center space-x-4">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4h16v16H4z"
                      />
                    </svg>
                  )}
                  <div>
                    <h3 className="font-medium text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500 line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="md:col-span-2 text-center font-semibold text-gray-600">
                  ${item.price.toFixed(2)}
                </div>

                <div className="md:col-span-2 text-center">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                    title="Eliminar producto"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-9 4h14"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen y checkout */}
          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
              <h2 className="text-lg font-semibold text-gray-800">
                Total del Carrito:
              </h2>
              <p className="text-2xl font-bold text- text-gray-600">
               $ {getTotal()}
                </p>
                
              </div>
              <div className="flex space-x-3">
                <button onClick = {clearCart} className="bg-gray-500 hover: bg-gray-600 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 ">
                  Vaciar Carrito
                </button>
              <button onClick={handleCheckout}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 font-medium transition-colors duration-200 cursor-pointer">
                {!dataUser
                ? "Iniciar sesión para comprar": "Finalizar compra"
                }
                
              </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

    )
}
export default CartPage;