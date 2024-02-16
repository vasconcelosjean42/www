export interface IProduct {
    code: string;
    name: string;
    description: string;
    buyValue: number;
    sellValue: number;
    amount: number;
}

export type ProductContextType ={
    products: IProduct[];
    saveProduct: (product: IProduct) => void;
}