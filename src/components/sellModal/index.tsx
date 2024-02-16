import { Modal, StyleSheet, Text, View } from "react-native";
import Button from "../button";
import Input from "../input";
import Select from "../select";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

interface SellProps {
  name: string;
  number: string;
  paymentType: string;
  paymentValue: number;
}

interface Props {
  isVisible: boolean;
  setIsVisible: () => void;
  totalPrice: number;
}

export default function SellModal({
  isVisible,
  setIsVisible,
  totalPrice,
}: Props) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SellProps>();

  const [select, setSelect] = useState("Dinheiro");
  const [paymentValue, setPaymentValue] = useState(0);
  const change = totalPrice - paymentValue;

  useEffect(() => {
    if (select !== "Dinheiro") setPaymentValue(0);
  }, [select]);

  const onSubmit = (data: SellProps) => {
    console.log(data);
  };

  return (
    <Modal animationType="fade" transparent visible={isVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange } }) => (
              <Input
                text={"Nome"}
                onChangeText={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="number"
            defaultValue=""
            render={({ field: { onChange } }) => (
              <Input text={"Telefone"} onChangeText={onChange} />
            )}
          />
          <Controller
            control={control}
            name="paymentType"
            render={({ field: { onChange } }) => (
              <Select
                data={["Dinheiro", "Pix", "Débito", "Crédito"]}
                onSelect={(e) => {
                  setSelect(e);
                  onChange(e);
                }}
              />
            )}
          />
          {select === "Dinheiro" && (
            <Controller
              control={control}
              name="paymentValue"
              defaultValue={0}
              rules={{
                min: {
                  value: totalPrice,
                  message: `O valor minimo é ${totalPrice}`,
                },
              }}
              render={({ field: { onChange } }) => (
                <Input
                  text={"Valor"}
                  onChangeText={(e) => {
                    setPaymentValue(Number(e));
                    onChange(e);
                  }}
                  errorMessage={errors.paymentValue?.message}
                />
              )}
            />
          )}
          {paymentValue !== 0 && change < 0 && (
            <Text>Troco: R$ {Math.abs(change).toFixed(2)}</Text>
          )}
          <View style={styles.buttons}>
            <View style={{ width: "45%" }}>
              <Button
                text={"Cancelar"}
                onPress={() => {
                  reset()
                  setSelect("Dinheiro")
                  setIsVisible();
                }}
              />
            </View>
            <View style={{ width: "45%" }}>
              <Button text={"Confirmar"} onPress={handleSubmit(onSubmit)} />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#cbd5e1",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    width: 300,
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 10,
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
