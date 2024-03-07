import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { IProduct } from "../../@types/product";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

interface Props {
  item: IProduct;
  onRemove: (code: string) => void;
}

export default function ProductFlatList({ item, onRemove }: Props) {
  if (!item) return;
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.name}>
          <Text style={styles.nameText}>{String(item.name)}</Text>
        </View>
        <View style={styles.price}>
          <Text style={styles.priceText}>
            R$ {item.sellValue && String(Number(item.sellValue).toFixed(2))}
          </Text>
          <Text style={styles.brighterText}>Quantidade: {String(item.amount)}</Text>
        </View>
        <View style={styles.amountCode}>
          {item.code && <Text style={styles.brighterText}>Cod: {item.code}</Text>}
          {item.externalCode && <Text style={styles.brighterText}>Externo: {item.externalCode}</Text>}
        </View>
      </View>
      <TouchableOpacity style={styles.delete} onPress={() => navigation.navigate("EditarProduto", {id: item.id})}>
        <AntDesign name="edit" size={24} color="#f59e0b" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.delete} onPress={() => onRemove(item.id)}>
        <Ionicons name={"trash-outline"} color="#961d1d" size={25} />
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
    justifyContent: "space-between",
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  content: {
    display: "flex",
    width: "70%",
    gap: 5,
  },
  defaultText: {
    fontSize: 15,
    fontWeight: "500",
  },
  name: {},
  nameText: {
    fontSize: 16,
    fontWeight: "900",
  },
  price: {
    display: "flex",
    flexDirection: "row",
    gap: 15
  },
  priceText: {
    fontSize: 16,
  },
  code: {},
  amount: {},
  amountCode: {
    display: "flex",
    flexDirection: "row",
    gap: 15
  },
  brighterText: {
    fontSize: 16,
    color: "#111827",
  },
  delete: {
    width: "15%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
