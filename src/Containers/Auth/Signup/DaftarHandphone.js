import React, { useState, useEffect } from 'react'
import {
  Keyboard,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { Input, Button } from '@rneui/themed'
import { useTheme } from '@/Hooks'
import { Colors } from '@/Theme/Variables'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { Brand } from '@/Components'
import InputBase from '@/Components/Base/InputBase'
import ButtonBase from '@/Components/Base/ButtonBase'
import axios from 'axios'

import { Config } from '@/Config'
const baseQuery = Config.API_URL

const DaftarHandphone = props => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [phone, setphone] = useState('')
  const [loading, setloading] = useState(false)
  const [disableState, setdisableState] = useState(true)
  const [editable, seteditable] = useState(true)
  const [keyboardStatus, setKeyboardStatus] = useState(undefined)
  const [emailorphone, setemailoraphone] = useState('')
  const [errorMessage, seterrorMessage] = useState('')
  const [disabled, setdisabled] = useState(false)
  const [errorMessageRegisteredUser, seterrorMessageRegisteredUser] =
    useState('')

  const handlerInputChange = text => {
    if (validateOnlyNumbers(text)) {
      if (text.length >= 11) {
        setdisableState(false)
        setphone(text)
        seterrorMessage('')
        setemailoraphone('phone')
      } else {
        // console.log('not phone')
        seterrorMessage('Format nomor yang anda masukkan salah')
        setdisableState(true)
      }
    } else {
      if (validateEmail(text)) {
        setemailoraphone('email')
        setdisableState(false)
        seterrorMessage('')
        setphone(text)
      } else {
        seterrorMessage('Format email yang anda masukkan salah')

        setdisableState(true)
      }
    }
    if (text.length === 0) {
      seterrorMessage('')
    }
  }

  const handlerSubmitButton = async () => {
    const url = `${baseQuery}/customer-app/auth/new-account`

    const data = {
      input: phone,
    }
    // console.log(data)
    setloading(true)
    setdisabled(true)
    await axios
      .post(url, data)
      .then(response => {
        setloading(false)
        setdisabled(false)
        response = response.data
        if (response.status == 'success') {
          console.log('Behasil ', response)
          seterrorMessage('')
          navigation.navigate('FormDaftar', { value: phone, emailorphone })
        }
      })
      .catch(({ response }) => {
        setloading(false)
        setdisabled(false)
        if (response.status == 400) {
          console.log(response.data.data.message)
          seterrorMessage(response.data.data.message)
        }
        console.log('data: ', response.data)
        console.log('STatus ', response.status)
        // console.log(response.headers)
      })
  }

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  function validateOnlyNumbers(phone) {
    re = /^[0-9\b]+$/
    return re.test(phone)
  }

  let tinggikeyboard = 0
  let Height = 0
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', e => {
      tinggikeyboard = e.endCoordinates.height
      Height = windowHeight + tinggikeyboard
    })
    Keyboard.addListener('keyboardDidHide', e => {
      tinggikeyboard = e.endCoordinates.height
      Height = windowHeight + tinggikeyboard
    })

    return () => {}
  })

  const errorstyle = { borderColor: '#CB3A31' }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="never"
        style={[styles.screen, { height: Height }]}
      >
        <View style={[{ marginTop: 30 }]}>
          <View style={{ alignItems: 'center' }}>
            <Brand />
          </View>

          <View style={[{ marginTop: 70, marginBottom: 100 }]}>
            <View style={[Layout.alignItemsCenter, { marginBottom: 20 }]}>
              <Text>Daftar dengan No.Handphone atau Email</Text>
            </View>
            <View>
              <Input
                inputContainerStyle={[errorMessage != '' ? errorstyle : {}]}
                onChangeText={text => handlerInputChange(text)}
                placeholder="08xxx"
                style={{ alignSelf: 'stretch' }}
                errorMessage={errorMessage}
                disabled={disabled}
              />
            </View>
          </View>
        </View>

        <View style={[]}>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 13 }}>
              Dengan menekan tombol selanjutnya, saya menerima semua{' '}
              <Text
                onPress={() =>
                  props.navigation.navigate('SyaratKetentuanContainer')
                }
                style={{ color: '#13BCFF' }}
              >
                ketentuan penggunaan dan kebijakan privasi
              </Text>
            </Text>
          </View>
          <View style={[{ marginBottom: 30 }]}>
            <Button
              onPress={() => {
                handlerSubmitButton()
              }}
              title={'Daftar'}
              disabled={disableState}
              loading={loading}
            />
          </View>
          <View style={[{ alignSelf: 'center' }]}>
            <Text style={([Fonts.textSmall], { fontWeight: 'bold' })}>
              Sudah Punya Akun?{'  '}
              <Text
                onPress={() => {
                  navigation.navigate('LoginPhoneOrEmail', {
                    successResetPassword: false,
                  })
                }}
                style={{ color: Colors.primary }}
              >
                Masuk Sini
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    padding: 20,
  },
  inputText: {
    width: 300,
    borderColor: '#999',
    borderWidth: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    marginTop: 10,
    borderRadius: 5,
    color: '#666',
  },
})
export default DaftarHandphone
