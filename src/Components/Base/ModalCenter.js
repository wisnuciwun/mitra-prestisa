import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Colors } from '@/Theme/Variables'
import Modal from 'react-native-modal'

const ModalCenter = ({
  isVisible,
  isDefaultStlye = true,
  heightModal = 30,
  widthModal = 100,
  bgColor = Colors.white,
  borderRadius = 12,
  styleModalBody,
  children,
  style,
  ...props
}) => {
  return (
    <Modal
      isVisible={isVisible}
      style={[
        {
          justifyContent: 'center',
          alignItems: 'center',
        },
        style,
      ]}
      {...props}
    >
      <View
        style={[
          isDefaultStlye
            ? {
                height: heightModal,
                width: widthModal,
                backgroundColor: bgColor,
                borderRadius: borderRadius,
              }
            : styleModalBody,
        ]}
      >
        {children}
      </View>
    </Modal>
  )
}

export default ModalCenter

const styles = StyleSheet.create({})
