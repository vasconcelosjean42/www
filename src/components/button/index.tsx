import { GestureResponderEvent, StyleProp, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, ViewStyle } from "react-native";

interface Props extends TouchableOpacityProps{
    text: String
    width?: number
    onPress?: (event: GestureResponderEvent) => void
}

export default function Button({text, width, onPress, style, ...props}: Props) {
  const s = style ? style as StyleProp<ViewStyle> : {backgroundColor: "#19a4d9"}
  return (
    <TouchableOpacity
      {...props}
      style={[s, styles.button]}
      onPress={onPress}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 50,
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    color: "#fff",
  }
});
