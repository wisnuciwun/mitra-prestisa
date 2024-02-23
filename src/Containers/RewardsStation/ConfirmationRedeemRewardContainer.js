import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { Colors, SIZES, Fonts } from '@/Theme/Variables'
import NavBarV1 from '@/Components/Base/NavBarV1'
import Spacer from '@/Components/Base/Spacer'
import moment from 'moment'
import IconSend from '@/Components/Icons/IconSend'
import { Divider } from '@rneui/base'
import TextRowBetween from '@/Components/Base/TextRowBetween'
import { STYLES } from '@/Theme/Styles'
import ButtonBottomFloating from '@/Components/ButtonBottomFloating'
import ButtonBase from '@/Components/Base/ButtonBase'

const ConfirmationRedeemRewardContainer = props => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const { params } = props.route

  React.useLayoutEffect(() => {
    NavBarV1({ navigation: navigation, titleName: '', isHeaderLeft: false })
  }, [navigation])

  return (
    <>
      <ScrollView style={[{ flex: 1, backgroundColor: 'white' }]}>
        <LinearGradient
          start={{ x: 0.25, y: 0.5 }}
          end={{ x: 0.75, y: 0.5 }}
          locations={[0.0, 0.95]}
          colors={['#BCD2E3', '#DA5092']}
          style={{
            height: 284,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            alignItems: 'center',
            position: 'relative',
          }}
          useAngle={true}
          angle={124.75}
        >
          <Spacer height={62} />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons
              size={30}
              name="cloud-outline"
              color={Colors.white}
              style={{ top: -30 }}
            />
            <Spacer width={16} />
            <IconSend stroke={3} />
            <Spacer width={16} />
            <Ionicons
              size={50}
              name="cloud-outline"
              color={Colors.white}
              style={{ top: -12 }}
            />
          </View>
          <View
            style={[
              STYLES.shadow_bottom,
              {
                marginTop: 142 / 2 - 10,
                height: 142,
                width: SIZES.width_window - (SIZES.margin_h * 2 + 8),
                backgroundColor: Colors.white,
                borderRadius: 12,
                paddingHorizontal: 24,
                paddingVertical: 30,
                elevation: 6,
              },
            ]}
          >
            <Text
              style={{
                fontSize: 20,
                fontFamily: Fonts.medium,
                color: Colors.neutralBlack02,
                textAlign: 'center',
              }}
            >
              {params.title}
            </Text>
            <Spacer height={18} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: Fonts.regular,
                color: Colors.neutralBlack02,
                textAlign: 'center',
              }}
            >
              {params.subtitle}
            </Text>
          </View>
        </LinearGradient>
        <Spacer height={142 / 2 - 10 + 30} />
        <View style={{ marginHorizontal: SIZES.margin_h }}>
          <View style={{ marginVertical: 20 }}>
            <Text
              style={{
                fontSize: 15,
                fontFamily: Fonts.bold,
                color: Colors.neutralBlack02,
              }}
            >
              Detail Produk
            </Text>
            <Spacer height={12} />
            {[
              { left: 'Jenis', right: params.voucher_name },
              { left: 'No. handphone', right: params.phone },
              { left: 'ID Order', right: params.order_id },
            ].map((item, index) => (
              <TextRowBetween
                key={index}
                leftLabel={item.left}
                rightLabel={item.right}
                leftLabelStyle={{}}
                rightLabelStyle={{}}
                containerStyle={{ marginBottom: index != 2 ? 8 : 0 }}
              />
            ))}
          </View>
          <Divider height={2} color={Colors.neutralGray03} />
          <View style={{ marginVertical: 20 }}>
            <Text
              style={{
                fontSize: 15,
                fontFamily: Fonts.bold,
                color: Colors.neutralBlack02,
              }}
            >
              Tanggal Pembelian
            </Text>
            <Spacer height={8} />
            <Text
              style={{
                fontSize: 13,
                fontFamily: Fonts.medium,
                color: Colors.neutralGray01,
              }}
            >
              {moment(params.order_date).format('D MMMM YYYY')}
            </Text>
          </View>
          <Divider height={2} color={Colors.neutralGray03} />
        </View>
        <Spacer height={200} />
      </ScrollView>
      <ButtonBottomFloating
        isTouchComp={true}
        height={160}
        touchableComp={() => (
          <View>
            <ButtonBase
              title="Kembali ke halaman Rewards"
              istextStyle={true}
              textStyle={{ fontFamily: Fonts.medium }}
            />
            <Spacer height={10} />
            <ButtonBase
              title="Lihat Voucher Saya"
              istextStyle={true}
              textStyle={{ fontFamily: Fonts.medium }}
              mode="outline"
              style={{ borderColor: 'transparent' }}
              onPress={() => navigation.navigate('MyVouchers')}
            />
          </View>
        )}
      />
    </>
  )
}

export default ConfirmationRedeemRewardContainer

const styles = StyleSheet.create({})
