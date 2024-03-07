import { Modal, SafeAreaViewBase, StyleSheet, Text, View } from "react-native";
import Button from "../button";
import Input from "../input";
import Select from "../select";
import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as Print from "expo-print";
import { TextInputMask } from "react-native-masked-text";
import { IProduct } from "../../@types/product";
import { SellContext } from "../../contexts/sellContext";
import { ISell, SellContextType } from "../../@types/sell";
import printCall from "../../utils/printCall";

interface SellProps {
  buyerName: string,
  buyerNumber: string,
  paymentValue: number,
  typeOfPayment: string,
}

interface Props {
  isVisible: boolean;
  setIsVisible: () => void;
  totalPrice: number;
  items: IProduct[];
  onConfirm: () => void;
}

export default function SellModal({
  isVisible,
  setIsVisible,
  totalPrice,
  items,
  onConfirm,
}: Props) {
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<SellProps>();
  const {sells, saveSell} = useContext(SellContext) as SellContextType
  const [select, setSelect] = useState("Dinheiro");
  const [paymentValue, setPaymentValue] = useState(0);
  const change = totalPrice - paymentValue;

  useEffect(() => {
    if (select !== "Dinheiro") setPaymentValue(0);
  }, [select]);

  const onSubmit = async (data: SellProps) => {
    const sellProps = {
      ...data,
      products: items,
      totalPrice,
      sellDate: new Date()
    }
    printCall({sellProps, isValid})
        .then(() => {
          onConfirm();
          setSelect("Dinheiro")
          saveSell(sellProps)
        })
        .catch((err) => console.log(err));
    }

  return (
    <Modal animationType="fade" transparent visible={isVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Controller
            control={control}
            name="buyerName"
            render={({ field: { onChange } }) => (
              <Input text={"Nome"} onChangeText={onChange} />
            )}
          />
          <Controller
            control={control}
            name="buyerNumber"
            defaultValue=""
            render={({ field: { value, onChange } }) => (
              <TextInputMask
                style={{
                  height: 50,
                  color: "#000",
                  padding: 8,
                  fontSize: 18,
                  borderWidth: 1,
                  borderRadius: 5,
                }}
                type="cel-phone"
                options={{ maskType: "BRL", withDDD: true, dddMask: "(99) " }}
                value={value}
                onChangeText={onChange}
                maxLength={15}
                placeholder="Telefone"
              />
            )}
          />
          <Controller
            control={control}
            name="typeOfPayment"
            render={({ field: { value, onChange } }) => (
              <Select
                data={["Dinheiro", "Pix", "Débito", "Crédito"]}
                onSelect={(e) => {
                  setSelect(e);
                  onChange(e);
                  clearErrors();
                }}
                value={"Dinheiro"}
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
                  keyboardType="numeric"
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
                  setPaymentValue(0);
                  reset();
                  setSelect("Dinheiro");
                  setIsVisible();
                }}
              />
            </View>
            <View style={{ width: "45%" }}>
              <Button
                text={"Confirmar"}
                onPress={() => {
                  handleSubmit(onSubmit)();
                  setPaymentValue(0);
                }}
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
