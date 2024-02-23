import { StyleSheet, Text, View, Linking, Platform } from 'react-native'
import React from 'react'
import { Modal } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Colors, SIZES, Fonts } from '@/Theme/Variables'
import FeatherIcon from 'react-native-vector-icons/Feather'
import LinearGradient from 'react-native-linear-gradient'
import Spacer from '../Base/Spacer'
import FastImage from 'react-native-fast-image'
import { Assets } from '@/Theme/Assets'
import TextTouchable from '../RingkasanPesanan/TextTouchable'
import { addDashPhone } from './Helper'

const ModalWhatsApp = ({
  modalVisible,
  onRequestClose,
  onClose,
  phone,
  text,
}) => {
  const phoneWA = phone
  const textWA = text
  const handleContinueToChatWA = () => {
    Linking.openURL(`whatsapp://send?text=${textWA}&phone=${phoneWA}`)
      .then(res => console.log('RES', res))
      .catch(err => {
        console.log('ERR_OPEN_WA', err)
        handleToDownloadWA()
      })
  }

  const handleToDownloadWA = () => {
    if (Platform.OS === 'android') {
      Linking.openURL('market://details?id=com.whatsapp')
    }
  }

  return (
    <Modal
      animationType="slide"
      presentationStyle="overFullScreen"
      visible={modalVisible}
    >
      <View
        style={{
          backgroundColor: Colors.white,
          flex: 1,
        }}
      >
        <LinearGradient
          start={{ x: 0.25, y: 0.5 }}
          end={{ x: 0.75, y: 0.5 }}
          locations={[0.0, 1.0]}
          colors={['#CC3776', '#4F174CB2']}
          style={{
            height: 64,
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'row',
            paddingHorizontal: SIZES.margin_h,
          }}
          useAngle={true}
          angle={104.52}
        >
          <TouchableOpacity onPress={onClose}>
            <FeatherIcon name={'x'} size={24} color={Colors.neutralGray07} />
          </TouchableOpacity>
          <Spacer width={26} />
          <FastImage
            source={Assets.logo_wa_color_3x}
            style={{ height: 20, width: 20 }}
          />
          <Spacer width={12} />
          <Text
            style={{
              color: Colors.neutralGray07,
              fontSize: 16,
              fontFamily: Fonts.medium,
            }}
          >
            Hubungi melalui WA
          </Text>
        </LinearGradient>
        <Spacer height={104} />
        <View style={{ alignItems: 'center' }}>
          <Text
            style={{
              width: 250,
              textAlign: 'center',
              lineHeight: 28,
              fontFamily: Fonts.regular,
              fontSize: 20,
            }}
          >
            Chat on WhatsApp with +{addDashPhone(phoneWA)}
          </Text>
          <Spacer height={18} />
          <TouchableOpacity onPress={handleContinueToChatWA}>
            <LinearGradient
              start={{ x: 0.25, y: 0.5 }}
              end={{ x: 0.75, y: 0.5 }}
              locations={[0.0, 1.0]}
              colors={['#CC3776', '#4F174CB2']}
              style={{
                height: 30,
                width: 144,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
              }}
              useAngle={true}
              angle={104.52}
            >
              <Text
                style={{
                  fontFamily: Fonts.medium,
                  textTransform: 'uppercase',
                  fontSize: 12,
                  color: Colors.neutralGray07,
                }}
              >
                continue to chat
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <Spacer height={32} />
          <Text
            style={{
              paddingHorizontal: 17,
              paddingVertical: 12,
              width: 272,
              borderRadius: 5,
              overflow: 'hidden',
              lineHeight: 19.6,
              fontSize: 14,
              fontFamily: Fonts.medium,
              backgroundColor: Colors.neutralGrayBlue,
            }}
          >
            {textWA}
          </Text>
          <Spacer height={16} />
          <View
            style={{
              height: 1,
              width: 272,
              backgroundColor: Colors.neutralGray04,
            }}
          />
          <Spacer height={60} />
          <Text
            style={{
              fontFamily: Fonts.medium,
              fontSize: 15,
              color: Colors.neutralBlack02,
            }}
          >
            Don’t have WhatsApp yet?
          </Text>
          <Spacer height={3} />
          <TextTouchable
            text="Download"
            textStyles={{ fontSize: 16 }}
            onPress={handleToDownloadWA}
          />
        </View>
      </View>
    </Modal>
  )
}

export default ModalWhatsApp

const styles = StyleSheet.create({})
