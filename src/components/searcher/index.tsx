import {
    StyleSheet,
    Text,
    TextInputProps,
    View,
  } from "react-native";
  import { TextInput } from "react-native-gesture-handler";
import Input2 from "../input/index2";
  
  interface Props extends TextInputProps{
    text?: String;
    onChangeText?: (text: string) => void;
    errorMessage?: string;
  }
  
  export default function Searcher({
    text,
    onChangeText,
    errorMessage,
    style,
    ...props
  }: Props) {
    const isError = errorMessage ? {...styles.input, borderColor: "#d41515" } : styles.input
    return (
      <View style={styles.container}>
        <Input2 text={"Procurar por produto"} onChangeText={onChangeText}/>
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
  