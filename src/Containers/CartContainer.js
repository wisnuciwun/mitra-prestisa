import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Modal,
} from 'react-native'
import { useTheme } from '@/Hooks'
import { Colors } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FastImage from 'react-native-fast-image'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ButtonBase from '@/Components/Base/ButtonBase'
import {
  setCart,
  selectCart,
  unselectCart,
  decreaseCounterCart,
  increaseCounterCart,
  setCatatanCart,
  deleteCart,
} from '../Store/cartSlice'
import { Config } from '@/Config'
import axios from 'axios'
import { Grayscale } from 'react-native-color-matrix-image-filters'
import EmptyOrBlankState from '@/Components/Base/EmptyOrBlankState'
import {
  getTotalAllItemSelectedCart,
  populateAllItemSelectedCart,
} from '@/Components/MakeOrder/Helper'
import {
  clearNavRoutes,
  setRingkasanPesanan,
} from '@/Store/ringkasanPesananSlice'
import { setCitySeller } from '@/Store/ringkasanPesananSlice'
import { isArray } from 'lodash'
// import {  } from '@rneui/themed'

const CartContainer = props => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const ringkasanPesanan = useSelector(state => state.ringkasanPesanan)
  const [modalCatatanVisible, setmodalCatatanVisible] = useState(false)

  const [cartData, setcartData] = useState(cart)

  const [selectedProduct, setSelectedProduct] = useState([])
  const [selectedCity, setSelectedCity] = useState('')
  const [activeButton, setactiveButton] = useState(false)
  const [textCatatan, setTextCatatan] = useState('')
  const [catatanSelected, setcatatanSelected] = useState({
    data: '',
    city: '',
    catatan: '',
  })
  const [totalPriceSelected, settotalPriceSelected] = useState(0)

  const [displayinfoMultiProduct, setdisplayinfoMultiProduct] = useState('flex')

  const voucher = cart.voucher

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

  const handleCheckboxSelect = (data, city, selected) => {
    console.log('Selected: ', selected)
    // fetchDataCart()

    // setSelectedCity(city)

    selected == false
      ? dispatch(selectCart({ city: city, id_prod: data.id }))
      : dispatch(unselectCart({ city: city, id_prod: data.id }))
  }

  const sumPriceProduct = () => {
    let sumPrice = 0
    if (cart.data.length > 0) {
      cart.data.map((item, index) => {
        item.cart_items.map((dt, it) => {
          if (dt.selected == true) {
            console.log(
              'selected: ',
              dt.name,
              dt.selected,
              'Harga: ',
              dt.sale_price,
            )
            sumPrice +=
              dt.counter * (dt.discount > 0 ? dt.sale_price : dt.price)
          }
        })
      })
    }
    return sumPrice
  }

  const fetchDataCart = async () => {
    const ApiUrl = Config.API_URL
    const url = ApiUrl + '/customer-app/carts'
    console.log('fetch data cart')
    await axios.post(url).then(response => {
      const xxx = response.data.data.carts
      let cartx = []
      xxx.forEach((el, j) => {
        cartx.push({
          location_id: el.location_id,
          city: el.city,
          cart_items: [],
        })
        el.cart_items.forEach((prod, i) => {
          cartx[j].cart_items.push({
            ...prod,
            ...{ selected: false, counter: 1 },
          })
        })
      })

      dispatch(setCart(cartx))
    })
  }

  const handleDecreaseCounter = (data, city) => {
    dispatch(decreaseCounterCart({ city: city, id_prod: data.id }))
  }

  const handleIncreaseCounter = (data, city) => {
    dispatch(increaseCounterCart({ city: city, id_prod: data.id }))
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      animationEnabled: true,
    })
  }, [navigation])

  const state = useSelector(state => state)

  // const firstCity = useRef(true)

  useEffect(() => {
    // fetchDataCart()
  }, [])

  const getSelectedCity = data => {
    let city = ''
    for (var i = 0; i < cart.data.length; i++) {
      for (var j = 0; j < cart.data[i].cart_items.length; j++) {
        var prod = cart.data[i].cart_items[j]
        if (prod.selected != undefined && prod.selected == true) {
          city = cart.data[i].location_id
        } else {
        }
      }
    }
    return city
  }

  useEffect(() => {
    const city = getSelectedCity(cart)
    console.log(city)
    if (city == '') {
      setdisplayinfoMultiProduct('none')
      setactiveButton(true)
    } else {
      setactiveButton(false)
      setdisplayinfoMultiProduct('flex')
    }
    setSelectedCity(city)
  }, [cart])

  const first = useRef(true)
  // useEffect(() => {
  //   console.log('First = ', first)
  //   if (first.current) {
  //     first.current = false
  //     return
  //   } else {
  //     console.log('lanjut ke pengiriman')
  //     // fetchDataCart()
  //     navigation.navigate('MakeOrderPengiriman', {
  //       jumlahPage: dataPesanan.length,
  //       prevPage: 0,
  //       currentPage: 1,
  //     })
  //   }
  // }, [ringkasanPesanan])

  const VoucherButton = () => {
    let title = 'Pilih Voucher'
    let subtitle = ''

    if (!isArray(voucher)) {
      title = voucher.name
      if (voucher.promo_type == 'potongan') {
        if (voucher.type == 2) {
          // const diskon = (5 / 100) * 10000
          title = `Diskon Pengiriman ${numFormatter(voucher.discount_amount)}`
          subtitle = `(hemat Rp${numFormatter(voucher.discount_amount)})`
        } else if (voucher.type == 1) {
          const diskon = (voucher.discount_amount / 100) * 500000
          // title = voucher.name
          subtitle = `(hemat Rp${numberWithCommas(diskon)})`
        }
      }

      if (voucher.promo_type == 'ongkir') {
        if (voucher.type == 2) {
          // const diskon = (5 / 100) * 10000
          title = `Diskon Pengiriman ${numFormatter(voucher.discount_amount)}`
          subtitle = `(hemat Rp${numFormatter(voucher.discount_amount)})`
        } else if (voucher.type == 1) {
          const diskon = (voucher.discount_amount / 100) * sumPriceProduct()
          // console.log(diskon)
          // title = voucher.name
          subtitle = `(hemat Rp${numberWithCommas(
            diskon > voucher.max_discount ? voucher.max_discount : diskon,
          )})`
        }
      }

      if (voucher.promo_type == 'cashback') {
        if (voucher.type == 2) {
          // const diskon = (5 / 100) * 10000
          title = `Cashback ${numFormatter(voucher.discount_amount)}`
          subtitle = `(hemat Rp${numFormatter(voucher.discount_amount)})`
        } else if (voucher.type == 1) {
          const diskon = (voucher.discount_amount / 100) * sumPriceProduct()
          // console.log(diskon)

          // title = voucher.name
          subtitle = `(hemat Rp${numberWithCommas(diskon)})`
        }
      }
    } else {
      let title = 'Pilih Voucher'
      let subtitle = ''
    }

    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Voucher', { total: sumPriceProduct() })
        }}
        style={[Layout.row, st.voucherButton]}
      >
        <View style={[Layout.row, { padding: 15, alignItems: 'center' }]}>
          <MaterialCommunityIcons
            size={22}
            color={Colors.primary}
            name="ticket-percent-outline"
            style={{ marginRight: 10 }}
          ></MaterialCommunityIcons>

          <Text style={{ color: Colors.neutralBlack01 }}>{title}</Text>
          <Text style={{ color: Colors.primary, fontSize: 12, marginLeft: 5 }}>
            {subtitle}
          </Text>
        </View>
        <FeatherIcon size={16} name="chevron-right"></FeatherIcon>
      </TouchableOpacity>
    )
  }

  return (
    <View style={[st.screen, Layout.fill]}>
      {cart.data.length == 0 && (
        <EmptyOrBlankState
          title="Yaah, Keranjang kamu kosong nih"
          messageBody="Masih bingung mau beli produk apa
          Kita bisa bantu kok"
          titleButton="Lihat Produk Flash Sale"
          image={Images.EmptyCart}
        />
      )}
      <ScrollView>
        <View>
          {cart.data &&
            cart.data.map((city, index) => {
              let border = index > 0 ? { borderTopWidth: 5 } : null

              return (
                <View
                  style={{
                    borderTopColor: Colors.neutralGrayBlue,
                    ...border,
                    paddingHorizontal: 20,
                  }}
                  key={Math.random()}
                >
                  <View>
                    {selectedCity != '' ? (
                      city.location_id != selectedCity && (
                        <View
                          style={{
                            position: 'absolute',
                            zIndex: 1000,
                            top: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(255, 255, 255, 0.5)',
                            paddingTop: 20,
                            marginTop: 20,
                          }}
                        ></View>
                      )
                    ) : (
                      <></>
                    )}
                    <View style={[Layout.row, st.cityHeader]}>
                      <FeatherIcon
                        style={{ marginRight: 10, fontSize: 16 }}
                        name="truck"
                      ></FeatherIcon>
                      <Text style={{ fontSize: 16, fontWeight: '600' }}>
                        {city.city}
                      </Text>
                    </View>
                    {city.cart_items.map((prod, i) => {
                      const diskon = prod.price - prod.sale_price
                      const selectedPr = selectedProduct.filter(x => {
                        // console.log(prod.id)
                        return x.id == prod.id
                      })

                      const isselected = selectedPr.length > 0 ? true : false
                      // console.log(isselected)
                      return (
                        <View key={Math.random()} style={st.cardProduct}>
                          <View style={[Layout.row, { marginBottom: 10 }]}>
                            <TouchableOpacity
                              onPress={() => {
                                prod.selected == undefined ||
                                prod.selected == false
                                  ? handleCheckboxSelect(
                                      prod,
                                      city.location_id,
                                      false,
                                    )
                                  : handleCheckboxSelect(
                                      prod,
                                      city.location_id,
                                      true,
                                    )
                              }}
                            >
                              <MaterialCommunityIcons
                                style={{ marginRight: 10, fontSize: 20 }}
                                name={
                                  prod.selected == undefined ||
                                  prod.selected == false
                                    ? 'checkbox-blank-outline'
                                    : 'checkbox-marked'
                                }
                              ></MaterialCommunityIcons>
                            </TouchableOpacity>

                            <View style={st.image}>
                              {selectedCity != '' &&
                              city.location_id != selectedCity ? (
                                <>
                                  {prod.image.length > 0 ? (
                                    <Grayscale>
                                      <FastImage
                                        // tintColor="gray"
                                        style={st.image[0]}
                                        source={{ uri: prod.image[0].path }}
                                      />
                                    </Grayscale>
                                  ) : (
                                    <></>
                                  )}
                                </>
                              ) : (
                                <>
                                  {prod.image.length > 0 && (
                                    <FastImage
                                      // tintColor="gray"
                                      style={st.image}
                                      source={{ uri: prod.image[0].path }}
                                    />
                                  )}
                                </>
                              )}
                            </View>
                            <View>
                              <Text>{prod.name}</Text>
                              <View
                                style={[Layout.row, Layout.alignItemsCenter]}
                              >
                                <Text
                                  style={{ fontSize: 14, fontWeight: '600' }}
                                >
                                  Rp
                                  {numberWithCommas(
                                    prod.discount > 0
                                      ? prod.sale_price
                                      : prod.price,
                                  )}
                                </Text>
                                {prod.discount > 0 && (
                                  <>
                                    <View>
                                      <Text
                                        style={[
                                          st.pill,
                                          st.textPill,
                                          {
                                            fontWeight: 'bold',
                                            fontSize: 12,
                                            marginLeft: 10,
                                          },
                                        ]}
                                      >
                                        -Rp{numFormatter(diskon)}
                                      </Text>
                                    </View>
                                  </>
                                )}
                              </View>
                              {prod.discount > 0 && (
                                <Text
                                  style={[
                                    st.cardTextSmall,
                                    {
                                      textDecorationLine: 'line-through',
                                      fontSize: 12,
                                    },
                                  ]}
                                >
                                  Rp{numberWithCommas(prod.price)}
                                </Text>
                              )}
                            </View>
                          </View>
                          <View
                            style={[
                              Layout.row,
                              { justifyContent: 'space-between' },
                            ]}
                          >
                            <View
                              style={[
                                Layout.row,
                                { paddingLeft: 30, alignItems: 'center' },
                              ]}
                            >
                              <FeatherIcon
                                style={{ marginRight: 5 }}
                                size={16}
                                color={Colors.primary}
                                name="file-text"
                              ></FeatherIcon>
                              <Text
                                onPress={() => {
                                  setmodalCatatanVisible(true)
                                  setcatatanSelected({
                                    data: prod,
                                    city: city.location_id,
                                    catatan: prod.notes,
                                  })
                                }}
                              >
                                {prod.notes == ''
                                  ? 'Tulis Catatan'
                                  : prod.notes.length > 12
                                  ? prod.notes.substring(0, 12) + '...'
                                  : prod.notes}
                              </Text>
                            </View>
                            <View>
                              <View
                                style={[Layout.row, { alignItems: 'center' }]}
                              >
                                <View style={[Layout.row, st.counterContainer]}>
                                  <FeatherIcon
                                    style={{ padding: 5 }}
                                    size={18}
                                    onPress={() => {
                                      handleDecreaseCounter(
                                        prod,
                                        city.location_id,
                                      )
                                    }}
                                    name="minus"
                                  />
                                  <Text style={{ marginHorizontal: 15 }}>
                                    {prod.counter}
                                  </Text>
                                  <FeatherIcon
                                    style={{ padding: 5 }}
                                    size={18}
                                    onPress={() => {
                                      handleIncreaseCounter(
                                        prod,
                                        city.location_id,
                                      )
                                    }}
                                    name="plus"
                                  />
                                </View>
                                <View>
                                  <TouchableOpacity
                                    onPress={() => {
                                      dispatch(
                                        deleteCart({
                                          city: city.location_id,
                                          id_prod: prod.id,
                                        }),
                                      )
                                    }}
                                  >
                                    <FeatherIcon
                                      size={20}
                                      color={Colors.neutralGray01}
                                      name="trash-2"
                                    ></FeatherIcon>
                                  </TouchableOpacity>
                                </View>
                              </View>
                            </View>
                          </View>
                        </View>
                      )
                    })}
                  </View>
                </View>
              )
            })}
        </View>
      </ScrollView>
      <View>
        <View
          style={[st.infoMultiProduct, { display: displayinfoMultiProduct }]}
        >
          <View style={{ flex: 5 }}>
            <Text style={{ color: 'white', lineHeight: 20 }}>
              Pengiriman multi produk hanya dapat dilakukan ke kota/kabupaten
              yang sama
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              onPress={() => {
                setdisplayinfoMultiProduct('none')
              }}
              style={{ color: '#48CDF6', alignSelf: 'flex-end' }}
            >
              Oke
            </Text>
          </View>
        </View>
        <VoucherButton />
        <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
          {/* <Text>{sumPriceProduct()}</Text> */}
          <ButtonBase
            onPress={() => {
              let id_page = 1
              let all = []
              let city = null
              cart.data.map((data, index) => {
                data.cart_items.map((dt, idx) => {
                  if (dt.selected == true) {
                    //     const data = {
                    //       id_page: id_page,
                    //       product_info: dt,
                    //       ucapan: {},
                    //       penerima: {},
                    //       pengiriman: {},
                    //     }
                    //     all = [...all, data]
                    //     id_page++
                    all = [...all, dt]
                    city = { name: data.city, location_id: data.location_id }
                  }
                })
              })

              dispatch(setRingkasanPesanan(populateAllItemSelectedCart(all)))
              dispatch(setCitySeller(city))
              dispatch(clearNavRoutes())
              navigation.navigate('MakeOrderPengiriman', {
                jumlahPage: getTotalAllItemSelectedCart(all),
                prevPage: 0,
                currentPage: 1,
              })
            }}
            disable={activeButton}
            title="Buat Pesanan"
          />
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        style={{ opacity: 0.5 }}
        presentationStyle="overFullScreen"
        visible={modalCatatanVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.')
          setmodalCatatanVisible(!modalCatatanVisible)
        }}
      >
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.25)',
            flex: 1,
            flexDirection: 'column',
            alignContent: 'flex-end',
            justifyContent: 'flex-end',
            // alignItems: 'flex-end',
          }}
        >
          <View>
            <View
              style={{
                // position: 'absolute',
                // top: windowHeight - 300,
                width: '100%',
                height: 320,
                backgroundColor: 'white',
                borderTopStartRadius: 20,
                borderTopEndRadius: 20,
                padding: 20,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <FeatherIcon
                  size={20}
                  onPress={() => {
                    setmodalCatatanVisible(!modalCatatanVisible)
                  }}
                  name="x"
                ></FeatherIcon>
                <Text
                  style={{ fontSize: 16, fontWeight: 'bold', marginLeft: -20 }}
                >
                  Tulis Catatan
                </Text>
                <FeatherIcon
                  size={1}
                  onPress={() => {
                    setmodalCatatanVisible(!modalCatatanVisible)
                  }}
                  name="x"
                ></FeatherIcon>
              </View>
              <View
                style={{
                  marginTop: 30,
                }}
              >
                <Text>Tulis catatan untuk penjual</Text>
                <TextInput
                  defaultValue={catatanSelected.catatan}
                  // value={textCatatan}
                  multiline={true}
                  maxLength={120}
                  numberOfLines={6}
                  style={{
                    textAlignVertical: 'top',
                    borderColor: '#0654B9',
                    borderWidth: 2,
                    borderRadius: 10,
                    color: Colors.neutralBlack02,
                    marginTop: 10,
                  }}
                  onChangeText={text => {
                    setTextCatatan(text)
                  }}
                ></TextInput>
                <View
                  style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text>Maksimal 120 Karakter</Text>
                  <Text>{textCatatan.length}/120</Text>
                </View>
                <View
                  style={{
                    marginTop: 30,
                    marginBottom: 30,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text
                    style={{ color: Colors.neutralBlack02, fontWeight: 'bold' }}
                    onPress={() => {
                      console.log('simpan catatan')
                      dispatch(
                        setCatatanCart({
                          city: catatanSelected.city,
                          id_prod: catatanSelected.data.id,
                          catatan: '',
                        }),
                      )
                      setmodalCatatanVisible(!modalCatatanVisible)
                    }}
                  >
                    Hapus
                  </Text>
                  <Text
                    style={{ color: Colors.primary, fontWeight: 'bold' }}
                    onPress={() => {
                      console.log('simpan catatan')
                      dispatch(
                        setCatatanCart({
                          city: catatanSelected.city,
                          id_prod: catatanSelected.data.id,
                          catatan: textCatatan,
                        }),
                      )
                      setmodalCatatanVisible(!modalCatatanVisible)
                    }}
                  >
                    Tambahkan
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const st = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    // padding: 20,
  },
  pill: {
    backgroundColor: 'rgba(203, 58, 49, 0.1)',
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
  },
  textPill: { color: '#CB3A31' },
  image: {
    borderRadius: 5,
    width: 72,
    height: 72,
    backgroundColor: '#eee',
    marginRight: 10,
  },
  counterContainer: {
    borderColor: Colors.neutralGray03,
    borderWidth: 1,
    marginRight: 20,
    // padding: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  voucherButton: {
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#eee',
    borderTopColor: '#eee',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
  },
  cityHeader: {
    alignItems: 'center',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    paddingBottom: 10,
    paddingTop: 20,
    // marginBottom: 20,
  },
  cardProduct: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 30,
    paddingTop: 20,
  },
  infoMultiProduct: {
    backgroundColor: Colors.neutralBlack02,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})
export default CartContainer
