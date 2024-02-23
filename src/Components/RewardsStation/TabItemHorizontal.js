import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors, Fonts } from '@/Theme/Variables'

const TabItemHorizontal = ({
  name,
  heightTab = 56,
  activeColor = 'red',
  baseColor = Colors.neutralGray01,
  inActiveColor = Colors.neutralGray06,
  isActive = false,
  containerStyle,
  onPress,
}) => {
  return (
    <View style={[{ flex: 1 }, containerStyle]}>
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            height: heightTab,
            borderBottomColor: isActive ? activeColor : inActiveColor,
            borderBottomWidth: 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              color: isActive ? activeColor : baseColor,
              fontFamily: Fonts.medium,
              fontSize: 16,
            }}
          >
            {name}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default TabItemHorizontal

const styles = StyleSheet.create({})
