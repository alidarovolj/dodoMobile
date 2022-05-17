import axios from "axios";
import React, { useState } from "react";
import {
  Text,
  Button,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  FlatList,
  Pressable
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App({ route, navigation }) {
  var [currentUserLog, setCurrentUser] = useState("");
  var getIngridient = []
  const loadScene = () => {
    navigation.goBack();
  };
  const login = async () => {
    let a = String(await AsyncStorage.getItem("someKey"));
    setCurrentUser(a);
    console.log(currentUserLog);
  };
  login();
  const order = {
    title: route.params.title,
    price: route.params.price,
    options: [],
    image: route.params.images[1],
  };
  var price = route.params.price;
  var res = {
    goods: [order],
    user_login: currentUserLog,
    price: price,
    status: false,
  };
  var result = null;
  var setItem = null;
  var finalPrice = 0;
  var totalIngridient = 0;
  function sendIngridient(obj) {
    getIngridient.push(obj)
    totalIngridient = totalIngridient + parseInt(obj.price)
    console.log(totalIngridient)
  }
  async function sendOrder() {
    console.log(currentUserLog);
    var prevZakaz = await axios.get(
      "https://6279ea5773bad506857f53b2.mockapi.io/api/orders"
    );
    var prevZakazData = prevZakaz.data;
    var itemID = null;
    if (prevZakazData.length <= 0) {
      await axios.post(
        "https://6279ea5773bad506857f53b2.mockapi.io/api/orders",
        res
      );
      console.log("1");
    } else {
      prevZakazData.forEach(async (item) => {
        if (item.user_login == currentUserLog && item.status === false) {
          item.goods.forEach((element) => {
            finalPrice = finalPrice + parseInt(element.price);
          });
          setItem = {
            title: route.params.title,
            price: parseInt(route.params.price) + totalIngridient,
            options: [],
            image: route.params.images[1],
            ingridients: getIngridient
          };
          item.price = finalPrice + parseInt(setItem.price);
          item.goods.push(setItem);
          itemID = item.id;
          result = item;
          await axios.put(
            "https://6279ea5773bad506857f53b2.mockapi.io/api/orders/" + itemID,
            result
          );
          console.log("2");
        }
      });
    }
  }
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View
            style={{
              paddingTop: 30,
              paddingBottom: 30,
              paddingLeft: 10,
              paddingRight: 10,
            }}
          >
            <Text
              style={{
                elevation: 3,
                backgroundColor: "white",
                padding: 10,
                borderRadius: "100%",
                position: "absolute",
                zIndex: 10,
                left: 10,
                top: 10,
              }}
              onPress={loadScene}
            >
              <FontAwesome
                style={{
                  fontSize: 20,
                }}
                name="chevron-down"
              />
            </Text>
            <Image
              style={{ width: null, minHeight: 350 }}
              source={{ uri: route.params.images[0] }}
            />
            <View
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                backdropFilter: "blur(20px)",
              }}
            >
              <Text style={{ fontSize: 24, marginBottom: 20 }}>
                {route.params.title}
              </Text>
              <Button onPress={sendOrder} title="Отправить заказ" />
              <FlatList
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
                data={route.params.ingridients}
                renderItem={({ item }) => (
                  <Pressable onPress={ sendIngridient.bind(this, item) }>
                    <View
                      style={{
                        width: "100%",
                        padding: 8,
                        boxShadow: "rgba(6, 5, 50, 0.12) 0px 4px 20px",
                        borderRadius: 12,
                      }}
                    >
                      <Image
                        style={{ width: null, minHeight: 90 }}
                        source={{
                          uri: item.image,
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 12,
                          textAlign: "center",
                          marginBottom: 10,
                          height: 32,
                        }}
                      >
                        Сырный бортик
                      </Text>
                      <Text style={{ textAlign: "center", fontWeight: 500 }}>
                        800тг.
                      </Text>
                    </View>
                  </Pressable>
                )}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "100%",
  },
});
