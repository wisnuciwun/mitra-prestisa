import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Spacer from '../Base/Spacer'
import { Colors, Fonts, SIZES } from '@/Theme/Variables'

const LocationNotCovered = () => {
  return (
    <View
      style={{
        marginHorizontal: SIZES.margin_h,
        alignItems: 'center',
        marginTop: 60,
      }}
    >
      <Text
        style={{
          textAlign: 'center',
          fontFamily: Fonts.medium,
          color: Colors.neutralBlack02,
          fontSize: 18,
          lineHeight: 25,
        }}
      >
        Maaf,
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontFamily: Fonts.medium,
          color: Colors.neutralBlack02,
          fontSize: 18,
          lineHeight: 25,
        }}
      >
        Layanan belum tersedia di lokasi
      </Text>
      <Spacer height={16} />
      <Text
        style={{
          textAlign: 'center',
          fontFamily: Fonts.regular,
          color: Colors.neutralBlack02,
          fontSize: 16,
          lineHeight: 23,
          width: 330,
        }}
      >
        Saat ini kami belum bisa melayani daerah ini. Kamu bisa coba daerah lain
        untuk melanjutkan
      </Text>
    </View>
  )
}

export default LocationNotCovered

const styles = StyleSheet.create({})
