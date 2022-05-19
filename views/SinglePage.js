import axios from "axios";
import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  FlatList,
  Pressable,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useCookies, Cookies } from "react-cookie";

export default function App({ route, navigation }) {
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);
  var [currentUserLog, setCurrentUser] = useState(cookies.loggedIn);
  var getIngridient = [];
  const loadScene = () => {
    navigation.goBack();
  };
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
    getIngridient.push(obj);
    totalIngridient = totalIngridient + parseInt(obj.price);
    console.log(totalIngridient);
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
            ingridients: getIngridient,
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
    <View style={{ paddingTop: 50, backgroundColor: "white" }}>
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
            style={{ width: null, minHeight: 300 }}
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
            <Pressable onPress={sendOrder}>
              <View
                style={{
                  backgroundColor: "rgb(255, 105, 0)",
                  width: "100%",
                  padding: 10,
                  marginBottom: 30,
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{ color: "white", textAlign: "center", fontSize: 20 }}
                >
                  Отправить заказ
                </Text>
              </View>
            </Pressable>
            <FlatList
              horizontal={true}
              style={{
                width: "100%",
                padding: 5
              }}
              contentContainerStyle={{
                display: "flex",
                justifyContent: "space-between",
                flexGrow: 1,
              }}
              data={route.params.ingridients}
              renderItem={({ item }) => (
                <Pressable onPress={sendIngridient.bind(this, item)}>
                  <View
                    style={{
                      width: "100%",
                      padding: 8,
                      marginRight: 5,
                      backgroundColor: '#fff',
                      shadowColor: "#171717",
                      shadowOffset: { width: -2, height: 4 },
                      shadowOpacity: 0.2,
                      shadowRadius: 3,
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: "#fdfdfd",
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
                    <Text style={{ textAlign: "center" }}>800тг.</Text>
                  </View>
                </Pressable>
              )}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "100%",
  },
});
