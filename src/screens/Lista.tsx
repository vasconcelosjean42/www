import {
  Alert,
  BackHandler,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../contexts/productContext";
import { ProductContextType } from "../@types/product";
import ProductFlatList from "../components/productFlatList";
import Searcher from "../components/searcher";
import ManualPagination from "../components/manualPagination";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

interface Props {
  user: string;
  password: string;
}

export default function Lista() {
  const { products, removeProduct } = useContext(
    ProductContext
  ) as ProductContextType;
  const [searcher, setSearcher] = useState("");
  const [page, setPage] = useState(0);
  const amountPerPage = 15;
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const filteredProducts = products.filter((product) =>
    product.name
      .toLocaleLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .includes(searcher.toLocaleLowerCase())
  );

  const handleSearchProduct = (product: string) => {
    setSearcher(product);
  };

  const handleChangePage = (value: number) => {
    setPage(value);
  };

  const handleDelete = (code: string) => {
    Alert.alert(
      "Remover produto da lista",
      "Você deseja mesmo retirar esse produto da lista?",
      [
        {
          text: "Não retirar",
          onPress: () => console.log("Item não removido da lista"),
          style: "destructive",
        },
        {
          text: "Sim, desejo retirar",
          onPress: () => removeProduct(code),
          style: "default",
        },
      ]
    );
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      navigation.navigate("Home");
      return true;
    });
  }, []);
  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <View style={styles.content}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Lista de produto</Text>
        </View>
        <View style={styles.searcher}>
          <Searcher
            onChangeText={(text: string) => {
              setPage(0);
              handleSearchProduct(text);
            }}
          />
        </View>
        <View style={styles.flatlistContent}>
          {filteredProducts.length !== 0 ? (
            <FlatList
              data={filteredProducts
                .slice(page * amountPerPage, (page + 1) * amountPerPage)
                .sort((a, b) => a.name.localeCompare(b.name))}
              keyExtractor={(product) => String(product.id)}
              renderItem={({ item }) => (
                <ProductFlatList item={item} onRemove={handleDelete} />
              )}
              style={styles.flatList}
            />
          ) : (
            <Text>Nenhum produto encontrado com esse nome</Text>
          )}
        </View>
        <View style={styles.pagination}>
          <ManualPagination
            paginationAmount={
              filteredProducts.length !== 0
                ? Math.ceil(filteredProducts.length / amountPerPage)
                : 1
            }
            page={page}
            onPress={handleChangePage}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#fff",
  },
  content: {
    width: "100%",
    height: "100%",
  },
  title: {
    height: "10%",
    marginLeft: 10,
    justifyContent: 'center'
  },
  titleText: {
    fontSize: 22,
    fontWeight: "800",
  },
  searcher: {
    width: "90%",
    height: "10%",
    justifyContent: "center",
    alignSelf: "center",
  },
  flatlistContent: {
    width: Dimensions.get("window").width,
    height: "70%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 220,
    height: 100,
  },
  button: {},
  flatList: {
    width: "100%",
  },
  pagination: {
    width: "100%",
    height: "10%",
  },
});
