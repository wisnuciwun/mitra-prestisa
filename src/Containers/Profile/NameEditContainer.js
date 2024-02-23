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
import { setLogin } from '@/Store/loginSlice'

const NameEditContainer = props => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const [name, setName] = useState(state.login.data.user.full_name)
  const [disable, setDisable] = useState(false)

  const handleName = args => {
    if (args.length == 0) {
      setDisable(true)
    } else {
      setDisable(false)
    }
    setName(args)
  }

  const handleSubmit = async () => {
    const url = `${Config.CUSTOMER_APP}/auth/update-customer`
    axios
      .post(url, {
        fbasekey: state.tokenList.fcm_token,
        type: 'name',
        name: name,
      })
      .then(response => {
        if (response.data.statusCode == '200') {
          const user = { ...state.login.data.user }
          user.phone = response.data.data.user.phone
          user.full_name = name
          user.email = response.data.data.user.email
          dispatch(setLogin({ ...state.login.data, user }))
          navigation.navigate('Profile')
        }
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log('error.response')
          console.log(error.response)
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
          label="Nama"
          defaultValue={name}
          placeholder="Isi Nama Lengkap"
          onChangeText={text => handleName(text)}
          errorMessage="Harap mengisi dengan nama lengkap"
          errorStyle={{ fontFamily: Fonts.light }}
        />
      </View>
      <View style={{ position: 'absolute', top: 250 }}>
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
export default NameEditContainer
