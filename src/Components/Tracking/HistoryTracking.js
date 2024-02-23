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
import Moment from 'moment'

const HistoryTracking = ({ data, number, index, theater }) => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [] = useState()

  const Detailing = ({ status, data }) => {
    if (status == 'complain') {
      return (
        <TouchableOpacity
          onPress={() => {
            console.log('press on touch detail pesanan')
          }}
        >
          <Text
            style={{
              color: '#3374D7',
              fontSize: 13,
              fontWeight: '600',
              marginTop: 5,
            }}
          >
            Lihat Detail Komplain
          </Text>
        </TouchableOpacity>
      )
    } else if (status == 'shipping') {
      return (
        <TouchableOpacity
          onPress={() => {
            theater(data.bukti_image)
          }}
        >
          <Text
            style={{
              color: '#3374D7',
              fontSize: 13,
              fontWeight: '600',
              marginTop: 5,
            }}
          >
            Lihat Bukti Foto
          </Text>
        </TouchableOpacity>
      )
    } else {
      return <></>
    }
  }

  useEffect(() => {}, [])

  return (
    <View
      style={{
        borderStyle: 'dashed',
        borderLeftWidth: number - 1 == index ? 0 : 1.5,
        borderLeftColor: '#C2C2C2',
        marginLeft: 30,
        padding: 20,
        paddingTop: 0,
        paddingHorizontal: 25,
      }}
    >
      <View
        style={[
          st.history,
          {
            backgroundColor: index == 0 ? Colors.primary : Colors.neutralGray04,
            borderColor: index == 0 ? '#EBD6DF' : '#ebebeb',
          },
        ]}
      >
        <FeatherIcon
          name="check"
          size={20}
          color={index == 0 ? 'white' : Colors.neutralBlack02}
        />
      </View>
      <View>
        <View style={[{ justifyContent: 'space-between' }, Layout.row]}>
          <Text
            style={{
              color: Colors.neutralBlack02,
              fontSize: 14,
              fontWeight: '600',
            }}
          >
            {data.name}
          </Text>
          <Text
            style={{
              color: Colors.neutralGray01,
              fontSize: 13,
              fontWeight: '500',
            }}
          >
            {Moment(data.datetime).format('DD MMM YYYY')}
          </Text>
        </View>
        <View
          style={[
            { justifyContent: 'space-between', paddingTop: 4 },
            Layout.row,
          ]}
        >
          <View style={{ width: '70%' }}>
            <Text
              style={{
                color: Colors.neutralBlack02,
                fontSize: 13,
                fontWeight: '400',
                lineHeight: 18,
              }}
            >
              {data.desc}
            </Text>
            <Detailing status={data.status} data={data} />
          </View>
          <Text
            style={{
              color: Colors.neutralGray01,
              fontSize: 13,
              fontWeight: '400',
            }}
          >
            {Moment(data.datetime).format('HH:mm')}
          </Text>
        </View>
      </View>
    </View>
  )
}

const st = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
  },
  history: {
    borderRadius: 30,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: -17,
    borderWidth: 3,
  },
})
export default HistoryTracking
