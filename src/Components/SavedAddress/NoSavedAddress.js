import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import { Assets } from '@/Theme/Assets'
import { Colors, Fonts, SIZES } from '@/Theme/Variables'
import Spacer from '../Base/Spacer'
import ButtonBase from '../Base/ButtonBase'

const NoSavedAddress = ({ onPressAddAddress }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <FastImage
        source={Assets.no_saved_address_3x}
        style={{ height: 70, width: 70 }}
      />
      <Spacer height={12} />
      <View style={{ paddingHorizontal: SIZES.margin_h * 2 }}>
        <Text
          style={{
            fontSize: 15,
            fontFamily: Fonts.bold,
            color: Colors.neutralGray01,
            textAlign: 'center',
          }}
        >
          Belum ada alamat tersimpan
        </Text>
        <Spacer height={12} />
        <Text
          style={{
            fontSize: 14,
            fontFamily: Fonts.regular,
            color: Colors.neutralGray01,
            textAlign: 'center',
            lineHeight: 20,
          }}
        >
          Pilih{' '}
          <Text style={{ fontFamily: Fonts.bold }}>'Tambah Alamat Baru'</Text>{' '}
          untuk menyimpan alamat kamu ataupun tujuan pengiriman mu
        </Text>
      </View>
      <Spacer height={24} />
      <ButtonBase
        mode="outline"
        title="Tambah Alamat Baru"
        textColorTypeOutline={Colors.neutralBlack02}
        style={{ borderColor: Colors.neutralBlack02 }}
        onPress={onPressAddAddress}
      />
    </View>
  )
}

export default NoSavedAddress

const styles = StyleSheet.create({})
