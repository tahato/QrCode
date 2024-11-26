import { View, Text, FlatList, Image, TouchableOpacity, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "@/components/EmptyState";
import { icons } from "@/constants";
import { router } from "expo-router";
import {  useCameraPermissions } from "expo-camera";
import { useGlobalContext } from "@/context/GlobaleProvider";
import Dialog from "react-native-dialog";
import { deleteCodes, getCodes } from "@/util/AsyncStorage";
const Codes = () => {
  const { user, setIsLogged, setUser } = useGlobalContext();
  const [myCodes, setMyCodes] = useState([]);
  const [permission, requestPermission] = useCameraPermissions();
  const [visible, setVisible] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
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
  const handleCancelDelete = () => {
    setVisibleDelete(false);
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
    setIsLogged(false);
    setUser(null);
    router.replace("sign-in");
  };

  // delet qr code function
  const handleDelete = async ( createdAt) => {
    const codes = await deleteCodes(createdAt);
    setMyCodes(codes);
    setVisibleDelete(false);
  };
  return (
    <>
      <SafeAreaView className="bg-primary pb-6 h-full px-4">
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
          renderItem={({ item }) => (
            <View className="my-2 flex-row w-full ">
              {/* delete dialog */}
              <View>
                <Dialog.Container visible={visibleDelete}>
                  <Dialog.Title>Delete !</Dialog.Title>
                  <Dialog.Description>
                    Are you sure you want to delete this Qr Code ?
                  </Dialog.Description>
                  <Dialog.Button label="Cancel" onPress={handleCancelDelete} />
                  <Dialog.Button
                    label="Delete"
                    onPress={() => handleDelete( item.createdAt)}
                  />
                </Dialog.Container>
              </View>

              <View>
                <Text
                  className="text-white font-semibold text-2xl  "
                  numberOfLines={1}
                >
                  {item.title}
                </Text>
                <TouchableOpacity className="px-4 " onPress={()=>Linking.openURL(item.code)}>
                  <Text className="text-white">{item.code}</Text>
                  <Text className="text-gray-100 text-xs ">
                    {item.createdAt}
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="flex-1 flex-row justify-end items-center">
                <TouchableOpacity
                  className=" mr-2"
                  onPress={() => setVisibleDelete(true)}
                >
                  <Image
                    resizeMode="contain"
                    source={icons.Delete}
                    className=""
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListHeaderComponent={() => (
            <View className="mb-2 mt-8 px-4 py-4 ">
              <Text className="text-sm font-pmedium text-gray-100">
                Welcom Back
              </Text>
              <Text className="text-white text-2xl font-semibold">{user}</Text>
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyState title=" No codes Found" subtitle="press plus to scan" />
          )}
        />
        <View className="flex-row justify-between px-6">
          <TouchableOpacity onPress={handelScan}>
            <Image source={icons.plus} resizeMode="contain" />
          </TouchableOpacity>
          <TouchableOpacity onPress={showDialog}>
            <Image source={icons.logout} resizeMode="contain" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Codes;
