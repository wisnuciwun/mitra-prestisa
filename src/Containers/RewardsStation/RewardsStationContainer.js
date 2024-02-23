import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import CardVoucherRedeem from '@/Components/RewardsStation/CardVoucherRedeem'
import {
  data_cat_tab_redeem,
  data_redeem_voucher,
} from '@/Components/RewardsStation/DataDummy'
import { Colors, Fonts, SIZES } from '@/Theme/Variables'
import NavBarV1 from '@/Components/Base/NavBarV1'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import IconTicketOutline from '@/Components/Icons/IconTicketOutline'
import Spacer from '@/Components/Base/Spacer'
import LinearGradient from 'react-native-linear-gradient'
import { reMapCatTab } from '@/Components/RewardsStation/Helper'
import IconRocketOutline from '@/Components/Icons/IconRocketOutline'
import FastImage from 'react-native-fast-image'
import { isEmptyNullOrUndefined } from '@/Helper'
import TabItemHorizontal from '@/Components/RewardsStation/TabItemHorizontal'
import TextTouchable from '@/Components/RingkasanPesanan/TextTouchable'

const RewardsStationContainer = props => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const prestisaRewards = data_redeem_voucher
  const catTab = reMapCatTab(data_cat_tab_redeem, prestisaRewards)
  const [selectedTab, setSelectedTab] = useState(0)

  const [categoryTab, setCategoryTab] = useState(catTab)

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
      titleName: '',
      backgroundColor: Colors.primary,
      colorArrowLeft: Colors.white,
      borderBottomColor: 'transparent',
      isHeaderRight: true,
      headerRightComp: () => (
        <TouchableOpacity onPress={() => navigation.navigate('MyVouchers')}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <IconTicketOutline color={Colors.neutralGray07} />
            <Spacer width={4} />
            <Text
              style={{
                color: Colors.neutralGray07,
                fontFamily: Fonts.medium,
                fontSize: 14,
              }}
            >
              Voucher Saya
            </Text>
            <Spacer width={22} />
          </View>
        </TouchableOpacity>
      ),
    })
  }, [navigation])

  useEffect(() => {
    handleOnPressTab(0)
  }, [])

  return (
    <ScrollView style={[{ flex: 1, backgroundColor: 'white' }]}>
      <LinearGradient
        start={{ x: 0.25, y: 0.5 }}
        end={{ x: 0.75, y: 0.5 }}
        locations={[0.0, 1.0]}
        colors={['#5C1363B2', '#46CBF5']}
        style={{ minHeight: 120 }}
        useAngle={true}
        angle={104.21}
      >
        <View style={{ marginHorizontal: SIZES.margin_h, marginTop: 22 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: Fonts.medium,
                color: Colors.white,
                textTransform: 'uppercase',
              }}
            >
              Rewards Station
            </Text>
            <Spacer width={14} />
            <FeatherIcon
              name={'gift'}
              size={20}
              color={Colors.white}
              style={{ transform: [{ rotate: '45deg' }] }}
            />
          </View>
          <Spacer height={10} />
          <Text
            style={{
              fontSize: 12,
              fontFamily: Fonts.regular,
              color: '#F1F1F1',
              lineHeight: 15.6,
            }}
          >
            Tukarkan point kamu dengan beragam produk ataupun voucher dari
            berbagai merchants
          </Text>
        </View>
      </LinearGradient>
      <View style={{ flexDirection: 'row', flex: 1 }}>
        {categoryTab.map((item, index) => (
          <TabItemHorizontal
            name={item.name}
            key={index}
            isActive={item.selected}
            activeColor={Colors.primary}
            onPress={() => handleOnPressTab(index)}
          />
        ))}
      </View>
      {selectedTab == 0 ? (
        <PrestisaRewards data={prestisaRewards} navigation={navigation} />
      ) : (
        <Merchants />
      )}
    </ScrollView>
  )
}

export default RewardsStationContainer

const styles = StyleSheet.create({})

/**
 *
 * Small Components:VTabs
 */
const PrestisaRewards = ({ data, navigation }) => {
  return (
    <View style={{}}>
      <Spacer height={24} />
      <View style={{ marginHorizontal: SIZES.margin_h }}>
        <Text
          style={{ fontSize: 28, fontFamily: Fonts.medium, color: '#2F2F2F' }}
        >
          Dompet digital
        </Text>
        <Spacer height={2} />
        <Text
          style={{
            fontSize: 14,
            fontFamily: Fonts.regular,
            color: Colors.neutralGray01,
          }}
        >
          Tukarkan point menjadi potongan penukaran saldo digital
        </Text>
      </View>
      <Spacer height={24} />
      {data.map((item, index) => (
        <View key={index}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: SIZES.margin_h,
            }}
          >
            <View
              style={[
                !isEmptyNullOrUndefined(item.icon) && {
                  flexDirection: 'row',
                  alignItems: 'center',
                },
              ]}
            >
              {!isEmptyNullOrUndefined(item.icon) && (
                <FastImage
                  source={{ uri: item.icon }}
                  style={{
                    height: 20,
                    width: 20,
                    borderRadius: 4,
                    marginRight: 10,
                  }}
                />
              )}
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: Fonts.medium,
                  color: '#2F2F2F',
                }}
              >
                {item.name}
              </Text>
            </View>
            <TextTouchable
              text="Lihat Semua"
              textStyles={{ color: Colors.primary, fontSize: 14 }}
              onPress={() =>
                navigation.navigate('PrestisaRewardSubCatDetail', {
                  img: '',
                  child: item.child,
                })
              }
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 10,
              marginTop: 4,
              marginBottom: 24,
            }}
          >
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {item.child.slice(0, 6).map((_item, _index) => (
                <TouchableOpacity
                  key={_index}
                  onPress={() =>
                    navigation.navigate('PrestisaRewardDetail', _item)
                  }
                >
                  <CardVoucherRedeem
                    {..._item}
                    style={[
                      {
                        marginLeft: _index == 0 ? SIZES.margin_h : 20,
                        marginRight: _index == 5 ? SIZES.margin_h : 0,
                      },
                      Platform.OS == 'android' && {
                        borderWidth: 0.5,
                        borderColor: Colors.neutralGray05 + '80',
                      },
                    ]}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      ))}
      <Spacer height={100} />
    </View>
  )
}

const Merchants = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Spacer height={59} />
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
