import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { useTheme } from '@/Hooks'
import PropTypes from 'prop-types'
import { Colors } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'

const LabelText = ({ title, required, isOtherRed = false, TextStyle }) => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const dispatch = useDispatch()

  useEffect(() => {}, [])
  return (
    <View style={[styles.screen]}>
      <Text
        style={[
          Fonts.textSmall,
          {
            fontFamily: 'Roboto-Medium',
            fontWeight: '400',
            fontSize: 14,
            color: Colors.neutralBlack02,
          },
          TextStyle,
        ]}
      >
        {title}
        {required ? (
          <Text style={[{ color: isOtherRed ? Colors.otherRed : 'red' }]}>
            *
          </Text>
        ) : (
          <></>
        )}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {},
})
export default LabelText
