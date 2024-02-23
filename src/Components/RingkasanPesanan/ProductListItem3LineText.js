import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import Spacer from '../Base/Spacer'
import { Fonts, Colors, SIZES } from '@/Theme/Variables'
import { isEmptyNullOrUndefined, numberWithCommas } from '@/Helper'
import { isInteger } from 'lodash'

const ProductListItem3LineText = ({
  name = '',
  price = '',
  sizeContainer = 100,
  ongkir = '',
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
        style={{ height: sizeContainer, width: sizeContainer, borderRadius: 4 }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <Spacer width={18} />
      <View
        style={[
          { width: SIZES.width_window - (72 + 18 + SIZES.margin_h * 3.5) },
        ]}
      >
        <Text style={[productListItem.title]} numberOfLines={2}>
          {name}
        </Text>
        <Spacer height={4} />
        <Text style={[productListItem.price]}>Rp{numberWithCommas(price)}</Text>
        <Spacer height={10} />
        {isInteger(ongkir) && (
          <Text
            style={{
              fontFamily: Fonts.medium,
              fontSize: 12,
              lineHeight: 16,
              color: Colors.neutralBlack01,
            }}
          >
            + Biaya Pengiriman{' '}
            <Text style={{ color: Colors.primary }}>
              Rp {numberWithCommas(ongkir)}
            </Text>
          </Text>
        )}
      </View>
    </View>
  )
}

export default ProductListItem3LineText

const productListItem = StyleSheet.create({
  title: {
    fontFamily: Fonts.medium,
    fontSize: 15,
    lineHeight: 24,
    color: Colors.neutralBlack01,
  },
  price: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    lineHeight: 24,
    color: Colors.primary,
  },
})
