import React from "react";
import MainStack from "./navigate";
import { CookiesProvider } from "react-cookie";

export default function App() {
  return (
    <>
      <CookiesProvider>
        <MainStack />
      </CookiesProvider>
    </>
  );
}