"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import { loguinUserService } from "@/services/auth.service";
import {
  initialValuesLogin,
  loginValidationSchema,
  LoginFormValuesInterface,
} from "@/validators/loginSchema";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const LoginForm = () => {
  const { setDataUser } = useAuth();

  const router = useRouter();

  const formik = useFormik<LoginFormValuesInterface>({
    initialValues: initialValuesLogin,
    validationSchema: loginValidationSchema,
    onSubmit: async (values, { resetForm }) => {
  try {
    const response = await loguinUserService(values);
    setDataUser(response);
    resetForm();
    await Swal.fire({
      icon: "success",
      title: "¡Éxito!",
      text: "Usuario logueado exitosamente",
    });
    router.push("/products");
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No pudimos loguearte",
    });
  }
},
  });

  return (
    <section className="bg-salmonclaro ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Logueate
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={formik.handleSubmit}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                />
                {formik.errors.email ? <p>{formik.errors.email}</p> : null}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {formik.errors.password ? (
                  <p>{formik.errors.password}</p>
                ) : null}
              </div>

              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-full text-white bg-green-600 hover:bg-green-700 font-semibold focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg text-sm px-5 py-2.5 text-center transition-colors cursor-pointer"
              >
                {formik.isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                No tenés cuenta todavía?{" "}
                <a
                  href="http://localhost:3000/register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Registrate
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default LoginForm;
