import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ButtonBottomFloating from '../ButtonBottomFloating'
import ButtonBase from '../Base/ButtonBase'
import Spacer from '../Base/Spacer'
import { Colors, Fonts } from '@/Theme/Variables'

const ButtonBottomFloatingColumn = ({
  topText = 'Top Text',
  bottomText = 'Bottom Text',
  onPressTop,
  onPressBottom,
}) => {
  return (
    <ButtonBottomFloating
      height={120}
      isTouchComp={true}
      touchableComp={() => (
        <View>
          <ButtonBase
            style={{ height: 42 }}
            textStyle={{
              color: Colors.neutralGray07,
              fontFamily: Fonts.medium,
            }}
            istextStyle={true}
            title={topText}
            onPress={onPressTop}
          />
          <Spacer height={4} />
          <ButtonBase
            style={{ height: 42, borderWidth: 0 }}
            mode={'outline'}
            textStyle={{
              color: Colors.neutralBlack02,
              fontFamily: Fonts.medium,
            }}
            istextStyle={true}
            title={bottomText}
            onPress={onPressBottom}
          />
        </View>
      )}
    />
  )
}

export default ButtonBottomFloatingColumn

const styles = StyleSheet.create({})
