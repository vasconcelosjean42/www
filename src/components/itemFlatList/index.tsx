import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { IProduct } from "../../@types/product";

interface Props {
  item: IProduct;
  onPress: (event: GestureResponderEvent) => void
}

export default function ItemFlatList({ item, onPress }: Props) {
  if (!item) return;
  return (
    <View style={styles.container}>
      <View style={styles.amount}>
        <Text style={styles.defaultText}>{String(item.amount)}{item.type === "KG" ? "kg" : "x" }</Text>
      </View>
      <View style={styles.code}>
      <Text style={[styles.defaultText, {color: "#999999"}]}>{item.code}</Text>
        <Text style={styles.defaultText}>{item.name}</Text>
      </View>
      <View style={styles.price}>
        <Text style={styles.defaultText}>R$ {item.sellValue && String(item.sellValue.toFixed(2))}</Text>
      </View>
      <TouchableOpacity style={styles.delete} onPress={onPress}>
      <Ionicons
          name={"trash-outline"}
          color="#961d1d"
          size={25}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingVertical: 5
  },
  defaultText: {
    fontSize: 15,
    fontWeight: "500"
  },
  amount: {
    width: "15%",
    alignItems: "center",
    justifyContent: "center",
  },
  code: {
    flex: 1,
  },
  price: {
    width: "25%",
    alignItems: "center",
    justifyContent: "center",
  },
  delete: {
    width: "15%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",

  }
});
