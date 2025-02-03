import {
  View,
  Text,
  Image,
  ScrollView,
  Alert,
  SafeAreaView,
  BackHandler,
} from "react-native";
import React, { useCallback, useState } from "react";
import FormField from "../../components/FormField";
import { Link, router, useFocusEffect } from "expo-router";
import { getItem, setItem } from "../../util/AsyncStorage";

import CustomButton from "@/components/CustomButton";
import { useGlobalContext } from "@/context/GlobaleProvider";
import { images } from "@/constants";
import axios from "axios";

const SignUp = () => {
  const { setUser ,setToken} = useGlobalContext();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");

  const subimt = async () => {
    if (username != "" && password != "" && password_confirmation != "") {
      await axios
        .post(`${process.env.EXPO_PUBLIC_API_URL}/api/register`, {
          username,
          password,
          password_confirmation,
        })
        .then((res) => {
          setUser(res.data.user);
          setToken(res.data.token)
          setItem("logged", { user: res.data.user, isLoged: true,token:res.data.token });
          router.replace("/codes");
        })
        .catch((err) => {
          Alert.alert(
            err.response.data.error.username?.[0] ||
              err.response.data.error.password?.[0] ||
              err.response.data.error.password[1]
          );
        });
    } else Alert.alert("fill all fields ");
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
            value={username}
            handleChange={(e) => setUsername(e)}
            otherStyle="mt-10"
            placeholder="User Name "
          />

          <FormField
            title="Password"
            type="Password"
            value={password}
            handleChange={(e) => setPassword(e)}
            otherStyle="mt-7"
          />
          <FormField
            title="Confirm Password"
            type="Password"
            value={password_confirmation}
            handleChange={(e) => setPassword_confirmation(e)}
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
