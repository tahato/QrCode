import { View, Text } from 'react-native'
import React from 'react'

const Overlay = () => {
  return (
  <>
   <View className="bg-black w-full h-[30%] opacity-50" />
      <View className="flex-row flex-1 items-center justify-center">
        <View className="bg-black h-full flex-1  opacity-50" />
        <View className="w-[70%] rounded-lg border-2 h-full border-white" />

        <View className="bg-black h-full flex-1 opacity-50" />
      </View>

      <View className="bg-black w-full h-[30%] opacity-50" />
  </>
  )
}

export default Overlay