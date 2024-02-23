import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Colors } from '@/Theme/Variables'
import Modal from 'react-native-modal'

const ModalBottom = ({
  isVisible,
  heightModal = 496 + 10,
  topRadius = 20,
  onDismiss,
  bgColor = Colors.white,
  children,
  ...props
}) => {
  return (
    <Modal
      isVisible={isVisible}
      backdropColor={Colors.neutralBlack01}
      onDismiss={onDismiss}
      style={{
        margin: 0,
        justifyContent: 'flex-end',
      }}
      {...props}
    >
      <View
        style={{
          backgroundColor: bgColor,
          height: heightModal,
          borderTopLeftRadius: topRadius,
          borderTopRightRadius: topRadius,
          position: 'relative',
        }}
      >
        {children}
      </View>
    </Modal>
  )
}

export default ModalBottom

const styles = StyleSheet.create({})
