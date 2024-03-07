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
import Input2 from "../components/input/index2";
import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../contexts/productContext";
import { ProductContextType } from "../@types/product";
import { ScrollView } from "react-native-gesture-handler";
import Select from "../components/select";

interface ProductProps {
  code: string;
  externalCode: string;
  name: string;
  description: string;
  buyValue: number;
  sellValue: number;
  type: string;
  amount: number;
}

export default function Cadastro() {
  const { products, saveProduct, editProduct } = useContext(
    ProductContext
  ) as ProductContextType;
  const {
    control,
    handleSubmit,
    setValue,
    getFieldState,
    getValues,
    watch,
    reset,
    clearErrors,
    setError,
    unregister,
    register,
    setFocus,
    formState: { errors, isValid, touchedFields, isDirty, isSubmitSuccessful, isSubmitted },
  } = useForm<ProductProps>();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const onSubmit = (data: ProductProps) => {
    saveProduct({ ...data, id: "", type: getValues("type") });
    if (isValid) {
      reset();
      navigation.navigate("Home")
      navigation.navigate("Cadastro")
    }
  };

  const backAction = () => {
    if (isDirty) {
      Alert.alert(
        "Você não terminou o cadastro",
        "Você tem certeza que deseja voltar? O cadastro não foi efetuado",
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

  const [counter, setCounter] = useState(0);

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Cadastro de produto</Text>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            marginTop: 10,
          }}
        >
          <View style={{ gap: 25, justifyContent: "center", marginBottom: 30 }}>
            <Controller
              control={control}
              name="code"
              render={({ field: { onChange, value } }) => (
                <Input2
                  {...register("code")}
                  text={"Código de barras"}
                  value={value}
                  errorMessage={errors.code?.message}
                  onChangeText={(text: string) => {
                    clearErrors("externalCode");
                    onChange(text);
                  }}
                  keyboardType="numeric"
                  maxLength={20}
                  autoFocus
                />
              )}
            />
            <Controller
              control={control}
              name="externalCode"
              render={({ field: { onChange, value } }) => (
                <Input2
                  text={"Código externo"}
                  value={value}
                  errorMessage={errors.externalCode?.message}
                  onChangeText={(text: string) => {
                    clearErrors("code");
                    onChange(text);
                  }}
                  maxLength={20}
                  keyboardType="numeric"
                />
              )}
            />
            <Controller
              control={control}
              name="name"
              rules={{ required: "É necessário inserir o nome" }}
              render={({ field: { onChange, value } }) => (
                <Input2
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
                <Input2
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
              <Text style={styles.valuesText}>Valores: </Text>
              <View style={styles.values}>
                <Controller
                  control={control}
                  name="buyValue"
                  render={({ field: { value, onChange } }) => (
                    <Input2
                      value={value ? value.toString() : ""}
                      text={"Compra"}
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
                    <Input2
                      text={"Venda"}
                      value={value ? value.toString() : ""}
                      errorMessage={errors.sellValue?.message}
                      onChangeText={onChange}
                      keyboardType="numeric"
                    />
                  )}
                />
              </View>
            </View>
            <View style={styles.values}>
              <View style={{ width: "50%" }}>
                <Controller
                  control={control}
                  name="type"
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={value}
                      data={["UND", "KG"]}
                      onSelect={(data) => onChange(data)}
                    />
                  )}
                />
              </View>
              <Controller
                control={control}
                name="amount"
                rules={{
                  required: "Quantidade obrigatória",
                }}
                render={({ field: { value, onChange } }) => (
                  <Input2
                    value={value ? value.toString() : ""}
                    text={"Quantidade"}
                    onChangeText={onChange}
                    keyboardType="numeric"
                    errorMessage={errors.amount?.message}
                  />
                )}
              />
            </View>
          </View>
        </ScrollView>
        <View style={styles.button}>
          <Button
            text={"Cadastrar"}
            onPress={() => {
              handleSubmit(onSubmit)()
                .then(() => {
                  if (isValid)
                    ToastAndroid.show(
                      "Produto Cadastrado com sucesso!",
                      ToastAndroid.SHORT
                    );
                })
                .finally(() => {
                  if (
                    (watch("externalCode") === undefined ||
                      watch("externalCode") === "") &&
                    (watch("code") === undefined || watch("code") === "")
                  ) {
                    setError("code", {
                      message: "É necessário inserir o código de barras",
                    });
                  }
                  if (
                    (watch("code") === undefined || watch("code") === "") &&
                    (watch("externalCode") === undefined ||
                      watch("externalCode") === "")
                  ) {
                    setError("externalCode", {
                      message: "É necessário inserir o código externo",
                    });
                  }
                });
            }}
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
    justifyContent: "space-between",
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
    height: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
});
