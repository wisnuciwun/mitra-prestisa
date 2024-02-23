import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Skeleton } from '@rneui/base'

const SkeletonRowsTabs = () => {
  return (
    <View>
      <Text>SkeletonRowsTabs</Text>
      <Skeleton />
    </View>
  )
}

export default SkeletonRowsTabs

const styles = StyleSheet.create({})

const SkeletonImg = () => {
  return <Skeleton width={50} />
}
const ProductCategoryTab = ({ data }) => {
  const state = useSelector(state => state)
  const navigation = useNavigation()
  return (
    <View
      style={{
        // backgroundColor: 'red',
        marginHorizontal: marginHorizontal,
        marginTop: 16,
      }}
    >
      <Text
        style={{
          fontFamily: Fonts.medium,
          fontSize: 16,
          fontWeight: '500',
          color: Colors.neutralBlack01,
        }}
      >
        Kategory Produk
      </Text>
      <Spacer height={20} />

      <Spacer height={19} />
    </View>
  )
}
