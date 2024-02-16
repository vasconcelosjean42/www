import { useEffect, useRef } from "react";
import { StyleSheet, Text, TextInputProps, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

interface Props extends TextInputProps {
  text: String;
  width?: number;
  onChangeText?: (text: string) => void;
  errorMessage?: string;
  setFocus?: () => void;
}

export default function Input({
  text,
  width,
  onChangeText,
  errorMessage,
  setFocus,
  ...props
}: Props) {
  const isFlex = width ? { ...styles.inputArea, flex: 1 } : styles.inputArea;
  const isRed = errorMessage ? { ...isFlex, borderColor: "#d41515" } : isFlex;
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [onChangeText]);

  return (
    <View style={errorMessage ? isRed : isFlex}>
      <TextInput
        {...props}
        style={styles.input}
        placeholder={`${text}`}
        onChangeText={onChangeText}
        ref={inputRef}
      />
      {errorMessage && (
        <Text style={{ position: "absolute", top: 50, color: "#d41515" }}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  inputArea: {
    flex: 0,
    height: 50,
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#000",
    alignItems: "center",
    marginVertical: 20,
  },
  input: {
    width: "100%",
    height: 50,
    color: "#000",
    padding: 8,
    fontSize: 18,
  },
});
