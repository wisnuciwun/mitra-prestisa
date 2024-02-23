import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native'
import { useTheme } from '@/Hooks'
import { Colors, Fonts as _Fonts, SIZES } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import {
  useNavigation,
  StackActions,
  useNavigationState,
} from '@react-navigation/native'
import HeaderStepper from '@/Components/MakeOrder/HeaderStepper'
import Spacer from '@/Components/Base/Spacer'
import { Divider } from '@rneui/themed'
import OrderUcapan from '@/Components/MakeOrder/OrderUcapan'
import ButtonBase from '@/Components/Base/ButtonBase'
import { setUcapan, setDataPage } from '@/Store/makeOrderSlice'
import { setNavRoutes, setProperty } from '@/Store/ringkasanPesananSlice'
import { isEmptyObject, matchStepScreen } from '@/Components/MakeOrder/Helper'
import FastImage from 'react-native-fast-image'
import InputBase from '@/Components/Base/InputBase'
import NavBarV1 from '@/Components/Base/NavBarV1'
import _ from 'lodash'

const MakeOrderUcapanContainer = props => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const navState = useNavigationState(state => state)
  const makeOrder = useSelector(state => state.makeOrder)
  const cart = useSelector(state => state.cart)
  const ringkasanPesanan = useSelector(state => state.ringkasanPesanan)
  const _orderData = ringkasanPesanan.data
  const _navRoutes = ringkasanPesanan.navRoutes
  const index = props.route.params.prevPage
  //   const [prod, setdataProd] = useState([])
  const [ucapan, setucapan] = useState('')
  const [pengirim, setpengirim] = useState('')
  const [selectedPill, setselectedPill] = useState('')
  const [modalVisible, setmodalVisible] = useState(false)
  const [disableButton, setdisableButton] = useState(true)

  //   const propsx = { route: { params: { jumlahPage: 4, prevPage: 0 } } }
  //   const routestate = useNavigationState(state => state)
  //   const indexroute = routestate.index
  //   const route = routestate.routes[indexroute]
  //   console.log(state)
  // const [jumlahPage, setj] = useState(route.params.jumlahPage)
  // const [prevPage, setp] = useState(route.params.prevPage)
  // const [currentPage, setc] = useState(route.params.prevPage + 1)
  // const [prod, setpr] = useState(ringkasanPesanan.data[prevPage].product_info)
  const [jumlahPage, setj] = useState(props.route.params.jumlahPage)
  const [prevPage, setp] = useState(props.route.params.prevPage)
  const [currentPage, setc] = useState(props.route.params.prevPage + 1)
  const [prod, setpr] = useState(ringkasanPesanan.data[prevPage].product_info)
  // console.log(prevPage)
  // console.log(prod)

  const templateUcapan = [
    { id: 1, title: 'Tanpa Ucapan' },
    { id: 2, title: 'Happy Wedding' },
    { id: 3, title: 'Selamat dan Sukses' },
    { id: 4, title: 'Happy Anniversary' },
    { id: 5, title: 'Turut Berduka Cita' },
    { id: 6, title: 'Selamat Ulang Tahun' },
  ]

  const sampledata = [
    {
      id_page: 1,
      data_product: { id: 'x', notes: '', selected: true },
      ucapan: { pengirim: '', Text: '' },
      penerima: { nama: '', alamat: '', telp: '' },
      pengiriman: { tanggal: '', jam: '' },
    },
    {
      id_page: 2,
      data_product: { id: 'x', notes: '', selected: true },
      ucapan: { pengirim: '', Text: '' },
      penerima: { nama: '', alamat: '', telp: '' },
      pengiriman: { tanggal: '', jam: '' },
    },
  ]

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

  const handleOnPressStepper = screenName => {
    const _param = _.filter(_navRoutes, {
      name: screenName,
    })[0]
    _navRoutes.length != 0 && navigation.navigate(_param.name, _param.params)
  }

  //   const prod = cart.data[currentPage]
  //   console.log(cart.data)
  useEffect(() => {
    if (pengirim.length > 0 && ucapan.length > 0) {
      setdisableButton(false)
    } else {
      setdisableButton(true)
    }
  }, [pengirim, ucapan])

  useEffect(() => {
    if (currentPage > 1) {
      setmodalVisible(true)
    }
    setj(props.route.params.jumlahPage)
    setp(props.route.params.prevPage)
    setc(props.route.params.prevPage + 1)
    // console.log(prod)
  }, [])

  React.useLayoutEffect(() => {
    NavBarV1({
      navigation: navigation,
      titleName: 'Buat Pesanan',
    })
  }, [navigation])

  //   console.log('Product yg 0: ', prod)
  return (
    <>
      <ScrollView style={[st.screen, Layout.fill]}>
        <Spacer height={20} />
        <HeaderStepper
          step={3}
          isCheckedOne={!isEmptyObject(_orderData[index]['pengiriman'])}
          isCheckedTwo={!isEmptyObject(_orderData[index]['penerima'])}
          isCheckedThree={!isEmptyObject(_orderData[index]['ucapan'])}
          activeThree={matchStepScreen(navState.routes[navState.index].name)}
          onPressOne={() => handleOnPressStepper('MakeOrderPengiriman')}
          onPressTwo={() => handleOnPressStepper('MakeOrderPenerima')}
          onPressThree={() => handleOnPressStepper('MakeOrderUcapan')}
        />
        <Spacer height={20} />
        <Divider width={1} color={Colors.neutralGray05} />

        <View style={[st.screen, {}]}>
          <View style={{ padding: SIZES.margin_h }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: _Fonts.medium,
                marginBottom: 20,
                color: Colors.neutralBlack01,
              }}
            >
              Kata Ucapan
            </Text>
            <View>
              {jumlahPage > 0 ? (
                <View>
                  <Text
                    style={{
                      color: Colors.primary,
                      marginBottom: 10,
                      fontSize: 14,
                      fontFamily: _Fonts.medium,
                    }}
                  >
                    Produk {currentPage} dari {jumlahPage}
                  </Text>
                  <Divider width={1} color={Colors.neutralGray06} />
                  <Spacer height={20} />
                </View>
              ) : (
                <View></View>
              )}
            </View>
            {prod.id != undefined && (
              <View style={Layout.row}>
                <View style={st.image}>
                  {prod.image.length > 0 && (
                    <FastImage
                      // tintColor="gray"
                      style={st.image}
                      source={{ uri: prod.image[0].path }}
                    />
                  )}
                </View>
                <View>
                  <Text
                    style={{
                      marginBottom: 10,
                      fontFamily: _Fonts.medium,
                      fontSize: 15,
                      color: Colors.neutralBlack02,
                      textTransform: 'capitalize',
                    }}
                  >
                    {prod.name}
                  </Text>
                  <View style={[Layout.row, Layout.alignItemsCenter]}>
                    <Text
                      style={{
                        fontFamily: _Fonts.bold,
                        fontSize: 16,
                        color: Colors.neutralBlack02,
                      }}
                    >
                      Rp
                      {numberWithCommas(
                        prod.discount > 0 ? prod.sale_price : prod.price,
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
                                fontFamily: _Fonts.bold,
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
            )}
          </View>
          <Divider
            style={[
              {
                // paddingBottom: 20,
                marginBottom: 30,
                borderBottomColor: '#eee',
                borderBottomWidth: 4,
              },
            ]}
          ></Divider>

          <View style={{ padding: 20 }}>
            <View>
              <Text>
                Nama pengirim yang tertera di produk/kartu
                <Text style={{ color: 'red' }}>*</Text>
              </Text>
              <InputBase
                value={pengirim}
                onChangeText={text => {
                  setpengirim(text)
                }}
              />
              <Text style={{ alignSelf: 'flex-end', marginTop: 10 }}>
                {0}/48
              </Text>
            </View>

            <View style={{ marginTop: 20 }}>
              <Text>
                Kalimat ucapan
                <Text style={{ color: 'red' }}>*</Text>
              </Text>
              <TextInput
                //   defaultValue={catatanSelected.catatan}
                value={ucapan}
                multiline={true}
                maxLength={120}
                numberOfLines={6}
                style={st.textArea}
                onChangeText={text => {
                  setucapan(text)
                }}
              ></TextInput>
              <Text style={{ alignSelf: 'flex-end', marginTop: 10 }}>
                {0}/100
              </Text>
            </View>
            <View style={[Layout.row, { flexWrap: 'wrap' }]}>
              {templateUcapan.map((item, index) => {
                const selectedText = { color: Colors.primary }
                const selectedPillStyle = { borderColor: Colors.primary }
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      //   console.log(item.id)
                      setselectedPill(item.id)
                      setucapan(item.title)
                    }}
                    style={[
                      st.pill,
                      selectedPill == item.id && selectedPillStyle,
                    ]}
                  >
                    <Text
                      style={[
                        { color: Colors.neutralBlack01 },
                        selectedPill == item.id && selectedText,
                      ]}
                    >
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                )
              })}
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          padding: 20,
          backgroundColor: 'white',
          borderTopColor: Colors.neutralGray08,
          borderTopWidth: 1,
        }}
      >
        {currentPage < jumlahPage ? (
          <ButtonBase
            disable={disableButton}
            onPress={() => {
              if (isEmptyObject(_orderData[currentPage - 1]['ucapan'])) {
                dispatch(setNavRoutes(navState.routes))
              }
              dispatch(
                setProperty({
                  id_page: currentPage,
                  property: { ucapan: { pengirim: pengirim, text: ucapan } },
                }),
              )
              // console.log({
              //   jumlahPage,
              //   prevPage: currentPage,
              // })

              const pushAction = StackActions.push('MakeOrderUcapan', {
                jumlahPage,
                prevPage: currentPage,
                // currentPage: _currentPage,
              })
              navigation.dispatch(pushAction)
            }}
            title={'Product Berikutnya'}
          ></ButtonBase>
        ) : (
          <ButtonBase
            disable={disableButton}
            onPress={() => {
              //     console.log({
              //   id_page: currentPage,
              //   property: { ucapan: { pengirim: pengirim, text: ucapan } },
              // })
              if (isEmptyObject(_orderData[currentPage - 1]['ucapan'])) {
                dispatch(setNavRoutes(navState.routes))
              }
              dispatch(
                setProperty({
                  id_page: currentPage,
                  property: { ucapan: { pengirim: pengirim, text: ucapan } },
                }),
              )
              navigation.navigate('RingkasanPesanan')
            }}
            title={'Konfirmasi Pesanan'}
          ></ButtonBase>
        )}
      </View>
      {currentPage > 1 && (
        <Modal
          animationType="slide"
          transparent={true}
          style={{ opacity: 0.5 }}
          presentationStyle="overFullScreen"
          visible={modalVisible}
          onRequestClose={() => {
            //   Alert.alert('Modal has been closed.')
            setmodalVisible(!modalVisible)
          }}
        >
          <View
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.40)',
              flex: 1,
              flexDirection: 'column',
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              // alignItems: 'flex-end',
            }}
          >
            <View
              style={{
                // position: 'absolute',
                // top: windowHeight - 300,
                width: '80%',
                //   height: 320,
                backgroundColor: 'white',
                borderRadius: 10,
                //   borderTopEndRadius: 20,
                //   padding: 20,
              }}
            >
              <View style={{ padding: 20 }}>
                <Text style={{ textAlign: 'center', lineHeight: 20 }}>
                  Isi Kata Ucapan dan Nama Pengirim tertera sama seperti produk
                  sebelumnya?
                </Text>
              </View>
              <Divider></Divider>
              <View
                style={[
                  Layout.row,
                  {
                    justifyContent: 'space-between',
                    paddingVertical: 20,
                    paddingHorizontal: 30,
                  },
                ]}
              >
                <TouchableOpacity
                  onPress={() => {
                    setmodalVisible(false)
                  }}
                >
                  <Text style={{ fontWeight: 'bold' }}>Tidak</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setpengirim(ringkasanPesanan.data[0].ucapan.pengirim)
                    setucapan(ringkasanPesanan.data[0].ucapan.text)
                    setmodalVisible(false)
                  }}
                >
                  <Text style={{ fontWeight: 'bold' }}>Ya, Samakan</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </>
  )
}

const st = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
  },
  image: {
    borderRadius: 5,
    width: 72,
    height: 72,
    backgroundColor: '#eee',
    marginRight: 20,
  },
  pill: {
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: Colors.neutralGray03,
  },
  textArea: {
    textAlignVertical: 'top',
    borderColor: Colors.neutralGray02,
    borderWidth: 1,
    borderRadius: 10,
    color: Colors.neutralBlack02,
    marginTop: 10,
    padding: 15,
  },
})
export default MakeOrderUcapanContainer
