import { Image, StyleSheet, View } from "react-native";
import Button from "../components/button";
import InputPassword from "../components/inputPassword";
import { StackNavigationProp } from "@react-navigation/stack";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import Input2 from "../components/input/index2";

interface Props {
  user: string;
  password: string;
}

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Props>();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const onSubmit = (data: Props) => {
    if (isValid) navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          style={styles.image}
          source={require("../assets/logo_jmm.png")}
        ></Image>
        <Controller
          control={control}
          name={"user"}
          rules={{ required: "O nome de usuário deve ser informado" }}
          render={({ field: { onChange } }) => (
            <View style={{width: "100%", marginVertical: 15}}>
              <Input2
                text={"Usuário"}
                errorMessage={errors.user?.message}
                onChangeText={onChange}
              />
            </View>
          )}
        />
        <Controller
          control={control}
          name={"password"}
          rules={{ required: "A senha deve ser informada" }}
          render={({ field: { onChange } }) => (
            <View style={{width: "100%", marginBottom: 15}}>
            <InputPassword
              text={"Senha"}
              errorMessage={errors.password?.message}
              onChangeText={onChange}
            />
            </View>
          )}
        />

        <Button text={"Entrar"} onPress={handleSubmit(onSubmit)} />
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
});
