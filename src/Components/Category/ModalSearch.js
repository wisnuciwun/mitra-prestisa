import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Modal,
  SafeAreaView,
} from 'react-native'
import { useTheme } from '@/Hooks'
import PropTypes from 'prop-types'
import { Assets } from '@/Theme/Assets'
import Spacer from '@/Components/Base/Spacer'
import { useNavigation } from '@react-navigation/native'

import { Colors, Fonts } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { CheckBox, Button, Input } from '@rneui/themed'
import InputBase from '../Base/InputBase'
import InputSearch from '../Base/InputSearch'
import FastImage from 'react-native-fast-image'
import { Config } from '@/Config'
import { Layout } from '@/Theme'
import ContentSearch from './ContentSearch'
import axios from 'axios'

const ModalSearch = props => {
  const { Common, Gutters, Layout, Images } = useTheme()

  const [searchTerm, setsearchTerm] = useState('')
  const [searchResult, setsearchResult] = useState([])
  const [populerResult, setpopulerResult] = useState([])
  const [loadingPopuler, setloadingPopuler] = useState(false)
  const [loadingSearch, setloadingSearch] = useState(false)
  const location = useSelector(state => state.location)
  const [filterCity, setfilterCity] = useState(
    location.shipping_address.data.id,
  )
  const navigation = useNavigation()

  const dataCategory = props.route.params.dataCategory
 


  const debounce = func => {
    let timer
    return function (...args) {
      const context = this
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        timer = null
        func.apply(context, args)
      }, 500)
    }
  }

  //   const subCategoryId = 2
  const toggleModal = () => {
    setModalVisible(!isModalVisible)
  }
  const ApiUrl = Config.API_URL
  const fetchDataProductPopuler = async () => {
    setloadingPopuler(true)
    const url =
      ApiUrl +
      `/customer-app/products?category_id=${dataCategory.id}&location_id=${filterCity}&most_sold=1`

    await axios
      .get(url)
      .then(response => {
        // console.log(response.data.data.products)
        setpopulerResult(response.data.data.products.data.splice(5, 5))
        setloadingPopuler(false)
      })
      .catch(({ response }) => {
        setloadingPopuler(false)
        // setloadingData(false)
      })
  }

  const fetchDataProductSearch = async () => {
    const url =
      ApiUrl +
      `/customer-app/products?category_id=${dataCategory.id}&name=${searchTerm}&location_id=${filterCity}`
    console.log(url)

    await axios
      .get(url)
      .then(response => {
        setloadingSearch(false)
        setsearchResult(response.data.data.products.data)
      })
      .catch(({ response }) => {})
  }

  //   const data = dataCategory

  useEffect(() => {
    fetchDataProductPopuler()
  }, [])

  useEffect(() => {
    setloadingSearch(true)
    fetchDataProductSearch()
  }, [searchTerm])

  return (
    // <Modal animationType="slide" visible={isVisible}>

    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <View
          style={[
            Layout.row,
            {
              justifyContent: 'center',
              alignItems: 'center',
              // margintop: 20,
              backgroundColor: 'white',
              height: 60,
              paddingHorizontal: 10,
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack()
            }}
          >
            <FeatherIcon
              style={{ fontSize: 25, marginRight: 20 }}
              name="arrow-left"
            ></FeatherIcon>
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row' }}>
            <InputSearch
              onChangeText={debounce(async text => {
                console.log(text)
                setsearchTerm(text)
              }, 500)}
              autoFocus={true}
              iconRight={
                <FeatherIcon
                  style={{ marginRight: 100 }}
                  color="black"
                  size={18}
                  name="arrow-left"
                ></FeatherIcon>
              }
            ></InputSearch>
          </View>
        </View>

        <ScrollView style={[styles.screen, { paddingHorizontal: 0 }]}>
          <View style={{ marginBottom: 250 }}>
            <ContentSearch
              loadingPopuler={loadingPopuler}
              loadingSearch={loadingSearch}
              dataPopuler={populerResult}
              dataSearch={searchResult.splice(5, 5)}
              searchTerm={searchTerm}
              subCategory={dataCategory}
            />
          </View>
        </ScrollView>

        {/* Footer */}
      </View>
    </View>
  )
}

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

const dataProductxxx = [
  {
    id: 1,
    name: 'Bunga Papan Duka Cita1',
    description: 'product testing',
    price: 100000,
    sale_price: 90000,
    qty: null,
    image: '/assets/images/products/BPDC-1.png',
    category_id: 1,
    product_code: 'BPDC-1',
    rating: 0,
    item_sold: 0,
    discount: 10,
  },
  {
    id: 2,
    name: 'bbbbbbbbbbbbb',
    description: 'bbbbbbbbbb',
    price: 600000,
    sale_price: 0,
    qty: 1,
    image: '/assets/images/products/BPDC-1.png',
    category_id: 1,
    product_code: 'BPDC-1',
    rating: 0,
    item_sold: 0,
    discount: 0,
  },
]

const styles = StyleSheet.create({
  screen: { backgroundColor: 'white' },
  textCategory: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
  },
  textCategoryChild: {
    marginLeft: 0,
    fontSize: 16,
    fontWeight: '100',
  },
  chip: {
    padding: 10,
    borderColor: Colors.neutralGray03,
    borderWidth: 1,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,

    // paddingBottom: 150,
  },
  sortContainer: {
    marginTop: 10,
    flexWrap: 'wrap',
    alignSelf: 'baseline',
    flexDirection: 'row',
    overflow: 'visible',
    flexGrow: 1,
  },
  section: {
    marginTop: 20,
  },
  pill: {
    backgroundColor: 'rgba(203, 58, 49, 0.1)',
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 5,
    marginHorizontal: 5,
    // marginRight: 5,
  },
  textPill: { color: '#CB3A31', fontSize: 10 },
})
export default ModalSearch
