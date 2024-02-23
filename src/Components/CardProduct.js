import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native'
import { useTheme } from '@/Hooks'
import PropTypes from 'prop-types'
import { Colors } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FastImage from 'react-native-fast-image'
import { Config } from '@/Config'
import { useNavigation } from '@react-navigation/native'

const CardProduct = ({ item, vertical, category, vStyle, vHome }) => {
  const ApiUrl = Config.API_URL
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  function numFormatter(num) {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(0) + 'rb' // convert to K for number from > 1000 < 1 million
    } else if (num > 1000000) {
      return (num / 1000000).toFixed(0) + 'jt' // convert to M for number from > 1 million
    } else if (num < 900) {
      return num // if value < 1000, nothing to do
    }
  }

  const diskon = item.price - item.sale_price
  // console.log(item.id)
  useEffect(() => {}, [])
  return (
    <View
      style={[
        styles.cardContainerOuter,
        vertical == true ? { width: 172 } : { flex: 1 / 2 },
        vHome && vStyle.cardOuter,
      ]}
    >
      <TouchableHighlight
        underlayColor={'white'}
        onPress={() => {
          navigation.navigate('ProductDetail', {
            product_id: item.id,
            category: category != null ? category : null,
          })
        }}
        style={[vHome && vStyle.touchContainer]}
      >
        <View
          style={[
            styles.cardContainer,
            vertical == true ? { height: 300 } : { height: 280 },
            !vHome && { elevation: 2 },
            vHome && vStyle.cardContainer,
          ]}
        >
          <View style={{ height: 150, overflow: 'hidden' }}>
            <FastImage
              style={{ width: '100%', height: '100%', overflow: 'hidden' }}
              resizeMode={FastImage.resizeMode.cover}
              source={{
                uri: item.image,
                priority: FastImage.priority.normal,
              }}
            ></FastImage>
          </View>
          <View
            style={[
              { padding: 10 },
              Layout.column,
              Layout.justifyContentBetween,
            ]}
          >
            <Text style={[styles.cardText, { fontWeight: 'bold' }]}>
              {item.name}
            </Text>
            <Text style={[styles.cardTextLarge]}>
              Rp
              {numberWithCommas(
                item.discount > 0 ? item.sale_price : item.price,
              )}
            </Text>

            {item.discount > 0 ? (
              <View style={[Layout.row, Layout.alignItemsCenter]}>
                <Text
                  style={[
                    styles.cardTextSmall,
                    styles.pill,
                    styles.textPill,
                    { fontWeight: 'bold' },
                  ]}
                >
                  -Rp{numFormatter(diskon)}
                </Text>
                <Text
                  style={[
                    styles.cardTextSmall,
                    { textDecorationLine: 'line-through', fontSize: 14 },
                  ]}
                >
                  Rp{numberWithCommas(item.price)}
                </Text>
              </View>
            ) : (
              <View style={{ height: 30 }}></View>
            )}

            {item.promo == false && <View style={{ height: 35 }}></View>}
          </View>
          {item.discount > 0 && (
            <View
              style={{
                width: 46,
                height: 46,
                backgroundColor: '#2F49D0',
                position: 'absolute',
                top: 5,
                right: 5,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 30,
              }}
            >
              <Text
                style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}
              >
                Diskon
              </Text>
            </View>
          )}
          <View
            style={[
              Layout.row,
              { position: 'absolute', bottom: 0, marginLeft: 10 },
            ]}
          >
            <Icon name="star" style={{ fontSize: 16, color: '#EACA25' }}></Icon>

            <Text style={[styles.cardTextSmall]}>({item.rating})</Text>
            <Text style={[styles.cardTextSmall]}> | Terjual {item.qty}</Text>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  )
}

const cardTextBase = { color: Colors.neutralBlack02, marginBottom: 10 }

const headingTitleSubCategory = {
  fontSize: 12,
  marginRight: 25,
  fontWeight: 'bold',
  fontFamily: 'Roboto',
}
const styles = StyleSheet.create({
  screen: {},
  cardContainerOuter: {
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    // width: 172,
    // flex: 1,
  },
  cardContainer: {
    borderRadius: 10,
    margin: 5,
    backgroundColor: 'white',
    overflow: 'hidden',
    // height: 280,
    // height: 300,
  },
  cardText: {
    ...cardTextBase,
    fontSize: 13,
  },
  cardTextSmall: {
    ...cardTextBase,
    fontSize: 12,
  },
  cardTextLarge: {
    ...cardTextBase,
    fontSize: 16,
    fontWeight: 'bold',
  },
  rating: {
    backgroundColor: 'red',
    fontSize: 12,
  },
  pill: {
    backgroundColor: 'rgba(203, 58, 49, 0.1)',
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
  },
  textPill: { color: '#CB3A31' },
})
export default CardProduct
