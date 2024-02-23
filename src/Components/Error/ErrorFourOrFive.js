import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, Fonts, SIZES } from '@/Theme/Variables'
import Spacer from '../Base/Spacer'

const ErrorFourOrFive = ({ isFlex = true }) => {
  return (
    <View
      style={[
        isFlex && { flex: 1 },
        {
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: SIZES.margin_h,
          backgroundColor: Colors.white,
        },
      ]}
    >
      <Text
        style={{
          fontSize: 40,
          fontFamily: Fonts.medium,
          color: Colors.neutralBlack02,
          textAlign: 'center',
        }}
      >
        🙏🏾🙏🏾🙏🏾
      </Text>
      <Spacer height={10} />
      <Text
        style={{
          fontSize: 18,
          fontFamily: Fonts.medium,
          color: Colors.neutralBlack02,
          textAlign: 'center',
          lineHeight: 30,
        }}
      >
        Maaf, sedang ada gangguan nih {'\n'}Biar Prestisa beresin
      </Text>
    </View>
  )
}

export default ErrorFourOrFive

const styles = StyleSheet.create({})
