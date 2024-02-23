import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import NavBarV1 from '@/Components/Base/NavBarV1'
import SearchInput from '@/Components/RewardsStation/SearchInput'
import LinearGradient from 'react-native-linear-gradient'
import Spacer from '@/Components/Base/Spacer'
import {
  reMapCatTab,
  reMapMyVouchers,
} from '@/Components/RewardsStation/Helper'
import {
  data_cat_tab_redeem,
  data_my_vouchers,
} from '@/Components/RewardsStation/DataDummy'
import TabItemHorizontal from '@/Components/RewardsStation/TabItemHorizontal'
import { Colors, Fonts, SIZES } from '@/Theme/Variables'
import FastImage from 'react-native-fast-image'
import { isEmptyNullOrUndefined, numberWithCommas } from '@/Helper'
import { Assets } from '@/Theme/Assets'
import { STYLES } from '@/Theme/Styles'
import { Divider } from '@rneui/base'
import moment from 'moment'
import IconRocketOutline from '@/Components/Icons/IconRocketOutline'

const MyVouchersContainer = props => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const prestisaRewards = reMapMyVouchers(data_my_vouchers)
  const catTab = reMapCatTab(data_cat_tab_redeem, prestisaRewards)

  const [categoryTab, setCategoryTab] = useState(catTab)
  const [selectedTab, setSelectedTab] = useState(0)
  const [dataPresRewardTab, setDataPresRewardTab] = useState(prestisaRewards)

  const handleOnPressTab = index => {
    const arr = [...categoryTab]
    arr.map((e, i) => {
      index == i ? (arr[i]['selected'] = true) : (arr[i]['selected'] = false)
    })
    setCategoryTab(arr)
    setSelectedTab(index)
  }

  React.useLayoutEffect(() => {
    NavBarV1({
      navigation: navigation,
      borderBottomColor: 'transparent',
      headerTitle: () => (
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            paddingVertical: 8,
            marginLeft: 24,
          }}
        >
          <SearchInput
            inputLength={0}
            placeholder="Cari di Voucher Saya"
            inputContainerStyle={{
              alignItems: 'center',
              flex: 1,
              borderColor: 'transparent',
              backgroundColor: '#EBEDF1',
            }}
          />
        </View>
      ),
    })
  }, [navigation])

  useEffect(() => {
    handleOnPressTab(0)
  }, [])

  return (
    <View style={[{ flex: 1, backgroundColor: 'white' }]}>
      <LinearGradient
        start={{ x: 0.25, y: 0.5 }}
        end={{ x: 0.75, y: 0.5 }}
        locations={[0.0, 0.96]}
        colors={['#5C136336', '#9FE5FB']}
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          position: 'relative',
        }}
        useAngle={true}
        angle={104.5}
      >
        {categoryTab.map((item, index) => (
          <TabItemHorizontal
            name={item.name}
            key={index}
            isActive={item.selected}
            activeColor={Colors.primary}
            onPress={() => handleOnPressTab(index)}
            containerStyle={{ marginTop: 30 }}
          />
        ))}
      </LinearGradient>
      {selectedTab == 0 ? (
        <PrestisaRewards data={prestisaRewards} navigation={navigation} />
      ) : (
        <Merchants />
      )}
    </View>
  )
}

export default MyVouchersContainer

const styles = StyleSheet.create({})

/**
 *
 * Small Components:
 */
const PrestisaRewards = ({ data, navigation }) => {
  return (
    <>
      {data.map((element, index) => (
        <View key={index}>
          {index != 0 && <Divider width={6} color={Colors.neutralGray06} />}
          <View
            style={{
              marginHorizontal: SIZES.margin_h,
              marginVertical: SIZES.margin_h,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: Fonts.medium,
                color: Colors.neutralBlack02,
              }}
            >
              {element.name}
            </Text>
            <Spacer height={16} />
            {element.child.map((item, index) => (
              <Pressable
                style={{ marginTop: index != 0 ? 20 : 0 }}
                key={index}
                onPress={() => navigation.navigate('MyVoucherItemDetail', item)}
              >
                <CardMyVoucherPrestisaReward {...item} />
              </Pressable>
            ))}
          </View>
        </View>
      ))}
    </>
  )
}

const Merchants = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <IconRocketOutline />
      <Spacer height={23} />
      <View
        style={{ justifyContent: 'center', marginHorizontal: SIZES.margin_h }}
      >
        <Text
          style={{
            textAlign: 'center',
            color: Colors.neutralGray01,
            fontSize: 20,
            fontFamily: Fonts.medium,
          }}
        >
          Coming Soon
        </Text>
        <Spacer height={9} />
        <Text
          style={{
            textAlign: 'center',
            color: Colors.neutralGray01,
            fontSize: 15,
            fontFamily: Fonts.regular,
            lineHeight: 21,
          }}
        >
          Sabar dulu ya, halaman voucher merchants akan datang dalam beberapa
          waktu ke depan
        </Text>
      </View>
    </View>
  )
}

const CardMyVoucherPrestisaReward = props => {
  return (
    <View
      style={[
        STYLES.shadow_bottom,
        {
          height: 120,
          overflow: 'hidden',
          borderRadius: 12,
          elevation: 6,
          flexDirection: 'row',
        },
      ]}
    >
      <FastImage
        source={{
          uri: isEmptyNullOrUndefined(props.img)
            ? Assets.noImageUrl
            : props.img,
        }}
        style={{ width: 92, height: '100%' }}
      />
      <View
        style={{
          backgroundColor: Colors.white,
          flex: 1,
          justifyContent: 'space-between',
          paddingVertical: 10,
          paddingLeft: 10,
          paddingRight: 20,
        }}
      >
        <View style={{}}>
          <Text
            style={{
              fontSize: 15,
              fontFamily: Fonts.medium,
              color: Colors.neutralBlack01,
            }}
          >
            {props.voucher_name}
          </Text>
          <Spacer height={4} />
          <Text
            style={{
              fontSize: 14,
              fontFamily: Fonts.medium,
              color: Colors.primary,
            }}
          >
            Rp{numberWithCommas(props.ammounts)}
          </Text>
          <Spacer height={4} />
          <Text
            style={{
              fontSize: 12,
              fontFamily: Fonts.medium,
              color: Colors.neutralGray01,
            }}
          >
            {props.account_number}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontFamily: Fonts.regular,
              color: Colors.neutralGray01,
            }}
          >
            {moment(props.order_date).format('D MMM YYYY')}
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontFamily: Fonts.medium,
              color: isEmptyNullOrUndefined(props.status_color_text)
                ? '#000000'
                : props.status_color_text,
              backgroundColor: isEmptyNullOrUndefined(props.status_bg_color)
                ? '#dddddd'
                : props.status_bg_color,
              paddingHorizontal: 8,
              paddingVertical: 2,
              borderRadius: 1000,
              overflow: 'hidden',
            }}
          >
            {props.status_name}
          </Text>
        </View>
      </View>
    </View>
  )
}
