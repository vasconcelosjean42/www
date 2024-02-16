import { FC, ReactNode, createContext, useState } from "react";
import { IProduct, ProductContextType } from "../@types/product";

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

const ProductProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<IProduct[]>([
    {
      code: "1",
      name: "Feijão preto 500g",
      description: "",
      buyValue: 5.5 / 2,
      sellValue: 5.5,
      amount: 5,
    },
    {
      code: "2",
      name: "Arroz branco 1kg",
      description: "",
      buyValue: 7 / 2,
      sellValue: 7,
      amount: 5,
    },
    {
      code: "3",
      name: "Açúcar cristal 500g",
      description: "",
      buyValue: 3.5 / 2,
      sellValue: 3.5,
      amount: 5,
    },
    {
      code: "4",
      name: "Óleo de soja 500ml",
      description: "",
      buyValue: 5 / 2,
      sellValue: 5,
      amount: 5,
    },
    {
      code: "5",
      name: "Leite integral 1L",
      description: "",
      buyValue: 4 / 2,
      sellValue: 4,
      amount: 5,
    },
    {
      code: "6",
      name: "Café torrado e moído 250g",
      description: "",
      buyValue: 8 / 2,
      sellValue: 8,
      amount: 5,
    },
    {
      code: "7",
      name: "Macarrão espaguete 500g",
      description: "",
      buyValue: 3 / 2,
      sellValue: 3,
      amount: 5,
    },
    {
      code: "8",
      name: "Farinha de trigo 1kg",
      description: "",
      buyValue: 4.5 / 2,
      sellValue: 4.5,
      amount: 5,
    },
    {
      code: "9",
      name: "Tomate pelado em lata 400g",
      description: "",
      buyValue: 4 / 2,
      sellValue: 4,
      amount: 5,
    },
    {
      code: "10",
      name: "Sal refinado 500g",
      description: "",
      buyValue: 1.5 / 2,
      sellValue: 1.5,
      amount: 5,
    },
  ]);

  const saveProduct = ({code, name, description, buyValue, sellValue, amount}: IProduct) => {
    const newProduct: IProduct = {
      code: code,
      name: name,
      description: description,
      buyValue: buyValue,
      sellValue: sellValue,
      amount: amount,
    };
    setProducts(prevState => [...prevState, newProduct])
  };

  return (
    <ProductContext.Provider value={{products, saveProduct}}>
        {children}
    </ProductContext.Provider>
  )
};

export default ProductProvider;