'use client'

import Link from "next/link";
import { NavItems } from "@/utils/Navitems";
import { useAuth } from "@/app/contexts/AuthContext";
import Image from "next/image";
import { PATHROUTES } from "@/utils/PathRoutes";

const Navbar = () => {
  const { dataUser, logout } = useAuth()

  return (
    <div className="flex items-center justify-between h-[100px] w-full bg-[#fbf7ec]">
      
      <section className="flex-1 ml-6 text-verdeclaro">
        <Image
          src="/logo.png"
          alt="Logo"
          width={300}
          height={90}
          className="object-contain"
        />
      </section>

      <section className="flex-1">
        <nav className="flex h-full justify-around items-center">

          {/* Rutas públicas */}
          {NavItems.map((navigationItem)=>(
            <Link
              className="text-verdeclaro font-sans text-lg"
              key={navigationItem.id}
              href={navigationItem.route}
            >
              {navigationItem.nameToRender}
            </Link>
          ))}

          {/* Renderizado condicional de Auth */}
          {dataUser ? (
            <>
              <Link
                href={PATHROUTES.DASHBOARD}
                className="text-verdeclaro font-sans text-lg"
              >
                Mi cuenta
              </Link>

              <button
                onClick={logout}
                className="text-verdeclaro font-sans text-lg"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href={PATHROUTES.LOGIN}
              className="text-verdeclaro font-sans text-lg"
            >
              Sign In / Sign Up
            </Link>
          )}

        </nav>
      </section>
    </div>
  )
}

export default Navbar;




