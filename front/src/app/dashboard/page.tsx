"use client"
import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import { updateUserDataService } from '@/services/auth.service'

const DashboardPage = () => {
  const { dataUser, setDataUser , isLoading } = useAuth()
  const router = useRouter()
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formValues, setFormValues] = useState({
    name: "",
    address: "",
    phone: "",
  })

  useEffect(() => {
  if (!isLoading && !dataUser) {
    router.push("/login")
  }
}, [dataUser, isLoading])

if (isLoading || !dataUser) return null
  const inicial = dataUser?.user.name?.charAt(0).toUpperCase()

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append("image", file)

      const response = await fetch("http://localhost:3001/users/image", {
        method: "PATCH",
        headers: {
          Authorization: dataUser.token,
        },
        body: formData,
      })

      if (!response.ok) throw new Error("Error al subir imagen")

      const updatedUser = await response.json()
      setDataUser({
        ...dataUser,
        user: {
          ...dataUser.user,
          image: updatedUser.image,
        },
      })

      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "Imagen actualizada correctamente",
      })
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No pudimos actualizar la imagen",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleStartEditing = () => {
    setFormValues({
      name: dataUser.user.name ?? "",
      address: dataUser.user.address ?? "",
      phone: String(dataUser.user.phone ?? ""),
    })
    setIsEditing(true)
  }

  const handleCancelEditing = () => {
    setIsEditing(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const handleSaveData = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      const updatedUser = await updateUserDataService(dataUser.token, formValues)

      setDataUser({
        ...dataUser,
        user: {
          ...dataUser.user,
          name: updatedUser.name,
          address: updatedUser.address,
          phone: updatedUser.phone,
        },
      })

      setIsEditing(false)
      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "Datos actualizados correctamente",
      })
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No pudimos actualizar tus datos",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section className="min-h-screen bg-slate-900 py-12 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md">

        {/* Avatar e info principal */}
        <div className="flex flex-col items-center mb-6">
          <label className="cursor-pointer relative group">
            {dataUser?.user.image ? (
              <img
                src={dataUser.user.image}
                alt="Foto de perfil"
                className="w-20 h-20 rounded-full object-cover mb-3"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-medium mb-3">
                {inicial}
              </div>
            )}
            <div className="absolute inset-0 rounded-full bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center mb-3">
              <span className="text-white text-xs font-medium">
                {isUploading ? "Subiendo..." : "Cambiar foto"}
              </span>
            </div>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
              className="hidden"
              disabled={isUploading}
            />
          </label>
          <h1 className="text-lg font-medium text-gray-800">{dataUser?.user.name}</h1>
        </div>

        {/* Datos personales */}
        <div className="border-t border-gray-100 pt-5 mb-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-gray-900 uppercase tracking-wide font-medium">Datos personales</p>
            {!isEditing && (
              <button
                onClick={handleStartEditing}
                className="text-xs text-green-700 hover:text-green-800 font-semibold cursor-pointer"
              >
                ✏️ Editar
              </button>
            )}
          </div>

          {isEditing ? (
            <form onSubmit={handleSaveData} className="space-y-3">
              <div>
                <label className="block text-sm text-gray-900 mb-1">Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={formValues.name}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-900 mb-1">Teléfono</label>
                <input
                  type="text"
                  name="phone"
                  value={formValues.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-900 mb-1">Dirección</label>
                <input
                  type="text"
                  name="address"
                  value={formValues.address}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 py-2 rounded-md text-sm bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors cursor-pointer disabled:opacity-60"
                >
                  {isSaving ? "Guardando..." : "Guardar cambios"}
                </button>
                <button
                  type="button"
                  onClick={handleCancelEditing}
                  disabled={isSaving}
                  className="flex-1 py-2 rounded-md text-sm border border-gray-300 text-gray-800 hover:bg-gray-100 font-semibold transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-900">📧 Email</span>
                <span className="text-gray-800">{dataUser?.user.email}</span>
              </div>
              <div className="flex justify-between text-sm border-t border-gray-100 pt-3">
                <span className="text-gray-900">📞 Teléfono</span>
                <span className="text-gray-800">{dataUser?.user.phone}</span>
              </div>
              <div className="flex justify-between text-sm border-t border-gray-100 pt-3">
                <span className="text-gray-900">📍 Dirección</span>
                <span className="text-gray-800">{dataUser?.user.address}</span>
              </div>
            </div>
          )}
        </div>

        {/* Cuenta */}
        <div className="border-t border-gray-100 pt-5 mb-6">
          <p className="text-xs text-gray-900 uppercase tracking-wide font-medium mb-3">Cuenta</p>
          <div className="flex justify-between text-sm">
            <span className="text-gray-900">🪪 ID</span>
            <span className="text-gray-800">#{dataUser?.user.id}</span>
          </div>
        </div>

        {/* Botón órdenes */}
        <button
          onClick={() => router.push("/ordenes")}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-md text-sm text-white font-semibold bg-green-600 hover:bg-green-700 transition-colors cursor-pointer"
        >
          Ver mis órdenes →
        </button>

        {/* Botón admin - solo visible para administradores */}
        {dataUser?.user.role === "admin" && (
          <button
            onClick={() => router.push("/admin")}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-md text-sm text-white font-semibold bg-verdeclaro hover:bg-verdeoscuro transition-colors cursor-pointer mt-3"
          >
            Panel de administración →
          </button>
        )}
      </div>
    </section>
  )
}

export default DashboardPage