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
import Spacer from '../Base/Spacer'

const FooterBantuan = ({ faq, data }) => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [] = useState()

  useEffect(() => {}, [])
  return (
    <View style={[st.screen]}>
      <Spacer height={20} />

      {faq == true && (
        <>
          <Spacer height={10} />
          <Text
            style={{ fontSize: 14, fontWeight: 'bold', paddingHorizontal: 20 }}
          >
            Yang sering ditanyakan
          </Text>
          <Spacer height={10} />
          <Text
            onPress={() => {
              const item = data[3]
              navigation.navigate('PusatBantuanQuestion', {
                question: item.question,
                title: item.name,
              })
            }}
            style={st.faq}
          >
            Pertanyaan seputar bebas ongkir
          </Text>
          <Text
            onPress={() => {
              const item = data[5]
              navigation.navigate('PusatBantuanQuestion', {
                question: item.question,
                title: item.name,
              })
            }}
            style={st.faq}
          >
            Komplain Pesanan
          </Text>
          <Text
            onPress={() => {
              const item = data[4]
              navigation.navigate('PusatBantuanQuestion', {
                question: item.question,
                title: item.name,
              })
            }}
            style={st.faq}
          >
            Pesanan dibatalkan oleh Prestisa
          </Text>
        </>
      )}
      <View style={{ alignItems: 'center', paddingVertical: 30 }}>
        <Text
          style={{
            color: Colors.neutralBlack01,
            fontWeight: 'bold',
            // marginTop: 10,
            fontSize: 14,
          }}
        >
          Tidak menemukan Jawaban Anda?
        </Text>
        <Text
          onPress={() => {
            navigation.navigate('CustomerService')
          }}
          style={{
            color: Colors.primary,
            fontWeight: 'bold',
            marginTop: 10,
            fontSize: 14,
          }}
        >
          Hubungi Kami
        </Text>
      </View>
    </View>
  )
}

const st = StyleSheet.create({
  screen: {},
  faq: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
  },
})
export default FooterBantuan
