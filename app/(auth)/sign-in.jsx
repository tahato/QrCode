import { View, Text, Image, Alert, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { login, setItem } from "@/util/AsyncStorage";

import { useGlobalContext } from "@/context/GlobaleProvider";
import { images } from "@/constants";
import axios from "axios";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser,setToken } = useGlobalContext();
  const subimt = async () => {

    
    try {
      if (username != "" && password != "")
        {

          await axios
          .post("http://192.168.1.11:8000/api/login", {
            username,
            password
          })
          .then((res) => {
            setUser(res.data.user);
            setToken(res.data.token)
            setItem("logged", { user: res.data.user, isLoged: true ,token:res.data.token});
            router.replace("/codes");
          })
          .catch((err) => {
            console.log('error',err.response.data.error);
            
            Alert.alert(
              err.response.data.error
            );
          });
        }else Alert.alert('Please fill all fields')
    } catch (error) {
      Alert.alert('errrrrrrrrrrrrrrrr',error);
    }
  };
  // const subimt = async () => {
  //   try {
  //     const response = await login(username, password);
  //     if (response.message != undefined) {
  //       // set username and login state to globale context
  //       setUser(username);
  //       router.replace("/codes");
  //     } else Alert.alert("Wrong username or password");
  //   } catch (error) {
  //     Alert.alert(error);
  //   }
  // };

  return (
    <SafeAreaView className="bg-primary h-full pt-20 ">
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
            Log in to Scan
          </Text>
          <FormField
            title="Username"
            value={username}
            handleChange={(e) => setUsername(e)}
            otherStyle="mt-7"
            placeholder="user name "
          />
          <FormField
            title="Password"
            value={password}
            handleChange={(e) => setPassword(e)}
            otherStyle="mt-7"
          />
          <CustomButton
            title="Sign in"
            handlePress={subimt}
            containerStyle="mt-7"
          />
          <View className="justify-center mt-10 items-center flex-row gap-2">
            <Text className="text-gray-100 font-pregular text-lg">
              D'ont have account?
            </Text>
            <Link
              href={"/sign-up"}
              className="text-secondary text-lg font-semibold "
            >
              <Text>SignUp</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
