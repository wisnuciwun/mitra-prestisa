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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import Input from '@/Components/Base/InputTextBottomLine'
import ButtonBottomFloating from '@/Components/ButtonBottomFloating'
import { Config } from '@/Config'
import axios from 'axios'
import { setLogin } from '@/Store/loginSlice'

const PhoneEditContainer = props => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const state = useSelector(state => state)
  const [disable, setDisable] = useState(true)
  const [phone, setPhone] = useState(state.login.data.user.phone)
  const [error, setError] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordHide, setPasswordHide] = useState(true)

  const handleData = args => {
    if (args.length >= 10) {
      setError(false)
      setDisable(false)
    } else {
      setDisable(true)
      setError(true)
    }
    setPhone(args)
  }

  const handlePassword = args => {
    setPassword(args)
    if (args.length >= 6) {
      setDisable(false)
    } else {
      setDisable(true)
    }
  }

  const handleSubmit = async () => {
    const url = `${Config.CUSTOMER_APP}/auth/update-customer`
    axios
      .post(url, {
        fbasekey: state.tokenList.fcm_token,
        type: 'phone',
        password: password,
        phone: phone,
      })
      .then(response => {
        if (response.data.statusCode == '200') {
          const user = { ...state.login.data.user }
          user.phone = phone
          user.full_name = response.data.data.user.name
          user.email = response.data.data.user.email
          user.avatar = response.data.data.user.avatar
          dispatch(setLogin({ ...state.login.data, user }))
          navigation.navigate('Profile')
        }
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log('error.response.data')
          console.log(error.response.data)
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request)
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message)
        }
        console.log(error.config)
      })
  }

  return (
    <View style={[st.screen, Layout.fill]}>
      <View>
        <Input
          label="No. Handphone"
          defaultValue={phone}
          placeholder="08 -"
          isError={error}
          onChangeText={text => handleData(text)}
          errorMessage="Nomor minimal terdiri dari 10 karakter"
          rightIcon={
            <Icon name="check-circle" size={20} color={Colors.otherGreen01} />
          }
          errorStyle={{ fontFamily: Fonts.light }}
        />
      </View>
      {error ? (
        <></>
      ) : (
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
              <Feather
                name={passwordHide ? 'eye-off' : 'eye'}
                size={20}
                onPress={() => setPasswordHide(!passwordHide)}
              />
            }
            errorStyle={{ fontFamily: Fonts.light }}
          />
          <Text style={{ color: Colors.primary }}>Lupa Password?</Text>
        </View>
      )}
      <View style={{ position: 'absolute', top: 400 }}>
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
export default PhoneEditContainer
