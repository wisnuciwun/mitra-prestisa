import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import NavBarV1 from '@/Components/Base/NavBarV1'
import FastImage from 'react-native-fast-image'
import { Assets } from '@/Theme/Assets'
import { Colors, Fonts, SIZES } from '@/Theme/Variables'
import Spacer from '@/Components/Base/Spacer'
import FeatherIcon from 'react-native-vector-icons/Feather'
import TextRowBetween from '@/Components/Base/TextRowBetween'
import LoadingIndicator from '@/Components/Base/LoadingIndicator'
import axios from 'axios'
import { Config } from '@/Config'
import { isEmptyNullOrUndefined, numberWithCommas } from '@/Helper'
import ButtonBottomFloating from '@/Components/ButtonBottomFloating'
import ButtonBottomFloatingColumn from '@/Components/Payment/ButtonBottomFloatingColumn'
import { bussiness, order } from '@/Helper/apiKit'
import moment from 'moment'

const SuccessPaymentContainer = props => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const { order_id } = props.route.params
  const [dataPayment, setDataPayment] = useState({
    payment_ammount: '',
    order_id: '',
    paid_date: '',
    bank_name: '',
  })
  const [loadingXhr, setLoadingXhr] = useState(false)

  const xhrGetPay = async () => {
    setLoadingXhr(true)
    try {
      const { data, request, status } = await order.orderDetail({
        order_id: order_id,
      })
      if (status >= 200 && status < 300) {
        setLoadingXhr(false)
        const { order_detail, total_cost, payment_method } = data.data
        setDataPayment({
          payment_ammount: 'Rp' + numberWithCommas(total_cost.total),
          order_id: order_detail.id,
          paid_date: moment
            .unix(payment_method.paid_at_epoch)
            .format('DD MMMM YYYY'),
          bank_name: payment_method.name,
        })
      } else {
        setLoadingXhr(false)
        setDataPayment(null)
      }
    } catch (err) {
      setLoadingXhr(false)
      console.log('ERROR_GET_PAY', err)
    }
  }

  React.useLayoutEffect(() => {
    NavBarV1({
      navigation: navigation,
      titleName: 'Pembayaran',
      isHeaderLeft: false,
    })
  }, [navigation])

  useEffect(() => {
    xhrGetPay()
  }, [])

  return (
    <>
      <View
        style={[
          { flex: 1, backgroundColor: 'white' },
          loadingXhr && {
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}
      >
        {loadingXhr ? (
          <LoadingIndicator
            loadingColor={Colors.primary}
            loadingSize={'small'}
            title={'Sedang memuat...'}
            titleColor={Colors.primary}
          />
        ) : (
          <>
            <View
              style={{
                height: 284,
                backgroundColor: '#E2F2E2',
                alignItems: 'center',
                borderBottomLeftRadius: 16,
                borderBottomRightRadius: 16,
              }}
            >
              <View
                style={{
                  marginHorizontal: SIZES.margin_h,
                  alignItems: 'center',
                }}
              >
                <Spacer height={20} />
                <FastImage
                  source={Assets.payment_success}
                  style={{ height: 134, width: 85 }}
                />
                <Spacer height={4} />
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: Fonts.medium,
                    color: Colors.neutralBlack02,
                    textAlign: 'center',
                  }}
                >
                  Pembayaran Berhasil
                </Text>
                <Spacer height={8} />
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: Fonts.regular,
                    color: Colors.neutralBlack02,
                    textAlign: 'center',
                    width: 277,
                    lineHeight: 21,
                  }}
                >
                  Yeay! Pembayaran kamu berhasil Kamu bisa cek detail dan status
                  pesanan kamu di halaman transaksi
                </Text>
              </View>
            </View>
            <Spacer height={27} />
            <View style={{ marginHorizontal: SIZES.margin_h }}>
              <TextRowBetween
                leftLabel={'Nominal'}
                rightLabel={dataPayment.payment_ammount}
              />
              <Spacer height={20} />
              <TextRowBetween
                leftLabel={'Pembayaran'}
                rightLabel={dataPayment.bank_name}
              />
              <Spacer height={20} />
              <TextRowBetween
                leftLabel={'ID Order'}
                rightLabel={dataPayment.order_id}
              />
              <Spacer height={20} />
              <TextRowBetween
                leftLabel={'Tanggal Transaksi'}
                rightLabel={dataPayment.paid_date}
              />
              <Spacer height={32} />
              {/* <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: Fonts.medium,
                    color: Colors.neutralBlack02,
                  }}
                >
                  Unduh Bukti Transfer
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('UnderConstruction')}
                >
                  <View
                    style={{
                      height: 30,
                      width: 30,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <FeatherIcon
                      name={'download'}
                      size={20}
                      color={Colors.neutralBlack02}
                    />
                  </View>
                </TouchableOpacity>
              </View> */}
            </View>
          </>
        )}
      </View>
      {!loadingXhr && (
        <ButtonBottomFloatingColumn
          topText="Kembali ke Beranda"
          bottomText="Lihat Daftar Transaksi"
          onPressTop={() => navigation.navigate('Home')}
          onPressBottom={() => navigation.navigate('Transaksi')}
        />
      )}
    </>
  )
}

export default SuccessPaymentContainer

const styles = StyleSheet.create({})
