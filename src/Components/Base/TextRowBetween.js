import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, Fonts } from '@/Theme/Variables'

const TextRowBetween = ({
  leftLabel,
  rightLabel,
  leftLabelStyle,
  rightLabelStyle,
  containerStyle,
}) => (
  <View
    style={[
      { flexDirection: 'row', justifyContent: 'space-between' },
      containerStyle,
    ]}
  >
    <Text
      style={[
        {
          fontSize: 14,
          fontFamily: Fonts.regular,
          color: Colors.neutralGray01,
        },
        leftLabelStyle,
      ]}
    >
      {leftLabel}
    </Text>
    <Text
      style={[
        {
          fontSize: 15,
          fontFamily: Fonts.medium,
          color: Colors.neutralBlack02,
        },
        rightLabelStyle,
      ]}
    >
      {rightLabel}
    </Text>
  </View>
)

export default TextRowBetween

const styles = StyleSheet.create({})
