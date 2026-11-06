import PaymentResult from "@/components/PaymentResult";

const PaymentFailurePage = () => {
  return (
    <PaymentResult
      icon="❌"
      title="No pudimos procesar el pago"
      message="Tu carrito sigue como estaba. Podés intentarlo de nuevo."
      primaryHref="/cart"
      primaryLabel="Volver al carrito"
      secondaryHref="/products"
      secondaryLabel="Seguir comprando"
    />
  );
};

export default PaymentFailurePage;