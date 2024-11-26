import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
// import '../global.css'
const CustomButton = ({
  title,
  handlePress,
  containerStyle,
  texteStyle,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary-200 rounded-xl min-h-[62px] justify-center items-center ${containerStyle} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <Text className={`text-primary font-semibold text-2xl ${texteStyle} `}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
