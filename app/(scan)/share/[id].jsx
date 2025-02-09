import { View, Text, Pressable, BackHandler, Alert } from "react-native";
import React, { useCallback, useEffect } from "react";
import QRCode from "react-native-qrcode-svg";
import { useGlobalContext } from "@/context/GlobaleProvider";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import axios from "axios";

const share = () => {
  const { token } = useGlobalContext();
  const { id } = useLocalSearchParams();


  useFocusEffect(
    useCallback(() => {
      const timeOut=setTimeout(() => {
        cancel();
      }, 30000);
      const intervalId = setInterval(() => {
        check(intervalId);
      }, 1000);

      BackHandler.addEventListener("hardwareBackPress", cancel);
      return () => {
        clearInterval(intervalId)
        clearTimeout(timeOut)
        BackHandler.removeEventListener("hardwareBackPress", cancel);
      };
    }, []) // Run the callback when the `user` value changes
  );


  const check = async (intervalId) => {
    try {
      await axios
        .post(
          `${process.env.EXPO_PUBLIC_API_URL}/api/transfer/check`,
          {
            id,
          },
          {
            headers: { Authorization: "Bearer " + token },
          }
        )
        .then((res) => {
          if (res.data.data == "sent") {
            Alert.alert('Qr Code transferd !')
            clearInterval(intervalId);
            router.replace("/codes");
          }
        })
        .catch((e) => console.log("", e));
    } catch (e) {
      console.log(e);
    }
  };

  const cancel = async () => {
    await axios
      .delete(`${process.env.EXPO_PUBLIC_API_URL}/api/transfer/${id}`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        console.log(res.data.message);
        router.replace("/codes");
      })
      .catch((e) => console.log( e.response.data));
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
