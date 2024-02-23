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
import FastImage from 'react-native-fast-image'
import { Assets } from '@/Theme/Assets'
import InputBase from '../Base/InputBase'
import { Input } from '@rneui/themed'
import Spacer from '../Base/Spacer'

const HeaderBantuan = ({ onChangeText }) => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [] = useState()

  useEffect(() => {}, [])
  return (
    <View style={[st.screen]}>
      <FastImage
        source={Assets.BackgroundBantuan}
        // resizeMode="cover"
        style={{
          width: windowWidth,
          height: 90,
          paddingTop: 40,
          //   marginBottom: 40,
        }}
      ></FastImage>
      <View style={{ marginTop: -40, paddingHorizontal: 20 }}>
        <Text style={{ fontWeight: '600', color: Colors.primary }}>Halo,</Text>
        <Text style={{ fontSize: 16, fontWeight: '600' }}>
          Ada yang bisa kami bantu?
        </Text>
        <Input
          onPressIn={() => {
            navigation.navigate('PusatBantuanSearch')
          }}
          inputContainerStyle={{ paddingHorizontal: 0 }}
          inputStyle={{ letterSpacing: -0.5, color: Colors.neutralGray01 }}
          onChangeText={text => {
            onChangeText(text)
          }}
          rightIcon={() => (
            <FeatherIcon
              size={20}
              color={Colors.neutralGray02}
              name="search"
            ></FeatherIcon>
          )}
          containerStyle={{
            backgroundColor: 'white',
            borderRadius: 5,
            borderColor: Colors.neutralGray03,
          }}
          placeholder="Ketik kata kunci (misal: Promosi Berlangsung)"
        />
        <Spacer height={20} />
        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
          Pilih topik sesuai kendala kamu
        </Text>
        <Spacer height={10} />
      </View>
    </View>
  )
}

const st = StyleSheet.create({
  screen: {},
})
export default HeaderBantuan
