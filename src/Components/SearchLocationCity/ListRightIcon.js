import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors, Fonts } from '@/Theme/Variables'

const ListRightIcon = props => {
  const textStyle = {
    fontFamily: Fonts.regular,
    fontSize: 14,
    fontWeight: '400',
  }
  return (
    <TouchableOpacity onPress={props.onPress} key={Math.random()}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 12,
        }}
      >
        <Text style={{ ...textStyle, color: Colors.neutralBlack02 }}>
          {props.item.city}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default ListRightIcon

const styles = StyleSheet.create({})
