import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DateTimePickerModal, {
  DateTimePickerProps,
} from "react-native-modal-datetime-picker";
import { useState } from "react";

interface Props extends DateTimePickerProps {
  mode: "date" | "time" | "datetime" | undefined;
  text: string;
  onConfirm: (data: Date) => boolean;
}

export default function Picker({ mode, text, onConfirm, ...props }: Props) {
  const [isPickerVisible, setPickerVisibility] = useState(false);
  const [localText, setLocalText] = useState(text);
  const showDatePicker = () => {
    setPickerVisibility(true);
  };

  const hideDatePicker = () => {
    setPickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    console.log("A date has been picked: ", date);
    // setLocalText(
    //   mode === "date" ? date.toLocaleDateString() : date.toLocaleTimeString()
    // );
    // onConfirm(date);

    onConfirm(date) ? setLocalText(
      mode === "date" ? date.toLocaleDateString() : date.toLocaleTimeString()
    ): setLocalText("Inválido");

    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={showDatePicker}>
        <Text style={styles.text}>{localText}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        {...props}
        neutralButton={{label: "Clear", textColor: 'grey'}}
        isVisible={isPickerVisible}
        mode={mode}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32%",
  },
  button: {
    width: "100%",
    borderRadius: 5,
    marginVertical: 5,
    padding: 10,
    backgroundColor: "#e2e8f0",
    color: "#000",
  },
  text: {
    color: "#000",
    fontSize: 16,
    alignSelf: "center",
  },
});
