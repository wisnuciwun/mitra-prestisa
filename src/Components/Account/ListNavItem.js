import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors, Fonts } from '@/Theme/Variables'
import FastImage from 'react-native-fast-image'
import { Assets } from '@/Theme/Assets'
import { useNavigation } from '@react-navigation/native'
import FeatherIcon from 'react-native-vector-icons/Feather'

const ListNavItem = ({
  lists,
  item,
  index,
  noBorder = false,
  isLogOut = false,
  isSvgIcon = true,
  iconSize = 20,
  onPressLogOut,
}) => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      onPress={() => {
        isLogOut ? onPressLogOut() : navigation.navigate(item.screen)
      }}
      key={`${index}__${item.name}`}
    >
      <View
        style={{
          height: 44,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomColor:
            lists.length - 1 === index ? 'transparent' : Colors.neutralGray06,
          borderBottomWidth: noBorder ? 0 : 1,
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          {isSvgIcon ? (
            <FeatherIcon
              name={item.source}
              size={iconSize}
              color={Colors.neutralGray01}
            />
          ) : (
            <FastImage
              source={item.source}
              style={{ height: iconSize, width: iconSize }}
              resizeMode="contain"
            />
          )}
          <Text
            style={{
              marginLeft: 16,
              fontFamily: Fonts.medium,
              fontSize: 15,
              color: Colors.neutralBlack02,
              lineHeight: 20,
            }}
          >
            {item.name}
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <FastImage
            source={Assets.icon_chevron_right_grey_3x}
            style={{ height: 13, width: 16 }}
            resizeMode="contain"
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ListNavItem

const styles = StyleSheet.create({})
