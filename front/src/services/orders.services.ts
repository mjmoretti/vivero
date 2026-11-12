export interface OrderItem {
  productId: number;
  quantity: number;
}

export const createOrder = async (
  products: OrderItem[],
  token: string
) => {
  try {
    const res = await fetch("https://vivero-back-6wsh.onrender.com/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ products }),
    });

    const orders = await res.json();
    return orders;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getAllOrders = async (token: string) => {
  try {
    const res = await fetch("https://vivero-back-6wsh.onrender.com/users/orders", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const orders = await res.json();
    return orders;
  } catch (error) {
    throw new Error(error as string);
  }
};