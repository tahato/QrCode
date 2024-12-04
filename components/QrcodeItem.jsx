import {
  View,
  Text,
  Linking,
  TouchableOpacity,
  Image,
  Clipboard,
  ToastAndroid,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { icons } from "@/constants";
import Dialog from "react-native-dialog";
import { useState } from "react";
import { deleteCodes } from "@/util/AsyncStorage";

const QrcodeItem = ({ item }) => {
  const [visibleDelete, setVisibleDelete] = useState(false);

  const handleDelete = async (createdAt) => {
    const codes = await deleteCodes(createdAt);
    setVisibleDelete(false);
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
            onPress={() => handleDelete(item.createdAt)}
          />
        </Dialog.Container>
      </View>

      <View className="mr-8">
        <Text className="text-white font-semibold text-2xl  " numberOfLines={1}>
          {item.title}
        </Text>
        <TouchableOpacity
          className="px-4 "
          onPress={() => Linking.openURL(item.code)}
          onLongPress={() => {
            Clipboard.setString(item.code);
            ToastAndroid.show("copied", ToastAndroid.SHORT);
          }}
        >
          <Text className="text-white">{item.code}</Text>
          <Text className="text-gray-100 text-xs ">{item.createdAt}</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-1 flex-row justify-end items-center ">
        <TouchableOpacity
          className=" mr-2  bg-gray-400 rounded-full p-2  "
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
