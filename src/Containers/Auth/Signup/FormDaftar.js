import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native'
import { useTheme } from '@/Hooks'
import { Colors } from '@/Theme/Variables'
import { Input } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'
import LabelText from '@/Components/Base/LabelText'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Dialog, Divider, Button } from '@rneui/themed'
// import { debounce } from 'lodash'
import axios from 'axios'
import { useToast } from 'react-native-toast-notifications'

import { Config } from '@/Config'
import { useDispatch, useSelector } from 'react-redux'
import { setAutoFill, setLogin } from '@/Store/loginSlice'
import { setGuest } from '@/Store/guestSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setShowModalRegisterSuccess } from '@/Store/registerSlice'
const baseQuery = Config.API_URL

const FormDaftar = props => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const navigation = useNavigation()
  const state = useSelector(state => state)
  const dispatch = useDispatch()
  const [disableButton, setdisableButton] = useState(true)
  const [secure, setsecure] = useState(true)
  const [nama, setnama] = useState('')
  const [hp, sethp] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [password2, setpassword2] = useState('')
  const [referal, setreferal] = useState('')
  const [valid, setvalid] = useState(false)
  const toast = useToast()

  //SSO Form
  const [nameSSO, setNameSSO] = useState('')
  const [phoneSSO, setPhoneSSO] = useState('')
  const [emailSSO, setEmailSSO] = useState('')
  const [referralSSO, setReferralSSO] = useState('')

  //valid form SSO
  const { params } = props.route
  const [googleSSO, setGoogleSSO] = useState(params.GoogleSSONotRegistered)
  const [validNameSSO, setValidNameSSO] = useState(false)
  const [validPhoneSSO, setValidPhoneSSO] = useState(false)
  const [validMailSSO, setValidMailSSO] = useState(false)
  const [validReferralSSO, setValidReferralSSO] = useState(false)
  const [validFormSSO, setValidFormSSO] = useState(false)

  // validasi form
  const [validPassword, setvalidPassword] = useState(true)
  const [validPassword2, setvalidPassword2] = useState(true)
  const [validEmail, setvalidEmail] = useState(true)
  const [validHp, setvalidHp] = useState(true)
  const [validNama, setvalidNama] = useState(true)
  const [validReferal, setvalidReferal] = useState(true)

  // visible dialog
  const [visibleDialog, setvisibleDialog] = useState(false)
  const [visibleDialogLeft, setvisibleDialogLeft] = useState(false)
  const [navState, setnavSTate] = useState(undefined)

  const [errorreferal, seterrorreferal] = useState(true)

  //loading
  const [isKonfirmasiLoading, setisKonfirmasiLoading] = useState(false)

  const windowWidth = Dimensions.get('window').width
  //   console.log(navState.data)

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

  const handlerSubmitButton = async (isReferral = false, _payload) => {
    const url = `${baseQuery}/customer-app/auth/register`
    const data = {
      full_name: nama,
      phone: hp,
      email: email,
      password: password,
      referral: referal,
    }

    if (
      nama == '' ||
      hp == '' ||
      email == '' ||
      password == '' ||
      validPassword2 == false
    ) {
      return false
    }

    setisKonfirmasiLoading(true)

    await axios
      .post(url, isReferral ? _payload : data)
      .then(response => {
        setisKonfirmasiLoading(false)
        setvisibleDialog(false)
        response = response.data
        if (response.status == 'success') {
          setvisibleDialog(false)
          axios
            .post(Config.CUSTOMER_APP + '/auth/login', {
              input: data.email,
              password: data.password,
              fbasekey: state.tokenList.fcm_token,
            })
            .then(({ data }) => {
              if (data.statusCode == '200') {
                dispatch(setLogin(data.data))
                dispatch(setAutoFill({ email: data.data.user.email }))
                dispatch(setGuest({ isGuest: false }))
                dispatch(setShowModalRegisterSuccess(true))
                AsyncStorage.setItem('@login', 'true').then(() => {
                  navigation.reset({ index: 0, routes: [{ name: 'Main' }] })
                })
              }
            })
            .catch(err => {
              console.log('ERR_LOGIN_REGISTER', err)
            })
        }
      })
      .catch(({ response }) => {
        console.log('RESPO', response.data, response)
        setisKonfirmasiLoading(false)
        if (response.data.status == 'error') {
          const err_response = response.data.data
          const message = err_response.message
          toast.show(message, {
            type: 'custom_danger',
            duration: 4500,
            data: { height: 140 },
          })

          setvalidReferal(true)
          // seterrorreferal('Kode Referral Salah. Silakan cek ulang penulisan')
        } else if (response.data.status === 'error_referral') {
          setvalidReferal(false)
          setvisibleDialog(true)
        }
      })
  }

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  function validateOnlyNumbers(phone) {
    const re = /^[0-9\b]+$/
    return re.test(phone)
  }

  //   const debounceFunc = useCallback(debounce(changeHandler), [])
  const errorstyle = { borderColor: 'red' }

  useEffect(() => {
    if (validNama && validHp && validEmail && validPassword && validPassword2) {
      setvalid(true)
    } else {
      setvalid(false)
    }
  }, [validNama, validHp, validEmail, validPassword, validPassword2])

  useEffect(() => {
    const x = props.route.params.value
    if (props.route.params.emailorphone == 'email') {
      setemail(x)
    } else {
      sethp(x)
    }
  }, [])

  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        console.log(e.data.action.type)
        // Prevent default behavior of leaving the screen
        if (e.data.action.type == 'GO_BACK') {
          console.log('Go Back')

          e.preventDefault()
          setnavSTate(e.data.action)
          setvisibleDialogLeft(true)
        }
      }),
    [navigation],
  )

  const handlerSubmitFromGoogleSSOButton = async () => {
    const url =
      'https://lavender.prestisa.id/api/customer-app/auth/register-sso'

    const data = {
      full_name: props.route.params.name,
      email: props.route.params.email,
      phone: phoneSSO,
      referral: referal,
      fbasekey: state.tokenList.fcm_token,
    }

    // console.log('DATA_REGISTER_SSO:', data, 'TOKEN', state.tokenList.fcm_token)

    setisKonfirmasiLoading(true)

    await axios
      .post(url, data)
      .then(response => {
        setisKonfirmasiLoading(false)
        setvisibleDialog(false)
        response = response.data
        if (response.status == 'success') {
          setvisibleDialog(false)
          axios
            .post(Config.CUSTOMER_APP + '/auth/login', {
              input: data.email,
              password: data.password,
              fbasekey: state.tokenList.fcm_token,
            })
            .then(({ data }) => {
              if (data.statusCode == '200') {
                dispatch(setLogin(data.data))
                dispatch(setAutoFill({ email: data.data.user.email }))
                dispatch(setGuest({ isGuest: false }))
                dispatch(setShowModalRegisterSuccess(true))
                AsyncStorage.setItem('@login', 'true').then(() => {
                  navigation.reset({ index: 0, routes: [{ name: 'Main' }] })
                })
              }
            })
            .catch(err => {
              console.log('ERR_LOGIN_REGISTER', err)
            })
        }
      })
      .catch(({ response }) => {
        console.log('RESPO', response.data, response)
        setisKonfirmasiLoading(false)
        if (response.data.status == 'error') {
          const err_response = response.data.data
          const message = err_response.message
          toast.show(message, {
            type: 'custom_danger',
            duration: 4500,
            data: { height: 140 },
          })
          setvalidReferal(true)
          // seterrorreferal('Kode Referral Salah. Silakan cek ulang penulisan')
        } else if (response.data.status === 'error_referral') {
          setvalidReferal(false)
          setvisibleDialog(true)
        }
      })
  }

  // SSO Register
  useEffect(() => {
    if (props.route.params.GoogleSSONotRegistered) {
      toast.show('', {
        type: 'custom_danger',
        duration: 4500,
        data: {
          title: 'Maaf, akun google anda belum terdaftar di aplikasi Prestisa',
          subtitle: 'Silakan Isi data terlebih dahulu',
          height: 270,
        },
      })
      setEmailSSO(props.route.params.email)
      setValidMailSSO(true)
      setNameSSO(props.route.params.name)
      setValidNameSSO(true)
      setGoogleSSO(true)
    }
  }, [])

  useEffect(() => {
    validNameSSO && validPhoneSSO && validMailSSO
      ? setValidFormSSO(true)
      : setValidFormSSO(false)
  }, [validNameSSO, validPhoneSSO, validMailSSO])

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
          <View>
            <Text style={[styles.headerText]}>Hello,</Text>
            <Text style={[styles.headerText]}>Isi data sebentar ya</Text>
          </View>
        </ImageBackground>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <View style={styles.formGroup}>
          <LabelText
            title="Nama Lengkap"
            required={true}
            isOtherRed={googleSSO}
          />
          {!googleSSO ? (
            <Input
              inputContainerStyle={[!validNama ? errorstyle : {}]}
              onChangeText={debounce(async text => {
                if (text != '') {
                  setvalidNama(true)
                  setnama(text)
                } else {
                  setvalidNama(false)
                }
              }, 300)}
              placeholder="Masukkan nama sesuai KTP"
            ></Input>
          ) : (
            <InputRNUICustomV1
              onChangeText={text => {
                if (text.length > 0 || nameSSO.length > 0) {
                  setNameSSO(text)
                  setValidNameSSO(true)
                }
              }}
              placeholder="Masukkan nama sesuai KTP"
              defaultValue={props.route.params.name}
            />
          )}
        </View>
        <View style={styles.formGroup}>
          <LabelText title="No.HP" required={true} isOtherRed={googleSSO} />
          {!googleSSO ? (
            <Input
              inputContainerStyle={[!validHp ? errorstyle : {}]}
              defaultValue={hp}
              keyboardType="number-pad"
              onChangeText={debounce(async text => {
                const validNumber = validateOnlyNumbers(text)
                console.log(validNumber)
                if (validNumber) {
                  setvalidHp(true)
                  sethp(text)
                } else {
                  setvalidHp(false)
                }
              }, 300)}
              placeholder="Masukkan No. Handphone"
            ></Input>
          ) : (
            <InputRNUICustomV1
              onChangeText={text => {
                if (text.length > 0) {
                  setPhoneSSO(text)
                  setValidPhoneSSO(true)
                } else {
                  setValidPhoneSSO(false)
                }
              }}
              placeholder="Masukkan alamat No. HP"
              keyboardType="number-pad"
            />
          )}
        </View>
        <View style={styles.formGroup}>
          <LabelText title="Email" required={true} isOtherRed={googleSSO} />
          {!googleSSO ? (
            <Input
              inputContainerStyle={[!validEmail ? errorstyle : {}]}
              defaultValue={email}
              onChangeText={debounce(async text => {
                const validEmail = validateEmail(text)
                if (validEmail) {
                  setvalidEmail(true)
                  setemail(text)
                } else {
                  setvalidEmail(false)
                }
              }, 300)}
              placeholder="Masukkan alamat Email"
              keyboardType="email-address"
            ></Input>
          ) : (
            <InputRNUICustomV1
              onChangeText={text => {
                if (text.length > 0) {
                  setValidMailSSO(true)
                }
              }}
              placeholder="Masukkan alamat Email"
              defaultValue={props.route.params.email}
              value={props.route.params.email}
            />
          )}
        </View>
        {!googleSSO && (
          <>
            <View style={styles.formGroup}>
              <LabelText title="Password" required={true} />
              <Input
                inputContainerStyle={[!validPassword ? errorstyle : {}]}
                onChangeText={debounce(async text => {
                  const pass = /[0-9]/.test(text)
                  console.log(pass, text.length)
                  if (pass && text.length > 6) {
                    setvalidPassword(true)
                    setpassword(text)
                  } else {
                    setvalidPassword(false)
                  }
                }, 300)}
                secureTextEntry={secure}
                placeholder="Masukkan password"
                rightIcon={
                  <View
                    style={[
                      Layout.row,
                      {
                        alignItems: 'center',
                      },
                    ]}
                  >
                    {!validPassword ? (
                      <Icon
                        color={'red'}
                        size={16}
                        onPress={() => {
                          setsecure(!secure)
                        }}
                        style={{ marginRight: 5 }}
                        name={'information'}
                      />
                    ) : (
                      <></>
                    )}

                    {secure ? (
                      <Icon
                        size={20}
                        style={{ marginRight: 10 }}
                        onPress={() => {
                          setsecure(!secure)
                        }}
                        name={'eye-off-outline'}
                      />
                    ) : (
                      <Icon
                        size={20}
                        style={{ marginRight: 10 }}
                        onPress={() => {
                          setsecure(!secure)
                        }}
                        name={'eye-outline'}
                      />
                    )}
                  </View>
                }
              ></Input>
              <Text
                style={[Fonts.textTiny, !validPassword ? { color: 'red' } : {}]}
              >
                Password min. 6 karakter kombinasi huruf & angka
              </Text>
            </View>

            <View style={styles.formGroup}>
              <LabelText title="Ketik Ulang Password" required={true} />

              <Input
                inputContainerStyle={[!validPassword2 ? errorstyle : {}]}
                onChangeText={debounce(async text => {
                  if (text === password) {
                    setvalidPassword2(true)
                  } else {
                    setvalidPassword2(false)
                  }
                }, 300)}
                errorMessage={
                  !validPassword2 ? 'Password berbeda dengan di atas' : ''
                }
                secureTextEntry={secure}
                placeholder="Masukkan password"
                rightIcon={
                  <View
                    style={[
                      Layout.row,
                      {
                        alignItems: 'center',
                      },
                    ]}
                  >
                    {!validPassword2 ? (
                      <Icon
                        color={'red'}
                        size={16}
                        onPress={() => {
                          setsecure(!secure)
                        }}
                        style={{ marginRight: 5 }}
                        name={'information'}
                      />
                    ) : (
                      <></>
                    )}

                    {secure ? (
                      <Icon
                        size={20}
                        style={{ marginRight: 10 }}
                        onPress={() => {
                          setsecure(!secure)
                        }}
                        name={'eye-off-outline'}
                      />
                    ) : (
                      <Icon
                        size={20}
                        style={{ marginRight: 10 }}
                        onPress={() => {
                          setsecure(!secure)
                        }}
                        name={'eye-outline'}
                      />
                    )}
                  </View>
                }
              ></Input>
              <Text
                style={[
                  Fonts.textTiny,
                  ,
                  !validPassword2 ? { color: 'red' } : {},
                ]}
              >
                {'  '}
                Ketik Password sama seperti di atas
              </Text>
            </View>
          </>
        )}
        <View style={styles.formGroup}>
          <LabelText title="Kode Referal (Optional)" required={false} />
          {!googleSSO ? (
            <Input
              onChangeText={debounce(async text => {
                setreferal(text)
              }, 300)}
              errorMessage={errorreferal}
              inputContainerStyle={[!validReferal ? errorstyle : {}]}
              placeholder="Masukkan kode"
            ></Input>
          ) : (
            <InputRNUICustomV1
              onChangeText={text => {
                if (text.length > 0) {
                  setValidReferralSSO(true)
                } else {
                  setValidReferralSSO(false)
                }
              }}
              placeholder="Masukkan kode"
            />
          )}
        </View>
        <View style={[Gutters.largeVPadding]}>
          {!googleSSO ? (
            <Button
              disabled={!valid}
              title={'Konfirmasi'}
              loading={isKonfirmasiLoading}
              onPress={() => handlerSubmitButton()}
            ></Button>
          ) : (
            <Button
              buttonStyle={{ backgroundColor: Colors.primary }}
              disabledStyle={{ backgroundColor: Colors.neutralGray03 }}
              disabledTitleStyle={{ color: Colors.white }}
              titleStyle={{
                fontSize: 16,
                fontFamily: 'Roboto-Medium',
                fontWeight: '600',
                color: Colors.white,
              }}
              disabled={!validFormSSO}
              onPress={() => handlerSubmitFromGoogleSSOButton()}
              title={'Konfirmasi'}
            />
          )}
        </View>
      </View>

      {DialogBackButton()}
      {DialogReferal()}
    </ScrollView>
  )

  function DialogBackButton() {
    return (
      <Dialog
        isVisible={visibleDialogLeft}
        overlayStyle={{ padding: 0, width: windowWidth - 40 }}
      >
        <View style={{ marginHorizontal: 20, marginVertical: 30 }}>
          <View style={[{ alignSelf: 'center' }, Gutters.largeBPadding]}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              Data kamu belum tersimpan
            </Text>
          </View>
          <Text style={{ fontSize: 16 }}>
            Kembali ke Menu awal berarti kamu akan mengulang menulis data lagi
          </Text>
        </View>
        <Divider />
        <View
          style={[
            Layout.row,
            Gutters.smallVPadding,
            Gutters.regularHPadding,
            {
              justifyContent: 'space-between',
            },
          ]}
        >
          <View>
            <Button
              title="Tidak Jadi"
              buttonStyle={{ backgroundColor: 'transparent' }}
              titleStyle={{ color: Colors.text }}
              onPress={() => setvisibleDialogLeft(false)}
            />
          </View>
          <View style={{ backgroundColor: Colors.primary, borderRadius: 5 }}>
            <Button
              style={{ color: 'white' }}
              title="Ya, Saya Mengerti"
              onPress={() => {
                setvisibleDialogLeft(false)
                navigation.dispatch(navState)
              }}
            />
          </View>
        </View>
      </Dialog>
    )
  }

  function DialogReferal() {
    return (
      <Dialog
        isVisible={visibleDialog}
        overlayStyle={{ padding: 0, width: windowWidth - 40 }}
      >
        <View style={{ marginHorizontal: 20, marginVertical: 30 }}>
          <Text style={{ fontSize: 16 }}>
            Kode referal yang kamu masukkan salah.
          </Text>
        </View>
        <Divider />
        <View
          style={[
            Layout.row,
            Gutters.smallVPadding,
            Gutters.regularHPadding,
            {
              justifyContent: 'space-between',
            },
          ]}
        >
          <View>
            <Button
              title="Ubah Kode"
              buttonStyle={{ backgroundColor: 'transparent' }}
              titleStyle={{ color: Colors.text }}
              onPress={() => setvisibleDialog(false)}
            />
          </View>
          <View style={{ backgroundColor: Colors.primary, borderRadius: 5 }}>
            <Button
              style={{ color: 'white' }}
              title="Lanjutkan"
              onPress={() => {
                setvisibleDialog(false)
                // navigation.dispatch(navState)
                // navigateAndSimpleReset('Home')
                handlerSubmitButton(true, {
                  full_name: nama,
                  phone: hp,
                  email: email,
                  password: password,
                  referral: '', // sementara referral dikosogin
                })
              }}
            />
          </View>
        </View>
      </Dialog>
    )
  }
}

const InputRNUICustomV1 = ({ validInput = false, ...props }) => {
  return (
    <Input
      style={{
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        fontWeight: '600',
      }}
      inputContainerStyle={[
        validInput
          ? { borderColor: Colors.otherRed }
          : { height: 48, borderColor: Colors.neutralGray03 },
      ]}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: 'white',
  },
  formGroup: {
    marginBottom: 20,
  },
})
export default FormDaftar
