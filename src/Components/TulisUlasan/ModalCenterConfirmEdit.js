import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import ModalCenter from '../Base/ModalCenter'
import { Fonts, SIZES, Colors } from '@/Theme/Variables'
import ButtonBase from '../Base/ButtonBase'
import { Divider } from '@rneui/base'
import Spacer from '../Base/Spacer'

const ModalCenterConfimEdit = ({
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
          Sudah yakin Rating dan Ulasannya?
        </Text>
        <Spacer height={12} />
        <Text
          style={{
            fontSize: 18,
            fontFamily: Fonts.regular,
            textAlign: 'center',
          }}
        >
          Setelah ini kamu sudah tidak bisa mengubah rating dan ulasanmu
        </Text>
      </View>
      <Divider width={1.5} color={Colors.neutralGray05} />

      <View
        style={{
          flexDirection: 'row',
          marginVertical: 14,
          justifyContent: 'space-between',
          marginHorizontal: 24,
        }}
      >
        <ButtonBase
          onPress={onPressClose}
          title="Tidak jadi"
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
          title="Ya, simpan"
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

export default ModalCenterConfimEdit

const styles = StyleSheet.create({})
