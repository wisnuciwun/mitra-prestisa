import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Colors, Fonts, SIZES } from '@/Theme/Variables'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { pengiriman } from '../RingkasanPesanan/Styles'
import Spacer from '../Base/Spacer'

const Accordion = ({
  index,
  name,
  onPress,
  rotateX = '180deg',
  showStatus = false,
  status,
  firstColText,
  textBg,
  textColor,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 8,
          paddingHorizontal: 12,
          borderRadius: 4,
          borderWidth: 1,
          borderColor: Colors.neutralGray03,
          alignItems: 'center',
        }}
      >
        <View
          style={[
            pengiriman.row,
            {
              alignItems: 'center',
              justifyContent: 'flex-start',
            },
          ]}
        >
          <Text
            style={{
              fontFamily: Fonts.bold,
              fontSize: 14,
              lineHeight: 19.6,
              color: Colors.neutralBlack02,
              width: 122,
            }}
          >
            {firstColText}
            <Text style={{ fontFamily: Fonts.regular }}>{name}</Text>
          </Text>
          <Spacer width={2} />
          {showStatus ? (
            <Text
              style={{
                fontSize: 13,
                fontFamily: Fonts.medium,
                color: 'black',
                backgroundColor: textBg,
                color: textColor,
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 5,
                textTransform: 'capitalize',
                overflow: 'hidden',
              }}
            >
              {status}
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 13,
                fontFamily: Fonts.medium,
                color: 'transparent',
                backgroundColor: 'transparent',
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 5,
                textTransform: 'capitalize',
                overflow: 'hidden',
              }}
            />
          )}
        </View>
        <FeatherIcon
          name="chevron-down"
          size={18}
          color={Colors.neutralBlack02}
          style={{ transform: [{ rotateX: rotateX }] }}
        />
      </View>
    </TouchableOpacity>
  )
}

export default Accordion

const styles = StyleSheet.create({})
