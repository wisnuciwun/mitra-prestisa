import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import NavBarV1 from '@/Components/Base/NavBarV1'
import FastImage from 'react-native-fast-image'
import { Assets } from '@/Theme/Assets'
import { Colors, Fonts, SIZES } from '@/Theme/Variables'
import Spacer from '@/Components/Base/Spacer'
import {
  header,
  dummy_data_revisi_produk as data,
} from '@/Components/RevisiProduk/DummyData'
import ButtonBottomFloating from '@/Components/ButtonBottomFloating'
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import { isEmptyNullOrUndefined } from '@/Helper'

const ConfirmAddRevProdContainer = props => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const { params } = props.route

  const [dataRevisiProduk, setDataRevisiProduk] = useState(data)

  const isAccepted = props.isRevisi

  React.useLayoutEffect(() => {
    NavBarV1({
      titleName: 'Revisi Produk',
      navigation: navigation,
      isHeaderLeft: false,
    })
    navigation.addListener('beforeRemove', e => {
      if (e.data.action.type == 'GO_BACK') {
        e.preventDefault()
      }
    })
  }, [navigation])

  const Header = props => {
    return (
      <View style={[{ alignItems: 'center' }]}>
        <View
          style={[
            {
              height: 100,
              width: 94,
              backgroundColor: Colors.neutralGrayBlue,
              borderRadius: 1000,
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}
        >
          <FastImage
            source={{ uri: props.icon }}
            style={{ height: 70, width: 70 }}
          />
        </View>
        <Spacer height={16} />
        <View
          style={[
            {
              alignItems: 'center',
              marginHorizontal: SIZES.margin_h * 2,
            },
          ]}
        >
          <Text
            style={[
              {
                textAlign: 'center',
                fontSize: 20,
                fontFamily: Fonts.medium,
                color: Colors.neutralBlack02,
                lineHeight: 28,
                textTransform: 'capitalize',
              },
            ]}
          >
            {props.title}
          </Text>
          <Spacer height={4} />
          <Text
            style={[
              {
                textAlign: 'center',
                fontSize: 14,
                fontFamily: Fonts.regular,
                color: Colors.neutralBlack02,
                lineHeight: 19.6,
              },
            ]}
          >
            {props.message}
          </Text>
        </View>
      </View>
    )
  }

  const RevisiList = props => {
    return (
      <View>
        <Text
          style={[
            {
              color: Colors.neutralGray01,
              fontFamily: Fonts.medium,
              fontSize: 14,
            },
          ]}
        >
          Revisi #{props.revisi_type}
        </Text>
        <Spacer height={12} />
        <Text
          style={[
            {
              color: Colors.neutralBlack02,
              fontFamily: Fonts.medium,
              fontSize: 14,
            },
          ]}
        >
          {props.title}
        </Text>
        <Spacer height={6} />
        <Text
          style={[
            {
              color: Colors.neutralGray01,
              fontFamily: Fonts.regular,
              fontSize: 14,
              lineHeight: 19.6,
            },
          ]}
        >
          {props.desc}
        </Text>
      </View>
    )
  }

  return (
    <>
      <ScrollView style={[{ flex: 1, backgroundColor: 'white' }]}>
        <Spacer height={28} />
        <Header {...params} />
        <Spacer height={40} />
        <View style={[{ marginHorizontal: SIZES.margin_h }]}>
          <Text
            style={[
              {
                fontFamily: Fonts.medium,
                fontSize: 15,
                color: Colors.neutralBlack01,
                lineHeight: 21,
              },
            ]}
          >
            Produk Direvisi (1 Produk)
          </Text>
          <Spacer height={12} />
          <View style={[{ backgroundColor: '#F7F7F8', padding: 16 }]}>
            <View style={[{ flexDirection: 'row', alignItems: 'center' }]}>
              <FastImage
                source={{
                  uri: isEmptyNullOrUndefined(
                    params.product_info.product_img[0].path,
                  )
                    ? Assets.noImageUrl
                    : params.product_info.product_img[0].path,
                }}
                style={{ width: 40, height: 40, borderRadius: 4 }}
              />
              <Spacer width={12} />
              <View>
                <View style={[{ flexWrap: 'wrap' }]}>
                  <Text
                    style={[
                      {
                        borderRadius: 4,
                        paddingHorizontal: 8,
                        paddingVertical: 2,
                        overflow: 'hidden',
                        backgroundColor: Colors.neutralGray05,
                        color: Colors.neutralBlack02,
                        textAlign: 'center',
                        fontFamily: Fonts.regular,
                        fontSize: 12,
                        flexWrap: 'wrap',
                      },
                    ]}
                  >
                    ID Order {params.product_info.order_id}
                  </Text>
                </View>
                <Spacer height={8} />
                <Text
                  style={[
                    {
                      color: Colors.neutralBlack02,
                      fontFamily: Fonts.bold,
                      fontSize: 14,
                      lineHeight: 19.6,
                    },
                  ]}
                >
                  {params.product_info.product_name}{' '}
                  {params.product_info.product_name}
                </Text>
              </View>
            </View>
            <Spacer height={20} />
            {params.product_info.revisi_list.map((item, index) => (
              <View
                style={[
                  {
                    marginBottom:
                      index === params.product_info.revisi_list.length - 1
                        ? 0
                        : 20,
                  },
                ]}
                key={index}
              >
                <RevisiList {...item} />
              </View>
            ))}
            {params.product_info.revisi_list.length > 0 &&
              [params.product_info.revisi_list.reverse()[0]].map(
                (item, index) => (
                  <View key={index}>
                    <Spacer height={20} />
                    <Text
                      style={[
                        {
                          color: Colors.neutralBlack01,
                          fontFamily: Fonts.medium,
                          fontSize: 14,
                        },
                      ]}
                    >
                      Lampiran
                    </Text>
                    <Spacer height={12} />
                    <View
                      style={[{ flexDirection: 'row', alignItems: 'center' }]}
                    >
                      <EvilIcon name="paperclip" size={20} />
                      <Text
                        style={[
                          {
                            fontFamily: Fonts.medium,
                            fontSize: 14,
                            color: Colors.otherBlue,
                            textTransform: 'capitalize',
                          },
                        ]}
                      >
                        {item.lampiran.split('/')[5]}
                      </Text>
                    </View>
                  </View>
                ),
              )}
          </View>
        </View>
        <Spacer height={120} />
      </ScrollView>
      <ButtonBottomFloating
        mode="outline"
        label="Kembali ke halaman Transaksi"
        height={80}
        textColorTypeOutline={Colors.neutralBlack02}
        style={{ borderColor: Colors.neutralGray01, height: 44 }}
        onPress={() => navigation.navigate('Transaksi')}
      />
    </>
  )
}

export default ConfirmAddRevProdContainer

const styles = StyleSheet.create({})
