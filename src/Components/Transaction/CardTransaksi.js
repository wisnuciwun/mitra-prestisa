import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native'
import { useTheme } from '@/Hooks'
import PropTypes from 'prop-types'
import { Colors } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import FastImage from 'react-native-fast-image'
import FeatherIcon from 'react-native-vector-icons/Feather'
import ButtonBase from '../Base/ButtonBase'
import { useNavigation } from '@react-navigation/native'

import ButtonTransaksiByStatus from './ButtonTransaksiByStatus'
import { Divider } from '@rneui/base'
import { navigationRef } from '@/Navigators/utils'

const CardTransaksi = ({ data, showBukti, handleRefreshTransaksi }) => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const dispatch = useDispatch()
  const navigation = useNavigation()

  useEffect(() => {}, [])
  const PillStatus = () => {
    let x = st.pill
    let y = st.pillText
    if (
      data.status.toLowerCase() == 'dibatalkan' ||
      data.status.toLowerCase() == 'pembayaran_gagal' ||
      data.status.toLowerCase() == 'komplain_diajukan' ||
      data.status.toLowerCase() == 'komplain_diproses'
    ) {
      x = st.pillRed
      y = st.pillTextRed
    } else if (
      data.status.toLowerCase() == 'komplain_terselesaikan' ||
      data.status.toLowerCase() == 'selesai'
    ) {
      x = st.pillGreen
      y = st.pillTextGreen
    }

    function cap(str) {
      return str[0].toUpperCase() + str.slice(1)
    }

    return (
      <View style={[x]}>
        <Text style={[y]}>{cap(data.name)}</Text>
      </View>
    )
  }

  const CardContent = ({ data, index, status, statusdata }) => {
    const item = data
    // console.log(item)
    return (
      <Pressable
        onPress={() => {
          navigation.navigate('DetailPesanan', {
            order_id: item.order_id,
            status: status,
          })
        }}
      >
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
          ID Order {item.order_id}
        </Text>

        <View
          style={[Layout.row, { marginTop: 10, flex: 1, marginBottom: 20 }]}
        >
          <View style={[st.imageCont]}>
            <FastImage
              style={{
                height: 40,
                width: 40,
                backgroundColor: Colors.neutralGrayBlue,
              }}
              resizeMode="cover"
              source={{
                uri: item.image,
              }}
            ></FastImage>
          </View>
          <View style={[{ flex: 1, marginLeft: 10 }]}>
            <View
              style={[
                Layout.row,
                {
                  justifyContent: 'space-between',
                  flex: 1,
                },
              ]}
            >
              <Text style={{ fontSize: 15, fontWeight: '600' }}>
                {item.product_name}
              </Text>
              <Text style={{ fontSize: 11 }}>{item.date}</Text>
            </View>

            {/* <View></View> */}
            <View
              style={[
                Layout.row,
                {
                  justifyContent: 'space-between',
                  flex: 1,
                },
              ]}
            >
              <View style={[Layout.row, { alignItems: 'center' }]}>
                <FeatherIcon name="truck" size={16} />
                <Text style={{ marginLeft: 10, fontSize: 12 }}>
                  {item.city}
                </Text>
              </View>
              {statusdata.id >= 10 && (
                <TouchableOpacity
                  onPress={() => {
                    // console.log('show bukti')
                    showBukti(item)
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      color: '#5D945D',
                      fontWeight: 'bold',
                    }}
                  >
                    Lihat Bukti
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Pressable>
    )
  }

  return (
    <View style={[st.screen]}>
      <View>
        <View
          style={[
            Layout.row,
            {
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 20,
            },
          ]}
        >
          <Text style={{ fontSize: 12 }}>Status Pesanan</Text>

          <PillStatus />
        </View>
      </View>
      {data.list_transaction.map((dt, i) => {
        return (
          <>
            {data.status == 'menunggu_pembayaran' &&
              dt.order_items.map((item, index) => {
                return (
                  <CardContent
                    data={item}
                    index={index}
                    status={data.status}
                    statusdata={data}
                  />
                )
              })}
            {data.status == 'menunggu_pembayaran' && (
              <ButtonTransaksiByStatus
                data={{ status: 'menunggu_pembayaran' }}
                datatrans={dt}
                handleRefreshTransaksi={handleRefreshTransaksi}
              />
            )}
            {/* <Text>{data.status}</Text> */}

            {data.status != 'menunggu_pembayaran' && (
              <CardContent
                data={dt}
                index={i}
                status={data.status}
                statusdata={data}
              />
            )}
            {data.status != 'menunggu_pembayaran' && (
              <ButtonTransaksiByStatus
                data={data}
                datatrans={dt}
                handleRefreshTransaksi={handleRefreshTransaksi}
              />
            )}
            {i < data.list_transaction.length - 1 && (
              <Divider style={{ marginBottom: 20 }} />
            )}
          </>
        )
      })}
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
    marginTop: 10,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
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
    width: 40,
    height: 40,
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
})
export default CardTransaksi
