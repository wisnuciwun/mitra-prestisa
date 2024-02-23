import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import ModalCenter from '../Base/ModalCenter'
import { Fonts, SIZES, Colors } from '@/Theme/Variables'
import ButtonBase from '../Base/ButtonBase'
import { Divider } from '@rneui/base'
import Spacer from '../Base/Spacer'

const ModalCenterConfirmation = ({
  isVisible,
  onPressClose = () => {},
  onPressAccept,
  ...props
}) => {
  return (
    <ModalCenter
      isVisible={isVisible}
      {...props}
      heightModal={null}
      widthModal={SIZES.width_window - 48}
    >
      <View style={{ marginHorizontal: 20, marginVertical: 28 }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 18,
            fontFamily: Fonts.bold,
            color: Colors.neutralBlack02,
          }}
        >
          Produk sudah sesuai ?
        </Text>
        <Spacer height={12} />
        <Text
          style={{
            fontSize: 18,
            fontFamily: Fonts.regular,
          }}
        >
          Setelah ini kamu sudah tidak bisa meminta perbaikan produk
        </Text>
      </View>
      <Divider width={1.5} color={Colors.neutralGray05} />

      <View style={{ flexDirection: 'row', marginVertical: 14 }}>
        <ButtonBase
          onPress={onPressClose}
          title="Kembali revisi"
          mode="outline"
          style={{ height: 38, borderColor: 'transparent' }}
          istextStyle={true}
          textStyle={{
            elevation: 0,
            color: Colors.neutralBlack02,
            fontFamily: Fonts.medium,
          }}
        />
        <ButtonBase
          onPress={onPressAccept}
          title="Ya, lanjutkan"
          istextStyle={true}
          textStyle={{
            elevation: 0,
            color: Colors.neutralGray07,
            fontFamily: Fonts.medium,
          }}
          style={{ height: 38 }}
        />
      </View>
    </ModalCenter>
  )
}

export default ModalCenterConfirmation

const styles = StyleSheet.create({})
