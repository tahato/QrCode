import React from "react";
import { Stack } from "expo-router";
import "../../global.css";
import { StatusBar } from "react-native";
const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      {/* <StatusBar backgroundColor="#161622" style="light" /> */}
    </Stack>
  );
};

export default _layout;
