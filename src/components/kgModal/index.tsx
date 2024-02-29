import { Modal, StyleSheet, Text, View } from "react-native";
import Button from "../button";
import Input from "../input";
import Select from "../select";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Input2 from "../input/index2";

interface KGProps {
  weight: number;
}

interface Props {
  isVisible: boolean;
  setIsVisible: () => void;
  totalPrice: number;
  productName: string;
  onConfirm: (amount: number) => void;
}

export default function KGModal({
  isVisible,
  setIsVisible,
  totalPrice,
  productName,
  onConfirm,
}: Props) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<KGProps>();

  const [select, setSelect] = useState("Dinheiro");
  const [paymentValue, setPaymentValue] = useState(0);
  const [weight, setWeight] = useState(0);
  const change = totalPrice - paymentValue;

  useEffect(() => {
    if (select !== "Dinheiro") setPaymentValue(0);
  }, [select]);

  const onSubmit = (data: KGProps) => {
    setWeight(data.weight);
    onConfirm(data.weight);
    setWeight(0)
  };

  return (
    <Modal animationType="fade" transparent visible={isVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.titulo}>{productName}</Text>
          <Text style={styles.price}>R$ {Number(totalPrice).toFixed(2)}/KG</Text>
          <Controller
            control={control}
            name="weight"
            render={({ field: { onChange } }) => (
              <View style={{ width: "100%", marginTop: 15 }}>
                <Input2
                  text={"Peso em kg"}
                  onChangeText={(text) => {
                    setWeight(Number(text));
                    onChange(text);
                  }}
                  autoFocus
                  keyboardType="numeric"
                />
              </View>
            )}
          />
          <Text style={{marginBottom: 15, fontSize: 18}}>
            {weight !== 0 ? `Preço: R$ ${(totalPrice * weight).toFixed(2)}` : ""}
          </Text>

          <View style={styles.buttons}>
            <View style={{ width: "45%" }}>
              <Button
                text={"Cancelar"}
                onPress={() => {
                  reset();
                  setSelect("Dinheiro");
                  setIsVisible();
                }}
              />
            </View>
            <View style={{ width: "45%" }}>
              <Button
                text={"Confirmar"}
                onPress={handleSubmit(onSubmit)}
                disabled={weight === 0}
              />
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
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    fontWeight: "500",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
