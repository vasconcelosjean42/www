import { Image, StyleSheet, Text, View } from "react-native";
import Button from "../components/button";
import InputPassword from "../components/inputPassword";
import Input from "../components/input";
import { StackNavigationProp } from "@react-navigation/stack";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";

interface Props {
  user: string;
  password: string;
}

export default function Lista() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Props>();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const onSubmit = (data: Props) => {
    console.log(data);
    if (isValid) navigation.navigate("Venda");
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text>Lista</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    width: 350,
    height: 400,
    display: "flex",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 220,
    height: 100,
  },
  button: {

  }
});
