import { FC, ReactNode, createContext, useEffect, useState } from "react";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { ISell, SellContextType } from "../@types/sell";
export const SellContext = createContext<SellContextType | undefined>(
  undefined
);

const SellProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [sells, setSells] = useState<ISell[]>([
    {
      id: uuidv4(),
      buyerName: "Vanderson",
      buyerNumber: "99999999",
      sellDate: new Date(),
      typeOfPayment: "PIX",
      paymentValue: 300,
      totalPrice: 200,
      products: [
        {
          id: uuidv4(),
          code: "1",
          name: "Feijão preto 500g",
          type: "UND",
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
          type: "UND",
          description: "",
          buyValue: 3.5 / 2,
          sellValue: 3.5,
          amount: 5,
        },
      ],
    },
    {
      id: uuidv4(),
      buyerName: "Hudson",
      buyerNumber: "11111111111",
      sellDate: new Date(),
      typeOfPayment: "PIX",
      paymentValue: 400,
      totalPrice: 322,
      products: [
        {
          id: uuidv4(),
          code: "19",
          name: "Condicionador (500ml)",
          type: "UND",
          description: "",
          buyValue: 1.5 / 2,
          sellValue: 10.00,
          amount: 5,
        },
        {
          id: uuidv4(),
          code: "20",
          name: "Sabonete (un)",
          type: "UND",
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
          type: "UND",
          description: "Uma paixão tradicional, café torrado e moído",
          buyValue: 1.5 / 2,
          sellValue: 19.5,
          amount: 10,
        },
        {
          id: uuidv4(),
          code: "7793940568008",
          name: "Leite laserenissima 200g",
          type: "UND",
          description: "Leite em pó",
          buyValue: 1.5 / 2,
          sellValue: 18.99,
          amount: 5,
        },
      ],
    },
  ]);

  const saveSell = (sell: ISell) => {
    const newSell: ISell = {
      ...sell,
      id: uuidv4(),
    };
    setSells(prevState => [...prevState, newSell])
  };

  const editSell = ({}: ISell) => {
    // const newProduct: ISell = {
    //   id: id,
    //   code: code,
    //   externalCode: externalCode,
    //   name: name,
    //   description: description,
    //   buyValue: buyValue,
    //   sellValue: sellValue,
    //   amount: amount,
    // };
    // setproducts(prevState => prevState.map(product => product.id === id ? newProduct : product))
  };

  const removeSell = (id: string) => {
    // setproducts(prevState => prevState.filter(product => product.id !== id))
  };

  return (
    <SellContext.Provider value={{ sells, saveSell, editSell, removeSell }}>
      {children}
    </SellContext.Provider>
  );
};

export default SellProvider;
