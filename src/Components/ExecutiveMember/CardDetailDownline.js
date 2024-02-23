import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from 'react-native'
import { useTheme } from '@/Hooks'
import PropTypes from 'prop-types'
import { Colors } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Ionicon from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FastImage from 'react-native-fast-image'
import { numberWithCommas } from '@/Helper'
import moment from 'moment'

const CardDetailDownline = ({ data }) => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [] = useState()

  //   const duration = moment().unix() - 1657771449
  //   const unixnow

  //   console.log(duration)
  useEffect(() => {}, [])
  return (
    <View style={[st.screen]}>
      {data.length > 0 ? (
        data.map((item, index) => {
          return (
            <Pressable
              key={index}
              onPress={() =>
                navigation.navigate('MemberDownlineDetail', {
                  id: item.member_info.customer_id,
                })
              }
              style={{
                flexDirection: 'row',
                padding: 20,
                borderBottomColor: '#eee',
                borderBottomWidth: 1,
              }}
            >
              <View style={{ marginRight: 10 }}>
                {item.member_info.photo != '' ? (
                  <FastImage
                    source={{ uri: item.member_info.photo }}
                    style={{ width: 34, height: 34, borderRadius: 20 }}
                  />
                ) : (
                  <Ionicon name="person-circle" />
                )}
              </View>
              <View style={{ flex: 1 }}>
                <View style={[Layout.row, { justifyContent: 'space-between' }]}>
                  <Text style={st.nama}>{item.member_info.name}</Text>
                  <Text style={st.point}>
                    + {numberWithCommas(item.point)} points
                  </Text>
                </View>
                <View
                  style={[
                    Layout.row,
                    {
                      justifyContent: 'space-between',
                      marginTop: 5,
                      alignItems: 'center',
                    },
                  ]}
                >
                  <View style={[Layout.row, { alignItems: 'center' }]}>
                    <Text style={st.level}>
                      {item.member_info.level == 2 ? '2nd Layer' : '3rd Layer'}
                    </Text>
                    {moment().unix() - item.last_transaction_date_epoch <
                      604800 && <Text style={st.pill}>New</Text>}
                  </View>
                  <Text style={st.date}>
                    Terbaru{' '}
                    {moment
                      .unix(item.last_transaction_date_epoch)
                      .format('DD/MM/YY')}
                  </Text>
                </View>
              </View>
            </Pressable>
          )
        })
      ) : (
        <Text style={{ alignSelf: 'center', padding: 10 }}>
          {/* Data Tidak Tersedia */}
        </Text>
      )}
    </View>
  )
}

const st = StyleSheet.create({
  screen: { backgroundColor: 'white', borderRadius: 10, elevation: 5 },
  nama: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  point: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  pill: {
    backgroundColor: '#C6ECC6',
    padding: 5,
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  date: { fontSize: 11 },
  level: { fontSize: 12 },
})
export default CardDetailDownline
