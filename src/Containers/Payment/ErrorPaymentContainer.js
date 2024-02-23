import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import NavBarV1 from '@/Components/Base/NavBarV1'
import FastImage from 'react-native-fast-image'
import { Assets } from '@/Theme/Assets'
import { Colors, Fonts, SIZES } from '@/Theme/Variables'
import Spacer from '@/Components/Base/Spacer'
import TextRowBetween from '@/Components/Base/TextRowBetween'
import IconHelpCenter from '@/Components/Base/IconHelpCenter'
import { isEmptyNullOrUndefined, numberWithCommas } from '@/Helper'
import LoadingIndicator from '@/Components/Base/LoadingIndicator'
import axios from 'axios'
import { Config } from '@/Config'
import ButtonBottomFloating from '@/Components/ButtonBottomFloating'
import { order } from '@/Helper/apiKit'
import ButtonBottomFloatingColumn from '@/Components/Payment/ButtonBottomFloatingColumn'
import moment from 'moment'

const ErrorPaymentContainer = props => {
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
      isHeaderRight: true,
      headerRightComp: () => (
        <View style={{ marginRight: SIZES.margin_h }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('PusatBantuanHome')}
            style={{
              height: 30,
              width: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <IconHelpCenter />
          </TouchableOpacity>
        </View>
      ),
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
                backgroundColor: 'rgba(203, 58, 49, 0.1)',
                borderBottomLeftRadius: 16,
                borderBottomRightRadius: 16,
                justifyContent: 'center',
              }}
            >
              <View
                style={{
                  marginHorizontal: SIZES.margin_h,
                  alignItems: 'center',
                }}
              >
                <FastImage
                  source={Assets.payment_error}
                  style={{ height: 78, width: 128 }}
                />
                <Spacer height={20} />
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: Fonts.medium,
                    color: Colors.neutralBlack02,
                    textAlign: 'center',
                  }}
                >
                  Pembayaran Gagal
                </Text>
                <Spacer height={8} />
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: Fonts.regular,
                    color: Colors.neutralBlack02,
                    textAlign: 'center',
                    width: 300,
                    lineHeight: 21,
                  }}
                >
                  Maaf pembayaran kamu gagal masuk. Silakan coba melakukan
                  pembayaran ulang
                </Text>
              </View>
            </View>
            <Spacer height={27} />
            <View style={{ marginHorizontal: SIZES.margin_h }}>
              <TextRowBetween
                leftLabel={'Nominal'}
                rightLabel={dataPayment.payment_ammount}
              />
              {!isEmptyNullOrUndefined(dataPayment.bank_name) && (
                <>
                  <Spacer height={20} />
                  <TextRowBetween
                    leftLabel={'Pembayaran'}
                    rightLabel={dataPayment.bank_name}
                  />
                </>
              )}
              <Spacer height={20} />
              <TextRowBetween
                leftLabel={'ID Order'}
                rightLabel={dataPayment.order_id}
              />
              {!isEmptyNullOrUndefined(dataPayment.paid_date) && (
                <>
                  <Spacer height={20} />
                  <TextRowBetween
                    leftLabel={'Tanggal Transaksi'}
                    rightLabel={dataPayment.paid_date}
                  />
                </>
              )}
              <Spacer height={32} />
            </View>
          </>
        )}
      </View>
      {!loadingXhr && (
        <ButtonBottomFloatingColumn
          topText="Pesan Ulang"
          bottomText="Kembali ke Beranda"
          onPressTop={() => navigation.navigate('Cart')}
          onPressBottom={() => navigation.navigate('Main')}
        />
      )}
    </>
  )
}

export default ErrorPaymentContainer

const styles = StyleSheet.create({})
