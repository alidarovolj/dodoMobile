import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Text,
  Button,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  FlatList,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Cart({ navigation }) {
  var [currentOrder, getCurrentOrder] = useState("");
  var [allOrders, getOrder] = useState(null);
  var [numberOfObjects, getNumber] = useState("");
  var [currentUserLog, setCurrentUser] = useState("alidarov");
  async function setCurUser() {
    let res = await AsyncStorage.getItem("someKey");
    setCurrentUser(res);
  }
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
  }
  console.log(currentUserLog);
  setCurUser();
  getOrders();
  return (
    <SafeAreaView>
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
        <Text>{currentUserLog}</Text>
        <Text style={{ fontSize: 18 }}>Корзина</Text>
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
                style={{ width: 100, height: 100 }}
                source={{ uri: item.image }}
              />
              <View>
                <Text style={{ fontSize: 20 }}>{item.title}</Text>
                <Text>{item.price}</Text>
              </View>
            </View>
          )}
        />
        <Button
          onPress={setStatus}
          title="Заказать"
          style={{ width: "100%" }}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "100%",
  },
});
