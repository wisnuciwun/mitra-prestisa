import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { STYLES } from '@/Theme/Styles'
import { Colors, Fonts } from '@/Theme/Variables'
import TextTouchable from '../RingkasanPesanan/TextTouchable'
import Spacer from '../Base/Spacer'

const CardAddress = ({
  full_name = 'Full Name',
  address = 'Address Street',
  phone = '0123456789',
  onPress = () => {},
}) => {
  return (
    <View
      style={[
        STYLES.shadow_bottom,
        {
          borderRadius: 6,
          elevation: 6,
          height: 132,
          backgroundColor: Colors.white,
          padding: 16,
          justifyContent: 'space-between',
          flexDirection: 'column',
          borderWidth: 2,
          borderColor: Colors.white,
        },
      ]}
    >
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              fontFamily: Fonts.medium,
              fontSize: 16,
              color: Colors.neutralBlack01,
              lineHeight: 22.4,
            }}
          >
            {full_name}
          </Text>
          <TextTouchable
            text="Ganti"
            textStyles={{ color: Colors.otherBlue, fontSize: 14 }}
            onPress={onPress}
          />
        </View>

        <Spacer height={8} />
        <Text
          style={{
            fontFamily: Fonts.regular,
            fontSize: 13,
            color: Colors.neutralBlack01,
            lineHeight: 18,
          }}
        >
          {address}
        </Text>
        <Spacer height={8} />
        <Text
          style={{
            fontFamily: Fonts.regular,
            fontSize: 13,
            color: Colors.neutralBlack01,
            lineHeight: 18,
          }}
        >
          {phone} (Whatsapp)
        </Text>
      </View>
    </View>
  )
}

export default CardAddress

const styles = StyleSheet.create({})
