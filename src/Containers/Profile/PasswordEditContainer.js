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
import { Config } from '@/Config'
import axios from 'axios'

const PasswordEditContainer = props => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const [disable, setDisable] = useState(true)
  const [errorOld, setErrorOld] = useState(false)
  const [errorNew, setErrorNew] = useState(false)
  const [errorCompare, setErrorCompare] = useState(false)
  const [passwordHide, setPasswordHide] = useState(true)
  const [passwordOld, setPasswordOld] = useState('')
  const [passwordNew, setPasswordNew] = useState('')
  const [passwordCompare, setPasswordCompare] = useState('')

  const handlePassword = args => {
    if (args.type == 'old') {
      setPasswordOld(args.text)
      if (args.text.length > 5) {
        setErrorOld(false)
      } else {
        setErrorOld(true)
      }
    } else if (args.type == 'new') {
      setPasswordNew(args.text)
      if (args.text.length > 5) {
        setErrorNew(false)
      } else {
        setErrorNew(true)
      }
    } else {
      setPasswordCompare(args.text)
      if (args.text == passwordNew) {
        setErrorCompare(false)
        setDisable(false)
      } else {
        setErrorCompare(true)
      }
    }
  }

  const passwordHidden = args => {
    let password = ''
    for (let index = 0; index < args.length; index++) {
      password += '*'
    }
    return password
  }

  const handleSubmit = args => {
    const url = `${Config.CUSTOMER_APP}/auth/update-customer`
    const payload = {
      fbasekey: state.tokenList.fcm_token,
      type: 'password',
      password_lama: passwordOld,
      password_baru: passwordNew,
    }
    axios
      .post(url, payload)
      .then(response => {
        if (response.data.statusCode == '200') {
          navigation.navigate('Profile')
        }
      })
      .catch(error => {
        console.log('error')
        console.log(error.response.data)
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2x
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
        } else {
          // Something happened in setting up the request that triggered an Error
        }
      })
  }

  return (
    <View style={[st.screen, Layout.fill]}>
      <View>
        <Input
          label="Password Lama"
          value={passwordHide ? '**********' : passwordOld}
          isError={errorOld}
          onChangeText={text => handlePassword({ text: text, type: 'old' })}
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
        <Input
          label="Password Baru"
          value={passwordHide ? '**********' : passwordNew}
          isError={errorNew}
          onChangeText={text => handlePassword({ text: text, type: 'new' })}
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
        <Input
          label="Ketik Ulang Password"
          value={passwordHide ? '**********' : passwordCompare}
          isError={errorCompare}
          onChangeText={text => handlePassword({ text: text, type: 'compare' })}
          errorMessage="Ketik password yang sama seperti diatas"
          rightIcon={
            <FeatherIcon
              name={passwordHide ? 'eye-off' : 'eye'}
              size={20}
              onPress={() => setPasswordHide(!passwordHide)}
            />
          }
          errorStyle={{ fontFamily: Fonts.light }}
        />
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
  )
}

const st = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    padding: 20,
  },
})
export default PasswordEditContainer
