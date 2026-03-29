"use client"

import { useAuth } from "@/app/contexts/AuthContext"
import { Order } from "@/interfaces/orders.interface"
import { getAllOrders } from "@/services/orders.services"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"


function Orderslist (){
    const{dataUser}= useAuth()

    if(!dataUser){
      redirect("/login")
    }

    const[orders, setOrders]= useState<Order[]>([])
    const[isLoading, setIsLoading]= useState<boolean>(false)
    const[error, setError]= useState<string | null>(null)

    useEffect (()=> {
        const fetchOrders = async ()=>{
            if (!dataUser?.token){
                setOrders([])
                    return
                }
                setIsLoading(true)
                setError(null)

                try {
                    const orderResponse = await getAllOrders(dataUser?.token)
                    setOrders(orderResponse)
                } catch (error) {
                    console.error("Error al traer la información")
                    setOrders([])
                }finally{
                    setIsLoading(false)
                }
        }
        fetchOrders()
    },[dataUser?.token])

  return (
<section className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Mis ordenes</h1>

        {error && (
          <div className="bg-red-600/20 text-red-300 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
            <p>Cargando órdenes...</p>
          </div>
        ) : orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map(order => (
              <div
                key={order.id}
                className="grid grid-cols-1 md:grid-cols-4 gap-6 border-b border-slate-700 pb-6"
              >
                {/* Order ID */}
                <div>
                  <p className="text-sm text-slate-400">Orden ID:</p>
                  <p className="font-medium">#{order.id}</p>
                </div>

                {/* Date */}
                <div>
                  <p className="text-sm text-slate-400">Fecha:</p>
                  <p className="font-medium">
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>

                {/* Product */}
                <div>
                  <p className="text-sm text-slate-400">Producto:</p>
                  <p className="font-medium">
                    {order.products.length} productos
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-400">Beneficio:</p>
                  <p className="font-medium">
                    {order.products.length >=2?(
                      <p>envío gratis</p>
                    ): <p>envío regular</p>
                  }
                  </p>
                </div>

                {/* Status */}
                 <div> 
                  <p className="text-sm text-slate-400 mb-1">Estado:</p>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold`}>
                    {order.status || "Procesada"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-slate-400">No tienes órdenes todavía</p>
          </div>
        )}
      </div>
    </section>
)
}

export default Orderslist