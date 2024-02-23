import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Colors } from '@/Theme/Variables'

const ButtonFullScreen = () => {
  return (
    <View
      style={{
        flexWrap: 'wrap',
      }}
    >
      <AntDesign
        name="arrowsalt"
        size={32}
        color={Colors.neutralBlack02}
        style={{
          padding: 3,
          borderRadius: 7,
          overflow: 'hidden',
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
        }}
      />
    </View>
  )
}

export default ButtonFullScreen

const styles = StyleSheet.create({})
