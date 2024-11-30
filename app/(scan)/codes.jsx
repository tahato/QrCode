import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "@/components/EmptyState";
import QrcodeItem from "@/components/QrcodeItem";
import { icons } from "@/constants";
import { router } from "expo-router";
import { useCameraPermissions } from "expo-camera";
import { useGlobalContext } from "@/context/GlobaleProvider";
import Dialog from "react-native-dialog";
import { getCodes, setItem } from "@/util/AsyncStorage";
const Codes = () => {
  // const {height}=Dimensions.get("window")
  const { user, setUser } = useGlobalContext();
  const [myCodes, setMyCodes] = useState([]);
  const [permission, requestPermission] = useCameraPermissions();
  const [visible, setVisible] = useState(false);
  // display data
  useEffect(() => {
    displayCodes();
  }, [myCodes]);

  const displayCodes = async () => {
    const codes = await getCodes(user);
    setMyCodes(codes);
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

  const logout = () => {
    setItem("logged", { user: null, isLoged: false });
    setUser(null);
    router.replace("sign-in");
  };

  // delet qr code function

  return (
    <>
      <SafeAreaView className="bg-primary pb-6 h-full px-4 relative ">
        {/* logout dialog */}

        <View>
          <Dialog.Container visible={visible}>
            <Dialog.Title>Logout !</Dialog.Title>
            <Dialog.Description>
              Do you realy want to logout ?
            </Dialog.Description>
            <Dialog.Button label="Cancel" onPress={handleCancel} />
            <Dialog.Button label="yes" onPress={confirmeLogout} />
          </Dialog.Container>
        </View>

        <FlatList
          data={myCodes}
          keyExtractor={(i) => i.createdAt}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => <QrcodeItem item={item} />}
          ListHeaderComponent={() => (
            <View className="flex-row mb-4 mt-4 px-4   ">
              <View>
                <Text className="text-sm font-pmedium text-gray-100">
                  Welcom Back
                </Text>
                <Text className="text-white text-2xl font-semibold">
                  {user}
                </Text>
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyState title=" No code Found" subtitle="press plus to scan" />
          )}
        />
        {/* <SafeAreaView > */}
        
        {/* </SafeAreaView> */}
        <View className="flex-1 items-start justify-end mb-4 bg-transparent">
            <TouchableOpacity onPress={handelScan} className=" absolute bottom-1 right-1/2  translate-x-1/2 z-50">
            <Image source={icons.plus} resizeMode="contain" />
          </TouchableOpacity>
          <TouchableOpacity onPress={showDialog} className="ml-4 bg-transparent">
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
