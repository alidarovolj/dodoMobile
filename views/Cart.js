import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  FlatList,
  Pressable,
} from "react-native";
import { useCookies, Cookies } from "react-cookie";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function Cart({ navigation }) {
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);
  var [currentOrder, getCurrentOrder] = useState("");
  var [allOrders, getOrder] = useState(null);
  var [numberOfObjects, getNumber] = useState("");
  var [currentUserLog, setCurrentUser] = useState(cookies.loggedIn);
  var res = {
    goods: [],
    user_login: currentUserLog,
    price: 0,
    status: false,
  };
  const loadScene = () => {
    navigation.goBack();
  };
  async function getOrders() {
    useEffect(() => {
      async function getAllOrders() {
        let res = await axios.get(
          "https://6279ea5773bad506857f53b2.mockapi.io/api/orders"
        );
        let newOrders = res.data;
        newOrders.forEach(async (element) => {
          if (element.user_login == currentUserLog && element.status == false) {
            getCurrentOrder((currentOrder = element));
            getNumber(currentOrder.goods.length);
            console.log(currentOrder);
          } else {
            console.log("не работает");
          }
        });
        getOrder((allOrders = newOrders));
      }
      getAllOrders();
    }, []);
    console.log(currentUserLog);
  }
  async function setStatus() {
    let result = currentOrder;
    result.status = true;
    let itemID = currentOrder.id;
    console.log(result);
    await axios.put(
      "https://6279ea5773bad506857f53b2.mockapi.io/api/orders/" + itemID,
      result
    );
    await axios.post(
      "https://6279ea5773bad506857f53b2.mockapi.io/api/orders",
      res
    );
  }
  console.log(currentUserLog);
  getOrders();
  return (
    <View style={{ paddingTop: 50, flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          width: "100%",
          height: 50,
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          backgroundColor: "#fff",
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
        <Text style={{ fontSize: 18, textAlign: "center" }}>Корзина</Text>
      </View>
      <View style={{ width: "100%", backgroundColor: "#fff", padding: 16 }}>
        <Text style={{ fontSize: 24, marginBottom: 20 }}>
          {numberOfObjects} товар(ов) на {currentOrder.price} тг
        </Text>
        <FlatList
          style={{ width: "100%" }}
          data={currentOrder.goods}
          renderItem={({ item }) => (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              <Image
                style={{ width: 100, height: 100, marginRight: 15 }}
                source={{ uri: item.image }}
              />
              <View>
                <Text style={{ fontSize: 20 }}>{item.title}</Text>
                <Text>{item.price}</Text>
              </View>
            </View>
          )}
        />
        <Pressable onPress={setStatus}>
          <View
            style={{
              backgroundColor: "rgb(255, 105, 0)",
              width: "100%",
              padding: 10,
              marginBottom: 30,
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "white", textAlign: "center", fontSize: 20 }}>
              Отправить заказ
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}