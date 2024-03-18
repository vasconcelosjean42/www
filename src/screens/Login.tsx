import { Image, StyleSheet, Text, View } from "react-native";
import Button from "../components/button";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  ParamListBase,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import Input2 from "../components/input/index2";
import CheckBox from "expo-checkbox";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {
  user: string;
  password: string;
}

export default function Login() {
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    resetField,
    clearErrors,
    formState: {
      errors,
      isValid,
      isSubmitSuccessful,
      isSubmitted,
      touchedFields,
      isSubmitting,
    },
  } = useForm<Props>();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const isFocused = useIsFocused();

  const [isSelected, setSelection] = useState(false);

  const onSubmit = async (data: Props) => {
    try {
      if (isSelected) {
        await AsyncStorage.setItem("user", data.user);
        await AsyncStorage.setItem("password", data.password);
      }
    } catch (e) {
      console.log("AS of onSubmit: " + e);
    }
    console.log("isValid: ", isValid);
    console.log(errors)
    
  };



  useEffect(() => {
    console.log("is submitted"+isValid); 
    if (isSubmitting && JSON.stringify(errors) === JSON.stringify({})) {
      reset();
      navigation.navigate("Home");
    }
  }, [isSubmitting])

  useEffect(() => {
    console.log("isFocused useEffect");
    const loginRemember = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        const password = await AsyncStorage.getItem("password");
        console.log("pegou o user e o password: " + user + " - " + password);

        if (user && password) {
          setValue("user", user);
          setValue("password", password);
          clearErrors()
        }
      } catch (e) {
        console.log(e);
      }
    };
    loginRemember();
  }, [isFocused]);

  // useEffect(() => {
  //   console.log("useEffect loginRemember");

  //   const loginRemember = async () => {
  //     try {
  //       const user = await AsyncStorage.getItem("user");
  //       const password = await AsyncStorage.getItem("password");
  //       if (isSelected) {
  //         if (user && password) {
  //           setValue("user", user);
  //           setValue("password", password);
  //         }
  //       }
  //     } catch (e) {
  //       console.log("AS of useEffect: " + e);
  //     }
  //   };
  //   loginRemember();
  // }, [isSubmitSuccessful]);

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
          render={({ field: { value, onChange } }) => (
            <View style={{ width: "100%", marginVertical: 20 }}>
              <Input2
                value={value}
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
          render={({ field: { value, onChange } }) => (
            <View style={{ width: "100%", marginBottom: 5 }}>
              <Input2
                value={value}
                text={"Senha"}
                errorMessage={errors.password?.message}
                onChangeText={onChange}
                secureTextEntry
              />
            </View>
          )}
        />
        <View style={styles.checkboxContainer}>
          <Text style={styles.label}>Lembrar login</Text>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={styles.checkbox}
          />
        </View>
        <Button
          text={"Entrar"}
          onPress={handleSubmit(onSubmit)}
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
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 10,
    alignSelf: "flex-end",
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
});
