import { StyleSheet, Text, View } from "react-native";
import Button from "../button";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Input2 from "../input/index2";
import Select from "../select";
interface Props {
  paginationAmount: number;
  page: number;
  onPress: (value: number) => void;
}

export default function ManualPagination({ paginationAmount, page, onPress }: Props) {
  
  const arrayPages = Array<number>(paginationAmount !== 0 ? paginationAmount : 1)
    .fill(0)
    .map((item, index) => index);
  useEffect(() => {
    console.log(paginationAmount);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.button}>
          <Button
            text={"<"}
            onPress={() => onPress(page - 1)}
            disabled={page === 0}
          />
        </View>
        <View style={styles.selection}>
          <Text style={styles.text}>página</Text>
          <View style={styles.select}>
            <Select
              value={(page + 1).toString()}
              data={Array(paginationAmount)
                .fill(0)
                .map((value, index) => index + 1)}
              onSelect={(data) => onPress(data - 1)}
            />
          </View>
          {/* <Input2 keyboardType="numeric" text={(page + 1).toString()} onChangeText={(text) => onPress(Number(text) > paginationAmount ? 5 : Number(text))}/> */}
          <Text style={styles.text}>de {paginationAmount}</Text>
        </View>
        <View style={styles.button}>
          <Button
            text={">"}
            onPress={() => onPress(page + 1)}
            disabled={page === paginationAmount - 1}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  content: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  button: {
    width: 50,
  },
  selection: {
    width: "50%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10
  },
  select: {
    width: "30%"
  },
  text: {
    fontSize: 20,
    fontWeight: "normal",
  },
});
