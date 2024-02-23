import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, Fonts, SIZES } from '@/Theme/Variables'
import ProductListItem from './ProductListItem'
import Spacer from '../Base/Spacer'
import InputTextWithCounter from './InputTextWithCounter'
import { TouchableOpacity } from 'react-native'
import { generateUcapan } from './Helper'
import MultiProductListItem from './MultiProductListItem'
import { Divider } from '@rneui/themed'

const Ucapan = ({ isMultiProduct }) => {
  return (
    <>
      <View style={{ marginHorizontal: SIZES.margin_h }}>
        <Text style={[section.textTitle]}>Kata Ucapan</Text>
      </View>
      <Spacer height={20} />
      <View style={{ marginHorizontal: SIZES.margin_h }}>
        {isMultiProduct ? <MultiProductListItem /> : <ProductListItem />}
      </View>
      {isMultiProduct && <Spacer height={28} />}
      {isMultiProduct && <Divider width={6} color={Colors.neutralGray06} />}
      <View style={{ marginHorizontal: SIZES.margin_h }}>
        <Spacer height={15} />
        <InputTextWithCounter label="Nama pengirim yang tertera di produk/kartu" />
        <InputTextWithCounter
          label="Kalimat ucapan"
          heightInputContainer={100}
          multiline={true}
          inputContainerStyle={{ alignItem: 'flex-start' }}
        />
        <Spacer height={28} />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {generateUcapan.map((item, index) => (
            <View
              style={{ marginBottom: 8, marginRight: 8 }}
              key={index.toString()}
            >
              <ButtonTextSmallOval text={item.label} active={false} />
            </View>
          ))}
        </View>
      </View>
    </>
  )
}

export default Ucapan

const section = StyleSheet.create({
  textTitle: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    lineHeight: 24,
    color: Colors.neutralBlack01,
  },
})

/**
 *
 *
 * Small Component: ButtonTextSmallOval
 */

const ButtonTextSmallOval = ({
  text = 'Textttt Texttttt',
  active = false,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: 13,
          borderWidth: 1.5,
          borderColor: active ? Colors.primary : Colors.neutralGray03,
        }}
      >
        <Text
          style={{
            fontFamily: Fonts.regular,
            fontSize: 15,
            lineHeight: 20,
            color: active ? Colors.primary : Colors.neutralBlack02,
          }}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
