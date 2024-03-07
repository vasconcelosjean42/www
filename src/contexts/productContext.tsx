import { FC, ReactNode, createContext, useEffect, useState } from "react";
import { IProduct, ProductContextType } from "../@types/product";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
export const ProductContext = createContext<ProductContextType | undefined>(undefined);

const ProductProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<IProduct[]>([
    {
      id: uuidv4(),
      code: "1",
      name: "Feijão preto 500g",
      description: "",
      buyValue: 5.5 / 2,
      sellValue: 5.5,
      amount: 5,
    },
    {
      id: uuidv4(),
      code: "2",
      name: "Arroz branco 1kg",
      description: "",
      buyValue: 7 / 2,
      sellValue: 7,
      amount: 5,
    },
    {
      id: uuidv4(),
      code: "",
      name: "Açúcar cristal 500g",
      description: "",
      buyValue: 3.5 / 2,
      sellValue: 3.5,
      amount: 5,
    },
    {
      id: uuidv4(),
      code: "4",
      name: "Óleo de soja 500ml",
      description: "",
      buyValue: 5 / 2,
      sellValue: 5,
      amount: 5,
    },
    {
      id: uuidv4(),
      code: "5",
      name: "Leite integral 1L",
      description: "",
      buyValue: 4 / 2,
      sellValue: 4,
      amount: 5,
    },
    {
      id: uuidv4(),
      code: "6",
      name: "Café torrado e moído 250g",
      description: "",
      buyValue: 8 / 2,
      sellValue: 8,
      amount: 5,
    },
    {
      id: uuidv4(),
      code: "7",
      name: "Macarrão espaguete 500g",
      description: "",
      buyValue: 3 / 2,
      sellValue: 3,
      amount: 5,
    },
    {
      id: uuidv4(),
      code: "8",
      name: "Farinha de trigo 1kg",
      description: "",
      buyValue: 4.5 / 2,
      sellValue: 4.5,
      amount: 5,
    },
    {
      id: uuidv4(),
      code: "9",
      name: "Tomate pelado em lata 400g",
      description: "",
      buyValue: 4 / 2,
      sellValue: 4,
      amount: 5,
    },
    {
      id: uuidv4(),
      code: "10",
      name: "Sal refinado 500g",
      description: "",
      buyValue: 1.5 / 2,
      sellValue: 1.5,
      amount: 5,
    },
    {
      id: uuidv4(),
      code: "11",
      name: "Sabão em pó (kg)",
      description: "",
      buyValue: 1.5 / 2,
      sellValue: 10.00,
      amount: 5,
    },
    {
      id: uuidv4(),
      code: "12",
      name: "Detergente líquido (500ml)",
      description: "",
      buyValue: 1.5 / 2,
      sellValue: 5.00,
      amount: 5,
    },
    {
      id: uuidv4(),
      code: "13",
      name: "Amaciante de roupas (litro)",
      description: "",
      buyValue: 1.5 / 2,
      sellValue: 10.00,
      amount: 5,
    },
    {
      id: uuidv4(),
      code: "14",
      name: "Água sanitária (litro)",
      description: "",
      buyValue: 1.5 / 2,
      sellValue: 5.00,
      amount: 5,
    },
    {
      id: uuidv4(),
      code: "15",
      name: "Limpa vidros (500ml)",
      description: "",
      buyValue: 1.5 / 2,
      sellValue: 4.00,
      amount: 5,
    },
    {
      id: uuidv4(),
      code: "16",
      name: "Desinfetante multiuso (500ml)",
      description: "",
      buyValue: 1.5 / 2,
      sellValue: 5.00,
      amount: 5,
    },
    {
      id: uuidv4(),
      code: "17",
      name: "Papel higiênico (rolo)",
      description: "",
      buyValue: 1.5 / 2,
      sellValue: 3.00,
      amount: 5,
    },
    {
      id: uuidv4(),
      code: "18",
      name: "Shampoo (500ml)",
      description: "",
      buyValue: 1.5 / 2,
      sellValue: 10.00,
      amount: 5,
    },
    {
      id: uuidv4(),
      code: "19",
      name: "Condicionador (500ml)",
      description: "",
      buyValue: 1.5 / 2,
      sellValue: 10.00,
      amount: 5,
    },
    {
      id: uuidv4(),
      code: "20",
      name: "Sabonete (un)",
      description: "",
      buyValue: 1.5 / 2,
      sellValue: 2.00,
      amount: 5,
    },
    {
      id: uuidv4(),
      code: "21",
      name: "Ração de gato",
      type: "KG",
      description: "",
      buyValue: 10,
      sellValue: 11,
      amount: 20
    },
    {
      id: uuidv4(),
      code: "22",
      name: "Ração de cachorro",
      type: "KG",
      description: "",
      buyValue: 10,
      sellValue: 12,
      amount: 20
    },
    {
      id: uuidv4(),
      code: "7896005800362",
      name: "Café três corações 250g",
      description: "Uma paixão tradicional, café torrado e moído",
      buyValue: 1.5 / 2,
      sellValue: 19.5,
      amount: 10,
    },
    {
      id: uuidv4(),
      code: "7793940568008",
      name: "Leite laserenissima 200g",
      description: "Leite em pó",
      buyValue: 1.5 / 2,
      sellValue: 18.99,
      amount: 5,
    },
  ]);

  const saveProduct = ({id, code, externalCode, name, description, buyValue, sellValue, type, amount}: IProduct) => {
    const newProduct: IProduct = {
      id: uuidv4(),
      code: code,
      externalCode: externalCode,
      name: name,
      description: description,
      buyValue: buyValue,
      sellValue: sellValue,
      type: type,
      amount: amount,
    };
    setProducts(prevState => [...prevState, newProduct])
  };

  const editProduct = ({id, code, externalCode, name, description, buyValue, sellValue, amount}: IProduct) => {
    const newProduct: IProduct = {
      id: id,
      code: code,
      externalCode: externalCode,
      name: name,
      description: description,
      buyValue: buyValue,
      sellValue: sellValue,
      amount: amount,
    };
    
    setProducts(prevState => prevState.map(product => product.id === id ? newProduct : product))
  }

  const removeProduct = (id: string) => {
    setProducts(prevState => prevState.filter(product => product.id !== id))
  }

  return (
    <ProductContext.Provider value={{products, saveProduct,editProduct, removeProduct}}>
        {children}
    </ProductContext.Provider>
  )
};

export default ProductProvider;