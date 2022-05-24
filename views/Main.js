import React, { useState, useEffect } from "react";
import axios from "axios";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  FlatList,
  Image,
  Pressable,
  Modal,
  TextInput,
} from "react-native";
import { useCookies, Cookies } from "react-cookie";

export default function Main({ navigation }) {
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);
  var [allProducts, getProduct] = useState(null);
  var [searchFilter, setSearchFilter] = useState("");
  var [allOrders, getOrder] = useState("");
  var [fullLogin, getLogin] = useState("");
  var [fullPhone, getPhone] = useState("");
  var [currentUserLog, setCurrentUser] = useState(cookies.loggedIn);
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
  function RenderRegLog() {
    if (currentUserLog == null) {
      return (
        <ScrollView>
          <View
            style={{
              padding: 10,
              backgroundColor: "rgb(243, 243, 247)",
              paddingTop: 50,
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
                placeholderTextColor="#000"
                style={{
                  backgroundColor: "white",
                  padding: 15,
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
                placeholderTextColor="#000"
                style={{
                  backgroundColor: "white",
                  padding: 15,
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
                placeholderTextColor="#000"
                style={{
                  backgroundColor: "white",
                  padding: 15,
                  borderRadius: 8,
                  marginBottom: 10,
                }}
                placeholder="Укажите пароль"
              />

              <Pressable onPress={sendUser}>
                <View
                  style={{
                    width: "100%",
                    backgroundColor: "rgb(255, 105, 0)",
                    padding: 15,
                    borderRadius: 8,
                    marginTop: 20,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: 19,
                    }}
                  >
                    Отправить
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
          <View
            style={{
              paddingTop: 50,
              padding: 10,
              backgroundColor: "rgb(243, 243, 247)",
            }}
          >
            <View style={{ height: "100%" }}>
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
                placeholderTextColor="#000"
                style={{
                  backgroundColor: "white",
                  padding: 15,
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
                placeholderTextColor="#000"
                onChangeText={(e) => getPasswordName((loginPassword = e))}
                style={{
                  backgroundColor: "white",
                  padding: 15,
                  borderRadius: 8,
                  marginBottom: 10,
                }}
                placeholder="Укажите пароль"
              />
              <Pressable onPress={saveValue}>
                <View
                  style={{
                    width: "100%",
                    backgroundColor: "rgb(255, 105, 0)",
                    padding: 15,
                    borderRadius: 8,
                    marginTop: 20,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: 19,
                    }}
                  >
                    Отправить
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      );
    } else {
      return <Text>Зарегистрирован</Text>
    }
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
      x.title.toLowerCase().includes(res.toLowerCase())
    );
    setSearchFilter(filteredData);
    console.log(filteredData);
  }
  async function sendUser() {
    await axios.post("https://6279ea5773bad506857f53b2.mockapi.io/api/users", {
      login: fullLogin,
      phone: fullPhone,
      password: fullPassword,
    });
    await axios.post("https://6279ea5773bad506857f53b2.mockapi.io/api/orders", {
      goods: [],
      user_login: fullLogin,
      price: 0,
      status: false,
    });
  }
  const saveValue = () => {
    allUsers.forEach((user) => {
      if (user.login == loginLogin && user.password == loginPassword) {
        setCookie("loggedIn", loginLogin);
        setModalVisible(false);
      } else {
        console.log("Неверные данные");
      }
    });
  };
  const logout = () => {
    if (currentUserLog != null) {
      return (
        <Pressable onPress={() => removeCookie("loggedIn")}>
          <View
            style={{
              backgroundColor: "rgb(255, 105, 0)",
              marginLeft: 10,
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 18, color: "white" }}>
              {currentUserLog}
            </Text>
          </View>
        </Pressable>
      );
    } else {
      return <Text></Text>;
    }
  };
  getProducts();
  getUsers();
  return (
    <View style={{ height: "100%" }}>
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
                  width: "100%",
                }}
              >
                <TextInput
                  placeholderTextColor="#000"
                  style={{
                    backgroundColor: "white",
                    padding: 15,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: "#e9e9e9",
                    width: "75%",
                  }}
                  placeholder="Поиск продуктов"
                  onChangeText={(e) => onChangeSearch(e)}
                />
                <Text
                  style={{ marginLeft: 10, width: "100%" }}
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
        >{RenderRegLog()}</Modal>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingTop: 50,
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
              Алматы
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
            </View>
            <Text>{logout()}</Text>
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
          style={{ width: "100%" }}
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
                  <View
                    style={{
                      backgroundColor: "#ffefe5",
                      alignSelf: "flex-start",
                      color: "#de813f",
                      paddingTop: 5,
                      paddingBottom: 5,
                      paddingRight: 20,
                      paddingLeft: 20,
                      borderRadius: 15,
                      marginTop: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        color: "#de813f",
                      }}
                    >
                      от {item.price}т
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>
          )}
        />
      </View>
      <View style={{ position: "relative" }}>
        <Pressable onPress={() => navigation.navigate("Cart")}>
          <View
            style={{ paddingBottom: 10, backgroundColor: "rgb(255, 105, 0)" }}
          >
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
    </View>
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
