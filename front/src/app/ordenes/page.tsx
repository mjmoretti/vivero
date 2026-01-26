"use client"

import Orderslist from "@/components/Orderslist"
import { useAuth } from "../contexts/AuthContext"

const OrderPage = ()=>{
    const {dataUser}= useAuth(

    )
    return (
        <Orderslist/>
    )
}
export default OrderPage