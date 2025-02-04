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
  
  const Receive = () => {
    const { user } = useGlobalContext();
    const [code, setCode] = useState();
    const [title, setTitle] = useState("");
    const [visible, setVisible] = useState(false);
    const [isScanning, setIsScanning] = useState(true);
    const [token, setToken] = useState();
  
    //get token from local storage
    useEffect(() => {
      getToken();
    }, []);
    const getToken = async () => {
      const token = await getItem("token");
      setToken(token);
    };
  
    // const AddCode = async () => {
    //   if(title!=""){
        
    //     try {
    //       await axios
    //         .post(
    //           "http://192.168.1.11:8000/api/qrcode/create",
    //           {
    //             title,
    //             code,
    //             user_id: user.id,
    //           },
    //           {
    //             headers: { Authorization: "Bearer " + token },
    //           }
    //         )
    //         .then((res) => {
    //           setVisible(false);
    //           router.replace("/codes");
    //         })
    //         .catch((e) =>{ Alert.alert(e.response.data.error,
    //            e.response.data.qrCode.title
    //            +'\n'+
    //            e.response.data.qrCode.code,
    //            [
    //                       {
    //                         text: "ok",
    //                         onPress: () => {
    //                           setVisible(false);
    //                           setIsScanning(true);
    //                           setTitle(null);
    //                         },
    //                       },
    //                     ]
    //             )
    
              
    //         });
    //     } 
    //     catch (e) {  console.log(e);}
    //   }else (Alert.alert('Please, set a tile'))
    // }
  
  
  
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
                  // showDialog();
                }
              : undefined
          }
        ></CameraView>
      
      
       <Overlay/>
      </SafeAreaView>
    );
  };
  
  export default Receive;
  