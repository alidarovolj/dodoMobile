import React, { useState, useEffect } from "react";
import axios from "axios";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  StyleSheet,
  Button,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  FlatList,
  Image,
  TouchableHighlight,
  Pressable,
  Modal,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCookies, Cookies } from "react-cookie";

export default function Main({ navigation }) {
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);
  var [allProducts, getProduct] = useState(null);
  var [searchFilter, setSearchFilter] = useState("");
  var [allOrders, getOrder] = useState("");
  var [fullLogin, getLogin] = useState("");
  var [fullPhone, getPhone] = useState("");
  var [currentUserLog, setCurrentUser] = useState("");
  var [currentOrder, getCurrentOrder] = useState("");
  var [numberOfObjects, getNumber] = useState("");
  var [fullPassword, getPassword] = useState("");
  var [loginLogin, getLoginName] = useState("");
  var [loginPassword, getPasswordName] = useState("");
  var [allUsers, getUser] = useState("");
  var [modalVisible, setModalVisible] = useState(false);
  var [modalSearchVisible, setModalSearchVisible] = useState(false);
  function getProducts() {
    useEffect(() => {
      async function getAllProducts() {
        let res = await axios.get(
          "https://6279ea5773bad506857f53b2.mockapi.io/api/goods"
        );
        let newProducts = res.data;
        getProduct(newProducts);
      }
      getAllProducts();
    }, []);
  }
  function getOrders() {
    useEffect(() => {
      async function getAllOrders() {
        let res = await axios.get(
          "https://6279ea5773bad506857f53b2.mockapi.io/api/orders"
        );
        let newOrders = res.data;
        newOrders.forEach((element) => {
          if (element.user_login == currentUserLog && element.status == false) {
            getCurrentOrder((currentOrder = element));
            getNumber(currentOrder.goods.length);
          }
        });
        getOrder((allOrders = newOrders));
      }
      getAllOrders();
    }, []);
  }
  function getUsers() {
    useEffect(() => {
      async function getAllUsers() {
        let res = await axios.get(
          "https://6279ea5773bad506857f53b2.mockapi.io/api/users"
        );
        let newUsers = res.data;
        getUser((allUsers = newUsers));
      }
      getAllUsers();
    }, []);
  }
  function onChangeSearch(res) {
    let filteredData = allProducts.filter((x) =>
      x.title.toLowerCase().includes(res)
    );
    setSearchFilter(filteredData);
    // allProducts.forEach(prod => {
    //   if(prod.includes(res)) {
    //     console.log(prod)
    //   }
    // });
    console.log(filteredData);
  }
  async function sendUser() {
    await axios.post("https://6279ea5773bad506857f53b2.mockapi.io/api/users", {
      login: fullLogin,
      phone: fullPhone,
      password: fullPassword,
    });
  }
  // function login() {
  // allUsers?.forEach((item) => {
  //   if (item.login === loginLogin && item.password === loginPassword) {
  //     console.log("совпадают");
  //     async () => {
  //       try {
  //         await AsyncStorage.setItem("loggedInLogin", item.login);
  //         let getIt = await AsyncStorage.getItem("loggedInLogin");
  //         setCurrentUser(currentUserLog = getIt)
  //       } catch (e) {
  //         console.log(e)
  //       }
  //     };
  //   } else {
  //     console.log("Данные не совпадают");
  //   }
  // });
  // }
  const saveValue = () => {
    // await AsyncStorage.setItem("someKey", loginLogin);
    // getOrders();
    setCookie("loggedIn", loginLogin);
  };
  const showValue = async () => {
    let a = String(await AsyncStorage.getItem("someKey"));
    setCurrentUser(a);
  };
  getProducts();
  getUsers();
  return (
    <SafeAreaView style={{ height: "100%" }}>
      <View style={styles.container}>
        <Modal
          style={{ flex: 1, backgroundColor: "#fff" }}
          animationType="slide"
          // transparent={true}
          visible={modalSearchVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalSearchVisible(!modalVisible);
          }}
        >
          <SafeAreaView style={{ height: "100%" }}>
            <View style={{ padding: 15 }}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 30,
                }}
              >
                <TextInput
                  style={{
                    backgroundColor: "gray",
                    padding: 5,
                    borderRadius: 8,
                    width: "100%",
                  }}
                  onChangeText={(e) => onChangeSearch(e)}
                />
                <Text
                  style={{ marginLeft: 10 }}
                  onPress={() => setModalSearchVisible(false)}
                >
                  Отменить
                </Text>
              </View>
              <Pressable onPress={() => setModalSearchVisible(false)}>
                <FlatList
                  style={{ width: "100%", marginBottom: 100 }}
                  data={searchFilter}
                  renderItem={({ item }) => (
                    <Pressable onPress={() => setModalSearchVisible(false)}>
                      <Pressable
                        onPress={() => navigation.navigate("SinglePage", item)}
                      >
                        <View
                          style={{
                            width: "100%",
                            height: 170,
                            padding: 15,
                            borderBottom: "1px solid rgb(245, 245, 248)",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Image
                            style={{ width: "40%", height: 120 }}
                            source={{ uri: item.images[0] }}
                          />
                          <View style={{ width: "60%", paddingLeft: 5 }}>
                            <Text
                              style={{ fontWeight: "600", marginBottom: 8 }}
                            >
                              {item.title}
                            </Text>
                            <Text>{item.desc}</Text>
                            <Text
                              style={{
                                backgroundColor: "#ffefe5",
                                color: "#de813f",
                                paddingTop: 5,
                                paddingBottom: 5,
                                paddingRight: 10,
                                paddingLeft: 10,
                                fontSize: 18,
                                borderRadius: 15,
                                marginTop: 10,
                              }}
                            >
                              от {item.price}т
                            </Text>
                          </View>
                        </View>
                      </Pressable>
                    </Pressable>
                  )}
                />
              </Pressable>
            </View>
          </SafeAreaView>
        </Modal>
        <Modal
          style={{ flex: 1, backgroundColor: "#fff" }}
          animationType="slide"
          // transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <SafeAreaView>
            <View
              style={{
                padding: 10,
                backgroundColor: "rgb(243, 243, 247)",
              }}
            >
              <Text
                style={{
                  padding: 10,
                  borderRadius: 999,
                }}
                onPress={() => setModalVisible((modalVisible = false))}
              >
                <FontAwesome
                  style={{
                    fontSize: 20,
                  }}
                  name="chevron-left"
                />
              </Text>
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 24,
                    fontWeight: "700",
                    marginBottom: 10,
                  }}
                >
                  Регистрация
                </Text>
                <Text
                  onPress={showValue()}
                  style={{
                    fontSize: 19,
                    fontWeight: "400",
                    marginBottom: 10,
                  }}
                >
                  Логин
                </Text>
                <TextInput
                  onChangeText={(e) => getLogin((fullLogin = e))}
                  style={{
                    backgroundColor: "white",
                    padding: 5,
                    borderRadius: 8,
                    marginBottom: 10,
                  }}
                  placeholder="Укажите логин"
                />
                <Text
                  style={{
                    fontSize: 19,
                    fontWeight: "400",
                    marginBottom: 10,
                  }}
                >
                  Телефон
                </Text>
                <TextInput
                  onChangeText={(e) => getPhone((fullPhone = e))}
                  style={{
                    backgroundColor: "white",
                    padding: 5,
                    borderRadius: 8,
                    marginBottom: 10,
                  }}
                  placeholder="Укажите телефон"
                />
                <Text
                  style={{
                    fontSize: 19,
                    fontWeight: "400",
                    marginBottom: 10,
                  }}
                >
                  Пароль
                </Text>
                <TextInput
                  onChangeText={(e) => getPassword((fullPassword = e))}
                  style={{
                    backgroundColor: "white",
                    padding: 5,
                    borderRadius: 8,
                    marginBottom: 10,
                  }}
                  placeholder="Укажите пароль"
                />
                <Button
                  title="Отправить"
                  onPress={sendUser}
                  style={{
                    width: "100%",
                    backgroundColor: "rgb(255, 105, 0)",
                    borderRadius: 100,
                  }}
                />
              </View>
            </View>
            <Text>{cookies.loggedIn}</Text>
            <View
              style={{
                padding: 10,
                backgroundColor: "rgb(243, 243, 247)",
              }}
            >
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 24,
                    fontWeight: "700",
                    marginBottom: 20,
                  }}
                >
                  Войти
                </Text>
                <Text
                  style={{
                    fontSize: 19,
                    fontWeight: "400",
                    marginBottom: 10,
                  }}
                >
                  Логин
                </Text>
                <TextInput
                  onChangeText={(e) => getLoginName((loginLogin = e))}
                  style={{
                    backgroundColor: "white",
                    padding: 5,
                    borderRadius: 8,
                    marginBottom: 10,
                  }}
                  placeholder="Укажите логин"
                />
                <Text
                  style={{
                    fontSize: 19,
                    fontWeight: "400",
                    marginBottom: 10,
                  }}
                >
                  Пароль
                </Text>
                <TextInput
                  onChangeText={(e) => getPasswordName((loginPassword = e))}
                  style={{
                    backgroundColor: "white",
                    padding: 5,
                    borderRadius: 8,
                    marginBottom: 10,
                  }}
                  placeholder="Укажите пароль"
                />
                <Button
                  title="Отправить"
                  onPress={saveValue}
                  style={{
                    width: "100%",
                    backgroundColor: "rgb(255, 105, 0)",
                    borderRadius: 100,
                  }}
                />
              </View>
            </View>
          </SafeAreaView>
        </Modal>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            padding: 15,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 22, fontWeight: "600", marginRight: 7 }}>
              {/* Алматы */}
              {<Text>{cookies.loggedIn}</Text>}
            </Text>
            <FontAwesome name="chevron-down" />
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Pressable onPress={() => setModalSearchVisible(true)}>
              <FontAwesome style={{ fontSize: 20 }} name="search" />
            </Pressable>
            <View style={{ textAlign: "center", marginLeft: 10 }}>
              <Pressable onPress={() => setModalVisible(true)}>
                <FontAwesome style={{ fontSize: 20 }} name="user" />
              </Pressable>
              <Text style={{ color: "#000" }}>
                {<Text>{cookies.loggedIn}</Text>}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ padding: 15, width: "100%" }}>
          <View
            style={{
              backgroundColor: "#f5f5f8",
              padding: 5,
              borderRadius: 10,
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                width: "50%",
                textAlign: "center",
                paddingTop: 5,
                paddingBottom: 5,
                fontSize: 19,
                fontWeight: "500",
                backgroundColor: "#fff",
              }}
            >
              На доставку
            </Text>
            <Text
              style={{
                width: "50%",
                textAlign: "center",
                paddingTop: 5,
                paddingBottom: 5,
                fontSize: 19,
                fontWeight: "500",
              }}
            >
              В зале
            </Text>
          </View>
        </View>
        <FlatList
          style={{ width: "100%", marginBottom: 100 }}
          data={allProducts}
          renderItem={({ item }) => (
            <Pressable onPress={() => navigation.navigate("SinglePage", item)}>
              <View
                style={{
                  width: "100%",
                  height: 170,
                  padding: 15,
                  borderBottom: "1px solid rgb(245, 245, 248)",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Image
                  style={{ width: "40%", height: 120 }}
                  source={{ uri: item.images[1] }}
                />
                <View style={{ width: "60%", paddingLeft: 5 }}>
                  <Text style={{ fontWeight: "600", marginBottom: 8 }}>
                    {item.title}
                  </Text>
                  <Text>{item.desc}</Text>
                  <Text
                    style={{
                      backgroundColor: "#ffefe5",
                      color: "#de813f",
                      paddingTop: 5,
                      paddingBottom: 5,
                      paddingRight: 10,
                      paddingLeft: 10,
                      fontSize: 18,
                      borderRadius: 15,
                      marginTop: 10,
                    }}
                  >
                    от {item.price}т
                  </Text>
                </View>
              </View>
            </Pressable>
          )}
        />
      </View>
      <View style={{ position: "relative" }}>
        <Pressable onPress={() => navigation.navigate("Cart")}>
          <View style={{ backgroundColor: "rgb(255, 105, 0)" }}>
            {/* <svg
              style={{ margin: "auto" }}
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d="M21.5 7v4h2.514c2.301 0 3.452 0 4.053.748.6.75.35 1.873-.149 4.12l-1.526 6.867c-.667 3.004-1.001 4.505-2.098 5.385-1.097.88-2.635.88-5.711.88h-5.166c-3.076 0-4.614 0-5.711-.88-1.097-.88-1.43-2.381-2.098-5.385l-1.526-6.867c-.5-2.247-.75-3.37-.149-4.12C4.533 11 5.685 11 7.986 11H10.5V7a5.5 5.5 0 1111 0zm-8 4h5V7a2.5 2.5 0 00-5 0v4z"
                fill="#FF6900"
              ></path>
              <path
                d="M13.5 8.239L17.041 11H13.5V8.239zM10.596 5.974A5.526 5.526 0 0010.5 7v4H8.171L7.23 5.556c-.156-.901.879-1.521 1.6-.96l1.766 1.378zM8.69 14h12.198l3.729 2.908c.43.335.514.954.152 1.361-2.878 3.235-8.759 6.82-12.965 7.902-.534.137-1.049-.23-1.143-.773L8.69 14z"
                fill="#000"
              ></path>
            </svg> */}
            <Text
              style={{
                color: "#fff",
                padding: 15,
                textAlign: "center",
                fontWeight: "700",
                borderRadius: 999,
                display: "flex",
                justifyContent: "center",
              }}
            >
              Корзина {numberOfObjects}
            </Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
