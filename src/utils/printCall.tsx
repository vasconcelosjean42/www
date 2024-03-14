import { IProduct } from "../@types/product";
import * as Print from "expo-print";
import { ISell } from "../@types/sell";
import logoJMM from "../assets/logo_jmm.png"

interface Props {
  sellProps: ISell;
  isValid: boolean;
}

const printCall = async ({ sellProps, isValid }: Props) => {
  const html = `
    <html>
      <head>
      <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        <style>
          #logo{
            background-image: url('../assets/logo_jmm.png')
          }
          .informacoesPessoais{
            margin: 0
          }
          .descricaoProduto{
            margin: 1px
          }
        </style>
      </head>
      <body style="font-size: 10px; text-align: left; padding: 10px; font-family: Times New Roman, sans-serif;">
        <div>
          <div style="display: flex; flex-direction: row; font-weight: normal;">
            <h1 style="font-size: 12px; font-weight: normal;">
              JMM VENDAS RÁPIDAS
            </h1>
            <p style="justify-self: right; text-align: right"> 26/02/2024\n15:50</p>
            </div>
            <div style="display: flex; flex-direction: column; font-weight: normal;">
              <p class="informacoesPessoais" style="font-weight: bold"> Cliente: ${
                sellProps.buyerName || "n/a"
              }\n </p>
              <p class="informacoesPessoais"> Contato: ${sellProps.buyerNumber || "n/a"} </p>
              <p class="informacoesPessoais"> Tipo de pagamento: ${
                sellProps.typeOfPayment || "Dinheiro"
              } </p>
              <p class="informacoesPessoais"> Venda (n: 1) </p>
            </div>
          <br/>
          <div style="border-style: double; border-width: 4px 0px; display: flex; flex-direction: row; justify-content: space-between">
            <em>Descrição</em>
            <em>Total</em>
          </div>
          <div style="display: flex; flex-direction: column; justify-content: space-between; margin-bottom: 5px">
            ${sellProps.products
              .map(
                ({ amount, name, sellValue, type }) =>
                  "<div style='border-style: dotted; border-width: 0px 0px 2px 0px; display: flex; flex-direction: row; justify-content: space-between'>" +
                  "<div class='descricaoProduto'>" +
                  "<p class='descricaoProduto'>" +
                  name.toString() +
                  "</p>" +
                  "<p class='descricaoProduto'>" +
                  amount.toString() +
                  "(" +
                  type?.toString() +
                  ") X R$ " +
                  (sellValue / amount).toFixed(2).toString() +
                  "</p>" +
                  "</div>" +
                  "<div class='descricaoProduto'>" +
                  "<p class='descricaoProduto'>" +
                  "R$" +
                  sellValue.toFixed(2).toString() +
                  "</p>" +
                  "</div>" +
                  "</div>"
              )
              .toString()
              .replaceAll(",", "")}
            </div>
          <div style="font-size: 14px; border-width: 0px 0px 2px 0px; display: flex; flex-direction: row; justify-content: space-between">
            <em>Total a Pagar</em>
            <em>${"R$" + sellProps.totalPrice.toFixed(2).toString()}</em>
          </div>
        </div>
    </body>
    </html>
    `;
  if (sellProps.paymentValue ? isValid : true) {
    return await Print.printAsync({
      html,
    });
  }
};

export default printCall;
