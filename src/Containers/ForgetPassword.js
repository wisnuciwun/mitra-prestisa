import { StyleSheet, View, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import NavBarV1 from '@/Components/Base/NavBarV1'
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
import { useToast } from 'react-native-toast-notifications'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setForgetPassword } from '../Store/forgetPasswordSlice'
import FastImage from 'react-native-fast-image'
import { useNavigation } from '@react-navigation/native'

const ForgetPassword = () => {
  const { Fonts, Images } = useTheme()
  const [email, setEmail] = useState('')
  const [errorEmail, setErrorEmail] = useState(false)
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const data_login = useSelector(state => state.login)

  React.useLayoutEffect(() => {
    NavBarV1({
      navigation: navigation,
      sourceImageLeft: Images.icon_arrow_left_3x,
      backToRouteName: 'LoginPhoneOrEmail',
      paramsRoute: { successResetPassword: false },
      titleName: 'Lupa Password',
    })
  }, [navigation])

  useEffect(() => {
    if (data_login.autofill.email != undefined || '') {
      setEmail(data_login.autofill.email)
    }
  }, [data_login.autofill.email])

  const handleSubmitForgetPassword = async () => {
    const url =
      'https://lavender.prestisa.id/api/customer-app/auth/password-link'
    const payload = { email: email }
    setLoading(true)
    await axios
      .post(url, payload)
      .then(res => {
        setLoading(false)
        const data = res.data.data
        toast.show(data.message, {
          type: 'custom_success',
          duration: 4500,
        })
        // console.log('RES', res.data)
        saveRespondeDataForgotPassword(data.link)
      })
      .catch(err => {
        setLoading(false)
        setErrorEmail(true)
        console.log('ERR', err.response.data)
      })
  }

  function getQueryParams(url) {
    return url
      .replace('https://prestisacustomer.page.link/resetpassword', '')
      .replace('?', '')
      .split('&')
      .reduce((a, n) => {
        return { ...a, [n.split('=')[0]]: n.split('=')[1] }
      }, {})
  }

  async function saveRespondeDataForgotPassword(url) {
    const query = await getQueryParams(url)
    return dispatch(
      setForgetPassword({ link: url, email: query.email, code: query.kode }),
    )
  }

  const handleFormEmail = email => {
    setEmail(email)
    setErrorEmail(false)
  }

  return (
    <ScrollView style={{ backgroundColor: Colors.white }}>
      <View style={{ paddingHorizontal: 22 }}>
        <Spacer height={51} />
        <View
          style={{
            alignItems: 'center',
          }}
        >
          <FastImage
            source={Images.icon_lost_password}
            style={{ height: 84, width: 84 }}
          />
        </View>
        <Spacer height={41} />
        <FormV1
          spacerTop={16}
          label="Masukkan alamat email untuk LINK atur ulang password"
          placeholder="your@email.com"
          eyeActive={false}
          footlabel=""
          error={errorEmail}
          errorMessage="Email yang kamu masukkan belum terdaftar di Prestisa"
          value={email}
          alert={errorEmail}
          onChangeText={handleFormEmail}
        />
        <Spacer height={33} />
        <ButtonBase
          onPress={() => handleSubmitForgetPassword()}
          mode="color"
          title={'Kirim'}
          disable={false}
          style={{ height: 58 }}
        />
      </View>
    </ScrollView>
  )
}

export default ForgetPassword

const styles = StyleSheet.create({})
