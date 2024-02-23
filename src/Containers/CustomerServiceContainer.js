import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import NavBarV1 from '@/Components/Base/NavBarV1'
import FastImage from 'react-native-fast-image'
import { Assets } from '@/Theme/Assets'
import { Divider } from '@rneui/base'
import { Colors, Fonts, SIZES } from '@/Theme/Variables'
import Spacer from '@/Components/Base/Spacer'
import IonIcon from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import ModalWhatsApp from '@/Components/CustomerService/ModalWhatsApp'
import axios from 'axios'
import { Config } from '@/Config'
import { parseWA } from '@/Components/CustomerService/Helper'

const CustomerServiceContainer = props => {
  const navigation = useNavigation()

  const [showModalWA, setShowModalWA] = useState(false)
  const [dataWA, setDataWA] = useState({ phone: '', text: '' })

  const handleShowModalWA = () => {
    setShowModalWA(!showModalWA)
  }

  const xhrGetCustomerInfo = () => {
    axios
      .get(Config.CUSTOMER_APP + '/customer-info')
      .then(({ data }) => {
        setDataWA(parseWA(data.data['customer-cs-wa']))
      })
      .catch(err => {
        console.log('ERROR_CS', err)
      })
  }

  React.useLayoutEffect(() => {
    NavBarV1({ titleName: 'Customer Service', navigation: navigation })
  }, [])

  useEffect(() => {
    xhrGetCustomerInfo()
  }, [])

  const BoxTouch = ({
    text,
    icon,
    colorGradient = ['#408C9D', '#70AF7E'],
    onPress,
  }) => (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        start={{ x: 0.25, y: 0.5 }}
        end={{ x: 0.75, y: 0.5 }}
        locations={[0.1, 0.87]}
        colors={colorGradient}
        style={{
          height: 116,
          width: 116,
          borderRadius: 6,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        useAngle={true}
        angle={110.5}
      >
        {React.createElement(icon)}
        <Spacer height={13} />
        <Text
          style={{
            color: Colors.neutralGray07,
            width: 100,
            textAlign: 'center',
            fontFamily: Fonts.medium,
            fontSize: 16,
            lineHeight: 22.4,
          }}
        >
          {text}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  )

  return (
    <View style={[{ flex: 1, backgroundColor: 'white' }]}>
      <View
        style={{
          marginHorizontal: SIZES.margin_h,
          alignItems: 'center',
          marginVertical: 32,
        }}
      >
        <FastImage
          source={Assets.cs_color_3x}
          style={{ height: 112, width: 144 }}
        />
        <Spacer height={6} />
        <View style={{ width: 265 }}>
          <Text
            style={{
              fontFamily: Fonts.medium,
              fontSize: 16,
              color: Colors.neutralBlack02,
              textAlign: 'center',
            }}
          >
            Halo, kami siap membantu anda
          </Text>
          <Spacer height={8} />
          <Text
            style={{
              fontFamily: Fonts.regular,
              fontSize: 14,
              color: Colors.neutralBlack02,
              lineHeight: 19.6,
              textAlign: 'center',
            }}
          >
            Layanan pelanggan kami akan secara aktif melayani dari pukul 08.00
            -17.00 WIB.
          </Text>
        </View>
      </View>
      <Divider width={6} color={Colors.neutralGray05} />
      <Spacer height={40} />
      <View style={{ alignItems: 'center' }}>
        <Text
          style={{
            fontFamily: Fonts.medium,
            fontSize: 16,
            color: Colors.neutralBlack02,
            textAlign: 'center',
          }}
        >
          Bagaimana anda ingin menghubungi kami?
        </Text>
        <Spacer height={28} />
        <View style={{ flexDirection: 'row' }}>
          <BoxTouch
            icon={() => (
              <IonIcon
                name={'logo-whatsapp'}
                size={23}
                color={Colors.neutralGray07}
              />
            )}
            text="Melalui WhatsApp"
            onPress={handleShowModalWA}
          />
          <Spacer width={24} />
          <BoxTouch
            icon={() => (
              <MaterialIcon
                name={'message-text-outline'}
                size={23}
                color={Colors.neutralGray07}
              />
            )}
            colorGradient={[Colors.neutralGray04, Colors.neutralGray04]}
            text="Under Construction"
            onPress={() => navigation.navigate('UnderConstruction')}
          />
        </View>
      </View>
      <ModalWhatsApp
        modalVisible={showModalWA}
        onClose={handleShowModalWA}
        phone={dataWA.phone}
        text={dataWA.text}
      />
    </View>
  )
}

export default CustomerServiceContainer

const styles = StyleSheet.create({})
