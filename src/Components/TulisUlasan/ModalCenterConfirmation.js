import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ModalCenter from '../Base/ModalCenter'
import { Colors, Fonts, SIZES } from '@/Theme/Variables'
import FastImage from 'react-native-fast-image'
import { Assets } from '@/Theme/Assets'
import { Divider } from '@rneui/base'
import TextTouchable from '../RingkasanPesanan/TextTouchable'
import Spacer from '../Base/Spacer'

const ModalCenterConfirmation = ({ isVisible, onConfirm, data, ...props }) => {
  return (
    <ModalCenter
      isVisible={isVisible}
      heightModal={null}
      widthModal={256}
      {...props}
    >
      <View style={{ marginVertical: 24, alignItems: 'center' }}>
        <FastImage
          source={{ uri: data.icon }}
          style={{ height: 40, width: 40 }}
        />
        <Spacer height={12} />
        <Text
          style={{
            fontFamily: Fonts.bold,
            color: Colors.neutralBlack02,
            fontSize: 16,
          }}
        >
          {data.title}
        </Text>
        <Spacer height={8} />
        <Text
          style={{
            textAlign: 'center',
            lineHeight: 19.6,
            marginHorizontal: 16,
            color: Colors.neutralBlack02,
            fontFamily: Fonts.regular,
            fontSize: 14,
          }}
        >
          {data.message}
        </Text>
      </View>
      <Divider width={1} color={Colors.neutralGray05} />
      <View
        style={{
          marginVertical: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TextTouchable
          text="OK, Saya Mengerti"
          onPress={onConfirm}
          textStyles={{ color: Colors.primary }}
        />
      </View>
    </ModalCenter>
  )
}

export default ModalCenterConfirmation

const styles = StyleSheet.create({})
