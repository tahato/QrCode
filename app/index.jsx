import { Image, Text, View } from "react-native";
import React, { useEffect } from "react";
import "../global.css";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import { ScrollView } from "react-native";
import { router } from "expo-router";
import CustomButton from "../components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { useGlobalContext } from "@/context/GlobaleProvider";
import { getItem } from "@/util/AsyncStorage";
const index = () => {
  const { user, setUser } = useGlobalContext();

  useEffect(() => {
    alredyLoged();
  }, []);

  const alredyLoged = async () => {
    const logged = await getItem("logged");
    if (logged.isLoged) {
      setUser(logged.username);
      router.replace("./codes");
    }
  };
  return (
    <SafeAreaView className="h-full bg-black ">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="items-center justify-center h-full w-full px-7">
          {/* <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          /> */}
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />
          <View className=" mt-5">
            <Text className="text-white text-3xl text-center font-bold">
              San <Text className="text-secondary-200">QR Code</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[120px] h-[15px] -bottom-2 -right-8 absolute"
              resizeMode="contain"
            />
          </View>

          <CustomButton
            title="Get started"
            handlePress={() => router.push(user ? "./codes" : "./sign-in")}
            containerStyle="mt-7 w-full"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default index;
