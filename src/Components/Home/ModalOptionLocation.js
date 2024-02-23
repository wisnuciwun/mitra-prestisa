import Spacer from '@/Components/Base/Spacer'

import { Assets } from '@/Theme/Assets'
import { Colors, Fonts } from '@/Theme/Variables'
import React from 'react'
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import Modal from 'react-native-modal'

const ModalOptionLocation = ({
  isVisible,
  toggleModal,
  navigation,
  ...props
}) => {
  return (
    <Modal
      isVisible={isVisible}
      style={{
        margin: 0,
        justifyContent: 'flex-end',
      }}
      {...props}
    >
      <View
        style={{
          backgroundColor: 'white',
          height: 370,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          // justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 34,
        }}
      >
        <FastImage
          source={Assets.pin_map_with_human_big_3x}
          style={{ height: 88, width: 81 }}
          resizeMode={'contain'}
        />
        <View
          style={{
            paddingVertical: 20,
            alignItems: 'center',
            paddingHorizontal: 24,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontFamily: Fonts.medium,
              color: Colors.neutralBlack01,
              textAlign: 'center',
              marginBottom: 4,
            }}
          >
            Pilih lokasi pengiriman dulu ya
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: Fonts.regular,
              color: Colors.neutralBlack02,
              textAlign: 'center',
              width: 250,
              lineHeight: 23,
            }}
          >
            Untuk menampilkan produk yang tersedia di daerah tujuan{' '}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            marginHorizontal: 20,
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SearchLocation', true)
              toggleModal()
            }}
            style={{
              height: 50,
              backgroundColor: Colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
              width: Dimensions.get('window').width - 50,
              borderRadius: 4,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: Fonts.medium,
                color: Colors.white,
                textAlign: 'center',
              }}
            >
              Pilih lokasi
            </Text>
          </TouchableOpacity>
          <Spacer height={10} />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('PinMyLocation', true)
              toggleModal()
            }}
            style={{
              height: 44,
              width: 180,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: Fonts.medium,
                color: Colors.neutralBlack02,
                textAlign: 'center',
              }}
            >
              Gunakan lokasi saya
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
  },
})
export default ModalOptionLocation
