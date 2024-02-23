import React from 'react'
import ButtonBase from '@/Components/Base/ButtonBase'
import Spacer from '@/Components/Base/Spacer'
import { Colors, Fonts, SIZES } from '@/Theme/Variables'
import { Keyboard, ScrollView, StyleSheet, Text, View } from 'react-native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import SuggestionMostPopularCities from './SuggestionMostPopularCities'

const UseMyLocationSection = ({
  data,
  isLoading,
  isSpacerTop = false,
  defocused,
}) => {
  return (
    <View
      style={{
        position: 'relative',
        flex: 1,
      }}
    >
      <ScrollView
        onScroll={() => {
          Keyboard.dismiss()
          defocused()
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 20,
            marginHorizontal: SIZES.margin_h,
          }}
        >
          <FeatherIcon
            size={17}
            color={Colors.neutralGray01}
            name={`navigation`}
          />
          <Spacer width={8} />
          <Text
            style={{
              fontFamily: Fonts.regular,
              fontSize: 16,
              fontWeight: '400',
              color: Colors.neutralBlack02,
            }}
          >
            Gunakan lokasi saat ini
          </Text>
        </View>
        <SuggestionMostPopularCities
          isSpacerTop={isSpacerTop}
          data={data}
          isLoading={isLoading}
        />
        <Spacer height={150} />
      </ScrollView>
      <View
        style={{
          height: 92,
          width: SIZES.width_window,
          backgroundColor: Colors.white,
          paddingHorizontal: SIZES.margin_h,
          justifyContent: 'center',
          position: 'absolute',
          bottom: 0,
          elevation: 20, // @platform android
        }}
      >
        <ButtonBase
          disable={true}
          title="Gunakan Lokasi"
          colorTextDisable={Colors.neutralGray08}
        />
      </View>
    </View>
  )
}

export default UseMyLocationSection

const styles = StyleSheet.create({})
