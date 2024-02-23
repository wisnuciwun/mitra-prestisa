import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import ModalCenter from '../Base/ModalCenter'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { SIZES, Fonts, Colors } from '@/Theme/Variables'
import Spacer from '../Base/Spacer'
import TextTouchable from '../RingkasanPesanan/TextTouchable'

const ModalCenterTambahkanFoto = ({
  isVisible,
  onClose,
  onUseCam,
  onUseGallery,
  title = 'Upload Foto',
}) => {
  return (
    <ModalCenter
      isVisible={isVisible}
      isDefaultStlye={false}
      styleModalBody={{
        padding: 20,
        width: SIZES.width_window - 46 * 2,
        backgroundColor: Colors.white,
        borderRadius: 10,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: Fonts.medium,
            color: Colors.neutralBlack01,
          }}
        >
          {title}
        </Text>
        <TouchableOpacity onPress={onClose}>
          <FeatherIcon name={'x'} size={16} color={Colors.neutralBlack02} />
        </TouchableOpacity>
      </View>
      <Spacer height={20} />
      <TextTouchable
        text="Gunakan Kamera"
        textStyles={{ fontFamily: Fonts.regular, color: Colors.neutralBlack01 }}
        onPress={onUseCam}
      />
      <Spacer height={20} />
      <TextTouchable
        text="Ambil dari Gallery"
        textStyles={{ fontFamily: Fonts.regular, color: Colors.neutralBlack01 }}
        onPress={onUseGallery}
      />
      <Spacer height={10} />
    </ModalCenter>
  )
}

export default ModalCenterTambahkanFoto

const styles = StyleSheet.create({})
