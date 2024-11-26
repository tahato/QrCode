
import React from "react";
import { Stack } from "expo-router";
import GlobalProvider from "../context/GlobaleProvider"
import '../global.css'
const _layout = () => {
  return (
    <GlobalProvider>
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(scan)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      
    </Stack>
    </GlobalProvider>
  );
};

export default _layout;
