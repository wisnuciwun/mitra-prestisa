import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { SIZES, Fonts, Colors } from '@/Theme/Variables'
import { STYLES } from '@/Theme/Styles'
import Spacer from '../Base/Spacer'
import TextTouchable from '../RingkasanPesanan/TextTouchable'
import TouchableIconTextRow from '../Base/TouchableIconTextRow'

const CardAddress = ({
  full_name = 'Full Name',
  address = 'Address Street',
  phone = '0123456789',
  isTouchTextTopRight = false,
  touchTextTopRightComp,
  onPressChangeAddress,
  onPressRemoveAddress,
}) => {
  return (
    <View
      style={[
        STYLES.shadow_bottom,
        {
          borderRadius: 6,
          elevation: 6,
          //   height: 158,
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
            alignItems: 'center',
          }}
        >
          <Text
            style={[
              {
                fontFamily: Fonts.medium,
                fontSize: 16,
                lineHeight: 22.4,
                color: Colors.neutralBlack01,
              },
            ]}
          >
            {full_name}
          </Text>
          {isTouchTextTopRight && React.createElement(touchTextTopRightComp)}
        </View>
        <Spacer height={8} />
        <Text
          style={[
            {
              fontFamily: Fonts.regular,
              fontSize: 13,
              lineHeight: 18,
              color: Colors.neutralBlack01,
            },
          ]}
        >
          {phone}
        </Text>
        <Spacer height={8} />
        <Text
          style={[
            {
              fontFamily: Fonts.regular,
              fontSize: 13,
              lineHeight: 18,
              color: Colors.neutralBlack01,
            },
          ]}
        >
          {address}
        </Text>
        <Spacer height={8} />
        <TouchableIconTextRow
          icon="map-pin"
          text="Point Pin"
          textStyle={{ fontFamily: Fonts.regular, fontSize: 13 }}
          textColor={'#096B08'}
          iconColor={'#096B08'}
          iconSize={16}
          spacerH={8}
        />
        <Spacer height={8} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: SIZES.width_window / 2 - SIZES.margin_h,
          justifyContent: 'space-between',
        }}
      >
        <TextTouchable
          text="Ubah alamat"
          textStyles={{ color: Colors.neutralGray01, fontSize: 14 }}
          onPress={onPressChangeAddress}
        />
        <TextTouchable
          text="Hapus"
          textStyles={{ color: Colors.neutralGray01, fontSize: 14 }}
          onPress={onPressRemoveAddress}
        />
      </View>
    </View>
  )
}

export default CardAddress

const styles = StyleSheet.create({})
