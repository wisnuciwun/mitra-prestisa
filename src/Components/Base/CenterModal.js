import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import { useTheme } from '@/Hooks'
import FastImage from 'react-native-fast-image'
import { Colors } from '@/Theme/Variables'
import Spacer from './Spacer'

const CenterModal = ({ isModalVisible, ...props }) => {
  const { width, height } = Dimensions.get('window')
  const { Images } = useTheme()

  return (
    <Modal isVisible={isModalVisible} {...props}>
      <View
        style={{
          position: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
          bottom: height / 2 - 260,
        }}
      >
        <View
          style={{
            backgroundColor: Colors.white,
            height: 146,
            width: width - 60,
            borderRadius: 10,
            padding: 26,
            justifyContent: 'center',
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <FastImage
              source={Images.thumbs_up_3x}
              style={{ height: 40, width: 40 }}
            />
          </View>
          <Spacer height={19} />
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'Roboto-Medium',
              fontSize: 16,
              fontWeight: '500',
              color: Colors.neutralBlack02,
            }}
          >
            Password kamu telah berhasil diganti
          </Text>
          <Spacer height={4} />
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'Roboto-Regular',
              fontSize: 14,
              fontWeight: '400',
              color: Colors.neutralGray01,
            }}
          >
            Silahkan coba masuk kembali
          </Text>
        </View>
      </View>
    </Modal>
  )
}

export default CenterModal

const styles = StyleSheet.create({})
