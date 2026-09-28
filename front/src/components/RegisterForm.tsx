"use client";

import { registerUserService } from "@/services/auth.service";
import {
  initialValuesRegister,
  RegisterFormValuesInterface,
  registerValidationSchema,
} from "@/validators/registeSchema";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useState } from "react";

const RegisterForm = () => {
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const formik = useFormik<RegisterFormValuesInterface>({
    initialValues: initialValuesRegister,
    validationSchema: registerValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData();
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("name", values.name);
        formData.append("address", values.address);
        formData.append("phone", values.phone);
        if (imageFile) {
          formData.append("image", imageFile);
        }

        await registerUserService(formData);
        await Swal.fire({
          icon: "success",
          title: "¡Éxito!",
          text: "Usuario registrado exitosamente",
        });
        resetForm();
        setImageFile(null);
        setImagePreview(null);
        router.push("/login");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No pudimos registrarte",
        });
      }
    },
  });

  return (
    <section className="bg-salmonclaro">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 mt-4 mb-4">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl dark:text-white">
              Registrate
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
              
              <div>
                <label className="block mb-2 text-sm font-medium dark:text-white">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                  placeholder="name@company.com"
                />
                {formik.errors.email && <p className="text-red-500">{formik.errors.email}</p>}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium dark:text-white">
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                />
                {formik.errors.password && <p className="text-red-500">{formik.errors.password}</p>}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium dark:text-white">
                  Confirmar contraseña
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                />
                {formik.errors.confirmPassword && <p className="text-red-500">{formik.errors.confirmPassword}</p>}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium dark:text-white">
                  Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                  placeholder="nombre"
                />
                {formik.errors.name && <p className="text-red-500">{formik.errors.name}</p>}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium dark:text-white">
                  Dirección
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                  placeholder="dirección"
                />
                {formik.errors.address && <p className="text-red-500">{formik.errors.address}</p>}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium dark:text-white">
                  Teléfono
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                  placeholder="teléfono"
                />
                {formik.errors.phone && <p className="text-red-500">{formik.errors.phone}</p>}
              </div>

              {/* Campo de imagen */}
              <div>
                <label className="block mb-2 text-sm font-medium dark:text-white">
                  Foto de perfil (opcional)
                </label>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageChange}
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 cursor-pointer"
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Vista previa"
                    className="mt-3 w-20 h-20 rounded-full object-cover mx-auto"
                  />
                )}
              </div>

              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-full text-white bg-green-600 hover:bg-green-700 font-semibold focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg text-sm px-5 py-2.5 text-center transition-colors cursor-pointer"
              >
                {formik.isSubmitting ? "Registrando..." : "Registrate"}
              </button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Ya tienes una cuenta?{" "}
                <a href="/login" className="font-medium text-primary-600 hover:underline">
                  Login aquí
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;