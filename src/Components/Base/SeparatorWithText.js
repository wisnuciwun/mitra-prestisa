import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useTheme } from '@/Hooks'
import { Colors } from '@/Theme/Variables'
const SeparatorWithText = props => {
  const { Common, Fonts, Gutters, Layout } = useTheme()
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View
        style={{
          flex: 1,
          height: 1,
          backgroundColor: Colors.neutralGrayUnknown,
        }}
      />
      <View style={{ flex: 2 }}>
        <Text
          style={[
            {
              textAlign: 'center',
              fontWeight: '400',
              fontFamily: 'Roboto-Regular',
              fontSize: 15,
              color: Colors.neutralBlack02,
            },
            Fonts.textMini,
          ]}
        >
          {props.title}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          height: 1,
          backgroundColor: Colors.neutralGrayUnknown,
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {},
})
export default SeparatorWithText
