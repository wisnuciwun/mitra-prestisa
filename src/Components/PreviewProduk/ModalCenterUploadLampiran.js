import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import ModalCenter from '../Base/ModalCenter'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { SIZES, Fonts, Colors } from '@/Theme/Variables'
import Spacer from '../Base/Spacer'
import TextTouchable from '../RingkasanPesanan/TextTouchable'
import { ActivityIndicator } from 'react-native'

const ModalCenterUploadLampiran = ({
  isVisible,
  onClose,
  onUseCam,
  onUseGallery,
  disabled,
  isLoading,
}) => {
  return (
    <ModalCenter
      isVisible={isVisible}
      isDefaultStlye={false}
      styleModalBody={[
        {
          padding: 20,
          width: SIZES.width_window - 46 * 2,
          backgroundColor: Colors.white,
          borderRadius: 10,
        },
        isLoading && {
          height: 164,
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}
    >
      {isLoading ? (
        /*
         *Add Component ActiviyIndicator to handling background processing when Fn pick data (gallery or camera) from device
         */
        <>
          <ActivityIndicator color={Colors.primary} size="large" />
          <Spacer height={20} />
          <Text
            style={{
              fontSize: 16,
              fontFamily: Fonts.medium,
              color: Colors.primary,
            }}
          >
            Sedang Memproses...
          </Text>
        </>
      ) : (
        <>
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
              Upload Foto Referensi
            </Text>
            <TouchableOpacity onPress={onClose} disabled={disabled}>
              <FeatherIcon name={'x'} size={16} color={Colors.neutralBlack02} />
            </TouchableOpacity>
          </View>
          <Spacer height={20} />
          <TextTouchable
            text="Gunakan Kamera"
            textStyles={{
              fontFamily: Fonts.regular,
              color: Colors.neutralBlack01,
            }}
            onPress={onUseCam}
            disabled={disabled}
          />
          <Spacer height={20} />
          <TextTouchable
            text="Ambil dari Gallery"
            textStyles={{
              fontFamily: Fonts.regular,
              color: Colors.neutralBlack01,
            }}
            onPress={onUseGallery}
            disabled={disabled}
          />
          <Spacer height={10} />
        </>
      )}
    </ModalCenter>
  )
}

export default ModalCenterUploadLampiran

const styles = StyleSheet.create({})
