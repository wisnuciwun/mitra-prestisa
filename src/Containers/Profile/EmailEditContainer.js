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
import Input from '@/Components/Base/InputTextBottomLine'
import ButtonBottomFloating from '@/Components/ButtonBottomFloating'
// import ModalCenterConfirmation from '@/Components/TulisUlasan/ModalCenterConfirmation'
// import ModalCenter from '@/Components/Bas'
import ModalCenter from '@/Components/Base/ModalCenter'
import FastImage from 'react-native-fast-image'
import { Assets } from '@/Theme/Assets'
import { Divider } from '@rneui/base'
import TextTouchable from '@/Components/RingkasanPesanan/TextTouchable'
import Spacer from '@/Components/Base/Spacer'

const EmailEditContainer = props => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [] = useState()
  const state = useSelector(state => state)
  const [disable, setDisable] = useState(true)
  const [errorNew, setErrorNew] = useState(false)
  const [emailOld, setEmailOld] = useState('')
  const [emailNew, setEmailNew] = useState('')
  const [emailValid, setEmailValid] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordHide, setPasswordHide] = useState(false)
  const [modal, setModal] = useState(false)

  const handleEmail = args => {
    setEmailNew(args)
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(args)) {
      setErrorNew(false)
      setEmailValid(true)
    } else {
      setErrorNew(true)
      setEmailValid(false)
    }
  }

  const handlePassword = args => {
    setPassword(args)
    if (args.length > 5) {
      setDisable(false)
    }
  }

  const handleSubmit = args => {
    console.log('submit')
    setModal(true)
  }

  useEffect(() => {}, [])
  return (
    <>
      <View style={[st.screen, Layout.fill]}>
        <View>
          <Input
            label="Email Lama"
            value={emailOld}
            onChangeText={text => setEmailOld(text)}
          />
          <Input
            label="Email Baru"
            value={emailNew}
            isError={errorNew}
            onChangeText={text => handleEmail(text)}
            errorMessage="Harap mengisi dengan alamat email yang benar"
            errorStyle={{ fontFamily: Fonts.light }}
            rightIcon={
              emailValid ? (
                <Icon
                  name="check-circle"
                  size={20}
                  style={{ color: Colors.otherGreen01 }}
                />
              ) : (
                <></>
              )
            }
          />
          {emailValid ? (
            <View style={{ marginTop: 10 }}>
              <Text style={{ color: '#0B4DBF', fontWeight: '600' }}>
                Silahkan masukkan password akun
              </Text>
              <Input
                label="Password"
                onChangeText={text => handlePassword(text)}
                value={passwordHide ? '**********' : password}
                errorMessage="Password min. 6 karakter kombinasi huruf dan angka"
                rightIcon={
                  <FeatherIcon
                    name={passwordHide ? 'eye-off' : 'eye'}
                    size={20}
                    onPress={() => setPasswordHide(!passwordHide)}
                  />
                }
                errorStyle={{ fontFamily: Fonts.light }}
              />
              <Text style={{ color: Colors.primary }}>Lupa Password?</Text>
            </View>
          ) : (
            <></>
          )}
        </View>
        <View style={{ position: 'absolute', top: 450 }}>
          <ButtonBottomFloating
            label="Simpan"
            onPress={() => handleSubmit()}
            shadow={false}
            disable={disable}
          />
        </View>
      </View>
      <ModalCenter
        isVisible={modal}
        heightModal={null}
        widthModal={256}
        {...props}
      >
        <View style={{ marginVertical: 24, alignItems: 'center' }}>
          <FastImage
            source={Assets.check_mark_outline_primary_big_3x}
            style={{ height: 40, width: 40 }}
          />
          <Spacer height={8} />
          <Text
            style={{
              textAlign: 'center',
              lineHeight: 19.6,
              marginHorizontal: 16,
              color: Colors.neutralBlack02,
              fontFamily: Fonts.regular,
              fontSize: 14,
            }}
          >
            Perubahan alamat Email berhasil
          </Text>
        </View>
        <Divider width={1} color={Colors.neutralGray05} />
        <View
          style={{
            marginVertical: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TextTouchable
            text="OK, Saya Mengerti"
            onPress={() => setModal(false)}
            textStyles={{ color: Colors.primary }}
          />
        </View>
      </ModalCenter>
    </>
  )
}

const st = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    padding: 20,
  },
})
export default EmailEditContainer
