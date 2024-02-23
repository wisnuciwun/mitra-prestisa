import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import NavBarV1 from '@/Components/Base/NavBarV1'
import { Input, Button } from '@rneui/themed'
import { Colors, Fonts, SIZES } from '@/Theme/Variables'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { Divider } from '@rneui/base'
import Spacer from '@/Components/Base/Spacer'
import CardVoucher from '@/Components/Voucher/CardVoucher'
import axios from 'axios'
import { Config } from '@/Config'
import { useDispatch, useSelector } from 'react-redux'
import { reMapData } from '@/Components/Voucher/Helper'
import _ from 'lodash'
import { numberWithCommas } from '@/Helper'
import moment from 'moment'
import { account } from '@/Helper/apiKit'
import LoadingIndicator from '@/Components/Base/LoadingIndicator'

const AccountVoucherPromoContainer = props => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { total } = props.route.params || {}
  const state = useSelector(state => state)

  const [vouchers, setVouchers] = useState([])
  const [borderInput, setBorderInput] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingInputCodeVoucher, setIsLoadingInputCodeVoucher] =
    useState(false)

  const [voucherCode, setVoucherCode] = useState('')
  const [placeHolder, setPlaceHolder] = useState('Masukkan kode voucher')

  React.useLayoutEffect(() => {
    NavBarV1({
      navigation: navigation,
      titleName: 'Voucher Promo',
    })
  }, [navigation])

  const handleInputVoucher = () => {
    setIsLoadingInputCodeVoucher(true)
  }

  const handleClearInput = () => {
    setVoucherCode('')
    setPlaceHolder('Masukkan kode voucher')
  }

  const handleOnPressSeeDetail = item => {
    navigation.navigate('VoucherDetail', item)
  }

  const xhrGetVouchers = () => {
    setIsLoading(true)
    account
      .vouchers({ kode: '' })
      .then(res => {
        const _res = res.data.data.voucher
        setIsLoading(false)
        return setVouchers(reMapData(_res))
      })
      .catch(({ response }) => {
        console.log('ERR', response)
        setIsLoading(false)
      })
  }

  const xhrInputCodeVouchers = () => {
    setIsLoading(true)
    setIsLoadingInputCodeVoucher(true)
    // axios
    //   .post(Config.API_URL + '/customer-app/vouchers')
    account
      .vouchers()
      .then(res => {
        const _res = res.data.data.voucher
        setIsLoadingInputCodeVoucher(false)
        return setVouchers(_.filter(_res[0].vouchers, { code: voucherCode }))
      })
      .catch(({ response }) => {
        console.log('ERR', response)
        setIsLoadingInputCodeVoucher(false)
      })
  }

  useEffect(() => {
    xhrGetVouchers()
  }, [])

  useEffect(() => {
    isLoadingInputCodeVoucher && xhrInputCodeVouchers()
  }, [isLoadingInputCodeVoucher])

  /**
   *
   *
   * Inside Body Component
   */
  const Vouchers = ({ parent, child, data }) => {
    return (
      <View style={{ paddingTop: 18, paddingBottom: 10 }}>
        {parent.vouchers.length > 0 && (
          <Text
            style={{
              marginHorizontal: SIZES.margin_h,
              fontFamily: Fonts.medium,
              fontSize: 16,
              lineHeight: 24,
              color: Colors.neutralBlack02,
            }}
          >
            {parent.promo_type}
          </Text>
        )}
        <Spacer height={12} />
        {parent.vouchers.map((item, index) => (
          <View key={Math.random()}>
            <CardVoucher
              onPressSeeDetail={() => handleOnPressSeeDetail(item)}
              borderColor={'#F7F9FA'}
              active={true}
              title={item.name}
              subtitle={numberWithCommas(item.min_active)}
              numberVoucher={item.stock}
              footerText={moment(item.expired_date).format('DD MMM YYYY')}
              isShipping={item.promo_type === 'ongkir'}
              isDiscount={
                item.promo_type === 'potongan' || item.promo_type === 'cashback'
              }
            />
            {index != 10 - 1 && <Spacer height={16} key={Math.random()} />}
          </View>
        ))}
      </View>
    )
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}
    >
      <View
        style={{
          paddingHorizontal: SIZES.margin_h,
          paddingBottom: 12,
        }}
      >
        <Input
          placeholder={placeHolder}
          placeholderTextColor={Colors.neutralGray01}
          inputContainerStyle={{
            paddingLeft: 20,
            borderColor: borderInput ? Colors.otherBlue : Colors.neutralGray03,
          }}
          keyboardType={'default'}
          onChangeText={text => {
            setVoucherCode(text.replace(/ /g, ''))
            text.length == 0 && setPlaceHolder('Masukkan kode voucher')
          }}
          defaultValue={voucherCode}
          onSubmitEditing={handleInputVoucher}
          returnKeyLabel={`Cari`}
          returnKeyType={`search`}
          inputStyle={{
            paddingLeft: 0,
            fontSize: 16,
            color: Colors.neutralBlack02,
          }}
          rightIcon={
            voucherCode.length != 0 && (
              <TouchableOpacity
                style={{
                  flex: 1,
                  width: 34,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={handleClearInput}
              >
                <FeatherIcon
                  size={20}
                  color={Colors.neutralGray01}
                  name={`x`}
                />
              </TouchableOpacity>
            )
          }
        />
      </View>
      <Divider style={{ height: 0 }} color={`#E9E9E9`} width={1} />
      {isLoading ? (
        <View
          style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
        >
          <LoadingIndicator />
        </View>
      ) : (
        <ScrollView
          onScroll={() => {
            Keyboard.dismiss()
          }}
        >
          {!isLoading &&
            vouchers.map((item, index) => (
              <Vouchers
                parent={item}
                key={Math.random().toString()}
                data={vouchers}
              />
            ))}
          {!isLoadingInputCodeVoucher &&
            isLoading &&
            vouchers.map((item, index) => (
              <View key={Math.random()}>
                <CardVoucher
                  borderColor={'#F7F9FA'}
                  onPressSeeDetail={() => handleOnPressSeeDetail(item)}
                  active={true}
                  title={item.name}
                  subtitle={numberWithCommas(item.min_active)}
                  numberVoucher={item.stock}
                  footerText={moment(item.expired_date).format('DD MMM YYYY')}
                  isShipping={item.promo_type === 'pengiriman'}
                  isDiscount={
                    item.promo_type === 'potongan' ||
                    item.promo_type === 'cashback'
                  }
                />
                {index != 10 - 1 && <Spacer height={16} key={Math.random()} />}
              </View>
            ))}
        </ScrollView>
      )}
    </View>
  )
}

export default AccountVoucherPromoContainer

const styles = StyleSheet.create({})
