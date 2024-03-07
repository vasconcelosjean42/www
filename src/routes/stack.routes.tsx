import { createStackNavigator } from "@react-navigation/stack";

import Login from "../screens/Login";
import Venda from "../screens/Venda";
import Home from "../screens/Home";
import Cadastro from "../screens/Cadastro";
import Lista from "../screens/Lista";
import ProductProvider from "../contexts/productContext";
import EditarProduto from "../screens/EditarProduto";
import Historico from "../screens/Historico";
import SellProvider from "../contexts/sellContext";

type MyStackParamList = {
  Login: undefined;
  Home: undefined;
  Venda: undefined;
  Historico: undefined;
  Cadastro: undefined;
  Lista: undefined;
  EditarProduto: { id: string };
};

const Stack = createStackNavigator<MyStackParamList>();

export default function StackRoutes() {
  return (
    <ProductProvider>
      <SellProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Venda" component={Venda} />
          <Stack.Screen name="Historico" component={Historico} />
          <Stack.Screen name="Cadastro" component={Cadastro} />
          <Stack.Screen name="Lista" component={Lista} />
          <Stack.Screen
            name="EditarProduto"
            component={EditarProduto}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </SellProvider>
    </ProductProvider>
  );
}
