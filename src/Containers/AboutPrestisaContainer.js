import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { useTheme } from '@/Hooks'
import { Colors } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FastImage from 'react-native-fast-image'
import { Assets } from '@/Theme/Assets'
import Spacer from '@/Components/Base/Spacer'
import { Fonts } from '@/Theme'

const AboutPrestisaContainer = props => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [] = useState()

  useEffect(() => {}, [])

  const Title1 = ({ text }) => {
    return <Text style={[st.title1, Fonts.fontBaker]}>{text}</Text>
  }

  const Title2 = ({ number, text }) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
        <Text style={[st.titleNumber]}>{number}</Text>
        <View style={[st.containertitle]}>
          <Text style={[st.title3, Fonts.fontBaker]}>{text}</Text>
        </View>
      </View>
    )
  }

  const ImageAbout = ({ source }) => {
    return (
      <FastImage
        source={source}
        style={{
          width: windowWidth - 40,
          height: 400,
          borderRadius: 20,
          alignSelf: 'center',
        }}
      />
    )
  }

  return (
    <ScrollView style={[st.screen]}>
      <FastImage
        source={Assets.bannerAbout}
        style={{ width: windowWidth, height: 200 }}
      />
      <View style={{ paddingHorizontal: 20 }}>
        <Spacer height={20} />
        <Text>Prestisa, Easiest Way to Send Flowers</Text>
        <Title1 text={'We Serve the Best Quality and Experience'}></Title1>
        <Spacer height={20} />
        <Text style={[st.paragraph]}>
          Prestisa menghadirkan layanan pesanan 24 Jam danmemiliki lebih dari
          4000 supplier dan florist yang tersebar di seluruh Indonesia,
          memudahkan kamu untuk mengirim bunga ataupun hadiah darimanapun dan
          kapanpun.
        </Text>
        <Text style={[st.paragraph]}>
          Pilihan produk yang banyak dan variatif, serta bunga yang dijamin
          kesegarannya.
        </Text>
        <Spacer height={20} />
        <Title1 text={'Our Excellence'}></Title1>
        <Spacer height={20} />
        <Title2 number={'01'} text={'Make giving gift easier'} />
        <Spacer height={0} />
        <Text style={[st.paragraph]}>
          Kirim bunga semudah itu! Dengan customer service yang selalu ada 24/7
          dan siap melayani kamu. Prestisa siap mempermudah kamu untuk kirim
          bunga ke siapapun, kapanpun dan dimanapun.
        </Text>
        <ImageAbout source={Assets.about1}></ImageAbout>
        <Spacer height={20} />

        <Title2 number={'02'} text={'Best gift for someone you loved'} />
        <Text style={[st.paragraph]}>
          Jangan biarkan lamanya pengiriman dan kurangnya varian bunga
          menghalangi kamu untuk memberikan hadiah yang terbaik untuk orang
          tersayang.
        </Text>
        <Text style={[st.paragraph]}>
          Dirangkai oleh florist terbaik, dengan pelayanan dan pengiriman yang
          pasti tepat waktu, Prestisa akan pastikan bahwa orang yang kamu sayang
          bisa mendapatkan hadiah terbaik.
        </Text>

        <ImageAbout source={Assets.about2}></ImageAbout>
        <Spacer height={20} />
        <Title2 number={'03'} text={'Most Variative Hand Bouquet'} />
        <Text style={[st.paragraph]}>
          Ada lebih dari 4000+ florist dengan variasi produk lebih dari 1500+
          varian hand bouquet dan jenis bunga lainnya yang bisa kamu jadikan
          hadiah, dekorasi dan keperluan lainnya yang kamu butuhkan.
        </Text>
        <ImageAbout source={Assets.about3}></ImageAbout>
        <Spacer height={50} />
      </View>
    </ScrollView>
  )
}

const st = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    flex: 1,
  },
  title1: {
    fontSize: 28,
    color: Colors.primary,
    fontWeight: '600',
  },
  paragraph: {
    lineHeight: 22,
    fontSize: 16,
    marginBottom: 20,
  },
  titleNumber: {
    fontSize: 80,
    color: 'rgba(227, 218, 223, 0.5);',
    fontWeight: 'bold',
  },
  title3: { fontSize: 24, color: '#000' },
  containertitle: { position: 'absolute', bottom: 20, left: 30 },
})
export default AboutPrestisaContainer
