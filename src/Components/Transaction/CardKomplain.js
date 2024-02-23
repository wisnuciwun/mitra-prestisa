import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import { useTheme } from '@/Hooks'
import { Colors } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FastImage from 'react-native-fast-image'

const CardKomplain = ({ data, status, order }) => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [] = useState()
  const total = order.hasOwnProperty('price') ? order.price : order.total
  console.log('DATA KOMPLAIN: ', order)
  const numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }
  // console.log('DATA:: ', data)

  const capitalFirstLetteronSentense = str => {
    console.log(str)
    str = str.replace('_', ' ')
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const PillStatus = ({ status }) => {
    // console.log(status)
    let x = st.pill
    let y = st.pillText
    if (
      data.status == 'komplain_diajukan' ||
      data.status == 'komplain_diproses'
    ) {
      x = st.pillRed
      y = st.pillTextRed
    } else if (
      data.status == 'komplain_terselesaikan' ||
      data.status == 'selesai'
    ) {
      x = st.pillGreen
      y = st.pillTextGreen
    }

    return (
      <View style={[x]}>
        <Text style={[y]}>{capitalFirstLetteronSentense(status)}</Text>
      </View>
    )
  }
  useEffect(() => {}, [])
  return (
    <View style={[st.card]}>
      <View
        style={[
          Layout.row,
          {
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
          },
        ]}
      >
        <Text style={{ fontSize: 12 }}>
          {!order.hasOwnProperty('datetime') ? order.date : order.datetime}
        </Text>
        <PillStatus status={order.order_status} />
      </View>
      <View style={[Layout.row, {}]}>
        <View style={[st.imageCont]}>
          <FastImage
            style={{
              height: 64,
              width: 64,
              backgroundColor: Colors.neutralGrayBlue,
            }}
            resizeMode="cover"
            source={{
              uri: order.hasOwnProperty('product_img')
                ? order.product_img
                : order.image[0],
            }}
          ></FastImage>
        </View>
        <View style={[{ marginLeft: 10, flex: 1 }]}>
          <View
            style={[
              Layout.row,
              {
                // backgroundColor: 'blue',
                alignItems: 'center',
                justifyContent: 'space-between',
              },
            ]}
          >
            <Text style={{ fontSize: 15, fontWeight: '600' }}>
              {order.product_name.length > 15
                ? order.product_name.substring(0, 12) + '... '
                : order.product_name}
            </Text>
            <Text
              style={[
                st.pill,
                {
                  backgroundColor: Colors.neutralGrayBlue,
                  fontSize: 12,
                  alignSelf: 'flex-start',
                },
              ]}
            >
              ID Order {order.order_id}
            </Text>
          </View>

          <View
            style={[
              Layout.row,
              {
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 10,
              },
            ]}
          >
            <View style={[{ alignItems: 'center' }]}>
              <Text style={{ fontSize: 11, color: Colors.neutralGray01 }}>
                Total Harga
              </Text>
              <Text style={{ fontSize: 12, color: Colors.neutralBlack01 }}>
                Rp{numberWithCommas(total)}
              </Text>
            </View>
            <Text
              onPress={() => navigation.navigate('DetailPesanan')}
              style={{
                fontSize: 13,
                color: Colors.primary,
                fontWeight: 'bold',
              }}
            >
              Detail Pesanan
            </Text>
          </View>
        </View>
      </View>
    </View>
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
  content: {
    borderBottomColor: '#efefef',
    borderBottomWidth: 3,
    padding: 20,
  },
  content2: { marginVertical: 10 },
  textDetail: { fontSize: 16 },
  card: {
    elevation: 10,
    borderColor: '#e6e6e6',
    borderWidth: 1,
    padding: 20,
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
})
export default CardKomplain
