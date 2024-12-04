import {
  View,
  Text,
  Image,
  ScrollView,
  Alert,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import FormField from "../../components/FormField";
import { Link, router } from "expo-router";
import { getItem, setItem } from "../../util/AsyncStorage";

import CustomButton from "@/components/CustomButton";
import { useGlobalContext } from "@/context/GlobaleProvider";
import { images } from "@/constants";

const SignUp = () => {
  const { setUser } = useGlobalContext();

  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
console.log(userName);

  const subimt = async () => {
    const existingData = await getItem("users");
    const data = existingData || [];
    if (userName != null && password != null) {
      const user = data.find((user) => user.userName === userName);
      if (!user) {
        data.push({
          userName,
          password,
          codes: [],
        });
        setUser(userName);
        setItem("users", data);
        setItem("logged", { username:userName, isLoged: true });
        router.replace("/codes");

        // set username and login state to globale context
      } else Alert.alert("user name is already exist ");
    } else Alert.alert("please input username and password ");
  };

  return (
    <SafeAreaView className="bg-primary h-full pt-20">
      <ScrollView>
        <View className="justify-center h-full w-full p-5  ">
          <View className="items-center ">
            <Image
              source={images.logo}
              resizeMode="contain"
              className="w-40 h-40"
            />
          </View>
          <Text className="text-white text-2xl mt-10 font-psemibold ">
            Sign up
          </Text>
          <FormField
            title="User Name"
            value={userName}
            handleChange={(e) => setUserName(e)}
            otherStyle="mt-10"
            placeholder="User Name "
          />

          <FormField
            title="Password"
            value={password}
            handleChange={(e) => setPassword(e)}
            otherStyle="mt-7"
          />
          <CustomButton
            title="Sign up"
            handlePress={subimt}
            containerStyle="mt-7"
          />
          <View className="justify-center mt-10 items-center flex-row gap-2">
            <Text className="text-gray-100 font-pregular text-lg">
              Have an account already?
            </Text>
            <Link
              href={"/sign-in"}
              className="text-secondary text-lg font-semibold "
            >
              Sign in
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default SignUp;
