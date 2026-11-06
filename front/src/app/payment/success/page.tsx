"use client";

import { useEffect } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import { useCart } from "@/app/contexts/Cartcontext";
import PaymentResult from "@/components/PaymentResult";

const PaymentSuccessPage = () => {
  const { dataUser, isLoading } = useAuth();
  const { clearCart } = useCart();

  // Cuando el pago salió bien, se vacía el carrito
  useEffect(() => {
    if (isLoading || !dataUser) return;
    clearCart();
  }, [isLoading, dataUser]);

  return (
    <PaymentResult
      icon="✅"
      title="¡Pago aprobado!"
      message="Gracias por tu compra. Ya registramos tu orden."
      primaryHref="/ordenes"
      primaryLabel="Ver mis órdenes"
      secondaryHref="/products"
      secondaryLabel="Seguir comprando"
    />
  );
};

export default PaymentSuccessPage;