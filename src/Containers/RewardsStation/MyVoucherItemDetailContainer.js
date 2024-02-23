import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import FastImage from 'react-native-fast-image'
import { isEmptyNullOrUndefined, numberWithCommas } from '@/Helper'
import { Assets } from '@/Theme/Assets'
import { SIZES, Colors, Fonts } from '@/Theme/Variables'
import TextRowBetween from '@/Components/Base/TextRowBetween'
import NavBarV1 from '@/Components/Base/NavBarV1'
import IconCoins from '@/Components/Icons/IconCoins'
import { Divider } from '@rneui/base'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Spacer from '@/Components/Base/Spacer'
import moment from 'moment'
import TextTouchable from '@/Components/RingkasanPesanan/TextTouchable'

const MyVoucherItemDetailContainer = props => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const { params } = props.route

  React.useLayoutEffect(() => {
    NavBarV1({
      titleName: '',
      headerTransparent: true,
      navigation: navigation,
      styleArrrowLeft: {
        borderRadius: 1000,
        backgroundColor: Colors.white + '90',
      },
    })
  }, [navigation])

  return (
    <ScrollView style={[{ flex: 1, backgroundColor: Colors.white }]}>
      <FastImage
        source={{
          uri: isEmptyNullOrUndefined(params.img)
            ? Assets.noImageUrl
            : params.img,
        }}
        style={{ height: 200, width: SIZES.width_window }}
      />
      <View style={{ margin: SIZES.margin_h }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontFamily: Fonts.medium,
              color: Colors.neutralBlack02,
            }}
          >
            {params.voucher_name}
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontFamily: Fonts.medium,
              color: isEmptyNullOrUndefined(params.status_color_text)
                ? '#000000'
                : params.status_color_text,
              backgroundColor: isEmptyNullOrUndefined(params.status_bg_color)
                ? '#dddddd'
                : params.status_bg_color,
              paddingHorizontal: 12,
              paddingVertical: 4,
              borderRadius: 1000,
              overflow: 'hidden',
              textTransform: 'capitalize',
            }}
          >
            {params.status_name}
          </Text>
        </View>
        <Spacer height={20} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: Fonts.bold,
              color: Colors.primary,
            }}
          >
            Rp{numberWithCommas(params.ammounts)}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View style={{ top: 1 }}>
              <IconCoins />
            </View>
            <Text
              style={{
                fontSize: 13,
                fontFamily: Fonts.medium,
                color: Colors.neutralBlack02,
              }}
            >
              {numberWithCommas(params.active)} points
            </Text>
          </View>
        </View>
      </View>
      <Divider width={1} color={Colors.neutralGray06} />
      {params.parent_id == 4 && (
        <>
          <View style={{ margin: SIZES.margin_h }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: Fonts.medium,
                color: Colors.neutralBlack02,
              }}
            >
              Kode Token
            </Text>
            <Spacer height={4} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: Fonts.medium,
                  color: Colors.otherBlue,
                }}
              >
                {params.token_electric_code}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: 72,
                }}
              >
                <TouchableOpacity
                  style={{
                    height: 30,
                    width: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <FeatherIcon
                    name={'copy'}
                    size={16}
                    color={Colors.neutralGray01}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    height: 30,
                    width: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <FeatherIcon
                    name={'share-2'}
                    size={16}
                    color={Colors.neutralGray01}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Divider width={1} color={Colors.neutralGray06} />
        </>
      )}
      <View style={{ margin: SIZES.margin_h }}>
        <TextRowBetween
          leftLabel="Jenis"
          rightLabel={
            params.voucher_name + ' ' + numberWithCommas(params.ammounts)
          }
          rightLabelStyle={{
            width: SIZES.width_window / 2 - 20,
            textAlign: 'right',
            lineHeight: 20,
          }}
        />
        <Spacer height={8} />
        {params.parent_id == 4 ? (
          <TextRowBetween
            leftLabel={'No. Meter Pelanggan'}
            rightLabel={params.account_number}
          />
        ) : (
          <TextRowBetween
            leftLabel={'No. Handphone'}
            rightLabel={params.account_number}
          />
        )}
        <Spacer height={8} />
        {params.parent_id == 4 && (
          <>
            <TextRowBetween
              leftLabel={'Nama'}
              rightLabel={params.account_name}
            />
            <Spacer height={8} />
          </>
        )}
        <TextRowBetween leftLabel={'ID Order'} rightLabel={params.order_id} />
      </View>
      <Divider width={1} color={Colors.neutralGray06} />
      <View style={{ margin: SIZES.margin_h }}>
        <TextRowBetween
          leftLabel={'Tanggal Pembelian'}
          rightLabel={moment(params.order_date).format('D MMMM YYYY')}
          leftLabelStyle={{
            fontSize: 16,
            color: Colors.neutralBlack02,
            fontFamily: Fonts.medium,
          }}
          rightLabelStyle={{ fontSize: 13, color: Colors.neutralGray01 }}
        />
      </View>
      <Divider width={1} color={Colors.neutralGray06} />
      <Spacer height={32} />
      <View style={{ alignItems: 'center' }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 14,
            fontFamily: Fonts.medium,
            color: Colors.neutralGray01,
          }}
        >
          Transaksi Bermasalah?
        </Text>
        <Spacer height={8} />
        <TextTouchable
          text="Hubungi Layanan Pelanggan"
          textStyles={{ textAlign: 'center', fontSize: 14 }}
          onPress={() => navigation.navigate('CustomerService')}
        />
      </View>

      <Spacer height={100} />
    </ScrollView>
  )
}

export default MyVoucherItemDetailContainer

const styles = StyleSheet.create({})
