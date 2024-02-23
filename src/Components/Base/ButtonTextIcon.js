import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors, Fonts } from '@/Theme/Variables'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Spacer from './Spacer'

const ButtonTextIcon = ({
  onPress,
  isIconLeft = false,
  isIconRight = true,
  label = 'Label',
  iconName = 'x',
  iconNameLeft = 'x',
  borderColor = Colors.neutralGray03,
  height = 50,
  fontSize = 16,
  iconSize = 22,
  iconSizeLeft = 16,
  isLeftIconFeather = true,
  renderIconLeft,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: height,
          borderWidth: 1,
          borderColor: borderColor,
          alignItems: 'center',
          paddingLeft: 12,
          paddingRight: 12,
          borderRadius: 6,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {isIconLeft &&
            (isLeftIconFeather ? (
              <FeatherIcon
                name={iconNameLeft}
                size={iconSizeLeft}
                color={Colors.neutralBlack02}
              />
            ) : (
              React.createElement(renderIconLeft)
            ))}
          <Spacer width={10} />
          <Text
            style={{
              fontFamily: Fonts.medium,
              fontSize: fontSize,
              lineHeight: 24,
              color: Colors.neutralBlack02,
            }}
          >
            {label}
          </Text>
        </View>
        {isIconRight && (
          <FeatherIcon
            name={iconName}
            size={iconSize}
            color={Colors.neutralBlack02}
          />
        )}
      </View>
    </TouchableOpacity>
  )
}

export default ButtonTextIcon

const styles = StyleSheet.create({})
