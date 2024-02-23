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
import { Colors } from '@/Theme/Variables'
import { Config } from '@/Config'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import InputSearch from '@/Components/Base/InputSearch'
import InputBase from '@/Components/Base/InputBase'
import FastImage from 'react-native-fast-image'
import { Assets } from '@/Theme/Assets'

const RefundPilihBank = ({ listBank, setSelectedBank }) => {
  const ApiUrl = Config.API_URL

  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const dispatch = useDispatch()
  // const [listBank, setListBank] = useState(null)
  const [loading, setloading] = useState(true)
  // const [selectedBank, setSelectedBank] = useState(null)
  const [] = useState()

  const getBankImage = bankCode => {
    switch (bankCode) {
      case 'BCA':
        return Assets.BCA
      case 'BRI':
        return Assets.BRI
      case 'BNI':
        return Assets.BNI
      case 'MANDIRI':
        return Assets.MANDIRI
      case 'PERMATA':
        return Assets.PERMATA
      default:
        return Assets.BCA
    }
  }
  // console.log(listBank)
  return (
    <View style={[st.screen]}>
      <InputBase
        placeholder="Cari Nama Bank"
        iconSet="FeatherIcon"
        iconRight="search"
      />
      <View style={{ marginTop: 20 }}>
        {listBank !== null &&
          listBank.map((data, index) => {
            console.log(data)
            return (
              <Pressable
                onPress={() => {
                  setSelectedBank(data)
                }}
                style={[Layout.row, st.row]}
              >
                <FastImage
                  style={{ width: 60, height: 30, marginRight: 20 }}
                  source={getBankImage(data.bank_code)}
                ></FastImage>
                <Text style={{ fontSize: 16, color: Colors.neutralBlack01 }}>
                  {data.nama_bank}
                </Text>
              </Pressable>
            )
          })}
      </View>
    </View>
  )
}

const st = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    padding: 20,
  },
  row: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomColor: '#e6e6e6',
    borderBottomWidth: 1,
  },
})
export default RefundPilihBank
