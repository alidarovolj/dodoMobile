import React, { useState } from "react";
import MainStack from "./navigate";
import { StyleSheet, View, Text } from "react-native";
import { CookiesProvider } from "react-cookie";

export default function App() {
  return (
    <>
      <CookiesProvider>
        <MainStack />
      </CookiesProvider>
      {/* <View
        style={{
          position: "fixed",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "#ff6900",
          width: "90%",
          padding: 10,
          borderRadius: 40,
          textAlign: "center",
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontWeight: 900,
            fontSize: "20px !important",
          }}
        >
          Корзина
        </Text>
      </View> */}
    </>
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
