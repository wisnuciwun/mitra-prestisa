import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native'
import { useTheme } from '@/Hooks'
import PropTypes from 'prop-types'
import { Colors } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import FastImage from 'react-native-fast-image'
import ButtonBase from '../Base/ButtonBase'
import { Button } from '@rneui/themed'

const FilterEmpty = props => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const dispatch = useDispatch()

  useEffect(() => {}, [])
  return (
    <View style={[styles.screen]}>
      <Image
        style={{ width: 170, height: 104, marginBottom: 20 }}
        resizeMode="contain"
        source={Images.EmptyFilter}
      ></Image>
      <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
        Yaah, Barang yang kamu mau di filter ini belum ada
      </Text>
      <Text style={{ textAlign: 'center' }}>
        Kamu bisa coba mengurangi atau ubah filter yang baru saja digunakan
      </Text>
      <Button
        buttonStyle={{
          backgroundColor: '#fff',
          paddingHorizontal: 40,
          borderRadius: 20,
          marginTop: 20,
          height: 40,
          paddingVertical: 5,
          borderColor: Colors.neutralGray03,
          borderWidth: 1,
        }}
        titleStyle={{ color: Colors.neutralBlack02 }}
        color="#fff"
        style={styles.button}
        title={'Reset Filter'}
      ></Button>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    marginTop: 30,
    width: 200,
    alignSelf: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#fff',
    borderColor: Colors.neutralGray03,
    borderWidth: 1,
  },
})
export default FilterEmpty
