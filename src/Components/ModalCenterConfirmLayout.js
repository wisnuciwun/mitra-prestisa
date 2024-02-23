import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Fonts, SIZES, Colors } from '@/Theme/Variables'
import { Divider } from '@rneui/base'
import Spacer from './Base/Spacer'
import ModalCenter from './Base/ModalCenter'
import ButtonBase from './Base/ButtonBase'

const ModalCenterConfirmLayout = ({
  isVisible,
  onPressClose = () => {},
  onPressAccept,
  acceptHeightButton = 38,
  closeHeightButton = 38,
  labelAccept = 'Label Accept',
  labelClose = 'Label Close',
  bodyTitle = 'Title Title Title',
  bodySubtitle = 'Body Subtitle Body Subtitle Body Subtitle Body Subtitle Body Subtitle Body Subtitle Body Subtitle',
  closeTextStyle,
  acceptTextStyle,
  closeContainerText,
  acceptContainerText,
  isBodyTitleComp = false,
  bodyTitleComp,
  disableOnClose = false,
  disableOnAccept = false,
  loadingOnAccept = false,
  ...props
}) => {
  return (
    <ModalCenter
      isVisible={isVisible}
      {...props}
      heightModal={null}
      widthModal={SIZES.width_window - 48}
    >
      <View
        style={{
          marginHorizontal: 20,
          marginVertical: 28,
          alignItems: 'center',
        }}
      >
        {isBodyTitleComp ? (
          React.createElement(bodyTitleComp)
        ) : (
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              fontFamily: Fonts.bold,
              color: Colors.neutralBlack02,
            }}
          >
            {bodyTitle}
          </Text>
        )}

        <Spacer height={12} />
        <Text
          style={{
            fontSize: 18,
            fontFamily: Fonts.regular,
            textAlign: 'center',
            lineHeight: 24,
          }}
        >
          {bodySubtitle}
        </Text>
      </View>
      <Divider width={1.5} color={Colors.neutralGray05} />
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 14,
          justifyContent: 'space-between',
          marginHorizontal: 24,
        }}
      >
        <ButtonBase
          onPress={onPressClose}
          title={labelClose}
          mode="outline"
          style={[
            { height: closeHeightButton, borderColor: 'transparent' },
            closeContainerText,
          ]}
          istextStyle={true}
          textStyle={[
            {
              elevation: 0,
              color: Colors.neutralBlack02,
              fontFamily: Fonts.medium,
            },
            closeTextStyle,
          ]}
          disable={disableOnClose}
          stylesDisable={closeContainerText}
        />
        <ButtonBase
          onPress={onPressAccept}
          title={labelAccept}
          istextStyle={true}
          textStyle={[
            {
              elevation: 0,
              color: Colors.neutralGray07,
              fontFamily: Fonts.medium,
            },
            acceptTextStyle,
          ]}
          style={[
            {
              height: acceptHeightButton,
            },
            acceptContainerText,
          ]}
          disable={disableOnAccept}
          loading={loadingOnAccept}
        />
      </View>
    </ModalCenter>
  )
}

export default ModalCenterConfirmLayout

const styles = StyleSheet.create({})
