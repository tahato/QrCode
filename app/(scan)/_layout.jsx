import React from "react";
import { Stack } from "expo-router";
import "../../global.css";
import { StatusBar } from "expo-status-bar";
const _layout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="codes" options={{ headerShown: false }} />
        <Stack.Screen name="scan" options={{ headerShown: false }} />
      </Stack>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default _layout;
