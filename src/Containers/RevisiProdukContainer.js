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

const RevisiProdukContainer = props => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const state = useSelector(state => state)

  const [dataRevisiProduk, setDataRevisiProduk] = useState(data)

  const isAccepted = true

  React.useLayoutEffect(() => {
    NavBarV1({
      titleName: 'Revisi Produk',
      navigation: navigation,
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
          <FastImage source={props.img} style={{ height: 70, width: 70 }} />
        </View>
        <Spacer height={16} />
        <View style={[{ alignItems: 'center', width: 230 }]}>
          <Text
            style={[
              {
                textAlign: 'center',
                fontSize: 20,
                fontFamily: Fonts.medium,
                color: Colors.neutralBlack02,
                lineHeight: 28,
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
            {props.desc}
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
        {isAccepted ? (
          <Header {...header.accepted} />
        ) : (
          <Header {...header.sended} />
        )}
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
            {isAccepted
              ? 'Produk Direvisi (1 Produk)'
              : 'Riwayat revisi (1 Produk)'}
          </Text>
          <Spacer height={12} />
          <View style={[{ backgroundColor: '#F7F7F8', padding: 16 }]}>
            <View style={[{ flexDirection: 'row', alignItems: 'center' }]}>
              <FastImage
                source={{ uri: dataRevisiProduk.product_img }}
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
                    ID Order{dataRevisiProduk.order_id}
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
                  {dataRevisiProduk.product_name}{' '}
                  {dataRevisiProduk.product_name}
                </Text>
              </View>
            </View>
            <Spacer height={20} />
            {dataRevisiProduk.revisi_list.map((item, index) => (
              <View
                style={[
                  {
                    marginBottom:
                      index === dataRevisiProduk.revisi_list.length - 1
                        ? 0
                        : 20,
                  },
                ]}
                key={index}
              >
                <RevisiList {...item} />
              </View>
            ))}
            {isAccepted && !isEmptyNullOrUndefined(header.attatchment) && (
              <View>
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
                <View style={[{ flexDirection: 'row', alignItems: 'center' }]}>
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
                    {header.attatchment}
                  </Text>
                </View>
              </View>
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
      />
    </>
  )
}

export default RevisiProdukContainer

const styles = StyleSheet.create({})

/**
 *
 *
 * Small Component:
 */
