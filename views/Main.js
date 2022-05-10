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
  Modal,
  TextInput,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Main({ navigation }) {
  var [allProducts, getProduct] = useState(null);
  var [allOrders, getOrder] = useState(null);
  var [fullLogin, getLogin] = useState("");
  var [fullPhone, getPhone] = useState("");
  const cookieInfoLogin = async () => {await AsyncStorage.getItem('loggedInLogin')}
  
  // const cookieInfoPhone = localStorage.getItem("loggedInPhone");
  // const cookieInfoPassword = localStorage.getItem("loggedInPassword");
  var [currentOrder, getCurrentOrder] = useState("");
  var [numberOfObjects, getNumber] = useState("");
  var [fullPassword, getPassword] = useState("");
  var [loginLogin, getLoginName] = useState("");
  var [loginPassword, getPasswordName] = useState("");
  var [allUsers, getUser] = useState("");
  var [modalVisible, setModalVisible] = useState(false);
  function getProducts() {
    useEffect(() => {
      async function getAllProducts() {
        let res = await axios.get("https://6279ea5773bad506857f53b2.mockapi.io/api/goods");
        let newProducts = res.data;
        getProduct(newProducts);
      }
      getAllProducts();
    }, []);
  }
  function getOrders() {
    useEffect(() => {
      async function getAllOrders() {
        let res = await axios.get("https://6279ea5773bad506857f53b2.mockapi.io/api/orders");
        let newOrders = res.data;
        newOrders.forEach((element) => {
          if (
            element.user_login == cookieInfoLogin &&
            element.status == false
          ) {
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
        let res = await axios.get("https://6279ea5773bad506857f53b2.mockapi.io/api/users");
        let newUsers = res.data;
        getUser(newUsers);
      }
      getAllUsers();
    }, []);
  }
  async function sendUser() {
    await axios.post("https://6279ea5773bad506857f53b2.mockapi.io/api/users", {
      login: fullLogin,
      phone: fullPhone,
      password: fullPassword,
    });
  }
  function login() {
    allUsers?.forEach((item) => {
      if (item.login === loginLogin && item.password === loginPassword) {
        // localStorage.setItem("loggedInLogin", item.login);
        const setData = async () => {await AsyncStorage.setItem('loggedInLogin')}
        // localStorage.setItem("loggedInPhone", item.phone);
        // localStorage.setItem("loggedInPassword", item.password);
      } else {
        console.log("Данные не совпадают");
      }
    });
  }
  // function setFunc() {
  //   useEffect(() => {
  //     async function setFunction() {
  //       allUsers?.forEach((element) => {
  //         if (element.login == cookieInfo) {
  //           console.log("jhdkalsjdlksa");
  //         } else {
  //           console.log("nothing");
  //         }
  //       });
  //     }
  //     setFunction()
  //   }, []);
  // }
  getProducts();
  getUsers();
  getOrders();
  // setFunc();
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Modal
            animationType="slide"
            // transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <ScrollView>
              <View
                style={{
                  minHeight: "63%",
                  padding: 10,
                  flex: 1,
                  backgroundColor: "rgb(243, 243, 247)",
                }}
              >
                <Text
                  style={{
                    backgroundColor: "white",
                    padding: 10,
                    borderRadius: "100%",
                  }}
                  onPress={() => setModalVisible((modalVisible = false))}
                >
                  <FontAwesome
                    style={{
                      fontSize: 20,
                    }}
                    name="chevron-down"
                  />
                </Text>
                <View>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 24,
                      fontWeight: 700,
                      marginBottom: 20,
                    }}
                  >
                    Регистрация
                  </Text>
                  <Text
                    style={{ fontSize: 19, fontWeight: 400, marginBottom: 10 }}
                  >
                    Логин
                  </Text>
                  <TextInput
                    onChangeText={(e) => getLogin((fullLogin = e))}
                    style={{
                      backgroundColor: "white",
                      padding: 10,
                      borderRadius: 8,
                      marginBottom: 15,
                    }}
                    placeholder="Укажите логин"
                  />
                  <Text
                    style={{ fontSize: 19, fontWeight: 400, marginBottom: 10 }}
                  >
                    Телефон
                  </Text>
                  <TextInput
                    onChangeText={(e) => getPhone((fullPhone = e))}
                    style={{
                      backgroundColor: "white",
                      padding: 10,
                      borderRadius: 8,
                      marginBottom: 15,
                    }}
                    placeholder="Укажите телефон"
                  />
                  <Text
                    style={{ fontSize: 19, fontWeight: 400, marginBottom: 10 }}
                  >
                    Пароль
                  </Text>
                  <TextInput
                    onChangeText={(e) => getPassword((fullPassword = e))}
                    style={{
                      backgroundColor: "white",
                      padding: 10,
                      borderRadius: 8,
                      marginBottom: 20,
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
              <View
                style={{
                  padding: 10,
                  flex: 1,
                  backgroundColor: "rgb(243, 243, 247)",
                }}
              >
                <View>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 24,
                      fontWeight: 700,
                      marginBottom: 20,
                    }}
                  >
                    Войти
                  </Text>
                  <Text
                    style={{ fontSize: 19, fontWeight: 400, marginBottom: 10 }}
                  >
                    Логин
                  </Text>
                  <TextInput
                    onChangeText={(e) => getLoginName((loginLogin = e))}
                    style={{
                      backgroundColor: "white",
                      padding: 10,
                      borderRadius: 8,
                      marginBottom: 15,
                    }}
                    placeholder="Укажите логин"
                  />
                  <Text
                    style={{ fontSize: 19, fontWeight: 400, marginBottom: 10 }}
                  >
                    Пароль
                  </Text>
                  <TextInput
                    onChangeText={(e) => getPasswordName((loginPassword = e))}
                    style={{
                      backgroundColor: "white",
                      padding: 10,
                      borderRadius: 8,
                      marginBottom: 20,
                    }}
                    placeholder="Укажите пароль"
                  />
                  <Button
                    title="Отправить"
                    onPress={login}
                    style={{
                      width: "100%",
                      backgroundColor: "rgb(255, 105, 0)",
                      borderRadius: 100,
                    }}
                  />
                </View>
              </View>
            </ScrollView>
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
              <FontAwesome style={{ fontSize: 20 }} name="search" />
              <View style={{ textAlign: "center", marginLeft: 10 }}>
                <FontAwesome
                  onPress={() => setModalVisible((modalVisible = true))}
                  style={{ fontSize: 20 }}
                  name="user"
                />
                {/* <Text>{cookieInfoLogin}</Text> */}
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
              <TouchableHighlight
                onPress={() => navigation.navigate("SinglePage", item)}
              >
                <View
                  style={{
                    width: "100%",
                    height: 230,
                    padding: 15,
                    borderBottom: "1px solid rgb(245, 245, 248)",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Image
                    style={{ width: 150, height: 150, objectFit: "cover" }}
                    source={{ uri: item.images[0] }}
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
                        width: 'fit-content%',
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
              </TouchableHighlight>
            )}
          />
        </View>
      </ScrollView>
      <View style={{ position: "relative" }}>
        <TouchableHighlight onPress={() => navigation.navigate("Cart")} >
          <View
            style={{
              position: "fixed",
              bottom: 20,
              right: 20,
              boxShadow: "rgb(0 0 0 / 20%) 0px 10px 20px",
              borderRadius: "100%",
              display: "flex",
              justifyContent: "center",
              width: "100%",
              backgroundColor: "#fff",
              width: 56,
              height: 56,
            }}
          >
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
                position: "absolute",
                top: 0,
                right: 0,
                backgroundColor: "rgb(255, 105, 0)",
                color: "#fff",
                width: 21,
                height: 21,
                borderRadius: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {numberOfObjects}
            </Text>
          </View>
        </TouchableHighlight>
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
