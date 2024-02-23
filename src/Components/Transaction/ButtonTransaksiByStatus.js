import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native'
import { useTheme } from '@/Hooks'
import PropTypes from 'prop-types'
import { Colors } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import ButtonBase from '../Base/ButtonBase'
import { Divider } from '@rneui/themed'
import ModalKonfirmasi from './ModalKonfirmasi'
import RatingStar from '../ProductDetail/RatingStar'
import { useNavigation } from '@react-navigation/native'
import { Countdown } from 'react-native-element-timer'
import CountDown from '@/Helper/rnCountDownTimer'
import moment from 'moment'
import { toLower } from 'lodash'
import { addCart } from '@/Store/cartSlice'
import { Config } from '@/Config'
import axios from 'axios'
import { DialogLoading } from '@rneui/base/dist/Dialog/Dialog.Loading'
import LoadingIndicator from '../Base/LoadingIndicator'
import ModalLoadingCenter from '../Base/ModalLoadingCenter'
import { isExpired } from '@/Helper'

const ButtonTransaksiByStatus = ({
  data,
  datatrans,
  handleRefreshTransaksi,
}) => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const dispatch = useDispatch()
  const [modalVisible, setModalVisible] = useState(false)
  const navigation = useNavigation()

  const countdownRef = useRef(null)
  const location = useSelector(state => state.location)
  const [loadingBeliLagi, setloadingBeliLagi] = useState(false)
  const [loading, setloading] = useState(false)
  const [FinishPoid, setFinishPoid] = useState('')

  // console.log(data)
  const addTocart = async product => {
    setloadingBeliLagi(true)
    // console.log(product)
    dispatch(
      addCart({
        city: location.shipping_address.data,
        data: product.product_detail,
      }),
    )
    setloadingBeliLagi(false)
    navigation.navigate('Cart')
  }

  useEffect(() => {}, [])

  const finishOrder = async po_id => {
    setloading(true)
    console.log('POID: ', po_id)
    console.log('function: ', handleRefreshTransaksi)
    const url = Config.API_URL + `/customer-app/finish-order`

    await axios
      .post(url, {
        fbasekey: 'testvoucher',
        po_id: po_id,
      })
      .then(response => {
        console.log('DATA FINISH ORDER: ', response.data.data)
        setModalVisible(false)
        handleRefreshTransaksi()
        // setxxx(response.data.data)
        setloading(false)
      })
      .catch(({ response }) => {
        console.log('ERROR finish : ', response.data.data)
        setloading(false)
        setloading(false)
        handleRefreshTransaksi('as')
      })
  }
  const confirmDiterima = po_id => {
    // console.log('diterima')
    finishOrder(FinishPoid)
    setModalVisible(false)
  }

  const ButtonTransaksi = () => {
    if (data.status == 'menunggu_pembayaran') {
      const myMomentObject = moment(Date('now'))
      const epoch = datatrans.payment_time_expired - myMomentObject.unix()
      // console.log(epoch)
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('XenditWebView', {
              invoice_url: datatrans.payment_link,
              order_id: datatrans.order_id,
            })
          }}
        >
          <View style={[st.button]}>
            <Text style={[st.buttonText]}>Halaman Pembayaran</Text>
            {/* <Text style={[st.buttonText]}> 00:30:00</Text> */}
            {epoch > 0 && (
              <CountDown
                until={epoch}
                size={7}
                digitTxtStyle={{
                  fontSize: 14,
                  color: Colors.neutralBlack02,
                  fontFamily: Fonts.medium,
                }}
                digitStyle={{
                  backgroundColor: 'transparent',
                  marginHorizontal: 0,
                }}
                separatorStyle={{
                  fontSize: 14,
                  color: Colors.neutralBlack02,
                  letterSpacing: 0,
                }}
                timeLabels={{ m: null, s: null }}
                timeToShow={['H', 'M', 'S']}
                showSeparator={true}
                running={true}
              />
            )}
          </View>
        </TouchableOpacity>
      )
    } else if (data.status == 'preview_produk') {
      const myMomentObject = moment(Date('now'))
      const epoch = datatrans.time_expired - myMomentObject.unix()
      // preview Product
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('PreviewProduk', {
              po_id: datatrans.po_id,
              expired_date: epoch,
            })
          }}
        >
          <View style={[st.button]}>
            <Text style={[st.buttonText]}>Lihat Preview Produk</Text>
            {epoch > 0 && (
              <CountDown
                until={epoch}
                size={7}
                digitTxtStyle={{
                  fontSize: 14,
                  color: Colors.neutralBlack02,
                  fontFamily: Fonts.medium,
                }}
                digitStyle={{
                  backgroundColor: 'transparent',
                  marginHorizontal: 0,
                }}
                separatorStyle={{
                  fontSize: 14,
                  color: Colors.neutralBlack02,
                  letterSpacing: 0,
                }}
                timeLabels={{ m: null, s: null }}
                timeToShow={['H', 'M', 'S']}
                showSeparator={true}
                running={true}
              />
            )}
          </View>
        </TouchableOpacity>
      )
    } else if (data.status == 'revisi_produk') {
      const myMomentObject = moment(Date('now'))
      const epoch = datatrans.time_expired - myMomentObject.unix()
      // revisi Product
      return (
        datatrans.supplier_progress != 'revised' && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('PreviewProduk', {
                po_id: datatrans.po_id,
                expired_date: epoch,
              })
            }}
          >
            <View style={[st.button]}>
              <Text style={[st.buttonText]}>Konfirmasi Revisi</Text>
              {epoch > 0 && (
                <CountDown
                  until={epoch}
                  size={7}
                  digitTxtStyle={{
                    fontSize: 14,
                    color: Colors.neutralBlack02,
                    fontFamily: Fonts.medium,
                  }}
                  digitStyle={{
                    backgroundColor: 'transparent',
                    marginHorizontal: 0,
                  }}
                  separatorStyle={{
                    fontSize: 14,
                    color: Colors.neutralBlack02,
                    letterSpacing: 0,
                  }}
                  timeLabels={{ m: null, s: null }}
                  timeToShow={['H', 'M', 'S']}
                  showSeparator={true}
                  running={true}
                />
              )}
            </View>
          </TouchableOpacity>
        )
      )
    } else if (data.status == 'pesanan_tiba') {
      return (
        <View style={[Layout.row, { justifyContent: 'space-between' }]}>
          <TouchableOpacity
            onPress={() => {
              // console.log(datatrans)
              navigation.navigate('Komplain', { data: datatrans, status: data })
            }}
            style={[st.button2]}
          >
            <View>
              <Text style={[st.buttonText]}>Komplain</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true)
              setFinishPoid(datatrans.po_id)
            }}
            style={[
              st.button2,
              { backgroundColor: Colors.primary, borderColor: 'white' },
            ]}
          >
            <View>
              <Text style={[st.buttonText, { color: 'white' }]}>
                Konfirmasi
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )
    } else if (data.status == 'komplain_diproses') {
      //komplain diproses
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('DetailKomplain', { po_id: datatrans.po_id })
          }}
        >
          <View style={[st.button]}>
            <Text style={[st.buttonText]}>Lihat detail komplain</Text>
          </View>
        </TouchableOpacity>
      )
    } else if (toLower(data.status) == 'komplain_terselesaikan') {
      //komplain diproses
      return (
        <TouchableOpacity onPress={() => {}}>
          <View
            style={[
              st.button,
              { backgroundColor: Colors.primary, borderWidth: 0 },
            ]}
          >
            <Text style={{ color: 'white' }}>Selesaikan Pesanan</Text>
          </View>
        </TouchableOpacity>
      )
    } else if (data.status == 'pesanan_tiba') {
      return (
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true)
          }}
          style={[
            st.button2,
            { backgroundColor: Colors.primary, borderColor: 'white' },
          ]}
        >
          <View>
            <Text style={[st.buttonText, { color: 'white' }]}>
              Selesaikan Pesanan
            </Text>
          </View>
        </TouchableOpacity>
      )
    } else if (data.status == 'dibatalkan') {
      // 15
      return (
        <TouchableOpacity
          onPress={() => {
            addTocart(datatrans)
            // navigation.navigate('DetailKomplain')
          }}
        >
          <View style={[st.button]}>
            <Text style={[st.buttonText]}>Order Ulang</Text>
          </View>
        </TouchableOpacity>
      )
    } else if (data.status == 'selesai') {
      //16
      return (
        <View
          style={[
            Layout.row,
            {
              justifyContent: 'space-between',
              alignItems: 'center',
              // marginTop: 20,
              marginBottom: 20,
              // backgroundColor: 'blue',
            },
          ]}
        >
          {/* <Text>{datatrans.rating_status}</Text> */}
          {datatrans.rated_status === 'not rated' &&
            datatrans.rating_status === 'not available' && (
              <>
                <View>
                  <Text style={{ fontSize: 12 }}>Tidak ada ulasan</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    // console.log(datatrans)
                    addTocart(datatrans)
                  }}
                >
                  <View
                    style={[
                      st.buttonNormal,
                      {
                        backgroundColor: Colors.primary,
                        borderWidth: 0,
                      },
                    ]}
                  >
                    {loadingBeliLagi ? (
                      () => (
                        <Text style={[st.buttonText, { color: 'white' }]}>
                          <ActivityIndicator size={25} color="white" />
                        </Text>
                      )
                    ) : (
                      <Text style={[st.buttonText, { color: 'white' }]}>
                        Beli Lagi
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              </>
            )}

          {datatrans.rated_status === 'not rated' &&
            datatrans.rating_status == 'available' && (
              <>
                <View style={{}}>
                  <Text style={{ fontSize: 12 }}>Nilai produk sebelum</Text>
                  <Text style={{ fontWeight: 'bold', fontSize: 12 }}>
                    {moment
                      .unix(datatrans.rate_time_expired)
                      .format('DD MMM YYYY')}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('TulisUlasan', {
                      isEdit: false,
                      data: { ...datatrans, status: data.status },
                    })
                  }}
                >
                  <View style={[st.buttonNormal]}>
                    <Text style={[st.buttonText]}>Beri Ulasan</Text>
                  </View>
                </TouchableOpacity>
              </>
            )}

          {datatrans.rated_status == 'rated' &&
            datatrans.rating_status == 'available' && (
              <>
                <View>
                  <Text style={{ fontSize: 12 }}>
                    <RatingStar rate={datatrans.rating} size={24} />
                  </Text>
                  {isExpired(datatrans.rate_time_expired) ? (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('ViewReviewProduct', {
                          data: { ...datatrans, status: data.status },
                        })
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 12,
                          color: Colors.primary,
                        }}
                      >
                        Lihat Ulasan
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('TulisUlasan', {
                          isEdit: true,
                          data: { ...datatrans, status: data.status },
                        })
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 12,
                          color: Colors.primary,
                        }}
                      >
                        Ubah rating dan ulasan
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
                <TouchableOpacity
                  onPress={() => {
                    // console.log(datatrans)
                    addTocart(datatrans)
                  }}
                >
                  <View
                    style={[
                      st.buttonNormal,
                      {
                        backgroundColor: Colors.primary,
                        borderWidth: 0,
                      },
                    ]}
                  >
                    {loadingBeliLagi ? (
                      () => (
                        <Text style={[st.buttonText, { color: 'white' }]}>
                          <ActivityIndicator size={25} color="white" />
                        </Text>
                      )
                    ) : (
                      <Text style={[st.buttonText, { color: 'white' }]}>
                        Beli Lagi
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              </>
            )}
        </View>
      )
    } else if (data.status == 'gagal') {
      return (
        <View
          style={[
            Layout.row,
            {
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 20,
              // backgroundColor: 'blue',
            },
          ]}
        >
          <View style={{}}>
            <Text style={{ fontSize: 12 }}> Nilai Product Sebelum</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 12 }}>
              25 Apr 2021
            </Text>
          </View>
          <TouchableOpacity>
            <View style={[st.buttonNormal]}>
              <Text style={[st.buttonText]}>Beri Ulasan</Text>
            </View>
          </TouchableOpacity>
        </View>
      )
    } else {
      return <></>
    }
  }

  return (
    <View style={[st.screen]}>
      <ButtonTransaksi />
      <Modal transparent={true} visible={modalVisible}>
        <ModalKonfirmasi
          closemodal={() => setModalVisible(false)}
          konfimasi={confirmDiterima}
        />
      </Modal>
      <ModalLoadingCenter show={loading} />
    </View>
  )
}

const st = StyleSheet.create({
  screen: {},
  screenModal: {
    backgroundColor: 'rgba(0, 0, 0, 0.40)',
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    // alignItems: 'flex-end',
  },
  buttonNormal: {
    flex: 1,
    borderColor: Colors.neutralGray04,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  button: {
    marginBottom: 20,

    // marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderColor: Colors.neutralGray04,
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 5,
  },
  button2: {
    // marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderColor: Colors.neutralGray04,
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    flex: 1,
  },
  buttonText: {
    fontSize: 14,
    color: Colors.neutralBlack02,
    fontWeight: 'bold',
  },
})
export default ButtonTransaksiByStatus
