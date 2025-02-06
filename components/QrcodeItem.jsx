import {
  View,
  Text,
  Linking,
  TouchableOpacity,
  Image,
  Clipboard,
  ToastAndroid,
  Alert,
} from "react-native";

import { icons } from "@/constants";
import Dialog from "react-native-dialog";
import { useState } from "react";
import axios from "axios";
import { useGlobalContext } from "@/context/GlobaleProvider";
import { router } from "expo-router";

const QrcodeItem = ({ qrCode, refetch, setRefetch, setVisibleShare }) => {
  const { user, token } = useGlobalContext();

  const [visibleDelete, setVisibleDelete] = useState(false);

  const handleDelete = async (id) => {
    await axios
      .delete(`${process.env.EXPO_PUBLIC_API_URL}/api/qrcode/delete/${id}`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        console.log(res.data);
        setRefetch(!refetch);
      })
      .catch((e) => console.log(e.response.data));
    setVisibleDelete(false);
  };

  const share = async (id) => {
    try {
      await axios
        .post(
          `${process.env.EXPO_PUBLIC_API_URL}/api/transfer/create`,
          {
            sender_id: user.id,
            qr_code_id: id,
          },
          {
            headers: { Authorization: "Bearer " + token },
          }
        )
        .then((res) => {
          router.push(`/share/${res.data.data.id}`);
        })
        .catch((e) => {
          Alert.alert(e.response.data.error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View className="my-2 flex-row w-full ">
      <View>
        <Dialog.Container visible={visibleDelete}>
          <Dialog.Title style={{ color: "black" }}>Delete !</Dialog.Title>
          <Dialog.Description style={{ color: "black" }}>
            Are you sure you want to delete this Qr Code ?
          </Dialog.Description>
          <Dialog.Button
            label="Cancel"
            onPress={() => setVisibleDelete(false)}
          />
          <Dialog.Button
            label="Delete"
            onPress={() => handleDelete(qrCode.id)}
          />
        </Dialog.Container>
      </View>
      <View className="w-[75%]">
        <Text className="text-white font-semibold text-2xl  " numberOfLines={1}>
          {qrCode.title}
        </Text>
        <TouchableOpacity
          className="px-4 "
          onPress={() => Linking.openURL(qrCode.code)}
          onLongPress={() => {
            Clipboard.setString(qrCode.code);
            ToastAndroid.show("copied", ToastAndroid.SHORT);
          }}
        >
          <Text className="text-white">{qrCode.code}</Text>
          <Text className="text-gray-100 text-xs ">{qrCode.created_at}</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-1 flex-row justify-end items-center ">
        <TouchableOpacity
          className=" mr-2  bg-gray-200 rounded-full p-2  "
          onPress={() => share(qrCode.id)}
        >
          <Image
            resizeMode="contain"
            source={icons.share}
            className="w-6 h-6 "
          />
        </TouchableOpacity>
        <TouchableOpacity
          className=" mr-2  bg-gray-200 rounded-full p-2  "
          onPress={() => setVisibleDelete(true)}
        >
          <Image
            resizeMode="contain"
            source={icons.Delete}
            className="w-6 h-6 "
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QrcodeItem;
