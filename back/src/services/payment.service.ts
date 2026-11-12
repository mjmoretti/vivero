import { MercadoPagoConfig, Preference } from "mercadopago";
import { MP_ACCESS_TOKEN, FRONT_URL } from "../config/envs";

const client = new MercadoPagoConfig({ accessToken: MP_ACCESS_TOKEN });

// Deja la dirección del front siempre bien armada
const baseUrl = (
  /^https?:\/\//.test(FRONT_URL) ? FRONT_URL : `https://${FRONT_URL}`
).replace(/\/+$/, "");

const isLocal = baseUrl.includes("localhost");

interface PaymentItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export const createPreferenceService = async (
  items: PaymentItem[],
  orderId: number
): Promise<string> => {
  try {
    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: items.map((item) => ({
          id: String(item.id),
          title: item.name,
          quantity: Number(item.quantity),
          unit_price: Number(item.price),
          currency_id: "ARS",
        })),
        external_reference: String(orderId),
        back_urls: {
          success: `${baseUrl}/payment/success`,
          failure: `${baseUrl}/payment/failure`,
          pending: `${baseUrl}/payment/pending`,
        },
        ...(isLocal ? {} : { auto_return: "approved" as const }),
      },
    });

    if (!result.init_point) throw new Error("No se pudo crear el pago");
    return result.init_point;
  } catch (error) {
    console.error("ERROR MERCADO PAGO:", error);
    throw error;
  }
};