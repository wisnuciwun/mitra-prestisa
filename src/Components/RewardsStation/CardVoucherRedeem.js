import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { isEmptyNullOrUndefined, numberWithCommas } from '@/Helper'
import FastImage from 'react-native-fast-image'
import { Assets } from '@/Theme/Assets'
import IconCoins from '../Icons/IconCoins'
import Spacer from '../Base/Spacer'
import { STYLES } from '@/Theme/Styles'
import { Colors, Fonts } from '@/Theme/Variables'

const CardVoucherRedeem = ({ width = 144, ...props }) => {
  return (
    <View
      style={[
        STYLES.shadow_bottom,
        {
          width: width,
          borderRadius: 6,
          overflow: 'hidden',
        },
        props.style,
      ]}
    >
      <FastImage
        source={{
          uri: isEmptyNullOrUndefined(props.img)
            ? Assets.noImageUrl
            : props.img,
        }}
        style={[{ width: width, height: 80 }, props.styleImage]}
      />
      <View style={{ padding: 10, flex: 1, backgroundColor: Colors.white }}>
        <Text
          style={{
            fontSize: 13,
            fontFamily: Fonts.medium,
            color: Colors.neutralBlack02,
            lineHeight: 18.2,
          }}
        >
          {props.name}
        </Text>
        <Spacer height={16} />
        <Text
          style={{
            fontSize: 16,
            fontFamily: Fonts.bold,
            color: Colors.primary,
          }}
        >
          Rp{numberWithCommas(props.ammounts)}
        </Text>
        <Spacer height={10} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <IconCoins color={Colors.neutralGray01} />
          <Spacer width={4} />
          <Text
            style={{
              fontSize: 13,
              fontFamily: Fonts.medium,
              color: Colors.neutralGray01,
            }}
          >
            {numberWithCommas(props.ammounts)} points
          </Text>
        </View>
      </View>
    </View>
  )
}

export default CardVoucherRedeem

const styles = StyleSheet.create({})
