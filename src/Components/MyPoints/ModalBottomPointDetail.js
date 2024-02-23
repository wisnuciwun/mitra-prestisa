import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import ModalBottom from '../Base/ModalBottom'
import { Colors, Fonts, SIZES } from '@/Theme/Variables'
import FeatherIcon from 'react-native-vector-icons/Feather'
import _, { isArray, isLength, isNull } from 'lodash'
import { my_points } from './DummyData'
import { remapHistoryPoints, remapModalBottomDetailPoint } from './Helper'
import Spacer from '../Base/Spacer'
import { Divider, fonts } from '@rneui/base'
import FastImage from 'react-native-fast-image'
import { isEmptyNullOrUndefined, numberWithCommas } from '@/Helper'
import TextTouchable from '../RingkasanPesanan/TextTouchable'
import moment from 'moment'

const ModalBottomPointDetail = ({
  isVisible,
  onClose,
  _id,
  dataPoints,
  ...props
}) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  //   const _id_ = useRef(_id)

  useEffect(() => {
    setData(remapHistoryPoints(_.filter(dataPoints, { id: _id }))[0])
  }, [_id])

  // console.log('LOD', _id, data)

  const Matching = ({ data }) => {
    switch (data.point_type_id) {
      case 1:
        return <CashBackPembelian {...data} />
      case 2:
        return <CashBackMerchant {...data} />
      default:
        return <PenukaranPoint {...data} />
    }
  }

  return (
    <ModalBottom isVisible={isVisible} heightModal={null} {...props}>
      {isEmptyNullOrUndefined(data) ? (
        <ActivityIndicator size={'small'} color={Colors.primary} />
      ) : (
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 60,
              marginHorizontal: SIZES.margin_h,
            }}
          >
            <Spacer width={20} />
            <Text
              style={{
                fontSize: 16,
                color: Colors.neutralBlack02,
                fontFamily: Fonts.medium,
                textTransform: 'capitalize',
              }}
            >
              {data.point_name}
            </Text>
            <TouchableOpacity
              onPress={onClose}
              style={{
                height: 30,
                width: 30,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FeatherIcon name={'x'} size={20} color={Colors.neutralGray02} />
            </TouchableOpacity>
          </View>
          <Divider width={1} color={Colors.neutralGray06} />
          <Spacer height={19} />
          <View style={{ marginHorizontal: SIZES.margin_h }}>
            <Matching data={data} />
          </View>
        </View>
      )}
    </ModalBottom>
  )
}

export default ModalBottomPointDetail

const styles = StyleSheet.create({})

/**
 *
 * Small Components: CashBackPembelian, CashBackMerchant, PenukaranPoint
 */

const CashBackPembelian = props => {
  return (
    <View>
      <View style={{}}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text
            style={{
              fontSize: 12,
              fontFamily: Fonts.regular,
              color: Colors.neutralBlack02,
              backgroundColor: Colors.neutralGrayBlue,
              paddingHorizontal: 8,
              paddingVertical: 2,
              borderRadius: 4,
              overflow: 'hidden',
            }}
          >
            ID Order {props.order_id}
          </Text>
          <TextTouchable
            text="Detail Pesanan"
            textStyles={{
              fontFamily: Fonts.regular,
              color: Colors.primary,
              fontSize: 13,
            }}
          />
        </View>
        <Spacer height={12} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text
            style={{
              fontFamily: Fonts.regular,
              color: Colors.neutralGray01,
              fontSize: 13,
            }}
          >
            {moment(props.date).format('DD MMM YYYY')}
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontFamily: Fonts.medium,
              color: props.status_color_text,
              paddingHorizontal: 8,
              paddingVertical: 2,
              backgroundColor: props.status_color_bg,
              borderRadius: 6,
              overflow: 'hidden',
              textTransform: 'capitalize',
            }}
          >
            {props.status}
          </Text>
        </View>
      </View>
      <Spacer height={2} />
      <ScrollView style={[props.detail_info.length > 3 && { height: 280 }]}>
        {props.detail_info.map((e, i) => (
          <View
            key={i}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 10,
              paddingBottom: 20,
              borderBottomColor: Colors.neutralGray06,
              borderBottomWidth: 1,
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <FastImage
                source={{ uri: e.product_img }}
                style={{ height: 53, width: 53, borderRadius: 6 }}
              />
              <Spacer width={10} />
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: Fonts.regular,
                    color: Colors.neutralBlack02,
                  }}
                >
                  {e.product_name}
                </Text>
                <Spacer height={8} />
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: Fonts.regular,
                    color: Colors.neutralGray01,
                  }}
                >
                  Total harga
                </Text>
                <Spacer height={4} />
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: Fonts.regular,
                    color: Colors.neutralBlack01,
                  }}
                >
                  {e.total_price}
                </Text>
              </View>
            </View>
            <Text
              style={{
                fontSize: 14,
                fontFamily: Fonts.regular,
                color: Colors.neutralBlack02,
              }}
            >
              x{e.qty}
            </Text>
          </View>
        ))}
      </ScrollView>
      <Spacer height={12} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: Fonts.medium,
            color: Colors.neutralBlack02,
          }}
        >
          {props.detail_info.length > 1
            ? 'Total Cashback Points'
            : 'Cashback Points'}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontFamily: Fonts.medium,
            color: Colors.neutralBlack02,
          }}
        >
          +{props.point_amount} points
        </Text>
      </View>
      <Spacer height={40} />
    </View>
  )
}

const CashBackMerchant = props => {
  return (
    <View>
      <Text
        style={{
          fontFamily: Fonts.regular,
          color: Colors.neutralGray01,
          fontSize: 13,
        }}
      >
        {moment(props.date).format('DD MMM YYYY')}
      </Text>
      <Spacer height={12} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
          <View
            style={{
              height: 30,
              width: 30,
              borderRadius: 1000,
              backgroundColor: '#F4E9E9',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FeatherIcon name={'user'} size={15} color={'#B17B9F'} />
          </View>
          <Spacer width={12} />
          <View>
            <Text
              style={{
                fontSize: 14,
                fontFamily: Fonts.medium,
                color: Colors.neutralBlack02,
                textTransform: 'capitalize',
              }}
            >
              {props.downline_name}
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontFamily: Fonts.regular,
                color: Colors.neutralGray01,
              }}
            >
              Layer {props.detail_info.layer}
            </Text>
          </View>
        </View>
        <Text>
          Pembelanjaan Rp{numberWithCommas(props.detail_info.pembelanjaan)}
        </Text>
      </View>
      <Spacer height={26} />
      <Divider width={1} color={Colors.neutralGray06} />
      <Spacer height={12} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: Fonts.medium,
            color: Colors.neutralBlack02,
          }}
        >
          Cashback Points Member
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontFamily: Fonts.medium,
            color: Colors.neutralBlack02,
          }}
        >
          +{props.point_amount} points
        </Text>
      </View>
      <Spacer height={40} />
    </View>
  )
}

const PenukaranPoint = props => {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontFamily: Fonts.regular,
            color: Colors.neutralGray01,
            fontSize: 13,
          }}
        >
          {moment(props.date).format('DD MMM YYYY')}
        </Text>
        <Text
          style={{
            paddingHorizontal: 8,
            paddingVertical: 2,
            backgroundColor: props.status_color_bg,
            color: props.status_color_text,
            borderRadius: 6,
            overflow: 'hidden',
            fontSize: 12,
            fontFamily: Fonts.medium,
            textTransform: 'capitalize',
          }}
        >
          {props.status}
        </Text>
      </View>
      <Spacer height={12} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <FastImage
            style={{
              height: 52,
              width: 52,
              backgroundColor: Colors.primary,
              borderRadius: 6,
            }}
          />
          <Spacer width={10} />
          <View>
            <Text>{props.detail_info.voucher_point_expense_name}</Text>
            <Spacer height={10} />
            <Text>{props.detail_info.voucher_point_expense_info}</Text>
          </View>
        </View>
        <TextTouchable
          text="Detail Voucher"
          textStyles={{
            fontSize: 14,
            fontFamily: Fonts.regular,
            color: Colors.primary,
            marginBottom: 1,
          }}
        />
      </View>
      <Spacer height={18} />
      <Divider width={1} color={Colors.neutralGray06} />
      <Spacer height={12} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: Fonts.medium,
            color: Colors.neutralBlack02,
          }}
        >
          Penggunaan Points
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontFamily: Fonts.medium,
            color: Colors.neutralBlack02,
          }}
        >
          -{props.point_amount} points
        </Text>
      </View>
      <Spacer height={40} />
    </View>
  )
}
