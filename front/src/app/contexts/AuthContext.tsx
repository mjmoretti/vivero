"use client";

import { userSessionInterface } from "@/interfaces/user";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextProps {
  dataUser: userSessionInterface | null; //información del usuario
  setDataUser: (dataUser: userSessionInterface | null) => void; //es como cambiamos la información del usuario
  logout: () => void; //tumba la persistencia de la sesión y de la infromación alamcenada
}

const AuthContext = createContext<AuthContextProps>({
  dataUser: null, //inicializo los valores iniciales
  setDataUser: () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: React.ReactElement;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [dataUser, setDataUser] = useState<userSessionInterface | null>(null);

  useEffect(() => {
    //este useEffect almacena la información del usuario
    if (dataUser) {
      localStorage.setItem("userSession", JSON.stringify(dataUser));
    }
  }, [dataUser]);

  useEffect(() => {
    // este useEffect extrae la info del localSotarge y la almacena en el estado. Porque si refresco la página la información del usuario se pierde.
    if (typeof window !== "undefined" && window.localStorage) {
      const userInfo = localStorage.getItem("userSession");
      if (userInfo) {
        setDataUser(JSON.parse(userInfo));
      }
    }
  }, []);

  const logout = () => {
    // Limpiamos el carrito del usuario actual antes de cerrar sesión
    if (dataUser?.user?.id) {
      localStorage.removeItem(`cart_${dataUser.user.id}`);
    }
    setDataUser(null);
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.removeItem("userSession");
    }
  };

  return (
    <AuthContext.Provider value={{ dataUser, setDataUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
