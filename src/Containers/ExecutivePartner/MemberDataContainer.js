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
import { Divider } from '@rneui/base'
import FastImage from 'react-native-fast-image'

const MemberDataContainer = props => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [] = useState()

  // console.log()
  const identity = props.route.params.data
  useEffect(() => {}, [])
  return (
    <View style={[st.screen]}>
      <Text style={[st.h1]}>KTP</Text>
      <Divider style={{ marginVertical: 10 }} />
      <Text style={[st.h2]}>Nomor KTP</Text>
      <View
        style={[Layout.row, { justifyContent: 'space-between', marginTop: 10 }]}
      >
        <Text style={[st.h3]}>{identity.ktp}</Text>
        <FeatherIcon color={'#898989'} size={16} name="eye-off" />
      </View>
      <Text style={[st.h2, { marginTop: 20 }]}>Foto</Text>
      <FastImage
        source={{
          uri: identity.ktp_photo,
        }}
        style={{
          width: 200,
          height: 120,
          backgroundColor: '#D5DAE4',
          borderRadius: 10,
          marginTop: 10,
        }}
      />

      {/* <Text style={[st.h1, { marginTop: 40 }]}>NPWP</Text>
      <Divider style={{ marginVertical: 10 }} />
      <Text style={[st.h2]}>Nomor NPWP</Text>
      <View
        style={[Layout.row, { justifyContent: 'space-between', marginTop: 10 }]}
      >
        <Text style={[st.h3]}>{identity.npwp}</Text>
        <FeatherIcon color={'#898989'} size={16} name="eye-off" />
      </View>
      <Text style={[st.h2, { marginTop: 20 }]}>Foto</Text>
      <FastImage
        source={{
          uri: identity.npwp_photo,
        }}
        style={{
          width: 200,
          height: 120,
          backgroundColor: '#D5DAE4',
          borderRadius: 10,
          marginTop: 10,
        }}
      /> */}
    </View>
  )
}

const st = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: 'white',
    flex: 1,
  },
  h1: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1D1619',
  },
  h2: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#6C6C6C',
  },
  h3: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1D1619',
  },
})
export default MemberDataContainer
