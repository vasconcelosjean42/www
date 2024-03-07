import {
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
import ManualPagination from "../components/manualPagination";
import { SellContext } from "../contexts/sellContext";
import { SellContextType } from "../@types/sell";
import SellFlatList from "../components/sellFlatList";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Calendar } from "react-native-calendars";

interface Props {
  user: string;
  password: string;
}

export default function Historico() {
  const { sells } = useContext(SellContext) as SellContextType;
  const [searcher, setSearcher] = useState("");
  const [page, setPage] = useState(0);
  const amountPerPage = 15;
  const filteredProducts = sells.filter((sell) =>
    sell.buyerName
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

  // const handleDelete = (code: string) => {
  //   Alert.alert(
  //     "Remover produto da lista",
  //     "Você deseja mesmo retirar esse produto da lista?",
  //     [
  //       {
  //         text: "Não retirar",
  //         onPress: () => console.log("Item não removido da lista"),
  //         style: "destructive",
  //       },
  //       {
  //         text: "Sim, desejo retirar",
  //         onPress: () => removeProduct(code),
  //         style: "default",
  //       },
  //     ]
  //   );
  // };
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      navigation.goBack();
      return true;
    });
  }, []);

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <View style={styles.content}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Historico de vendas</Text>
        </View>
        <Calendar
          markingType="period"
          markedDates={{
            '2024-03-05': {startingDay: true, marked: true, dotColor: 'transparent', color: "#0ea5e9"},
            '2024-03-06': {marked: true, dotColor: 'transparent', color: "#0ea5e9"},
            '2024-03-07': {endingDay: true, marked: true, dotColor: 'transparent', color: "#0ea5e9"},
          }}
        />
        {/* <View style={styles.searcher}>
            <Searcher
              onChangeText={(text: string) => {
                setPage(0);
                handleSearchProduct(text);
              }}
            />
          </View> */}
        <View style={styles.flatlistContent}>
          {filteredProducts.length !== 0 ? (
            <FlatList
              data={sells.sort((a, b) =>
                a.sellDate.toString().localeCompare(b.sellDate.toString())
              ).reverse()}
              keyExtractor={(product) => String(product.id)}
              renderItem={({ item }) => (
                <SellFlatList key={item.id} item={item} onRemove={() => {}} />
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
    justifyContent: "center",
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
    height: "80%",
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
