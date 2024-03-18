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
import RangeSelector from "../components/rangeSelector";

interface Props {
  user: string;
  password: string;
}

export default function Historico() {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [rangeSelector, setRangeSelector] = useState<{
    initialDate: Date | undefined;
    finalDate: Date | undefined;
    initialTime: Date | undefined;
    finalTime: Date | undefined;
  }>({
    initialDate: undefined,
    finalDate: undefined,
    initialTime: undefined,
    finalTime: undefined,
  });
  const { sells } = useContext(SellContext) as SellContextType;
  const [searcher, setSearcher] = useState("");
  const [page, setPage] = useState(0);
  const amountPerPage = 10;

  const convertDateToNumber = (date: Date) => {
    return date.toLocaleDateString().split("/").reverse().join("");
  };

  const convertTimeToNumber = (date: Date) => {
    return date.toLocaleTimeString();
  };

  const filteredProducts = rangeSelector
    ? sells
        .filter((sell) => {
          if (rangeSelector.initialDate && rangeSelector.finalDate) {
            return (
              convertDateToNumber(sell.sellDate) >=
                convertDateToNumber(rangeSelector.initialDate) &&
              convertDateToNumber(sell.sellDate) <=
                convertDateToNumber(rangeSelector.finalDate)
            );
          } else if (rangeSelector.initialDate) {
            return (
              convertDateToNumber(sell.sellDate) >=
              convertDateToNumber(rangeSelector.initialDate)
            );
          } else if (rangeSelector.finalDate) {
            return (
              convertDateToNumber(sell.sellDate) <=
              convertDateToNumber(rangeSelector.finalDate)
            );
          }
          return sell;
        })
        .filter((sell) => {
          if (rangeSelector.initialTime && rangeSelector.finalTime) {
            return (
              convertTimeToNumber(sell.sellDate) >=
                convertTimeToNumber(rangeSelector.initialTime) &&
              convertTimeToNumber(sell.sellDate) <=
                convertTimeToNumber(rangeSelector.finalTime)
            );
          } else if (rangeSelector.initialTime) {
            return (
              convertTimeToNumber(sell.sellDate) >=
              convertTimeToNumber(rangeSelector.initialTime)
            );
          } else if (rangeSelector.finalTime) {
            return (
              convertTimeToNumber(sell.sellDate) <=
              convertTimeToNumber(rangeSelector.finalTime)
            );
          }
          return sell;
        })
    : sells;

  useEffect(() => {
    console.log(rangeSelector);
    setPage(0);
  }, [rangeSelector]);

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
        <View style={styles.rangeSelector}>
          <RangeSelector
            rangeSelector={rangeSelector!}
            rangeSelectorData={setRangeSelector}
          />
        </View>
        {/* <Calendar
          markingType="period"
          markedDates={{
            '2024-03-05': {startingDay: true, marked: true, dotColor: 'transparent', color: "#0ea5e9"},
            '2024-03-06': {marked: true, dotColor: 'transparent', color: "#0ea5e9"},
            '2024-03-07': {endingDay: true, marked: true, dotColor: 'transparent', color: "#0ea5e9"},
          }}
        /> */}
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
              data={filteredProducts
                .sort((a, b) => b.sellDate.valueOf() - a.sellDate.valueOf())
                .slice(page * amountPerPage, (page + 1) * amountPerPage)}
              keyExtractor={(product) => String(product.id)}
              renderItem={({ item }) => (
                <SellFlatList key={item.id} item={item} onRemove={() => {}} />
              )}
              style={styles.flatList}
            />
          ) : (
            <Text style={{ fontSize: 18 }}>Nenhuma venda nesse período</Text>
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
    height: "8%",
    paddingLeft: 10,
    justifyContent: "center",
  },
  titleText: {
    fontSize: 22,
    fontWeight: "800",
  },
  rangeSelector: {
    height: "12%",
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
