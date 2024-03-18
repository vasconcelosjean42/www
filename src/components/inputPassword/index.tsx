import { StyleSheet, Text, TextInputProps, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

interface Props extends TextInputProps{
  text: String;
  errorMessage?: string;
}

export default function InputPassword({ text, errorMessage, ...props }: Props) {
  const [inputValue, setInputValue] = useState("");
  const [isHide, setIsHide] = useState(true);
  const isRed = errorMessage ? {...styles.inputArea, borderColor: "#d41515"} : styles.inputArea
  return (
    <View style={isRed}>
      <TextInput
        {...props}
        style={styles.input}
        placeholder={`${text}`}
        value={inputValue}
        onChange={(texto) => setInputValue(texto.nativeEvent.text)}
        secureTextEntry={isHide}
      />
      {/* <TouchableOpacity
        style={styles.icon}
        onPress={() => setIsHide((prevState) => !prevState)}
      >
        <Ionicons
          name={`${isHide ? "eye" : "eye-off"}`}
          color="#000"
          size={25}
        />
      </TouchableOpacity> */}
      {errorMessage && <Text style={{position: "absolute", top: 50, color: "#d41515"}}>{errorMessage}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  inputArea: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10
  },
  input: {
    width: "85%",
    height: 50,
    color: "#000",
    padding: 8,
    fontSize: 18,
  },
  icon: {
    width: "15%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
