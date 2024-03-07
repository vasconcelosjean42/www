import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { IProduct } from "../../@types/product";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ISell } from "../../@types/sell";
import Button from "../button";
import { useState } from "react";
import printCall from "../../utils/printCall";

interface Props {
  item: ISell;
  onRemove: (code: string) => void;
}

export default function SellFlatList({ item, onRemove }: Props) {
  if (!item) return;
  const [isShowDetails, setIsShowDetails] = useState(false);
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.name}>
          <Text style={styles.nameText}>{String(item.buyerName)}</Text>
          <Text style={styles.nameText}>
            {String(item.sellDate?.toLocaleString())}
          </Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => setIsShowDetails((prevState) => !prevState)}
          >
            <Text>▼ mais detalhes</Text>
          </TouchableOpacity>

          {isShowDetails && (
            <View style={styles.product}>
              {item.products.map((product) => (
                <View
                  key={product.id}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text>
                    {product.amount.toString()}x {product.name}
                  </Text>
                  <Text>R${product.sellValue.toFixed(2).toString()}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
        <View style={styles.name}>
          <Text style={styles.nameText}>Preço total:</Text>
          <Text style={styles.nameText}>
            R${String(item.totalPrice.toFixed(2))}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.printer}
        onPress={() => {
          printCall({ sellProps: item, isValid: true });
        }}
      >
        <AntDesign name="printer" size={24} color="#f8fafc" />
      </TouchableOpacity>
      {/*
      <TouchableOpacity style={styles.delete} onPress={() => onRemove(item.id)}>
        <Ionicons name={"trash-outline"} color="#961d1d" size={25} />
      </TouchableOpacity> */}
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
    paddingVertical: 20,
  },
  content: {
    display: "flex",
    width: "80%",
    gap: 5,
  },
  defaultText: {
    fontSize: 15,
    fontWeight: "500",
  },
  name: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "space-between",
  },
  nameText: {
    fontSize: 16,
    fontWeight: "900",
  },
  product: {},
  price: {
    display: "flex",
    flexDirection: "row",
    gap: 15,
  },
  priceText: {
    fontSize: 16,
  },
  code: {},
  amount: {},
  amountCode: {
    display: "flex",
    flexDirection: "row",
    gap: 15,
  },
  brighterText: {
    fontSize: 16,
    color: "#111827",
  },
  printer: {
    width: "15%",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#334155",
    borderRadius: 10,
  },
});
