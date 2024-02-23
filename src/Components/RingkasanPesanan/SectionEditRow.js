import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TextTouchable from './TextTouchable'
import { Colors, Fonts } from '@/Theme/Variables'

const SectionEditRow = ({
  title = 'Titleeee',
  fontSize = 14,
  isEdit = true,
  onPressUbah = () => {},
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Text
        style={{
          fontFamily: Fonts.medium,
          fontSize: fontSize,
          lineHeight: 24,
          color: Colors.neutralBlack02,
        }}
      >
        {title}
      </Text>
      {isEdit && (
        <TextTouchable
          textStyles={{ fontSize: fontSize }}
          onPress={onPressUbah}
        />
      )}
    </View>
  )
}

export default SectionEditRow

const styles = StyleSheet.create({})
