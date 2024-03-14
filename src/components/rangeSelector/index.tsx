import { StyleSheet, View } from "react-native";
import { Dispatch, SetStateAction } from "react";
import Picker from "../picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  rangeSelector: {
    initialDate: Date;
    finalDate: Date;
    initialTime: Date;
    finalTime: Date;
  };
  rangeSelectorData: Dispatch<
    SetStateAction<{
      initialDate: Date;
      finalDate: Date;
      initialTime: Date;
      finalTime: Date;
    }>
  >;
}

export default function RangeSelector({
  rangeSelector,
  rangeSelectorData,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.pickers}>
        <Picker
          maximumDate={
            rangeSelector
              ? rangeSelector.finalDate && rangeSelector.finalDate
              : undefined
          }
          mode="date"
          text="Data inicial"
          onConfirm={(data) =>
            rangeSelectorData({ ...rangeSelector, initialDate: data })
          }
          onCancel={() => console.log("canceled")}
        />
        <MaterialCommunityIcons
          name="arrow-left-right"
          size={24}
          color="black"
        />
        <Picker
          minimumDate={
            rangeSelector
              ? rangeSelector.initialDate && rangeSelector.initialDate
              : undefined
          }
          mode="date"
          text="Data final"
          onConfirm={(data) =>
            rangeSelectorData({ ...rangeSelector, finalDate: data })
          }
          onCancel={() => console.log("canceled")}
        />
      </View>
      <View style={styles.pickers}>
        <Picker
          mode="time"
          text="Hora inicial"
          onConfirm={(data) =>
            rangeSelectorData({ ...rangeSelector, initialTime: data })
          }
          onCancel={() => console.log("canceled")}
        />
        <MaterialCommunityIcons
          name="arrow-left-right"
          size={24}
          color="black"
        />
        <Picker
          mode="time"
          text="Hora final"
          onConfirm={(data) =>
            rangeSelectorData({ ...rangeSelector, finalTime: data })
          }
          onCancel={() => console.log("canceled")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  pickers: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
});
