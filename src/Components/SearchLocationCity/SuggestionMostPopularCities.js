import React from 'react'
import Spacer from '@/Components/Base/Spacer'
import { SkeletonList } from '@/Components/SkeletonList'
import { setLocationFirst, setShippingAddress } from '@/Store/location'
import { Colors, Fonts, SIZES } from '@/Theme/Variables'
import { StyleSheet, Text, View } from 'react-native'
import ListRightIcon from './ListRightIcon'

const SuggestionMostPopularCities = ({
  isSpacerTop = true,
  isModal = false,
  selectedCity = () => {},
  data,
  isLoading,
  navigation,
  dispatch,
}) => {
  return (
    <>
      {isSpacerTop && <Spacer height={42} />}
      <View
        style={{
          borderTopColor: Colors.neutralGray03,
          borderTopWidth: 1,
          marginHorizontal: SIZES.margin_h,
        }}
      >
        <Spacer height={16} />
        <Text
          style={{
            fontFamily: Fonts.medium,
            fontSize: 16,
            fontWeight: '500',
            color: Colors.neutralBlack02,
          }}
        >
          Kota yang banyak dicari
        </Text>
        <Spacer height={10} />
        {isLoading ? (
          [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
          ].map((e, i) => <SkeletonList key={`${e}`} index={i} />)
        ) : (
          <>
            {isModal
              ? data.map((item, index) => (
                  <ListRightIcon
                    key={index}
                    onPress={() => selectedCity(item)}
                    item={item}
                  />
                ))
              : data.map((item, index) => (
                  <ListRightIcon
                    key={index}
                    item={item}
                    onPress={() => {
                      dispatch(
                        setShippingAddress({ data: item, isLoading: true }),
                      )
                      dispatch(setLocationFirst(true))
                      navigation.goBack()
                    }}
                  />
                ))}
          </>
        )}
      </View>
    </>
  )
}

export default SuggestionMostPopularCities

const styles = StyleSheet.create({})
