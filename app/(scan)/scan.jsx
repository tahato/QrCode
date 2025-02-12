import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Alert,
  TextInput,
} from "react-native";
import { useEffect, useState } from "react";
import { CameraView } from "expo-camera";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/context/GlobaleProvider";
import Dialog from "react-native-dialog";
import { getItem } from "@/util/AsyncStorage";
import { router } from "expo-router";
import axios from "axios";
import Overlay from "@/components/Overlay";

const Scan = () => {
  const { user, token } = useGlobalContext();
  const [code, setCode] = useState();
  const [title, setTitle] = useState("");
  const [visible, setVisible] = useState(false);
  const [isScanning, setIsScanning] = useState(true);
  const [disabled, setDisabled] = useState(false);

  const showDialog = () => {
    setVisible(true);
    setIsScanning(false);
  };

  const handleCancel = () => {
    setVisible(false);
    setIsScanning(true);
  };

  const AddCode = async () => {
    
    if (title != "") {
      try {
        setDisabled(true)
        await axios
          .post(
            `${process.env.EXPO_PUBLIC_API_URL}/api/qrcode/create`,
            {
              title,
              code,
              user_id: user.id,
            },
            {
              headers: { Authorization: "Bearer " + token },
            }
          )
          .then((res) => {
            setVisible(false);
            router.replace("/codes");
          })
          .catch((e) => {

            console.log(e.response.data);

            Alert.alert(
              e.response.data.error,
              e.response.data.qrCode.title + "\n" + e.response.data.qrCode.code,
              [
                {
                  text: "ok",
                  onPress: () => {
                    setVisible(false);
                    setIsScanning(true);
                    setTitle(null);
                    setDisabled(false)
                  },
                },
              ]
            );
          });
      } catch (e) {
        console.log(e);
      }
    } else Alert.alert("Please, set a tile");
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
            className="border-2 rounded-lg border-black text-black p-2 text-xl"
          />
          <Dialog.Button label="Cancel" onPress={handleCancel} />
          <Dialog.Button label="add" onPress={AddCode} disabled={disabled} />
        </Dialog.Container>
      </View>

      <Overlay />
    </SafeAreaView>
  );
};

export default Scan;
