import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import { useTheme } from '@/Hooks'
import PropTypes from 'prop-types'
import { Colors } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const AjukanFakturTombol = ({ viewForm }) => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [] = useState()

  useEffect(() => {}, [])
  return (
    <View
      style={{
        paddingHorizontal: 30,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          backgroundColor: '#F2F4F7',
          padding: 20,
          marginBottom: 30,
        }}
      >
        <View style={[Layout.row]}>
          <Text style={{ fontSize: 10, marginTop: 2 }}>{'\u2B24' + '   '}</Text>
          <Text style={{}}>
            Anda memiliki 37 hari lagi untuk mengajukan permintaan faktur pajak.
          </Text>
        </View>
        <View style={[Layout.row, { marginTop: 10 }]}>
          <Text style={{ fontSize: 10, marginTop: 2 }}>{'\u2B24' + '   '}</Text>
          <Text style={{}}>
            Faktur pajak akan dikirimkan ke alamat email yang anda daftarkan
            maksimal 3x24 jam
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={viewForm}
        style={{
          //   marginTop: 30,
          paddingHorizontal: 30,
          paddingVertical: 10,
          borderColor: Colors.neutralGray03,
          borderWidth: 1,
          borderRadius: 5,
        }}
      >
        <Text style={{ fontSize: 14 }}>Ajukan Permintaan Faktur Pajak</Text>
      </TouchableOpacity>
    </View>
  )
}

const st = StyleSheet.create({
  screen: {},
})
export default AjukanFakturTombol
