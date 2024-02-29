import {
  StyleSheet,
  Text,
  TextInputProps,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

interface Props extends TextInputProps{
  text: String;
  onChangeText?: (text: string) => void;
  errorMessage?: string;
}

export default function Input3({
  text,
  onChangeText,
  errorMessage,
  style,
  ...props
}: Props) {
  const isError = errorMessage ? {...styles.input, borderColor: "#d41515" } : styles.input
  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <TextInput
        {...props}
        style={[isError, style]}
        onChangeText={onChangeText}
      />
      {errorMessage && <Text style={{position: "absolute", top: 70, left: 2, color: "#d41515"}}>{errorMessage}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",

  },
  input: {
    height: 50,
    color: "#000",
    padding: 8,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 5,
  },
});
