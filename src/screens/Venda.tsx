import {
  Alert,
  BackHandler,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import Select from "../components/select";
import { useContext, useEffect, useState } from "react";
import ItemFlatList from "../components/itemFlatList";
import { useForm, Controller } from "react-hook-form";
import Bottom from "../components/bottom";
import SellModal from "../components/sellModal";
import { ProductContext } from "../contexts/productContext";
import { IProduct, ProductContextType } from "../@types/product";
import KGModal from "../components/kgModal";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Input2 from "../components/input/index2";

export default function Venda() {
  const {
    register,
    control,
    handleSubmit,
    getValues,
    setValue,
    setError,
    reset,
    watch,
    formState: {
      errors,
      isSubmitSuccessful,
      isSubmitted,
      submitCount,
      isDirty,
    },
  } = useForm<IProduct>({
    defaultValues: { amount: 1 },
  });
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [item, setItem] = useState<IProduct[]>([]);
  const { products } = useContext(ProductContext) as ProductContextType;
  const [isVisible, setIsVisible] = useState(false);
  const [isKGVisible, setIsKGVisible] = useState(false);
  const [KGProductPrice, setKGProductPrice] = useState(0);
  const [KGProductName, setKGProductName] = useState("");

  const totalPrice = item
    .reduce((prev, curr) => prev + curr.sellValue, 0)
    .toFixed(2);

  const handleAddItem = (data: IProduct) => {
    let product = products.find((product) => product.code === data.code);
    if (!product)
      product = products.find((product) => product.externalCode === data.code); // if (data.code === "") {
    //   setError("code", {
    //     message: "É necessário informar o código",
    //   });
    //   return;
    // }
    if (data.code === "" || !product) {
      if (data.code === undefined) return;
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
                amount: Number(item.amount) + Number(data.amount),
                sellValue: product
                  ? (Number(item.amount) + Number(data.amount)) *
                    product.sellValue
                  : item.sellValue,
              }
            : item
        )
      );
      return;
    }
    const newItem: IProduct = {
      ...data,
      amount: data.amount,
      code: data.code,
      name: product?.name || data.code,
      sellValue: (product?.sellValue || 10) * data.amount,
      type: product?.type ? product.type : "UND",
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

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    reset({ code: "" });
  }, [isSubmitSuccessful]);

  useEffect(() => {
    let ignore = false;
    if (getValues("code") === "") return;

    let product = products.find(
      (product) => product.code === getValues("code")
    );
    if (!product)
      product = products.find(
        (product) => product.externalCode === getValues("code")
      );

    if (product?.type && product.type === "KG") {
      setKGProductPrice(product.sellValue);
      setKGProductName(product.name);
      setIsKGVisible(true);
      return;
    } else {
      setTimeout(() => {
        if (!ignore) handleSubmit(handleAddItem)();
      }, 1000);
    }
    return () => {
      ignore = true;
    };
  }, [watch("code")]);

  const backAction = () => {
    if (isDirty) {
      Alert.alert(
        "Você tem produtos na lista",
        "Você tem certeza que deseja voltar? O lista contem produtos",
        [
          {
            text: "Cancelar",
            onPress: () => false,
            style: "cancel",
          },
          { text: "SIM", onPress: () => navigation.navigate("Home") },
        ]
      );
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      navigation.navigate("Home");
      return true;
    });
  }, []);

  useEffect(() => {
    if (!item)
      BackHandler.addEventListener("hardwareBackPress", () => {
        navigation.navigate("Home");
        return true;
      });
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [item]);

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <View>
        <SellModal
          isVisible={isVisible}
          setIsVisible={() => setIsVisible((prevState) => !prevState)}
          totalPrice={Number(totalPrice)}
          items={item}
          onConfirm={() => {
            console.log("handleAddItem()()");
            setIsVisible(false);
            setItem([]);
          }}
        />
        <KGModal
          isVisible={isKGVisible}
          setIsVisible={() => {
            reset();
            setIsKGVisible((prevState) => !prevState);
          }}
          onConfirm={(amount: number) => {
            setValue("amount", amount);
            handleSubmit(handleAddItem)();
            setIsKGVisible((prevState) => !prevState);
            setValue("amount", 1);
          }}
          totalPrice={KGProductPrice}
          productName={KGProductName}
        />
        <View style={styles.header}>
          <View style={styles.select}>
            <Controller
              control={control}
              name="amount"
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value.toString()}
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
            render={({ field: { onChange, value, onBlur } }) => (
              <Input2
                keyboardType="numeric"
                {...register("code")}
                text={"código"}
                value={value}
                onChangeText={(text) => {
                  onChange(text);
                }}
                onBlur={() => {
                  onBlur();
                }}
                blurOnSubmit={false}
                errorMessage={errors.code?.message}
                autoFocus
              />
            )}
          />
          {/* <View style={{ width: "18%", marginTop: 20, marginLeft: 3 }}>
          <Button text={"+"} onPress={handleSubmit(handleAddItem)} />
        </View> */}
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
            onPress={() => {
              setIsVisible((prevState) => !prevState);
            }}
            openHistoric={() => navigation.navigate('Historico')}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("screen").height,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    display: "flex",
  },
  header: {
    width: 400,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  select: {
    width: "18%",
    marginHorizontal: 3,
  },
  content: {
    width: 400,
    flex: 1,
    display: "flex",
    flexDirection: "row",
  },
  flatList: {},
  bottom: {
    width: Dimensions.get("window").width,
    height: "12%",
    backgroundColor: "#777222",
  },
});
