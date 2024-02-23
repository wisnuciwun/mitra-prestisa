import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Pressable,
  FlatList,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native'

import { useTheme } from '@/Hooks'
import { Colors } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { Button, Rating, Skeleton } from '@rneui/themed'
import { TouchableOpacity } from 'react-native-gesture-handler'

import FastImage from 'react-native-fast-image'
import { Assets } from '@/Theme/Assets'
import { Config } from '@/Config'
import axios from 'axios'
import Spacer from '@/Components/Base/Spacer'
import { addCart, setVoucher } from '../Store/cartSlice'

import Carousel from 'react-native-snap-carousel'
import ButtonBase from '@/Components/Base/ButtonBase'
import LoadingIndicator from '@/Components/Base/LoadingIndicator'
import ModalSearch from '@/Components/Category/ModalSearch'
import CartCounterHeader from '@/Components/Base/CartCounterHeader'
import {
  clearNavRoutes,
  clearRingkasanPesanan,
  setCitySeller,
  setRingkasanPesanan,
} from '@/Store/ringkasanPesananSlice'
import { getTotalAllItemSelectedCart } from '@/Components/MakeOrder/Helper'
import { reMapBuyNowData } from '@/Components/RingkasanPesanan/Helper'
import Share from 'react-native-share'
import { capitalize } from 'lodash'
import dynamicLinks, { firebase } from '@react-native-firebase/dynamic-links'

const ApiUrl = Config.API_URL

const ProductDetailContainer = props => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const [carousel, setCarousel] = useState(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const [visibleModalSearch, setvisibleModalSearch] = useState(false)
  const [dataSlider, setdataSlider] = useState([
    { 1: 1 },
    { 2: 2 },
    { 3: 3 },
    { 3: 3 },
    { 3: 3 },
  ])

  // console.log('props.route', props.route)
  const cart = useSelector(state => state.cart)
  const location = useSelector(state => state.location)

  const [checkedIDCategory, setcheckedIDCategory] = useState([])
  const [subCategoryId, setsubCategoryId] = useState('')
  const [category, setcategory] = useState('')
  const [deeplink, setdeeplink] = useState('')

  const [productData, setproductData] = useState([])

  const productId = props.route.params.product_id
  // console.log('deeplink', productId)
  const numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  //console.log(deeplink)

  const deeplinkhandler = async productData => {
    const link =
      productData.link_product == ''
        ? 'http://www.prestisa.com'
        : productData.link_product
    dynamicLinks()
      .buildShortLink(
        {
          link: `${link}?pid=${productData.id}`,
          domainUriPrefix: 'http://prestisacustomer.page.link',
          social: {
            title: `${productData.name} - ${capitalize(productData.category)}`,
            descriptionText: productData.description,
            imageUrl: productData.image[0].path,
          },
          android: {
            packageName: 'com.prestisa',
          },
        },
        dynamicLinks.ShortLinkType.SHORT,
      )
      .then(result => {
        //console.log('hasil deeplink', result)
        setdeeplink(result)
      })
      .catch(err => {
        //console.log(err)
      })
  }

  const fetchDataProduct = async () => {
    // setloadingOccasion(true)
    const url = ApiUrl + '/customer-app/productDetail?id=' + productId
    // const url = ApiUrl + '/customer-app/productDetail?id=1469'

    await axios
      .get(url)
      .then(response => {
        const formatdata = response.data.data.product

        // console.log(formatdata)
        setproductData(formatdata)
        setdataSlider(formatdata.image)
        setcheckedIDCategory(formatdata.category_id)
        setsubCategoryId(formatdata.category_id)
        setcategory(formatdata.category)
        deeplinkhandler(formatdata)
      })
      .catch(({ response }) => {
        // console.log('ERRROR get detail:', response.data)
        // setloadingOccasion(false)
      })
  }

  const handleKeranjangButton = () => {
    dispatch(
      addCart({ city: location.shipping_address.data, data: productData }),
    )
  }

  const HeaderSearch = data => {
    // console.log('HEader: ', data)
    return (
      <View
        style={{
          flexGrow: 0,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SearchPageSubcategory', {
              checkedIDCategory: data.checkedIDCategory,
              subCategoryId: data.subCategoryId,
              dataCategory: { id: data.subCategoryId, name: data.category },
            })
          }}
          style={{
            height: 36,
            width: windowWidth * 0.6,
            borderRadius: 4,
            flexDirection: 'row',
            flex: 1,
            borderColor: '#C2C2C2',
            borderWidth: 1,
            alignItems: 'center',
            alignContent: 'center',
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
            Cari di {data.category}
          </Text>

          <FastImage
            source={Assets.icon_search_big_3x}
            style={{ height: 24, width: 24 }}
          />
        </TouchableOpacity>
      </View>
    )
  }

  const _renderItem = ({ item, index }) => {
    return (
      <View style={{ backgroundColor: 'red', height: 360 }}>
        <FastImage
          style={{
            height: 360,
            width: windowWidth,
            backgroundColor: Colors.neutralGrayBlue,
          }}
          resizeMode="cover"
          source={{ uri: item.path }}
        ></FastImage>
        {/* <Text>Halooo</Text> */}
        {/* <Text>Saya Krishna</Text> */}
      </View>
    )
  }

  const shareHandler = async () => {
    // const url = btoa('url')
    //console.log('deeplink: ', deeplink)
    options = {
      message: `Temukan Bunga ${
        productData.name
      } \nDengan Harga: Rp${numberWithCommas(
        productData.price,
      )} \nLink:  ${deeplink}`,
      title: 'Bagikan Product',
      // url: Buffer.from('url').toString('base64'),
    }
    Share.open(options)
      .then(res => {
        // console.log(res)
      })
      .catch(err => {
        // err && console.log(err)
      })
  }

  useEffect(() => {
    // navigation.setOptions({
    //   title: <HeaderSearch />,
    //   headerShown: true,
    //   animationEnabled: true,
    //   headerTitleStyle: {
    //     borderWidth: 0,
    //   },
    //   headerRight: () => {
    //     return (
    //       <View style={[Layout.row, { height: 30, alignItems: 'center' }]}>
    //         <TouchableOpacity
    //           onPress={() => {
    //             shareHandler()
    //           }}
    //         >
    //           <FeatherIcon
    //             style={{
    //               fontSize: 20,
    //               color: '#1D1619',
    //               marginRight: 10,
    //               marginLeft: 10,
    //             }}
    //             name="share-2"
    //           />
    //         </TouchableOpacity>
    //         <TouchableOpacity
    //           onPress={() => {
    //             navigation.navigate('Cart')
    //           }}
    //         >
    //           <View
    //             style={{
    //               // backgroundColor: 'red',
    //               height: 30,
    //               alignItems: 'center',
    //               alignContent: 'center',
    //               justifyContent: 'center',
    //               overflow: 'visible',
    //             }}
    //           >
    //             <CartCounterHeader />
    //           </View>
    //           {/* <FeatherIcon
    //             style={{ fontSize: 20, color: '#1D1619', marginRight: 20 }}
    //             name="shopping-bag"
    //           /> */}
    //         </TouchableOpacity>
    //       </View>
    //     )
    //   },
    // })
  }, [])

  navigation.setOptions({
    title: (
      <HeaderSearch
        category={productData.category}
        subCategoryId={productData.category_id}
        checkedIDCategory={productData.category_id}
      />
    ),
    headerShown: true,
    animationEnabled: true,
    headerTitleStyle: {
      borderWidth: 0,
    },

    headerRight: () => {
      return (
        <View style={[Layout.row, { height: 30, alignItems: 'center' }]}>
          <TouchableOpacity
            onPress={() => {
              shareHandler()
            }}
          >
            <FeatherIcon
              style={{
                fontSize: 20,
                color: '#1D1619',
                marginRight: 10,
                marginLeft: 10,
              }}
              name="share-2"
            />
          </TouchableOpacity>
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
            {/* <FeatherIcon
              style={{ fontSize: 20, color: '#1D1619', marginRight: 20 }}
              name="shopping-bag"
            /> */}
          </TouchableOpacity>
        </View>
      )
    },
  })

  useEffect(() => {
    // deeplinkhandler()
    // console.log('use effect')
    // console.log(productData)
  }, [productData])

  useEffect(() => {
    fetchDataProduct()
  }, [])

  return (
    <>
      {productData.id !== undefined ? (
        <>
          <ScrollView style={[styles.screen, Layout.fill]}>
            {/* Slider Gambar */}
            <View
              style={{ height: 360, backgroundColor: Colors.neutralGrayBlue }}
            >
              <Carousel
                activeAnimationType="timing"
                layout={'default'}
                ref={ref => setCarousel(ref)}
                data={productData.image}
                sliderWidth={windowWidth}
                itemWidth={windowWidth}
                itemHeight={360}
                sliderHeight={360}
                style={{ height: 360 }}
                renderItem={_renderItem}
                inactiveSlideScale={1}
                inactiveSlideOpacity={1}
                onSnapToItem={index => setActiveSlide(index)}
                // onSnapToItem={index => this.setState({ activeIndex: index })}
              />
            </View>
            {/* Control SLider Kanan kiri */}
            <View style={[styles.SlideControl]}>
              {productData.image.length > 0 ? (
                <>
                  <View>
                    {activeSlide > 0 && (
                      <Icon
                        style={[styles.slideButtonLeft]}
                        onPress={() => {
                          carousel.snapToPrev()
                        }}
                        size={30}
                        name="chevron-right-circle"
                      />
                    )}
                  </View>
                  <View style={{ height: 30 }}>
                    {activeSlide < dataSlider.length - 1 && (
                      <Icon
                        style={styles.slideButtonRight}
                        size={30}
                        onPress={() => {
                          carousel.snapToNext()
                        }}
                        // color="red"
                        name="chevron-right-circle"
                      />
                    )}
                  </View>
                </>
              ) : (
                <View style={{ height: 30 }}></View>
              )}
            </View>
            {/* Header Description */}
            <View style={[styles.container, { marginTop: -70 }]}>
              <Text style={styles.HeaderText}>{productData.name}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 20,
                }}
              >
                <Text style={styles.HargaBesar}>
                  Rp
                  {numberWithCommas(
                    productData.discount > 0
                      ? productData.sale_price
                      : productData.price,
                  )}
                </Text>
                {productData.discount > 0 ? (
                  <Text style={{ textDecorationLine: 'line-through' }}>
                    Rp{numberWithCommas(productData.price)}
                  </Text>
                ) : (
                  <></>
                )}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  // justifyContent: 'center',
                  // alignContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontSize: 14, fontWeight: '600' }}>
                  {productData.item_sold} Terjual
                </Text>
                <View>
                  <View
                    style={[
                      Layout.row,
                      {
                        marginLeft: 10,
                      },
                    ]}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('RatingContainer', {
                          product_id: productData.id,
                        })
                      }}
                    >
                      <View style={[styles.outlineButton]}>
                        <Icon
                          name="star"
                          style={{ fontSize: 16, color: '#EACA25' }}
                        ></Icon>

                        <Text style={{ fontSize: 13, fontWeight: '600' }}>
                          {productData.rating} ({productData.total_rating})
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.outlineButton}
                      onPress={() => {
                        navigation.navigate('PhotoReview', {
                          product_id: productData.id,
                        })
                      }}
                    >
                      <Text style={{ fontSize: 13, fontWeight: '600' }}>
                        Foto Pembeli ({productData.total_foto_pembeli})
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            {/* Product Body Desc */}
            <View style={[styles.container]}>
              <Text style={styles.HeaderText}>Informasi Produk</Text>
              <View style={styles.infoRow}>
                <Text style={styles.infoLeft}>Kategori</Text>
                <Text style={styles.infoRight}>{productData.category}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLeft}>Ketersediaan</Text>
                <Text style={styles.infoRight}>
                  {productData.qty > 0 ? 'Ready Stock' : 'Habis'}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLeft}>Ukuran</Text>
                <Text
                  style={[
                    styles.infoRight,
                    { flexWrap: 'wrap', flexShrink: 1 },
                  ]}
                >
                  {productData.dimension.height != null &&
                    'Tinggi ' + productData.dimension.height + ' cm '}
                  {productData.dimension.width != null &&
                    ' Lebar ' + productData.dimension.width + ' cm'}
                  {productData.dimension.length != null ||
                    (productData.dimension.length > 0 &&
                      ' Panjang ' + productData.dimension.length + ' cm')}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLeft}>Jenis Bunga</Text>
                <Text style={styles.infoRight}>Mawar</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLeft}>Occasion</Text>
                <Text style={styles.infoRight}>Duka Cita</Text>
              </View>
              <View style={[styles.infoRow]}>
                <Text style={styles.infoLeft}>Tags</Text>
                <View style={[Layout.row, { flexWrap: 'wrap', flexShrink: 1 }]}>
                  {productData.tag.map((item, index) => {
                    return (
                      <View key={Math.random()}>
                        <Text
                          style={[
                            styles.cardTextSmall,
                            styles.pill,
                            styles.textPill,
                          ]}
                        >
                          {item.name}
                        </Text>
                      </View>
                    )
                  })}
                </View>
              </View>
            </View>
            <View style={[styles.container]}>
              <Text style={styles.HeaderText}>Deskripsi</Text>
              <Text style={{ lineHeight: 20 }}>{productData.description}</Text>
            </View>
          </ScrollView>
          <View style={styles.footer}>
            {productData.ep_point > 0 && (
              <Text style={{ color: '#0654B9' }}>
                Beli Sekarang dan dapatkan{' '}
                <Text style={{ fontWeight: 'bold' }}>
                  {numberWithCommas(productData.ep_point)} Points!
                </Text>
              </Text>
            )}
            <View
              style={[
                Layout.row,
                { justifyContent: 'space-between', marginTop: 10 },
              ]}
            >
              <ButtonBase
                leftIcon={
                  <FeatherIcon
                    style={{
                      fontSize: 18,
                      color: Colors.primary,
                      marginRight: 10,
                    }}
                    name="shopping-bag"
                  />
                }
                onPress={() => {
                  handleKeranjangButton()
                }}
                mode={'outline'}
                style={{ width: windowWidth * 0.4, height: 40 }}
                title={'Keranjang'}
              ></ButtonBase>
              <Spacer width={30}></Spacer>
              <ButtonBase
                // onPress={() => handleBeliSekarang()}
                style={{
                  width: windowWidth * 0.4,
                  height: 40,
                  paddingHorizontal: 10,
                }}
                title={'Beli Sekarang'}
                onPress={() => {
                  const _loc = state.location.shipping_address.data
                  let _city = { name: _loc.city, location_id: _loc.id }
                  dispatch(setCitySeller(_city))
                  dispatch(setRingkasanPesanan(reMapBuyNowData([productData])))
                  dispatch(setVoucher([]))
                  dispatch(clearNavRoutes())
                  navigation.navigate('MakeOrderPengiriman', {
                    jumlahPage: 1,
                    prevPage: 0,
                    currentPage: 1,
                  })
                }}
              ></ButtonBase>
            </View>
          </View>
        </>
      ) : (
        <LoadingIndicator />
      )}
      {/* <ModalSearch
        checkedIDCategory={checkedIDCategory}
        subCategoryId={subCategoryId}
        isVisible={visibleModalSearch}
        closeModal={handleCloseModalSearch}
        onPress={handlerModalSearchButton}
      /> */}
    </>
  )
}

const cardTextBase = { color: Colors.neutralBlack02 }
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  SlideControl: {
    padding: 20,
    position: 'relative',
    top: -220,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  slideButtonLeft: {
    transform: [{ rotateY: '180deg' }],
    color: 'white',
    opacity: 0.7,
  },
  slideButtonRight: {
    // transform: [{ rotateY: '180deg' }],
    color: 'white',
    opacity: 0.7,
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: Colors.neutralGray03,
    flexDirection: 'row',

    paddingHorizontal: 10,
    paddingVertical: 5,
    // paddingBottom: 0,
    // height: 0,
    borderRadius: 20,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    // height: 28,
  },
  pill: {
    backgroundColor: 'rgba(203, 58, 49, 0.1)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginRight: 5,
    marginBottom: 5,
  },
  textPill: {},
  cardTextSmall: {
    ...cardTextBase,
    fontSize: 12,
  },
  footer: {
    borderTopColor: Colors.neutralGrayBlue,
    borderTopWidth: 1,
    backgroundColor: 'white',
    padding: 24,
    paddingTop: 12,
    // height: 110,
  },
  container: {
    padding: 20,
    borderBottomColor: Colors.neutralGrayBlue,
    borderBottomWidth: 1,
  },
  HeaderText: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoLeft: {
    width: 100,
    color: Colors.neutralGray01,
  },
  infoRight: {
    color: Colors.neutralBlack01,
  },
  HargaBesar: {
    color: Colors.primary,
    fontSize: 20,
    fontWeight: '600',
    marginRight: 10,
  },
})
export default ProductDetailContainer
