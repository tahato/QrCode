import { View, Text, Button, Pressable } from "react-native";
import React, { useEffect } from "react";
import QRCode from "react-native-qrcode-svg";
import { useGlobalContext } from "@/context/GlobaleProvider";

const Share = ({ visible, setVisibleShare }) => {
  const {  token,itemToShare } = useGlobalContext();



useEffect(() => {
 console.log(itemToShare);
 
}, [])


const cancel = async (id) => {
    await axios
      .delete(`${process.env.EXPO_PUBLIC_API_URL}/api/transfer/delete/${id}`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        console.log(res.data);
        setRefetch(!refetch);
      })
      .catch((e) => console.log(e.response.data));
      setVisibleShare(false);

  };
  return (
    <>
      {visible ? (
        <View className="z-50 bg-white w-full h-full justify-center items-center flex p-8">

          <View className="flex-1 items-center justify-center pt-12">
            <QRCode value={itemToShare} size={180} />
          </View>
          <Text className="mb-12 font-semibold text-lg ">
            Scan to transefer this code{" "}
          </Text>

          <View className=" flex-row justify-center w-full px-4 mb-4 gap-3">
            <Pressable onPress={cancel}>
              <Text className="text-xl font-bold bg-blue-500 p-2 w-40 text-center rounded-[50] text-white border-blue-700 border-1">
                cancel
              </Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

export default Share;
