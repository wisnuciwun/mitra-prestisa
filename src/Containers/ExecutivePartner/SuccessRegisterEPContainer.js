import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  //   Share,
} from 'react-native'
import { useTheme } from '@/Hooks'
import { Colors, SIZES } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FastImage from 'react-native-fast-image'
import { Assets } from '@/Theme/Assets'
import Spacer from '@/Components/Base/Spacer'
import YoutubePlayer from 'react-native-youtube-iframe'
import InputBase from '@/Components/Base/InputBase'
import FormV1 from '@/Components/Base/FormV1'
import { ScrollView } from 'react-native-gesture-handler'
import ButtonBottomFloatingColumn from '@/Components/Payment/ButtonBottomFloatingColumn'
import { STYLES } from '@/Theme/Styles'
import ButtonBase from '@/Components/Base/ButtonBase'
import Share from 'react-native-share'

const SuccessRegisterEPContainer = props => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [] = useState()

  const shareHandler = async () => {
    // const url = btoa('url')
    options = {
      message: 'http://google.com',
      title: 'Bagikan Kode Referal',
      // url: Buffer.from('url').toString('base64'),
    }
    Share.open(options)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        err && console.log(err)
      })
  }

  useEffect(() => {}, [])
  return (
    <ScrollView style={[st.screen]}>
      <FastImage source={Assets.welcome} style={{ width: 171, height: 48 }} />
      <Spacer height={20} />
      <Text>Horee! Akun kamu sudah Executive Partner. </Text>
      <Spacer height={20} />
      <Text style={st.title}>Cek Video-nya yuk</Text>
      <Text style={st.paragraph}>
        Melalui video ini kamu bisa lebih jaaauh tahu lagi mengenai E.P dan
        beragam keuntungannya
      </Text>
      <Spacer height={20} />
      <YoutubePlayer
        height={(windowWidth * 9) / 16}
        play={false}
        videoId={'84WIaK3bl_s'}
      />

      <Spacer height={20} />
      <Text style={st.title}>Executive Partner (EP) </Text>
      <Text style={st.paragraph}>
        Program Executive Partner (EP) Prestisa adalah program khusus customer
        setia Prestisa, yang ingin mencoba untuk berbisnis dengan tanpa modal
        dan cukup berbekal keinginan yang kuat dan rasa percaya diri untuk
        memasarkan langsung produk Prestisa baik kepada kerabat dekat, teman,
        kolega, dan ataupun melalui media sosial.
      </Text>
      <View
        style={[
          {
            marginTop: 50,
            height: 150,
            // width: SIZES.width_window,
            // backgroundColor: 'red',
            // paddingHorizontal: SIZES.margin_h,
            justifyContent: 'center',
            // elevation: 20, // @platform android
            // backgroundColor
            // position: 'absolute',
            // bottom: 0,
          },
          //   STYLES.shadow_bottom,
        ]}
      >
        <ButtonBase
          onPress={() => {
            shareHandler()
          }}
          title={'Share kode referal'}
          leftIcon={
            <FeatherIcon
              style={{ marginRight: 10 }}
              name={'share-2'}
              size={20}
              color={Colors.white}
            />
          }
        />
        <Spacer height={20} />

        <ButtonBase
          onPress={() => {
            navigation.navigate('Main')
          }}
          borderStyle={{ borderColor: Colors.neutralBlack02 }}
          textColorTypeOutline={Colors.neutralBlack02}
          title={'Pergi ke Beranda'}
          mode="outline"
          textStyle={{ color: Colors.neutralBlack02 }}
        />
        <Spacer height={50} />
      </View>
    </ScrollView>
  )
}

const st = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paragraph: {
    lineHeight: 22,
  },
})
export default SuccessRegisterEPContainer
