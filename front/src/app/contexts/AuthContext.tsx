"use client";

import { userSessionInterface } from "@/interfaces/user";
import { createContext, useContext, useEffect, useState } from "react";

//esta interfaz determina los valores y métodos que tiene  la fc context
interface AuthContextProps {
  dataUser: userSessionInterface | null;  //userSessionInterface es una interfaz que da la estructura de la información de sesión. Son los posibles valores que puede tener.
  setDataUser: (dataUser: userSessionInterface | null) => void;
  logout: () => void;
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
    if (dataUser) {
      localStorage.setItem("userSession", JSON.stringify(dataUser));
    }
  }, [dataUser]);
//el contexto se carga siempre que se carga la aplicación. Si se refresca la página, lo que hay en el context se cae.Siempre que se cargue el contexto se haga la carga de la información que tengo en el localStorage y a la ponga a disposición en el useSate.
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userInfo = localStorage.getItem("userSession"); //en userInfo almaceno lo que tengo en el localStorage
      if (userInfo) {
        setDataUser(JSON.parse(userInfo));
      }
    }
  }, []);

  const logout = () => {
    setDataUser(null);
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.removeItem("userSession");
    }
  };

  return (
    <AuthContext.Provider
      value={{ dataUser, setDataUser, logout }}
    >
        {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
