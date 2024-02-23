import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from 'react-native'
import { useTheme } from '@/Hooks'
import { Colors } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import FastImage from 'react-native-fast-image'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import FeatherIcon from 'react-native-vector-icons/Feather'
import { ScrollView } from 'react-native-gesture-handler'
import CardKomplain from '@/Components/Transaction/CardKomplain'
import ButtonBase from '@/Components/Base/ButtonBase'
import ModalCenter from '@/Components/Base/ModalCenter'
import { Config } from '@/Config'
import axios from 'axios'
import { toUpper } from 'lodash'
import LoadingIndicator from '@/Components/Base/LoadingIndicator'
import { Assets } from '@/Theme/Assets'
import Spacer from '@/Components/Base/Spacer'

const DetailKomplainOrder = props => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [visibleModalConfirm, setvisibleModalConfirm] = useState(false)

  const [detailComplain, setDetailComplain] = useState({})
  const [loading, setloading] = useState(true)

  const successForm = props.route.params.successForm
  // const data = {
  //   order_id: '123',
  //   product_name: 'Yellow Bouquet - 01',
  //   city: 'Jakarta Barat',
  //   id: 1,
  //   name: 'Menunggu Pembayaran',
  //   price: 234000,
  //   category: 'no category',
  //   image: ['https://lavender.prestisa.id/assets/images/products/BPDC-1.png'],
  //   date: '06 Jul 2022',
  // }

  // API get complain
  // https://lavender.prestisa.id/api/customer-app/get-complain

  const potongTulisan = (text, panjang, tanda = '') => {
    tanda = tanda == '' ? '...' : tanda
    // console.log(tanda)
    return text.length > panjang ? text.substring(0, panjang) + tanda : text
  }

  const fetchData = async () => {
    setloading(true)
    const url = Config.API_URL + `/customer-app/get-complain`

    await axios
      .post(url, {
        fbasekey: 'testvoucher',
        po_id: 123,
      })
      .then(response => {
        //console.log(response.data.data)
        setDetailComplain(response.data.data.complain_info)
        setloading(false)
      })
      .catch(({ response }) => {
        setloading(false)
      })
  }

  React.useLayoutEffect(() => {
    // setIsLoading(false)
    if (successForm) {
      navigation.setOptions({
        title: '',
        headerLeft: () => {
          return (
            <Pressable
              onPress={() => {
                navigation.navigate('Main')
              }}
              style={[Layout.row, { marginLeft: 20, alignItems: 'center' }]}
            >
              <FeatherIcon
                color={Colors.primary}
                onPress={() => sharePDFWithAndroid()}
                style={{ fontSize: 20, color: Colors.primary, marginRight: 10 }}
                name="home"
              />
              <Text style={{ color: Colors.primary }}>Kembali Ke Beranda</Text>
            </Pressable>
          )
        },
      })
    }
  }, [navigation])

  useEffect(() => {
    fetchData()
  }, [])
  const PillStatus = () => {
    let x = st.pill
    let y = st.pillText
    if (data.id == 9 || data.id == 8) {
      x = st.pillRed
      y = st.pillTextRed
    } else if (data.id == 10) {
      x = st.pillGreen
      y = st.pillTextGreen
    }

    return (
      <View style={[x]}>
        <Text style={[y]}>{data.name}</Text>
      </View>
    )
  }
  return (
    <>
      <ScrollView style={[st.screen, Layout.fill]}>
        {loading == true ? (
          <>
            <LoadingIndicator
              // style={{ backgroundColor: Colors.neutralGrayBlue }}
              loadingSize={25}
              loadingColor={Colors.primary}
            />
          </>
        ) : (
          <>
            {successForm ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 50,
                  paddingBottom: 40,
                  paddingTop: 40,
                }}
              >
                <FastImage
                  source={Assets.check}
                  style={{ width: 50, height: 50 }}
                />
                <Spacer height={20} />
                <Text
                  style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}
                >
                  Komplain dalam proses pemeriksaan
                </Text>
                <Text style={{ textAlign: 'center' }}>
                  Proses komplain sudah diajukan. Kamu akan dihubungi maksimal
                  1x24 jam ke nomor Whatsapp yang tersimpan.
                </Text>
              </View>
            ) : (
              <View collapsable={false} style={[st.content]}>
                <Text style={[st.headerText]}>Status Komplain</Text>
                <Text style={[]}>Proses komplain masih dalam proses </Text>
              </View>
            )}
            <View style={[st.content]}>
              <Text style={[st.headerText]}>Info Pesanan</Text>

              <CardKomplain
                order={detailComplain.item}
                data={detailComplain.item}
              />
            </View>
            <View style={[st.content]}>
              <Text style={st.headerText}>Detail Komplain</Text>
              <View style={st.content2}>
                <Text style={st.headerText2}>Alasan Komplain</Text>
                <Text style={st.textDetail}>{detailComplain.alasan}</Text>
              </View>
              <View style={st.content2}>
                <Text style={st.headerText2}>Foto Pendukung</Text>
                <FastImage
                  style={{
                    height: 140,
                    width: 140,
                    backgroundColor: Colors.neutralGrayBlue,
                  }}
                  resizeMode="cover"
                  source={{
                    uri: detailComplain.foto,
                  }}
                ></FastImage>
              </View>
              <View style={st.content2}>
                <Text style={st.headerText2}>Keterangan</Text>
                <Text style={st.textDetail}>{detailComplain.keterangan}</Text>
              </View>
              <View style={st.content2}>
                <Text style={st.headerText2}>Pilihan Solusi</Text>
                <Text style={st.textDetail}>{detailComplain.solusi}</Text>
              </View>
              {detailComplain.rekening != '' ? (
                <>
                  <View style={[st.content2, { marginBottom: 50 }]}>
                    <Text style={st.headerText2}>Rekening</Text>
                    <Text style={st.textDetail}>
                      {toUpper(detailComplain.bank)}{' '}
                      {potongTulisan(detailComplain.no_rek, 5, '***')} a.n{' '}
                      {detailComplain.nama_rekening}
                    </Text>
                  </View>
                </>
              ) : (
                <></>
              )}
            </View>
          </>
        )}
      </ScrollView>
      {successForm && (
        <View
          style={[
            Layout.row,
            { padding: 20, alignItems: 'center', backgroundColor: 'white' },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('CustomerService')
            }}
            style={{
              padding: 5,
              borderColor: Colors.neutralGray04,
              borderWidth: 1,
              borderRadius: 5,
            }}
          >
            <Icon size={28} name="message-text-outline"></Icon>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setvisibleModalConfirm(true)
            }}
            // disabled={true}
            style={[
              {
                borderColor: Colors.neutralBlack02,
                borderWidth: 1,
                margin: 10,
                flex: 1,
                height: 40,
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}
          >
            <Text style={{ color: Colors.neutralBlack02 }}>
              Batalkan Komplain
            </Text>
          </TouchableOpacity>
          {/* <ButtonBase title={'Batalkan Komplain'} /> */}
        </View>
      )}
      <ModalCenter
        heightModal={200}
        widthModal={'80%'}
        isVisible={visibleModalConfirm}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: Colors.neutralBlack02,
              paddingVertical: 20,
              fontWeight: 'bold',
            }}
          >
            Batalkan Komplain?
          </Text>
          <Text
            style={{
              textAlign: 'left',
              fontSize: 14,
              lineHeight: 20,
              color: Colors.neutralBlack02,
              paddingHorizontal: 20,
              fontWeight: '600',
            }}
          >
            Apakah kamu yakin mau membatalkan pengajuan komplain ?
          </Text>
        </View>
        <View
          style={[
            Layout.row,
            {
              paddingTop: 20,
              justifyContent: 'space-around',
              borderTopColor: '#eee',
              borderTopWidth: 1,
              marginTop: 20,
              alignItems: 'center',
            },
          ]}
        >
          <Pressable onPress={() => setvisibleModalConfirm(false)}>
            <Text style={{ color: Colors.neutralBlack02, fontSize: 16 }}>
              Tidak
            </Text>
          </Pressable>
          <Pressable
            style={{
              backgroundColor: Colors.primary,
              paddingVertical: 10,
              paddingHorizontal: 15,
              borderRadius: 5,
            }}
          >
            <Text style={{ color: 'white', fontSize: 16 }}>Iya, Batalkan</Text>
          </Pressable>
        </View>
      </ModalCenter>
    </>
  )
}

const pillbase = {
  paddingVertical: 5,
  paddingHorizontal: 10,
  borderRadius: 5,
  backgroundColor: '#FBE19E',
}

const pillTextBase = {
  fontWeight: 'bold',
  fontSize: 13,
}
const st = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
  },
  headerText: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  headerText2: { fontSize: 18, fontWeight: '600', marginBottom: 10 },
  content: {
    borderBottomColor: '#efefef',
    borderBottomWidth: 3,
    borderTopColor: '#efefef',
    borderTopWidth: 3,
    padding: 20,
  },
  content2: { marginVertical: 10 },
  textDetail: { fontSize: 16 },
  card: {
    elevation: 10,
    borderColor: '#e6e6e6',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  pill: {
    ...pillbase,
  },
  pillGreen: {
    ...pillbase,
    backgroundColor: '#C6ECC6',
  },
  pillRed: {
    ...pillbase,
    backgroundColor: '#FEF2F1',
  },

  pillText: {
    ...pillTextBase,
    color: '#7B3F07',
  },
  pillTextGreen: {
    ...pillTextBase,
    color: '#096B08',
  },
  pillTextRed: {
    ...pillTextBase,
    color: '#CB3A31',
  },

  imageCont: {
    width: 64,
    height: 64,
    overflow: 'hidden',
    borderRadius: 5,
  },
  button: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderColor: Colors.neutralGray04,
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 14,
    color: Colors.neutralBlack02,
    fontWeight: 'bold',
  },
  button: {
    disableLine: {
      backgroundColor: '#e6e6e6',
    },
    disableText: {
      color: '#7B3F07',
    },
  },
})
export default DetailKomplainOrder
