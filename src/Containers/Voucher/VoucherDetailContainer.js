import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { useWindowDimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import NavBarV1 from '@/Components/Base/NavBarV1'
import { Colors, Fonts, SIZES } from '@/Theme/Variables'
import { manipulateDataVoucher } from '@/Components/Voucher/Helper'
import { Divider } from '@rneui/base'
import { isEmptyNullOrUndefined } from '@/Helper'
import Spacer from '@/Components/Base/Spacer'
import RenderHtml from 'react-native-render-html'
import FeatherIcon from 'react-native-vector-icons/Feather'
import IconDiscount from '@/Components/Icons/IconDiscount'

const VoucherDetailContainer = props => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const { width } = useWindowDimensions()
  const { params } = props.route
  const [data, setData] = useState(manipulateDataVoucher(params))

  React.useLayoutEffect(() => {
    NavBarV1({
      navigation: navigation,
      titleName: 'Detail Voucher',
    })
  }, [navigation])

  // useEffect(() => {
  //   setData(manipulateDataVoucher(params))
  // }, [])

  /**
   *
   * Inside Body Component: Header, TermsNConds
   */
  const Header = props => (
    <View style={{ marginHorizontal: SIZES.margin_h }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {props.promo_type === 'ongkir' ? (
          <FeatherIcon size={18} name={`truck`} color={Colors.primary} />
        ) : (
          <IconDiscount color={Colors.primary} />
        )}
        {!isEmptyNullOrUndefined(props.promo_type) && <Spacer width={10} />}
        <Text style={[header.title]}>{props.header_title}</Text>
      </View>
      <Spacer height={25} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={[header.subTitleLeft]}>
          {props.subtitle.first_row.left}
        </Text>
        <Text style={[header.subTitleRight]}>
          {props.subtitle.first_row.right}
        </Text>
      </View>
      <Spacer height={10} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={[header.subTitleLeft]}>
          {props.subtitle.second_row.left}
        </Text>
        <Text style={[header.subTitleRight]}>
          {props.subtitle.second_row.right}
        </Text>
      </View>
    </View>
  )

  const TermsNConds = props => (
    <View style={{ marginHorizontal: SIZES.margin_h }}>
      <Text style={[terms.title]}>Syarat dan Ketentuan</Text>
      <Spacer height={12} />
      <RenderHtml contentWidth={width} source={{ html: props.t_n_c }} />
    </View>
  )

  return (
    <ScrollView style={[{ flex: 1, backgroundColor: 'white' }]}>
      {!isEmptyNullOrUndefined(data) && (
        <View>
          <Spacer height={20} />
          <Header {...data} />
          <Spacer height={24} />
          <Divider color={Colors.neutralGray07} width={6} />
          <Spacer height={24} />
          <TermsNConds {...data} />
        </View>
      )}
    </ScrollView>
  )
}

export default VoucherDetailContainer

const header = StyleSheet.create({
  title: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    color: Colors.primary,
  },
  subTitleLeft: {
    fontFamily: Fonts.medium,
    fontSize: 15,
    color: Colors.neutralBlack02,
  },
  subTitleRight: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: Colors.neutralBlack02,
  },
})

const terms = StyleSheet.create({
  title: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    color: Colors.neutralBlack01,
    lineHeight: 24,
  },
  num: {
    fontFamily: Fonts.regular,
    fontSize: 15,
    color: Colors.neutralBlack02,
    lineHeight: 24,
  },
  text: {
    fontFamily: Fonts.regular,
    fontSize: 15,
    color: Colors.neutralBlack02,
    lineHeight: 24,
  },
})
