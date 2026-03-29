"use client"
import React, { useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/navigation'

const DashboardPage = () => {
    const { dataUser} = useAuth()

const router = useRouter()

useEffect (()=>{
  if(!dataUser){
    router.push("/login")
  }
},[dataUser])
if(!dataUser) return null

  return (
 <section className="min-h-screen bg-slate-900 py-12">
      <div className="w-fit mx-auto bg-white rounded-xl shadow-md p-8 mt-15">

        <h1 className="text-3xl font-semibold text-verdeclaro mb-6">
          Mi Cuenta
        </h1>

        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <p><strong>Nombre:</strong> {dataUser?.user.name}</p>
          <p><strong>Email:</strong> {dataUser?.user.email}</p>
          <p><strong>Dirección:</strong> {dataUser?.user.address}</p>
          <p><strong>Teléfono:</strong> {dataUser?.user.phone}</p>
          <p><strong>Rol:</strong> {dataUser?.user.role}</p>
          <p><strong>ID:</strong> {dataUser?.user.id}</p>
        </div>

      </div>
    </section>

  )
}

export default DashboardPage


