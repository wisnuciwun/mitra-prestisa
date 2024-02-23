import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Colors, Fonts, SIZES } from '@/Theme/Variables'
import { pengiriman } from './Styles'
import FeatherIcon from 'react-native-vector-icons/Feather'

const Accordion = ({ index, name, onPress, rotateX = '180deg' }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          pengiriman.row,
          {
            paddingVertical: 12,
            paddingHorizontal: 12,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: Colors.neutralGray03,
            alignItems: 'center',
          },
        ]}
      >
        <Text
          style={{
            fontFamily: Fonts.bold,
            fontSize: 14,
            lineHeight: 19.6,
            color: Colors.neutralBlack02,
            width: SIZES.width_window - SIZES.margin_h * 2 - 12 * 2 - 30,
          }}
        >
          Product {index} -{' '}
          <Text style={{ fontFamily: Fonts.regular }}>{name}</Text>
        </Text>
        <FeatherIcon
          name="chevron-down"
          size={13.4}
          color={Colors.neutralBlack02}
          style={{ transform: [{ rotateX: rotateX }] }}
        />
      </View>
    </TouchableOpacity>
  )
}

export default Accordion

const styles = StyleSheet.create({})
