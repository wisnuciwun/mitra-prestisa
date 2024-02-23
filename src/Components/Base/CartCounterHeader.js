import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { useTheme } from '@/Hooks'
import PropTypes from 'prop-types'
import { Colors } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import FeatherIcon from 'react-native-vector-icons/Feather'

const CartCounterHeader = ({ size, iconColor, mode }) => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()

  const cart = useSelector(state => state.cart)

  let jum = 0
  cart.data.map((item, index) => {
    item.cart_items.map((pr, i) => {
      // console.log(pr)
      jum += pr.counter
    })
  })
  if (size == undefined) {
    size = 20
  }

  //   console.log('jum cart:', jum)
  return (
    <View>
      <View
        style={[
          Layout.row,
          { justifyContent: 'flex-start', overflow: 'visible' },
        ]}
      >
        {jum > 0 && (
          <View
            style={{
              backgroundColor: mode == 'dark' ? '#EBEDF1' : '#991F5D',
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'visible',
              //   padding: 3,
              height: size * 0.75,
              width: size * 0.75,
              position: 'absolute',
              left: size / 2,
              zIndex: 1000,
              bottom: size / 2,
            }}
          >
            <Text
              style={{
                color: mode == 'dark' ? '#991F5D' : 'white',
                fontSize: 10,
                fontWeight: 'bold',
              }}
            >
              {jum}
            </Text>
          </View>
        )}
        <FeatherIcon
          style={{
            alignSelf: 'flex-start',
            justifyContent: 'flex-start',
            fontSize: size == undefined ? 20 : size,
            color: iconColor == undefined ? '#1D1619' : iconColor,
            marginRight: 20,
          }}
          name="shopping-bag"
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {},
})
export default CartCounterHeader
