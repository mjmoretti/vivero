import { IProduct } from "./IProducts";

export interface Order{
    id: number,
    products: IProduct[],
    date: string,
    status: string
} 