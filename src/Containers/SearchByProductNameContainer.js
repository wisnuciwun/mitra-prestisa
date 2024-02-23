import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { navigationRef } from '@/Navigators/utils'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { Colors, Fonts } from '@/Theme/Variables'
import FastImage from 'react-native-fast-image'
import { Assets } from '@/Theme/Assets'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import Spacer from '@/Components/Base/Spacer'
import { Divider } from '@rneui/themed'
import CardProduct from '@/Components/CardProduct'
import { Config } from '@/Config'
import axios from 'axios'
// import ModalOptionLocation from '@/Components/Home/ModalOptionLocation'
const ApiUrl = Config.API_URL
const marginHorizontal = 24

const SearchProductByNameContainer = props => {
  const navigation = useNavigation()
  const location = useSelector(state => state.location)
  const [visibleModalSearch, setvisibleModalSearch] = useState(false)
  const { width, height } = Dimensions.get('window')
  const categoryName = 'name'
  const [searchResult, setsearchResult] = useState([])
  const [loadingSearch, setLoadingSearch] = useState(false)
  const [filterCity, setfilterCity] = useState(
    location.shipping_address.data.id,
  )
  const handlerModalSearchButton = () => {
    setvisibleModalSearch(!visibleModalSearch)
  }

  const [category, setcategory] = useState(props.route.params.category)
  const searchTerm = props.route.params.searchTerm
  const dataCount = props.route.params.dataCount

  const [isPrestisaSearch, setisprestisaSearch] = useState(
    props.route.params.isPrestisa,
  )

  // console.log(category)
  // const category_id = 7
  const productName = 'fb'

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <TouchableOpacity
            onPress={() => {
              navigation.goBack()
            }}
            style={{
              marginLeft: 10,
              // backgroundColor: 'red',
            }}
          >
            <FeatherIcon
              style={{ fontSize: 25, color: '#1D1619', marginLeft: 0 }}
              name="arrow-left"
            />
          </TouchableOpacity>
        )
      },
      title: <HeaderSearch />,
      headerShown: true,
      animationEnabled: true,
      headerTitleStyle: {
        borderWidth: 0,
      },
      headerTitleContainerStyle: {
        // width: '100%',
        borderWidth: 0,
        // paddingLeft: 20,
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'flex-start',
        // justifyContent: 'center',
        alignContent: 'flex-start',
      },

      headerRight: () => {
        return (
          <FeatherIcon
            style={{ fontSize: 20, color: '#1D1619', marginRight: 10 }}
            name="shopping-bag"
          />
        )
      },
    })
  }, [navigation])

  // console.log('PROPS', props)

  /**
   *
   *
   * Small Components
   */
  const HeaderSearch = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          flexGrow: 0,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack()
          }}
          style={{
            height: 36,
            width: width * 0.7,
            borderRadius: 4,
            flexDirection: 'row',
            flex: 1,
            borderColor: '#C2C2C2',
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: Colors.white,
            paddingHorizontal: 12,
          }}
        >
          <Text
            style={{
              fontFamily: Fonts.medium,
              fontWeight: '500',
              fontSize: 16,
              lineHeight: 22.4,
              color: Colors.neutralGray01,
            }}
          >
            {searchTerm}
          </Text>
          <FastImage
            source={Assets.icon_search_big_3x}
            style={{ height: 24, width: 24 }}
          />
        </TouchableOpacity>
      </View>
    )
  }

  const HeaderInfo = ({ isActive }) => {
    return (
      <View
        style={{
          justifyContent: 'center',
          marginHorizontal: 60,
        }}
      >
        <Spacer height={32} />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <FastImage
            source={Assets.frown_big_color_3x}
            style={{ height: 40, width: 40 }}
          />
          <Spacer height={16} />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                fontFamily: Fonts.medium,
                fontSize: 16,
                lineHeight: 22.4,
                color: Colors.neutralBlack02,
              }}
            >
              Maaf, barang yang kamu cari nggak ada
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: Fonts.regular,
                fontSize: 14,
                lineHeight: 22.4,
                color: Colors.neutralBlack02,
              }}
            >
              {isPrestisaSearch ? (
                <Text>
                  Mungkin kamu bisa ubah pencarian atau cek produk rekomendasi
                  Prestisa di bawah
                </Text>
              ) : (
                <Text>
                  Produk "{searchTerm}" belum ada di {category.name}
                </Text>
              )}
            </Text>
          </View>
        </View>
        <Spacer height={22} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          {!isPrestisaSearch ? (
            <>
              <TouchableOpacity
                onPress={() => {
                  setisprestisaSearch(true)
                }}
                style={[
                  styles.buttonTextContaier,
                  {
                    backgroundColor: isActive ? Colors.white : Colors.primary,
                  },
                  styles.buttonOutline,
                ]}
              >
                <Text
                  style={[
                    styles.buttonText,
                    {
                      color: isActive ? Colors.neutralBlack02 : Colors.white,
                    },
                  ]}
                >
                  Cari di Prestisa
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack()
                }}
                style={[
                  styles.buttonTextContaier,
                  {
                    backgroundColor: !isActive ? Colors.white : Colors.primary,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.buttonText,
                    {
                      color: !isActive ? Colors.neutralBlack02 : Colors.white,
                    },
                  ]}
                >
                  Ubah Pencarian
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack()
              }}
              style={[
                styles.buttonTextContaier,
                {
                  backgroundColor: !isActive ? Colors.white : Colors.primary,
                },
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: !isActive ? Colors.neutralBlack02 : Colors.white,
                  },
                ]}
              >
                Ubah Pencarian
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    )
  }

  const FlatListTitle = ({ title = 'Produk yang ada di Bunga Papan' }) => {
    return (
      <View
        style={{
          marginHorizontal: marginHorizontal,
          marginTop: marginHorizontal,
          marginBottom: 19,
        }}
      >
        <Text
          style={{
            fontFamily: Fonts.medium,
            lineHeight: 25,
            fontSize: 18,
            color: Colors.neutralBlack02,
          }}
        >
          {isPrestisaSearch ? (
            <Text>Produk Rekomendasi Prestisa</Text>
          ) : (
            <Text>Produk yang ada di {category.name}</Text>
          )}
        </Text>
      </View>
    )
  }

  const _renderItem = ({ item }) => {
    // console.log('ITEM', item)
    return (
      <CardProduct
        key={item.id}
        item={item}
        category={{ id: '1', name: 'categoryName' }}
      ></CardProduct>
    )
  }

  const fetchDataSearch = async () => {
    // setloadingOccasion(true)
    setLoadingSearch(true)
    const url =
      ApiUrl +
      `/customer-app/products?category_id=${
        !isPrestisaSearch ? category.category_id : ''
      }&name=${productName}&location_id=${filterCity}`

    await axios
      .get(url)
      .then(response => {
        const formatdata = response.data.data.products.data
        console.log(formatdata)
        setsearchResult(formatdata)
      })
      .catch(({ response }) => {})
  }

  useEffect(() => {
    fetchDataSearch()
  }, [])

  useEffect(() => {
    fetchDataSearch()
  }, [isPrestisaSearch])

  return (
    <>
      <FlatList
        ListHeaderComponent={({ isActive = true }) => {
          return (
            <>
              {dataCount == 0 && (
                <>
                  <HeaderInfo isActive={isActive} />
                  <Divider style={{ height: 32 }} color={'#F5F6F8'} width={4} />
                </>
              )}
              <FlatListTitle />
            </>
          )
        }}
        keyExtractor={(item, index) => index.toString()}
        data={searchResult}
        numColumns={2}
        renderItem={_renderItem}
        style={{ flex: 1, backgroundColor: 'white' }}
        ListEmptyComponent={() => {
          return loadingSearch == true ? (
            <>
              <View style={{ alignItems: 'center', marginVertical: 30 }}>
                <ActivityIndicator
                  style={{ marginVertical: 10 }}
                  size={30}
                  color={Colors.primary}
                />
                <Text>Sedang Memproses...</Text>
              </View>
            </>
          ) : (
            <></>
          )
        }}
      />
      {/* <FlatList
        ListHeaderComponent={({ isActive = true }) => {
          return (
            <>
              <HeaderInfo isActive={isActive} />
              <Divider style={{ height: 32 }} color={'#F5F6F8'} width={4} />
              <FlatListTitle />
            </>
          )
        }}
        keyExtractor={(item, index) => index.toString()}
        data={searchResult}
        numColumns={2}
        renderItem={_renderItem}
        style={{ flex: 1, backgroundColor: 'white' }}
      /> */}
    </>
  )
}

export default SearchProductByNameContainer

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  buttonTextContaier: {
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    height: 31,
    flex: 1,
    borderRadius: 14,
    marginRight: 10,
  },
  buttonText: {
    fontFamily: Fonts.medium,
    fontSize: 13,
    lineHeight: 17,
  },
  buttonOutline: {
    borderColor: Colors.neutralGray03,
    borderWidth: 1,
  },
})
