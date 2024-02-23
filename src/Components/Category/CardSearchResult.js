import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useTheme } from '@/Hooks'

import Spacer from '@/Components/Base/Spacer'

import { Colors, Fonts } from '@/Theme/Variables'

import FastImage from 'react-native-fast-image'
import { Config } from '@/Config'
import { useNavigation } from '@react-navigation/native'

const CardSearchResult = ({ onPress, data, category }) => {
  const navigation = useNavigation()
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()

  const numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  function numFormatter(num) {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(0) + 'rb' // convert to K for number from > 1000 < 1 million
    } else if (num > 1000000) {
      return (num / 1000000).toFixed(0) + 'jt' // convert to M for number from > 1 million
    } else if (num < 900) {
      return num // if value < 1000, nothing to do
    }
  }

  useEffect(() => {}, [])

  const ApiUrl = Config.API_URL
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.push('ProductDetail', { product_id: data.id })
        // navigation.reset({
        //   index: 2,
        //   routes: [{ name: 'ProductDetail', params: { product_id: data.id } }],
        // })
      }}
    >
      <View
        style={{
          // backgroundColor: 'green',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingHorizontal: 24,
          paddingVertical: 10,
        }}
      >
        <FastImage
          source={{ uri: data.image }}
          resizeMode="cover"
          style={{
            height: 32,
            width: 36,
            backgroundColor: Colors.neutralGray02,
            borderRadius: 4,
          }}
        />
        <Spacer width={12} />
        <View style={{ flexDirection: 'column' }}>
          <Text
            style={{
              fontFamily: Fonts.medium,
              fontSize: 13,
              fontWeight: '500',
              color: Colors.neutralGray01,
            }}
          >
            {data.name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              //   justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontFamily: Fonts.regular,
                fontSize: 12,
                fontWeight: '400',
                color: Colors.neutralGray01,
              }}
            >
              {/* Rp {numberWithCommas(data.diskon)} */}
              {numberWithCommas(
                data.discount > 0 ? data.sale_price : data.price,
              )}
            </Text>
            {data.discount > 0 && (
              <View
                style={{
                  flexDirection: 'row',
                  //   justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <View>
                  <Text
                    style={[
                      styles.cardTextSmall,
                      styles.pill,
                      styles.textPill,
                      { fontWeight: 'bold' },
                    ]}
                  >
                    -Rp{numFormatter(data.price - data.sale_price)}
                  </Text>
                </View>
                <View>
                  <Text
                    style={[
                      styles.cardTextSmall,
                      { textDecorationLine: 'line-through', fontSize: 14 },
                    ]}
                  >
                    Rp{numberWithCommas(data.price)}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}
const marginHorizontal = 24
const styles = StyleSheet.create({
  screen: {},
  pill: {
    backgroundColor: 'rgba(203, 58, 49, 0.1)',
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 5,
    marginHorizontal: 5,
    // marginRight: 5,
  },
  textPill: { color: '#CB3A31', fontSize: 10 },
})
export default CardSearchResult
