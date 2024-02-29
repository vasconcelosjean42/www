export interface IProduct {
    id: string;
    code: string;
    externalCode?: string;
    name: string;
    type?: string;
    description: string;
    buyValue: number;
    sellValue: number;
    amount: number;
}

export type ProductContextType ={
    products: IProduct[];
    saveProduct: (product: IProduct) => void;
    editProduct: (product: IProduct) => void;
    removeProduct: (code: string) => void;
}