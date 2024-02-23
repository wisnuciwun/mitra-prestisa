import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Modal,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native'
import { useTheme } from '@/Hooks'
import { useNavigation } from '@react-navigation/native'
import { Assets } from '@/Theme/Assets'
import Spacer from '@/Components/Base/Spacer'

import { Colors, Fonts } from '@/Theme/Variables'

import FastImage from 'react-native-fast-image'

import CardSearchResult from './CardSearchResult'
const marginHorizontal = 24
const ContentSearch = ({
  searchTerm,
  subCategory,
  dataPopuler,
  dataSearch,
  loadingSearch,
  loadingPopuler,
}) => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const navigation = useNavigation()
  useEffect(() => {}, [])

  const SuggestionSearchListRightIcon = ({
    onPress,
    text = 'Hallo World',
    isRemove = false,
  }) => {
    return (
      <TouchableOpacity onPress={onPress} disabled={isRemove}>
        <View
          style={{
            // backgroundColor: 'red',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottomColor: isRemove ? 'transparent' : Colors.neutralGray05,
            borderBottomWidth: 1,
            paddingHorizontal: marginHorizontal,
            paddingVertical: isRemove ? 8 : 12,
          }}
        >
          <Text
            style={{
              fontFamily: Fonts.medium,
              fontSize: 14,
              fontWeight: '500',
              color: Colors.neutralGray01,
            }}
          >
            {text}
          </Text>

          {isRemove ? (
            <TouchableOpacity
              style={{
                width: 30,
                height: 30,
                // backgroundColor: 'red',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FastImage
                source={Assets.icon_cross_grey_small_3x}
                style={{ height: 16, width: 16 }}
              />
            </TouchableOpacity>
          ) : (
            <FastImage
              source={Assets.icon_search_small_3x}
              style={{ height: 16, width: 16 }}
            />
          )}
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={{}}>
      {searchTerm == '' ? (
        <View style={{ marginVertical: 0 }}>
          {/* <TitleSection text="Riwayat Pencarian" isRightButton={true} />
          <SuggestionSearchListRightIcon text="Bunga Papan" isRemove={true} />
          <SuggestionSearchListRightIcon text="Cupcake" isRemove={true} />
          <SuggestionSearchListRightIcon
            text="Standing Flower"
            isRemove={true}
          />
          <SuggestionSearchListRightIcon text="Parcel Buah" isRemove={true} /> */}

          <TitleSection text={'Product Populer di ' + subCategory.name} />
          {!loadingPopuler ? (
            dataPopuler.length > 0 &&
            dataPopuler.map((item, index) => {
              return (
                <CardSearchResult
                  data={item}
                  category={{ id: subCategory.id, name: subCategory.name }}
                  key={Math.random()}
                />
              )
            })
          ) : (
            <>
              <Spacer height={20} />
              <ActivityIndicator size="large" color={Colors.primary} />
              <Spacer height={20} />
            </>
          )}
        </View>
      ) : (
        <>
          <View
            style={{
              marginVertical: 0,
              paddingBottom: 20,
              borderBottomColor: Colors.neutralGray03,
              borderBottomWidth: 1,
            }}
          >
            <TitleSection text={'Product di ' + subCategory.name} />
            {!loadingSearch ? (
              dataSearch.length > 0 ? (
                dataSearch.map((item, index) => {
                  return <CardSearchResult data={item} key={Math.random()} />
                })
              ) : (
                <></>
              )
            ) : (
              <>
                <Spacer height={20} />
                <ActivityIndicator size="large" color={Colors.primary} />
                <Spacer height={20} />
              </>
            )}
          </View>
          <View style={{ marginHorizontal: 20 }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SearchProductByName', {
                  category: subCategory,
                  searchTerm: searchTerm,
                  dataCount: dataSearch.length,
                  isPrestisa: false,
                })
              }}
              style={{ marginVertical: 20 }}
            >
              <Text>
                Cari "{searchTerm}" di{' '}
                <Text style={{ color: Colors.primary }}>
                  kategori {subCategory.name}
                </Text>{' '}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SearchProductByName', {
                  category: subCategory,
                  searchTerm: searchTerm,
                  dataCount: dataSearch.length,
                  isPrestisa: true,
                })
              }}
            >
              <Text>
                Cari "{searchTerm}" di{' '}
                <Text style={{ color: Colors.primary }}>Prestisa</Text>{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  )
}

const TitleSection = ({ text = 'Title Section', isRightButton = false }) => {
  return (
    <View
      style={{
        // backgroundColor: 'red',
        marginTop: 10,
        marginHorizontal: 24,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Text
        style={{
          fontFamily: Fonts.medium,
          fontSize: 16,
          fontWeight: '500',
          color: Colors.neutralBlack02,
        }}
      >
        {text}
      </Text>
      {isRightButton && (
        <TouchableOpacity>
          <Text
            style={{
              fontFamily: Fonts.regular,
              fontSize: 16,
              fontWeight: '400',
              color: Colors.otherRed,
            }}
          >
            Hapus
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {},
})
export default ContentSearch
