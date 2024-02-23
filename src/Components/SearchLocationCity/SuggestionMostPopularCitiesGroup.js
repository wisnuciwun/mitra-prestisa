import React from 'react'
import Spacer from '@/Components/Base/Spacer'
import { Colors, Fonts, SIZES } from '@/Theme/Variables'
import { Keyboard, ScrollView, StyleSheet, Text, View } from 'react-native'
import SuggestionMostPopularCities from './SuggestionMostPopularCities'
import SearchLocationResults from './SearchLocationResults'

const SuggestionMostPopularCitiesGroup = ({
  data,
  isLoading,
  isSpacerTop = false,
  defocused,
  hideSuggestion,
  dispatch,
  navigation,
  resultSearch,
  loadingSearch,
  resultUncoveredCity,
  isUncoveredCity,
  isModal,
  selectedResultCity,
  selectedPopularCity,
  marginTop,
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
          console.log('SCROLL')
          Keyboard.dismiss()
          defocused()
        }}
      >
        <SearchLocationResults
          isLoading={loadingSearch}
          data={resultSearch}
          navigation={navigation}
          dispatch={dispatch}
          isModal={isModal}
          selectedCity={selectedResultCity}
          marginTop={marginTop}
        />
        {isUncoveredCity && (
          <View
            style={{
              marginHorizontal: SIZES.margin_h,
              marginTop: 100,
              position: 'relative',
            }}
          >
            <Text
              style={{
                fontFamily: Fonts.medium,
                fontSize: 18,
                lineHeight: 25,
                textAlign: 'center',
                color: Colors.neutralBlack02,
              }}
            >
              {resultUncoveredCity.title}
            </Text>
            <Text
              style={{
                fontFamily: Fonts.regular,
                fontSize: 14,
                lineHeight: 25,
                textAlign: 'center',
                color: Colors.neutralBlack02,
              }}
            >
              {resultUncoveredCity.body}
            </Text>
          </View>
        )}
        {hideSuggestion ? (
          <></>
        ) : (
          <SuggestionMostPopularCities
            isSpacerTop={isSpacerTop}
            data={data}
            isLoading={isLoading}
            navigation={navigation}
            dispatch={dispatch}
            isModal={isModal}
            selectedCity={selectedPopularCity}
          />
        )}
        <Spacer height={150} />
      </ScrollView>
    </View>
  )
}

export default SuggestionMostPopularCitiesGroup

const styles = StyleSheet.create({})
