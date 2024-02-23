import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
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
import { isEmptyNullOrUndefined } from '@/Helper'
import axios from 'axios'
import { Config } from '@/Config'
import IconHelpCenter from '@/Components/Base/IconHelpCenter'
import ButtonBottomFloatingColumn from '@/Components/Payment/ButtonBottomFloatingColumn'

const WaitingPaymentContainer = props => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const state = useSelector(state => state)

  const [dataPayment, setDataPayment] = useState(null)

  const xhrGetPay = async () => {
    try {
      const payload = {
        fbasekey: 'still dummy format response',
      }
      const { data, request, status } = await axios.post(
        Config.CUSTOMER_APP + '/request-payment',
        payload,
      )
      if (status >= 200 && status < 300) {
        const { order_id, payment } = data.data
        setDataPayment(data)
      } else {
        setDataPayment(null)
      }
    } catch (err) {
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
            onPress={() => navigation.navigate('UnderConstruction')}
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
          isEmptyNullOrUndefined(dataPayment) && {
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}
      >
        {isEmptyNullOrUndefined(dataPayment) ? (
          <LoadingIndicator
            loadingColor={Colors.primary}
            loadingSize={'small'}
            title={'Sedang memuat...'}
            titleColor={Colors.primary}
          />
        ) : (
          <View
            style={{
              height: 284,
              backgroundColor: 'rgba(249, 226, 108, 0.25)',
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
                source={Assets.payment_waiting}
                style={{ height: 79, width: 160 }}
                resizeMode={'contain'}
              />
              <Spacer height={12} />
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: Fonts.medium,
                  color: Colors.neutralBlack02,
                  textAlign: 'center',
                }}
              >
                Menunggu Pembayaran
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
                Pemesanan kamu tinggal menunggu pembayaran Ayo selesaikan dalam
                waktu :
              </Text>
              <Spacer height={10} />
              <Text
                style={{
                  lineHeight: 25.2,
                  paddingHorizontal: 12,
                  paddingVertical: 4,
                  backgroundColor: Colors.otherBlue,
                  color: Colors.neutralGray07,
                  borderRadius: 5,
                  overflow: 'hidden',
                }}
              >
                00:00:00
              </Text>
            </View>
          </View>
        )}
      </View>
      <ButtonBottomFloatingColumn
        topText="Kembali ke Beranda"
        bottomText="Lihat Daftar Transaksi"
      />
    </>
  )
}

export default WaitingPaymentContainer

const styles = StyleSheet.create({})
