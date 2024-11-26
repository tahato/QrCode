import { View, TextInput, Image, Alert } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { icons } from "../constants";
import { router, usePathname } from "expo-router";
const SearchInput = () => {
  const [query, setQuery] = useState();
  const pathname = usePathname();

  return (
    <View className=" bg-black-100 h-16 rounded-xl border-2 border-black-200 px-4 flex-row items-center   ">
      <TextInput
        className="text-white flex-1 "
        placeholder="search for video"
        value={query}
        onChangeText={(e) => setQuery(e)}
        placeholderTextColor="#7b7b8b"
      />

      <TouchableOpacity
        onPress={() => {
          if (!query) {
            Alert.alert("Please input somthing to search");
          } else if (pathname.startsWith("/search"))
            router.setParams({ query });
          else {
            router.push(`/search/${query}`);
            setQuery("");
          }
        }}
      >
        <Image source={icons.search} className="w-6 h-6" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
