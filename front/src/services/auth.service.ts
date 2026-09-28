import { LoginFormValuesInterface } from "@/validators/loginSchema";

export const registerUserService = async (formData: FormData) => {
  try {
    const response = await fetch("http://localhost:3001/users/register", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Registro fallido");
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export const loguinUserService = async (userData: LoginFormValuesInterface) => {
  try {
    const response = await fetch("http://localhost:3001/users/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Login fallido");
    }
  } catch (error: any) {
    throw new Error(error);
  }
};