import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
} from 'react-native'
import { useTheme } from '@/Hooks'
import PropTypes from 'prop-types'
import { Colors } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FastImage from 'react-native-fast-image'
import { Config } from '@/Config'
import { useNavigation } from '@react-navigation/native'
import RatingStar from '@/Components/ProductDetail/RatingStar'
import axios from 'axios'
import ModalLoadingCenter from '@/Components/Base/ModalLoadingCenter'

const PhotoReviewContainer = props => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [data, setdata] = useState([])
  const [loading, setloading] = useState(true)

  // console.log(props.route)

  const product_id = props.route.params.product_id

  const _renderItem = ({ item, index }) => {
    // console.log(index, item.image[0])
    return (
      <TouchableHighlight
        underlayColor={'white'}
        onPress={() => {
          navigation.navigate('PhotoDetailTheater', { data: item })
        }}
        style={[styles.cardContainerOuter]}
      >
        <View style={[styles.cardContainer]}>
          <View style={{ height: 150, overflow: 'hidden' }}>
            <FastImage
              style={{ width: '100%', height: '100%', overflow: 'hidden' }}
              resizeMode={FastImage.resizeMode.cover}
              source={{ uri: item.image[0] }}
            ></FastImage>
          </View>
          <View
            style={[
              { padding: 10 },
              Layout.column,
              Layout.justifyContentBetween,
            ]}
          >
            <View
              style={{
                borderRadius: 10,
                overflow: 'hidden',
                flexDirection: 'row',
                marginBottom: 5,
              }}
            >
              <FastImage
                style={{
                  width: 22,
                  height: 22,
                  overflow: 'hidden',
                  borderRadius: 20,
                  marginRight: 10,
                }}
                resizeMode={FastImage.resizeMode.cover}
                source={{ uri: item.avatar_image }}
              ></FastImage>
              <Text>{potongTulisan(item.customer_name, 12)}</Text>
            </View>
            <RatingStar rate={item.rating} size={20} />
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  const potongTulisan = (text, panjang, tanda = '') => {
    tanda = tanda == '' ? '...' : tanda
    // console.log(tanda)
    return text.length > panjang ? text.substring(0, panjang) + tanda : text
  }

  const fetchData = async () => {
    setloading(true)
    const url =
      Config.API_URL +
      `/customer-app/product-review-photo?product_id=${product_id}`
    console.log(url)
    await axios
      .get(url)
      .then(response => {
        // console.log(response.data.data)
        setdata(response.data.data.review_with_photo)
        setloading(false)
      })
      .catch(({ response }) => {
        console.log(response.data)
        setloading(false)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <View style={[styles.screen, Layout.fill]}>
      <FlatList
        // style={{ marginTop: 20 }}
        data={data}
        renderItem={item => _renderItem(item)}
        keyExtractor={(item, index) => {
          return index
        }}
        numColumns={2}
      />
      <ModalLoadingCenter show={loading} />
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
  screen: {
    backgroundColor: 'white',
  },
  cardContainerOuter: {
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    flex: 1,
  },
  cardContainer: {
    borderRadius: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    backgroundColor: 'white',
    overflow: 'hidden',
    height: 220,
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
})
export default PhotoReviewContainer
