import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/context/GlobaleProvider";
import Dialog from "react-native-dialog";
import { addQrCode, getItem, setItem } from "@/util/AsyncStorage";
import { router } from "expo-router";

const Scan = () => {
  const { user } = useGlobalContext();
  const [code, setCode] = useState();
  const [title, setTitle] = useState();

  const [visible, setVisible] = useState(false);

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const AddCode = async () => {
    const existingData = await getItem("codes");
    try {
      if (title != null) {
        if (existingData) {
          const updatingData = JSON.parse(existingData);
          updatingData.push({
            user,
            title,
            code,
            createdAt: new Date(),
          });
          await setItem("codes", updatingData);
        } else {
          const data = [];
          data.push({
            user,
            title,
            code,
            createdAt: Date.now(),
          });
          await setItem("codes", data);
        }
        setVisible(false);
        router.push("/codes");
      } else Alert.alert("set a title");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <StatusBar hidden></StatusBar>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={({ data }) => {
          setCode(data);
          showDialog();
        }}
      ></CameraView>
      {/* dialogue component to add a qrCode name */}
      <View>
        <Dialog.Container visible={visible}>
          <Dialog.Title>Add Code</Dialog.Title>
          <Dialog.Description>Input a title for QrCode</Dialog.Description>
          <Text className="px-4 mb-4 font-bold">{code}</Text>
          <Dialog.Input
            onChangeText={(e) => setTitle(e)}
            className="border-2 rounded-lg border-black"
          />
          <Dialog.Button label="Cancel" onPress={handleCancel} />
          <Dialog.Button label="Add" onPress={AddCode} />
        </Dialog.Container>
      </View>
      {/* overlay */}
      <View className="bg-black w-full h-[30%] opacity-50" />
      <View className="flex-row flex-1 items-center justify-center">
        <View className="bg-black h-full flex-1  opacity-50" />
        <View className="w-[70%] rounded-lg border-2 h-full border-white" />

        <View className="bg-black h-full flex-1 opacity-50" />
      </View>

      <View className="bg-black w-full h-[30%] opacity-50" />
    </SafeAreaView>
  );
};

export default Scan;
