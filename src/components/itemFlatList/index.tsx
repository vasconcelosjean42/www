import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ItemProps } from "../../screens/Venda";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  item: ItemProps;
  onPress: (event: GestureResponderEvent) => void
}

export default function ItemFlatList({ item, onPress }: Props) {
  if (!item) return;
  return (
    <View style={styles.container}>
      <View style={styles.amount}>
        <Text style={styles.defaultText}>{String(item.amount)}x</Text>
      </View>
      <View style={styles.code}>
        <Text style={styles.defaultText}>{item.name}</Text>
      </View>
      <View style={styles.price}>
        <Text style={styles.defaultText}>R$ {item.price && String(item.price.toFixed(2))}</Text>
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
    height: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1
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
