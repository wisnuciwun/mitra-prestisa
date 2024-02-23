import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import NavBarV2 from '@/Components/Base/NavBarV2'
import { Colors } from '@/Theme/Variables'
import LabelText from '@/Components/Base/LabelText'
import { Input } from '@rneui/themed'
import Spacer from '@/Components/Base/Spacer'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTheme } from '@/Hooks'
import InputTwoIconRight from '@/Components/Base/InputTextTwoIconRight'
import InputTextTwoIconRight from '@/Components/Base/InputTextTwoIconRight'
import FormV1 from '@/Components/Base/FormV1'
import ButtonBase from '@/Components/Base/ButtonBase'
import FastImage from 'react-native-fast-image'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useToast } from 'react-native-toast-notifications'

const ResetPassword = () => {
  const { Fonts, Gutters, Layout, Images } = useTheme()
  const navigation = useNavigation()
  const [secure, setsecure] = useState(true)
  const [secure2, setsecure2] = useState(true)
  const [password, setpassword] = useState('')
  const toast = useToast()

  // validasi form
  const [validPassword, setvalidPassword] = useState(true)
  const [validPassword2, setvalidPassword2] = useState(true)

  const [errorSubmit, setErrorSubmit] = useState(false)

  const memoForgotPassword = useSelector(
    state => state.forgetPassword.forgetPassword,
  )

  const errorstyle = { height: 54, borderColor: Colors.otherRed }

  React.useLayoutEffect(() => {
    NavBarV2({
      navigation: navigation,
      sourceImageLeft: Images.icon_arrow_left_3x,
      backToRouteName: 'LoginPhoneOrEmail',
      headerRightTitle: 'Pusat Bantuan',
      sourceImageRight: Images.icon_headset_active_3x,
      paramsRoute: { successResetPassword: false },
    })
  }, [navigation])

  useEffect(() => {
    if (errorSubmit) {
      toast.show('OK', {
        type: 'custom_success',
      })
    }
  }, [errorSubmit])

  const debounce = func => {
    let timer
    return function (...args) {
      const context = this
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        timer = null
        func.apply(context, args)
      }, 500)
    }
  }

  const handlerSubmitButton = () => {
    const url =
      'https://lavender.prestisa.id/api/customer-app/auth/reset-password'
    const data = {
      email: memoForgotPassword.email,
      // kode: memoForgotPassword.code,
      kode: 'benar!',
      new_password: password,
      // new_password: 'abcd12345', //password lama
      // new_password: 'ddddad222', //password baru
    }

    axios
      .post(url, data)
      .then(res => {
        if (res.data.status === 'success') {
          navigation.navigate('LoginPhoneOrEmail', {
            successResetPassword: true,
          })
        } else if (res.data.statusCode >= 400 && res.data.statusCode < 500) {
          toast.show(res.data.data.message, {
            type: 'custom_danger',
            duration: 4500,
            data: { height: 100 },
          })
        }
      })
      .catch(err => {
        console.log('ERR_RESET_PASSWORD', err.response.data)
        if (
          err.response.data.statusCode >= 400 &&
          err.response.data.statusCode < 500
        ) {
          toast.show(err.response.data.data.message, {
            type: 'custom_danger',
            duration: 4500,
            data: { height: 120 },
          })
        }
      })
  }

  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        console.log(e.data.action.type)
        // Prevent default behavior of leaving the screen
        if (e.data.action.type == 'GO_BACK') {
          console.log('Go Back')
          e.preventDefault()
        }
      }),
    [navigation],
  )

  return (
    <ScrollView style={{ backgroundColor: Colors.white }}>
      <View style={{ paddingHorizontal: 22 }}>
        <View style={{ paddingVertical: 20 }}>
          <Text
            style={{
              fontSize: 20,
              color: Colors.neutralBlack02,
              fontFamily: 'Roboto-Medium',
              fontWeight: '500',
            }}
          >
            Atur ulang password
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: Colors.neutralGray01,
              fontFamily: 'Roboto-Regular',
              fontWeight: '400',
            }}
          >
            Silakan buat password baru untuk akun anda
          </Text>
        </View>

        <View style={styles.formGroup}>
          <Input
            style={{
              fontFamily: 'Roboto-Regular',
              fontSize: 16,
              fontWeight: '600',
            }}
            labelStyle={{
              marginBottom: 4,
              fontSize: 14,
              fontFamily: 'Roboto-Regular',
              fontWeight: '400',
              color: Colors.neutralBlack02,
            }}
            label="Password"
            inputContainerStyle={[
              !validPassword
                ? errorstyle
                : { height: 54, borderColor: Colors.neutralGray03 },
            ]}
            onChangeText={debounce(async text => {
              const pass = /[0-9]/.test(text)
              if (pass && text.length > 6) {
                setvalidPassword(true)
                setpassword(text)
              } else {
                setvalidPassword(false)
              }
            }, 300)}
            secureTextEntry={secure}
            placeholder="Masukkan password"
            errorMessage={'Password min. 6 karakter kombinasi huruf & angka'}
            errorStyle={{
              paddingTop: 4,
              margin: 0,
              fontSize: 12,
              fontFamily: 'Roboto-Regular',
              color: !validPassword ? Colors.otherRed : Colors.neutralBlack02,
            }}
            rightIcon={
              secure ? (
                <TouchableOpacity
                  onPress={() => {
                    setsecure(!secure)
                  }}
                  style={{
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 30,
                  }}
                >
                  <FastImage
                    source={Images.icon_eye_off_3x}
                    style={{
                      height: 24,
                      width: 24,
                    }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setsecure(!secure)
                  }}
                  style={{
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 30,
                  }}
                >
                  <FastImage
                    source={Images.icon_eye_3x}
                    style={{
                      height: 24,
                      width: 24,
                    }}
                  />
                </TouchableOpacity>
              )
            }
          ></Input>
        </View>
        <Spacer height={20} />
        <View style={styles.formGroup}>
          <Input
            style={{
              fontFamily: 'Roboto-Regular',
              fontSize: 16,
              fontWeight: '600',
            }}
            labelStyle={{
              marginBottom: 4,
              fontSize: 14,
              fontFamily: 'Roboto-Regular',
              fontWeight: '400',
              color: Colors.neutralBlack02,
            }}
            label="Ketik Ulang Password"
            inputContainerStyle={[
              !validPassword2
                ? errorstyle
                : { height: 54, borderColor: Colors.neutralGray03 },
            ]}
            onChangeText={debounce(async text => {
              if (text === password) {
                setvalidPassword2(true)
              } else {
                setvalidPassword2(false)
              }
            }, 300)}
            errorMessage={
              !validPassword2
                ? 'Password berbeda dengan di atas'
                : 'Ketik Password sama seperti di atas'
            }
            errorStyle={{
              paddingTop: 4,
              margin: 0,
              fontSize: 12,
              fontFamily: 'Roboto-Regular',
              color: !validPassword2 ? Colors.otherRed : Colors.neutralBlack02,
            }}
            secureTextEntry={secure2}
            placeholder="********"
            rightIcon={
              <View
                style={{
                  flexDirection: 'row',
                  width: 80,
                  justifyContent: 'flex-end',
                }}
              >
                {!validPassword2 ? (
                  <View
                    style={{
                      height: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 30,
                    }}
                  >
                    <FastImage
                      source={Images.icon_alert_3x}
                      style={{
                        height: 26,
                        width: 26,
                      }}
                    />
                  </View>
                ) : (
                  <></>
                )}
                <Spacer width={10} />
                {secure2 ? (
                  <TouchableOpacity
                    onPress={() => {
                      setsecure2(!secure2)
                    }}
                    style={{
                      height: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 30,
                    }}
                  >
                    <FastImage
                      source={Images.icon_eye_off_3x}
                      style={{
                        height: 24,
                        width: 24,
                      }}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      setsecure2(!secure2)
                    }}
                    style={{
                      height: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 30,
                    }}
                  >
                    <FastImage
                      source={Images.icon_eye_3x}
                      style={{
                        height: 24,
                        width: 24,
                      }}
                    />
                  </TouchableOpacity>
                )}
              </View>
            }
          ></Input>
        </View>
        <Spacer height={33} />
        <ButtonBase
          onPress={() => handlerSubmitButton()}
          mode="color"
          title={'Konfirmasi'}
          disable={false}
          style={{ height: 58 }}
        />
      </View>
    </ScrollView>
  )
}

export default ResetPassword

const styles = StyleSheet.create({})
