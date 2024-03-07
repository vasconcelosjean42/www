import {
  Alert,
  BackHandler,
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import Button from "../components/button";
import { StackNavigationProp } from "@react-navigation/stack";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import Input3 from "../components/input/index3";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../contexts/productContext";
import { ProductContextType } from "../@types/product";
import { ScrollView } from "react-native-gesture-handler";
import type { StackScreenProps } from "@react-navigation/stack";

type RootStackParamsList = {
  EditarProduto: {
    id: string;
  };
};

interface ProductProps {
  id: string;
  code: string;
  externalCode: string;
  name: string;
  description: string;
  buyValue: number;
  sellValue: number;
  amount: number;
}

type Props = StackScreenProps<RootStackParamsList, "EditarProduto">;

export default function EditarProduto({ route }: Props) {
  const { id } = route.params;
  const { products, editProduct } = useContext(
    ProductContext
  ) as ProductContextType;
  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    reset,
    clearErrors,
    formState: {
      errors,
      isValid,
      isDirty,
    },
  } = useForm<ProductProps>();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [codeRules, setCodeRules] = useState((getValues("externalCode") === (undefined || "") || !getValues("externalCode")) ? { required: {value: true, message: "É necessário inserir o código de barras"} } : {required: false})
  const [externalCodeRules, setExternalCodeRules] = useState((getValues("code") === (undefined || "") || !getValues("code")) ? { required: {value: true, message: "É necessário inserir o código externo"} } : {required: false})
  useEffect(() => {
    if (id) {
      reset();
      const productToUpdate = products.find((product) => product.id === id);
      setValue("code", productToUpdate?.code || "");
      setValue("externalCode", productToUpdate?.externalCode || "");
      setValue("name", productToUpdate?.name || "");
      setValue("description", productToUpdate?.description || "");
      setValue("buyValue", productToUpdate?.sellValue || 0);
      setValue("sellValue", productToUpdate?.sellValue || 0);
      setValue("amount", productToUpdate?.amount || 0);
      setCodeRules((productToUpdate?.externalCode === (undefined || "") || !productToUpdate?.externalCode) ? { required: {value: true, message: "É necessário inserir o código de barras"} } : {required: false})
      setExternalCodeRules((productToUpdate?.code === (undefined || "") || !productToUpdate?.code) ? { required: {value: true, message: "É necessário inserir o código externo"} } : {required: false})
    }
  }, []);
  const onSubmit = (data: ProductProps) => {
    const productUpdated = {
      ...data,
      id,
      externalCode: data.externalCode || "",
      code: data.code || "",
    };

    editProduct(productUpdated);
    if (isValid) {
      reset();
      navigation.navigate("Lista");
      ToastAndroid.show("Produto Editado com sucesso!", ToastAndroid.SHORT);
    }
  };

  const backAction = () => {
    if (isDirty) {
      Alert.alert(
        "Você não terminou a edição",
        "Você tem certeza que deseja voltar? A Edição não foi efetuado",
        [
          {
            text: "Cancelar",
            onPress: () => false,
            style: "cancel",
          },
          { text: "SIM", onPress: () => navigation.goBack() },
        ]
      );
      return true;
    } else {
      return;
    }
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      navigation.goBack();
      return true;
    });
  }, []);

  useEffect(
    () => {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();
    },
    !isDirty ? [watch()] : [""]
  );
  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Editar de produto</Text>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            marginTop: 10,
          }}
        >
          <View style={{ gap: 20, justifyContent: "center", marginBottom: 30 }}>
            <Controller
              control={control}
              name="code"
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <Input3
                  {...register("code", codeRules)}
                  text={"Código de barras"}
                  value={value}
                  defaultValue=""
                  errorMessage={errors.code?.message}
                  onChangeText={(text: string) => {
                    clearErrors();
                    onChange(text);
                    text === "" ? setExternalCodeRules({required: {value: true, message: "É necessário inserir o código externo"}}) : setExternalCodeRules({required: false})
                  }}
                  keyboardType="numeric"
                  maxLength={20}
                />
              )}
            />
            <Controller
              control={control}
              name="externalCode"
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <Input3
                  {...register("externalCode", externalCodeRules)}
                  text={"Código externo"}
                  value={value}
                  defaultValue=""
                  errorMessage={errors.externalCode?.message}
                  onChangeText={(text: string) => {
                    clearErrors();
                    onChange(text);
                    text === "" ? setCodeRules({required: {value: true, message: "É necessário inserir o código de barras"}}) : setCodeRules({required: false})
                  }}
                  maxLength={20}
                />
              )}
            />
            <Controller
              control={control}
              name="name"
              rules={{ required: "É necessário inserir o nome" }}
              render={({ field: { onChange, value } }) => (
                <Input3
                  text={"Nome"}
                  value={value}
                  errorMessage={errors.name?.message}
                  onChangeText={onChange}
                />
              )}
            />
            <Controller
              control={control}
              name="description"
              render={({ field: { value, onChange } }) => (
                <Input3
                  value={value ? value.toString() : ""}
                  text={"Descrição"}
                  multiline={true}
                  numberOfLines={3}
                  style={{ height: 100, justifyContent: "flex-start" }}
                  textAlignVertical="top"
                  onChangeText={onChange}
                />
              )}
            />
            <View>
              <View style={styles.values}>
                <Controller
                  control={control}
                  name="buyValue"
                  render={({ field: { value, onChange } }) => (
                    <Input3
                      value={value ? value.toString() : ""}
                      text={"Preço de compra"}
                      onChangeText={onChange}
                      keyboardType="numeric"
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="sellValue"
                  rules={{ required: "Valor obrigatório" }}
                  render={({ field: { onChange, value } }) => (
                    <Input3
                      text={"Preço de venda"}
                      value={value ? value.toString() : ""}
                      errorMessage={errors.sellValue?.message}
                      onChangeText={onChange}
                      keyboardType="numeric"
                    />
                  )}
                />
              </View>
            </View>
            <Controller
              control={control}
              name="amount"
              rules={{
                required: "É necessário inserir a quantidade em estoque",
              }}
              render={({ field: { value, onChange } }) => (
                <Input3
                  value={value ? value.toString() : ""}
                  text={"Quantidade"}
                  onChangeText={onChange}
                  keyboardType="numeric"
                  errorMessage={errors.amount?.message}
                />
              )}
            />
          </View>
        </ScrollView>
        <View style={styles.button}>
          <Button
            text={"Editar"}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    fontWeight: "700",
    marginLeft: 10,
    marginTop: 50,
  },
  content: {
    width: Dimensions.get("window").width,
    height: "100%",
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "column",
  },
  image: {
    width: 220,
    height: 100,
  },
  button: {
    width: 350,
    alignSelf: "center",
    padding: 20,
  },
  valuesText: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
  },
  values: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
});
