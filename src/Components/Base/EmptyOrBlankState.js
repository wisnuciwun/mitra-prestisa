import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import { useTheme } from '@/Hooks'
import PropTypes from 'prop-types'

import { useNavigation } from '@react-navigation/native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { Colors, Fonts } from '@/Theme/Variables'
import FastImage from 'react-native-fast-image'
import { Assets } from '@/Theme/Assets'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import Spacer from '@/Components/Base/Spacer'
import { Divider } from '@rneui/themed'
import CardProduct from '@/Components/CardProduct'
import { Config } from '@/Config'

const EmptyOrBlankState = ({
  messageBody,
  title,
  image,
  titleButton,
  buttonOnPress,
  imageHeight = 104,
  imageWidth = 104,
}) => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height

  useEffect(() => {}, [])

  return (
    <View
      style={{
        justifyContent: 'center',
        marginHorizontal: 60,
      }}
    >
      <Spacer height={32} />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <FastImage
          source={image}
          style={{ height: imageHeight, width: imageWidth, marginBottom: 10 }}
        />
        <Spacer height={16} />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              fontFamily: Fonts.medium,
              fontSize: 16,
              lineHeight: 22.4,
              fontWeight: '600',
              marginBottom: 10,
              color: Colors.neutralBlack02,
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: Fonts.regular,
              fontSize: 14,
              lineHeight: 22.4,
              color: Colors.neutralBlack02,
            }}
          >
            <Text>{messageBody}</Text>
          </Text>
        </View>
        {titleButton != undefined && (
          <View>
            <TouchableOpacity
              onPress={buttonOnPress}
              style={{
                paddingHorizontal: 25,
                paddingVertical: 10,
                borderColor: Colors.neutralBlack01,
                borderWidth: 1,
                marginTop: 20,
                borderRadius: 5,
              }}
            >
              <Text style={{ color: Colors.neutralBlack01, fontSize: 16 }}>
                {titleButton}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {},
})
export default EmptyOrBlankState
