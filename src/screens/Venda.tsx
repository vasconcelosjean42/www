import { Alert, Dimensions, FlatList, StyleSheet, View } from "react-native";
import Select from "../components/select";
import Button from "../components/button";
import Input from "../components/input";
import { useContext, useEffect, useState } from "react";
import ItemFlatList from "../components/itemFlatList";
import { useForm, Controller } from "react-hook-form";
import Bottom from "../components/bottom";
import SellModal from "../components/sellModal";
import { ProductContext } from "../contexts/productContext";
import { ProductContextType } from "../@types/product";

export interface ItemProps {
  amount: number;
  code: string;
  name: string;
  price: number;
}

export default function Venda() {
  const {
    register,
    control,
    handleSubmit,
    setFocus,
    setError,
    watch,
    formState: { errors, isSubmitSuccessful, isSubmitted },
  } = useForm({
    defaultValues: { code: "", amount: 1, name: "", price: 0 },
  });

  const [item, setItem] = useState<ItemProps[]>([]);
  const { products } = useContext(ProductContext) as ProductContextType;
  const [groceryProducts, setGroceryProducts] = useState([
    {
      code: "1",
      name: "Feijão preto 500g",
      price: 5.5,
    },
    {
      code: "2",
      name: "Arroz branco 1kg",
      price: 7,
    },
    {
      code: "3",
      name: "Açúcar cristal 500g",
      price: 3.5,
    },
    {
      code: "4",
      name: "Óleo de soja 500ml",
      price: 5,
    },
    {
      code: "5",
      name: "Leite integral 1L",
      price: 4,
    },
    {
      code: "6",
      name: "Café torrado e moído 250g",
      price: 8,
    },
    {
      code: "7",
      name: "Macarrão espaguete 500g",
      price: 3,
    },
    {
      code: "8",
      name: "Farinha de trigo 1kg",
      price: 4.5,
    },
    {
      code: "9",
      name: "Tomate pelado em lata 400g",
      price: 4,
    },
    {
      code: "10",
      name: "Sal refinado 500g",
      price: 1.5,
    },
  ]);
  const [isVisible, setIsVisible] = useState(false);

  const totalPrice = item
    .reduce((prev, curr) => prev + curr.price, 0)
    .toFixed(2);
  const handleAddItem = (data: ItemProps) => {
    console.log(data);

    const groceryItem = products.find((gp) => gp.code === data.code);
    if (data.code.length === 0) {
      setError("code", {
        message: "É necessário informar o código",
      });
      return;
    }
    if (!groceryItem) {
      setError("code", {
        message: "Esse produto não está cadastrado",
      });
      return;
    }
    if (item.find((i) => i.code === data.code)) {
      setItem((prevState) =>
        [...prevState].map((item) =>
          item.code === data.code
            ? {
                ...item,
                amount: item.amount + data.amount,
                price: groceryItem
                  ? (item.amount + data.amount) * groceryItem.sellValue
                  : item.price,
              }
            : item
        )
      );
      return;
    }
    const newItem: ItemProps = {
      amount: data.amount,
      code: data.code,
      name: groceryItem?.name || data.code,
      price: (groceryItem?.sellValue || 10) * data.amount,
    };
    setItem((prevState) => [...prevState, newItem]);
  };

  const handleDeleteItem = (code: string) => {
    Alert.alert(
      "Remover produto da lista",
      "Você deseja mesmo retirar esse produto da lista?",
      [
        {
          text: "Não retirar",
          onPress: () => console.log("Item não removido da lista"),
          style: "destructive",
        },
        {
          text: "Sim, desejo retirar",
          onPress: () =>
            setItem((prevState) =>
              prevState.filter((item) => item.code !== code)
            ),
          style: "default",
        },
      ]
    );
  };

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  useEffect(() => {
    let ignore = false
    setTimeout(() => { if(!ignore) handleSubmit(handleAddItem)()}, 100)
    return () => {ignore = true}
  }, [watch("code")])

  return (
    <View style={styles.container}>
      <SellModal
        isVisible={isVisible}
        setIsVisible={() => setIsVisible((prevState) => !prevState)}
        totalPrice={Number(totalPrice)}
      />
      <View style={styles.header}>
        <View style={styles.select}>
          <Controller
            control={control}
            name="amount"
            render={({ field: { onChange } }) => (
              <Select
                data={Array(100)
                  .fill(0)
                  .map((value, index) => index + 1)}
                onSelect={(data) => onChange(data)}
              />
            )}
          />
        </View>
        <Controller
          control={control}
          name="code"
          // rules={{
          //   required: "É necessário informar o código",
          // }}
          render={({ field: { onChange, value, ref } }) => (
            <Input
              {...register("code")}
              text={"Código"}
              width={10}
              value={isSubmitSuccessful ? "" : value}
              onChangeText={(text) => {
                  onChange(text);
                  
              }}
              errorMessage={errors.code?.message}
              autoFocus
            />
          )}
        />
        <View style={{ width: "18%", marginTop: 20, marginLeft: 3 }}>
          <Button text={"+"} onPress={handleSubmit(handleAddItem)} />
        </View>
      </View>
      <View style={styles.content}>
        <FlatList
          data={item}
          keyExtractor={(item) => String(item.code)}
          renderItem={({ item }) => (
            <ItemFlatList
              item={item}
              onPress={() => handleDeleteItem(item.code)}
            />
          )}
          style={styles.flatList}
        />
      </View>
      <View style={styles.bottom}>
        <Bottom
          totalPrice={totalPrice}
          onPress={() => setIsVisible((prevState) => !prevState)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 50,
    justifyContent: "flex-start",
    display: "flex",
  },
  header: {
    width: 400,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  select: {
    width: "18%",
    marginHorizontal: 3,
  },
  content: {
    width: 400,
    height: "78%",
    display: "flex",
    flexDirection: "row",
  },
  flatList: {},
  bottom: {
    width: Dimensions.get("window").width,
    backgroundColor: "#777222",
  },
});
