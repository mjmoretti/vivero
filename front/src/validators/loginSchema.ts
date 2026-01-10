import * as Yup from "yup"


export interface LoginFormValuesInterface {
    email: string;
    password: string
}

export const initialValuesLogin: LoginFormValuesInterface = {
    email: "",
    password:"",
}

export const loginValidationSchema = Yup.object({
    email: Yup.string().email("Correo electrónico inválido").required("Campo obligatorio"),
    password: Yup.string().min(6, "La contraseña debe tener al menos 6 caracteres").required("Campo obligatorio")
})