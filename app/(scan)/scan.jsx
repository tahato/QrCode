import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Alert,
  TextInput,
} from "react-native";
import { useState } from "react";
import { CameraView } from "expo-camera";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/context/GlobaleProvider";
import Dialog from "react-native-dialog";
import { getItem, setItem } from "@/util/AsyncStorage";
import { router } from "expo-router";

const Scan = () => {
  const { user } = useGlobalContext();
  const [code, setCode] = useState();
  const [title, setTitle] = useState();
  const [visible, setVisible] = useState(false);
  const [isScanning, setIsScanning] = useState(true);

  const showDialog = () => {
    setVisible(true);
    setIsScanning(false);
  };

  const handleCancel = () => {
    setVisible(false);
    setIsScanning(true);
  };

  const AddCode = async () => {
    const existingData = await getItem("codes"); // get the old array from local storage
    try {
      if (title != null) {
        const data = existingData || []; // push data to the existing array or create a new one for the first time
        const existingCode = data
          .filter((code) => code.user === user)
          .find((codes) => codes.code === code || codes.title === title);
        if (!existingCode) {
          data.push({
            user,
            title,
            code,
            createdAt: new Date(),
          });
          await setItem("codes", data);
          setVisible(false);
          router.replace("/codes");
        } else
          Alert.alert(
            "this code is already exist",
            existingCode.title + "\n" + existingCode.code,
            [
              {
                text: "ok",
                onPress: () => {
                  setVisible(false);
                  setIsScanning(true);
                  setTitle(null);
                },
              },
            ]
          );
      } else Alert.alert("set a title");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <StatusBar backgroundColor="#00000080" />
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={
          isScanning
            ? ({ data }) => {
                setCode(data);
                showDialog();
              }
            : undefined
        }
      ></CameraView>
      {/* dialogue component to add a qrCode name */}
      <View>
        <Dialog.Container visible={visible}>
          <Dialog.Title style={{ color: "black" }}>Add Code</Dialog.Title>
          <Dialog.Description style={{ color: "black" }}>
            set a title for QrCode
          </Dialog.Description>
          <Text className="px-4 mb-4 font-bold">{code}</Text>
          <TextInput
            onChangeText={(e) => setTitle(e)}
            className="border-2 rounded-lg border-black text-black"
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
