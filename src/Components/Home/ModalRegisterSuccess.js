import { Assets } from '@/Theme/Assets'
import { Colors, Fonts } from '@/Theme/Variables'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import Modal from 'react-native-modal'
import Spacer from '../Base/Spacer'

export const ModalRegisterSuccess = ({ isVisible, onPressOk, ...props }) => {
  return (
    <Modal isVisible={isVisible} style={{ alignItems: 'center' }} {...props}>
      <View
        style={{
          backgroundColor: 'white',
          height: 228,
          width: 260,
          borderRadius: 12,
        }}
      >
        <View
          style={{
            paddingVertical: 28,
            paddingHorizontal: 16,
            alignItems: 'center',
          }}
        >
          <FastImage
            source={Assets.check_mark_outline_primary_big_3x}
            style={{ height: 32, width: 32 }}
            resizeMode={'contain'}
          />
          <Spacer height={12} />
          <Text
            style={{
              textAlign: 'center',
              fontFamily: Fonts.regular,
              color: Colors.neutralBlack02,
              fontSize: 16,
              lineHeight: 23,
            }}
          >
            Register akun kamu berhasil. Ayo cek Email untuk{' '}
            <Text
              style={{
                textAlign: 'center',
                fontFamily: Fonts.bold,
                color: Colors.neutralBlack02,
                fontSize: 16,
                lineHeight: 23,
              }}
            >
              Verifikasi
            </Text>{' '}
            agar akun kamu lebih aman
          </Text>
        </View>
        <View style={{ height: 1, backgroundColor: 'red' }} />
        <TouchableOpacity onPress={onPressOk}>
          <Text
            style={{
              paddingHorizontal: 12,
              paddingVertical: 16,
              textAlign: 'center',
              color: Colors.primary,
              fontFamily: Fonts.medium,
              fontSize: 16,
            }}
          >
            OK, Saya Mengerti
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}
