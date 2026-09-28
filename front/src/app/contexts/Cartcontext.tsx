"use client";

import { IProduct, ICartItem } from "@/interfaces/IProducts";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import Swal from "sweetalert2";

const getCartKey = (userId?: string | number) =>
  userId ? `cart_${userId}` : null;

interface CartContextProps {
  cartItems: ICartItem[];
  addToCart: (product: IProduct) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getOrderItems: () => {
    productId: number;
    quantity: number;
  }[];
  getItemCount: () => number;
}

const CartContext = createContext<CartContextProps>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  getTotal: () => 0,
  getOrderItems: () => [],
  getItemCount: () => 0,
});

interface CartProviderProps {
  children: React.ReactElement;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const { dataUser } = useAuth();
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Carga el carrito del usuario cuando cambia la sesión
  useEffect(() => {
    const cartKey = getCartKey(dataUser?.user.id);

    if (!cartKey) {
      setCartItems([]);
      setIsLoaded(false);
      return;
    }

    const cartInfo = localStorage.getItem(cartKey);
    setCartItems(cartInfo ? JSON.parse(cartInfo) : []);
    setIsLoaded(true);
  }, [dataUser?.user.id]);

  // Guarda el carrito del usuario actual cuando cambia
  useEffect(() => {
    const cartKey = getCartKey(dataUser?.user.id);
    if (isLoaded && cartKey) {
      localStorage.setItem(cartKey, JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded, dataUser?.user.id]);

  const addToCart = (product: IProduct) => {
    if (!dataUser) {
      Swal.fire({
        icon: "warning",
        title: "¡Atención!",
        text: "Debes iniciar sesión para comprar",
      });
      return;
    }
    const existingProduct = cartItems.find((item) => item.id === product.id);

    if (existingProduct) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCartItems((prev) => [
        ...prev,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  const removeFromCart = (productId: number) =>
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId),
    );

  const clearCart = () => {
    setCartItems([]);
    const cartKey = getCartKey(dataUser?.user.id);
    if (cartKey && typeof window !== "undefined") {
      localStorage.removeItem(cartKey);
    }
  };

  const getTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const getOrderItems = () =>
    cartItems.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }));

  const getItemCount = () => cartItems.length;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getTotal,
        getOrderItems,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
