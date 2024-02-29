import { Modal, StyleSheet, Text, View } from "react-native";
import Button from "../button";
import Input from "../input";
import Select from "../select";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as Print from "expo-print";

import { ItemProps } from "../../screens/Venda";
import { TextInputMask } from "react-native-masked-text";

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
  items: ItemProps[];
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
    formState: { errors, isValid },
  } = useForm<SellProps>();

  const [select, setSelect] = useState("Dinheiro");
  const [paymentValue, setPaymentValue] = useState(0);
  const change = totalPrice - paymentValue;

  useEffect(() => {
    if (select !== "Dinheiro") setPaymentValue(0);
  }, [select]);

  const onSubmit = async (data: SellProps) => {
    const html = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
      </head>
      <body style="font-size: 30px; text-align: left; padding: 80px 40px">
        <div>
        <div style="display: flex; flex-direction: row; font-family: Helvetica Neue; font-weight: normal;">
          <h1 style="font-size: 40px; font-family: Helvetica Neue; font-weight: normal;">
            JMM VENDAS RÁPIDAS
          </h1>
          <p style="justify-self: right; text-align: right"> 26/02/2024\n15:50</p>
          </div>
          <div style="display: flex; flex-direction: column; font-family: Helvetica Neue; font-weight: normal;">
            <p style="font-weight: bold"> Cliente: ${
              getValues("name") || "n/a"
            }\n </p>
            <p> Contato: ${getValues("number") || "n/a"} </p>
            <p> Tipo de pagamento: ${
              getValues("paymentType") || "Dinheiro"
            } </p>
            <p> Venda (n: 1) </p>
          </div>
          <br/>
          <div style="border-style: double; border-width: 4px 0px; display: flex; flex-direction: row; justify-content: space-between">
            <em>Descrição/QuantidadeXUnitário</em>
            <em>Total</em>
          </div>
          <div style="display: flex; flex-direction: column; justify-content: space-between">
          ${items
            .map(
              ({ amount, name, price, type }) =>
                "<div style='border-style: dotted; border-width: 0px 0px 2px 0px; display: flex; flex-direction: row; justify-content: space-between'>" +
                "<div>" +
                "<p>" +
                name.toString() +
                "</p>" +
                "<p>" +
                amount.toString() +
                "(" +
                type?.toString() +
                ") X R$ " +
                (price / amount).toFixed(2).toString() +
                "</p>" +
                "</div>" +
                "<div>" +
                "<p>" +
                "R$" +
                price.toFixed(2).toString() +
                "</p>" +
                "</div>" +
                "</div>"
            )
            .toString()
            .replaceAll(",", "")}
          <div style="border-width: 0px 0px 2px 0px; display: flex; flex-direction: row; justify-content: space-between">
            <em>Total a Pagar</em>
            <em>${
              "R$" +
              items
                .reduce((prev, curr) => Number(prev) + Number(curr.price), 0)
                .toFixed(2)
            }</em>
          </div>
        </div>
    </body>
    </html>
    `;
    if (isValid)
      await Print.printAsync({
        html,
      }).catch((err) => console.log(err));
    onConfirm();
  };

  return (
    <Modal animationType="fade" transparent visible={isVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange } }) => (
              <Input text={"Nome"} onChangeText={onChange} />
            )}
          />
          <Controller
            control={control}
            name="number"
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
            name="paymentType"
            render={({ field: { value, onChange } }) => (
              <Select
                data={["Dinheiro", "Pix", "Débito", "Crédito"]}
                onSelect={(e) => {
                  setSelect(e);
                  onChange(e);
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
