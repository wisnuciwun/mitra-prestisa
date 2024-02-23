import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React from 'react'
import { Modal } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Colors, SIZES, Fonts } from '@/Theme/Variables'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Spacer from './Base/Spacer'
import FastImage from 'react-native-fast-image'
import { Assets } from '@/Theme/Assets'

const ModalCenterViewSinglePhoto = ({ modalVisible, data, onClose }) => {
  return (
    <Modal
      animationType="slide"
      presentationStyle="overFullScreen"
      visible={modalVisible}
    >
      <View
        style={{
          backgroundColor: Colors.neutralBlack01,
          opacity: 0.95,
          flex: 1,
        }}
      >
        <View style={{ paddingTop: 30, paddingHorizontal: SIZES.margin_h - 4 }}>
          <TouchableOpacity onPress={onClose}>
            <FeatherIcon name={'x'} size={30} color={Colors.neutralGray07} />
          </TouchableOpacity>
          <Spacer width={26} />
        </View>
        <Spacer height={104} />
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          {data == null ? (
            <ActivityIndicator />
          ) : (
            <>
              <FastImage
                source={{ uri: data.uri }}
                style={{
                  height: 342,
                  width: '100%',
                }}
                resizeMode={'contain'}
              />
              <Spacer height={20} />
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: Fonts.regular,
                  color: Colors.neutralGray07,
                  textAlign: 'left',
                  width: SIZES.width_window - (SIZES.margin_h - 8),
                }}
              >
                {data.fileName}
              </Text>
            </>
          )}
        </View>
      </View>
    </Modal>
  )
}

export default ModalCenterViewSinglePhoto

const styles = StyleSheet.create({})
