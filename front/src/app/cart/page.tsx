"use client";

import Container from "@/components/Container";
import { createOrder } from "@/services/orders.services";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/Cartcontext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const CartPage = () => {
  const {
    cartItems,
    clearCart,
    getOrderItems,
    removeFromCart,
    getTotal,
  } = useCart();

  const { dataUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!dataUser) {
      router.push("/login");
    }
  }, [dataUser, router]);

  if (!dataUser) return null;

  const handleCheckout = async () => {
    if (!dataUser.token) {
      alert("Debes iniciar sesión para comprar");
      return;
    }

    console.log("IDs enviados:", getOrderItems());

    try {
      await createOrder(getOrderItems(), dataUser.token);
      clearCart();
    } catch (error) {
      console.log("Error en la compra:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 py-10">
      <Container>
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

            <h2 className="text-xl text-gray-600">
              Tu carrito está vacío
            </h2>

            <p className="text-gray-500 mt-2">
              Agrega productos para comenzar tu compra
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-4xl w-full mx-auto">
            {/* Encabezado */}
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-100 font-semibold text-gray-700 border-b">
              <div className="col-span-4">Producto</div>
              <div className="col-span-2 text-center">Precio</div>
              <div className="col-span-2 text-center">Cantidad</div>
              <div className="col-span-2 text-center">Subtotal</div>
              <div className="col-span-2 text-center">Acciones</div>
            </div>

            {/* Productos */}
            <div className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 transition-colors"
                >
                  <div className="col-span-4 flex items-center gap-4">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded" />
                    )}

                    <div>
                      <h3 className="font-medium text-gray-800">
                        {item.name}
                      </h3>

                      <p className="text-sm text-gray-500 line-clamp-1">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="md:col-span-2 text-center font-semibold text-gray-600">
                    ${item.price.toFixed(2)}
                  </div>

                  <div className="md:col-span-2 text-center font-semibold text-gray-600">
                    {item.quantity}
                  </div>

                  <div className="md:col-span-2 text-center font-semibold text-gray-600">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>

                  <div className="md:col-span-2 text-center">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Total del carrito
                  </h2>

                  <p className="text-2xl font-bold text-gray-700">
                    ${getTotal()}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={clearCart}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                  >
                    Vaciar carrito
                  </button>

                  <button
                    onClick={handleCheckout}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md"
                  >
                    Finalizar compra
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default CartPage;
