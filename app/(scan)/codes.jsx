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
import { fetchCodes } from "../../util/axios";
const Codes = () => {
  const { user, setUser, token } = useGlobalContext();
  const [myCodes, setMyCodes] = useState();
  const [permission, requestPermission] = useCameraPermissions();
  const [visible, setVisible] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [visibleShare, setVisibleShare] = useState(false);

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

  useFocusEffect(
    useCallback(() => {
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
      const codes = await fetchCodes(user.id, token);
      setMyCodes(codes);
    } catch {
      (e) => console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    // router.replace("sign-in");

    await axios
      .post(
        `${process.env.EXPO_PUBLIC_API_URL}/api/logout`,
        {},
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        setUser(null);
        setItem("logged", { username: null, isLoged: false });
        router.replace("sign-in");
      })
      .catch((err) => {
        Alert.alert(err.response.data.error);
      });
  };

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
                qrCode={item}
                token={token}
                refetch={refetch}
                setRefetch={setRefetch}
                setVisibleShare={setVisibleShare}
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
            ListEmptyComponent={() =>
              !loading && (
                <EmptyState
                  title=" No code Found"
                  subtitle="press plus to scan"
                />
              )
            }
          />
        )}
        <View className="items-center h-10 justify-between flex-row ">
          <TouchableOpacity
            onPress={handelScan}
            className=" absolute bottom-1 right-1/2  translate-x-1/2 z-50"
          >
            <Image source={icons.plus} resizeMode="contain" />
          </TouchableOpacity>
          <TouchableOpacity onPress={showDialog} className="ml-4 ">
            <Image
              source={icons.logout}
              resizeMode="contain"
              className="w-8 h-8"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              router.push("./receive");
            }}
            className="mr-4 "
          >
            <Image
              source={icons.receive}
              resizeMode="contain"
              className="w-14 h-14 mb-10"
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Codes;
