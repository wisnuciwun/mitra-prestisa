import React, { useState } from 'react'
import { Colors, Fonts, SIZES } from '@/Theme/Variables'
import { Divider } from '@rneui/base'
import { Text, View } from 'react-native'
import Spacer from '../Base/Spacer'
import ProductListItem from './ProductListItem'

const MultiProductListItem = ({
  index = 1,
  total = 4,
  name,
  price,
  imgSource,
}) => {
  return (
    <View>
      <View>
        <Text
          style={{
            fontFamily: Fonts.medium,
            fontSize: 14,
            color: Colors.primary,
            lineHeight: 19.4,
          }}
        >
          Product {index} dari {total}
        </Text>
      </View>
      <Spacer height={8} />
      <Divider width={1} color={Colors.neutralGray06} />
      <Spacer height={16} />
      <ProductListItem name={name} imgSource={imgSource} price={price} />
    </View>
  )
}

export default MultiProductListItem
