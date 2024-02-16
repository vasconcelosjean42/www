import { Dimensions, StyleSheet, Text, View } from "react-native";
import Button from "../components/button";
import { StackNavigationProp } from "@react-navigation/stack";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import Input2 from "../components/input/index2";
import { useContext } from "react";
import { ProductContext } from "../contexts/productContext";
import { ProductContextType } from "../@types/product";

interface Props {
  code: string;
  name: string;
  description: string;
  buyValue: number;
  sellValue: number;
  amount: number;
}

export default function Cadastro() {
  const { saveProduct } = useContext(ProductContext) as ProductContextType;
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Props>();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const onSubmit = (data: Props) => {
    console.log(data);
    saveProduct(data);
    if (isValid) navigation.navigate("Venda");
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Cadastro de produto</Text>
        <View style={{ gap: 30 }}>
          <Controller
            control={control}
            name="code"
            rules={{ required: "É necessário inserir o código" }}
            render={({ field: { onChange } }) => (
              <Input2
                text={"Código"}
                errorMessage={errors.code?.message}
                onChangeText={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="name"
            rules={{ required: "É necessário inserir o nome" }}
            render={({ field: { onChange } }) => (
              <Input2
                text={"Nome"}
                errorMessage={errors.name?.message}
                onChangeText={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="description"
            render={() => (
              <Input2
                text={"Descrição"}
                multiline={true}
                numberOfLines={3}
                style={{ height: 100, justifyContent: "flex-start" }}
                textAlignVertical="top"
              />
            )}
          />
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.valuesText}>Valores: </Text>
            <View style={styles.values}>
              <Controller
                control={control}
                name="buyValue"
                render={() => <Input2 text={"Compra"} />}
              />

              <Controller
                control={control}
                name="sellValue"
                rules={{ required: "É necessário inserir o valor de venda" }}
                render={({ field: { onChange } }) => (
                  <Input2
                    text={"Venda"}
                    errorMessage={errors.sellValue?.message}
                    onChangeText={onChange}
                  />
                )}
              />
            </View>
          </View>
          <Controller
            control={control}
            name="amount"
            render={() => <Input2 text={"Quantidade"} />}
          />
        </View>
        <View style={styles.button}>
          <Button text={"Cadastrar"} onPress={handleSubmit(onSubmit)} />
        </View>
      </View>
    </View>
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
    marginTop: 60,
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
  },
  values: {
    width: "100%",
    height: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
});
