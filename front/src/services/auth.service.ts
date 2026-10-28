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
export const updateUserDataService = async (
  token: string,
  data: { name: string; address: string; phone: string }
) => {
  const response = await fetch("http://localhost:3001/users/data", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("No se pudieron actualizar los datos");
  }
  return response.json();
};