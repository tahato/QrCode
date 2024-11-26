import { View, Text, TextInput, Image } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import {icons} from '../constants'
const FormField = ({
  title,
  value,
  handleChange,
  otherStyle,
  placeholder,
  keyboardType,
}) => {
  const  [showPassword,setShowPassword]=useState(false)
  return (
    <View className={`space-y-2 ${otherStyle} gap-2`}>
      <Text className="text-white">{title}</Text>
      <View className=" bg-black-100 h-16 rounded-xl border-2 border-black-200 px-4 flex-row items-center   ">
        <TextInput
          className="text-white flex-1 "
          value={value}
          onChangeText={handleChange}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          keyboardType={keyboardType}
          secureTextEntry={title==='Password' && !showPassword}
        />
        {title==='Password' && (
          
          <TouchableOpacity 
          onPress={()=>setShowPassword(!showPassword)} >
            <Image source= {!showPassword? icons.eye : icons.eyeHide}
            className='w-6 h-6'
            resizeMode="contain"
            
            />
         
          </TouchableOpacity>  
        )} 
       
      </View>
    </View>
    
  );
};

export default FormField;
