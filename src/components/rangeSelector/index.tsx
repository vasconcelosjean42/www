import { StyleSheet, View } from "react-native";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Picker from "../picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  rangeSelector: {
    initialDate: Date | undefined;
    finalDate: Date | undefined;
    initialTime: Date | undefined;
    finalTime: Date | undefined;
  };
  rangeSelectorData: Dispatch<
    SetStateAction<{
      initialDate: Date | undefined;
      finalDate: Date | undefined;
      initialTime: Date | undefined;
      finalTime: Date | undefined;
    }>
  >;
}

export default function RangeSelector({
  rangeSelector,
  rangeSelectorData,
}: Props) {
  const [initialTimeState, setInitialTimeState] = useState<Date>(new Date());
  const [finalTimeState, setFinalTimeState] = useState<Date | undefined>(undefined);
  return (
    <View style={styles.container}>
      <View style={styles.pickers}>
        <Picker
          date={rangeSelector && rangeSelector.initialDate}
          maximumDate={
            rangeSelector
              ? rangeSelector.finalDate && rangeSelector.finalDate
              : undefined
          }
          mode="date"
          text="Data inicial"
          onConfirm={(data) => {
            rangeSelectorData({ ...rangeSelector, initialDate: data });
            return true;
          }}
          onCancel={() => console.log("canceled")}
        />
        <MaterialCommunityIcons
          name="arrow-left-right"
          size={24}
          color="black"
        />
        <Picker
          date={rangeSelector && rangeSelector.finalDate}
          minimumDate={
            rangeSelector
              ? rangeSelector.initialDate && rangeSelector.initialDate
              : undefined
          }
          mode="date"
          text="Data final"
          onConfirm={(data) => {
            rangeSelectorData({ ...rangeSelector, finalDate: data });
            return true;
          }}
          onCancel={() => console.log("canceled")}
        />
      </View>
      <View style={styles.pickers}>
        <Picker
          timePickerModeAndroid="default"
          maximumDate={
            rangeSelector
              ? rangeSelector.finalTime && rangeSelector.finalTime
              : undefined
          }
          mode="time"
          text="Hora inicial"
          onConfirm={(data) => {
            if (finalTimeState) {
              if (data > finalTimeState) {
                console.log("data invalida");
                return false;
              } else {
                setInitialTimeState(data);
                rangeSelectorData({ ...rangeSelector, initialTime: data });
                return true;
              }
            } else {
              return true;
            }
          }}
          onCancel={() => console.log("canceled")}
        />
        <MaterialCommunityIcons
          name="arrow-left-right"
          size={24}
          color="black"
        />
        <Picker
          date={initialTimeState}
          timePickerModeAndroid="spinner"
          minimumDate={
            rangeSelector
              ? rangeSelector.initialTime && rangeSelector.initialTime
              : undefined
          }
          mode="time"
          text="Hora final"
          onConfirm={(data) => {
            if (data < initialTimeState) {
              console.log("data invalida");
              return false;
            } else {
              setFinalTimeState(data);
              rangeSelectorData({ ...rangeSelector, finalTime: data });
              return true;
            }
          }}
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
