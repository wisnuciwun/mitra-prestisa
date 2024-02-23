import ButtonBase from '@/Components/Base/ButtonBase'
import FormV1 from '@/Components/Base/FormV1'
import LabelText from '@/Components/Base/LabelText'
import Spacer from '@/Components/Base/Spacer'
import { useTheme } from '@/Hooks'
import { Colors } from '@/Theme/Variables'
import { useNavigation } from '@react-navigation/native'
import { Input } from '@rneui/themed'
import React, { useEffect, useState } from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { useToast } from 'react-native-toast-notifications'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import axios from 'axios'
import { setAutoFill, setLogin } from '../../../Store/loginSlice'
import { useDispatch, useSelector } from 'react-redux'
import FastImage from 'react-native-fast-image'
import CenterModal from '@/Components/Base/CenterModal'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setGuest } from '@/Store/guestSlice'
import { Config } from '@/Config'
import { auth } from '@/Helper/apiKit'

const successPayload = {
  input: 'test@test.com',
  password: 'abcd12345',
  fbasekey: '323',
}

const LoginPhoneOrEmail = props => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const fcmToken = useSelector(state => state.tokenList.fcm_token)
  const [secure, setsecure] = useState(true)
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [completeForm, setCompleteForm] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorPassword, setErrorPassword] = useState(false)
  const [errorIdentifier, setErrorIdentifier] = useState(false)
  const [isModalVisible, setModalVisible] = useState(
    props.route.params.successResetPassword,
  )
  const toast = useToast()

  const toggleModal = bool => {
    setModalVisible(bool)
  }

  useEffect(() => {
    if (isModalVisible) {
      setTimeout(() => {
        setModalVisible(false)
      }, 3500)
    }
  }, [])

  useEffect(() => {
    if (identifier && password) {
      setCompleteForm(false)
    } else {
      setCompleteForm(true)
    }
  }, [identifier, password])

  const handleIndentifier = identifier => {
    setIdentifier(identifier)
    setErrorIdentifier(false)
  }

  const handlePassword = password => {
    const _password = /[0-9]/.test(password)
    setPassword(password)
    // if (_password && password.length > 6) {
    setErrorPassword(false)
    // } else {
    //   setErrorPassword(true)
    // }
  }

  const handleLogin = () => {
    setLoading(true)
    // axios
    //   .post(Config.CUSTOMER_APP + '/auth/login', {
    //     input: identifier,
    //     password: password,
    //     fbasekey: fcmToken,
    //   })
    auth
      .login({
        input: identifier,
        password: password,
      })
      .then(res => {
        setLoading(false)
        if (res.data.status === 'success') {
          dispatch(setLogin(res.data.data))
          dispatch(setAutoFill({ email: res.data.data.user.email }))
          dispatch(setGuest({ isGuest: false }))
          AsyncStorage.setItem('@login', 'true').then(() => {
            navigation.reset({ index: 0, routes: [{ name: 'Main' }] })
          })
        }
      })
      .catch(error => {
        setLoading(false)
        const err_response = error.response.data.data
        console.log('ERROR', error.response.data)
        const message = err_response.message
        if (/belum/gi.test(message)) {
          setErrorIdentifier(true)
          setErrorPassword(false)
        } else {
          setErrorIdentifier(true)
          setErrorPassword(true)
        }
        toast.show(message, {
          type: 'custom_danger',
          duration: 4500,
          data: { height: 270 },
        })
      })
  }

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Icon
          style={{ marginLeft: 20 }}
          size={20}
          onPress={() => {
            navigation.goBack()
          }}
          name="arrow-left"
        />
      ),
      title: 'Masuk',
    })
  }, [])

  /**
   * navigation.goBack() is not function when code below is active
   *
   *
   */
  // React.useEffect(
  //   () =>
  //     navigation.addListener('beforeRemove', e => {
  //       console.log(e.data.action.type)
  //       // Prevent default behavior of leaving the screen
  //       if (e.data.action.type == 'GO_BACK') {
  //         console.log('Go Back')

  //         e.preventDefault()
  //       }
  //     }),
  //   [navigation],
  // )

  return (
    <ScrollView style={[styles.screen, Layout.fill]}>
      <View>
        <ImageBackground
          style={{
            paddingHorizontal: 20,
            marginBottom: 40,
            height: 150,
            backgroundColor: 'black',
            opacity: 0.9,
            justifyContent: 'center',
            alignContent: 'center',
          }}
          resizeMode="cover"
          source={Images.header_bunga}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <View
                style={{
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: 26,
                    color: Colors.white,
                    fontFamily: 'Poppins-Bold',
                    alignItems: 'center',
                  }}
                >
                  Selamat Datang
                </Text>
                <Text
                  style={{
                    fontSize: 26,
                    color: Colors.white,
                    fontFamily: 'Poppins-Bold',
                  }}
                >
                  Kembali
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  flex: 1,
                  marginBottom: 2,
                }}
              >
                <FastImage
                  source={Images.logo_6}
                  style={{ height: 30, width: 30 }}
                />
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <FormV1
          label="Email atau No. Hp"
          placeholder="Masukkan E-mail atau no.hp"
          eyeActive={false}
          alert={errorIdentifier}
          footlabelActive={false}
          value={identifier}
          onChangeText={handleIndentifier}
        />
        <Spacer height={20} />
        <FormV1
          label="Passsword"
          placeholder="******"
          footlabel=""
          alert={errorPassword}
          value={password}
          onPressSecureText={() => setsecure(!secure)}
          secureTextEntry={secure}
          onChangeText={handlePassword}
          error={errorPassword}
          errorMessage={''}
        />

        <Spacer height={17} />
        <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgetPassword')}
            style={
              {
                // backgroundColor: 'red'
              }
            }
          >
            <Text style={{ color: Colors.primary, fontSize: 15 }}>
              Lupa Password
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[Gutters.largeVPadding]}>
          <ButtonBase
            onPress={() => handleLogin()}
            disable={completeForm}
            title={'Masuk'}
            mode={'color'}
            style={{ height: 58 }}
            loading={loading}
          />
        </View>
      </View>
      <View style={[{ alignSelf: 'center' }]}>
        <Text
          style={
            ([Fonts.textSmall],
            {
              fontWeight: '400',
              fontFamily: 'Roboto-Regular',
              fontSize: 16,
              color: Colors.neutralBlack01,
            })
          }
        >
          Belum punya akun?{'  '}
          <Text
            onPress={() => {
              navigation.navigate('FormDaftar', {
                GoogleSSONotRegistered: false,
              })
            }}
            style={{ color: Colors.primary }}
          >
            Daftar
          </Text>
        </Text>
      </View>
      <CenterModal isModalVisible={isModalVisible} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  formGroup: {
    // marginBottom: 25,
  },
})
export default LoginPhoneOrEmail
