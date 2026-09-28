"use client"
import React, { useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/navigation'

const DashboardPage = () => {
  const { dataUser } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!dataUser) {
      router.push("/login")
    }
  }, [dataUser])

  if (!dataUser) return null

  const inicial = dataUser?.user.name?.charAt(0).toUpperCase()

  return (
    <section className="min-h-screen bg-slate-900 py-12 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md">

        {/* Avatar e info principal */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-medium mb-3">
            {inicial}
          </div>
          <h1 className="text-lg font-medium text-gray-800">{dataUser?.user.name}</h1>
          {/* <span className="mt-1 text-xs bg-green-100 text-green-700 px-3 py-1 rounded-md">
            {dataUser?.user.role}
          </span> */}
        </div>

        {/* Datos personales */}
        <div className="border-t border-gray-100 pt-5 mb-5">
          <p className="text-xs text-gray-900 uppercase tracking-wide font-medium mb-3">Datos personales</p>
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
      </div>
    </section>
  )
}

export default DashboardPage