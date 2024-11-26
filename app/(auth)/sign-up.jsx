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
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import CustomButton from "@/components/CustomButton";
import { useGlobalContext } from "@/context/GlobaleProvider";


const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();

  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [data, setData] = useState([]);

  const subimt = async () => {
    const existingData = await getItem("users");
    if (existingData) setData(existingData);
    if (userName != null && password != null) {
      data.push({
        userName,
        password,
        codes: [],
      });
      setItem("users", data);
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Success",
        textBody: 'register successfuly',
        autoClose: 1000,
      });
      setTimeout(() => {
      router.push("/codes");
        
      }, 1000);
       // set username and login state to globale context
       setUser(userName)
       setIsLogged(true)
    } else Alert.alert("please input username and password ");
  };

  return (
    <SafeAreaView className="bg-primary h-full pt-20">
      <AlertNotificationRoot/>
      <ScrollView>
        <View className="justify-center h-full w-full p-5  ">
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
