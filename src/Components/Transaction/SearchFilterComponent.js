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
import InputBase from '../Base/InputBase'
import FeatherIcon from 'react-native-vector-icons/Feather'
import InputSearch from '../Base/InputSearch'
import InputTextWithCounter from '../MakeOrder/InputTextWithCounter'

const SearchFilterComponent = ({ showModal }) => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const dispatch = useDispatch()

  useEffect(() => {}, [])
  return (
    <TouchableOpacity style={[styles.screen, Layout.row]} onPress={showModal}>
      <View
        style={{
          flex: 2,
          marginRight: 20,
          // backgroundColor: 'red',
          marginTop: -10,
        }}
      >
        {/* <InputBase
          placeholder="Cari Transaksi"
          iconRight="magnify"
          iconSize={30}
        /> */}
      </View>
      <View style={[Layout.row, { alignItems: 'center', flex: 1 }]}>
        <Text style={{ marginRight: 5 }}>Semua Status</Text>
        <FeatherIcon size={24} name="chevron-down"></FeatherIcon>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
})
export default SearchFilterComponent
