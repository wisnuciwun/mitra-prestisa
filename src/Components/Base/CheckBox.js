import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors, Fonts } from '@/Theme/Variables'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Spacer from './Spacer'

const CheckBox = ({
  label = 'Check boxxxx',
  checked = false,
  disabled,
  onPressCheck,
  onPressUnCheck,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <TouchableOpacity
        onPress={() => {
          checked ? onPressUnCheck() : onPressCheck()
        }}
        style={{
          height: 30,
          width: 30,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        disabled={disabled}
      >
        <MaterialCommunityIcon
          name={checked ? 'checkbox-marked' : 'checkbox-blank-outline'}
          size={26}
          color={Colors.neutralBlack02}
        />
      </TouchableOpacity>
      <Spacer width={10} />
      <Text
        style={{
          fontFamily: Fonts.medium,
          fontSize: 15,
          lineHeight: 24,
          color: Colors.neutralBlack02,
        }}
      >
        {label}
      </Text>
    </View>
  )
}

export default CheckBox

const styles = StyleSheet.create({})
