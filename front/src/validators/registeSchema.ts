import * as Yup from "yup"

export interface RegisterFormValuesInterface {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    address: string;
    phone: string;
}

export const initialValuesRegister: RegisterFormValuesInterface = {
    email:"",
    password: "",
    confirmPassword: "",
    name: "",
    address: "",
    phone: ""
}

export const registerValidationSchema = Yup.object({
    email: Yup.string().email("Correo electrónico inválido").required("Campo obligatorio"),
    password: Yup.string().min(6, "La contraseña debe tener al menos 6 caracteres").required("Campo obligatorio"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Las dos contraseñas deben coincidir").required("Campo obligatorio"),
    name: Yup.string().trim().matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "Solo letras").min(2).max(50).required("Campo obligatorio"),
    address: Yup.string().required("Campo obligatorio"),
    phone: Yup.string().trim().matches(/^[0-9+\-\s()]+$/, "El teléfono debe tener caracteres válidos").min(8, "Muy corto")
   .max(15, "Muy largo").required("Campo obligatorio")

})