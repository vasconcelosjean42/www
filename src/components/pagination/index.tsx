import { StyleSheet, Text, View } from "react-native";
import Button from "../button";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
  paginationAmount: number;
  page: number;
  onPress: (value: number) => void;
}

export default function Pagination({ paginationAmount, page, onPress }: Props) {
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
        {arrayPages
          .filter(
            (item) =>
              (page === paginationAmount - 1 && item === page - 2) ||
              item === page - 1 ||
              item === page ||
              item === page + 1 ||
              item === paginationAmount - 1
          )
          .map((item) => (
            <View key={item} style={styles.paginationNumbers}>
              <View style={styles.button}>
                <TouchableOpacity
                  style={[
                    styles.touchable,
                    item === page && styles.touchableSelected,
                  ]}
                  onPress={() => onPress(item)}
                >
                  <Text
                    style={[
                      styles.text,
                      item === page && styles.touchableSelected,
                    ]}
                  >
                    {item + 1}
                  </Text>
                </TouchableOpacity>
                {/* <Button text={(item + 1).toString()}/> */}
              </View>
              {item === page + 1 && page !== paginationAmount - 2 && paginationAmount > 3 && (
                <View style={styles.ellipsis}>
                  <Text style={styles.text}>...</Text>
                </View>
              )}
            </View>
          ))}
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
  paginationNumbers: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  touchable: {
    width: 50,
    height: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#999"  },
  touchableSelected: {
    borderColor: "#19a4d9",
    color: "#19a4d9",
  },
  ellipsis: {
    width: 50,
    height: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "normal",
  },
});
