import { createStackNavigator } from "@react-navigation/stack";

import Login from "../screens/Login";
import Venda from "../screens/Venda";
import Home from "../screens/Home";
import Cadastro from "../screens/Cadastro";
import Lista from "../screens/Lista";
import ProductProvider from "../contexts/productContext";
import EditarProduto from "../screens/EditarProduto";

const Stack = createStackNavigator();

export default function StackRoutes() {
  return (
    <ProductProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Venda" component={Venda} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Lista" component={Lista} />
        <Stack.Screen name="EditarProduto" component={EditarProduto} />
      </Stack.Navigator>
    </ProductProvider>
  );
}
