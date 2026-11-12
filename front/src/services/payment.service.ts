export interface PaymentItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export const createPaymentService = async (
  items: PaymentItem[],
  orderId: number,
  token: string
): Promise<string> => {
  const res = await fetch("https://vivero-back-6wsh.onrender.com/payments/create-preference", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ items, orderId }),
  });

  if (!res.ok) throw new Error("No se pudo iniciar el pago");

  const data = await res.json();
  return data.url;
};