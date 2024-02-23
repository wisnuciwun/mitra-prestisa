import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Modal } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Colors, SIZES, Fonts } from '@/Theme/Variables'
import FastImage from 'react-native-fast-image'
import { Assets } from '@/Theme/Assets'

const ModalUnderConstruction = ({ modalVisible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      presentationStyle="overFullScreen"
      visible={modalVisible}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.white,
          justifyContent: 'center',
        }}
      >
        <View style={{ paddingTop: 30, paddingHorizontal: SIZES.margin_h - 4 }}>
          <TouchableOpacity onPress={onClose}>
            <FeatherIcon name={'x'} size={30} color={Colors.neutralGray07} />
          </TouchableOpacity>
          <Spacer width={26} />
        </View>
        <View style={{ alignItems: 'center' }}>
          <FastImage
            source={Assets.under_construction_3x}
            style={{ height: 112, width: 118 }}
            resizeMode={'contain'}
          />
          <View
            style={{ marginTop: 30, alignItems: 'center', marginBottom: 24 }}
          >
            <Text
              style={{
                textAlign: 'center',
                lineHeight: 24,
                fontFamily: Fonts.medium,
                color: Colors.neutralGray01,
                fontSize: 15,
              }}
            >
              Halaman masih proses perawatan
            </Text>
            <Text
              style={{
                marginTop: 12,
                textAlign: 'center',
                lineHeight: 24,
                fontFamily: Fonts.regular,
                color: Colors.neutralGray01,
                fontSize: 15,
                width: 300,
              }}
            >
              Maaf , halamannya yang ingin kamu lihat masih proses perawatan dan
              pemupukan.
            </Text>
          </View>
          <TouchableOpacity onPress={onClose}>
            <View
              style={{
                borderColor: Colors.neutralBlack01,
                borderWidth: 1,
                height: 40,
                width: 108,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  lineHeight: 24,
                  fontFamily: Fonts.medium,
                  color: Colors.neutralBlack02,
                  fontSize: 16,
                }}
              >
                Kembali
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default ModalUnderConstruction

const styles = StyleSheet.create({})
