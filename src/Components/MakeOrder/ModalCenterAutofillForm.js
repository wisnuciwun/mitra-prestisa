import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import { Divider } from '@rneui/base'
import { Colors, Fonts } from '@/Theme/Variables'
import Spacer from '../Base/Spacer'

const ModalCenterAutofillForm = ({
  isVisible,
  textBodyBold = 'text body bold',
  onRequestClose,
  onYes,
  onNo,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      style={{ opacity: 0.5 }}
      presentationStyle="overFullScreen"
      visible={isVisible}
      onRequestClose={onRequestClose}
    >
      <View
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.40)',
          flex: 1,
          flexDirection: 'column',
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: 304,
            backgroundColor: Colors.white,
            borderRadius: 10,
          }}
        >
          <View
            style={{ paddingBottom: 28, paddingHorizontal: 28, paddingTop: 28 }}
          >
            <Text
              style={{
                textAlign: 'center',
                lineHeight: 24,
                fontFamily: Fonts.regular,
                fontSize: 16,
                color: Colors.neutralBlack02,
              }}
            >
              Isi{' '}
              <Text style={{ fontFamily: Fonts.bold }}>
                {textBodyBold} sama
              </Text>{' '}
              seperti produk sebelumnya?
            </Text>
          </View>
          <Divider></Divider>
          <View
            style={[
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: 12,
                paddingBottom: 16,
                paddingHorizontal: 16,
              },
            ]}
          >
            <TouchableOpacity onPress={onNo}>
              <Text
                style={{
                  fontFamily: Fonts.regular,
                  fontSize: 16,
                  color: Colors.neutralBlack01,
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                }}
              >
                Tidak
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onYes}>
              <Text
                style={{
                  fontFamily: Fonts.regular,
                  fontSize: 16,
                  color: Colors.neutralBlack01,
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                }}
              >
                Ya, Samakan
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default ModalCenterAutofillForm

const styles = StyleSheet.create({})
