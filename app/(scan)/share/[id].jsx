import { View, Text, Button, Pressable } from "react-native";
import React, { useEffect } from "react";
import QRCode from "react-native-qrcode-svg";
import { useGlobalContext } from "@/context/GlobaleProvider";
import { router, useLocalSearchParams } from "expo-router";
import axios from "axios";

const share = () => {
  const { token } = useGlobalContext();
  const { id } = useLocalSearchParams();

  const cancel = async () => {
    await axios
      .delete(`${process.env.EXPO_PUBLIC_API_URL}/api/transfer/${id}`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        console.log(res.data.mesaage);
        router.replace("/codes");
      })
      .catch((e) => console.log("error", e.response.data));
  };
  return (
    <>
      <View className="z-50 bg-white w-full h-full justify-center items-center flex p-8">
        <View className="flex-1 items-center justify-center pt-12">
          <QRCode value={id} size={180} />
        </View>
        <Text className="mb-12 font-semibold text-lg ">
          Scan to transefer this code{" "}
        </Text>

        <View className=" flex-row justify-center w-full px-4 mb-4 gap-3">
          <Pressable onPress={cancel}>
            <Text className="text-xl font-bold bg-blue-500 p-2 w-40 text-center rounded-[50] text-white border-blue-700 border-1">
              cancel
            </Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default share;
