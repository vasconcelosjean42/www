import { Image, StyleSheet, View } from "react-native";
import Button from "../components/button";
import { StackNavigationProp } from "@react-navigation/stack";
import { ParamListBase, useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          style={styles.image}
          source={require("../assets/logo_jmm.png")}
        ></Image>
        <View style={styles.button}>
          <Button text={"Venda"} onPress={() => navigation.navigate("Venda")} />
        </View>
        <View style={styles.button}>
          <Button text={"Cadastro"} onPress={() => navigation.navigate("Cadastro")} />
        </View>
        <View style={styles.button}>
          <Button text={"Lista"} onPress={() => navigation.navigate("Lista")} />
        </View>
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
    gap: 30
  },
  image: {
    width: 220,
    height: 100,
  },
  button: {
    width: "100%"
  }
});
