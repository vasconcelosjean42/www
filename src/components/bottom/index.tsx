import { StyleSheet, Text, View } from "react-native";
import Button from "../button";

interface Props {
  totalPrice: string;
  onPress: () => void;
  openHistoric: () => void
}

export default function Bottom({ totalPrice, onPress, openHistoric }: Props) {
  const disableButton = totalPrice === "0.00";
  return (
    <View style={styles.container}>
      <View style={styles.historic}>
        <Button
          text={"☰"}
          onPress={openHistoric}
          style={{ backgroundColor: "#0284c7" }}
        />
      </View>
      <View style={styles.button}>
        <Button
          text={"vender"}
          onPress={onPress}
          disabled={disableButton}
          style={{ backgroundColor: disableButton ? "#0c4a6e7a" : "#0284c7" }}
        />
      </View>
      <Text style={styles.text}>
        Preço total: {"\n"}R$ {totalPrice}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#cbd5e1",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    gap: 10,
    paddingHorizontal: 5,
  },
  historic: {
    width: 60
  },
  button: {
    width: 200,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  }
});
