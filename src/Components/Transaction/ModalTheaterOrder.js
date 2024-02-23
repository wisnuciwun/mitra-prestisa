import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { useTheme } from '@/Hooks'
import PropTypes from 'prop-types'
import { Colors } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import FeatherIcon from 'react-native-vector-icons/Feather'
import FastImage from 'react-native-fast-image'

const ModalTheaterOrder = ({ data, closeTheater }) => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const dispatch = useDispatch()
  // console.log('Masuk di dalem', data)
  useEffect(() => {}, [])
  return (
    <View style={[st.screen]}>
      <View
        style={[
          st.screenModal,
          { alignContent: 'center', justifyContent: 'center' },
        ]}
      >
        <View style={{ position: 'absolute', top: 10, left: 10 }}>
          <FeatherIcon
            onPress={closeTheater}
            color={Colors.neutralGray07}
            name="x"
            size={30}
          ></FeatherIcon>
        </View>
        <View
          style={{
            alignSelf: 'center',
            width: '95%',
          }}
        >
          <View>
            <FastImage
              style={{
                height: windowWidth - 20,
                width: windowWidth - 20,
                backgroundColor: Colors.neutralGrayBlue,
              }}
              resizeMode="cover"
              source={{
                uri: data.image,
              }}
            ></FastImage>
          </View>
          <Text
            style={{
              marginTop: 10,
              marginLeft: 10,
              color: Colors.neutralGray07,
            }}
          >
            {data.product_name}
          </Text>
        </View>
      </View>
    </View>
  )
}
const st = StyleSheet.create({
  screenModal: { backgroundColor: 'rgba(0, 0, 0, 0.90)', height: '100%' },
  button: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderColor: Colors.neutralGray04,
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 5,
  },
  button2: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderColor: Colors.neutralGray04,
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    flex: 1,
  },
  buttonText: {
    fontSize: 14,
    color: Colors.neutralBlack02,
    fontWeight: 'bold',
  },
})
export default ModalTheaterOrder
