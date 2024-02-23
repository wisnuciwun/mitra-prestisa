import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import Spacer from '../Base/Spacer'
import { Fonts, Colors, SIZES } from '@/Theme/Variables'
import { numberWithCommas } from '@/Helper'

const ProductListItem = ({
  name = 'Product Name Name',
  price = '999.999.000',
  imgSource = 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d',
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
      }}
    >
      <FastImage
        source={{ uri: `${imgSource}` }}
        style={{ height: 72, width: 72, borderRadius: 4 }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <Spacer width={18} />
      <View
        style={{
          flexDirection: 'column',
        }}
      >
        <Text
          style={[
            productListItem.title,
            { width: SIZES.width_window - (72 + 18 + SIZES.margin_h * 2) },
          ]}
        >
          {name}
        </Text>
        <Spacer height={4} />
        <Text style={[productListItem.price]}>Rp{numberWithCommas(price)}</Text>
      </View>
    </View>
  )
}

export default ProductListItem

const productListItem = StyleSheet.create({
  title: {
    fontFamily: Fonts.medium,
    fontSize: 15,
    lineHeight: 24,
    color: Colors.neutralBlack02,
    textTransform: 'capitalize',
  },
  price: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    lineHeight: 24,
    color: Colors.neutralBlack02,
  },
})
