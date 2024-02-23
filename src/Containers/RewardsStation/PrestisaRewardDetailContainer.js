import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import NavBarV1 from '@/Components/Base/NavBarV1'
import { Colors, SIZES, Fonts } from '@/Theme/Variables'
import FastImage from 'react-native-fast-image'
import { isEmptyNullOrUndefined, numberWithCommas } from '@/Helper'
import { Assets } from '@/Theme/Assets'
import { data_cat_tab_detail_redeem } from '@/Components/RewardsStation/DataDummy'
import { use } from 'i18next'
import { reMapCatTabVoucherDetail } from '@/Components/RewardsStation/Helper'
import TabItemHorizontal from '@/Components/RewardsStation/TabItemHorizontal'
import ButtonBottomFloating from '@/Components/ButtonBottomFloating'
import { Divider } from '@rneui/base'
import Spacer from '@/Components/Base/Spacer'
import IconCoins from '@/Components/Icons/IconCoins'

const PrestisaRewardDetailContainer = props => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const { params } = props.route
  const _catTabs = reMapCatTabVoucherDetail(data_cat_tab_detail_redeem)

  const [catTabs, setCatTabs] = useState(_catTabs)
  const [indexCatTab, setIndexCatTab] = useState(0)

  const handleOnPressTab = index => {
    const arr = [...catTabs]
    arr.map((e, i) => {
      index == i ? (arr[i]['selected'] = true) : (arr[i]['selected'] = false)
    })
    setIndexCatTab(index)
    setCatTabs(arr)
  }

  const handleOnPressRedeem = () => {
    navigation.navigate('RedeemPrestisaRewardsPhoneInput', params)
  }

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

  useEffect(() => {
    handleOnPressTab(0)
  }, [])

  return (
    <>
      <ScrollView style={[{ flex: 1, backgroundColor: Colors.white }]}>
        <FastImage
          source={{
            uri: isEmptyNullOrUndefined(params.img)
              ? Assets.noImageUrl
              : params.img,
          }}
          style={{ height: 200, width: SIZES.width_window }}
        />
        <View style={{ flexDirection: 'row' }}>
          {catTabs.map((item, index) => (
            <TabItemHorizontal
              name={item.name}
              key={index}
              activeColor={Colors.primary}
              isActive={item.selected}
              onPress={() => handleOnPressTab(index)}
            />
          ))}
        </View>
        {indexCatTab == 0 ? (
          <InfoVoucher {...params} />
        ) : (
          <TermsConditions {...params} />
        )}
      </ScrollView>
      <ButtonBottomFloating label="Tukarkan" onPress={handleOnPressRedeem} />
    </>
  )
}

export default PrestisaRewardDetailContainer

const styles = StyleSheet.create({})

/**
 *
 * Small Components
 */

const InfoVoucher = props => {
  return (
    <View>
      <View
        style={{
          marginHorizontal: SIZES.margin_h,
          marginVertical: 20,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: Fonts.medium,
            color: Colors.neutralBlack02,
          }}
        >
          {props.name}
        </Text>
        <Spacer height={20} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontFamily: Fonts.medium,
              color: Colors.primary,
              fontSize: 18,
            }}
          >
            Rp{numberWithCommas(props.ammounts)}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <IconCoins />
            <Spacer width={5} />
            <Text
              style={{
                fontFamily: Fonts.medium,
                color: Colors.neutralBlack02,
                fontSize: 13,
              }}
            >
              {numberWithCommas(props.active)} points
            </Text>
          </View>
        </View>
      </View>
      <Divider width={4} color={Colors.neutralGray06} />
      <View
        style={{
          marginHorizontal: SIZES.margin_h,
          marginVertical: 20,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontFamily: Fonts.medium,
            color: Colors.neutralBlack02,
          }}
        >
          Tentang Voucher
        </Text>
        <Text>{props.desc}</Text>
      </View>
      <Divider width={4} color={Colors.neutralGray06} />
      <View
        style={{
          marginHorizontal: SIZES.margin_h,
          marginVertical: 20,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontFamily: Fonts.medium,
            color: Colors.neutralBlack02,
          }}
        >
          Cara Redeem Voucher
        </Text>
        <Text>{props.howto}</Text>
      </View>
    </View>
  )
}

const TermsConditions = props => {
  return (
    <View
      style={{
        marginHorizontal: SIZES.margin_h,
        marginVertical: 20,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontFamily: Fonts.medium,
          color: Colors.neutralBlack02,
        }}
      >
        Syarat dan Ketentuan
      </Text>
      <Text>{props.terms}</Text>
    </View>
  )
}
