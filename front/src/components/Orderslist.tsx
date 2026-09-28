"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import { Order } from "@/interfaces/orders.interface";
import { getAllOrders } from "@/services/orders.services";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

function Orderslist() {
  const { dataUser } = useAuth();

  if (!dataUser) {
    redirect("/login");
  }

  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!dataUser?.token) {
        setOrders([]);
        return;
      }
      setIsLoading(true);
      setError(null);

      try {
        const orderResponse = await getAllOrders(dataUser?.token);
        setOrders(orderResponse);
      } catch (error) {
        console.error("Error al traer la información");
        setOrders([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, [dataUser?.token]);

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Mis órdenes</h1>

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
            {orders.map((order) => {
              const totalUnidades = order.orderDetails.reduce(
                (total, detail) => total + detail.quantity,
                0
              );
              const totalPrecio = order.orderDetails.reduce(
                (total, detail) =>
                  total + detail.product.price * detail.quantity,
                0
              );

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-xl p-6 border border-gray-200 shadow-md"
                >
                  {/* Encabezado de la orden */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 pb-4 border-b border-gray-200">
                    <div>
                      <p className="text-sm text-gray-500">Orden ID</p>
                      <p className="font-semibold text-gray-800">#{order.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Fecha</p>
                      <p className="font-semibold text-gray-800">
                        {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Estado</p>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.status === "approved" ? "Aprobada" : order.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Beneficio</p>
                      <p className="font-semibold text-blue-600">
                        {totalUnidades >= 2 ? "🚚 Envío gratis" : "Envío regular"}
                      </p>
                    </div>
                  </div>

                  {/* Encabezado de tabla */}
                  <div className="grid grid-cols-12 gap-4 px-3 py-2 text-sm text-gray-500 border-b border-gray-200 mb-2">
                    <div className="col-span-1"></div>
                    <div className="col-span-5">Producto</div>
                    <div className="col-span-2 text-center">Precio</div>
                    <div className="col-span-2 text-center">Cantidad</div>
                    <div className="col-span-2 text-right">Subtotal</div>
                  </div>

                  {/* Detalle de productos */}
                  <div className="space-y-3">
                    {order.orderDetails.map((detail) => (
                      <div
                        key={detail.id}
                        className="grid grid-cols-12 gap-4 items-center bg-gray-50 rounded-lg p-3"
                      >
                        <div className="col-span-1">
                          {detail.product.image && (
                            <img
                              src={detail.product.image}
                              alt={detail.product.name}
                              className="w-10 h-10 object-cover rounded-lg"
                            />
                          )}
                        </div>
                        <div className="col-span-5">
                          <p className="font-medium text-gray-800">
                            {detail.product.name}
                          </p>
                        </div>
                        <div className="col-span-2 text-center text-gray-600">
                          ${detail.product.price.toLocaleString()}
                        </div>
                        <div className="col-span-2 text-center text-gray-600">
                          {detail.quantity}
                        </div>
                        <div className="col-span-2 text-right font-semibold text-green-600">
                          ${(detail.product.price * detail.quantity).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total de la orden */}
                  <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                    <p className="text-gray-500">
                      {totalUnidades} unidad{totalUnidades !== 1 ? "es" : ""} en total
                    </p>
                    <p className="text-lg font-bold text-green-600">
                      Total: ${totalPrecio.toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-slate-400">No tienes órdenes todavía</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Orderslist;