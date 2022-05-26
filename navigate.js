import React from "react";
import Main from "./views/Main";
import SinglePage from "./views/SinglePage";
import Cart from "./views/Cart";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function Navigate() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="SinglePage" component={SinglePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
