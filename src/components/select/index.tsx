import { StyleSheet } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

interface Props {
  data: string[] | number[];
  onSelect?: (event: any) => void
}

export default function Select({ data, onSelect }: Props) {
  return (
    <SelectDropdown
      defaultValue={data[0]}
      defaultButtonText="Forma de pagamento"
      buttonStyle={styles.button}
      rowStyle={styles.row}
      dropdownStyle={styles.dropdown}
      data={data}
      onSelect={onSelect!}
    ></SelectDropdown>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderRadius: 5,
    marginVertical: 20,
  },
  row: {
    width: "100%",
    height: 50,
  },
  dropdown: {
    borderRadius: 5,
  }
});
