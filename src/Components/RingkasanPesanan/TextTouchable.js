import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Fonts } from '@/Theme/Variables'

const TextTouchable = ({ text = 'Ubah', onPress, textStyles, ...props }) => {
  return (
    <TouchableOpacity onPress={onPress} {...props}>
      <Text
        style={[
          {
            fontFamily: Fonts.medium,
            fontSize: 16,
            lineHeight: 24,
            paddingHorizontal: 2,
            color: '#0B4DBF',
          },
          textStyles,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  )
}

export default TextTouchable

const styles = StyleSheet.create({})
