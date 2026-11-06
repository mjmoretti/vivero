import PaymentResult from "@/components/PaymentResult";

const PaymentPendingPage = () => {
  return (
    <PaymentResult
      icon="⏳"
      title="Tu pago está pendiente"
      message="Estamos esperando la confirmación del pago. Podés revisar el estado en tus órdenes."
      primaryHref="/ordenes"
      primaryLabel="Ver mis órdenes"
      secondaryHref="/products"
      secondaryLabel="Seguir comprando"
    />
  );
};

export default PaymentPendingPage;