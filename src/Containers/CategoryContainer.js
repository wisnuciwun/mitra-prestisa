import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  ImageBackground,
  PanResponder,
  Platform,
  Pressable,
  FlatList,
  StatusBar,
  Image,
  ActivityIndicator,
} from 'react-native'
import { useTheme } from '@/Hooks'
import { Colors } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { Button, Rating, Skeleton } from '@rneui/themed'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import ModalCategories from '../Components/Category/modalCategories'
import ModalFilter from '../Components/Category/ModalFilter'
// import ModalSearch from '../Components/Category/ModalSearch'
import CardProduct from '../Components/CardProduct'
import FastImage from 'react-native-fast-image'
import { Assets } from '@/Theme/Assets'
import axios from 'axios'
import _ from 'lodash'
import Spacer from '@/Components/Base/Spacer'
import FilterEmpty from '@/Components/EmptyState/FilterEmpty'

import { Config } from '@/Config'
import ModalOptionLocation from '@/Components/Home/ModalOptionLocation'
import EmptyOrBlankState from '@/Components/Base/EmptyOrBlankState'
import CartCounterHeader from '@/Components/Base/CartCounterHeader'
const ApiUrl = Config.API_URL

const TabBarHeight = 48
const HeaderHeight = 150
const SafeStatusBar = Platform.select({
  ios: 44,
  android: StatusBar.currentHeight,
})

const CategoryContainer = props => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [search, setsearch] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [visibleModalFilter, setvisibleModalFilter] = useState(false)
  const [visibleModalSearch, setvisibleModalSearch] = useState(false)
  const [dataProduct, setdataProduct] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loadingData, setloadingData] = useState(true)
  const location = useSelector(state => state.location)

  const [loadingOccasion, setloadingOccasion] = useState(true)
  const [dataOccasion, setdataOccasion] = useState([])
  const [currentOccasion, setCurrentOccasion] = useState([])
  const [selectedOccasionId, setselectedOccasionId] = useState(43)
  const [checkedIDCategory, setcheckedIDCategory] = useState('')

  const [showLocationModal, setShowLocationModal] = useState(false)
  const [tabIndex, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'tab1', title: 'Tab1' },
    { key: 'tab2', title: 'Tab2' },
  ])
  // Filter Modal
  const [filterPriceMin, setfilterPriceMin] = useState('')
  const [filterPriceMax, setfilterPriceMax] = useState('')
  const [filterDiscounted, setfilterDiscounted] = useState('')
  const [filterRating, setfilterRating] = useState('')
  const [filterPrice, setfilterPrice] = useState('')
  const [filterMostSold, setfilterMostSold] = useState('')
  const [filterCity, setfilterCity] = useState(
    location.shipping_address.data.id,
  )

  // const [filterCity, setfilterCity] = useState(1213546)

  const [availableNexPage, setavailableNexPage] = useState(true)
  const [errorRespons, setErrorRespons] = useState({ status: 'success' })

  const [filterAplly, setfilterAplly] = useState({
    min: '',
    max: '',
    rating: '',
    price: '',
    most_sold: '',
    discounted: '',
  })

  const scrollY = useRef(new Animated.Value(0)).current
  const headerScrollY = useRef(new Animated.Value(0)).current
  const listRefArr = useRef([])
  const listOffset = useRef({})
  const isListGliding = useRef(false)
  const headerScrollStart = useRef(0)
  const _tabIndex = useRef(0)

  const categoryName = props.route.params.name
  // const categoryName = 'Papan'
  const subCategoryId = props.route.params.id
  // const subCategoryId = 7

  const dataCategory = props.route.params
  // const dataCategory = { id: 7, name: 'Papanfb' }
  // console.log(props.route.params)

  /**
   * PanResponder for header
   */
  const headerPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
      onStartShouldSetPanResponder: (evt, gestureState) => {
        headerScrollY.stopAnimation()
        syncScrollOffset()
        return false
      },

      onMoveShouldSetPanResponder: (evt, gestureState) => {
        headerScrollY.stopAnimation()
        return Math.abs(gestureState.dy) > 5
      },

      onPanResponderRelease: (evt, gestureState) => {
        syncScrollOffset()
        if (Math.abs(gestureState.vy) < 0.2) {
          return
        }
        headerScrollY.setValue(scrollY._value)
        Animated.decay(headerScrollY, {
          velocity: -gestureState.vy,
          useNativeDriver: true,
        }).start(() => {
          syncScrollOffset()
        })
      },
      onPanResponderMove: (evt, gestureState) => {
        listRefArr.current.forEach(item => {
          // if (item.key !== routes[_tabIndex.current].key) {
          //   return
          // }
          if (item.value) {
            item.value.scrollToOffset({
              offset: -gestureState.dy + headerScrollStart.current,
              animated: false,
            })
          }
        })
      },
      onShouldBlockNativeResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        headerScrollStart.current = scrollY._value
      },
    }),
  ).current

  /**
   *  helper functions
   */
  const syncScrollOffset = () => {
    const curRouteKey = routes[_tabIndex.current].key

    listRefArr.current.forEach(item => {
      if (item.key !== curRouteKey) {
        if (scrollY._value < HeaderHeight && scrollY._value >= 0) {
          if (item.value) {
            item.value.scrollToOffset({
              offset: scrollY._value,
              animated: false,
            })
            listOffset.current[item.key] = scrollY._value
          }
        } else if (scrollY._value >= HeaderHeight) {
          if (
            listOffset.current[item.key] < HeaderHeight ||
            listOffset.current[item.key] == null
          ) {
            if (item.value) {
              item.value.scrollToOffset({
                offset: HeaderHeight,
                animated: false,
              })
              listOffset.current[item.key] = HeaderHeight
            }
          }
        }
      }
    })
  }

  const onMomentumScrollBegin = () => {
    isListGliding.current = true
  }

  const onMomentumScrollEnd = () => {
    isListGliding.current = false
    syncScrollOffset()
  }

  const onScrollEndDrag = () => {
    syncScrollOffset()
  }

  const handlerModalCategoryButton = props => {
    setIsVisible(!isVisible)
    setOccasionChild(props.parent)
    setcheckedIDCategory(props.child)
    changeOccasionFetchdata()
    // console.log(props)
  }

  const handleShowLocationModal = () => {
    setfilterCity(location.shipping_address.data.id)
    // setShowLocationModal(!showLocationModal)
  }

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

  const handleCloseModal = () => {
    setIsVisible(!isVisible)
  }
  const handlerModalFilterButton = () => {
    // console.log(visibleModalFilter)
    setvisibleModalFilter(!visibleModalFilter)
  }
  const handlerModalFilterButtonApply = filter => {
    console.log(filter)

    setdataProduct([])
    setfilterAplly({
      min: filter.min,
      max: filter.max,
      rating: filter.rating,
      price: filter.price,
      most_sold: filter.most_sold,
      discounted: filter.discounted,
    })
    setvisibleModalFilter(!visibleModalFilter)
  }

  const handleCloseModalFilter = () => {
    setvisibleModalFilter(!visibleModalFilter)
  }
  const handlerModalSearchButton = () => {
    setvisibleModalSearch(!visibleModalSearch)
  }
  const handleCloseModalSearch = () => {
    setvisibleModalSearch(!visibleModalSearch)
  }
  const handlePressSubCategory = id => {
    setcheckedIDCategory(id)
    changeOccasionFetchdata()
  }

  const setOccasionChild = async parent => {
    const data_occasion = dataOccasion.filter(item => {
      return item.id === parent
    })

    if (data_occasion.length > 0) {
      setCurrentOccasion(data_occasion[0]['sub_occasion'])
    }
  }

  const fetchDataproduct = async darimana => {
    setloadingData(true)
    const url = `${ApiUrl}/customer-app/products?category_id=${subCategoryId}&occasion_id=${checkedIDCategory}&min=${filterAplly.min}&max=${filterAplly.max}&discounted=${filterAplly.discounted}&rating${filterAplly.rating}=&price=${filterAplly.price}&most_sold=${filterAplly.most_sold}&location_id=${filterCity}&page=${currentPage}`
    // console.log('Berasal dari: ', darimana)
    // console.log('URL: ', url)
    // console.log('---------------------')

    await axios
      .get(url)
      .then(response => {
        const data = [...dataProduct, ...response.data.data.products.data]

        setdataProduct(data)
        if (response.data.data.products.next_page_url == null) {
          setavailableNexPage(false)
        } else {
          setavailableNexPage(true)
        }
        // console.log('berhasil set data')
        // setCurrentPage(currentPage + 1)
        setloadingData(false)
      })
      .catch(({ response }) => {
        // console.log(response.data.data)
        setErrorRespons(response.data)
        setloadingData(false)
      })
  }

  const fetchDataOcasion = async () => {
    setloadingOccasion(true)
    const url = ApiUrl + '/customer-app/occasions'

    await axios
      .get(url)
      .then(response => {
        const formatdata = response.data.data.occasions

        setdataOccasion(formatdata)
        setOccasionChild(item)

        setloadingOccasion(false)
      })
      .catch(({ response }) => {
        setloadingOccasion(false)
      })
  }

  const changeOccasionFetchdata = () => {
    setdataProduct([])
    setTimeout(() => {
      setCurrentPage(1)
      // fetchDataproduct('changeOccasionFetchdata')
    }, 1000)
  }

  const _renderItem = ({ item }) => {
    return (
      <CardProduct
        key={item.id}
        item={item}
        category={{ id: subCategoryId, name: categoryName }}
      ></CardProduct>
    )
  }

  const StickyHeader = props => {
    // console.log('Current Occs: ', currentOccasion)
    return (
      <View style={{ backgroundColor: 'white' }}>
        <View style={styles.containerBody}>
          {/* <Text>Harga min : {filterAplly.min}</Text>
          <Text>harga max: {filterAplly.max}</Text>
          <Text>Rating {filterAplly.rating}</Text>
          <Text>diskon : {filterAplly.discounted}</Text>
          <Text>terlaris : {filterAplly.most_sold}</Text>
          <Text>harga: {filterAplly.price}</Text> */}
          <View
            style={[
              Layout.row,
              Layout.justifyContentBetween,
              { paddingHorizontal: 20 },
            ]}
          >
            <TouchableOpacity>
              <Button
                containerStyle={{}}
                titleStyle={[styles.textButton]}
                buttonStyle={styles.buttonfilter}
                icon={<Icon style={styles.iconButton} name="tune"></Icon>}
                title="Filter"
                onPress={handlerModalFilterButton}
              ></Button>
            </TouchableOpacity>

            <TouchableOpacity>
              <Button
                onPress={() => navigation.navigate('SearchLocation')}
                titleStyle={[styles.textButton]}
                buttonStyle={styles.buttonfilter}
                icon={
                  <FeatherIcon
                    style={styles.iconButton}
                    name="map-pin"
                  ></FeatherIcon>
                }
                title={location.shipping_address.data.city}
              ></Button>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            borderColor: '#f1f1f1',
            borderBottomWidth: 1,
            borderTopWidth: 1,
            flexDirection: 'row',
            paddingHorizontal: 20,
            paddingVertical: 0,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <ScrollView scrollEnabled horizontal={true} style={{}}>
            {!loadingOccasion ? (
              currentOccasion &&
              currentOccasion.map((item, index) => {
                return (
                  <View key={item.id}>
                    <Text
                      onPress={() => {
                        // console.log('click occasion')
                        setCurrentPage(1)
                        setdataProduct([])
                        handlePressSubCategory(item.id)
                      }}
                      style={[
                        styles.headingTitleSubCategory,
                        checkedIDCategory == item.id && styles.selected,
                      ]}
                    >
                      {item.name}
                    </Text>
                  </View>
                )
              })
            ) : (
              <View style={{ flexDirection: 'row' }}>
                {[...Array(4)].map((item, index) => {
                  return (
                    <View
                      key={Math.random()}
                      style={{
                        height: 10,
                        width: 80,
                        backgroundColor: Colors.neutralGrayBlue,
                        marginRight: 20,
                      }}
                    ></View>
                  )
                })}
              </View>
            )}
          </ScrollView>
          <View
            style={{
              width: 40,
              // borderLeftColor: '#eeeeee',
              // borderLeftWidth: 1,
              paddingLeft: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setIsVisible(true)
              }}
            >
              <View style={[styles.buttonModal]}>
                <FeatherIcon
                  style={[styles.iconButton, { marginRight: 0 }]}
                  name="chevron-down"
                ></FeatherIcon>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <ModalOptionLocation
          isVisible={showLocationModal}
          navigation={navigation}
          onBackdropPress={handleShowLocationModal}
        />
      </View>
    )
  }

  const HeaderSearch = () => {
    return (
      <View
        style={{
          // alignItems: 'flex-start',
          flexGrow: 0,
        }}
      >
        <TouchableOpacity
          // onPress={handlerModalSearchButton}
          onPress={() => {
            navigation.navigate('SearchPageSubcategory', {
              checkedIDCategory: checkedIDCategory,
              subCategoryId: subCategoryId,
              dataCategory: dataCategory,
            })
          }}
          style={{
            height: 36,
            width: windowWidth * 0.7,
            borderRadius: 4,
            flexDirection: 'row',
            flex: 1,
            borderColor: '#C2C2C2',
            borderWidth: 1,

            // alignSelf: 'stretch',
            alignItems: 'center',
            // alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: Colors.white,
            paddingHorizontal: 12,
          }}
        >
          <Text
            style={{
              fontFamily: Fonts.medium,
              fontWeight: '500',
              fontSize: 14,
              color: Colors.neutralGray01,
            }}
          >
            Cari di {categoryName}
          </Text>
          <FastImage
            source={Assets.icon_search_big_3x}
            style={{ height: 24, width: 24 }}
          />
        </TouchableOpacity>
      </View>
    )
  }

  useEffect(() => {
    navigation.setOptions({
      title: <HeaderSearch />,
      headerShown: true,
      animationEnabled: true,

      headerTitleStyle: {
        borderWidth: 0,
      },
      headerTitleContainerStyle: {
        width: '70%',
        borderWidth: 0,
      },

      headerRight: () => {
        return (
          <View style={[Layout.row, { height: 30, alignItems: 'center' }]}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Cart')
              }}
            >
              <View
                style={{
                  // backgroundColor: 'red',
                  height: 30,
                  alignItems: 'center',
                  alignContent: 'center',
                  justifyContent: 'center',
                  overflow: 'visible',
                }}
              >
                <CartCounterHeader />
              </View>
            </TouchableOpacity>
          </View>
        )
      },
    })
  }, [])

  function usePrevious(value) {
    const ref = useRef()
    useEffect(() => {
      ref.current = value
    })
    // console.log(ref.current)
    return ref.current
  }

  const prevpage = usePrevious(currentPage)
  const prevcheckedIDCategory = usePrevious(checkedIDCategory)

  useEffect(() => {
    fetchDataOcasion()
  }, [])

  useEffect(() => {
    // console.log('useEffect selectedOccasionId')

    setOccasionChild(selectedOccasionId)
  }, [selectedOccasionId])

  useEffect(() => {
    if (currentPage == 1) {
      // console.log('useEffect dataOccasion')
      // console.log(selectedOccasionId)
      setOccasionChild(selectedOccasionId)
    }
  }, [dataOccasion])

  useEffect(() => {
    // console.log('ganti occasion')
    if (prevcheckedIDCategory != checkedIDCategory) {
      setCurrentPage(1)
      setdataProduct([])
      // fetchDataproduct()
    }
    fetchDataproduct('use effect checkedIDCategory, currentPage')
    // setCurrentPage(1)
  }, [checkedIDCategory, currentPage])
  const firstFilter = useRef(true)
  const firstCity = useRef(true)

  useEffect(() => {
    if (firstFilter.current) {
      firstFilter.current = false
      return
    }

    setdataProduct([])
    setCurrentPage(1)
    setTimeout(() => {
      fetchDataproduct('use effect filterAplly')
    }, 1000)
  }, [filterAplly])

  useEffect(() => {
    // console.log(firstCity)
    if (firstCity.current) {
      firstCity.current = false
      return
    }

    setloadingData(true)
    setCurrentPage(1)
    setdataProduct([])
    setTimeout(() => {
      setfilterCity(location.shipping_address.data.id)
      // fetchDataproduct('use effect filterCity')
    }, 1000)
  }, [location.shipping_address.data.id])

  useEffect(() => {
    // setdataProduct([])
    // setCurrentPage(1)
    // setfilterCity(location.shipping_address.data.id)

    fetchDataproduct('use effect filterCity')
  }, [filterCity])

  useEffect(() => {
    scrollY.addListener(({ value }) => {
      const curRoute = routes[tabIndex].key
      listOffset.current[curRoute] = value
    })

    headerScrollY.addListener(({ value }) => {
      listRefArr.current.forEach(item => {
        if (item.key !== routes[tabIndex].key) {
          return
        }
        if (value > HeaderHeight || value < 0) {
          headerScrollY.stopAnimation()
          syncScrollOffset()
        }
        if (item.value && value <= HeaderHeight) {
          item.value.scrollToOffset({
            offset: value,
            animated: false,
          })
        }
      })
    })
    return () => {
      scrollY.removeAllListeners()
      headerScrollY.removeAllListeners()
    }
  }, [routes, tabIndex])

  const y = scrollY.interpolate({
    inputRange: [0, HeaderHeight],
    outputRange: [0, -HeaderHeight],
    extrapolate: 'clamp',
  })

  return (
    <View style={[styles.screen, Layout.fill, { backgroundColor: 'white' }]}>
      <Animated.View
        {...headerPanResponder.panHandlers}
        style={[
          {
            position: 'absolute',
            height: HeaderHeight,
            width: '100%',
            backgroundColor: 'white',
          },
          { transform: [{ translateY: y }] },
          styles.header,
        ]}
      >
        <ImageBackground
          imageStyle={{ opacity: 0.4 }}
          style={{
            paddingHorizontal: 20,
            height: 150,
            backgroundColor: 'black',
            justifyContent: 'center',
            alignContent: 'center',
          }}
          resizeMode="cover"
          source={Images.header_catalog}
        >
          <View>
            <Text style={[styles.headerText]}>
              {_.startCase(_.toLower(categoryName))}
            </Text>
          </View>
        </ImageBackground>
      </Animated.View>
      <Animated.FlatList
        windowSize={10}
        maxToRenderPerBatch={10}
        removeClippedSubviews={true}
        style={{ height: windowHeight }}
        data={dataProduct}
        renderItem={data => _renderItem(data)}
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { y: scrollY } },
            },
          ],
          { useNativeDriver: true },
        )}
        onMomentumScrollBegin={onMomentumScrollBegin}
        onScrollEndDrag={onScrollEndDrag}
        onMomentumScrollEnd={onMomentumScrollEnd}
        contentContainerStyle={{
          // backgroundColor: 'white',
          paddingTop: HeaderHeight,
          // paddingHorizontal: 10,
          minHeight: windowHeight - SafeStatusBar + HeaderHeight,
        }}
        keyExtractor={(item, index) => {
          return item.id * index
        }}
        numColumns={2}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginVertical: 10 }}>
            {errorRespons.status == 'error' && (
              <EmptyOrBlankState
                image={Images.EmptyFilter}
                messageBody={errorRespons.data.body}
                title={errorRespons.data.title}
                titleButton={'Ubah Lokasi'}
                buttonOnPress={() => navigation.navigate('SearchLocation')}
              />
            )}
          </View>
        }
        stickyHeaderIndices={[0]}
        ListHeaderComponent={
          <>
            <StickyHeader />
          </>
        }
        onEndReached={({ distanceFromEnd }) => {
          if (loadingData != true) {
            if (availableNexPage == true) {
              // console.log('next Page')
              setCurrentPage(currentPage + 1)
            }
          }
        }}
        onEndReachedThreshold={0.2}
        ListFooterComponent={
          <View>
            {loadingData ? (
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
              <View style={{ alignItems: 'center', marginVertical: 60 }}>
                {availableNexPage == false && <Text> Semua data termuat </Text>}
              </View>
            )}
          </View>
        }
      />
      {/* </ScrollView> */}

      <ModalCategories
        dataCategory={dataOccasion}
        isVisible={isVisible}
        closeModal={handleCloseModal}
        onPress={handlerModalCategoryButton}
      />

      <ModalFilter
        isVisible={visibleModalFilter}
        closeModal={handleCloseModalFilter}
        // onPress={handlerModalFilterButton}
        handleApplyFilter={handlerModalFilterButtonApply}
      />
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
  containerBody: { paddingHorizontal: 0, paddingVertical: 10 },
  headerText: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 35,
    color: 'white',
    fontFamily: 'Poppins-Bold',
    fontWeight: '600',
  },
  iconButton: {
    color: '#4D4D4D',
    marginRight: 10,
    fontSize: 18,
  },
  textButton: {
    color: '#4D4D4D',
    fontSize: 12,
    // margin: 0,
    // padding: 0,
  },
  headingTitleSubCategory: {
    ...headingTitleSubCategory,
    paddingVertical: 11,
  },
  selected: {
    ...headingTitleSubCategory,
    color: Colors.primary,
    borderBottomColor: Colors.primary,
    borderBottomWidth: 2,
  },

  buttonModal: {
    width: 28,
    padding: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#B6B6B6',
    marginVertical: 5,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  buttonfilter: {
    backgroundColor: 'white',
    borderColor: '#4D4D4D',
    borderWidth: 1,
    // paddingVertical: 0,
    paddingVertical: 5,
    height: 30,
  },
  skeletonOccasion: {
    backgroundColor: Colors.neutralGrayBlue,
    marginRight: 20,
  },
  header: {
    height: HeaderHeight,
    // width: '100%',
    // alignItems: 'center',
    // justifyContent: 'center',
    // position: 'absolute',
    // backgroundColor: '#40FFC4',
  },
})
export default CategoryContainer
