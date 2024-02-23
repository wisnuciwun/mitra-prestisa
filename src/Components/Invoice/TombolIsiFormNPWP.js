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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FastImage from 'react-native-fast-image'
import { Assets } from '@/Theme/Assets'

const TombolIsiFormNPWP = ({ viewForm }) => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [] = useState()

  useEffect(() => {}, [])
  return (
    <View style={[st.screen]}>
      <Pressable
        onPress={viewForm}
        style={{
          flexDirection: 'row',
          padding: 10,
          borderColor: '#ccc',
          borderWidth: 1,
          borderRadius: 5,
          marginHorizontal: 20,
          //   backgroundColor: 'red',
          alignItems: 'center',
        }}
      >
        <FeatherIcon size={20} name="plus-circle"></FeatherIcon>
        <Text style={{ marginLeft: 10, color: Colors.neutralBlack01 }}>
          Isi Kelengkapan Dokumen
        </Text>
      </Pressable>
      <View style={st.container}>
        <FastImage
          style={{ width: 50, height: 50, marginBottom: 20 }}
          source={Assets.sedih}
        ></FastImage>

        <Text style={st.message}>
          Kamu belum menambahkan dokumen pendukung untuk faktur pajak
        </Text>
      </View>
    </View>
  )
}

const st = StyleSheet.create({
  screen: { paddingHorizontal: 0 },
  container: {
    marginTop: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 5, marginTop: 30 },
  message: { textAlign: 'center', fontSize: 16, lineHeight: 25 },
})
export default TombolIsiFormNPWP
