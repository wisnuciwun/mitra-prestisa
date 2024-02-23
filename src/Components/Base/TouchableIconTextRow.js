import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { Colors, Fonts } from '@/Theme/Variables'
import Spacer from './Spacer'

const TouchableIconTextRow = ({
  icon = 'plus-circle',
  text = 'Text text',
  iconColor = Colors.neutralBlack02,
  textColor = Colors.neutralBlack02,
  onPress,
  isIconComp = false,
  iconComp,
  textStyle,
  disable = false,
  iconSize = 20,
  spacerH = 13,
}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disable}>
      <View style={[{ flexDirection: 'row', alignItems: 'center' }]}>
        {isIconComp ? (
          React.createElement(iconComp)
        ) : (
          <FeatherIcon name={icon} size={iconSize} color={iconColor} />
        )}
        <Spacer width={spacerH} />
        <Text
          style={[
            {
              fontFamily: Fonts.medium,
              fontSize: 16,
              lineHeight: 24,
              color: textColor,
            },
            textStyle,
          ]}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default TouchableIconTextRow

const styles = StyleSheet.create({})
