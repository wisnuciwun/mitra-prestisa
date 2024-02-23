import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Pressable,
} from 'react-native'
import { useTheme } from '@/Hooks'
import PropTypes from 'prop-types'
import { Colors } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import FastImage from 'react-native-fast-image'
import InputBase from '../Base/InputBase'
import { Divider } from '@rneui/themed'
import Spacer from '../Base/Spacer'

const OrderUcapan = props => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const dispatch = useDispatch()

  const numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  const jumlahPage = props.jumlahPage
  const currentPage = props.currentPage

  function numFormatter(num) {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(0) + 'rb' // convert to K for number from > 1000 < 1 million
    } else if (num > 1000000) {
      return (num / 1000000).toFixed(0) + 'jt' // convert to M for number from > 1 million
    } else if (num < 900) {
      return num // if value < 1000, nothing to do
    }
  }

  const templateUcapan = [
    { id: 1, title: 'Tanpa Ucapan' },
    { id: 2, title: 'Happy Wedding' },
    { id: 3, title: 'Selamat dan Sukses' },
    { id: 4, title: 'Happy Anniversary' },
    { id: 5, title: 'Turut Berduka Cita' },
    { id: 6, title: 'Selamat Ulang Tahun' },
  ]

  const prod = {
    id: 1470,
    name: 'FB JOG 3',
    description:
      'Lama pengerjaan: 2-3 jam\nLama pengiriman: 1-2 jam\nMaterial: carnation\nBox menyesuaikan stock',
    price: 950000,
    sale_price: 0,
    qty: null,
    image: [
      {
        id: 1,
        path: 'https://lavender.prestisa.id/assets/images/products/BPDC-1.png',
      },
      {
        id: 2,
        path: 'https://lavender.prestisa.id/assets/images/products/BPDC-2.png',
      },
    ],
    city: 1621175,
    product_code: 'FB-116',
    category_id: 7,
    product_type: 1,
    rating: 0,
    item_sold: 0,
    dimension: [],
    availability: null,
    category: 'karangan bunga papan',
    discount: 0,
    occasions: [],
    tag: [],
  }

  useEffect(() => {}, [])
  return (
    <View style={[st.screen]}>
      <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 20 }}>
        Kata Ucapan
      </Text>

      <View>
        {props.jumlahPage > 0 ? (
          <View>
            <Text
              style={{ color: Colors.primary, marginBottom: 10, fontSize: 14 }}
            >
              Produk {currentPage} dari {jumlahPage}
            </Text>
            <Divider />
            <Spacer height={20} />
          </View>
        ) : (
          <View></View>
        )}
      </View>
      <View style={[Layout.row, { marginBottom: 10 }]}>
        <View style={st.image}>
          <FastImage
            // tintColor="gray"
            style={st.image}
            source={{ uri: prod.image[0].path }}
          />
        </View>
        <View>
          <Text style={{ color: Colors.neutralBlack01, marginBottom: 10 }}>
            {prod.name}
          </Text>
          <View style={[Layout.row, Layout.alignItemsCenter]}>
            <Text style={{ fontSize: 14, fontWeight: '600' }}>
              Rp
              {numberWithCommas(
                prod.discount > 0 ? prod.sale_price : prod.price,
              )}
            </Text>
            {prod.discount > 0 && (
              <>
                <View>
                  <Text
                    style={[
                      st.pill,
                      st.textPill,
                      {
                        fontWeight: 'bold',
                        fontSize: 12,
                        marginLeft: 10,
                      },
                    ]}
                  >
                    -Rp{numFormatter(diskon)}
                  </Text>
                </View>
              </>
            )}
          </View>
          {prod.discount > 0 && (
            <Text
              style={[
                st.cardTextSmall,
                {
                  textDecorationLine: 'line-through',
                  fontSize: 12,
                },
              ]}
            >
              Rp{numberWithCommas(prod.price)}
            </Text>
          )}
        </View>
      </View>

      <View>
        <Text>
          Nama pengirim yang tertera di produk/kartu
          <Text style={{ color: 'red' }}>*</Text>
        </Text>
        <InputBase />
        <Text style={{ alignSelf: 'flex-end', marginTop: 10 }}>{0}/48</Text>
      </View>

      <View style={{ marginTop: 20 }}>
        <Text>
          Kalimat ucapan
          <Text style={{ color: 'red' }}>*</Text>
        </Text>
        <TextInput
          //   defaultValue={catatanSelected.catatan}
          // value={textCatatan}
          multiline={true}
          maxLength={120}
          numberOfLines={6}
          style={st.textArea}
          onChangeText={text => {
            // setTextCatatan(text)
          }}
        ></TextInput>
        <Text style={{ alignSelf: 'flex-end', marginTop: 10 }}>{0}/100</Text>
      </View>
      <View style={[Layout.row, { flexWrap: 'wrap' }]}>
        {templateUcapan.map((item, index) => {
          return (
            <TouchableOpacity style={st.pill}>
              <Text style={{ color: Colors.neutralBlack01 }}>{item.title}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}

const st = StyleSheet.create({
  screen: { padding: 20 },
  image: {
    borderRadius: 5,
    width: 72,
    height: 72,
    backgroundColor: '#eee',
    marginRight: 20,
  },
  pill: {
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: Colors.neutralGray03,
  },
  textArea: {
    textAlignVertical: 'top',
    borderColor: Colors.neutralGray02,
    borderWidth: 1,
    borderRadius: 10,
    color: Colors.neutralBlack02,
    marginTop: 10,
    padding: 15,
  },
})
export default OrderUcapan
