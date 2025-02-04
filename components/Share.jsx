import { View, Text, Button, Pressable } from "react-native";
import React from "react";
import QRCode from "react-native-qrcode-svg";
import Svg, { Circle, Rect } from "react-native-svg";
import Connect from "../assets/images/connect.svg";
import { router } from "expo-router";

const Share = ({ visible, item, setVisibleShare }) => {
  const cancel = () => {
    // handle cancel in database "axios"
    setVisibleShare(false);
  };

  return (
    <>
      {visible ? (
        <View className="z-50 bg-white w-full h-full justify-center items-center flex p-8">

          <View className="flex-1 items-center justify-center pt-12">
            <QRCode value={item.code} size={180} />
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
      ) : (
        <></>
      )}
    </>
  );
};

export default Share;
