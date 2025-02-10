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
import { router } from "expo-router";
import axios from "axios";
import Overlay from "@/components/Overlay";

const Receive = () => {
  const { user, token } = useGlobalContext();
  const [isScanning] = useState(true);

  const update = (id) => {
    try {
      axios.patch(
        `${process.env.EXPO_PUBLIC_API_URL}/api/transfer`,
        {
          id,
          receiver_id:user.id
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      ).then((res)=>{
        router.replace('/codes')
      } );
    } catch (e) {
      console.log(e);
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
            ? ({ id }) => {
                update(id);
              }
            : undefined
        }
      ></CameraView>

      <Overlay />
    </SafeAreaView>
  );
};

export default Receive;
