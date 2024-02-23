import { Colors, Fonts } from '@/Theme/Variables'
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Spacer from '../Base/Spacer'

export const ButtonBackToTop = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={{
        height: 34,
        width: 170,
        backgroundColor: '#991F5D',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        flexDirection: 'row',
      }}
      onPress={onPress}
    >
      <Text
        style={{
          fontFamily: Fonts.medium,
          fontSize: 16,
          color: Colors.neutralGray07,
        }}
      >
        Kembali ke atas
      </Text>
      <Spacer width={5} />
      <Icon color="white" size={24} name="chevron-up" />
    </TouchableOpacity>
  )
}
