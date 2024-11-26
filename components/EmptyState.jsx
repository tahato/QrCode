import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "../constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="justify-cente items-center px-4">
      <Image
        source={images.empty}
        className="h-[215px] w-[270px]"
        resizeMethod="contain"
      />
      <Text className="text-white text-xl text-center font-semibold mt-2">
        {title}
      </Text>
      <Text className="text-gray-100 text-sm font-pmedium">{subtitle}</Text>
      
    </View>
  );
};

export default EmptyState;
