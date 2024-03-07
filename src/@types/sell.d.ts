import { IProduct } from "./product";

export interface ISell {
    id?: string,
    buyerName: string,
    buyerNumber: string,
    paymentValue: number,
    sellDate: Date,
    typeOfPayment: string,
    totalPrice: number,
    products: IProduct[]
}

export type SellContextType ={
    sells: ISell[];
    saveSell: (sell: ISell) => void;
    editSell: (sell: ISell) => void;
    removeSell: (code: string) => void;
}