"use client";

import { registerUserService } from "@/services/auth.service";
import { initialValuesRegister, RegisterFormValuesInterface, registerValidationSchema } from "@/validators/registeSchema"
import { useFormik } from "formik";
import { useRouter } from "next/navigation";

const RegisterForm = ()=>{
    const router = useRouter()

const formik = useFormik<RegisterFormValuesInterface>({
    initialValues: initialValuesRegister,
    validationSchema: registerValidationSchema,
    onSubmit: async (values, {resetForm})=>{
        const response = await registerUserService(values)
        alert("Usuario registrado exitosamente")
        console.log("formulario enviado exitosamente", response)
        resetForm()
        router.push('/login')
    }
})

    return(
<section className="bg-salmonclaro ">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0 ">
      
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 mt-4 mb-4">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Registrate
              </h1>
              <form action="" className="space-y-4 md:space-y-6 " onSubmit={formik.handleSubmit} >
                  <div>
                      <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo Electrónico</label>
                      <input type="email" name="email" id="email" value={formik.values.email} onChange= {formik.handleChange}className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com"/>
                      {formik.errors.email ? <p>{formik.errors.email}</p> : null}
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                      <input type="password" name="password" id="password" value={formik.values.password} onChange= {formik.handleChange} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                      {formik.errors.password ? <p>{formik.errors.password}</p> : null}
                  </div>
                  <div>
                      <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirmar contraseña</label>
                      <input type="password" name="confirmPassword" id="confirmPassword" value={formik.values.confirmPassword} onChange= {formik.handleChange} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                      {formik.errors.confirmPassword ? <p>{formik.errors.confirmPassword}</p> : null}
                  </div>
                  <div>
                      <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                      <input type="text" name="name" id="name" value={formik.values.name} onChange= {formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="nombre"/>
                      {formik.errors.name ? <p>{formik.errors.name}</p> : null}
                  </div>
                  <div>
                      <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dirección</label>
                      <input type="text" name="address" id="address" value={formik.values.address} onChange= {formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="dirección"/>
                      {formik.errors.address ? <p>{formik.errors.address}</p> : null}
                  </div>
                  <div>
                      <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Teléfono</label>
                      <input type="text" name="phone" id="phone" value={formik.values.phone} onChange= {formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="teléfono"/>
                      {formik.errors.phone ? <p>{formik.errors.phone}</p> : null}
                  </div>
                  
                  <button type="submit" disabled={formik.isSubmitting} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    {formik.isSubmitting ? "Registrando...": "Registrate"}
                    </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Ya tienes una cuenta? <a href="http://localhost:3000/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login aquí</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
    )
}
export default RegisterForm