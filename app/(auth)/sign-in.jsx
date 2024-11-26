import { View, Text, Image, Alert, Button } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { getItem, login } from "@/util/AsyncStorage";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import { useGlobalContext } from "@/context/GlobaleProvider";



const SignIn = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const { setUser, setIsLogged } = useGlobalContext();
  const subimt = async () => {
    try {
      const response = await login(username, password);
      if (response.message != undefined) {
        // set username and login state to globale context
        setUser(username)
        setIsLogged(true)
        //showing toast when succeful login 
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: response.message,
          autoClose: 500,
        });
        setTimeout(() => {
          router.replace("/codes");
        }, 1000);
      } else
        Toast.show({
          type: ALERT_TYPE.WARNING,
          title: "Warning",
          textBody: response.error,
          autoClose: 1000,
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full pt-20">
      <AlertNotificationRoot/>
      <ScrollView>
        <View className="justify-center h-full w-full p-5  ">
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
