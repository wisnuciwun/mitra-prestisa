import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ButtonBase from './Base/ButtonBase'
import { STYLES } from '@/Theme/Styles'
import { Colors, SIZES } from '@/Theme/Variables'

const ButtonBottomFloating = ({
  label = 'Label',
  headerMini,
  isHeaderMini = false,
  height = 92,
  touchableComp,
  disable = false,
  isTouchComp = false,
  shadow = true,
  ...props
}) => {
  const haveShadow = shadow ? STYLES.shadow_bottom : STYLES.shadow_no
  return (
    <View
      style={[
        {
          height: height,
          width: SIZES.width_window,
          backgroundColor: Colors.white,
          paddingHorizontal: SIZES.margin_h,
          justifyContent: 'center',
          elevation: 20, // @platform android
          position: 'absolute',
          bottom: 0,
        },
        haveShadow,
      ]}
    >
      {isHeaderMini && React.createElement(headerMini)}
      {isTouchComp ? (
        React.createElement(touchableComp)
      ) : (
        <ButtonBase
          disable={disable}
          title={label}
          colorTextDisable={Colors.neutralGray08}
          {...props}
        />
      )}
    </View>
  )
}

export default ButtonBottomFloating

const styles = StyleSheet.create({})
