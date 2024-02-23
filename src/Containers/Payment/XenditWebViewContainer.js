import { Linking, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import {
  CommonActions,
  useNavigation,
  useNavigationState,
} from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import NavBarV1 from '@/Components/Base/NavBarV1'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { Colors, Fonts } from '@/Theme/Variables'
import { WebView } from 'react-native-webview'
import axios from 'axios'
import { Config } from '@/Config'
import { isEmptyNullOrUndefined } from '@/Helper'
import { ActivityIndicator } from 'react-native'
import Spacer from '@/Components/Base/Spacer'
import { clearRingkasanPesanan } from '@/Store/ringkasanPesananSlice'
import _ from 'lodash'

const XenditWebViewContainer = props => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const navState = useNavigationState(state => state)
  const { invoice_url, order_id } = props.route.params || {}
  const [urlPayment, setUrlPayment] = useState(null)
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
        setUrlPayment(payment.invoice_url)
        setDataPayment(data)
      } else {
        setUrlPayment(null)
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
      isNavDefault: false,
      headerLeftIconName: 'x',
      onNav: () => navigation.navigate('Home'),
    })
    navigation.addListener('beforeRemove', e => {
      if (e.data.action.type == 'GO_BACK') {
        e.preventDefault()
      }
    })
    // if (_param === 'RingkasanPesanan') {
    //   console.log('RESET_NAV')
    //   const _rep = () => {
    //     return _.remove(navState.routes, (o, i) => {
    //       return (
    //         o.name != 'MakeOrderPenerima' &&
    //         o.name != 'MakeOrderPengiriman' &&
    //         o.name != 'MakeOrderUcapan'
    //       )
    //     })
    //   }
    //   navigation.dispatch({
    //     index: _rep().length,
    //     key: navState.key,
    //     routeNames: navState.routeNames,
    //     routes: _rep(),
    //     stale: navState.stale,
    //     type: navState.type,
    //   })
    // }
  }, [navigation])

  useEffect(() => {
    setUrlPayment(invoice_url)
  }, [])

  useEffect(() => {
    const _param = navState.routes[navState.index - 1].name
    if (_param === 'RingkasanPesanan') {
      // dispatch(clearRingkasanPesanan())
      // const _rep = () => {
      //   return _.remove(navState.routes, (o, i) => {
      //     return (
      //       o.name != 'MakeOrderPenerima' &&
      //       o.name != 'MakeOrderPengiriman' &&
      //       o.name != 'MakeOrderUcapan'
      //     )
      //   })
      // }
      // navigation.dispatch(state => {
      // const _routes = state.routes.filter(
      //   r =>
      //     r.name !== 'MakeOrderPenerima' &&
      //     r.name !== 'MakeOrderPengiriman' &&
      //     r.name !== 'MakeOrderUcapan',
      // )
      // const _routes = _.remove(state.routes, (o, i) => {
      //   return (
      //     o.name !== 'MakeOrderPenerima' &&
      //     o.name !== 'MakeOrderPengiriman' &&
      //     o.name !== 'MakeOrderUcapan'
      //   )
      // })

      // console.log('DDDDDD', _routes)

      // CommonActions.reset({
      //   ...state,
      //   _routes,
      //   index: _routes.length - 1,
      // })
      // })

      console.log('CLEAR_RDX_RINGKASAN_PESANAN')
    }
  }, [])

  return (
    <View
      style={[
        { flex: 1, backgroundColor: 'white' },
        isEmptyNullOrUndefined(urlPayment) && {
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}
    >
      {isEmptyNullOrUndefined(urlPayment) ? (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size={'small'} color={Colors.primary} />
          <Spacer height={10} />
          <Text
            style={{
              fontSize: 14,
              fontFamily: Fonts.medium,
              color: Colors.primary,
              textAlign: 'center',
            }}
          >
            Sedang Memuat...
          </Text>
        </View>
      ) : (
        <WebView
          onShouldStartLoadWithRequest={request => {
            if (request.url.startsWith('https')) {
              let params = request.url
                .split(';')[0]
                .split('#')[0]
                .split('/')
                .reverse()[0]
              if (params === 'payment-success') {
                navigation.navigate('SuccessPayment', { order_id: order_id })
              } else if (params === 'payment-error') {
                navigation.navigate('ErrorPayment', { order_id: order_id })
              }
              return false
            }
            return true
          }}
          originWhitelist={['http://', 'https://', 'intent://']}
          source={{
            uri: urlPayment,
          }}
        />
      )}
    </View>
  )
}

export default XenditWebViewContainer

const styles = StyleSheet.create({})
