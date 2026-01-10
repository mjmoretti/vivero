"use client";

import { IProduct } from "@/interfaces/IProducts";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const CARTLOCALSTORAGE = "cart"

interface CartContextProps {
  cartItems: IProduct[];
  addToCart: (product: IProduct) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getIdItems: () => number[];
  getItemCount: () => number;
};

const CartContext = createContext <CartContextProps>({
 cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  getTotal: () => 0,
  getIdItems: () => [],
  getItemCount: () => 0
});

interface CartProviderProps {
children: React.ReactElement;
}

export const CartProvider : React.FC<CartProviderProps> = ({children})=>{

  const {dataUser} = useAuth();

const[cartItems, setCartItems] = useState<IProduct[]>([])

const [isLoaded, setIsLoaded] = useState(false);

// useEffect(()=>{
// if(cartItems.length >0){
//     localStorage.setItem(CARTLOCALSTORAGE,JSON.stringify(cartItems))
// }
//  },[cartItems])



// useEffect(()=>{
// if (typeof window !== "undefined" && window.localStorage) {
//       const cartInfo = localStorage.getItem(CARTLOCALSTORAGE);
//       if (cartInfo) {
//         setCartItems(JSON.parse(cartInfo));
//       }
//     }
// },[])

useEffect(() => {
  const cartInfo = localStorage.getItem(CARTLOCALSTORAGE);
  if (cartInfo) {
    setCartItems(JSON.parse(cartInfo));
  }
  setIsLoaded(true); // Ya cargó
}, []);

useEffect(() => {
  if (isLoaded) {
    localStorage.setItem(CARTLOCALSTORAGE, JSON.stringify(cartItems));
  }
}, [cartItems, isLoaded]);



const addToCart = (product:IProduct)=>{
  if(!dataUser){
alert("Debe estar logueado para comprar")
return
  }
const productoExistente = cartItems.some((item)=> item.id === product.id)

if(productoExistente){
  alert("sólo se puede agregar un solo producto de cada tipo")
  return
}
setCartItems((prevItems)=> [...prevItems, product])
}

const removeFromCart = (productId:number)=> 
  setCartItems((prevItems)=> prevItems.filter((item)=> item.id !== productId))

const clearCart = ()=>{
  setCartItems([])
  if (typeof window !== "undefined" && window.localStorage){
    localStorage.removeItem(CARTLOCALSTORAGE)
  }
}
const getTotal = ()=>{
  return cartItems.reduce((total, item)=>
total + item.price,0)
}

const getIdItems = ()=>{
  return cartItems.map((item)=> item.id)
}

const getItemCount = ()=>{
  return cartItems.length
}

return (
  <CartContext.Provider 
  value={{cartItems,
  addToCart,
  removeFromCart,
  clearCart,
  getTotal,
  getIdItems,
  getItemCount}}
  >
{children}
  </CartContext.Provider>
)
}
export const useCart = ()=> useContext(CartContext)


