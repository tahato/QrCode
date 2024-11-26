import React from "react";
import { Stack } from "expo-router";
import "../../global.css";
const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="codes" options={{ headerShown: false }} />
      <Stack.Screen name="scan" options={{ headerShown: false }} />
    </Stack>
  );
};

export default _layout;
