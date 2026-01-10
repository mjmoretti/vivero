'use client'

import Link from "next/link";
import { NavItems } from "@/utils/Navitems";
import { useAuth } from "@/app/contexts/AuthContext";

const Navbar = ()=>{
    const {dataUser} = useAuth()
    return(
        <div className="flex items-center justify between h-[60px] w-screen bg-salmonclaro" >
            <section className="flex-1 ml-6 text-verdeclaro">LOGO</section>
            <section className="flex-1">
                <nav className="flex h-full justify-around ">
          
            {
                NavItems.map((navigationItem)=>{
                    return(
                     <Link  className=" text-verdeclaro font-sans" key={navigationItem.id} href={navigationItem.route}>
                        {navigationItem.nameToRender}
                    </Link>
                    )
                })}
                {dataUser && <p className=" text-verdeclaro font-sans">{dataUser.user.name}</p>}
                </nav>
            </section>
        </div>
    )
}
export default Navbar;