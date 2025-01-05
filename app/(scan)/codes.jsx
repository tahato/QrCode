import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  BackHandler,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "@/components/EmptyState";
import QrcodeItem from "@/components/QrcodeItem";
import { icons } from "@/constants";
import { router } from "expo-router";
import { useCameraPermissions } from "expo-camera";
import { useGlobalContext } from "@/context/GlobaleProvider";
import Dialog from "react-native-dialog";
import { getCodes, getItem, setItem } from "@/util/AsyncStorage";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";

const Codes = () => {
  // const {height}=Dimensions.get("window")
  const { user, setUser, token } = useGlobalContext();
  const [myCodes, setMyCodes] = useState();
  const [permission, requestPermission] = useCameraPermissions();
  const [visible, setVisible] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      console.log("first token show", token);

      displayCodes();

      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [refetch]) // Run the callback when the `user` value changes
  );

  const onBackPress = () => {
    BackHandler.exitApp();
    return true; // Prevent default back button behavior
  };

  // const codes = await getCodes(user);
  const displayCodes = async () => {
    setLoading(true);
    try {
      await axios
        .get(
          `http://192.168.1.11:8000/api/qrcode/${user.id}`,

          {
            headers: { Authorization: "Bearer " + token },
          }
        )
        .then((res) => {
          setMyCodes(res.data.codes);
        })
        .catch((e) => console.log(e.response.data));
    } catch {
      (e) => console.log(e);
    } finally {
      setLoading(false);
    }
  };

  // handle dialog
  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const confirmeLogout = () => {
    logout();
    setVisible(false);
  };
  // scan
  const handelScan = () => {
    if (!permission?.granted) requestPermission();
    else {
      router.push("./scan");
    }
  };

  const logout = async () => {
    // router.replace("sign-in");

    await axios
      .post(
        "http://192.168.1.11:8000/api/logout",
        {},
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        setUser(null);
        setItem("logged", { username: null, isLoged: false });
        router.replace("sign-in");
        console.log("this is response from database", res.data);
      })
      .catch((err) => {
        Alert.alert(err.response.data.error);
      });
  };

  // delet qr code function

  return (
    <>
      <SafeAreaView className="bg-primary pb-4 h-full px-4 relative ">
        {/* logout dialog */}

        <View>
          <Dialog.Container visible={visible}>
            <Dialog.Title style={{ color: "black" }}>Logout !</Dialog.Title>
            <Dialog.Description style={{ color: "black" }}>
              Do you realy want to logout ?
            </Dialog.Description>
            <Dialog.Button label="Cancel" onPress={handleCancel} />
            <Dialog.Button label="yes" onPress={confirmeLogout} />
          </Dialog.Container>
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#ffffff" style={{ flex: 1 }} />
        ) : (
          <FlatList
            data={myCodes}
            keyExtractor={(i) => i.id}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <QrcodeItem
                item={item}
                token={token}
                refetch={refetch}
                setRefetch={setRefetch}
              />
            )}
            ListHeaderComponent={() => (
              <View className="flex-row mb-4 mt-4 px-4 ">
                <View>
                  <Text className="text-sm font-pmedium text-gray-100">
                    Welcom Back
                  </Text>
                  <Text className="text-white text-2xl font-semibold">
                    {user.username}
                  </Text>
                </View>
              </View>
            )}
            ListEmptyComponent={() => (
              !loading &&(

                <EmptyState
                  title=" No code Found"
                  subtitle="press plus to scan"
                />
              )
            )}
          />
        )}

        {/* <SafeAreaView > */}

        {/* </SafeAreaView> */}
        <View className="items-start h-10 justify-center ">
          <TouchableOpacity
            onPress={handelScan}
            className=" absolute bottom-1 right-1/2  translate-x-1/2 z-50"
          >
            <Image source={icons.plus} resizeMode="contain" />
          </TouchableOpacity>
          <TouchableOpacity onPress={showDialog} className="ml-4  j">
            <Image
              source={icons.logout}
              resizeMode="contain"
              className="w-8 h-8"
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Codes;
